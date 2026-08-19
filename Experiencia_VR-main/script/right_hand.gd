extends XRController3D

@export var angulo_snap := 45.0
@export var umbral_activacion := 0.6

@onready var xr_origin: XROrigin3D = get_parent()
@onready var camera: XRCamera3D = xr_origin.get_node("XRCamera3D")

var puede_girar := true

func _ready() -> void:
	button_pressed.connect(_on_button_pressed)

func _physics_process(_delta: float) -> void:
	var input_vector: Vector2 = get_vector2("primary")

	if abs(input_vector.x) > umbral_activacion and puede_girar:
		var direccion: float = sign(input_vector.x)
		_girar(deg_to_rad(angulo_snap * direccion))
		puede_girar = false
	elif abs(input_vector.x) < 0.3:
		puede_girar = true

func _girar(angulo: float) -> void:
	var pos_cabeza: Vector3 = camera.global_position
	xr_origin.global_position = (xr_origin.global_position - pos_cabeza).rotated(Vector3.UP, angulo) + pos_cabeza
	xr_origin.rotate_y(angulo)

func _on_button_pressed(nombre_boton: String) -> void:
	match nombre_boton:
		"ax_button":
			InfoManager.mostrar_info()
		"by_button":
			InfoManager.ocultar_info()
