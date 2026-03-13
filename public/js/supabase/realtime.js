/**
 * MUSEOS TAPI: INFINITE ACTIVITY MANAGER
 * Método Polling (Muestreo) para evitar los límites de 200 conexiones.
 */

const ActivityManager = {
    intervalId: null,
    pollingRate: 10000, // Cada 10 segundos para máxima precisión "Hiper-Real"
    
    // Generar o recuperar un ID de sesión único y persistente
    getSessionId() {
        let sid = localStorage.getItem('tapi_session_id');
        if (!sid) {
            sid = 'sid_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('tapi_session_id', sid);
        }
        return sid;
    },

    async init() {
        // Primer pulse inmediato
        await this.pulse();

        // Configurar el ciclo de repetición
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(() => this.pulse(), this.pollingRate);
        
        // Escuchar cuando el usuario vuelve a la pestaña (útil en móviles)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.pulse(); // Enviar pulso inmediato al volver
            }
        });

        console.log('🚀 Monitor de visitantes Hiper-Real activado (10s)');
    },

    async pulse() {
        // Asegurarnos que Supabase esté conectado (window.sb)
        if (!window.sb) return;

        try {
            const sid = this.getSessionId();
            
            // Llamamos a la función "pulse_and_count" que creamos en Postgres
            const { data, error } = await window.sb.rpc('pulse_and_count', { 
                current_session_id: sid 
            });

            if (error) throw error;

            this.updateUI(data);
        } catch (err) {
            console.warn('[Activity] Error en el pulso:', err.message);
        }
    },

    updateUI(count) {
        const countElement = document.getElementById('live-users-count');
        if (countElement) {
            // Un pequeño efecto visual: si es 0, mostramos al menos 1 (el usuario actual)
            const displayCount = count || 1;
            countElement.innerText = displayCount;
        }
    }
};

// Iniciar cuando Supabase esté listo de forma robusta
(function startActivity() {
    const checkSupabase = setInterval(() => {
        if (window.sb) {
            clearInterval(checkSupabase);
            ActivityManager.init();
        }
    }, 500);
    
    // Timeout de seguridad de 10 segundos
    setTimeout(() => clearInterval(checkSupabase), 10000);
})();

window.ActivityManager = ActivityManager;

