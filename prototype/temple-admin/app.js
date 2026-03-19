/* Temple Admin — Web Dashboard */

const MENU = [
  { id: 'dashboard', icon: 'fa-gauge-high', label: 'Dashboard' },
  { id: 'bookings', icon: 'fa-calendar-check', label: 'Bookings' },
  { id: 'donations', icon: 'fa-hand-holding-heart', label: 'Donations & 80G' },
  { id: 'services', icon: 'fa-fire', label: 'Services Catalog' },
  { id: 'darshan', icon: 'fa-ticket', label: 'Darshan Queue' },
  { id: 'events', icon: 'fa-calendar-days', label: 'Events' },
  { id: 'annadhanam', icon: 'fa-utensils', label: 'Annadhanam' },
  { id: 'feed', icon: 'fa-newspaper', label: 'Feed / Posts' },
  { id: 'priests', icon: 'fa-person-praying', label: 'Priests' },
  { id: 'users', icon: 'fa-users', label: 'Devotees' },
  { id: 'reports', icon: 'fa-chart-line', label: 'Reports' },
  { id: 'settings', icon: 'fa-gear', label: 'Settings' },
];

let currentView = 'dashboard';

function initAdmin() {
  renderSidebar();
  showView('dashboard');
  const saved = localStorage.getItem('st_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = MENU.map(m => `
    <div class="nav-menu-item ${m.id === currentView ? 'active' : ''}" onclick="showView('${m.id}')">
      <i class="fa-solid ${m.icon}"></i> ${m.label}
    </div>
  `).join('');
}

function showView(id) {
  currentView = id;
  renderSidebar();
  document.getElementById('page-title').textContent = MENU.find(m => m.id === id)?.label || 'Dashboard';
  const content = document.getElementById('admin-content');
  content.innerHTML = views[id] ? views[id]() : `<div class="empty-state"><i class="fa-solid fa-wrench"></i><h3>${MENU.find(m=>m.id===id)?.label}</h3><p>This module is being built</p></div>`;
  content.scrollTop = 0;
  if (id === 'dashboard') setTimeout(initCharts, 100);
  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }
function toggleAdminTheme() {
  const c = document.documentElement.getAttribute('data-theme');
  const n = c === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', n);
  localStorage.setItem('st_theme', n);
  document.getElementById('admin-theme-icon').className = n === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

const views = {
  dashboard: () => `
    <div class="kpi-grid stagger-children">
      <div class="kpi-card">
        <div class="kpi-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-calendar-check"></i></div>
        <div class="kpi-value">47</div>
        <div class="kpi-label">Today's Bookings</div>
        <div class="kpi-change up"><i class="fa-solid fa-arrow-up"></i> 12% vs yesterday</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-indian-rupee-sign"></i></div>
        <div class="kpi-value">₹24,500</div>
        <div class="kpi-label">Today's Donations</div>
        <div class="kpi-change up"><i class="fa-solid fa-arrow-up"></i> 8% vs yesterday</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)"><i class="fa-solid fa-ticket"></i></div>
        <div class="kpi-value">182</div>
        <div class="kpi-label">Active Darshan Tokens</div>
        <div class="kpi-change down"><i class="fa-solid fa-arrow-down"></i> 5% vs yesterday</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-calendar-days"></i></div>
        <div class="kpi-value">3</div>
        <div class="kpi-label">Upcoming Events</div>
        <div class="kpi-change" style="color:var(--text-muted)">Next: Panguni Uthiram</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:var(--space-4);margin-bottom:var(--space-6)">
      <div class="chart-card"><h3><i class="fa-solid fa-chart-line" style="color:var(--primary)"></i> Revenue — Last 7 Days</h3><canvas id="revenueChart" height="200"></canvas></div>
      <div class="chart-card"><h3><i class="fa-solid fa-chart-pie" style="color:var(--sacred-purple)"></i> Bookings by Service</h3><canvas id="serviceChart" height="200"></canvas></div>
    </div>

    <div class="chart-card">
      <h3><i class="fa-solid fa-table" style="color:var(--sacred-blue)"></i> Recent Bookings</h3>
      <table class="admin-table">
        <thead><tr><th>ID</th><th>Devotee</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            ['BK-045','Ramesh Kumar','Archana','Mar 20','₹50','Confirmed'],
            ['BK-044','Lakshmi Devi','Abhishekam','Mar 20','₹500','Confirmed'],
            ['BK-043','Karthik S','Ganapathy Homam','Mar 19','₹1,500','Completed'],
            ['BK-042','Priya R','Special Archana','Mar 19','₹100','Completed'],
            ['BK-041','Suresh B','Navagraha Pooja','Mar 18','₹300','Completed'],
          ].map(([id,name,service,date,amount,status]) => `
            <tr>
              <td class="td-bold">${id}</td><td>${name}</td><td>${service}</td><td>${date}</td>
              <td class="td-bold">${amount}</td>
              <td><span class="badge ${status==='Confirmed'?'badge-success':'badge-gold'}">${status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `,

  bookings: () => `
    <div class="flex items-center justify-between mb-4">
      <div class="chip-row"><button class="chip active">All</button><button class="chip">Confirmed</button><button class="chip">Pending</button><button class="chip">Completed</button><button class="chip">Cancelled</button></div>
      <button class="btn btn-sm btn-outline"><i class="fa-solid fa-download"></i> Export</button>
    </div>
    <div class="chart-card">
      <table class="admin-table">
        <thead><tr><th>Booking ID</th><th>Devotee</th><th>Service</th><th>Date</th><th>Slot</th><th>Amount</th><th>QR</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            ['BK-045','Ramesh Kumar','Archana','Mar 20','9:00 AM','₹50','✓','Confirmed'],
            ['BK-044','Lakshmi Devi','Abhishekam','Mar 20','10:00 AM','₹500','✓','Confirmed'],
            ['BK-043','Karthik S','Ganapathy Homam','Mar 19','7:00 AM','₹1,500','Used','Completed'],
            ['BK-042','Priya R','Special Archana','Mar 19','6:00 PM','₹100','Used','Completed'],
            ['BK-041','Suresh B','Navagraha Pooja','Mar 18','8:00 AM','₹300','Used','Completed'],
            ['BK-040','Meera S','Homam','Mar 18','9:30 AM','₹2,000','—','Cancelled'],
          ].map(([id,name,svc,date,slot,amt,qr,status]) => `
            <tr>
              <td class="td-bold">${id}</td><td>${name}</td><td>${svc}</td><td>${date}</td><td>${slot}</td><td class="td-bold">${amt}</td>
              <td>${qr === '✓' ? '<i class="fa-solid fa-qrcode" style="color:var(--primary)"></i>' : qr === 'Used' ? '<span class="badge badge-success">Used</span>' : '—'}</td>
              <td><span class="badge ${status==='Confirmed'?'badge-success':status==='Completed'?'badge-gold':'badge-danger'}">${status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `,

  donations: () => `
    <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:var(--space-5)">
      <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-indian-rupee-sign"></i></div><div class="kpi-value">₹2,45,000</div><div class="kpi-label">This Month</div></div>
      <div class="kpi-card"><div class="kpi-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-receipt"></i></div><div class="kpi-value">45</div><div class="kpi-label">80G Receipts Issued</div></div>
      <div class="kpi-card"><div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-rotate"></i></div><div class="kpi-value">12</div><div class="kpi-label">Recurring Donors</div></div>
    </div>
    <div class="chart-card">
      <div class="flex items-center justify-between mb-3"><h3 style="margin:0">Recent Donations</h3><button class="btn btn-sm btn-outline"><i class="fa-solid fa-file-pdf"></i> Export 80G Report</button></div>
      <table class="admin-table">
        <thead><tr><th>Donor</th><th>Amount</th><th>Type</th><th>Date</th><th>80G</th></tr></thead>
        <tbody>
          ${[
            ['Ramesh Kumar','₹5,000','General','Mar 18','✓'],
            ['Karthik S (NRI)','₹25,000','Annadhanam','Mar 17','✓'],
            ['Lakshmi Devi','₹501','Temple Renovation','Mar 16','✓'],
            ['Anonymous','₹1,000','General','Mar 16','—'],
            ['Priya R','₹2,500','Gopuram Fund','Mar 15','✓'],
          ].map(([name,amt,type,date,g]) => `
            <tr><td class="td-bold">${name}</td><td class="td-bold">${amt}</td><td><span class="badge badge-primary">${type}</span></td><td>${date}</td><td>${g === '✓' ? '<span class="badge badge-success">Issued</span>' : '—'}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `,
};

// ===== SERVICES CATALOG =====
views.services = () => `
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:var(--space-5)">
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-fire"></i></div><div class="kpi-value">12</div><div class="kpi-label">Total Services</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-check-circle"></i></div><div class="kpi-value">10</div><div class="kpi-label">Active</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-indian-rupee-sign"></i></div><div class="kpi-value">₹350</div><div class="kpi-label">Avg Price</div></div>
  </div>
  <div class="flex items-center justify-between mb-4">
    <div class="chip-row"><button class="chip active">All</button><button class="chip">Active</button><button class="chip">Inactive</button></div>
    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-plus"></i> Add Service</button>
  </div>
  <div class="chart-card">
    <table class="admin-table">
      <thead><tr><th>Service</th><th>Category</th><th>Duration</th><th>Price</th><th>Bookings (Month)</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${[
          ['Archana','Prayer','10 min','₹50','320','Active'],
          ['Special Archana','Prayer','15 min','₹100','185','Active'],
          ['Abhishekam','Ritual','30 min','₹500','92','Active'],
          ['Sahasranama Archana','Prayer','20 min','₹200','48','Active'],
          ['Homam (Fire Ritual)','Homam','1 hour','₹2,000','35','Active'],
          ['Ganapathy Homam','Homam','45 min','₹1,500','28','Active'],
          ['Navagraha Pooja','Ritual','20 min','₹300','65','Active'],
          ['VIP Darshan','Darshan','—','₹200','150','Active'],
          ['Mottai (Tonsure)','Special','30 min','₹500','22','Active'],
          ['New Vehicle Pooja','Special','30 min','₹1,000','15','Active'],
          ['Seemantham','Life Event','1.5 hrs','₹3,500','8','Inactive'],
          ['Kumbhabhishekam Special','Festival','2 hrs','₹5,000','—','Inactive'],
        ].map(([name,cat,dur,price,bookings,status]) => `
          <tr>
            <td class="td-bold">${name}</td>
            <td><span class="badge badge-primary">${cat}</span></td>
            <td>${dur}</td><td class="td-bold">${price}</td><td>${bookings}</td>
            <td><span class="badge ${status==='Active'?'badge-success':'badge-danger'}">${status}</span></td>
            <td><button class="btn btn-sm btn-ghost"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-sm btn-ghost"><i class="fa-solid fa-toggle-${status==='Active'?'on':'off'}"></i></button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`;

// ===== DARSHAN QUEUE =====
views.darshan = () => `
  <div class="kpi-grid" style="margin-bottom:var(--space-5)">
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)"><i class="fa-solid fa-users-line"></i></div><div class="kpi-value">47</div><div class="kpi-label">Currently in Queue</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-clock"></i></div><div class="kpi-value">~25 min</div><div class="kpi-label">Avg Wait Time</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-ticket"></i></div><div class="kpi-value">182</div><div class="kpi-label">Today Total</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-crown"></i></div><div class="kpi-value">28</div><div class="kpi-label">VIP Tokens</div></div>
  </div>
  <div class="flex gap-3 mb-4">
    <button class="btn btn-primary"><i class="fa-solid fa-forward"></i> Call Next Token</button>
    <button class="btn btn-outline"><i class="fa-solid fa-rotate-left"></i> Reset Queue</button>
    <button class="btn btn-outline"><i class="fa-solid fa-pause"></i> Pause Queue</button>
  </div>
  <div class="chart-card">
    <h3><i class="fa-solid fa-list-ol" style="color:var(--sacred-blue)"></i> Live Queue</h3>
    <table class="admin-table">
      <thead><tr><th>Token #</th><th>Devotee</th><th>Type</th><th>Slot</th><th>Persons</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>
        ${[
          ['T-043','Ramesh Kumar','Regular','8:00 AM','2','In Darshan'],
          ['T-044','Lakshmi Devi','VIP','8:00 AM','1','Next'],
          ['T-045','Karthik S','Regular','8:30 AM','3','Waiting'],
          ['T-046','Priya R','Senior','8:30 AM','2','Waiting'],
          ['T-047','Suresh B','Regular','9:00 AM','1','Waiting'],
          ['T-048','Meera S','VIP','9:00 AM','4','Waiting'],
          ['T-049','Ganesh P','Regular','9:00 AM','2','Waiting'],
          ['T-050','Kamala A','Senior','9:30 AM','1','Waiting'],
        ].map(([token,name,type,slot,persons,status]) => `
          <tr>
            <td class="td-bold">${token}</td><td>${name}</td>
            <td><span class="badge ${type==='VIP'?'badge-gold':type==='Senior'?'badge-info':'badge-primary'}">${type}</span></td>
            <td>${slot}</td><td>${persons}</td>
            <td><span class="badge ${status==='In Darshan'?'badge-success':status==='Next'?'badge-danger':'badge-gold'}">${status}</span></td>
            <td>${status==='Waiting'?'<button class="btn btn-sm btn-outline">Skip</button>':status==='In Darshan'?'<button class="btn btn-sm btn-success">Complete</button>':'<button class="btn btn-sm btn-primary">Call</button>'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`;

// ===== EVENTS =====
views.events = () => `
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:var(--space-5)">
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-red-bg);color:var(--sacred-red)"><i class="fa-solid fa-calendar-days"></i></div><div class="kpi-value">6</div><div class="kpi-label">Upcoming Events</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-users"></i></div><div class="kpi-value">842</div><div class="kpi-label">Total RSVPs</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-calendar-check"></i></div><div class="kpi-value">3</div><div class="kpi-label">This Month</div></div>
  </div>
  <div class="flex items-center justify-between mb-4">
    <div class="chip-row"><button class="chip active">All</button><button class="chip">Festivals</button><button class="chip">Spiritual</button><button class="chip">Cultural</button><button class="chip">Charity</button></div>
    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-plus"></i> Add Event</button>
  </div>
  <div class="chart-card">
    <table class="admin-table">
      <thead><tr><th>Event</th><th>Date</th><th>Type</th><th>Expected Crowd</th><th>RSVPs</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${[
          ['Panguni Uthiram','Mar 23','Festival','5,000+','420','Upcoming'],
          ['Pradosham','Mar 25','Spiritual','800','85','Upcoming'],
          ['Ekadashi','Mar 29','Spiritual','500','62','Upcoming'],
          ['Tamil New Year','Apr 1','Festival','3,000+','180','Planning'],
          ['Chithirai Thiruvizha','Apr 5','Festival','10,000+','95','Planning'],
          ['Blood Donation Camp','Apr 10','Charity','200','48','Planning'],
        ].map(([name,date,type,crowd,rsvp,status]) => `
          <tr>
            <td class="td-bold">${name}</td><td>${date}</td>
            <td><span class="badge ${type==='Festival'?'badge-danger':type==='Spiritual'?'badge-primary':type==='Charity'?'badge-success':'badge-gold'}">${type}</span></td>
            <td>${crowd}</td><td class="td-bold">${rsvp}</td>
            <td><span class="badge ${status==='Upcoming'?'badge-success':'badge-gold'}">${status}</span></td>
            <td><button class="btn btn-sm btn-ghost"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-sm btn-ghost"><i class="fa-solid fa-bell"></i></button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`;

// ===== ANNADHANAM =====
views.annadhanam = () => `
  <div class="kpi-grid" style="margin-bottom:var(--space-5)">
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-user-check"></i></div><div class="kpi-value">8</div><div class="kpi-label">Today's Sponsors</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-bowl-rice"></i></div><div class="kpi-value">425</div><div class="kpi-label">Meals Served Today</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-indian-rupee-sign"></i></div><div class="kpi-value">₹1.2L</div><div class="kpi-label">This Month Revenue</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)"><i class="fa-solid fa-clock"></i></div><div class="kpi-value">3</div><div class="kpi-label">Pending Sponsorships</div></div>
  </div>
  <div class="chart-card mb-4">
    <h3><i class="fa-solid fa-utensils" style="color:var(--sacred-green)"></i> Today's Meal Schedule</h3>
    <table class="admin-table">
      <thead><tr><th>Meal</th><th>Time</th><th>Sponsor</th><th>Meals</th><th>Menu</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td class="td-bold">Breakfast</td><td>7:00-9:00 AM</td><td>Ramesh Kumar</td><td>100</td><td>Pongal, Idli, Vada</td><td><span class="badge badge-success">Completed</span></td></tr>
        <tr><td class="td-bold">Lunch</td><td>12:00-2:00 PM</td><td>Lakshmi Devi</td><td>250</td><td>Full meals (5 items)</td><td><span class="badge badge-gold">In Progress</span></td></tr>
        <tr><td class="td-bold">Dinner</td><td>7:00-9:00 PM</td><td>Karthik S (NRI)</td><td>100</td><td>Rice, Sambar, Rasam</td><td><span class="badge badge-info">Scheduled</span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="chart-card">
    <div class="flex items-center justify-between mb-3"><h3 style="margin:0">Recent Sponsorships</h3><button class="btn btn-sm btn-outline"><i class="fa-solid fa-download"></i> Export</button></div>
    <table class="admin-table">
      <thead><tr><th>Sponsor</th><th>Date</th><th>Package</th><th>Amount</th><th>Photo Sent</th><th>Status</th></tr></thead>
      <tbody>
        ${[
          ['Ramesh Kumar','Mar 19','100 Meals','₹5,000','✓','Completed'],
          ['Lakshmi Devi','Mar 19','250 Meals','₹12,500','—','In Progress'],
          ['Karthik S (NRI)','Mar 19','100 Meals','₹5,000','—','Scheduled'],
          ['Priya R','Mar 18','25 Meals','₹1,250','✓','Completed'],
          ['Suresh B','Mar 17','Full Day (500)','₹25,000','✓','Completed'],
        ].map(([name,date,pkg,amt,photo,status]) => `
          <tr><td class="td-bold">${name}</td><td>${date}</td><td>${pkg}</td><td class="td-bold">${amt}</td>
          <td>${photo==='✓'?'<span class="badge badge-success">Sent</span>':'—'}</td>
          <td><span class="badge ${status==='Completed'?'badge-success':status==='In Progress'?'badge-gold':'badge-info'}">${status}</span></td></tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`;

// ===== FEED / POSTS =====
views.feed = () => `
  <div class="flex items-center justify-between mb-4">
    <div class="chip-row"><button class="chip active">All</button><button class="chip">Published</button><button class="chip">Draft</button><button class="chip">Scheduled</button></div>
    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-plus"></i> Create Post</button>
  </div>
  <div class="chart-card">
    <table class="admin-table">
      <thead><tr><th>Title</th><th>Type</th><th>Posted By</th><th>Date</th><th>Views</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${[
          ['Online Pooja Booking Available','Announcement','Temple Admin','Mar 18','1,240','Published'],
          ['Panguni Uthiram — March 23','Festival Alert','Temple Admin','Mar 17','2,850','Published'],
          ['New: Navagraha Temple Trail','Update','System','Mar 16','980','Published'],
          ['Annadhanam Schedule Updated','Notice','Temple Admin','Mar 15','620','Published'],
          ['Special Abhishekam Discount','Offer','Temple Admin','—','—','Draft'],
          ['Tamil New Year Celebrations','Festival Alert','Temple Admin','Apr 1','—','Scheduled'],
        ].map(([title,type,by,date,views,status]) => `
          <tr>
            <td class="td-bold">${title}</td>
            <td><span class="badge ${type==='Announcement'?'badge-primary':type==='Festival Alert'?'badge-danger':type==='Offer'?'badge-gold':'badge-info'}">${type}</span></td>
            <td>${by}</td><td>${date}</td><td>${views}</td>
            <td><span class="badge ${status==='Published'?'badge-success':status==='Draft'?'badge-gold':'badge-info'}">${status}</span></td>
            <td><button class="btn btn-sm btn-ghost"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-sm btn-ghost"><i class="fa-solid fa-trash"></i></button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`;

// ===== PRIESTS =====
views.priests = () => `
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:var(--space-5)">
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-person-praying"></i></div><div class="kpi-value">8</div><div class="kpi-label">Total Priests</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-check-circle"></i></div><div class="kpi-value">6</div><div class="kpi-label">Active</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent-dark)"><i class="fa-solid fa-star"></i></div><div class="kpi-value">4.7</div><div class="kpi-label">Avg Rating</div></div>
  </div>
  <div class="flex items-center justify-between mb-4">
    <div class="chip-row"><button class="chip active">All</button><button class="chip">Active</button><button class="chip">On Leave</button><button class="chip">Pending</button></div>
    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-plus"></i> Add Priest</button>
  </div>
  <div class="chart-card">
    <table class="admin-table">
      <thead><tr><th>Name</th><th>Speciality</th><th>Experience</th><th>Rating</th><th>Home Bookings</th><th>Monthly Earnings</th><th>Status</th></tr></thead>
      <tbody>
        ${[
          ['Sri Venkatesh Sharma','Devi Poojas, Homam','25 years','4.9 (85)','85','₹72,000','Active'],
          ['Sri Raghavan Iyyer','Shiva Rituals','20 years','4.7 (62)','62','₹58,000','Active'],
          ['Sri Ganesh Bhattar','Archana, Vastu','15 years','4.8 (45)','45','₹42,000','Active'],
          ['Sri Lakshmi Narasimha','Vishnu Rituals','30 years','4.9 (120)','120','₹85,000','Active'],
          ['Sri Sundaram','General Poojas','10 years','4.5 (28)','28','₹25,000','Active'],
          ['Sri Balasubramani','Murugan Rituals','18 years','4.6 (35)','35','₹38,000','On Leave'],
          ['Sri Vaidyanathan','Navagraha','22 years','4.4 (52)','—','—','Pending Verification'],
          ['Sri Kumaran','Special Rituals','8 years','—','—','—','Pending Verification'],
        ].map(([name,spec,exp,rating,bookings,earnings,status]) => `
          <tr>
            <td class="td-bold">${name}</td><td>${spec}</td><td>${exp}</td><td>${rating}</td><td>${bookings}</td><td class="td-bold">${earnings}</td>
            <td><span class="badge ${status==='Active'?'badge-success':status==='On Leave'?'badge-gold':'badge-info'}">${status}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`;

// ===== DEVOTEES =====
views.users = () => `
  <div class="kpi-grid" style="margin-bottom:var(--space-5)">
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-blue-bg);color:var(--sacred-blue)"><i class="fa-solid fa-users"></i></div><div class="kpi-value">2,450</div><div class="kpi-label">Total Devotees</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-green-bg);color:var(--sacred-green)"><i class="fa-solid fa-user-plus"></i></div><div class="kpi-value">120</div><div class="kpi-label">This Month New</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--primary-bg);color:var(--primary)"><i class="fa-solid fa-user-check"></i></div><div class="kpi-value">1,840</div><div class="kpi-label">Active</div></div>
    <div class="kpi-card"><div class="kpi-icon" style="background:var(--sacred-purple-bg);color:var(--sacred-purple)"><i class="fa-solid fa-plane-departure"></i></div><div class="kpi-value">180</div><div class="kpi-label">NRI Users</div></div>
  </div>
  <div class="chart-card">
    <div class="flex items-center justify-between mb-3">
      <h3 style="margin:0"><i class="fa-solid fa-users" style="color:var(--sacred-blue)"></i> Registered Devotees</h3>
      <button class="btn btn-sm btn-outline"><i class="fa-solid fa-download"></i> Export</button>
    </div>
    <table class="admin-table">
      <thead><tr><th>Name</th><th>Phone</th><th>Nakshatra</th><th>Gothram</th><th>Bookings</th><th>Donated</th><th>Joined</th></tr></thead>
      <tbody>
        ${[
          ['Ramesh Kumar','+91 98765 43210','Ashwini','Kashyapa','23','₹8,500','Jan 2026'],
          ['Lakshmi Devi','+91 87654 32109','Uttara Phalguni','Bharadwaja','18','₹12,500','Jan 2026'],
          ['Karthik S','+91 76543 21098','Ashwini','Bharadwaja','12','₹3,200','Feb 2026'],
          ['Priya R','+91 65432 10987','Rohini','Kashyapa','8','₹2,500','Feb 2026'],
          ['Suresh B','+91 54321 09876','Swathi','Bharadwaja','15','₹5,000','Jan 2026'],
          ['Meera Shankar','+91 43210 98765','Magha','Vasishta','6','₹1,800','Mar 2026'],
        ].map(([name,phone,nak,goth,bookings,donated,joined]) => `
          <tr><td class="td-bold">${name}</td><td>${phone}</td><td>${nak}</td><td>${goth}</td><td>${bookings}</td><td class="td-bold">${donated}</td><td>${joined}</td></tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`;

// ===== REPORTS =====
views.reports = () => `
  <div class="flex items-center justify-between mb-5">
    <div class="chip-row"><button class="chip active">This Month</button><button class="chip">Last Month</button><button class="chip">This Quarter</button><button class="chip">Custom Range</button></div>
    <button class="btn btn-sm btn-outline"><i class="fa-solid fa-download"></i> Export All</button>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);margin-bottom:var(--space-4)">
    ${[
      ['fa-chart-line','Revenue Report','Monthly revenue breakdown by service, donation, and darshan','var(--primary)'],
      ['fa-calendar-check','Booking Analytics','Service-wise bookings, peak hours, cancellation rates','var(--sacred-blue)'],
      ['fa-hand-holding-heart','Donation Summary','Donor breakdown, 80G receipts, recurring vs one-time','var(--sacred-green)'],
      ['fa-users-line','Darshan Analytics','Queue performance, avg wait time, peak periods','var(--accent-dark)'],
      ['fa-utensils','Annadhanam Report','Meals served, sponsor details, monthly trends','var(--sacred-teal)'],
      ['fa-person-praying','Priest Performance','Bookings, ratings, earnings by priest','var(--sacred-red)'],
    ].map(([icon,title,desc,color]) => `
      <div class="chart-card" style="margin-bottom:0">
        <div class="flex items-center gap-3 mb-3">
          <div style="width:40px;height:40px;border-radius:var(--radius-md);background:${color}15;color:${color};display:flex;align-items:center;justify-content:center"><i class="fa-solid ${icon}"></i></div>
          <div><h3 style="margin:0;font-size:var(--text-md)">${title}</h3><p style="font-size:var(--text-xs);color:var(--text-light);margin:0">${desc}</p></div>
        </div>
        <div style="height:120px;background:var(--bg-inset);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:var(--space-3)">
          <i class="fa-solid fa-chart-bar" style="font-size:2rem;color:var(--text-muted)"></i>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-sm btn-outline flex-1"><i class="fa-solid fa-file-pdf"></i> PDF</button>
          <button class="btn btn-sm btn-outline flex-1"><i class="fa-solid fa-file-csv"></i> CSV</button>
        </div>
      </div>
    `).join('')}
  </div>
`;

// ===== SETTINGS =====
views.settings = () => `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)">
    <div class="chart-card">
      <h3><i class="fa-solid fa-place-of-worship" style="color:var(--primary)"></i> Temple Information</h3>
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        <div><label style="font-size:var(--text-sm);font-weight:600;display:block;margin-bottom:4px">Temple Name</label><input class="form-input" value="Kapaleeshwarar Temple" style="padding:var(--space-3);border:1px solid var(--border);border-radius:var(--radius-md);width:100%;background:var(--bg-card);color:var(--text-primary)"></div>
        <div><label style="font-size:var(--text-sm);font-weight:600;display:block;margin-bottom:4px">Address</label><input class="form-input" value="Mylapore, Chennai, Tamil Nadu 600004" style="padding:var(--space-3);border:1px solid var(--border);border-radius:var(--radius-md);width:100%;background:var(--bg-card);color:var(--text-primary)"></div>
        <div><label style="font-size:var(--text-sm);font-weight:600;display:block;margin-bottom:4px">Main Deity</label><input class="form-input" value="Shiva (Kapaleeshwarar)" style="padding:var(--space-3);border:1px solid var(--border);border-radius:var(--radius-md);width:100%;background:var(--bg-card);color:var(--text-primary)"></div>
        <div><label style="font-size:var(--text-sm);font-weight:600;display:block;margin-bottom:4px">Contact Phone</label><input class="form-input" value="+91 44 2464 1670" style="padding:var(--space-3);border:1px solid var(--border);border-radius:var(--radius-md);width:100%;background:var(--bg-card);color:var(--text-primary)"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div><label style="font-size:var(--text-sm);font-weight:600;display:block;margin-bottom:4px">Morning</label><input value="5:00 AM - 12:30 PM" style="padding:var(--space-3);border:1px solid var(--border);border-radius:var(--radius-md);width:100%;background:var(--bg-card);color:var(--text-primary)"></div>
          <div><label style="font-size:var(--text-sm);font-weight:600;display:block;margin-bottom:4px">Evening</label><input value="4:00 PM - 9:30 PM" style="padding:var(--space-3);border:1px solid var(--border);border-radius:var(--radius-md);width:100%;background:var(--bg-card);color:var(--text-primary)"></div>
        </div>
      </div>
    </div>
    <div>
      <div class="chart-card mb-4">
        <h3><i class="fa-solid fa-toggle-on" style="color:var(--sacred-green)"></i> Feature Toggles</h3>
        ${[
          ['Online Booking', true],['Live Darshan Stream', true],['QR Code Scanning', true],
          ['Annadhanam Module', true],['80G Donation Receipts', true],['Prasadam Shop', false],
          ['Community Forum', true],['Volunteer Management', false],
        ].map(([name, on]) => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3) 0;border-bottom:1px solid var(--divider)">
            <span style="font-size:var(--text-sm)">${name}</span>
            <button class="toggle ${on?'active':''}" onclick="this.classList.toggle('active')"></button>
          </div>
        `).join('')}
      </div>
      <div class="chart-card">
        <h3><i class="fa-solid fa-building-columns" style="color:var(--sacred-blue)"></i> Payment Settings</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          <div><label style="font-size:var(--text-sm);font-weight:600;display:block;margin-bottom:4px">Bank Account</label><input value="HDFC Bank — ****4521" style="padding:var(--space-3);border:1px solid var(--border);border-radius:var(--radius-md);width:100%;background:var(--bg-card);color:var(--text-primary)"></div>
          <div><label style="font-size:var(--text-sm);font-weight:600;display:block;margin-bottom:4px">UPI ID</label><input value="kapaleeshwarar@hdfcbank" style="padding:var(--space-3);border:1px solid var(--border);border-radius:var(--radius-md);width:100%;background:var(--bg-card);color:var(--text-primary)"></div>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-top:var(--space-5);text-align:right"><button class="btn btn-primary"><i class="fa-solid fa-check"></i> Save All Changes</button></div>
`;

function initCharts() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#BCAAA4' : '#8D6E63';
  const gridColor = isDark ? '#3E2723' : '#EFEBE9';

  // Revenue Chart
  const revCtx = document.getElementById('revenueChart');
  if (revCtx) {
    new Chart(revCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Bookings (₹)',
          data: [12000, 15000, 11000, 18000, 22000, 28000, 24500],
          borderColor: '#E65100',
          backgroundColor: 'rgba(230,81,0,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#E65100',
        }, {
          label: 'Donations (₹)',
          data: [8000, 12000, 6000, 9000, 15000, 25000, 18000],
          borderColor: '#2E7D32',
          backgroundColor: 'rgba(46,125,50,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#2E7D32',
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: textColor } } },
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor } },
          y: { ticks: { color: textColor, callback: v => '₹' + (v/1000) + 'K' }, grid: { color: gridColor } }
        }
      }
    });
  }

  // Service Chart
  const svcCtx = document.getElementById('serviceChart');
  if (svcCtx) {
    new Chart(svcCtx, {
      type: 'doughnut',
      data: {
        labels: ['Archana', 'Abhishekam', 'Homam', 'Darshan', 'Other'],
        datasets: [{ data: [35, 25, 15, 15, 10], backgroundColor: ['#E65100', '#FFB300', '#C62828', '#1565C0', '#6A1B9A'] }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: textColor, padding: 12 } } } }
    });
  }
}

initAdmin();
