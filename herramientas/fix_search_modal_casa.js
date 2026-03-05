const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = 'public/casa-historica';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const fullPath = path.join(dir, file);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Using cheerio with decodeEntities: false to avoid corrupting Spanish chars
    // However, cheerio sometimes messes up DOCTYPE or script tags.
    // Instead of completely parsing with cheerio and overwriting, we can just replace strings,
    // or use Cheerio if the markup is clean.

    // Let's use simple string replacements for the modal classes since they are consistent
    let newContent = content;

    // 1. Modal Container
    newContent = newContent.replace(
        'class="bg-surface-dark dark:bg-slate-900 border border-white/10 dark:border-slate-700 w-full max-w-2xl p-6 shadow-2xl rounded-xl transform scale-95 transition-transform duration-300"',
        'class="bg-white border border-[#c5a065]/30 w-full max-w-2xl p-6 shadow-2xl rounded-xl transform scale-95 transition-transform duration-300 font-serif"'
    );

    // 2. Modal Title
    newContent = newContent.replace(
        'class="text-white dark:text-slate-100 font-bold text-lg flex items-center gap-2"',
        'class="text-slate-900 font-bold text-xl flex items-center gap-2"'
    );

    // 3. Modal Close Button
    newContent = newContent.replace(
        'class="text-gray-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-300 transition-colors"',
        'class="text-slate-500 hover:text-[#c5a065] transition-colors"'
    );

    // 4. Modal Input
    newContent = newContent.replace(
        'class="w-full bg-black/50 dark:bg-slate-800 border border-white/20 dark:border-slate-600 rounded-lg px-4 py-4 text-white dark:text-slate-100 focus:outline-none focus:border-primary dark:focus:border-blue-500 text-lg"',
        'class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-4 text-slate-900 focus:outline-none focus:border-[#c5a065] focus:ring-1 focus:ring-[#c5a065] text-lg font-serif placeholder-slate-400"'
    );

    // 5. Modal Search Button
    newContent = newContent.replace(
        'class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors"',
        'class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#c5a065] hover:bg-[#b08d55] text-white px-4 py-2 rounded-md text-sm font-bold uppercase tracking-widest transition-colors font-serif"'
    );

    // 6. Feedback text
    newContent = newContent.replace(
        'class="mt-4 text-sm text-gray-400 dark:text-slate-500 hidden"',
        'class="mt-4 text-sm text-slate-500 font-serif italic hidden"'
    );

    // Also update any potential duplicates if they exist, string replace usually does just the first occurrence.
    // So we use Regex with global flag if needed, but since we cleaned duplicates earlier, one replace is fine.

    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log('Fixed search modal in', file);
});
