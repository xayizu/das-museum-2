/**
 * Virtual Tour Controller v3.1
 * Centralized for Museo de Tanques and Casa Histórica
 * Handles iframe loading, postMessage synchronization, and UI states.
 */
const TourController = {
    init: function() {
        window.addEventListener('message', (event) => {
            // The 3DVista/Panotour engine emits 'tourLoaded' via postMessage
            if (event.data === 'tourLoaded') {
                console.log("[Tour] Internal event: tourLoaded received.");
                // Small delay to ensure the canvas is actually painted
                setTimeout(() => this.finalizeTourDisplay(), 800);
            }
        });
    },

    finalizeTourDisplay: function() {
        const loader = document.getElementById('tour-loader');
        const container = document.getElementById('tour-iframe-container');
        const preview = document.getElementById('tour-preview');

        if (container) container.style.display = 'block';
        if (loader) loader.style.display = 'none';
        if (preview) preview.style.display = 'none';
    },

    /**
     * Loads the virtual tour into the iframe
     * @param {string} tourPath Relative or absolute path to the index.htm of the tour
     */
    load: function(tourPath) {
        const loader = document.getElementById('tour-loader');
        const container = document.getElementById('tour-iframe-container');
        const iframe = document.getElementById('virtual-tour-frame');

        if (!loader || !container || !iframe) {
            console.error("[Tour] Essential UI elements not found.");
            return;
        }

        // 1. Reset and Show loader
        loader.style.display = 'flex';
        container.style.display = 'none';

        // 2. Set src
        iframe.src = tourPath;

        // 3. Native onload (fallback if postMessage fails or is not emitted)
        iframe.onload = () => {
            console.log("[Tour] Iframe native onload fired.");
            setTimeout(() => {
                if (loader.style.display !== 'none') this.finalizeTourDisplay();
            }, 2000);
        };

        // 4. Safety Fail-safe (Longer timeout for mobile/slow networks)
        setTimeout(() => {
            if (loader.style.display !== 'none') {
                console.warn("[Tour] Safety timeout: forcing display.");
                this.finalizeTourDisplay();
            }
        }, 8000);
    },

    close: function() {
        const preview = document.getElementById('tour-preview');
        const container = document.getElementById('tour-iframe-container');
        const iframe = document.getElementById('virtual-tour-frame');

        if (container) container.style.display = 'none';
        if (preview) preview.style.display = 'flex';
        if (iframe) iframe.src = "";
    }
};

// Initialize listeners immediately
TourController.init();
