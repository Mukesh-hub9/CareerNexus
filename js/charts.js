/* ============================================================
   CareerNexus — Chart.js Wrappers
   ============================================================ */

'use strict';

const Charts = (() => {

  const DEFAULT_FONT = "'Inter', sans-serif";
  const COLORS = {
    blue:   '#38bdf8',
    violet: '#818cf8',
    cyan:   '#7dd3fc',
    green:  '#34d399',
    orange: '#fbbf24',
    red:    '#f87171',
    pink:   '#f472b6'
  };

  // Safe defaults setup
  if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = DEFAULT_FONT;
    if (Chart.defaults.plugins && Chart.defaults.plugins.legend) {
      Chart.defaults.plugins.legend.labels.color = '#cbd5e1';
    }
    if (Chart.defaults.plugins && Chart.defaults.plugins.tooltip) {
      Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(21, 28, 40, 0.95)';
      Chart.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.15)';
      Chart.defaults.plugins.tooltip.borderWidth = 1;
      Chart.defaults.plugins.tooltip.padding = 12;
      Chart.defaults.plugins.tooltip.titleFont = { weight: 'bold', family: DEFAULT_FONT };
    }
  }

  function getCanvas(canvasId) {
    if (!canvasId) return null;
    return typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
  }

  function safeChartInit(canvasId, config) {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not loaded');
      return null;
    }
    const canvas = getCanvas(canvasId);
    if (!canvas) return null;

    // Check if an existing Chart is attached to this canvas
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    return new Chart(canvas, config);
  }

  /* ── Skill Radar Chart ─────────────────────────────────────── */
  function createSkillRadar(canvasId, skills = {}) {
    const labels = Object.keys(skills).slice(0, 8);
    const data = labels.map(k => skills[k]);

    return safeChartInit(canvasId, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Your Skills',
          data,
          borderColor: COLORS.violet,
          backgroundColor: 'rgba(99, 102, 241, 0.18)',
          pointBackgroundColor: COLORS.cyan,
          pointBorderColor: 'transparent',
          pointHoverBackgroundColor: COLORS.blue,
          borderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { display: false, stepSize: 25 },
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            angleLines: { color: 'rgba(255, 255, 255, 0.06)' },
            pointLabels: { color: '#cbd5e1', font: { size: 11, weight: '600' } }
          }
        },
        plugins: { legend: { display: false } },
        animation: { duration: 1000, easing: 'easeOutQuart' }
      }
    });
  }

  /* ── Career Match Bar Chart ────────────────────────────────── */
  function createCareerMatchChart(canvasId, recommendations = []) {
    const top5 = recommendations.slice(0, 5);
    const labels = top5.map(r => r.career.name);
    const data = top5.map(r => r.totalScore);

    return safeChartInit(canvasId, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Match Score (%)',
          data,
          backgroundColor: data.map((_, i) => i === 0 ?
            'rgba(99, 102, 241, 0.85)' : 'rgba(6, 182, 212, 0.55)'
          ),
          borderColor: data.map((_, i) => i === 0 ? COLORS.violet : COLORS.cyan),
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: {
            min: 0, max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { callback: v => v + '%' }
          },
          y: { grid: { display: false }, ticks: { color: '#f8fafc', font: { weight: '600' } } }
        },
        animation: { duration: 1000 }
      }
    });
  }

  /* ── Skill Demand Trend Chart ──────────────────────────────── */
  function createSkillDemandChart(canvasId, trendData = []) {
    const sorted = [...trendData].sort((a, b) => b.growth - a.growth).slice(0, 8);

    return safeChartInit(canvasId, {
      type: 'bar',
      data: {
        labels: sorted.map(s => s.name),
        datasets: [{
          label: 'Demand Growth (%)',
          data: sorted.map(s => s.growth),
          backgroundColor: 'rgba(6, 182, 212, 0.25)',
          borderColor: COLORS.cyan,
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94a3b8', maxRotation: 45, font: { size: 11 } } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.06)' }, ticks: { callback: v => v + '%' } }
        },
        animation: { duration: 1200 }
      }
    });
  }

  /* ── Salary Range Chart ────────────────────────────────────── */
  function createSalaryChart(canvasId, salaryData = []) {
    return safeChartInit(canvasId, {
      type: 'bar',
      data: {
        labels: salaryData.map(s => s.career),
        datasets: [
          {
            label: 'Min Salary ($k)',
            data: salaryData.map(s => s.min),
            backgroundColor: 'rgba(6, 182, 212, 0.3)',
            borderColor: COLORS.cyan,
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'Avg Salary ($k)',
            data: salaryData.map(s => s.avg),
            backgroundColor: 'rgba(99, 102, 241, 0.65)',
            borderColor: COLORS.violet,
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'Max Salary ($k)',
            data: salaryData.map(s => s.max),
            backgroundColor: 'rgba(139, 92, 246, 0.35)',
            borderColor: COLORS.blue,
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { padding: 20 } } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 11 } } },
          y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { callback: v => '$' + v + 'k' } }
        },
        animation: { duration: 1200 }
      }
    });
  }

  /* ── Readiness Doughnut ────────────────────────────────────── */
  function createReadinessDoughnut(canvasId, score = 0) {
    const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

    return safeChartInit(canvasId, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [safeScore, 100 - safeScore],
          backgroundColor: ['rgba(99, 102, 241, 0.9)', 'rgba(255, 255, 255, 0.06)'],
          borderColor: ['#6366f1', 'transparent'],
          borderWidth: [2, 0],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '78%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        animation: { animateRotate: true, duration: 1500, easing: 'easeOutQuart' }
      }
    });
  }

  /* ── Career Growth Line Chart ──────────────────────────────── */
  function createCareerGrowthChart(canvasId) {
    const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];

    return safeChartInit(canvasId, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'AI Engineer',
            data: [45, 52, 61, 72, 85, 93, 100],
            borderColor: COLORS.cyan,
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            fill: true, tension: 0.4, pointRadius: 4
          },
          {
            label: 'Cybersecurity',
            data: [55, 60, 68, 75, 82, 88, 95],
            borderColor: COLORS.violet,
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true, tension: 0.4, pointRadius: 4
          },
          {
            label: 'Cloud Engineer',
            data: [40, 50, 60, 68, 76, 83, 90],
            borderColor: COLORS.blue,
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            fill: true, tension: 0.4, pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { padding: 20 } } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { callback: v => v + '%' } }
        },
        animation: { duration: 1500 }
      }
    });
  }

  return {
    createSkillRadar,
    createCareerMatchChart,
    createSkillDemandChart,
    createSalaryChart,
    createReadinessDoughnut,
    createCareerGrowthChart
  };
})();

if (typeof window !== 'undefined') window.Charts = Charts;
