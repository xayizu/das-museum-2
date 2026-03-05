# Museo de Tanques - Plantilla Web

Esta es una plantilla web profesional diseñada para un museo de tanques o historia militar. El proyecto está estructurado para ser fácilmente editable y mantenible.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

### Páginas Principales
- **`index.html`**: Página de inicio (Landing Page). Presenta la introducción al museo, piezas destacadas y acceso rápido a otras secciones.
- **`gallery.html`**: (Anteriormente `Colección`) Muestra la galería de vehículos. Puede duplicar las tarjetas de tanques para añadir más items.
- **`tank-detail.html`**: Página de detalle para un vehículo específico (ej. Tiger I). Úsela como plantilla para crear páginas de otros vehículos.
- **`events.html`**: Calendario de eventos y actividades del museo.
- **`about.html`**: Información sobre la historia del museo, misión, visión y equipo.
- **`contact.html`**: Formulario de contacto e información de ubicación.

### Recursos (Assets)
- **`css/main.css`**: Hoja de estilos principal. Contiene estilos globales, utilidades personalizadas y correcciones.
- **`js/main.js`**: Lógica de interacción principal (animaciones, menús móviles, navegación de galería).
- **`js/config.js`**: Configuración de Tailwind CSS. Aquí puede definir los colores corporativos (`primary`, `background-dark`, etc.), fuentes y bordes. Modifique este archivo para cambiar la apariencia global del sitio.

## Guía de Edición

### Cambiar Colores Globales
Vaya a `js/config.js` y modifique los valores en `colors`:
```javascript
colors: {
    "primary": "#0032A0", // Color principal
    // ... otros colores
}
```

### Añadir Nuevos Tanques a la Galería
1. Abra `gallery.html`.
2. Busque un bloque con la clase `tank-card`.
3. Copie y pegue el bloque entero.
4. Modifique la imagen, el título y los datos.
5. Asegúrese de que el enlace o la interacción apunte a la página de detalle correspondiente.

### Crear Nueva Página de Detalle
1. Copie el archivo `tank-detail.html` y renómbrelo (ej. `sherman-detail.html`).
2. Abra el nuevo archivo y reemplace el contenido (imágenes, textos técnicos, historia) con la información del nuevo vehículo.
3. En `gallery.html`, enlace la tarjeta correspondiente al nuevo archivo.

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica.
- **Tailwind CSS**: Framework de estilos (configurado vía CDN para prototipado rápido).
- **JavaScript (Vanilla)**: Lógica ligera sin dependencias externas pesadas.

## Notas Adicionales
- Se ha unificado la cabecera (header) en todas las páginas para mantener la consistencia visual.
- Los archivos de índice innecesarios (`index7.html` a `index16.html`) han sido eliminados para limpiar el proyecto.
