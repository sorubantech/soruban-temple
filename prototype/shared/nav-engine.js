/* ============================================================
   SORUBAN TEMPLE — Navigation Engine
   Shared navigation, theme toggle, and utility functions
   ============================================================ */

const NavEngine = (function () {
  // Screen history stack
  let screenHistory = [];
  let currentScreen = null;
  let screens = {};
  let bottomNavConfig = [];

  // ===== Initialize =====
  function init(config) {
    screens = config.screens || {};
    bottomNavConfig = config.bottomNav || [];
    const startScreen = config.startScreen || 'home';

    // Build bottom nav
    renderBottomNav();

    // Load initial screen
    navigateTo(startScreen, false);

    // Init theme from localStorage
    const savedTheme = localStorage.getItem('st_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Status bar time
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000);
  }

  // ===== Navigate To Screen =====
  function navigateTo(screenId, addToHistory = true) {
    if (!screens[screenId]) {
      console.warn(`Screen "${screenId}" not found`);
      return;
    }

    const contentEl = document.getElementById('screen-content');
    if (!contentEl) return;

    // Add current to history
    if (addToHistory && currentScreen) {
      screenHistory.push(currentScreen);
    }

    currentScreen = screenId;

    // Render screen content
    contentEl.innerHTML = `<div class="screen-enter">${screens[screenId]()}</div>`;

    // Scroll to top
    contentEl.scrollTop = 0;

    // Update bottom nav active state
    updateBottomNav(screenId);

    // Run screen init if exists
    if (typeof window['onScreen_' + screenId] === 'function') {
      setTimeout(() => window['onScreen_' + screenId](), 50);
    }
  }

  // ===== Go Back =====
  function goBack() {
    if (screenHistory.length === 0) return;
    const prevScreen = screenHistory.pop();
    navigateTo(prevScreen, false);
  }

  // ===== Render Bottom Nav =====
  function renderBottomNav() {
    const navEl = document.getElementById('bottom-nav');
    if (!navEl || bottomNavConfig.length === 0) return;

    navEl.innerHTML = bottomNavConfig.map(item => `
      <button class="nav-item" data-screen="${item.screen}" onclick="NavEngine.navigateTo('${item.screen}')">
        <i class="${item.icon}"></i>
        <span>${item.label}</span>
        ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
      </button>
    `).join('');
  }

  // ===== Update Bottom Nav Active =====
  function updateBottomNav(screenId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.classList.remove('active');
      // Match screen or parent screen
      const itemScreen = item.getAttribute('data-screen');
      if (itemScreen === screenId || (screens[screenId] && screens[screenId].navTab === itemScreen)) {
        item.classList.add('active');
      }
    });

    // Also check navTab property on screen function
    const screenFn = screens[screenId];
    if (screenFn && screenFn.navTab) {
      navItems.forEach(item => {
        if (item.getAttribute('data-screen') === screenFn.navTab) {
          item.classList.add('active');
        }
      });
    }
  }

  // ===== Theme Toggle =====
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('st_theme', next);

    // Re-render current screen to update theme-dependent elements
    if (currentScreen) {
      navigateTo(currentScreen, false);
    }
  }

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // ===== Status Bar Time =====
  function updateStatusBarTime() {
    const timeEl = document.querySelector('.sb-time');
    if (timeEl) {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes().toString().padStart(2, '0');
      const h = hours > 12 ? hours - 12 : hours || 12;
      timeEl.textContent = `${h}:${mins}`;
    }
  }

  // ===== Toast Notification =====
  function showToast(message, duration = 2500) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ===== Modal =====
  function showModal(contentHtml) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        ${contentHtml}
      </div>
    `;
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    requestAnimationFrame(() => overlay.classList.add('show'));
  }

  function closeModal() {
    const overlay = document.querySelector('.modal-overlay.show');
    if (overlay) {
      overlay.classList.remove('show');
      setTimeout(() => overlay.remove(), 400);
    }
  }

  // ===== Utility: Format Currency =====
  function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  // ===== Utility: Format Date =====
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // ===== Utility: Time Greeting =====
  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  function getTamilGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'காலை வணக்கம்';
    if (h < 17) return 'மதிய வணக்கம்';
    return 'மாலை வணக்கம்';
  }

  // ===== Utility: Generate Booking ID =====
  function generateBookingId() {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(Math.random() * 900 + 100);
    return `BK-${dateStr}-${rand}`;
  }

  // ===== Utility: Star Rating HTML =====
  function starRating(rating, max = 5) {
    let html = '<span class="stars">';
    for (let i = 1; i <= max; i++) {
      if (i <= Math.floor(rating)) {
        html += '<i class="fa-solid fa-star"></i>';
      } else if (i - 0.5 <= rating) {
        html += '<i class="fa-solid fa-star-half-stroke"></i>';
      } else {
        html += '<i class="fa-regular fa-star star-empty"></i>';
      }
    }
    html += '</span>';
    return html;
  }

  // ===== Utility: Crowd Level =====
  function crowdBadge(level) {
    const config = {
      low: { bg: 'badge-success', label: 'Low Crowd', icon: 'fa-user' },
      medium: { bg: 'badge-gold', label: 'Moderate', icon: 'fa-users' },
      high: { bg: 'badge-danger', label: 'Crowded', icon: 'fa-users-between-lines' },
    };
    const c = config[level] || config.low;
    return `<span class="badge ${c.bg}"><i class="fa-solid ${c.icon}"></i> ${c.label}</span>`;
  }

  // ===== Public API =====
  return {
    init,
    navigateTo,
    goBack,
    toggleTheme,
    isDark,
    showToast,
    showModal,
    closeModal,
    formatCurrency,
    formatDate,
    getGreeting,
    getTamilGreeting,
    generateBookingId,
    starRating,
    crowdBadge,
    get currentScreen() { return currentScreen; },
    get history() { return screenHistory; },
  };
})();
