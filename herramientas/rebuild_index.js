const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'public', 'index.html');

const htmlContent = `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Complejo Museístico Dual</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800;900&family=Noto+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <!-- Material Symbols -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script src="js/config.js"></script>
    <link rel="stylesheet" href="css/main.css">

    <style>
        /* Custom utilities for the split effect */
        .clip-diagonal-left {
            clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
        }

        .clip-diagonal-right {
            clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
        }

        @media (max-width: 768px) {

            .clip-diagonal-left,
            .clip-diagonal-right {
                clip-path: none;
            }
        }

        .text-shadow-strong {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .bg-grain {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }

        /* Sidebar Animations */
        #left-sidebar {
            transform: translateX(-100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        #left-sidebar.open {
            transform: translateX(0);
        }

        #right-sidebar {
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        #right-sidebar.open {
            transform: translateX(0);
        }

        .overlay {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
        }

        .overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
    </style>
</head>

<body
    class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-x-hidden">

    <!-- OVERLAYS -->
    <div id="left-overlay" class="overlay fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onclick="toggleLeftMenu()">
    </div>
    <div id="right-overlay" class="overlay fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onclick="toggleRightMenu()">
    </div>

    <!-- LEFT SIDEBAR (MUSEO DE TANQUES) -->
    <aside id="left-sidebar"
        class="fixed top-0 left-0 h-full w-80 bg-military-dark border-r border-white/10 z-50 flex flex-col pt-10">
        <div class="px-8 pb-8 flex items-center justify-between border-b border-white/10">
            <div class="flex flex-col">
                <span class="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Museo de</span>
                <span class="text-2xl font-black uppercase text-white tracking-tighter">Tanques</span>
            </div>
            <button onclick="toggleLeftMenu()" class="text-gray-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined text-3xl">close</span>
            </button>
        </div>
        <nav class="flex-1 px-8 py-10 flex flex-col gap-6">
            <a href="museo-tanques/gallery.html"
                class="group flex items-center gap-4 text-gray-300 hover:text-primary transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">view_in_ar</span>
                <span class="font-bold text-lg uppercase tracking-wider">Galería 3D</span>
            </a>
            <a href="museo-tanques/events.html"
                class="group flex items-center gap-4 text-gray-300 hover:text-primary transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">event</span>
                <span class="font-bold text-lg uppercase tracking-wider">Eventos</span>
            </a>
            <a href="museo-tanques/about.html"
                class="group flex items-center gap-4 text-gray-300 hover:text-primary transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">menu_book</span>
                <span class="font-bold text-lg uppercase tracking-wider">Historia</span>
            </a>
            <a href="museo-tanques/noticias.html"
                class="group flex items-center gap-4 text-gray-300 hover:text-primary transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">newspaper</span>
                <span class="font-bold text-lg uppercase tracking-wider">Noticias</span>
            </a>
            <a href="museo-tanques/contact.html"
                class="group flex items-center gap-4 text-gray-300 hover:text-primary transition-colors">
                <span
                    class="material-symbols-outlined group-hover:scale-110 transition-transform">confirmation_number</span>
                <span class="font-bold text-lg uppercase tracking-wider">Visitas</span>
            </a>
            <a href="museo-tanques/preguntas.html"
                class="group flex items-center gap-4 text-gray-300 hover:text-primary transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">help_center</span>
                <span class="font-bold text-lg uppercase tracking-wider">Preguntas</span>
            </a>
            <a href="museo-tanques/donaciones.html"
                class="group flex items-center gap-4 text-gray-300 hover:text-primary transition-colors">
                <span
                    class="material-symbols-outlined group-hover:scale-110 transition-transform">volunteer_activism</span>
                <span class="font-bold text-lg uppercase tracking-wider">Donaciones</span>
            </a>
        </nav>
        <div class="px-8 py-6 border-t border-white/10 mt-auto">
            <a href="museo-tanques/gallery.html"
                class="w-full block text-center bg-primary hover:bg-primary-hover text-white py-3 rounded font-black uppercase tracking-widest text-xs transition-colors">
                Entrar al Museo Principal
            </a>
        </div>
    </aside>

    <!-- RIGHT SIDEBAR (CASA HISTÓRICA) -->
    <aside id="right-sidebar"
        class="fixed top-0 right-0 h-full w-80 bg-archive-light border-l border-slate-200 shadow-2xl z-50 flex flex-col pt-10 text-slate-900">
        <div class="px-8 pb-8 flex items-center justify-between border-b border-slate-200">
            <button onclick="toggleRightMenu()" class="text-slate-500 hover:text-accent-gold transition-colors">
                <span class="material-symbols-outlined text-3xl">close</span>
            </button>
            <div class="flex flex-col text-right">
                <span class="font-serif italic text-sm text-slate-600">La Casa</span>
                <span class="font-serif font-bold text-2xl tracking-tight text-slate-900">Histórica</span>
            </div>
        </div>
        <nav class="flex-1 px-8 py-10 flex flex-col gap-6 text-right items-end">
            <a href="casa-historica/gallery.html"
                class="group flex flex-row-reverse items-center justify-end gap-4 text-slate-700 hover:text-accent-gold transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">collections</span>
                <span class="font-serif font-bold text-lg">Galería</span>
            </a>
            <a href="casa-historica/events.html"
                class="group flex flex-row-reverse items-center justify-end gap-4 text-slate-700 hover:text-accent-gold transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">event</span>
                <span class="font-serif font-bold text-lg">Eventos</span>
            </a>
            <a href="casa-historica/about.html"
                class="group flex flex-row-reverse items-center justify-end gap-4 text-slate-700 hover:text-accent-gold transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">auto_stories</span>
                <span class="font-serif font-bold text-lg">Museo (Historia)</span>
            </a>
            <a href="casa-historica/noticias.html"
                class="group flex flex-row-reverse items-center justify-end gap-4 text-slate-700 hover:text-accent-gold transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">article</span>
                <span class="font-serif font-bold text-lg">Noticias</span>
            </a>
            <a href="casa-historica/contact.html"
                class="group flex flex-row-reverse items-center justify-end gap-4 text-slate-700 hover:text-accent-gold transition-colors">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">location_on</span>
                <span class="font-serif font-bold text-lg">Visitas</span>
            </a>
        </nav>
        <div class="px-8 py-6 border-t border-slate-200 mt-auto">
            <a href="casa-historica/gallery.html"
                class="w-full block text-center bg-white border border-slate-300 text-slate-900 hover:bg-slate-50 py-3 rounded font-serif font-bold tracking-widest text-sm transition-colors shadow-sm">
                Visitar Casona
            </a>
        </div>
    </aside>

    <div class="relative min-h-screen flex flex-col">
        <!-- Global Minimalist Topbar -->
        <div class="topbar-global topbar-main">
            <div class="topbar-container">
                <!-- Left: Branding -->
                <a href="./index.html" class="topbar-brand">
                    <img src="./recursos/images/tapi-logo.svg" alt="Logo" class="topbar-logo">
                    <div class="topbar-titles">
                        <span class="topbar-subtitle">Complejo</span>
                        <span class="topbar-title">Museístico</span>
                    </div>
                </a>

                <!-- Right: Utilities -->
                <div class="topbar-utils">
                    <button class="util-btn" onclick="window.handleSearch()" aria-label="Buscar"><span class="material-symbols-outlined">search</span></button>
<div class="util-divider"></div>
<button class="util-btn lang-toggle" onclick="window.handleLang()" aria-label="Cambiar Idioma">
    <svg class="flag-es" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="24" height="16" style="border-radius: 2px;">
        <rect width="750" height="500" fill="#c60b1e"></rect>
        <rect y="125" width="750" height="250" fill="#ffc400"></rect>
        <circle cx="250" cy="250" r="50" fill="#c60b1e"></circle>
    </svg>
    <svg class="flag-en hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" width="24" height="16" style="border-radius: 2px;">
        <rect width="7410" height="3900" fill="#b22234"></rect>
        <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" stroke-width="300"></path>
        <rect width="2964" height="2100" fill="#3c3b6e"></rect>
        <g fill="#fff">
            <circle cx="200" cy="200" r="30"></circle>
            <circle cx="400" cy="200" r="30"></circle>
        </g>
    </svg>
</button>
<div class="util-divider"></div>
<button class="util-btn theme-toggle" onclick="window.toggleTheme()" aria-label="Modo Día/Noche"><span class="material-symbols-outlined">light_mode</span></button>
<div class="util-divider"></div>
<button class="util-btn bg-music-toggle" onclick="window.toggleBackgroundMusic()" aria-label="Música de Ambiente"><span class="material-symbols-outlined" id="bg-music-icon">volume_off</span></button>
<div class="util-divider"></div>
                    <a href="./register.html" class="util-btn" aria-label="Perfil de Usuario"><span
                            class="material-symbols-outlined">account_circle</span></a>
                </div>
            </div>
        </div>

        <!-- Barra Navegación Secundaria (Restaurada) -->
        <nav class="bg-black/80 backdrop-blur-md border-b border-white/5 hidden md:block w-full z-40 relative">
            <div class="max-w-[1400px] mx-auto px-6">
                <ul
                    class="flex justify-center flex-wrap items-center gap-8 py-3 text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400">
                    <li><a href="./index.html" class="hover:text-white transition-colors">Portal Principal</a></li>
                    <li><a href="./museo-tanques/index.html" class="hover:text-primary transition-colors">Museo de
                            Tanques</a></li>
                    <li><a href="./casa-historica/index.html" class="hover:text-[#c5a065] transition-colors">Casa
                            Histórica</a></li>
                </ul>
            </div>
        </nav>

        <!-- Search Modal (Hidden by default) -->
        <div id="global-search-modal"
            class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] hidden items-start justify-center pt-32 opacity-0 transition-opacity duration-300">
            <div class="bg-surface-dark dark:bg-slate-900 border border-white/10 dark:border-slate-700 w-full max-w-2xl p-6 shadow-2xl rounded-xl transform scale-95 transition-transform duration-300"
                id="search-modal-content">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-white dark:text-slate-100 font-bold text-lg flex items-center gap-2">
                        <span class="material-symbols-outlined">search</span>
                        Búsqueda Global
                    </h3>
                    <button onclick="closeSearch()"
                        class="text-gray-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-300 transition-colors">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div class="relative">
                    <input type="text" id="global-search-input"
                        class="w-full bg-black/50 dark:bg-slate-800 border border-white/20 dark:border-slate-600 rounded-lg px-4 py-4 text-white dark:text-slate-100 focus:outline-none focus:border-primary dark:focus:border-blue-500 text-lg"
                        placeholder="Escribe para buscar contenidos en esta página..."
                        onkeyup="if(event.key === 'Enter') executeSearch()">
                    <button onclick="executeSearch()"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors">Buscar</button>
                </div>
                <div id="search-results-feedback" class="mt-4 text-sm text-gray-400 dark:text-slate-500 hidden"></div>
            </div>
        </div>

        <!-- Main Split Content Area -->
        <main class="flex-grow flex flex-col md:flex-row relative group/split h-[85vh] md:h-screen">
            <!-- Left Side: Tank Museum (Industrial/Military) -->
            <section
                class="relative flex-1 bg-military-dark overflow-hidden group/left transition-all duration-500 ease-in-out hover:flex-[1.2]">
                <!-- Background Image -->
                <div class="absolute inset-0 z-0">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40 z-10"></div>
                    <div class="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover/left:scale-105"
                        data-alt="Close up of a rusty tank tread and armor plates"
                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDc2slbrl5dZl8aDffPQJxrRDvuH7ka5PuOop84_Oi_c1K2EoPmqI2WlyCouMXUGyizb3t_LVW1y72vbTSptyaR5V9TeHmjgZNl0rtBAsF29woHPPSLElg2xHpv9CO4swz1nl-W05_Ry60Yt7Y63946zfQ45Dwb6NYNi_wq7r_kXoRO_zoGlFKtyvOvN74XXguIV754JsjyOkeDhszw7RlrmF9DUkfu1I6CiJQoRrVH_m4p4db820-xyE3hdOKcP1X0ZT70KI9NZKFu');">
                    </div>
                </div>
                <!-- Navigation (Top Left) -->
                <div
                    class="absolute top-0 left-0 p-6 md:p-10 z-30 w-full flex justify-between md:justify-start items-start">
                    <button onclick="toggleLeftMenu()"
                        class="flex items-center gap-3 text-white hover:text-primary-light transition-colors group">
                        <div
                            class="p-2 bg-white/10 backdrop-blur-sm rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                            <span class="material-symbols-outlined text-3xl">menu</span>
                        </div>
                        <div class="flex flex-col items-start">
                            <span class="uppercase tracking-[0.2em] font-black text-sm md:text-base leading-none">Museo
                                de</span>
                            <span
                                class="uppercase tracking-tighter font-black text-2xl md:text-4xl leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Tanques</span>
                        </div>
                    </button>
                </div>
                <!-- Content Overlay -->
                <div class="relative z-20 h-full flex flex-col justify-end p-8 md:p-16 pb-24 md:pb-16 items-start">
                    <div class="max-w-md transform transition-all duration-500 group-hover/left:translate-x-4">
                        <div
                            class="inline-block bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-widest">
                            Exhibición Actual</div>
                        <h2
                            class="text-4xl md:text-6xl font-black text-white leading-tight uppercase mb-2 text-shadow-strong">
                            Acero <br /><span class="text-gray-400">Puro</span>
                        </h2>
                        <p
                            class="text-gray-300 text-sm md:text-base font-medium max-w-xs leading-relaxed border-l-4 border-primary pl-4">
                            Siente la fuerza bruta de más de 150 vehículos blindados restaurados. Una experiencia
                            inmersiva en la ingeniería militar.
                        </p>
                    </div>
                </div>
                <!-- Noise Texture Overlay -->
                <div class="absolute inset-0 z-10 bg-grain mix-blend-overlay opacity-30 pointer-events-none"></div>
            </section>

            <!-- Center Divider / Portal Gateway -->
            <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-[320px] md:max-w-none md:w-auto flex flex-col gap-4 md:gap-6 items-center justify-center pointer-events-none">
                <!-- Decorative vertical line (Desktop only) -->
                <div class="hidden md:block absolute top-[-50vh] bottom-[-50vh] w-[1px] bg-white/20 backdrop-blur-md">
                </div>
                <!-- Central Action Buttons -->
                <div class="flex flex-col md:flex-row gap-4 pointer-events-auto">
                    <a href="museo-tanques/gallery.html"
                        class="relative group overflow-hidden bg-primary text-white rounded-lg px-8 py-5 md:py-6 md:px-10 shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-white/10">
                        <div
                            class="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        </div>
                        <span
                            class="relative flex items-center gap-3 font-bold uppercase tracking-wider text-sm md:text-base">
                            <span class="material-symbols-outlined">shield</span>
                            Entrar a Tanques
                        </span>
                    </a>
                    <div
                        class="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm shadow-lg z-50">
                        VS
                    </div>
                    <a href="casa-historica/gallery.html"
                        class="relative group overflow-hidden bg-white text-slate-900 rounded-lg px-8 py-5 md:py-6 md:px-10 shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-slate-200">
                        <div
                            class="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        </div>
                        <span
                            class="relative flex items-center gap-3 font-bold uppercase tracking-wider text-sm md:text-base">
                            Visitar Casona
                            <span class="material-symbols-outlined">account_balance</span>
                        </span>
                    </a>
                </div>
            </div>

            <!-- Right Side: Historic House (Refined/Archival) -->
            <section
                class="relative flex-1 bg-archive-light overflow-hidden group/right transition-all duration-500 ease-in-out hover:flex-[1.2]">
                <!-- Background Image -->
                <div class="absolute inset-0 z-0">
                    <div
                        class="absolute inset-0 bg-gradient-to-l from-white/90 via-white/20 to-black/30 z-10 md:bg-gradient-to-l md:from-white/60 md:via-transparent md:to-black/30">
                    </div>
                    <div class="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover/right:scale-105"
                        data-alt="Antique pocket watch and old handwritten letters on a wooden desk"
                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBxFp_wmoaAg7rnNeQUbTKmkXo78anS5diZUuFB48LCLmk6V87Z3pw_rEgBP0qhvxTrBpSGkBkUK3NHfXAZ6yRQpvOIoY3okacpkG7aFWIB-qP-UPNhOMSuzXINXpy-hMgL3vJuL_x_0w3MP2YwXAVrYi4dU3-roFcfOBepM9341Yhpb4kShSkipcqOmcVybJd77ICHoTTT5_oQa4i1216lkQVUH-sZGpikhdSXl-uD7YAlM5vdHV5f7__TjO67CP9f6TfutdZXehQ');">
                    </div>
                </div>
                <!-- Navigation (Top Right) -->
                <div class="absolute top-0 right-0 p-6 md:p-10 z-30 w-full flex justify-end items-start">
                    <button onclick="toggleRightMenu()"
                        class="flex flex-row-reverse items-center gap-3 text-slate-900 hover:text-accent-gold transition-colors group">
                        <div
                            class="p-2 bg-white/80 backdrop-blur-sm rounded-lg group-hover:bg-accent-gold group-hover:text-white transition-colors shadow-sm">
                            <span class="material-symbols-outlined text-3xl">menu_open</span>
                        </div>
                        <div class="flex flex-col items-end">
                            <span class="font-serif italic text-sm md:text-base text-slate-600 leading-none">La
                                Casa</span>
                            <span
                                class="font-serif font-bold text-2xl md:text-4xl leading-none tracking-tight">Histórica</span>
                        </div>
                    </button>
                </div>
                <!-- Content Overlay -->
                <div
                    class="relative z-20 h-full flex flex-col justify-end p-8 md:p-16 pb-24 md:pb-16 items-end text-right">
                    <div class="max-w-md transform transition-all duration-500 group-hover/right:-translate-x-4">
                        <div
                            class="inline-block bg-white/90 text-slate-800 text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-widest shadow-sm">
                            Colección Permanente</div>
                        <h2 class="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-2">
                            Legado <br /><span class="text-accent-gold italic font-light">Vivo</span>
                        </h2>
                        <p
                            class="text-slate-800 text-sm md:text-base font-normal max-w-xs leading-relaxed border-r-4 border-accent-gold pr-4 bg-white/60 backdrop-blur-sm p-2 rounded-l-lg">
                            Descubre la intimidad del pasado a través de objetos cotidianos que narran 200 años de
                            historias familiares.
                        </p>
                    </div>
                </div>
                <!-- Paper Texture Overlay -->
                <div
                    class="absolute inset-0 z-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply opacity-50 pointer-events-none">
                </div>
            </section>
        </main>

        <style>
            @keyframes dynamicFusion {
                0% {
                    background-position: 0% 0%;
                }

                50% {
                    background-position: 100% 100%;
                }

                100% {
                    background-position: 0% 0%;
                }
            }

            .footer-fusion {
                background: linear-gradient(135deg, #0032a0 0%, #05080f 50%, #c5a065 100%);
                background-size: 200% 200%;
                animation: dynamicFusion 12s ease infinite;
                position: relative;
            }

            .footer-fusion::before {
                content: '';
                position: absolute;
                inset: 0;
                background: rgba(5, 8, 15, 0.85);
                z-index: 0;
            }

            .footer-fusion>div {
                position: relative;
                z-index: 10;
            }
        </style>

        <!-- Pre-Footer: Aliados Estratégicos -->
        <section class="relative z-40 bg-black/80 py-12 border-t border-white/10">
            <div class="max-w-[1400px] mx-auto px-6">
                <h4 class="text-center text-white/50 text-xs font-bold uppercase tracking-widest mb-8">Aliados
                    Estratégicos</h4>
                <div class="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-center">
                    <!-- Sponsor 1 -->
                    <div
                        class="h-12 md:h-16 w-28 md:w-36 border border-white/20 rounded bg-white/5 flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer">
                        <span class="text-white/60 text-xs font-bold tracking-widest uppercase">Logo 1</span>
                    </div>
                    <!-- Sponsor 2 -->
                    <div
                        class="h-12 md:h-16 w-28 md:w-36 border border-white/20 rounded bg-white/5 flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer">
                        <span class="text-white/60 text-xs font-bold tracking-widest uppercase">Logo 2</span>
                    </div>
                    <!-- Sponsor 3 -->
                    <div
                        class="h-12 md:h-16 w-28 md:w-36 border border-white/20 rounded bg-white/5 flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer">
                        <span class="text-white/60 text-xs font-bold tracking-widest uppercase">Logo 3</span>
                    </div>
                    <!-- Sponsor 4 -->
                    <div
                        class="h-12 md:h-16 w-28 md:w-36 border border-white/20 rounded bg-white/5 flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer">
                        <span class="text-white/60 text-xs font-bold tracking-widest uppercase">Logo 4</span>
                    </div>
                    <!-- Sponsor 5 -->
                    <div
                        class="h-12 md:h-16 w-28 md:w-36 border border-white/20 rounded bg-white/5 flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer">
                        <span class="text-white/60 text-xs font-bold tracking-widest uppercase">Logo 5</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer Centralizado Museos TAPI -->
        <footer class="footer-fusion relative z-50 mt-auto pt-20 border-t border-white/10">
            <div class="max-w-[1400px] mx-auto px-6 pb-20">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 text-left">

                    <!-- Branding (Wider column) -->
                    <div class="col-span-1 md:col-span-4">
                        <div class="flex items-center gap-3 text-white mb-6">
                            <img src="recursos/images/tapi-logo.svg" alt="Museos TAPI Logo"
                                class="h-12 w-auto invert" />
                            <div class="flex flex-col leading-none">
                                <span class="font-serif italic text-xs text-accent-gold/80">Red de</span>
                                <span
                                    class="font-black text-2xl tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent-gold">MUSEOS
                                    TAPI</span>
                            </div>
                        </div>
                        <p class="text-gray-400 text-sm leading-relaxed mb-8">
                            Guardamos la historia de los tanques y el legado de la caballería. Una frontera donde el
                            acero moderno se encuentra con el honor clásico.
                        </p>

                        <!-- Social Networks -->
                        <div class="flex flex-wrap gap-3 mt-6">
                            <a href="#" aria-label="Facebook"
                                class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                <svg class="size-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram"
                                class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all">
                                <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a href="#" aria-label="X (Twitter)"
                                class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                                <svg class="size-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                    </path>
                                </svg>
                            </a>
                            <a href="#" aria-label="YouTube"
                                class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                                <svg class="size-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z">
                                    </path>
                                </svg>
                            </a>
                            <a href="#" aria-label="Flickr"
                                class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all group">
                                <svg class="size-5" viewBox="0 0 24 24" fill="none">
                                    <circle cx="7" cy="12" r="4" class="fill-current group-hover:text-blue-500" />
                                    <circle cx="17" cy="12" r="4" class="fill-current group-hover:text-pink-500" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Links: Museo de Tanques -->
                    <div class="col-span-1 md:col-span-2">
                        <h4
                            class="text-white text-xs font-bold uppercase tracking-widest mb-6 border-l-2 border-primary pl-3">
                            Museo de Tanques</h4>
                        <ul class="flex flex-col gap-3 text-gray-400 text-sm">
                            <li><a href="museo-tanques/index.html" class="hover:text-primary transition-colors">Inicio
                                    Tanques</a></li>
                            <li><a href="museo-tanques/gallery.html"
                                    class="hover:text-primary transition-colors">Galería de Blindados</a></li>
                            <li><a href="museo-tanques/events.html"
                                    class="hover:text-primary transition-colors">Exhibiciones y Eventos</a></li>
                            <li><a href="museo-tanques/preguntas.html"
                                    class="hover:text-primary transition-colors">Preguntas Frecuentes</a></li>
                            <li><a href="museo-tanques/donaciones.html"
                                    class="hover:text-primary transition-colors">Apoyo y Donaciones</a></li>
                        </ul>
                    </div>

                    <!-- Links: Casa Histórica -->
                    <div class="col-span-1 md:col-span-2">
                        <h4
                            class="text-white text-xs font-bold uppercase tracking-widest mb-6 border-l-2 border-accent-gold pl-3">
                            Casa Histórica</h4>
                        <ul class="flex flex-col gap-3 text-gray-400 text-sm">
                            <li><a href="casa-historica/index.html"
                                    class="hover:text-accent-gold transition-colors">Inicio Casa</a></li>
                            <li><a href="casa-historica/about.html"
                                    class="hover:text-accent-gold transition-colors">Nuestra Historia</a></li>
                            <li><a href="casa-historica/gallery.html"
                                    class="hover:text-accent-gold transition-colors">Archivo Documental</a></li>
                            <li><a href="casa-historica/noticias.html"
                                    class="hover:text-accent-gold transition-colors">Boletín Oficial</a></li>
                            <li><a href="casa-historica/events.html"
                                    class="hover:text-accent-gold transition-colors">Exposiciones Época</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div class="col-span-1 md:col-span-4">
                        <h4
                            class="text-white text-xs font-bold uppercase tracking-widest mb-6 border-l-2 border-white/50 pl-3">
                            Contacto Único</h4>
                        <ul class="flex flex-col gap-5 text-gray-400 text-sm">
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-white/50">location_on</span>
                                <span>Av. del Ejército 1945,<br>Ciudad Capital, CP 28000</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-white/50">call</span>
                                <span>+34 91 5555 4188</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-white/50">mail</span>
                                <span
                                    class="hover:text-white cursor-pointer transition-colors">contacto@museodual.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Stats Bar -->
                <div
                    class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <div class="flex items-center gap-4 mb-4 md:mb-0">
                        <div class="size-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span class="text-white font-bold text-xs uppercase tracking-widest">Estadísticas del
                            Complejo</span>
                    </div>
                    <div class="flex flex-wrap justify-center gap-8 md:gap-12">
                        <div class="text-center md:text-right">
                            <span class="block text-[10px] text-gray-400 uppercase tracking-widest">Vehículos y
                                Armas</span>
                            <span class="block text-xl font-mono font-bold text-white transition-colors">2,845</span>
                        </div>
                        <div class="text-center md:text-right">
                            <span class="block text-[10px] text-gray-400 uppercase tracking-widest">Piezas de
                                Archivo</span>
                            <span class="block text-xl font-serif font-bold text-white transition-colors">12,405</span>
                        </div>
                        <div class="text-center md:text-right">
                            <span class="block text-[10px] text-gray-400 uppercase tracking-widest">Visitantes</span>
                            <span class="block text-xl font-mono font-bold text-white">1,029,<span
                                    class="text-gray-400">482</span></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="bg-black py-4 border-t border-white/5">
                <div
                    class="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest gap-4">
                    <p>© 2026 Museos TAPI. Todos los derechos reservados.</p>
                    <div class="flex gap-6">
                        <a href="#" class="hover:text-white transition-colors">Política de Privacidad</a>
                        <a href="#" class="hover:text-white transition-colors">Términos de Uso</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <!-- Initialization Scripts -->
    <script>
        function toggleLeftMenu() {
            const sidebar = document.getElementById('left-sidebar');
            const overlay = document.getElementById('left-overlay');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }

        function toggleRightMenu() {
            const sidebar = document.getElementById('right-sidebar');
            const overlay = document.getElementById('right-overlay');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }
    </script>
</body>
</html>`;

fs.writeFileSync(targetFile, htmlContent, { encoding: 'utf8' });
console.log('Index file fully reconstructed and saved successfully with correct UTF-8 encoding.');
