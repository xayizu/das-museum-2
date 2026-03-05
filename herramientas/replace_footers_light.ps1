$casaHistoricaFooterLight = @"
    <!-- Footer Archivo -->
    <footer class="bg-white text-slate-700 pt-20 mt-auto border-t-4 border-accent-gold relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div class="max-w-[1400px] mx-auto px-6 pb-20">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-left">
                <!-- Branding -->
                <div class="col-span-1 md:col-span-1">
                    <div class="flex items-center gap-2 text-slate-900 mb-8">
                        <span class="material-symbols-outlined text-3xl text-accent-gold">account_balance</span>
                        <span class="font-serif font-bold text-xl tracking-tight">La Casa Histórica</span>
                    </div>
                    <p class="text-slate-600 text-sm leading-relaxed mb-8 font-light">
                        Custodiando los recuerdos, las voces y la vida cotidiana de una nación. Un viaje íntimo a nuestro legado.
                    </p>
                    <div class="flex gap-4">
                        <a href="#" class="size-10 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-accent-gold hover:text-white hover:border-accent-gold transition-all">
                            <span class="material-symbols-outlined text-sm">public</span>
                        </a>
                        <a href="#" class="size-10 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-accent-gold hover:text-white hover:border-accent-gold transition-all">
                            <span class="material-symbols-outlined text-sm">photo_camera</span>
                        </a>
                    </div>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="text-slate-900 text-xs font-bold uppercase tracking-widest mb-8 border-l-2 border-accent-gold pl-3">Colecciones</h4>
                    <ul class="flex flex-col gap-4 text-slate-600 text-sm font-light">
                        <li><a href="gallery.html" class="hover:text-accent-gold transition-colors">Galería de Archivo</a></li>
                        <li><a href="#" class="hover:text-accent-gold transition-colors">Documentos Inéditos</a></li>
                        <li><a href="events.html" class="hover:text-accent-gold transition-colors">Eventos y Exposiciones</a></li>
                        <li><a href="#" class="hover:text-accent-gold transition-colors">Restauración</a></li>
                    </ul>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="text-slate-900 text-xs font-bold uppercase tracking-widest mb-8 border-l-2 border-accent-gold pl-3">Información</h4>
                    <ul class="flex flex-col gap-4 text-slate-600 text-sm font-light">
                        <li><a href="about.html" class="hover:text-accent-gold transition-colors">Nuestra Historia</a></li>
                        <li><a href="contact.html" class="hover:text-accent-gold transition-colors">Planifica tu Visita</a></li>
                        <li><a href="#" class="hover:text-accent-gold transition-colors">Normas de Conservación</a></li>
                        <li><a href="noticias.html" class="hover:text-accent-gold transition-colors">Boletín Oficial</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="text-slate-900 text-xs font-bold uppercase tracking-widest mb-8 border-l-2 border-accent-gold pl-3">Contacto</h4>
                    <ul class="flex flex-col gap-6 text-slate-600 text-sm font-light">
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

            <!-- Stats Bar -->
            <div class="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center bg-slate-50/80 p-6 rounded-xl">
                <div class="flex items-center gap-4 mb-4 md:mb-0">
                    <div class="size-2 rounded-full bg-accent-gold animate-pulse"></div>
                    <span class="text-slate-800 font-bold text-xs uppercase tracking-widest">Estado del Archivo</span>
                </div>
                <div class="flex gap-12">
                    <div class="text-right">
                        <span class="block text-[10px] text-slate-500 uppercase tracking-widest">Piezas Catalogadas</span>
                        <span class="block text-xl font-serif font-bold text-slate-900">12,405</span>
                    </div>
                    <div class="text-right">
                        <span class="block text-[10px] text-slate-500 uppercase tracking-widest">Años de Historia</span>
                        <span class="block text-xl font-serif font-bold text-slate-900">200<span class="text-accent-gold">+</span></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="bg-slate-100 py-4 border-t border-slate-200">
            <div class="max-w-[1400px] mx-auto px-6 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest">
                <p>© 2026 Complejo Museístico Dual. Área Histórica.</p>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-slate-800 transition-colors">Política de Privacidad</a>
                    <a href="#" class="hover:text-slate-800 transition-colors">Términos de Uso</a>
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

$chFiles = Get-ChildItem "public/casa-historica/*.html"
foreach ($file in $chFiles) {
    if ($file.Name -in @("index.html", "about.html", "contact.html", "events.html", "gallery.html", "noticias.html")) {
        ReplaceFooter $file.FullName $casaHistoricaFooterLight "<!-- Footer Archivo -->"
    }
}
