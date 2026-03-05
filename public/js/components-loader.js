/**
 * components-loader.js
 * Carga componentes HTML externos de forma dinámica y despacha un evento al terminar.
 */

document.addEventListener('DOMContentLoaded', async () => {
    const includes = document.querySelectorAll('[data-include]');
    // Si la página tiene data-root="../" en el body, lo usamos, si no "./"
    const rootPath = document.body.getAttribute('data-root') || './';

    const loadTasks = Array.from(includes).map(async (el) => {
        const file = el.getAttribute('data-include');
        // Construimos la ruta al componente basado en el rootPath
        const path = `${rootPath}components/${file}.html`;

        try {
            const response = await fetch(path);
            if (response.ok) {
                const html = await response.text();
                // Procesamos el HTML para que las rutas internas funcionen desde cualquier subcarpeta
                const processedHtml = fixPaths(html, rootPath);
                el.innerHTML = processedHtml;
            } else {
                console.warn(`[Loader] No se pudo cargar: ${path}`);
            }
        } catch (err) {
            console.error(`[Loader] Error de red en ${path}:`, err);
        }
    });

    // Esperamos a que TODOS los componentes se hayan inyectado en el DOM
    await Promise.all(loadTasks);

    // Despachamos un evento para que scripts como main.js sepan que el DOM está listo
    window.dispatchEvent(new CustomEvent('componentsReady'));

    // Si el objeto de traducción existe, lo actualizamos para el nuevo contenido cargado
    if (window.i18n && typeof window.i18n.updateUI === 'function') {
        window.i18n.updateUI();
    }
});

/**
 * Función para corregir rutas relativas (src y href) en el HTML inyectado.
 * Evita modificar rutas con http, # o / iniciales.
 */
function fixPaths(html, root) {
    if (root === './' || root === '') return html;
    // Regex que busca src="..." o href="..." que no empiecen por protocolos o rutas absolutas
    return html.replace(/(src|href)="(?!\/|#|http|https)([^"]*)"/g, (match, p1, p2) => {
        return `${p1}="${root}${p2}"`;
    });
}
