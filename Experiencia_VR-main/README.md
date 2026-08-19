<p align="center">
  <img src="icon.svg" width="120" alt="Metaquest logo">
</p>

<h1 align="center">Metaquest</h1>

<p align="center">
  Visor panorámico 360° en realidad virtual — Godot 4.7 + OpenXR
</p>

<p align="center">
  <a href="https://github.com/epimient/Experiencia_VR/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Licencia MIT">
  </a>
  <img src="https://img.shields.io/badge/Godot-4.7-478cbf.svg" alt="Godot 4.7">
  <img src="https://img.shields.io/badge/OpenXR-1.1-9b59b6.svg" alt="OpenXR 1.1">
</p>

---

## Acerca del proyecto

Metaquest es una aplicación de realidad virtual construida con **Godot Engine 4.7** que permite explorar imágenes panorámicas 360° inmersivamente. El usuario se ubica dentro de una esfera texturizada con una imagen equirectangular y puede mirar libremente en todas las direcciones utilizando un headset VR o una cámara de escritorio con mouse.

El proyecto está diseñado como base extensible para experiencias de visualización inmersiva: recorridos virtuales, presentaciones 360°, visualización de entornos, entre otros usos.

---

## Funcionalidades

- **Visualización panorámica 360°** — Esfera con textura albedo e iluminación flat, optimizada para panoramicos
- **OpenXR nativo** — Inicialización automática del headset con desactivación de VSync para bajo latencia
- **Tracking de manos y controladores** — Soporte para poses de mano (aim, grip, palm) y seguimiento corporal
- **Cámara de escritorio** — Modo fallback con control orbital por mouse para testing sin hardware VR
- **Multi-dispositivo** — Perfiles de interacción para Oculus Touch, Pico 4, controladores genéricos e interacción manual (hand tracking)
- **Shaders en XR** — Soporte de shaders habilitado para efectos visuales en realidad virtual

---

## Compatibilidad

| Dispositivo | Estado |
|---|---|
| Meta Quest 2 / 3 / Pro | Soportado |
| Pico 4 | Soportado |
| SteamVR (HTC, Valve Index, etc.) | Soportado |
| Escritorio (sin VR) | Soportado |
| Hand tracking | Soportado |

---

## Requisitos

- **Godot Engine 4.7** o superior — [Descargar](https://godotengine.org/download)
- **Sistema operativo** — Windows 10+, Linux, macOS
- **Para VR:** Dispositivo compatible con OpenXR y drivers actualizados
- **Para escritorio:** Sin requisitos adicionales

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/epimient/Experiencia_VR.git

# Abrir con Godot Engine 4.7
# File > Import > seleccionar la carpeta del proyecto
```

O descarga el ZIP desde GitHub y abre la carpeta directamente en Godot.

---

## Uso

### Con headset VR

1. Conecta tu headset y asegúrate de que OpenXR esté activo en tu sistema
2. Abre el proyecto en Godot 4.7
3. Presiona **F5** o el botón **Play**
4. El visor panorámico se carga automáticamente en tu headset
5. Gira la cabeza para explorar la imagen 360°

### Sin headset (modo escritorio)

1. Abre el proyecto en Godot 4.7
2. Presiona **F5** o el botón **Play**
3. El cursor se captura automáticamente
4. Mueve el mouse para rotar la vista
5. Presiona **Esc** para liberar el cursor

---

## Estructura del proyecto

```
metaquest/
├── main.gd                    # Script principal: inicialización OpenXR y configuración del viewport XR
├── openxr_action_map.tres     # Mapa de acciones OpenXR (trigger, grip, thumbstick, poses, haptic)
├── P001.png                   # Textura panorámica equirectangular 360°
├── icon.svg                   # Icono del proyecto
├── project.godot              # Configuración general de Godot
├── script/
│   ├── main.tscn              # Escena principal
│   └── desktop_camera.gd      # Cámara orbital de escritorio con sensibilidad configurable
├── .editorconfig              # Configuración de editor
├── .gitignore                 # Archivos excluidos del repositorio
└── README.md                  # Este archivo
```

---

## Arquitectura de la escena

```
Main (Node3D) ← main.gd
├── XROrigin3D
│   ├── XRCamera3D             # Cámara VR (headset)
│   ├── LeftHand (XRController3D)   # Controlador izquierdo
│   └── RightHand (XRController3D)  # Controlador derecho
├── Panoramica360 (Node3D)
│   └── MeshInstance3D         # Esfera con textura panorámica
│       ├── SphereMesh (radio: 10, altura: 20)
│       └── StandardMaterial3D (cull_mode: back, shading: unshaded)
└── DesktopCamera (Camera3D)   # Cámara fallback ← desktop_camera.gd
```

---

## Configuración del motor

| Parámetro | Valor | Descripción |
|---|---|---|
| `config_version` | 5 | Formato Godot 4.x |
| `renderer` | GL Compatibility | Amplio soporte de hardware |
| `physics_engine` | Jolt Physics | Motor de física de alto rendimiento |
| `openxr/enabled` | true | OpenXR activado |
| `shaders/enabled` | true | Shaders habilitados en XR |
| `window/stretch/mode` | canvas_items | Escalado de UI |
| `window/stretch/aspect` | expand | Expansión de viewport |

---

## Controles OpenXR

### Oculus Touch / Pico 4

| Acción | Botón |
|---|---|
| Trigger | Gatillo índice |
| Grip | Gatillo agarre |
| Primary (joystick) | Thumbstick |
| A/X button | Botón frontal inferior |
| B/Y button | Botón frontal superior |
| Menu | Botón de menú |

### Hand Tracking

| Acción | Gesto |
|---||---|
| Trigger | Pinch (pulgar + índice) |
| Grip | Grasp (cerrar mano) |
| Pose | Posición de mano |

---

## Contribuir

Las contribuciones son bienvenidas. Para cambios significativos, abre un issue primero para discutir la propuesta.

```bash
# Fork del repositorio
# Crear rama para la feature
git checkout -b feature/nueva-funcionalidad

# Commit de los cambios
git commit -m "feat: agregar nueva funcionalidad"

# Push a la rama
git push origin feature/nueva-funcionalidad

# Abrir Pull Request
```

---

## Licencia

Distribuido bajo la licencia MIT. Consulta `LICENSE` para más detalles.

---

<p align="center">
  Desconstruido con Godot Engine 4.7 y OpenXR
</p>
