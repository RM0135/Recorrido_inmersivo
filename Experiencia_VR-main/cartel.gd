extends Node3D
 
@export_multiline var texto_info: String = "Aquí va la información de este punto de la ciénaga."
@export var foto_info: Texture2D  # arrastra la imagen en el Inspector
 
@onready var panel_info: Node3D = $PanelInfo
@onready var label: Label = $PanelInfo/SubViewport/Control/Label
@onready var textura_rect: TextureRect = $PanelInfo/SubViewport/Control/TextureRect
@onready var zona: Area3D = $ZonaDeteccion
 
func _ready() -> void:
	panel_info.visible = false
	label.text = texto_info
	if foto_info:
		textura_rect.texture = foto_info
	zona.area_entered.connect(_on_area_entered)
	zona.area_exited.connect(_on_area_exited)
 
func _on_area_entered(area: Area3D) -> void:
	if area.name == "AreaJugador":
		InfoManager.registrar_cartel_cercano(self)
 
func _on_area_exited(area: Area3D) -> void:
	if area.name == "AreaJugador":
		InfoManager.quitar_cartel_cercano(self)
		ocultar_panel()
 
func mostrar_panel() -> void:
	panel_info.visible = true
 
func ocultar_panel() -> void:
	panel_info.visible = false
 
