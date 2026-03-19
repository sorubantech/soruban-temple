/**
 * Hindu Temple Admin Dashboard - Main JavaScript
 * Manages temple administration: bookings, donations, temples, events,
 * gallery, annadhanam, feed posts, users, and reports.
 * Uses localStorage for all data persistence.
 */

(function () {
    'use strict';

    // =========================================================================
    // CONSTANTS
    // =========================================================================

    const STORAGE_KEYS = {
        SESSION: 'admin_session',
        ADMIN_ACCOUNTS: 'admin_accounts',
        TEMPLES: 'admin_temples',
        EVENTS: 'admin_events',
        GALLERY: 'admin_gallery',
        ANNADHANAM: 'admin_annadhanam',
        POSTS: 'admin_posts',
        USERS: 'admin_users',
        BOOKINGS: 'temple_bookings',
        DONATIONS: 'temple_donations',
        USER: 'temple_user',
        FOLLOWING: 'temple_following',
        USER_RASI: 'temple_user_rasi'
    };

    // Roles
    var ROLE_SUPER = 'superadmin';
    var ROLE_TEMPLE = 'templeadmin';

    // Pages restricted to super admin only
    var SUPER_ONLY_PAGES = ['temples', 'users', 'settings', 'reports', 'admin-accounts'];

    // =========================================================================
    // UTILITY FUNCTIONS
    // =========================================================================

    /**
     * Generate a unique ID string.
     * @returns {string}
     */
    function generateId() {
        return Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 9);
    }

    /**
     * Format a date value into a readable string.
     * @param {string|Date|number} date
     * @returns {string}
     */
    function formatDate(date) {
        try {
            var d = new Date(date);
            if (isNaN(d.getTime())) return String(date);
            return d.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (err) {
            return String(date);
        }
    }

    /**
     * Format a number as Indian Rupee currency.
     * @param {number|string} amount
     * @returns {string}
     */
    function formatCurrency(amount) {
        var num = parseFloat(amount);
        if (isNaN(num)) return '\u20B90';
        return '\u20B9' + num.toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }

    /**
     * Safely read and parse JSON from localStorage.
     * @param {string} key
     * @param {*} fallback
     * @returns {*}
     */
    function storageGet(key, fallback) {
        try {
            var raw = localStorage.getItem(key);
            if (raw === null || raw === undefined) return fallback !== undefined ? fallback : null;
            return JSON.parse(raw);
        } catch (err) {
            console.error('Error reading localStorage key "' + key + '":', err);
            return fallback !== undefined ? fallback : null;
        }
    }

    /**
     * Safely write JSON to localStorage.
     * @param {string} key
     * @param {*} value
     */
    function storageSet(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error('Error writing localStorage key "' + key + '":', err);
            showToast('Storage error. Data may not be saved.', 'error');
        }
    }

    /**
     * Show a toast notification.
     * @param {string} message
     * @param {string} type - 'success' | 'error' | 'warning' | 'info'
     */
    function showToast(message, type) {
        type = type || 'info';

        var existing = document.querySelectorAll('.admin-toast');
        existing.forEach(function (el) { el.remove(); });

        var toast = document.createElement('div');
        toast.className = 'admin-toast admin-toast-' + type;
        toast.setAttribute('role', 'alert');

        var icons = {
            success: '\u2714',
            error: '\u2716',
            warning: '\u26A0',
            info: '\u2139'
        };

        toast.innerHTML =
            '<span class="toast-icon">' + (icons[type] || icons.info) + '</span>' +
            '<span class="toast-message">' + escapeHtml(message) + '</span>' +
            '<button class="toast-close" aria-label="Close">&times;</button>';

        toast.style.cssText =
            'position:fixed;top:20px;right:20px;z-index:10000;padding:14px 20px;' +
            'border-radius:8px;color:#fff;font-size:14px;display:flex;align-items:center;' +
            'gap:10px;box-shadow:0 4px 20px rgba(0,0,0,0.25);animation:slideInRight 0.3s ease;' +
            'max-width:400px;word-wrap:break-word;';

        var colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        toast.style.backgroundColor = colors[type] || colors.info;
        if (type === 'warning') toast.style.color = '#333';

        document.body.appendChild(toast);

        var closeBtn = toast.querySelector('.toast-close');
        closeBtn.style.cssText =
            'background:none;border:none;color:inherit;font-size:18px;cursor:pointer;' +
            'margin-left:10px;padding:0;line-height:1;';
        closeBtn.addEventListener('click', function () { toast.remove(); });

        setTimeout(function () {
            if (toast.parentNode) {
                toast.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(function () { toast.remove(); }, 300);
            }
        }, 4000);
    }

    /**
     * Show a modal dialog with the given HTML content.
     * @param {string} content - HTML string to place inside the modal body.
     */
    function showModal(content) {
        closeModal();

        var overlay = document.createElement('div');
        overlay.className = 'admin-modal-overlay';
        overlay.style.cssText =
            'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);' +
            'z-index:9998;display:flex;align-items:center;justify-content:center;' +
            'animation:fadeIn 0.2s ease;';

        var modal = document.createElement('div');
        modal.className = 'admin-modal';
        modal.style.cssText =
            'background:#fff;border-radius:12px;padding:30px;max-width:600px;width:90%;' +
            'max-height:80vh;overflow-y:auto;z-index:9999;position:relative;' +
            'box-shadow:0 10px 40px rgba(0,0,0,0.3);animation:scaleIn 0.2s ease;';

        var closeBtn = document.createElement('button');
        closeBtn.className = 'admin-modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText =
            'position:absolute;top:10px;right:15px;background:none;border:none;' +
            'font-size:28px;cursor:pointer;color:#666;line-height:1;';
        closeBtn.addEventListener('click', closeModal);

        modal.innerHTML = content;
        modal.insertBefore(closeBtn, modal.firstChild);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });

        document.addEventListener('keydown', handleModalEscape);
    }

    function handleModalEscape(e) {
        if (e.key === 'Escape') closeModal();
    }

    /**
     * Close any open modal dialog.
     */
    function closeModal() {
        var overlay = document.querySelector('.admin-modal-overlay');
        if (overlay) overlay.remove();
        document.removeEventListener('keydown', handleModalEscape);
    }

    /**
     * Show a confirmation dialog and return a promise that resolves with the user's choice.
     * @param {string} message
     * @returns {Promise<boolean>}
     */
    function confirmAction(message) {
        return new Promise(function (resolve) {
            var html =
                '<div style="text-align:center;padding:20px 0;">' +
                '<div style="font-size:48px;margin-bottom:15px;">\u26A0\uFE0F</div>' +
                '<h3 style="margin:0 0 10px;color:#333;">Confirm Action</h3>' +
                '<p style="color:#666;margin:0 0 25px;">' + escapeHtml(message) + '</p>' +
                '<div style="display:flex;gap:12px;justify-content:center;">' +
                '<button id="confirmNo" style="padding:10px 28px;border:1px solid #ddd;' +
                'background:#f8f9fa;border-radius:6px;cursor:pointer;font-size:14px;">Cancel</button>' +
                '<button id="confirmYes" style="padding:10px 28px;border:none;background:#dc3545;' +
                'color:#fff;border-radius:6px;cursor:pointer;font-size:14px;">Confirm</button>' +
                '</div></div>';

            showModal(html);

            setTimeout(function () {
                var yesBtn = document.getElementById('confirmYes');
                var noBtn = document.getElementById('confirmNo');
                if (yesBtn) {
                    yesBtn.addEventListener('click', function () { closeModal(); resolve(true); });
                }
                if (noBtn) {
                    noBtn.addEventListener('click', function () { closeModal(); resolve(false); });
                }
            }, 50);
        });
    }

    /**
     * Export an array of objects as a CSV download.
     * @param {Array<Object>} data
     * @param {string} filename
     */
    function exportToCSV(data, filename) {
        if (!data || data.length === 0) {
            showToast('No data to export.', 'warning');
            return;
        }
        try {
            var headers = Object.keys(data[0]);
            var csvRows = [headers.join(',')];

            data.forEach(function (row) {
                var values = headers.map(function (h) {
                    var val = row[h] !== undefined && row[h] !== null ? String(row[h]) : '';
                    val = val.replace(/"/g, '""');
                    if (val.indexOf(',') !== -1 || val.indexOf('"') !== -1 || val.indexOf('\n') !== -1) {
                        val = '"' + val + '"';
                    }
                    return val;
                });
                csvRows.push(values.join(','));
            });

            var csvContent = csvRows.join('\n');
            var blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = (filename || 'export') + '.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showToast('CSV exported successfully.', 'success');
        } catch (err) {
            console.error('CSV export error:', err);
            showToast('Failed to export CSV.', 'error');
        }
    }

    /**
     * Escape HTML special characters to prevent XSS.
     * @param {string} str
     * @returns {string}
     */
    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(String(str)));
        return div.innerHTML;
    }

    // =========================================================================
    // SIDEBAR & NAVIGATION
    // =========================================================================

    /**
     * Toggle the sidebar between collapsed and expanded states.
     */
    function toggleSidebar() {
        var sidebar = document.querySelector('.admin-sidebar');
        var main = document.querySelector('.admin-main');
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            if (main) main.classList.toggle('sidebar-collapsed');
        }
    }

    /**
     * Highlight the active page link in the sidebar navigation.
     */
    function setActivePage() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        var navLinks = document.querySelectorAll('.sidebar-nav a, .admin-nav a');
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href && (href === currentPage || href.indexOf(currentPage) !== -1)) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Navigate to a given page.
     * @param {string} page - The page filename to navigate to.
     */
    function navigateTo(page) {
        if (!page) return;
        window.location.href = page;
    }

    // =========================================================================
    // AUTHENTICATION
    // =========================================================================

    /**
     * Handle admin login form submission.
     * @param {Event} e
     */
    function adminLogin(e) {
        if (e) e.preventDefault();

        var usernameEl = document.getElementById('adminUsername') || document.getElementById('username');
        var passwordEl = document.getElementById('adminPassword') || document.getElementById('password');

        if (!usernameEl || !passwordEl) {
            showToast('Login form elements not found.', 'error');
            return;
        }

        var username = usernameEl.value.trim();
        var password = passwordEl.value.trim();

        if (!username || !password) {
            showToast('Please enter both username and password.', 'warning');
            return;
        }

        // Ensure admin accounts exist
        seedDefaultAdminAccounts();

        var accounts = storageGet(STORAGE_KEYS.ADMIN_ACCOUNTS, []);
        var account = null;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].username === username && accounts[i].password === password) {
                account = accounts[i];
                break;
            }
        }

        if (account) {
            if (account.status === 'blocked') {
                showToast('Your account has been disabled. Contact Super Admin.', 'error');
                return;
            }
            var session = {
                username: account.username,
                name: account.name,
                role: account.role,
                templeId: account.templeId || null,
                templeName: account.templeName || '',
                loginTime: new Date().toISOString(),
                token: generateId()
            };
            storageSet(STORAGE_KEYS.SESSION, session);
            showToast('Login successful! Redirecting...', 'success');
            setTimeout(function () {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showToast('Invalid username or password.', 'error');
            if (passwordEl) passwordEl.value = '';
        }
    }

    /**
     * Log the admin out, clear session, and redirect to the login page.
     */
    function adminLogout() {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
        showToast('Logged out successfully.', 'success');
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 500);
    }

    /**
     * Check whether the admin is authenticated. Redirect to login if not.
     * Skips the check on the login page itself.
     */
    /**
     * Get the current admin session.
     * @returns {Object|null}
     */
    function getSession() {
        return storageGet(STORAGE_KEYS.SESSION, null);
    }

    /**
     * Check if current session is super admin.
     * @returns {boolean}
     */
    function isSuperAdmin() {
        var session = getSession();
        return session && session.role === ROLE_SUPER;
    }

    /**
     * Get the temple ID assigned to the current admin (null for super admin).
     * @returns {string|null}
     */
    function getSessionTempleId() {
        var session = getSession();
        return session ? (session.templeId || null) : null;
    }

    function checkAuth() {
        var currentPage = window.location.pathname.split('/').pop() || '';
        if (currentPage === 'index.html' || currentPage === '') return;

        var session = getSession();
        if (!session || !session.token) {
            window.location.href = 'index.html';
            return;
        }

        // Block temple admins from super-admin-only pages
        var pageName = currentPage.replace('.html', '').toLowerCase();
        if (!isSuperAdmin() && SUPER_ONLY_PAGES.indexOf(pageName) !== -1) {
            window.location.href = 'dashboard.html';
            return;
        }
    }

    /**
     * Apply role-based restrictions to the sidebar and UI.
     * Hides nav items that temple admins should not access.
     * Updates the sidebar profile name and role display.
     */
    function applyRoleRestrictions() {
        var session = getSession();
        if (!session) return;

        // Update sidebar profile name and role
        var nameEls = document.querySelectorAll('.admin-name');
        var roleEls = document.querySelectorAll('.admin-role');
        nameEls.forEach(function (el) { el.textContent = session.name || session.username; });
        roleEls.forEach(function (el) {
            el.textContent = session.role === ROLE_SUPER ? 'Super Admin' : 'Temple Admin';
        });

        // Update sidebar avatar initial
        var avatarEls = document.querySelectorAll('.admin-avatar-sm');
        avatarEls.forEach(function (el) {
            var name = session.name || session.username || 'A';
            el.textContent = name.charAt(0).toUpperCase();
        });

        // Update header avatar
        var headerAvatars = document.querySelectorAll('.header-avatar span, .avatar-placeholder');
        headerAvatars.forEach(function (el) {
            if (el.children.length === 0) {
                var name = session.name || session.username || 'A';
                el.textContent = name.charAt(0).toUpperCase();
            }
        });

        // Update header admin name if present
        var adminNameEls = document.querySelectorAll('.admin-avatar-name');
        adminNameEls.forEach(function (el) { el.textContent = session.name || session.username; });
        var adminRoleEls = document.querySelectorAll('.admin-avatar-role');
        adminRoleEls.forEach(function (el) {
            el.textContent = session.role === ROLE_SUPER ? 'Super Admin' : 'Temple Admin';
        });

        // Hide restricted nav links for temple admins
        if (session.role !== ROLE_SUPER) {
            var navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
            navLinks.forEach(function (link) {
                var page = link.getAttribute('data-page');
                if (page && SUPER_ONLY_PAGES.indexOf(page) !== -1) {
                    link.style.display = 'none';
                }
            });
        }
    }

    // =========================================================================
    // SEED / DEFAULT DATA
    // =========================================================================

    function seedDefaultTemples() {
        var existing = storageGet(STORAGE_KEYS.TEMPLES, null);
        var imgVersion = localStorage.getItem('admin_temples_img_v');
        if (existing && existing.length > 0 && imgVersion === '3') return;
        localStorage.setItem('admin_temples_img_v', '3');

        var temples = [
            {
                id: generateId(), name: 'Meenakshi Amman Temple', deity: 'Goddess Meenakshi',
                location: 'Madurai, Tamil Nadu', timings: '5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM',
                description: 'Historic Hindu temple dedicated to Goddess Meenakshi, a form of Parvati, and her consort Sundareshwar, a form of Shiva.',
                rating: 4.8, image: 'images/meenakshi-amman-temple.jpg', status: 'active'
            },
            {
                id: generateId(), name: 'Brihadeeswarar Temple', deity: 'Lord Shiva',
                location: 'Thanjavur, Tamil Nadu', timings: '6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM',
                description: 'A UNESCO World Heritage Site built by Raja Raja Chola I in 1010 AD, dedicated to Lord Shiva.',
                rating: 4.9, image: 'images/brihadeeswarar-temple.jpg', status: 'active'
            },
            {
                id: generateId(), name: 'Ramanathaswamy Temple', deity: 'Lord Shiva',
                location: 'Rameswaram, Tamil Nadu', timings: '5:00 AM - 1:00 PM, 3:00 PM - 9:00 PM',
                description: 'One of the twelve Jyotirlinga temples, located on Rameswaram island. Features the longest corridor among Hindu temples in India.',
                rating: 4.7, image: 'images/ramanathaswamy-temple.jpg', status: 'active'
            },
            {
                id: generateId(), name: 'Tirumala Venkateswara Temple', deity: 'Lord Venkateswara',
                location: 'Tirupati, Andhra Pradesh', timings: '3:00 AM - 12:00 AM',
                description: 'The richest and most visited Hindu temple in the world, dedicated to Lord Venkateswara, a form of Vishnu.',
                rating: 4.9, image: 'images/tirumala-venkateswara-temple.jpg', status: 'active'
            },
            {
                id: generateId(), name: 'Somnath Temple', deity: 'Lord Shiva',
                location: 'Prabhas Patan, Gujarat', timings: '6:00 AM - 9:00 PM',
                description: 'The first among the twelve Jyotirlinga shrines of Lord Shiva, located at the shore of the Arabian Sea.',
                rating: 4.8, image: 'images/somnath-temple.jpg', status: 'active'
            },
            {
                id: generateId(), name: 'Jagannath Temple', deity: 'Lord Jagannath',
                location: 'Puri, Odisha', timings: '5:00 AM - 11:00 PM',
                description: 'One of the Char Dham pilgrimage sites, famous for the annual Rath Yatra festival.',
                rating: 4.7, image: 'images/jagannath-temple.jpg', status: 'active'
            },
            {
                id: generateId(), name: 'Kashi Vishwanath Temple', deity: 'Lord Shiva',
                location: 'Varanasi, Uttar Pradesh', timings: '3:00 AM - 11:00 PM',
                description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located on the banks of the Ganges.',
                rating: 4.8, image: 'images/kashi-vishwanath-temple.jpg', status: 'active'
            },
            {
                id: generateId(), name: 'Siddhivinayak Temple', deity: 'Lord Ganesha',
                location: 'Mumbai, Maharashtra', timings: '5:30 AM - 9:50 PM',
                description: 'One of the most revered temples of Lord Ganesha in Mumbai, originally built in 1801.',
                rating: 4.6, image: 'images/siddhivinayak-temple.jpg', status: 'active'
            },
            {
                id: generateId(), name: 'Sripuram Golden Temple', deity: 'Goddess Lakshmi',
                location: 'Vellore, Tamil Nadu', timings: '8:00 AM - 8:00 PM',
                description: 'The temple is covered in gold and is dedicated to Goddess Mahalakshmi, located at the foot of a small range of green hills.',
                rating: 4.5, image: 'images/sripuram-golden-temple.jpg', status: 'active'
            },
            {
                id: generateId(), name: 'Kapaleeshwarar Temple', deity: 'Lord Shiva',
                location: 'Chennai, Tamil Nadu', timings: '5:30 AM - 12:00 PM, 4:00 PM - 9:00 PM',
                description: 'A Dravidian-style temple dedicated to Lord Shiva in the Mylapore area of Chennai, built in the 7th century.',
                rating: 4.6, image: 'images/kapaleeshwarar-temple.jpg', status: 'active'
            }
        ];

        storageSet(STORAGE_KEYS.TEMPLES, temples);
    }

    function seedDefaultEvents() {
        var existing = storageGet(STORAGE_KEYS.EVENTS, null);
        if (existing && existing.length > 0) return;

        var events = [
            {
                id: generateId(), title: 'Maha Shivaratri', date: '2026-02-27',
                type: 'Festival', description: 'The great night of Lord Shiva. Special abhishekam and poojas throughout the night.',
                status: 'Completed', location: 'Main Temple Hall'
            },
            {
                id: generateId(), title: 'Panguni Uthiram', date: '2026-03-28',
                type: 'Festival', description: 'Celebrates the divine marriages of Shiva-Parvathi, Vishnu-Lakshmi, and Murugan-Devasena.',
                status: 'Upcoming', location: 'Main Temple Hall'
            },
            {
                id: generateId(), title: 'Ram Navami', date: '2026-04-04',
                type: 'Festival', description: 'Birth celebration of Lord Rama. Special archana and pravachanam.',
                status: 'Upcoming', location: 'Ram Shrine'
            },
            {
                id: generateId(), title: 'Akshaya Tritiya', date: '2026-04-30',
                type: 'Festival', description: 'An auspicious day for new beginnings and donations. Special Lakshmi pooja.',
                status: 'Upcoming', location: 'Lakshmi Shrine'
            },
            {
                id: generateId(), title: 'Tamil New Year - Puthandu', date: '2026-04-14',
                type: 'Cultural', description: 'Celebration of Tamil New Year with special poojas, cultural programs, and community feast.',
                status: 'Upcoming', location: 'Temple Campus'
            },
            {
                id: generateId(), title: 'Weekly Satsang', date: '2026-03-14',
                type: 'Spiritual', description: 'Weekly spiritual discourse and bhajan session every Saturday.',
                status: 'Recurring', location: 'Community Hall'
            },
            {
                id: generateId(), title: 'Annadhanam Drive', date: '2026-03-15',
                type: 'Charity', description: 'Mass feeding program serving free meals to devotees and the needy.',
                status: 'Upcoming', location: 'Dining Hall'
            },
            {
                id: generateId(), title: 'Vedic Chanting Workshop', date: '2026-03-20',
                type: 'Educational', description: 'Learn Vedic mantras and proper chanting techniques from experienced scholars.',
                status: 'Upcoming', location: 'Learning Center'
            }
        ];

        storageSet(STORAGE_KEYS.EVENTS, events);
    }

    function seedDefaultGallery() {
        var existing = storageGet(STORAGE_KEYS.GALLERY, null);
        var galleryVer = localStorage.getItem('admin_gallery_img_v');
        if (existing && existing.length > 0 && galleryVer === '1') return;
        localStorage.setItem('admin_gallery_img_v', '1');

        var gallery = [
            {
                id: generateId(), title: 'Colorful Temple Gopurams', type: 'photo',
                category: 'Architecture', description: 'Vibrant and colorful gopurams of the Ranganathaswamy Temple at Srirangam.',
                url: 'images/gallery-gopuram.jpg', date: '2026-01-15'
            },
            {
                id: generateId(), title: 'Navaratri Festival Celebrations', type: 'photo',
                category: 'Festivals', description: 'Grand Navaratri festival celebrations with devotees and decorations.',
                url: 'images/gallery-festival.jpg', date: '2026-02-27'
            },
            {
                id: generateId(), title: 'Annadhanam - Community Meal Service', type: 'photo',
                category: 'Community', description: 'Volunteers serving free meals to devotees as part of the Annadhanam program.',
                url: 'images/gallery-annadhanam.jpg', date: '2026-02-10'
            },
            {
                id: generateId(), title: 'Sacred Deepam - Oil Lamp Ceremony', type: 'photo',
                category: 'Rituals', description: 'Traditional oil lamp lit during the evening Deepa Aradhana at the main shrine.',
                url: 'images/gallery-deepam.jpg', date: '2026-03-01'
            },
            {
                id: generateId(), title: 'Bharatanatyam Dance Performance', type: 'photo',
                category: 'Cultural', description: 'Classical Bharatanatyam dance performed during the temple annual festival.',
                url: 'images/gallery-bharatanatyam.jpg', date: '2026-01-25'
            },
            {
                id: generateId(), title: 'Ganesha Temple Decoration', type: 'photo',
                category: 'Decoration', description: 'Elaborate flower and light decoration of the temple during a special celebration.',
                url: 'images/gallery-decoration.jpg', date: '2026-03-05'
            }
        ];

        storageSet(STORAGE_KEYS.GALLERY, gallery);
    }

    function seedDefaultAnnadhanam() {
        var existing = storageGet(STORAGE_KEYS.ANNADHANAM, null);
        if (existing && existing.breakfast !== undefined) return;

        var annadhanam = {
            breakfast: { count: 150, goal: 200, lastUpdated: new Date().toISOString() },
            lunch: { count: 350, goal: 500, lastUpdated: new Date().toISOString() },
            dinner: { count: 200, goal: 300, lastUpdated: new Date().toISOString() },
            totalServed: 18500,
            monthlyTarget: 30000,
            volunteers: 45,
            sponsors: 12
        };

        storageSet(STORAGE_KEYS.ANNADHANAM, annadhanam);
    }

    function seedDefaultPosts() {
        var existing = storageGet(STORAGE_KEYS.POSTS, null);
        if (existing && existing.length > 0) return;

        var posts = [
            {
                id: generateId(), title: 'Maha Shivaratri Celebrations Concluded',
                content: 'The Maha Shivaratri celebrations were a grand success with over 5,000 devotees participating in the night-long poojas and abhishekam.',
                type: 'Event', date: '2026-02-28', author: 'Admin', status: 'Published'
            },
            {
                id: generateId(), title: 'New Annadhanam Schedule',
                content: 'Starting from March, the temple will serve free meals three times a day: Breakfast (7-9 AM), Lunch (12-2 PM), and Dinner (7-9 PM).',
                type: 'Update', date: '2026-03-01', author: 'Admin', status: 'Published'
            },
            {
                id: generateId(), title: 'Temple Renovation Notice',
                content: 'The eastern corridor of the temple will be closed for renovation from March 15 to April 15. Devotees are requested to use the western entrance.',
                type: 'Alert', date: '2026-03-05', author: 'Admin', status: 'Published'
            },
            {
                id: generateId(), title: 'Panguni Uthiram - Save the Date',
                content: 'Join us for the grand celebration of Panguni Uthiram on March 28. Special poojas, cultural programs, and community feast planned.',
                type: 'Event', date: '2026-03-08', author: 'Admin', status: 'Published'
            },
            {
                id: generateId(), title: 'Temple Festival Photo Gallery',
                content: 'Check out the beautiful photos from our recent temple festival. The gallery has been updated with 50 new high-resolution images.',
                type: 'Photo', date: '2026-03-10', author: 'Admin', status: 'Draft'
            }
        ];

        storageSet(STORAGE_KEYS.POSTS, posts);
    }

    function seedDefaultUsers() {
        var existing = storageGet(STORAGE_KEYS.USERS, null);
        if (existing && existing.length > 0) return;

        var users = [
            {
                id: generateId(), name: 'Rajesh Kumar', email: 'rajesh@email.com',
                phone: '9876543210', joinDate: '2025-11-15', status: 'active',
                bookings: 5, donations: 3
            },
            {
                id: generateId(), name: 'Priya Sharma', email: 'priya@email.com',
                phone: '9876543211', joinDate: '2025-12-01', status: 'active',
                bookings: 3, donations: 2
            },
            {
                id: generateId(), name: 'Suresh Iyer', email: 'suresh@email.com',
                phone: '9876543212', joinDate: '2025-12-20', status: 'active',
                bookings: 8, donations: 5
            },
            {
                id: generateId(), name: 'Lakshmi Narayanan', email: 'lakshmi@email.com',
                phone: '9876543213', joinDate: '2026-01-05', status: 'active',
                bookings: 2, donations: 1
            },
            {
                id: generateId(), name: 'Anand Krishnan', email: 'anand@email.com',
                phone: '9876543214', joinDate: '2026-01-18', status: 'blocked',
                bookings: 0, donations: 0
            },
            {
                id: generateId(), name: 'Deepa Venkatesh', email: 'deepa@email.com',
                phone: '9876543215', joinDate: '2026-02-02', status: 'active',
                bookings: 4, donations: 6
            },
            {
                id: generateId(), name: 'Karthik Raman', email: 'karthik@email.com',
                phone: '9876543216', joinDate: '2026-02-14', status: 'active',
                bookings: 1, donations: 2
            },
            {
                id: generateId(), name: 'Meena Sundaram', email: 'meena@email.com',
                phone: '9876543217', joinDate: '2026-03-01', status: 'active',
                bookings: 6, donations: 4
            }
        ];

        storageSet(STORAGE_KEYS.USERS, users);
    }

    /**
     * Run all seed functions to populate initial data on first run.
     */
    /**
     * Seed default admin accounts (super admin).
     */
    function seedDefaultAdminAccounts() {
        var existing = storageGet(STORAGE_KEYS.ADMIN_ACCOUNTS, null);
        if (existing && existing.length > 0) return;

        var accounts = [
            {
                id: generateId(),
                username: 'admin',
                password: 'admin123',
                name: 'Super Admin',
                role: ROLE_SUPER,
                templeId: null,
                templeName: '',
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
        storageSet(STORAGE_KEYS.ADMIN_ACCOUNTS, accounts);
    }

    function seedAllDefaults() {
        seedDefaultAdminAccounts();
        seedDefaultTemples();
        seedDefaultEvents();
        seedDefaultGallery();
        seedDefaultAnnadhanam();
        seedDefaultPosts();
        seedDefaultUsers();
    }

    // =========================================================================
    // DASHBOARD STATS
    // =========================================================================

    /**
     * Load and display dashboard statistics from localStorage.
     */
    /**
     * Filter data array by the current admin's assigned temple.
     * Super admins see all data; temple admins see only their temple's data.
     * @param {Array} data
     * @returns {Array}
     */
    function filterByTemple(data) {
        if (!Array.isArray(data)) return [];
        var templeId = getSessionTempleId();
        if (!templeId) return data; // Super admin sees all

        return data.filter(function (item) {
            return item.templeId === templeId || item.temple_id === templeId;
        });
    }

    function loadDashboardStats() {
        var bookings = filterByTemple(storageGet(STORAGE_KEYS.BOOKINGS, []));
        var donations = filterByTemple(storageGet(STORAGE_KEYS.DONATIONS, []));
        var temples = storageGet(STORAGE_KEYS.TEMPLES, []);
        var users = storageGet(STORAGE_KEYS.USERS, []);

        var totalBookings = Array.isArray(bookings) ? bookings.length : 0;

        var totalDonations = 0;
        if (Array.isArray(donations)) {
            donations.forEach(function (d) {
                totalDonations += parseFloat(d.amount) || 0;
            });
        }

        var activeTemples = Array.isArray(temples) ? temples.filter(function (t) {
            return t.status !== 'inactive';
        }).length : 0;

        var totalUsers = Array.isArray(users) ? users.length : 0;

        setElementText('totalBookings', totalBookings);
        setElementText('totalDonations', formatCurrency(totalDonations));
        setElementText('activeTemples', activeTemples);
        setElementText('totalUsers', totalUsers);

        // For temple admin, show assigned temple name
        if (!isSuperAdmin()) {
            var session = getSession();
            var templeLabel = document.querySelector('#stat-temples .stat-label');
            if (templeLabel && session && session.templeName) {
                templeLabel.textContent = session.templeName;
            }
        }

        renderRecentBookings();
        renderRecentDonations();
    }

    /**
     * Render the last 5 bookings in the recent bookings table.
     */
    function renderRecentBookings() {
        var container = document.getElementById('recentBookings');
        if (!container) return;

        var bookings = filterByTemple(storageGet(STORAGE_KEYS.BOOKINGS, []));
        if (!Array.isArray(bookings) || bookings.length === 0) {
            container.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:20px;color:#999;">No bookings yet.</td></tr>';
            return;
        }

        var recent = bookings.slice(-5).reverse();
        var html = '';
        recent.forEach(function (b) {
            var statusClass = (b.status || 'Pending').toLowerCase();
            html +=
                '<tr>' +
                '<td>' + escapeHtml(b.id || '-') + '</td>' +
                '<td>' + escapeHtml(b.userName || b.name || '-') + '</td>' +
                '<td>' + escapeHtml(b.service || b.pooja || '-') + '</td>' +
                '<td>' + formatDate(b.date || b.bookingDate) + '</td>' +
                '<td><span class="status-badge status-' + statusClass + '">' + escapeHtml(b.status || 'Pending') + '</span></td>' +
                '</tr>';
        });
        container.innerHTML = html;
    }

    /**
     * Render the last 5 donations in the recent donations table.
     */
    function renderRecentDonations() {
        var container = document.getElementById('recentDonations');
        if (!container) return;

        var donations = filterByTemple(storageGet(STORAGE_KEYS.DONATIONS, []));
        if (!Array.isArray(donations) || donations.length === 0) {
            container.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:20px;color:#999;">No donations yet.</td></tr>';
            return;
        }

        var recent = donations.slice(-5).reverse();
        var html = '';
        recent.forEach(function (d) {
            html +=
                '<tr>' +
                '<td>' + escapeHtml(d.donorName || d.name || '-') + '</td>' +
                '<td>' + formatCurrency(d.amount) + '</td>' +
                '<td>' + escapeHtml(d.type || d.donationType || '-') + '</td>' +
                '<td>' + formatDate(d.date || d.donationDate) + '</td>' +
                '</tr>';
        });
        container.innerHTML = html;
    }

    // =========================================================================
    // BOOKING MANAGEMENT
    // =========================================================================

    /**
     * Load all bookings from localStorage and render them in the bookings table.
     */
    function loadBookings() {
        var container = document.getElementById('bookingsTableBody') || document.getElementById('bookingsTable');
        if (!container) return;

        var bookings = filterByTemple(storageGet(STORAGE_KEYS.BOOKINGS, []));
        renderBookingsTable(bookings, container);
    }

    function renderBookingsTable(bookings, container) {
        if (!container) return;

        if (!Array.isArray(bookings) || bookings.length === 0) {
            container.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:30px;color:#999;">No bookings found.</td></tr>';
            return;
        }

        var html = '';
        bookings.forEach(function (b) {
            var statusClass = (b.status || 'Pending').toLowerCase();
            html +=
                '<tr>' +
                '<td>' + escapeHtml(b.id || '-') + '</td>' +
                '<td>' + escapeHtml(b.templeName || b.temple || '-') + '</td>' +
                '<td>' + escapeHtml(b.userName || b.name || '-') + '</td>' +
                '<td>' + escapeHtml(b.service || b.pooja || '-') + '</td>' +
                '<td>' + formatDate(b.date || b.bookingDate) + '</td>' +
                '<td>' + formatCurrency(b.amount || 0) + '</td>' +
                '<td><span class="status-badge status-' + statusClass + '">' + escapeHtml(b.status || 'Pending') + '</span></td>' +
                '<td class="action-buttons">' +
                '<button class="btn btn-sm btn-info" onclick="window.adminApp.viewBookingDetails(\'' + b.id + '\')" title="View">View</button> ' +
                '<button class="btn btn-sm btn-success" onclick="window.adminApp.updateBookingStatus(\'' + b.id + '\', \'Confirmed\')" title="Confirm">Confirm</button> ' +
                '<button class="btn btn-sm btn-danger" onclick="window.adminApp.deleteBooking(\'' + b.id + '\')" title="Delete">Delete</button>' +
                '</td></tr>';
        });
        container.innerHTML = html;
    }

    /**
     * Filter bookings by status.
     * @param {string} status - 'All', 'Confirmed', 'Pending', or 'Cancelled'.
     */
    function filterBookings(status) {
        var container = document.getElementById('bookingsTableBody') || document.getElementById('bookingsTable');
        if (!container) return;

        var bookings = filterByTemple(storageGet(STORAGE_KEYS.BOOKINGS, []));
        if (!Array.isArray(bookings)) bookings = [];

        if (status && status !== 'All') {
            bookings = bookings.filter(function (b) {
                return (b.status || '').toLowerCase() === status.toLowerCase();
            });
        }

        renderBookingsTable(bookings, container);
    }

    /**
     * Search bookings by name or booking ID.
     * @param {string} query
     */
    function searchBookings(query) {
        var container = document.getElementById('bookingsTableBody') || document.getElementById('bookingsTable');
        if (!container) return;

        var bookings = filterByTemple(storageGet(STORAGE_KEYS.BOOKINGS, []));
        if (!Array.isArray(bookings)) bookings = [];

        if (query && query.trim()) {
            var q = query.trim().toLowerCase();
            bookings = bookings.filter(function (b) {
                return (
                    (b.id && b.id.toLowerCase().indexOf(q) !== -1) ||
                    (b.userName && b.userName.toLowerCase().indexOf(q) !== -1) ||
                    (b.name && b.name.toLowerCase().indexOf(q) !== -1) ||
                    (b.service && b.service.toLowerCase().indexOf(q) !== -1) ||
                    (b.pooja && b.pooja.toLowerCase().indexOf(q) !== -1)
                );
            });
        }

        renderBookingsTable(bookings, container);
    }

    /**
     * Update the status of a booking.
     * @param {string} id
     * @param {string} status
     */
    function updateBookingStatus(id, status) {
        var bookings = storageGet(STORAGE_KEYS.BOOKINGS, []);
        if (!Array.isArray(bookings)) { showToast('No bookings found.', 'error'); return; }

        var found = false;
        bookings = bookings.map(function (b) {
            if (b.id === id) {
                found = true;
                b.status = status;
            }
            return b;
        });

        if (!found) {
            showToast('Booking not found.', 'error');
            return;
        }

        storageSet(STORAGE_KEYS.BOOKINGS, bookings);
        showToast('Booking status updated to ' + status + '.', 'success');
        loadBookings();
    }

    /**
     * Display a modal with full details of a booking.
     * @param {string} id
     */
    function viewBookingDetails(id) {
        var bookings = storageGet(STORAGE_KEYS.BOOKINGS, []);
        if (!Array.isArray(bookings)) { showToast('No bookings found.', 'error'); return; }

        var booking = bookings.find(function (b) { return b.id === id; });
        if (!booking) {
            showToast('Booking not found.', 'error');
            return;
        }

        var html =
            '<h2 style="margin:0 0 20px;color:#333;">Booking Details</h2>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
            '<div><strong>Booking ID:</strong><br>' + escapeHtml(booking.id) + '</div>' +
            '<div><strong>Name:</strong><br>' + escapeHtml(booking.userName || booking.name || '-') + '</div>' +
            '<div><strong>Service:</strong><br>' + escapeHtml(booking.service || booking.pooja || '-') + '</div>' +
            '<div><strong>Date:</strong><br>' + formatDate(booking.date || booking.bookingDate) + '</div>' +
            '<div><strong>Amount:</strong><br>' + formatCurrency(booking.amount || 0) + '</div>' +
            '<div><strong>Status:</strong><br><span class="status-badge status-' + (booking.status || 'pending').toLowerCase() + '">' + escapeHtml(booking.status || 'Pending') + '</span></div>' +
            '<div style="grid-column:1/-1;"><strong>Contact:</strong><br>' + escapeHtml(booking.phone || booking.email || '-') + '</div>' +
            '<div style="grid-column:1/-1;"><strong>Temple:</strong><br>' + escapeHtml(booking.temple || '-') + '</div>' +
            '</div>' +
            '<div style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end;">' +
            '<button class="btn btn-success" onclick="window.adminApp.updateBookingStatus(\'' + booking.id + '\',\'Confirmed\');window.adminApp.closeModal();">Confirm</button>' +
            '<button class="btn btn-warning" onclick="window.adminApp.updateBookingStatus(\'' + booking.id + '\',\'Pending\');window.adminApp.closeModal();">Set Pending</button>' +
            '<button class="btn btn-danger" onclick="window.adminApp.updateBookingStatus(\'' + booking.id + '\',\'Cancelled\');window.adminApp.closeModal();">Cancel</button>' +
            '</div>';

        showModal(html);
    }

    /**
     * Delete a booking with confirmation.
     * @param {string} id
     */
    function deleteBooking(id) {
        confirmAction('Are you sure you want to delete this booking? This action cannot be undone.').then(function (confirmed) {
            if (!confirmed) return;

            var bookings = storageGet(STORAGE_KEYS.BOOKINGS, []);
            if (!Array.isArray(bookings)) return;

            var filtered = bookings.filter(function (b) { return b.id !== id; });
            if (filtered.length === bookings.length) {
                showToast('Booking not found.', 'error');
                return;
            }

            storageSet(STORAGE_KEYS.BOOKINGS, filtered);
            showToast('Booking deleted successfully.', 'success');
            loadBookings();
        });
    }

    /**
     * Export all bookings as a CSV download.
     */
    function exportBookings() {
        var bookings = storageGet(STORAGE_KEYS.BOOKINGS, []);
        if (!Array.isArray(bookings) || bookings.length === 0) {
            showToast('No bookings to export.', 'warning');
            return;
        }

        var exportData = bookings.map(function (b) {
            return {
                'Booking ID': b.id || '',
                'Name': b.userName || b.name || '',
                'Service': b.service || b.pooja || '',
                'Date': b.date || b.bookingDate || '',
                'Amount': b.amount || 0,
                'Status': b.status || 'Pending',
                'Phone': b.phone || '',
                'Temple': b.temple || ''
            };
        });

        exportToCSV(exportData, 'temple_bookings_' + new Date().toISOString().split('T')[0]);
    }

    // =========================================================================
    // DONATION MANAGEMENT
    // =========================================================================

    /**
     * Load all donations and render them in the donations table.
     */
    function loadDonations() {
        var container = document.getElementById('donationsTableBody') || document.getElementById('donationsTable');
        if (!container) return;

        var donations = filterByTemple(storageGet(STORAGE_KEYS.DONATIONS, []));
        renderDonationsTable(donations, container);

        var stats = getDonationStats();
        setElementText('donationTotal', formatCurrency(stats.total));
        setElementText('donationCount', stats.count);
        setElementText('donationAverage', formatCurrency(stats.average));
    }

    function renderDonationsTable(donations, container) {
        if (!container) return;

        if (!Array.isArray(donations) || donations.length === 0) {
            container.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:30px;color:#999;">No donations found.</td></tr>';
            return;
        }

        var html = '';
        donations.forEach(function (d) {
            html +=
                '<tr>' +
                '<td>' + escapeHtml(d.donorName || d.name || '-') + '</td>' +
                '<td>' + formatCurrency(d.amount) + '</td>' +
                '<td>' + escapeHtml(d.type || d.donationType || '-') + '</td>' +
                '<td>' + formatDate(d.date || d.donationDate) + '</td>' +
                '<td>' + escapeHtml(d.paymentMethod || d.method || '-') + '</td>' +
                '</tr>';
        });
        container.innerHTML = html;
    }

    /**
     * Filter donations by type.
     * @param {string} type
     */
    function filterDonations(type) {
        var container = document.getElementById('donationsTableBody') || document.getElementById('donationsTable');
        if (!container) return;

        var donations = filterByTemple(storageGet(STORAGE_KEYS.DONATIONS, []));
        if (!Array.isArray(donations)) donations = [];

        if (type && type !== 'All') {
            donations = donations.filter(function (d) {
                return (d.type || d.donationType || '').toLowerCase() === type.toLowerCase();
            });
        }

        renderDonationsTable(donations, container);
    }

    /**
     * Calculate donation statistics.
     * @returns {{total: number, count: number, average: number, byType: Object}}
     */
    function getDonationStats() {
        var donations = storageGet(STORAGE_KEYS.DONATIONS, []);
        if (!Array.isArray(donations)) donations = [];

        var total = 0;
        var byType = {};

        donations.forEach(function (d) {
            var amt = parseFloat(d.amount) || 0;
            total += amt;
            var t = d.type || d.donationType || 'Other';
            if (!byType[t]) byType[t] = { count: 0, amount: 0 };
            byType[t].count += 1;
            byType[t].amount += amt;
        });

        return {
            total: total,
            count: donations.length,
            average: donations.length > 0 ? total / donations.length : 0,
            byType: byType
        };
    }

    // =========================================================================
    // TEMPLE MANAGEMENT
    // =========================================================================

    /**
     * Load and display all temples.
     */
    function loadTemples() {
        var container = document.getElementById('templesContainer') || document.getElementById('templesTableBody');
        if (!container) return;

        var temples = storageGet(STORAGE_KEYS.TEMPLES, []);
        if (!Array.isArray(temples) || temples.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:40px;color:#999;">No temples found. Click "Add Temple" to get started.</div>';
            return;
        }

        // Determine if rendering into a table body or a card container
        var isTable = container.tagName === 'TBODY';

        if (isTable) {
            var html = '';
            temples.forEach(function (t) {
                html +=
                    '<tr>' +
                    '<td>' + escapeHtml(t.name) + '</td>' +
                    '<td>' + escapeHtml(t.deity || '-') + '</td>' +
                    '<td>' + escapeHtml(t.location || '-') + '</td>' +
                    '<td>' + escapeHtml(t.timings || '-') + '</td>' +
                    '<td>' + (t.rating || '-') + '</td>' +
                    '<td><span class="status-badge status-' + (t.status || 'active') + '">' + escapeHtml(t.status || 'active') + '</span></td>' +
                    '<td class="action-buttons">' +
                    '<button class="btn btn-sm btn-primary" onclick="window.adminApp.showEditTempleForm(\'' + t.id + '\')">Edit</button> ' +
                    '<button class="btn btn-sm btn-danger" onclick="window.adminApp.deleteTemple(\'' + t.id + '\')">Delete</button>' +
                    '</td></tr>';
            });
            container.innerHTML = html;
        } else {
            var cardsHtml = '';
            temples.forEach(function (t) {
                var hasImg = t.image && t.image.indexOf('/') !== -1;
                var imgContent = hasImg
                    ? '<img src="' + escapeHtml(t.image) + '" alt="' + escapeHtml(t.name) + '" style="width:100%;height:100%;object-fit:cover;">'
                    : '<span style="font-size:48px;"><i class="fas fa-place-of-worship" style="font-size:3rem;color:#bf6c2c;"></i></span>';
                cardsHtml +=
                    '<div class="temple-card" data-id="' + t.id + '">' +
                    '<div class="temple-card-image" style="' + (hasImg ? 'overflow:hidden;padding:0;' : 'background:#f0e6d3;display:flex;align-items:center;justify-content:center;') + 'height:150px;">' +
                    imgContent + '</div>' +
                    '<div class="temple-card-body">' +
                    '<h3>' + escapeHtml(t.name) + '</h3>' +
                    '<p><strong>Deity:</strong> ' + escapeHtml(t.deity || '-') + '</p>' +
                    '<p><strong>Location:</strong> ' + escapeHtml(t.location || '-') + '</p>' +
                    '<p><strong>Timings:</strong> ' + escapeHtml(t.timings || '-') + '</p>' +
                    '<p><strong>Rating:</strong> ' + (t.rating || '-') + ' / 5</p>' +
                    '<div class="temple-card-actions">' +
                    '<button class="btn btn-sm btn-primary" onclick="window.adminApp.showEditTempleForm(\'' + t.id + '\')">Edit</button>' +
                    '<button class="btn btn-sm btn-danger" onclick="window.adminApp.deleteTemple(\'' + t.id + '\')">Delete</button>' +
                    '</div></div></div>';
            });
            container.innerHTML = cardsHtml;
        }
    }

    /**
     * Show a modal form for adding a new temple.
     */
    function showAddTempleForm() {
        var html =
            '<h2 style="margin:0 0 20px;">Add New Temple</h2>' +
            '<form id="addTempleForm" onsubmit="window.adminApp.handleAddTemple(event)">' +
            '<div class="form-group"><label>Temple Name *</label><input type="text" id="templeName" required class="form-control"></div>' +
            '<div class="form-group"><label>Deity *</label><input type="text" id="templeDeity" required class="form-control"></div>' +
            '<div class="form-group"><label>Location *</label><input type="text" id="templeLocation" required class="form-control"></div>' +
            '<div class="form-group"><label>Timings</label><input type="text" id="templeTimings" class="form-control" placeholder="e.g., 6:00 AM - 9:00 PM"></div>' +
            '<div class="form-group"><label>Description</label><textarea id="templeDescription" class="form-control" rows="3"></textarea></div>' +
            '<div class="form-group"><label>Rating (1-5)</label><input type="number" id="templeRating" min="1" max="5" step="0.1" class="form-control" value="4.5"></div>' +
            '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">' +
            '<button type="button" class="btn btn-secondary" onclick="window.adminApp.closeModal()">Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Add Temple</button>' +
            '</div></form>';
        showModal(html);
    }

    function handleAddTemple(e) {
        if (e) e.preventDefault();
        var data = {
            name: document.getElementById('templeName').value.trim(),
            deity: document.getElementById('templeDeity').value.trim(),
            location: document.getElementById('templeLocation').value.trim(),
            timings: document.getElementById('templeTimings').value.trim(),
            description: document.getElementById('templeDescription').value.trim(),
            rating: parseFloat(document.getElementById('templeRating').value) || 4.5
        };
        addTemple(data);
    }

    /**
     * Add a new temple.
     * @param {Object} data
     */
    function addTemple(data) {
        if (!data.name || !data.deity || !data.location) {
            showToast('Temple name, deity, and location are required.', 'warning');
            return;
        }

        var temples = storageGet(STORAGE_KEYS.TEMPLES, []);
        if (!Array.isArray(temples)) temples = [];

        var temple = {
            id: generateId(),
            name: data.name,
            deity: data.deity,
            location: data.location,
            timings: data.timings || '',
            description: data.description || '',
            rating: data.rating || 4.5,
            image: data.image || '',
            status: 'active',
            createdAt: new Date().toISOString()
        };

        temples.push(temple);
        storageSet(STORAGE_KEYS.TEMPLES, temples);
        showToast('Temple added successfully.', 'success');
        closeModal();
        loadTemples();
    }

    /**
     * Show the edit form for an existing temple.
     * @param {string} id
     */
    function showEditTempleForm(id) {
        var temples = storageGet(STORAGE_KEYS.TEMPLES, []);
        var temple = Array.isArray(temples) ? temples.find(function (t) { return t.id === id; }) : null;

        if (!temple) {
            showToast('Temple not found.', 'error');
            return;
        }

        var html =
            '<h2 style="margin:0 0 20px;">Edit Temple</h2>' +
            '<form id="editTempleForm" onsubmit="window.adminApp.handleEditTemple(event, \'' + id + '\')">' +
            '<div class="form-group"><label>Temple Name *</label><input type="text" id="templeName" required class="form-control" value="' + escapeHtml(temple.name) + '"></div>' +
            '<div class="form-group"><label>Deity *</label><input type="text" id="templeDeity" required class="form-control" value="' + escapeHtml(temple.deity || '') + '"></div>' +
            '<div class="form-group"><label>Location *</label><input type="text" id="templeLocation" required class="form-control" value="' + escapeHtml(temple.location || '') + '"></div>' +
            '<div class="form-group"><label>Timings</label><input type="text" id="templeTimings" class="form-control" value="' + escapeHtml(temple.timings || '') + '"></div>' +
            '<div class="form-group"><label>Description</label><textarea id="templeDescription" class="form-control" rows="3">' + escapeHtml(temple.description || '') + '</textarea></div>' +
            '<div class="form-group"><label>Rating (1-5)</label><input type="number" id="templeRating" min="1" max="5" step="0.1" class="form-control" value="' + (temple.rating || 4.5) + '"></div>' +
            '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">' +
            '<button type="button" class="btn btn-secondary" onclick="window.adminApp.closeModal()">Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Save Changes</button>' +
            '</div></form>';
        showModal(html);
    }

    function handleEditTemple(e, id) {
        if (e) e.preventDefault();
        var data = {
            name: document.getElementById('templeName').value.trim(),
            deity: document.getElementById('templeDeity').value.trim(),
            location: document.getElementById('templeLocation').value.trim(),
            timings: document.getElementById('templeTimings').value.trim(),
            description: document.getElementById('templeDescription').value.trim(),
            rating: parseFloat(document.getElementById('templeRating').value) || 4.5
        };
        editTemple(id, data);
    }

    /**
     * Edit an existing temple.
     * @param {string} id
     * @param {Object} data
     */
    function editTemple(id, data) {
        if (!data.name || !data.deity || !data.location) {
            showToast('Temple name, deity, and location are required.', 'warning');
            return;
        }

        var temples = storageGet(STORAGE_KEYS.TEMPLES, []);
        if (!Array.isArray(temples)) { showToast('No temples found.', 'error'); return; }

        var found = false;
        temples = temples.map(function (t) {
            if (t.id === id) {
                found = true;
                return Object.assign({}, t, data, { updatedAt: new Date().toISOString() });
            }
            return t;
        });

        if (!found) { showToast('Temple not found.', 'error'); return; }

        storageSet(STORAGE_KEYS.TEMPLES, temples);
        showToast('Temple updated successfully.', 'success');
        closeModal();
        loadTemples();
    }

    /**
     * Delete a temple with confirmation.
     * @param {string} id
     */
    function deleteTemple(id) {
        confirmAction('Are you sure you want to delete this temple?').then(function (confirmed) {
            if (!confirmed) return;

            var temples = storageGet(STORAGE_KEYS.TEMPLES, []);
            if (!Array.isArray(temples)) return;

            var filtered = temples.filter(function (t) { return t.id !== id; });
            if (filtered.length === temples.length) {
                showToast('Temple not found.', 'error');
                return;
            }

            storageSet(STORAGE_KEYS.TEMPLES, filtered);
            showToast('Temple deleted successfully.', 'success');
            loadTemples();
        });
    }

    // =========================================================================
    // EVENT MANAGEMENT
    // =========================================================================

    /**
     * Load and display all events.
     */
    function loadEvents() {
        var container = document.getElementById('eventsTableBody') || document.getElementById('eventsContainer');
        if (!container) return;

        var events = storageGet(STORAGE_KEYS.EVENTS, []);
        if (!Array.isArray(events) || events.length === 0) {
            container.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#999;">No events found.</td></tr>';
            return;
        }

        var isTable = container.tagName === 'TBODY';

        if (isTable) {
            var html = '';
            events.forEach(function (ev) {
                var statusClass = (ev.status || 'upcoming').toLowerCase();
                html +=
                    '<tr>' +
                    '<td>' + escapeHtml(ev.title) + '</td>' +
                    '<td>' + formatDate(ev.date) + '</td>' +
                    '<td>' + escapeHtml(ev.type || '-') + '</td>' +
                    '<td>' + escapeHtml(ev.location || '-') + '</td>' +
                    '<td><span class="status-badge status-' + statusClass + '">' + escapeHtml(ev.status || 'Upcoming') + '</span></td>' +
                    '<td class="action-buttons">' +
                    '<button class="btn btn-sm btn-primary" onclick="window.adminApp.showEditEventForm(\'' + ev.id + '\')">Edit</button> ' +
                    '<button class="btn btn-sm btn-danger" onclick="window.adminApp.deleteEvent(\'' + ev.id + '\')">Delete</button>' +
                    '</td></tr>';
            });
            container.innerHTML = html;
        } else {
            var cardsHtml = '';
            events.forEach(function (ev) {
                var statusClass = (ev.status || 'upcoming').toLowerCase();
                cardsHtml +=
                    '<div class="event-card">' +
                    '<div class="event-date">' + formatDate(ev.date) + '</div>' +
                    '<h3>' + escapeHtml(ev.title) + '</h3>' +
                    '<p>' + escapeHtml(ev.description || '') + '</p>' +
                    '<span class="status-badge status-' + statusClass + '">' + escapeHtml(ev.status || 'Upcoming') + '</span>' +
                    '<span class="event-type">' + escapeHtml(ev.type || '') + '</span>' +
                    '<div class="event-card-actions" style="margin-top:10px;">' +
                    '<button class="btn btn-sm btn-primary" onclick="window.adminApp.showEditEventForm(\'' + ev.id + '\')">Edit</button> ' +
                    '<button class="btn btn-sm btn-danger" onclick="window.adminApp.deleteEvent(\'' + ev.id + '\')">Delete</button>' +
                    '</div></div>';
            });
            container.innerHTML = cardsHtml;
        }
    }

    function showAddEventForm() {
        var html =
            '<h2 style="margin:0 0 20px;">Add New Event</h2>' +
            '<form id="addEventForm" onsubmit="window.adminApp.handleAddEvent(event)">' +
            '<div class="form-group"><label>Title *</label><input type="text" id="eventTitle" required class="form-control"></div>' +
            '<div class="form-group"><label>Date *</label><input type="date" id="eventDate" required class="form-control"></div>' +
            '<div class="form-group"><label>Type</label><select id="eventType" class="form-control">' +
            '<option value="Festival">Festival</option><option value="Cultural">Cultural</option>' +
            '<option value="Spiritual">Spiritual</option><option value="Charity">Charity</option>' +
            '<option value="Educational">Educational</option></select></div>' +
            '<div class="form-group"><label>Location</label><input type="text" id="eventLocation" class="form-control"></div>' +
            '<div class="form-group"><label>Description</label><textarea id="eventDescription" class="form-control" rows="3"></textarea></div>' +
            '<div class="form-group"><label>Status</label><select id="eventStatus" class="form-control">' +
            '<option value="Upcoming">Upcoming</option><option value="Recurring">Recurring</option>' +
            '<option value="Completed">Completed</option><option value="Cancelled">Cancelled</option></select></div>' +
            '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">' +
            '<button type="button" class="btn btn-secondary" onclick="window.adminApp.closeModal()">Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Add Event</button>' +
            '</div></form>';
        showModal(html);
    }

    function handleAddEvent(e) {
        if (e) e.preventDefault();
        addEvent({
            title: document.getElementById('eventTitle').value.trim(),
            date: document.getElementById('eventDate').value,
            type: document.getElementById('eventType').value,
            location: document.getElementById('eventLocation').value.trim(),
            description: document.getElementById('eventDescription').value.trim(),
            status: document.getElementById('eventStatus').value
        });
    }

    /**
     * Add a new event.
     * @param {Object} data
     */
    function addEvent(data) {
        if (!data.title || !data.date) {
            showToast('Event title and date are required.', 'warning');
            return;
        }

        var events = storageGet(STORAGE_KEYS.EVENTS, []);
        if (!Array.isArray(events)) events = [];

        events.push({
            id: generateId(),
            title: data.title,
            date: data.date,
            type: data.type || 'Festival',
            location: data.location || '',
            description: data.description || '',
            status: data.status || 'Upcoming',
            createdAt: new Date().toISOString()
        });

        storageSet(STORAGE_KEYS.EVENTS, events);
        showToast('Event added successfully.', 'success');
        closeModal();
        loadEvents();
    }

    function showEditEventForm(id) {
        var events = storageGet(STORAGE_KEYS.EVENTS, []);
        var ev = Array.isArray(events) ? events.find(function (e) { return e.id === id; }) : null;
        if (!ev) { showToast('Event not found.', 'error'); return; }

        var types = ['Festival', 'Cultural', 'Spiritual', 'Charity', 'Educational'];
        var statuses = ['Upcoming', 'Recurring', 'Completed', 'Cancelled'];

        var typeOptions = types.map(function (t) {
            return '<option value="' + t + '"' + (ev.type === t ? ' selected' : '') + '>' + t + '</option>';
        }).join('');

        var statusOptions = statuses.map(function (s) {
            return '<option value="' + s + '"' + (ev.status === s ? ' selected' : '') + '>' + s + '</option>';
        }).join('');

        var html =
            '<h2 style="margin:0 0 20px;">Edit Event</h2>' +
            '<form id="editEventForm" onsubmit="window.adminApp.handleEditEvent(event, \'' + id + '\')">' +
            '<div class="form-group"><label>Title *</label><input type="text" id="eventTitle" required class="form-control" value="' + escapeHtml(ev.title) + '"></div>' +
            '<div class="form-group"><label>Date *</label><input type="date" id="eventDate" required class="form-control" value="' + (ev.date || '') + '"></div>' +
            '<div class="form-group"><label>Type</label><select id="eventType" class="form-control">' + typeOptions + '</select></div>' +
            '<div class="form-group"><label>Location</label><input type="text" id="eventLocation" class="form-control" value="' + escapeHtml(ev.location || '') + '"></div>' +
            '<div class="form-group"><label>Description</label><textarea id="eventDescription" class="form-control" rows="3">' + escapeHtml(ev.description || '') + '</textarea></div>' +
            '<div class="form-group"><label>Status</label><select id="eventStatus" class="form-control">' + statusOptions + '</select></div>' +
            '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">' +
            '<button type="button" class="btn btn-secondary" onclick="window.adminApp.closeModal()">Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Save Changes</button>' +
            '</div></form>';
        showModal(html);
    }

    function handleEditEvent(e, id) {
        if (e) e.preventDefault();
        editEvent(id, {
            title: document.getElementById('eventTitle').value.trim(),
            date: document.getElementById('eventDate').value,
            type: document.getElementById('eventType').value,
            location: document.getElementById('eventLocation').value.trim(),
            description: document.getElementById('eventDescription').value.trim(),
            status: document.getElementById('eventStatus').value
        });
    }

    /**
     * Edit an existing event.
     * @param {string} id
     * @param {Object} data
     */
    function editEvent(id, data) {
        if (!data.title || !data.date) {
            showToast('Event title and date are required.', 'warning');
            return;
        }

        var events = storageGet(STORAGE_KEYS.EVENTS, []);
        if (!Array.isArray(events)) { showToast('No events found.', 'error'); return; }

        var found = false;
        events = events.map(function (ev) {
            if (ev.id === id) {
                found = true;
                return Object.assign({}, ev, data, { updatedAt: new Date().toISOString() });
            }
            return ev;
        });

        if (!found) { showToast('Event not found.', 'error'); return; }

        storageSet(STORAGE_KEYS.EVENTS, events);
        showToast('Event updated successfully.', 'success');
        closeModal();
        loadEvents();
    }

    /**
     * Delete an event with confirmation.
     * @param {string} id
     */
    function deleteEvent(id) {
        confirmAction('Are you sure you want to delete this event?').then(function (confirmed) {
            if (!confirmed) return;

            var events = storageGet(STORAGE_KEYS.EVENTS, []);
            if (!Array.isArray(events)) return;

            var filtered = events.filter(function (ev) { return ev.id !== id; });
            if (filtered.length === events.length) {
                showToast('Event not found.', 'error');
                return;
            }

            storageSet(STORAGE_KEYS.EVENTS, filtered);
            showToast('Event deleted successfully.', 'success');
            loadEvents();
        });
    }

    // =========================================================================
    // GALLERY MANAGEMENT
    // =========================================================================

    /**
     * Load and display all gallery items.
     */
    function loadGallery() {
        var container = document.getElementById('galleryContainer') || document.getElementById('galleryGrid');
        if (!container) return;

        var gallery = storageGet(STORAGE_KEYS.GALLERY, []);
        if (!Array.isArray(gallery) || gallery.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:40px;color:#999;grid-column:1/-1;">No gallery items found.</div>';
            return;
        }

        var html = '';
        gallery.forEach(function (item) {
            var hasImg = item.url && item.url.indexOf('gallery-') !== -1;
            var previewContent = hasImg
                ? '<img src="' + escapeHtml(item.url) + '" alt="' + escapeHtml(item.title) + '" style="width:100%;height:100%;object-fit:cover;display:block;">'
                : '<span style="font-size:48px;"><i class="fas ' + (item.type === 'video' ? 'fa-video' : 'fa-camera') + '" style="font-size:3rem;color:#bf6c2c;"></i></span>';
            html +=
                '<div class="gallery-item" data-id="' + item.id + '" data-category="' + escapeHtml(item.category || '') + '">' +
                '<div class="gallery-item-preview" style="background:#f0e6d3;height:180px;' + (hasImg ? 'overflow:hidden;' : 'display:flex;align-items:center;justify-content:center;') + 'border-radius:8px 8px 0 0;position:relative;">' +
                previewContent + '</div>' +
                '<div class="gallery-item-info" style="padding:12px;">' +
                '<h4 style="margin:0 0 5px;">' + escapeHtml(item.title) + '</h4>' +
                '<p style="margin:0 0 5px;color:#666;font-size:13px;">' + escapeHtml(item.description || '') + '</p>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                '<span class="badge">' + escapeHtml(item.category || item.type || '') + '</span>' +
                '<button class="btn btn-sm btn-danger" onclick="window.adminApp.deleteGalleryItem(\'' + item.id + '\')">Delete</button>' +
                '</div></div></div>';
        });
        container.innerHTML = html;
    }

    function showAddGalleryForm() {
        var html =
            '<h2 style="margin:0 0 20px;">Add Gallery Item</h2>' +
            '<form id="addGalleryForm" onsubmit="window.adminApp.handleAddGalleryItem(event)">' +
            '<div class="form-group"><label>Title *</label><input type="text" id="galleryTitle" required class="form-control"></div>' +
            '<div class="form-group"><label>Type</label><select id="galleryType" class="form-control">' +
            '<option value="photo">Photo</option><option value="video">Video</option></select></div>' +
            '<div class="form-group"><label>Category</label><input type="text" id="galleryCategory" class="form-control" placeholder="e.g., Architecture, Festivals"></div>' +
            '<div class="form-group"><label>Description</label><textarea id="galleryDescription" class="form-control" rows="3"></textarea></div>' +
            '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">' +
            '<button type="button" class="btn btn-secondary" onclick="window.adminApp.closeModal()">Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Add Item</button>' +
            '</div></form>';
        showModal(html);
    }

    function handleAddGalleryItem(e) {
        if (e) e.preventDefault();
        addGalleryItem({
            title: document.getElementById('galleryTitle').value.trim(),
            type: document.getElementById('galleryType').value,
            category: document.getElementById('galleryCategory').value.trim(),
            description: document.getElementById('galleryDescription').value.trim()
        });
    }

    /**
     * Add a new gallery item.
     * @param {Object} data
     */
    function addGalleryItem(data) {
        if (!data.title) {
            showToast('Gallery item title is required.', 'warning');
            return;
        }

        var gallery = storageGet(STORAGE_KEYS.GALLERY, []);
        if (!Array.isArray(gallery)) gallery = [];

        gallery.push({
            id: generateId(),
            title: data.title,
            type: data.type || 'photo',
            category: data.category || 'General',
            description: data.description || '',
            url: data.url || '',
            date: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        });

        storageSet(STORAGE_KEYS.GALLERY, gallery);
        showToast('Gallery item added successfully.', 'success');
        closeModal();
        loadGallery();
    }

    /**
     * Delete a gallery item with confirmation.
     * @param {string} id
     */
    function deleteGalleryItem(id) {
        confirmAction('Are you sure you want to delete this gallery item?').then(function (confirmed) {
            if (!confirmed) return;

            var gallery = storageGet(STORAGE_KEYS.GALLERY, []);
            if (!Array.isArray(gallery)) return;

            var filtered = gallery.filter(function (item) { return item.id !== id; });
            if (filtered.length === gallery.length) {
                showToast('Gallery item not found.', 'error');
                return;
            }

            storageSet(STORAGE_KEYS.GALLERY, filtered);
            showToast('Gallery item deleted successfully.', 'success');
            loadGallery();
        });
    }

    // =========================================================================
    // ANNADHANAM MANAGEMENT
    // =========================================================================

    /**
     * Load and display annadhanam statistics.
     */
    function loadAnnadhanam() {
        var data = storageGet(STORAGE_KEYS.ANNADHANAM, null);
        if (!data) {
            seedDefaultAnnadhanam();
            data = storageGet(STORAGE_KEYS.ANNADHANAM, {});
        }

        setElementText('breakfastCount', data.breakfast ? data.breakfast.count : 0);
        setElementText('breakfastGoal', data.breakfast ? data.breakfast.goal : 0);
        setElementText('lunchCount', data.lunch ? data.lunch.count : 0);
        setElementText('lunchGoal', data.lunch ? data.lunch.goal : 0);
        setElementText('dinnerCount', data.dinner ? data.dinner.count : 0);
        setElementText('dinnerGoal', data.dinner ? data.dinner.goal : 0);
        setElementText('totalServed', data.totalServed || 0);
        setElementText('monthlyTarget', data.monthlyTarget || 0);
        setElementText('volunteerCount', data.volunteers || 0);
        setElementText('sponsorCount', data.sponsors || 0);

        // Update progress bars if they exist
        updateProgressBar('breakfastProgress', data.breakfast);
        updateProgressBar('lunchProgress', data.lunch);
        updateProgressBar('dinnerProgress', data.dinner);
    }

    function updateProgressBar(elementId, mealData) {
        var bar = document.getElementById(elementId);
        if (!bar || !mealData) return;
        var percent = mealData.goal > 0 ? Math.min(100, Math.round((mealData.count / mealData.goal) * 100)) : 0;
        bar.style.width = percent + '%';
        bar.textContent = percent + '%';
    }

    /**
     * Update the meal count for a specific meal.
     * @param {string} meal - 'breakfast', 'lunch', or 'dinner'
     * @param {number} count
     */
    function updateMealCount(meal, count) {
        var validMeals = ['breakfast', 'lunch', 'dinner'];
        if (validMeals.indexOf(meal) === -1) {
            showToast('Invalid meal type.', 'error');
            return;
        }

        var num = parseInt(count, 10);
        if (isNaN(num) || num < 0) {
            showToast('Please enter a valid count.', 'warning');
            return;
        }

        var data = storageGet(STORAGE_KEYS.ANNADHANAM, {});
        if (!data[meal]) {
            data[meal] = { count: 0, goal: 200, lastUpdated: new Date().toISOString() };
        }

        data[meal].count = num;
        data[meal].lastUpdated = new Date().toISOString();

        storageSet(STORAGE_KEYS.ANNADHANAM, data);
        showToast(meal.charAt(0).toUpperCase() + meal.slice(1) + ' count updated to ' + num + '.', 'success');
        loadAnnadhanam();
    }

    /**
     * Get annadhanam statistics including daily goal progress.
     * @returns {Object}
     */
    function getAnnadhanamStats() {
        var data = storageGet(STORAGE_KEYS.ANNADHANAM, {});

        var breakfastPct = (data.breakfast && data.breakfast.goal > 0)
            ? Math.round((data.breakfast.count / data.breakfast.goal) * 100) : 0;
        var lunchPct = (data.lunch && data.lunch.goal > 0)
            ? Math.round((data.lunch.count / data.lunch.goal) * 100) : 0;
        var dinnerPct = (data.dinner && data.dinner.goal > 0)
            ? Math.round((data.dinner.count / data.dinner.goal) * 100) : 0;

        var todayTotal = (data.breakfast ? data.breakfast.count : 0) +
            (data.lunch ? data.lunch.count : 0) +
            (data.dinner ? data.dinner.count : 0);
        var todayGoal = (data.breakfast ? data.breakfast.goal : 0) +
            (data.lunch ? data.lunch.goal : 0) +
            (data.dinner ? data.dinner.goal : 0);

        return {
            breakfast: { count: data.breakfast ? data.breakfast.count : 0, goal: data.breakfast ? data.breakfast.goal : 0, progress: breakfastPct },
            lunch: { count: data.lunch ? data.lunch.count : 0, goal: data.lunch ? data.lunch.goal : 0, progress: lunchPct },
            dinner: { count: data.dinner ? data.dinner.count : 0, goal: data.dinner ? data.dinner.goal : 0, progress: dinnerPct },
            todayTotal: todayTotal,
            todayGoal: todayGoal,
            todayProgress: todayGoal > 0 ? Math.round((todayTotal / todayGoal) * 100) : 0,
            totalServed: data.totalServed || 0,
            volunteers: data.volunteers || 0,
            sponsors: data.sponsors || 0
        };
    }

    // =========================================================================
    // FEED / POST MANAGEMENT
    // =========================================================================

    /**
     * Load and display all posts.
     */
    function loadPosts() {
        var container = document.getElementById('postsTableBody') || document.getElementById('postsContainer');
        if (!container) return;

        var posts = storageGet(STORAGE_KEYS.POSTS, []);
        if (!Array.isArray(posts) || posts.length === 0) {
            container.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#999;">No posts found.</td></tr>';
            return;
        }

        var isTable = container.tagName === 'TBODY';

        if (isTable) {
            var html = '';
            posts.forEach(function (p) {
                var statusClass = (p.status || 'Draft').toLowerCase();
                html +=
                    '<tr>' +
                    '<td>' + escapeHtml(p.title) + '</td>' +
                    '<td>' + escapeHtml(p.type || '-') + '</td>' +
                    '<td>' + formatDate(p.date) + '</td>' +
                    '<td>' + escapeHtml(p.author || '-') + '</td>' +
                    '<td><span class="status-badge status-' + statusClass + '">' + escapeHtml(p.status || 'Draft') + '</span></td>' +
                    '<td class="action-buttons">' +
                    '<button class="btn btn-sm btn-primary" onclick="window.adminApp.showEditPostForm(\'' + p.id + '\')">Edit</button> ' +
                    '<button class="btn btn-sm btn-danger" onclick="window.adminApp.deletePost(\'' + p.id + '\')">Delete</button>' +
                    '</td></tr>';
            });
            container.innerHTML = html;
        } else {
            var cardsHtml = '';
            posts.forEach(function (p) {
                var statusClass = (p.status || 'Draft').toLowerCase();
                cardsHtml +=
                    '<div class="post-card">' +
                    '<div class="post-header" style="display:flex;justify-content:space-between;align-items:center;">' +
                    '<span class="post-type badge">' + escapeHtml(p.type || '') + '</span>' +
                    '<span class="status-badge status-' + statusClass + '">' + escapeHtml(p.status || 'Draft') + '</span>' +
                    '</div>' +
                    '<h3>' + escapeHtml(p.title) + '</h3>' +
                    '<p style="color:#666;">' + escapeHtml((p.content || '').substring(0, 150)) + (p.content && p.content.length > 150 ? '...' : '') + '</p>' +
                    '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">' +
                    '<small style="color:#999;">' + formatDate(p.date) + '</small>' +
                    '<div>' +
                    '<button class="btn btn-sm btn-primary" onclick="window.adminApp.showEditPostForm(\'' + p.id + '\')">Edit</button> ' +
                    '<button class="btn btn-sm btn-danger" onclick="window.adminApp.deletePost(\'' + p.id + '\')">Delete</button>' +
                    '</div></div></div>';
            });
            container.innerHTML = cardsHtml;
        }
    }

    function showAddPostForm() {
        var html =
            '<h2 style="margin:0 0 20px;">Add New Post</h2>' +
            '<form id="addPostForm" onsubmit="window.adminApp.handleAddPost(event)">' +
            '<div class="form-group"><label>Title *</label><input type="text" id="postTitle" required class="form-control"></div>' +
            '<div class="form-group"><label>Type</label><select id="postType" class="form-control">' +
            '<option value="Event">Event</option><option value="Update">Update</option>' +
            '<option value="Alert">Alert</option><option value="Photo">Photo</option></select></div>' +
            '<div class="form-group"><label>Content *</label><textarea id="postContent" required class="form-control" rows="5"></textarea></div>' +
            '<div class="form-group"><label>Status</label><select id="postStatus" class="form-control">' +
            '<option value="Published">Published</option><option value="Draft">Draft</option></select></div>' +
            '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">' +
            '<button type="button" class="btn btn-secondary" onclick="window.adminApp.closeModal()">Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Publish Post</button>' +
            '</div></form>';
        showModal(html);
    }

    function handleAddPost(e) {
        if (e) e.preventDefault();
        addPost({
            title: document.getElementById('postTitle').value.trim(),
            type: document.getElementById('postType').value,
            content: document.getElementById('postContent').value.trim(),
            status: document.getElementById('postStatus').value
        });
    }

    /**
     * Add a new post.
     * @param {Object} data
     */
    function addPost(data) {
        if (!data.title || !data.content) {
            showToast('Post title and content are required.', 'warning');
            return;
        }

        var posts = storageGet(STORAGE_KEYS.POSTS, []);
        if (!Array.isArray(posts)) posts = [];

        posts.push({
            id: generateId(),
            title: data.title,
            content: data.content,
            type: data.type || 'Update',
            date: data.date || new Date().toISOString().split('T')[0],
            author: 'Admin',
            status: data.status || 'Published',
            createdAt: new Date().toISOString()
        });

        storageSet(STORAGE_KEYS.POSTS, posts);
        showToast('Post added successfully.', 'success');
        closeModal();
        loadPosts();
    }

    function showEditPostForm(id) {
        var posts = storageGet(STORAGE_KEYS.POSTS, []);
        var post = Array.isArray(posts) ? posts.find(function (p) { return p.id === id; }) : null;
        if (!post) { showToast('Post not found.', 'error'); return; }

        var types = ['Event', 'Update', 'Alert', 'Photo'];
        var statuses = ['Published', 'Draft'];

        var typeOptions = types.map(function (t) {
            return '<option value="' + t + '"' + (post.type === t ? ' selected' : '') + '>' + t + '</option>';
        }).join('');

        var statusOptions = statuses.map(function (s) {
            return '<option value="' + s + '"' + (post.status === s ? ' selected' : '') + '>' + s + '</option>';
        }).join('');

        var html =
            '<h2 style="margin:0 0 20px;">Edit Post</h2>' +
            '<form id="editPostForm" onsubmit="window.adminApp.handleEditPost(event, \'' + id + '\')">' +
            '<div class="form-group"><label>Title *</label><input type="text" id="postTitle" required class="form-control" value="' + escapeHtml(post.title) + '"></div>' +
            '<div class="form-group"><label>Type</label><select id="postType" class="form-control">' + typeOptions + '</select></div>' +
            '<div class="form-group"><label>Content *</label><textarea id="postContent" required class="form-control" rows="5">' + escapeHtml(post.content || '') + '</textarea></div>' +
            '<div class="form-group"><label>Status</label><select id="postStatus" class="form-control">' + statusOptions + '</select></div>' +
            '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">' +
            '<button type="button" class="btn btn-secondary" onclick="window.adminApp.closeModal()">Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Save Changes</button>' +
            '</div></form>';
        showModal(html);
    }

    function handleEditPost(e, id) {
        if (e) e.preventDefault();
        editPost(id, {
            title: document.getElementById('postTitle').value.trim(),
            type: document.getElementById('postType').value,
            content: document.getElementById('postContent').value.trim(),
            status: document.getElementById('postStatus').value
        });
    }

    /**
     * Edit an existing post.
     * @param {string} id
     * @param {Object} data
     */
    function editPost(id, data) {
        if (!data.title || !data.content) {
            showToast('Post title and content are required.', 'warning');
            return;
        }

        var posts = storageGet(STORAGE_KEYS.POSTS, []);
        if (!Array.isArray(posts)) { showToast('No posts found.', 'error'); return; }

        var found = false;
        posts = posts.map(function (p) {
            if (p.id === id) {
                found = true;
                return Object.assign({}, p, data, { updatedAt: new Date().toISOString() });
            }
            return p;
        });

        if (!found) { showToast('Post not found.', 'error'); return; }

        storageSet(STORAGE_KEYS.POSTS, posts);
        showToast('Post updated successfully.', 'success');
        closeModal();
        loadPosts();
    }

    /**
     * Delete a post with confirmation.
     * @param {string} id
     */
    function deletePost(id) {
        confirmAction('Are you sure you want to delete this post?').then(function (confirmed) {
            if (!confirmed) return;

            var posts = storageGet(STORAGE_KEYS.POSTS, []);
            if (!Array.isArray(posts)) return;

            var filtered = posts.filter(function (p) { return p.id !== id; });
            if (filtered.length === posts.length) {
                showToast('Post not found.', 'error');
                return;
            }

            storageSet(STORAGE_KEYS.POSTS, filtered);
            showToast('Post deleted successfully.', 'success');
            loadPosts();
        });
    }

    // =========================================================================
    // USER MANAGEMENT
    // =========================================================================

    /**
     * Load and display all users.
     */
    function loadUsers() {
        var container = document.getElementById('usersTableBody') || document.getElementById('usersTable');
        if (!container) return;

        var users = storageGet(STORAGE_KEYS.USERS, []);
        if (!Array.isArray(users) || users.length === 0) {
            container.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:30px;color:#999;">No users found.</td></tr>';
            return;
        }

        var html = '';
        users.forEach(function (u) {
            var statusClass = (u.status || 'active').toLowerCase();
            html +=
                '<tr>' +
                '<td>' + escapeHtml(u.name) + '</td>' +
                '<td>' + escapeHtml(u.email || '-') + '</td>' +
                '<td>' + escapeHtml(u.phone || '-') + '</td>' +
                '<td>' + formatDate(u.joinDate) + '</td>' +
                '<td>' + (u.bookings || 0) + '</td>' +
                '<td><span class="status-badge status-' + statusClass + '">' + escapeHtml(u.status || 'active') + '</span></td>' +
                '<td class="action-buttons">' +
                '<button class="btn btn-sm btn-' + (u.status === 'blocked' ? 'success' : 'warning') + '" ' +
                'onclick="window.adminApp.toggleUserStatus(\'' + u.id + '\')">' +
                (u.status === 'blocked' ? 'Activate' : 'Block') + '</button>' +
                '</td></tr>';
        });
        container.innerHTML = html;
    }

    /**
     * Toggle a user's status between active and blocked.
     * @param {string} id
     */
    function toggleUserStatus(id) {
        var users = storageGet(STORAGE_KEYS.USERS, []);
        if (!Array.isArray(users)) { showToast('No users found.', 'error'); return; }

        var found = false;
        users = users.map(function (u) {
            if (u.id === id) {
                found = true;
                u.status = u.status === 'blocked' ? 'active' : 'blocked';
            }
            return u;
        });

        if (!found) { showToast('User not found.', 'error'); return; }

        storageSet(STORAGE_KEYS.USERS, users);
        showToast('User status updated.', 'success');
        loadUsers();
    }

    // =========================================================================
    // REPORTS
    // =========================================================================

    /**
     * Get booking report for a specified period.
     * @param {string} period - 'daily', 'weekly', or 'monthly'
     * @returns {Object}
     */
    function getBookingReport(period) {
        var bookings = storageGet(STORAGE_KEYS.BOOKINGS, []);
        if (!Array.isArray(bookings)) bookings = [];

        var now = new Date();
        var counts = {};
        var filtered = [];

        bookings.forEach(function (b) {
            var bDate = new Date(b.date || b.bookingDate);
            if (isNaN(bDate.getTime())) return;

            var diffDays = Math.floor((now - bDate) / (1000 * 60 * 60 * 24));
            var include = false;
            var key = '';

            if (period === 'daily' && diffDays <= 7) {
                key = bDate.toISOString().split('T')[0];
                include = true;
            } else if (period === 'weekly' && diffDays <= 28) {
                var weekNum = Math.floor(diffDays / 7);
                key = 'Week ' + (weekNum + 1);
                include = true;
            } else if (period === 'monthly' && diffDays <= 365) {
                key = bDate.toLocaleString('en-IN', { month: 'short', year: 'numeric' });
                include = true;
            }

            if (include) {
                filtered.push(b);
                counts[key] = (counts[key] || 0) + 1;
            }
        });

        var statusBreakdown = { Confirmed: 0, Pending: 0, Cancelled: 0 };
        filtered.forEach(function (b) {
            var s = b.status || 'Pending';
            if (statusBreakdown.hasOwnProperty(s)) statusBreakdown[s]++;
        });

        return {
            period: period,
            total: filtered.length,
            breakdown: counts,
            statusBreakdown: statusBreakdown
        };
    }

    /**
     * Get donation report for a specified period.
     * @param {string} period - 'daily', 'weekly', or 'monthly'
     * @returns {Object}
     */
    function getDonationReport(period) {
        var donations = storageGet(STORAGE_KEYS.DONATIONS, []);
        if (!Array.isArray(donations)) donations = [];

        var now = new Date();
        var amounts = {};
        var totalAmount = 0;

        donations.forEach(function (d) {
            var dDate = new Date(d.date || d.donationDate);
            if (isNaN(dDate.getTime())) return;

            var diffDays = Math.floor((now - dDate) / (1000 * 60 * 60 * 24));
            var key = '';
            var include = false;

            if (period === 'daily' && diffDays <= 7) {
                key = dDate.toISOString().split('T')[0];
                include = true;
            } else if (period === 'weekly' && diffDays <= 28) {
                var weekNum = Math.floor(diffDays / 7);
                key = 'Week ' + (weekNum + 1);
                include = true;
            } else if (period === 'monthly' && diffDays <= 365) {
                key = dDate.toLocaleString('en-IN', { month: 'short', year: 'numeric' });
                include = true;
            }

            if (include) {
                var amt = parseFloat(d.amount) || 0;
                amounts[key] = (amounts[key] || 0) + amt;
                totalAmount += amt;
            }
        });

        return {
            period: period,
            totalAmount: totalAmount,
            breakdown: amounts
        };
    }

    /**
     * Get the most popular services/poojas based on booking frequency.
     * @returns {Array<{service: string, count: number}>}
     */
    function getPopularServices() {
        var bookings = storageGet(STORAGE_KEYS.BOOKINGS, []);
        if (!Array.isArray(bookings)) return [];

        var serviceCounts = {};
        bookings.forEach(function (b) {
            var service = b.service || b.pooja || 'Unknown';
            serviceCounts[service] = (serviceCounts[service] || 0) + 1;
        });

        var result = Object.keys(serviceCounts).map(function (service) {
            return { service: service, count: serviceCounts[service] };
        });

        result.sort(function (a, b) { return b.count - a.count; });
        return result;
    }

    // =========================================================================
    // ADMIN ACCOUNT MANAGEMENT (Super Admin only)
    // =========================================================================

    /**
     * Load and display all admin accounts.
     */
    function loadAdminAccounts() {
        var container = document.getElementById('adminAccountsTableBody');
        if (!container) return;

        var accounts = storageGet(STORAGE_KEYS.ADMIN_ACCOUNTS, []);
        if (!Array.isArray(accounts) || accounts.length === 0) {
            container.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#999;">No admin accounts found.</td></tr>';
            return;
        }

        var html = '';
        accounts.forEach(function (a) {
            var roleLabel = a.role === ROLE_SUPER ? 'Super Admin' : 'Temple Admin';
            var statusClass = (a.status || 'active').toLowerCase();
            html +=
                '<tr>' +
                '<td>' + escapeHtml(a.name || a.username) + '</td>' +
                '<td>' + escapeHtml(a.username) + '</td>' +
                '<td><span class="status-badge status-' + (a.role === ROLE_SUPER ? 'confirmed' : 'pending') + '">' + roleLabel + '</span></td>' +
                '<td>' + escapeHtml(a.templeName || (a.role === ROLE_SUPER ? 'All Temples' : '-')) + '</td>' +
                '<td><span class="status-badge status-' + statusClass + '">' + escapeHtml(a.status || 'active') + '</span></td>' +
                '<td class="action-buttons">' +
                (a.role !== ROLE_SUPER ?
                    '<button class="btn btn-sm btn-' + (a.status === 'blocked' ? 'success' : 'warning') + '" onclick="window.adminApp.toggleAdminStatus(\'' + a.id + '\')">' + (a.status === 'blocked' ? 'Activate' : 'Block') + '</button> ' +
                    '<button class="btn btn-sm btn-danger" onclick="window.adminApp.deleteAdminAccount(\'' + a.id + '\')">Delete</button>'
                    : '<span style="color:#999;font-size:0.8rem;">Protected</span>') +
                '</td></tr>';
        });
        container.innerHTML = html;

        // Update stats
        var totalEl = document.getElementById('total-admins');
        var superEl = document.getElementById('super-admin-count');
        var templeEl = document.getElementById('temple-admin-count');
        if (totalEl) totalEl.textContent = accounts.length;
        if (superEl) superEl.textContent = accounts.filter(function (a) { return a.role === ROLE_SUPER; }).length;
        if (templeEl) templeEl.textContent = accounts.filter(function (a) { return a.role === ROLE_TEMPLE; }).length;
    }

    /**
     * Show form to create a new temple admin.
     */
    function showAddAdminForm() {
        if (!isSuperAdmin()) {
            showToast('Only Super Admin can create admin accounts.', 'error');
            return;
        }

        var temples = storageGet(STORAGE_KEYS.TEMPLES, []);
        var templeOptions = '<option value="">-- Select Temple --</option>';
        if (Array.isArray(temples)) {
            temples.forEach(function (t) {
                if (t.status !== 'inactive') {
                    templeOptions += '<option value="' + escapeHtml(t.id) + '" data-name="' + escapeHtml(t.name) + '">' + escapeHtml(t.name) + ' (' + escapeHtml(t.location || '') + ')</option>';
                }
            });
        }

        var html =
            '<h2 style="margin:0 0 20px;">Create Temple Admin</h2>' +
            '<form id="addAdminForm" onsubmit="window.adminApp.handleAddAdmin(event)">' +
            '<div class="form-group"><label>Full Name *</label><input type="text" id="adminName" required class="form-control" placeholder="e.g., Rajesh Kumar"></div>' +
            '<div class="form-group"><label>Username *</label><input type="text" id="adminNewUsername" required class="form-control" placeholder="e.g., rajesh"></div>' +
            '<div class="form-group"><label>Password *</label><input type="password" id="adminNewPassword" required class="form-control" minlength="4" placeholder="Min 4 characters"></div>' +
            '<div class="form-group"><label>Assign Temple *</label><select id="adminTemple" required class="form-control">' + templeOptions + '</select></div>' +
            '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">' +
            '<button type="button" class="btn btn-secondary" onclick="window.adminApp.closeModal()">Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Create Admin</button>' +
            '</div></form>';
        showModal(html);
    }

    function handleAddAdmin(e) {
        if (e) e.preventDefault();

        var name = document.getElementById('adminName').value.trim();
        var username = document.getElementById('adminNewUsername').value.trim();
        var password = document.getElementById('adminNewPassword').value.trim();
        var templeSelect = document.getElementById('adminTemple');
        var templeId = templeSelect.value;
        var templeName = templeSelect.options[templeSelect.selectedIndex].getAttribute('data-name') || '';

        if (!name || !username || !password || !templeId) {
            showToast('All fields are required.', 'warning');
            return;
        }

        if (password.length < 4) {
            showToast('Password must be at least 4 characters.', 'warning');
            return;
        }

        var accounts = storageGet(STORAGE_KEYS.ADMIN_ACCOUNTS, []);
        if (!Array.isArray(accounts)) accounts = [];

        // Check for duplicate username
        var duplicate = accounts.some(function (a) { return a.username === username; });
        if (duplicate) {
            showToast('Username already exists. Choose a different one.', 'error');
            return;
        }

        accounts.push({
            id: generateId(),
            username: username,
            password: password,
            name: name,
            role: ROLE_TEMPLE,
            templeId: templeId,
            templeName: templeName,
            status: 'active',
            createdAt: new Date().toISOString()
        });

        storageSet(STORAGE_KEYS.ADMIN_ACCOUNTS, accounts);
        showToast('Temple Admin "' + name + '" created successfully.', 'success');
        closeModal();
        loadAdminAccounts();
    }

    /**
     * Toggle admin account status (active/blocked).
     */
    function toggleAdminStatus(id) {
        var accounts = storageGet(STORAGE_KEYS.ADMIN_ACCOUNTS, []);
        if (!Array.isArray(accounts)) return;

        var found = false;
        accounts = accounts.map(function (a) {
            if (a.id === id && a.role !== ROLE_SUPER) {
                found = true;
                a.status = a.status === 'blocked' ? 'active' : 'blocked';
            }
            return a;
        });

        if (!found) { showToast('Account not found or is protected.', 'error'); return; }

        storageSet(STORAGE_KEYS.ADMIN_ACCOUNTS, accounts);
        showToast('Admin status updated.', 'success');
        loadAdminAccounts();
    }

    /**
     * Delete an admin account (cannot delete super admin).
     */
    function deleteAdminAccount(id) {
        confirmAction('Are you sure you want to delete this admin account?').then(function (confirmed) {
            if (!confirmed) return;

            var accounts = storageGet(STORAGE_KEYS.ADMIN_ACCOUNTS, []);
            if (!Array.isArray(accounts)) return;

            var filtered = accounts.filter(function (a) {
                return a.id !== id || a.role === ROLE_SUPER;
            });

            if (filtered.length === accounts.length) {
                showToast('Cannot delete this account.', 'error');
                return;
            }

            storageSet(STORAGE_KEYS.ADMIN_ACCOUNTS, filtered);
            showToast('Admin account deleted.', 'success');
            loadAdminAccounts();
        });
    }

    // =========================================================================
    // HELPER
    // =========================================================================

    /**
     * Safely set the text content of an element by ID.
     * @param {string} id
     * @param {string|number} text
     */
    function setElementText(id, text) {
        var el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    // =========================================================================
    // PAGE-SPECIFIC INITIALIZATION
    // =========================================================================

    /**
     * Determine the current page and load the appropriate data.
     */
    function initPageData() {
        var page = window.location.pathname.split('/').pop() || 'index.html';
        page = page.replace('.html', '').toLowerCase();

        // Apply role-based UI restrictions on all pages except login
        if (page !== 'index' && page !== '') {
            applyRoleRestrictions();
        }

        switch (page) {
            case 'index':
            case '':
                loadDashboardStats();
                break;
            case 'bookings':
                loadBookings();
                break;
            case 'donations':
                loadDonations();
                break;
            case 'temples':
                loadTemples();
                break;
            case 'events':
                loadEvents();
                break;
            case 'gallery':
                loadGallery();
                break;
            case 'annadhanam':
                loadAnnadhanam();
                break;
            case 'posts':
            case 'feed':
                loadPosts();
                break;
            case 'users':
                loadUsers();
                break;
            case 'admin-accounts':
                loadAdminAccounts();
                break;
            case 'reports':
                // Reports are loaded on demand
                break;
            default:
                break;
        }
    }

    // =========================================================================
    // INITIALIZATION
    // =========================================================================

    document.addEventListener('DOMContentLoaded', function () {
        // Authentication check (skipped on login page)
        checkAuth();

        // Seed default data on first run
        seedAllDefaults();

        // Set active navigation link
        setActivePage();

        // Load page-specific data
        initPageData();

        // Bind sidebar toggle if present
        var sidebarToggle = document.getElementById('sidebarToggle') || document.querySelector('.sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }

        // Bind login form if present
        var loginForm = document.getElementById('loginForm') || document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', adminLogin);
        }

        // Bind logout button if present
        var logoutBtn = document.getElementById('logoutBtn') || document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function (e) {
                e.preventDefault();
                adminLogout();
            });
        }

        // Bind booking search
        var bookingSearch = document.getElementById('bookingSearch');
        if (bookingSearch) {
            bookingSearch.addEventListener('input', function () {
                searchBookings(this.value);
            });
        }

        // Bind booking filter buttons
        var bookingFilterBtns = document.querySelectorAll('[data-booking-filter]');
        bookingFilterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                bookingFilterBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
                filterBookings(this.getAttribute('data-booking-filter'));
            });
        });

        // Bind donation filter
        var donationFilter = document.getElementById('donationFilter');
        if (donationFilter) {
            donationFilter.addEventListener('change', function () {
                filterDonations(this.value);
            });
        }

        // Bind export bookings button
        var exportBtn = document.getElementById('exportBookings');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportBookings);
        }

        // Bind Add buttons
        var addTempleBtn = document.getElementById('addTempleBtn');
        if (addTempleBtn) addTempleBtn.addEventListener('click', showAddTempleForm);

        var addEventBtn = document.getElementById('addEventBtn');
        if (addEventBtn) addEventBtn.addEventListener('click', showAddEventForm);

        var addGalleryBtn = document.getElementById('addGalleryBtn');
        if (addGalleryBtn) addGalleryBtn.addEventListener('click', showAddGalleryForm);

        var addPostBtn = document.getElementById('addPostBtn');
        if (addPostBtn) addPostBtn.addEventListener('click', showAddPostForm);

        // Bind annadhanam meal update forms
        var mealForms = document.querySelectorAll('[data-meal-form]');
        mealForms.forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var meal = this.getAttribute('data-meal-form');
                var input = this.querySelector('input[type="number"]');
                if (input) updateMealCount(meal, input.value);
            });
        });

        // Bind notification bell / header action buttons (navigate to notifications page)
        var notifButtons = document.querySelectorAll('.notification-btn, .header-action-btn');
        notifButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                navigateTo('notifications.html');
            });
        });

        // Bind header avatar click (navigate to settings)
        var avatarEls = document.querySelectorAll('.header-avatar, .admin-avatar');
        avatarEls.forEach(function (el) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', function () {
                navigateTo('settings.html');
            });
        });

        console.log('Admin Dashboard initialized successfully.');
    });

    // =========================================================================
    // PUBLIC API - Expose functions globally for onclick handlers
    // =========================================================================

    window.adminApp = {
        // Navigation
        toggleSidebar: toggleSidebar,
        setActivePage: setActivePage,
        navigateTo: navigateTo,

        // Auth
        adminLogin: adminLogin,
        adminLogout: adminLogout,
        checkAuth: checkAuth,

        // Dashboard
        loadDashboardStats: loadDashboardStats,
        renderRecentBookings: renderRecentBookings,
        renderRecentDonations: renderRecentDonations,

        // Bookings
        loadBookings: loadBookings,
        filterBookings: filterBookings,
        searchBookings: searchBookings,
        updateBookingStatus: updateBookingStatus,
        viewBookingDetails: viewBookingDetails,
        deleteBooking: deleteBooking,
        exportBookings: exportBookings,

        // Donations
        loadDonations: loadDonations,
        filterDonations: filterDonations,
        getDonationStats: getDonationStats,

        // Temples
        loadTemples: loadTemples,
        addTemple: addTemple,
        editTemple: editTemple,
        deleteTemple: deleteTemple,
        showAddTempleForm: showAddTempleForm,
        showEditTempleForm: showEditTempleForm,
        handleAddTemple: handleAddTemple,
        handleEditTemple: handleEditTemple,

        // Events
        loadEvents: loadEvents,
        addEvent: addEvent,
        editEvent: editEvent,
        deleteEvent: deleteEvent,
        showAddEventForm: showAddEventForm,
        showEditEventForm: showEditEventForm,
        handleAddEvent: handleAddEvent,
        handleEditEvent: handleEditEvent,

        // Gallery
        loadGallery: loadGallery,
        addGalleryItem: addGalleryItem,
        deleteGalleryItem: deleteGalleryItem,
        showAddGalleryForm: showAddGalleryForm,
        handleAddGalleryItem: handleAddGalleryItem,

        // Annadhanam
        loadAnnadhanam: loadAnnadhanam,
        updateMealCount: updateMealCount,
        getAnnadhanamStats: getAnnadhanamStats,

        // Posts
        loadPosts: loadPosts,
        addPost: addPost,
        editPost: editPost,
        deletePost: deletePost,
        showAddPostForm: showAddPostForm,
        showEditPostForm: showEditPostForm,
        handleAddPost: handleAddPost,
        handleEditPost: handleEditPost,

        // Users
        loadUsers: loadUsers,
        toggleUserStatus: toggleUserStatus,

        // Admin Accounts
        loadAdminAccounts: loadAdminAccounts,
        showAddAdminForm: showAddAdminForm,
        handleAddAdmin: handleAddAdmin,
        toggleAdminStatus: toggleAdminStatus,
        deleteAdminAccount: deleteAdminAccount,

        // Role helpers
        getSession: getSession,
        isSuperAdmin: isSuperAdmin,
        getSessionTempleId: getSessionTempleId,

        // Reports
        getBookingReport: getBookingReport,
        getDonationReport: getDonationReport,
        getPopularServices: getPopularServices,

        // Utilities
        showToast: showToast,
        showModal: showModal,
        closeModal: closeModal,
        formatDate: formatDate,
        formatCurrency: formatCurrency,
        generateId: generateId,
        exportToCSV: exportToCSV,
        confirmAction: confirmAction
    };

})();
