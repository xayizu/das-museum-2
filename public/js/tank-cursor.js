/**
 * REINVENTED TANK CURSOR - AMX-13 PET EDITION
 * High-performance, sleek, and responsive mouse companion.
 */
class TankCursor {
    constructor() {
        this.cursor = null;
        this.muzzleFlash = null;
        this.tankBody = null;
        this.turret = null;
        this.barrelGroup = null;
        this.moveTimeout = null;
        this.isActive = false;
        this.isEnabled = true; // For switching logic

        // Positioning & Rotation
        this.mouse = { x: 0, y: 0 };
        this.pos = { x: 0, y: 0 };
        this.renderPos = { x: 0, y: 0 };
        this.lastPos = { x: 0, y: 0 };
        this.bodyRot = 0;
        this.turretRot = 0;
        this.targetBodyRot = 0;
        this.targetTurretRot = 0;

        // Idle Animation State
        this.idleRotation = 0;
        this.isMoving = false;
        this.isLockedOn = false;
        this.lockedElement = null;
        this.lastMoveTime = Date.now();

        // Configuration (Weighted & Smooth)
        this.POS_SMOOTHING = 0.045; // Increased lag for "pet" feel
        this.BODY_SMOOTHING = 0.08;
        this.TURRET_SMOOTHING = 0.06;
        this.OFFSET_DIST = 60; // Keep distance from cursor
        this.IDLE_THRESHOLD = 3000;
        this.lastEnableTime = 0;
    }

    init() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        this.injectHTML();
        this.setupElements();
        this.setupListeners();

        this.renderPos.x = window.innerWidth / 2;
        this.renderPos.y = window.innerHeight / 2;

        this.animate();

        this.isActive = true;
        document.documentElement.classList.add('has-custom-cursor');
        this.cursor?.classList.add('active');
    }

    injectHTML() {
        if (document.getElementById('custom-cursor')) return;
        const html = `
            <div id="custom-cursor">
                <div class="tank-unit">
                    <div class="tank-body">
                        <div class="tread left-tread"></div>
                        <div class="tread right-tread"></div>
                        <div class="chassis">
                            <div class="light front-light-l"></div>
                            <div class="light front-light-r"></div>
                            <div class="light rear-light-l"></div>
                            <div class="light rear-light-r"></div>
                        </div>
                        <div class="turret">
                            <div class="turret-cap"></div>
                            <div class="turret-hatch"></div>
                            <div class="barrel-group">
                                <div class="barrel-tube"></div>
                                <div id="muzzle-flash"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    setupElements() {
        this.cursor = document.getElementById('custom-cursor');
        this.muzzleFlash = document.getElementById('muzzle-flash');
        this.tankBody = this.cursor?.querySelector('.tank-body');
        this.turret = this.cursor?.querySelector('.turret');
        this.barrelGroup = this.cursor?.querySelector('.barrel-group');
    }

    setupListeners() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mousedown', () => this.fire());
        document.addEventListener('mouseleave', () => this.cursor?.classList.remove('active'));
        document.addEventListener('mouseenter', () => this.cursor?.classList.add('active'));

        this.updateInteractiveSensors();
        const observer = new MutationObserver(() => this.updateInteractiveSensors());
        observer.observe(document.body, { childList: true, subtree: true });
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        this.pos.x = e.clientX;
        this.pos.y = e.clientY;

        const dx = this.pos.x - this.lastPos.x;
        const dy = this.pos.y - this.lastPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1.5) {
            this.isMoving = true;
            this.targetBodyRot = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

            if (!this.isLockedOn) {
                this.targetTurretRot = 0;
            }

            if (this.isEnabled && Math.random() > 0.8) {
                this.spawnSmoke(this.renderPos.x, this.renderPos.y, -dx * 1.5, -dy * 1.5);
                this.spawnDust(this.renderPos.x, this.renderPos.y, -dx * 1.2, -dy * 0.8);
            }
        }

        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
        this.lastMoveTime = Date.now();

        clearTimeout(this.moveTimeout);
        this.moveTimeout = setTimeout(() => this.isMoving = false, 150);
    }

    animate() {
        const loop = () => {
            if (!this.isActive) return;

            if (this.cursor) {
                this.cursor.style.display = this.isEnabled ? 'block' : 'none';
            }

            // TANK "PET" LOGIC: Follow or Flee to maintain OFFSET_DIST
            const dx_m = this.mouse.x - this.renderPos.x;
            const dy_m = this.mouse.y - this.renderPos.y;
            const dist_m = Math.sqrt(dx_m * dx_m + dy_m * dy_m);

            // If the distance is not the offset, we move the tank
            if (Math.abs(dist_m - this.OFFSET_DIST) > 2) {
                const safetyDist = dist_m < 0.1 ? 0.1 : dist_m;
                const tX = this.mouse.x - (dx_m / safetyDist) * this.OFFSET_DIST;
                const tY = this.mouse.y - (dy_m / safetyDist) * this.OFFSET_DIST;

                const vx = tX - this.renderPos.x;
                const vy = tY - this.renderPos.y;
                const moveDist = Math.sqrt(vx * vx + vy * vy);

                if (moveDist > 0.1) {
                    this.renderPos.x += vx * this.POS_SMOOTHING;
                    this.renderPos.y += vy * this.POS_SMOOTHING;
                    if (this.isEnabled) this.cursor.classList.add('is-moving');
                } else {
                    if (this.isEnabled) this.cursor.classList.remove('is-moving');
                }
            } else {
                if (this.isEnabled) this.cursor.classList.remove('is-moving');
            }

            if (this.cursor) {
                this.cursor.style.left = `${this.renderPos.x}px`;
                this.cursor.style.top = `${this.renderPos.y}px`;
            }

            // Body Rotation
            let bDiff = this.targetBodyRot - this.bodyRot;
            while (bDiff > 180) bDiff -= 360;
            while (bDiff < -180) bDiff += 360;
            this.bodyRot += bDiff * this.BODY_SMOOTHING;

            // Turret & Body Logic
            const timeSinceMove = Date.now() - this.lastMoveTime;

            if (this.isLockedOn && this.lockedElement) {
                const rect = this.lockedElement.getBoundingClientRect();
                const targetX = rect.left + rect.width / 2;
                const targetY = rect.top + rect.height / 2;
                const angle = Math.atan2(targetY - this.renderPos.y, targetX - this.renderPos.x) * (180 / Math.PI) + 90;
                this.targetTurretRot = angle - this.bodyRot;
                this.idleRotation = this.turretRot;
            } else if (!this.isMoving) {
                if (timeSinceMove > this.IDLE_THRESHOLD) {
                    this.idleRotation += 0.8;
                    this.targetTurretRot = this.idleRotation;
                } else {
                    this.targetTurretRot = 0;
                    this.idleRotation *= 0.95;
                }
            } else {
                this.targetTurretRot = 0;
                this.idleRotation = 0;
            }

            let tDiff = this.targetTurretRot - this.turretRot;
            while (tDiff > 180) tDiff -= 360;
            while (tDiff < -180) tDiff += 360;
            this.turretRot += tDiff * this.TURRET_SMOOTHING;

            if (this.tankBody) {
                this.tankBody.style.setProperty('--rot-b', `${this.bodyRot}deg`);
            }
            if (this.turret) {
                this.turret.style.setProperty('--rot-t', `${this.turretRot}deg`);
            }

            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    fire() {
        if (!this.isEnabled || !this.muzzleFlash || (Date.now() - this.lastEnableTime < 150)) return;
        this.muzzleFlash.classList.remove('firing');
        void this.muzzleFlash.offsetWidth;
        this.muzzleFlash.classList.add('firing');

        if (this.barrelGroup) {
            this.barrelGroup.classList.remove('recoil');
            void this.barrelGroup.offsetWidth;
            this.barrelGroup.classList.add('recoil');
        }

        const scale = 0.75;
        const totalRad = (this.bodyRot + this.turretRot) * (Math.PI / 180);

        // CALIBRATED MUZZLE POSITION
        // Body center is at renderPos.x, renderPos.y + (25 * scale)
        // Turret pivot is at body center + displacement along body rotation axis
        // The turret is 10px behind the body center in the AMX-13 profile
        const bodyRad = this.bodyRot * (Math.PI / 180);
        
        // Pivot point of the turret relative to the body center
        // When bodyRot is 0 (up), turret is 10px below center
        const pivotX = this.renderPos.x + Math.sin(bodyRad) * (10 * scale);
        const pivotY = this.renderPos.y + (25 * scale) + Math.cos(bodyRad) * (10 * scale);

        // Muzzle distance from turret pivot (58 pixels at scale 1)
        const muzzleDist = 58 * scale; 

        // Total rotation is world rotation (angle from vertical)
        const muzzleX = pivotX + Math.sin(totalRad) * muzzleDist;
        const muzzleY = pivotY - Math.cos(totalRad) * muzzleDist;

        // Spawn Projectile (Bullet)
        this.spawnProjectile(muzzleX, muzzleY, totalRad);

        // Spawn Muzzle Smoke
        for (let i = 0; i < 8; i++) {
            const spread = (Math.random() - 0.5) * 0.4;
            const smokeDX = Math.sin(totalRad + spread) * (50 + Math.random() * 30);
            const smokeDY = -Math.cos(totalRad + spread) * (50 + Math.random() * 30);
            
            setTimeout(() => {
                this.spawnSmoke(muzzleX, muzzleY, smokeDX, smokeDY);
            }, i * 20);
        }
    }

    spawnProjectile(x, y, rad) {
        const shell = document.createElement('div');
        shell.className = 'tank-projectile';

        let curX = x;
        let curY = y;
        const speed = 25; // High velocity
        const vx = Math.sin(rad) * speed;
        const vy = -Math.cos(rad) * speed;
        const rotation = rad * (180 / Math.PI);

        shell.style.left = `0px`;
        shell.style.top = `0px`;
        shell.style.transform = `translate(${curX}px, ${curY}px) rotate(${rotation}deg) translate(-50%, -50%)`;
        document.body.appendChild(shell);

        const moveShell = () => {
            curX += vx;
            curY += vy;
            shell.style.transform = `translate(${curX}px, ${curY}px) rotate(${rotation}deg) translate(-50%, -50%)`;

            // Remove if out of screen
            if (curX < -100 || curX > window.innerWidth + 100 ||
                curY < -100 || curY > window.innerHeight + 100) {
                shell.remove();
            } else {
                requestAnimationFrame(moveShell);
            }
        };
        requestAnimationFrame(moveShell);
    }

    spawnSmoke(x, y, dx, dy) {
        const p = document.createElement('div');
        p.className = 'smoke-particle';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--dy', `${dy}px`);
        p.style.animation = `smoke-fade 0.8s ease-out forwards`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }

    spawnDust(x, y, dx, dy) {
        const p = document.createElement('div');
        p.className = 'dust-particle';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.setProperty('--dx', `${dx + (Math.random() - 0.5) * 20}px`);
        p.style.setProperty('--dy', `${dy + (Math.random() - 0.5) * 10}px`);
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 700);
    }

    updateInteractiveSensors() {
        const elements = document.querySelectorAll('a, button, .cursor-pointer, [onclick], input');
        elements.forEach(el => {
            if (el.dataset.tankSensor) return;
            el.addEventListener('mouseenter', () => {
                this.isLockedOn = true;
                this.lockedElement = el;
                this.cursor?.classList.add('locked-on');
            });
            el.addEventListener('mouseleave', () => {
                this.isLockedOn = false;
                this.lockedElement = null;
                this.cursor?.classList.remove('locked-on');
            });
            el.dataset.tankSensor = "true";
        });
    }

    setEnabled(enabled) {
        if (enabled && !this.isEnabled) {
            this.lastEnableTime = Date.now();
        }
        this.isEnabled = enabled;
        if (this.cursor) {
            this.cursor.style.display = enabled ? 'block' : 'none';
            if (!enabled) {
                this.isMoving = false;
            }
        }
    }
}


// Start
window.tankCursor = new TankCursor();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.tankCursor.init());
} else {
    window.tankCursor.init();
}

