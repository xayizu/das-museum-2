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

const tailwindCSSBlock = `
    <style type="text/tailwindcss">
        @layer components {
            .topbar-global {
                @apply w-full bg-[#0a0f18] text-white border-b border-[#1f2937] py-3 z-50 relative;
            }
            .topbar-container {
                @apply max-w-[1400px] mx-auto px-6 flex justify-between items-center;
            }
            .topbar-brand {
                @apply flex items-center gap-3 hover:opacity-80 transition-opacity;
            }
            .topbar-logo {
                @apply h-8 w-auto invert brightness-200;
            }
            .topbar-titles {
                @apply flex flex-col leading-none text-left;
            }
            .topbar-subtitle {
                @apply font-serif italic text-[10px] text-gray-400 leading-tight;
            }
            .topbar-title {
                @apply font-bold text-sm tracking-widest uppercase text-white;
            }
            .topbar-utils {
                @apply flex items-center gap-4;
            }
            .util-btn {
                @apply text-gray-400 hover:text-white transition-colors flex items-center justify-center;
            }
            .util-divider {
                @apply w-px h-4 bg-gray-700 hidden md:block;
            }
            .topbar-cta {
                @apply border border-primary text-primary hover:bg-primary hover:text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded ml-2 hidden md:block;
            }
        }
    </style>
`;

let modifiedCount = 0;

for (const file of htmlFiles) {
    if (file === path.join(publicDir, 'index.html')) {
        continue; // Skip the main index.html as it's already fixed
    }

    let content = fs.readFileSync(file, 'utf8');

    // Remove any malformed blocks from previous attempts
    content = content.replace(/<style type="text\/tailwindcss">[\s\S]*?<\/style>\s*(?=<\/head>)/g, '');

    // Check if it already has the block
    if (!content.includes('.topbar-global {') && !content.includes('<style type="text/tailwindcss">')) {
        // Insert it right before </head>
        content = content.replace('</head>', tailwindCSSBlock + '\n</head>');
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
}

console.log(`Successfully injected Tailwind CSS block into ${modifiedCount} files.`);
