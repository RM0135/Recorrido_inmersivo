# Imagenes 360 Equirectangulares

## Que es una proyeccion equirectangular

La proyeccion equirectangular (también llamada proyeccion esferica o proyeccion cilindrica equidistante) es un metodo para representar una superficie esferica completa sobre un plano bidimensional. Es la misma proyeccion utilizada para los mapas mundiales (Plate Carree).

En esta proyeccion:

- El **eje horizontal** (U) representa la **longitud**: -180 grados (borde izquierdo) a +180 grados (borde derecho)
- El **eje vertical** (V) representa la **latitud**: +90 grados (polo norte, parte superior) a -90 grados (polo sur, parte inferior)

```
u=0          u=0.5         u=1.0
|             |             |
+90 +------------------------+   v=0     (Polo norte)
    |                        |
  0 |    -180      0    +180 |   v=0.5   (Ecuador)
    |                        |
-90 +------------------------+   v=1     (Polo sur)
```

---

## Por que relacion 2:1

La relacion de aspecto 2:1 es una consecuencia matematica directa de la proyeccion:

- **360 grados horizontales** (circunferencia completa de la esfera)
- **180 grados verticales** (de polo norte a polo sur)
- 360 / 180 = **2:1**

Esto significa que una imagen equirectangular de 4096x2048 pixeles cubre toda la esfera con una resolucion uniforme en el ecuador.

---

## Como se mapea a una esfera

### De UV a direccion (vector 3D)

```
longitud = (u - 0.5) * 2.0 * PI      # Rango: [-PI, +PI]
latitud  = (0.5 - v) * PI            # Rango: [+PI/2, -PI/2]

x = cos(latitud) * sin(longitud)
y = sin(latitud)
z = cos(latitud) * cos(longitud)
```

### De direccion a UV (inversa)

```
longitud = atan2(direccion.z, direccion.x)
latitud  = asin(clamp(direccion.y, -1.0, 1.0))

u = (longitud / (2.0 * PI)) + 0.5
v = 0.5 - (latitud / PI)
```

### En Godot

Godot soporta nativamente la proyeccion equirectangular a traves de:

- `StandardMaterial3D` con la propiedad `panorama` (para cielos/entornos)
- `SphereMesh` con textura albedo y UV mapping estandar
- Shaders personalizados para mapeo equirectangular-esfera

---

## Por que usar esferas (renderizado interior)

Para visualizar imagenes 360 en realidad virtual, la imagen se aplica a la **superficie interior** de una esfera:

```
        Exterior (NO visible)
       ┌─────────────────┐
       │    ╱ esfera ╲    │
       │   │  interior │   │
       │   │  (camara) │   │  ← El usuario esta AQUI
       │   │    ●      │   │     en el centro
       │    ╲          ╱    │
       └─────────────────┘
        Interior (VISIBLE)
```

**Ventajas de este enfoque:**

| Ventaja | Descripcion |
|---|---|
| **Un solo mesh** | Solo se necesita una esfera por panorama |
| **Una textura** | Una imagen equirectangular por punto del recorrido |
| **Un draw call** | Minimal overhead de renderizado |
| **Sin geometria compleja** | No hay modelado 3D del entorno |
| **Sin iluminacion** | Las imagenes ya contienen la iluminacion real |

**Configuracion en Godot:**

```gdscript
# Material para interior de esfera panoramica
var material = StandardMaterial3D.new()
material.cull_mode = 1              # cull_front: renderiza caras interiores
material.shading_mode = 0           # unshaded: sin iluminacion
material.albedo_texture = panorama  # Textura equirectangular
```

---

## Resolucion recomendada para VR

La realidad virtual demanda alta resolucion porque las pantallas estan cerca de los ojos, ampliando cada detalle.

| Resolucion | Dimensiones | Uso |
|---|---|---|
| **4K** | 3840 x 1920 | Minimo aceptable para tour fotografico |
| **5.7K** | 5760 x 2880 | Buen balance calidad/para Quest |
| **8K** | 7680 x 3840 | Recomendado para tours de alta calidad |
| **11K+** | 11520 x 5760+ | Ultra alta calidad, requiere texture slicing |

**Pantalla Meta Quest 3:** 2064 x 2048 por ojo, ~25 pixeles por grado (PPD). Esto significa que se necesita aproximadamente 4K minimo por cada vista de 180 grados para detalle nítido.

**Texture slicing:** Para panoramas de muy alta resolucion (8K+), se pueden dividir la imagen en multiples mosaicos (cada uno dentro del limite de textura de la GPU, tipicamente 4096x4096 en Quest) y aplicarlos a diferentes segmentos de la esfera.

---

## Formatos de imagen

| Formato | Ventajas | Desventajas | Recomendacion |
|---|---|---|---|
| **JPG** | Tamano pequeno, amplio soporte, buena compresion para fotos | Compresion con perdida, sin transparencia | **Recomendado** (calidad 85-95%) |
| **PNG** | Sin perdida, soporte transparencia | Archivos muy grandes en 8K+, carga lenta | Solo para originales |
| **WebP** | Buena compresion, lossy y lossless | Soporte limitado en motores | No recomendado |
| **KTX2/Basis** | Comprimido por GPU, carga rapida, bajo VRAM | Requiere conversion | Ideal para produccion final |

**Mejor practica para tours VR:** Usar **JPG** a alta calidad (85-95%) para el mejor balance entre tamano de archivo y calidad visual. Evitar PNG para panoramas por su tamano prohibitivo en resoluciones altas.

**Meta recomienda:** 4096 x 2048 JPG como linea base para panoramas equirectangulares en juegos/contenido.

---

## Pipeline de procesamiento de fotos 360

```
1. CAPTURA                    2. PROCESAMIENTO               3. INTEGRACION
┌──────────────┐              ┌──────────────────┐            ┌──────────────────┐
│ Camara 360   │──── JPG ────│ Revision calidad  │            │ Importar en      │
│ (Insta360,   │              │ Verificar         │            │ Godot            │
│  Ricoh Theta,│              │ horizonte         │            │                  │
│  GoPro Max)  │              │ Corregir color    │──── JPG ──│ Asignar a        │
│              │              │ Ajustar exposicion│            │ SphereMesh       │
│              │              │ Recortar nadir    │            │                  │
│              │              │ Optimizar tamano  │            │ Configurar       │
│              │              │ Compresion Quest  │            │ material         │
└──────────────┘              └──────────────────┘            └──────────────────┘
```

### Pasos detallados

1. **Captura:** Usar camara panoramica 360 o ensamblar multiples imagenes ojo de pez
2. **Costura:** Si se usan multiples camaras, ensamblar en equirectangular (PTGui, Hugin, app nativa)
3. **Edicion:** Correccion de color, balance de exposicion, eliminar artefacto de tripod (edicion de nadir)
4. **Exportar:** Exportar como JPG equirectangular en relacion 2:1 (ej: 8192x4096)
5. **Importar en Godot:** Colocar en el directorio del proyecto. Godot importa imagenes como `CompressedTexture2D`
6. **Aplicar a esfera:** Crear escena con `MeshInstance3D` usando `SphereMesh`, aplicar textura con material configurado para visualizacion interior
7. **Optimizar:** Configurar ajustes de importacion (compresion, mipmaps, limites de resolucion)

---

## Errores comunes

### 1. Pinch en los polos

La proyeccion equirectangular estira inherentemente los pixeles cerca de los polos. Esto es normal e inevitable. Los polos representan un solo punto en la esfera (norte y sur) pero se mapean a filas completas de pixeles en la imagen.

**Solucion:** No hay solucion tecnica. Colocar sujetos de interes lejos de los polos.

### 2. Costura visible

Los bordes izquierdo y derecho de la imagen equirectangular deben coincidir perfectamente para evitar una costura visible.

**Solucion:** Verificar que la imagen cubra exactamente 360 grados y que los bordes seancontinuos.

### 3. Iluminacion incorrecta

Si el material no esta configurado como `unshaded`, la iluminacion de la escena creara areas oscuras artificiales.

**Solucion:** Usar `shading_mode = 0` (unshaded) en el `StandardMaterial3D`.

### 4. Textura excediendo limites de GPU

Una textura de 8K (8192x4096) puede exceder el limite de textura de la GPU en Quest (4096x4096), causando crashes.

**Solucion:** Usar texturas de maximo 4096x2048 para Quest, o implementar texture slicing para imagenes de mayor resolucion.

### 5. Cara exterior visible

Si el `cull_mode` no esta configurado correctamente, la camara vera el exterior de la esfera en lugar del interior.

**Solucion:** Usar `cull_mode = 1` (cull_front) o `cull_disabled` en el material.
