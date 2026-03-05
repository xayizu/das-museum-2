$mainFooter = @"
    <!-- Footer -->
    <footer class="bg-[#05080f] pt-20 border-t border-white/5 relative z-50 mt-auto">
        <div class="max-w-[1400px] mx-auto px-6 pb-20">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-left">
                <!-- Branding -->
                <div class="col-span-1 md:col-span-1">
                    <div class="flex items-center gap-2 text-white mb-8">
                        <span class="material-symbols-outlined text-3xl text-primary">military_tech</span>
                        <span class="font-black text-lg tracking-tight uppercase">MUSEO DE TANQUES</span>
                    </div>
                    <p class="text-gray-500 text-sm leading-relaxed mb-8">
                        Preservando la historia del combate blindado para las futuras generaciones. Una experiencia educativa inmersiva única en el mundo.
                    </p>
                    <div class="flex gap-4">
                        <a href="#" class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                            <span class="material-symbols-outlined text-sm">public</span>
                        </a>
                        <a href="#" class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                            <span class="material-symbols-outlined text-sm">photo_camera</span>
                        </a>
                    </div>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-8 border-l-2 border-primary pl-3">Explora</h4>
                    <ul class="flex flex-col gap-4 text-gray-400 text-sm">
                        <li><a href="museo-tanques/index.html" class="hover:text-primary transition-colors">Tour Virtual 360°</a></li>
                        <li><a href="museo-tanques/gallery.html" class="hover:text-primary transition-colors">Galería de Tanques</a></li>
                        <li><a href="#" class="hover:text-primary transition-colors">Exhibiciones Temporales</a></li>
                        <li><a href="museo-tanques/events.html" class="hover:text-primary transition-colors">Calendario de Eventos</a></li>
                    </ul>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-8 border-l-2 border-primary pl-3">Información</h4>
                    <ul class="flex flex-col gap-4 text-gray-400 text-sm">
                        <li><a href="#" class="hover:text-primary transition-colors">Horarios y Precios</a></li>
                        <li><a href="#" class="hover:text-primary transition-colors">Cómo llegar</a></li>
                        <li><a href="#" class="hover:text-primary transition-colors">Grupos Escolares</a></li>
                        <li><a href="#" class="hover:text-primary transition-colors">Accesibilidad</a></li>
                        <li><a href="museo-tanques/preguntas.html" class="hover:text-primary transition-colors">Preguntas Frecuentes</a></li>
                        <li><a href="museo-tanques/donaciones.html" class="hover:text-primary transition-colors">Donaciones</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-8 border-l-2 border-primary pl-3">Contacto</h4>
                    <ul class="flex flex-col gap-6 text-gray-400 text-sm">
                        <li class="flex items-start gap-3">
                            <span class="material-symbols-outlined text-primary">location_on</span>
                            <span>Av. del Ejército 1945,<br>Ciudad Capital, CP 28000</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-primary">call</span>
                            <span>+34 91 5555 4188</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-primary">mail</span>
                            <span class="hover:text-primary cursor-pointer transition-colors">contacto@museotanques.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center bg-white/5 p-6 rounded-xl">
                <div class="flex items-center gap-4 mb-4 md:mb-0">
                    <div class="size-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span class="text-white font-bold text-xs uppercase tracking-widest">Registro de Operaciones</span>
                </div>
                <div class="flex gap-12">
                    <div class="text-right">
                        <span class="block text-[10px] text-gray-500 uppercase tracking-widest">Vehículos</span>
                        <span class="block text-xl font-mono font-bold text-white">2,845</span>
                    </div>
                    <div class="text-right">
                        <span class="block text-[10px] text-gray-500 uppercase tracking-widest">Total Marchas</span>
                        <span class="block text-xl font-mono font-bold text-white">1,029,<span class="text-primary">482</span></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="bg-black py-4 border-t border-white/5">
            <div class="max-w-[1400px] mx-auto px-6 flex justify-between items-center text-[10px] text-gray-600 uppercase">
                <p>© 2026 Complejo Museístico Dual. Todos los derechos reservados.</p>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-white">Política de Privacidad</a>
                    <a href="#" class="hover:text-white">Términos de Uso</a>
                </div>
            </div>
        </div>
    </footer>
"@

$casaHistoricaFooter = @"
    <!-- Footer Archivo -->
    <footer class="bg-slate-900 text-slate-300 pt-20 mt-auto border-t-4 border-accent-gold">
        <div class="max-w-[1400px] mx-auto px-6 pb-20">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-left">
                <!-- Branding -->
                <div class="col-span-1 md:col-span-1">
                    <div class="flex items-center gap-2 text-white mb-8">
                        <span class="material-symbols-outlined text-3xl text-accent-gold">account_balance</span>
                        <span class="font-serif text-xl tracking-tight">La Casa Histórica</span>
                    </div>
                    <p class="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                        Custodiando los recuerdos, las voces y la vida cotidiana de una nación. Un viaje íntimo a nuestro legado.
                    </p>
                    <div class="flex gap-4">
                        <a href="#" class="size-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-accent-gold hover:text-slate-900 hover:border-accent-gold transition-all">
                            <span class="material-symbols-outlined text-sm">public</span>
                        </a>
                        <a href="#" class="size-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-accent-gold hover:text-slate-900 hover:border-accent-gold transition-all">
                            <span class="material-symbols-outlined text-sm">photo_camera</span>
                        </a>
                    </div>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-8 border-l-2 border-accent-gold pl-3">Colecciones</h4>
                    <ul class="flex flex-col gap-4 text-slate-400 text-sm font-light">
                        <li><a href="gallery.html" class="hover:text-accent-gold transition-colors">Galería de Archivo</a></li>
                        <li><a href="#" class="hover:text-accent-gold transition-colors">Documentos Inéditos</a></li>
                        <li><a href="events.html" class="hover:text-accent-gold transition-colors">Eventos y Exposiciones</a></li>
                        <li><a href="#" class="hover:text-accent-gold transition-colors">Restauración</a></li>
                    </ul>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-8 border-l-2 border-accent-gold pl-3">Información</h4>
                    <ul class="flex flex-col gap-4 text-slate-400 text-sm font-light">
                        <li><a href="about.html" class="hover:text-accent-gold transition-colors">Nuestra Historia</a></li>
                        <li><a href="contact.html" class="hover:text-accent-gold transition-colors">Planifica tu Visita</a></li>
                        <li><a href="#" class="hover:text-accent-gold transition-colors">Normas de Conservación</a></li>
                        <li><a href="noticias.html" class="hover:text-accent-gold transition-colors">Boletín Oficial</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-8 border-l-2 border-accent-gold pl-3">Contacto</h4>
                    <ul class="flex flex-col gap-6 text-slate-400 text-sm font-light">
                        <li class="flex items-start gap-3">
                            <span class="material-symbols-outlined text-accent-gold">location_on</span>
                            <span>Paseo de las Acacias, Num. 12<br>Distrito Sur, CP 28012</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-accent-gold">call</span>
                            <span>+34 91 5555 4189</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-accent-gold">mail</span>
                            <span class="hover:text-accent-gold cursor-pointer transition-colors">archivo@casahistorica.org</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Stats Bar (Adapted for Casa Historica) -->
            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center bg-slate-800/50 p-6 rounded-xl">
                <div class="flex items-center gap-4 mb-4 md:mb-0">
                    <div class="size-2 rounded-full bg-accent-gold animate-pulse"></div>
                    <span class="text-slate-300 font-bold text-xs uppercase tracking-widest">Estado del Archivo</span>
                </div>
                <div class="flex gap-12">
                    <div class="text-right">
                        <span class="block text-[10px] text-slate-500 uppercase tracking-widest">Piezas Catalogadas</span>
                        <span class="block text-xl font-serif font-bold text-white">12,405</span>
                    </div>
                    <div class="text-right">
                        <span class="block text-[10px] text-slate-500 uppercase tracking-widest">Años de Historia</span>
                        <span class="block text-xl font-serif font-bold text-white">200<span class="text-accent-gold">+</span></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="bg-[#0b0f19] py-4 border-t border-slate-800">
            <div class="max-w-[1400px] mx-auto px-6 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest">
                <p>© 2026 Complejo Museístico Dual. Todos los derechos reservados.</p>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-slate-300">Política de Privacidad</a>
                    <a href="#" class="hover:text-slate-300">Términos de Uso</a>
                </div>
            </div>
        </div>
    </footer>
"@

function ReplaceFooter {
    param([string]$path, [string]$newFooter, [string]$startTag)
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    $startIndex = $content.IndexOf($startTag)
    $endIndex = $content.LastIndexOf("</footer>")
    
    if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
        $endIndex += "</footer>".Length
        $before = $content.Substring(0, $startIndex)
        $after = $content.Substring($endIndex)
        $final = $before + $newFooter + $after
        [System.IO.File]::WriteAllText($path, $final, [System.Text.Encoding]::UTF8)
    }
}

# 1. Main Index (Tank Museum Footer)
ReplaceFooter "public/index.html" $mainFooter "<!-- Unified Footer -->"

# 2. Casa Historica Pages (Casa Historica Footer)
$chFiles = Get-ChildItem "public/casa-historica/*.html"
foreach ($file in $chFiles) {
    if ($file.Name -in @("index.html", "about.html", "contact.html", "events.html", "gallery.html", "noticias.html")) {
        ReplaceFooter $file.FullName $casaHistoricaFooter "<!-- Footer Archivo -->"
    }
}
