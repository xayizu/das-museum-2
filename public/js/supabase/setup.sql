-- ==========================================
-- MUSEOS TAPI: SUPABASE DATABASE SETUP
-- ==========================================

-- 1. TABLA: ESTADÍSTICAS GLOBALES
-- Almacena los contadores totales del complejo
CREATE TABLE IF NOT EXISTS public.complejo_stats (
    id TEXT PRIMARY KEY DEFAULT 'main_config',
    vehicles_count BIGINT DEFAULT 2845,
    archives_count BIGINT DEFAULT 12405,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Registrar el registro inicial si no existe
INSERT INTO public.complejo_stats (id) VALUES ('main_config') ON CONFLICT DO NOTHING;

-- 2. TABLA: LOG DE VISITANTES
-- Registra cada visita individual para cálculos diarios y semanales
CREATE TABLE IF NOT EXISTS public.visitor_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visited_at TIMESTAMPTZ DEFAULT NOW(),
    platform TEXT, -- web, mobile, etc.
    session_id TEXT -- opcional
);

-- 3. TABLA: PUNTAJES (LEADERBOARD)
-- Almacena el ranking de jugadores/usuarios
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    avatar_url TEXT,
    score BIGINT DEFAULT 0,
    rank_level TEXT DEFAULT 'Bronce', -- 'Plata', 'Oro', 'Diamante', 'As de Blindaje'
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ==========================================

-- Permitir lectura pública de estadísticas
ALTER TABLE public.complejo_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura Pública de Stats" ON public.complejo_stats FOR SELECT USING (true);

-- Permitir que cualquier usuario registre su visita
ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registro de Visitas Público" ON public.visitor_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Lectura Pública de Visitas" ON public.visitor_logs FOR SELECT USING (true);

-- Leaderboard: Lectura pública, escritura solo por el dueño
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura Pública Leaderboard" ON public.leaderboard FOR SELECT USING (true);
CREATE POLICY "Dueño Actualiza su Score" ON public.leaderboard FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Dueño Inserta su Score" ON public.leaderboard FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- REALTIME (Para que los números cambien en vivo)
-- ==========================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.complejo_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard;
