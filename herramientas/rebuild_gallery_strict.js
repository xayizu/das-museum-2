const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const galleryPath = path.join('public', 'museo-tanques', 'gallery.html');
const indexHtmlPath = path.join('public', 'museo-tanques', 'index.html');

const galleryHtml = fs.readFileSync(galleryPath, 'utf8');

// Strict extraction of the only 2 elements we care about from the corrupted gallery
const heroMatch = galleryHtml.match(/<header class="py-16 px-6 bg-gradient-to-b[^>]*>[\s\S]*?<\/header>/);
const mainMatch = galleryHtml.match(/<main class="flex-grow py-20 px-6">[\s\S]*?<\/main>/);

const cleanGalleryContent = (heroMatch ? `<!-- Gallery Hero -->\n    ${heroMatch[0]}` : '') +
    '\n\n    ' +
    (mainMatch ? mainMatch[0] : '');

// Use index.html as a pristine shell
const $index = cheerio.load(fs.readFileSync(indexHtmlPath, 'utf8'), { decodeEntities: false });

// Safely extract outerHTML using cheerio's $.html(selection)
const topbarHtml = $index.html($index('.topbar-global.topbar-tanks'));
const footerHtml = $index.html($index('.footer-fusion-tanks'));
const searchModalHtml = $index.html($index('#global-search-modal'));

const freshHtml = `<!DOCTYPE html>
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
    
    ${cleanGalleryContent}

    <!-- Footer -->
    ${footerHtml}

    <!-- Search Modal -->
    ${searchModalHtml}
</body>
</html>`;

fs.writeFileSync(galleryPath, freshHtml, 'utf8');
console.log('Successfully extracted precise outerHTML blocks and rebuilt gallery.html cleanly.');
