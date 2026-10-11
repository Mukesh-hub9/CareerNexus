/* ============================================================
   CareerNexus — Canvas Particle System (High-Performance)
   ============================================================ */

'use strict';

class ParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    if (!this.ctx) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const defaultCount = isMobile ? 35 : 65;

    this.particles = [];
    this.mouse = { x: null, y: null, radius: 140 };
    this.options = {
      count: options.count || defaultCount,
      speed: options.speed || 0.35,
      connectionDistance: options.connectionDistance || 120,
      r: options.r || 148,
      g: options.g || 163,
      b: options.b || 184,
      particleSize: options.size || 2,
      interactive: options.interactive !== false,
      ...options
    };

    this.maxDistSq = this.options.connectionDistance * this.options.connectionDistance;
    this.mouseRadiusSq = this.mouse.radius * this.mouse.radius;
    this.animId = null;
    this.isRunning = false;
    this.resizeTimeout = null;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(dpr, dpr);
  }

  createParticles() {
    this.particles = [];
    const count = this.options.count;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        size: Math.random() * this.options.particleSize + 1,
        opacity: Math.random() * 0.4 + 0.2,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    if (this.options.interactive) {
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      }, { passive: true });
    }

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
        this.createParticles();
      }, 150);
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  drawParticle(p) {
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.options.r}, ${this.options.g}, ${this.options.b}, ${p.opacity.toFixed(2)})`;
    this.ctx.fill();
  }

  drawConnections() {
    const { r, g, b } = this.options;
    const len = this.particles.length;

    for (let i = 0; i < len; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < len; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < this.maxDistSq) {
          const alpha = (1 - distSq / this.maxDistSq) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
          this.ctx.lineWidth = 0.75;
          this.ctx.stroke();
        }
      }
    }
  }

  drawMouseConnections() {
    if (this.mouse.x === null || this.mouse.y === null) return;
    const { r, g } = this.options;
    const mx = this.mouse.x;
    const my = this.mouse.y;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const dx = mx - p.x;
      const dy = my - p.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < this.mouseRadiusSq) {
        const alpha = (1 - distSq / this.mouseRadiusSq) * 0.35;
        this.ctx.beginPath();
        this.ctx.moveTo(mx, my);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.strokeStyle = `rgba(96, 165, 250, ${alpha.toFixed(3)})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.stroke();
      }
    }
  }

  update() {
    const w = this.width;
    const h = this.height;
    const mx = this.mouse.x;
    const my = this.mouse.y;
    const interactive = this.options.interactive && mx !== null;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;
      p.opacity = 0.25 + Math.sin(p.pulse) * 0.15;

      // Bounce off edges
      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      else if (p.x > w) { p.x = w; p.vx *= -1; }

      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      else if (p.y > h) { p.y = h; p.vy *= -1; }

      // Mouse repulsion
      if (interactive) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < 6400 && distSq > 0) { // 80px squared
          const dist = Math.sqrt(distSq);
          p.x += (dx / dist) * 1.2;
          p.y += (dy / dist) * 1.2;
        }
      }
    }
  }

  animate() {
    if (!this.isRunning) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.update();
    this.drawConnections();
    this.drawMouseConnections();
    for (let i = 0; i < this.particles.length; i++) {
      this.drawParticle(this.particles[i]);
    }
    this.animId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  destroy() {
    this.stop();
  }
}

if (typeof window !== 'undefined') {
  window.ParticleSystem = ParticleSystem;
}
