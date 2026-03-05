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

const correctHead = `<!DOCTYPE html>
<html lang="es"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Museos TAPI</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script src="../js/config.js"></script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../css/main.css">
    <script src="../js/main.js" defer=""></script>

    <style type="text/tailwindcss">
        @layer components {
            .topbar-global { @apply w-full bg-[#0a0f18] text-white border-b border-[#1f2937] py-3 z-50 relative; }
            .topbar-container { @apply max-w-[1400px] mx-auto px-6 flex justify-between items-center; }
            .topbar-brand { @apply flex items-center gap-3 hover:opacity-80 transition-opacity; }
            .topbar-logo { @apply h-8 w-auto invert brightness-200; }
            .topbar-titles { @apply flex flex-col leading-none text-left; }
            .topbar-subtitle { @apply font-serif italic text-[10px] text-gray-400 leading-tight; }
            .topbar-title { @apply font-bold text-sm tracking-widest uppercase text-white; }
            .topbar-utils { @apply flex items-center gap-4; }
            .util-btn { @apply text-gray-400 hover:text-white transition-colors flex items-center justify-center; }
            .util-divider { @apply w-px h-4 bg-gray-700 hidden md:block; }
            .topbar-cta { @apply border border-primary text-primary hover:bg-primary hover:text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded ml-2 hidden md:block; }
        }
    </style>
</head>`;

let fixedCount = 0;

for (const file of htmlFiles) {
    if (file === path.join(publicDir, 'index.html')) continue;

    let content = fs.readFileSync(file, 'utf8');

    // Completely wipe and replace everything from the beginning of the file up to </head>
    content = content.replace(/[\s\S]*?<\/head>/i, correctHead);

    fs.writeFileSync(file, content, 'utf8');
    fixedCount++;
}

console.log(`Completely rebuilt <head> blocks on ${fixedCount} subpage files`);
