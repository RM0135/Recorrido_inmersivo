extends Camera3D

@export var sensitivity := 0.003


func _ready():
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED


func _unhandled_input(event):
	if event is InputEventMouseMotion:
		rotation.y -= event.relative.x * sensitivity
		rotation.x -= event.relative.y * sensitivity

		rotation.x = clamp(
			rotation.x,
			deg_to_rad(-89),
			deg_to_rad(89)
		)

	if event.is_action_pressed("ui_cancel"):
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
