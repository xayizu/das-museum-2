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
});

// Listener para el evento de carga de componentes (para subpáginas)
window.addEventListener('componentsReady', () => {
    initializeSidebars();

    // Re-initialize music icons if header was loaded dynamically
    const icons = document.querySelectorAll('#bg-music-icon');
    icons.forEach(i => {
        i.innerHTML = isMusicPlaying ? VOLUME_UP_SVG : VOLUME_OFF_SVG;
    });
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
    const flagsEs = document.querySelectorAll('.flag-es');
    const flagsEn = document.querySelectorAll('.flag-en');
    const flagsEc = document.querySelectorAll('.flag-ec'); // We'll keep the class for now or update it

    if (flagsEs.length > 0 && !flagsEs[0].classList.contains('hidden')) {
        // ES -> EN
        flagsEs.forEach(f => f.classList.add('hidden'));
        flagsEn.forEach(f => f.classList.remove('hidden'));
        flagsEc.forEach(f => f.classList.add('hidden'));
        cambiarIdioma('en');
    } else if (flagsEn.length > 0 && !flagsEn[0].classList.contains('hidden')) {
        // EN -> KI
        flagsEs.forEach(f => f.classList.add('hidden'));
        flagsEn.forEach(f => f.classList.add('hidden'));
        flagsEc.forEach(f => f.classList.remove('hidden'));
        cambiarIdioma('qu'); // Keep internal key or change if i18n supports 'ki'
    } else {
        // KI -> ES
        flagsEs.forEach(f => f.classList.remove('hidden'));
        flagsEn.forEach(f => f.classList.add('hidden'));
        flagsEc.forEach(f => f.classList.add('hidden'));
        cambiarIdioma('es');
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
let isMusicPlaying = true; // Match the initial UI state (playing)

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
        let basePath = './';
        if (window.location.pathname.includes('/tanks/')) {
            basePath = '../../';
        } else if (window.location.pathname.includes('/museo-tanques/') || window.location.pathname.includes('/casa-historica/')) {
            basePath = '../';
        }
        bgMusic = new Audio(basePath + 'recursos/audio/ambient.mp3');
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

