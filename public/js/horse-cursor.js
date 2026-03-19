/**
 * HORSE CURSOR v5
 * ════════════════════════════════════════════════════════
 * Fixes vs v4:
 *  - Caballo va DE FRENTE hacia el mouse (scaleX invertido)
 *  - Sin rebote vertical (eliminado bobY)
 *  - Sin inclinación (eliminado tiltDeg)
 *  - Polvo de patas al galopar
 *  - Respiración idle preservada (vía CSS)
 */
class HorseCursor {
  constructor() {
    this.cursor = null;
    this.wrapper = null;
    this.isActive = false;
    this.isEnabled = true; // Para alternar entre mascotas en index
    this.rafId = null;

    this.mouse = { x: 0, y: 0 };
    this.renderPos = { x: 0, y: 0 };

    this.isMoving = false;
    this.isRising = false;
    this.isIdle = false;
    this.isRoaming = false;
    this.facingRight = true;

    this.dustTimer = 0;
    this.idleTimer = 0;
    this.roamingTimer = 0;
    this.risingTimeout = null;
    this.currentGrass = null;
    this.nextRoamTarget = null;
    this.nextGrassSpawned = false;

    // CONFIGURACIÓN CENTRALIZADA
    this.CONFIG = {
      SMOOTHING: 0.045,
      ROAM_SMOOTHING: 0.03,  // Un poco más rápido para evitar que parezca que flota
      OFFSET_DIST: 82,
      IDLE_TO_GRAZE: 4000,
      GRAZE_TO_ROAM: 6000,
      DUST_FREQ: 0.2,
      RISING_DURATION: 700
    };
    this.lastEnableTime = 0;
  }

  init() {
    // Evitar múltiples inicializaciones o ejecución en dispositivos táctiles
    if (this.isActive || ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return;

    this.injectHTML();
    this.setupElements();
    this.setupListeners();

    this.renderPos.x = window.innerWidth / 2;
    this.renderPos.y = window.innerHeight / 2;

    this.isActive = true;
    this.animate();
    this.cursor?.classList.add('active');
  }

  injectHTML() {
    if (document.getElementById('horse-cursor')) return;
    const html = `
<div id="horse-cursor">
  <div class="horse-unit">
    <div class="caballo-wrapper">

      <!-- PATA DELANTERA DERECHA -->
      <div class="pata-delantera derecha">
        <div class="hombro">
          <div class="superior">
            <div class="rodilla">
              <div class="inferior">
                <div class="tobillo">
                  <div class="pie"><div class="pezuna"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PATA TRASERA DERECHA -->
      <div class="pata-trasera derecha">
        <div class="parte-superior">
          <div class="muslo">
            <div class="pierna-inferior">
              <div class="pie"><div class="pezuna"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- COLA -->
      <div class="cola">
        <div class="inicio-cola">
          <div class="seccion"><div class="seccion"><div class="seccion">
            <div class="seccion"><div class="seccion"><div class="seccion ultimo"></div></div></div>
          </div></div></div>
        </div>
      </div>

      <!-- CUERPO -->
      <div class="cuerpo">
        <div class="seccion"><div class="seccion"><div class="seccion">
          <div class="seccion"><div class="seccion ultimo"></div></div>
        </div></div></div>
        <div class="parte-trasera"></div>
      </div>

      <!-- CUELLO -->
      <div class="cuello">
        <div class="debajo"></div>
        <div class="frente"></div>
        <div class="base"></div>
        <div class="parte-superior"></div>
        <div class="hombro"></div>
      </div>

      <!-- PATA DELANTERA IZQUIERDA -->
      <div class="pata-delantera izquierda">
        <div class="hombro">
          <div class="superior">
            <div class="rodilla">
              <div class="inferior">
                <div class="tobillo">
                  <div class="pie"><div class="pezuna"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PATA TRASERA IZQUIERDA -->
      <div class="pata-trasera izquierda">
        <div class="parte-superior">
          <div class="muslo">
            <div class="pierna-inferior">
              <div class="pie"><div class="pezuna"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CABEZA -->
      <div class="cabeza">
        <div class="craneo"></div>
        <div class="nariz"></div>
        <div class="cara"></div>
        <div class="labio"></div>
        <div class="mandibula"></div>
        <div class="barbilla"></div>
        <div class="oreja"></div>
        <div class="ojo"></div>
      </div>

    </div>
  </div>
</div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  setupElements() {
    this.cursor = document.getElementById('horse-cursor');
    this.wrapper = this.cursor?.querySelector('.caballo-wrapper');
    this.isRising = false;
    this.risingTimeout = null;
  }

  setupListeners() {
    this._boundMouseMove = (e) => this.handleMouseMove(e);
    this._boundMouseDown = () => {
      this.resetIdle();
      this.dropDung();
    };

    document.addEventListener('mousemove', this._boundMouseMove);
    document.addEventListener('mousedown', this._boundMouseDown);
    document.addEventListener('mouseleave', () => this.cursor?.classList.remove('active'));
    document.addEventListener('mouseenter', () => this.cursor?.classList.add('active'));
  }

  resetIdle() {
    this.idleTimer = 0;
    this.roamingTimer = 0;
    this.isIdle = false;
    this.isRoaming = false;
    if (this.wrapper) this.wrapper.classList.remove('grazing');
    this.eatGrass(); // Limpiar pasto si se interrumpe
  }

  handleMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.resetIdle();

    const dx = e.clientX - this.renderPos.x;
    if (Math.abs(dx) > 15) {
      this.facingRight = dx > 0;
    }
  }

  animate() {
    let lastTime = performance.now();

    const loop = (now) => {
      if (!this.isActive) return;

      if (this.cursor) {
        this.cursor.style.display = this.isEnabled ? 'block' : 'none';
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      this.updateMovement(dt);

      if (this.isEnabled) {
        this.updateAnimations(dt);
      } else {
        // En segundo plano: reset de timers y limpieza
        this.idleTimer = 0;
        this.roamingTimer = 0;
        if (this.wrapper) this.wrapper.classList.remove('animar', 'grazing');
        this.eatGrass();
      }

      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  updateMovement(dt) {
    const dx = this.mouse.x - this.renderPos.x;
    const dy = this.mouse.y - this.renderPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // LÓGICA DE ROAMING (CAMINAR SOLO)
    if (this.isIdle && !this.isMoving && !this.isRising) {
      this.roamingTimer += dt * 1000;

      if (this.roamingTimer > this.CONFIG.GRAZE_TO_ROAM) {
        this.isRoaming = true;
        this.roamingTimer = 0;

        const margin = 120;
        this.nextRoamTarget = {
          x: margin + Math.random() * (window.innerWidth - margin * 2),
          y: margin + Math.random() * (window.innerHeight - margin * 2)
        };

        this.mouse.x = this.nextRoamTarget.x;
        this.mouse.y = this.nextRoamTarget.y;

        // FORZAR LEVANTAR CABEZA PARA MOVERSE
        this.isIdle = false;
        this.idleTimer = 0; // REINICIAR TIMER PARA EVITAR DOBLE SPAWN
        this.wrapper.classList.remove('grazing');
        this.eatGrass();
        this.isRising = true;
        clearTimeout(this.risingTimeout);
        this.risingTimeout = setTimeout(() => this.isRising = false, this.CONFIG.RISING_DURATION);

        const dx_r = this.mouse.x - this.renderPos.x;
        if (Math.abs(dx_r) > 10) this.facingRight = dx_r > 0;
      }
    }

    let currentlyMoving = false;

    // Solo mover si no estamos levantando el cuello
    if (!this.isRising && Math.abs(distance - this.CONFIG.OFFSET_DIST) > 2) {
      const safeDist = Math.max(distance, 0.1);
      const tX = this.mouse.x - (dx / safeDist) * this.CONFIG.OFFSET_DIST;
      const tY = this.mouse.y - (dy / safeDist) * this.CONFIG.OFFSET_DIST;

      const vx = tX - this.renderPos.x;
      const vy = tY - this.renderPos.y;

      if (Math.sqrt(vx * vx + vy * vy) > 1.8) {
        const smoothing = this.isRoaming ? this.CONFIG.ROAM_SMOOTHING : this.CONFIG.SMOOTHING;
        this.renderPos.x += vx * smoothing;
        this.renderPos.y += vy * smoothing;
        currentlyMoving = true;
      } else {
        // FRENO EN SECO: Cuando está muy cerca, forzamos la posición final 
        // para detener la animación de galope instantáneamente.
        this.renderPos.x = tX;
        this.renderPos.y = tY;
        if (this.isRoaming) this.isRoaming = false;
      }
    }

    this.isMoving = currentlyMoving;

    // Aplicar estilos de posición y giro
    if (this.cursor) {
      this.cursor.style.left = `${this.renderPos.x}px`;
      this.cursor.style.top = `${this.renderPos.y}px`;
    }
    if (this.wrapper) {
      // Invertido para que mire al mouse (comportamiento v5)
      this.wrapper.style.transform = `scaleX(${this.facingRight ? -1 : 1})`;
    }
  }

  updateAnimations(dt) {
    if (!this.wrapper) return;

    if (this.isMoving) {
      // Si venimos de modo reposo, fase de levantado
      if (this.isIdle || this.wrapper.classList.contains('grazing')) {
        this.isIdle = false;
        this.wrapper.classList.remove('grazing');
        this.eatGrass(); // Se termina el pasto al levantarse
        this.isRising = true;
        clearTimeout(this.risingTimeout);
        this.risingTimeout = setTimeout(() => this.isRising = false, this.CONFIG.RISING_DURATION);
      }

      if (!this.isRising) {
        this.wrapper.classList.add('animar');
      }
      this.idleTimer = 0;

      // Partículas de polvo
      this.dustTimer += dt;
      if (this.dustTimer > this.CONFIG.DUST_FREQ) {
        this.spawnDust();
        this.dustTimer = 0;
      }
    } else {
      this.wrapper.classList.remove('animar');
      this.isRising = false;
      this.dustTimer = 0;

      this.idleTimer += dt * 1000;
      if (this.idleTimer > this.CONFIG.IDLE_TO_GRAZE && !this.isIdle) {
        this.isIdle = true;
        this.wrapper.classList.add('grazing');

        // Spawnear el pasto justo cuando se agacha
        const side = this.facingRight ? 45 : -45;
        this.currentGrass = this.spawnGrass(this.renderPos.x + side, this.renderPos.y + 22);
      }
    }
  }

  spawnGrass(x, y, isFuture = false) {
    // Seguridad: eliminar cualquier rastro de pasto anterior antes de crear uno nuevo
    document.querySelectorAll('.horse-grass').forEach(g => g.remove());

    const grass = document.createElement('div');
    grass.className = `horse-grass${isFuture ? ' future' : ''}`;
    grass.innerHTML = `
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
    `;
    grass.style.left = `${x}px`;
    grass.style.top = `${y}px`;
    document.body.appendChild(grass);
    return grass;
  }

  eatGrass() {
    if (this.currentGrass) {
      this.currentGrass.classList.add('eating');
      const g = this.currentGrass;
      setTimeout(() => g.remove(), 1000);
      this.currentGrass = null;
    }
  }

  spawnDust() {
    for (let i = 0; i < 2; i++) {
      const p = document.createElement('div');
      p.className = 'horse-dust-particle';

      // Polvo sale por atrás del caballo (opuesto a la dirección de marcha)
      const behindX = this.facingRight ? -15 : 15;
      p.style.left = `${this.renderPos.x + behindX + (Math.random() - 0.5) * 14}px`;
      p.style.top = `${this.renderPos.y + 20 + (Math.random() - 0.5) * 6}px`;

      const driftDir = this.facingRight ? -1 : 1;
      p.style.setProperty('--dx', `${driftDir * (12 + Math.random() * 18)}px`);
      p.style.setProperty('--dy', `${-(6 + Math.random() * 10)}px`);
      p.style.width = `${4 + Math.random() * 5}px`;
      p.style.height = p.style.width;

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }
  }

  dropDung() {
    if (!this.isEnabled || (Date.now() - this.lastEnableTime < 150)) return;
    // Intentar sacar la posición exacta de la cola
    const tail = this.wrapper?.querySelector('.cola');
    const rect = tail?.getBoundingClientRect();

    let x, y;
    if (rect && rect.width > 0) {
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else {
      // Fallback si no hay render: calcular según orientación
      const offset = this.facingRight ? -30 : 30;
      x = this.renderPos.x + offset;
      y = this.renderPos.y + 20;
    }

    const dropDistance = 30; // Distancia de caída hasta el nivel de las pezuñas

    const dung = document.createElement('div');
    dung.className = 'horse-dung-pile';
    // Dibujado con c-odigo para compatibilidad total
    dung.innerHTML = `
      <div class="dung-shape">
        <div class="dung-layer l3"></div>
        <div class="dung-layer l2"></div>
        <div class="dung-layer l1"></div>
      </div>
    `;
    dung.style.left = `${x}px`;
    dung.style.top = `${y + dropDistance}px`;
    document.body.appendChild(dung);

    const shadow = document.createElement('div');
    shadow.className = 'horse-dung-shadow';
    shadow.style.left = `${x}px`;
    shadow.style.top = `${y + dropDistance + 8}px`;
    document.body.appendChild(shadow);

    // Nueva Animación de Desvanecimiento Suave (Solo Opacidad y Flotación)
    setTimeout(() => {
      dung.classList.add('fading');
      shadow.classList.add('fading');

      // Esperamos 3.2s para que la animación de 3s termine totalmente suave
      setTimeout(() => {
        dung.remove();
        shadow.remove();
      }, 3200);
    }, 1500);
  }
  destroy() {
    this.isActive = false;
    cancelAnimationFrame(this.rafId);
    document.removeEventListener('mousemove', this._boundMouseMove);
    document.removeEventListener('mousedown', this._boundMouseDown);
    this.cursor?.remove();
  }

  setEnabled(enabled) {
    if (enabled && !this.isEnabled) {
      this.lastEnableTime = Date.now();
    }
    this.isEnabled = enabled;
    if (this.cursor) {
      this.cursor.style.display = enabled ? 'block' : 'none';
      if (!enabled) {
        // Limpieza profunda al desactivar
        this.isMoving = false;
        this.isRoaming = false;
        this.isRising = false;
        this.idleTimer = 0;
        this.roamingTimer = 0;
        if (this.wrapper) this.wrapper.classList.remove('animar', 'grazing');
        this.eatGrass(); // Quitar pasto si existe
      }
    }
  }
}

// Inicialización única (Singleton)
if (!window.horseCursorInstance) {
  window.horseCursorInstance = new HorseCursor();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.horseCursorInstance.init());
  } else {
    window.horseCursorInstance.init();
  }
}
