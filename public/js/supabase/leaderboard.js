/**
 * MUSEOS TAPI: LEADERBOARD MANAGER
 * Manejo de puntajes, niveles y ranking de usuarios
 */

const LeaderboardManager = {
    /**
     * Obtiene los mejores puntajes de la base de datos
     */
    async fetchTopScores() {
        if (!window.sb) return;

        try {
            const { data, error } = await window.sb
                .from('leaderboard')
                .select('*')
                .order('score', { ascending: false })
                .limit(10);

            if (error) throw error;
            this.render(data);
        } catch (err) {
            console.error('❌ Error al cargar leaderboard:', err);
        }
    },

    /**
     * Renderiza los puntajes en el UI (Tablero de Mando)
     */
    render(data) {
        // IDs: ases-blindaje, guardianes-historia (según tu index.html)
        const asList = document.querySelector('#ases-blindaje ul');
        const guardList = document.querySelector('#guardianes-historia ul');

        if (!asList || !guardList) return;

        // Limpiar listas anteriores
        asList.innerHTML = '';
        guardList.innerHTML = '';

        data.forEach((entry, idx) => {
            const item = this.createItem(entry, idx);
            if (idx < 5) {
                asList.appendChild(item);
            } else {
                guardList.appendChild(item);
            }
        });
    },

    /**
     * Crea un elemento de lista para el ranking
     */
    createItem(entry, idx) {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-all';
        li.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-xs font-black text-gray-500 w-4">#${idx + 1}</span>
                <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    ${entry.username.charAt(0).toUpperCase()}
                </div>
                <div>
                    <span class="block text-sm font-bold text-white">${entry.username}</span>
                    <span class="block text-[10px] text-gray-500 uppercase">${entry.rank_level}</span>
                </div>
            </div>
            <span class="font-mono font-black text-primary text-sm">${entry.score.toLocaleString()} PTS</span>
        `;
        return li;
    },

    /**
     * Sube un nuevo puntaje (Usado al completar niveles o logros)
     */
    async submitScore(userId, score, username) {
        if (!window.sb) return;

        try {
            const { error } = await window.sb
                .from('leaderboard')
                .upsert({ user_id: userId, score: score, username: username });

            if (error) throw error;
            this.fetchTopScores(); // Recargar UI
        } catch (err) {
            console.error('❌ Error al subir puntaje:', err);
        }
    }
};

window.LeaderboardManager = LeaderboardManager;
