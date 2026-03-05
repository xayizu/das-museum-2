const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = 'public/museo-tanques';
const indexHtmlPath = path.join(dir, 'index.html');
const galleryHtmlPath = path.join(dir, 'gallery.html');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const galleryHtml = fs.readFileSync(galleryHtmlPath, 'utf8');

const $index = cheerio.load(indexHtml, { decodeEntities: false });
const $gallery = cheerio.load(galleryHtml, { decodeEntities: false });

// Extract the topbar from index.html
const topbarHtml = $index('.topbar-global.topbar-tanks').parent().html() || $index.html($index('.topbar-global.topbar-tanks'));

// Check if gallery.html already has one, if so replace it, otherwise prepend to body, before header
if ($gallery('.topbar-global').length > 0) {
    $gallery('.topbar-global').replaceWith(topbarHtml);
} else {
    $gallery('body').prepend(topbarHtml);
}

// Fix search modal inside gallery.html if it misses it, but it already has one at the bottom.
// Ensure icons have correct default state matching main.js (although main.js handles it on load)

fs.writeFileSync(galleryHtmlPath, $gallery.html(), 'utf8');
console.log('Restored topbar in gallery.html');
