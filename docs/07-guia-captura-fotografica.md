# Guia de Captura Fotografica 360

## Protocolo de captura para la Cienaga de Mallorquin

Este documento describe el protocolo operativo para la campana de captura de fotografias panoramicas 360 a lo largo del recorrido de la Cienaga de Mallorquin.

---

## 1. Definicion del recorrido

### Actividades previas

Antes de la captura, se debe caracterizar el trayecto:

| Parametro | Descripcion |
|---|---|
| **Punto inicial** | Ubicacion de inicio del recorrido |
| **Punto final** | Ubicacion de fin del recorrido |
| **Longitud aproximada** | Distancia total del trayecto en metros |
| **Direccion predominante** | Orientacion principal del recorrido |
| **Cambios de direccion** | Curvas y puntos de giro relevantes |
| **Zonas de interes** | Sectores con valor ambiental, educativo o turistico |
| **Puntos especiales** | Miradores, carteles, especies notables |
| **Condiciones del terreno** | Dificultad, pendiente, tipo de superficie |
| **Distancias entre fotos** | Separacion aproximada entre capturas |

### Division en puntos

El recorrido se divide en una secuencia numerada de puntos:

```
P001 → P002 → P003 → P004 → P005 → ... → P0XX
```

Cada punto corresponde a una fotografia panoramica 360 tomada en sitio.

---

## 2. Campana de captura

### Equipos necesarios

- Camara panoramica 360 (Insta360, Ricoh Theta, GoPro Max u equivalente)
- Tripode con nivel de burbuja
- Mochila de transporte del equipo
- GPS portatil (o usar GPS del telefono)
- Notas de campo / tablet / telefono
- Baterias de repuesto
- Tarjetas de memoria o almacenamiento externo

### Criterios de captura

| Criterio | Especificacion |
|---|---|
| **Altura de camara** | Consistente en todos los puntos (ej: 1.6 m desde el suelo) |
| **Orientacion** | Consistente con la direccion del recorrido |
| **Separacion** | 3-5 metros en sectores rectos |
| **Nivelacion** | Tripode nivelado (burbuja centrada) |
| **Exposicion** | Automatica o manual consistente |
| **Calidad** | Maxima resolucion y calidad de la camara |
| **Nomenclatura** | P001, P002, P003... |
| **Ubicacion geografica** | Registrar latitud y longitud en cada punto |

### Reglas de captura

1. **Consistencia de altura:** Mantener la misma altura de camara en todos los puntos para evitar saltos visuales entre panoramas.
2. **Consistencia de orientacion:** Orientar la camara de la misma manera en cada punto para mantener una referencia visual coherente.
3. **Mas frecuencia en zonas especiales:** En curvas, cambios de nivel o zonas de interes, reducir la separacion entre puntos para mayor detalle.
4. **Evitar ocultamiento:** No dejar que el operador o equipo aparezcan en la zona del nadir (piso) de la foto.
5. **Registrar incidencias:** Anotar cualquier problema (parpadeos, movimiento, condiciones de luz).

---

## 3. Registro de informacion de campo

Cada fotografia debe estar asociada a un registro con la siguiente informacion minima:

| Campo | Descripcion | Obligatorio |
|---|---|---|
| **Identificador del punto** | P001, P002, etc. | Si |
| **Nombre del archivo** | P001.jpg | Si |
| **Numero consecutivo** | 1, 2, 3... | Si |
| **Latitud** | Coordenada geografica | Si |
| **Longitud** | Coordenada geografica | Si |
| **Distancia desde punto anterior** | Metros | Si |
| **Altura de la camara** | Metros desde el suelo | Si |
| **Orientacion** | Direccion de la camara | Si |
| **Fecha** | Dia de captura | Si |
| **Hora** | Hora exacta | Si |
| **Responsable** | Persona que capturo | Si |
| **Observaciones** | Notas del sitio | No |
| **Incidencias** | Problemas detectados | No |

### Ejemplo de registro

| Punto | Archivo | Latitud | Longitud | Dist (m) | Alt (m) | Orientacion | Fecha | Responsable |
|---|---|---|---|---|---|---|---|---|
| P001 | P001.jpg | 11.0345 | -74.7823 | - | 1.6 | Norte | 2025-05-10 | C.Martinez |
| P002 | P002.jpg | 11.0348 | -74.7820 | 4.2 | 1.6 | Norte | 2025-05-10 | C.Martinez |
| P003 | P003.jpg | 11.0351 | -74.7817 | 3.8 | 1.6 | Norte | 2025-05-10 | C.Martinez |

---

## 4. Formato de registro

El registro puede almacenarse en **CSV**, **JSON** o estructura equivalente:

### Ejemplo CSV

```csv
punto_anterior>>>CSV
punto,archivo,consecutivo,latitud,longitud,distancia,altura,orientacion,fecha,hora,responsable,observaciones
P001,P001.jpg,1,11.0345,-74.7823,0,1.6,N,2025-05-10,08:30,C.Martinez,Punto de inicio
P002,P002.jpg,2,11.0348,-74.7820,4.2,1.6,N,2025-05-10,08:34,C.Martinez,Zona de manglar
P003,P003.jpg,3,11.0351,-74.7817,3.8,1.6,N,2025-05-10,08:38,C.Martinez,Cambia direccion
```

### Ejemplo JSON

```json
{
  "recorrido": "Cienaga de Mallorquin",
  "puntos": [
    {
      "punto": "P001",
      "archivo": "P001.jpg",
      "consecutivo": 1,
      "latitud": 11.0345,
      "longitud": -74.7823,
      "distancia_anterior": 0,
      "altura_camara": 1.6,
      "orientacion": "N",
      "fecha": "2025-05-10",
      "hora": "08:30",
      "responsable": "C.Martinez",
      "observaciones": "Punto de inicio"
    }
  ]
}
```

---

## 5. Procesamiento de imagenes

### Revision

Antes de incorporar las imagenes a la aplicacion, se debe revisar:

| Proceso | Descripcion |
|---|---|
| **Revision de resolucion** | Verificar dimensiones y calidad |
| **Verificacion del horizonte** | Asegurar linea del horizonte recta |
| **Correccion de orientacion** | Rotar si es necesario |
| **Ajuste de exposicion** | Corregir sub/sobrexposicion |
| **Correccion de color** | Balance de blancos, saturacion |
| **Eliminacion de defectos** | Quitar tripod, objetos, parpadeos |
| **Optimizacion de tamano** | Reducir para rendimiento |
| **Compresion para Quest** | JPG de calidad 85-90% |

### Estructura de carpetas recomendada

```
Recorrido_imagenes/
├── Originales/               # Archivos obtenidos directamente de la camara
│   ├── P001.jpg
│   ├── P002.jpg
│   └── ...
├── Procesadas/               # Archivos corregidos y preparados
│   ├── P001.jpg
│   ├── P002.jpg
│   └── ...
└── Quest/                    # Versiones optimizadas para el dispositivo
    ├── P001.jpg
    ├── P002.jpg
    └── ...
```

### Especificaciones de exportacion

| Destino | Resolucion | Formato | Calidad | Tamano aprox |
|---|---|---|---|---|
| Originales | Maxima de camara | JPG/PNG | Original | 5-15 MB |
| Procesadas | 5760x2880 | JPG | 90-95% | 3-8 MB |
| Quest | 4096x2048 | JPG | 85-90% | 1-3 MB |

> **Regla de oro:** Conservar SIEMPRE una copia de las fotografias originales sin procesar.

---

## 6. Control de calidad en campo

### Checklist antes de tomar cada foto

- [ ] Tripode nivelado (burbuja centrada)
- [ ] Altura de camara correcta
- [ ] Orientacion consistente
- [ ] Lente/suricato limpio
- [ ] Sin objetos cerca del nadir
- [ ] Exposicion adecuada
- [ ] Sin movimiento (personas/vehiculos en escena)
- [ ] GPS registrando ubicacion
- [ ] Bateria suficiente
- [ ] Memoria disponible

### Checklist al terminar la campana

- [ ] Verificar que todos los puntos fueron capturados
- [ ] Verificar resolucion y calidad de cada foto
- [ ] Registrar incidencias detectadas
- [ ] Respaldar las imagenes originales
- [ ] Completar el registro de campo

---

## 7. Referencias del proyecto

- **Archivo de registro de puntos:** [docs/09-recurso-imagenes.md](09-recurso-imagenes.md)
- **Enlace a imagenes:** [https://drive.google.com/drive/folders/17wWK6M_h6iVxvlVn6GVAF2Asyxhpaphb?usp=drive_link](https://drive.google.com/drive/folders/17wWK6M_h6iVxvlVn6GVAF2Asyxhpaphb?usp=drive_link)