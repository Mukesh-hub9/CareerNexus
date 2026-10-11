/* ============================================================
   CareerNexus — Authentication & Session Manager
   Modular Auth Service ready to connect to FastAPI REST backend
   Endpoints: /api/auth/login, /api/auth/register, /api/auth/logout,
              /api/auth/forgot-password, /api/auth/reset-password,
              /api/auth/verify-email, /api/auth/me
   ============================================================ */

'use strict';

const AuthService = (() => {

  const DEMO_USER = {
    id: 'demo-user-001',
    name: 'Mukesh Kumar',
    email: 'mukesh@example.com',
    password: 'Demo@1234',
    verified: true,
    avatar: 'MK',
    onboarded: true
  };

  /* ── Validation Utilities ────────────────────────────────── */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function calculatePasswordStrength(password) {
    if (!password) return { score: 0, text: '', class: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score++;

    if (score <= 1) return { score: 1, text: 'Weak password', class: 'strength-weak' };
    if (score <= 3) return { score: 3, text: 'Medium strength', class: 'strength-medium' };
    return { score: 4, text: 'Strong password', class: 'strength-strong' };
  }

  /* ── Get Current Session / User ───────────────────────────── */
  function getCurrentUser() {
    const state = App.getState();
    return state ? state.user : null;
  }

  function isUserOnboarded() {
    const state = App.getState();
    return state ? !!state.onboarded : false;
  }

  /* ── Auth API Implementations ────────────────────────────── */
  async function login({ email, password, remember = true }) {
    await new Promise(r => setTimeout(r, 600));

    // REST BACKEND HOOK:
    // const res = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
    // if (!res.ok) { const err = await res.json(); throw new Error(err.detail || 'Login failed'); }
    // const data = await res.json(); return data;

    let user = null;
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      user = Object.assign({}, DEMO_USER);
    } else {
      const users = JSON.parse(localStorage.getItem('careernexus_registered_users') || '[]');
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) throw new Error('Invalid email or password.');
      user = found;
    }

    const stateObj = {
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar || user.name.charAt(0).toUpperCase() },
      onboarded: !!user.onboarded
    };
    App.saveState(stateObj);
    return user;
  }

  async function register({ name, email, password }) {
    await new Promise(r => setTimeout(r, 800));

    // REST BACKEND HOOK:
    // const res = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, password })
    // });
    // if (!res.ok) { const err = await res.json(); throw new Error(err.detail || 'Registration failed'); }
    // return await res.json();

    const users = JSON.parse(localStorage.getItem('careernexus_registered_users') || '[]');
    if (users.find(u => u.email === email) || email === DEMO_USER.email) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      password: password,
      verified: false,
      onboarded: false,
      avatar: name.trim().charAt(0).toUpperCase()
    };

    users.push(newUser);
    localStorage.setItem('careernexus_registered_users', JSON.stringify(users));

    App.saveState({
      user: { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar },
      onboarded: false
    });

    return newUser;
  }

  async function verifyEmail(email) {
    await new Promise(r => setTimeout(r, 500));
    const users = JSON.parse(localStorage.getItem('careernexus_registered_users') || '[]');
    const user = users.find(u => u.email === email);
    if (user) user.verified = true;
    localStorage.setItem('careernexus_registered_users', JSON.stringify(users));
    return true;
  }

  async function forgotPassword(email) {
    await new Promise(r => setTimeout(r, 600));
    if (!validateEmail(email)) throw new Error('Please provide a valid email address.');
    return true;
  }

  async function resetPassword(token, newPassword) {
    await new Promise(r => setTimeout(r, 700));
    if (!newPassword || newPassword.length < 8) throw new Error('Password must be at least 8 characters long.');
    return true;
  }

  async function completeOnboarding(profileData) {
    await new Promise(r => setTimeout(r, 700));
    const state = App.getState();
    const currentUser = state.user || {
      id: 'student-' + Date.now(),
      name: profileData.name || 'Alex Morgan',
      email: profileData.email || 'alex@example.com',
      avatar: (profileData.name ? profileData.name.charAt(0) : 'A').toUpperCase()
    };

    const updatedProfile = Object.assign({}, state.profile || {}, profileData);
    App.saveState({
      user: currentUser,
      profile: updatedProfile,
      onboarded: true
    });
    return true;
  }

  function logout() {
    App.saveState({ user: null, profile: null, onboarded: false });
    window.location.href = 'index.html';
  }

  /* ── Protected Route Guard ───────────────────────────────── */
  function checkAuthGuard() {
    const user = getCurrentUser();
    const onboarded = isUserOnboarded();
    const path = window.location.pathname.toLowerCase();
    const isAuthPage = path.endsWith('index.html') || path.endsWith('/') || path.endsWith('login.html') || path.endsWith('signup.html');
    const isOnboardingPage = path.endsWith('onboarding.html');

    if (!user && !isAuthPage && !isOnboardingPage) {
      window.location.href = 'index.html';
      return false;
    }

    if (user && isAuthPage) {
      if (onboarded) {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'onboarding.html';
      }
      return false;
    }

    if (user && !onboarded && !isOnboardingPage && !isAuthPage) {
      window.location.href = 'onboarding.html';
      return false;
    }

    return true;
  }

  return {
    validateEmail,
    calculatePasswordStrength,
    getCurrentUser,
    isUserOnboarded,
    login,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
    completeOnboarding,
    logout,
    checkAuthGuard,
    DEMO_USER
  };
})();

if (typeof window !== 'undefined') {
  window.AuthService = AuthService;
  window.Auth = AuthService; // Backward compatibility alias
}
