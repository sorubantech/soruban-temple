/* P1 — Temple Priest (Iyyer) App */

const PRIEST = { name: 'Venkatesh Sharma', temple: 'Kapaleeshwarar Temple', rating: 4.9, reviews: 85, todayEarnings: 3500, monthEarnings: 72000 };

const screens = {
  home: () => `
    <div class="app-header-gradient" style="padding-top:0;background:linear-gradient(135deg,#C62828,#E65100)">
      <div class="flex items-center justify-between">
        <div>
          <div style="font-size:var(--text-lg);font-weight:800;color:white"><i class="fa-solid fa-om" style="margin-right:6px"></i> Priest Dashboard</div>
          <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.8)">வணக்கம், Sri ${PRIEST.name}!</div>
        </div>
        <div class="flex gap-2">
          <button class="header-icon-btn"><i class="fa-solid fa-bell"></i></button>
        </div>
      </div>
    </div>

    <div class="section">
      <!-- Availability Toggle -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="live-dot" style="width:12px;height:12px"></div>
              <div>
                <div style="font-size:var(--text-md);font-weight:700">Available for Bookings</div>
                <div style="font-size:var(--text-xs);color:var(--text-light)">Home bookings are enabled</div>
              </div>
            </div>
            <button class="toggle active" onclick="this.classList.toggle('active')"></button>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-fire"></i></div>
          <div class="stat-value">5</div>
          <div class="stat-label">Today's Rituals</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-indian-rupee-sign"></i></div>
          <div class="stat-value">₹3.5K</div>
          <div class="stat-label">Today</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-star"></i></div>
          <div class="stat-value">${PRIEST.rating}</div>
          <div class="stat-label">${PRIEST.reviews} reviews</div>
        </div>
      </div>

      <!-- Next Ritual -->
      <div class="section-header"><span class="section-title">Next Up</span></div>
      <div class="card" style="border-color:var(--primary);border-width:2px;margin-bottom:var(--space-4)">
        <div class="card-body">
          <div class="flex items-center justify-between mb-2">
            <span class="badge badge-solid-primary"><i class="fa-solid fa-clock"></i> In 30 min</span>
            <span class="badge badge-gold">Home Booking</span>
          </div>
          <h4 style="font-size:var(--text-md);font-weight:700">Ganapathy Homam</h4>
          <div style="font-size:var(--text-sm);color:var(--text-secondary);margin-top:var(--space-1)"><i class="fa-solid fa-user"></i> Mr. Ramesh Kumar</div>
          <div style="font-size:var(--text-sm);color:var(--text-secondary)"><i class="fa-solid fa-location-dot"></i> 42, Anna Nagar, Chennai</div>
          <div style="font-size:var(--text-sm);color:var(--text-secondary)"><i class="fa-regular fa-clock"></i> 9:30 AM — ₹2,500</div>
          <div class="flex gap-2 mt-3">
            <button class="btn btn-primary btn-sm flex-1" onclick="NavEngine.showToast('Opening maps...')"><i class="fa-solid fa-map-location-dot"></i> Navigate</button>
            <button class="btn btn-outline btn-sm flex-1" onclick="NavEngine.showToast('Calling...')"><i class="fa-solid fa-phone"></i> Call</button>
          </div>
        </div>
      </div>

      <!-- Incoming Requests -->
      <div class="section-header"><span class="section-title">New Requests</span><span class="badge badge-solid-danger">2</span></div>
      <div class="request-card">
        <div class="rc-header">
          <span class="rc-service">Griha Pravesham</span>
          <span class="rc-amount">₹5,000</span>
        </div>
        <div class="rc-detail"><i class="fa-solid fa-user"></i> Karthik S — +91 98765 43210</div>
        <div class="rc-detail"><i class="fa-solid fa-location-dot"></i> KK Nagar, Chennai</div>
        <div class="rc-detail"><i class="fa-regular fa-calendar"></i> March 25, 9:00 AM</div>
        <div style="font-size:var(--text-xs);color:var(--accent-dark);font-weight:600"><i class="fa-solid fa-clock"></i> Expires in 28 min</div>
        <div class="rc-actions">
          <button class="btn btn-success btn-sm flex-1" onclick="NavEngine.showToast('Accepted!')"><i class="fa-solid fa-check"></i> Accept</button>
          <button class="btn btn-danger btn-sm flex-1" onclick="NavEngine.showToast('Declined')"><i class="fa-solid fa-xmark"></i> Decline</button>
        </div>
      </div>
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  schedule: () => `
    <div class="app-header"><span class="header-title">Today's Schedule</span></div>
    <div class="section">
      <div class="schedule-item">
        <div class="si-time">6:00 AM</div>
        <div class="si-info"><div class="si-title">Morning Suprabhatam</div><div class="si-sub">${PRIEST.temple} — Temple Duty</div></div>
        <div class="si-type" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)">Temple</div>
      </div>
      <div class="schedule-item">
        <div class="si-time">8:00 AM</div>
        <div class="si-info"><div class="si-title">Morning Abhishekam</div><div class="si-sub">${PRIEST.temple} — Temple Duty</div></div>
        <div class="si-type" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)">Temple</div>
      </div>
      <div class="schedule-item" style="border-color:var(--accent-light);background:var(--accent-bg)">
        <div class="si-time">9:30 AM</div>
        <div class="si-info"><div class="si-title">Ganapathy Homam</div><div class="si-sub">Mr. Ramesh, Anna Nagar — ₹2,500</div></div>
        <div class="si-type" style="background:var(--accent);color:var(--text-primary)">Home</div>
      </div>
      <div class="schedule-item">
        <div class="si-time">12:00 PM</div>
        <div class="si-info"><div class="si-title">Uchikala Pooja</div><div class="si-sub">${PRIEST.temple} — Temple Duty</div></div>
        <div class="si-type" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)">Temple</div>
      </div>
      <div class="schedule-item">
        <div class="si-time">4:00 PM</div>
        <div class="si-info"><div class="si-title">Evening Deeparadhanai</div><div class="si-sub">${PRIEST.temple} — Temple Duty</div></div>
        <div class="si-type" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)">Temple</div>
      </div>
      <div class="schedule-item" style="border-color:var(--accent-light);background:var(--accent-bg)">
        <div class="si-time">6:30 PM</div>
        <div class="si-info"><div class="si-title">Satyanarayana Pooja</div><div class="si-sub">Mrs. Priya, KK Nagar — ₹3,500</div></div>
        <div class="si-type" style="background:var(--accent);color:var(--text-primary)">Home</div>
      </div>
    </div>
  `,

  scan_qr: () => `
    <div class="app-header"><span class="header-title">Scan QR</span></div>
    <div class="section" style="text-align:center">
      <p style="font-size:var(--text-sm);color:var(--text-light);margin-bottom:var(--space-4)">Scan devotee's booking QR code</p>
      <div class="scan-area">
        <i class="fa-solid fa-qrcode" style="font-size:4rem;color:var(--primary-light);opacity:0.3"></i>
      </div>
      <button class="btn btn-primary btn-block btn-lg mb-3" onclick="showScannedResult()"><i class="fa-solid fa-camera"></i> Open Camera</button>
      <div class="login-divider">or</div>
      <div class="form-group mt-3"><input class="form-input" placeholder="Enter Booking ID (e.g., BK-20260320-045)" style="text-align:center"></div>
      <button class="btn btn-outline btn-block" onclick="showScannedResult()"><i class="fa-solid fa-magnifying-glass"></i> Look Up Booking</button>

      <div id="scan-result" style="display:none" class="mt-4">
        <div class="card" style="border-color:var(--sacred-green);border-width:2px;text-align:left">
          <div class="card-body">
            <div class="flex items-center justify-between mb-3">
              <span class="badge badge-solid-success"><i class="fa-solid fa-circle-check"></i> Valid Booking</span>
              <span style="font-size:var(--text-xs);color:var(--text-muted)">BK-20260320-045</span>
            </div>
            <div style="font-size:var(--text-sm);margin-bottom:var(--space-1)"><strong>Service:</strong> Archana</div>
            <div style="font-size:var(--text-sm);margin-bottom:var(--space-1)"><strong>Devotee:</strong> Ramesh Kumar</div>
            <div style="font-size:var(--text-sm);margin-bottom:var(--space-1)"><strong>Nakshatra:</strong> Ashwini</div>
            <div style="font-size:var(--text-sm);margin-bottom:var(--space-1)"><strong>Gothram:</strong> Kashyapa</div>
            <div style="font-size:var(--text-sm);margin-bottom:var(--space-1)"><strong>Rasi:</strong> Mesham</div>
            <div style="font-size:var(--text-sm)"><strong>Slot:</strong> 9:00 - 9:30 AM</div>
            <div class="flex gap-2 mt-3">
              <button class="btn btn-success flex-1" onclick="NavEngine.showToast('Ritual started!')"><i class="fa-solid fa-play"></i> Start Ritual</button>
              <button class="btn btn-outline flex-1" onclick="NavEngine.showToast('Completed!')"><i class="fa-solid fa-check"></i> Complete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  earnings: () => `
    <div class="app-header"><span class="header-title">Earnings</span></div>
    <div class="section">
      <div class="card-gradient mb-4" style="border-radius:var(--radius-xl);padding:var(--space-5)">
        <div style="font-size:var(--text-xs);opacity:0.8">This Month</div>
        <div style="font-size:var(--text-3xl);font-weight:900;margin:var(--space-1) 0">₹72,000</div>
        <div style="font-size:var(--text-sm);opacity:0.85"><i class="fa-solid fa-arrow-up"></i> 15% vs last month</div>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="stat-card"><div class="stat-value" style="color:var(--sacred-green)">₹3,500</div><div class="stat-label">Today</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--sacred-blue)">₹18,000</div><div class="stat-label">This Week</div></div>
      </div>
      <div class="section-title mb-3">Breakdown</div>
      <div class="card mb-3"><div class="card-body">
        <div class="flex items-center justify-between mb-2"><span style="font-size:var(--text-sm)">Temple Duties</span><span style="font-size:var(--text-sm);font-weight:700">₹35,000</span></div>
        <div style="height:6px;background:var(--bg-inset);border-radius:var(--radius-full);overflow:hidden"><div style="height:100%;width:48%;background:var(--sacred-blue);border-radius:var(--radius-full)"></div></div>
      </div></div>
      <div class="card mb-3"><div class="card-body">
        <div class="flex items-center justify-between mb-2"><span style="font-size:var(--text-sm)">Home Bookings</span><span style="font-size:var(--text-sm);font-weight:700">₹32,000</span></div>
        <div style="height:6px;background:var(--bg-inset);border-radius:var(--radius-full);overflow:hidden"><div style="height:100%;width:44%;background:var(--accent);border-radius:var(--radius-full)"></div></div>
      </div></div>
      <div class="card"><div class="card-body">
        <div class="flex items-center justify-between mb-2"><span style="font-size:var(--text-sm)">Tips & Extras</span><span style="font-size:var(--text-sm);font-weight:700">₹5,000</span></div>
        <div style="height:6px;background:var(--bg-inset);border-radius:var(--radius-full);overflow:hidden"><div style="height:100%;width:7%;background:var(--sacred-green);border-radius:var(--radius-full)"></div></div>
      </div></div>
      <button class="btn btn-primary btn-block btn-lg mt-4" onclick="NavEngine.showToast('Withdrawal initiated!')"><i class="fa-solid fa-building-columns"></i> Withdraw to Bank</button>
    </div>
  `,

  profile: () => `
    <div style="background:linear-gradient(135deg,#C62828,#E65100);padding:66px var(--space-5) var(--space-6);text-align:center">
      <div class="avatar avatar-xl" style="margin:0 auto var(--space-3);border:3px solid rgba(255,255,255,0.3)">VS</div>
      <h3 style="color:white;font-size:var(--text-lg);font-weight:700">Sri ${PRIEST.name}</h3>
      <p style="color:rgba(255,255,255,0.8);font-size:var(--text-sm)">${PRIEST.temple}</p>
      <div class="flex gap-2 justify-center mt-2">
        <span class="badge" style="background:rgba(255,255,255,0.15);color:white"><i class="fa-solid fa-star"></i> ${PRIEST.rating} (${PRIEST.reviews})</span>
      </div>
    </div>
    <div class="section">
      <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-lg);overflow:hidden">
        <div class="list-item"><div class="li-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-fire"></i></div><div class="li-content"><div class="li-title">My Services</div><div class="li-subtitle">8 services offered</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item"><div class="li-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-calendar-check"></i></div><div class="li-content"><div class="li-title">Availability</div><div class="li-subtitle">Manage time slots</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item"><div class="li-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-star"></i></div><div class="li-content"><div class="li-title">Reviews</div><div class="li-subtitle">${PRIEST.reviews} reviews — ${PRIEST.rating}/5</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item" onclick="NavEngine.toggleTheme()"><div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-moon"></i></div><div class="li-content"><div class="li-title">Dark Mode</div></div><div class="li-action"><button class="toggle ${NavEngine.isDark()?'active':''}"></button></div></div>
      </div>
    </div>
  `,
};

function showScannedResult() {
  const el = document.getElementById('scan-result');
  if (el) { el.style.display = 'block'; el.classList.add('fade-in-up'); }
}

screens.scan_qr.navTab = 'scan_qr';

NavEngine.init({
  screens,
  startScreen: 'home',
  bottomNav: [
    { screen: 'home', icon: 'fa-solid fa-house-chimney', label: 'Home', badge: '2' },
    { screen: 'schedule', icon: 'fa-solid fa-calendar-days', label: 'Schedule' },
    { screen: 'scan_qr', icon: 'fa-solid fa-qrcode', label: 'Scan QR' },
    { screen: 'earnings', icon: 'fa-solid fa-indian-rupee-sign', label: 'Earnings' },
    { screen: 'profile', icon: 'fa-solid fa-circle-user', label: 'Profile' },
  ],
});
