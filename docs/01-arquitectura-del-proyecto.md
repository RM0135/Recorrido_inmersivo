# Arquitectura del Proyecto

## Recorrido Virtual Inmersivo 360 de la Cienaga de Mallorquin

---

## 1. Vision general

Este documento describe la arquitectura tecnica del proyecto: una experiencia de recorrido virtual inmersivo basado en fotografias panoramicas 360 para la exploracion de la Cienaga de Mallorquin mediante dispositivos Meta Quest.

### Pilares tecnologicos

| Pilar | Tecnologia | Rol |
|---|---|---|
| **Motor grafico** | Godot Engine 4.7 | Motor de desarrollo multiplataforma open-source |
| **Interfaz XR** | OpenXR 1.1 | Estandar abierto para realidad virtual |
| **Dispositivo objetivo** | Meta Quest 2/3/Pro | Headset autonomo con runtime OpenXR |
| **Contenido** | Fotografias equirectangulares 2:1 | Representacion visual de cada punto del recorrido |
| **Lenguaje** | GDScript | Lenguaje de scripting del motor |

### Concepto de funcionamiento

```
Punto 001 → Punto 002 → Punto 003 → ... → Punto final
```

Cada punto corresponde a una fotografia panoramica 360 tomada fisicamente sobre el recorrido. El usuario puede mirar libremente alrededor mientras permanece ubicado virtualmente en el centro de cada panorama. La navegacion es secuencial (avanzar/retroceder).

---

## 2. Estado actual

### Lo implementado

La version actual es un **prototipo de prueba de concepto** que valida:

- Visualizacion de fotografias 360 en realidad virtual
- Esfera texturizada para renderizado interior
- Tracking de manos y controladores via OpenXR
- Movimiento libre (thumbstick izquierdo) y giro por snap (thumbstick derecho)
- Carteles interactivos de informacion con imagen y texto
- Modo escritorio con camara orbital

### Componentes actuales

| Componente | Archivo | Funcion |
|---|---|---|
| Inicializacion OpenXR | `main.gd` | Buscar interfaz OpenXR, desactivar VSync, habilitar XR |
| Visualizador panoramico | `main.tscn` | 3 esferas con textura P001.png (prueba) |
| Movimiento | `left_hand.gd` | Locomocion suave con thumbstick izquierdo |
| Giro | `right_hand.gd` | Snap turning 45 con thumbstick derecho |
| Carteles | `cartel.tscn` + `cartel.gd` | Paneles de informacion con imagen y texto |
| Marcador flotante | `marcador.gd` | Esfera verde flotante que senala puntos de interes |
| Gestor de informacion | `info_manager.gd` | Autoload que gestiona el cartel activo |
| Camara escritorio | `desktop_camera.gd` | Control orbital por mouse para testing |
| Action map OpenXR | `openxr_action_map.tres` | 23 acciones, 4 perfiles de interaccion |
| Plugin vendors | `addons/godotopenxrvendors/` | Extensiones OpenXR especificas de vendedores |

### Estructura de la escena principal

```
Main (Node3D) ← main.gd
├── XROrigin3D
│   ├── XRCamera3D
│   │   └── AreaJugador (Area3D)          # Deteccion de proximidad
│   │       └── CollisionShape3D           # SphereShape3D (radio 2.5)
│   ├── LeftHand (XRController3D)          # ← left_hand.gd
│   └── RightHand (XRController3D)         # ← right_hand.gd
├── Panoramica360 (Node3D)
│   ├── Cartel (instancia)                 # Panel de info en posicion fija
│   ├── MeshInstance3D                     # Esfera panoramica (origen)
│   ├── MeshInstance3D2                    # Esfera panoramica (pos. 2)
│   └── MeshInstance3D3                    # Esfera panoramica (pos. 3)
└── DesktopCamera (Camera3D)               # ← desktop_camera.gd
```

### Limitaciones del estado actual

- No hay navegacion secuencial entre panoramas
- Las 3 esferas muestran la misma textura (P001.png)
- No hay gestor de recorrido ni estructura de datos de puntos
- No hay sistema de transiciones (fade, crossfade)
- No hay export_presets.cfg configurado
- El movimiento libre (thumbstick) contradice el diseno de navegacion secuencial

---

## 3. Arquitectura objetivo (vision final)

### Componentes del sistema

```
┌─────────────────────────────────────────────────────────┐
│                     APLICACION GAMEOT                    │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ SISTEMA XR   │  │   GESTOR DE  │  │  VISOR       │  │
│  │ (OpenXR)     │  │  RECORRIDO   │  │  PANORAMICO  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                 │           │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐  │
│  │ XROrigin3D   │  │  NAVEGACION  │  │  ESFERA      │  │
│  │ + XRCamera3D │  │  (avanzar/   │  │  360         │  │
│  │ + Controller │  │   retroceder)│  │  + Material  │  │
│  └──────────────┘  └──────┬───────┘  └──────────────┘  │
│                           │                              │
│                 ┌─────────┴─────────┐                    │
│                 │  ESTRUCTURA       │                    │
│                 │  DE DATOS DE     │                     │
│                 │  PUNTOS (JSON)   │                     │
│                 └───────────────────┘                    │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ SISTEMA DE   │  │  CARGA DE    │  │ SISTEMA DE   │   │
│  │ TRANSICIONES │  │  IMAGENES    │  │ tONTROLES    │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Modulos planificados

#### 3.1 Sistema XR
- Inicializacion de OpenXR (ya implementada en `main.gd`)
- Configuracion del viewport para uso XR
- Tracking de cabeza y controladores
- Incluye modo escritorio de fallback

#### 3.2 Gestor del recorrido
- Autoload que gestiona el estado del recorrido
- Conoce la lista de panoramas y el indice actual
- Expone metodos: `avanzar()`, `retroceder()`, `ir_a_punto(indice)`
- Emite senales cuando cambia el panorama

```gdscript
# Estructura propuesta
signal panorama_cambiado(indice_actual: int, nombre_panorama: String)

var puntos: Array[Dictionary] = [
    {"id": "P001", "archivo": "res://panoramas/P001.jpg", "nombre": "Inicio"},
    {"id": "P002", "archivo": "res://panoramas/P002.jpg", "nombre": "Manglar"},
    ...
]
var indice_actual: int = 0

func avanzar() -> void:
    if indice_actual < puntos.size() - 1:
        indice_actual += 1
        cargar_panorama(puntos[indice_actual])
        panorama_cambiado.emit(indice_actual, puntos[indice_actual]["nombre"])

func retroceder() -> void:
    if indice_actual > 0:
        indice_actual -= 1
        cargar_panorama(puntos[indice_actual])
        panorama_cambiado.emit(indice_actual, puntos[indice_actual]["nombre"])
```

#### 3.3 Visor panoramico (esfera 360)
- Esfera con material optimizado (`cull_mode = 1`, `shading_mode = 0`)
- Radio y tamano ajustados a la escala del recorrido actual
- Metodo para cambiar la textura del panorama

```gdscript
func cargar_panorama(textura_panorama: Texture2D) -> void:
    material.albedo_texture = textura_panorama
```

#### 3.4 Sistema de carga de imagenes
- Cargar texturas desde `res://panoramas/` o `user://` (para contenido dinamico)
- Carga asincrona para evitar congelamientos
- Precacheo del siguiente panorama durante la visualizacion
- Gestion de memoria (descargar panoramas no visibles)

#### 3.5 Sistema de navegacion
- Solo secuencial: avanzar y retroceder
- Controles: botones A/X = avanzar, B/Y = retroceder
- LOS MOVIMIENTOS del thumbstick derecho pasan a girar al usuario alrededor de la esfera
- Deshabilitar el movimiento libre del thumbstick izquierdo (contradice el diseno)

#### 3.6 Sistema de transicion entre panoramas
Para evitar cambios visuales bruscos:

| Tecnica | Descripcion | Complejidad |
|---|---|---|
| **Fundido a negro** | Fade out → cambiar panorama → fade in | Baja |
| **Fundido cruzado** | Nueva imagen se mezcla con la anterior | Media |
| **Reduccion de brillo** | Bajar brillo → cambiar → subir | Baja |
| **Transicion progresiva** | Movimiento/zoom entre panoramas | Alta |

Recomendado inicialmente: **fundido a negro** (simple y eficaz para VR).

```gdscript
func transicion_a_panorama(nueva_textura: Texture2D) -> void:
    # Fade a negro
    await fade_out(0.3)
    # Cambiar panorama
    visor.cargar_panorama(nueva_textura)
    # Fade desde negro
    await fade_in(0.3)
```

#### 3.7 Estructura de datos de los puntos
La informacion de cada punto se almacena en un archivo estructurado:

```json
{
    "recorrido": "Cienaga de Mallorquin",
    "puntos": [
        {
            "id": "P001",
            "archivo": "P001.jpg",
            "latitud": 11.0345,
            "longitud": -74.7823,
            "distancia_desde_anterior": 0,
            "observaciones": "Punto inicial",
            "siguiente": "P002",
            "anterior": null
        },
        {
            "id": "P002",
            "archivo": "P002.jpg",
            "latitud": 11.0348,
            "longitud": -74.7820,
            "distancia_desde_anterior": 4.2,
            "observaciones": "Zona de manglar",
            "siguiente": "P003",
            "anterior": "P001"
        }
    ]
}
```

---

## 4. Flujo de navegacion

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  P001    │────▶│  P002    │────▶│  P003    │────▶│  P004    │
│ (inicio) │◀────│          │◀────│          │◀────│ (fin)    │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
   ▲  ▲             ▲  ▲             ▲  ▲
   │  └─ Transicion │  └─ Transicion │  └─ ...
   │                │                │
   └──── Menos      └──── Menos      └──── ...
```

- **Avanzar:** Carga el panorama siguiente en la lista
- **Retroceder:** Carga el panorama anterior
- **Sin movimiento libre:** No hay desplazamiento continuo dentro del escenario

---

## 5. Decisiones de diseno

| Decision | Razon |
|---|---|
| Fotografia 360 en lugar de modelado 3D | Menor complejidad, altamente realista |
| Navegacion secuencial (Street View-like) | Simplicidad y menor riesgo de mareo |
| Sin movimiento libre | El desplazamiento artificial reduce mareo |
| Esfera en lugar de cubo | Un solo mesh, un solo draw call |
| JPG comprimido para Quest | Balance calidad/tamano |
| Godot + OpenXR | Open-source, estandar abierto, multiplataforma |
| Transiciones fundido | Evitar cambios visuales bruscos |
| Fotos con separacion 3-5 m | Fluidez visual al avanzar |

---

## 6. Stack tecnologico completo

| Capa | Tecnologia |
|---|---|
| **Aplicacion** | Godot Engine 4.7 |
| **Lenguaje** | GDScript |
| **Render** | GL Compatibility (actual) / Mobile Vulkan (objetivo) |
| **Fisica** | Jolt Physics |
| **XR** | OpenXR 1.1 (nativo en Godot) |
| **Plugin XR** | Godot OpenXR Vendors v5.1.0 |
| **Dispositivo** | Meta Quest 2/3/Pro |
| **Contenido** | Imagenes equirectangulares 2:1 (JPG 4096x2048) |
| **Datos de puntos** | JSON o CSV |
| **Exportacion** | Android APK (gradle build, ASTC) |