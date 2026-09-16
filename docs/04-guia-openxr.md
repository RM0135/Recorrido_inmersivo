# Guia de OpenXR

## Que es OpenXR

OpenXR es un **estandar abierto, libre de regalias**, creado por el **Khronos Group** que proporciona una API comun para desarrollar aplicaciones de XR (Realidad Virtual, Aumentada y Mixta).

### Datos clave

- Estandariza el acceso a capacidades de dispositivos XR: seguimiento de cabeza, input de controladores, seguimiento de manos, seguimiento ocular, passthrough, hapticos, etc.
- Elimina el vendor lock-in -- una sola base de codigo puede ejecutarse en cualquier dispositivo compatible con OpenXR
- Version actual: **OpenXR 1.1** (abril 2024)
- Los vendedores implementan **runtimes de OpenXR** (Meta OpenXR Runtime, SteamVR, etc.)
- Las aplicaciones llaman a la API de OpenXR; el runtime mapea esas llamadas al hardware especifico

### Importancia para Godot

OpenXR esta integrado en el nucleo de Godot desde **Godot 4.0**. La implementacion Vulkan de OpenXR esta profundamente integrada con el renderer de Godot. Esta fue una decision arquitectonica deliberada -- OpenXR es una **interfaz central**, no un plugin.

---

## Integracion de OpenXR en Godot

### Clases XR principales

| Clase | Funcion |
|---|---|
| `XRInterface` | Clase base para implementaciones XR. Godot tiene `OpenXRInterface`, `WebXRInterface`, `MobileVRInterface` |
| `XRServer` | Singleton que gestiona todas las interfaces XR. `XRServer.find_interface("OpenXR")` obtiene la interfaz OpenXR |
| `XROrigin3D` | Representa el centro del espacio de juego. Todos los objetos rastreados se posicionan relativamente a este. Se mueve este nodo para mover al jugador |
| `XRCamera3D` | Representa el headset (camara estereoscopica). La posicion se actualiza automaticamente por el seguimiento. Debe ser hijo de `XROrigin3D` |
| `XRController3D` | Representa un controlador rastreado. Provee estados de botones, valores de trigger, input de thumbstick via nombres de acciones. Debe ser hijo de `XROrigin3D` |
| `XRNode3D` | Clase base para nodos rastreados (`XRCamera3D` y `XRController3D` heredan de esta) |

### Estructura minima de escena VR

```
Root (Node3D)
└── XROrigin3D
    ├── XRCamera3D              # Headset
    ├── LeftHand (XRController3D)   # Controlador izquierdo
    └── RightHand (XRController3D)  # Controlador derecho
```

### En el proyecto actual

```
Main (Node3D) ← main.gd
├── XROrigin3D
│   ├── XRCamera3D
│   │   └── AreaJugador (Area3D)    # Deteccion de proximidad
│   │       └── CollisionShape3D     # SphereShape3D
│   ├── LeftHand (XRController3D)   # ← left_hand.gd
│   └── RightHand (XRController3D)  # ← right_hand.gd
├── Panoramica360 (Node3D)
│   ├── Cartel (instancia de cartel.tscn)
│   ├── MeshInstance3D              # Esfera panoramica
│   ├── MeshInstance3D2             # Esfera panoramica (posicion 2)
│   └── MeshInstance3D3             # Esfera panoramica (posicion 3)
└── DesktopCamera (Camera3D)        # ← desktop_camera.gd
```

---

## Inicializacion de OpenXR

### Script principal (main.gd)

```gdscript
extends Node3D

var xr_interface: XRInterface

func _ready():
    xr_interface = XRServer.find_interface("OpenXR")

    if xr_interface and xr_interface.is_initialized():
        print("OpenXR inicializado correctamente")

        # Desactivar VSync para bajo latencia
        DisplayServer.window_set_vsync_mode(
            DisplayServer.VSYNC_DISABLED
        )

        # Habilitar XR en el viewport
        get_viewport().use_xr = true

    else:
        print("ERROR: OpenXR no pudo inicializarse")
```

### Pasos de inicializacion

1. **Buscar la interfaz OpenXR:** `XRServer.find_interface("OpenXR")`
2. **Verificar inicializacion:** `xr_interface.is_initialized()`
3. **Desactivar VSync:** El runtime XR gestiona el timing de frames
4. **Habilitar XR en viewport:** `get_viewport().use_xr = true`

### Configuracion en project.godot

```ini
[xr]
openxr/enabled=true
shaders/enabled=true
```

---

## Sistema de Action Map

El **Action Map de OpenXR** (`openxr_action_map.tres`) es la implementacion de Godot del sistema de bindings de input de OpenXR.

### Como funciona

1. Las **acciones** son nombres abstractos para entradas/salidas (ej: "trigger", "grip", "thumbstick", "haptic")
2. Los **Action Sets** agrupan acciones relacionadas
3. Los **Interaction Profiles** mapean entradas fisicas de dispositivos a acciones abstractas
4. El action map se carga al **inicio** y no se puede cambiar en tiempo de ejecucion

### Acciones del proyecto actual

El action map contiene **23 acciones** en el action set "godot":

#### Acciones de input (float)

| Accion | Descripcion |
|---|---|
| `trigger` | Valor analógico del gatillo |
| `grip` | Valor analogico del grip |

#### Acciones de input (booleano)

| Accion | Descripcion |
|---|---|
| `trigger_click` | Gatillo presionado (clic) |
| `trigger_touch` | Gatillo tocando |
| `grip_click` | Grip presionado |
| `grip_force` | Grip con fuerza |
| `primary_click` | Thumbstick presionado |
| `primary_touch` | Thumbstick tocando |
| `secondary_click` | Thumbstick secundario presionado |
| `secondary_touch` | Thumbstick secundario tocando |
| `menu_button` | Boton de menu |
| `select_button` | Boton de seleccion |
| `ax_button` | Boton A/X |
| `ax_touch` | Boton A/X tocando |
| `by_button` | Boton B/Y |
| `by_touch` | Boton B/Y tocando |

#### Acciones de input (Vector2)

| Accion | Descripcion |
|---|---|
| `primary` | Thumbstick principal (eje X, Y) |
| `secondary` | Thumbstick secundario |

#### Acciones de pose (追踪)

| Accion | Descripcion |
|---|---|
| `default_pose` | Pose por defecto |
| `aim_pose` | Pose de apuntado |
| `grip_pose` | Pose de agarre |
| `palm_pose` | Pose de palma |

#### Acciones de salida

| Accion | Descripcion |
|---|---|
| `haptic` | Retroalimentacion haptica (vibracion) |

### Perfiles de interaccion

El proyecto incluye **4 perfiles** de interaccion:

| Perfil | Dispositivos |
|---|---|
| `/interaction_profiles/khr/generic_controller` | Controlador generico Khronos |
| `/interaction_profiles/oculus/touch_controller` | Meta Quest 2, Quest 3, Quest Pro |
| `/interaction_profiles/bytedance/pico4_controller` | Pico 4, Neo 3 |
| `/interaction_profiles/ext/hand_interaction_ext` | Hand tracking (pinch, grasp) |

### Mapeo de botones (Oculus Touch)

| Accion Godot | Boton Fisico |
|---|---|
| `ax_button` | A (derecha) / X (izquierda) |
| `by_button` | B (derecha) / Y (izquierda) |
| `primary` | Thumbstick |
| `trigger` | Gatillo indice |
| `grip` | Gatillo agarre |
| `menu_button` | Boton menu |

---

## Input de controladores en GDScript

### Leyendo input

```gdscript
# En un script que extiende XRController3D

func _process(delta):
    # Vector2 del thumbstick
    var thumbstick: Vector2 = get_vector2("primary")

    # Valor float del trigger
    var trigger_value: float = get_float("trigger")

    # Boton presionado (booleano)
    if is_button_pressed("ax_button"):
        print("Boton A/X presionado")
```

### En el proyecto actual

**left_hand.gd** (movimiento):

```gdscript
func _physics_process(delta: float) -> void:
    var input_vector: Vector2 = get_vector2("primary")
    # ... usar input_vector para mover al jugador
```

**right_hand.gd** (giro + botones):

```gdscript
func _ready() -> void:
    button_pressed.connect(_on_button_pressed)

func _on_button_pressed(nombre_boton: String) -> void:
    match nombre_boton:
        "ax_button":
            InfoManager.mostrar_info()
        "by_button":
            InfoManager.ocultar_info()
```

---

## Hand Tracking

OpenXR soporta seguimiento de manos sin controladores fisicos. El perfil `ext/hand_interaction_ext` define gestos estandar:

| Gesto | Accion | Descripcion |
|---|---|---|
| **Pinch** | Trigger | Pulgar + indice juntos |
| **Grasp** | Grip | Cerrar la mano |
| **Pose** | Posicion | Posicion y orientacion de la mano |

### En el proyecto

El action map incluye el perfil de hand tracking con bindings para:

- `/user/hand/left/input/aim/pose`
- `/user/hand/right/input/aim/pose`
- `/user/hand/left/input/grip/pose`
- `/user/hand/right/input/grip/pose`
- `/user/hand/left/input/palm_ext/pose`
- `/user/hand/right/input/palm_ext/pose`

Esto permite que la aplicacion funcione tanto con controladores como con hand tracking en Meta Quest.

---

## Plugin Godot OpenXR Vendors

### Que es

El **Godot OpenXR Vendors plugin** es un plugin GDExtension que agrega soporte para **extensiones OpenXR de especificos del vendedor** que no pueden ser parte del nucleo de Godot.

### Que provee

- Cargadores OpenXR dependientes de plataforma
- Implementaciones de extensiones especificas (Meta, Pico, HTC)
- Funcionalidades especificas de Meta: Body tracking, Application SpaceWarp, Environment Depth, face tracking, eye tracking
- Configuracion de splash screen para headsets Meta
- Extensiones de hand tracking

### Version actual en el proyecto

**Godot OpenXR Vendors plugin v5.1.0** ubicado en `addons/godotopenxrvendors/`

### Estructura del addon

```
addons/godotopenxrvendors/
├── plugin.gdextension          # Descriptor del plugin
├── .bin/
│   ├── android/
│   │   ├── debug/              # 7 archivos .aar
│   │   ├── release/            # 7 archivos .aar
│   │   ├── template_debug/     # arm64/ + x86_64/ → .so
│   │   └── template_release/   # arm64/ + x86_64/ → .so
│   ├── linux/
│   ├── macos/
│   └── windows/
├── androidxr/
├── khronos/
├── magicleap/
├── meta/
└── pico/
```

### Licencias incluidas

- Apache-2.0 (Khronos, Android XR, Magic Leap)
- Meta Oculus SDK License
- Pico License

---

## Errores comunes con OpenXR

### 1. No verificar `is_initialized()`

Siempre verificar si la interfaz XR se inicializo antes de habilitar el modo XR:

```gdscript
# CORRECTO
if xr_interface and xr_interface.is_initialized():
    get_viewport().use_xr = true

# INCORRECTO -- puede causar crash
get_viewport().use_xr = true
```

### 2. Mover XRCamera3D directamente

La posicion de la camara es controlada por el runtime XR. Nunca establecer su posicion manualmente:

```gdscript
# INCORRECTO
camera.global_position = nueva_posicion

# CORRECTO -- mover XROrigin3D
xr_origin.global_position = nueva_posicion
```

### 3. No desactivar VSync

Las aplicaciones XR necesitan que VSync este desactivado para que el runtime gestione el timing:

```gdscript
DisplayServer.window_set_vsync_mode(DisplayServer.VSYNC_DISABLED)
```

### 4. Action map con exceso de acciones

El action map por defecto incluye acciones para todos los controladores. Para nuevos proyectos, crear un action map personalizado con solo las acciones necesarias.

### 5. Mover el jugador incorrectamente

Para mover al jugador en VR, mover `XROrigin3D`, no `XRCamera3D`:

```gdscript
# CORRECTO
xr_origin.global_position += direccion * velocidad * delta

# INCORRECTO -- causa desincronizacion de tracking
camera.global_position += direccion * velocidad * delta
```
