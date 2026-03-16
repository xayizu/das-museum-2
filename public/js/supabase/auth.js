/**
 * MUSEOS TAPI: AUTH MANAGER
 * Manejo de inicio de sesión, registro, estados de usuario y UI del Modal
 */

const AuthManager = {
    isSignUp: false,
    currentUser: null,

    /**
     * Gestión del Modal (Abrir/Cerrar)
     */
    showModal() {
        const modal = document.getElementById('auth-modal');
        const content = document.getElementById('auth-modal-content');
        if (!modal) return;

        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Trigger animation
        setTimeout(() => {
            modal.classList.add('opacity-100');
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }, 10);
    },

    hideModal() {
        const modal = document.getElementById('auth-modal');
        const content = document.getElementById('auth-modal-content');
        if (!modal) return;

        modal.classList.remove('opacity-100');
        content.classList.add('scale-95');

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    },

    /**
     * Alternar entre Login y Registro
     */
    toggleMode() {
        this.isSignUp = !this.isSignUp;
        const title = document.getElementById('auth-title');
        const submitBtn = document.getElementById('auth-submit-btn');
        const switchText = document.getElementById('switch-text');
        const switchBtn = document.getElementById('switch-mode-btn');
        const userField = document.getElementById('field-username');

        if (this.isSignUp) {
            title.innerText = 'Registrarse';
            submitBtn.innerText = 'Crear Cuenta';
            switchText.innerText = '¿Ya tienes cuenta?';
            switchBtn.innerText = 'Iniciar Sesión';
            userField.classList.remove('hidden');
        } else {
            title.innerText = 'Iniciar Sesión';
            submitBtn.innerText = 'Ingresar';
            switchText.innerText = '¿No tienes cuenta?';
            switchBtn.innerText = 'Registrarse Ahora';
            userField.classList.add('hidden');
        }
    },


    /**
     * Manejo del botón de perfil en el Topbar
     */
    handleUserButtonClick() {
        if (this.currentUser) {
            window.location.href = 'dashboard.html';
        } else {
            this.showModal();
        }
    },

    /**
     * Gestión del Dropdown de Usuario
     */
    toggleDropdown() {
        const dropdown = document.getElementById('user-dropdown');
        if (!dropdown) return;

        if (dropdown.classList.contains('hidden')) {
            this.showDropdown();
        } else {
            this.hideDropdown();
        }
    },

    showDropdown() {
        const dropdown = document.getElementById('user-dropdown');
        const btn = document.getElementById('user-profile-btn');
        if (!dropdown || !btn) return;

        dropdown.classList.remove('hidden');
        // Pequeño delay para que la transición CSS funcione al remover hidden
        setTimeout(() => {
            dropdown.classList.remove('opacity-0', 'translate-y-2');
            dropdown.classList.add('opacity-100', 'translate-y-0');
        }, 10);

        // Cerrar al hacer clic fuera
        const closeHandler = (e) => {
            if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
                this.hideDropdown();
                window.removeEventListener('click', closeHandler);
            }
        };
        // Agregar listener con delay para no capturar el clic actual
        setTimeout(() => window.addEventListener('click', closeHandler), 10);
    },

    hideDropdown() {
        const dropdown = document.getElementById('user-dropdown');
        if (!dropdown) return;

        dropdown.classList.add('opacity-0', 'translate-y-2');
        dropdown.classList.remove('opacity-100', 'translate-y-0');

        setTimeout(() => {
            dropdown.classList.add('hidden');
        }, 300);
    },

    /**
     * Formulario: Enviar datos a Supabase
     */
    async handleFormSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        const username = document.getElementById('auth-username') ? document.getElementById('auth-username').value : '';
        const btn = document.getElementById('auth-submit-btn');

        btn.innerText = 'Procesando...';
        btn.disabled = true;

        const captchaToken = typeof turnstile !== 'undefined' ? turnstile.getResponse() : null;

        try {
            if (this.isSignUp) {
                await this.signUp(email, password, username, captchaToken);
            } else {
                await this.login(email, password, captchaToken);
            }
        } finally {
            btn.disabled = false;
            btn.innerText = this.isSignUp ? 'Crear Cuenta' : 'Ingresar';
        }
    },

    async login(email, password, captchaToken = null) {
        if (!window.sb) return;
        
        const options = {};
        if (captchaToken) options.captchaToken = captchaToken;

        const { data, error } = await window.sb.auth.signInWithPassword({ 
            email, 
            password,
            options: options
        });

        if (error) {
            alert('Error: ' + error.message);
            // Si hay error, es bueno resetear el captcha para que el usuario pueda reintentar
            if (typeof turnstile !== 'undefined') turnstile.reset();
        } else {
            this.hideModal();
        }
    },

    /**
     * Inicio de sesión con Google (OAuth)
     */
    async loginWithGoogle() {
        if (!window.sb) return;

        const { data, error } = await window.sb.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            console.error('❌ Error de Google Auth:', error.message);
            alert('No se pudo conectar con Google: ' + error.message);
        }
    },

    async signUp(email, password, username, captchaToken = null) {
        if (!window.sb) return;
        
        const options = { 
            data: { full_name: username } 
        };
        if (captchaToken) options.captchaToken = captchaToken;

        const { data, error } = await window.sb.auth.signUp({
            email,
            password,
            options: options
        });

        if (error) {
            alert('Error: ' + error.message);
            if (typeof turnstile !== 'undefined') turnstile.reset();
        } else {
            alert('¡Registro exitoso! Por favor verifica tu correo electrónico.');
            this.toggleMode(); // Volver a login
        }
    },


    async logout() {
        if (!window.sb) return;
        await window.sb.auth.signOut();
        this.hideModal();
        location.reload();
    },

    /**
     * Escuchador de estados
     */
    initAuthListener() {
        if (!window.sb) return;
        window.sb.auth.onAuthStateChange((event, session) => {
            if (session) {
                this.currentUser = session.user;
                this.handleAuthStateChange(session.user);
            } else {
                this.currentUser = null;
                this.handleAuthStateChange(null);
            }
        });
    },

    /**
     * Sincronizar UI del Perfil
     */
    handleAuthStateChange(user) {
        const userBtn = document.getElementById('user-profile-btn');
        const profileView = document.getElementById('auth-profile-view');
        const formView = document.getElementById('auth-form-view');
        const profileImgContainer = document.getElementById('profile-img-container');

        if (user) {
            const avatarUrl = user.user_metadata.avatar_url || user.user_metadata.picture || null;
            const name = user.user_metadata.full_name || user.user_metadata.name || 'Agente TAPI';

            // Actualizar botón superior (Topbar)
            if (userBtn) {
                userBtn.classList.add('text-primary');
                userBtn.setAttribute('data-tooltip', `Hola, ${name}`);

                if (avatarUrl) {
                    userBtn.innerHTML = `<img src="${avatarUrl}" class="size-6 rounded-full border border-primary/30 object-cover" alt="Perfil">`;
                } else {
                    userBtn.innerHTML = `<span class="material-symbols-outlined">account_circle</span>`;
                }
            }

            // Actualizar dropdown
            const dropName = document.getElementById('dropdown-user-name');
            const dropEmail = document.getElementById('dropdown-user-email');
            const dropImg = document.getElementById('dropdown-user-img');

            if (dropName) dropName.innerText = name;
            if (dropEmail) dropEmail.innerText = user.email;
            if (dropImg) {
                if (avatarUrl) {
                    dropImg.innerHTML = `<img src="${avatarUrl}" class="w-full h-full object-cover" alt="Perfil">`;
                } else {
                    dropImg.innerHTML = `<span class="material-symbols-outlined text-primary">account_circle</span>`;
                }
            }

            // Actualizar vista del perfil en modal
            if (profileView && formView) {
                profileView.classList.remove('hidden');
                formView.classList.add('hidden');
                document.getElementById('profile-name').innerText = name;
                document.getElementById('profile-email').innerText = user.email;

                if (profileImgContainer) {
                    if (avatarUrl) {
                        profileImgContainer.innerHTML = `<img src="${avatarUrl}" class="w-full h-full object-cover" alt="Perfil">`;
                    } else {
                        profileImgContainer.innerHTML = `<span class="material-symbols-outlined text-4xl text-primary">account_circle</span>`;
                    }
                }
            }
        } else {
            // Limpiar dropdown y ocultar
            this.hideDropdown();

            if (userBtn) {
                userBtn.classList.remove('text-primary');
                userBtn.setAttribute('data-tooltip', 'Mi Perfil');
                userBtn.innerHTML = `<span class="material-symbols-outlined">account_circle</span>`;
            }
            if (profileView && formView) {
                profileView.classList.add('hidden');
                formView.classList.remove('hidden');
            }
        }
    }
};

window.AuthManager = AuthManager;
