<p align="center">
  <img src="Experiencia_VR-main/icon.svg" width="140" alt="Logo Recorrido Inmersivo">
</p>

<h1 align="center">Recorrido Virtual Inmersivo 360° — Ciénaga de Mallorquín</h1>

<p align="center">
  <strong>Exploración virtual inmersiva de la Ciénaga de Mallorquín mediante fotografías panorámicas 360° y realidad virtual</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Godot-4.7-478cbf.svg" alt="Godot 4.7">
  <img src="https://img.shields.io/badge/OpenXR-1.1-9b59b6.svg" alt="OpenXR 1.1">
  <img src="https://img.shields.io/badge/Plateform-Meta%20Quest-4338ca.svg" alt="Meta Quest">
  <img src="https://img.shields.io/badge/Based_on-360%C2%B0%20Panoramas-16a34a.svg" alt="Panoramas 360">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Licencia MIT">
</p>

---

## 📋 Tabla de contenido

- [Descripción del proyecto](#-descripción-del-proyecto)
- [Objetivos](#-objetivos)
- [¿Cómo funciona?](#-cómo-funciona)
- [Características](#-características)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Imágenes del recorrido](#-imágenes-del-recorrido)
- [Documentación](#-documentación)
- [Roadmap](#-roadmap)
- [Criterios de aceptación](#-criterios-de-aceptación)
- [Entregables](#-entregables)
- [Fuera del alcance inicial](#-fuera-del-alcance-inicial)
- [Ampliaciones futuras](#-ampliaciones-futuras)
- [Licencia](#-licencia)

---

## 🌿 Descripción del proyecto

Este proyecto tiene como propósito diseñar y desarrollar una **experiencia de recorrido virtual inmersivo** que permita a los usuarios explorar de manera visual e interactiva un trayecto previamente definido dentro de la **Ciénaga de Mallorquín** (Barranquilla, Colombia) mediante dispositivos **Meta Quest**.

La experiencia se construye a partir de **fotografías panorámicas de 360°** capturadas secuencialmente a lo largo de una ruta física. Cada fotografía representa un punto específico del recorrido y permite al usuario observar libremente su entorno en todas las direcciones mediante el movimiento natural de la cabeza.

La navegación entre puntos se realiza de **forma secuencial** (avanzar/retroceder), siguiendo un modelo de interacción similar al de **Google Street View**.

La aplicación se desarrolla con el motor gráfico **Godot Engine 4.7** y tecnologías compatibles con **OpenXR**, permitiendo su ejecución directamente en dispositivos **Meta Quest**.

> **Estado actual:** Prototipo de prueba de concepto (MVP) — visualización 360° funcional, pendiente la navegación secuencial entre panoramas.

---

## 🎯 Objetivos

### Objetivo general

Desarrollar un prototipo funcional de recorrido virtual inmersivo basado en fotografías panorámicas de 360° que permita explorar de manera secuencial un trayecto de la Ciénaga de Mallorquín mediante dispositivos Meta Quest.

### Objetivos específicos

1. **Caracterizar** y definir el recorrido físico, estableciendo puntos de captura, distancias, orientación y condiciones necesarias para la adquisición de fotografías panorámicas.
2. **Diseñar** la arquitectura técnica y de interacción de la experiencia virtual, definiendo la organización de los panoramas, mecanismos de navegación, estructura de datos y comportamiento de los controles.
3. **Desarrollar e integrar** el prototipo funcional utilizando Godot y OpenXR, incorporando las fotografías panorámicas 360°, navegación secuencial y elementos básicos de interacción.
4. **Evaluar** el funcionamiento y la experiencia de usuario dentro de dispositivos Meta Quest, verificando calidad visual, orientación, navegación, rendimiento y comodidad.

---

## 🕹️ ¿Cómo funciona?

La experiencia funciona de la siguiente manera:

```
Punto 001 → Punto 002 → Punto 003 → Punto 004 → … → Punto final
```

- Cada **punto** corresponde a una **fotografía panorámica 360°** tomada físicamente sobre el recorrido.
- El usuario se ubica **virtualmente en el centro** de cada panorama.
- Puede **mirar libremente** alrededor mediante el movimiento natural de la cabeza.
- Para **avanzar o retroceder**, utiliza los controles del dispositivo.

**Conceptualización:**

| Acción | Descripción |
|---|---|
| 👀 Mirar libremente | La rotación de la cabeza permite observar el panorama completo de 360° |
| ⏩ Avanzar | Mediante el controlador se carga la siguiente fotografía de la ruta |
| ⏪ Retroceder | Mediante el controlador se regresa al panorama anterior |

La navegación permanece **restringida a la ruta previamente establecida**. No se contempla desplazamiento libre lateral ni caminata continua dentro del escenario — esta decisión reduce la complejidad de desarrollo y disminuye el riesgo de mareo en realidad virtual.

**¿Por qué fotografías 360° y no modelado 3D?**

Usar fotografías panorámicas equirectangulares representa una alternativa técnicamente viable y de menor complejidad frente a procesos como fotogrametría avanzada, escaneo LiDAR o reconstrucción tridimensional completa del entorno. Cada panorama es una sola imagen mapeada al interior de una esfera — un solo mesh, un solo draw call, resultado foto-realista. Ver [docs/05-imagenes-360-equirectangulares.md](docs/05-imagenes-360-equirectangulares.md).

---

## ✨ Características

### Implementadas

- ✅ **Visualización panorámica 360°** — Esfera texturizada con imagen equirectangular, renderizado interior
- ✅ **OpenXR nativo** — Inicialización automática del headset con desactivación de VSync para baja latencia
- ✅ **Tracking de manos y controladores** — Poses de mano (aim, grip, palm) y seguimiento
- ✅ **Snap turning** — Giro de 45° con el thumbstick derecho para comodidad
- ✅ **Carteles de información** — Paneles con imagen y texto (SubViewport + billboard)
- ✅ **Marcadores flotantes** — Puntos de interés animados (flotación senoidal)
- ✅ **Modo escritorio** — Cámara orbital con mouse para testing sin hardware VR
- ✅ **Multi-dispositivo** — Perfiles de interacción para Oculus Touch, Pico 4, genéricos y hand tracking
- ✅ **APK compilado** — `Experiencia_VR-main/Metaquest.apk` listo para sideload

### En desarrollo / Planificadas

- 🔄 Navegación secuencial entre panoramas (avanzar/retroceder)
- 🔄 Gestor de recorrido (datos de puntos, JSON/CSV)
- 🔄 Sistema de transiciones (fundido a negro, crossfade)
- 🔄 Carga asíncrona y precacheo de panoramas
- 🔄 Estructura de datos de los puntos del recorrido

---

## 📋 Requisitos

| Componente | Requisito |
|---|---|
| **Godot Engine** | 4.7 o superior ([Descargar](https://godotengine.org/download)) |
| **Sistema operativo** | Windows 10+, Linux, macOS |
| **Para VR** | Dispositivo Meta Quest 2/3/Pro (o compatible con OpenXR) |
| **Para escritorio** | Sin requisitos adicionales |
| **Para exportar APK** | OpenJDK 17, Android Studio, platform-tools 35+ |

---

## 🚀 Instalación

### Opción 1: Clonar y abrir

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Abrir con Godot Engine 4.7
# En Godot: File > Import > seleccionar Experiencia_VR-main/
```

### Opción 2: Instalar en Meta Quest (APK)

```bash
# Habilitar Developer Mode en el Quest (app móvil Meta Quest)

# Conectar Quest por USB y verificar
adb devices

# Instalar el APK
adb install Experiencia_VR-main/Metaquest.apk
```

---

## ▶️ Uso

### Con headset VR (Meta Quest)

1. Coloca el headset y asegúrate de que OpenXR esté activo
2. Abre el proyecto en Godot 4.7 con el Quest conectado
3. Presiona **F5** (Play) para ejecutar directamente en el headset
4. Gira la cabeza para explorar la imagen 360°
5. Usa los controladores para navegar

### Sin headset (modo escritorio)

1. Abre el proyecto en Godot 4.7
2. Presiona **F5** o el botón **Play**
3. El cursor se captura automáticamente
4. Mueve el mouse para rotar la vista
5. Presiona **Esc** para liberar el cursor

### Controles

| Acción | Controlador | Botón |
|---|---|---|
| Mirar alrededor | — | Movimiento de cabeza |
| Movimiento libre (prototipo) | Izquierdo | Thumbstick |
| Snap turning (45°) | Derecho | Thumbstick izquierda/derecha |
| Mostrar información | Derecho | Botón A/X |
| Ocultar información | Derecho | Botón B/Y |

> **Nota:** Para la versión final, la navegación será secuencial (A/X = avanzar, B/Y = retroceder) y el movimiento libre será deshabilitado.

---

## 📁 Estructura del proyecto

```
Recorrido_inmersivo/
├── README.md                        # Este documento
├── docs/                            # Documentación técnica
│   ├── 01-arquitectura-del-proyecto.md
│   ├── 02-guia-godot.md
│   ├── 03-guia-gdscript.md
│   ├── 04-guia-openxr.md
│   ├── 05-imagenes-360-equirectangulares.md
│   ├── 06-meta-quest-desarrollo.md
│   ├── 07-guia-captura-fotografica.md
│   ├── 08-prototipo-mvp.md
│   └── 09-recurso-imagenes.md
└── Experiencia_VR-main/             # Proyecto Godot
    ├── project.godot                # Configuración del proyecto
    ├── main.gd                      # Inicialización OpenXR
    ├── cartel.gd                    # Cartel de información
    ├── openxr_action_map.tres       # Mapa de acciones OpenXR (23 acciones, 4 perfiles)
    ├── P001.png                     # Panorama equirectangular de prueba
    ├── icon.svg                     # Icono del proyecto
    ├── script/
    │   ├── main.tscn                # Escena principal
    │   ├── cartel.tscn              # Escena del cartel de info
    │   ├── desktop_camera.gd        # Cámara orbital de escritorio
    │   ├── info_manager.gd          # Gestor de información (autoload)
    │   ├── left_hand.gd             # Controlador izquierdo (movimiento)
    │   ├── right_hand.gd            # Controlador derecho (giro + info)
    │   └── marcador.gd              # Marcador flotante
    ├── addons/godotopenxrvendors/   # Plugin OpenXR Vendors v5.1.0
    ├── Metaquest.apk                # APK compilado (sideload)
    └── Metaquest.apk.idsig          # Firma del APK
```

---

## 🖼️ Imágenes del recorrido

Las fotografías panorámicas 360° del recorrido de la Ciénaga de Mallorquín se encuentran disponibles en Google Drive:

**📁 [Google Drive — Imágenes del Recorrido](https://drive.google.com/drive/folders/17wWK6M_h6iVxvlVn6GVAF2Asyxhpaphb?usp=drive_link)**

Se espera que el repositorio contenga tres niveles de imágenes:

| Carpeta | Descripción |
|---|---|
| **Originales/** | Archivos obtenidos directamente desde la cámara en máxima calidad |
| **Procesadas/** | Archivos corregidos y preparados para la aplicación |
| **Quest/** | Versiones optimizadas para ejecución en el dispositivo Meta Quest |

> **Nota:** El enlace puede requerir permisos de acceso. Más detalles en [docs/09-recurso-imagenes.md](docs/09-recurso-imagenes.md).

---

## 📚 Documentación

La documentación técnica completa del proyecto se encuentra en la carpeta [`docs/`](docs/):

| Documento | Descripción |
|---|---|
| [01 — Arquitectura del proyecto](docs/01-arquitectura-del-proyecto.md) | Estructura del sistema, estado actual vs visión final, diagramas |
| [02 — Guía de Godot](docs/02-guia-godot.md) | Qué es Godot, escenas/nodos, renderers, exportación |
| [03 — Guía de GDScript](docs/03-guia-gdscript.md) | Lenguaje GDScript, tipos, señales, ciclos de vida, ejemplos |
| [04 — Guía de OpenXR](docs/04-guia-openxr.md) | Estandar OpenXR, integración en Godot, action maps, perfiles |
| [05 — Imágenes 360 equirectangulares](docs/05-imagenes-360-equirectangulares.md) | Proyección equirectangular, por qué 2:1, esferas, resolución, formatos |
| [06 — Desarrollo Meta Quest](docs/06-meta-quest-desarrollo.md) | Specs de Quest, rendimiento, sideload, mejores prácticas |
| [07 — Guía de captura fotográfica](docs/07-guia-captura-fotografica.md) | Protocolo de captura, registro de campo, procesamiento |
| [08 — Prototipo MVP](docs/08-prototipo-mvp.md) | Estado actual, roadmap, tareas pendientes, riesgos |
| [09 — Recurso de imágenes](docs/09-recurso-imagenes.md) | Enlace al Drive, estructura de carpetas, formatos |

---

## 🗺️ Roadmap

```
Fase 1: Exploración y caracterización     ⬜ En curso
Fase 2: Diseño                            ⬜ Pendiente
Fase 3: Desarrollo e integración          ⬜ Pendiente
Fase 4: Evaluación y validación           ⬜ Pendiente
```

**Siguientes acciones prioritarias:**

1. Implementar el gestor de recorrido (`recorrido.gd`)
2. Implementar navegación secuencial (avanzar/retroceder)
3. Implementar transición fundido a negro entre panoramas
4. Obtener las imágenes reales del recorrido (Google Drive)
5. Configurar `export_presets.cfg` para Meta Quest

Detalles completos en [docs/08-prototipo-mvp.md](docs/08-prototipo-mvp.md).

---

## ✅ Criterios de aceptación

El proyecto se considerará técnicamente satisfactorio cuando:

- [ ] La aplicación pueda instalarse y ejecutarse correctamente en un dispositivo Meta Quest
- [ ] Las fotografías panorámicas puedan visualizarse correctamente en 360°
- [ ] El usuario pueda mirar libremente alrededor
- [ ] Sea posible avanzar y retroceder dentro del recorrido
- [ ] Las fotografías mantengan una orientación visual consistente
- [ ] Las transiciones no produzcan errores gráficos importantes
- [ ] La aplicación mantenga un desempeño estable
- [ ] La estructura permita incorporar nuevas fotografías sin modificar completamente el sistema
- [ ] La información asociada a cada punto se encuentre correctamente registrada y organizada

---

## 📦 Entregables

1. **Aplicación de recorrido virtual** — Aplicación funcional en Godot lista para Meta Quest
2. **Recorrido virtual 360°** — Ruta digital con las fotografías panorámicas conectadas secuencialmente
3. **Banco organizado de fotografías** — Originales, procesadas y optimizadas para Quest
4. **Base de datos / registro de puntos** — Archivo CSV/JSON con coordenadas, distancias, orientación
5. **Código fuente** — Proyecto completo: escenas, scripts, recursos, configuración XR
6. **Archivo instalable** — APK para pruebas o instalación local en Meta Quest
7. **Protocolo de captura** — Documento operativo ([docs/07](docs/07-guia-captura-fotografica.md))
8. **Documento técnico** — Arquitectura y estructura del proyecto ([docs/01](docs/01-arquitectura-del-proyecto.md))
9. **Informe de pruebas** — Resultados, problemas, correcciones y recomendaciones

---

## 🚫 Fuera del alcance inicial

Para mantener controlada la complejidad, la primera versión **no** contempla:

- Reconstrucción tridimensional completa de la Ciénaga de Mallorquín
- Fotogrametría integral del entorno
- Escaneo LiDAR
- Movimiento libre en seis grados de libertad
- Representación volumétrica (Gaussian Splatting o NeRF)
- Interacción física avanzada con objetos
- Personajes virtuales / simulaciones ambientales
- Multijugador
- Conexión permanente a Internet
- Publicación inicial en la Meta Store

---

## 🔮 Ampliaciones futuras

Una vez validado el recorrido básico, la plataforma podrá evolucionar incorporando:

- Puntos de información ambiental y educación ambiental
- Identificación de especies (flora/fauna)
- Textos educativos y narraciones de audio
- Fotografías complementarias y videos
- Mapas del recorrido e indicadores de ubicación
- Modelos tridimensionales y cuestionarios educativos
- Rutas alternativas y recorridos temáticos
- Integración con información geográfica
- Registro de interacción del usuario
- Experiencias guiadas

*Ejemplo:* un usuario podría observar una especie vegetal y seleccionar un punto informativo para consultar su nombre, características o importancia dentro del ecosistema.

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Consulta `LICENSE` para más detalles.

---

<p align="center">
  <sub>Desarrollado con Godot Engine 4.7, OpenXR 1.1 y fotografías panorámicas 360°</sub>
</p>
<p align="center">
  <sub>Ciénaga de Mallorquín — Barranquilla, Colombia</sub>
</p>