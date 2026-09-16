# Desarrollo para Meta Quest

## Especificaciones de dispositivos

| Especificacion | Meta Quest 3 | Meta Quest 3S | Meta Quest 2 | Meta Quest Pro |
|---|---|---|---|---|
| **Chipset** | Snapdragon XR2 Gen 2 | Snapdragon XR2 Gen 2 | Snapdragon XR2 Gen 1 | Snapdragon XR2+ Gen 1 |
| **GPU** | Adreno 740 @ 640MHz | Adreno 740 | Adreno 650 | Adreno 650 (mayor clock) |
| **RAM** | 8 GB | 8 GB | 6 GB | 12 GB |
| **Almacenamiento** | 128/512 GB | 128/256 GB | 128/256 GB | 256 GB |
| **Pantalla (por ojo)** | 2064x2208, LCD | 1832x1920, LCD | 1832x1920, LCD | 1800x1920, LCD |
| **Tasa de refresco** | 72, 80, 90, 120 Hz | 72, 80, 90, 120 Hz | 72, 80, 90, 120 Hz | Hasta 90 Hz |
| **Campo de vision** | 110H x 96V | 96H x 90V | 96H x 90V | 106H x 90V |
| **Passthrough** | Color completo, 18 PPD, sensor de profundidad | Color completo, 18 PPD | Escala de grises, baja res | Color estereoscopico, 8 PPD |
| **Tracking** | Cabeza + manos | Cabeza + manos | Cabeza + manos | Cabeza + manos + cara + ojos |
| **Rendimiento GPU** | ~2.5x Quest 2 | ~2.5x Quest 2 | Linea base | ~1.5x Quest 2 |
| **Lentes** | Pancake | Fresnel (3 posiciones IPD) | Fresnel (3 posiciones IPD) | Pancake (IPD continuo) |
| **Rango IPD** | 58-71 mm (continuo) | 3 presets | 3 presets | 55-75 mm (continuo) |

---

## Limitaciones de rendimiento

### Presupuesto de frames

| Meta | Objetivo | Tiempo por frame |
|---|---|---|
| Minimo absoluto | 72 Hz | 13.8 ms |
| Recomendado | 90 Hz | 11.1 ms |
| Alto rendimiento | 120 Hz | 8.3 ms |

> **Importante:** Las perdidas de frames en VR causan **mareos del usuario**. Mantener la tasa de frames es critico.

### Draw calls

| Dispositivo | Limite recomendado |
|---|---|
| Quest 3 | < 200 draw calls |
| Quest 2 | < 100 draw calls |

### Triangulos por frame

| Dispositivo | Limite recomendado |
|---|---|
| Quest 3 | < 1.5M triangulos |
| Quest 2 | < 750K triangulos |

### Memoria

| Dispositivo | RAM total | Reservada SO | Disponible para apps |
|---|---|---|---|
| Quest 2 | 6 GB | ~1.5-2 GB | ~4 GB |
| Quest 3/3S | 8 GB | ~2-2.5 GB | ~5.5 GB |
| Quest Pro | 12 GB | ~2-2.5 GB | ~9.5 GB |

### Memoria de texturas

- Comprimir todas las texturas usando **ASTC** (recomendado) o **ETC2**
- ASTC provee la mayor calidad visual a un nivel dado de compresion
- ETC2 puede ser ligeramente mas eficiente para samplear en la GPU

### Consideraciones de GPU

- Las GPUs Adreno moviles tienen soporte limitado para compute shaders
- Las caracteristicas del renderer Forward+ (niebla volumetrica, SDFGI, VoxelGI, reflexiones pantalla completa) no estan disponibles
- Los efectos de post-procesamiento deben ser limitados (sin bloom, AO, SSR)

---

## Mejores practicas para visualizacion 360 en Quest

### 1. Resolucion de texturas

| Resolucion | Dimensiones | Recomendacion |
|---|---|---|
| **4K** | 4096 x 2048 | Linea base recomendada por Meta |
| **5.7K** | 5760 x 2880 | Buen balance calidad/rendimiento |
| **8K** | 8192 x 4096 | Alta calidad, requiere texture slicing |

**Texture slicing:** Para panoramas de muy alta resolucion (8K+), dividir la imagen en mosaicos que quepan dentro del limite de textura de la GPU (4096x4096 en Quest) y aplicarlos a diferentes segmentos de la esfera.

### 2. Configuracion de material

```gdscript
# Material optimizado para panorama 360 en Quest
var material = StandardMaterial3D.new()
material.cull_mode = 1              # cull_front: renderiza interior
material.shading_mode = 0           # unshaded: sin iluminacion
material.albedo_texture = panorama  # Textura equirectangular
material.texture_filter = 0         # nearest o 1 (linear)
```

### 3. Rendimiento

- Usar el renderer **Mobile Vulkan** para Quest 3/3S
- Minimizar draw calls -- una esfera, un material por panorama
- Desactivar mipmaps si la calidad a corta distancia es importante
- Usar filtrado trilineo o anisotropico para mejor calidad visual

### 4. Estrategia de carga

- Precargar imagenes panoramicas en memoria antes de la transicion
- Usar carga de recursos por hilos de Godot para evitar drops de frames durante transiciones
- Comprimir texturas apropiadamente para VR

### 5. Interaccion

- El jugador se encuentra en el centro de la esfera
- El tracking de cabeza permite mirar libremente en todas las direcciones
- Agregar UI basada en controladores para navegar entre panoramas (anterior/siguiente)
- Proveer opciones de comodidad (viñeta durante transiciones)

---

## Proceso de sideload de APK

### Requisitos previos

1. Habilitar **Developer Mode** en el Quest:
   - Abrir la app movil Meta Quest
   - Ir a Settings > Developer Mode
   - Activar Developer Mode

2. Instalar **ADB drivers** (especialmente en Windows):
   - Descargar del sitio de desarrolladores de Meta
   - O usar Google's platform-tools

3. Conectar Quest a PC via cable USB-C

### Via ADB (linea de comandos)

```bash
# Verificar conexion del dispositivo
adb devices

# Instalar APK
adb install Metaquest.apk

# Lanzar aplicacion
adb shell am start -n com.username.metaquest/com.username.metaquest.MainActivity

# Desinstalar
adb uninstall com.username.metaquest
```

### Via Godot Editor (One-Click Deploy)

1. Conectar Quest via USB
2. Asegurar que el preset de exportacion este configurado con XR Mode = OpenXR
3. Hacer clic en el boton "Run on device" (icono de play con icono de telefono)
4. Godot compila el APK e instala automaticamente

### Via SideQuest (herramienta de terceros)

1. Instalar SideQuest en PC
2. Conectar Quest via USB
3. Arrastrar y soltar APK en la ventana de SideQuest
4. La app aparece en Unknown Sources del Quest

---

## Renderizado recomendado por dispositivo

| Dispositivo | Renderer | Driver | Notas |
|---|---|---|---|
| Quest 3/3S | **Mobile** | Vulkan | Mejor rendimiento, soporta Application SpaceWarp |
| Quest 2 | **Compatibility** | OpenGL | Mayor compatibilidad, menor overhead |
| Quest Pro | **Mobile** | Vulkan | Similar a Quest 3 |
| Escritorio (pruebas) | **Compatibility** | OpenGL/D3D12 | Suficiente para desarrollo |

### Configuracion en project.godot

```ini
[rendering]
renderer/rendering_method="gl_compatibility"
renderer/rendering_method.mobile="gl_compatibility"
textures/vram_compression/import_etc2_astc=true
```

> **Nota:** Para una version de produccion en Quest 3, cambiar a:
> ```ini
> renderer/rendering_method="mobile"
> renderer/rendering_method.mobile="mobile"
> ```

---

## Application SpaceWarp (ASW)

Application SpaceWarp es una tecnologia de Meta que genera frames intermedios a partir de una tasa de frames a la mitad:

| Sin ASW | Con ASW |
|---|---|
| Renderiza a 72 FPS | Renderiza a 36 FPS |
| 13.8 ms por frame | 27.7 ms por frame |
| Full frame budget | Doble tiempo de renderizado |

**Requisitos:**
- Godot 4.5+
- Renderer Mobile Vulkan
- Metadata especial en el manifest de Android

**Beneficio:** Permite escenas mas complejas manteniendo la suavidad visual.

---

## OpenXR Runtime en Quest

- Meta Quest ejecuta el **Meta OpenXR Runtime** como parte de Meta Horizon OS
- Cuando una aplicacion OpenXR se lanza, el runtime de Meta toma control del display y gestiona:
  - Composicion de renderizado estereoscopico
  - Seguimiento y prediccion de cabeza (reproyeccion asincrona)
  - Input de controladores/manos
  - Sistema Guardian/boundary
  - Passthrough (si se usa)
  - Audio espacializado
- El runtime gestiona **timewarp** (ASW) para mantener suavidad incluso si la app pierde frames
- El runtime se actualiza automaticamente via actualizaciones de Meta Horizon OS

---

## Errores comunes en Quest

### 1. Renderer incorrecto

Usar Forward+ en Quest funcionara pero con rendimiento pobre. Usar Mobile para Quest 3, Compatibility para Quest 2.

### 2. Olvidar XR Mode

El preset de exportacion Android debe tener XR Mode = OpenXR.

### 3. No desactivar VSync

Las aplicaciones VR necesitan VSync desactivado para que el runtime XR gestione el timing.

### 4. Texturas sin comprimir

Las texturas sin comprimir agotan la memoria rapidamente. Siempre usar ASTC o ETC2.

### 5. Developer Mode deshabilitado

No se pueden instalar APKs sin Developer Mode habilitado.

### 6. USB incorrecto

Usar un cable USB-C de alta calidad. Algunos cables son solo de carga.

### 7. Conflicto de paquetes

Si se obtiene "Could not install to device", verificar si hay apps existentes con el mismo nombre de paquete firmadas con diferente clave.
