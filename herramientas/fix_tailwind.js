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
    if (file === path.join(publicDir, 'index.html')) continue;

    let content = fs.readFileSync(file, 'utf8');

    if (content.includes('formás')) {
        content = content.replace(/formás/g, 'forms');
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
    }
}

console.log(`Corrupted Tailwind CDN links repaired on: ${fixedCount} files`);
