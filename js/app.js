/* ============================================================
   CareerNexus — Core App & State Management
   ============================================================ */

'use strict';

const App = (() => {

  /* ── State ─────────────────────────────────────────────────── */
  const STATE_KEY = 'careernexus_state';

  const defaultState = {
    user: null,
    profile: {
      name: '',
      email: '',
      degree: '',
      specialization: '',
      college: '',
      graduationYear: '',
      interests: [],
      careerGoals: [],
      weeklyHours: '10',
      academicScore: 75,
      assessmentScore: 70,
      skills: {},
      certifications: [],
      projects: []
    },
    onboarded: false,
    assessmentDone: false,
    currentPage: 'landing'
  };

  function getState() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      return raw ? { ...defaultState, ...JSON.parse(raw) } : { ...defaultState };
    } catch { return { ...defaultState }; }
  }

  function saveState(updates) {
    const current = getState();
    const next = deepMerge(current, updates);
    localStorage.setItem(STATE_KEY, JSON.stringify(next));
    return next;
  }

  function clearState() { localStorage.removeItem(STATE_KEY); }

  function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  /* ── Navigation ────────────────────────────────────────────── */
  function navigate(page) {
    const pages = {
      'landing':    'index.html',
      'login':      'login.html',
      'signup':     'signup.html',
      'dashboard':  'dashboard.html',
      'career-dna': 'career-dna.html',
      'assessment': 'assessment.html',
      'careers':    'careers.html',
      'roadmap':    'roadmap.html',
      'trends':     'trends.html'
    };
    const url = pages[page];
    if (url) window.location.href = url;
  }

  function requireAuth() {
    const state = getState();
    if (!state.user) {
      window.location.href = 'index.html';
      return false;
    }
    if (!state.onboarded && !window.location.pathname.endsWith('onboarding.html')) {
      window.location.href = 'onboarding.html';
      return false;
    }
    return true;
  }

  function logout() {
    saveState({ user: null, profile: null, onboarded: false });
    window.location.href = 'index.html';
  }

  /* ── Toast Notifications ───────────────────────────────────── */
  function showToast(message, type = 'info', duration = 4000) {
    const container = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.4s ease forwards';
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  function createToastContainer() {
    const el = document.createElement('div');
    el.className = 'toast-container';
    document.body.appendChild(el);
    return el;
  }

  /* ── Scroll Animations ─────────────────────────────────────── */
  function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ── Animated Counters ─────────────────────────────────────── */
  function animateCounter(el, target, duration = 1500, suffix = '') {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start).toLocaleString() + suffix;
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, 1500, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => observer.observe(el));
  }

  /* ── Navbar Scroll Effect ──────────────────────────────────── */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Mobile Sidebar Toggle ─────────────────────────────────── */
  function initSidebar() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
    if (overlay) overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  /* ── Progress Bar Fill ─────────────────────────────────────── */
  function animateProgressBars() {
    const bars = document.querySelectorAll('.progress-fill[data-width]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width;
          setTimeout(() => { bar.style.width = width + '%'; }, 100);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => { b.style.width = '0%'; observer.observe(b); });
  }

  /* ── Circular Progress ─────────────────────────────────────── */
  function animateCircularProgress(el, percent, color = '#6366f1') {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const svg = el.querySelector('svg circle:last-child') || el.querySelector('.progress-circle-fill');
    if (!svg) return;
    svg.style.stroke = color;
    svg.style.strokeDasharray = circumference;
    const offset = circumference - (percent / 100) * circumference;
    setTimeout(() => {
      svg.style.strokeDashoffset = offset;
    }, 300);
  }

  /* ── Password Toggle ───────────────────────────────────────── */
  function initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.input-wrapper')?.querySelector('input') ||
                      document.querySelector(btn.dataset.target);
        if (!input) return;
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        btn.textContent = isPass ? '🙈' : '👁️';
      });
    });
  }

  /* ── Password Strength ─────────────────────────────────────── */
  function checkPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;
    if (score <= 1) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
  }

  function initPasswordStrength() {
    const inputs = document.querySelectorAll('[data-strength-target]');
    inputs.forEach(input => {
      const targetId = input.dataset.strengthTarget;
      const indicator = document.getElementById(targetId);
      if (!indicator) return;
      input.addEventListener('input', () => {
        const strength = checkPasswordStrength(input.value);
        const fill = indicator.querySelector('.strength-fill');
        const text = indicator.querySelector('.strength-text');
        if (fill) fill.className = `strength-fill ${strength}`;
        if (text) { text.className = `strength-text ${strength}`; text.textContent = strength.charAt(0).toUpperCase() + strength.slice(1); }
      });
    });
  }

  /* ── Chatbot ───────────────────────────────────────────────── */
  function initChatbot() {
    let fab = document.getElementById('chatbot-fab') || document.querySelector('.chatbot-fab');
    let chatWindow = document.getElementById('chatbot-window') || document.querySelector('.chatbot-window');

    // Auto-inject chatbot if on any platform page with sidebar and not already in DOM
    if (!fab && document.querySelector('.sidebar')) {
      const chatHolder = document.createElement('div');
      chatHolder.id = 'global-chatbot-holder';
      chatHolder.innerHTML = `
        <button class="chatbot-fab" id="chatbot-fab" title="Chat with AI Career Advisor" aria-label="AI Career Advisor">🤖</button>
        <div class="chatbot-window hidden" id="chatbot-window">
          <div class="chatbot-header">
            <div class="chatbot-avatar">✦</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:0.95rem">CareerNexus AI Advisor</div>
              <div style="font-size:0.7rem;color:var(--accent-green);font-weight:600">● Live & Ready</div>
            </div>
            <button class="modal-close" id="chatbot-close" style="position:static;width:28px;height:28px;font-size:0.85rem">✕</button>
          </div>
          <div class="chatbot-messages" id="chatbot-messages">
            <div class="chat-msg bot">
              Hi! I'm your CareerNexus AI Advisor. Ask me anything about career matching, skill prerequisites, or your learning roadmap!
            </div>
          </div>
          <div class="chatbot-input-area">
            <input type="text" id="chatbot-input" placeholder="Ask about careers, skills, roadmaps..." />
            <button class="chatbot-send" id="chatbot-send">➤</button>
          </div>
        </div>
      `;
      document.body.appendChild(chatHolder);
      fab = document.getElementById('chatbot-fab');
      chatWindow = document.getElementById('chatbot-window');
    }

    if (!fab || !chatWindow) return;
    if (fab.dataset.bound === 'true') return;
    fab.dataset.bound = 'true';

    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    fab.addEventListener('click', () => {
      chatWindow.classList.toggle('hidden');
      fab.classList.toggle('active');
      if (!chatWindow.classList.contains('hidden') && input) {
        setTimeout(() => input.focus(), 150);
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        fab.classList.remove('active');
      });
    }

    function addMessage(text, sender) {
      if (!messages) return;
      const msg = document.createElement('div');
      msg.className = `chat-msg ${sender}`;
      msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }

    function handleSend() {
      const text = input?.value?.trim();
      if (!text) return;
      addMessage(text, 'user');
      input.value = '';
      setTimeout(() => {
        const state = App.getState();
        const response = window.AIEngine ? AIEngine.getChatResponse(text, state.profile) : "CareerNexus AI is analyzing your career profile and learning trajectory...";
        addMessage(response, 'bot');
      }, 500);
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
  }

  /* ── Date Display ──────────────────────────────────────────── */
  function getFormattedDate() {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  /* ── Init All ──────────────────────────────────────────────── */
  function init() {
    initNavbar();
    initSidebar();
    initRevealAnimations();
    initCounters();
    initPasswordToggles();
    initPasswordStrength();
    animateProgressBars();
    initChatbot();

    // Set date displays
    document.querySelectorAll('.date-display').forEach(el => {
      el.textContent = getFormattedDate();
    });

    // Set user name displays
    const state = getState();
    if (state.user) {
      document.querySelectorAll('.user-name-display').forEach(el => {
        el.textContent = state.user.name || 'Student';
      });
      document.querySelectorAll('.user-avatar-initials').forEach(el => {
        el.textContent = (state.user.name || 'S').charAt(0).toUpperCase();
      });
    }
  }

  return { getState, saveState, clearState, navigate, logout, showToast, requireAuth, animateProgressBars, animateCircularProgress, animateCounter, getFormattedDate, checkPasswordStrength, init };
})();

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', App.init);

if (typeof window !== 'undefined') window.App = App;
