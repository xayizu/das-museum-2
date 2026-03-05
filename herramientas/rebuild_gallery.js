const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const galleryPath = path.join('public', 'museo-tanques', 'gallery.html');
const indexHtmlPath = path.join('public', 'museo-tanques', 'index.html');

let galleryHtml = fs.readFileSync(galleryPath, 'utf8');

// The file is corrupted with multiple html/body tags and a duplicate footer.
// Because it's so malformed, string replacement/regex is safer than a DOM parser that might try to "fix" it into memory wrong.
// But first, let's extract the main content (hero + grid + events) and the search modal.
// Then we'll build a fresh shell using index.html's clean top structure and footer.

const $index = cheerio.load(fs.readFileSync(indexHtmlPath, 'utf8'), { decodeEntities: false });
const topbarHtml = $index('.topbar-global.topbar-tanks').parent().html() || $index.html($index('.topbar-global.topbar-tanks'));
const footerHtml = $index('.footer-fusion-tanks').parent().html() || $index.html($index('.footer-fusion-tanks'));
const searchModalHtml = $index('#global-search-modal').parent().html() || $index.html($index('#global-search-modal'));

// We need to extract the specific main content of the gallery
// Using regex to grab between <!-- Gallery Hero --> and <!-- Footer -->
const heroMatch = galleryHtml.match(/<!-- Gallery Hero -->([\s\S]*?)<!-- Footer -->/i);
let mainContent = '';

if (heroMatch) {
    mainContent = heroMatch[1];
} else {
    // fallback to parsing if regex fails
    const $g = cheerio.load(galleryHtml);
    mainContent = $g('header').parent().html() || $g.html($g('header')) + '\n' + ($g('main').parent().html() || $g.html($g('main')));
}


// Build the clean fresh HTML

let freshHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Museos TAPI - Galería de Tanques</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script src="../js/config.js"></script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../css/main.css">
    <script src="../js/main.js" defer></script>

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
</head>
<body class="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
    <!-- Global Minimalist Topbar -->
    ${topbarHtml}
    
    <!-- Gallery Main Content -->
    ${mainContent}

    <!-- Footer -->
    ${footerHtml}

    <!-- Search Modal -->
    ${searchModalHtml}

</body>
</html>`;

fs.writeFileSync(galleryPath, freshHtml, 'utf8');
console.log('Sanitized and rebuilt gallery.html');
