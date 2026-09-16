# Recurso de Imagenes Panoramicas 360

## Ubicacion de las imagenes

Las fotografias panoramicas del recorrido de la Cienaga de Mallorquin se encuentran disponibles en Google Drive:

**Enlace:** [https://drive.google.com/drive/folders/17wWK6M_h6iVxvlVn6GVAF2Asyxhpaphb?usp=drive_link](https://drive.google.com/drive/folders/17wWK6M_h6iVxvlVn6GVAF2Asyxhpaphb?usp=drive_link)

> **Nota:** El enlace puede requerir permisos de acceso. Solicitar acceso al administrador del repositorio si no es posible visualizar las imagenes.

---

## Estructura de carpetas esperada

```
Google Drive/
├── Originales/               # Archivos obtenidos directamente desde la camara (maxima calidad)
│   ├── P001.jpg
│   ├── P002.jpg
│   ├── P003.jpg
│   └── ...
├── Procesadas/               # Archivos corregidos y preparados para la aplicacion
│   ├── P001.jpg
│   ├── P002.jpg
│   └── ...
└── Quest/                    # Versiones optimizadas para ejecucion en Meta Quest
    ├── P001.jpg
    ├── P002.jpg
    └── ...
```

---

## Formato y especificaciones

| Caracteristica | Originales | Procesadas | Quest |
|---|---|---|---|
| **Formato** | JPG/PNG (camara) | JPG | JPG |
| **Relacion de aspecto** | 2:1 | 2:1 | 2:1 |
| **Resolucion** | 5760x2880 o mayor | 5760x2880 o mayor | 4096x2048 (recomendado) |
| **Compresion** | Sin compresion adicional | Calidad 90-95% | Calidad 85-90% |
| **Tamano estimado** | 5-15 MB por imagen | 3-8 MB por imagen | 1-3 MB por imagen |

---

## Nomenclatura de archivos

Cada imagen sigue una nomenclatura consecutiva que corresponde al punto de captura en el recorrido:

```
P001.jpg    # Punto 001 - Inicio del recorrido
P002.jpg    # Punto 002
P003.jpg    # Punto 003
...
P0XX.jpg    # Punto final del recorrido
```

La letra **P** indica "Punto" y los tres digitos identifican la posicion secuencial dentro del recorrido.

---

## Uso en el proyecto

Las imagenes de la carpeta **Quest/** son las que se cargan directamente en la aplicacion Godot. Cada imagen se asigna como textura albedo de un `SphereMesh` con material `StandardMaterial3D` configurado para:

- `cull_mode = 1` (cull_front) para renderizar el interior de la esfera
- `shading_mode = 0` (unshaded) para evitar iluminacion artificial
- Textura panoramica equirectangular en relacion 2:1

---

## Contenido del repositorio actual

Actualmente el repositorio contiene una imagen de prueba:

| Archivo | Tamano | Resolucion | Uso |
|---|---|---|---|
| `P001.png` | 2.2 MB | Equirectangular 360 | Panorama de prueba en la escena principal |

Esta imagen se utiliza como textura base para las tres esferas de prueba en la escena `main.tscn`.
