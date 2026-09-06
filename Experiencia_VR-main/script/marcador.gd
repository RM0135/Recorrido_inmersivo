extends MeshInstance3D
 
@export var amplitud := 0.08       # cuánto sube y baja
@export var velocidad_flotacion := 1.2  # velocidad del ciclo
 
var tiempo := 0.0
var posicion_base: Vector3
 
func _ready() -> void:
	posicion_base = position
 
func _process(delta: float) -> void:
	tiempo += delta * velocidad_flotacion
	position.y = posicion_base.y + sin(tiempo) * amplitud
 
