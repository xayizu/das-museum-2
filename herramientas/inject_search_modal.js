const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getHtmlFiles(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles(publicDir);

const searchModalBlock = `
    <!-- Search Modal (Hidden by default) -->
    <div id="global-search-modal"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] hidden items-start justify-center pt-32 opacity-0 transition-opacity duration-300">
        <div class="bg-surface-dark dark:bg-slate-900 border border-white/10 dark:border-slate-700 w-full max-w-2xl p-6 shadow-2xl rounded-xl transform scale-95 transition-transform duration-300"
            id="search-modal-content">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-white dark:text-slate-100 font-bold text-lg flex items-center gap-2">
                    <span class="material-symbols-outlined">search</span>
                    Búsqueda Global
                </h3>
                <button onclick="closeSearch()"
                    class="text-gray-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-300 transition-colors">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="relative">
                <input type="text" id="global-search-input"
                    class="w-full bg-black/50 dark:bg-slate-800 border border-white/20 dark:border-slate-600 rounded-lg px-4 py-4 text-white dark:text-slate-100 focus:outline-none focus:border-primary dark:focus:border-blue-500 text-lg"
                    placeholder="Escribe para buscar contenidos en esta página..."
                    onkeyup="if(event.key === 'Enter') executeSearch()">
                <button onclick="executeSearch()"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors">Buscar</button>
            </div>
            <div id="search-results-feedback" class="mt-4 text-sm text-gray-400 dark:text-slate-500 hidden"></div>
        </div>
    </div>
</body>`;

let fixedCount = 0;

for (const file of htmlFiles) {
    if (file === path.join(publicDir, 'index.html')) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Inject it replacing the closing body tag
    if (!content.includes('id="global-search-modal"')) {
        content = content.replace(/(<\/body>|<body><!-- Global Minimalist Topbar -->[\s\S]*<!-- Search Modal \(Hidden by default\) -->[\s\S]*?<\/body>)/i, searchModalBlock);
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
    }
}

console.log(`Injected Search Modal into ${fixedCount} files`);
