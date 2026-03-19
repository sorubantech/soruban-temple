# Soruban Temple - Product Brainstorming Document

> **Vision**: A unified digital platform connecting Hindu temples and devotees — temple management SaaS + devotee super-app.

> **Related Documents:**
> - [COMPETITIVE-ANALYSIS.md](COMPETITIVE-ANALYSIS.md) — Detailed competitor analysis, market sizing, SWOT, positioning strategy

---

## WHAT EXISTS IN PROTOTYPE (Hindu Temple/)

The developer has already built HTML prototypes covering:

### Devotee App (Mobile)
| Feature | Page | Status |
|---------|------|--------|
| Splash + Auth | index.html, login.html | Done |
| Home Dashboard | home.html | Done |
| Temple Browsing (list, detail, categories, district filter) | temple-list.html, temple-details.html | Done |
| Book Pooja (archana sheet digitized) | book-pooja.html | Done |
| Daily Pooja Schedule | daily-pooja.html | Done |
| Homam Booking | homam-booking.html | Done |
| Darshan Token (virtual queue) | darshan-token.html | Done |
| Live Darshan (video streaming) | live-darshan.html | Done |
| Donation (multiple types + online payment) | donation.html | Done |
| Annadhanam Sponsorship | annadhanam.html | Done |
| Mottai (Tonsure) Booking | motta-booking.html | Done |
| Kula Theivam (Family Deity) Registration + Rituals | kula-theivam.html | Done |
| Rasi Palan (Horoscope) | rasi-palan.html | Done |
| Nalla Neram (Auspicious Time) | nalla-neram.html | Done |
| Prasadam Shop (E-commerce) | prasadam-shop.html | Done |
| Events Calendar | events.html | Done |
| Community Forum | community.html | Done |
| Social Feed | feed.html | Done |
| User Profile | profile.html | Done |
| My Bookings | my-bookings.html | Done |
| Order History | order-history.html | Done |
| Family Booking | family-booking.html | Done |

### Temple Admin Panel
| Feature | Page |
|---------|------|
| Dashboard (analytics) | admin/dashboard.html |
| Temple Management | admin/temples.html |
| Pooja/Service Catalog | admin/poojas.html |
| Booking Management | admin/bookings.html |
| Donation Tracking | admin/donations.html |
| Darshan Queue | admin/darshan.html |
| Events Management | admin/events.html |
| Feed/Content | admin/feed.html |
| Gallery | admin/gallery.html |
| Annadhanam | admin/annadhanam.html |
| User Management | admin/users.html |
| Feedback & Reviews | admin/feedback.html |
| Notifications | admin/notifications.html |
| Prasadam Orders | admin/prasadam-orders.html |
| Reports | admin/reports.html |
| Settings | admin/settings.html |
| Admin Accounts | admin/admin-accounts.html |

### Super Admin (Platform Owner)
| Feature | Page |
|---------|------|
| Dashboard | super-admin/dashboard.html |
| Temple Onboarding & Approval | super-admin/temples.html |
| Temple Admin Management | super-admin/temple-admins.html |
| User Management (block/unblock) | super-admin/users.html |
| Booking Overview | super-admin/bookings.html |
| Finance & Revenue | super-admin/finance.html |
| Content Moderation | super-admin/content.html |
| App Management | super-admin/app-management.html |
| Notifications (broadcast) | super-admin/notifications.html |
| Reports & Analytics | super-admin/reports.html |

---

## NEW FEATURES TO ADD (Brainstormed)

### Priority 1 — Core Differentiators

#### 1. Priest/Iyyer Marketplace & Home Booking
- **Priest profiles**: name, photo, specialization, experience, languages, temple affiliation, ratings
- **Home festival booking**: griha pravesham, satyanarayana pooja, seemantham, namakaranam, upanayanam
- **Availability calendar** with real-time slot booking
- **Video consultation** for ritual guidance, muhurtham discussion
- **Multi-priest booking** for large events (yagnas, kalyanam)
- **Recurring bookings**: weekly/monthly homam at home
- **Price transparency**: fixed rates per service, no bargaining
- **Rating & review system** per priest per service
- **Revenue model**: Platform takes commission (10-15%) per booking

#### 2. Astrologer Integration
- **Astrologer profiles**: qualifications, specialization (vedic, nadi, KP), ratings
- **Services**: jathakam generation, horoscope matching (10 porutham), muhurtham calculation
- **Live consultation**: video/audio/chat with slot booking
- **Automated tools**: panchang, rahu kalam, yamagandam, nalla neram (already exists)
- **Remedy recommendations**: suggest specific temples/poojas based on graha dosha
- **Navagraha temple routing**: auto-suggest nearest navagraha temples for specific planetary remedies
- **Revenue model**: Commission per consultation + premium subscription for advanced features

#### 3. Temple Visit Tracker & Spiritual Journey
- **Check-in at temples** (GPS-based or QR code scan)
- **Visit history** with dates, photos, notes
- **"Temples I've Visited" map** visualization
- **Pilgrimage progress**: track Jyotirlinga (12), Divya Desam (108), Pancha Bhoota Stalam (5), Navagraha (9)
- **Annual spiritual summary** (year in review)
- **Family visit log**: track whole family's temple visits

#### 4. QR-Based Archana Sheet (Your Original Idea)
- Devotee selects temple → picks archana/pooja → fills name, nakshatra, gothram, rasi
- **Online payment** via UPI/card
- **QR code generated** → show to priest at counter
- Priest scans QR → sees all details → performs archana
- **No paper forms needed** → faster, no language barrier
- **Pre-filled profiles**: save family members' details for quick repeat bookings
- **Bulk archana**: book for multiple family members in one go

#### 5. Nearby Temple Discovery (Location-Based)
- **GPS-based nearest temples** with distance, ratings, crowd level
- **"Open Now" filter** based on temple timings
- **Navigation integration** (Google Maps / Apple Maps)
- **Crowd indicator**: Low / Medium / High (based on token bookings + check-ins)
- **"Best Time to Visit" recommendations** based on historical data
- **Temple amenities info**: parking, wheelchair access, restrooms, prasadam counter

---

### Priority 2 — Engagement & Retention

#### 6. Gamification & Devotee Engagement
- **Daily prayer streak** counter
- **Temple visit streaks** (weekly/monthly)
- **Badges system**:
  - "Navagraha Yatri" — visited all 9 Navagraha temples
  - "Jyotirlinga Pilgrim" — visited all 12
  - "108 Temple Explorer" — visited 108 temples
  - "Generous Donor" tiers (Bronze/Silver/Gold/Platinum)
  - "Festival Devotee" — participated in X festivals
  - "Volunteer Champion" — volunteered at X events
  - "Sloka Scholar" — learned X slokas
- **Points system**: earn points for visits, bookings, donations → redeem for prasadam, free archana
- **Seasonal challenges**: Navaratri 9-day challenge, Karthigai Deepam challenge, Margazhi month challenge
- **Referral rewards**: invite friends and earn bonus points

#### 7. Fasting & Vrat Tracker
- Track fasting days: Ekadashi, Pradosham, Pournami, Amavasai, Sankatahara Chaturthi
- **Reminders** the day before
- **Fasting recipes** and do's/don'ts
- **Community fasting**: see how many devotees are fasting today
- **Streak tracking**: consecutive Ekadashi fasts, etc.

#### 8. Sloka & Mantra Learning
- **Daily sloka** with meaning, transliteration, audio pronunciation
- **Learn by category**: Vishnu Sahasranamam, Lalitha Sahasranamam, Hanuman Chalisa, etc.
- **Progress tracker**: mark slokas as "learned"
- **Audio playback** with adjustable speed
- **AI pronunciation coach** (future): speech recognition for chanting practice
- **Japa mala counter**: digital counter for mantra repetition (108 count)

#### 9. Festival Content & Stories
- **Festival explainers**: significance, rituals, recipes, stories behind each festival
- **Countdown timers** for upcoming festivals
- **Festival-specific live streams** from temples
- **Photo/video sharing** during festivals (community)
- **Regional festival tracking**: not just pan-Indian — village-level utsavam alerts

---

### Priority 3 — Revenue & Growth Features

#### 10. Enhanced E-Commerce
- **Prasadam subscription box**: monthly delivery from different famous temples
- **Puja samagri kits**: complete sets for specific home pujas
- **Religious items**: rudraksha, tulsi mala, deity idols, panchaloha items
- **Temple-branded merchandise**: calendars, photos, books
- **Digital products**: downloadable mantras, stotram audio, e-books
- **Festival special bundles**: Deepavali puja kit, Navaratri golu set, etc.
- **Track delivery** with real-time status

#### 11. Accommodation & Travel
- **Temple choultry/guest house booking** with photos, amenities
- **Nearby hotel aggregation** with booking referrals (affiliate revenue)
- **Pilgrimage route planner**: multi-temple trip optimizer
- **Group pilgrimage packages**: curated yatra (Char Dham, Pancha Bhoota, etc.)
- **Transport info**: bus/train/flight options for temple towns
- **Local auto/taxi booking integration**

#### 12. Matrimonial (Community Feature)
- **Temple-community verified profiles**
- **Horoscope matching built-in** (10 porutham)
- **Gothram, nakshatra, rasi-based search**
- **Priest-mediated introduction** option
- **Revenue model**: Premium listing + verification fee

#### 13. Volunteer Management
- **Volunteer registration** with skill/interest profiling
- **Event-wise volunteer signup** (annadhanam help, crowd management, cleaning)
- **Hours tracking** and certificate generation
- **Volunteer leaderboard** and recognition
- **Shift scheduling** for regular temple service

---

### Priority 4 — Advanced & Future Features

#### 14. AI & Smart Features
- **Temple chatbot**: answer queries about timings, dress code, parking, darshan type
- **Personalized recommendations**: suggest temples/poojas based on user's nakshatra, current dasha period
- **Crowd prediction** (ML-based): predict crowd levels for upcoming festivals
- **Smart notifications**: "Pradosham tomorrow — your regular Shiva temple has 30% fewer bookings in evening slot"
- **Voice-activated puja assistant**: hands-free sloka prompting during home puja
- **AR temple tour**: point phone at gopuram for augmented info overlay

#### 15. Government & Compliance Integration
- **HR&CE reporting** format compliance (Tamil Nadu)
- **80G tax receipt** auto-generation for donations
- **Devasthanam board** darshan ticket integration
- **Audit trail** maintenance for inspections
- **Temple property register** (public portion)
- **NRI donation** compliance (FCRA if applicable)

#### 16. Education & Content Platform
- **Bhagavad Gita**: chapter-by-chapter with audio, translation, commentary
- **Temple architecture guide**: iconography, history, significance
- **Kids section**: animated mythological stories, quizzes, coloring
- **Scholar video lectures** and discourse series
- **Guided meditation** (deity-specific)
- **Temple soundscapes**: ambient bells, nadaswaram for meditation at home

#### 17. Safety & Emergency
- **Emergency SOS** during crowded festivals
- **Lost person alert** (children/elderly) with photo broadcast
- **Medical info**: nearest hospital, first aid stations
- **Evacuation route display** on temple map
- **Family member location sharing** during events

#### 18. Digital Seva (Social Good Tracking)
- **Good deed tracker**: feed a homeless person, plant a tree, help at old age home
- **Temple-organized seva events**: blood donation camp, food distribution
- **Karma points** system (separate from gamification — purely social good)
- **Corporate volunteer matching** for CSR programs

---

## REVENUE MODEL

| Stream | Type | Est. % of Revenue |
|--------|------|-------------------|
| Pooja/Service booking commission (5-15%) | Transaction | 30% |
| Priest/Astrologer marketplace commission (10-15%) | Transaction | 15% |
| Premium subscription (ad-free, advanced features) | Recurring | 15% |
| E-commerce margins (prasadam, religious items) | Transaction | 15% |
| Convenience fees (fast-track darshan, accommodation) | Transaction | 10% |
| Donation processing fee (1-2%) | Transaction | 5% |
| Featured temple listings / advertising | Advertising | 5% |
| White-label licensing to temple boards | Enterprise | 5% |

---

## TECHNICAL ARCHITECTURE (Recommended)

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
├──────────────┬──────────────┬───────────────────────┤
│ Mobile App   │ Temple Admin │ Super Admin Dashboard  │
│ (React Native│ (React Web)  │ (React Web)           │
│  or Flutter) │              │                       │
├──────────────┴──────────────┴───────────────────────┤
│                   API GATEWAY                        │
├─────────────────────────────────────────────────────┤
│                 MICROSERVICES                         │
├────────┬────────┬────────┬────────┬────────┬────────┤
│ Auth   │Temple  │Booking │Payment │Content │Notifi- │
│Service │Service │Service │Service │Service │cation  │
├────────┴────────┴────────┴────────┴────────┴────────┤
│                   DATABASES                          │
├──────────────┬──────────────┬───────────────────────┤
│ PostgreSQL   │ Redis Cache  │ S3 (Media Storage)    │
│ (Primary DB) │              │                       │
├──────────────┴──────────────┴───────────────────────┤
│              THIRD-PARTY INTEGRATIONS                │
├────────┬────────┬────────┬────────┬────────┬────────┤
│Razorpay│Firebase│Google  │Twilio  │AWS     │Live    │
│/Stripe │ Push   │Maps    │ SMS    │Services│Stream  │
└────────┴────────┴────────┴────────┴────────┴────────┘
```

---

## USER PERSONAS

### 1. Devotee (Primary User)
- **Age**: 25-65
- **Needs**: Book poojas, find temples, donate, track spiritual journey
- **Pain point**: Standing in queues, paper archana forms, not knowing temple timings
- **Device**: Android (70%), iOS (30%)

### 2. Temple Admin/Staff
- **Role**: Manages day-to-day temple operations
- **Needs**: Manage bookings, track donations, update events, respond to devotees
- **Pain point**: Manual record keeping, cash management, no analytics

### 3. Priest/Iyyer
- **Role**: Performs rituals at temple and homes
- **Needs**: Manage availability, receive bookings, get paid digitally
- **Pain point**: Irregular income, no online presence, word-of-mouth only

### 4. Astrologer/Josiyar
- **Role**: Provides astrological consultations
- **Needs**: Online consultation platform, client management
- **Pain point**: Limited to local reach, no digital booking system

### 5. Super Admin (Soruban - Platform Owner)
- **Role**: Manages entire platform
- **Needs**: Onboard temples, monitor quality, track revenue, handle disputes
- **Goal**: Scale to 1000+ temples, build trusted brand

---

## COMPETITIVE LANDSCAPE

| Competitor | What They Do | Our Advantage |
|-----------|-------------|---------------|
| Devasmriti | Temple booking | We have full ecosystem (priest, astrologer, community) |
| MyMandir | Donation app | We offer temple management SaaS too |
| Pujabooking.com | Online pooja | We have offline-to-online QR integration |
| Temple apps (individual) | Single temple | We're a unified platform for all temples |
| WhatsApp groups | Community | We provide structured, moderated temple community |

**Our Unique Edge:**
1. **QR-based archana** (eliminates paper forms)
2. **Priest + Astrologer marketplace** (home services)
3. **Temple visit gamification** (pilgrimage tracking)
4. **Unified platform** (one app for all temples)
5. **Location-based discovery** (find nearest temple with crowd info)
6. **Kula Theivam management** (unique family deity tracking)

---

## PHASED ROLLOUT PLAN

### Phase 1 — MVP (3 months)
- Devotee registration & profile
- Temple listing with search/filter (location, deity, district)
- Pooja booking with QR code generation
- Online donation with 80G receipt
- Darshan token (virtual queue)
- Temple admin panel (basic: bookings, donations, events)
- Push notifications

### Phase 2 — Growth (3 months)
- Priest/Iyyer marketplace & home booking
- Astrologer consultation (chat + video)
- Live darshan streaming
- Prasadam shop & delivery
- Community forum & social feed
- Annadhanam sponsorship
- Temple visit check-in & tracker

### Phase 3 — Engagement (3 months)
- Gamification (badges, streaks, points)
- Sloka learning & japa counter
- Festival content & stories
- Fasting/vrat tracker
- Accommodation booking
- Pilgrimage planner
- Volunteer management

### Phase 4 — Scale (3 months)
- AI chatbot & smart recommendations
- Multi-language (Tamil, Hindi, Telugu, Kannada, Malayalam)
- Government integration (HR&CE)
- Matrimonial section
- Advanced analytics & ML-based crowd prediction
- White-label solution for temple boards
- AR temple tour (experimental)

---

## KEY METRICS TO TRACK

| Metric | Target (Year 1) |
|--------|-----------------|
| Registered Devotees | 50,000+ |
| Onboarded Temples | 500+ |
| Monthly Active Users | 15,000+ |
| Monthly Bookings | 5,000+ |
| Monthly Donations Processed | ₹10L+ |
| Priest/Astrologer Consultations | 500+/month |
| App Store Rating | 4.5+ |
| Devotee Retention (30-day) | 40%+ |

---

*Document created: March 2026*
*Project: Soruban Temple — Temple Digital Platform*
*Status: Brainstorming Phase*
