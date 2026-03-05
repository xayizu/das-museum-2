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

const newUtilsBlock = `
            <!-- Right: Utilities -->
            <div class="topbar-utils">
                <button class="util-btn" onclick="window.handleSearch()" aria-label="Buscar"><span class="material-symbols-outlined">search</span></button>
<div class="util-divider"></div>
<button class="util-btn lang-toggle" onclick="window.handleLang()" aria-label="Cambiar Idioma">
    <svg class="flag-es" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="24" height="16" style="border-radius: 2px;">
        <rect width="750" height="500" fill="#c60b1e"></rect>
        <rect y="125" width="750" height="250" fill="#ffc400"></rect>
        <circle cx="250" cy="250" r="50" fill="#c60b1e"></circle>
    </svg>
    <svg class="flag-en hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" width="24" height="16" style="border-radius: 2px;">
        <rect width="7410" height="3900" fill="#b22234"></rect>
        <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" stroke-width="300"></path>
        <rect width="2964" height="2100" fill="#3c3b6e"></rect>
        <g fill="#fff">
            <circle cx="200" cy="200" r="30"></circle>
            <circle cx="400" cy="200" r="30"></circle>
        </g>
    </svg>
</button>
<div class="util-divider"></div>
<button class="util-btn theme-toggle" onclick="window.toggleTheme()" aria-label="Modo Día/Noche"><span class="material-symbols-outlined">light_mode</span></button>
<div class="util-divider"></div>
<button class="util-btn bg-music-toggle" onclick="window.toggleBackgroundMusic()" aria-label="Música de Ambiente"><span class="material-symbols-outlined" id="bg-music-icon">volume_off</span></button>
<div class="util-divider"></div>
                <a href="../register.html" class="util-btn" aria-label="Perfil de Usuario"><span class="material-symbols-outlined">account_circle</span></a>
            </div>
`;

let fixedCount = 0;

for (const file of htmlFiles) {
    if (file === path.join(publicDir, 'index.html')) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Replace the entire topbar-utils div with the new complex one
    // Regex matches <div class="topbar-utils"> ... </div>
    const regex = /<!-- Right: Utilities -->[\s\S]*?<div class="topbar-utils">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;

    // Check if the current file has the old layout
    if (content.match(/<div class="topbar-utils">/)) {
        // Need to target just the utils block
        content = content.replace(/<!-- Right: Utilities -->[\s\S]*?<div class="topbar-utils">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, newUtilsBlock + '\n        </div>\n    </div>');
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
    }
}

console.log(`Updated Utilities Block in ${fixedCount} files`);
