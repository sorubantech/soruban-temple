// ===== Temple Digital App - Main JavaScript =====

// Toast notification
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// Modal
function showModal(icon, title, message, btnText, onClose) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.querySelector('.modal-icon').textContent = icon;
  overlay.querySelector('h3').textContent = title;
  overlay.querySelector('p').textContent = message;
  const btn = overlay.querySelector('.btn');
  btn.textContent = btnText || 'OK';
  btn.onclick = () => {
    overlay.classList.remove('show');
    if (onClose) onClose();
  };
  overlay.classList.add('show');
}

// Navigate
function navigateTo(page) {
  window.location.href = page;
}

// ===== Auth Functions =====
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

  event.target.classList.add('active');
  document.getElementById(tab + '-form').classList.add('active');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showToast(typeof t === 'function' ? t('fill_all_fields') : 'Please fill all fields', 'error');
    return;
  }

  // Check if user is blocked by Super Admin
  try {
    const saUsers = JSON.parse(localStorage.getItem('sa_users') || '[]');
    if (saUsers.length > 0) {
      const emailToCheck = email.includes('@') ? email : email + '@temple.com';
      const match = saUsers.find(u => u.email === emailToCheck);
      if (match && match.status === 'blocked') {
        showToast('Your account has been suspended. Please contact support.', 'error');
        return;
      }
    }
  } catch (e) {}

  // Check if existing profile data exists (preserve name if user edited it)
  let existingUser = {};
  try { existingUser = JSON.parse(localStorage.getItem('temple_user') || '{}'); } catch(e) {}

  // Format name from email - capitalize properly
  let displayName = existingUser.name || '';
  if (!displayName || displayName === 'Devotee') {
    const raw = email.split('@')[0] || '';
    displayName = raw
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim() || 'Devotee';
  }

  localStorage.setItem('temple_user', JSON.stringify({
    name: displayName,
    email: email.includes('@') ? email : email + '@temple.com',
    phone: existingUser.phone || '',
    loggedIn: true
  }));

  showToast(typeof t === 'function' ? t('login_success') : 'Login successful!', 'success');
  setTimeout(() => navigateTo('home.html'), 1000);
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  const password = document.getElementById('reg-password').value;

  if (!name || !email || !phone || !password) {
    showToast(typeof t === 'function' ? t('fill_all_fields') : 'Please fill all fields', 'error');
    return;
  }

  localStorage.setItem('temple_user', JSON.stringify({
    name, email, phone, loggedIn: true
  }));

  showToast(typeof t === 'function' ? t('account_created') : 'Account created successfully!', 'success');
  setTimeout(() => navigateTo('home.html'), 1000);
}

// ===== Pooja Booking =====
let selectedPooja = null;

function selectPooja(el, name, price) {
  document.querySelectorAll('.pooja-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedPooja = { name, price };

  // Show the form fields
  const formFields = document.getElementById('pooja-form-fields');
  if (formFields) {
    formFields.style.display = 'block';

    // Set default date to today if empty
    const dateInput = document.getElementById('pooja-date');
    if (dateInput && !dateInput.value) {
      const today = new Date();
      dateInput.value = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
    }

    // Pre-fill devotee name from profile if empty
    const nameInput = document.getElementById('devotee-name');
    if (nameInput && !nameInput.value) {
      try {
        const user = JSON.parse(localStorage.getItem('temple_user'));
        if (user && user.name) nameInput.value = user.name;
      } catch(e) {}
    }

    // Pre-fill rasi from saved preference if empty
    const rasiSelect = document.getElementById('pooja-rasi');
    if (rasiSelect && !rasiSelect.value) {
      const savedRasi = localStorage.getItem('temple_user_rasi');
      if (savedRasi !== null) {
        const rasiNames = ['Mesham','Rishabam','Mithunam','Kadagam','Simmam','Kanni','Thulam','Viruchigam','Dhanusu','Magaram','Kumbam','Meenam'];
        rasiSelect.value = rasiNames[parseInt(savedRasi)] || '';
      }
    }

    // Scroll form into view
    formFields.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  updateBookingSummary();
}

function updateBookingSummary() {
  const summary = document.getElementById('booking-summary');
  if (!summary || !selectedPooja) return;
  summary.style.display = 'block';
  document.getElementById('summary-pooja').textContent = selectedPooja.name;
  document.getElementById('summary-price').textContent = '₹' + selectedPooja.price;
  document.getElementById('summary-total').textContent = '₹' + selectedPooja.price;
}

function handleBookPooja(e) {
  e.preventDefault();
  const name = document.getElementById('devotee-name').value;
  const date = document.getElementById('pooja-date').value;
  const rasi = document.getElementById('pooja-rasi')?.value || '';
  const gothram = document.getElementById('gothram')?.value || '';
  const nakshatram = document.getElementById('nakshatram')?.value || '';

  if (!selectedPooja) {
    showToast(typeof t === 'function' ? t('select_pooja_error') : 'Please select a pooja', 'error');
    return;
  }
  if (!name || !date) {
    showToast(typeof t === 'function' ? t('fill_details_error') : 'Please fill all details', 'error');
    return;
  }

  // Save booking
  const bookings = JSON.parse(localStorage.getItem('temple_bookings') || '[]');
  bookings.push({
    id: Date.now(),
    pooja: selectedPooja.name,
    price: selectedPooja.price,
    name, date, rasi, gothram, nakshatram,
    status: 'Confirmed'
  });
  localStorage.setItem('temple_bookings', JSON.stringify(bookings));

  showModal('✅', typeof t === 'function' ? t('booking_confirmed') : 'Booking Confirmed!',
    `${selectedPooja.name} has been booked for ${name} on ${date}. Payment of ₹${selectedPooja.price} will be collected via Razorpay.`,
    'Done', () => navigateTo('home.html'));
}

// ===== Donation =====
let selectedAmount = 0;
let selectedDonationType = '';

function selectAmount(el, amount) {
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedAmount = amount;
  const input = document.getElementById('custom-amount');
  if (input) input.value = amount;
}

function selectDonationType(el, type) {
  document.querySelectorAll('.donation-type').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
  selectedDonationType = type;
}

function handleDonation(e) {
  e.preventDefault();
  const amount = document.getElementById('custom-amount')?.value || selectedAmount;

  if (!amount || amount <= 0) {
    showToast('Please enter a valid amount', 'error');
    return;
  }
  if (!selectedDonationType) {
    showToast('Please select donation type', 'error');
    return;
  }

  // Get user info for donation record
  let donorName = 'Devotee';
  let donorEmail = '';
  try {
    const user = JSON.parse(localStorage.getItem('temple_user') || '{}');
    donorName = user.name || 'Devotee';
    donorEmail = user.email || '';
  } catch (e) {}

  // Get temple context if available
  let templeName = '';
  try {
    const selTemple = JSON.parse(localStorage.getItem('selected_temple') || 'null');
    if (selTemple && selTemple.name) templeName = selTemple.name;
  } catch (e) {}

  const donations = JSON.parse(localStorage.getItem('temple_donations') || '[]');
  donations.push({
    id: Date.now(),
    amount: Number(amount),
    type: selectedDonationType,
    date: new Date().toLocaleDateString(),
    donorName: donorName,
    donorEmail: donorEmail,
    temple: templeName
  });
  localStorage.setItem('temple_donations', JSON.stringify(donations));

  showModal('🙏', 'Thank You!',
    `Your donation of ₹${amount} for ${selectedDonationType} has been received. May God bless you!`,
    'Done', () => navigateTo('home.html'));
}

// ===== Profile =====
function loadProfile() {
  const user = JSON.parse(localStorage.getItem('temple_user') || '{}');
  const bookings = JSON.parse(localStorage.getItem('temple_bookings') || '[]');
  const donations = JSON.parse(localStorage.getItem('temple_donations') || '[]');

  // Display name - format properly
  const name = user.name || 'Devotee';
  if (document.getElementById('profile-name'))
    document.getElementById('profile-name').textContent = name;

  // Show email/phone below name (only if it looks like a real email)
  if (document.getElementById('profile-email')) {
    const email = user.email || '';
    const phone = user.phone || '';
    let subText = '';
    if (email && email.includes('@') && !email.startsWith('admin')) subText = email;
    else if (phone) subText = phone;
    document.getElementById('profile-email').textContent = subText;
  }

  // Dynamic avatar with user's initial
  if (document.getElementById('profile-avatar')) {
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const avatar = document.getElementById('profile-avatar');
    avatar.textContent = '';
    avatar.style.fontSize = '1.6rem';
    avatar.style.fontWeight = '800';
    avatar.style.color = 'white';
    avatar.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))';
    avatar.textContent = initials || '🙏';
  }

  if (document.getElementById('booking-count'))
    document.getElementById('booking-count').textContent = bookings.length;
  if (document.getElementById('donation-count'))
    document.getElementById('donation-count').textContent = donations.length;
  if (document.getElementById('total-donated')) {
    const total = donations.reduce((sum, d) => sum + d.amount, 0);
    document.getElementById('total-donated').textContent = '₹' + total;
  }
  if (document.getElementById('following-count')) {
    const likes = JSON.parse(localStorage.getItem('temple_likes') || '[]');
    document.getElementById('following-count').textContent = likes.length;
  }
}

// ===== Edit Profile =====
function openEditProfile() {
  const user = JSON.parse(localStorage.getItem('temple_user') || '{}');
  document.getElementById('edit-name').value = user.name || '';
  document.getElementById('edit-email').value = (user.email && !user.email.startsWith('admin')) ? user.email : '';
  document.getElementById('edit-phone').value = user.phone || '';
  const modal = document.getElementById('edit-profile-modal');
  modal.style.display = 'flex';
}

function closeEditProfile() {
  document.getElementById('edit-profile-modal').style.display = 'none';
}

function saveProfile() {
  const name = document.getElementById('edit-name').value.trim();
  const email = document.getElementById('edit-email').value.trim();
  const phone = document.getElementById('edit-phone').value.trim();

  if (!name) {
    showToast(typeof t === 'function' ? t('enter_name_error') : 'Please enter your name', 'error');
    return;
  }

  const user = JSON.parse(localStorage.getItem('temple_user') || '{}');
  user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  localStorage.setItem('temple_user', JSON.stringify(user));

  closeEditProfile();
  loadProfile();
  showToast(typeof t === 'function' ? t('profile_updated') : 'Profile updated!', 'success');
}

function handleLogout() {
  localStorage.removeItem('temple_user');
  localStorage.removeItem('temple_bookings');
  localStorage.removeItem('temple_donations');
  localStorage.removeItem('temple_likes');
  localStorage.removeItem('temple_reviews');
  localStorage.removeItem('temple_following');
  localStorage.removeItem('temple_user_rasi');
  localStorage.removeItem('feed_likes');
  localStorage.removeItem('feed_saves');
  localStorage.removeItem('feed_comments');
  showToast(typeof t === 'function' ? t('logged_out') : 'Logged out successfully', 'info');
  setTimeout(() => navigateTo('login.html'), 800);
}

// ===== Auth Guard =====
// Protect all pages except login.html and index.html
function checkUserAuth() {
  const page = window.location.pathname.split('/').pop() || '';
  const publicPages = ['index.html', 'login.html', ''];
  if (publicPages.includes(page)) return;

  try {
    const user = JSON.parse(localStorage.getItem('temple_user') || 'null');
    if (!user || !user.loggedIn) {
      window.location.href = 'login.html';
      return;
    }

    // Check if user is blocked in Super Admin system
    const saUsers = JSON.parse(localStorage.getItem('sa_users') || '[]');
    if (saUsers.length > 0 && user.email) {
      const match = saUsers.find(u => u.email === user.email);
      if (match && match.status === 'blocked') {
        localStorage.removeItem('temple_user');
        showToast('Your account has been suspended. Please contact support.', 'error');
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
        return;
      }
    }
  } catch (e) {
    window.location.href = 'login.html';
  }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  // Auth guard - redirect to login if not authenticated
  checkUserAuth();

  // Load profile if on profile page
  if (document.getElementById('profile-name')) {
    loadProfile();
  }

  // Set active nav item
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('href') === currentPage) {
      item.classList.add('active');
    }
  });

  // Global image fallback - show placeholder gradient on broken images
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.background = 'linear-gradient(135deg, #ff9800, #e65100)';
      this.style.objectFit = 'contain';
      this.alt = this.alt || 'Image';
      this.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><rect fill="%23ff9800" width="200" height="120"/><text x="100" y="65" text-anchor="middle" fill="white" font-size="28">🛕</text></svg>');
    }, { once: true });
  });
});
