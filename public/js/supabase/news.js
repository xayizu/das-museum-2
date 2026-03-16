/**
 * MUSEOS TAPI: NEWS MANAGER
 * Controla la carga dinámica del modal de noticias desde Supabase
 */

const NewsManager = {
    /**
     * Obtiene la noticia más reciente activa
     */
    async fetchLatestNews() {
        if (!window.sb) return null;

        try {
            const { data, error } = await window.sb
                .from('noticias')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (error) {
                if (error.code !== 'PGRST116') { // No se encontró ninguna fila
                    console.error('❌ NewsManager: Error al obtener noticias:', error);
                }
                return null;
            }

            return data;
        } catch (err) {
            console.error('❌ NewsManager: Error inesperado:', err);
            return null;
        }
    },

    /**
     * Actualiza el modal con los datos obtenidos
     */
    updateModalUI(news) {
        if (!news) return;

        // Elementos del modal
        const headerLabel = document.querySelector('#news-modal h3[data-i18n="anuncio_importante"]');
        const subtitle = document.querySelector('#news-modal p[data-i18n="actualizacion_museo"]');
        const bannerImg = document.querySelector('#news-modal .group-banner img');
        const title = document.querySelector('#news-modal h2[data-i18n="sitio_en_construccion"]');
        const description = document.querySelector('#news-modal p[data-i18n="msg_construccion"]');
        const dateLabel = document.querySelector('#news-modal span[data-i18n="despliegue_estimado"]');
        const dateValue = document.querySelector('#news-modal span[data-i18n="fecha_final"]');
        const button = document.querySelector('#news-modal button[onclick="closeNewsModal()"]:not(.group)');

        if (headerLabel && news.header_label) headerLabel.textContent = news.header_label;
        if (subtitle && news.subtitle) subtitle.textContent = news.subtitle;
        if (bannerImg && news.banner_url) bannerImg.src = news.banner_url;
        if (title && news.title) title.textContent = news.title;
        if (description && news.description) description.textContent = news.description;
        if (dateLabel && news.date_label) dateLabel.textContent = news.date_label;
        if (dateValue && news.date_value) dateValue.textContent = news.date_value;
        if (button && news.button_text) button.textContent = news.button_text;
    }
};

window.NewsManager = NewsManager;
