# Prototipo MVP — Estado y Roadmap

## Recorrido Virtual Inmersivo 360 de la Cienaga de Mallorquin

---

## 1. Estado actual del proyecto

El proyecto se encuentra en **fase de prototipo de prueba de concepto**. La version actual valida las tecnologias base pero NO implementa aun la navegacion secuencial entre panoramas.

### Repositorio

- **Ubicacion:** `/Recorrido_inmersivo/Experiencia_VR-main`
- **Motor:** Godot Engine 4.7
- **Nombre del proyecto:** Metaquest
- **APK compilado:** `Metaquest.apk` (86.8 MB)

### Que esta implementado

| Funcionalidad | Estado | Detalle |
|---|---|---|
| Visualizacion panorama 360 | ✅ Funcional | Esfera texturizada con `cull_mode = 1` (interior) |
| Inicializacion OpenXR | ✅ Funcional | `main.gd` — desactiva VSync, habilita XR |
| Tracking de manos | ✅ Funcional | 4 perfiles de interaccion (incl. hand tracking) |
| Movimiento libre | ✅ Funcional | Thumbstick izquierdo (left_hand.gd) |
| Snap turning | ✅ Funcional | Thumbstick derecho, 45 grados (right_hand.gd) |
| Carteles de informacion | ✅ Funcional | Panel con imagen + texto via SubViewport |
| Marcador flotante | ✅ Funcional | Esfera verde con animacion seno |
| Modo escritorio | ✅ Funcional | Camara orbital con mouse (fallback) |
| Navegacion secuencial | ❌ No implementada | Gestionada por el gestor del recorrido (pendiente) |
| Gestor de panoramas | ❌ No implementada | Autoload pendiente |
| Transiciones entre fotos | ❌ No implementada | Fundido a negro pendiente |
| Estructura de datos de puntos | ❌ No implementada | JSON/CSV pendiente |
| Mapa de acciones OpenXR | ✅ Funcional | 23 acciones, 4 perfiles |

### Escena de prueba

La escena principal contiene **3 esferas** con la misma textura (`P001.png`) colocadas en posiciones diferentes como prueba de concepto:

| Esfera | Posicion |
|---|---|
| MeshInstance3D | Origen (0, 0, 0) |
| MeshInstance3D2 | (42.59, -2.45, -27.03) |
| MeshInstance3D3 | (83.18, -6.87, -58.99) |

Este arreglo demuestra que el material panoramico funciona pero NO representa un recorrido real.

---

## 2. Arquitectura de archivos actual

```
Experiencia_VR-main/
├── project.godot              # Configuracion del proyecto
├── main.gd                    # Inicializacion OpenXR
├── cartel.gd                  # Script del cartel de info
├── openxr_action_map.tres     # Action map OpenXR
├── P001.png                   # Panorama de prueba
├── icon.svg                   # Icono
├── script/
│   ├── main.tscn              # Escena principal
│   ├── cartel.tscn            # Escena del cartel
│   ├── desktop_camera.gd      # Camara escritorio
│   ├── info_manager.gd        # Autoload InfoManager
│   ├── left_hand.gd           # Controlador izq (movimiento)
│   ├── right_hand.gd          # Controlador der (giro + info)
│   └── marcador.gd            # Marcador flotante
├── addons/godotopenxrvendors/ # Plugin XR v5.1.0
├── Metaquest.apk              # APK compilado
└── README.md                  # README original (generico)
```

---

## 3. Estado deseado del MVP

### Objetivo del MVP

El objetivo es validar con **5-6 fotografias panoramicas**:

```
P001 → P002 → P003 → P004 → P005 → P006
```

### Criterios de validacion

| Criterio | Descripcion |
|---|---|
| Visualizacion 360 | Las fotografias se ven correctamente en la esfera |
| Orientacion | Las imagenes apuntan en la direccion correcta |
| Calidad visual | No hay artefactos ni deformaciones graves |
| Navegacion adelante | El usuario puede avanzar al siguiente panorama |
| Navegacion atras | El usuario puede retroceder al anterior |
| Controles | Botones/joystick responden correctamente |
| Transiciones | Los cambios de panorama son suaves |
| Rendimiento | Sin drops de frames, estable |
| Comodidad | Sin mareo significativo |

### Archivos adicionales necesarios

```
Experiencia_VR-main/
├── recorrido.gd               # Gestor del recorrido (autoload)
├── visor_panorama.gd          # Visor panoramico con logica de cambio
├── transicion.gd              # Sistema de fundido
├── main.tscn                  # Escena principal refactorizada
│   └── PanoramicoManager      # Usa una sola esfera
├── panoramas/
│   ├── P001.jpg
│   ├── P002.jpg
│   ├── P003.jpg
│   ├── P004.jpg
│   ├── P005.jpg
│   └── P006.jpg
├── datos/
│   └── recorrido.json         # Estructura de datos de los puntos
└── export_presets.cfg         # Presets de exportacion configurados
```

---

## 4. Roadmap de desarrollo

### Fase 1: Exploracion y caracterizacion ✅ (parcial)
- [x] Reconocimiento de la zona
- [x] Seleccion de la ruta
- [ ] Medicion aproximada de distancias
- [ ] Identificacion de puntos de interes
- [ ] Definicion del protocolo de captura
- [ ] Identificacion de equipos disponibles
- [ ] Definicion de requerimientos tecnologicos
- [ ] **Producto:** Documento de caracterizacion del recorrido

### Fase 2: Diseno
- [ ] Diseno de navegacion
- [ ] Diseno de estructura de datos
- [ ] Definicion de nomenclatura
- [ ] Diseno de interaccion con controladores
- [ ] Diseno de transiciones
- [ ] Definicion de resolucion y formato de imagenes
- [ ] Configuracion inicial de Godot y OpenXR
- [ ] **Producto:** Diseno tecnico y arquitectura funcional

### Fase 3: Desarrollo e integracion
- [ ] Configuracion del proyecto Godot
- [ ] Integracion OpenXR
- [ ] Configuracion de Meta Quest
- [ ] Desarrollo del visor panoramico
- [ ] Desarrollo del gestor del recorrido
- [ ] Implementacion de navegacion
- [ ] Implementacion de controles
- [ ] Implementacion de transiciones
- [ ] Incorporacion de fotografias
- [ ] Compilacion del aplicativo
- [ ] **Producto:** Aplicacion funcional instalable en Meta Quest

### Fase 4: Evaluacion y validacion
- [ ] Estabilidad
- [ ] Calidad grafica
- [ ] Tiempo de carga
- [ ] Funcionamiento de controles
- [ ] Orientacion de panoramas
- [ ] Continuidad del recorrido
- [ ] Comodidad de navegacion
- [ ] Errores de captura
- [ ] Rendimiento general
- [ ] **Producto:** Informe de validacion y version estable

---

## 5. Tareas inmediatas propuestas

### Prioridad alta
1. **Crear gestor de recorrido** (`recorrido.gd`) como autoload
2. **Permitir solo una esfera panoramica** en la escena (quitar las esferas duplicadas)
3. **Implementar navegacion A/X = avanzar, B/Y = retroceder**
4. **Deshabilitar movimiento libre** del thumbstick izquierdo (contrario al diseno)
5. **Implementar transicion fundido a negro**
6. **Crear estructura de datos** (`recorrido.json`)
7. **Configurar export_presets.cfg**

### Prioridad media
8. **Obtener 5-6 imagenes reales del recorrido** (de Google Drive)
9. **Procesar imagenes para Quest** (4096x2048 JPG)
10. **Implementar carga asincrona de texturas**
11. **Precacheo del siguiente panorama**

### Prioridad baja
12. **Probar en Quest 3 real**
13. **Evaluar migracion a Mobile Vulkan**
14. **Testing de usuario con prueba de comodidad**
15. **Documentar con pantallas/evidencias**

---

## 6. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigacion |
|---|---|---|
| Mareo por transiciones bruscas | Alto | Transiciones con fundido, evaluar velocidad |
| Imagenes de baja calidad | Medio | Campana de captura con criterios definidos |
| Falta de imagenes reales | Alto | MVPs se puede probar con imagenes de prueba |
| Renderer Compatibility limitado | Medio | Evaluar migracion a Mobile Vulkan |
| Tiempo de carga de texturas | Medio | Carga asincrona + precacheo |
| Desorientacion del usuario | Medio | Indicador de direccion, orientacion consistente |