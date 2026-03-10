/**
 * components-loader.js
 * Carga componentes HTML externos de forma dinámica y despacha un evento al terminar.
 */

document.addEventListener('DOMContentLoaded', () => {
    loadAllComponents();
});

async function loadAllComponents() {
    let hasMore = true;
    const rootPath = document.body.getAttribute('data-root') || './';

    while (hasMore) {
        const includes = document.querySelectorAll('[data-include]:empty'); // Solo los que no tienen contenido aún
        if (includes.length === 0) {
            hasMore = false;
            break;
        }

        const loadTasks = Array.from(includes).map(async (el) => {
            const file = el.getAttribute('data-include');
            const nocache = Date.now();
            const path = `${rootPath}components/${file}.html?v=${nocache}`;

            try {
                const response = await fetch(path);
                if (response.ok) {
                    const html = await response.text();
                    const processedHtml = fixPaths(html, rootPath);
                    el.innerHTML = processedHtml;
                } else {
                    console.warn(`[Loader] No se pudo cargar: ${path}`);
                    el.innerHTML = `<!-- Error cargando ${file} -->`;
                }
            } catch (err) {
                console.error(`[Loader] Error de red en ${path}:`, err);
                el.innerHTML = `<!-- Error de red cargando ${file} -->`;
            }
        });

        await Promise.all(loadTasks);
        // Volveremos a buscar en el siguiente loop si se inyectaron nuevos [data-include]
    }

    // Despachamos un evento para que scripts como main.js sepan que el DOM está listo
    window.dispatchEvent(new CustomEvent('componentsReady'));

    // Si el objeto de traducción existe, lo actualizamos para el nuevo contenido cargado
    if (window.i18n && typeof window.i18n.updateUI === 'function') {
        window.i18n.updateUI();
    }
}


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
