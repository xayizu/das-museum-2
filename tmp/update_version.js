const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else {
            if (filePath.endsWith('.html')) results.push(filePath);
        }
    });
    return results;
}

const files = walk('./public');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(/main\.js\?v=[^"']+/g, 'main.js?v=307');
    if (content !== updated) {
        fs.writeFileSync(file, updated, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
