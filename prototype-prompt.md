# Soruban Temple — HTML Mobile Prototype Build Prompt

## YOUR ROLE

You are a **Senior UI/UX Designer & Frontend Architect** with 12+ years of experience building premium mobile app prototypes for religious-tech and community platforms. You specialize in:
- Multi-user-type app architectures (devotee + service provider + temple admin + platform admin)
- Indian devotional app design patterns (temple aesthetics, vernacular-first, accessibility)
- Interactive HTML prototypes that look and feel like real native apps
- Responsive web dashboards with mobile-adaptive layouts

You will build a **production-quality HTML mobile prototype** for Soruban Temple that stakeholders can tap through on their phones and investors can demo. Every screen should feel real — with proper dummy data, smooth transitions, and pixel-perfect design.

---

## PROJECT CONTEXT

**Read these files first for full business context:**
- `BRAINSTORM.md` — Full product brainstorming with feature list and phased rollout
- `COMPETITIVE-ANALYSIS.md` — Market analysis, competitor gaps, positioning strategy

**App:** Soruban Temple — Unified Hindu Temple & Devotee Digital Platform
**Client:** Soruban, Tamil Nadu
**Market:** Tamil Nadu first → South India → Pan-India + Diaspora

**What this platform does:** Connects Hindu temples and devotees on a single platform. Temples get management software (bookings, donations, events, queue). Devotees get a super-app (discover temples, book pooja with QR archana, donate, connect with priests/astrologers, track spiritual journey, community). Priests and astrologers get a marketplace for home bookings and consultations.

---

## APP ARCHITECTURE — 4 APPS, 9 USER TYPES

### App 1: Devotee App — "Soruban Temple" (3 user types + volunteer tab, single login)

| Code | User Type | Experience | Key Screens |
|------|-----------|-----------|-------------|
| D1 | Regular Devotee | Browse temples, book pooja (QR archana), donate, darshan token, live darshan, events, community, feed, prasadam shop | Home → Temple List → Temple Detail → Book Pooja → QR Code → My Bookings |
| D2 | Family/Kula Manager | Manage family spiritual profiles, book on behalf, kula theivam, family visit tracker | Family Dashboard → Add Member → Book for Family → Kula Theivam → Family History |
| D3 | Pilgrim/Traveler | Pilgrimage planner, route optimizer, accommodation, multi-temple trip, trail tracker | Pilgrimage Home → Choose Trail → Route Planner → Accommodation → Trip Tracker |
| + | Volunteer (Tab) | Browse opportunities, sign up, check-in, hours, certificates | Volunteer Tab → Opportunities → Sign Up → My Hours → Certificates |

**Login Flow:** Phone + OTP → "How will you use Soruban Temple?" type selection → type-specific onboarding → adaptive home screen

**NRI Handling:** Location setting toggle (India / International) — changes currency, enables international prasadam delivery, adjusts panchang timezone. NOT a separate user type.

### App 2: Service Provider App — "Soruban Temple Provider" (2 user types, separate login)

| Code | User Type | Experience | Key Screens |
|------|-----------|-----------|-------------|
| P1 | Temple Priest (Iyyer) | Manage availability, receive home bookings, scan QR archana, earnings, ratings | Dashboard → Today's Schedule → Incoming Requests → Scan QR → Earnings → Profile |
| P2 | Astrologer (Josiyar) | Consultation slots, video/chat sessions, jathakam, horoscope matching, earnings | Dashboard → Today's Consultations → Start Session → Client History → Earnings |

### App 3: Temple Admin Panel (Responsive Web — works on desktop + mobile)

| Code | User Type | Key Modules |
|------|-----------|-------------|
| T1 | Temple Manager/Trustee | Full access — dashboard, bookings, donations, events, services, gallery, feed, reports, priest mgmt, settings |
| T2 | Temple Staff | Scan QR tokens, manage daily poojas, update queue, mark annadhanam |
| T3 | Temple Accountant | Donation reports, 80G receipts, expenses, audit, hundi management |

### App 4: Super Admin Panel (Responsive Web — works on desktop + mobile)

| Code | User Type | Key Modules |
|------|-----------|-------------|
| S1 | Platform Owner (Soruban) | Temple onboarding, platform analytics, revenue, users, content moderation, provider verification, settings |
| S2 | Support Staff | Customer tickets, disputes, complaints, booking issues, refunds |

---

## FOLDER STRUCTURE

```
prototype/
├── shared/
│   ├── design-system.css        # Color palette, typography, CSS variables, dark mode
│   ├── phone-frame.css          # iPhone 15 Pro frame, Dynamic Island, status bar
│   ├── components.css           # Reusable components (cards, badges, buttons, forms, modals)
│   ├── animations.css           # Transitions, micro-interactions, shimmer, pulse
│   └── nav-engine.js            # Navigation engine (screenHistory, navigateTo, goBack, theme toggle, bottom nav)
│
├── landing/
│   ├── index.html               # App selector: "Which app do you want to demo?"
│   ├── styles.css
│   └── app.js
│
├── devotee-app/
│   ├── common/
│   │   ├── splash.html          # Splash — Soruban Temple branding, Om symbol animation
│   │   ├── login.html           # Phone + OTP login
│   │   ├── type-selection.html  # "How will you use Soruban Temple?" — 3 types
│   │   └── shared-screens.js    # Cart, checkout, profile, settings, notifications (shared across D1/D2/D3)
│   │
│   ├── d1-regular-devotee/
│   │   ├── index.html           # App shell with phone frame
│   │   ├── styles.css           # D1-specific overrides
│   │   └── app.js               # All D1 screens: home, temple list, temple detail, book pooja, QR archana,
│   │                            # darshan token, live darshan, donation, annadhanam, events, community,
│   │                            # feed, prasadam shop, nalla neram, rasi palan, my bookings, order history, volunteer tab
│   │
│   ├── d2-family-manager/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── app.js               # Family dashboard, add/manage members, book on behalf, kula theivam,
│   │                            # family visit tracker, family donation history
│   │
│   └── d3-pilgrim/
│       ├── index.html
│       ├── styles.css
│       └── app.js               # Pilgrimage home, trail selection, route planner, accommodation,
│                                # trip tracker, visited temples map, pilgrimage badges
│
├── provider-app/
│   ├── common/
│   │   ├── login.html           # Provider login + registration
│   │   ├── type-selection.html  # "I am a: Priest / Astrologer"
│   │   └── shared-screens.js    # Earnings, ratings, profile, settings (shared P1/P2)
│   │
│   ├── p1-priest/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── app.js               # Dashboard, today's schedule, incoming requests, scan QR,
│   │                            # home booking detail, availability calendar, earnings, reviews
│   │
│   └── p2-astrologer/
│       ├── index.html
│       ├── styles.css
│       └── app.js               # Dashboard, consultation slots, start video/chat, jathakam tool,
│                                # horoscope matching, client history, earnings, reviews
│
├── temple-admin/
│   ├── index.html               # Responsive web dashboard (sidebar on desktop, bottom nav on mobile)
│   ├── styles.css
│   └── app.js                   # Login, role selection (T1/T2/T3), dashboard, bookings, donations,
│                                # events, services catalog, darshan queue, annadhanam, gallery,
│                                # feed/posts, priest management, users, feedback, reports, settings,
│                                # notifications, 80G receipts, hundi management
│
└── super-admin/
    ├── index.html               # Responsive web dashboard
    ├── styles.css
    └── app.js                   # Login, role selection (S1/S2), platform dashboard, temple onboarding,
                                 # temple approval, admin management, user management, provider verification,
                                 # bookings overview, finance/revenue, content moderation, support tickets,
                                 # notifications, reports, platform settings
```

---

## ONLINE LIBRARIES (CDN)

Link these in every HTML file:

```html
<!-- Google Fonts — Inter (UI) + Noto Sans Tamil (vernacular) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Font Awesome 6 — Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Chart.js — Admin dashboards -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<!-- Animate.css — Entrance animations -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
```

**Modern CSS Features to Use:**
- CSS Custom Properties (variables) with dark mode toggle
- CSS Grid + Flexbox for all layouts
- CSS Container Queries for responsive admin panels
- CSS `:has()` selector for parent-aware styling
- CSS `@layer` for design system cascade control
- `scroll-snap` for horizontal carousels
- `view-transition-api` for smooth page transitions (with fallback)
- `backdrop-filter: blur()` for glassmorphism overlays
- CSS `color-mix()` for dynamic color variations
- `prefers-color-scheme` media query for system dark mode
- `prefers-reduced-motion` for accessibility

---

## PHONE FRAME SPECS

Apply to ALL mobile app screens (devotee-app, provider-app):

- **Device:** iPhone 15 Pro simulation
- **Frame size:** 393px x 852px
- **Border radius:** 48px
- **Dynamic Island:** 120px x 28px, centered, black
- **Status bar:** Time (9:41), signal, wifi, battery icons
- **Bottom nav:** 5 tabs with Font Awesome icons + labels (varies per app)
- **Responsive:** On mobile (<420px) — full-screen, no frame
- **Phone border:** Rounded with warm glow shadow

**Temple Admin & Super Admin are web-only** — responsive layout with sidebar navigation on desktop, bottom nav on mobile. No phone frame.

---

## DESIGN SYSTEM — Temple Saffron Theme

### Color Palette

```css
@layer design-system {
  :root {
    /* ===== Temple Saffron Theme (Light Mode) ===== */
    --primary: #E65100;              /* Deep Saffron — gopuram, sacred thread */
    --primary-dark: #BF360C;         /* Darker saffron — headers, emphasis */
    --primary-light: #FF8A65;        /* Light saffron — hover, backgrounds */
    --primary-bg: rgba(230, 81, 0, 0.06);  /* Saffron tint background */

    --accent: #FFB300;               /* Temple Gold — buttons, highlights, badges */
    --accent-dark: #FF8F00;          /* Darker gold */
    --accent-light: #FFE082;         /* Light gold — tags, subtle highlights */

    --sacred-red: #C62828;           /* Kumkum Red — alerts, important badges, live indicators */
    --sacred-red-light: #FFCDD2;     /* Light red background */

    --sacred-green: #2E7D32;         /* Tulsi Green — success, confirmed status */
    --sacred-green-light: #C8E6C9;

    --sacred-blue: #1565C0;          /* Krishna Blue — info, links */
    --sacred-blue-light: #BBDEFB;

    --sacred-purple: #6A1B9A;        /* Spiritual Purple — astrology, mystical */
    --sacred-purple-light: #E1BEE7;

    /* ===== Neutrals ===== */
    --bg-primary: #FFF8F0;           /* Warm cream — like temple sandstone */
    --bg-secondary: #FFF3E0;         /* Slightly warmer */
    --bg-card: #FFFFFF;
    --bg-elevated: #FFFFFF;

    --text-primary: #3E2723;         /* Dark brown — like temple wood */
    --text-secondary: #5D4037;
    --text-light: #8D6E63;
    --text-muted: #BCAAA4;

    --border: #D7CCC8;              /* Warm grey border */
    --border-light: #EFEBE9;
    --divider: #F5F0EB;

    /* ===== Gradients ===== */
    --gradient-primary: linear-gradient(135deg, #E65100 0%, #FF8A65 100%);
    --gradient-hero: linear-gradient(160deg, #BF360C 0%, #E65100 40%, #FF8A65 100%);
    --gradient-gold: linear-gradient(135deg, #FF8F00 0%, #FFB300 50%, #FFE082 100%);
    --gradient-sacred: linear-gradient(135deg, #C62828 0%, #E65100 50%, #FFB300 100%);
    --gradient-dark: linear-gradient(135deg, #3E2723 0%, #5D4037 100%);

    /* ===== Shadows ===== */
    --shadow-sm: 0 1px 3px rgba(62, 39, 35, 0.08);
    --shadow-md: 0 4px 12px rgba(62, 39, 35, 0.1);
    --shadow-lg: 0 8px 24px rgba(62, 39, 35, 0.12);
    --shadow-glow: 0 4px 20px rgba(230, 81, 0, 0.2);
    --shadow-gold: 0 4px 16px rgba(255, 179, 0, 0.25);

    /* ===== Radius ===== */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-full: 9999px;

    /* ===== Typography ===== */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-tamil: 'Noto Sans Tamil', sans-serif;
    --font-size-xs: 0.68rem;
    --font-size-sm: 0.78rem;
    --font-size-base: 0.88rem;
    --font-size-md: 0.95rem;
    --font-size-lg: 1.1rem;
    --font-size-xl: 1.3rem;
    --font-size-2xl: 1.6rem;
    --font-size-3xl: 2rem;

    /* ===== Segment Colors ===== */
    --seg-pooja: #E65100;            /* Saffron — pooja, archana */
    --seg-donation: #2E7D32;         /* Green — donations, money */
    --seg-darshan: #1565C0;          /* Blue — darshan, queue */
    --seg-astrology: #6A1B9A;        /* Purple — astrology */
    --seg-priest: #C62828;           /* Red — priests, rituals */
    --seg-community: #00838F;        /* Teal — community */
    --seg-events: #AD1457;           /* Pink — events, festivals */
    --seg-shop: #EF6C00;             /* Orange — e-commerce */
  }

  /* ===== Dark Mode ===== */
  [data-theme="dark"] {
    --bg-primary: #1A1210;
    --bg-secondary: #241C18;
    --bg-card: #2D2420;
    --bg-elevated: #362C26;

    --text-primary: #EFEBE9;
    --text-secondary: #D7CCC8;
    --text-light: #BCAAA4;
    --text-muted: #8D6E63;

    --border: #4E342E;
    --border-light: #3E2723;
    --divider: #2D2420;

    --primary-bg: rgba(230, 81, 0, 0.12);
    --sacred-red-light: rgba(198, 40, 40, 0.2);
    --sacred-green-light: rgba(46, 125, 50, 0.2);
    --sacred-blue-light: rgba(21, 101, 192, 0.2);
    --sacred-purple-light: rgba(106, 27, 154, 0.2);

    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 4px 20px rgba(230, 81, 0, 0.3);
  }
}
```

### Component Patterns

Use Font Awesome icons consistently:
- Temples: `fa-gopuram` / `fa-place-of-worship`
- Pooja: `fa-fire` / `fa-candle-holder`
- Donation: `fa-hand-holding-heart` / `fa-indian-rupee-sign`
- Darshan: `fa-ticket` / `fa-eye`
- Events: `fa-calendar-star` / `fa-champagne-glasses`
- Community: `fa-users` / `fa-comments`
- Priest: `fa-person-praying` / `fa-om`
- Astrology: `fa-star` / `fa-moon` / `fa-sun`
- Profile: `fa-user` / `fa-circle-user`
- Settings: `fa-gear`
- Notifications: `fa-bell`
- Feed: `fa-newspaper`
- Shop: `fa-cart-shopping`
- QR Code: `fa-qrcode`
- Location: `fa-location-dot`
- Calendar: `fa-calendar-days`
- Heart: `fa-heart`
- Share: `fa-share-nodes`
- Search: `fa-magnifying-glass`
- Home: `fa-house-chimney`
- Back: `fa-arrow-left`
- Live: `fa-circle` (pulsing red for live indicator)
- Volunteer: `fa-hands-helping`
- Family: `fa-people-roof`
- Pilgrim: `fa-route` / `fa-map-location-dot`

---

## SCREEN DETAILS PER USER TYPE

### Landing Page (prototype/landing/)
- Grid of 4 app cards on warm dark background (#3E2723)
- Cards: Devotee App (saffron), Provider App (red), Temple Admin (gold), Super Admin (dark)
- Each card: Font Awesome icon, title, user type count badge, description, "Open Demo" button
- Soruban Temple logo at top with Om symbol
- Subtle temple silhouette background pattern

### Devotee App — Common Screens

**Splash (splash.html):**
- Warm saffron gradient background
- Animated Om symbol (🕉) with golden glow pulse
- "Soruban Temple" in bold white, tagline "Your Divine Connection" below
- Temple gopuram silhouette at bottom
- Tap to continue → login.html

**Login (login.html):**
- Clean minimal form inside phone frame
- Temple illustration at top (abstract gopuram)
- "Welcome, Devotee" heading
- Phone number input with +91 prefix
- "Send OTP" saffron button
- OTP entry (6 digits) with auto-verify animation
- "By continuing you agree to Terms" at bottom
- After OTP → type-selection.html

**Type Selection (type-selection.html):**
- "How will you connect with temples?" heading
- 3 cards with illustrations:
  1. 🛕 "Explore & Worship" → D1 (Browse temples, book pooja, donate, attend events)
  2. 👨‍👩‍👧 "Manage Family Devotion" → D2 (Family profiles, kula theivam, book for family)
  3. 🗺️ "Plan Pilgrimage" → D3 (Temple trails, trip planner, accommodation)
- "You can switch anytime from Settings" subtitle
- Each card has Font Awesome icon, title, 2-line description

---

### D1 — Regular Devotee Screens (PRIMARY — most screens)

**Bottom Nav (5 tabs):**
Home | Temples | Community | Feed | Profile

**1. Home Screen:**
- **Header:** "Soruban Temple" with notification bell + profile avatar
- **Greeting:** "வணக்கம், Ramesh!" with time-based greeting (Good Morning/Afternoon/Evening)
- **Today's Panchang card:** Date (Tamil + English), Tithi, Nakshatra, Yoga, Rahu Kalam, Nalla Neram — saffron gradient card
- **Connected Temple banner:** Currently connected temple (Meenakshi Amman Temple) with change option
- **Quick Services grid (4x3):**
  - Book Pooja (fa-fire), Donate (fa-hand-holding-heart), Darshan Token (fa-ticket)
  - Live Darshan (fa-video), Annadhanam (fa-utensils), Nalla Neram (fa-clock)
  - Rasi Palan (fa-star), Events (fa-calendar), Prasadam Shop (fa-cart-shopping)
  - Priest Booking (fa-person-praying), Astrologer (fa-moon), Volunteer (fa-hands-helping)
- **Upcoming at your temple:** Next 3 events/poojas at connected temple
- **Temple Feed:** Latest 3 posts from connected temple
- **Nearby Temples:** Horizontal scroll cards (distance shown)
- **Festival Alert banner:** Upcoming festival countdown (e.g., "Panguni Uthiram in 5 days")

**2. Temple List Screen:**
- **Search bar** with voice search icon
- **Filter chips:** All | Nearby | Shiva | Vishnu | Devi | Murugan | Ganesh | Hanuman
- **Sort:** Distance | Rating | Name
- **District filter dropdown:** Chennai, Madurai, Thanjavur, Trichy, etc.
- **Temple cards:** Image, name, location, deity, distance, rating stars, "Open Now" badge, crowd indicator (Low/Medium/High)
- **Map toggle** button (list ↔ map view)

**3. Temple Detail Screen:**
- **Hero image** with gradient overlay
- **Temple name + location** with follow/like buttons
- **Tabs:** About | Services | Events | Gallery | Reviews
- **About tab:** History, deity info, timings (morning/evening), address with map link, phone, amenities icons (parking, wheelchair, restroom)
- **Services tab:** List of available services (Archana ₹50, Abhishekam ₹500, etc.) with "Book" button each
- **Events tab:** Upcoming events at this temple
- **Gallery tab:** Photo grid
- **Reviews tab:** Star rating summary, review list with user name, rating, comment, date
- **Floating "Book Pooja" button** at bottom

**4. Book Pooja Screen (QR Archana — KEY DIFFERENTIATOR):**
- **Step 1 — Select Service:** List of poojas/archanas available at selected temple, price shown, radio select
- **Step 2 — Devotee Details:** Name (pre-filled from profile), Nakshatra dropdown (27 stars), Rasi dropdown (12 signs), Gothram text input, "Add another person" button (for family batch archana), special requests textarea
- **Step 3 — Select Date & Slot:** Calendar date picker, morning/evening slot selection, availability shown
- **Step 4 — Payment:** Summary card (service, date, slot, amount), payment options (UPI, Card, Net Banking, Wallet), promo code input, "Pay ₹XXX" button
- **Step 5 — QR Code Generated:**
  - Large QR code in center with golden border frame
  - Booking ID (BK-20260318-001)
  - "Show this QR to the priest at the temple"
  - Booking details below QR (name, service, date, slot)
  - "Download QR" and "Share" buttons
  - "Add to Calendar" button
  - Status badge: "Confirmed ✓"

**5. Darshan Token Screen:**
- Select temple → select date → select time slot
- Available slots shown with remaining capacity (e.g., "7:00-7:30 AM — 45 tokens left")
- VIP/Priority option (higher price)
- Senior citizen priority badge
- After booking: QR token similar to pooja booking
- Real-time queue position when at temple

**6. Live Darshan Screen:**
- Temple selector at top
- Video player placeholder (16:9) with play button overlay
- "LIVE" red pulsing badge
- Temple name, current ritual ("Morning Abhishekam in progress")
- Schedule: Today's live streaming times
- "Set Reminder" for upcoming live sessions
- Viewer count badge

**7. Donation Screen:**
- Connected temple banner
- Amount quick-select grid: ₹100, ₹251, ₹501, ₹1001, ₹2,500, ₹5,000
- Custom amount input
- Donation type radio: General, Annadhanam, Temple Renovation, Gopuram Fund, Special Pooja
- "In memory of" optional field
- Recurring donation toggle (One-time / Monthly / Annual)
- 80G tax receipt toggle (auto-generate)
- Donor details (pre-filled from profile)
- Payment options
- After payment: Receipt with 80G number, "Download Receipt" button

**8. Annadhanam Screen:**
- "Sponsor a Meal, Earn Blessings" hero banner
- Sponsorship options:
  - 10 meals — ₹500
  - 25 meals — ₹1,250
  - 50 meals — ₹2,500
  - 100 meals — ₹5,000
  - Full day (500 meals) — ₹25,000
- Select date for sponsorship
- "In the name of" field (for punya)
- Photo/video of annadhanam sent after event
- Annadhanam schedule at selected temple

**9. Events Screen:**
- Month calendar view with dots on event dates
- Upcoming events list: image, title, date, temple name, type badge (Festival/Cultural/Spiritual/Charity)
- Event detail: description, schedule, gallery, "RSVP" button, "Add to Calendar", share
- Past events gallery

**10. Community Screen:**
- **Tabs:** Feed | Forum | Groups
- **Feed tab:** Post cards (user photo, name, verified badge, text, image, like/comment/share counts)
- **Forum tab:** Discussion threads by category (Q&A, Experience, Discussion)
- **Groups tab:** Temple-based groups, locality groups, interest groups (Vedic study, Bhajan)
- **Create Post** floating button
- **Trending topics** horizontal scroll

**11. Nalla Neram Screen:**
- Today's date prominently displayed (Tamil calendar + English)
- Sunrise/Sunset times
- **Nalla Neram** (auspicious time) highlighted in green blocks on timeline
- **Rahu Kalam** in red
- **Yamagandam** in orange
- **Gulikai Kalam** in grey
- Visual 24-hour timeline bar with color-coded blocks
- "Tomorrow" button to check next day
- "Best time for travel/business/pooja" recommendations

**12. Rasi Palan (Horoscope) Screen:**
- Rasi selector grid (12 zodiac signs with Tamil names): Mesham, Rishabam, Mithunam, Kadagam, Simmam, Kanni, Thulam, Viruchigam, Dhanusu, Makaram, Kumbam, Meenam
- Daily/Weekly/Monthly/Yearly toggle tabs
- Selected rasi prediction card with: overall rating (stars), lucky number, lucky color, favorable time
- Sections: Career, Finance, Health, Love, Family
- "Consult Astrologer" CTA button at bottom

**13. Prasadam Shop Screen:**
- Categories: Prasadam, Pooja Items, Books, Deities, Accessories
- Product cards: image, name, temple of origin, price, "Add to Cart"
- Featured: Famous temple prasadam (Tirupati Laddu, Palani Panchamirtham)
- Subscription box option (monthly prasadam from different temples)
- Cart, checkout, delivery tracking flows

**14. My Bookings Screen:**
- Tabs: Upcoming | Completed | Cancelled
- Booking cards: service name, temple, date, time, status badge, QR code thumbnail
- Tap to expand: full QR code, booking details, "Cancel" button (for upcoming)

**15. Volunteer Tab:**
- "Serve the Temple, Serve the Divine" hero
- Available opportunities: Annadhanam helper, Crowd management, Temple cleaning, Festival setup
- Filter by: Temple, Date, Type
- Opportunity card: title, temple, date, time, spots remaining, "Sign Up" button
- My Commitments: upcoming volunteer shifts
- My Hours: total hours served, certificates earned
- Leaderboard: top volunteers this month

**16. Profile Screen:**
- Avatar + name + phone
- Spiritual profile: Nakshatra, Rasi, Gothram
- Stats: Temples visited, Poojas booked, Donations made
- Connected temple
- Badges earned (visual grid)
- Settings: Language, Notifications, NRI mode (location toggle), Dark mode, Privacy
- My Family (link to D2)
- My Pilgrimages (link to D3)
- Bookmarks/Saved temples
- Payment methods
- Help & Support
- Logout

---

### D2 — Family/Kula Manager Screens

**Bottom Nav:** Same as D1 but Home shows Family Dashboard

**1. Family Dashboard:**
- "Your Family" header with family member avatars in a row
- Quick stats: X family members, Y total temple visits this year, Z poojas booked
- Each member card: name, relation, nakshatra, rasi, gothram, last temple visit
- "Add Family Member" button
- Today's family panchang (personalized for each member's nakshatra)

**2. Add/Edit Family Member:**
- Name, Relation (Father, Mother, Spouse, Son, Daughter, etc.), DOB, Nakshatra, Rasi, Gothram, Phone (optional)
- Save to family profile

**3. Book on Behalf:**
- Select family member(s) → Select temple → Select service → Pre-filled details from family profile → Pay → QR codes generated for each member

**4. Kula Theivam (Family Deity):**
- Register kula theivam: Temple name, Location (village), Deity, Gothram, Ancestral village, History/notes
- Annual ritual reminder
- Book remote ritual (archana, abhishekam) at kula theivam temple
- Prasadam delivery from kula theivam temple
- Family tree connection to kula theivam

**5. Family Visit Tracker:**
- Calendar view with visit markers per family member (color-coded)
- Collective family stats
- "Next family temple visit" planner

---

### D3 — Pilgrim/Traveler Screens

**Bottom Nav:** Home | Trails | Planner | Map | Profile

**1. Pilgrimage Home:**
- "Your Spiritual Journeys" header
- Active trip card (if any ongoing pilgrimage)
- Popular trails horizontal scroll:
  - Navagraha Temples (9) — Kumbakonam, TN
  - Pancha Bhoota Stalam (5) — across South India
  - Jyotirlinga (12) — Pan-India
  - Divya Desam (108) — Vishnu temples
  - Arupadai Veedu (6) — Murugan temples, TN
  - Pancha Sabhai (5) — Nataraja temples, TN
  - Ashta Lakshmi temples (8)
- My Progress: circular progress rings for each trail attempted
- Badges earned from completed pilgrimages

**2. Trail Detail Screen:**
- Trail name, description, total temples, estimated days
- Temple list with order/route
- Map with temple markers connected by route line
- "Start This Trail" button
- Difficulty/logistics info
- Best season to visit
- Budget estimate

**3. Route Planner:**
- Starting location input
- Selected trail or custom temple list
- Optimized route with driving/transit time between stops
- Day-wise itinerary auto-generated
- Add accommodation between stops
- Total trip duration and estimated cost
- "Share Itinerary" and "Download PDF" buttons

**4. Accommodation Search:**
- Temple choultry/guest house listings
- Nearby hotels (with ratings, price range)
- Filters: Price, Distance from temple, Rating, Amenities
- Booking CTA (external link or in-app for temple choultries)

**5. Trip Tracker (Active Pilgrimage):**
- Current trail progress (e.g., "4 of 9 Navagraha temples visited")
- Visual route with completed stops (green checkmarks) and remaining (grey)
- Check-in button at each temple (GPS validated)
- Photo capture per temple visit
- Journal/notes per stop
- Share trip progress on community

**6. Visited Temples Map:**
- India map with pins for all temples visited (color-coded by deity)
- Stats: Total temples visited, states covered, unique deities
- Filter by year, deity type, trail
- "Temple passport" visual with stamps

---

### Provider App — P1 Priest Screens

**Bottom Nav:** Home | Schedule | Requests | Scan QR | Profile

**1. Dashboard:**
- "Vanakkam, Sharma Iyyer" greeting
- Today's summary: X rituals scheduled, Y home bookings, ₹Z earnings today
- Next upcoming ritual card with countdown
- Quick actions: "Mark Available" toggle, "View Earnings", "Scan QR"
- Rating: 4.8/5 (120 reviews)
- This month's stats chart (bookings trend)

**2. Today's Schedule:**
- Timeline view with all today's commitments:
  - 6:00 AM — Morning Pooja (Meenakshi Temple) — Temple duty
  - 9:30 AM — Ganapathy Homam (Home booking — Mr. Ramesh, Anna Nagar)
  - 4:00 PM — Evening Archana (Meenakshi Temple) — Temple duty
  - 6:30 PM — Satyanarayana Pooja (Home booking — Mrs. Priya, KK Nagar)
- Each card: time, service, location (temple/home address), devotee name, amount
- Navigation button for home bookings (opens maps)

**3. Incoming Requests:**
- New booking request cards:
  - Service: Griha Pravesham
  - Devotee: Karthik, phone
  - Location: Address
  - Date/Time: March 25, 9:00 AM
  - Amount: ₹2,500
  - "Accept" (green) / "Decline" (red) buttons
- Request expiry timer (accept within 30 min)

**4. Scan QR Screen:**
- Camera viewfinder for QR scanning
- "Scan devotee's booking QR code"
- After scan: shows booking details (devotee name, service, nakshatra, gothram, rasi)
- "Start Ritual" button
- "Complete" button after ritual done
- Manual entry fallback (enter booking ID)

**5. Availability Calendar:**
- Week view with time slots
- Toggle available/unavailable per slot
- Blocked slots for temple duties
- Available for home bookings (green slots)
- Recurring availability setting

**6. Earnings Screen:**
- Today: ₹3,500
- This week: ₹18,000
- This month: ₹72,000
- Breakdown: Temple duties vs Home bookings vs Tips
- Transaction list with dates
- "Withdraw to Bank" button
- Payout history

---

### Provider App — P2 Astrologer Screens

**Bottom Nav:** Home | Schedule | Consult | Tools | Profile

**1. Dashboard:**
- Today's consultations count, earnings, rating
- Next consultation card with client info and countdown
- Availability toggle
- Weekly earnings chart
- Reviews highlight

**2. Today's Consultations:**
- Timeline of scheduled sessions
- Each: client name, type (Video/Chat/Phone), time, topic, duration, amount
- "Start Session" button (goes live at scheduled time)
- "View Jathakam" for prepared clients

**3. Consultation Session Screen:**
- Video call UI (placeholder)
- Client info sidebar: name, DOB, nakshatra, rasi, gothram
- Quick tools: panchang lookup, nakshatra calculator
- Notes text area
- Session timer
- "End Consultation" button
- Post-session: rating request, notes save, recommendation (suggest temple/pooja as remedy)

**4. Tools Screen:**
- Jathakam Generator: enter DOB, time, place → birth chart
- Horoscope Matching: enter two profiles → 10 porutham result
- Muhurtham Calculator: event type + date range → suggested dates
- Panchang lookup: any date → full panchang details
- Navagraha temple suggestion: select graha dosha → nearest navagraha temple

**5. Client History:**
- Past consultation list
- Client profiles with notes
- Follow-up reminders
- Recommended remedies tracking

---

### Temple Admin Panel (Responsive Web — Desktop + Mobile)

**Layout:** Sidebar navigation on desktop (collapsible), bottom nav on mobile. Role-based menu (T1 sees all, T2/T3 see limited).

**Login:** Email/username + password → role selection → dashboard

**Sidebar Menu (T1 — Full Access):**
- Dashboard
- Bookings (with QR verification sub-tab)
- Donations & 80G
- Services Catalog
- Darshan Queue
- Events
- Annadhanam
- Feed / Posts
- Gallery
- Priests
- Users / Devotees
- Feedback & Reviews
- Notifications
- Reports & Analytics
- Settings

**1. Dashboard:**
- KPI cards: Today's bookings, Today's donations (₹), Active darshan tokens, Upcoming events
- Revenue chart (line — last 30 days)
- Bookings by service (pie chart)
- Recent bookings table (last 10)
- Recent donations table (last 10)
- System alerts (unread feedback, pending approvals)

**2. Bookings Management:**
- Table view: Booking ID, Devotee, Service, Date, Amount, Status, QR Code
- Filters: Date range, Service type, Status (Confirmed/Pending/Cancelled)
- Status update buttons (Confirm, Cancel, Complete)
- QR Verification sub-tab: scan or enter booking ID → show details → mark as used
- Export to CSV/PDF

**3. Donations & 80G:**
- Donation list: Donor, Amount, Type, Date, Temple, 80G issued (Y/N)
- Generate 80G receipt button (auto-fill donor PAN if provided)
- Hundi management: physical hundi count entry, date, amount
- Donation analytics: type breakdown, monthly trends, top donors
- Export reports

**4. Services Catalog:**
- Add/Edit/Delete services (Archana, Abhishekam, Homam, etc.)
- Per service: Name, Category, Price, Duration, Availability (Daily/Specific days), Max bookings/day, Description
- Enable/disable toggle
- Festival/special pricing override

**5. Darshan Queue:**
- Today's tokens: issued, used, remaining by slot
- Real-time queue position display
- Slot management: add/edit time slots, capacity per slot
- VIP/priority slot settings
- Live queue status board (for display screens at temple)

**6. Events Management:**
- Calendar view + list view
- Create event: Title, Type, Date(s), Description, Image, RSVP limit, Volunteer needs
- Multi-day event support
- Push notification to followers on event creation

**7. Annadhanam Management:**
- Daily schedule: date, meal type (breakfast/lunch/dinner), expected count, sponsor name
- Sponsorship tracking: upcoming sponsored days, amount received
- Inventory: rice, dal, oil, vegetables — stock levels, reorder alerts
- Photo/video upload (sent to sponsor)

**8. Feed / Posts:**
- Create post: title, content, image/video, category (Update/Festival/Daily)
- Published/Draft/Scheduled tabs
- Post analytics (likes, comments, shares)

**9. Reports & Analytics:**
- Booking reports: daily/weekly/monthly, by service, revenue
- Donation reports: by type, recurring vs one-time, 80G report
- Footfall analytics: daily visitor count, peak hours
- Revenue dashboard: total, by source (bookings, donations, shop)
- Export all reports as PDF/CSV

**10. Settings:**
- Temple profile: name, address, deity, timings, description, images
- Notification templates
- Payment gateway settings
- Staff management (add T2/T3 users)
- Language preferences

---

### Super Admin Panel (Responsive Web)

**Sidebar Menu (S1 — Full Access):**
- Platform Dashboard
- Temple Management (Onboarding/Approval)
- Temple Admins
- Users (Devotees)
- Service Providers (Priests/Astrologers)
- Bookings (All Temples)
- Finance & Revenue
- Content Moderation
- Support Tickets
- Notifications (Broadcast)
- Reports
- Platform Settings

**1. Platform Dashboard:**
- KPI cards: Total temples (active/pending), Total devotees, Total providers, Monthly GMV, Platform commission earned
- Temple onboarding pipeline (pending → approved → live)
- Revenue trend chart (last 12 months)
- Active users chart (DAU/MAU)
- Geographic heat map of temple density
- System health alerts

**2. Temple Onboarding:**
- Application queue: temple name, location, deity, submitted by, date
- Review application: verify details, temple photos, trust documents
- Approve / Reject with reason
- Approved temples list with status (active/suspended)

**3. Provider Verification:**
- Priest applications: name, temple affiliation, qualifications, experience
- Astrologer applications: name, specialization, certificates
- Verify / Reject with reason
- Active providers with rating, bookings, earnings

**4. Finance & Revenue:**
- Platform commission tracker
- Temple-wise revenue breakdown
- Payout management to temples and providers
- Transaction log
- Refund management
- Monthly financial reports

**5. Support Tickets (S2 — Support Staff primary):**
- Ticket queue: ID, user, issue type, priority, status, assigned to
- Issue types: Booking issue, Payment failed, Refund request, Temple complaint, Provider complaint
- Chat/resolution interface
- SLA tracking

---

## DUMMY DATA

### Temples (Tamil Nadu Focus)
```
Meenakshi Amman Temple — Madurai — Devi — Rating 4.8 — 2,450 reviews — Open 5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM
Tirumala Venkateswara — Tirupati, AP — Vishnu — Rating 4.9 — 5,200 reviews
Brihadeeswarar Temple — Thanjavur — Shiva — Rating 4.7 — 1,800 reviews — UNESCO Heritage
Chidambaram Nataraja — Chidambaram — Shiva — Rating 4.8 — 1,600 reviews
Palani Murugan Temple — Palani — Murugan — Rating 4.7 — 2,100 reviews
Ranganathaswamy Temple — Srirangam — Vishnu — Rating 4.8 — 1,900 reviews
Ramanathaswamy Temple — Rameswaram — Shiva — Rating 4.7 — 2,300 reviews
Kapaleeshwarar Temple — Chennai — Shiva — Rating 4.6 — 1,200 reviews
Kanchi Kamakshi — Kanchipuram — Devi — Rating 4.7 — 1,100 reviews
Navagraha Temple (Surya) — Suryanar Kovil — Navagraha — Rating 4.5 — 650 reviews
Pillayarpatti Karpaga Vinayagar — Sivaganga — Ganesh — Rating 4.6 — 800 reviews
Thiruvannamalai Arunachaleswarar — Tiruvannamalai — Shiva — Rating 4.8 — 2,000 reviews
```

### Users (Dummy)
```
Ramesh Kumar — 42, IT Professional, Regular Devotee — Connected: Kapaleeshwarar Temple
Lakshmi Devi — 58, Homemaker, Family Manager — manages family of 5, Kula Theivam: Sri Kaliamman Temple
Karthik Sundaram — 35, NRI Singapore, Regular Devotee — NRI mode ON, donates monthly
Meera Shankar — 28, Teacher, Pilgrim — completed 6/9 Navagraha temples
Priya Rajendran — 32, Software Engineer, Volunteer — 48 volunteer hours this year
Suresh Babu — 65, Retired, Regular Devotee — booked 23 poojas this year
```

### Priests (Dummy)
```
Sri Venkatesh Sharma — 52, Meenakshi Temple — Specializes in Devi poojas, Homam — Rating 4.9 — 85 home bookings
Sri Raghavan Iyyer — 48, Kapaleeshwarar Temple — All Shiva rituals, Rudrabhishekam — Rating 4.7 — 62 home bookings
Sri Ganesh Bhattar — 38, Kanchi Kamakshi — Archana, Abhishekam — Rating 4.8 — 45 home bookings
```

### Astrologers (Dummy)
```
Jothidar Murugavel — 55, Vedic astrology, 30 years exp — Rating 4.8 — ₹500/session — 120 consultations
Pandit Shanmugam — 42, Nadi astrology, KP system — Rating 4.6 — ₹750/session — 85 consultations
Jothidar Kamala Devi — 50, Horoscope matching, Muhurtham — Rating 4.9 — ₹400/session — 200 consultations
```

### Services (Common across temples)
```
Archana — ₹50 — 10 min — Daily
Special Archana — ₹100 — 15 min — Daily
Abhishekam — ₹500 — 30 min — Daily
Sahasranama Archana — ₹200 — 20 min — Daily
Homam (Fire Ritual) — ₹2,000 — 1 hour — On request
Ganapathy Homam — ₹1,500 — 45 min — Tuesdays, Fridays
Navagraha Pooja — ₹300 — 20 min — Saturdays
Annadhanam Sponsorship — ₹500 (10 meals) — Daily
VIP Darshan Token — ₹200 — Morning/Evening slots
```

### Home Booking Services (Priest marketplace)
```
Griha Pravesham (House Warming) — ₹5,000 — 2 hours
Satyanarayana Pooja — ₹3,500 — 1.5 hours
Ganapathy Homam — ₹2,500 — 1 hour
Navagraha Shanti — ₹3,000 — 1 hour
Vehicle Pooja (New Car) — ₹1,000 — 30 min
Seemantham (Baby Shower) — ₹3,500 — 1.5 hours
Namakaranam (Naming) — ₹2,000 — 45 min
Ayush Homam (Birthday) — ₹2,500 — 1 hour
Tharpanam — ₹1,500 — 45 min
Vastu Pooja — ₹3,000 — 1 hour
```

---

## BUILD INSTRUCTIONS

1. **Start with `shared/` folder** — design system, phone frame, components, animations, nav engine
2. **Build `landing/` page** — app selector grid
3. **Build `devotee-app/common/`** — splash, login, type selection
4. **Build each devotee type in this priority:**
   - D1 (Regular Devotee) — MOST screens, core experience
   - D2 (Family Manager) — unique family dashboard
   - D3 (Pilgrim) — unique trail/map experience
5. **Build `provider-app/`** — P1 Priest, P2 Astrologer
6. **Build `temple-admin/`** — responsive web dashboard
7. **Build `super-admin/`** — responsive web dashboard

### Per Mobile User Type:
- **index.html** — app shell with phone frame, links shared CSS/JS + own CSS/JS
- **styles.css** — type-specific overrides
- **app.js** — all screens as JS template literals in `screens` object, dummy data, navigation

### Per Web Dashboard:
- **index.html** — responsive shell with sidebar + main content area
- **styles.css** — dashboard-specific styles
- **app.js** — all views as JS template literals, role-based menu, charts, tables

### Quality Checklist:
- [ ] Every button/link has an onclick handler (navigate or alert)
- [ ] All data is hardcoded — NO API calls
- [ ] Theme toggle (light/dark) works on every screen
- [ ] Phone frame visible on desktop, full-screen on mobile
- [ ] Smooth transitions between screens (animate.css + custom)
- [ ] Bottom nav highlights correct tab
- [ ] Back button works (screenHistory stack)
- [ ] Filter chips toggle active state
- [ ] Charts render correctly (Chart.js) in admin panels
- [ ] Tamil text used where culturally appropriate (greetings, temple names, panchang)
- [ ] Font Awesome icons used consistently (NO emoji in final prototype)
- [ ] All prices in ₹ with realistic rates
- [ ] QR code screens show styled QR placeholder with booking details
- [ ] Responsive admin panels work on both desktop and mobile
- [ ] prefers-reduced-motion respected for all animations

---

## DESIGN GUIDELINES

1. **Temple aesthetic:** Warm saffron tones, golden accents, subtle mandala/kolam patterns as background decorations. NOT gaudy — premium and modern with cultural roots.
2. **Indian design patterns:** ₹ symbol, UPI logo, phone format (+91), Tamil greetings (வணக்கம்), Tamil Nadu location references, 80G tax awareness.
3. **QR archana is the hero:** The book-pooja → QR-code flow should feel magical. Golden border on QR, celebration animation on generation, easy to screenshot/share.
4. **Sacred color meanings:** Saffron = devotion, Gold = prosperity, Red = kumkum/auspicious, Green = tulsi/auspicious, Blue = Krishna/divine. Use colors meaningfully.
5. **Trust signals:** "Verified Temple" badge, "Platform Secured Payment", priest ratings, 80G receipt assurance, transparent donation tracking.
6. **Vernacular touch:** Use Tamil names for nakshatras, rasis, poojas. Show both Tamil and English where appropriate. Noto Sans Tamil font for Tamil text.
7. **Accessibility:** Min touch target 44px, sufficient color contrast, motion-reduced alternatives, readable font sizes.
8. **Admin professionalism:** Clean tables, proper data formatting, chart-driven insights, export buttons, role-based access visuals.

---

*Prompt created: March 2026*
*Project: Soruban Temple — Prototype v1*
