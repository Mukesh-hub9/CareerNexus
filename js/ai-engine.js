/* ============================================================
   CareerNexus — AI Engine (Simulated)
   Career scoring, gap analysis, roadmap generation
   ============================================================ */

'use strict';

const AIEngine = (() => {

  /* ── Career Database ───────────────────────────────────────── */
  const CAREERS = [
    {
      id: 'cybersecurity-analyst',
      name: 'Cybersecurity Analyst',
      emoji: '🛡️',
      industry: 'Information Security',
      salary: '$75,000 – $120,000',
      demand: 92,
      growth: '+33%',
      description: 'Protect organizations from cyber threats by monitoring networks, analyzing security incidents, and implementing security measures.',
      requiredSkills: ['Networking', 'Linux', 'Python', 'SIEM', 'Incident Response', 'Threat Analysis', 'Ethical Hacking', 'Cybersecurity'],
      coreSkills: ['Networking', 'Linux', 'Cybersecurity'],
      domains: ['Cybersecurity', 'Networking'],
      certifications: [
        { name: 'CompTIA Security+', level: 'Beginner', why: 'Industry standard entry-level cert' },
        { name: 'Certified Ethical Hacker (CEH)', level: 'Intermediate', why: 'Validates penetration testing skills' },
        { name: 'CISSP', level: 'Advanced', why: 'Premier advanced security certification' }
      ],
      roadmap: [
        { phase: 'Foundation', duration: '1 Month', tasks: ['Networking Basics', 'Linux Fundamentals', 'Python Basics', 'Cybersecurity Fundamentals'] },
        { phase: 'Intermediate', duration: '2 Months', tasks: ['Ethical Hacking', 'Web Security', 'Network Security', 'Digital Forensics'] },
        { phase: 'Advanced', duration: '2 Months', tasks: ['SIEM Tools', 'Incident Response', 'Threat Hunting', 'Malware Analysis'] },
        { phase: 'Career Ready', duration: '1 Month', tasks: ['Build Projects', 'GitHub Portfolio', 'CompTIA Security+ Prep', 'Apply for Internships'] }
      ]
    },
    {
      id: 'ai-engineer',
      name: 'AI / ML Engineer',
      emoji: '🤖',
      industry: 'Artificial Intelligence',
      salary: '$90,000 – $160,000',
      demand: 97,
      growth: '+40%',
      description: 'Design and deploy machine learning models and AI systems that power intelligent applications.',
      requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Data Science', 'Statistics', 'Cloud Computing'],
      coreSkills: ['Python', 'Machine Learning', 'Data Science'],
      domains: ['Artificial Intelligence', 'Data Science'],
      certifications: [
        { name: 'Google ML Crash Course', level: 'Beginner', why: 'Best free intro to ML by Google' },
        { name: 'TensorFlow Developer Certificate', level: 'Intermediate', why: 'Validates real ML implementation skills' },
        { name: 'AWS ML Specialty', level: 'Advanced', why: 'Cloud-based ML at scale' }
      ],
      roadmap: [
        { phase: 'Foundation', duration: '1 Month', tasks: ['Python Advanced', 'Statistics & Math', 'Data Analysis with Pandas', 'NumPy & Matplotlib'] },
        { phase: 'Intermediate', duration: '2 Months', tasks: ['Machine Learning Algorithms', 'Scikit-learn', 'Feature Engineering', 'Model Evaluation'] },
        { phase: 'Advanced', duration: '2 Months', tasks: ['Deep Learning', 'TensorFlow / PyTorch', 'NLP Fundamentals', 'Computer Vision'] },
        { phase: 'Career Ready', duration: '1 Month', tasks: ['Kaggle Competitions', 'ML Projects Portfolio', 'Cloud Deployment', 'Research Papers'] }
      ]
    },
    {
      id: 'cloud-engineer',
      name: 'Cloud Engineer',
      emoji: '☁️',
      industry: 'Cloud Computing',
      salary: '$85,000 – $140,000',
      demand: 88,
      growth: '+28%',
      description: 'Design, build, and manage cloud infrastructure on AWS, Azure, or GCP.',
      requiredSkills: ['AWS', 'Azure', 'Linux', 'Docker', 'Kubernetes', 'Terraform', 'Networking', 'Python'],
      coreSkills: ['Linux', 'Networking', 'Python'],
      domains: ['Cloud Computing', 'DevOps'],
      certifications: [
        { name: 'AWS Cloud Practitioner', level: 'Beginner', why: 'Entry point to AWS ecosystem' },
        { name: 'AWS Solutions Architect Associate', level: 'Intermediate', why: 'Most in-demand cloud cert' },
        { name: 'CKA (Kubernetes Administrator)', level: 'Advanced', why: 'Container orchestration expertise' }
      ],
      roadmap: [
        { phase: 'Foundation', duration: '1 Month', tasks: ['Linux Administration', 'Networking Basics', 'Cloud Concepts', 'AWS Console Basics'] },
        { phase: 'Intermediate', duration: '2 Months', tasks: ['AWS Core Services', 'Docker & Containers', 'Infrastructure as Code', 'Monitoring & Logging'] },
        { phase: 'Advanced', duration: '2 Months', tasks: ['Kubernetes', 'CI/CD Pipelines', 'Cloud Security', 'Multi-cloud Architecture'] },
        { phase: 'Career Ready', duration: '1 Month', tasks: ['AWS SAA Certification', 'Cloud Projects', 'Cost Optimization', 'Interview Prep'] }
      ]
    },
    {
      id: 'data-scientist',
      name: 'Data Scientist',
      emoji: '📊',
      industry: 'Data Analytics',
      salary: '$80,000 – $145,000',
      demand: 85,
      growth: '+25%',
      description: 'Extract insights from complex datasets using statistical analysis, machine learning, and visualization.',
      requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Pandas', 'Tableau'],
      coreSkills: ['Python', 'SQL', 'Statistics'],
      domains: ['Data Science', 'Artificial Intelligence'],
      certifications: [
        { name: 'IBM Data Science Certificate', level: 'Beginner', why: 'Comprehensive data science fundamentals' },
        { name: 'Tableau Desktop Specialist', level: 'Intermediate', why: 'Industry-standard visualization tool' },
        { name: 'Google Professional Data Engineer', level: 'Advanced', why: 'Production-scale data pipelines' }
      ],
      roadmap: [
        { phase: 'Foundation', duration: '1 Month', tasks: ['Python for Data Science', 'SQL Fundamentals', 'Statistics Basics', 'Excel & Sheets'] },
        { phase: 'Intermediate', duration: '2 Months', tasks: ['Pandas & NumPy', 'Data Visualization', 'Machine Learning Basics', 'Exploratory Data Analysis'] },
        { phase: 'Advanced', duration: '2 Months', tasks: ['Advanced ML Models', 'Big Data Tools', 'A/B Testing', 'Business Analytics'] },
        { phase: 'Career Ready', duration: '1 Month', tasks: ['Capstone Projects', 'Kaggle Profile', 'SQL Interviews', 'Portfolio Dashboard'] }
      ]
    },
    {
      id: 'full-stack-developer',
      name: 'Full Stack Developer',
      emoji: '💻',
      industry: 'Software Development',
      salary: '$70,000 – $130,000',
      demand: 82,
      growth: '+22%',
      description: 'Build complete web applications handling both frontend interfaces and backend APIs.',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'REST APIs', 'Git', 'CSS'],
      coreSkills: ['JavaScript', 'HTML/CSS', 'SQL'],
      domains: ['Software Development', 'Web Development'],
      certifications: [
        { name: 'Meta Frontend Developer', level: 'Beginner', why: 'Structured React & JS fundamentals' },
        { name: 'AWS Certified Developer', level: 'Intermediate', why: 'Cloud deployment for apps' },
        { name: 'Google Cloud Professional Developer', level: 'Advanced', why: 'Scalable cloud-native development' }
      ],
      roadmap: [
        { phase: 'Foundation', duration: '1 Month', tasks: ['HTML & CSS Mastery', 'JavaScript Fundamentals', 'Git & GitHub', 'Responsive Design'] },
        { phase: 'Intermediate', duration: '2 Months', tasks: ['React.js', 'Node.js & Express', 'Database Design', 'REST API Development'] },
        { phase: 'Advanced', duration: '2 Months', tasks: ['TypeScript', 'Next.js', 'Docker & Deployment', 'Performance Optimization'] },
        { phase: 'Career Ready', duration: '1 Month', tasks: ['Full Stack Projects', 'Open Source Contributions', 'System Design', 'Technical Interviews'] }
      ]
    },
    {
      id: 'devops-engineer',
      name: 'DevOps Engineer',
      emoji: '⚙️',
      industry: 'DevOps & Automation',
      salary: '$85,000 – $145,000',
      demand: 78,
      growth: '+20%',
      description: 'Bridge development and operations by automating infrastructure, CI/CD pipelines, and deployment workflows.',
      requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Python', 'Bash', 'Git', 'Monitoring'],
      coreSkills: ['Linux', 'Python', 'Git'],
      domains: ['DevOps', 'Cloud Computing'],
      certifications: [
        { name: 'Linux Foundation Certified SysAdmin', level: 'Beginner', why: 'Linux skills are essential for DevOps' },
        { name: 'Docker Certified Associate', level: 'Intermediate', why: 'Containerization expertise' },
        { name: 'CKA', level: 'Advanced', why: 'Kubernetes is the industry standard' }
      ],
      roadmap: [
        { phase: 'Foundation', duration: '1 Month', tasks: ['Linux Mastery', 'Bash Scripting', 'Git Advanced', 'Networking Concepts'] },
        { phase: 'Intermediate', duration: '2 Months', tasks: ['Docker', 'CI/CD with Jenkins/GitHub Actions', 'Infrastructure as Code', 'Monitoring with Prometheus'] },
        { phase: 'Advanced', duration: '2 Months', tasks: ['Kubernetes', 'Helm Charts', 'Service Mesh', 'Security Hardening'] },
        { phase: 'Career Ready', duration: '1 Month', tasks: ['DevOps Projects', 'Cloud Certifications', 'GitOps Practices', 'Interview Prep'] }
      ]
    },
    {
      id: 'network-engineer',
      name: 'Network Engineer',
      emoji: '🌐',
      industry: 'Networking & Infrastructure',
      salary: '$65,000 – $110,000',
      demand: 72,
      growth: '+15%',
      description: 'Design, implement, and manage computer networks including LANs, WANs, and wireless systems.',
      requiredSkills: ['Networking', 'Cisco', 'Routing & Switching', 'Firewall', 'VPN', 'Linux', 'CCNA', 'Troubleshooting'],
      coreSkills: ['Networking', 'Linux'],
      domains: ['Networking', 'Cybersecurity'],
      certifications: [
        { name: 'CompTIA Network+', level: 'Beginner', why: 'Vendor-neutral networking foundation' },
        { name: 'CCNA', level: 'Intermediate', why: 'Most recognized networking certification' },
        { name: 'CCNP', level: 'Advanced', why: 'Professional-level Cisco expertise' }
      ],
      roadmap: [
        { phase: 'Foundation', duration: '1 Month', tasks: ['OSI Model', 'TCP/IP Protocols', 'Subnetting', 'Network Hardware'] },
        { phase: 'Intermediate', duration: '2 Months', tasks: ['Routing & Switching', 'VLANs & Trunking', 'Network Security', 'Wireless Networking'] },
        { phase: 'Advanced', duration: '2 Months', tasks: ['BGP & OSPF', 'SD-WAN', 'Network Automation', 'Cloud Networking'] },
        { phase: 'Career Ready', duration: '1 Month', tasks: ['CCNA Certification', 'Lab Projects', 'Network Design', 'Job Applications'] }
      ]
    },
    {
      id: 'mobile-developer',
      name: 'Mobile App Developer',
      emoji: '📱',
      industry: 'Mobile Development',
      salary: '$75,000 – $125,000',
      demand: 76,
      growth: '+18%',
      description: 'Create iOS and Android applications using native or cross-platform frameworks like Flutter and React Native.',
      requiredSkills: ['Flutter', 'Dart', 'React Native', 'JavaScript', 'Swift', 'Kotlin', 'REST APIs', 'UI/UX'],
      coreSkills: ['JavaScript', 'Python'],
      domains: ['Software Development', 'Mobile Development'],
      certifications: [
        { name: 'Google Associate Android Developer', level: 'Beginner', why: 'Android development fundamentals' },
        { name: 'Flutter Developer Certification', level: 'Intermediate', why: 'Cross-platform mobile development' },
        { name: 'Apple Developer Certification', level: 'Advanced', why: 'iOS ecosystem expertise' }
      ],
      roadmap: [
        { phase: 'Foundation', duration: '1 Month', tasks: ['Programming Basics', 'UI/UX Principles', 'Git & Version Control', 'Mobile Design Patterns'] },
        { phase: 'Intermediate', duration: '2 Months', tasks: ['Flutter / Dart', 'State Management', 'REST API Integration', 'Firebase'] },
        { phase: 'Advanced', duration: '2 Months', tasks: ['Native Performance', 'App Store Deployment', 'Testing & CI/CD', 'Advanced Animations'] },
        { phase: 'Career Ready', duration: '1 Month', tasks: ['Published Apps', 'Play Store Portfolio', 'Freelance Projects', 'Interview Prep'] }
      ]
    }
  ];

  const ALL_SKILLS = [
    'Python', 'JavaScript', 'Java', 'C++', 'C#', 'R', 'Go', 'Rust', 'TypeScript',
    'Networking', 'Linux', 'Cybersecurity', 'SIEM', 'Incident Response', 'Threat Analysis', 'Ethical Hacking',
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision',
    'Data Science', 'Statistics', 'SQL', 'Data Visualization', 'Tableau', 'Pandas', 'NumPy',
    'React', 'Node.js', 'Vue.js', 'Angular', 'CSS', 'HTML', 'REST APIs',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD',
    'Git', 'Bash', 'DevOps', 'Monitoring', 'Cloud Computing',
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Critical Thinking',
    'Project Management', 'Time Management', 'Presentation'
  ];

  const DOMAIN_CAREER_MAP = {
    'Cybersecurity': ['cybersecurity-analyst', 'network-engineer', 'cloud-engineer'],
    'Artificial Intelligence': ['ai-engineer', 'data-scientist'],
    'Data Science': ['data-scientist', 'ai-engineer'],
    'Cloud Computing': ['cloud-engineer', 'devops-engineer', 'cybersecurity-analyst'],
    'Networking': ['network-engineer', 'cybersecurity-analyst'],
    'Software Development': ['full-stack-developer', 'mobile-developer'],
    'DevOps': ['devops-engineer', 'cloud-engineer'],
    'Web Development': ['full-stack-developer'],
    'Mobile Development': ['mobile-developer', 'full-stack-developer'],
    'UI/UX Design': ['full-stack-developer', 'mobile-developer']
  };

  /* ── Career Matching Algorithm ─────────────────────────────── */
  function calculateCareerScore(career, profile = {}) {
    if (!career) return { career: { name: 'Unknown', emoji: '💼', industry: 'General', coreSkills: [], requiredSkills: [], demand: 50 }, totalScore: 50, breakdown: {}, matchedSkills: [], gapSkills: [] };
    const safeProfile = profile || {};
    const { interests = [], skills = {}, academicScore = 75, assessmentScore = 70, careerGoals = [] } = safeProfile;

    // Interest score (30%)
    let interestScore = 0;
    (career.domains || []).forEach(domain => {
      if (interests.includes(domain)) interestScore += 50;
    });
    if (careerGoals.includes(career.name) || careerGoals.some(g => career.name.toLowerCase().includes(String(g).toLowerCase()))) {
      interestScore += 50;
    }
    interestScore = Math.min(100, interestScore);

    // Skill match score (35%)
    const studentSkillKeys = Object.keys(skills || {}).map(s => s.toLowerCase());
    const required = career.requiredSkills || [];
    const matched = required.filter(s =>
      studentSkillKeys.some(ss => ss.includes(s.toLowerCase()) || s.toLowerCase().includes(ss))
    );
    const skillScore = required.length ? Math.round((matched.length / required.length) * 100) : 50;

    // Academic score (15%)
    const acadScore = Math.min(100, Math.max(0, Number(academicScore) || 75));

    // Assessment score (10%)
    const assScore = Math.min(100, Math.max(0, Number(assessmentScore) || 70));

    // Industry demand (10%)
    const demandScore = career.demand || 75;

    // Final weighted score
    const finalScore = Math.round(
      interestScore * 0.30 +
      skillScore    * 0.35 +
      acadScore     * 0.15 +
      assScore      * 0.10 +
      demandScore   * 0.10
    );

    return {
      career,
      totalScore: Math.min(98, Math.max(30, finalScore)),
      breakdown: { interestScore, skillScore, acadScore, assScore, demandScore },
      matchedSkills: matched,
      gapSkills: required.filter(s =>
        !studentSkillKeys.some(ss => ss.includes(s.toLowerCase()) || s.toLowerCase().includes(ss))
      )
    };
  }

  function getRecommendations(profile = {}) {
    const safeProfile = profile || {};
    const results = CAREERS.map(career => calculateCareerScore(career, safeProfile));
    results.sort((a, b) => b.totalScore - a.totalScore);
    return results.map(r => ({ ...r, totalScore: Math.round(r.totalScore) }));
  }

  /* ── Skill Gap Analysis ────────────────────────────────────── */
  function analyzeSkillGap(careerResult) {
    const { career, matchedSkills, gapSkills } = careerResult;
    const priorities = gapSkills.map((skill, i) => ({
      skill,
      priority: i + 1,
      importance: i < 2 ? 'Critical' : i < 4 ? 'High' : 'Medium',
      estimatedTime: `${Math.floor(Math.random() * 3) + 2} weeks`
    }));
    return { have: matchedSkills, missing: gapSkills, priorities };
  }

  /* ── Roadmap Generator ─────────────────────────────────────── */
  function generateRoadmap(career, studentSkills = {}) {
    const roadmap = career.roadmap.map((phase, phaseIdx) => ({
      ...phase,
      phaseNumber: phaseIdx + 1,
      tasks: phase.tasks.map((task, taskIdx) => {
        const studentSkillKeys = Object.keys(studentSkills).map(s => s.toLowerCase());
        const isDone = studentSkillKeys.some(s => task.toLowerCase().includes(s) || s.includes(task.toLowerCase().split(' ')[0]));
        const status = isDone ? 'done' : (phaseIdx === 0 && taskIdx === 0 ? 'inprogress' : 'locked');
        return { name: task, status, id: `task-${phaseIdx}-${taskIdx}` };
      })
    }));

    // Unlock first phase tasks
    roadmap[0].tasks.forEach((t, i) => {
      if (t.status === 'locked' && i > 0) {
        const prev = roadmap[0].tasks[i - 1];
        if (prev.status === 'done') t.status = 'inprogress';
      }
    });

    const allTasks = roadmap.flatMap(p => p.tasks);
    const doneTasks = allTasks.filter(t => t.status === 'done').length;
    const progress = Math.round((doneTasks / allTasks.length) * 100);

    return { roadmap, progress, totalTasks: allTasks.length, doneTasks };
  }

  /* ── Chatbot Responses ─────────────────────────────────────── */
  const CHATBOT_RESPONSES = {
    greetings: [
      "Hi! I'm your AI career guide. Ask me about career paths, skills to learn, or your roadmap! 🚀",
      "Hello! Ready to help you navigate your career journey. What would you like to know? 🧠"
    ],
    nextSkill: [
      "Based on your profile, I recommend learning **{skill}** next — it's a top priority gap for your target career!",
      "Your highest-priority skill gap is **{skill}**. This will significantly boost your career match score!"
    ],
    roadmapTime: [
      "Based on your current level and {hours} hours per week, your estimated completion time is **{months} months**. You're making great progress! 📅",
      "At your current pace, you'll complete the roadmap in approximately **{months} months**. Stay consistent! ⏱"
    ],
    careerAdvice: [
      "For {career}, the most critical skills are: {skills}. Focus on these to stand out! 🎯",
      "{career} has {growth} job growth — it's an excellent choice with strong market demand! 📈"
    ],
    certifications: [
      "For your career goal, I recommend starting with **{cert}** — {why}.",
      "The **{cert}** certification will significantly strengthen your profile!"
    ],
    default: [
      "Great question! Focus on building your foundational skills first, then move to advanced topics. Your personalized roadmap shows the optimal learning path. 📚",
      "I'd suggest checking your Skill Gap Analysis page for detailed recommendations tailored to your profile! 🔍",
      "Based on current industry trends, combining technical skills with soft skills like communication will make you highly competitive. 💡"
    ]
  };

  function getChatResponse(message = '', profile = {}) {
    const msg = String(message || '').toLowerCase();
    const safeProfile = profile || {};
    const recommendations = getRecommendations(safeProfile);
    const topCareer = recommendations[0];

    if (msg.includes('next skill') || msg.includes('should i learn') || msg.includes('what skill')) {
      const skill = topCareer?.gapSkills?.[0] || 'Python';
      return CHATBOT_RESPONSES.nextSkill[0].replace('{skill}', skill);
    }
    if (msg.includes('how long') || msg.includes('roadmap') || msg.includes('time')) {
      const hours = Number(safeProfile.weeklyHours) || 10;
      const months = hours >= 20 ? 3 : hours >= 10 ? 5 : 7;
      return CHATBOT_RESPONSES.roadmapTime[0].replace('{hours}', hours).replace('{months}', months);
    }
    if (msg.includes('career') || msg.includes('job') || msg.includes('role')) {
      if (topCareer && topCareer.career) {
        return CHATBOT_RESPONSES.careerAdvice[0]
          .replace('{career}', topCareer.career.name)
          .replace('{skills}', (topCareer.career.coreSkills || []).slice(0,3).join(', '));
      }
    }
    if (msg.includes('certif')) {
      const cert = topCareer?.career?.certifications?.[0];
      if (cert) return CHATBOT_RESPONSES.certifications[0].replace('{cert}', cert.name).replace('{why}', cert.why);
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return CHATBOT_RESPONSES.greetings[0];
    }
    const defaults = CHATBOT_RESPONSES.default;
    return defaults[Math.floor(Math.random() * defaults.length)];
  }

  /* ── Industry Trends Data ──────────────────────────────────── */
  const INDUSTRY_TRENDS = {
    trendingCareers: [
      { name: 'AI Engineer', growth: 40, demand: 97 },
      { name: 'Cybersecurity Analyst', growth: 33, demand: 92 },
      { name: 'Cloud Engineer', growth: 28, demand: 88 },
      { name: 'Data Scientist', growth: 25, demand: 85 },
      { name: 'DevOps Engineer', growth: 20, demand: 78 },
      { name: 'Full Stack Developer', growth: 22, demand: 82 },
      { name: 'Blockchain Developer', growth: 18, demand: 70 },
      { name: 'ML Ops Engineer', growth: 35, demand: 89 }
    ],
    trendingSkills: [
      { name: 'Artificial Intelligence', growth: 92 },
      { name: 'Cloud Computing', growth: 88 },
      { name: 'Cybersecurity', growth: 85 },
      { name: 'Data Analytics', growth: 80 },
      { name: 'DevOps', growth: 75 },
      { name: 'Kubernetes', growth: 70 },
      { name: 'Machine Learning', growth: 87 },
      { name: 'React / Next.js', growth: 65 }
    ],
    salaryRanges: [
      { career: 'AI Engineer', min: 90, max: 160, avg: 125 },
      { career: 'Cybersecurity', min: 75, max: 120, avg: 97 },
      { career: 'Cloud Engineer', min: 85, max: 140, avg: 112 },
      { career: 'Data Scientist', min: 80, max: 145, avg: 110 },
      { career: 'DevOps', min: 85, max: 145, avg: 108 },
      { career: 'Full Stack', min: 70, max: 130, avg: 95 }
    ]
  };

  /* ── Public API ────────────────────────────────────────────── */
  return {
    CAREERS,
    ALL_SKILLS,
    INDUSTRY_TRENDS,
    getRecommendations,
    analyzeSkillGap,
    generateRoadmap,
    getChatResponse,

    getSkillLevel(score) {
      const s = Number(score) || 0;
      if (s >= 86) return 'Expert';
      if (s >= 71) return 'Advanced';
      if (s >= 51) return 'Intermediate';
      if (s >= 31) return 'Basic';
      return 'Beginner';
    },

    getSkillColor(score) {
      const s = Number(score) || 0;
      if (s >= 86) return '#10b981'; // emerald green
      if (s >= 71) return '#3b82f6'; // azure blue
      if (s >= 51) return '#6366f1'; // electric indigo
      if (s >= 31) return '#f59e0b'; // amber
      return '#f43f5e'; // modern rose red
    },

    calculateReadinessScore(profile = {}) {
      const safeProfile = profile || {};
      const skills = safeProfile.skills || {};
      const skillValues = Object.values(skills);
      const avgSkill = skillValues.length ? Math.round(skillValues.reduce((a, b) => a + Number(b || 0), 0) / skillValues.length) : 50;
      const academic = Number(safeProfile.academicScore) || 75;
      const assessment = Number(safeProfile.assessmentScore) || 70;
      const certs = Math.min(100, (safeProfile.certifications?.length || 0) * 20);
      const projects = Math.min(100, (safeProfile.projects?.length || 0) * 25);
      return {
        total: Math.round(avgSkill * 0.35 + academic * 0.20 + assessment * 0.20 + certs * 0.10 + projects * 0.15),
        breakdown: { skills: avgSkill, academic, assessment, certifications: certs, projects }
      };
    }
  };
})();

// Export for use in other modules
if (typeof window !== 'undefined') window.AIEngine = AIEngine;
