/* ============================================================
   CareerNexus — Career DNA Module
   Mock data service + page logic
   Connect to GET /api/career-dna to replace mock with real data
   ============================================================ */

'use strict';

/* ── Mock Data Service ─────────────────────────────────────────
   Replace fetchCareerDNA() with a real fetch() call when backend is ready:
   const res = await fetch('/api/career-dna');
   return await res.json();
   ──────────────────────────────────────────────────────────── */
const CareerDNAService = (() => {

  const MOCK_DATA = {
    overall_score: 87,
    career_identity: 'Analytical Technology Builder',
    last_analyzed: 'September 8, 2026',
    dimensions: {
      technical:       88,
      problem_solving: 94,
      analytical:      91,
      creativity:      72,
      communication:   81,
      leadership:      64,
      adaptability:    86,
      learning_agility:92
    },
    strengths: [
      { icon: '🧠', title: 'Analytical Thinker',    description: 'Strong ability to break complex problems into structured, actionable solutions.', color: 'blue'   },
      { icon: '🛡️', title: 'Security Mindset',      description: 'Strong alignment with risk detection, systems security, and defensive thinking.', color: 'violet' },
      { icon: '⚡', title: 'Fast Learner',           description: 'Demonstrates strong learning adaptability across multiple technical domains.',    color: 'cyan'   },
      { icon: '🔬', title: 'Systems Investigator',  description: 'Natural inclination toward root-cause analysis and deep technical investigation.', color: 'green'  }
    ],
    traits: [
      { label: 'Problem Solver',      active: true  },
      { label: 'Independent Learner', active: true  },
      { label: 'Detail Oriented',     active: true  },
      { label: 'Logical Thinker',     active: true  },
      { label: 'Team Contributor',    active: false },
      { label: 'Continuous Learner',  active: true  },
      { label: 'Creative Thinker',    active: false },
      { label: 'Strategic Planner',   active: false },
      { label: 'Data Driven',         active: true  },
      { label: 'Risk Aware',          active: true  }
    ],
    career_matches: [
      { title: 'Cybersecurity Analyst',   pct: 94, icon: '🛡️', color: '#6366f1' },
      { title: 'Security Engineer',       pct: 89, icon: '🔐', color: '#3b82f6' },
      { title: 'Cloud Security Engineer', pct: 84, icon: '☁️', color: '#06b6d4' },
      { title: 'Data Analyst',            pct: 76, icon: '📊', color: '#10b981' },
      { title: 'Software Engineer',       pct: 71, icon: '💻', color: '#8b5cf6' },
      { title: 'DevOps Engineer',         pct: 67, icon: '⚙️', color: '#f59e0b' }
    ],
    ai_insight: 'Your Career DNA shows a strong combination of analytical thinking, technical curiosity, and problem-solving ability. Your profile currently aligns strongly with technology careers involving investigation, systems thinking, and continuous learning. Focus on strengthening Communication and Leadership dimensions to unlock senior-level career paths.',
    evolution: [
      { month: 'Jan', technical: 68, problem_solving: 74, overall: 69 },
      { month: 'Feb', technical: 70, problem_solving: 78, overall: 72 },
      { month: 'Mar', technical: 76, problem_solving: 82, overall: 76 },
      { month: 'Apr', technical: 78, problem_solving: 85, overall: 79 },
      { month: 'May', technical: 82, problem_solving: 89, overall: 83 },
      { month: 'Jun', technical: 88, problem_solving: 94, overall: 87 }
    ]
  };

  async function fetchCareerDNA() {
    await new Promise(r => setTimeout(r, 800));
    /* BACKEND INTEGRATION POINT:
       const res = await fetch('/api/career-dna', {
         headers: { 'Authorization': 'Bearer ' + App.getState().user?.token }
       });
       if (!res.ok) throw new Error('Failed to fetch Career DNA');
       return await res.json();
    */
    return Object.assign({}, MOCK_DATA);
  }

  return { fetchCareerDNA };
})();

/* ── Career DNA Page Controller ────────────────────────────── */
const CareerDNA = (() => {

  let dnaData = null;
  let radarChart = null;
  let evolutionChart = null;

  async function init() {
    if (!App.requireAuth()) return;

    const state = App.getState();
    const user = state.user || {};
    const name = user.name || 'Student';

    document.getElementById('sidebar-name').textContent = name;
    document.getElementById('sidebar-avatar').textContent = name.charAt(0).toUpperCase();
    document.getElementById('topbar-avatar').textContent = name.charAt(0).toUpperCase();
    document.getElementById('dna-student-name').textContent = name;
    document.getElementById('topbar-title').textContent = 'Career DNA';
    document.getElementById('topbar-date').textContent = App.getFormattedDate();

    showLoading(true);

    try {
      dnaData = await CareerDNAService.fetchCareerDNA();
      document.getElementById('dna-last-analyzed').textContent = 'Last analyzed: ' + dnaData.last_analyzed;
      renderAll(dnaData);
      showLoading(false);
      App.animateProgressBars();
      setTimeout(function() {
        animateDNAScore(dnaData.overall_score);
        initReveal();
      }, 200);
    } catch (err) {
      console.error('Career DNA error:', err);
      App.showToast('Failed to load Career DNA. Please try again.', 'error');
      showLoading(false);
    }

    document.getElementById('btn-reanalyze').addEventListener('click', reanalyze);

    document.querySelectorAll('.dna-action-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { handleAction(btn.dataset.action); });
    });

    setupChatbot();
    setupMobileSidebar();
  }

  function renderAll(data) {
    renderHeroCard(data);
    renderDimensions(data.dimensions);
    renderRadarChart(data.dimensions);
    renderStrengths(data.strengths);
    renderTraits(data.traits);
    renderCareerMatches(data.career_matches);
    renderAIInsight(data.ai_insight);
    renderEvolutionChart(data.evolution);
  }

  let ringAnimId = null;

  function renderHeroCard(data) {
    const scoreEl = document.getElementById('dna-overall-score');
    if (scoreEl) scoreEl.textContent = '0%';
    const identityEl = document.getElementById('dna-career-identity');
    if (identityEl) identityEl.textContent = data.career_identity;
    const canvas = document.getElementById('dna-ring-canvas');
    if (canvas) drawRing(canvas, data.overall_score);
  }

  function drawRing(canvas, pct) {
    if (ringAnimId) {
      cancelAnimationFrame(ringAnimId);
      ringAnimId = null;
    }
    const size = canvas.width;
    const cx = size / 2, cy = size / 2;
    const r = size / 2 - 18;
    const targetArc = (pct / 100) * 2 * Math.PI;
    const ctx = canvas.getContext('2d');
    const duration = 1400;
    let startTime = null;

    // Gradient
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#4f46e5');
    grad.addColorStop(0.5, '#3b82f6');
    grad.addColorStop(1, '#38bdf8');

    function animate(now) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentArc = targetArc * ease;

      ctx.clearRect(0, 0, size, size);

      // Track ring background
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 12;
      ctx.stroke();

      // Main gradient arc
      ctx.strokeStyle = grad;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + currentArc, false);
      ctx.stroke();

      // Glowing tip particle
      if (currentArc > 0) {
        const tipAngle = -Math.PI / 2 + currentArc;
        const tipX = cx + r * Math.cos(tipAngle);
        const tipY = cy + r * Math.sin(tipAngle);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(tipX, tipY, 6, 0, 2 * Math.PI);
        ctx.fill();
      }

      if (progress < 1) {
        ringAnimId = requestAnimationFrame(animate);
      } else {
        ringAnimId = null;
      }
    }
    ringAnimId = requestAnimationFrame(animate);
  }

  function animateDNAScore(target) {
    const el = document.getElementById('dna-overall-score');
    if (!el) return;
    let count = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = Math.floor(count) + '%';
      if (count >= target) clearInterval(timer);
    }, 16);
  }

  var DIM_META = {
    technical:        { label: 'Technical Skills',    icon: '💻' },
    problem_solving:  { label: 'Problem Solving',     icon: '🧩' },
    analytical:       { label: 'Analytical Thinking', icon: '📐' },
    creativity:       { label: 'Creativity',          icon: '🎨' },
    communication:    { label: 'Communication',       icon: '💬' },
    leadership:       { label: 'Leadership',          icon: '🎯' },
    adaptability:     { label: 'Adaptability',        icon: '🌀' },
    learning_agility: { label: 'Learning Agility',    icon: '⚡' }
  };

  function getSkillLevel(pct) {
    if (pct >= 90) return { label: 'Expert',     color: '#6366f1' };
    if (pct >= 75) return { label: 'Advanced',   color: '#3b82f6' };
    if (pct >= 55) return { label: 'Proficient', color: '#06b6d4' };
    if (pct >= 35) return { label: 'Developing', color: '#f59e0b' };
    return               { label: 'Beginner',   color: '#94a3b8' };
  }

  function renderDimensions(dims) {
    var container = document.getElementById('dna-dimensions-grid');
    if (!container) return;
    var html = '';
    var i = 0;
    Object.keys(dims).forEach(function(key) {
      var pct = dims[key];
      var meta = DIM_META[key] || { label: key, icon: '●' };
      var level = getSkillLevel(pct);
      var delay = (i * 0.07).toFixed(2);
      html += '<div class="dna-dim-card reveal" style="animation-delay:' + delay + 's">' +
        '<div class="dna-dim-icon">' + meta.icon + '</div>' +
        '<div class="dna-dim-body">' +
          '<div class="dna-dim-label">' + meta.label + '</div>' +
          '<div class="dna-dim-row">' +
            '<div class="dna-dim-score" style="color:' + level.color + '">' + pct + '%</div>' +
            '<span class="badge" style="background:' + level.color + '22;color:' + level.color + ';border:1px solid ' + level.color + '44;font-size:0.7rem">' + level.label + '</span>' +
          '</div>' +
          '<div class="progress-bar dna-dim-bar">' +
            '<div class="progress-fill" data-width="' + pct + '" style="background:linear-gradient(90deg,' + level.color + ',' + level.color + '99);width:0%"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
      i++;
    });
    container.innerHTML = html;
  }

  function renderRadarChart(dims) {
    var canvas = document.getElementById('dna-radar-chart');
    if (!canvas || typeof Chart === 'undefined') return;
    if (radarChart) { radarChart.destroy(); radarChart = null; }

    radarChart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: ['Technical', 'Problem Solving', 'Analytical', 'Creativity', 'Communication', 'Leadership', 'Adaptability', 'Learning Agility'],
        datasets: [
          {
            label: 'Your DNA',
            data: [dims.technical, dims.problem_solving, dims.analytical, dims.creativity, dims.communication, dims.leadership, dims.adaptability, dims.learning_agility],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.18)',
            pointBackgroundColor: '#06b6d4',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#3b82f6',
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Industry Avg',
            data: [75, 72, 70, 68, 74, 72, 70, 71],
            borderColor: 'rgba(148, 163, 184, 0.5)',
            backgroundColor: 'rgba(148, 163, 184, 0.05)',
            pointBackgroundColor: 'rgba(148, 163, 184, 0.7)',
            pointBorderColor: 'transparent',
            borderWidth: 1.5,
            borderDash: [4, 4],
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { display: false },
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            angleLines: { color: 'rgba(255, 255, 255, 0.06)' },
            pointLabels: { color: '#cbd5e1', font: { size: 11, weight: '600' } }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: { color: '#cbd5e1', padding: 16, font: { size: 12 }, usePointStyle: true }
          }
        },
        animation: { duration: 1400, easing: 'easeOutQuart' }
      }
    });
  }

  function renderStrengths(strengths) {
    var container = document.getElementById('dna-strengths-grid');
    if (!container) return;
    var colorMap = {
      blue:   { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.22)',  glow: 'rgba(59,130,246,0.18)' },
      violet: { bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.22)', glow: 'rgba(99,102,241,0.18)' },
      cyan:   { bg: 'rgba(6,182,212,0.08)',   border: 'rgba(6,182,212,0.22)',  glow: 'rgba(6,182,212,0.18)'  },
      green:  { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.22)', glow: 'rgba(16,185,129,0.18)' }
    };
    container.innerHTML = strengths.map(function(s, i) {
      var c = colorMap[s.color] || colorMap.blue;
      return '<div class="dna-strength-card reveal delay-' + ((i % 4) + 1) + '" style="background:' + c.bg + ';border-color:' + c.border + '">' +
        '<div class="dna-strength-icon" style="background:' + c.glow + '">' + s.icon + '</div>' +
        '<div class="dna-strength-title">' + s.title + '</div>' +
        '<div class="dna-strength-desc">' + s.description + '</div>' +
      '</div>';
    }).join('');
  }

  function renderTraits(traits) {
    var container = document.getElementById('dna-traits-list');
    if (!container) return;
    container.innerHTML = traits.map(function(t) {
      return '<span class="dna-trait-pill ' + (t.active ? 'active' : 'inactive') + '" title="' + (t.active ? 'Strong trait' : 'Developing') + '">' +
        (t.active ? '✦' : '○') + ' ' + t.label +
      '</span>';
    }).join('');
  }

  function renderCareerMatches(matches) {
    var container = document.getElementById('dna-career-matches');
    if (!container) return;
    container.innerHTML = matches.map(function(m, i) {
      return '<div class="dna-match-row reveal" style="animation-delay:' + (i * 0.08).toFixed(2) + 's">' +
        '<div class="dna-match-left">' +
          '<span class="dna-match-icon">' + m.icon + '</span>' +
          '<span class="dna-match-title">' + m.title + '</span>' +
        '</div>' +
        '<div class="dna-match-right">' +
          '<div class="dna-match-bar-wrap"><div class="dna-match-bar"><div class="dna-match-fill" data-width="' + m.pct + '" style="background:' + m.color + ';width:0%"></div></div></div>' +
          '<span class="dna-match-pct" style="color:' + m.color + '">' + m.pct + '%</span>' +
        '</div>' +
      '</div>';
    }).join('');

    setTimeout(function() {
      document.querySelectorAll('.dna-match-fill').forEach(function(el) {
        var w = el.dataset.width;
        setTimeout(function() { el.style.width = w + '%'; }, 300);
      });
    }, 400);
  }

  function renderAIInsight(text) {
    var el = document.getElementById('dna-ai-insight-text');
    if (el) el.textContent = text;
  }

  function renderEvolutionChart(evolution) {
    var canvas = document.getElementById('dna-evolution-chart');
    if (!canvas || typeof Chart === 'undefined') return;
    if (evolutionChart) { evolutionChart.destroy(); evolutionChart = null; }

    evolutionChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: evolution.map(function(e) { return e.month; }),
        datasets: [
          {
            label: 'Overall DNA',
            data: evolution.map(function(e) { return e.overall; }),
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.12)',
            fill: true, tension: 0.45, pointRadius: 5, pointHoverRadius: 8,
            pointBackgroundColor: '#6366f1', pointBorderColor: 'transparent', borderWidth: 2.5
          },
          {
            label: 'Technical Skills',
            data: evolution.map(function(e) { return e.technical; }),
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6,182,212,0.08)',
            fill: true, tension: 0.45, pointRadius: 4, pointHoverRadius: 7,
            pointBackgroundColor: '#06b6d4', pointBorderColor: 'transparent', borderWidth: 2
          },
          {
            label: 'Problem Solving',
            data: evolution.map(function(e) { return e.problem_solving; }),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.06)',
            fill: false, tension: 0.45, pointRadius: 4, pointHoverRadius: 7,
            pointBackgroundColor: '#3b82f6', pointBorderColor: 'transparent', borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top', labels: { color: '#cbd5e1', padding: 20, usePointStyle: true, font: { size: 12 } } },
          tooltip: { callbacks: { label: function(ctx) { return ' ' + ctx.dataset.label + ': ' + ctx.parsed.y + '%'; } } }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a3b8', font: { size: 12 } } },
          y: { min: 50, max: 100, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8', callback: function(v) { return v + '%'; }, font: { size: 12 } } }
        },
        animation: { duration: 1600, easing: 'easeOutCubic' }
      }
    });
  }

  function showLoading(on) {
    var loader = document.getElementById('dna-loader');
    var content = document.getElementById('dna-content');
    if (loader) loader.style.display = on ? 'flex' : 'none';
    if (content) { content.style.opacity = on ? '0' : '1'; content.style.pointerEvents = on ? 'none' : 'auto'; }
  }

  async function reanalyze() {
    var btn = document.getElementById('btn-reanalyze');
    btn.classList.add('loading');
    btn.textContent = 'Analyzing...';
    showLoading(true);
    await new Promise(function(r) { setTimeout(r, 1800); });
    var data = await CareerDNAService.fetchCareerDNA();
    Object.keys(data.dimensions).forEach(function(k) {
      var delta = Math.floor(Math.random() * 5) - 2;
      data.dimensions[k] = Math.max(0, Math.min(100, data.dimensions[k] + delta));
    });
    dnaData = data;
    renderAll(data);
    showLoading(false);
    App.animateProgressBars();
    setTimeout(function() { animateDNAScore(data.overall_score); initReveal(); }, 200);
    btn.classList.remove('loading');
    btn.textContent = 'Re-analyze Profile';
    App.showToast('Career DNA updated successfully!', 'success');
  }

  function initReveal() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
  }

  function handleAction(action) {
    var map = { weakest: 'assessment', careers: 'careers', roadmap: 'roadmap' };
    if (map[action]) App.navigate(map[action]);
  }

  function setupChatbot() {
    var fab = document.getElementById('chatbot-fab');
    var win = document.getElementById('chatbot-window');
    var closeBtn = document.getElementById('chatbot-close');
    var sendBtn = document.getElementById('chatbot-send');
    var input = document.getElementById('chatbot-input');
    var msgs = document.getElementById('chatbot-messages');
    if (!fab || !win) return;
    fab.addEventListener('click', function() { win.classList.toggle('hidden'); });
    closeBtn.addEventListener('click', function() { win.classList.add('hidden'); });
    function addMsg(text, who) {
      var m = document.createElement('div');
      m.className = 'chat-msg ' + who;
      m.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      msgs.appendChild(m);
      msgs.scrollTop = msgs.scrollHeight;
    }
    function sendMsg() {
      var txt = input.value.trim();
      if (!txt) return;
      addMsg(txt, 'user');
      input.value = '';
      setTimeout(function() {
        var state = App.getState();
        var r = window.AIEngine ? AIEngine.getChatResponse(txt, state.profile) : 'Let me help with your Career DNA!';
        addMsg(r, 'bot');
      }, 600);
    }
    sendBtn.addEventListener('click', sendMsg);
    input.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendMsg(); });
  }

  function setupMobileSidebar() {
    var toggleBtn = document.getElementById('sidebar-toggle');
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.getElementById('sidebar-overlay');
    if (!toggleBtn || !sidebar) return;
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      if (overlay) overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    });
    if (overlay) overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.style.display = 'none';
    });
  }

  return { init: init };
})();

if (typeof window !== 'undefined') {
  window.CareerDNAService = CareerDNAService;
  window.CareerDNA = CareerDNA;
}

document.addEventListener('DOMContentLoaded', CareerDNA.init);
