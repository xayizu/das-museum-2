/**
 * MUSEOS TAPI: SUPABASE INITIALIZATION BRIDGE
 * Coordina todos los módulos de Supabase al cargar la página
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando conexión con Museos TAPI Backend...');

    // 1. Esperar un momento para asegurar que las variables globales existan
    setTimeout(async () => {
        if (!window.sb) {
            console.warn('⚡ Supabase: No se detectó conexión. Los datos serán estáticos.');
            return;
        }

        // 2. Iniciar Sistema de Autenticación
        if (window.AuthManager) {
            window.AuthManager.initAuthListener();
        }

        // 3. Registrar Visita actual
        if (window.StatsManager) {
            await window.StatsManager.logVisit();
            await window.StatsManager.updateUI();
            window.StatsManager.subscribeRealtime();
        }

        // 4. Cargar Tabla de Clasificación
        if (window.LeaderboardManager) {
            await window.LeaderboardManager.fetchTopScores();
        }

        // 5. Escuchar carga de componentes dinámicos para re-actualizar UI
        window.addEventListener('componentsReady', async () => {
            if (window.StatsManager) {
                await window.StatsManager.updateUI();
            }
        });

        console.log('✨ Museos TAPI: Sistemas sincronizados.');
    }, 500);
});
