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
