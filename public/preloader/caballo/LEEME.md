
# Guía de la Plantilla de Loading con Caballo 🐴

Este proyecto es una animación de carga (loading page) construida con HTML y CSS, diseñada para ser fácilmente editable y utilizada como plantilla.

## 📁 Estructura del Proyecto

- `index.html`: Contiene la estructura base de la animación y el indicador de carga.
- `style.css`: Contiene todos los estilos, animaciones y variables de configuración.

## 🎨 Personalización (Cómo editar)

Para editar los colores, velocidad y tamaño, abre el archivo `style.css` y modifica las variables en la sección `:root` al principio del archivo.

### Variables Principales (`:root`)

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `--speed` | Velocidad de la animación (menor es más rápido) | `0.8s` |
| `--color-horse` | Color principal del cuerpo del caballo | `rgba(50, 50, 50, 1)` |
| `--color-horse-back` | Color de las patas traseras/lado oscuro | `rgba(30, 30, 30, 1)` |
| `--color-hair` | Color de la crin y cola | `rgba(70, 70, 70, 1)` |
| `--color-hoof` | Color de las pezuñas | `rgba(0, 0, 0, 1)` |
| `--color-dust` | Color del polvo/tierra | `#e6d5b8` (Color Polvo) |
| `--color-floor` | Color del suelo | `#F1D1AF` |
| `--color-sky` | Color del cielo (fondo) | `#C4C4FF` |

### Cambiar el indicador de carga

El porcentaje de carga se simula mediante un script en `index.html`. 
Puedes ajustar la velocidad del contador modificando el valor en la función `setInterval` dentro del script al final del HTML.

## 🔧 Organización del Código

El código ha sido organizado con comentarios para identificar cada parte:
- **CABEZA**: Estructura del cráneo, ojos, orejas.
- **CUERPO**: Torso y estructura principal.
- **PATAS**: Patas delanteras y traseras (izquierda y derecha).
- **COLA**: Animación de la cola.
- **POLVO**: Partículas de tierra.

Disfruta creando tu propia versión!
