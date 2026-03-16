function initializeSidebars() {
    // Sidebar Glow Animation for left-sidebar
    const leftSidebar = document.getElementById('left-sidebar');
    const leftNav = document.querySelector('#left-sidebar nav');

    // Prevent duplicate initialization
    if (leftSidebar && leftNav && !leftSidebar.classList.contains('initialized')) {
        leftSidebar.classList.add('initialized');

        // Create indicator element dynamically and attach to sidebar
        const indicator = document.createElement('div');
        indicator.className = 'azimuth-indicator';

        const scale = document.createElement('div');
        scale.className = 'azimuth-scale';

        // Populate the scale with numbers from 000 to 500 (Single loop for precise mapping)
        for (let i = 0; i <= 500; i += 5) {
            const tick = document.createElement('div');
            const isMajor = i % 20 === 0;
            tick.className = `azimuth-tick ${isMajor ? 'major' : ''}`;

            const num = document.createElement('span');
            num.className = 'number';
            num.textContent = i.toString().padStart(3, '0');

            // Blue color for intermediate numbers
            if (!isMajor) {
                num.style.color = 'rgba(0, 243, 255, 0.6)';
            }

            const line = document.createElement('div');
            line.className = 'line';

            tick.appendChild(num);
            tick.appendChild(line);
            scale.appendChild(tick);
        }

        const pointer = document.createElement('div');
        pointer.className = 'azimuth-pointer';

        indicator.appendChild(scale);
        indicator.appendChild(pointer);
        leftSidebar.appendChild(indicator);

        const links = leftNav.querySelectorAll('a');
        let hideTimeout;
        const pointerElement = indicator.querySelector('.azimuth-pointer');
        const allTicks = scale.querySelectorAll('.azimuth-tick');

        // Variables variables for requestAnimationFrame
        let ticking = false;
        let currentClientY = 0;
        let currentSidebarRect = null;

        const updateDOM = () => {
            if (!currentSidebarRect) {
                ticking = false;
                return;
            }

            const sidebarHeight = currentSidebarRect.height;
            const mouseY = currentClientY - currentSidebarRect.top;

            if (pointerElement) {
                pointerElement.style.transform = `translateY(${mouseY}px)`;
            }

            const scaleHeight = scale.scrollHeight;
            const scrollPos = mouseY * ((scaleHeight - sidebarHeight) / sidebarHeight);

            scale.style.transition = 'none';
            scale.style.transform = `translateY(${-scrollPos}px)`;

            allTicks.forEach(tick => {
                const rect = tick.getBoundingClientRect();
                const tickCenter = rect.top + rect.height / 2;
                const dist = Math.abs(currentClientY - tickCenter);
                if (dist < 40) {
                    tick.style.opacity = '1';
                } else {
                    tick.style.opacity = '0.3';
                }
            });

            links.forEach(link => {
                const rect = link.getBoundingClientRect();
                if (currentClientY >= rect.top && currentClientY <= rect.bottom) {
                    link.style.color = '#3b82f6';
                } else {
                    link.style.color = '';
                }
            });

            ticking = false;
        };

        const handleMove = (e) => {
            currentClientY = e.touches ? e.touches[0].clientY : e.clientY;
            currentSidebarRect = leftSidebar.getBoundingClientRect();
            clearTimeout(hideTimeout);

            if (!ticking) {
                window.requestAnimationFrame(updateDOM);
                ticking = true;
            }
        };

        const handleLeave = () => {
            hideTimeout = setTimeout(() => {
                allTicks.forEach(t => t.style.opacity = '0.3');
                links.forEach(l => l.style.color = '');
            }, 300);
        };

        leftSidebar.addEventListener('mousemove', handleMove);
        leftSidebar.addEventListener('touchmove', handleMove, { passive: true });
        leftSidebar.addEventListener('mouseleave', handleLeave);
        leftSidebar.addEventListener('touchend', handleLeave);
    }
}

// Global script for main functionality
document.addEventListener('DOMContentLoaded', () => {
    // If there's an existing theme saved, apply it
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.remove('dark');
    }

    const themeIcons = document.querySelectorAll('.theme-toggle .material-symbols-outlined');
    themeIcons.forEach(icon => {
        icon.textContent = isDark ? 'dark_mode' : 'light_mode';
    });

    // Intentamos inicializar los sidebars si ya están en el DOM (como en index.html)
    initializeSidebars();

    // Motor de giro del Favicon (Compatible con Chrome)
    initFaviconAnimation();

    // Título dinámico tipo marquesina
    initTitleMarquee();

    // Iniciar el scroll progress bar horizontal
    initScrollProgress();

    // Cargar el cursor de tanque personalizado (Solo PC)
    initTankCursorLoader();

    // Cargar el cursor de caballo (Solo en Casa Histórica y Index)
    initHorseCursorLoader();

    // Lógica de alternancia si estamos en index
    initMascotSwitcher();
});

// Listener para el evento de carga de componentes (para subpáginas)
window.addEventListener('componentsReady', () => {
    initializeSidebars();

    // Re-initialize music icons if header was loaded dynamically
    const icons = document.querySelectorAll('#bg-music-icon');
    icons.forEach(i => {
        i.innerHTML = isMusicPlaying ? VOLUME_UP_SVG : VOLUME_OFF_SVG;
    });

    // Sync button classes for dynamically loaded components
    document.querySelectorAll('.bg-music-toggle').forEach(b => {
        if (!isMusicPlaying) b.classList.remove('playing');
        else b.classList.add('playing');
    });

    // Iniciar animación del favicon
    initFaviconAnimation();

    // Título dinámico
    initTitleMarquee();

    // Asegurar que el scroll progress esté activo tras carga de componentes
    initScrollProgress();
});

// Theme toggle
window.toggleTheme = function () {
    const doc = document.documentElement;

    // Check for View Transitions API support
    if (document.startViewTransition) {
        document.startViewTransition(() => {
            const isDark = doc.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcons(isDark);
        });
    } else {
        // Fallback: smooth class transition
        doc.classList.add('theme-transitioning');
        const isDark = doc.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);

        setTimeout(() => {
            doc.classList.remove('theme-transitioning');
        }, 600);
    }
};

function updateThemeIcons(isDark) {
    const themeIcons = document.querySelectorAll('.theme-toggle .material-symbols-outlined');
    themeIcons.forEach(icon => {
        icon.textContent = isDark ? 'dark_mode' : 'light_mode';
    });
}

// Language toggle (ES -> EN -> KI -> ES)
window.handleLang = function () {
    const currentLang = localStorage.getItem('idioma_preferido_tapi') || 'es';
    let nextLang = 'en';
    if (currentLang === 'en') nextLang = 'qu';
    else if (currentLang === 'qu') nextLang = 'es';

    if (typeof window.cambiarIdioma === 'function') {
        window.cambiarIdioma(nextLang);
        // La función cambiarIdioma ya debería manejar la visibilidad de los flags en su lógica interna (si los actualizamos allí)
        // Pero por ahora, main.js también los actualiza para respuesta inmediata
        const flagsEs = document.querySelectorAll('.flag-es');
        const flagsEn = document.querySelectorAll('.flag-en');
        const flagsEc = document.querySelectorAll('.flag-ec');

        if (nextLang === 'en') {
            flagsEs.forEach(f => f.classList.add('hidden'));
            flagsEn.forEach(f => f.classList.remove('hidden'));
            flagsEc.forEach(f => f.classList.add('hidden'));
        } else if (nextLang === 'qu') {
            flagsEs.forEach(f => f.classList.add('hidden'));
            flagsEn.forEach(f => f.classList.add('hidden'));
            flagsEc.forEach(f => f.classList.remove('hidden'));
        } else {
            flagsEs.forEach(f => f.classList.remove('hidden'));
            flagsEn.forEach(f => f.classList.add('hidden'));
            flagsEc.forEach(f => f.classList.add('hidden'));
        }
    } else {
        console.error('[Main] cambiarIdioma no encontrada en window');
    }
};

// Search modal toggle
window.handleSearch = function () {
    const modal = document.getElementById('global-search-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            const content = document.getElementById('search-modal-content');
            if (content) {
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }
        }, 10); // Small delay to allow CSS transition to apply
    }
};

window.closeSearch = function () {
    const modal = document.getElementById('global-search-modal');
    if (modal) {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        const content = document.getElementById('search-modal-content');
        if (content) {
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
        }
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }, 300); // Wait for transition duration
    }
};

window.executeSearch = function () {
    const input = document.getElementById('global-search-input');
    const feedback = document.getElementById('search-results-feedback');
    if (feedback) {
        feedback.classList.remove('hidden');
        if (input && input.value) {
            feedback.textContent = `Buscando "${input.value}" ... (Simulación completada en este demo)`;
        } else {
            feedback.textContent = "Por favor, introduce un término de búsqueda.";
        }
    }
};

// Background music logic
let bgMusic = null;
let isMusicPlaying = false; // Muted by default as requested by user

const VOLUME_UP_SVG = `
<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3z"></path>
    <path class="sound-wave wave-delay-1" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"></path>
    <path class="sound-wave wave-delay-2" d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
</svg>`;

const VOLUME_OFF_SVG = `
<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
</svg>`;

window.toggleBackgroundMusic = function (forcePlay = false) {
    if (!bgMusic) {
        let basePath = window.location.pathname.includes('/museo-tanques/') || window.location.pathname.includes('/casa-historica/') ? '../' : './';

        if (window.location.pathname.includes('/museo-tanques/')) {
            bgMusic = new Audio(basePath + 'recursos/audios/museo-tanques/musica_museo_tanques_01.webm');
        } else {
            // General fallback
            bgMusic = new Audio(basePath + 'recursos/audios/index/ambient.mp3');
        }
        bgMusic.loop = true;
        bgMusic.volume = 0.5;
    }

    const icons = document.querySelectorAll('#bg-music-icon');
    const buttons = document.querySelectorAll('.bg-music-toggle');

    if (isMusicPlaying && !forcePlay) {
        if (bgMusic) bgMusic.pause();
        isMusicPlaying = false;
        icons.forEach(i => i.innerHTML = VOLUME_OFF_SVG);
        buttons.forEach(b => b.classList.remove('playing'));
    } else {
        isMusicPlaying = true;
        icons.forEach(i => i.innerHTML = VOLUME_UP_SVG);
        buttons.forEach(b => b.classList.add('playing'));

        if (bgMusic) {
            bgMusic.play().catch(e => {
                console.warn('Audio not found or prevented:', e);
            });
        }
    }
};

// Initialize icon content on load
document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('#bg-music-icon');
    icons.forEach(i => {
        i.innerHTML = isMusicPlaying ? VOLUME_UP_SVG : VOLUME_OFF_SVG;
    });

    // Ensure button classes match initial state (muted)
    document.querySelectorAll('.bg-music-toggle').forEach(b => {
        if (!isMusicPlaying) b.classList.remove('playing');
        else b.classList.add('playing');
    });
});
// Index specific initialization and toggle scripts

window.toggleLeftMenu = function () {
    const sidebar = document.getElementById('left-sidebar');
    const overlay = document.getElementById('left-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }
};

window.toggleRightMenu = function () {
    const sidebar = document.getElementById('right-sidebar');
    const overlay = document.getElementById('right-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }
};

/**
 * Toggles the visibility of a sub-menu in the sidebar.
 * @param {string} id - The ID of the menu-content container.
 * @param {HTMLElement} header - The header element (menu-parent) clicked.
 */
window.toggleSubMenu = function (id, header) {
    const content = document.getElementById(id);
    if (!content) return;

    const isOpen = content.classList.contains('open');

    // Close all other open submenus first (Accordion style)
    document.querySelectorAll('.menu-content.open').forEach(menu => {
        if (menu.id !== id) {
            menu.classList.remove('open');
            const parent = menu.previousElementSibling;
            if (parent && (parent.classList.contains('menu-parent') || parent.classList.contains('menu-parent-right'))) {
                parent.classList.remove('active');
            }
        }
    });

    // Toggle current
    if (isOpen) {
        content.classList.remove('open');
        header.classList.remove('active');
    } else {
        content.classList.add('open');
        header.classList.add('active');
    }
};

// Compatibility for simpler toggle versions used in some files
window.toggleMenu = function (sidebarId, overlayId) {
    const sidebar = document.getElementById(sidebarId);
    const overlay = document.getElementById(overlayId);
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        sidebar.classList.toggle('open');
        overlay.classList.toggle('hidden');
        overlay.classList.toggle('active');
    }
};


// 3D Modal Controller Logic
window.open3DModal = function (btn) {
    const modal = document.getElementById('modal-3d');
    const content = document.getElementById('modal-3d-content');
    const container = document.getElementById('iframe-container-3d');
    const loader = document.getElementById('loader-3d');
    const main = document.getElementById('main-detail-tank');

    if (!modal || !content || !container || !main) {
        console.warn("[3D Modal] Modal elements or tank data not found.");
        return;
    }

    // Set transform-origin based on button position
    if (btn) {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        content.style.transformOrigin = `${centerX}px ${centerY}px`;
    } else {
        content.style.transformOrigin = 'center center';
    }

    // Clean up to prevent duplicates
    container.innerHTML = '';
    if (loader) {
        loader.classList.remove('hidden');
        loader.style.opacity = '1';
    }

    // Get tank data from attributes
    const modelUrl = main.getAttribute('data-tank-model');
    const tankId = main.getAttribute('data-tank-id') || 'tank';

    // Update modal name if translation exists
    const modalName = modal.querySelector('[data-i18n^="tank_"]');
    if (modalName) {
        modalName.setAttribute('data-i18n', `tank_${tankId}_name`);
        if (window.i18n) window.i18n.updateUI();
    }

    // Show modal with animation
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Force reflow
    void modal.offsetWidth;

    // Trigger animation
    modal.classList.add('opacity-100');
    content.classList.remove('scale-50', 'opacity-0');
    content.classList.add('scale-100', 'opacity-100');

    // Load content
    if (modelUrl && (modelUrl.includes('.glb') || modelUrl.includes('.gltf'))) {
        // USE MODEL-VIEWER (LOCAL)
        if (!window.modelViewerLoaded) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
            document.head.appendChild(script);
            window.modelViewerLoaded = true;
        }

        const mv = document.createElement('model-viewer');
        mv.id = 'active-model-viewer';
        mv.src = modelUrl;
        mv.alt = `3D Model of ${tankId}`;
        // Auto-rotate disabled by default (the toggle button starts it)
        mv.autoRotate = false;
        mv.removeAttribute('auto-rotate');
        mv.setAttribute('interaction-prompt', 'auto');
        mv.setAttribute('auto-rotate-delay', '0');
        mv.setAttribute('rotation-per-second', '20deg');
        mv.cameraControls = true;
        mv.ar = true;
        mv.arModes = "webxr scene-viewer quick-look";
        mv.style.width = '100%';
        mv.style.height = '100%';
        mv.style.backgroundColor = 'transparent';

        mv.addEventListener('load', () => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.classList.add('hidden'), 500);
            }
        });

        container.appendChild(mv);
    } else {
        // USE IFRAME (SKETCHFAB OR SIMILAR)
        const finalUrl = modelUrl || 'https://sketchfab.com/models/ba401dfd54ba461895a6ad9588960892/embed?autostart=1';
        container.innerHTML = `<iframe src="${finalUrl}" class="w-full h-full border-0" allow="autoplay; fullscreen"></iframe>`;

        const iframe = container.querySelector('iframe');
        iframe.onload = () => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.classList.add('hidden'), 500);
            }
        };
    }
};

window.close3DModal = function () {
    const modal = document.getElementById('modal-3d');
    const content = document.getElementById('modal-3d-content');
    const container = document.getElementById('iframe-container-3d');

    if (modal && content) {
        // Start closing animation
        modal.classList.remove('opacity-100');
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-50', 'opacity-0');

        // Wait for animation to finish
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
            if (container) container.innerHTML = '';
        }, 500); // Must match transition duration in CSS (duration-500)
    }
};

window.activateAR = function () {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        const mv = document.getElementById('active-model-viewer');
        if (mv && mv.activateAR) {
            mv.activateAR();
        } else {
            console.warn("[3D Modal] model-viewer with AR not found or not initialized.");
        }
    } else {
        // Show PC warning toast
        const warningToast = document.getElementById('ar-pc-warning');
        if (warningToast) {
            warningToast.classList.remove('hidden');
            warningToast.classList.add('flex');

            setTimeout(() => {
                warningToast.classList.remove('opacity-0');
                warningToast.classList.add('opacity-100');
            }, 10);

            // Auto hide
            setTimeout(() => {
                warningToast.classList.remove('opacity-100');
                warningToast.classList.add('opacity-0');
                setTimeout(() => {
                    warningToast.classList.add('hidden');
                    warningToast.classList.remove('flex');
                }, 300);
            }, 5000);
        }
    }
};

window.toggleAutoRotate = function () {
    const mv = document.getElementById('active-model-viewer') || document.querySelector('model-viewer');
    const btn = document.getElementById('btn-modal-autorotate');
    const icon = btn ? btn.querySelector('.material-symbols-outlined') : null;

    if (mv) {
        if (mv.hasAttribute('auto-rotate')) {
            // STOP ROTATION
            mv.removeAttribute('auto-rotate');
            if (icon) icon.textContent = 'play_arrow';
            // Show hand hint again
            mv.setAttribute('interaction-prompt', 'auto');
        } else {
            // START ROTATION
            mv.setAttribute('auto-rotate', '');
            if (icon) icon.textContent = 'stop';
            // Hide hand hint
            mv.setAttribute('interaction-prompt', 'none');
            // Extra kickstart for some browsers
            if ('autoRotate' in mv) mv.autoRotate = true;
        }
    } else {
        console.warn("[3D Modal] No active 3D model found to toggle rotation.");
    }
};

/**
 * Comparte el recurso actual (URL) usando la API nativa de compartir
 * o copia el enlace al portapapeles como fallback.
 */
window.shareResource = async function () {
    const shareData = {
        title: document.title,
        text: '¡Mira este increíble tanque en 3D!',
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: Copiar al portapapeles
            await navigator.clipboard.writeText(window.location.href);

            // Feedback visual en el botón
            const btn = document.getElementById('btn-modal-share');
            if (btn) {
                const icon = btn.querySelector('.material-symbols-outlined');
                const originalIcon = icon.textContent;
                const originalTooltip = btn.getAttribute('data-tooltip');

                icon.textContent = 'check';
                btn.setAttribute('data-tooltip', '¡Copiado!');
                btn.classList.add('text-green-500');

                setTimeout(() => {
                    icon.textContent = originalIcon;
                    btn.setAttribute('data-tooltip', originalTooltip);
                    btn.classList.remove('text-green-500');
                }, 2000);
            }
        }
    } catch (err) {
        console.log('Error o cancelación al compartir:', err);
    }
};

/**
 * Descarga el modelo 3D (GLB) directamente.
 */
window.downloadModel = function () {
    const main = document.getElementById('main-detail-tank');
    if (!main) return;

    const modelUrl = main.getAttribute('data-tank-model');
    if (!modelUrl) {
        console.warn("[3D Modal] No se encontró la URL del modelo para descargar.");
        return;
    }

    // Crear un link temporal y simular click
    const link = document.createElement('a');
    link.href = modelUrl;

    // Extraer nombre del archivo de la URL
    const fileName = modelUrl.split('/').pop() || 'tank-model.glb';
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Feedback visual en el botón
    const btn = document.getElementById('btn-modal-download');
    if (btn) {
        const icon = btn.querySelector('.material-symbols-outlined');
        const originalIcon = icon.textContent;
        icon.textContent = 'check_circle';
        btn.classList.add('text-green-500');

        setTimeout(() => {
            icon.textContent = originalIcon;
            btn.classList.remove('text-green-500');
        }, 2000);
    }
};

/**
 * Motor de giro del Favicon (Compatible con Chrome)
 * Crea un canvas invisible para rotar el logo y actualizar el link icon.
 */
function initFaviconAnimation() {
    const favicon = document.getElementById('favicon');
    if (!favicon) return;

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const isSubPage = window.location.pathname.includes('/museo-tanques/') || window.location.pathname.includes('/casa-historica/');
    const basePath = isSubPage ? '../../' : '';
    img.src = basePath + 'recursos/images/index/favicon_pestaña.svg';

    let angle = 0;
    const rotationSpeed = 0.5;

    img.onload = () => {
        function animate() {
            ctx.clearRect(0, 0, 32, 32);

            ctx.beginPath();
            ctx.arc(16, 16, 16, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            ctx.save();
            ctx.translate(16, 16);
            ctx.rotate((angle * Math.PI) / 180);
            ctx.drawImage(img, -14, -14, 28, 28);
            ctx.restore();

            favicon.href = canvas.toDataURL('image/png');

            angle = (angle + rotationSpeed) % 360;
            requestAnimationFrame(animate);
        }
        animate();
    };
}

/**
 * Título dinámico tipo marquesina
 * Hace que el texto del título se desplace lateralmente.
 */
function initTitleMarquee() {
    if (window.titleMarqueeInterval) clearInterval(window.titleMarqueeInterval);

    let titleText = document.title;
    if (titleText.length < 15) return;

    titleText += "        ";

    window.titleMarqueeInterval = setInterval(() => {
        titleText = titleText.substring(1) + titleText.substring(0, 1);
        document.title = titleText;
    }, 400);
}

/**
 * Carga dinámicamente los recursos del cursor de tanque.
 * Solo se activa en: index.html  y  /museo-tanques/
 */
function initTankCursorLoader() {
    const path = window.location.pathname;
    const isIndex = path === '/' || path.endsWith('/index.html') || path.endsWith('/public/');
    const inTanques = path.includes('/museo-tanques/');
    if (!isIndex && !inTanques) return; // Solo en esas páginas

    const root = document.body.getAttribute('data-root') || './';
    const VERSION = '392'; // Territory Passing Update

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${root}css/tank-cursor.css?v=${VERSION}`;
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = `${root}js/tank-cursor.js?v=${VERSION}`;
    document.head.appendChild(script);
}

/**
 * Carga dinámicamente los recursos del cursor de caballo.
 * Solo se activa en: /casa-historica/ y el index
 */
function initHorseCursorLoader() {
    const path = window.location.pathname;
    const isIndex = path === '/' || path.endsWith('/index.html') || path.endsWith('/public/');
    const inCasa = path.includes('/casa-historica/');
    if (!isIndex && !inCasa) return; // Solo index y casa histórica

    const root = document.body.getAttribute('data-root') || './';
    const VERSION = '392'; // Territory Passing Update

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${root}css/horse-cursor.css?v=${VERSION}`;
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = `${root}js/horse-cursor.js?v=${VERSION}`;
    document.head.appendChild(script);
}

/**
 * Alterna entre mascotas según la posición física de la MASCOTA respecto al divisor VS.
 */
function initMascotSwitcher() {
    const path = window.location.pathname;
    const isIndex = path === '/' || path.endsWith('/index.html') || path.endsWith('/public/');
    if (!isIndex) return;

    const checkMascotPositions = () => {
        const divider = document.getElementById('vs-divider');
        if (!divider) return;

        const isMobile = window.innerWidth < 768;
        const rect = divider.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        const midY = rect.top + rect.height / 2;

        // Controlamos el TANQUE
        if (window.tankCursor && window.tankCursor.renderPos) {
            const tankOnLeft = isMobile ? window.tankCursor.renderPos.y < midY : window.tankCursor.renderPos.x < midX;
            if (window.tankCursor.isEnabled !== tankOnLeft) {
                window.tankCursor.setEnabled(tankOnLeft);
                // Si el tanque se apaga, nos aseguramos que el caballo sepa que puede entrar
            }
        }

        // Controlamos el CABALLO
        if (window.horseCursorInstance && window.horseCursorInstance.renderPos) {
            const horseOnRight = isMobile ? window.horseCursorInstance.renderPos.y > midY : window.horseCursorInstance.renderPos.x > midX;
            if (window.horseCursorInstance.isEnabled !== horseOnRight) {
                window.horseCursorInstance.setEnabled(horseOnRight);
            }
        }
    };

    // Usamos un intervalo ligero para chequear posición física
    // Frecuencia de 30ms para que se sienta instantáneo al ojo
    setInterval(checkMascotPositions, 30);

    // Initial check con un pequeño delay para asegurar que los scripts de las mascotas hayan corrido
    setTimeout(() => {
        checkMascotPositions();
    }, 600);
}

/**
 * Inicializa la barra de progreso de scroll horizontal en la parte superior
 */
function initScrollProgress() {
    if (document.querySelector('.scroll-progress-container')) return;

    const container = document.createElement('div');
    container.className = 'scroll-progress-container';
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    container.appendChild(bar);
    document.body.appendChild(container);

    const updateScrollProgress = () => {
        const winScroll = window.pageYOffset || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        bar.style.width = scrolled + "%";
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
}

