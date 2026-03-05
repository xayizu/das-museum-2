const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // Since we saw node_modules/cheerio in our earlier grep run

const dir = 'public/casa-historica';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const fullPath = path.join(dir, file);
    const content = fs.readFileSync(fullPath, 'utf8');

    const $ = cheerio.load(content, { decodeEntities: false });

    // 1. Remove duplicated topbars
    const topbars = $('.topbar-casa');
    if (topbars.length > 1) {
        // Keep the first one, remove the rest
        topbars.slice(1).remove();
    }

    // 2. Remove duplicated navs
    const navs = $('nav.bg-white\\/95, nav.bg-\\[\\#0f172a\\]\\/95');
    if (navs.length > 1) {
        navs.slice(1).remove();
    }

    // 3. Update topbar-logo to be gold directly via inline style
    const logo = $('.topbar-casa .topbar-logo');
    if (logo.length) {
        // override class invert brightness-200 with inline filter and generic classes
        logo.attr('class', 'h-10 w-auto');
        logo.attr('style', 'filter: brightness(0) saturate(100%) invert(75%) sepia(35%) saturate(738%) hue-rotate(352deg) brightness(85%) contrast(87%);');
    }

    // 4. Update index.html body explicitly
    if (file === 'index.html') {
        const bd = $('body');
        bd.attr('class', 'bg-[#faf9f6] text-slate-900 min-h-screen flex flex-col font-serif transition-colors duration-300');
    }

    // 5. Ensure secondary nav exists and is visible with elegant colors
    const elegantNavClass = 'bg-white/95 backdrop-blur-md border-b border-[#c5a065]/30 hidden md:block w-full z-40 relative shadow-sm';
    const mainNav = $('nav').first();
    if (mainNav.length) {
        mainNav.attr('class', elegantNavClass);
        // change text colors
        mainNav.find('ul').attr('class', 'flex justify-center flex-wrap items-center gap-6 py-3 text-xs md:text-sm font-serif font-bold uppercase tracking-widest text-slate-800');
    }

    // 6. Fix "La Casa Histórica" missing content in index.html by injecting a Hero structure similar to gallery
    if (file === 'index.html') {
        // replace "text-center" construction div if it exists
        const buildDiv = $('.text-center').filter((i, el) => $(el).text().includes('Página en construcción'));
        if (buildDiv.length) {
            buildDiv.replaceWith(`
    <main class="flex-grow flex flex-col items-center">
        <!-- Hero Section Elegant -->
        <section class="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 z-0">
                <div class="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-[#faf9f6] z-10"></div>
                <div class="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 transform scale-105"
                    style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBxFp_wmoaAg7rnNeQUbTKmkXo78anS5diZUuFB48LCLmk6V87Z3pw_rEgBP0qhvxTrBpSGkBkUK3NHfXAZ6yRQpvOIoY3okacpkG7aFWIB-qP-UPNhOMSuzXINXpy-hMgL3vJuL_x_0w3MP2YwXAVrYi4dU3-roFcfOBepM9341Yhpb4kShSkipcqOmcVybJd77ICHoTTT5_oQa4i1216lkQVUH-sZGpikhdSXl-uD7YAlM5vdHV5f7__TjO67CP9f6TfutdZXehQ');">
                </div>
            </div>
            
            <div class="relative z-20 text-center px-6 max-w-4xl mx-auto mt-16">
                <span class="inline-block px-4 py-1 border border-accent-gold text-accent-gold text-xs font-bold uppercase tracking-[0.3em] mb-6 rounded-full bg-white/50 backdrop-blur-sm">Bienvenidos</span>
                <h1 class="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight mb-6">
                    La Casa <span class="italic font-light text-accent-gold">Histórica</span>
                </h1>
                <p class="text-lg md:text-xl text-slate-700 font-serif max-w-2xl mx-auto leading-relaxed mb-10">
                    Un viaje a la intimidad del pasado. Descubre la elegancia y el legado de 200 años de historia preservada entre nuestros muros.
                </p>
                <div class="flex justify-center gap-6">
                    <a href="gallery.html" class="px-8 py-3 bg-accent-gold text-white rounded-sm font-bold uppercase tracking-widest hover:bg-[#b08d55] transition-colors shadow-lg shadow-accent-gold/30">Explorar Colección</a>
                    <a href="contact.html" class="px-8 py-3 bg-white text-slate-900 rounded-sm font-bold uppercase tracking-widest border border-slate-200 hover:border-accent-gold transition-colors">Visítanos</a>
                </div>
            </div>
        </section>
        
        <!-- Highlights -->
        <section class="max-w-[1400px] w-full mx-auto px-6 py-24">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="text-center group">
                    <div class="size-16 mx-auto rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-accent-gold group-hover:text-white transition-all duration-300">
                        <span class="material-symbols-outlined text-3xl text-accent-gold group-hover:text-white">auto_stories</span>
                    </div>
                    <h3 class="text-xl font-serif font-bold text-slate-900 mb-4">Archivo Documental</h3>
                    <p class="text-slate-600">Miles de manuscritos originales, cartas y firmas históricas a tu disposición.</p>
                </div>
                <div class="text-center group">
                    <div class="size-16 mx-auto rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-accent-gold group-hover:text-white transition-all duration-300">
                        <span class="material-symbols-outlined text-3xl text-accent-gold group-hover:text-white">diamond</span>
                    </div>
                    <h3 class="text-xl font-serif font-bold text-slate-900 mb-4">Mobiliario y Joyas</h3>
                    <p class="text-slate-600">Preservación meticulosa de objetos cotidianos de alto valor de la época dorada.</p>
                </div>
                <div class="text-center group">
                    <div class="size-16 mx-auto rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-accent-gold group-hover:text-white transition-all duration-300">
                        <span class="material-symbols-outlined text-3xl text-accent-gold group-hover:text-white">event</span>
                    </div>
                    <h3 class="text-xl font-serif font-bold text-slate-900 mb-4">Eventos Exclusivos</h3>
                    <p class="text-slate-600">Exposiciones temáticas y salones disponibles para eventos con un aura histórica.</p>
                </div>
            </div>
        </section>
    </main>
            `);
        }
    }

    fs.writeFileSync(fullPath, $.html());
    console.log('Fixed', file);
});
