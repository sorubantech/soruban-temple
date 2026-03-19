/* D3 — Pilgrim / Traveler */

const TRAILS = [
  { id: 'navagraha', name: 'Navagraha Temples', temples: 9, location: 'Kumbakonam, TN', days: '2-3 days', visited: 6, gradient: 'linear-gradient(135deg,#E65100,#FFB300)', icon: 'fa-sun', difficulty: 'Easy' },
  { id: 'pancha_bhoota', name: 'Pancha Bhoota Stalam', temples: 5, location: 'South India', days: '5-7 days', visited: 2, gradient: 'linear-gradient(135deg,#1565C0,#42A5F5)', icon: 'fa-earth-americas', difficulty: 'Moderate' },
  { id: 'jyotirlinga', name: 'Jyotirlinga Yatra', temples: 12, location: 'Pan-India', days: '15-20 days', visited: 3, gradient: 'linear-gradient(135deg,#6A1B9A,#AB47BC)', icon: 'fa-om', difficulty: 'Challenging' },
  { id: 'arupadai', name: 'Arupadai Veedu', temples: 6, location: 'Tamil Nadu', days: '3-4 days', visited: 4, gradient: 'linear-gradient(135deg,#C62828,#EF5350)', icon: 'fa-shield-halved', difficulty: 'Easy' },
  { id: 'divya_desam', name: 'Divya Desam', temples: 108, location: 'Pan-India', days: '30+ days', visited: 8, gradient: 'linear-gradient(135deg,#2E7D32,#66BB6A)', icon: 'fa-gopuram', difficulty: 'Epic' },
  { id: 'pancha_sabhai', name: 'Pancha Sabhai', temples: 5, location: 'Tamil Nadu', days: '2-3 days', visited: 1, gradient: 'linear-gradient(135deg,#AD1457,#EC407A)', icon: 'fa-person-praying', difficulty: 'Easy' },
];

const NAVAGRAHA_TEMPLES = [
  { name: 'Suryanar Kovil (Surya)', loc: 'Kumbakonam', visited: true },
  { name: 'Thingaloor (Chandra)', loc: 'Kumbakonam', visited: true },
  { name: 'Vaitheeswaran Kovil (Angaraka)', loc: 'Sirkazhi', visited: true },
  { name: 'Thiruvenkadu (Budha)', loc: 'Sirkazhi', visited: true },
  { name: 'Alangudi (Guru)', loc: 'Kumbakonam', visited: true },
  { name: 'Kanjanoor (Sukra)', loc: 'Kumbakonam', visited: true },
  { name: 'Thirunallar (Sani)', loc: 'Karaikal', visited: false },
  { name: 'Thirunageswaram (Rahu)', loc: 'Kumbakonam', visited: false },
  { name: 'Keezhperumpallam (Ketu)', loc: 'Mayiladuthurai', visited: false },
];

const screens = {
  home: () => `
    <div class="app-header-gradient" style="padding-top:0">
      <div class="flex items-center justify-between">
        <div>
          <div style="font-size:var(--text-lg);font-weight:800;color:white"><i class="fa-solid fa-route" style="margin-right:6px"></i> Pilgrim</div>
          <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.8)">Your Spiritual Journeys</div>
        </div>
        <button class="header-icon-btn" onclick="NavEngine.navigateTo('badges')"><i class="fa-solid fa-trophy"></i></button>
      </div>
    </div>

    <!-- Active Trip -->
    <div class="section">
      <div class="card" style="border-color:var(--primary);border-width:2px">
        <div class="card-body">
          <div class="flex items-center justify-between mb-2">
            <span class="badge badge-solid-primary"><i class="fa-solid fa-route"></i> Active Trip</span>
            <span style="font-size:var(--text-xs);color:var(--text-light)">Started Mar 15</span>
          </div>
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-1)">Navagraha Temple Trail</h4>
          <div class="flex items-center gap-3">
            <div style="flex:1;height:8px;background:var(--bg-inset);border-radius:var(--radius-full);overflow:hidden">
              <div style="height:100%;width:66.7%;background:var(--gradient-primary);border-radius:var(--radius-full)"></div>
            </div>
            <span style="font-size:var(--text-sm);font-weight:700;color:var(--primary)">6/9</span>
          </div>
          <button class="btn btn-primary btn-sm mt-3" onclick="NavEngine.navigateTo('trail_detail')">Continue Trip <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </div>

    <!-- My Progress -->
    <div class="section" style="padding-top:0">
      <div class="section-header"><span class="section-title">My Progress</span></div>
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-place-of-worship"></i></div>
          <div class="stat-value">24</div>
          <div class="stat-label">Temples Visited</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--sacred-purple-bg);color:var(--sacred-purple)"><i class="fa-solid fa-route"></i></div>
          <div class="stat-value">3</div>
          <div class="stat-label">Trails Active</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-trophy"></i></div>
          <div class="stat-value">2</div>
          <div class="stat-label">Badges Earned</div>
        </div>
      </div>
    </div>

    <!-- Popular Trails -->
    <div class="section" style="padding-top:0">
      <div class="section-header"><span class="section-title">Temple Trails</span></div>
      ${TRAILS.map(t => `
        <div class="trail-card" onclick="NavEngine.navigateTo('trail_detail')">
          <div class="trail-card-hero" style="background:${t.gradient}">
            <i class="fa-solid ${t.icon}"></i>
            <div class="trail-badge"><span class="badge" style="background:rgba(0,0,0,0.3);color:white">${t.visited}/${t.temples} visited</span></div>
          </div>
          <div class="trail-card-body">
            <h4>${t.name}</h4>
            <div class="trail-loc"><i class="fa-solid fa-location-dot"></i> ${t.location} — ${t.days}</div>
            <div class="trail-meta">
              <span class="badge badge-primary">${t.temples} temples</span>
              <span class="badge badge-gold">${t.difficulty}</span>
              <div style="flex:1;height:6px;background:var(--bg-inset);border-radius:var(--radius-full);overflow:hidden;min-width:60px">
                <div style="height:100%;width:${(t.visited/t.temples)*100}%;background:var(--gradient-primary);border-radius:var(--radius-full)"></div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  // Trail Detail (Navagraha)
  trail_detail: () => `
    <div style="height:160px;background:linear-gradient(135deg,#E65100,#FFB300);display:flex;align-items:center;justify-content:center;position:relative">
      <i class="fa-solid fa-sun" style="font-size:4rem;color:rgba(255,255,255,0.15)"></i>
      <div style="position:absolute;top:12px;left:12px"><button class="back-btn" style="background:rgba(0,0,0,0.3);color:white" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button></div>
      <div style="position:absolute;bottom:16px;left:16px;right:16px;color:white">
        <h2 style="font-size:var(--text-xl);font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,0.3)">Navagraha Temples</h2>
        <div style="font-size:var(--text-sm);opacity:0.9">9 temples — Kumbakonam, TN — 2-3 days</div>
      </div>
    </div>

    <div class="section">
      <div class="flex items-center justify-between mb-4">
        <div>
          <span style="font-size:var(--text-2xl);font-weight:800;color:var(--primary)">6</span>
          <span style="font-size:var(--text-sm);color:var(--text-light)"> of 9 temples visited</span>
        </div>
        <div class="progress-ring">67%</div>
      </div>

      <div class="flex gap-2 mb-4">
        <button class="btn btn-primary flex-1" onclick="NavEngine.navigateTo('route_planner')"><i class="fa-solid fa-route"></i> Plan Route</button>
        <button class="btn btn-outline flex-1" onclick="NavEngine.showToast('Shared!')"><i class="fa-solid fa-share-nodes"></i> Share</button>
      </div>

      <div class="section-title mb-3">Temple Stops</div>
      ${NAVAGRAHA_TEMPLES.map((t, i) => `
        <div class="temple-stop">
          <div class="stop-dot ${t.visited ? 'visited' : (i === 6 ? 'current' : '')}">
            ${t.visited ? '<i class="fa-solid fa-check" style="font-size:0.7rem"></i>' : (i + 1)}
          </div>
          <div class="flex-1">
            <div style="font-size:var(--text-sm);font-weight:600">${t.name}</div>
            <div style="font-size:var(--text-xs);color:var(--text-light)"><i class="fa-solid fa-location-dot"></i> ${t.loc}</div>
          </div>
          ${t.visited ? '<span class="badge badge-success" style="font-size:0.6rem"><i class="fa-solid fa-check"></i> Visited</span>' :
            (i === 6 ? '<button class="btn btn-sm btn-primary" onclick="NavEngine.showToast(\'Checked in!\')">Check In</button>' :
            '<span style="font-size:var(--text-xs);color:var(--text-muted)">Not visited</span>')}
        </div>
      `).join('')}
    </div>
  `,

  // Route Planner
  route_planner: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Route Planner</span>
    </div>
    <div class="section">
      <div class="form-group"><label class="form-label form-required">Starting From</label><input class="form-input" value="Chennai" placeholder="Your starting location"></div>
      <div class="card mb-4">
        <div class="card-body">
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-3)"><i class="fa-solid fa-route" style="color:var(--primary)"></i> Optimized Route</h4>
          <div class="flex items-center gap-2 mb-2">
            <span class="badge badge-info">Day 1</span>
            <span style="font-size:var(--text-sm)">Thirunallar → Suryanar → Thingaloor</span>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <span class="badge badge-info">Day 2</span>
            <span style="font-size:var(--text-sm)">Alangudi → Kanjanoor → Thirunageswaram</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="badge badge-info">Day 3</span>
            <span style="font-size:var(--text-sm)">Vaitheeswaran → Thiruvenkadu → Keezhperumpallam</span>
          </div>
        </div>
      </div>
      <div class="card mb-4"><div class="card-body">
        <div class="flex items-center justify-between mb-2"><span style="font-size:var(--text-sm)">Total Distance</span><span style="font-size:var(--text-sm);font-weight:700">285 km</span></div>
        <div class="flex items-center justify-between mb-2"><span style="font-size:var(--text-sm)">Estimated Duration</span><span style="font-size:var(--text-sm);font-weight:700">2 nights / 3 days</span></div>
        <div class="flex items-center justify-between"><span style="font-size:var(--text-sm)">Budget Estimate</span><span style="font-size:var(--text-sm);font-weight:700;color:var(--primary)">₹4,500 - ₹8,000</span></div>
      </div></div>
      <div class="flex gap-2">
        <button class="btn btn-primary flex-1" onclick="NavEngine.showToast('Route saved!')"><i class="fa-solid fa-bookmark"></i> Save Route</button>
        <button class="btn btn-outline flex-1" onclick="NavEngine.showToast('PDF downloading!')"><i class="fa-solid fa-download"></i> Download PDF</button>
      </div>
    </div>
  `,

  // Badges
  badges: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">My Badges</span>
    </div>
    <div class="section" style="text-align:center;padding-bottom:0">
      <div style="font-size:var(--text-3xl);font-weight:900;color:var(--primary)">2</div>
      <div style="font-size:var(--text-sm);color:var(--text-light);margin-bottom:var(--space-4)">Badges Earned</div>
    </div>
    <div class="section">
      <div class="badge-grid">
        <div class="badge-card earned">
          <div class="bc-icon">🏆</div>
          <div class="bc-name">Temple Explorer</div>
          <div style="font-size:0.6rem;color:var(--text-light)">10+ temples</div>
        </div>
        <div class="badge-card earned">
          <div class="bc-icon">🙏</div>
          <div class="bc-name">Devoted</div>
          <div style="font-size:0.6rem;color:var(--text-light)">20+ poojas</div>
        </div>
        <div class="badge-card locked">
          <div class="bc-icon">☀️</div>
          <div class="bc-name">Navagraha</div>
          <div style="font-size:0.6rem;color:var(--text-light)">6/9 temples</div>
        </div>
        <div class="badge-card locked">
          <div class="bc-icon">🔱</div>
          <div class="bc-name">Jyotirlinga</div>
          <div style="font-size:0.6rem;color:var(--text-light)">3/12 temples</div>
        </div>
        <div class="badge-card locked">
          <div class="bc-icon">💰</div>
          <div class="bc-name">Generous</div>
          <div style="font-size:0.6rem;color:var(--text-light)">₹10K+</div>
        </div>
        <div class="badge-card locked">
          <div class="bc-icon">🤝</div>
          <div class="bc-name">Volunteer</div>
          <div style="font-size:0.6rem;color:var(--text-light)">50+ hours</div>
        </div>
      </div>
    </div>
  `,

  // Travel Journal
  travel_journal: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Travel Journal</span>
      <button class="back-btn" onclick="NavEngine.showToast('New entry coming soon!')"><i class="fa-solid fa-plus"></i></button>
    </div>
    <div class="section">
      ${[
        { title: 'Navagraha Day 2 — Suryanar to Thingaloor', date: 'Mar 16, 2026', content: 'Started early morning at Suryanar Kovil. The sunrise abhishekam was breathtaking. Drove 20km to Thingaloor for Chandra temple — peaceful and less crowded. Both temples done before lunch!', temples: 2, photos: 8, mood: '🙏 Spiritual' },
        { title: 'First Visit — Vaitheeswaran Kovil', date: 'Mar 15, 2026', content: 'The temple dedicated to planet Mars (Angaraka). Tried the famous Nadi leaf reading here — fascinating experience! The temple pond area is very serene.', temples: 1, photos: 5, mood: '😊 Excited' },
        { title: 'Planning the Navagraha Trail', date: 'Mar 14, 2026', content: 'Researched the route, booked a car for 3 days. Packed essentials — prayer items, white clothing, and prasadam boxes. Starting from Chennai tomorrow!', temples: 0, photos: 0, mood: '📝 Planning' },
        { title: 'Brihadeeswarar — The Big Temple', date: 'Feb 22, 2026', content: 'Visited the UNESCO World Heritage site in Thanjavur. The main lingam is one of the tallest Shiva lingams. The architecture is mind-blowing — 1000 years old and still standing strong!', temples: 1, photos: 12, mood: '🤩 Amazed' },
        { title: 'Palani Murugan — Hilltop Darshan', date: 'Feb 10, 2026', content: 'Took the winch to the hilltop. Early morning darshan with barely any queue. The panchamirtham here is world-famous. A must-visit for every Murugan devotee!', temples: 1, photos: 6, mood: '⛰️ Adventurous' },
        { title: 'Meenakshi Temple — Night Festival', date: 'Jan 28, 2026', content: 'Attended the night ceremony — the grand Meenakshi procession with music and lights. The 1000 pillar hall is a masterpiece. Spent 3 hours and still felt it was not enough.', temples: 1, photos: 15, mood: '✨ Mesmerized' },
      ].map(j => `
        <div class="card mb-3">
          <div class="card-body">
            <div class="flex items-center justify-between mb-2">
              <span style="font-size:var(--text-xs);color:var(--text-muted)"><i class="fa-regular fa-calendar"></i> ${j.date}</span>
              <span class="badge badge-primary">${j.mood}</span>
            </div>
            <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-2)">${j.title}</h4>
            <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:var(--leading-relaxed)">${j.content}</p>
            <div class="flex items-center gap-3 mt-3">
              ${j.temples > 0 ? '<span class="badge badge-info"><i class="fa-solid fa-place-of-worship"></i> ' + j.temples + ' temple' + (j.temples > 1 ? 's' : '') + '</span>' : ''}
              ${j.photos > 0 ? '<span class="badge badge-gold"><i class="fa-solid fa-camera"></i> ' + j.photos + ' photos</span>' : ''}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="height:var(--space-4)"></div>
    <button class="fab" onclick="NavEngine.showToast('New journal entry coming soon!')"><i class="fa-solid fa-pen"></i></button>
  `,

  // Trip Photos
  trip_photos: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Trip Photos</span>
    </div>
    <div class="section">
      <div style="text-align:center;margin-bottom:var(--space-4)">
        <div style="font-size:var(--text-2xl);font-weight:800;color:var(--primary)">48</div>
        <div style="font-size:var(--text-sm);color:var(--text-light)">Photos from 6 trips</div>
      </div>

      <div class="section-title mb-3">Navagraha Trail — Mar 2026</div>
      <div class="grid grid-cols-3 gap-2 mb-4">
        ${Array(9).fill(0).map((_, i) => `
          <div style="aspect-ratio:1;background:var(--bg-inset);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center">
            <i class="fa-solid fa-${['sun','moon','star','gopuram','om','fire','sun','moon','star'][i]}" style="font-size:1.5rem;color:var(--text-muted)"></i>
          </div>
        `).join('')}
      </div>

      <div class="section-title mb-3">Thanjavur Trip — Feb 2026</div>
      <div class="grid grid-cols-3 gap-2 mb-4">
        ${Array(6).fill(0).map((_, i) => `
          <div style="aspect-ratio:1;background:var(--bg-inset);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center">
            <i class="fa-solid fa-${['gopuram','image','camera','gopuram','image','camera'][i]}" style="font-size:1.5rem;color:var(--text-muted)"></i>
          </div>
        `).join('')}
      </div>

      <div class="section-title mb-3">Palani Trip — Feb 2026</div>
      <div class="grid grid-cols-3 gap-2">
        ${Array(6).fill(0).map((_, i) => `
          <div style="aspect-ratio:1;background:var(--bg-inset);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center">
            <i class="fa-solid fa-${['mountain','place-of-worship','image','mountain','gopuram','camera'][i]}" style="font-size:1.5rem;color:var(--text-muted)"></i>
          </div>
        `).join('')}
      </div>
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  map: () => `
    <div class="app-header"><span class="header-title">Visited Temples</span></div>
    <div class="section">
      <div style="height:300px;background:var(--bg-inset);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-4)">
        <i class="fa-solid fa-map-location-dot" style="font-size:3rem;color:var(--text-muted)"></i>
        <span style="font-size:var(--text-sm);color:var(--text-light)">Interactive map with temple pins</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="stat-card"><div class="stat-value" style="color:var(--primary)">24</div><div class="stat-label">Temples Visited</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--sacred-green)">4</div><div class="stat-label">States Covered</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--sacred-purple)">6</div><div class="stat-label">Deity Types</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--accent-dark)">3</div><div class="stat-label">Active Trails</div></div>
      </div>
    </div>
  `,

  profile: () => `
    <div style="background:linear-gradient(135deg,var(--sacred-purple),#7B1FA2);padding:66px var(--space-5) var(--space-6);text-align:center">
      <div class="avatar avatar-xl" style="margin:0 auto var(--space-3);border:3px solid rgba(255,255,255,0.3);background:linear-gradient(135deg,#CE93D8,#AB47BC)">MS</div>
      <h3 style="color:white;font-size:var(--text-lg);font-weight:700">Meera Shankar</h3>
      <p style="color:rgba(255,255,255,0.8);font-size:var(--text-sm)">Pilgrim — 24 temples visited</p>
      <div class="flex gap-2 justify-center mt-2">
        <span class="badge" style="background:rgba(255,255,255,0.15);color:white"><i class="fa-solid fa-trophy"></i> 2 badges</span>
        <span class="badge" style="background:rgba(255,255,255,0.15);color:white"><i class="fa-solid fa-route"></i> 3 trails</span>
      </div>
    </div>
    <div class="section">
      <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-lg);overflow:hidden">
        <div class="list-item" onclick="NavEngine.navigateTo('badges')"><div class="li-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-trophy"></i></div><div class="li-content"><div class="li-title">Badges & Achievements</div><div class="li-subtitle">2 earned, 4 in progress</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item" onclick="NavEngine.navigateTo('trip_photos')"><div class="li-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-camera"></i></div><div class="li-content"><div class="li-title">Trip Photos</div><div class="li-subtitle">48 photos</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item" onclick="NavEngine.navigateTo('travel_journal')"><div class="li-icon" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)"><i class="fa-solid fa-book"></i></div><div class="li-content"><div class="li-title">Travel Journal</div><div class="li-subtitle">6 entries</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item" onclick="NavEngine.toggleTheme()"><div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-moon"></i></div><div class="li-content"><div class="li-title">Dark Mode</div></div><div class="li-action"><button class="toggle ${NavEngine.isDark()?'active':''}"></button></div></div>
      </div>
    </div>
  `,
};

screens.trail_detail.navTab = 'home';
screens.route_planner.navTab = 'home';
screens.badges.navTab = 'profile';
screens.travel_journal.navTab = 'profile';
screens.trip_photos.navTab = 'profile';

NavEngine.init({
  screens,
  startScreen: 'home',
  bottomNav: [
    { screen: 'home', icon: 'fa-solid fa-route', label: 'Trails' },
    { screen: 'map', icon: 'fa-solid fa-map-location-dot', label: 'Map' },
    { screen: 'badges', icon: 'fa-solid fa-trophy', label: 'Badges' },
    { screen: 'profile', icon: 'fa-solid fa-circle-user', label: 'Profile' },
  ],
});
