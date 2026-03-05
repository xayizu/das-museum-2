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
let fixedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');

    // Check if the Agendar Visita CTA exists
    if (content.match(/<a[^>]*class="[^"]*topbar-cta[^"]*"[^>]*>.*?<\/a>/i)) {
        // Remove it completely
        content = content.replace(/<a[^>]*class="[^"]*topbar-cta[^"]*"[^>]*>.*?<\/a>/i, '');
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
    }
}

console.log(`Removed 'Agendar Visita' button from ${fixedCount} files`);
