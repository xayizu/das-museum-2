const initializeBridge = () => {
    console.log('🚀 Iniciando conexión con Museos TAPI Backend...');

    // Función auxiliar para esperar a que un objeto global esté listo (15s para móviles)
    const waitForGlobal = (name, timeout = 15000) => {
        return new Promise((resolve) => {
            if (window[name]) return resolve(window[name]);
            const start = Date.now();
            const interval = setInterval(() => {
                if (window[name]) {
                    clearInterval(interval);
                    resolve(window[name]);
                } else if (Date.now() - start > timeout) {
                    clearInterval(interval);
                    console.warn(`⏳ Tiempo de espera agotado para: ${name}`);
                    resolve(null);
                }
            }, 100);
        });
    };

    // Ejecución asíncrona de módulos para que no se bloqueen entre sí
    const initModules = async () => {
        const sb = await waitForGlobal('sb');
        
        // Aunque sb falle, intentamos cargar noticias si existe el Manager (puede tener fallback)
        if (!sb) {
            console.warn('⚡ Supabase: No se detectó conexión tras esperar.');
        }

        // 1. Autenticación (Independiente)
        if (window.AuthManager) {
            try {
                window.AuthManager.initAuthListener();
            } catch (e) { console.error('Error Auth:', e); }
        }

        // 2. Noticias ( PRIORIDAD ALTA )
        if (window.NewsManager) {
            (async () => {
                try {
                    const latestNews = await window.NewsManager.fetchLatestNews();
                    if (latestNews) {
                        window.NewsManager.updateModalUI(latestNews);
                        if (window.openNewsModal) window.openNewsModal();
                    }
                } catch (newsError) {
                    console.warn('⚠️ NewsManager: Error al cargar noticias.', newsError);
                }
            })();
        }

        // 3. Estadísticas (En segundo plano)
        if (window.StatsManager && sb) {
            (async () => {
                try {
                    await window.StatsManager.logVisit();
                    await window.StatsManager.updateUI();
                    window.StatsManager.subscribeRealtime();
                } catch (e) { console.error('Error Stats:', e); }
            })();
        }

        // 4. Leaderboard
        if (window.LeaderboardManager && sb) {
            try {
                window.LeaderboardManager.fetchTopScores();
            } catch (e) { console.error('Error Leaderboard:', e); }
        }

        // 5. Escuchar carga de componentes dinámicos
        window.addEventListener('componentsReady', async () => {
            if (window.StatsManager) {
                try { await window.StatsManager.updateUI(); } catch (e) {}
            }
        });

        console.log('✨ Museos TAPI: Sistemas sincronizados.');
    };

    initModules();
};

// CRITICAL FIX: Ensure initialization runs even if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBridge);
} else {
    initializeBridge();
}
