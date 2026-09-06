extends XRController3D

@export var velocidad := 1.5  # metros por segundo
@export var zona_muerta := 0.15  # ignora movimientos mínimos accidentales

@onready var xr_origin: XROrigin3D = get_parent()
@onready var camera: XRCamera3D = xr_origin.get_node("XRCamera3D")

func _physics_process(delta: float) -> void:
	var input_vector: Vector2 = get_vector2("primary")

	if input_vector.length() < zona_muerta:
		return

	# Dirección basada hacia dónde mira la cámara (headset), no el mando
	var forward: Vector3 = -camera.global_transform.basis.z
	var right: Vector3 = camera.global_transform.basis.x
	forward.y = 0
	right.y = 0
	forward = forward.normalized()
	right = right.normalized()

	var direccion: Vector3 = (forward * input_vector.y) + (right * input_vector.x)
	xr_origin.global_position += direccion * velocidad * delta
