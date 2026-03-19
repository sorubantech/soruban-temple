/**
 * Super Admin Panel - Main JavaScript
 * Controls: Temples, Users, Temple Admins, Reports, Finance, Content, Notifications, App Management
 * Uses localStorage for all data persistence.
 */

const SA = (function() {
  'use strict';

  // =========================================================================
  // CONSTANTS & STORAGE KEYS
  // =========================================================================
  const KEYS = {
    SESSION: 'sa_session',
    TEMPLES: 'sa_temples',
    USERS: 'sa_users',
    TEMPLE_ADMINS: 'sa_temple_admins',
    NOTIFICATIONS: 'sa_notifications',
    POSTS: 'sa_posts',
    GALLERY: 'sa_gallery',
    REVIEWS: 'sa_reviews',
    FLAGGED: 'sa_flagged',
    DISTRICTS: 'sa_districts',
    CATEGORIES: 'sa_categories',
    FESTIVALS: 'sa_festivals',
    SETTINGS: 'sa_settings',
    ACTIVITY: 'sa_activity',
    // User-app keys (read-only for super admin)
    APP_BOOKINGS: 'temple_bookings',
    APP_DONATIONS: 'temple_donations',
    APP_USER: 'temple_user',
    APP_REVIEWS: 'temple_reviews',
    APP_LIKES: 'temple_likes',
    APP_FOLLOWING: 'temple_following',
    FEED_LIKES: 'feed_likes',
    FEED_COMMENTS: 'feed_comments',
    COMMUNITY_POSTS: 'community_posts'
  };

  const SA_CREDENTIALS = { username: 'superadmin', password: 'super@123' };

  // =========================================================================
  // UTILITY
  // =========================================================================
  function genId() { return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 7); }
  function get(key) { try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; } }
  function set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function getArr(key) { return get(key) || []; }
  function formatDate(d) {
    if (!d) return 'N/A';
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
  }
  function formatCurrency(n) { return '₹' + Number(n || 0).toLocaleString('en-IN'); }

  function showToast(msg, type) {
    const t = document.getElementById('sa-toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'sa-toast ' + (type || 'info');
    setTimeout(() => t.classList.add('show'), 50);
    setTimeout(() => { t.classList.remove('show'); }, 2500);
  }

  function addActivity(text, color) {
    const list = getArr(KEYS.ACTIVITY);
    list.unshift({ text, color: color || 'blue', time: new Date().toISOString() });
    if (list.length > 50) list.length = 50;
    set(KEYS.ACTIVITY, list);
  }

  // =========================================================================
  // AUTH
  // =========================================================================
  function checkAuth() {
    const session = get(KEYS.SESSION);
    if (!session || !session.loggedIn) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  }

  function login(e) {
    e.preventDefault();
    const u = document.getElementById('sa-username').value.trim();
    const p = document.getElementById('sa-password').value;
    if (u === SA_CREDENTIALS.username && p === SA_CREDENTIALS.password) {
      set(KEYS.SESSION, { loggedIn: true, user: 'Super Admin', loginTime: new Date().toISOString() });
      initSeedData();
      showToast('Login successful!', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 800);
    } else {
      showToast('Invalid credentials', 'error');
    }
  }

  function logout() {
    localStorage.removeItem(KEYS.SESSION);
    showToast('Logged out', 'info');
    setTimeout(() => window.location.href = 'index.html', 500);
  }

  // =========================================================================
  // SEED DATA (first login)
  // =========================================================================
  function initSeedData() {
    // Temples
    if (!get(KEYS.TEMPLES)) {
      set(KEYS.TEMPLES, [
        { id: genId(), name: 'Meenakshi Amman Temple', district: 'Madurai', category: 'Amman', status: 'approved', admin: '', desc: 'Ancient temple dedicated to Goddess Meenakshi', address: 'Madurai, Tamil Nadu' },
        { id: genId(), name: 'Brihadeeswarar Temple', district: 'Thanjavur', category: 'Shiva', status: 'approved', admin: '', desc: 'UNESCO World Heritage Chola temple', address: 'Thanjavur, Tamil Nadu' },
        { id: genId(), name: 'Ramanathaswamy Temple', district: 'Rameswaram', category: 'Shiva', status: 'approved', admin: '', desc: 'One of the twelve Jyotirlinga temples', address: 'Rameswaram, Tamil Nadu' },
        { id: genId(), name: 'Kapaleeshwarar Temple', district: 'Chennai', category: 'Shiva', status: 'approved', admin: '', desc: 'Famous Shiva temple in Mylapore', address: 'Mylapore, Chennai' },
        { id: genId(), name: 'Tirumala Venkateswara Temple', district: 'Tirupati', category: 'Vishnu', status: 'approved', admin: '', desc: 'Richest temple in the world', address: 'Tirumala, Tirupati' },
        { id: genId(), name: 'Nataraja Temple', district: 'Chidambaram', category: 'Shiva', status: 'approved', admin: '', desc: 'Temple of the cosmic dancer', address: 'Chidambaram, Tamil Nadu' },
        { id: genId(), name: 'Arulmigu Subramaniyaswami Temple', district: 'Tiruchirappalli', category: 'Murugan', status: 'approved', admin: '', desc: 'Palani-style hilltop temple', address: 'Tiruchirappalli, Tamil Nadu' },
        { id: genId(), name: 'Kamakshi Amman Temple', district: 'Kanchipuram', category: 'Amman', status: 'approved', admin: '', desc: 'One of the Shakti Peethas', address: 'Kanchipuram, Tamil Nadu' },
        { id: genId(), name: 'Vaitheeswaran Koil', district: 'Kumbakonam', category: 'Navagraha', status: 'pending', admin: '', desc: 'Temple of Mars (Chevvai)', address: 'Kumbakonam, Tamil Nadu' },
        { id: genId(), name: 'New Vinayagar Temple', district: 'Coimbatore', category: 'Ganesh', status: 'pending', admin: '', desc: 'Newly registered temple', address: 'Coimbatore, Tamil Nadu' }
      ]);
    }

    // Users
    if (!get(KEYS.USERS)) {
      set(KEYS.USERS, [
        { id: genId(), name: 'Ramesh Kumar', email: 'ramesh@gmail.com', phone: '9876543210', status: 'active', joined: '2025-12-01', bookings: 5, donations: 3 },
        { id: genId(), name: 'Priya Sharma', email: 'priya@gmail.com', phone: '9876543211', status: 'active', joined: '2025-12-15', bookings: 8, donations: 5 },
        { id: genId(), name: 'Arun Venkat', email: 'arun.v@gmail.com', phone: '9876543212', status: 'active', joined: '2026-01-05', bookings: 3, donations: 2 },
        { id: genId(), name: 'Lakshmi Devi', email: 'lakshmi@gmail.com', phone: '9876543213', status: 'active', joined: '2026-01-20', bookings: 12, donations: 8 },
        { id: genId(), name: 'Suresh Babu', email: 'suresh@gmail.com', phone: '9876543214', status: 'blocked', joined: '2026-02-01', bookings: 1, donations: 0 },
        { id: genId(), name: 'Kavitha M', email: 'kavitha@gmail.com', phone: '9876543215', status: 'active', joined: '2026-02-10', bookings: 6, donations: 4 },
        { id: genId(), name: 'Vijay Krishna', email: 'vijay.k@gmail.com', phone: '9876543216', status: 'active', joined: '2026-02-20', bookings: 2, donations: 1 },
        { id: genId(), name: 'Meena S', email: 'meena@gmail.com', phone: '9876543217', status: 'active', joined: '2026-03-01', bookings: 4, donations: 6 }
      ]);
    }

    // Temple Admins
    if (!get(KEYS.TEMPLE_ADMINS)) {
      const temples = get(KEYS.TEMPLES);
      set(KEYS.TEMPLE_ADMINS, [
        { id: genId(), name: 'Pandit Raghunath', email: 'raghunath@temple.com', phone: '9900112233', username: 'raghunath', status: 'active', templeId: temples[0].id, templeName: temples[0].name, lastLogin: '2026-03-10' },
        { id: genId(), name: 'Sri Venkatesh', email: 'venkatesh@temple.com', phone: '9900112234', username: 'venkatesh', status: 'active', templeId: temples[4].id, templeName: temples[4].name, lastLogin: '2026-03-09' },
        { id: genId(), name: 'Kumar Priest', email: 'kumar@temple.com', phone: '9900112235', username: 'kumar', status: 'active', templeId: temples[1].id, templeName: temples[1].name, lastLogin: '2026-03-08' }
      ]);
    }

    // Districts
    if (!get(KEYS.DISTRICTS)) {
      set(KEYS.DISTRICTS, [
        { id: genId(), name: 'Chennai', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Madurai', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Thanjavur', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Kanchipuram', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Tiruchirappalli', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Tirunelveli', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Kumbakonam', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Rameswaram', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Chidambaram', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Coimbatore', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Salem', state: 'Tamil Nadu', status: 'active' },
        { id: genId(), name: 'Tirupati', state: 'Andhra Pradesh', status: 'active' }
      ]);
    }

    // Categories
    if (!get(KEYS.CATEGORIES)) {
      set(KEYS.CATEGORIES, [
        { id: genId(), name: 'Shiva', icon: '🕉️', status: 'active' },
        { id: genId(), name: 'Vishnu', icon: '🙏', status: 'active' },
        { id: genId(), name: 'Amman', icon: '🔱', status: 'active' },
        { id: genId(), name: 'Murugan', icon: '🪔', status: 'active' },
        { id: genId(), name: 'Ganesh', icon: '🐘', status: 'active' },
        { id: genId(), name: 'Navagraha', icon: '☀️', status: 'active' }
      ]);
    }

    // Festivals
    if (!get(KEYS.FESTIVALS)) {
      set(KEYS.FESTIVALS, [
        { id: genId(), name: 'Maha Shivaratri', date: '2026-02-27', desc: 'Night of Lord Shiva', status: 'active' },
        { id: genId(), name: 'Pongal', date: '2026-01-15', desc: 'Tamil harvest festival', status: 'active' },
        { id: genId(), name: 'Navaratri', date: '2026-10-02', desc: 'Nine nights of divine worship', status: 'active' },
        { id: genId(), name: 'Deepavali', date: '2026-10-20', desc: 'Festival of lights', status: 'active' },
        { id: genId(), name: 'Thai Poosam', date: '2026-02-11', desc: 'Murugan festival', status: 'active' },
        { id: genId(), name: 'Vinayaka Chaturthi', date: '2026-08-27', desc: 'Birthday of Lord Ganesha', status: 'active' },
        { id: genId(), name: 'Panguni Uthiram', date: '2026-03-28', desc: 'Divine wedding festival', status: 'upcoming' }
      ]);
    }

    // Posts
    if (!get(KEYS.POSTS)) {
      set(KEYS.POSTS, [
        { id: genId(), temple: 'Meenakshi Amman Temple', caption: 'Special Abhishekam today for Panguni Uthiram!', type: 'festival', date: '2026-03-10', likes: 45, comments: 12, status: 'published' },
        { id: genId(), temple: 'Brihadeeswarar Temple', caption: 'Temple renovation completed - new gopuram painting', type: 'update', date: '2026-03-08', likes: 32, comments: 8, status: 'published' },
        { id: genId(), temple: 'Tirumala Venkateswara Temple', caption: 'Brahmotsavam darshan timings announced', type: 'event', date: '2026-03-06', likes: 120, comments: 34, status: 'published' }
      ]);
    }

    // Notifications history
    if (!get(KEYS.NOTIFICATIONS)) {
      set(KEYS.NOTIFICATIONS, [
        { id: genId(), title: 'Welcome to Temple Digital!', type: 'announcement', target: 'all_users', date: '2026-01-01', status: 'sent' },
        { id: genId(), title: 'New Booking Features Added', type: 'update', target: 'all_users', date: '2026-02-15', status: 'sent' },
        { id: genId(), title: 'Monthly Report Available', type: 'announcement', target: 'all_admins', date: '2026-03-01', status: 'sent' }
      ]);
    }

    // Activity log
    if (!getArr(KEYS.ACTIVITY).length) {
      set(KEYS.ACTIVITY, [
        { text: '<strong>Super Admin</strong> approved Meenakshi Amman Temple', color: 'green', time: new Date(Date.now() - 3600000).toISOString() },
        { text: '<strong>Pandit Raghunath</strong> logged into admin panel', color: 'blue', time: new Date(Date.now() - 7200000).toISOString() },
        { text: 'New user <strong>Meena S</strong> registered', color: 'blue', time: new Date(Date.now() - 10800000).toISOString() },
        { text: 'Donation of <strong>₹5,000</strong> received for Annadhanam', color: 'green', time: new Date(Date.now() - 14400000).toISOString() },
        { text: '<strong>Suresh Babu</strong> was blocked for policy violation', color: 'red', time: new Date(Date.now() - 18000000).toISOString() },
        { text: 'Temple registration <strong>Vaitheeswaran Koil</strong> pending', color: 'orange', time: new Date(Date.now() - 21600000).toISOString() }
      ]);
    }
  }

  // =========================================================================
  // UI HELPERS
  // =========================================================================
  function toggleSidebar() {
    document.getElementById('sa-sidebar').classList.toggle('open');
  }

  function switchTab(btn, tabId) {
    const tabs = btn.parentElement;
    tabs.querySelectorAll('.sa-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const parent = tabs.parentElement;
    parent.querySelectorAll('.sa-tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
  }

  function openModal(id) { document.getElementById(id).classList.add('show'); }
  function closeModal(id) { document.getElementById(id).classList.remove('show'); }

  function avatarBg(name) {
    const colors = ['#1a237e','#c62828','#2e7d32','#e65100','#6a1b9a','#00838f','#4e342e','#283593'];
    let hash = 0;
    for (let i = 0; i < (name||'').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }

  function statusBadge(status) {
    const map = {
      approved: 'sa-badge-success', active: 'sa-badge-success', published: 'sa-badge-success', sent: 'sa-badge-success',
      pending: 'sa-badge-warning', upcoming: 'sa-badge-warning',
      blocked: 'sa-badge-danger', suspended: 'sa-badge-danger', rejected: 'sa-badge-danger', removed: 'sa-badge-danger',
      inactive: 'sa-badge-info'
    };
    return `<span class="sa-badge ${map[status] || 'sa-badge-info'}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
  }

  // =========================================================================
  // DASHBOARD
  // =========================================================================
  function initDashboard() {
    if (!checkAuth()) return;
    seedBookingData();

    const temples = getArr(KEYS.TEMPLES);
    const users = getArr(KEYS.USERS);
    const admins = getArr(KEYS.TEMPLE_ADMINS);
    const bookings = getArr(KEYS.APP_BOOKINGS);
    const donations = getArr(KEYS.APP_DONATIONS);

    const communityPosts = getArr(KEYS.COMMUNITY_POSTS);
    const verifyRequests = getArr('community_verification_requests');
    const pendingPosts = communityPosts.filter(p => p.status === 'pending').length;
    const pendingVerifications = verifyRequests.filter(r => r.status === 'pending').length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending Approval').length;
    const totalPending = temples.filter(t => t.status === 'pending').length + pendingPosts + pendingVerifications + pendingBookings;

    // Stats
    setText('stat-temples', temples.length);
    setText('stat-users', users.length);
    setText('stat-bookings', bookings.length);
    setText('stat-donations', formatCurrency(donations.reduce((s, d) => s + (d.amount || 0), 0)));
    setText('stat-admins', admins.length);
    setText('stat-pending', totalPending);

    // Activity
    const actEl = document.getElementById('recent-activity');
    if (actEl) {
      const activities = getArr(KEYS.ACTIVITY).slice(0, 8);
      actEl.innerHTML = activities.map(a => `
        <li class="sa-activity-item">
          <div class="sa-activity-dot ${a.color}"></div>
          <div>
            <div class="sa-activity-text">${a.text}</div>
            <div class="sa-activity-time">${timeAgo(a.time)}</div>
          </div>
        </li>
      `).join('') || '<li class="sa-activity-item"><div class="sa-activity-text sa-text-muted">No recent activity</div></li>';
    }

    // Revenue chart
    renderBarChart('revenue-chart', ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], [1200,2500,1800,3200,2800,4500,3100]);

    // Top temples
    const ttEl = document.getElementById('top-temples-table');
    if (ttEl) {
      const templeData = temples.slice(0, 5).map((t, i) => {
        const b = Math.floor(Math.random() * 50) + 10;
        return `<tr>
          <td class="avatar-cell">
            <div class="avatar-sm" style="background:${avatarBg(t.name)};">${t.name[0]}</div>
            <span>${t.name}</span>
          </td>
          <td>${b}</td>
          <td>${formatCurrency(b * (300 + i * 50))}</td>
        </tr>`;
      });
      ttEl.innerHTML = templeData.join('');
    }
  }

  function timeAgo(ts) {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    return Math.floor(hrs / 24) + 'd ago';
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function renderBarChart(containerId, labels, values) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const max = Math.max(...values);
    el.innerHTML = values.map((v, i) => {
      const h = max > 0 ? (v / max * 100) : 0;
      return `<div class="sa-chart-bar" style="height:${h}%;">
        <div class="value">${formatCurrency(v)}</div>
        <span>${labels[i]}</span>
      </div>`;
    }).join('');
  }

  // =========================================================================
  // TEMPLE MANAGEMENT
  // =========================================================================
  function initTemples() {
    if (!checkAuth()) return;
    renderTemples();
    populateDistrictFilter();
  }

  function renderTemples() {
    const temples = getArr(KEYS.TEMPLES);
    const search = (document.getElementById('temple-search')?.value || '').toLowerCase();
    const distFilter = document.getElementById('temple-district-filter')?.value || '';
    const catFilter = document.getElementById('temple-category-filter')?.value || '';

    let filtered = temples.filter(t => {
      if (search && !t.name.toLowerCase().includes(search) && !t.district.toLowerCase().includes(search)) return false;
      if (distFilter && t.district !== distFilter) return false;
      if (catFilter && t.category !== catFilter) return false;
      return true;
    });

    // Stats
    setText('total-temples', temples.length);
    setText('approved-temples', temples.filter(t => t.status === 'approved').length);
    setText('pending-temples', temples.filter(t => t.status === 'pending').length);
    setText('suspended-temples', temples.filter(t => t.status === 'suspended').length);

    // All temples table
    const tbody = document.getElementById('temples-table-body');
    if (tbody) {
      tbody.innerHTML = filtered.map(t => `
        <tr>
          <td class="avatar-cell">
            <div class="avatar-sm" style="background:${avatarBg(t.name)};">${t.name[0]}</div>
            <div><strong>${t.name}</strong><br><small class="sa-text-muted">${t.address || ''}</small></div>
          </td>
          <td>${t.district}</td>
          <td>${t.category}</td>
          <td>${t.admin || '<span class="sa-text-muted">Unassigned</span>'}</td>
          <td>${statusBadge(t.status)}</td>
          <td class="sa-actions">
            <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.editTemple('${t.id}')"><i class="fas fa-edit"></i></button>
            ${t.status === 'pending' ? `<button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.approveTemple('${t.id}')"><i class="fas fa-check"></i></button>` : ''}
            ${t.status !== 'suspended' ? `<button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.suspendTemple('${t.id}')"><i class="fas fa-ban"></i></button>` : `<button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.approveTemple('${t.id}')"><i class="fas fa-undo"></i></button>`}
            <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.deleteTemple('${t.id}')" style="color:var(--sa-danger);"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      `).join('') || '<tr><td colspan="6" class="sa-text-muted" style="text-align:center; padding:40px;">No temples found</td></tr>';
    }

    // Pending table
    const pendingBody = document.getElementById('pending-table-body');
    if (pendingBody) {
      const pending = temples.filter(t => t.status === 'pending');
      pendingBody.innerHTML = pending.map(t => `
        <tr>
          <td><strong>${t.name}</strong></td>
          <td>${t.admin || 'Self-registered'}</td>
          <td>${formatDate(t.submittedDate || Date.now())}</td>
          <td class="sa-actions">
            <button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.approveTemple('${t.id}')"><i class="fas fa-check"></i> Approve</button>
            <button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.rejectTemple('${t.id}')"><i class="fas fa-times"></i> Reject</button>
          </td>
        </tr>
      `).join('') || '<tr><td colspan="4" class="sa-text-muted" style="text-align:center; padding:40px;">No pending temples</td></tr>';
    }

    // Suspended table
    const suspBody = document.getElementById('suspended-table-body');
    if (suspBody) {
      const suspended = temples.filter(t => t.status === 'suspended');
      suspBody.innerHTML = suspended.map(t => `
        <tr>
          <td><strong>${t.name}</strong></td>
          <td>${t.suspendReason || 'Policy violation'}</td>
          <td>${formatDate(t.suspendDate || Date.now())}</td>
          <td class="sa-actions">
            <button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.approveTemple('${t.id}')"><i class="fas fa-undo"></i> Restore</button>
            <button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.deleteTemple('${t.id}')"><i class="fas fa-trash"></i> Delete</button>
          </td>
        </tr>
      `).join('') || '<tr><td colspan="4" class="sa-text-muted" style="text-align:center; padding:40px;">No suspended temples</td></tr>';
    }
  }

  function filterTemples() { renderTemples(); }

  function populateDistrictFilter() {
    const sel = document.getElementById('temple-district-filter');
    if (!sel) return;
    const districts = getArr(KEYS.DISTRICTS);
    districts.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.name; opt.textContent = d.name;
      sel.appendChild(opt);
    });
  }

  function openAddTemple() {
    document.getElementById('temple-modal-title').textContent = 'Add New Temple';
    document.getElementById('edit-temple-id').value = '';
    document.getElementById('temple-name').value = '';
    document.getElementById('temple-district').value = '';
    document.getElementById('temple-category').value = '';
    document.getElementById('temple-address').value = '';
    document.getElementById('temple-desc').value = '';
    populateAdminAssignDropdown('temple-admin-assign');
    openModal('temple-modal');
  }

  function editTemple(id) {
    const t = getArr(KEYS.TEMPLES).find(x => x.id === id);
    if (!t) return;
    document.getElementById('temple-modal-title').textContent = 'Edit Temple';
    document.getElementById('edit-temple-id').value = id;
    document.getElementById('temple-name').value = t.name;
    document.getElementById('temple-district').value = t.district;
    document.getElementById('temple-category').value = t.category;
    document.getElementById('temple-address').value = t.address || '';
    document.getElementById('temple-desc').value = t.desc || '';
    populateAdminAssignDropdown('temple-admin-assign', t.admin);
    openModal('temple-modal');
  }

  function saveTemple() {
    const name = document.getElementById('temple-name').value.trim();
    const district = document.getElementById('temple-district').value;
    const category = document.getElementById('temple-category').value;
    if (!name || !district || !category) { showToast('Please fill required fields', 'error'); return; }

    const temples = getArr(KEYS.TEMPLES);
    const editId = document.getElementById('edit-temple-id').value;

    if (editId) {
      const idx = temples.findIndex(t => t.id === editId);
      if (idx >= 0) {
        temples[idx].name = name;
        temples[idx].district = district;
        temples[idx].category = category;
        temples[idx].address = document.getElementById('temple-address').value.trim();
        temples[idx].desc = document.getElementById('temple-desc').value.trim();
        temples[idx].admin = document.getElementById('temple-admin-assign').value;
        addActivity(`Temple <strong>${name}</strong> details updated`, 'blue');
      }
    } else {
      temples.push({
        id: genId(), name, district, category,
        address: document.getElementById('temple-address').value.trim(),
        desc: document.getElementById('temple-desc').value.trim(),
        admin: document.getElementById('temple-admin-assign').value,
        status: 'approved'
      });
      addActivity(`New temple <strong>${name}</strong> added`, 'green');
    }

    set(KEYS.TEMPLES, temples);
    closeModal('temple-modal');
    renderTemples();
    showToast(editId ? 'Temple updated!' : 'Temple added!', 'success');
  }

  function approveTemple(id) {
    const temples = getArr(KEYS.TEMPLES);
    const t = temples.find(x => x.id === id);
    if (t) {
      t.status = 'approved';
      set(KEYS.TEMPLES, temples);
      addActivity(`Temple <strong>${t.name}</strong> approved`, 'green');
      addSystemAlert('temple', 'fa-check-circle', 'green', 'Temple Approved', '<strong>' + t.name + '</strong> has been approved and is now active on the platform.', 'normal');
      renderTemples();
      showToast('Temple approved!', 'success');
    }
  }

  function rejectTemple(id) {
    const temples = getArr(KEYS.TEMPLES);
    const t = temples.find(x => x.id === id);
    if (t) {
      t.status = 'rejected';
      set(KEYS.TEMPLES, temples);
      addActivity(`Temple <strong>${t.name}</strong> rejected`, 'red');
      addSystemAlert('temple', 'fa-times-circle', 'red', 'Temple Rejected', '<strong>' + t.name + '</strong> registration has been rejected.', 'normal');
      renderTemples();
      showToast('Temple rejected', 'info');
    }
  }

  function suspendTemple(id) {
    const temples = getArr(KEYS.TEMPLES);
    const t = temples.find(x => x.id === id);
    if (t) {
      t.status = 'suspended';
      t.suspendDate = new Date().toISOString();
      set(KEYS.TEMPLES, temples);
      addActivity(`Temple <strong>${t.name}</strong> suspended`, 'red');
      renderTemples();
      showToast('Temple suspended', 'warning');
    }
  }

  function deleteTemple(id) {
    if (!confirm('Are you sure you want to delete this temple?')) return;
    let temples = getArr(KEYS.TEMPLES);
    const t = temples.find(x => x.id === id);
    temples = temples.filter(x => x.id !== id);
    set(KEYS.TEMPLES, temples);
    if (t) addActivity(`Temple <strong>${t.name}</strong> deleted`, 'red');
    renderTemples();
    showToast('Temple deleted', 'info');
  }

  // =========================================================================
  // USER MANAGEMENT
  // =========================================================================
  function initUsers() {
    if (!checkAuth()) return;
    renderUsers();
    renderVerificationRequests();
  }

  function renderUsers() {
    const users = getArr(KEYS.USERS);
    const verifiedEmails = getArr('community_user_verified');
    const verifyRequests = getArr('community_verification_requests');
    const search = (document.getElementById('user-search')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('user-status-filter')?.value || '';

    let filtered = users.filter(u => {
      if (search && !u.name.toLowerCase().includes(search) && !u.email.toLowerCase().includes(search)) return false;
      if (statusFilter && u.status !== statusFilter) return false;
      return true;
    });

    setText('total-users', users.length);
    setText('active-users', users.filter(u => u.status === 'active').length);
    setText('blocked-users', users.filter(u => u.status === 'blocked').length);
    setText('new-users', users.filter(u => {
      const d = new Date(u.joined);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length);
    setText('verified-users', verifiedEmails.length);
    const pendingCount = verifyRequests.filter(r => r.status === 'pending').length;
    setText('pending-verifications', pendingCount);
    if (document.getElementById('verif-badge')) document.getElementById('verif-badge').textContent = pendingCount;

    const tbody = document.getElementById('users-table-body');
    if (tbody) {
      tbody.innerHTML = filtered.map(u => {
        const isVerified = verifiedEmails.includes(u.email);
        return `
        <tr>
          <td class="avatar-cell">
            <div class="avatar-sm" style="background:${avatarBg(u.name)};">${u.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
            <div><strong>${u.name}</strong> ${isVerified ? '<span class="sa-badge sa-badge-success" style="font-size:0.6rem;">✓ Verified</span>' : ''}</div>
          </td>
          <td>${u.email}</td>
          <td>${u.phone}</td>
          <td>${u.bookings || 0}</td>
          <td>${formatCurrency((u.donations || 0) * 500)}</td>
          <td>${statusBadge(u.status)}</td>
          <td class="sa-actions">
            <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.viewUser('${u.id}')"><i class="fas fa-eye"></i></button>
            ${!isVerified
              ? `<button class="sa-btn sa-btn-primary sa-btn-sm" onclick="SA.verifyUserDirect('${u.email}')" title="Verify User"><i class="fas fa-user-check"></i></button>`
              : `<button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.revokeVerification('${u.email}')" title="Revoke Verification" style="color:var(--sa-warning);"><i class="fas fa-user-times"></i></button>`}
            ${u.status === 'active'
              ? `<button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.blockUser('${u.id}')"><i class="fas fa-ban"></i></button>`
              : `<button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.unblockUser('${u.id}')"><i class="fas fa-check"></i></button>`}
            <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.deleteUser('${u.id}')" style="color:var(--sa-danger);"><i class="fas fa-trash"></i></button>
          </td>
        </tr>`;
      }).join('') || '<tr><td colspan="7" class="sa-text-muted" style="text-align:center; padding:40px;">No users found</td></tr>';
    }
  }

  function filterUsers() { renderUsers(); }

  // ===== Verification Request Management =====
  function renderVerificationRequests() {
    const requests = getArr('community_verification_requests');
    const tbody = document.getElementById('verification-table-body');
    if (!tbody) return;

    tbody.innerHTML = requests.map(r => `
      <tr>
        <td class="avatar-cell">
          <div class="avatar-sm" style="background:${avatarBg(r.name)};">${(r.name||'U')[0]}</div>
          <strong>${r.name}</strong>
        </td>
        <td>${r.email}</td>
        <td>${r.phone || '-'}</td>
        <td>${formatDate(r.requestedAt)}</td>
        <td>${statusBadge(r.status)}</td>
        <td class="sa-actions">
          ${r.status === 'pending' ? `
            <button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.approveVerification('${r.id}')"><i class="fas fa-check"></i> Approve</button>
            <button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.rejectVerification('${r.id}')"><i class="fas fa-times"></i> Reject</button>
          ` : r.status === 'approved' ? `
            <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.revokeVerification('${r.email}')" style="color:var(--sa-danger);"><i class="fas fa-user-times"></i> Revoke</button>
          ` : `
            <span class="sa-text-muted">Rejected</span>
          `}
        </td>
      </tr>
    `).join('') || '<tr><td colspan="6" class="sa-text-muted" style="text-align:center; padding:40px;">No verification requests yet</td></tr>';
  }

  function approveVerification(requestId) {
    const requests = getArr('community_verification_requests');
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    req.status = 'approved';
    set('community_verification_requests', requests);

    // Add email to verified list
    const verified = getArr('community_user_verified');
    if (!verified.includes(req.email)) {
      verified.push(req.email);
      set('community_user_verified', verified);
    }

    addActivity(`User <strong>${req.name}</strong> verified for community access`, 'green');
    renderVerificationRequests();
    renderUsers();
    showToast(`${req.name} has been verified!`, 'success');
  }

  function rejectVerification(requestId) {
    const requests = getArr('community_verification_requests');
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    req.status = 'rejected';
    set('community_verification_requests', requests);

    addActivity(`Verification request from <strong>${req.name}</strong> rejected`, 'red');
    renderVerificationRequests();
    showToast('Verification request rejected', 'info');
  }

  function verifyUserDirect(email) {
    const verified = getArr('community_user_verified');
    if (!verified.includes(email)) {
      verified.push(email);
      set('community_user_verified', verified);
    }

    // Also update any pending request for this email
    const requests = getArr('community_verification_requests');
    const req = requests.find(r => r.email === email);
    if (req) {
      req.status = 'approved';
      set('community_verification_requests', requests);
    }

    addActivity(`User <strong>${email}</strong> directly verified by Super Admin`, 'green');
    renderUsers();
    renderVerificationRequests();
    showToast('User verified for community access!', 'success');
  }

  function revokeVerification(email) {
    let verified = getArr('community_user_verified');
    verified = verified.filter(e => e !== email);
    set('community_user_verified', verified);

    // Update request status
    const requests = getArr('community_verification_requests');
    const req = requests.find(r => r.email === email);
    if (req) {
      req.status = 'revoked';
      set('community_verification_requests', requests);
    }

    addActivity(`Community verification revoked for <strong>${email}</strong>`, 'red');
    renderUsers();
    renderVerificationRequests();
    showToast('Verification revoked', 'warning');
  }

  function viewUser(id) {
    const u = getArr(KEYS.USERS).find(x => x.id === id);
    if (!u) return;
    const content = document.getElementById('user-detail-content');
    content.innerHTML = `
      <div style="text-align:center; margin-bottom:20px;">
        <div class="sa-user-avatar" style="width:60px;height:60px;font-size:1.3rem;margin:0 auto 12px;border-radius:50%;background:${avatarBg(u.name)};">
          ${u.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
        </div>
        <h3>${u.name}</h3>
        <p class="sa-text-muted">${u.email}</p>
      </div>
      <div class="sa-divider"></div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div><strong>Phone:</strong> ${u.phone}</div>
        <div><strong>Status:</strong> ${statusBadge(u.status)}</div>
        <div><strong>Joined:</strong> ${formatDate(u.joined)}</div>
        <div><strong>Bookings:</strong> ${u.bookings || 0}</div>
        <div><strong>Donations:</strong> ${u.donations || 0}</div>
        <div><strong>Total Donated:</strong> ${formatCurrency((u.donations || 0) * 500)}</div>
      </div>
    `;
    openModal('user-detail-modal');
  }

  function blockUser(id) {
    const users = getArr(KEYS.USERS);
    const u = users.find(x => x.id === id);
    if (u) {
      u.status = 'blocked';
      set(KEYS.USERS, users);
      addActivity(`User <strong>${u.name}</strong> blocked`, 'red');
      addSystemAlert('user', 'fa-user-slash', 'red', 'User Blocked', '<strong>' + u.name + '</strong> has been blocked for policy violation.', 'high');
      renderUsers();
      showToast('User blocked', 'warning');
    }
  }

  function unblockUser(id) {
    const users = getArr(KEYS.USERS);
    const u = users.find(x => x.id === id);
    if (u) {
      u.status = 'active';
      set(KEYS.USERS, users);
      addActivity(`User <strong>${u.name}</strong> unblocked`, 'green');
      renderUsers();
      showToast('User unblocked', 'success');
    }
  }

  function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    let users = getArr(KEYS.USERS);
    const u = users.find(x => x.id === id);
    users = users.filter(x => x.id !== id);
    set(KEYS.USERS, users);
    if (u) addActivity(`User <strong>${u.name}</strong> deleted`, 'red');
    renderUsers();
    showToast('User deleted', 'info');
  }

  function exportUsers() {
    const users = getArr(KEYS.USERS);
    let csv = 'Name,Email,Phone,Status,Bookings,Joined\n';
    users.forEach(u => {
      csv += `"${u.name}","${u.email}","${u.phone}","${u.status}",${u.bookings || 0},"${u.joined}"\n`;
    });
    downloadCSV(csv, 'users_export.csv');
    showToast('Users exported!', 'success');
  }

  // =========================================================================
  // TEMPLE ADMIN MANAGEMENT
  // =========================================================================
  function initTempleAdmins() {
    if (!checkAuth()) return;
    renderAdmins();
  }

  function renderAdmins() {
    const admins = getArr(KEYS.TEMPLE_ADMINS);
    const temples = getArr(KEYS.TEMPLES);
    const search = (document.getElementById('admin-search')?.value || '').toLowerCase();

    let filtered = admins.filter(a => {
      if (search && !a.name.toLowerCase().includes(search) && !a.email.toLowerCase().includes(search)) return false;
      return true;
    });

    setText('total-admins', admins.length);
    setText('active-admins', admins.filter(a => a.status === 'active').length);
    setText('unassigned-temples', temples.filter(t => !t.admin && t.status === 'approved').length);

    const tbody = document.getElementById('admins-table-body');
    if (tbody) {
      tbody.innerHTML = filtered.map(a => `
        <tr>
          <td class="avatar-cell">
            <div class="avatar-sm" style="background:${avatarBg(a.name)};">${a.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
            <strong>${a.name}</strong>
          </td>
          <td>${a.email}</td>
          <td>${a.templeName || '<span class="sa-text-muted">Not assigned</span>'}</td>
          <td>${statusBadge(a.status)}</td>
          <td>${formatDate(a.lastLogin)}</td>
          <td class="sa-actions">
            <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.editAdmin('${a.id}')"><i class="fas fa-edit"></i></button>
            ${a.status === 'active'
              ? `<button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.toggleAdminStatus('${a.id}','inactive')"><i class="fas fa-ban"></i></button>`
              : `<button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.toggleAdminStatus('${a.id}','active')"><i class="fas fa-check"></i></button>`}
            <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.deleteAdmin('${a.id}')" style="color:var(--sa-danger);"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      `).join('') || '<tr><td colspan="6" class="sa-text-muted" style="text-align:center; padding:40px;">No temple admins found</td></tr>';
    }
  }

  function filterAdmins() { renderAdmins(); }

  function populateAdminAssignDropdown(selectId, current) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    const admins = getArr(KEYS.TEMPLE_ADMINS);
    sel.innerHTML = '<option value="">No admin assigned</option>';
    admins.filter(a => a.status === 'active').forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.name; opt.textContent = a.name;
      if (current === a.name) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function populateTempleDropdown(selectId, current) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    const temples = getArr(KEYS.TEMPLES);
    sel.innerHTML = '<option value="">Select temple</option>';
    temples.filter(t => t.status === 'approved').forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id; opt.textContent = t.name;
      if (current === t.id) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function openAddAdmin() {
    document.getElementById('admin-modal-title').textContent = 'Add Temple Admin';
    document.getElementById('edit-admin-id').value = '';
    ['admin-name','admin-email','admin-phone','admin-username','admin-password'].forEach(id => {
      document.getElementById(id).value = '';
    });
    populateTempleDropdown('admin-temple-assign');
    openModal('admin-modal');
  }

  function editAdmin(id) {
    const a = getArr(KEYS.TEMPLE_ADMINS).find(x => x.id === id);
    if (!a) return;
    document.getElementById('admin-modal-title').textContent = 'Edit Temple Admin';
    document.getElementById('edit-admin-id').value = id;
    document.getElementById('admin-name').value = a.name;
    document.getElementById('admin-email').value = a.email;
    document.getElementById('admin-phone').value = a.phone || '';
    document.getElementById('admin-username').value = a.username || '';
    document.getElementById('admin-password').value = '';
    populateTempleDropdown('admin-temple-assign', a.templeId);
    openModal('admin-modal');
  }

  function saveAdmin() {
    const name = document.getElementById('admin-name').value.trim();
    const email = document.getElementById('admin-email').value.trim();
    if (!name || !email) { showToast('Please fill required fields', 'error'); return; }

    const admins = getArr(KEYS.TEMPLE_ADMINS);
    const editId = document.getElementById('edit-admin-id').value;
    const templeId = document.getElementById('admin-temple-assign').value;
    const temples = getArr(KEYS.TEMPLES);
    const temple = temples.find(t => t.id === templeId);

    if (editId) {
      const idx = admins.findIndex(a => a.id === editId);
      if (idx >= 0) {
        admins[idx].name = name;
        admins[idx].email = email;
        admins[idx].phone = document.getElementById('admin-phone').value.trim();
        admins[idx].username = document.getElementById('admin-username').value.trim();
        const pw = document.getElementById('admin-password').value;
        if (pw) admins[idx].password = pw;
        admins[idx].templeId = templeId;
        admins[idx].templeName = temple ? temple.name : '';
        addActivity(`Temple admin <strong>${name}</strong> updated`, 'blue');
      }
    } else {
      admins.push({
        id: genId(), name, email,
        phone: document.getElementById('admin-phone').value.trim(),
        username: document.getElementById('admin-username').value.trim(),
        password: document.getElementById('admin-password').value,
        templeId, templeName: temple ? temple.name : '',
        status: 'active', lastLogin: null
      });
      addActivity(`New temple admin <strong>${name}</strong> added`, 'green');
    }

    set(KEYS.TEMPLE_ADMINS, admins);
    closeModal('admin-modal');
    renderAdmins();
    showToast(editId ? 'Admin updated!' : 'Admin added!', 'success');
  }

  function toggleAdminStatus(id, status) {
    const admins = getArr(KEYS.TEMPLE_ADMINS);
    const a = admins.find(x => x.id === id);
    if (a) {
      a.status = status;
      set(KEYS.TEMPLE_ADMINS, admins);
      addActivity(`Temple admin <strong>${a.name}</strong> ${status === 'active' ? 'activated' : 'deactivated'}`, status === 'active' ? 'green' : 'red');
      renderAdmins();
      showToast(`Admin ${status === 'active' ? 'activated' : 'deactivated'}`, status === 'active' ? 'success' : 'warning');
    }
  }

  function deleteAdmin(id) {
    if (!confirm('Delete this temple admin?')) return;
    let admins = getArr(KEYS.TEMPLE_ADMINS);
    const a = admins.find(x => x.id === id);
    admins = admins.filter(x => x.id !== id);
    set(KEYS.TEMPLE_ADMINS, admins);
    if (a) addActivity(`Temple admin <strong>${a.name}</strong> removed`, 'red');
    renderAdmins();
    showToast('Admin removed', 'info');
  }

  // =========================================================================
  // REPORTS & ANALYTICS
  // =========================================================================
  function initReports() {
    if (!checkAuth()) return;
    const temples = getArr(KEYS.TEMPLES);
    const users = getArr(KEYS.USERS);
    const bookings = getArr(KEYS.APP_BOOKINGS);
    const donations = getArr(KEYS.APP_DONATIONS);

    setText('r-temples', temples.length);
    setText('r-users', users.length);
    setText('r-bookings', bookings.length);
    setText('r-revenue', formatCurrency(
      donations.reduce((s, d) => s + (d.amount || 0), 0) + bookings.reduce((s, b) => s + (b.price || 0), 0)
    ));

    // Bookings chart
    renderBarChart('bookings-chart', ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], [8,15,12,20,18,30,25]);

    // Donations chart
    renderBarChart('donations-chart', ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], [2000,3500,1500,5000,4200,8000,6500]);

    // Users chart
    renderBarChart('users-chart', ['Jan','Feb','Mar','Apr','May','Jun'], [20,35,50,42,65,80]);

    // Top poojas
    const poojaTable = document.getElementById('top-poojas-table');
    if (poojaTable) {
      const poojas = [
        { name: 'Archana', bookings: 120, revenue: 12000 },
        { name: 'Abhishekam', bookings: 85, revenue: 42500 },
        { name: 'Ganapathi Homam', bookings: 45, revenue: 67500 },
        { name: 'Navagraha Pooja', bookings: 38, revenue: 19000 },
        { name: 'Sahasranama Archana', bookings: 30, revenue: 15000 }
      ];
      const total = poojas.reduce((s, p) => s + p.bookings, 0);
      poojaTable.innerHTML = poojas.map(p => `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td>${p.bookings}</td>
          <td>${formatCurrency(p.revenue)}</td>
          <td><div style="background:#e3f2fd;border-radius:4px;height:8px;width:100%;"><div style="background:var(--sa-primary);border-radius:4px;height:100%;width:${(p.bookings/total*100).toFixed(0)}%;"></div></div></td>
        </tr>
      `).join('');
    }

    // Top donors
    const donorTable = document.getElementById('top-donors-table');
    if (donorTable) {
      const donors = [
        { name: 'Lakshmi Devi', total: 25000, count: 8, last: '2026-03-08' },
        { name: 'Meena S', total: 18000, count: 6, last: '2026-03-05' },
        { name: 'Priya Sharma', total: 15000, count: 5, last: '2026-03-01' },
        { name: 'Kavitha M', total: 12000, count: 4, last: '2026-02-28' }
      ];
      donorTable.innerHTML = donors.map(d => `
        <tr>
          <td class="avatar-cell">
            <div class="avatar-sm" style="background:${avatarBg(d.name)};">${d.name[0]}</div>
            <strong>${d.name}</strong>
          </td>
          <td>${formatCurrency(d.total)}</td>
          <td>${d.count}</td>
          <td>${formatDate(d.last)}</td>
        </tr>
      `).join('');
    }

    // Temple stats
    const templeStatsTable = document.getElementById('temples-stats-table');
    if (templeStatsTable) {
      templeStatsTable.innerHTML = temples.filter(t => t.status === 'approved').slice(0, 8).map(t => `
        <tr>
          <td><strong>${t.name}</strong></td>
          <td>${Math.floor(Math.random() * 500 + 100)}</td>
          <td>${Math.floor(Math.random() * 80 + 10)}</td>
          <td>${formatCurrency(Math.floor(Math.random() * 50000 + 5000))}</td>
          <td><span style="color:var(--sa-accent);">${'★'.repeat(Math.floor(Math.random()*2+3))}${'☆'.repeat(5-Math.floor(Math.random()*2+3))}</span> ${(Math.random()*1.5+3.5).toFixed(1)}</td>
        </tr>
      `).join('');
    }

    // Active users
    const activeTable = document.getElementById('active-users-table');
    if (activeTable) {
      const users2 = getArr(KEYS.USERS).filter(u => u.status === 'active').slice(0, 5);
      activeTable.innerHTML = users2.map(u => `
        <tr>
          <td class="avatar-cell">
            <div class="avatar-sm" style="background:${avatarBg(u.name)};">${u.name[0]}</div>
            <strong>${u.name}</strong>
          </td>
          <td>${u.bookings || 0}</td>
          <td>${u.donations || 0}</td>
          <td>${Math.floor(Math.random() * 5)}</td>
          <td>${statusBadge('active')}</td>
        </tr>
      `).join('');
    }
  }

  function exportAllReports() {
    showToast('Reports exported successfully!', 'success');
  }

  // =========================================================================
  // FINANCIAL MANAGEMENT
  // =========================================================================
  function initFinance() {
    if (!checkAuth()) return;
    const bookings = getArr(KEYS.APP_BOOKINGS);
    const donations = getArr(KEYS.APP_DONATIONS);
    const poojaRev = bookings.reduce((s, b) => s + (b.price || 0), 0);
    const donationTotal = donations.reduce((s, d) => s + (d.amount || 0), 0);
    const total = poojaRev + donationTotal;

    setText('f-total-revenue', formatCurrency(total));
    setText('f-donations', formatCurrency(donationTotal));
    setText('f-pooja-revenue', formatCurrency(poojaRev));
    setText('f-homam-revenue', formatCurrency(Math.floor(poojaRev * 0.3)));

    renderBarChart('monthly-revenue-chart', ['Oct','Nov','Dec','Jan','Feb','Mar'], [15000,22000,35000,28000,42000,total || 38000]);

    // Revenue by category
    const catEl = document.getElementById('revenue-by-category');
    if (catEl) {
      const cats = [
        { name: 'Pooja Bookings', amount: poojaRev || 25000, color: '#1a237e' },
        { name: 'Donations', amount: donationTotal || 18000, color: '#2e7d32' },
        { name: 'Homam Services', amount: Math.floor((poojaRev || 25000) * 0.3), color: '#e65100' },
        { name: 'Annadhanam', amount: 5000, color: '#6a1b9a' }
      ];
      catEl.innerHTML = cats.map(c => `
        <div class="sa-flex-between" style="padding:10px 0; border-bottom:1px solid #f0f0f0;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:12px;height:12px;border-radius:3px;background:${c.color};"></div>
            <span>${c.name}</span>
          </div>
          <strong>${formatCurrency(c.amount)}</strong>
        </div>
      `).join('');
    }

    // Revenue by temple
    const templeEl = document.getElementById('revenue-by-temple');
    if (templeEl) {
      const temples = getArr(KEYS.TEMPLES).filter(t => t.status === 'approved').slice(0, 5);
      templeEl.innerHTML = temples.map(t => `
        <div class="sa-flex-between" style="padding:10px 0; border-bottom:1px solid #f0f0f0;">
          <span>${t.name}</span>
          <strong>${formatCurrency(Math.floor(Math.random() * 20000 + 5000))}</strong>
        </div>
      `).join('');
    }

    // Donation records
    const donTable = document.getElementById('donation-records-table');
    if (donTable) {
      const records = donations.length > 0 ? donations : [
        { date: '2026-03-10', amount: 5000, type: 'Annadhanam' },
        { date: '2026-03-08', amount: 2000, type: 'General' },
        { date: '2026-03-05', amount: 10000, type: 'Temple Construction' },
        { date: '2026-03-01', amount: 1000, type: 'Festival' }
      ];
      donTable.innerHTML = records.map((d, i) => `
        <tr>
          <td>${formatDate(d.date)}</td>
          <td>${d.donorName || ('Devotee ' + (i + 1))}</td>
          <td>${d.type || 'General'}</td>
          <td><strong>${formatCurrency(d.amount)}</strong></td>
          <td>${d.temple || '-'}</td>
          <td><button class="sa-btn sa-btn-outline sa-btn-sm"><i class="fas fa-receipt"></i></button></td>
        </tr>
      `).join('');
    }

    // Pooja revenue
    const poojaTable = document.getElementById('pooja-revenue-table');
    if (poojaTable) {
      const poojas = [
        { name: 'Archana', bookings: 120, price: 100 },
        { name: 'Abhishekam', bookings: 85, price: 500 },
        { name: 'Ganapathi Homam', bookings: 45, price: 1500 },
        { name: 'Navagraha Pooja', bookings: 38, price: 500 },
        { name: 'Sahasranama Archana', bookings: 30, price: 500 },
        { name: 'Lakshmi Pooja', bookings: 25, price: 300 }
      ];
      poojaTable.innerHTML = poojas.map(p => `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td>${p.bookings}</td>
          <td>${formatCurrency(p.price)}</td>
          <td><strong>${formatCurrency(p.bookings * p.price)}</strong></td>
          <td>Multiple Temples</td>
        </tr>
      `).join('');
    }

    // Transactions
    const txnTable = document.getElementById('transactions-table');
    if (txnTable) {
      const txns = [];
      bookings.forEach(b => txns.push({ id: b.id, date: b.date, user: b.name, type: 'booking', details: b.pooja, amount: b.price, status: b.status || 'Confirmed' }));
      donations.forEach(d => txns.push({ id: d.id, date: d.date, user: 'Devotee', type: 'donation', details: d.type, amount: d.amount, status: 'Completed' }));
      if (txns.length === 0) {
        txns.push(
          { id: 'TXN001', date: '2026-03-10', user: 'Lakshmi Devi', type: 'booking', details: 'Abhishekam', amount: 500, status: 'Confirmed' },
          { id: 'TXN002', date: '2026-03-09', user: 'Ramesh Kumar', type: 'donation', details: 'Annadhanam', amount: 5000, status: 'Completed' },
          { id: 'TXN003', date: '2026-03-08', user: 'Priya Sharma', type: 'booking', details: 'Ganapathi Homam', amount: 1500, status: 'Confirmed' }
        );
      }
      txnTable.innerHTML = txns.slice(0, 20).map(t => `
        <tr>
          <td class="sa-text-muted">#${String(t.id).slice(-6)}</td>
          <td>${formatDate(t.date)}</td>
          <td>${t.user}</td>
          <td><span class="sa-badge ${t.type === 'booking' ? 'sa-badge-info' : 'sa-badge-success'}">${t.type}</span></td>
          <td>${t.details}</td>
          <td><strong>${formatCurrency(t.amount)}</strong></td>
          <td>${statusBadge(t.status?.toLowerCase() || 'active')}</td>
        </tr>
      `).join('');
    }
  }

  function exportFinance() {
    showToast('Financial data exported!', 'success');
  }

  // =========================================================================
  // CONTENT CONTROL
  // =========================================================================
  function initContent() {
    if (!checkAuth()) return;
    const posts = getArr(KEYS.POSTS);
    const communityPosts = getArr(KEYS.COMMUNITY_POSTS);
    const reviews = getArr(KEYS.REVIEWS);
    const flagged = getArr(KEYS.FLAGGED);

    const totalLikes = posts.reduce((s, p) => s + (p.likes || 0), 0)
      + communityPosts.reduce((s, p) => s + (p.likes || 0), 0);

    setText('c-posts', posts.length);
    setText('c-community', communityPosts.length);
    setText('c-likes', totalLikes);
    setText('c-reviews', countAllReviews());
    setText('c-flagged', flagged.length);
    if (document.getElementById('flagged-badge')) document.getElementById('flagged-badge').textContent = flagged.length;

    renderContentPosts();
    renderCommunityPosts();
    renderContentReviews();
    renderContentFlagged();
  }

  function countAllReviews() {
    const appReviews = get(KEYS.APP_REVIEWS) || {};
    let count = 0;
    Object.values(appReviews).forEach(arr => { if (Array.isArray(arr)) count += arr.length; });
    return count || 15;
  }

  function renderContentPosts() {
    const posts = getArr(KEYS.POSTS);
    const tbody = document.getElementById('posts-table-body');
    if (!tbody) return;
    tbody.innerHTML = posts.map(p => `
      <tr>
        <td style="max-width:250px;"><strong>${p.caption.substring(0, 50)}${p.caption.length > 50 ? '...' : ''}</strong></td>
        <td>${p.temple}</td>
        <td>${formatDate(p.date)}</td>
        <td>${p.likes || 0}</td>
        <td>${p.comments || 0}</td>
        <td>${statusBadge(p.status)}</td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.removePost('${p.id}')"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="7" class="sa-text-muted" style="text-align:center; padding:40px;">No posts found</td></tr>';
  }

  function renderCommunityPosts() {
    const tbody = document.getElementById('community-table-body');
    if (!tbody) return;
    const posts = getArr(KEYS.COMMUNITY_POSTS);
    const catFilter = document.getElementById('community-category-filter')?.value || '';
    const statusFilter = document.getElementById('community-status-filter')?.value || '';

    let filtered = posts;
    if (catFilter) filtered = filtered.filter(p => p.category === catFilter);
    if (statusFilter) filtered = filtered.filter(p => p.status === statusFilter);

    tbody.innerHTML = filtered.map(p => {
      const catLabels = { festival: '🎉 Festival', experience: '🙏 Experience', annadhanam: '🍚 Annadhanam', event: '📅 Event', travel: '📸 Travel' };
      return `<tr>
        <td class="avatar-cell">
          <div class="avatar-sm" style="background:${avatarBg(p.userName)};">${(p.userName||'U')[0]}</div>
          <strong>${p.userName || 'User'}</strong>
        </td>
        <td style="max-width:200px;">${(p.caption || '').substring(0, 60)}${(p.caption||'').length > 60 ? '...' : ''}</td>
        <td><span class="sa-badge sa-badge-info">${catLabels[p.category] || p.category}</span></td>
        <td>${p.temple || '-'}</td>
        <td>${p.likes || 0}</td>
        <td>${statusBadge(p.status || 'approved')}</td>
        <td class="sa-actions">
          ${p.status === 'pending' ? `<button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.approveCommunityPost('${p.id}')"><i class="fas fa-check"></i></button>` : ''}
          ${p.status === 'pending' ? `<button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.rejectCommunityPost('${p.id}')"><i class="fas fa-times"></i></button>` : ''}
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.removeCommunityPost('${p.id}')" style="color:var(--sa-danger);"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    }).join('') || '<tr><td colspan="7" class="sa-text-muted" style="text-align:center; padding:40px;">No community posts found</td></tr>';
  }

  function filterCommunityPosts() { renderCommunityPosts(); }

  function approveCommunityPost(id) {
    const posts = getArr(KEYS.COMMUNITY_POSTS);
    const p = posts.find(x => x.id === id);
    if (p) {
      p.status = 'approved';
      set(KEYS.COMMUNITY_POSTS, posts);
      addActivity(`Community post by <strong>${p.userName}</strong> approved`, 'green');
      renderCommunityPosts();
      showToast('Post approved!', 'success');
    }
  }

  function rejectCommunityPost(id) {
    const posts = getArr(KEYS.COMMUNITY_POSTS);
    const p = posts.find(x => x.id === id);
    if (p) {
      p.status = 'rejected';
      set(KEYS.COMMUNITY_POSTS, posts);
      addActivity(`Community post by <strong>${p.userName}</strong> rejected`, 'red');
      renderCommunityPosts();
      showToast('Post rejected', 'info');
    }
  }

  function removeCommunityPost(id) {
    if (!confirm('Remove this community post?')) return;
    let posts = getArr(KEYS.COMMUNITY_POSTS);
    const p = posts.find(x => x.id === id);
    posts = posts.filter(x => x.id !== id);
    set(KEYS.COMMUNITY_POSTS, posts);
    if (p) addActivity(`Community post by <strong>${p.userName}</strong> removed`, 'red');
    renderCommunityPosts();
    showToast('Post removed', 'info');
  }

  function renderContentReviews() {
    const tbody = document.getElementById('reviews-table-body');
    if (!tbody) return;
    const reviews = [
      { user: 'Ramesh Kumar', temple: 'Meenakshi Amman Temple', rating: 5, text: 'Amazing temple experience!', date: '2026-03-10' },
      { user: 'Priya Sharma', temple: 'Brihadeeswarar Temple', rating: 4, text: 'Beautiful architecture, great darshan', date: '2026-03-08' },
      { user: 'Lakshmi Devi', temple: 'Tirumala Venkateswara Temple', rating: 5, text: 'Spiritual experience like no other', date: '2026-03-05' },
      { user: 'Arun Venkat', temple: 'Nataraja Temple', rating: 4, text: 'Peaceful atmosphere, well maintained', date: '2026-03-01' }
    ];
    tbody.innerHTML = reviews.map(r => `
      <tr>
        <td><strong>${r.user}</strong></td>
        <td>${r.temple}</td>
        <td><span style="color:var(--sa-accent);">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span></td>
        <td style="max-width:200px;">${r.text}</td>
        <td>${formatDate(r.date)}</td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-outline sa-btn-sm" style="color:var(--sa-danger);" onclick="showToast('Review removed','info')"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  function renderContentFlagged() {
    const tbody = document.getElementById('flagged-table-body');
    if (!tbody) return;
    const flagged = getArr(KEYS.FLAGGED);
    if (flagged.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="sa-text-muted" style="text-align:center; padding:40px;">No flagged content - all clear!</td></tr>';
      return;
    }
    tbody.innerHTML = flagged.map(f => `
      <tr>
        <td><span class="sa-badge sa-badge-warning">${f.type}</span></td>
        <td>${f.content}</td>
        <td>${f.reportedBy}</td>
        <td>${f.reason}</td>
        <td>${formatDate(f.date)}</td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.dismissFlagged('${f.id}')"><i class="fas fa-check"></i></button>
          <button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.removeFlagged('${f.id}')"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  function filterContent(type, val) { /* simple filter - could be expanded */ }

  function openAddPost() {
    populateTempleDropdownGeneric('post-temple');
    document.getElementById('post-caption').value = '';
    document.getElementById('post-type').value = 'update';
    openModal('post-modal');
  }

  function populateTempleDropdownGeneric(selectId) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    const temples = getArr(KEYS.TEMPLES).filter(t => t.status === 'approved');
    sel.innerHTML = '<option value="">Select temple</option>';
    temples.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.name; opt.textContent = t.name;
      sel.appendChild(opt);
    });
  }

  function savePost() {
    const temple = document.getElementById('post-temple').value;
    const caption = document.getElementById('post-caption').value.trim();
    const type = document.getElementById('post-type').value;
    if (!temple || !caption) { showToast('Please fill all fields', 'error'); return; }

    const posts = getArr(KEYS.POSTS);
    posts.unshift({ id: genId(), temple, caption, type, date: new Date().toISOString(), likes: 0, comments: 0, status: 'published' });
    set(KEYS.POSTS, posts);
    closeModal('post-modal');
    renderContentPosts();
    addActivity(`New post published for <strong>${temple}</strong>`, 'green');
    showToast('Post published!', 'success');
  }

  function removePost(id) {
    if (!confirm('Remove this post?')) return;
    let posts = getArr(KEYS.POSTS);
    posts = posts.filter(p => p.id !== id);
    set(KEYS.POSTS, posts);
    renderContentPosts();
    showToast('Post removed', 'info');
  }

  function dismissFlagged(id) {
    let flagged = getArr(KEYS.FLAGGED);
    flagged = flagged.filter(f => f.id !== id);
    set(KEYS.FLAGGED, flagged);
    renderContentFlagged();
    showToast('Content approved', 'success');
  }

  function removeFlagged(id) {
    let flagged = getArr(KEYS.FLAGGED);
    flagged = flagged.filter(f => f.id !== id);
    set(KEYS.FLAGGED, flagged);
    renderContentFlagged();
    showToast('Content removed', 'info');
  }

  // =========================================================================
  // NOTIFICATIONS (Enhanced with System Alerts & Activity Feed)
  // =========================================================================
  const ALERTS_KEY = 'sa_system_alerts';
  var _alertFilter = 'all';

  function seedSystemAlerts() {
    if (get(ALERTS_KEY)) return;
    const now = Date.now();
    const h = 3600000; // 1 hour
    const alerts = [
      { id: genId(), category: 'booking', icon: 'fa-calendar-check', color: 'blue', title: 'New Booking Received', message: '<strong>Ramesh Kumar</strong> booked <strong>Ganapathi Homam</strong> at Meenakshi Amman Temple for Mar 15, 2026. Amount: ₹2,500.', time: new Date(now - h * 0.5).toISOString(), read: false, priority: 'normal' },
      { id: genId(), category: 'booking', icon: 'fa-clock', color: 'orange', title: 'Booking Pending Approval', message: '<strong>Lakshmi Devi</strong> requested <strong>Wedding Ceremony</strong> at Brihadeeswarar Temple. 150 guests. Requires Super Admin approval.', time: new Date(now - h * 1).toISOString(), read: false, priority: 'high' },
      { id: genId(), category: 'donation', icon: 'fa-hand-holding-heart', color: 'green', title: 'Large Donation Received', message: '<strong>Venkatesh Iyer</strong> donated <strong>₹25,000</strong> for Annadhanam at Tirumala Venkateswara Temple.', time: new Date(now - h * 2).toISOString(), read: false, priority: 'normal' },
      { id: genId(), category: 'donation', icon: 'fa-indian-rupee-sign', color: 'green', title: 'Daily Donation Goal Reached', message: 'Meenakshi Amman Temple has reached its daily Annadhanam donation goal of ₹25,000.', time: new Date(now - h * 3).toISOString(), read: false, priority: 'normal' },
      { id: genId(), category: 'user', icon: 'fa-user-plus', color: 'blue', title: 'New User Registration', message: '<strong>Priya Shankar</strong> registered on the platform. Email: priya.s@email.com. Pending verification.', time: new Date(now - h * 4).toISOString(), read: false, priority: 'normal' },
      { id: genId(), category: 'user', icon: 'fa-user-check', color: 'green', title: 'User Verification Request', message: '<strong>Arun Prakash</strong> submitted identity verification documents. Awaiting review.', time: new Date(now - h * 5).toISOString(), read: false, priority: 'high' },
      { id: genId(), category: 'temple', icon: 'fa-place-of-worship', color: 'orange', title: 'Temple Registration Pending', message: '<strong>Vaitheeswaran Koil</strong> submitted a registration request. Location: Vaitheeswaran, Tamil Nadu. Awaiting approval.', time: new Date(now - h * 6).toISOString(), read: false, priority: 'high' },
      { id: genId(), category: 'temple', icon: 'fa-star', color: 'purple', title: 'New Temple Review', message: '<strong>Suresh B</strong> left a 5-star review for <strong>Nataraja Temple, Chidambaram</strong>: "Divine experience, beautifully maintained."', time: new Date(now - h * 7).toISOString(), read: true, priority: 'normal' },
      { id: genId(), category: 'system', icon: 'fa-server', color: 'blue', title: 'Daily Backup Completed', message: 'Automatic daily backup completed successfully at 03:00 AM. All data secured.', time: new Date(now - h * 8).toISOString(), read: true, priority: 'normal' },
      { id: genId(), category: 'system', icon: 'fa-shield-halved', color: 'red', title: 'Failed Login Attempt', message: '3 failed login attempts detected from IP 192.168.1.45. Account temporarily locked for security.', time: new Date(now - h * 9).toISOString(), read: false, priority: 'urgent' },
      { id: genId(), category: 'booking', icon: 'fa-times-circle', color: 'red', title: 'Booking Cancelled', message: '<strong>Karthik R</strong> cancelled his <strong>Archana Pooja</strong> booking at Ramanathaswamy Temple. Refund of ₹500 initiated.', time: new Date(now - h * 10).toISOString(), read: true, priority: 'normal' },
      { id: genId(), category: 'donation', icon: 'fa-hand-holding-heart', color: 'green', title: 'Recurring Donation Set Up', message: '<strong>Meena Sundaram</strong> set up a monthly recurring donation of <strong>₹5,000</strong> for temple maintenance.', time: new Date(now - h * 12).toISOString(), read: true, priority: 'normal' },
      { id: genId(), category: 'system', icon: 'fa-bell', color: 'orange', title: 'Storage Usage Warning', message: 'Storage usage has reached <strong>85%</strong>. Consider archiving old records or upgrading storage plan.', time: new Date(now - h * 15).toISOString(), read: true, priority: 'high' },
      { id: genId(), category: 'user', icon: 'fa-flag', color: 'red', title: 'User Report Filed', message: '<strong>Community post</strong> by user "DevoteeKrishna" flagged for inappropriate content. Review required.', time: new Date(now - h * 18).toISOString(), read: true, priority: 'high' },
      { id: genId(), category: 'booking', icon: 'fa-check-circle', color: 'green', title: 'Booking Auto-Confirmed', message: '<strong>Saranya M</strong>\'s <strong>Motta Seva</strong> booking at Palani Murugan Temple auto-confirmed. Token: MOT-2026-089.', time: new Date(now - h * 20).toISOString(), read: true, priority: 'normal' },
      { id: genId(), category: 'temple', icon: 'fa-video', color: 'purple', title: 'Live Darshan Stream Started', message: '<strong>Meenakshi Amman Temple</strong> live darshan stream is now active. 42 viewers watching.', time: new Date(now - h * 22).toISOString(), read: true, priority: 'normal' },
      { id: genId(), category: 'system', icon: 'fa-code-branch', color: 'blue', title: 'App Update Available', message: 'Temple Digital App <strong>v1.1.0</strong> is ready for deployment. New features: improved booking flow, Tamil language support.', time: new Date(now - h * 24).toISOString(), read: true, priority: 'normal' }
    ];
    set(ALERTS_KEY, alerts);
  }

  function initNotifications() {
    if (!checkAuth()) return;
    seedSystemAlerts();

    const alerts = getArr(ALERTS_KEY);
    const notifs = getArr(KEYS.NOTIFICATIONS);
    const today = new Date().toDateString();
    const todayAlerts = alerts.filter(a => new Date(a.time).toDateString() === today).length;
    const unread = alerts.filter(a => !a.read).length;

    setText('n-total', alerts.length);
    setText('n-unread', unread);
    setText('n-announcements', notifs.length);
    setText('n-alerts', alerts.filter(a => a.priority === 'high' || a.priority === 'urgent').length);
    setText('n-today', todayAlerts);
    setText('alerts-badge', unread);

    // Chip counts
    setText('chip-all', alerts.length);
    setText('chip-booking', alerts.filter(a => a.category === 'booking').length);
    setText('chip-donation', alerts.filter(a => a.category === 'donation').length);
    setText('chip-user', alerts.filter(a => a.category === 'user').length);
    setText('chip-temple', alerts.filter(a => a.category === 'temple').length);
    setText('chip-system', alerts.filter(a => a.category === 'system').length);

    populateTempleDropdownGeneric('notif-temple');
    renderSystemAlerts();
    renderActivityTimeline();
    renderNotifications();
    renderNotifDropdown();
  }

  function renderSystemAlerts() {
    const alerts = getArr(ALERTS_KEY);
    const search = (document.getElementById('alert-search') || {}).value || '';
    const container = document.getElementById('system-alerts-list');
    if (!container) return;

    let filtered = alerts;
    if (_alertFilter !== 'all') filtered = filtered.filter(a => a.category === _alertFilter);
    if (search) filtered = filtered.filter(a => (a.title + a.message).toLowerCase().includes(search.toLowerCase()));

    if (!filtered.length) {
      container.innerHTML = '<div class="sa-card" style="text-align:center; padding:40px; color:var(--sa-text-muted);"><i class="fas fa-bell-slash" style="font-size:2rem; margin-bottom:10px; display:block;"></i>No notifications found</div>';
      return;
    }

    container.innerHTML = filtered.map(a => `
      <div class="sa-card" style="padding:14px 18px; margin-bottom:8px; border-left:4px solid var(--sa-${a.color === 'blue' ? 'info' : a.color === 'green' ? 'success' : a.color === 'orange' ? 'warning' : a.color === 'red' ? 'danger' : 'info'}); ${!a.read ? 'background:#f8f9ff;' : ''}">
        <div style="display:flex; align-items:flex-start; gap:14px;">
          <div class="notif-icon-circle ${a.color}"><i class="fas ${a.icon}"></i></div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <div style="display:flex; align-items:center; gap:8px;">
                ${!a.read ? '<span class="unread-dot"></span>' : ''}
                <strong style="font-size:0.9rem;">${a.title}</strong>
                ${a.priority === 'urgent' ? '<span class="sa-badge sa-badge-danger">Urgent</span>' : a.priority === 'high' ? '<span class="sa-badge sa-badge-warning">High</span>' : ''}
              </div>
              <span style="font-size:0.72rem; color:var(--sa-text-muted); white-space:nowrap;">${timeAgo(a.time)}</span>
            </div>
            <p style="font-size:0.83rem; color:var(--sa-text-secondary); margin:0; line-height:1.5;">${a.message}</p>
            <div style="margin-top:8px; display:flex; gap:6px;">
              ${!a.read ? '<button class="sa-btn sa-btn-sm sa-btn-outline" onclick="SA.markAlertRead(\'' + a.id + '\')"><i class="fas fa-check"></i> Mark Read</button>' : '<span style="font-size:0.72rem; color:var(--sa-text-muted);"><i class="fas fa-check-double"></i> Read</span>'}
              <button class="sa-btn sa-btn-sm sa-btn-outline" onclick="SA.viewAlertDetail('${a.id}')"><i class="fas fa-eye"></i> Details</button>
              <button class="sa-btn sa-btn-sm sa-btn-outline" onclick="SA.deleteAlert('${a.id}')" style="color:var(--sa-danger);"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderActivityTimeline() {
    const container = document.getElementById('activity-timeline');
    if (!container) return;
    const activities = getArr(KEYS.ACTIVITY).slice(0, 20);
    if (!activities.length) {
      container.innerHTML = '<p style="text-align:center; color:var(--sa-text-muted); padding:30px;">No activity recorded yet.</p>';
      return;
    }
    container.innerHTML = activities.map(a => `
      <div class="notif-timeline-item">
        <div class="notif-timeline-dot ${a.color}"></div>
        <div class="notif-timeline-content">
          <p>${a.text}</p>
          <div class="notif-timeline-time">${timeAgo(a.time)}</div>
        </div>
      </div>
    `).join('');
  }

  function renderNotifDropdown() {
    const alerts = getArr(ALERTS_KEY).slice(0, 8);
    const body = document.getElementById('notif-dropdown-body');
    const countEl = document.getElementById('bell-unread-count');
    const unread = getArr(ALERTS_KEY).filter(a => !a.read).length;

    if (countEl) {
      countEl.textContent = unread > 0 ? (unread > 9 ? '9+' : unread) : '';
      countEl.setAttribute('data-count', unread);
    }

    if (!body) return;
    if (!alerts.length) {
      body.innerHTML = '<div style="padding:30px; text-align:center; color:var(--sa-text-muted);">No notifications</div>';
      return;
    }
    body.innerHTML = alerts.map(a => `
      <div class="notif-dropdown-item ${a.read ? '' : 'unread'}" onclick="SA.markAlertRead('${a.id}')">
        <div class="notif-icon-circle ${a.color}"><i class="fas ${a.icon}"></i></div>
        <div class="notif-dropdown-text">
          <p>${!a.read ? '<strong>' : ''}${a.title}${!a.read ? '</strong>' : ''}</p>
          <small>${timeAgo(a.time)}</small>
        </div>
      </div>
    `).join('');
  }

  function toggleNotifDropdown(e) {
    e.stopPropagation();
    const dd = document.getElementById('notif-dropdown');
    if (dd) dd.classList.toggle('show');
  }

  function closeNotifDropdown() {
    const dd = document.getElementById('notif-dropdown');
    if (dd) dd.classList.remove('show');
  }

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    const dd = document.getElementById('notif-dropdown');
    if (dd && dd.classList.contains('show') && !e.target.closest('.notif-bell-wrap')) {
      dd.classList.remove('show');
    }
  });

  function filterAlerts(category, btn) {
    _alertFilter = category;
    document.querySelectorAll('.notif-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderSystemAlerts();
  }

  function searchAlerts() { renderSystemAlerts(); }

  function markAlertRead(id) {
    const alerts = getArr(ALERTS_KEY);
    const alert = alerts.find(a => a.id === id);
    if (alert) alert.read = true;
    set(ALERTS_KEY, alerts);
    renderSystemAlerts();
    renderNotifDropdown();
    // Update stats
    const unread = alerts.filter(a => !a.read).length;
    setText('n-unread', unread);
    setText('alerts-badge', unread);
  }

  function markAllAlertsRead() {
    const alerts = getArr(ALERTS_KEY);
    alerts.forEach(a => a.read = true);
    set(ALERTS_KEY, alerts);
    renderSystemAlerts();
    renderNotifDropdown();
    setText('n-unread', 0);
    setText('alerts-badge', 0);
    showToast('All notifications marked as read', 'success');
  }

  function markAllRead(e) {
    e.stopPropagation();
    markAllAlertsRead();
  }

  function clearReadAlerts() {
    let alerts = getArr(ALERTS_KEY);
    const readCount = alerts.filter(a => a.read).length;
    if (!readCount) { showToast('No read notifications to clear', 'info'); return; }
    alerts = alerts.filter(a => !a.read);
    set(ALERTS_KEY, alerts);
    initNotifications();
    showToast(readCount + ' read notifications cleared', 'info');
  }

  function viewAlertDetail(id) {
    const alerts = getArr(ALERTS_KEY);
    const a = alerts.find(x => x.id === id);
    if (!a) return;
    // Mark as read
    if (!a.read) { a.read = true; set(ALERTS_KEY, alerts); }

    const content = document.getElementById('alert-detail-content');
    if (content) {
      content.innerHTML = `
        <div style="text-align:center; margin-bottom:16px;">
          <div class="notif-icon-circle ${a.color}" style="width:56px; height:56px; font-size:1.3rem; margin:0 auto 10px;">
            <i class="fas ${a.icon}"></i>
          </div>
          <h3 style="margin:0;">${a.title}</h3>
          <div style="margin-top:6px;">
            <span class="sa-badge sa-badge-info">${a.category}</span>
            ${a.priority !== 'normal' ? (a.priority === 'urgent' ? '<span class="sa-badge sa-badge-danger">Urgent</span>' : '<span class="sa-badge sa-badge-warning">High Priority</span>') : ''}
          </div>
        </div>
        <div style="background:#f8f9fa; border-radius:10px; padding:16px; margin-bottom:12px;">
          <p style="font-size:0.88rem; line-height:1.6; margin:0;">${a.message}</p>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.78rem; color:var(--sa-text-muted);">
          <span><i class="fas fa-clock"></i> ${formatDate(a.time)} at ${new Date(a.time).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}</span>
          <span><i class="fas fa-${a.read ? 'check-double' : 'circle'}" style="color:${a.read ? 'var(--sa-success)' : 'var(--sa-primary)'}"></i> ${a.read ? 'Read' : 'Unread'}</span>
        </div>
      `;
    }
    openModal('alert-detail-modal');
    renderSystemAlerts();
    renderNotifDropdown();
    const unread = getArr(ALERTS_KEY).filter(x => !x.read).length;
    setText('n-unread', unread);
    setText('alerts-badge', unread);
  }

  function deleteAlert(id) {
    let alerts = getArr(ALERTS_KEY);
    alerts = alerts.filter(a => a.id !== id);
    set(ALERTS_KEY, alerts);
    initNotifications();
    showToast('Notification deleted', 'info');
  }

  function renderNotifications() {
    const notifs = getArr(KEYS.NOTIFICATIONS);
    const tbody = document.getElementById('notifications-table-body');
    if (!tbody) return;
    tbody.innerHTML = notifs.map(n => {
      const priorityBadge = n.priority === 'urgent' ? '<span class="sa-badge sa-badge-danger">Urgent</span>'
        : n.priority === 'high' ? '<span class="sa-badge sa-badge-warning">High</span>'
        : '<span class="sa-badge sa-badge-info">Normal</span>';
      return `
      <tr>
        <td><strong>${n.title}</strong>${n.message ? '<br><small class="sa-text-muted">' + n.message.substring(0, 60) + (n.message.length > 60 ? '...' : '') + '</small>' : ''}</td>
        <td><span class="sa-badge sa-badge-info">${n.type}</span></td>
        <td>${priorityBadge}</td>
        <td>${n.target === 'all_users' ? 'All Users' : n.target === 'all_admins' ? 'Temple Admins' : n.target}</td>
        <td>${formatDate(n.date)}</td>
        <td>${statusBadge(n.status || 'sent')}</td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.resendNotification('${n.id}')" title="Resend"><i class="fas fa-redo"></i></button>
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.deleteNotification('${n.id}')" style="color:var(--sa-danger);" title="Delete"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    }).join('') || '<tr><td colspan="7" class="sa-text-muted" style="text-align:center; padding:40px;">No notifications sent yet</td></tr>';
  }

  function sendNotification() {
    const title = document.getElementById('notif-title').value.trim();
    const message = document.getElementById('notif-message').value.trim();
    const target = document.getElementById('notif-target').value;
    const type = document.getElementById('notif-type').value;
    const priority = (document.getElementById('notif-priority') || {}).value || 'normal';

    if (!title || !message) { showToast('Please fill title and message', 'error'); return; }

    const scheduleRadio = document.querySelector('input[name="notif-schedule"]:checked');
    const isScheduled = scheduleRadio && scheduleRadio.value === 'scheduled';
    const scheduleTime = isScheduled ? (document.getElementById('notif-schedule-time') || {}).value : null;

    if (isScheduled && !scheduleTime) { showToast('Please select a schedule time', 'error'); return; }

    const notifs = getArr(KEYS.NOTIFICATIONS);
    notifs.unshift({
      id: genId(), title, message, type, target, priority,
      date: new Date().toISOString(),
      status: isScheduled ? 'scheduled' : 'sent',
      scheduledFor: scheduleTime || null
    });
    set(KEYS.NOTIFICATIONS, notifs);

    // Also add as a system alert
    const alerts = getArr(ALERTS_KEY);
    alerts.unshift({
      id: genId(), category: 'system', icon: 'fa-paper-plane', color: 'blue',
      title: 'Notification Sent: ' + title,
      message: 'Sent to <strong>' + (target === 'all_users' ? 'All Users' : target === 'all_admins' ? 'Temple Admins' : target) + '</strong>: ' + message.substring(0, 100),
      time: new Date().toISOString(), read: true, priority: 'normal'
    });
    set(ALERTS_KEY, alerts);

    document.getElementById('notif-title').value = '';
    document.getElementById('notif-message').value = '';

    addActivity(`Notification <strong>"${title}"</strong> sent to ${target.replace(/_/g, ' ')}`, 'blue');
    initNotifications();
    showToast(isScheduled ? 'Notification scheduled!' : 'Notification sent successfully!', 'success');
  }

  function previewNotification() {
    const title = document.getElementById('notif-title').value.trim() || 'Notification Title';
    const message = document.getElementById('notif-message').value.trim() || 'Notification message preview...';
    const type = (document.getElementById('notif-type') || {}).value || 'announcement';
    const priority = (document.getElementById('notif-priority') || {}).value || 'normal';

    const content = document.getElementById('notif-preview-content');
    if (content) {
      content.innerHTML = `
        <div style="background:#f8f9fa; border-radius:12px; padding:16px; border:1px solid #eee;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <div class="notif-icon-circle blue" style="width:40px; height:40px;">
              <i class="fas fa-bell"></i>
            </div>
            <div>
              <div style="font-weight:700; font-size:0.92rem;">${title}</div>
              <div style="font-size:0.72rem; color:var(--sa-text-muted);">Temple Digital App &bull; Just now</div>
            </div>
          </div>
          <p style="font-size:0.85rem; color:var(--sa-text-secondary); margin:0 0 10px; line-height:1.5;">${message}</p>
          <div style="display:flex; gap:6px;">
            <span class="sa-badge sa-badge-info">${type}</span>
            ${priority !== 'normal' ? '<span class="sa-badge sa-badge-' + (priority === 'urgent' ? 'danger' : 'warning') + '">' + priority + '</span>' : ''}
          </div>
        </div>
        <p style="font-size:0.75rem; color:var(--sa-text-muted); margin-top:10px; text-align:center;">
          <i class="fas fa-mobile-alt"></i> This is how the notification will appear on users' devices
        </p>
      `;
    }
    openModal('notif-preview-modal');
  }

  function resendNotification(id) {
    const notifs = getArr(KEYS.NOTIFICATIONS);
    const n = notifs.find(x => x.id === id);
    if (!n) return;
    notifs.unshift({
      id: genId(), title: n.title, message: n.message, type: n.type,
      target: n.target, priority: n.priority || 'normal',
      date: new Date().toISOString(), status: 'sent'
    });
    set(KEYS.NOTIFICATIONS, notifs);
    addActivity(`Notification <strong>"${n.title}"</strong> resent`, 'blue');
    initNotifications();
    showToast('Notification resent!', 'success');
  }

  function deleteNotification(id) {
    let notifs = getArr(KEYS.NOTIFICATIONS);
    notifs = notifs.filter(n => n.id !== id);
    set(KEYS.NOTIFICATIONS, notifs);
    initNotifications();
    showToast('Notification deleted', 'info');
  }

  // Helper: Add system alert programmatically (used by other modules)
  function addSystemAlert(category, icon, color, title, message, priority) {
    const alerts = getArr(ALERTS_KEY);
    alerts.unshift({
      id: genId(), category: category, icon: icon, color: color,
      title: title, message: message,
      time: new Date().toISOString(), read: false, priority: priority || 'normal'
    });
    if (alerts.length > 100) alerts.length = 100;
    set(ALERTS_KEY, alerts);
  }

  // =========================================================================
  // APP MANAGEMENT
  // =========================================================================
  function initAppManagement() {
    if (!checkAuth()) return;
    renderDistricts();
    renderCategories();
    renderFestivals();
  }

  function renderDistricts() {
    const districts = getArr(KEYS.DISTRICTS);
    const temples = getArr(KEYS.TEMPLES);
    const tbody = document.getElementById('districts-table-body');
    if (!tbody) return;
    tbody.innerHTML = districts.map(d => {
      const templeCount = temples.filter(t => t.district === d.name).length;
      return `<tr>
        <td><strong>${d.name}</strong></td>
        <td>${d.state}</td>
        <td>${templeCount}</td>
        <td>${statusBadge(d.status)}</td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.editItem('district','${d.id}')"><i class="fas fa-edit"></i></button>
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.deleteItem('district','${d.id}')" style="color:var(--sa-danger);"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    }).join('');
  }

  function renderCategories() {
    const categories = getArr(KEYS.CATEGORIES);
    const temples = getArr(KEYS.TEMPLES);
    const tbody = document.getElementById('categories-table-body');
    if (!tbody) return;
    tbody.innerHTML = categories.map(c => {
      const templeCount = temples.filter(t => t.category === c.name).length;
      return `<tr>
        <td><strong>${c.name}</strong></td>
        <td style="font-size:1.3rem;">${c.icon}</td>
        <td>${templeCount}</td>
        <td>${statusBadge(c.status)}</td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.editItem('category','${c.id}')"><i class="fas fa-edit"></i></button>
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.deleteItem('category','${c.id}')" style="color:var(--sa-danger);"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    }).join('');
  }

  function renderFestivals() {
    const festivals = getArr(KEYS.FESTIVALS);
    const tbody = document.getElementById('festivals-table-body');
    if (!tbody) return;
    tbody.innerHTML = festivals.map(f => `
      <tr>
        <td><strong>${f.name}</strong></td>
        <td>${formatDate(f.date)}</td>
        <td>${f.desc}</td>
        <td>${statusBadge(f.status)}</td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.editItem('festival','${f.id}')"><i class="fas fa-edit"></i></button>
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.deleteItem('festival','${f.id}')" style="color:var(--sa-danger);"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  function openAddItem(type) {
    const modal = document.getElementById('item-modal');
    const title = document.getElementById('item-modal-title');
    const body = document.getElementById('item-modal-body');
    const saveBtn = document.getElementById('item-modal-save');

    title.textContent = 'Add ' + type.charAt(0).toUpperCase() + type.slice(1);

    if (type === 'district') {
      body.innerHTML = `
        <div class="sa-form-group"><label>District Name</label><input type="text" id="item-name" placeholder="District name"></div>
        <div class="sa-form-group"><label>State</label><input type="text" id="item-state" value="Tamil Nadu" placeholder="State"></div>
      `;
      saveBtn.onclick = () => saveItem('district');
    } else if (type === 'category') {
      body.innerHTML = `
        <div class="sa-form-group"><label>Category Name</label><input type="text" id="item-name" placeholder="Category name"></div>
        <div class="sa-form-group"><label>Icon (Emoji)</label><input type="text" id="item-icon" placeholder="🛕"></div>
      `;
      saveBtn.onclick = () => saveItem('category');
    } else if (type === 'festival') {
      body.innerHTML = `
        <div class="sa-form-group"><label>Festival Name</label><input type="text" id="item-name" placeholder="Festival name"></div>
        <div class="sa-form-group"><label>Date</label><input type="date" id="item-date"></div>
        <div class="sa-form-group"><label>Description</label><textarea id="item-desc" rows="2" placeholder="Description"></textarea></div>
      `;
      saveBtn.onclick = () => saveItem('festival');
    }

    openModal('item-modal');
  }

  function editItem(type, id) {
    const keyMap = { district: KEYS.DISTRICTS, category: KEYS.CATEGORIES, festival: KEYS.FESTIVALS };
    const items = getArr(keyMap[type]);
    const item = items.find(i => i.id === id);
    if (!item) return;

    openAddItem(type);
    document.getElementById('item-modal-title').textContent = 'Edit ' + type.charAt(0).toUpperCase() + type.slice(1);
    document.getElementById('item-name').value = item.name;

    if (type === 'district') document.getElementById('item-state').value = item.state || '';
    if (type === 'category') document.getElementById('item-icon').value = item.icon || '';
    if (type === 'festival') {
      document.getElementById('item-date').value = item.date || '';
      document.getElementById('item-desc').value = item.desc || '';
    }

    document.getElementById('item-modal-save').onclick = () => saveItem(type, id);
  }

  function saveItem(type, editId) {
    const name = document.getElementById('item-name').value.trim();
    if (!name) { showToast('Please enter a name', 'error'); return; }

    const keyMap = { district: KEYS.DISTRICTS, category: KEYS.CATEGORIES, festival: KEYS.FESTIVALS };
    const items = getArr(keyMap[type]);

    if (editId) {
      const idx = items.findIndex(i => i.id === editId);
      if (idx >= 0) {
        items[idx].name = name;
        if (type === 'district') items[idx].state = document.getElementById('item-state').value.trim();
        if (type === 'category') items[idx].icon = document.getElementById('item-icon').value.trim();
        if (type === 'festival') {
          items[idx].date = document.getElementById('item-date').value;
          items[idx].desc = document.getElementById('item-desc').value.trim();
        }
      }
    } else {
      const newItem = { id: genId(), name, status: 'active' };
      if (type === 'district') newItem.state = document.getElementById('item-state').value.trim();
      if (type === 'category') newItem.icon = document.getElementById('item-icon').value.trim();
      if (type === 'festival') {
        newItem.date = document.getElementById('item-date').value;
        newItem.desc = document.getElementById('item-desc').value.trim();
        newItem.status = 'upcoming';
      }
      items.push(newItem);
    }

    set(keyMap[type], items);
    closeModal('item-modal');
    if (type === 'district') renderDistricts();
    else if (type === 'category') renderCategories();
    else renderFestivals();
    addActivity(`${type.charAt(0).toUpperCase() + type.slice(1)} <strong>${name}</strong> ${editId ? 'updated' : 'added'}`, 'green');
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} ${editId ? 'updated' : 'added'}!`, 'success');
  }

  function deleteItem(type, id) {
    if (!confirm(`Delete this ${type}?`)) return;
    const keyMap = { district: KEYS.DISTRICTS, category: KEYS.CATEGORIES, festival: KEYS.FESTIVALS };
    let items = getArr(keyMap[type]);
    items = items.filter(i => i.id !== id);
    set(keyMap[type], items);
    if (type === 'district') renderDistricts();
    else if (type === 'category') renderCategories();
    else renderFestivals();
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted`, 'info');
  }

  function saveAppSettings() {
    const settings = {
      appName: document.getElementById('app-name').value,
      defaultLang: document.getElementById('app-default-lang').value,
      maintenance: document.getElementById('app-maintenance').value,
      payment: document.getElementById('app-payment').value
    };
    set(KEYS.SETTINGS, settings);
    addActivity('App settings updated', 'blue');
    showToast('Settings saved!', 'success');
  }

  // =========================================================================
  // BOOKING MANAGEMENT
  // =========================================================================
  function initBookings() {
    if (!checkAuth()) return;
    seedBookingData();
    renderBookingStats();
    renderAllBookings();
    renderPendingBookings();
    renderTypedBookings('Pooja', 'pooja-bookings-body');
    renderTypedBookings('Homam', 'homam-bookings-body');
    renderTypedBookings('Family Function', 'family-bookings-body');
    renderDarshanBookings();
    renderTypedBookings('Motta', 'motta-bookings-body');
  }

  function seedBookingData() {
    if (getArr(KEYS.APP_BOOKINGS).length > 0) return;
    const temples = getArr(KEYS.TEMPLES);
    const t = (i) => temples[i] ? temples[i].name : 'Meenakshi Amman Temple';
    set(KEYS.APP_BOOKINGS, [
      { id: 'BK-1001', type: 'Pooja', pooja: 'Archana', temple: t(0), name: 'Ramesh Kumar', phone: '9876543210', date: '2026-03-11', slot: '8:00 AM', price: 50, status: 'Confirmed' },
      { id: 'BK-1002', type: 'Pooja', pooja: 'Abhishekam', temple: t(1), name: 'Priya Sharma', phone: '9876543211', date: '2026-03-12', slot: '6:00 AM', price: 200, status: 'Confirmed' },
      { id: 'BK-1003', type: 'Homam', pooja: 'Ganapathi Homam', temple: t(0), name: 'Lakshmi Devi', phone: '9876543213', date: '2026-03-15', slot: '7:00 AM', persons: 8, price: 1500, status: 'Confirmed' },
      { id: 'BK-1004', type: 'Homam', pooja: 'Navagraha Homam', temple: t(5), name: 'Arun Venkat', phone: '9876543212', date: '2026-03-18', slot: '6:00 AM', persons: 5, price: 2000, status: 'Confirmed' },
      { id: 'BK-1005', type: 'Family Function', pooja: 'Temple Marriage', temple: t(0), name: 'Vijay Krishna', phone: '9876543216', date: '2026-04-10', guests: 150, price: 25000, status: 'Pending Approval', specialRequests: 'Need extra flower decoration and nadaswaram' },
      { id: 'BK-1006', type: 'Family Function', pooja: 'Naming Ceremony', temple: t(3), name: 'Kavitha M', phone: '9876543215', date: '2026-03-25', guests: 30, price: 5000, status: 'Pending Approval', specialRequests: 'Baby naming - need priest who speaks Tamil' },
      { id: 'BK-1007', type: 'Family Function', pooja: 'Shashtiapthapoorthi', temple: t(1), name: 'Meena S', phone: '9876543217', date: '2026-04-05', guests: 80, price: 15000, status: 'Pending Approval' },
      { id: 'BK-1008', type: 'Darshan Token', pooja: 'VIP Darshan', temple: t(4), name: 'Ramesh Kumar', phone: '9876543210', date: '2026-03-14', slot: '10:00 AM', persons: 3, price: 1500, status: 'Confirmed', tokenNo: 'T4821' },
      { id: 'BK-1009', type: 'Darshan Token', pooja: 'Special Darshan', temple: t(4), name: 'Priya Sharma', phone: '9876543211', date: '2026-03-14', slot: '2:00 PM', persons: 2, price: 600, status: 'Confirmed', tokenNo: 'T4822' },
      { id: 'BK-1010', type: 'Motta', pooja: 'Baby First Tonsure', temple: t(6), name: 'Arun Venkat', phone: '9876543212', date: '2026-03-20', slot: '9:00 AM', persons: 1, price: 300, status: 'Confirmed' },
      { id: 'BK-1011', type: 'Motta', pooja: 'Full Tonsure', temple: t(4), name: 'Suresh Babu', phone: '9876543214', date: '2026-03-22', slot: '10:00 AM', persons: 2, price: 400, status: 'Confirmed' },
      { id: 'BK-1012', type: 'Pooja', pooja: 'Sahasranama Pooja', temple: t(7), name: 'Kavitha M', phone: '9876543215', date: '2026-03-13', slot: '8:00 AM', price: 500, status: 'Confirmed' },
      { id: 'BK-1013', type: 'Pooja', pooja: 'Lakshmi Pooja', temple: t(0), name: 'Meena S', phone: '9876543217', date: '2026-03-14', slot: '6:00 AM', price: 300, status: 'Cancelled' },
      { id: 'BK-1014', type: 'Homam', pooja: 'Sudarshana Homam', temple: t(3), name: 'Ramesh Kumar', phone: '9876543210', date: '2026-03-28', slot: '7:00 AM', persons: 10, price: 2500, status: 'Confirmed' },
      { id: 'BK-1015', type: 'Family Function', pooja: 'Upanayanam', temple: t(1), name: 'Lakshmi Devi', phone: '9876543213', date: '2026-04-15', guests: 60, price: 12000, status: 'Pending Approval', specialRequests: 'Need homam setup and vedic chanting' }
    ]);
  }

  function renderBookingStats() {
    const bookings = getArr(KEYS.APP_BOOKINGS);
    const today = new Date().toISOString().split('T')[0];
    setText('b-total', bookings.length);
    setText('b-confirmed', bookings.filter(b => b.status === 'Confirmed').length);
    setText('b-pending', bookings.filter(b => b.status === 'Pending Approval').length);
    setText('b-cancelled', bookings.filter(b => b.status === 'Cancelled').length);
    setText('b-revenue', formatCurrency(bookings.filter(b => b.status !== 'Cancelled').reduce((s, b) => s + (b.price || 0), 0)));
    setText('b-today', bookings.filter(b => b.date === today).length);
    const pendingBadge = document.getElementById('pending-badge');
    if (pendingBadge) pendingBadge.textContent = bookings.filter(b => b.status === 'Pending Approval').length;
  }

  function renderAllBookings() {
    const bookings = getArr(KEYS.APP_BOOKINGS);
    const search = (document.getElementById('booking-search')?.value || '').toLowerCase();
    const typeFilter = document.getElementById('booking-type-filter')?.value || '';
    const statusFilter = document.getElementById('booking-status-filter')?.value || '';

    let filtered = bookings.filter(b => {
      if (search && !(b.name || '').toLowerCase().includes(search) && !(b.id || '').toLowerCase().includes(search) && !(b.pooja || '').toLowerCase().includes(search)) return false;
      if (typeFilter && b.type !== typeFilter) return false;
      if (statusFilter && b.status !== statusFilter) return false;
      return true;
    });

    const tbody = document.getElementById('all-bookings-body');
    if (!tbody) return;
    tbody.innerHTML = filtered.map(b => `
      <tr>
        <td><strong>#${b.id}</strong></td>
        <td class="avatar-cell">
          <div class="avatar-sm" style="background:${avatarBg(b.name)};">${(b.name||'D')[0]}</div>
          <div><strong>${b.name}</strong><br><small class="sa-text-muted">${b.phone || ''}</small></div>
        </td>
        <td><span class="sa-badge sa-badge-info">${b.type}</span></td>
        <td>${b.pooja || '-'}</td>
        <td>${b.temple || '-'}</td>
        <td>${formatDate(b.date)}</td>
        <td><strong>${formatCurrency(b.price)}</strong></td>
        <td>${bookingStatusBadge(b.status)}</td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.viewBooking('${b.id}')"><i class="fas fa-eye"></i></button>
          ${b.status === 'Pending Approval' ? `<button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.approveBooking('${b.id}')"><i class="fas fa-check"></i></button>` : ''}
          ${b.status === 'Pending Approval' ? `<button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.rejectBooking('${b.id}')"><i class="fas fa-times"></i></button>` : ''}
          ${b.status === 'Confirmed' ? `<button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.cancelBooking('${b.id}')" style="color:var(--sa-danger);" title="Cancel"><i class="fas fa-ban"></i></button>` : ''}
        </td>
      </tr>
    `).join('') || '<tr><td colspan="9" class="sa-text-muted" style="text-align:center; padding:40px;">No bookings found</td></tr>';
  }

  function renderPendingBookings() {
    const bookings = getArr(KEYS.APP_BOOKINGS).filter(b => b.status === 'Pending Approval');
    const tbody = document.getElementById('pending-bookings-body');
    if (!tbody) return;
    tbody.innerHTML = bookings.map(b => `
      <tr>
        <td><strong>#${b.id}</strong></td>
        <td class="avatar-cell">
          <div class="avatar-sm" style="background:${avatarBg(b.name)};">${(b.name||'D')[0]}</div>
          <strong>${b.name}</strong>
        </td>
        <td>${b.pooja || b.type}<br><small class="sa-text-muted">${b.temple || ''}</small></td>
        <td>${formatDate(b.date)}</td>
        <td>${b.guests || b.persons || 1}</td>
        <td><strong>${formatCurrency(b.price)}</strong></td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.viewBooking('${b.id}')"><i class="fas fa-eye"></i></button>
          <button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.approveBooking('${b.id}')"><i class="fas fa-check"></i> Approve</button>
          <button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.rejectBooking('${b.id}')"><i class="fas fa-times"></i> Reject</button>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="7" class="sa-text-muted" style="text-align:center; padding:40px;">No pending bookings</td></tr>';
  }

  function renderTypedBookings(type, tbodyId) {
    const bookings = getArr(KEYS.APP_BOOKINGS).filter(b => b.type === type);
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    const showPersons = type === 'Homam' || type === 'Motta';
    const showGuests = type === 'Family Function';

    tbody.innerHTML = bookings.map(b => {
      let cols = `
        <td><strong>#${b.id}</strong></td>
        <td class="avatar-cell">
          <div class="avatar-sm" style="background:${avatarBg(b.name)};">${(b.name||'D')[0]}</div>
          <strong>${b.name}</strong>
        </td>
        <td>${b.pooja || '-'}</td>
        <td>${b.temple || '-'}</td>
        <td>${formatDate(b.date)}</td>`;
      if (showGuests) cols += `<td>${b.guests || '-'}</td>`;
      if (showPersons) cols += `<td>${b.persons || 1}</td>`;
      cols += `<td><strong>${formatCurrency(b.price)}</strong></td>
        <td>${bookingStatusBadge(b.status)}</td>
        <td class="sa-actions">
          <button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.viewBooking('${b.id}')"><i class="fas fa-eye"></i></button>
          ${b.status === 'Pending Approval' ? `<button class="sa-btn sa-btn-success sa-btn-sm" onclick="SA.approveBooking('${b.id}')"><i class="fas fa-check"></i></button><button class="sa-btn sa-btn-danger sa-btn-sm" onclick="SA.rejectBooking('${b.id}')"><i class="fas fa-times"></i></button>` : ''}
          ${b.status === 'Confirmed' ? `<button class="sa-btn sa-btn-outline sa-btn-sm" onclick="SA.cancelBooking('${b.id}')" style="color:var(--sa-danger);"><i class="fas fa-ban"></i></button>` : ''}
        </td>`;
      return `<tr>${cols}</tr>`;
    }).join('') || `<tr><td colspan="${showPersons || showGuests ? 9 : 8}" class="sa-text-muted" style="text-align:center; padding:40px;">No ${type.toLowerCase()} bookings found</td></tr>`;
  }

  function renderDarshanBookings() {
    const bookings = getArr(KEYS.APP_BOOKINGS).filter(b => b.type === 'Darshan Token');
    const tbody = document.getElementById('darshan-bookings-body');
    if (!tbody) return;
    tbody.innerHTML = bookings.map(b => `
      <tr>
        <td><strong>${b.tokenNo || b.id}</strong></td>
        <td class="avatar-cell">
          <div class="avatar-sm" style="background:${avatarBg(b.name)};">${(b.name||'D')[0]}</div>
          <strong>${b.name}</strong>
        </td>
        <td>${b.pooja || 'General'}</td>
        <td>${b.temple || '-'}</td>
        <td>${formatDate(b.date)}</td>
        <td>${b.slot || '-'}</td>
        <td>${b.persons || 1}</td>
        <td><strong>${formatCurrency(b.price)}</strong></td>
        <td>${bookingStatusBadge(b.status)}</td>
      </tr>
    `).join('') || '<tr><td colspan="9" class="sa-text-muted" style="text-align:center; padding:40px;">No darshan tokens found</td></tr>';
  }

  function bookingStatusBadge(status) {
    const map = {
      'Confirmed': 'sa-badge-success',
      'Pending Approval': 'sa-badge-warning',
      'Cancelled': 'sa-badge-danger',
      'Rejected': 'sa-badge-danger',
      'Completed': 'sa-badge-info'
    };
    return `<span class="sa-badge ${map[status] || 'sa-badge-info'}">${status}</span>`;
  }

  function filterBookings() { renderAllBookings(); }

  function viewBooking(id) {
    const b = getArr(KEYS.APP_BOOKINGS).find(x => x.id === id);
    if (!b) return;
    const content = document.getElementById('booking-detail-content');
    content.innerHTML = `
      <div style="text-align:center; margin-bottom:20px;">
        <div class="sa-user-avatar" style="width:60px;height:60px;font-size:1.3rem;margin:0 auto 12px;border-radius:50%;background:${avatarBg(b.name)};">
          ${(b.name||'D')[0]}
        </div>
        <h3>${b.name}</h3>
        <p class="sa-text-muted">Booking #${b.id}</p>
        <div style="margin-top:8px;">${bookingStatusBadge(b.status)}</div>
      </div>
      <div class="sa-divider"></div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.9rem;">
        <div><strong>Type:</strong> ${b.type}</div>
        <div><strong>Service:</strong> ${b.pooja || '-'}</div>
        <div><strong>Temple:</strong> ${b.temple || '-'}</div>
        <div><strong>Date:</strong> ${formatDate(b.date)}</div>
        <div><strong>Time Slot:</strong> ${b.slot || '-'}</div>
        <div><strong>Phone:</strong> ${b.phone || '-'}</div>
        ${b.persons ? `<div><strong>Persons:</strong> ${b.persons}</div>` : ''}
        ${b.guests ? `<div><strong>Expected Guests:</strong> ${b.guests}</div>` : ''}
        ${b.tokenNo ? `<div><strong>Token No:</strong> ${b.tokenNo}</div>` : ''}
        <div><strong>Amount:</strong> <span style="color:var(--sa-primary);font-weight:700;">${formatCurrency(b.price)}</span></div>
      </div>
      ${b.specialRequests ? `<div class="sa-divider"></div><div><strong>Special Requests:</strong><p style="margin-top:4px;color:var(--sa-text-muted);font-size:0.88rem;">${b.specialRequests}</p></div>` : ''}
      ${b.status === 'Pending Approval' ? `
        <div class="sa-divider"></div>
        <div style="display:flex;gap:10px;justify-content:center;">
          <button class="sa-btn sa-btn-success" onclick="SA.approveBooking('${b.id}');SA.closeModal('booking-detail-modal');"><i class="fas fa-check"></i> Approve</button>
          <button class="sa-btn sa-btn-danger" onclick="SA.rejectBooking('${b.id}');SA.closeModal('booking-detail-modal');"><i class="fas fa-times"></i> Reject</button>
        </div>` : ''}
    `;
    openModal('booking-detail-modal');
  }

  function approveBooking(id) {
    const bookings = getArr(KEYS.APP_BOOKINGS);
    const b = bookings.find(x => x.id === id);
    if (b) {
      b.status = 'Confirmed';
      set(KEYS.APP_BOOKINGS, bookings);
      addActivity(`Booking <strong>#${b.id}</strong> (${b.pooja}) approved for ${b.name}`, 'green');
      addSystemAlert('booking', 'fa-check-circle', 'green', 'Booking Approved', 'Booking <strong>#' + b.id + '</strong> (' + b.pooja + ') for <strong>' + b.name + '</strong> has been approved.', 'normal');
      refreshBookingViews();
      showToast('Booking approved!', 'success');
    }
  }

  function rejectBooking(id) {
    const bookings = getArr(KEYS.APP_BOOKINGS);
    const b = bookings.find(x => x.id === id);
    if (b) {
      b.status = 'Rejected';
      set(KEYS.APP_BOOKINGS, bookings);
      addActivity(`Booking <strong>#${b.id}</strong> (${b.pooja}) rejected`, 'red');
      addSystemAlert('booking', 'fa-times-circle', 'red', 'Booking Rejected', 'Booking <strong>#' + b.id + '</strong> (' + b.pooja + ') for <strong>' + b.name + '</strong> has been rejected.', 'normal');
      refreshBookingViews();
      showToast('Booking rejected', 'info');
    }
  }

  function cancelBooking(id) {
    if (!confirm('Cancel this booking?')) return;
    const bookings = getArr(KEYS.APP_BOOKINGS);
    const b = bookings.find(x => x.id === id);
    if (b) {
      b.status = 'Cancelled';
      set(KEYS.APP_BOOKINGS, bookings);
      addActivity(`Booking <strong>#${b.id}</strong> cancelled`, 'red');
      refreshBookingViews();
      showToast('Booking cancelled', 'warning');
    }
  }

  function renderKulaTheivamBookings() {
    const tbody = document.getElementById('kt-bookings-body');
    if (!tbody) return;
    // Read from both temple_bookings (KT rituals saved there) and kula_theivam_bookings
    const appBookings = getArr(KEYS.APP_BOOKINGS).filter(b => b.type === 'kula_theivam_ritual');
    const ktBookings = getArr('kula_theivam_bookings');
    const ktOrders = getArr('kula_theivam_orders');
    const all = [...appBookings];
    // Add KT-only bookings not already in appBookings
    ktBookings.forEach(b => {
      if (!all.find(a => a.id === b.id)) all.push(b);
    });
    // Add prasadam orders
    ktOrders.forEach(o => {
      all.push({ id: o.id, devotee: o.customerName, ritualName: o.itemName, temple: o.temple, date: o.orderedAt ? new Date(o.orderedAt).toLocaleDateString() : '-', isRemote: true, price: o.price, status: o.status, type: 'prasadam_delivery' });
    });
    if (all.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:30px;color:#999;">No Kula Theivam bookings yet</td></tr>';
      return;
    }
    let html = '';
    all.forEach(b => {
      html += '<tr>' +
        '<td><strong>' + (b.id || '-') + '</strong></td>' +
        '<td>' + (b.devotee || b.name || b.customerName || '-') + '</td>' +
        '<td>' + (b.ritualName || b.topic || b.itemName || '-') + '</td>' +
        '<td>' + (b.temple || '-') + '</td>' +
        '<td>' + (b.date || '-') + '</td>' +
        '<td>' + (b.isRemote ? '<span class="sa-badge sa-badge-success">Yes</span>' : '<span class="sa-badge sa-badge-muted">No</span>') + '</td>' +
        '<td>₹' + ((b.price || 0).toLocaleString()) + '</td>' +
        '<td>' + bookingStatusBadge(b.status) + '</td>' +
        '<td><button class="sa-btn sa-btn-sm sa-btn-outline" onclick="SA.viewBooking(\'' + b.id + '\')"><i class="fas fa-eye"></i></button></td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
  }

  function refreshBookingViews() {
    renderBookingStats();
    renderAllBookings();
    renderPendingBookings();
    renderTypedBookings('Pooja', 'pooja-bookings-body');
    renderTypedBookings('Homam', 'homam-bookings-body');
    renderTypedBookings('Family Function', 'family-bookings-body');
    renderDarshanBookings();
    renderTypedBookings('Motta', 'motta-bookings-body');
    renderKulaTheivamBookings();
  }

  function exportBookings() {
    const bookings = getArr(KEYS.APP_BOOKINGS);
    let csv = 'Booking ID,Devotee,Phone,Type,Service,Temple,Date,Amount,Status\n';
    bookings.forEach(b => {
      csv += `"${b.id}","${b.name}","${b.phone || ''}","${b.type}","${b.pooja || ''}","${b.temple || ''}","${b.date}",${b.price || 0},"${b.status}"\n`;
    });
    downloadCSV(csv, 'bookings_export.csv');
    showToast('Bookings exported!', 'success');
  }

  // =========================================================================
  // CSV EXPORT HELPER
  // =========================================================================
  function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // =========================================================================
  // PUBLIC API
  // =========================================================================
  return {
    login, logout, checkAuth, toggleSidebar, switchTab, openModal, closeModal,

    // Dashboard
    initDashboard,

    // Temples
    initTemples, filterTemples, openAddTemple, editTemple, saveTemple,
    approveTemple, rejectTemple, suspendTemple, deleteTemple,

    // Users
    initUsers, filterUsers, viewUser, blockUser, unblockUser, deleteUser, exportUsers,
    approveVerification, rejectVerification, verifyUserDirect, revokeVerification,

    // Temple Admins
    initTempleAdmins, filterAdmins, openAddAdmin, editAdmin, saveAdmin,
    toggleAdminStatus, deleteAdmin,

    // Reports
    initReports, exportAllReports,

    // Finance
    initFinance, exportFinance,

    // Content
    initContent, filterContent, openAddPost, savePost, removePost,
    dismissFlagged, removeFlagged,
    filterCommunityPosts, approveCommunityPost, rejectCommunityPost, removeCommunityPost,

    // Notifications
    initNotifications, sendNotification, deleteNotification, resendNotification,
    previewNotification, filterAlerts, searchAlerts, markAlertRead, markAllAlertsRead,
    markAllRead, clearReadAlerts, viewAlertDetail, deleteAlert,
    toggleNotifDropdown, closeNotifDropdown, addSystemAlert,

    // Bookings
    initBookings, filterBookings, viewBooking, approveBooking, rejectBooking, cancelBooking, exportBookings,

    // App Management
    initAppManagement, openAddItem, editItem, saveItem, deleteItem, saveAppSettings
  };
})();
