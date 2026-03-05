/**
 * MUSEOS TAPI: SUPABASE CLIENT CONFIGURATION
 * Central de conexión con el backend de Supabase
 */

// Configuración de credenciales (Remplazar con tus datos reales de Supabase)
const SB_URL = 'https://cocayhpiwehwtvjotbyl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvY2F5aHBpd2Vod3R2am90YnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzA4NjEsImV4cCI6MjA4NzU0Njg2MX0.x7VPUwd7_cQDdUHPhbzO3V4lcb5G4fvKCD1wmb78N0s';

// Inicialización del cliente global
let supabaseClient = null;

try {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SB_URL, SB_KEY);
        console.log('✅ Supabase: Cliente inicializado correctamente.');
    } else {
        console.warn('⚠️ Supabase: El SDK no se ha cargado. Verifica el script CDN en el index.');
    }
} catch (error) {
    console.error('❌ Supabase: Error de inicialización:', error);
}

// Exportar para uso en otros módulos
window.sb = supabaseClient;
