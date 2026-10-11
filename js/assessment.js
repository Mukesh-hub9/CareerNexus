/* ============================================================
   CareerNexus — Assessment Engine
   Question bank, timer, scoring
   ============================================================ */

'use strict';

const Assessment = (() => {

  const QUESTION_BANK = [
    // Technical - Networking
    { id: 1, category: 'Networking', skill: 'Networking', difficulty: 'Basic',
      type: 'mcq', question: 'What does SQL stand for?',
      options: ['Structured Query Language', 'System Query Logic', 'Sequential Query Language', 'Standard Question Language'],
      correct: 0, points: 10 },
    { id: 2, category: 'Networking', skill: 'Networking', difficulty: 'Intermediate',
      type: 'mcq', question: 'Which OSI layer is responsible for routing packets across networks?',
      options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'],
      correct: 1, points: 15 },
    { id: 3, category: 'Networking', skill: 'Networking', difficulty: 'Basic',
      type: 'mcq', question: 'What protocol is used to assign IP addresses dynamically?',
      options: ['DNS', 'FTP', 'DHCP', 'HTTP'],
      correct: 2, points: 10 },
    { id: 4, category: 'Networking', skill: 'Networking', difficulty: 'Advanced',
      type: 'scenario', question: 'A company detects suspicious login attempts from multiple countries simultaneously. What should the security team investigate FIRST?',
      options: ['Block all international IPs immediately', 'Check authentication logs and identify source IPs', 'Restart the authentication servers', 'Update all user passwords'],
      correct: 1, points: 20 },

    // Technical - Python
    { id: 5, category: 'Programming', skill: 'Python', difficulty: 'Basic',
      type: 'mcq', question: 'Which Python data structure uses key-value pairs?',
      options: ['List', 'Tuple', 'Dictionary', 'Set'],
      correct: 2, points: 10 },
    { id: 6, category: 'Programming', skill: 'Python', difficulty: 'Intermediate',
      type: 'mcq', question: 'What does the "yield" keyword do in Python?',
      options: ['Returns a value and exits the function', 'Creates a generator function', 'Imports a module', 'Handles exceptions'],
      correct: 1, points: 15 },
    { id: 7, category: 'Programming', skill: 'Python', difficulty: 'Basic',
      type: 'mcq', question: 'Which of the following is NOT a Python built-in data type?',
      options: ['int', 'float', 'char', 'bool'],
      correct: 2, points: 10 },

    // Cybersecurity
    { id: 8, category: 'Cybersecurity', skill: 'Cybersecurity', difficulty: 'Basic',
      type: 'mcq', question: 'What does "phishing" refer to in cybersecurity?',
      options: ['A network scanning tool', 'A deceptive attempt to steal sensitive information', 'A type of firewall', 'A password hashing method'],
      correct: 1, points: 10 },
    { id: 9, category: 'Cybersecurity', skill: 'Cybersecurity', difficulty: 'Intermediate',
      type: 'mcq', question: 'Which protocol provides secure web browsing?',
      options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
      correct: 2, points: 15 },
    { id: 10, category: 'Cybersecurity', skill: 'Cybersecurity', difficulty: 'Advanced',
      type: 'scenario', question: 'During a penetration test, you discover an SQL injection vulnerability. What is the MOST responsible next step?',
      options: ['Exploit it to gain database access', 'Report it immediately to the client', 'Ignore it and move on', 'Delete the vulnerable database'],
      correct: 1, points: 20 },

    // AI / ML
    { id: 11, category: 'AI & ML', skill: 'Machine Learning', difficulty: 'Basic',
      type: 'mcq', question: 'Which type of learning uses labeled training data?',
      options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Transfer Learning'],
      correct: 2, points: 10 },
    { id: 12, category: 'AI & ML', skill: 'Machine Learning', difficulty: 'Intermediate',
      type: 'mcq', question: 'What is "overfitting" in machine learning?',
      options: ['When a model performs well on training data but poorly on new data', 'When training takes too long', 'When the dataset is too large', 'When accuracy exceeds 100%'],
      correct: 0, points: 15 },
    { id: 13, category: 'AI & ML', skill: 'Machine Learning', difficulty: 'Intermediate',
      type: 'mcq', question: 'Which algorithm is commonly used for classification tasks?',
      options: ['K-Means', 'Linear Regression', 'Random Forest', 'PCA'],
      correct: 2, points: 15 },

    // Cloud Computing
    { id: 14, category: 'Cloud Computing', skill: 'Cloud Computing', difficulty: 'Basic',
      type: 'mcq', question: 'What does AWS stand for?',
      options: ['Advanced Web Services', 'Amazon Web Services', 'Automated Web System', 'Azure Web Services'],
      correct: 1, points: 10 },
    { id: 15, category: 'Cloud Computing', skill: 'Cloud Computing', difficulty: 'Intermediate',
      type: 'mcq', question: 'Which cloud service model provides infrastructure like VMs and storage?',
      options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
      correct: 2, points: 15 },

    // Databases
    { id: 16, category: 'Database', skill: 'SQL', difficulty: 'Basic',
      type: 'mcq', question: 'Which SQL command is used to retrieve data from a table?',
      options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
      correct: 2, points: 10 },
    { id: 17, category: 'Database', skill: 'SQL', difficulty: 'Intermediate',
      type: 'mcq', question: 'What is a PRIMARY KEY in a database?',
      options: ['The first column in a table', 'A unique identifier for each record', 'A foreign reference to another table', 'An index on multiple columns'],
      correct: 1, points: 15 },

    // Soft Skills - Self Assessment
    { id: 18, category: 'Soft Skills', skill: 'Communication', difficulty: 'Basic',
      type: 'self', question: 'Rate your Communication skills',
      options: ['Beginner (1-2)', 'Basic (3)', 'Intermediate (4)', 'Advanced (5)', 'Expert (6+)'],
      correct: -1, points: 0, selfAssess: true },
    { id: 19, category: 'Soft Skills', skill: 'Leadership', difficulty: 'Basic',
      type: 'self', question: 'Rate your Leadership skills',
      options: ['Beginner (1-2)', 'Basic (3)', 'Intermediate (4)', 'Advanced (5)', 'Expert (6+)'],
      correct: -1, points: 0, selfAssess: true },
    { id: 20, category: 'Soft Skills', skill: 'Problem Solving', difficulty: 'Basic',
      type: 'self', question: 'Rate your Problem Solving ability',
      options: ['Beginner (1-2)', 'Basic (3)', 'Intermediate (4)', 'Advanced (5)', 'Expert (6+)'],
      correct: -1, points: 0, selfAssess: true }
  ];

  const ASSESSMENT_SETS = {
    'Technical Fundamentals': { questionIds: [1, 5, 8, 14, 16], duration: 300, description: 'Core technical knowledge across key domains' },
    'Programming & AI': { questionIds: [5, 6, 7, 11, 12, 13], duration: 360, description: 'Programming fundamentals and AI/ML concepts' },
    'Cybersecurity': { questionIds: [2, 3, 4, 8, 9, 10], duration: 360, description: 'Network security and cybersecurity concepts' },
    'Cloud & DevOps': { questionIds: [14, 15, 1, 2, 16], duration: 300, description: 'Cloud computing and infrastructure' },
    'Soft Skills': { questionIds: [18, 19, 20], duration: 120, description: 'Communication, leadership, and soft skills self-assessment' }
  };

  let state = {
    currentSet: null,
    questions: [],
    currentIndex: 0,
    answers: {},
    timer: null,
    timeLeft: 0,
    started: false,
    finished: false
  };

  /* ── Init Assessment Page ──────────────────────────────────── */
  function initPage() {
    if (!App.requireAuth()) return;
    renderCategories();
  }

  function renderCategories() {
    const grid = document.getElementById('assessment-categories');
    if (!grid) return;
    const icons = { 'Technical Fundamentals': '💡', 'Programming & AI': '🤖', 'Cybersecurity': '🛡️', 'Cloud & DevOps': '☁️', 'Soft Skills': '🧠' };
    grid.innerHTML = Object.entries(ASSESSMENT_SETS).map(([name, set]) => `
      <div class="category-card hover-lift" onclick="Assessment.startAssessment('${name}')">
        <div class="card-icon" style="font-size:2.5rem;margin-bottom:12px">${icons[name] || '📝'}</div>
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:6px">${name}</h3>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:12px">${set.description}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          <span class="badge badge-blue">${set.questionIds.length} Questions</span>
          <span class="badge badge-violet">${Math.floor(set.duration / 60)} min</span>
        </div>
      </div>
    `).join('');
  }

  function startAssessment(setName) {
    const set = ASSESSMENT_SETS[setName];
    if (!set) return;
    state.currentSet = setName;
    state.questions = set.questionIds.map(id => QUESTION_BANK.find(q => q.id === id)).filter(Boolean);
    state.currentIndex = 0;
    state.answers = {};
    state.timeLeft = set.duration;
    state.started = true;
    state.finished = false;

    document.getElementById('category-section')?.classList.add('hidden');
    document.getElementById('question-section')?.classList.remove('hidden');
    renderQuestion();
    startTimer();
  }

  function renderQuestion() {
    const q = state.questions[state.currentIndex];
    if (!q) return;

    const section = document.getElementById('question-section');
    const total = state.questions.length;
    const current = state.currentIndex + 1;

    document.getElementById('q-number').textContent = `Question ${current} of ${total}`;
    document.getElementById('q-text').textContent = q.question;
    document.getElementById('q-category').textContent = q.category;
    document.getElementById('q-difficulty').textContent = q.difficulty;

    // Progress
    const bar = document.getElementById('q-progress');
    if (bar) bar.style.width = `${(current / total) * 100}%`;

    // Options
    const optGrid = document.getElementById('q-options');
    if (optGrid) {
      const letters = ['A', 'B', 'C', 'D', 'E'];
      optGrid.innerHTML = q.options.map((opt, i) => `
        <div class="option-item" onclick="Assessment.selectOption(${i})" id="opt-${i}">
          <span class="option-letter">${letters[i]}</span>
          <span>${opt}</span>
        </div>
      `).join('');
    }

    // Badge type
    const typeBadge = document.getElementById('q-type-badge');
    if (typeBadge) {
      const typeNames = { mcq: 'Multiple Choice', scenario: 'Scenario-Based', self: 'Self Assessment' };
      typeBadge.textContent = typeNames[q.type] || 'Question';
    }

    // Navigation buttons
    document.getElementById('prev-btn')?.setAttribute('disabled', state.currentIndex === 0 ? 'true' : '');
    document.getElementById('next-btn')?.querySelector('span') && (
      document.getElementById('next-btn').querySelector('span').textContent =
        state.currentIndex === state.questions.length - 1 ? 'Finish' : 'Next →'
    );
  }

  function selectOption(index) {
    const q = state.questions[state.currentIndex];
    state.answers[q.id] = index;

    document.querySelectorAll('.option-item').forEach((el, i) => {
      el.classList.toggle('selected', i === index);
      el.querySelector('.option-letter').style.background = i === index ? 'var(--accent-blue)' : '';
      el.querySelector('.option-letter').style.color = i === index ? 'white' : '';
    });
  }

  function nextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex++;
      renderQuestion();
      // Re-select if already answered
      const q = state.questions[state.currentIndex];
      if (state.answers[q.id] !== undefined) selectOption(state.answers[q.id]);
    } else {
      finishAssessment();
    }
  }

  function prevQuestion() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
      const q = state.questions[state.currentIndex];
      if (state.answers[q.id] !== undefined) selectOption(state.answers[q.id]);
    }
  }

  function startTimer() {
    const timerEl = document.getElementById('timer-value');
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      state.timeLeft--;
      if (timerEl) {
        const mins = Math.floor(state.timeLeft / 60);
        const secs = state.timeLeft % 60;
        timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        const ring = document.querySelector('.timer-ring');
        if (ring) {
          ring.classList.toggle('urgent', state.timeLeft < 30);
          ring.classList.toggle('warning', state.timeLeft >= 30 && state.timeLeft < 60);
        }
      }
      if (state.timeLeft <= 0) { clearInterval(state.timer); finishAssessment(); }
    }, 1000);
  }

  function finishAssessment() {
    clearInterval(state.timer);
    state.finished = true;

    // Calculate scores
    const results = {};
    state.questions.forEach(q => {
      if (!q.selfAssess) {
        const answered = state.answers[q.id];
        const correct = answered === q.correct;
        if (!results[q.skill]) results[q.skill] = { correct: 0, total: 0, points: 0, maxPoints: 0 };
        results[q.skill].total++;
        results[q.skill].maxPoints += q.points;
        if (correct) { results[q.skill].correct++; results[q.skill].points += q.points; }
      } else {
        // Self-assessment: map choice to score
        const choice = state.answers[q.id] ?? 2;
        const scores = [20, 40, 60, 80, 95];
        if (!results[q.skill]) results[q.skill] = { selfScore: 0, total: 1, self: true };
        results[q.skill].selfScore = scores[choice] || 60;
      }
    });

    // Build skill scores
    const skillScores = {};
    Object.entries(results).forEach(([skill, data]) => {
      if (data.self) {
        skillScores[skill] = data.selfScore;
      } else {
        skillScores[skill] = Math.round((data.points / data.maxPoints) * 100);
      }
    });

    const count = Object.keys(skillScores).length;
    const avgScore = count > 0 ? (Object.values(skillScores).reduce((a, b) => a + b, 0) / count) : 0;

    // Save to profile
    const st = App.getState();
    const existingSkills = (st.profile && st.profile.skills) ? st.profile.skills : {};
    const updatedSkills = { ...existingSkills, ...skillScores };
    App.saveState({
      profile: { skills: updatedSkills, assessmentScore: Math.round(avgScore) },
      assessmentDone: true
    });

    // Show results
    document.getElementById('question-section')?.classList.add('hidden');
    renderResults(skillScores, Math.round(avgScore));
  }

  function renderResults(skillScores, avgScore) {
    const section = document.getElementById('results-section');
    if (!section) return;
    section.classList.remove('hidden');

    document.getElementById('result-score').textContent = avgScore + '%';
    document.getElementById('result-level').textContent = AIEngine.getSkillLevel(avgScore);

    const skillsEl = document.getElementById('results-skills');
    if (skillsEl) {
      skillsEl.innerHTML = Object.entries(skillScores).map(([skill, score]) => `
        <div class="skill-row">
          <div class="skill-row-header">
            <span class="skill-name">${skill}</span>
            <span class="skill-percent" style="color:${AIEngine.getSkillColor(score)}">${score}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" data-width="${score}" style="width:0%;background:${AIEngine.getSkillColor(score)}"></div>
          </div>
        </div>
      `).join('');
      setTimeout(() => App.animateProgressBars(), 100);
    }
  }

  return { initPage, startAssessment, selectOption, nextQuestion, prevQuestion, finishAssessment };
})();

if (typeof window !== 'undefined') window.Assessment = Assessment;
