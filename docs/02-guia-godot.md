# Guia de Godot Engine

## Que es Godot

Godot Engine es un motor de videojuegos **open-source**, multiproposito y multiplataforma, distribuido bajo la licencia MIT. Fue creado por **Juan Linietsky** y **Ariel Manzur** en Buenos Aires, Argentina, y fue publicado como codigo abierto el 14 de enero de 2014.

### Filosofia

- **Totalmente gratuito y open-source:** Sin regalias, sin restricciones. Los desarrolladores son duenos de todo lo que crean.
- **Impulsado por la comunidad:** Las nuevas funcionalidades se priorizan segun el beneficio para la mayor cantidad de usuarios.
- **Diseno orientado a objetos con composicion:** Utiliza un sistema de escenas con jerarquias de nodos en lugar de patrones de programacion estrictos.
- **Flujo de trabajo integrado:** GDScript, el editor y las herramientas estan estrechamente integrados.
- **Multiplataforma desde el inicio:** El editor funciona en Linux, macOS, Windows, Android y Web; exporta a escritorio, movil, web y consolas.

### Datos relevantes

- **Stars en GitHub:** +109,000
- **Forks en GitHub:** +24,800
- **Organizacion:** Godot Foundation (organizacion sin fines de lucro)
- **Ultima version estable:** Godot 4.7 (junio 2026)

---

## Arquitectura de escenas y nodos

La arquitectura de Godot se basa en dos conceptos fundamentales:

### Escena (Scene)

Una coleccion de nodos organizados en una jerarquia de arbol. Las escenas se almacenan como archivos `.tscn` (texto) o `.scn` (binario). Las escenas pueden ser instanciadas dentro de otras escenas, permitiendo **composicion** poderosa.

```
Escena principal (main.tscn)
├── Escena de personaje (instanciada)
├── Escena de enemigo (instanciada)
└── Escena de interfaz (instanciada)
```

### Nodo (Node)

La unidad basica de funcionalidad. Cada entidad en Godot es un nodo. Los nodos tienen tipos especificos con funcionalidad incorporada:

| Tipo de Nodo | Funcion |
|---|---|
| `Node3D` | Nodo base para objetos 3D |
| `MeshInstance3D` | Renderiza una malla 3D |
| `Camera3D` | Camara de renderizado |
| `Light3D` | Fuentes de luz |
| `AudioStreamPlayer3D` | Audio 3D espacializado |
| `Area3D` | Deteccion de colisiones sin fisica |
| `XRController3D` | Controlador VR |
| `XRCamera3D` | Camara VR (headset) |

### Arbol de escenas

```
Root (Node3D)
├── Hijo1 (Node3D)
│   ├── Nieto1 (MeshInstance3D)
│   └── Nieto2 (Camera3D)
└── Hijo2 (Node3D)
    └── Nieto3 (AudioStreamPlayer3D)
```

**Principios clave:**
- Cada nodo puede tener multiples hijos pero solo un padre
- Las escenas pueden ser instanciadas como nodos hijos dentro de otras escenas
- Los nodos se comunican via **senales** (signals) en lugar de referencias directas

---

## El archivo project.godot

El `project.godot` es el **archivo de descripcion del proyecto**, siempre ubicado en la raiz del proyecto. Su ubicacion define la raiz del proyecto.

### Caracteristicas

- Archivo de texto plano en formato INI
- Legible por humanos y amigable con control de versiones
- Godot busca este archivo primero al abrir un proyecto
- Incluso un `project.godot` vacio puede funcionar como proyecto basico

### Ejemplo del proyecto actual

```ini
config_version=5

[application]
config/name="Metaquest"
run/main_scene="uid://b6muxgulwi8i2"
config/features=PackedStringArray("4.7", "GL Compatibility")
config/icon="res://icon.svg"

[autoload]
InfoManager="*uid://bu0y4pnbafvh4"

[display]
window/stretch/mode="canvas_items"
window/stretch/aspect="expand"

[physics]
3d/physics_engine="Jolt Physics"

[rendering]
rendering_device/driver.windows="d3d12"
renderer/rendering_method="gl_compatibility"
renderer/rendering_method.mobile="gl_compatibility"
textures/vram_compression/import_etc2_astc=true

[xr]
openxr/enabled=true
shaders/enabled=true
```

### Convenciones de rutas

| Prefijo | Significado |
|---|---|
| `res://` | Apunta siempre a la raiz del proyecto (donde esta project.godot) |
| `user://` | Siempre escribible, resuelve a directorio de datos del usuario segun el SO |

---

## Renderers de Godot 4.x

Godot 4 incluye **tres metodos de renderizado** y **cuatro drivers de renderizado**:

### Metodos de renderizado

| Renderer | Descripcion | Target |
|---|---|---|
| **Forward+** | Renderer forward clusterizado con caracteristicas avanzadas (niebla volumetrica, SDFGI, VoxelGI, reflexiones pantalla completa, TAA, FSR2). | Solo escritorio |
| **Mobile** | Renderer forward simplificado optimizado para GPUs moviles. Menos caracteristicas pero renderizado mas rapido de escenas simples. | Movil y escritorio |
| **Compatibility** (GL Compatibility) | Renderer forward tradicional no clusterizado usando **OpenGL/GLES3**. Menor conjunto de caracteristicas pero mayor soporte de hardware. | Movil y escritorio (legacy) |

### Drivers de renderizado

| Driver | Descripcion |
|---|---|
| **Vulkan** | Driver principal para Godot 4. Soporta Forward+ y Mobile. Requiere Vulkan 1.0+ |
| **Direct3D 12** | Target Windows/Xbox. Experimental. Desde Godot 4.3 |
| **Metal** | Target macOS/iOS. Desde Godot 4.3 |
| **OpenGL (GLES3)** | Unico driver para el renderer Compatibility. Mayor soporte de hardware |

### Cual usar para este proyecto

Para el desarrollo en **Meta Quest**, se recomienda:

| Dispositivo | Renderer Recomendado |
|---|---|
| Meta Quest 3 / 3S | **Mobile Vulkan** (mayor rendimiento) |
| Meta Quest 2 | **Compatibility** (mayor compatibilidad) |
| Escritorio (pruebas) | Cualquiera (GL Compatibility es suficiente) |

> **Nota:** El proyecto actual utiliza GL Compatibility, que es funcional pero no optimal para Quest 3. Para una version de produccion, se recomienda migrar a Mobile Vulkan.

---

## Estructura de archivos de un proyecto Godot

| Extension | Descripcion |
|---|---|
| `.godot` | Archivo de configuracion del proyecto (project.godot) |
| `.tscn` | Archivo de escena en formato texto |
| `.scn` | Archivo de escena en formato binario |
| `.gd` | Script GDScript |
| `.tres` | Archivo de recurso en formato texto |
| `.res` | Archivo de recurso en formato binario |
| `.import` | Metadatos de importacion de assets |
| `.gdextension` | Descriptor de plugin GDExtension |
| `.uid` | Archivo de identificador unico de Godot |
| `.cfg` | Archivos de configuracion (override.cfg, export_presets.cfg) |

### Estructura del proyecto actual

```
Experiencia_VR-main/
├── project.godot              # Configuracion del proyecto
├── main.gd                    # Script principal (inicializacion OpenXR)
├── cartel.gd                  # Script del cartel de informacion
├── openxr_action_map.tres     # Mapa de acciones OpenXR
├── P001.png                   # Panorama equirectangular de prueba
├── icon.svg                   # Icono del proyecto
├── script/
│   ├── main.tscn              # Escena principal
│   ├── cartel.tscn            # Escena del cartel de info
│   ├── desktop_camera.gd      # Camara orbital de escritorio
│   ├── info_manager.gd        # Gestor de informacion (autoload)
│   ├── left_hand.gd           # Controlador izquierdo
│   ├── right_hand.gd          # Controlador derecho
│   └── marcador.gd            # Marcador flotante
└── addons/godotopenxrvendors/ # Plugin OpenXR Vendors
```

---

## Exportacion a Android/Meta Quest

### Requisitos previos

1. Instalar **OpenJDK 17**
2. Instalar **Android Studio** (Iguana 2023.2.1 o posterior)
3. Paquetes SDK requeridos: Platform-Tools 35.0.0+, Build-Tools 35.0.1, Platform 35
4. Configurar rutas en Godot: `Editor > Editor Settings > Android`

### Pasos de exportacion

1. Instalar plantilla de Android: `Project > Install Android Build Template`
2. Crear preset de exportacion: `Project > Export > Add > Android`
3. Configurar nombre del preset (ej: "Meta Quest")
4. Habilitar **Use Gradle Build** (requerido para XR)
5. Establecer **XR Mode** a **OpenXR**
6. Instalar el plugin **Godot OpenXR Vendors** desde Asset Library
7. En **XR Features**, seleccionar el dispositivo (Meta Quest)
8. Asegurar que **Runnable** este habilitado para deploy con un clic

### Ajustes clave para Quest

| Ajuste | Valor |
|---|---|
| Arquitecturas | ARM64 |
| Formato de textura | ASTC (recomendado) o ETC2 |
| XR Mode | OpenXR |
| Gradle build | Habilitado |

### Proceso de sideload

```bash
# Verificar conexion del dispositivo
adb devices

# Instalar APK
adb install Metaquest.apk

# Lanzar aplicacion
adb shell am start -n com.username.metaquest/com.username.metaquest.MainActivity

# Desinstalar
adb uninstall com.username.metaquest
```
