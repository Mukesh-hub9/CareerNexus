# 🧬 CareerNexus — AI Career Intelligence Platform

<p align="center">
  <img src="assets/logo.jpg" alt="CareerNexus Logo" width="90" style="border-radius: 18px;" />
</p>

<p align="center">
  <strong>An intelligent, data-driven career planning ecosystem for the next generation of builders.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Stack-Vanilla%20HTML%20%7C%20CSS%20%7C%20JS-blue?style=for-the-badge" alt="Stack" />
  <img src="https://img.shields.io/badge/Visuals-Obsidian%20Glass-6366f1?style=for-the-badge" alt="Design" />
  <img src="https://img.shields.io/badge/Charts-Chart.js%20v4-06b6d4?style=for-the-badge" alt="Chart.js" />
</p>

---

## 🌟 Overview

**CareerNexus** is an AI-powered career planning and intelligence platform designed to bridge the gap between academic education and industry requirements. By combining personalized skill assessment, deep Career DNA profiling, real-time market trends, and adaptive learning roadmaps, CareerNexus provides students and job seekers with a clear, guided trajectory into modern technology roles.

---

## ✨ Key Features

### 🧬 1. Career DNA Profiler
- **Multi-Dimensional Analysis:** Measures 8 core dimensions (Technical, Problem Solving, Analytical, Creativity, Communication, Leadership, Adaptability, and Learning Agility).
- **Archetype Identification:** Automatically classifies users into archetypes (e.g., *Analytical Technology Builder*).
- **Radar Visualization:** Interactive radar chart comparing individual scores against industry standards.

### 🎯 2. Career Explorer & Match Engine
- **Intelligent Ranking:** Real-time alignment algorithm matching user profiles with curated high-growth tech roles.
- **Skill Gap Analysis:** Highlights exact skills you possess (*Have*) versus prerequisite skills required (*Missing*).
- **Certifications & Internships:** Curated certifications (Foundational, Intermediate, Advanced) and real-world internship listings.

### 🗺️ 3. Adaptive Learning Roadmaps
- **Dynamic Phase Progression:** Phase-by-phase curriculum (Phase 1 to Phase 4) tailored to your target career.
- **Interactive Checklists:** Click to mark tasks as `In Progress` or `Completed` with automatic state persistence.
- **Target Career Switcher:** Instantly toggle between different career paths with 1 click.
- **Digital Twin Projections:** AI prediction timeline forecasting internship and entry-level career readiness based on weekly study hours.

### 🧠 4. Skill Assessment & Baseline Tests
- **Category Assessments:** Modules for *Technical Fundamentals*, *Programming & AI*, *Cybersecurity*, *Cloud & DevOps*, and *Soft Skills*.
- **Interactive Exam Mode:** Live countdown timer with urgent visual rings and instantaneous score compilation.
- **Self-Assessment Matrix:** Star-rating grid allowing students to establish initial skill baselines.

### 📈 5. Market Intelligence & Industry Trends
- **Live Tech Demand Trends:** Real-time 2025 growth curves for AI, Cybersecurity, Cloud, and Data.
- **Salary Benchmarks:** Salary range visualizations ($k/year) across tech specializations.
- **Emerging Technology Radar:** Stage tracking for Generative AI, Quantum Computing, LLM Engineering, and Zero Trust.

### 🤖 6. AI Career Advisor Chatbot
- Universal floating conversational assistant available across all pages.
- Offers instant advice on interview preparation, resume enhancement, and high-impact skills.

### ⚡ 7. 1-Click Instant Demo
- Direct demo access button on the landing page that auto-provisions a student profile for seamless exploration without manual registration.

---

## 🏗️ Project Architecture

```
CareerNexus/
├── 404.html               # Custom obsidian-themed 404 error page
├── assessment.html        # Skill assessment & self-rating exam interface
├── career-dna.html        # Career DNA archetype & 8-dimension radar profile
├── careers.html           # Career explorer, match ranking & skill gap analysis
├── dashboard.html         # Main authenticated intelligence hub
├── index.html             # Landing page with particle background & split auth
├── login.html             # Dedicated login gateway
├── onboarding.html        # 5-step wizard with visual stepper & demo autofill
├── roadmap.html           # Phase-based curriculum & digital twin milestone tracker
├── signup.html            # Dedicated signup gateway
├── trends.html            # Industry trends, salary charts & technology radar
│
├── assets/                # Logos, SVG assets, and reference designs
│
├── css/
│   ├── animations.css     # Keyframes, glow pulses, and particle transitions
│   ├── components.css     # Sidebar, topbar, buttons, badges, modals, chatbot
│   ├── main.css           # Global tokens, typography (Outfit/Inter), colors
│   └── pages.css          # Page-specific responsive layout styling
│
├── js/
│   ├── ai-engine.js       # Recommendation algorithms, readiness calculations & career DB
│   ├── app.js             # Core application state, toast notifications & chatbot
│   ├── assessment.js      # Exam questions, countdown timer & score compilation
│   ├── auth.js            # Authentication service, onboarding & session guards
│   ├── career-dna.js      # Career DNA visualization controller & radar setup
│   ├── charts.js          # Chart.js wrappers, styling presets & safe destruction
│   └── particles.js       # Ambient canvas particle background animation
│
├── .gitignore             # Git ignore configuration
├── netlify.toml           # Netlify production headers & caching configuration
├── package.json           # NPM scripts for development & deployment
└── vercel.json            # Vercel production clean URLs & caching configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or newer recommended)

### Installation & Development Server

1. **Clone or Navigate to the directory:**
   ```bash
   cd "CareerNexus"
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   *Or with static serve:*
   ```bash
   npm run serve
   ```

3. Open your browser at:
   ```
   http://localhost:5173
   ```

---

## 🌐 Deployment

The project is static, secure, and production-ready.

### Deploy to Vercel (Recommended)
```bash
npx vercel
```
*Or use the script defined in package.json:*
```bash
npm run deploy:vercel
```

### Deploy to Netlify
```bash
npm run deploy:netlify
```

### Deploy to GitHub Pages
1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**, choose `main` or `master`, and save.

---

## 🎨 Design Philosophy
- **Obsidian Dark Mode:** Deep cosmic navy `#070a12` background reduces eye strain and provides superior contrast.
- **Vibrant Accent Spectrum:** Cyber-indigo `#6366f1`, neon cyan `#06b6d4`, electric purple `#8b5cf6`, and emerald `#10b981`.
- **Specular Glassmorphism:** Subtle specular borders (`1px solid rgba(255, 255, 255, 0.08)`) and high-performance backdrop blurs.
- **Zero Framework Bloat:** 100% Vanilla HTML5, Vanilla CSS3, and modern modular ES6+ JavaScript.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
