/* D2 — Family/Kula Manager */

const FAMILY = [
  { id: 'self', name: 'Lakshmi Devi', relation: 'Self', avatar: 'LD', nakshatra: 'Uttara Phalguni', rasi: 'Kanni', gothram: 'Bharadwaja', visits: 18, color: 'var(--gradient-primary)' },
  { id: 'husband', name: 'Suresh Kumar', relation: 'Husband', avatar: 'SK', nakshatra: 'Swathi', rasi: 'Thulam', gothram: 'Bharadwaja', visits: 12, color: 'var(--gradient-dark)' },
  { id: 'son', name: 'Karthik S', relation: 'Son', avatar: 'KS', nakshatra: 'Ashwini', rasi: 'Mesham', gothram: 'Bharadwaja', visits: 8, color: 'linear-gradient(135deg,var(--sacred-blue),#42A5F5)' },
  { id: 'daughter', name: 'Priya S', relation: 'Daughter', avatar: 'PS', nakshatra: 'Rohini', rasi: 'Rishabam', gothram: 'Bharadwaja', visits: 6, color: 'linear-gradient(135deg,var(--sacred-pink),#F48FB1)' },
  { id: 'mother', name: 'Kamala Ammal', relation: 'Mother', avatar: 'KA', nakshatra: 'Magha', rasi: 'Simmam', gothram: 'Kashyapa', visits: 22, color: 'var(--gradient-gold)' },
];

const screens = {
  home: () => `
    <div class="app-header-gradient" style="padding-top:0">
      <div class="flex items-center justify-between">
        <div>
          <div style="font-size:var(--text-lg);font-weight:800;color:white"><i class="fa-solid fa-people-roof" style="margin-right:6px"></i> Family Dashboard</div>
          <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.8)">Lakshmi's Family — 5 members</div>
        </div>
        <button class="header-icon-btn" onclick="NavEngine.navigateTo('add_member')"><i class="fa-solid fa-user-plus"></i></button>
      </div>
    </div>

    <div class="section">
      <!-- Family Avatars -->
      <div class="family-avatar-row mb-4">
        ${FAMILY.map((m, i) => `
          <div class="family-avatar-item ${i === 0 ? 'active' : ''}" onclick="NavEngine.navigateTo('member_detail')">
            <div class="avatar" style="background:${m.color}">${m.avatar}</div>
            <span>${m.name.split(' ')[0]}</span>
          </div>
        `).join('')}
        <div class="family-avatar-item" onclick="NavEngine.navigateTo('add_member')">
          <div class="avatar" style="background:var(--bg-inset);color:var(--text-muted);border:2px dashed var(--border)"><i class="fa-solid fa-plus"></i></div>
          <span>Add</span>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-users"></i></div>
          <div class="stat-value">5</div>
          <div class="stat-label">Members</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-place-of-worship"></i></div>
          <div class="stat-value">66</div>
          <div class="stat-label">Total Visits</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-fire"></i></div>
          <div class="stat-value">34</div>
          <div class="stat-label">Poojas Done</div>
        </div>
      </div>

      <!-- Kula Theivam -->
      <div class="section-header"><span class="section-title">Kula Theivam</span></div>
      <div class="kula-theivam-card" onclick="NavEngine.navigateTo('kula_theivam')">
        <div class="kt-label"><i class="fa-solid fa-place-of-worship"></i> Family Deity</div>
        <div class="kt-name">Sri Kaliamman Temple</div>
        <div class="kt-loc"><i class="fa-solid fa-location-dot"></i> Kulithalai, Karur District</div>
        <div class="flex gap-2 mt-3">
          <span class="badge badge-solid-primary">Amman / Devi</span>
          <span class="badge" style="background:rgba(0,0,0,0.08)">Gothram: Bharadwaja</span>
        </div>
      </div>

      <!-- Family Members -->
      <div class="section-header"><span class="section-title">Family Members</span><span class="section-link" onclick="NavEngine.navigateTo('add_member')">Add <i class="fa-solid fa-plus" style="font-size:0.6rem"></i></span></div>
      ${FAMILY.map(m => `
        <div class="family-member-card" onclick="NavEngine.navigateTo('member_detail')">
          <div class="fm-header">
            <div class="avatar" style="background:${m.color}">${m.avatar}</div>
            <div class="flex-1">
              <div class="fm-name">${m.name}</div>
              <div class="fm-relation">${m.relation}</div>
            </div>
            <span style="font-size:var(--text-sm);font-weight:700;color:var(--primary)">${m.visits} visits</span>
          </div>
          <div class="fm-details">
            <span class="badge badge-primary"><i class="fa-solid fa-star"></i> ${m.nakshatra}</span>
            <span class="badge badge-gold">${m.rasi}</span>
            <span class="badge badge-info">${m.gothram}</span>
          </div>
        </div>
      `).join('')}

      <!-- Book for Family -->
      <button class="btn btn-primary btn-block btn-lg mt-2" onclick="NavEngine.navigateTo('book_family')">
        <i class="fa-solid fa-fire"></i> Book Pooja for Family
      </button>
    </div>
    <div style="height:var(--space-4)"></div>
  `,

  // Kula Theivam
  kula_theivam: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Kula Theivam</span>
    </div>
    <div class="section">
      <div class="kula-theivam-card" style="margin-bottom:var(--space-5)">
        <div class="kt-label"><i class="fa-solid fa-place-of-worship"></i> Family Deity</div>
        <div class="kt-name">Sri Kaliamman Temple</div>
        <div class="kt-loc"><i class="fa-solid fa-location-dot"></i> Kulithalai, Karur District</div>
        <div style="font-size:var(--text-sm);margin-top:var(--space-3);line-height:var(--leading-relaxed);color:var(--text-secondary)">
          Annual pooja performed in Aadi month (Jul-Aug). Family has been worshipping here for 6 generations. Ancestral village: Kulithalai.
        </div>
      </div>

      <div class="section-title mb-3">Quick Actions</div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="card card-clickable" onclick="NavEngine.showToast('Remote archana coming soon!')">
          <div class="card-body text-center">
            <i class="fa-solid fa-fire" style="font-size:1.5rem;color:var(--primary);margin-bottom:var(--space-2)"></i>
            <div style="font-size:var(--text-sm);font-weight:700">Remote Archana</div>
            <div style="font-size:var(--text-xs);color:var(--text-light)">Book from anywhere</div>
          </div>
        </div>
        <div class="card card-clickable" onclick="NavEngine.showToast('Prasadam delivery coming soon!')">
          <div class="card-body text-center">
            <i class="fa-solid fa-truck" style="font-size:1.5rem;color:var(--sacred-green);margin-bottom:var(--space-2)"></i>
            <div style="font-size:var(--text-sm);font-weight:700">Prasadam Delivery</div>
            <div style="font-size:var(--text-xs);color:var(--text-light)">Get prasadam by post</div>
          </div>
        </div>
        <div class="card card-clickable" onclick="NavEngine.showToast('Video pooja coming soon!')">
          <div class="card-body text-center">
            <i class="fa-solid fa-video" style="font-size:1.5rem;color:var(--sacred-blue);margin-bottom:var(--space-2)"></i>
            <div style="font-size:var(--text-sm);font-weight:700">Live Video Pooja</div>
            <div style="font-size:var(--text-xs);color:var(--text-light)">Watch ritual live</div>
          </div>
        </div>
        <div class="card card-clickable" onclick="NavEngine.showToast('Donation coming soon!')">
          <div class="card-body text-center">
            <i class="fa-solid fa-hand-holding-heart" style="font-size:1.5rem;color:var(--accent-dark);margin-bottom:var(--space-2)"></i>
            <div style="font-size:var(--text-sm);font-weight:700">Temple Donation</div>
            <div style="font-size:var(--text-xs);color:var(--text-light)">Support renovation</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center gap-3 mb-3">
            <i class="fa-solid fa-bell" style="color:var(--accent-dark);font-size:1.2rem"></i>
            <div>
              <div style="font-size:var(--text-sm);font-weight:700">Annual Ritual Reminder</div>
              <div style="font-size:var(--text-xs);color:var(--text-light)">Aadi month — July 2026</div>
            </div>
          </div>
          <p style="font-size:var(--text-sm);color:var(--text-secondary)">Your family's annual kula theivam pooja is in ~4 months. Book the priest early!</p>
        </div>
      </div>
    </div>
  `,

  // Member Detail
  member_detail: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Member Profile</span>
      <button class="back-btn" onclick="NavEngine.showToast('Edit coming soon!')"><i class="fa-solid fa-pen"></i></button>
    </div>
    <div class="section" style="text-align:center;padding-bottom:0">
      <div class="avatar avatar-xl" style="margin:0 auto var(--space-3);background:var(--gradient-primary)">LD</div>
      <h3 style="font-size:var(--text-lg);font-weight:800">Lakshmi Devi</h3>
      <p style="font-size:var(--text-sm);color:var(--text-light)">Self</p>
      <div class="flex gap-2 justify-center mt-2">
        <span class="badge badge-primary"><i class="fa-solid fa-star"></i> Uttara Phalguni</span>
        <span class="badge badge-gold">Kanni</span>
        <span class="badge badge-info">Bharadwaja</span>
      </div>
    </div>
    <div class="section">
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="stat-card"><div class="stat-value" style="color:var(--primary)">18</div><div class="stat-label">Temple Visits</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--sacred-green)">12</div><div class="stat-label">Poojas</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--accent-dark)">₹4.2K</div><div class="stat-label">Donated</div></div>
      </div>

      <div class="section-title mb-3">Visit History — March 2026</div>
      <div class="visit-calendar">
        <div class="visit-day header">Su</div><div class="visit-day header">Mo</div><div class="visit-day header">Tu</div><div class="visit-day header">We</div><div class="visit-day header">Th</div><div class="visit-day header">Fr</div><div class="visit-day header">Sa</div>
        <div class="visit-day">1</div><div class="visit-day visited">2</div><div class="visit-day">3</div><div class="visit-day">4</div><div class="visit-day visited">5</div><div class="visit-day">6</div><div class="visit-day">7</div>
        <div class="visit-day visited">8</div><div class="visit-day">9</div><div class="visit-day">10</div><div class="visit-day">11</div><div class="visit-day visited">12</div><div class="visit-day">13</div><div class="visit-day">14</div>
        <div class="visit-day">15</div><div class="visit-day visited">16</div><div class="visit-day">17</div><div class="visit-day visited">18</div><div class="visit-day">19</div><div class="visit-day">20</div><div class="visit-day">21</div>
      </div>

      <button class="btn btn-primary btn-block" onclick="NavEngine.showToast('Book pooja for Lakshmi!')">
        <i class="fa-solid fa-fire"></i> Book Pooja for Lakshmi
      </button>
    </div>
  `,

  // Add Member
  add_member: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Add Family Member</span>
    </div>
    <div class="section">
      <div class="form-group"><label class="form-label form-required">Name</label><input class="form-input" placeholder="Enter full name"></div>
      <div class="form-group"><label class="form-label form-required">Relation</label>
        <select class="form-select"><option value="">Select relation</option><option>Father</option><option>Mother</option><option>Spouse</option><option>Son</option><option>Daughter</option><option>Brother</option><option>Sister</option><option>Grandfather</option><option>Grandmother</option></select>
      </div>
      <div class="form-group"><label class="form-label">Date of Birth</label><input type="date" class="form-input"></div>
      <div class="form-group"><label class="form-label">Nakshatra (Birth Star)</label>
        <select class="form-select"><option value="">Select nakshatra</option><option>Ashwini</option><option>Bharani</option><option>Krittika</option><option>Rohini</option><option>Mrigashira</option><option>Thiruvathirai</option><option>Punarpoosam</option><option>Poosam</option><option>Ayilyam</option><option>Magha</option><option>Pooram</option><option>Uttara Phalguni</option><option>Hastham</option><option>Chithirai</option><option>Swathi</option><option>Vishakam</option><option>Anusham</option><option>Kettai</option><option>Moolam</option><option>Pooradam</option><option>Uthradam</option><option>Thiruvonam</option><option>Avittam</option><option>Sadhayam</option><option>Poorattadhi</option><option>Uthrattadhi</option><option>Revathi</option></select>
      </div>
      <div class="form-group"><label class="form-label">Rasi (Zodiac)</label>
        <select class="form-select"><option value="">Select rasi</option><option>Mesham</option><option>Rishabam</option><option>Mithunam</option><option>Kadagam</option><option>Simmam</option><option>Kanni</option><option>Thulam</option><option>Viruchigam</option><option>Dhanusu</option><option>Makaram</option><option>Kumbam</option><option>Meenam</option></select>
      </div>
      <div class="form-group"><label class="form-label">Gothram</label><input class="form-input" placeholder="Enter gothram"></div>
      <div class="form-group"><label class="form-label">Phone (optional)</label><input type="tel" class="form-input" placeholder="Mobile number"></div>
      <button class="btn btn-primary btn-block btn-lg" onclick="NavEngine.showToast('Family member added!');NavEngine.goBack()">
        <i class="fa-solid fa-user-plus"></i> Add Member
      </button>
    </div>
  `,

  // Book for Family
  book_family: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Book for Family</span>
    </div>
    <div class="section">
      <div class="section-title mb-3">Select Family Members</div>
      ${FAMILY.map((m, i) => `
        <div class="family-member-card" onclick="this.classList.toggle('selected');this.style.borderColor=this.classList.contains('selected')?'var(--primary)':'var(--border-light)';this.style.background=this.classList.contains('selected')?'var(--primary-bg)':'var(--bg-card)'">
          <div class="fm-header" style="margin-bottom:0">
            <div class="avatar avatar-sm" style="background:${m.color}">${m.avatar}</div>
            <div class="flex-1"><div class="fm-name" style="font-size:var(--text-sm)">${m.name}</div><div class="fm-relation">${m.relation} — ${m.nakshatra}, ${m.gothram}</div></div>
            <i class="fa-regular fa-square" style="font-size:1.2rem;color:var(--border)"></i>
          </div>
        </div>
      `).join('')}
      <button class="btn btn-primary btn-block btn-lg mt-3" onclick="NavEngine.showToast('Redirecting to pooja booking...')">
        Continue to Select Pooja <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `,

  // Family Visit Tracker
  visits: () => `
    <div class="app-header"><span class="header-title">Visit Tracker</span></div>
    <div class="section">
      <div class="section-title mb-3">Family Visits — March 2026</div>
      <div class="visit-calendar">
        <div class="visit-day header">Su</div><div class="visit-day header">Mo</div><div class="visit-day header">Tu</div><div class="visit-day header">We</div><div class="visit-day header">Th</div><div class="visit-day header">Fr</div><div class="visit-day header">Sa</div>
        <div class="visit-day">1</div><div class="visit-day visited">2</div><div class="visit-day">3</div><div class="visit-day visited">4</div><div class="visit-day visited">5</div><div class="visit-day">6</div><div class="visit-day visited">7</div>
        <div class="visit-day visited">8</div><div class="visit-day">9</div><div class="visit-day visited">10</div><div class="visit-day">11</div><div class="visit-day visited">12</div><div class="visit-day">13</div><div class="visit-day visited">14</div>
        <div class="visit-day visited">15</div><div class="visit-day visited">16</div><div class="visit-day">17</div><div class="visit-day visited">18</div><div class="visit-day">19</div><div class="visit-day">20</div><div class="visit-day">21</div>
      </div>
      <div class="card mb-3"><div class="card-body"><div class="flex items-center justify-between"><span style="font-size:var(--text-sm);font-weight:600">Total Family Visits this month</span><span style="font-size:var(--text-lg);font-weight:800;color:var(--primary)">14</span></div></div></div>
      <div class="section-title mb-3">Per Member</div>
      ${FAMILY.map(m => `
        <div class="flex items-center gap-3 mb-2">
          <div class="avatar avatar-sm" style="background:${m.color}">${m.avatar}</div>
          <span style="font-size:var(--text-sm);font-weight:500;flex:1">${m.name.split(' ')[0]}</span>
          <div style="flex:2;height:8px;background:var(--bg-inset);border-radius:var(--radius-full);overflow:hidden">
            <div style="height:100%;width:${(m.visits/22)*100}%;background:var(--gradient-primary);border-radius:var(--radius-full)"></div>
          </div>
          <span style="font-size:var(--text-sm);font-weight:700;color:var(--primary);width:30px;text-align:right">${m.visits}</span>
        </div>
      `).join('')}
    </div>
  `,

  // Donation History
  donation_history: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Family Donations</span>
    </div>
    <div class="section">
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="stat-card"><div class="stat-value" style="color:var(--sacred-green)">₹12,500</div><div class="stat-label">Total</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--primary)">18</div><div class="stat-label">Donations</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--accent-dark)">5</div><div class="stat-label">80G Receipts</div></div>
      </div>
      <div class="section-title mb-3">By Member</div>
      ${FAMILY.slice(0,3).map(m => `
        <div class="flex items-center gap-3 mb-3" style="padding:var(--space-3);border:1px solid var(--border-light);border-radius:var(--radius-md)">
          <div class="avatar avatar-sm" style="background:${m.color}">${m.avatar}</div>
          <div class="flex-1"><div style="font-size:var(--text-sm);font-weight:600">${m.name.split(' ')[0]}</div></div>
          <span style="font-size:var(--text-sm);font-weight:700;color:var(--sacred-green)">₹${(Math.floor(Math.random()*5+1))*1000}</span>
        </div>
      `).join('')}

      <div class="section-title mt-4 mb-3">Recent Donations</div>
      ${[
        { by:'Lakshmi',temple:'Kapaleeshwarar Temple',amount:'₹2,500',type:'Annadhanam',date:'Mar 12' },
        { by:'Suresh',temple:'Meenakshi Amman Temple',amount:'₹5,000',type:'General',date:'Mar 5' },
        { by:'Lakshmi',temple:'Kapaleeshwarar Temple',amount:'₹1,001',type:'Renovation',date:'Feb 20' },
        { by:'Kamala',temple:'Sri Kaliamman Temple',amount:'₹501',type:'Kula Theivam',date:'Feb 10' },
      ].map(d => `
        <div class="card mb-2"><div class="card-body-sm">
          <div class="flex items-center justify-between mb-1">
            <span class="badge badge-primary">${d.type}</span>
            <span style="font-size:var(--text-xs);color:var(--text-muted)">${d.date}</span>
          </div>
          <div class="flex items-center justify-between">
            <div><div style="font-size:var(--text-sm);font-weight:600">${d.temple}</div><div style="font-size:var(--text-xs);color:var(--text-light)">By ${d.by}</div></div>
            <span style="font-size:var(--text-md);font-weight:700;color:var(--sacred-green)">${d.amount}</span>
          </div>
        </div></div>
      `).join('')}
    </div>
  `,

  // Family Settings
  family_settings: () => `
    <div class="back-header">
      <button class="back-btn" onclick="NavEngine.goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <span class="bh-title">Family Settings</span>
    </div>
    <div class="section">
      <div class="section-title mb-3">Kula Theivam</div>
      <div class="form-group"><label class="form-label">Temple Name</label><input class="form-input" value="Sri Kaliamman Temple"></div>
      <div class="form-group"><label class="form-label">Location</label><input class="form-input" value="Kulithalai, Karur District"></div>
      <div class="form-group"><label class="form-label">Deity</label><input class="form-input" value="Amman / Devi"></div>
      <div class="form-group"><label class="form-label">Annual Pooja Month</label>
        <select class="form-select"><option>Aadi (Jul-Aug)</option><option>Thai (Jan-Feb)</option><option>Panguni (Mar-Apr)</option><option>Chithirai (Apr-May)</option></select>
      </div>

      <div class="section-title mt-4 mb-3">Family Gothram</div>
      <div class="form-group"><label class="form-label">Primary Gothram</label><input class="form-input" value="Bharadwaja"></div>

      <div class="section-title mt-4 mb-3">Notifications</div>
      <div class="card mb-2"><div class="card-body-sm"><div class="flex items-center justify-between"><span style="font-size:var(--text-sm);font-weight:600">Family Booking Alerts</span><button class="toggle active" onclick="this.classList.toggle('active')"></button></div></div></div>
      <div class="card mb-2"><div class="card-body-sm"><div class="flex items-center justify-between"><span style="font-size:var(--text-sm);font-weight:600">Kula Theivam Reminders</span><button class="toggle active" onclick="this.classList.toggle('active')"></button></div></div></div>
      <div class="card mb-2"><div class="card-body-sm"><div class="flex items-center justify-between"><span style="font-size:var(--text-sm);font-weight:600">Member Visit Notifications</span><button class="toggle" onclick="this.classList.toggle('active')"></button></div></div></div>

      <button class="btn btn-primary btn-block btn-lg mt-4" onclick="NavEngine.showToast('Settings saved!');NavEngine.goBack()">
        <i class="fa-solid fa-check"></i> Save Settings
      </button>
    </div>
  `,

  profile: () => `
    <div style="background:var(--gradient-primary);padding:66px var(--space-5) var(--space-6);text-align:center">
      <div class="avatar avatar-xl" style="margin:0 auto var(--space-3);border:3px solid rgba(255,255,255,0.3)">LD</div>
      <h3 style="color:white;font-size:var(--text-lg);font-weight:700">Lakshmi Devi</h3>
      <p style="color:rgba(255,255,255,0.8);font-size:var(--text-sm)">Family Manager — 5 members</p>
    </div>
    <div class="section">
      <div class="profile-menu" style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-lg);overflow:hidden">
        <div class="list-item"><div class="li-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-people-roof"></i></div><div class="li-content"><div class="li-title">Family Members</div><div class="li-subtitle">5 members</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item" onclick="NavEngine.navigateTo('kula_theivam')"><div class="li-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-place-of-worship"></i></div><div class="li-content"><div class="li-title">Kula Theivam</div><div class="li-subtitle">Sri Kaliamman Temple</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item" onclick="NavEngine.navigateTo('donation_history')"><div class="li-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-receipt"></i></div><div class="li-content"><div class="li-title">Family Donation History</div><div class="li-subtitle">₹12,500 total</div></div><div class="li-action"><i class="fa-solid fa-chevron-right"></i></div></div>
        <div class="list-item" onclick="NavEngine.toggleTheme()"><div class="li-icon" style="background:var(--bg-inset);color:var(--text-secondary)"><i class="fa-solid fa-moon"></i></div><div class="li-content"><div class="li-title">Dark Mode</div></div><div class="li-action"><button class="toggle ${NavEngine.isDark()?'active':''}"></button></div></div>
      </div>
    </div>
  `,
};

screens.kula_theivam.navTab = 'home';
screens.member_detail.navTab = 'home';
screens.add_member.navTab = 'home';
screens.book_family.navTab = 'home';
screens.donation_history.navTab = 'profile';
screens.family_settings.navTab = 'profile';

NavEngine.init({
  screens,
  startScreen: 'home',
  bottomNav: [
    { screen: 'home', icon: 'fa-solid fa-people-roof', label: 'Family' },
    { screen: 'kula_theivam', icon: 'fa-solid fa-place-of-worship', label: 'Kula Theivam' },
    { screen: 'visits', icon: 'fa-solid fa-calendar-check', label: 'Visits' },
    { screen: 'profile', icon: 'fa-solid fa-circle-user', label: 'Profile' },
  ],
});
