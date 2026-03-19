/**
 * MUSEOS TAPI: STATS MANAGER
 * Manejo de contadores de visitas, blindados y piezas de archivo
 */

const StatsManager = {
    /**
     * Registra una nueva visita en la tabla visitor_logs
     */
    async logVisit() {
        if (!window.sb) return;

        // Evitar doble conteo si ya se registró en esta sesión (pestaña abierta)
        if (sessionStorage.getItem('v_logged')) {
            console.log('ℹ️ Sesión ya registrada. No se incrementa el contador.');
            return;
        }

        try {
            const { error } = await window.sb
                .from('visitor_logs')
                .insert([{
                    platform: window.innerWidth > 1024 ? 'Escritorio' : 'Móvil',
                    session_id: sessionStorage.getItem('v_session') || this.createSession()
                }]);

            if (error) throw error;

            // Marcar como registrado para esta sesión
            sessionStorage.setItem('v_logged', 'true');
            console.log('📈 Visita única de sesión registrada.');
        } catch (err) {
            console.error('❌ Error al registrar visita:', err);
        }
    },

    /**
     * Crea una sesión temporal para no contar duplicados en la misma pestaña
     */
    createSession() {
        const id = Math.random().toString(36).substring(7);
        sessionStorage.setItem('v_session', id);
        return id;
    },

    /**
     * Obtiene y actualiza los números en el UI
     */
    async updateUI() {
        if (!window.sb) return;

        // --- CÁLCULO DE FECHAS ---
        const now = new Date();

        // Hoy (00:00:00 de hoy)
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        
        // Ayer (00:00:00 de ayer) - Para el filtro de ayer
        const yesterdayDate = new Date(now);
        yesterdayDate.setDate(now.getDate() - 1);
        const startOfYesterday = new Date(yesterdayDate.getFullYear(), yesterdayDate.getMonth(), yesterdayDate.getDate(), 0, 0, 0, 0).toISOString();
        const endOfYesterday = new Date(yesterdayDate.getFullYear(), yesterdayDate.getMonth(), yesterdayDate.getDate(), 23, 59, 59, 999).toISOString();

        // Semanal (Lunes de esta semana 00:00:00)
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Ajustar para que sea Lunes
        const startOfWeek = new Date(now.setDate(diff));
        startOfWeek.setHours(0, 0, 0, 0);

        // Mensual (Día 1 de este mes 00:00:00)
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

        // 1. Obtener Visitas de AYER
        const { count: yesterdayCount } = await window.sb
            .from('visitor_logs')
            .select('*', { count: 'exact', head: true })
            .gte('visited_at', startOfYesterday)
            .lte('visited_at', endOfYesterday);

        this.setNumber('stat-visitors-yesterday', yesterdayCount || 0);

        // 2. Obtener Visitas de HOY
        const { count: dayCount } = await window.sb
            .from('visitor_logs')
            .select('*', { count: 'exact', head: true })
            .gte('visited_at', startOfToday);

        this.setNumber('stat-visitors-daily', dayCount || 0);

        // 3. Obtener Visitas de la SEMANA
        const { count: weekCount } = await window.sb
            .from('visitor_logs')
            .select('*', { count: 'exact', head: true })
            .gte('visited_at', startOfWeek.toISOString());

        this.setNumber('stat-visitors-weekly', weekCount || 0);

        // 4. Obtener Visitas del MES
        const { count: monthCount } = await window.sb
            .from('visitor_logs')
            .select('*', { count: 'exact', head: true })
            .gte('visited_at', startOfMonth);

        this.setNumber('stat-visitors-monthly', monthCount || 0);

        // 5. Obtener Visitas TOTALES
        const { count: totalCount } = await window.sb
            .from('visitor_logs')
            .select('*', { count: 'exact', head: true });

        this.setNumber('stat-visitors-total', totalCount || 0);
    },

    /**
     * Utilidad para inyectar números con formato (Dual mode: full & short)
     */
    setNumber(id, val) {
        const formattedFull = Number(val).toLocaleString();
        const formattedShort = this.formatShort(val);

        // Update all elements with [id]-full
        document.querySelectorAll(`#${id}-full, .${id}-full`).forEach(el => {
            el.innerText = formattedFull;
        });

        // Update all elements with [id]-short
        document.querySelectorAll(`#${id}-short, .${id}-short`).forEach(el => {
            el.innerText = formattedShort;
        });

        // Update all elements with the direct ID or Class
        document.querySelectorAll(`#${id}, .${id}`).forEach(el => {
            el.innerText = formattedFull;
        });
    },

    formatShort(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return num.toString();
    },

    /**
     * Escucha cambios en tiempo real desde Supabase
     */
    subscribeRealtime() {
        if (!window.sb) return;

        window.sb
            .channel('public:visitor_logs')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitor_logs' }, () => {
                this.updateUI();
            })
            .subscribe();
    }
};

window.StatsManager = StatsManager;
