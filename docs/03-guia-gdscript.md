# Guia de GDScript

## Que es GDScript

GDScript es el lenguaje de scripting **integrado** de Godot, disenado especificamente para el desarrollo de videojuegos. Caracteristicas principales:

- Sintaxis inspirada en **Python** (indentacion basada, legible)
- Estrechamente integrado con el editor de Godot (autocompletado, documentacion, depuracion)
- Tipado **dinamico por defecto** con soporte opcional para **tipado estatico**
- Optimizado para codigo de gameplay con tipos integrados: `Vector2`, `Vector3`, `Color`, `Transform2D`, `Transform3D`, `Rect2`, `Basis`, `Quaternion`, etc.

---

## Sistema de tipos

GDScript soporta tanto tipado dinamico como estatico:

### Tipos declarados

```gdscript
var salud: int = 100
var nombre: String = "Jugador"
var activo: bool = true
var velocidad: float = 3.5

func curar(cantidad: int) -> void:
    salud += cantidad
```

### Tipos inferidos (usando `:=`)

```gdscript
var direccion := Vector3(1, 2, 3)  # Inferido como Vector3
var rapidez := 300.0               # Inferido como float (NO int)
var lista := [1, 2, 3]            # Inferido como Array
```

### Tipos disponibles

| Categoria | Tipos |
|---|---|
| **Primitivos** | `int`, `float`, `String`, `bool`, `null` |
| **Vectores** | `Vector2`, `Vector3`, `Vector2i`, `Vector3i` |
| **Matrices** | `Transform2D`, `Transform3D`, `Basis`, `Quaternion` |
| **Geometria** | `Rect2`, `AABB`, `Plane`, `Projection` |
| **Color** | `Color` |
| **Arreglos** | `Array`, `PackedStringArray`, `PackedInt32Array`, `PackedFloat32Array`, `PackedVector2Array`, `PackedVector3Array`, `PackedColorArray`, `PackedByteArray` |
| **Diccionarios** | `Dictionary` |
| **Nodos** | `Node`, `Node3D`, `Camera3D`, `Area3D`, etc. |

---

## Anotaciones clave

### `@export`

Expone una variable al Inspector, guardando su valor con la escena:

```gdscript
@export var velocidad: float = 200.0
@export_range(0, 100, 1) var salud: int = 100
@export_enum("Guerrero", "Mago", "Ladron") var clase: String
@export var textura: Texture2D
@export var nodo_custom: Node
@export_multiline var descripcion: String
```

**En el proyecto actual (cartel.gd):**

```gdscript
@export_multiline var texto_info: String = "Aqui va la informacion..."
@export var foto_info: Texture2D
```

Estas variables aparecen en el Inspector de Godot y permiten configurar cada cartel sin modificar codigo.

### `@onready`

Diferre la inicializacion hasta que `_ready()` sea llamado (cuando el nodo entra al arbol de escenas):

```gdscript
@onready var sprite = $Sprite2D
@onready var label = get_node("Label")
@onready var camara = $"../XRCamera3D"
```

**En el proyecto actual (cartel.gd):**

```gdscript
@onready var panel_info: Node3D = $PanelInfo
@onready var label: Label = $PanelInfo/SubViewport/Control/Label
@onready var textura_rect: TextureRect = $PanelInfo/SubViewport/Control/TextureRect
@onready var zona: Area3D = $ZonaDeteccion
```

> **Advertencia:** Usar `@onready` y `@export` en la misma variable tiene un efecto secundario: `@onready` sobreescribira el valor exportado.

### `@tool`

Hace que el script se ejecute en el editor (no solo en tiempo de ejecucion):

```gdscript
@tool
extends Node3D

func _process(delta):
    rotation.y += delta  # Funciona en el editor
```

---

## Ciclo de vida de los nodos

El orden de inicializacion para un script derivado de Node:

```
1. _init()                          # Constructor, al crear el objeto
2. Valores @export asignados         # Desde datos de la escena
3. Variables @onready inicializadas   # Despues de los exports
4. _enter_tree()                     # Cuando el nodo entra al arbol
5. _ready()                          # Cuando todos los hijos estan listos
   ↓
6. _process(delta)                   # Cada frame (depende de FPS)
   _physics_process(delta)           # A intervalos fijos (default 60Hz)
   _unhandled_input(event)           # Manejo de input
```

### Ejemplo del proyecto (main.gd)

```gdscript
extends Node3D

var xr_interface: XRInterface

func _ready():
    xr_interface = XRServer.find_interface("OpenXR")
    if xr_interface and xr_interface.is_initialized():
        print("OpenXR inicializado correctamente")
        DisplayServer.window_set_vsync_mode(DisplayServer.VSYNC_DISABLED)
        get_viewport().use_xr = true
    else:
        print("ERROR: OpenXR no pudo inicializarse")
```

### Metodos virtuales importantes

| Metodo | Cuando se llama | Uso comun |
|---|---|---|
| `_init()` | Al crear el objeto | Inicializacion temprana |
| `_enter_tree()` | Nodo entra al arbol | Configuracion previa |
| `_ready()` | Todos los hijos listos | Setup principal |
| `_process(delta)` | Cada frame | Animaciones, UI |
| `_physics_process(delta)` | Intervalo fijo (60Hz) | Fisica, movimiento |
| `_unhandled_input(event)` | Input no manejado | Controles |
| `_exit_tree()` | Nodo a punto de eliminarse | Limpieza |

---

## Senales (Signals)

Las senales implementan el **patron observador** para comunicacion desacoplada entre nodos:

### Declaracion

```gdscript
signal salud_cambiada(valor_anterior, valor_nuevo)
signal murio
```

### Emision

```gdscript
func recibir_dano(cantidad: int):
    var anterior = salud
    salud -= cantidad
    salud_cambiada.emit(anterior, salud)
    if salud <= 0:
        murio.emit()
```

### Conexion

```gdscript
func _ready():
    jugador.salud_cambiada.connect(_on_jugador_salud_cambiada)
    jugador.murio.connect(_on_jugador_murio)

func _on_jugador_salud_cambiada(anterior, nuevo):
    barra_salud.value = nuevo
```

### En el proyecto actual (cartel.gd)

```gdscript
func _ready() -> void:
    zona.area_entered.connect(_on_area_entered)
    zona.area_exited.connect(_on_area_exited)

func _on_area_entered(area: Area3D) -> void:
    if area.name == "AreaJugador":
        InfoManager.registrar_cartel_cercano(self)
```

Las senales `area_entered` y `area_exited` del `Area3D` notifican cuando el jugador entra o sale de la zona de deteccion del cartel.

---

## Autoload / Patron Singleton

Los autoloads proveen nodos/scripts accesibles globalmente que persisten entre cambios de escena:

### Configuracion

`Project > Project Settings > Globals > Autoload`

### Como funciona

1. Godot crea un nodo y adjunta el script
2. El nodo se agrega al **viewport raiz** antes de cualquier otra escena
3. Persiste durante toda la vida de la aplicacion
4. Es accesible por nombre desde cualquier lugar: `InfoManager.mostrar_info()`

### En el proyecto actual (info_manager.gd)

```gdscript
extends Node

var cartel_activo: Node3D = null

func mostrar_info() -> void:
    if cartel_activo:
        cartel_activo.mostrar_panel()

func ocultar_info() -> void:
    if cartel_activo:
        cartel_activo.ocultar_panel()

func registrar_cartel_cercano(cartel: Node3D) -> void:
    cartel_activo = cartel

func quitar_cartel_cercano(cartel: Node3D) -> void:
    if cartel_activo == cartel:
        cartel_activo = null
```

Registrado en `project.godot` como:

```ini
[autoload]
InfoManager="*uid://bu0y4pnbafvh4"
```

### Casos de uso comunes

- Estado global del jugador
- Gestor de escenas/transiciones
- Bus de eventos (senales globales)
- Gestor de audio

---

## Convenciones de nombres

| Elemento | Convencion | Ejemplo |
|---|---|---|
| Funciones | snake_case | `mostrar_panel()`, `_on_area_entered()` |
| Variables | snake_case | `velocidad`, `cartel_activo` |
| Constantes | SCREAMING_SNAKE | `MAX_VIDA`, `GRAVEDAD` |
| Clases | PascalCase | `CartelManager`, `PlayerController` |
| Nodos | PascalCase | `XROrigin3D`, `LeftHand`, `PanelInfo` |
| Senales | snake_case | `salud_cambiada`, `murio` |
| Privados | Prefijo `_` | `_posicion_base`, `_girar()` |

---

## Ejemplos del proyecto

### left_hand.gd — Movimiento con thumbstick

```gdscript
extends XRController3D

@export var velocidad := 1.5
@export var zona_muerta := 0.15

@onready var xr_origin: XROrigin3D = get_parent()
@onready var camera: XRCamera3D = xr_origin.get_node("XRCamera3D")

func _physics_process(delta: float) -> void:
    var input_vector: Vector2 = get_vector2("primary")
    if input_vector.length() < zona_muerta:
        return

    var forward: Vector3 = -camera.global_transform.basis.z
    var right: Vector3 = camera.global_transform.basis.x
    forward.y = 0
    right.y = 0
    forward = forward.normalized()
    right = right.normalized()

    var direccion: Vector3 = (forward * input_vector.y) + (right * input_vector.x)
    xr_origin.global_position += direccion * velocidad * delta
```

### right_hand.gd — Snap turning

```gdscript
extends XRController3D

@export var angulo_snap := 45.0
@export var umbral_activacion := 0.6

var puede_girar := true

func _physics_process(_delta: float) -> void:
    var input_vector: Vector2 = get_vector2("primary")
    if abs(input_vector.x) > umbral_activacion and puede_girar:
        var direccion: float = sign(input_vector.x)
        _girar(deg_to_rad(angulo_snap * direccion))
        puede_girar = false
    elif abs(input_vector.x) < 0.3:
        puede_girar = true
```

### marcador.gd — Flotacion con seno

```gdscript
extends MeshInstance3D

@export var amplitud := 0.08
@export var velocidad_flotacion := 1.2

var tiempo := 0.0
var posicion_base: Vector3

func _ready() -> void:
    posicion_base = position

func _process(delta: float) -> void:
    tiempo += delta * velocidad_flotacion
    position.y = posicion_base.y + sin(tiempo) * amplitud
```

---

## Mejores practicas

1. **Usar tipado estatico** para mejor autocompletado, deteccion de errores y rendimiento
2. **Seguir convenciones de nombres** para legibilidad y consistencia
3. **Prefijar metodos/variables privadas** con guion bajo: `_metodo_privado()`
4. **Usar senales** para desacoplamiento entre nodos
5. **Usar `@onready`** en lugar de obtener nodos manualmente en `_ready()`
6. **Evitar logica pesada en `_process()`** -- usar `_physics_process()` para fisica, timers/coroutines para tareas periodicas
7. **No mover XRCamera3D manualmente** -- la posicion es controlada por el runtime XR
8. **Mover XROrigin3D** para teletransportar o mover al jugador
