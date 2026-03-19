/* ============================================================
   D1 — Regular Devotee — App Screens
   ============================================================ */

// ===== Dummy Data =====
const TEMPLES = [
  { id: 'meenakshi', name: 'Meenakshi Amman Temple', loc: 'Madurai, TN', deity: 'Devi', cat: 'devi', rating: 4.8, reviews: 2450, dist: '2.3 km', crowd: 'medium', timings: { m: '5:00 AM - 12:30 PM', e: '4:00 PM - 9:30 PM' } },
  { id: 'kapaleeshwarar', name: 'Kapaleeshwarar Temple', loc: 'Chennai, TN', deity: 'Shiva', cat: 'shiva', rating: 4.6, reviews: 1200, dist: '0.8 km', crowd: 'low', timings: { m: '6:00 AM - 12:00 PM', e: '4:00 PM - 9:00 PM' } },
  { id: 'tirumala', name: 'Tirumala Venkateswara', loc: 'Tirupati, AP', deity: 'Vishnu', cat: 'vishnu', rating: 4.9, reviews: 5200, dist: '580 km', crowd: 'high', timings: { m: '3:00 AM - 12:00 PM', e: '1:00 PM - 9:00 PM' } },
  { id: 'brihadeeswarar', name: 'Brihadeeswarar Temple', loc: 'Thanjavur, TN', deity: 'Shiva', cat: 'shiva', rating: 4.7, reviews: 1800, dist: '340 km', crowd: 'low', timings: { m: '6:00 AM - 12:30 PM', e: '4:00 PM - 8:30 PM' } },
  { id: 'palani', name: 'Palani Murugan Temple', loc: 'Palani, TN', deity: 'Murugan', cat: 'murugan', rating: 4.7, reviews: 2100, dist: '420 km', crowd: 'medium', timings: { m: '5:30 AM - 1:00 PM', e: '4:00 PM - 9:30 PM' } },
  { id: 'ranganatha', name: 'Ranganathaswamy Temple', loc: 'Srirangam, TN', deity: 'Vishnu', cat: 'vishnu', rating: 4.8, reviews: 1900, dist: '320 km', crowd: 'low', timings: { m: '6:00 AM - 1:00 PM', e: '3:30 PM - 9:00 PM' } },
];

const SERVICES = [
  { id: 'archana', name: 'Archana', desc: 'Basic prayer with name chanting', price: 50, duration: '10 min' },
  { id: 'special_archana', name: 'Special Archana', desc: 'With nakshatra & gothram chanting', price: 100, duration: '15 min' },
  { id: 'abhishekam', name: 'Abhishekam', desc: 'Sacred bathing of deity with milk, honey', price: 500, duration: '30 min' },
  { id: 'sahasranama', name: 'Sahasranama Archana', desc: '1008 names chanting', price: 200, duration: '20 min' },
  { id: 'homam', name: 'Homam (Fire Ritual)', desc: 'Sacred fire ritual with mantras', price: 2000, duration: '1 hour' },
  { id: 'ganapathy_homam', name: 'Ganapathy Homam', desc: 'For obstacle removal & new beginnings', price: 1500, duration: '45 min' },
  { id: 'navagraha', name: 'Navagraha Pooja', desc: 'For planetary appeasement', price: 300, duration: '20 min' },
];

const USER = { name: 'Ramesh', fullName: 'Ramesh Kumar', phone: '98765 43210', nakshatra: 'Ashwini', rasi: 'Mesham', gothram: 'Kashyapa' };

// ===== Screen Templates =====
const screens = {

  // ===== HOME SCREEN =====
  home: () => `
    <div class="app-header-gradient" style="padding-top:0">
      <div class="flex items-center justify-between">
        <div>
          <div style="font-size:var(--text-lg);font-weight:800">
            <i class="fa-solid fa-place-of-worship" style="margin-right:6px"></i> Soruban Temple
          </div>
          <div style="font-size:var(--text-xs);opacity:0.8;margin-top:2px">${NavEngine.getGreeting()}, ${USER.name}!</div>
        </div>
        <div class="flex gap-2">
          <button class="header-icon-btn" onclick="NavEngine.navigateTo('notifications')"><i class="fa-solid fa-bell"></i></button>
          <button class="header-icon-btn" onclick="NavEngine.navigateTo('profile')"><i class="fa-solid fa-user"></i></button>
        </div>
      </div>
    </div>

    <!-- Panchang Card -->
    <div class="section" style="padding-top:var(--space-4)">
      <div class="panchang-card">
        <div class="pc-date">March 18, 2026 — Tuesday</div>
        <div class="pc-tamil">பங்குனி 4, விகாரி — செவ்வாய்</div>
        <div class="panchang-grid">
          <div class="panchang-item"><i class="fa-solid fa-moon"></i> <span><span class="pi-label">Tithi: </span><span class="pi-value">Chathurthi</span></span></div>
          <div class="panchang-item"><i class="fa-solid fa-star"></i> <span><span class="pi-label">Star: </span><span class="pi-value">Rohini</span></span></div>
          <div class="panchang-item" style="background:rgba(255,80,80,0.2)"><i class="fa-solid fa-ban"></i> <span><span class="pi-label">Rahu: </span><span class="pi-value">3:00-4:30</span></span></div>
          <div class="panchang-item" style="background:rgba(80,255,80,0.2)"><i class="fa-solid fa-check-circle"></i> <span><span class="pi-label">Nalla: </span><span class="pi-value">7:30-9:00</span></span></div>
        </div>
      </div>
    </div>

    <!-- Connected Temple -->
    <div class="section" style="padding-top:0;padding-bottom:0">
      <div class="connected-temple">
        <div class="ct-icon"><i class="fa-solid fa-place-of-worship"></i></div>
        <div class="ct-info">
          <div class="ct-name">Kapaleeshwarar Temple</div>
          <div class="ct-loc"><i class="fa-solid fa-location-dot"></i> Mylapore, Chennai — 0.8 km</div>
        </div>
        <span class="ct-change" onclick="NavEngine.navigateTo('temple_list')">Change</span>
      </div>
    </div>

    <!-- Quick Services -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">Quick Services</span>
      </div>
      <div class="service-grid stagger-children">
        <div class="service-item" onclick="NavEngine.navigateTo('book_pooja')">
          <div class="service-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-fire"></i></div>
          <span class="service-name">Book Pooja</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('donation')">
          <div class="service-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-hand-holding-heart"></i></div>
          <span class="service-name">Donate</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('darshan')">
          <div class="service-icon" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)"><i class="fa-solid fa-ticket"></i></div>
          <span class="service-name">Darshan Token</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('live_darshan')">
          <div class="service-icon" style="background:var(--sacred-red-bg);color:var(--sacred-red)"><i class="fa-solid fa-video"></i></div>
          <span class="service-name">Live Darshan</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('annadhanam')">
          <div class="service-icon" style="background:rgba(0,131,143,0.08);color:var(--sacred-teal)"><i class="fa-solid fa-utensils"></i></div>
          <span class="service-name">Annadhanam</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('nalla_neram')">
          <div class="service-icon" style="background:var(--sacred-purple-bg);color:var(--sacred-purple)"><i class="fa-solid fa-clock"></i></div>
          <span class="service-name">Nalla Neram</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('rasi_palan')">
          <div class="service-icon" style="background:rgba(173,20,87,0.08);color:var(--sacred-pink)"><i class="fa-solid fa-star"></i></div>
          <span class="service-name">Rasi Palan</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('events')">
          <div class="service-icon" style="background:rgba(239,108,0,0.08);color:#EF6C00"><i class="fa-solid fa-calendar-days"></i></div>
          <span class="service-name">Events</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('shop')">
          <div class="service-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-cart-shopping"></i></div>
          <span class="service-name">Prasadam Shop</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('book_priest')">
          <div class="service-icon" style="background:var(--sacred-red-bg);color:var(--sacred-red)"><i class="fa-solid fa-person-praying"></i></div>
          <span class="service-name">Book Priest</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('astrologer')">
          <div class="service-icon" style="background:var(--sacred-purple-bg);color:var(--sacred-purple)"><i class="fa-solid fa-moon"></i></div>
          <span class="service-name">Astrologer</span>
        </div>
        <div class="service-item" onclick="NavEngine.navigateTo('volunteer')">
          <div class="service-icon" style="background:rgba(0,105,92,0.08);color:var(--seg-volunteer)"><i class="fa-solid fa-hands-helping"></i></div>
          <span class="service-name">Volunteer</span>
        </div>
      </div>
    </div>

    <!-- Festival Alert -->
    <div class="section" style="padding-top:0">
      <div class="festival-alert">
        <span class="fa-icon"><i class="fa-solid fa-fire flame-flicker"></i></span>
        <div class="fa-content">
          <div class="fa-title">Panguni Uthiram</div>
          <div class="fa-sub">Grand celebrations at major temples</div>
        </div>
        <span class="fa-countdown">5 days</span>
      </div>
    </div>

    <!-- Upcoming at Temple -->
    <div class="section" style="padding-top:0">
      <div class="section-header">
        <span class="section-title">Upcoming at Your Temple</span>
        <span class="section-link" onclick="NavEngine.navigateTo('events')">See All <i class="fa-solid fa-chevron-right" style="font-size:0.6rem"></i></span>
      </div>
      <div class="upcoming-mini">
        <div class="upcoming-item" onclick="NavEngine.navigateTo('events')">
          <div class="ui-date"><div class="ui-day">23</div><div class="ui-month">Mar</div></div>
          <div class="ui-info"><div class="ui-title">Panguni Uthiram Festival</div><div class="ui-time"><i class="fa-regular fa-clock"></i> All day — Special Abhishekam</div></div>
        </div>
        <div class="upcoming-item" onclick="NavEngine.navigateTo('events')">
          <div class="ui-date"><div class="ui-day">25</div><div class="ui-month">Mar</div></div>
          <div class="ui-info"><div class="ui-title">Pradosham Special Pooja</div><div class="ui-time"><i class="fa-regular fa-clock"></i> 6:00 PM — Shiva Abhishekam</div></div>
        </div>
        <div class="upcoming-item" onclick="NavEngine.navigateTo('events')">
          <div class="ui-date"><div class="ui-day">29</div><div class="ui-month">Mar</div></div>
          <div class="ui-info"><div class="ui-title">Ekadashi Fasting Day</div><div class="ui-time"><i class="fa-regular fa-clock"></i> Special Vishnu Sahasranama</div></div>
        </div>
      </div>
    </div>

    <!-- Nearby Temples -->
    <div class="section" style="padding-top:0">
      <div class="section-header">
        <span class="section-title">Nearby Temples</span>
        <span class="section-link" onclick="NavEngine.navigateTo('temple_list')">View All <i class="fa-solid fa-chevron-right" style="font-size:0.6rem"></i></span>
      </div>
      <div class="temple-scroll">
        ${TEMPLES.slice(0, 4).map(t => `
          <div class="temple-card" onclick="selectTemple('${t.id}')">
            <div class="temple-card-img">
              <div style="width:100%;height:100%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;color:white;font-size:2.5rem"><i class="fa-solid fa-gopuram"></i></div>
              <div class="crowd-badge">${NavEngine.crowdBadge(t.crowd)}</div>
            </div>
            <div class="temple-card-body">
              <h4>${t.name}</h4>
              <div class="tc-loc"><i class="fa-solid fa-location-dot"></i> ${t.loc}</div>
              <div class="tc-meta">
                ${NavEngine.starRating(t.rating)} <span class="tc-distance">${t.dist}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="height:var(--space-4)"></div>
  `,

  // ===== TEMPLE LIST =====
  temple_list: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Temples</span>
      <button class="back-btn" onclick="NavEngine.showToast('Map view coming soon!')"><i class="fa-solid fa-map-location-dot"></i></button>
    </div>

    <div class="section" style="padding-top:0">
      <div class="phone-input-group" style="margin-bottom:var(--space-3)">
        <div class="phone-prefix" style="background:transparent;border:none"><i class="fa-solid fa-magnifying-glass" style="color:var(--text-muted)"></i></div>
        <input type="text" class="phone-input" placeholder="Search temples..." style="font-size:var(--text-base);font-weight:400">
      </div>

      <div class="chip-row" style="margin-bottom:var(--space-4)">
        <button class="chip active">All</button>
        <button class="chip"><i class="fa-solid fa-location-dot"></i> Nearby</button>
        <button class="chip">🔱 Shiva</button>
        <button class="chip">🕉 Vishnu</button>
        <button class="chip">🪷 Devi</button>
        <button class="chip">🗡 Murugan</button>
        <button class="chip">🐘 Ganesh</button>
      </div>

      ${TEMPLES.map(t => `
        <div class="temple-list-card" onclick="selectTemple('${t.id}')">
          <div class="tlc-img"><i class="fa-solid fa-gopuram"></i></div>
          <div class="tlc-content">
            <div class="tlc-name">${t.name}</div>
            <div class="tlc-loc"><i class="fa-solid fa-location-dot"></i> ${t.loc} — ${t.dist}</div>
            <div class="tlc-meta">
              <span class="tc-rating"><i class="fa-solid fa-star"></i> ${t.rating}</span>
              ${NavEngine.crowdBadge(t.crowd)}
              <span class="badge badge-info">${t.deity}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `,

  // ===== TEMPLE DETAIL =====
  temple_detail: () => {
    const t = TEMPLES.find(x => x.id === (window._selectedTemple || 'kapaleeshwarar')) || TEMPLES[1];
    return `
    <div style="height:180px;background:var(--gradient-hero);position:relative;display:flex;align-items:center;justify-content:center">
      <i class="fa-solid fa-gopuram" style="font-size:4rem;color:rgba(255,255,255,0.2)"></i>
      <div style="position:absolute;top:12px;left:12px">
        <button class="back-btn" style="background:rgba(0,0,0,0.3);color:white" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      </div>
      <div style="position:absolute;top:12px;right:12px;display:flex;gap:8px">
        <button class="back-btn" style="background:rgba(0,0,0,0.3);color:white" onclick="NavEngine.showToast('Saved!')"><i class="fa-regular fa-heart"></i></button>
        <button class="back-btn" style="background:rgba(0,0,0,0.3);color:white"><i class="fa-solid fa-share-nodes"></i></button>
      </div>
      <div style="position:absolute;bottom:16px;left:16px;right:16px;color:white">
        <h2 style="font-size:var(--text-xl);font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,0.3)">${t.name}</h2>
        <div style="font-size:var(--text-sm);opacity:0.9;margin-top:4px"><i class="fa-solid fa-location-dot"></i> ${t.loc}</div>
      </div>
    </div>

    <div class="section">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          ${NavEngine.starRating(t.rating)}
          <span style="font-size:var(--text-sm);font-weight:600">${t.rating}</span>
          <span style="font-size:var(--text-xs);color:var(--text-light)">(${t.reviews} reviews)</span>
        </div>
        ${NavEngine.crowdBadge(t.crowd)}
      </div>

      <div class="flex gap-2 mb-4">
        <button class="btn btn-primary flex-1" onclick="NavEngine.navigateTo('book_pooja')"><i class="fa-solid fa-fire"></i> Book Pooja</button>
        <button class="btn btn-outline flex-1" onclick="NavEngine.navigateTo('donation')"><i class="fa-solid fa-hand-holding-heart"></i> Donate</button>
      </div>

      <div class="tabs mb-4">
        <button class="tab active">About</button>
        <button class="tab">Services</button>
        <button class="tab">Events</button>
        <button class="tab">Reviews</button>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-2)"><i class="fa-regular fa-clock" style="color:var(--primary)"></i> Timings</h4>
          <div class="flex justify-between mb-2">
            <span style="font-size:var(--text-sm);color:var(--text-light)">Morning</span>
            <span style="font-size:var(--text-sm);font-weight:600">${t.timings.m}</span>
          </div>
          <div class="flex justify-between">
            <span style="font-size:var(--text-sm);color:var(--text-light)">Evening</span>
            <span style="font-size:var(--text-sm);font-weight:600">${t.timings.e}</span>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-2)"><i class="fa-solid fa-circle-info" style="color:var(--sacred-blue)"></i> About</h4>
          <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:var(--leading-relaxed)">
            Ancient temple dedicated to Lord ${t.deity}, known for its magnificent gopuram and rich cultural heritage. A must-visit for every devotee.
          </p>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-3)"><i class="fa-solid fa-fire" style="color:var(--primary)"></i> Available Services</h4>
          ${SERVICES.slice(0, 4).map(s => `
            <div class="flex items-center justify-between py-2" style="border-bottom:1px solid var(--divider)">
              <div>
                <div style="font-size:var(--text-sm);font-weight:600">${s.name}</div>
                <div style="font-size:var(--text-xs);color:var(--text-light)">${s.duration}</div>
              </div>
              <div class="flex items-center gap-2">
                <span style="font-size:var(--text-sm);font-weight:700;color:var(--primary)">${NavEngine.formatCurrency(s.price)}</span>
                <button class="btn btn-sm btn-primary" onclick="NavEngine.navigateTo('book_pooja')">Book</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-2)"><i class="fa-solid fa-location-dot" style="color:var(--sacred-green)"></i> How to Reach</h4>
          <p style="font-size:var(--text-sm);color:var(--text-secondary)">${t.loc}</p>
          <div class="flex gap-2 mt-3">
            <span class="badge badge-info"><i class="fa-solid fa-square-parking"></i> Parking</span>
            <span class="badge badge-info"><i class="fa-solid fa-wheelchair"></i> Accessible</span>
            <span class="badge badge-info"><i class="fa-solid fa-restroom"></i> Restroom</span>
          </div>
        </div>
      </div>
    </div>
    <div style="height:var(--space-4)"></div>
  `},

  // ===== BOOK POOJA (QR Archana) =====
  book_pooja: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Book Pooja</span>
    </div>

    <div class="stepper">
      <div class="step-dot active" id="step1">1</div><div class="step-line" id="line1"></div>
      <div class="step-dot" id="step2">2</div><div class="step-line" id="line2"></div>
      <div class="step-dot" id="step3">3</div><div class="step-line" id="line3"></div>
      <div class="step-dot" id="step4">4</div>
    </div>

    <div id="pooja-step-content">
      <!-- Step 1: Select Service -->
      <div class="booking-step">
        <div class="booking-step-title">Select Service</div>
        <div class="service-radio">
          ${SERVICES.map((s, i) => `
            <div class="service-option ${i === 0 ? 'selected' : ''}" onclick="selectService(this, '${s.id}')">
              <div class="so-radio"></div>
              <div class="so-info">
                <div class="so-name">${s.name}</div>
                <div class="so-desc">${s.desc} — ${s.duration}</div>
              </div>
              <div class="so-price">${NavEngine.formatCurrency(s.price)}</div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary btn-block btn-lg mt-4" onclick="goToStep(2)">
          Continue <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `,

  // ===== QR CODE RESULT =====
  qr_result: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.navigateTo('home')"><i class="fa-solid fa-house-chimney"></i></button>
      <span class="bh-title">Booking Confirmed</span>
    </div>

    <div class="qr-display">
      <div style="margin-bottom:var(--space-4)">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--sacred-green);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3);color:white;font-size:1.8rem" class="qr-celebrate">
          <i class="fa-solid fa-check"></i>
        </div>
        <span class="badge badge-solid-success"><i class="fa-solid fa-circle-check"></i> Confirmed</span>
      </div>

      <div class="qr-frame gold-glow">
        <div class="qr-placeholder"></div>
      </div>

      <div class="qr-booking-id">${NavEngine.generateBookingId()}</div>
      <div class="qr-instruction">Show this QR code to the priest at the temple</div>

      <div class="card" style="text-align:left;margin-bottom:var(--space-4)">
        <div class="card-body">
          <div class="ps-row"><span>Service</span><span style="font-weight:600">Archana</span></div>
          <div class="ps-row"><span>Temple</span><span style="font-weight:600">Kapaleeshwarar Temple</span></div>
          <div class="ps-row"><span>Date</span><span style="font-weight:600">March 20, 2026</span></div>
          <div class="ps-row"><span>Slot</span><span style="font-weight:600">Morning 9:00 - 9:30 AM</span></div>
          <div class="ps-row"><span>Devotee</span><span style="font-weight:600">${USER.fullName}</span></div>
          <div class="ps-row"><span>Nakshatra</span><span style="font-weight:600">${USER.nakshatra}</span></div>
          <div class="ps-row"><span>Gothram</span><span style="font-weight:600">${USER.gothram}</span></div>
          <div class="ps-row total"><span>Amount Paid</span><span style="color:var(--sacred-green)">₹50</span></div>
        </div>
      </div>

      <div class="flex gap-3">
        <button class="btn btn-outline flex-1" onclick="NavEngine.showToast('QR downloaded!')"><i class="fa-solid fa-download"></i> Download</button>
        <button class="btn btn-outline flex-1" onclick="NavEngine.showToast('Shared!')"><i class="fa-solid fa-share-nodes"></i> Share</button>
      </div>

      <button class="btn btn-ghost btn-block mt-3" onclick="NavEngine.showToast('Added to calendar!')"><i class="fa-regular fa-calendar-plus"></i> Add to Calendar</button>
    </div>
  `,

  // ===== DONATION =====
  donation: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Donate</span>
    </div>

    <div class="section">
      <div class="connected-temple mb-4">
        <div class="ct-icon"><i class="fa-solid fa-place-of-worship"></i></div>
        <div class="ct-info"><div class="ct-name">Kapaleeshwarar Temple</div><div class="ct-loc">Mylapore, Chennai</div></div>
      </div>

      <div class="section-title mb-3">Select Amount</div>
      <div class="amount-grid">
        <button class="amount-btn" onclick="selectAmount(this)">₹100</button>
        <button class="amount-btn" onclick="selectAmount(this)">₹251</button>
        <button class="amount-btn active" onclick="selectAmount(this)">₹501</button>
        <button class="amount-btn" onclick="selectAmount(this)">₹1,001</button>
        <button class="amount-btn" onclick="selectAmount(this)">₹2,500</button>
        <button class="amount-btn" onclick="selectAmount(this)">₹5,000</button>
      </div>

      <div class="form-group">
        <label class="form-label">Or enter custom amount</label>
        <input type="number" class="form-input" placeholder="Enter amount in ₹">
      </div>

      <div class="section-title mb-3">Donation Type</div>
      <div class="donation-type-grid">
        <div class="donation-type-btn selected" onclick="selectDonationType(this)"><i class="fa-solid fa-hand-holding-heart" style="color:var(--sacred-green)"></i><span>General</span></div>
        <div class="donation-type-btn" onclick="selectDonationType(this)"><i class="fa-solid fa-utensils" style="color:var(--sacred-teal)"></i><span>Annadhanam</span></div>
        <div class="donation-type-btn" onclick="selectDonationType(this)"><i class="fa-solid fa-gopuram" style="color:var(--primary)"></i><span>Renovation</span></div>
        <div class="donation-type-btn" onclick="selectDonationType(this)"><i class="fa-solid fa-fire" style="color:var(--accent-dark)"></i><span>Special Pooja</span></div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <div style="font-size:var(--text-sm);font-weight:600">Generate 80G Tax Receipt</div>
              <div style="font-size:var(--text-xs);color:var(--text-light)">Save tax on your donation</div>
            </div>
            <button class="toggle active" onclick="this.classList.toggle('active')"></button>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <div style="font-size:var(--text-sm);font-weight:600">Recurring Donation</div>
              <div style="font-size:var(--text-xs);color:var(--text-light)">Donate monthly automatically</div>
            </div>
            <button class="toggle" onclick="this.classList.toggle('active')"></button>
          </div>
        </div>
      </div>

      <button class="btn btn-primary btn-block btn-lg" onclick="NavEngine.showToast('Donation successful! Receipt sent to your email.')">
        <i class="fa-solid fa-heart"></i> Donate ₹501
      </button>
    </div>
  `,

  // ===== LIVE DARSHAN =====
  live_darshan: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Live Darshan</span>
    </div>

    <div class="section">
      <div class="live-player">
        <div class="live-badge-overlay"><span class="badge badge-solid-live"><span class="live-dot" style="width:6px;height:6px;margin-right:4px"></span> LIVE</span></div>
        <div class="viewer-count"><i class="fa-solid fa-eye"></i> 1,247</div>
        <div class="play-icon"><i class="fa-solid fa-play" style="margin-left:3px"></i></div>
      </div>

      <h3 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-1)">Kapaleeshwarar Temple</h3>
      <p style="font-size:var(--text-sm);color:var(--text-light);margin-bottom:var(--space-4)">Morning Abhishekam in progress</p>

      <div class="section-title mb-3">Today's Schedule</div>
      <div class="upcoming-mini">
        <div class="upcoming-item">
          <div class="ui-date"><div class="ui-day" style="font-size:var(--text-sm)">6:00</div><div class="ui-month">AM</div></div>
          <div class="ui-info"><div class="ui-title">Suprabhatam</div><div class="ui-time"><span class="badge badge-solid-success" style="font-size:0.6rem">Completed</span></div></div>
        </div>
        <div class="upcoming-item" style="border-color:var(--sacred-red);background:var(--sacred-red-bg)">
          <div class="ui-date"><div class="ui-day" style="font-size:var(--text-sm)">8:00</div><div class="ui-month">AM</div></div>
          <div class="ui-info"><div class="ui-title">Morning Abhishekam</div><div class="ui-time"><span class="badge badge-solid-live" style="font-size:0.6rem"><span class="live-dot" style="width:5px;height:5px;margin-right:3px"></span> Live Now</span></div></div>
        </div>
        <div class="upcoming-item">
          <div class="ui-date"><div class="ui-day" style="font-size:var(--text-sm)">12:00</div><div class="ui-month">PM</div></div>
          <div class="ui-info"><div class="ui-title">Uchikala Pooja</div><div class="ui-time"><i class="fa-regular fa-bell"></i> Set Reminder</div></div>
        </div>
        <div class="upcoming-item">
          <div class="ui-date"><div class="ui-day" style="font-size:var(--text-sm)">6:30</div><div class="ui-month">PM</div></div>
          <div class="ui-info"><div class="ui-title">Evening Deeparadhanai</div><div class="ui-time"><i class="fa-regular fa-bell"></i> Set Reminder</div></div>
        </div>
      </div>

      <div class="section-title mt-4 mb-3">Other Live Temples</div>
      <div class="temple-scroll">
        ${TEMPLES.slice(0, 3).map(t => `
          <div class="temple-card">
            <div class="temple-card-img">
              <div style="width:100%;height:100%;background:var(--gradient-dark);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:2rem"><i class="fa-solid fa-video"></i></div>
              <div class="crowd-badge"><span class="badge badge-solid-live" style="font-size:0.55rem"><span class="live-dot" style="width:5px;height:5px;margin-right:3px"></span> LIVE</span></div>
            </div>
            <div class="temple-card-body"><h4>${t.name}</h4><div class="tc-loc"><i class="fa-solid fa-location-dot"></i> ${t.loc}</div></div>
          </div>
        `).join('')}
      </div>
    </div>
  `,

  // ===== COMMUNITY =====
  community: () => `
    <div class="app-header">
      <span class="header-title">Community</span>
      <div class="header-actions">
        <button class="header-icon-btn btn-subtle"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>

    <div class="tabs">
      <button class="tab active">Feed</button>
      <button class="tab">Forum</button>
      <button class="tab">Groups</button>
    </div>

    <div class="section">
      <div class="post-card">
        <div class="post-header">
          <div class="avatar">RK</div>
          <div class="ph-info">
            <div class="ph-name">Ramesh Kumar <i class="fa-solid fa-circle-check ph-verified"></i></div>
            <div class="ph-time">2 hours ago</div>
          </div>
          <button class="btn-icon-sm btn-ghost"><i class="fa-solid fa-ellipsis"></i></button>
        </div>
        <div class="post-text">Beautiful morning darshan at Kapaleeshwarar Temple today. The abhishekam was divine! 🙏 Highly recommend the early morning slot for a peaceful experience.</div>
        <div class="post-image"><i class="fa-solid fa-gopuram"></i></div>
        <div class="post-actions">
          <button class="post-action liked" onclick="this.classList.toggle('liked')"><i class="fa-solid fa-heart"></i> 42</button>
          <button class="post-action"><i class="fa-regular fa-comment"></i> 8</button>
          <button class="post-action"><i class="fa-solid fa-share-nodes"></i> Share</button>
        </div>
      </div>

      <div class="post-card">
        <div class="post-header">
          <div class="avatar" style="background:var(--gradient-gold);color:var(--text-primary)">LD</div>
          <div class="ph-info">
            <div class="ph-name">Lakshmi Devi</div>
            <div class="ph-time">5 hours ago</div>
          </div>
          <button class="btn-icon-sm btn-ghost"><i class="fa-solid fa-ellipsis"></i></button>
        </div>
        <div class="post-text">Does anyone know the timing for Panguni Uthiram special darshan at Meenakshi Temple? Planning to visit with family.</div>
        <div class="post-actions">
          <button class="post-action"><i class="fa-regular fa-heart"></i> 15</button>
          <button class="post-action"><i class="fa-regular fa-comment"></i> 12</button>
          <button class="post-action"><i class="fa-solid fa-share-nodes"></i> Share</button>
        </div>
      </div>

      <div class="post-card">
        <div class="post-header">
          <div class="avatar" style="background:linear-gradient(135deg,var(--sacred-purple),var(--sacred-pink))">KS</div>
          <div class="ph-info">
            <div class="ph-name">Karthik Sundaram <i class="fa-solid fa-circle-check ph-verified"></i></div>
            <div class="ph-time">Yesterday</div>
          </div>
          <button class="btn-icon-sm btn-ghost"><i class="fa-solid fa-ellipsis"></i></button>
        </div>
        <div class="post-text">Completed my 7th Navagraha temple visit today! Only 2 more to go 🎯 The Suryanar Kovil was absolutely magnificent.</div>
        <div class="post-actions">
          <button class="post-action"><i class="fa-regular fa-heart"></i> 67</button>
          <button class="post-action"><i class="fa-regular fa-comment"></i> 23</button>
          <button class="post-action"><i class="fa-solid fa-share-nodes"></i> Share</button>
        </div>
      </div>
    </div>

    <button class="fab" onclick="NavEngine.showToast('Create post coming soon!')"><i class="fa-solid fa-plus"></i></button>
  `,

  // ===== FEED =====
  feed: () => `
    <div class="app-header">
      <span class="header-title">Temple Feed</span>
    </div>
    <div class="section">
      <div class="card mb-3">
        <div class="card-body">
          <span class="badge badge-primary mb-2"><i class="fa-solid fa-bullhorn"></i> Announcement</span>
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-1)">Online Pooja Booking Available</h4>
          <p style="font-size:var(--text-sm);color:var(--text-light);line-height:var(--leading-relaxed)">Book special pooja, darshan tokens, and homam services online with QR code.</p>
          <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-2)"><i class="fa-regular fa-clock"></i> 2 hours ago — Kapaleeshwarar Temple</div>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <span class="badge badge-danger mb-2"><i class="fa-solid fa-fire"></i> Festival Alert</span>
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-1)">Panguni Uthiram — March 23</h4>
          <p style="font-size:var(--text-sm);color:var(--text-light);line-height:var(--leading-relaxed)">Grand celebrations planned. Special darshan and pooja arrangements available for booking.</p>
          <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-2)"><i class="fa-regular fa-clock"></i> Today — All Temples</div>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <span class="badge badge-success mb-2"><i class="fa-solid fa-star"></i> Update</span>
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-1)">New: Navagraha Temple Trail</h4>
          <p style="font-size:var(--text-sm);color:var(--text-light);line-height:var(--leading-relaxed)">Plan your Navagraha temple pilgrimage with our new route planner feature.</p>
          <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-2)"><i class="fa-regular fa-clock"></i> Yesterday — Soruban Temple</div>
        </div>
      </div>
    </div>
  `,

  // ===== PROFILE =====
  profile: () => `
    <div style="background:var(--gradient-primary);padding:66px var(--space-5) var(--space-6);text-align:center;position:relative">
      <div class="avatar avatar-xl" style="margin:0 auto var(--space-3);border:3px solid rgba(255,255,255,0.3)">${USER.name[0]}</div>
      <h3 style="color:white;font-size:var(--text-lg);font-weight:700">${USER.fullName}</h3>
      <p style="color:rgba(255,255,255,0.8);font-size:var(--text-sm)">+91 ${USER.phone}</p>
      <div style="margin-top:var(--space-2);display:flex;gap:var(--space-2);justify-content:center">
        <span class="badge" style="background:rgba(255,255,255,0.15);color:white"><i class="fa-solid fa-star"></i> ${USER.nakshatra}</span>
        <span class="badge" style="background:rgba(255,255,255,0.15);color:white">${USER.rasi}</span>
        <span class="badge" style="background:rgba(255,255,255,0.15);color:white">${USER.gothram}</span>
      </div>
      <button style="position:absolute;top:66px;right:16px" class="header-icon-btn" onclick="NavEngine.navigateTo('edit_profile')"><i class="fa-solid fa-pen"></i></button>
    </div>

    <div class="section">
      <div class="profile-stats">
        <div class="profile-stat"><div class="ps-val">12</div><div class="ps-label">Temples Visited</div></div>
        <div class="profile-stat"><div class="ps-val">23</div><div class="ps-label">Poojas Booked</div></div>
        <div class="profile-stat"><div class="ps-val">₹8.5K</div><div class="ps-label">Donated</div></div>
      </div>

      <div class="profile-menu">
        <div class="list-item" onclick="NavEngine.navigateTo('my_bookings')">
          <div class="li-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-calendar-check"></i></div>
          <div class="li-content"><div class="li-title">My Bookings</div><div class="li-subtitle">View upcoming and past bookings</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
        <div class="list-item" onclick="NavEngine.navigateTo('donation_history')">
          <div class="li-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-receipt"></i></div>
          <div class="li-content"><div class="li-title">Donation History</div><div class="li-subtitle">Receipts and 80G certificates</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
        <div class="list-item" onclick="NavEngine.navigateTo('badges')">
          <div class="li-icon" style="background:var(--sacred-purple-bg);color:var(--sacred-purple)"><i class="fa-solid fa-trophy"></i></div>
          <div class="li-content"><div class="li-title">Badges & Achievements</div><div class="li-subtitle">3 badges earned</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
        <div class="list-item" onclick="NavEngine.navigateTo('saved_temples')">
          <div class="li-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-bookmark"></i></div>
          <div class="li-content"><div class="li-title">Saved Temples</div><div class="li-subtitle">4 temples saved</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
      </div>

      <div class="profile-menu">
        <div class="list-item" onclick="NavEngine.navigateTo('app_settings')">
          <div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-language"></i></div>
          <div class="li-content"><div class="li-title">Language</div><div class="li-subtitle">English</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
        <div class="list-item" onclick="NavEngine.toggleTheme()">
          <div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid ${NavEngine.isDark() ? 'fa-sun' : 'fa-moon'}"></i></div>
          <div class="li-content"><div class="li-title">Dark Mode</div><div class="li-subtitle">${NavEngine.isDark() ? 'On' : 'Off'}</div></div>
          <div class="li-action"><button class="toggle ${NavEngine.isDark() ? 'active' : ''}" onclick="event.stopPropagation();NavEngine.toggleTheme()"></button></div>
        </div>
        <div class="list-item" onclick="NavEngine.navigateTo('app_settings')">
          <div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-bell"></i></div>
          <div class="li-content"><div class="li-title">Notifications</div><div class="li-subtitle">All enabled</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
        <div class="list-item" onclick="NavEngine.navigateTo('app_settings')">
          <div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-globe"></i></div>
          <div class="li-content"><div class="li-title">NRI Mode</div><div class="li-subtitle">India</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
      </div>

      <div class="profile-menu">
        <div class="list-item" onclick="NavEngine.navigateTo('help_support')">
          <div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-circle-question"></i></div>
          <div class="li-content"><div class="li-title">Help & Support</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
        <div class="list-item">
          <div class="li-icon" style="background:var(--sacred-red-bg);color:var(--sacred-red)"><i class="fa-solid fa-right-from-bracket"></i></div>
          <div class="li-content"><div class="li-title" style="color:var(--sacred-red)">Logout</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
      </div>

      <p style="text-align:center;font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-4)">Soruban Temple v1.0.0</p>
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  // ===== MY BOOKINGS =====
  my_bookings: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">My Bookings</span>
    </div>

    <div class="tabs">
      <button class="tab active">Upcoming</button>
      <button class="tab">Completed</button>
      <button class="tab">Cancelled</button>
    </div>

    <div class="section">
      <div class="card mb-3 card-clickable" onclick="NavEngine.navigateTo('qr_result')">
        <div class="card-body">
          <div class="flex items-center justify-between mb-2">
            <span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Confirmed</span>
            <span style="font-size:var(--text-xs);color:var(--text-muted)">BK-20260320-045</span>
          </div>
          <h4 style="font-size:var(--text-md);font-weight:700">Archana</h4>
          <p style="font-size:var(--text-sm);color:var(--text-light)">Kapaleeshwarar Temple</p>
          <div class="flex items-center justify-between mt-2">
            <span style="font-size:var(--text-sm);color:var(--text-secondary)"><i class="fa-regular fa-calendar"></i> March 20, 2026 — 9:00 AM</span>
            <span style="font-size:var(--text-sm);font-weight:700;color:var(--primary)">₹50</span>
          </div>
          <div class="flex items-center gap-2 mt-3">
            <i class="fa-solid fa-qrcode" style="color:var(--accent);font-size:1.3rem"></i>
            <span style="font-size:var(--text-xs);color:var(--primary);font-weight:600">Tap to view QR code</span>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <div class="flex items-center justify-between mb-2">
            <span class="badge badge-gold"><i class="fa-solid fa-clock"></i> Upcoming</span>
            <span style="font-size:var(--text-xs);color:var(--text-muted)">BK-20260323-112</span>
          </div>
          <h4 style="font-size:var(--text-md);font-weight:700">Special Abhishekam</h4>
          <p style="font-size:var(--text-sm);color:var(--text-light)">Meenakshi Amman Temple</p>
          <div class="flex items-center justify-between mt-2">
            <span style="font-size:var(--text-sm);color:var(--text-secondary)"><i class="fa-regular fa-calendar"></i> March 23, 2026 — 7:00 AM</span>
            <span style="font-size:var(--text-sm);font-weight:700;color:var(--primary)">₹500</span>
          </div>
        </div>
      </div>
    </div>
  `,

  // ===== NOTIFICATIONS =====
  notifications: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Notifications</span>
    </div>
    <div class="section">
      <div class="list-item" style="background:var(--primary-bg);border-radius:var(--radius-md);margin-bottom:var(--space-2)">
        <div class="li-icon" style="background:var(--primary);color:white"><i class="fa-solid fa-fire"></i></div>
        <div class="li-content">
          <div class="li-title">Panguni Uthiram — 5 days away</div>
          <div class="li-subtitle">Book special darshan at your temple now</div>
        </div>
      </div>
      <div class="list-item" style="border-radius:var(--radius-md);margin-bottom:var(--space-2)">
        <div class="li-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-check-circle"></i></div>
        <div class="li-content">
          <div class="li-title">Booking Confirmed — Archana</div>
          <div class="li-subtitle">March 20, 9:00 AM at Kapaleeshwarar Temple</div>
        </div>
      </div>
      <div class="list-item" style="border-radius:var(--radius-md);margin-bottom:var(--space-2)">
        <div class="li-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-hand-holding-heart"></i></div>
        <div class="li-content">
          <div class="li-title">Thank you for your donation!</div>
          <div class="li-subtitle">₹501 to Kapaleeshwarar Temple — 80G receipt sent</div>
        </div>
      </div>
    </div>
  `,

  // ===== DARSHAN TOKEN =====
  darshan: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Darshan Token</span>
    </div>

    <div class="section">
      <div class="connected-temple mb-4">
        <div class="ct-icon"><i class="fa-solid fa-place-of-worship"></i></div>
        <div class="ct-info"><div class="ct-name">Kapaleeshwarar Temple</div><div class="ct-loc"><i class="fa-solid fa-location-dot"></i> Mylapore, Chennai</div></div>
        <span class="ct-change" onclick="NavEngine.navigateTo('temple_list')">Change</span>
      </div>

      <!-- Live Queue Status -->
      <div class="card mb-4" style="border-color:var(--sacred-blue);border-width:1.5px">
        <div class="card-body">
          <div class="flex items-center justify-between mb-2">
            <span style="font-size:var(--text-md);font-weight:700"><i class="fa-solid fa-users-line" style="color:var(--sacred-blue)"></i> Live Queue Status</span>
            <span class="badge badge-solid-live"><span class="live-dot" style="width:6px;height:6px;margin-right:4px"></span> Live</span>
          </div>
          <div class="grid grid-cols-3 gap-3 mt-3">
            <div class="text-center"><div style="font-size:var(--text-xl);font-weight:800;color:var(--sacred-blue)">47</div><div style="font-size:var(--text-xs);color:var(--text-light)">In Queue</div></div>
            <div class="text-center"><div style="font-size:var(--text-xl);font-weight:800;color:var(--sacred-green)">~25m</div><div style="font-size:var(--text-xs);color:var(--text-light)">Wait Time</div></div>
            <div class="text-center"><div style="font-size:var(--text-xl);font-weight:800;color:var(--accent-dark)">182</div><div style="font-size:var(--text-xs);color:var(--text-light)">Today Total</div></div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label form-required">Select Date</label>
        <input type="date" class="form-input" value="2026-03-20">
      </div>

      <div class="section-title mb-3">Morning Darshan Slots</div>
      <div class="slot-grid mb-4">
        <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">6:00 AM</div><div class="sb-avail">15 left</div></div>
        <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">7:00 AM</div><div class="sb-avail">28 left</div></div>
        <div class="slot-btn selected" onclick="selectSlot(this)"><div class="sb-time">8:00 AM</div><div class="sb-avail">45 left</div></div>
        <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">9:00 AM</div><div class="sb-avail">52 left</div></div>
        <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">10:00 AM</div><div class="sb-avail">38 left</div></div>
        <div class="slot-btn disabled"><div class="sb-time">11:00 AM</div><div class="sb-avail">Full</div></div>
      </div>

      <div class="section-title mb-3">Evening Darshan Slots</div>
      <div class="slot-grid mb-4">
        <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">4:00 PM</div><div class="sb-avail">40 left</div></div>
        <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">5:00 PM</div><div class="sb-avail">22 left</div></div>
        <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">6:00 PM</div><div class="sb-avail">18 left</div></div>
        <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">7:00 PM</div><div class="sb-avail">30 left</div></div>
        <div class="slot-btn disabled"><div class="sb-time">8:00 PM</div><div class="sb-avail">Full</div></div>
        <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">9:00 PM</div><div class="sb-avail">12 left</div></div>
      </div>

      <!-- Darshan Type -->
      <div class="section-title mb-3">Darshan Type</div>
      <div class="service-radio mb-4">
        <div class="service-option selected" onclick="selectService(this,'regular')">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name">Regular Darshan</div><div class="so-desc">Standard queue entry</div></div>
          <div class="so-price">Free</div>
        </div>
        <div class="service-option" onclick="selectService(this,'vip')">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name">VIP / Priority Darshan</div><div class="so-desc">Fast-track entry, skip queue</div></div>
          <div class="so-price" style="color:var(--accent-dark)">₹200</div>
        </div>
        <div class="service-option" onclick="selectService(this,'senior')">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name"><i class="fa-solid fa-wheelchair" style="color:var(--sacred-blue);margin-right:4px"></i> Senior / Accessible</div><div class="so-desc">Priority for 60+ age & differently-abled</div></div>
          <div class="so-price">Free</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Number of Persons</label>
        <div class="flex items-center gap-3">
          <button class="btn btn-outline btn-icon-sm" onclick="adjustCount(-1)"><i class="fa-solid fa-minus"></i></button>
          <span id="person-count" style="font-size:var(--text-xl);font-weight:800;min-width:40px;text-align:center">2</span>
          <button class="btn btn-outline btn-icon-sm" onclick="adjustCount(1)"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>

      <button class="btn btn-primary btn-block btn-lg" onclick="NavEngine.navigateTo('darshan_token_result')">
        <i class="fa-solid fa-ticket"></i> Book Darshan Token
      </button>
    </div>
  `,

  // Darshan Token Result
  darshan_token_result: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.navigateTo('home')"><i class="fa-solid fa-house-chimney"></i></button>
      <span class="bh-title">Token Confirmed</span>
    </div>
    <div class="qr-display">
      <div style="margin-bottom:var(--space-4)">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--sacred-blue);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3);color:white;font-size:1.8rem" class="qr-celebrate">
          <i class="fa-solid fa-ticket"></i>
        </div>
        <span class="badge badge-solid-success"><i class="fa-solid fa-circle-check"></i> Token Issued</span>
      </div>
      <div style="font-size:var(--text-3xl);font-weight:900;color:var(--primary);margin-bottom:var(--space-1)">T-047</div>
      <div style="font-size:var(--text-sm);color:var(--text-light);margin-bottom:var(--space-4)">Your token number</div>
      <div class="qr-frame gold-glow"><div class="qr-placeholder"></div></div>
      <div class="qr-booking-id" style="margin-top:var(--space-4)">DT-20260320-047</div>
      <div class="qr-instruction">Show QR at temple entrance gate</div>
      <div class="card" style="text-align:left;margin-bottom:var(--space-4)">
        <div class="card-body">
          <div class="ps-row"><span>Temple</span><span style="font-weight:600">Kapaleeshwarar Temple</span></div>
          <div class="ps-row"><span>Date</span><span style="font-weight:600">March 20, 2026</span></div>
          <div class="ps-row"><span>Slot</span><span style="font-weight:600">8:00 - 8:30 AM</span></div>
          <div class="ps-row"><span>Type</span><span style="font-weight:600">Regular Darshan</span></div>
          <div class="ps-row"><span>Persons</span><span style="font-weight:600">2</span></div>
          <div class="ps-row"><span>Queue Position</span><span style="font-weight:600;color:var(--sacred-blue)">~12th in line</span></div>
          <div class="ps-row"><span>Est. Wait</span><span style="font-weight:600;color:var(--sacred-green)">~10 minutes</span></div>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-outline flex-1" onclick="NavEngine.showToast('Token downloaded!')"><i class="fa-solid fa-download"></i> Download</button>
        <button class="btn btn-outline flex-1" onclick="NavEngine.showToast('Shared!')"><i class="fa-solid fa-share-nodes"></i> Share</button>
      </div>
    </div>
  `,

  // ===== ANNADHANAM =====
  annadhanam: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Annadhanam</span>
    </div>

    <div class="section">
      <!-- Hero Banner -->
      <div class="card-gradient" style="border-radius:var(--radius-xl);padding:var(--space-5);margin-bottom:var(--space-4);position:relative;overflow:hidden">
        <div style="position:absolute;top:-10px;right:-10px;font-size:5rem;opacity:0.1"><i class="fa-solid fa-utensils"></i></div>
        <div style="font-size:var(--text-xs);opacity:0.8;text-transform:uppercase;letter-spacing:0.05em">Serve the Divine</div>
        <h3 style="font-size:var(--text-xl);font-weight:800;color:white;margin:var(--space-1) 0">Sponsor a Meal</h3>
        <p style="font-size:var(--text-sm);color:rgba(255,255,255,0.85);line-height:var(--leading-relaxed)">
          அன்னதானம் — "The gift of food is the greatest gift." Feed devotees visiting the temple.
        </p>
      </div>

      <div class="connected-temple mb-4">
        <div class="ct-icon"><i class="fa-solid fa-place-of-worship"></i></div>
        <div class="ct-info"><div class="ct-name">Kapaleeshwarar Temple</div><div class="ct-loc">Daily serving: 500+ devotees</div></div>
      </div>

      <!-- Sponsorship Packages -->
      <div class="section-title mb-3">Sponsorship Packages</div>
      <div class="service-radio mb-4">
        <div class="service-option" onclick="selectService(this,'10')">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name"><i class="fa-solid fa-bowl-rice" style="color:var(--sacred-green);margin-right:6px"></i> 10 Meals</div><div class="so-desc">Feed 10 devotees for a day</div></div>
          <div class="so-price">₹500</div>
        </div>
        <div class="service-option selected" onclick="selectService(this,'25')">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name"><i class="fa-solid fa-bowl-rice" style="color:var(--sacred-green);margin-right:6px"></i> 25 Meals</div><div class="so-desc">Feed 25 devotees for a day</div></div>
          <div class="so-price">₹1,250</div>
        </div>
        <div class="service-option" onclick="selectService(this,'50')">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name"><i class="fa-solid fa-bowl-rice" style="color:var(--sacred-green);margin-right:6px"></i> 50 Meals</div><div class="so-desc">Feed 50 devotees for a day</div></div>
          <div class="so-price">₹2,500</div>
        </div>
        <div class="service-option" onclick="selectService(this,'100')">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name"><i class="fa-solid fa-bowl-rice" style="color:var(--sacred-green);margin-right:6px"></i> 100 Meals</div><div class="so-desc">Feed 100 devotees for a day</div></div>
          <div class="so-price">₹5,000</div>
        </div>
        <div class="service-option" onclick="selectService(this,'full')">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name"><i class="fa-solid fa-crown" style="color:var(--accent-dark);margin-right:6px"></i> Full Day (500 Meals)</div><div class="so-desc">Sponsor entire day's annadhanam</div></div>
          <div class="so-price" style="color:var(--accent-dark)">₹25,000</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label form-required">Sponsorship Date</label>
        <input type="date" class="form-input" value="2026-03-25">
      </div>

      <div class="form-group">
        <label class="form-label">In the name of (for Punya)</label>
        <input class="form-input" placeholder="E.g., In memory of Thiru. Ramasamy">
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-camera" style="color:var(--sacred-blue);font-size:1.2rem"></i>
            <div>
              <div style="font-size:var(--text-sm);font-weight:600">Photo/Video of Annadhanam</div>
              <div style="font-size:var(--text-xs);color:var(--text-light)">We'll send you photos after the event</div>
            </div>
            <button class="toggle active" onclick="this.classList.toggle('active')" style="margin-left:auto"></button>
          </div>
        </div>
      </div>

      <button class="btn btn-primary btn-block btn-lg" onclick="NavEngine.showToast('Annadhanam sponsored! Thank you for your seva 🙏')">
        <i class="fa-solid fa-hand-holding-heart"></i> Sponsor ₹1,250
      </button>

      <!-- Schedule -->
      <div class="section-title mt-4 mb-3">Annadhanam Schedule</div>
      <div class="card mb-2"><div class="card-body-sm"><div class="flex items-center justify-between"><div><div style="font-size:var(--text-sm);font-weight:600">Morning — Breakfast</div><div style="font-size:var(--text-xs);color:var(--text-light)">7:00 - 9:00 AM — Pongal, Idli, Vada</div></div><span class="badge badge-success">Daily</span></div></div></div>
      <div class="card mb-2"><div class="card-body-sm"><div class="flex items-center justify-between"><div><div style="font-size:var(--text-sm);font-weight:600">Afternoon — Lunch</div><div style="font-size:var(--text-xs);color:var(--text-light)">12:00 - 2:00 PM — Full meals with 5 items</div></div><span class="badge badge-success">Daily</span></div></div></div>
      <div class="card"><div class="card-body-sm"><div class="flex items-center justify-between"><div><div style="font-size:var(--text-sm);font-weight:600">Evening — Dinner</div><div style="font-size:var(--text-xs);color:var(--text-light)">7:00 - 9:00 PM — Rice, Sambar, Rasam</div></div><span class="badge badge-gold">Festival days</span></div></div></div>
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  // ===== NALLA NERAM =====
  nalla_neram: () => {
    const timeBlocks = [
      { start: '6:00', end: '7:30', label: 'Sunrise', type: 'good' },
      { start: '7:30', end: '9:00', label: 'Nalla Neram', type: 'best' },
      { start: '9:00', end: '10:30', label: 'Normal', type: 'neutral' },
      { start: '10:30', end: '12:00', label: 'Normal', type: 'neutral' },
      { start: '12:00', end: '1:30', label: 'Rahu Kalam', type: 'bad' },
      { start: '1:30', end: '3:00', label: 'Normal', type: 'neutral' },
      { start: '3:00', end: '4:30', label: 'Yamagandam', type: 'warn' },
      { start: '4:30', end: '6:00', label: 'Nalla Neram', type: 'best' },
      { start: '6:00', end: '7:30', label: 'Sunset', type: 'good' },
    ];
    const typeColors = { best: 'var(--sacred-green)', good: 'var(--sacred-blue)', neutral: 'var(--bg-inset)', bad: 'var(--sacred-red)', warn: 'var(--accent-dark)' };
    const typeBg = { best: 'var(--sacred-green-bg)', good: 'var(--sacred-blue-bg)', neutral: 'var(--bg-inset)', bad: 'var(--sacred-red-bg)', warn: 'var(--accent-bg)' };
    const typeLabels = { best: 'Auspicious', good: 'Good', neutral: 'Normal', bad: 'Avoid', warn: 'Caution' };

    return `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Nalla Neram</span>
    </div>

    <div class="section">
      <div class="panchang-card" style="margin-bottom:var(--space-4)">
        <div class="pc-date">Wednesday, March 19, 2026</div>
        <div class="pc-tamil">பங்குனி 5, விகாரி — புதன்</div>
        <div class="panchang-grid" style="margin-top:var(--space-3)">
          <div class="panchang-item"><i class="fa-solid fa-moon"></i> <span><span class="pi-label">Tithi: </span><span class="pi-value">Panchami</span></span></div>
          <div class="panchang-item"><i class="fa-solid fa-star"></i> <span><span class="pi-label">Star: </span><span class="pi-value">Mrigashira</span></span></div>
          <div class="panchang-item"><i class="fa-solid fa-sun"></i> <span><span class="pi-label">Sunrise: </span><span class="pi-value">6:12 AM</span></span></div>
          <div class="panchang-item"><i class="fa-solid fa-moon"></i> <span><span class="pi-label">Sunset: </span><span class="pi-value">6:18 PM</span></span></div>
          <div class="panchang-item"><i class="fa-solid fa-yin-yang"></i> <span><span class="pi-label">Yoga: </span><span class="pi-value">Siddha</span></span></div>
          <div class="panchang-item"><i class="fa-solid fa-calendar-day"></i> <span><span class="pi-label">Karana: </span><span class="pi-value">Bava</span></span></div>
        </div>
      </div>

      <!-- Legend -->
      <div class="flex gap-3 flex-wrap mb-3">
        <span class="badge badge-success"><i class="fa-solid fa-check"></i> Auspicious</span>
        <span class="badge badge-info"><i class="fa-solid fa-thumbs-up"></i> Good</span>
        <span class="badge badge-danger"><i class="fa-solid fa-ban"></i> Rahu Kalam</span>
        <span class="badge badge-gold"><i class="fa-solid fa-triangle-exclamation"></i> Yamagandam</span>
      </div>

      <!-- Time Blocks -->
      <div class="section-title mb-3">Today's Timeline</div>
      ${timeBlocks.map(b => `
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);margin-bottom:var(--space-2);border-radius:var(--radius-md);background:${typeBg[b.type]};border-left:4px solid ${typeColors[b.type]}">
          <div style="min-width:100px;font-size:var(--text-sm);font-weight:600;color:var(--text-secondary)">${b.start} - ${b.end}</div>
          <div style="flex:1">
            <div style="font-size:var(--text-sm);font-weight:600">${b.label}</div>
          </div>
          <span class="badge" style="background:${typeBg[b.type]};color:${typeColors[b.type]};font-size:0.6rem;font-weight:700">${typeLabels[b.type]}</span>
        </div>
      `).join('')}

      <!-- Quick Reference -->
      <div class="section-title mt-4 mb-3">Today's Recommendations</div>
      <div class="card mb-2"><div class="card-body-sm"><div class="flex items-center gap-3"><i class="fa-solid fa-place-of-worship" style="color:var(--sacred-green)"></i><div><div style="font-size:var(--text-sm);font-weight:600">Best time for Temple Visit</div><div style="font-size:var(--text-xs);color:var(--text-light)">7:30 - 9:00 AM or 4:30 - 6:00 PM</div></div></div></div></div>
      <div class="card mb-2"><div class="card-body-sm"><div class="flex items-center gap-3"><i class="fa-solid fa-car" style="color:var(--sacred-blue)"></i><div><div style="font-size:var(--text-sm);font-weight:600">Safe time for Travel</div><div style="font-size:var(--text-xs);color:var(--text-light)">Avoid 12:00 - 1:30 PM (Rahu Kalam)</div></div></div></div></div>
      <div class="card"><div class="card-body-sm"><div class="flex items-center gap-3"><i class="fa-solid fa-briefcase" style="color:var(--accent-dark)"></i><div><div style="font-size:var(--text-sm);font-weight:600">Business / Important Work</div><div style="font-size:var(--text-xs);color:var(--text-light)">Best: 7:30 - 9:00 AM (Nalla Neram)</div></div></div></div></div>
    </div>
    <div style="height:var(--space-4)"></div>
  `},

  // ===== RASI PALAN =====
  rasi_palan: () => {
    const rasis = [
      { name: 'Mesham', tamil: 'மேஷம்', icon: '♈', eng: 'Aries' },
      { name: 'Rishabam', tamil: 'ரிஷபம்', icon: '♉', eng: 'Taurus' },
      { name: 'Mithunam', tamil: 'மிதுனம்', icon: '♊', eng: 'Gemini' },
      { name: 'Kadagam', tamil: 'கடகம்', icon: '♋', eng: 'Cancer' },
      { name: 'Simmam', tamil: 'சிம்மம்', icon: '♌', eng: 'Leo' },
      { name: 'Kanni', tamil: 'கன்னி', icon: '♍', eng: 'Virgo' },
      { name: 'Thulam', tamil: 'துலாம்', icon: '♎', eng: 'Libra' },
      { name: 'Viruchigam', tamil: 'விருச்சிகம்', icon: '♏', eng: 'Scorpio' },
      { name: 'Dhanusu', tamil: 'தனுசு', icon: '♐', eng: 'Sagittarius' },
      { name: 'Makaram', tamil: 'மகரம்', icon: '♑', eng: 'Capricorn' },
      { name: 'Kumbam', tamil: 'கும்பம்', icon: '♒', eng: 'Aquarius' },
      { name: 'Meenam', tamil: 'மீனம்', icon: '♓', eng: 'Pisces' },
    ];
    return `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Rasi Palan</span>
    </div>

    <div class="section" style="padding-bottom:0">
      <div class="chip-row mb-4">
        <button class="chip active">Today</button>
        <button class="chip">This Week</button>
        <button class="chip">This Month</button>
        <button class="chip">2026</button>
      </div>
    </div>

    <div class="section" style="padding-top:0">
      <div class="section-title mb-3">Select Your Rasi</div>
      <div class="grid grid-cols-3 gap-3 mb-4">
        ${rasis.map((r, i) => `
          <div class="card card-clickable ${i === 0 ? 'selected' : ''}" onclick="showRasiPalan('${r.name}', this)" style="${i === 0 ? 'border-color:var(--primary);background:var(--primary-bg)' : ''}">
            <div class="card-body-sm text-center" style="padding:var(--space-3)">
              <div style="font-size:1.6rem;margin-bottom:2px">${r.icon}</div>
              <div style="font-size:var(--text-sm);font-weight:700">${r.name}</div>
              <div style="font-size:var(--text-xs);color:var(--text-light);font-family:var(--font-tamil)">${r.tamil}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Prediction for selected rasi -->
      <div id="rasi-prediction">
        <div class="card" style="border-color:var(--primary);border-width:1.5px">
          <div class="card-body">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span style="font-size:1.5rem">♈</span>
                <div><div style="font-size:var(--text-md);font-weight:700">Mesham — Today</div><div style="font-size:var(--text-xs);color:var(--text-light)">March 19, 2026</div></div>
              </div>
              <div class="flex gap-1">${NavEngine.starRating(4)}</div>
            </div>

            <div class="grid grid-cols-3 gap-2 mb-3">
              <div class="text-center" style="padding:var(--space-2);background:var(--accent-bg);border-radius:var(--radius-sm)"><div style="font-size:var(--text-xs);color:var(--text-light)">Lucky No.</div><div style="font-size:var(--text-sm);font-weight:700">7</div></div>
              <div class="text-center" style="padding:var(--space-2);background:var(--sacred-green-bg);border-radius:var(--radius-sm)"><div style="font-size:var(--text-xs);color:var(--text-light)">Lucky Color</div><div style="font-size:var(--text-sm);font-weight:700">Red</div></div>
              <div class="text-center" style="padding:var(--space-2);background:var(--sacred-blue-bg);border-radius:var(--radius-sm)"><div style="font-size:var(--text-xs);color:var(--text-light)">Best Time</div><div style="font-size:var(--text-sm);font-weight:700">9-11 AM</div></div>
            </div>

            <div style="margin-bottom:var(--space-3)">
              <div class="flex items-center gap-2 mb-2"><i class="fa-solid fa-briefcase" style="color:var(--sacred-blue);width:20px"></i><span style="font-size:var(--text-sm);font-weight:600">Career:</span><span style="font-size:var(--text-sm);color:var(--text-secondary)">Good day for new initiatives. Boss will be supportive.</span></div>
              <div class="flex items-center gap-2 mb-2"><i class="fa-solid fa-indian-rupee-sign" style="color:var(--sacred-green);width:20px"></i><span style="font-size:var(--text-sm);font-weight:600">Finance:</span><span style="font-size:var(--text-sm);color:var(--text-secondary)">Unexpected income possible. Avoid lending money.</span></div>
              <div class="flex items-center gap-2 mb-2"><i class="fa-solid fa-heart" style="color:var(--sacred-red);width:20px"></i><span style="font-size:var(--text-sm);font-weight:600">Love:</span><span style="font-size:var(--text-sm);color:var(--text-secondary)">Harmony in relationships. Express your feelings.</span></div>
              <div class="flex items-center gap-2"><i class="fa-solid fa-heart-pulse" style="color:var(--sacred-pink);width:20px"></i><span style="font-size:var(--text-sm);font-weight:600">Health:</span><span style="font-size:var(--text-sm);color:var(--text-secondary)">Take care of digestion. Drink warm water.</span></div>
            </div>

            <div style="padding:var(--space-3);background:var(--sacred-purple-bg);border-radius:var(--radius-md)">
              <div style="font-size:var(--text-xs);font-weight:600;color:var(--sacred-purple);margin-bottom:4px"><i class="fa-solid fa-place-of-worship"></i> Remedy</div>
              <div style="font-size:var(--text-sm);color:var(--text-secondary)">Visit a Shiva temple today. Offer milk abhishekam for best results.</div>
            </div>
          </div>
        </div>
      </div>

      <button class="btn btn-outline btn-block mt-4" onclick="NavEngine.showToast('Astrologer consultation coming soon!')">
        <i class="fa-solid fa-moon"></i> Consult Astrologer for Detailed Reading
      </button>
    </div>
    <div style="height:var(--space-4)"></div>
  `},

  // ===== EVENTS =====
  events: () => {
    const events = [
      { day: 23, month: 'Mar', title: 'Panguni Uthiram', type: 'Festival', temple: 'All Temples', desc: 'Grand annual festival with special processions and abhishekam', color: 'var(--sacred-red)', icon: 'fa-fire' },
      { day: 25, month: 'Mar', title: 'Pradosham', type: 'Spiritual', temple: 'Shiva Temples', desc: 'Biweekly Shiva worship during twilight', color: 'var(--sacred-purple)', icon: 'fa-moon' },
      { day: 29, month: 'Mar', title: 'Ekadashi', type: 'Spiritual', temple: 'Vishnu Temples', desc: 'Fasting day — Special Vishnu Sahasranama recital', color: 'var(--sacred-blue)', icon: 'fa-om' },
      { day: 1, month: 'Apr', title: 'Tamil New Year', type: 'Festival', temple: 'All Temples', desc: 'Puthandu — New year celebrations with special poojas', color: 'var(--accent-dark)', icon: 'fa-sun' },
      { day: 5, month: 'Apr', title: 'Chithirai Thiruvizha', type: 'Festival', temple: 'Meenakshi Temple', desc: '10-day grand festival at Meenakshi Amman Temple', color: 'var(--sacred-pink)', icon: 'fa-crown' },
      { day: 10, month: 'Apr', title: 'Blood Donation Camp', type: 'Charity', temple: 'Kapaleeshwarar Temple', desc: 'Community blood donation drive in temple premises', color: 'var(--sacred-green)', icon: 'fa-droplet' },
    ];
    return `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Events</span>
    </div>
    <div class="section" style="padding-bottom:0">
      <div class="chip-row mb-3">
        <button class="chip active">All</button>
        <button class="chip"><i class="fa-solid fa-fire"></i> Festivals</button>
        <button class="chip"><i class="fa-solid fa-om"></i> Spiritual</button>
        <button class="chip"><i class="fa-solid fa-music"></i> Cultural</button>
        <button class="chip"><i class="fa-solid fa-hand-holding-heart"></i> Charity</button>
      </div>
    </div>
    <div class="section" style="padding-top:var(--space-2)">
      ${events.map(e => `
        <div class="card card-clickable mb-3" onclick="NavEngine.showToast('Event detail coming soon!')">
          <div class="card-body">
            <div class="flex gap-4">
              <div style="min-width:52px;text-align:center;padding:var(--space-2);border-radius:var(--radius-md);background:var(--bg-inset)">
                <div style="font-size:var(--text-xl);font-weight:800;color:${e.color};line-height:1">${e.day}</div>
                <div style="font-size:var(--text-xs);font-weight:600;color:var(--text-light);text-transform:uppercase">${e.month}</div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="badge" style="background:${e.color};color:white;font-size:0.6rem"><i class="fa-solid ${e.icon}"></i> ${e.type}</span>
                </div>
                <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:2px">${e.title}</h4>
                <div style="font-size:var(--text-xs);color:var(--text-light);margin-bottom:var(--space-1)"><i class="fa-solid fa-place-of-worship"></i> ${e.temple}</div>
                <p style="font-size:var(--text-xs);color:var(--text-secondary);line-height:var(--leading-relaxed)">${e.desc}</p>
                <div class="flex gap-2 mt-2">
                  <button class="btn btn-sm btn-outline" onclick="event.stopPropagation();NavEngine.showToast('RSVP confirmed!')"><i class="fa-solid fa-check"></i> RSVP</button>
                  <button class="btn btn-sm btn-ghost" onclick="event.stopPropagation();NavEngine.showToast('Added to calendar!')"><i class="fa-regular fa-calendar-plus"></i> Calendar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="height:var(--space-4)"></div>
  `},

  // ===== PRASADAM SHOP =====
  shop: () => {
    const products = [
      { name: 'Tirupati Laddu', temple: 'Tirumala Venkateswara', price: 50, rating: 4.9, tag: 'Famous', icon: 'fa-cookie' },
      { name: 'Palani Panchamirtham', temple: 'Palani Murugan', price: 100, rating: 4.8, tag: 'Popular', icon: 'fa-jar' },
      { name: 'Vibhuti & Kumkum Pack', temple: 'Chidambaram Nataraja', price: 149, rating: 4.7, tag: '', icon: 'fa-box' },
      { name: 'Tulsi Mala', temple: 'Srirangam Temple', price: 199, rating: 4.6, tag: '', icon: 'fa-gem' },
      { name: 'Rudraksha (5 Mukhi)', temple: 'Kasi Vishwanath', price: 499, rating: 4.8, tag: 'Premium', icon: 'fa-circle-dot' },
      { name: 'Puja Samagri Kit', temple: 'Complete home set', price: 349, rating: 4.5, tag: 'Kit', icon: 'fa-box-open' },
      { name: 'Sandalwood Paste', temple: 'Meenakshi Amman', price: 129, rating: 4.7, tag: '', icon: 'fa-mortar-pestle' },
      { name: 'Monthly Prasadam Box', temple: '3 temples / month', price: 599, rating: 4.9, tag: 'Subscription', icon: 'fa-gift' },
    ];
    return `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Prasadam Shop</span>
      <button class="back-btn" onclick="NavEngine.showToast('Cart is empty')"><i class="fa-solid fa-cart-shopping"></i></button>
    </div>
    <div class="section" style="padding-bottom:0">
      <div class="chip-row mb-3">
        <button class="chip active">All</button>
        <button class="chip"><i class="fa-solid fa-cookie"></i> Prasadam</button>
        <button class="chip"><i class="fa-solid fa-box"></i> Puja Items</button>
        <button class="chip"><i class="fa-solid fa-gem"></i> Accessories</button>
        <button class="chip"><i class="fa-solid fa-book"></i> Books</button>
        <button class="chip"><i class="fa-solid fa-gift"></i> Subscription</button>
      </div>
    </div>
    <div class="section" style="padding-top:var(--space-2)">
      <div class="grid grid-cols-2 gap-3">
        ${products.map(p => `
          <div class="card card-clickable" onclick="NavEngine.showToast('Added to cart!')">
            <div style="height:100px;background:var(--bg-inset);display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--text-muted);position:relative">
              <i class="fa-solid ${p.icon}"></i>
              ${p.tag ? `<span class="badge badge-solid-primary" style="position:absolute;top:8px;left:8px;font-size:0.55rem">${p.tag}</span>` : ''}
            </div>
            <div class="card-body-sm">
              <h4 style="font-size:var(--text-sm);font-weight:700;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</h4>
              <div style="font-size:var(--text-xs);color:var(--text-light);margin-bottom:var(--space-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.temple}</div>
              <div class="flex items-center justify-between">
                <span style="font-size:var(--text-md);font-weight:800;color:var(--primary)">₹${p.price}</span>
                <span class="tc-rating"><i class="fa-solid fa-star"></i> ${p.rating}</span>
              </div>
              <button class="btn btn-primary btn-sm btn-block mt-2" onclick="event.stopPropagation();NavEngine.showToast('Added!')"><i class="fa-solid fa-cart-plus"></i> Add</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    <div style="height:var(--space-4)"></div>
  `},

  // ===== VOLUNTEER =====
  volunteer: () => {
    const opportunities = [
      { title: 'Annadhanam Helper', temple: 'Kapaleeshwarar Temple', date: 'Mar 23', time: '10:00 AM - 2:00 PM', spots: 8, icon: 'fa-utensils', color: 'var(--sacred-green)' },
      { title: 'Panguni Uthiram — Crowd Mgmt', temple: 'Meenakshi Amman Temple', date: 'Mar 23', time: '5:00 AM - 12:00 PM', spots: 20, icon: 'fa-people-group', color: 'var(--sacred-blue)' },
      { title: 'Temple Cleaning Drive', temple: 'Kapaleeshwarar Temple', date: 'Mar 25', time: '6:00 - 8:00 AM', spots: 15, icon: 'fa-broom', color: 'var(--accent-dark)' },
      { title: 'Prasadam Distribution', temple: 'Palani Murugan Temple', date: 'Mar 29', time: '11:00 AM - 1:00 PM', spots: 10, icon: 'fa-hand-holding-heart', color: 'var(--sacred-purple)' },
      { title: 'Festival Decoration Setup', temple: 'Kapaleeshwarar Temple', date: 'Apr 1', time: '4:00 - 8:00 PM', spots: 12, icon: 'fa-palette', color: 'var(--sacred-pink)' },
    ];
    return `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Volunteer</span>
    </div>

    <div class="section">
      <!-- Hero -->
      <div style="background:linear-gradient(135deg,#00695C,#00897B);border-radius:var(--radius-xl);padding:var(--space-5);color:white;margin-bottom:var(--space-4);position:relative;overflow:hidden">
        <div style="position:absolute;top:-10px;right:-10px;font-size:5rem;opacity:0.1"><i class="fa-solid fa-hands-helping"></i></div>
        <div style="font-size:var(--text-xl);font-weight:800;margin-bottom:var(--space-1)">Serve the Temple</div>
        <p style="font-size:var(--text-sm);opacity:0.85">Earn blessings through selfless service — Nishkama Karma</p>
        <div class="flex gap-3 mt-3">
          <div style="padding:var(--space-2) var(--space-3);background:rgba(255,255,255,0.15);border-radius:var(--radius-sm);font-size:var(--text-sm);font-weight:600">48 hrs served</div>
          <div style="padding:var(--space-2) var(--space-3);background:rgba(255,255,255,0.15);border-radius:var(--radius-sm);font-size:var(--text-sm);font-weight:600">12 events</div>
        </div>
      </div>

      <!-- My Stats -->
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="stat-card"><div class="stat-icon" style="background:rgba(0,105,92,0.08);color:var(--seg-volunteer)"><i class="fa-solid fa-clock"></i></div><div class="stat-value">48</div><div class="stat-label">Hours</div></div>
        <div class="stat-card"><div class="stat-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-calendar-check"></i></div><div class="stat-value">12</div><div class="stat-label">Events</div></div>
        <div class="stat-card"><div class="stat-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-certificate"></i></div><div class="stat-value">2</div><div class="stat-label">Certificates</div></div>
      </div>

      <!-- Tabs -->
      <div class="tabs mb-3">
        <button class="tab active">Opportunities</button>
        <button class="tab">My Commitments</button>
        <button class="tab">Leaderboard</button>
      </div>

      <!-- Opportunities -->
      ${opportunities.map(o => `
        <div class="card mb-3">
          <div class="card-body">
            <div class="flex gap-3">
              <div style="width:44px;height:44px;border-radius:var(--radius-md);background:${o.color}15;color:${o.color};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0"><i class="fa-solid ${o.icon}"></i></div>
              <div class="flex-1">
                <h4 style="font-size:var(--text-sm);font-weight:700;margin-bottom:2px">${o.title}</h4>
                <div style="font-size:var(--text-xs);color:var(--text-light)"><i class="fa-solid fa-place-of-worship"></i> ${o.temple}</div>
                <div style="font-size:var(--text-xs);color:var(--text-light)"><i class="fa-regular fa-calendar"></i> ${o.date} — ${o.time}</div>
                <div class="flex items-center justify-between mt-2">
                  <span class="badge badge-success">${o.spots} spots left</span>
                  <button class="btn btn-sm btn-primary" onclick="NavEngine.showToast('Signed up! See you there 🙏')"><i class="fa-solid fa-hand"></i> Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}

      <!-- Leaderboard Preview -->
      <div class="section-title mt-4 mb-3">Top Volunteers This Month</div>
      ${[
        { name: 'Priya R', hours: 32, rank: 1 },
        { name: 'Suresh B', hours: 28, rank: 2 },
        { name: 'Ramesh K', hours: 24, rank: 3 },
      ].map(v => `
        <div class="flex items-center gap-3 mb-2" style="padding:var(--space-3);background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-md)">
          <span style="width:24px;height:24px;border-radius:50%;background:${v.rank===1?'var(--accent)':v.rank===2?'#B0BEC5':'#A1887F'};display:flex;align-items:center;justify-content:center;font-size:var(--text-xs);font-weight:800;color:${v.rank===1?'var(--text-primary)':'white'}">${v.rank}</span>
          <div class="avatar avatar-sm">${v.name.split(' ').map(n=>n[0]).join('')}</div>
          <span style="font-size:var(--text-sm);font-weight:600;flex:1">${v.name}</span>
          <span style="font-size:var(--text-sm);font-weight:700;color:var(--seg-volunteer)">${v.hours} hrs</span>
        </div>
      `).join('')}
    </div>
    <div style="height:var(--space-4)"></div>
  `},

  // ===== BOOK PRIEST (IYYER) =====
  book_priest: () => {
    const priests = [
      { id: 'sharma', name: 'Sri Venkatesh Sharma', temple: 'Kapaleeshwarar Temple', exp: '25 years', rating: 4.9, reviews: 85, langs: 'Tamil, Sanskrit', speciality: 'Devi Poojas, Homam', price: 'from ₹1,000', avatar: 'VS', gradient: 'var(--gradient-primary)' },
      { id: 'raghavan', name: 'Sri Raghavan Iyyer', temple: 'Kapaleeshwarar Temple', exp: '20 years', rating: 4.7, reviews: 62, langs: 'Tamil, Sanskrit, English', speciality: 'Shiva Rituals, Rudrabhishekam', price: 'from ₹1,500', avatar: 'RI', gradient: 'var(--gradient-dark)' },
      { id: 'ganesh', name: 'Sri Ganesh Bhattar', temple: 'Kanchi Kamakshi', exp: '15 years', rating: 4.8, reviews: 45, langs: 'Tamil, Sanskrit, Telugu', speciality: 'Archana, Abhishekam, Vastu', price: 'from ₹800', avatar: 'GB', gradient: 'linear-gradient(135deg,var(--sacred-blue),#42A5F5)' },
      { id: 'murthy', name: 'Sri Lakshmi Narasimha', temple: 'Ranganathaswamy Temple', exp: '30 years', rating: 4.9, reviews: 120, langs: 'Tamil, Sanskrit, Kannada', speciality: 'Vishnu Rituals, Sahasranama', price: 'from ₹1,200', avatar: 'LN', gradient: 'linear-gradient(135deg,#2E7D32,#66BB6A)' },
    ];
    const homeServices = [
      { name: 'Griha Pravesham', desc: 'House warming ceremony', price: '₹5,000', duration: '2 hrs', icon: 'fa-house-chimney' },
      { name: 'Satyanarayana Pooja', desc: 'For prosperity & well-being', price: '₹3,500', duration: '1.5 hrs', icon: 'fa-om' },
      { name: 'Ganapathy Homam', desc: 'Remove obstacles, new beginnings', price: '₹2,500', duration: '1 hr', icon: 'fa-fire' },
      { name: 'Navagraha Shanti', desc: 'Planetary appeasement', price: '₹3,000', duration: '1 hr', icon: 'fa-sun' },
      { name: 'Vehicle Pooja', desc: 'New car / bike blessing', price: '₹1,000', duration: '30 min', icon: 'fa-car' },
      { name: 'Seemantham', desc: 'Baby shower ceremony', price: '₹3,500', duration: '1.5 hrs', icon: 'fa-baby' },
      { name: 'Namakaranam', desc: 'Naming ceremony for newborn', price: '₹2,000', duration: '45 min', icon: 'fa-child' },
      { name: 'Ayush Homam', desc: 'Birthday fire ritual for longevity', price: '₹2,500', duration: '1 hr', icon: 'fa-cake-candles' },
      { name: 'Tharpanam', desc: 'Ancestral offering ritual', price: '₹1,500', duration: '45 min', icon: 'fa-water' },
      { name: 'Vastu Pooja', desc: 'Space purification & blessing', price: '₹3,000', duration: '1 hr', icon: 'fa-compass' },
    ];
    return `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Book Priest</span>
    </div>

    <div class="section">
      <!-- Hero -->
      <div style="background:linear-gradient(135deg,#C62828,#E65100);border-radius:var(--radius-xl);padding:var(--space-5);color:white;margin-bottom:var(--space-4);position:relative;overflow:hidden">
        <div style="position:absolute;top:-10px;right:-10px;font-size:5rem;opacity:0.08"><i class="fa-solid fa-om"></i></div>
        <div style="font-size:var(--text-xs);opacity:0.8;text-transform:uppercase;letter-spacing:0.05em">Home Services</div>
        <h3 style="font-size:var(--text-xl);font-weight:800;margin:var(--space-1) 0">Book a Priest for Home</h3>
        <p style="font-size:var(--text-sm);opacity:0.85">Verified temple priests for all home rituals — transparent pricing, ratings & reviews</p>
      </div>

      <!-- Service Categories -->
      <div class="section-header"><span class="section-title">Select a Service</span></div>
      <div class="chip-row mb-3">
        <button class="chip active">All Services</button>
        <button class="chip"><i class="fa-solid fa-house-chimney"></i> House</button>
        <button class="chip"><i class="fa-solid fa-fire"></i> Homam</button>
        <button class="chip"><i class="fa-solid fa-baby"></i> Life Events</button>
        <button class="chip"><i class="fa-solid fa-om"></i> Regular</button>
      </div>

      <div class="grid grid-cols-2 gap-2 mb-4">
        ${homeServices.map(s => `
          <div class="card card-clickable" onclick="NavEngine.navigateTo('priest_select')" style="margin-bottom:0">
            <div class="card-body-sm" style="padding:var(--space-3)">
              <div class="flex items-center gap-2 mb-2">
                <div style="width:32px;height:32px;border-radius:var(--radius-sm);background:var(--sacred-red-bg);color:var(--sacred-red);display:flex;align-items:center;justify-content:center;font-size:0.85rem;flex-shrink:0"><i class="fa-solid ${s.icon}"></i></div>
                <div style="font-size:var(--text-sm);font-weight:700;line-height:var(--leading-tight)">${s.name}</div>
              </div>
              <div style="font-size:var(--text-xs);color:var(--text-light);margin-bottom:var(--space-2)">${s.desc}</div>
              <div class="flex items-center justify-between">
                <span style="font-size:var(--text-sm);font-weight:700;color:var(--primary)">${s.price}</span>
                <span style="font-size:var(--text-xs);color:var(--text-muted)">${s.duration}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    <div style="height:var(--space-4)"></div>
  `},

  // Priest Selection Screen
  priest_select: () => {
    const priests = [
      { name: 'Sri Venkatesh Sharma', temple: 'Kapaleeshwarar Temple', exp: '25 years', rating: 4.9, reviews: 85, langs: 'Tamil, Sanskrit', speciality: 'Devi Poojas, Homam', price: '₹2,500', avatar: 'VS', gradient: 'var(--gradient-primary)' },
      { name: 'Sri Raghavan Iyyer', temple: 'Kapaleeshwarar Temple', exp: '20 years', rating: 4.7, reviews: 62, langs: 'Tamil, Sanskrit, English', speciality: 'Shiva Rituals, Rudrabhishekam', price: '₹3,000', avatar: 'RI', gradient: 'var(--gradient-dark)' },
      { name: 'Sri Ganesh Bhattar', temple: 'Kanchi Kamakshi', exp: '15 years', rating: 4.8, reviews: 45, langs: 'Tamil, Sanskrit, Telugu', speciality: 'Archana, Abhishekam, Vastu', price: '₹2,000', avatar: 'GB', gradient: 'linear-gradient(135deg,var(--sacred-blue),#42A5F5)' },
      { name: 'Sri Lakshmi Narasimha', temple: 'Ranganathaswamy Temple', exp: '30 years', rating: 4.9, reviews: 120, langs: 'Tamil, Sanskrit, Kannada', speciality: 'Vishnu Rituals, Sahasranama', price: '₹2,800', avatar: 'LN', gradient: 'linear-gradient(135deg,#2E7D32,#66BB6A)' },
    ];
    return `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Select Priest</span>
    </div>
    <div class="section" style="padding-bottom:0">
      <div class="flex items-center gap-2 mb-3">
        <span class="badge badge-primary"><i class="fa-solid fa-fire"></i> Ganapathy Homam</span>
        <span style="font-size:var(--text-xs);color:var(--text-light)">4 priests available</span>
      </div>
      <div class="chip-row mb-3">
        <button class="chip active"><i class="fa-solid fa-star"></i> Top Rated</button>
        <button class="chip"><i class="fa-solid fa-indian-rupee-sign"></i> Price: Low</button>
        <button class="chip"><i class="fa-solid fa-clock"></i> Available Today</button>
      </div>
    </div>
    <div class="section" style="padding-top:0">
      ${priests.map(p => `
        <div class="card card-clickable mb-3" onclick="NavEngine.navigateTo('priest_detail')">
          <div class="card-body">
            <div class="flex gap-3">
              <div class="avatar avatar-lg" style="background:${p.gradient}">${p.avatar}</div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 style="font-size:var(--text-md);font-weight:700">${p.name}</h4>
                </div>
                <div style="font-size:var(--text-xs);color:var(--text-light);margin-bottom:var(--space-1)"><i class="fa-solid fa-place-of-worship"></i> ${p.temple} — ${p.exp}</div>
                <div style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:var(--space-2)"><i class="fa-solid fa-fire"></i> ${p.speciality}</div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="badge badge-primary"><i class="fa-solid fa-language"></i> ${p.langs}</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    ${NavEngine.starRating(p.rating)}
                    <span style="font-size:var(--text-xs);font-weight:600">${p.rating} (${p.reviews})</span>
                  </div>
                  <span style="font-size:var(--text-md);font-weight:800;color:var(--primary)">${p.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `},

  // Priest Detail & Booking
  priest_detail: () => `
    <div style="background:linear-gradient(135deg,#C62828,#E65100);padding:66px var(--space-5) var(--space-6);text-align:center;position:relative">
      <div class="avatar avatar-xl" style="margin:0 auto var(--space-3);border:3px solid rgba(255,255,255,0.3)">VS</div>
      <h3 style="color:white;font-size:var(--text-lg);font-weight:700">Sri Venkatesh Sharma</h3>
      <p style="color:rgba(255,255,255,0.8);font-size:var(--text-sm)">Kapaleeshwarar Temple — 25 years exp</p>
      <div class="flex gap-2 justify-center mt-2">
        ${NavEngine.starRating(4.9)}
        <span style="color:rgba(255,255,255,0.9);font-size:var(--text-sm);font-weight:600">4.9 (85 reviews)</span>
      </div>
      <div style="position:absolute;top:66px;left:16px"><button class="back-btn" style="background:rgba(0,0,0,0.3);color:white" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button></div>
    </div>

    <div class="section">
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="stat-card"><div class="stat-value" style="color:var(--primary)">850+</div><div class="stat-label">Rituals Done</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--sacred-green)">85</div><div class="stat-label">Home Bookings</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--accent-dark)">4.9</div><div class="stat-label">Rating</div></div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-2)"><i class="fa-solid fa-fire" style="color:var(--primary)"></i> Specialities</h4>
          <div class="flex flex-wrap gap-2">
            <span class="badge badge-primary">Devi Poojas</span>
            <span class="badge badge-primary">Homam</span>
            <span class="badge badge-primary">Griha Pravesham</span>
            <span class="badge badge-primary">Satyanarayana</span>
            <span class="badge badge-primary">Navagraha Shanti</span>
            <span class="badge badge-primary">Seemantham</span>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <h4 style="font-size:var(--text-md);font-weight:700;margin-bottom:var(--space-3)"><i class="fa-solid fa-calendar-check" style="color:var(--sacred-green)"></i> Available Slots — March 20</h4>
          <div class="slot-grid">
            <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">9:00 AM</div></div>
            <div class="slot-btn selected" onclick="selectSlot(this)"><div class="sb-time">10:30 AM</div></div>
            <div class="slot-btn disabled"><div class="sb-time">1:00 PM</div></div>
            <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">3:00 PM</div></div>
            <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">5:00 PM</div></div>
            <div class="slot-btn disabled"><div class="sb-time">7:00 PM</div></div>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div class="section-title mb-3">Recent Reviews</div>
      ${[
        { name: 'Karthik S', text: 'Excellent homam for our new house. Very knowledgeable and patient. Highly recommended!', rating: 5, time: '2 weeks ago' },
        { name: 'Priya R', text: 'Performed Satyanarayana pooja beautifully. Explained every step in Tamil. Very professional.', rating: 5, time: '1 month ago' },
        { name: 'Lakshmi D', text: 'Good service for Navagraha shanti. Arrived on time and completed within schedule.', rating: 4, time: '1 month ago' },
      ].map(r => `
        <div class="card mb-2">
          <div class="card-body-sm">
            <div class="flex items-center justify-between mb-1">
              <span style="font-size:var(--text-sm);font-weight:600">${r.name}</span>
              ${NavEngine.starRating(r.rating)}
            </div>
            <p style="font-size:var(--text-xs);color:var(--text-secondary);line-height:var(--leading-relaxed)">${r.text}</p>
            <span style="font-size:var(--text-xs);color:var(--text-muted)">${r.time}</span>
          </div>
        </div>
      `).join('')}

      <!-- Booking Form -->
      <div class="section-title mt-4 mb-3">Book This Priest</div>
      <div class="form-group"><label class="form-label form-required">Your Address</label><textarea class="form-textarea" placeholder="Full address for the priest to visit"></textarea></div>
      <div class="form-group"><label class="form-label">Special Instructions</label><input class="form-input" placeholder="E.g., Need 2 priests, specific items needed..."></div>

      <div class="payment-summary mb-4">
        <div class="ps-row"><span>Service</span><span>Ganapathy Homam</span></div>
        <div class="ps-row"><span>Priest</span><span>Sri Venkatesh Sharma</span></div>
        <div class="ps-row"><span>Date & Time</span><span>Mar 20 — 10:30 AM</span></div>
        <div class="ps-row"><span>Service Fee</span><span>₹2,500</span></div>
        <div class="ps-row"><span>Platform Fee</span><span>₹50</span></div>
        <div class="ps-row total"><span>Total</span><span>₹2,550</span></div>
      </div>

      <button class="btn btn-primary btn-block btn-lg" onclick="NavEngine.showToast('Booking request sent to priest! You will be notified once accepted.')">
        <i class="fa-solid fa-person-praying"></i> Confirm & Pay ₹2,550
      </button>
      <p style="text-align:center;font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-3)"><i class="fa-solid fa-shield-halved"></i> Verified priest — Payment held until service completed</p>
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  // ===== ASTROLOGER CONSULTATION =====
  astrologer: () => {
    const astrologers = [
      { name: 'Jothidar Murugavel', speciality: 'Vedic Astrology', exp: '30 years', rating: 4.8, reviews: 120, price: 500, avatar: 'JM', gradient: 'linear-gradient(135deg,#4A148C,#7B1FA2)', available: true },
      { name: 'Pandit Shanmugam', speciality: 'Nadi Astrology, KP System', exp: '22 years', rating: 4.6, reviews: 85, price: 750, avatar: 'PS', gradient: 'linear-gradient(135deg,#1A237E,#3949AB)', available: true },
      { name: 'Jothidar Kamala Devi', speciality: 'Horoscope Matching, Muhurtham', exp: '25 years', rating: 4.9, reviews: 200, price: 400, avatar: 'KD', gradient: 'linear-gradient(135deg,#880E4F,#C2185B)', available: false },
      { name: 'Guruji Balachander', speciality: 'Remedial Astrology, Parihara', exp: '35 years', rating: 4.7, reviews: 95, price: 600, avatar: 'GB', gradient: 'linear-gradient(135deg,#E65100,#FF8A65)', available: true },
    ];
    const services = [
      { name: 'Jathakam Reading', desc: 'Full birth chart analysis', price: '₹500', icon: 'fa-sun', color: 'var(--accent-dark)' },
      { name: 'Horoscope Matching', desc: '10 Porutham for marriage', price: '₹400', icon: 'fa-heart', color: 'var(--sacred-red)' },
      { name: 'Muhurtham', desc: 'Auspicious date selection', price: '₹600', icon: 'fa-calendar-check', color: 'var(--sacred-green)' },
      { name: 'Navagraha Remedy', desc: 'Planetary dosha & parihara', price: '₹750', icon: 'fa-sun', color: 'var(--primary)' },
      { name: 'Career Guidance', desc: 'Job, business, education', price: '₹500', icon: 'fa-briefcase', color: 'var(--sacred-blue)' },
      { name: 'General Consultation', desc: 'Any astrology question', price: '₹400', icon: 'fa-comments', color: 'var(--sacred-purple)' },
    ];
    return `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Consult Astrologer</span>
    </div>

    <div class="section">
      <!-- Hero -->
      <div style="background:linear-gradient(135deg,#4A148C,#7B1FA2);border-radius:var(--radius-xl);padding:var(--space-5);color:white;margin-bottom:var(--space-4);position:relative;overflow:hidden">
        <div style="position:absolute;top:-10px;right:-10px;font-size:5rem;opacity:0.08"><i class="fa-solid fa-star"></i></div>
        <div style="font-size:var(--text-xs);opacity:0.8;text-transform:uppercase;letter-spacing:0.05em">Jothida Parivattam</div>
        <h3 style="font-size:var(--text-xl);font-weight:800;margin:var(--space-1) 0">Consult an Astrologer</h3>
        <p style="font-size:var(--text-sm);opacity:0.85">Video / chat consultations with verified Vedic astrologers</p>
      </div>

      <!-- Consultation Types -->
      <div class="section-header"><span class="section-title">What do you need?</span></div>
      <div class="grid grid-cols-3 gap-2 mb-4">
        ${services.map(s => `
          <div class="card card-clickable" style="margin-bottom:0" onclick="NavEngine.navigateTo('astrologer_list')">
            <div class="card-body-sm text-center" style="padding:var(--space-3)">
              <i class="fa-solid ${s.icon}" style="font-size:1.3rem;color:${s.color};margin-bottom:var(--space-1)"></i>
              <div style="font-size:var(--text-xs);font-weight:700;line-height:var(--leading-tight)">${s.name}</div>
              <div style="font-size:0.6rem;color:var(--text-muted);margin-top:2px">${s.price}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Available Astrologers -->
      <div class="section-header"><span class="section-title">Available Now</span><span class="section-link" onclick="NavEngine.navigateTo('astrologer_list')">View All <i class="fa-solid fa-chevron-right" style="font-size:0.6rem"></i></span></div>
      ${astrologers.map(a => `
        <div class="card mb-3 ${a.available ? 'card-clickable' : ''}" onclick="${a.available ? "NavEngine.navigateTo('astrologer_book')" : ''}" style="${!a.available ? 'opacity:0.6' : ''}">
          <div class="card-body">
            <div class="flex gap-3">
              <div class="avatar avatar-lg" style="background:${a.gradient}">${a.avatar}</div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 style="font-size:var(--text-base);font-weight:700">${a.name}</h4>
                  ${a.available ?
                    '<span class="badge badge-success" style="font-size:0.6rem"><span class="live-dot" style="width:5px;height:5px;margin-right:3px"></span> Online</span>' :
                    '<span class="badge" style="background:var(--bg-inset);color:var(--text-muted);font-size:0.6rem">Offline</span>'}
                </div>
                <div style="font-size:var(--text-xs);color:var(--text-light)">${a.speciality} — ${a.exp}</div>
                <div class="flex items-center justify-between mt-2">
                  <div class="flex items-center gap-1">
                    ${NavEngine.starRating(a.rating)}
                    <span style="font-size:var(--text-xs);font-weight:600">${a.rating} (${a.reviews})</span>
                  </div>
                  <span style="font-size:var(--text-sm);font-weight:700;color:var(--sacred-purple)">₹${a.price}/session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}

      <!-- Quick Tools -->
      <div class="section-title mt-4 mb-3">Free Tools</div>
      <div class="grid grid-cols-2 gap-3">
        <div class="card card-clickable" onclick="NavEngine.navigateTo('rasi_palan')">
          <div class="card-body-sm text-center"><i class="fa-solid fa-star" style="font-size:1.5rem;color:var(--sacred-purple);margin-bottom:var(--space-1)"></i><div style="font-size:var(--text-sm);font-weight:700">Rasi Palan</div><div style="font-size:var(--text-xs);color:var(--text-light)">Daily horoscope</div></div>
        </div>
        <div class="card card-clickable" onclick="NavEngine.navigateTo('nalla_neram')">
          <div class="card-body-sm text-center"><i class="fa-solid fa-clock" style="font-size:1.5rem;color:var(--sacred-green);margin-bottom:var(--space-1)"></i><div style="font-size:var(--text-sm);font-weight:700">Nalla Neram</div><div style="font-size:var(--text-xs);color:var(--text-light)">Auspicious times</div></div>
        </div>
      </div>
    </div>
    <div style="height:var(--space-4)"></div>
  `},

  // Astrologer List
  astrologer_list: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">All Astrologers</span>
    </div>
    <div class="section">
      <div class="chip-row mb-3">
        <button class="chip active">All</button>
        <button class="chip"><i class="fa-solid fa-star"></i> Top Rated</button>
        <button class="chip"><i class="fa-solid fa-indian-rupee-sign"></i> Price: Low</button>
        <button class="chip">Vedic</button>
        <button class="chip">Nadi</button>
        <button class="chip">KP</button>
      </div>
      ${[
        { name: 'Jothidar Murugavel', spec: 'Vedic — 30 yrs', rating: 4.8, price: 500, online: true, avatar: 'JM', grad: 'linear-gradient(135deg,#4A148C,#7B1FA2)' },
        { name: 'Pandit Shanmugam', spec: 'Nadi, KP — 22 yrs', rating: 4.6, price: 750, online: true, avatar: 'PS', grad: 'linear-gradient(135deg,#1A237E,#3949AB)' },
        { name: 'Jothidar Kamala Devi', spec: 'Matching, Muhurtham — 25 yrs', rating: 4.9, price: 400, online: false, avatar: 'KD', grad: 'linear-gradient(135deg,#880E4F,#C2185B)' },
        { name: 'Guruji Balachander', spec: 'Remedial, Parihara — 35 yrs', rating: 4.7, price: 600, online: true, avatar: 'GB', grad: 'linear-gradient(135deg,#E65100,#FF8A65)' },
        { name: 'Jothidar Saravanan', spec: 'Vedic, Career — 18 yrs', rating: 4.5, price: 350, online: true, avatar: 'JS', grad: 'linear-gradient(135deg,#00695C,#00897B)' },
      ].map(a => `
        <div class="card card-clickable mb-3" onclick="NavEngine.navigateTo('astrologer_book')">
          <div class="card-body">
            <div class="flex items-center gap-3">
              <div class="avatar" style="background:${a.grad}">${a.avatar}</div>
              <div class="flex-1">
                <div style="font-size:var(--text-sm);font-weight:700">${a.name}</div>
                <div style="font-size:var(--text-xs);color:var(--text-light)">${a.spec}</div>
              </div>
              <div class="text-right">
                <div class="flex items-center gap-1 mb-1">${NavEngine.starRating(a.rating)}<span style="font-size:var(--text-xs);font-weight:600">${a.rating}</span></div>
                <div style="font-size:var(--text-sm);font-weight:700;color:var(--sacred-purple)">₹${a.price}</div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-2">
              ${a.online ? '<span class="badge badge-success" style="font-size:0.6rem"><span class="live-dot" style="width:5px;height:5px;margin-right:3px"></span> Online Now</span>' : '<span class="badge" style="background:var(--bg-inset);color:var(--text-muted);font-size:0.6rem">Next: 3:00 PM</span>'}
              <button class="btn btn-sm ${a.online ? '' : 'btn-outline'}" style="${a.online ? 'background:linear-gradient(135deg,#6A1B9A,#AB47BC);color:white' : ''}" onclick="event.stopPropagation()">
                ${a.online ? '<i class="fa-solid fa-video"></i> Consult Now' : '<i class="fa-regular fa-calendar"></i> Schedule'}
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `,

  // Astrologer Booking
  astrologer_book: () => `
    <div style="background:linear-gradient(135deg,#4A148C,#7B1FA2);padding:66px var(--space-5) var(--space-6);text-align:center;position:relative">
      <div class="avatar avatar-xl" style="margin:0 auto var(--space-3);border:3px solid rgba(255,255,255,0.3);background:linear-gradient(135deg,#CE93D8,#AB47BC)">JM</div>
      <h3 style="color:white;font-size:var(--text-lg);font-weight:700">Jothidar Murugavel</h3>
      <p style="color:rgba(255,255,255,0.8);font-size:var(--text-sm)">Vedic Astrology — 30 years</p>
      <div class="flex gap-2 justify-center mt-2">${NavEngine.starRating(4.8)} <span style="color:rgba(255,255,255,0.9);font-size:var(--text-sm)">4.8 (120)</span></div>
      <div style="position:absolute;top:66px;left:16px"><button class="back-btn" style="background:rgba(0,0,0,0.3);color:white" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button></div>
    </div>
    <div class="section">
      <div class="section-title mb-3">Consultation Type</div>
      <div class="service-radio mb-4">
        <div class="service-option selected" onclick="selectService(this)">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name"><i class="fa-solid fa-video" style="color:var(--sacred-purple);margin-right:6px"></i> Video Call</div><div class="so-desc">Face-to-face consultation — 30 min</div></div>
          <div class="so-price" style="color:var(--sacred-purple)">₹500</div>
        </div>
        <div class="service-option" onclick="selectService(this)">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name"><i class="fa-solid fa-comments" style="color:var(--sacred-blue);margin-right:6px"></i> Chat</div><div class="so-desc">Text-based consultation — 30 min</div></div>
          <div class="so-price" style="color:var(--sacred-purple)">₹350</div>
        </div>
        <div class="service-option" onclick="selectService(this)">
          <div class="so-radio"></div>
          <div class="so-info"><div class="so-name"><i class="fa-solid fa-phone" style="color:var(--sacred-green);margin-right:6px"></i> Phone Call</div><div class="so-desc">Voice consultation — 30 min</div></div>
          <div class="so-price" style="color:var(--sacred-purple)">₹400</div>
        </div>
      </div>

      <div class="section-title mb-3">Your Details</div>
      <div class="form-group"><label class="form-label form-required">Date of Birth</label><input type="date" class="form-input" value="1984-06-15"></div>
      <div class="form-group"><label class="form-label form-required">Time of Birth</label><input type="time" class="form-input" value="05:30"></div>
      <div class="form-group"><label class="form-label form-required">Place of Birth</label><input class="form-input" value="Chennai, Tamil Nadu"></div>
      <div class="form-group"><label class="form-label">Topic / Question</label><select class="form-select"><option>General Reading</option><option>Career & Job</option><option>Marriage & Matching</option><option>Health</option><option>Finance & Property</option><option>Navagraha Dosha</option><option>Muhurtham Selection</option></select></div>
      <div class="form-group"><label class="form-label">Additional Notes</label><textarea class="form-textarea" placeholder="Describe your question or concern..."></textarea></div>

      <div class="payment-summary mb-4">
        <div class="ps-row"><span>Astrologer</span><span>Jothidar Murugavel</span></div>
        <div class="ps-row"><span>Type</span><span>Video Call — 30 min</span></div>
        <div class="ps-row"><span>Consultation Fee</span><span>₹500</span></div>
        <div class="ps-row"><span>Platform Fee</span><span>₹25</span></div>
        <div class="ps-row total"><span>Total</span><span>₹525</span></div>
      </div>

      <button class="btn btn-block btn-lg" style="background:linear-gradient(135deg,#6A1B9A,#AB47BC);color:white" onclick="NavEngine.showToast('Consultation booked! You will receive a video call link via SMS.')">
        <i class="fa-solid fa-video"></i> Book & Pay ₹525
      </button>
      <p style="text-align:center;font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-3)"><i class="fa-solid fa-shield-halved"></i> 100% refund if astrologer doesn't join</p>
    </div>
    <div style="height:var(--space-4)"></div>
  `,
  // ===== DONATION HISTORY =====
  donation_history: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Donation History</span>
    </div>
    <div class="section">
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="stat-card"><div class="stat-value" style="color:var(--sacred-green)">₹8,502</div><div class="stat-label">Total Donated</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--primary)">12</div><div class="stat-label">Donations</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--accent-dark)">3</div><div class="stat-label">80G Receipts</div></div>
      </div>

      <div class="tabs mb-3">
        <button class="tab active">All</button>
        <button class="tab">80G Receipts</button>
        <button class="tab">Recurring</button>
      </div>

      ${[
        { temple: 'Kapaleeshwarar Temple', amount: '₹501', type: 'General', date: 'Mar 18, 2026', g80: true },
        { temple: 'Meenakshi Amman Temple', amount: '₹2,500', type: 'Annadhanam', date: 'Mar 10, 2026', g80: true },
        { temple: 'Kapaleeshwarar Temple', amount: '₹1,001', type: 'Renovation', date: 'Feb 25, 2026', g80: true },
        { temple: 'Palani Murugan Temple', amount: '₹501', type: 'General', date: 'Feb 14, 2026', g80: false },
        { temple: 'Kapaleeshwarar Temple', amount: '₹251', type: 'Special Pooja', date: 'Jan 26, 2026', g80: false },
        { temple: 'Tirumala Venkateswara', amount: '₹5,000', type: 'General', date: 'Jan 1, 2026', g80: true },
      ].map(d => `
        <div class="card mb-3">
          <div class="card-body">
            <div class="flex items-center justify-between mb-2">
              <span class="badge badge-primary"><i class="fa-solid fa-hand-holding-heart"></i> ${d.type}</span>
              ${d.g80 ? '<span class="badge badge-success"><i class="fa-solid fa-receipt"></i> 80G</span>' : ''}
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div style="font-size:var(--text-sm);font-weight:700">${d.temple}</div>
                <div style="font-size:var(--text-xs);color:var(--text-light)">${d.date}</div>
              </div>
              <span style="font-size:var(--text-md);font-weight:800;color:var(--sacred-green)">${d.amount}</span>
            </div>
            ${d.g80 ? '<button class="btn btn-sm btn-ghost mt-2" onclick="NavEngine.showToast(\'80G receipt downloaded!\')"><i class="fa-solid fa-download"></i> Download 80G</button>' : ''}
          </div>
        </div>
      `).join('')}
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  // ===== BADGES & ACHIEVEMENTS =====
  badges: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Badges & Achievements</span>
    </div>
    <div class="section" style="text-align:center;padding-bottom:0">
      <div style="font-size:var(--text-3xl);font-weight:900;color:var(--primary)">3</div>
      <div style="font-size:var(--text-sm);color:var(--text-light);margin-bottom:var(--space-4)">Badges Earned</div>
    </div>
    <div class="section">
      <div class="section-title mb-3">Earned</div>
      <div class="badge-grid mb-4">
        <div class="badge-card earned"><div class="bc-icon">🏆</div><div class="bc-name">Temple Explorer</div><div style="font-size:0.6rem;color:var(--text-light)">10+ temples visited</div></div>
        <div class="badge-card earned"><div class="bc-icon">🙏</div><div class="bc-name">Devoted</div><div style="font-size:0.6rem;color:var(--text-light)">20+ poojas booked</div></div>
        <div class="badge-card earned"><div class="bc-icon">💰</div><div class="bc-name">Generous</div><div style="font-size:0.6rem;color:var(--text-light)">₹5K+ donated</div></div>
      </div>
      <div class="section-title mb-3">In Progress</div>
      <div class="badge-grid mb-4">
        <div class="badge-card locked"><div class="bc-icon">☀️</div><div class="bc-name">Navagraha</div><div style="font-size:0.6rem;color:var(--text-light)">3/9 temples</div></div>
        <div class="badge-card locked"><div class="bc-icon">🤝</div><div class="bc-name">Volunteer</div><div style="font-size:0.6rem;color:var(--text-light)">24/50 hours</div></div>
        <div class="badge-card locked"><div class="bc-icon">📿</div><div class="bc-name">Daily Devotee</div><div style="font-size:0.6rem;color:var(--text-light)">7/30 days streak</div></div>
      </div>
      <div class="section-title mb-3">Locked</div>
      <div class="badge-grid">
        <div class="badge-card locked"><div class="bc-icon">🔱</div><div class="bc-name">Jyotirlinga</div><div style="font-size:0.6rem;color:var(--text-light)">12 temples</div></div>
        <div class="badge-card locked"><div class="bc-icon">🌟</div><div class="bc-name">Influencer</div><div style="font-size:0.6rem;color:var(--text-light)">50+ community posts</div></div>
        <div class="badge-card locked"><div class="bc-icon">👑</div><div class="bc-name">Patron</div><div style="font-size:0.6rem;color:var(--text-light)">₹1L+ donated</div></div>
      </div>
    </div>
  `,

  // ===== SAVED TEMPLES =====
  saved_temples: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Saved Temples</span>
    </div>
    <div class="section">
      ${TEMPLES.slice(0, 4).map(t => `
        <div class="temple-list-card" onclick="selectTemple('${t.id}')">
          <div class="tlc-img"><i class="fa-solid fa-gopuram"></i></div>
          <div class="tlc-content">
            <div class="tlc-name">${t.name}</div>
            <div class="tlc-loc"><i class="fa-solid fa-location-dot"></i> ${t.loc} — ${t.dist}</div>
            <div class="tlc-meta">
              <span class="tc-rating"><i class="fa-solid fa-star"></i> ${t.rating}</span>
              ${NavEngine.crowdBadge(t.crowd)}
            </div>
          </div>
          <button class="btn-icon-sm btn-ghost" onclick="event.stopPropagation();NavEngine.showToast('Removed from saved!');this.closest('.temple-list-card').style.display='none'"><i class="fa-solid fa-heart" style="color:var(--sacred-red)"></i></button>
        </div>
      `).join('')}
      <div style="text-align:center;margin-top:var(--space-4)">
        <button class="btn btn-outline" onclick="NavEngine.navigateTo('temple_list')"><i class="fa-solid fa-magnifying-glass"></i> Discover More Temples</button>
      </div>
    </div>
  `,

  // ===== EDIT PROFILE =====
  edit_profile: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Edit Profile</span>
    </div>
    <div class="section">
      <div style="text-align:center;margin-bottom:var(--space-4)">
        <div class="avatar avatar-xl" style="margin:0 auto var(--space-2);background:var(--gradient-primary)">${USER.name[0]}</div>
        <button class="btn btn-sm btn-ghost"><i class="fa-solid fa-camera"></i> Change Photo</button>
      </div>
      <div class="form-group"><label class="form-label form-required">Full Name</label><input class="form-input" value="${USER.fullName}"></div>
      <div class="form-group"><label class="form-label">Phone</label><input class="form-input" value="+91 ${USER.phone}" disabled style="opacity:0.6"></div>
      <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" placeholder="Enter email for receipts"></div>
      <div class="form-group"><label class="form-label">Date of Birth</label><input type="date" class="form-input" value="1984-06-15"></div>
      <div class="form-group"><label class="form-label">Nakshatra (Birth Star)</label>
        <select class="form-select"><option>${USER.nakshatra}</option><option>Bharani</option><option>Krittika</option><option>Rohini</option><option>Mrigashira</option><option>Thiruvathirai</option><option>Punarpoosam</option><option>Poosam</option><option>Ayilyam</option><option>Magha</option><option>Pooram</option><option>Uttara Phalguni</option><option>Hastham</option><option>Chithirai</option><option>Swathi</option><option>Vishakam</option><option>Anusham</option><option>Kettai</option><option>Moolam</option><option>Pooradam</option><option>Uthradam</option><option>Thiruvonam</option><option>Avittam</option><option>Sadhayam</option><option>Poorattadhi</option><option>Uthrattadhi</option><option>Revathi</option></select>
      </div>
      <div class="form-group"><label class="form-label">Rasi (Zodiac)</label>
        <select class="form-select"><option>${USER.rasi}</option><option>Rishabam</option><option>Mithunam</option><option>Kadagam</option><option>Simmam</option><option>Kanni</option><option>Thulam</option><option>Viruchigam</option><option>Dhanusu</option><option>Makaram</option><option>Kumbam</option><option>Meenam</option></select>
      </div>
      <div class="form-group"><label class="form-label">Gothram</label><input class="form-input" value="${USER.gothram}"></div>
      <div class="form-group"><label class="form-label">Address</label><textarea class="form-textarea" placeholder="Enter your address"></textarea></div>
      <button class="btn btn-primary btn-block btn-lg" onclick="NavEngine.showToast('Profile updated!');NavEngine.goBack()">
        <i class="fa-solid fa-check"></i> Save Changes
      </button>
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  // ===== SETTINGS =====
  app_settings: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Settings</span>
    </div>
    <div class="section">
      <div class="section-title mb-3">Preferences</div>
      <div class="profile-menu mb-4">
        <div class="list-item" onclick="NavEngine.showToast('Language settings coming soon!')">
          <div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-language"></i></div>
          <div class="li-content"><div class="li-title">Language</div><div class="li-subtitle">English</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
        <div class="list-item" onclick="NavEngine.toggleTheme()">
          <div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid ${NavEngine.isDark() ? 'fa-sun' : 'fa-moon'}"></i></div>
          <div class="li-content"><div class="li-title">Dark Mode</div><div class="li-subtitle">${NavEngine.isDark() ? 'On' : 'Off'}</div></div>
          <div class="li-action"><button class="toggle ${NavEngine.isDark() ? 'active' : ''}" onclick="event.stopPropagation();NavEngine.toggleTheme()"></button></div>
        </div>
        <div class="list-item">
          <div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-globe"></i></div>
          <div class="li-content"><div class="li-title">Location</div><div class="li-subtitle">Chennai, Tamil Nadu</div></div>
          <div class="li-action"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
        <div class="list-item">
          <div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-plane-departure"></i></div>
          <div class="li-content"><div class="li-title">NRI Mode</div><div class="li-subtitle">Off — India</div></div>
          <div class="li-action"><button class="toggle"></button></div>
        </div>
      </div>

      <div class="section-title mb-3">Notifications</div>
      <div class="profile-menu mb-4">
        <div class="list-item"><div class="li-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-fire"></i></div><div class="li-content"><div class="li-title">Pooja Reminders</div></div><div class="li-action"><button class="toggle active"></button></div></div>
        <div class="list-item"><div class="li-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-calendar-days"></i></div><div class="li-content"><div class="li-title">Festival Alerts</div></div><div class="li-action"><button class="toggle active"></button></div></div>
        <div class="list-item"><div class="li-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-bullhorn"></i></div><div class="li-content"><div class="li-title">Temple Announcements</div></div><div class="li-action"><button class="toggle active"></button></div></div>
        <div class="list-item"><div class="li-icon" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)"><i class="fa-solid fa-users"></i></div><div class="li-content"><div class="li-title">Community Updates</div></div><div class="li-action"><button class="toggle"></button></div></div>
        <div class="list-item"><div class="li-icon" style="background:var(--sacred-purple-bg);color:var(--sacred-purple)"><i class="fa-solid fa-tag"></i></div><div class="li-content"><div class="li-title">Offers & Promotions</div></div><div class="li-action"><button class="toggle"></button></div></div>
      </div>

      <div class="section-title mb-3">Account</div>
      <div class="profile-menu">
        <div class="list-item"><div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-shield-halved"></i></div><div class="li-content"><div class="li-title">Privacy</div><div class="li-subtitle">Manage data & visibility</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item"><div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-file-lines"></i></div><div class="li-content"><div class="li-title">Terms & Conditions</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item"><div class="li-icon" style="background:var(--sacred-red-bg);color:var(--sacred-red)"><i class="fa-solid fa-trash-can"></i></div><div class="li-content"><div class="li-title" style="color:var(--sacred-red)">Delete Account</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
      </div>
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  // ===== HELP & SUPPORT =====
  help_support: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Help & Support</span>
    </div>
    <div class="section">
      <div class="phone-input-group mb-4">
        <div class="phone-prefix" style="background:transparent;border:none"><i class="fa-solid fa-magnifying-glass" style="color:var(--text-muted)"></i></div>
        <input type="text" class="phone-input" placeholder="Search for help..." style="font-size:var(--text-base);font-weight:400">
      </div>

      <div class="section-title mb-3">Quick Help</div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="card card-clickable"><div class="card-body-sm text-center"><i class="fa-solid fa-calendar-check" style="font-size:1.5rem;color:var(--primary);margin-bottom:var(--space-2)"></i><div style="font-size:var(--text-sm);font-weight:700">Booking Issues</div></div></div>
        <div class="card card-clickable"><div class="card-body-sm text-center"><i class="fa-solid fa-indian-rupee-sign" style="font-size:1.5rem;color:var(--sacred-green);margin-bottom:var(--space-2)"></i><div style="font-size:var(--text-sm);font-weight:700">Payment & Refunds</div></div></div>
        <div class="card card-clickable"><div class="card-body-sm text-center"><i class="fa-solid fa-qrcode" style="font-size:1.5rem;color:var(--accent-dark);margin-bottom:var(--space-2)"></i><div style="font-size:var(--text-sm);font-weight:700">QR Code Help</div></div></div>
        <div class="card card-clickable"><div class="card-body-sm text-center"><i class="fa-solid fa-user" style="font-size:1.5rem;color:var(--sacred-blue);margin-bottom:var(--space-2)"></i><div style="font-size:var(--text-sm);font-weight:700">Account Issues</div></div></div>
      </div>

      <div class="section-title mb-3">FAQ</div>
      ${[
        { q: 'How do I book a pooja?', a: 'Go to Home > Book Pooja, select service, fill details, choose slot, and pay.' },
        { q: 'How to get a darshan token?', a: 'Go to Home > Darshan Token, select date, time slot, and number of persons.' },
        { q: 'How do I get an 80G receipt?', a: 'Enable "Generate 80G Tax Receipt" while donating. Receipt is emailed instantly.' },
        { q: 'Can I cancel a booking?', a: 'Go to My Bookings > select booking > Cancel. Refund is processed within 3-5 days.' },
        { q: 'How does the QR code work?', a: 'After booking, show the QR code to the priest. They scan it to verify your booking.' },
      ].map(faq => `
        <div class="card mb-2 card-clickable" onclick="this.querySelector('.faq-answer').style.display=this.querySelector('.faq-answer').style.display==='none'?'block':'none'">
          <div class="card-body-sm">
            <div class="flex items-center justify-between">
              <span style="font-size:var(--text-sm);font-weight:600">${faq.q}</span>
              <i class="fa-solid fa-chevron-down" style="font-size:0.7rem;color:var(--text-muted)"></i>
            </div>
            <div class="faq-answer" style="display:none;margin-top:var(--space-2);font-size:var(--text-sm);color:var(--text-secondary);line-height:var(--leading-relaxed)">${faq.a}</div>
          </div>
        </div>
      `).join('')}

      <div class="section-title mt-4 mb-3">Contact Us</div>
      <div class="card mb-3"><div class="card-body"><div class="flex items-center gap-3"><i class="fa-solid fa-headset" style="font-size:1.2rem;color:var(--primary)"></i><div><div style="font-size:var(--text-sm);font-weight:600">Live Chat</div><div style="font-size:var(--text-xs);color:var(--text-light)">Available 9 AM - 9 PM</div></div><button class="btn btn-sm btn-primary" style="margin-left:auto" onclick="NavEngine.showToast('Opening chat...')">Chat Now</button></div></div></div>
      <div class="card mb-3"><div class="card-body"><div class="flex items-center gap-3"><i class="fa-solid fa-phone" style="font-size:1.2rem;color:var(--sacred-green)"></i><div><div style="font-size:var(--text-sm);font-weight:600">Call Support</div><div style="font-size:var(--text-xs);color:var(--text-light)">+91 44 2345 6789</div></div></div></div></div>
      <div class="card"><div class="card-body"><div class="flex items-center gap-3"><i class="fa-solid fa-envelope" style="font-size:1.2rem;color:var(--sacred-blue)"></i><div><div style="font-size:var(--text-sm);font-weight:600">Email</div><div style="font-size:var(--text-xs);color:var(--text-light)">support@sorubantemple.com</div></div></div></div></div>
    </div>
    <div style="height:var(--space-4)"></div>
  `,
};

function selectTemple(id) {
  window._selectedTemple = id;
  NavEngine.navigateTo('temple_detail');
}

function selectService(el, id) {
  document.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  window._selectedService = id;
}

function selectAmount(el) {
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function selectDonationType(el) {
  document.querySelectorAll('.donation-type-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function adjustCount(delta) {
  const el = document.getElementById('person-count');
  if (!el) return;
  let val = parseInt(el.textContent) + delta;
  if (val < 1) val = 1;
  if (val > 10) val = 10;
  el.textContent = val;
}

function showRasiPalan(name, el) {
  document.querySelectorAll('#rasi-prediction').forEach(e => e.style.opacity = '0.5');
  setTimeout(() => document.querySelectorAll('#rasi-prediction').forEach(e => e.style.opacity = '1'), 150);
  document.querySelectorAll('.grid .card.card-clickable').forEach(c => { c.style.borderColor = ''; c.style.background = ''; });
  if (el) { el.style.borderColor = 'var(--primary)'; el.style.background = 'var(--primary-bg)'; }
}

// Booking step navigation
function goToStep(step) {
  const steps = { 1: 'step1', 2: 'step2', 3: 'step3', 4: 'step4' };
  const lines = { 1: 'line1', 2: 'line2', 3: 'line3' };

  // Update stepper
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`step${i}`);
    if (!dot) continue;
    dot.classList.remove('active', 'completed');
    if (i < step) dot.classList.add('completed');
    if (i === step) dot.classList.add('active');
  }
  for (let i = 1; i <= 3; i++) {
    const line = document.getElementById(`line${i}`);
    if (!line) continue;
    line.classList.toggle('completed', i < step);
  }

  const content = document.getElementById('pooja-step-content');
  if (step === 2) {
    content.innerHTML = `
      <div class="booking-step screen-enter">
        <div class="booking-step-title">Devotee Details</div>
        <div class="form-group"><label class="form-label form-required">Devotee Name</label><input class="form-input" value="${USER.fullName}"></div>
        <div class="form-group"><label class="form-label form-required">Nakshatra (Birth Star)</label>
          <select class="form-select"><option>${USER.nakshatra}</option><option>Bharani</option><option>Krittika</option><option>Rohini</option><option>Mrigashira</option></select>
        </div>
        <div class="form-group"><label class="form-label">Rasi (Zodiac)</label>
          <select class="form-select"><option>${USER.rasi}</option><option>Rishabam</option><option>Mithunam</option></select>
        </div>
        <div class="form-group"><label class="form-label">Gothram</label><input class="form-input" value="${USER.gothram}"></div>
        <div class="form-group"><label class="form-label">Special Requests</label><textarea class="form-textarea" placeholder="Any specific prayers or requests..."></textarea></div>
        <button class="btn btn-ghost mb-2" onclick="NavEngine.showToast('Add family member coming soon!')"><i class="fa-solid fa-user-plus"></i> Add another person</button>
        <button class="btn btn-primary btn-block btn-lg" onclick="goToStep(3)">Continue <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  } else if (step === 3) {
    content.innerHTML = `
      <div class="booking-step screen-enter">
        <div class="booking-step-title">Select Date & Slot</div>
        <div class="form-group"><label class="form-label form-required">Date</label><input type="date" class="form-input" value="2026-03-20"></div>
        <div class="form-label mb-2">Morning Slots</div>
        <div class="slot-grid mb-4">
          <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">7:00 AM</div><div class="sb-avail">32 left</div></div>
          <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">8:00 AM</div><div class="sb-avail">18 left</div></div>
          <div class="slot-btn selected" onclick="selectSlot(this)"><div class="sb-time">9:00 AM</div><div class="sb-avail">45 left</div></div>
          <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">10:00 AM</div><div class="sb-avail">50 left</div></div>
          <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">11:00 AM</div><div class="sb-avail">28 left</div></div>
          <div class="slot-btn disabled"><div class="sb-time">12:00 PM</div><div class="sb-avail">Full</div></div>
        </div>
        <div class="form-label mb-2">Evening Slots</div>
        <div class="slot-grid mb-4">
          <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">5:00 PM</div><div class="sb-avail">40 left</div></div>
          <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">6:00 PM</div><div class="sb-avail">22 left</div></div>
          <div class="slot-btn" onclick="selectSlot(this)"><div class="sb-time">7:00 PM</div><div class="sb-avail">15 left</div></div>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="goToStep(4)">Continue <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  } else if (step === 4) {
    content.innerHTML = `
      <div class="booking-step screen-enter">
        <div class="booking-step-title">Payment</div>
        <div class="payment-summary">
          <div class="ps-row"><span>Service</span><span>Archana</span></div>
          <div class="ps-row"><span>Temple</span><span>Kapaleeshwarar Temple</span></div>
          <div class="ps-row"><span>Date & Slot</span><span>Mar 20 — 9:00 AM</span></div>
          <div class="ps-row"><span>Devotee</span><span>${USER.fullName}</span></div>
          <div class="ps-row total"><span>Total</span><span>₹50</span></div>
        </div>

        <div class="section-title mb-3">Payment Method</div>
        <div class="service-radio mb-4">
          <div class="service-option selected" onclick="selectService(this)">
            <div class="so-radio"></div>
            <div class="so-info"><div class="so-name">UPI</div><div class="so-desc">Google Pay, PhonePe, Paytm</div></div>
          </div>
          <div class="service-option" onclick="selectService(this)">
            <div class="so-radio"></div>
            <div class="so-info"><div class="so-name">Credit / Debit Card</div><div class="so-desc">Visa, Mastercard, RuPay</div></div>
          </div>
          <div class="service-option" onclick="selectService(this)">
            <div class="so-radio"></div>
            <div class="so-info"><div class="so-name">Net Banking</div><div class="so-desc">All major banks</div></div>
          </div>
        </div>

        <button class="btn btn-primary btn-block btn-lg" onclick="NavEngine.navigateTo('qr_result')">
          <i class="fa-solid fa-lock"></i> Pay ₹50 Securely
        </button>
        <p style="text-align:center;font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-3)"><i class="fa-solid fa-shield-halved"></i> Secured by Razorpay</p>
      </div>`;
  }
}

function selectSlot(el) {
  if (el.classList.contains('disabled')) return;
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

// ===== Assign nav tabs to screens =====
screens.temple_list.navTab = 'temple_list';
screens.temple_detail.navTab = 'temple_list';
screens.book_pooja.navTab = 'home';
screens.qr_result.navTab = 'home';
screens.donation.navTab = 'home';
screens.live_darshan.navTab = 'home';
screens.darshan.navTab = 'home';
screens.darshan_token_result.navTab = 'home';
screens.annadhanam.navTab = 'home';
screens.nalla_neram.navTab = 'home';
screens.rasi_palan.navTab = 'home';
screens.events.navTab = 'home';
screens.shop.navTab = 'home';
screens.volunteer.navTab = 'home';
screens.book_priest.navTab = 'home';
screens.priest_select.navTab = 'home';
screens.priest_detail.navTab = 'home';
screens.astrologer.navTab = 'home';
screens.astrologer_list.navTab = 'home';
screens.astrologer_book.navTab = 'home';
screens.my_bookings.navTab = 'profile';
screens.donation_history.navTab = 'profile';
screens.badges.navTab = 'profile';
screens.saved_temples.navTab = 'profile';
screens.edit_profile.navTab = 'profile';
screens.app_settings.navTab = 'profile';
screens.help_support.navTab = 'profile';
screens.notifications.navTab = 'home';

// ===== Initialize =====
NavEngine.init({
  screens: screens,
  startScreen: 'home',
  bottomNav: [
    { screen: 'home', icon: 'fa-solid fa-house-chimney', label: 'Home' },
    { screen: 'temple_list', icon: 'fa-solid fa-gopuram', label: 'Temples' },
    { screen: 'community', icon: 'fa-solid fa-users', label: 'Community' },
    { screen: 'feed', icon: 'fa-solid fa-newspaper', label: 'Feed' },
    { screen: 'profile', icon: 'fa-solid fa-circle-user', label: 'Profile' },
  ],
});
