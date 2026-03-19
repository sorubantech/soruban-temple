# Temple Digital App - Database Design Document

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEMPLE DIGITAL PLATFORM                       │
├──────────────────┬──────────────────┬──────────────────-────────┤
│   User App       │   Temple Admin   │   Super Admin             │
│   (Devotee)      │   (Staff)        │   (Platform Owner)        │
├──────────────────┴──────────────────┴───────────────────────────┤
│                   localStorage (Client-Side DB)                  │
│                   53 Keys | 3 Modules                            │
└─────────────────────────────────────────────────────────────────┘
```

**Storage Engine:** Browser localStorage (JSON serialized)
**Total Keys:** 53
**Data Isolation:** Prefix-based (`sa_` = Super Admin, `admin_` = Temple Admin, `temple_` = User App)

---

## 1. USER APP TABLES (14 Keys)

### 1.1 `temple_user` — User Profile

| Field       | Type    | Description                  | Example                    |
|-------------|---------|------------------------------|----------------------------|
| name        | String  | Display name                 | "Ramesh Kumar"             |
| email       | String  | Email address                | "ramesh@gmail.com"         |
| phone       | String  | Phone number                 | "9876543210"               |
| loggedIn    | Boolean | Authentication status        | true                       |

```json
{
  "name": "Ramesh Kumar",
  "email": "ramesh@gmail.com",
  "phone": "9876543210",
  "loggedIn": true
}
```

---

### 1.2 `temple_bookings` — Bookings (SHARED: User + Admin + Super Admin)

| Field          | Type    | Description                  | Example                     |
|----------------|---------|------------------------------|-----------------------------|
| id             | Number/String | Unique booking ID      | 1710234567890 / "BK-1001"  |
| type           | String  | Booking category             | "Pooja" / "Family Function" / "Darshan" / "Motta" / "kula_theivam_ritual" |
| pooja          | String  | Service name                 | "Abhishekam"               |
| name           | String  | Devotee name                 | "Ramesh Kumar"             |
| date           | String  | Booking date                 | "2026-03-15"               |
| price          | Number  | Amount in INR                | 500                        |
| status         | String  | Current status               | "Confirmed" / "Pending Approval" / "Rejected" / "Cancelled" |
| rasi           | String  | Zodiac sign (optional)       | "Mesham"                   |
| gothram        | String  | Family gothram (optional)    | "Kashyapa"                 |
| nakshatram     | String  | Birth star (optional)        | "Ashwini"                  |
| temple         | String  | Temple name (optional)       | "Meenakshi Amman Temple"   |
| phone          | String  | Contact number (optional)    | "9876543210"               |
| ritualName     | String  | KT ritual name (optional)    | "Thanigai Pooja"           |
| isRemote       | Boolean | Remote seva flag (optional)  | true                       |
| videoRequested | Boolean | Video requested (optional)   | true                       |
| prasadamDelivery | Boolean | Courier prasadam (optional)| false                      |
| bookedAt       | String  | ISO timestamp                | "2026-03-12T10:30:00.000Z" |

```json
[
  {
    "id": 1710234567890,
    "pooja": "Abhishekam",
    "price": 500,
    "name": "Ramesh Kumar",
    "date": "2026-03-15",
    "rasi": "Mesham",
    "gothram": "Kashyapa",
    "nakshatram": "Ashwini",
    "status": "Confirmed"
  },
  {
    "id": "BK-1005",
    "type": "Family Function",
    "name": "Lakshmi Devi",
    "phone": "9876543211",
    "date": "2026-04-10",
    "functionType": "Temple Marriage",
    "guests": 150,
    "temple": "Meenakshi Amman Temple",
    "price": 25000,
    "status": "Pending Approval"
  }
]
```

---

### 1.3 `temple_donations` — Donations (SHARED: User + Admin + Super Admin)

| Field      | Type   | Description              | Example                    |
|------------|--------|--------------------------|----------------------------|
| id         | Number | Unique donation ID       | 1710234567890              |
| amount     | Number | Donation amount in INR   | 5000                       |
| type       | String | Donation category        | "Annadhanam" / "General" / "Temple" / "Temple Maintenance" |
| date       | String | Donation date            | "3/12/2026"                |
| donorName  | String | Donor's name             | "Ramesh Kumar"             |
| donorEmail | String | Donor's email            | "ramesh@gmail.com"         |
| temple     | String | Associated temple        | "Tirumala Venkateswara"    |

```json
[
  {
    "id": 1710234567890,
    "amount": 5000,
    "type": "Annadhanam",
    "date": "3/12/2026",
    "donorName": "Ramesh Kumar",
    "donorEmail": "ramesh@gmail.com",
    "temple": "Meenakshi Amman Temple"
  }
]
```

---

### 1.4 `selected_temple` — Currently Selected Temple

| Field    | Type   | Description              | Example                       |
|----------|--------|--------------------------|-------------------------------|
| id       | String | Temple identifier        | "meenakshi"                   |
| name     | String | Temple name              | "Meenakshi Amman Temple"      |
| location | String | Temple location          | "Madurai, Tamil Nadu"         |
| category | String | Deity category           | "devi"                        |
| deity    | String | Main deity               | "Meenakshi Amman"             |
| timings  | Object | Morning/evening hours    | { morning: "5:00-12:30", evening: "4:00-9:30" } |
| rating   | Number | Average rating           | 4.8                           |
| reviews  | Number | Total reviews            | 2450                          |

```json
{
  "id": "meenakshi",
  "name": "Meenakshi Amman Temple",
  "location": "Madurai, Tamil Nadu",
  "category": "devi",
  "deity": "Meenakshi Amman",
  "timings": { "morning": "5:00 AM - 12:30 PM", "evening": "4:00 PM - 9:30 PM" },
  "rating": 4.8,
  "reviews": 2450
}
```

---

### 1.5 `temple_likes` — Liked/Favorited Temples

```json
["meenakshi", "tirumala", "chidambaram"]
```

### 1.6 `temple_following` — Followed Temples

```json
["meenakshi", "tirumala"]
```

### 1.7 `temple_reviews` — Temple Reviews

| Field     | Type   | Description        | Example              |
|-----------|--------|--------------------|----------------------|
| [templeId]| Array  | Reviews per temple | Array of review objects |

```json
{
  "meenakshi": [
    { "user": "Ramesh", "rating": 5, "text": "Beautiful temple", "date": "2026-03-10" }
  ],
  "tirumala": [
    { "user": "Lakshmi", "rating": 4, "text": "Long queue but worth it", "date": "2026-03-08" }
  ]
}
```

### 1.8 `temple_user_rasi` — User's Zodiac Sign

```json
"4"
```

### 1.9 `temple_app_language` — App Language Preference

```json
"ta"
```

### 1.10 `ld_darshan_temple` — Live Darshan Selected Temple

Same structure as `selected_temple`. Used separately to avoid overwriting main temple selection.

---

### 1.11 Feed Data Keys

#### `feed_likes`
```json
{ "post_101": true, "post_103": true }
```

#### `feed_saves`
```json
{ "post_102": true }
```

#### `feed_comments`
```json
{
  "post_101": [
    { "id": 1, "user": "Ramesh", "text": "Amazing festival!", "timestamp": "2026-03-12T10:00:00Z" }
  ]
}
```

---

## 2. COMMUNITY FEATURE TABLES (7 Keys)

### 2.1 `community_posts` — Community Posts

| Field       | Type   | Description           | Example                        |
|-------------|--------|-----------------------|--------------------------------|
| id          | String | Post ID               | "cp_1710234567"                |
| userId      | String | Author email          | "ramesh@gmail.com"             |
| userName    | String | Author name           | "Ramesh Kumar"                 |
| title       | String | Post title            | "Temple Renovation Update"     |
| content     | String | Post body             | "The gopuram work is..."       |
| category    | String | Post category         | "Discussion" / "Question" / "Experience" |
| timestamp   | String | ISO date              | "2026-03-12T10:30:00.000Z"    |
| image       | String | Image URL (optional)  | "data:image/..."               |

### 2.2 `community_likes`
```json
[{ "postId": "cp_1710234567", "userId": "ramesh@gmail.com" }]
```

### 2.3 `community_saves`
```json
[{ "postId": "cp_1710234567", "userId": "ramesh@gmail.com" }]
```

### 2.4 `community_comments`
```json
{
  "cp_1710234567": [
    { "id": "cc_1", "userId": "lakshmi@gmail.com", "text": "Great update!", "timestamp": "2026-03-12T11:00:00Z" }
  ]
}
```

### 2.5 `community_following_users`
```json
["ramesh@gmail.com", "lakshmi@gmail.com"]
```

### 2.6 `community_hidden`
```json
["cp_1710234999"]
```

### 2.7 `community_user_verified` — Verified Users
```json
["ramesh@gmail.com"]
```

### 2.8 `community_verification_requests`
```json
[{ "email": "suresh@gmail.com", "name": "Suresh", "reason": "Temple priest", "date": "2026-03-10" }]
```

---

## 3. KULA THEIVAM TABLES (3 Keys)

### 3.1 `kula_theivam_data` — Family Deity Registration

| Field          | Type   | Description              | Example                      |
|----------------|--------|--------------------------|------------------------------|
| templeName     | String | Kula Theivam temple name | "Sri Kaliamman Temple"       |
| location       | String | Temple village/location  | "Kulithalai, Karur District" |
| deity          | String | Main deity type          | "Amman / Devi"               |
| gothram        | String | Family gothram           | "Kashyapa"                   |
| village        | String | Ancestral village        | "Kulithalai"                 |
| history        | String | Family notes             | "Annual pooja in Aadi month" |
| registeredDate | String | ISO timestamp            | "2026-03-12T10:30:00.000Z"  |

```json
{
  "templeName": "Sri Kaliamman Temple",
  "location": "Kulithalai, Karur District",
  "deity": "Amman / Devi",
  "gothram": "Kashyapa",
  "village": "Kulithalai",
  "history": "Annual pooja in Aadi month",
  "registeredDate": "2026-03-12T10:30:00.000Z"
}
```

---

### 3.2 `kula_theivam_bookings` — KT Ritual & Consultation Bookings

| Field            | Type    | Description              | Example                     |
|------------------|---------|--------------------------|-----------------------------|
| id               | String  | Booking ID               | "KT-1710234567890"          |
| type             | String  | Booking type             | "kula_theivam_ritual" / "priest_consultation" |
| ritualKey        | String  | Ritual identifier        | "remote_archana"            |
| ritualName       | String  | Display name             | "Remote Archana"            |
| temple           | String  | Kula Theivam temple      | "Sri Kaliamman Temple"      |
| devotee          | String  | Devotee name             | "Ramesh Kumar"              |
| star             | String  | Nakshatram               | "Ashwini"                   |
| date             | String  | Booking date             | "2026-03-20"                |
| isRemote         | Boolean | Remote service flag      | true                        |
| videoRequested   | Boolean | Video/photo delivery     | true                        |
| prasadamDelivery | Boolean | Courier prasadam         | false                       |
| notes            | String  | Special instructions     | "Please include vibhuthi"   |
| price            | Number  | Total amount (INR)       | 250                         |
| status           | String  | Booking status           | "Confirmed" / "Scheduled"   |
| bookedAt         | String  | ISO timestamp            | "2026-03-12T10:30:00.000Z"  |
| topic            | String  | Consultation topic       | "Muhurtham" (for consultations) |
| datetime         | String  | Consultation date/time   | "2026-03-20T10:00" (for consultations) |

---

### 3.3 `kula_theivam_orders` — Prasadam Delivery Orders

| Field        | Type   | Description            | Example                      |
|--------------|--------|------------------------|------------------------------|
| id           | String | Order ID               | "PRS-1710234567890"          |
| type         | String | Always "prasadam_delivery" | "prasadam_delivery"       |
| itemKey      | String | Product identifier     | "vibhuthi_kumkum"            |
| itemName     | String | Product name           | "Vibhuthi & Kumkum Pack"    |
| temple       | String | Kula Theivam temple    | "Sri Kaliamman Temple"       |
| customerName | String | Customer name          | "Ramesh Kumar"               |
| phone        | String | Contact number         | "9876543210"                 |
| address      | String | Delivery address       | "123, MG Road, Chennai - 600001" |
| quantity     | Number | Item quantity          | 2                            |
| price        | Number | Total amount (INR)     | 298                          |
| status       | String | Order status           | "Processing" / "Shipped" / "Delivered" |
| orderedAt    | String | ISO timestamp          | "2026-03-12T10:30:00.000Z"   |

---

## 4. TEMPLE ADMIN TABLES (13 Keys)

### 4.1 `admin_session` — Admin Authentication

| Field     | Type   | Description          | Example                      |
|-----------|--------|----------------------|------------------------------|
| username  | String | Admin username       | "temple_admin"               |
| email     | String | Admin email          | "admin@temple.com"           |
| token     | String | Session token        | "admin_1710234567"           |
| timestamp | String | Login time           | "2026-03-12T10:30:00.000Z"   |

---

### 4.2 `admin_temples` — Managed Temples

| Field      | Type   | Description           | Example                      |
|------------|--------|-----------------------|------------------------------|
| id         | String | Temple ID             | "temple_001"                 |
| name       | String | Temple name           | "Sri Meenakshi Temple"       |
| location   | String | Address               | "Madurai, Tamil Nadu"        |
| deity      | String | Main deity            | "Meenakshi Amman"            |
| category   | String | Category              | "Devi"                       |
| status     | String | Active/Inactive       | "active"                     |
| timings    | Object | Open hours            | { morning: "5:00-12:30", evening: "4:00-9:30" } |
| contact    | String | Phone                 | "0452-2345678"               |
| admin      | String | Assigned admin        | "Rajesh Kumar"               |

---

### 4.3 `admin_services` — Pooja/Service Catalog

| Field        | Type   | Description          | Example                     |
|--------------|--------|----------------------|-----------------------------|
| id           | String | Service ID           | "svc_001"                   |
| name         | String | Service name         | "Abhishekam"                |
| category     | String | Service category     | "Pooja" / "Homam" / "Darshan" |
| price        | Number | Base price (INR)     | 500                         |
| duration     | String | Duration             | "30 min"                    |
| availability | String | Available days       | "Daily"                     |
| status       | String | Active/Inactive      | "active"                    |

### 4.4 `admin_pricing_tiers` — Dynamic Pricing

```json
{ "normal": 1, "festival": 1.5, "special": 2 }
```

---

### 4.5 `admin_events` — Temple Events

| Field       | Type   | Description         | Example                     |
|-------------|--------|---------------------|-----------------------------|
| id          | String | Event ID            | "evt_001"                   |
| title       | String | Event title         | "Maha Shivaratri"           |
| type        | String | Event type          | "Festival" / "Cultural" / "Spiritual" / "Charity" |
| date        | String | Event date          | "2026-03-15"                |
| description | String | Event details       | "All night Shiva pooja..."  |
| status      | String | Upcoming/Active/Past| "upcoming"                  |

### 4.6 `admin_gallery` — Temple Image Gallery

| Field     | Type   | Description         | Example                     |
|-----------|--------|---------------------|-----------------------------|
| id        | String | Image ID            | "img_001"                   |
| title     | String | Image title         | "Gopuram View"              |
| url       | String | Image URL           | "images/gopuram.jpg"        |
| category  | String | Photo category      | "Temple" / "Festival" / "Deity" |
| uploaded  | String | Upload date         | "2026-03-10"                |

### 4.7 `admin_posts` — Feed Posts

| Field     | Type   | Description         | Example                     |
|-----------|--------|---------------------|-----------------------------|
| id        | String | Post ID             | "post_001"                  |
| title     | String | Post title          | "Festival Update"           |
| content   | String | Post content        | "Upcoming Panguni..."       |
| date      | String | Post date           | "2026-03-12"                |
| status    | String | Published/Draft     | "published"                 |

### 4.8 Other Admin Keys

| Key                   | Type   | Description                        |
|-----------------------|--------|------------------------------------|
| `admin_annadhanam`    | Array  | Annadhanam/food service records    |
| `admin_users`         | Array  | User management records            |
| `admin_darshan_tokens`| Array  | Darshan token queue data           |
| `admin_darshan_settings` | Object | Darshan configuration          |
| `admin_feedback`      | Array  | Devotee feedback/reviews           |
| `admin_notifications` | Array  | Sent notifications                 |
| `admin_settings`      | Object | Temple admin app settings          |
| `admin_temples_img_v` | String | Image version cache key            |
| `admin_gallery_img_v` | String | Gallery version cache key          |

---

## 5. SUPER ADMIN TABLES (16 Keys)

### 5.1 `sa_session` — Super Admin Authentication

| Field     | Type    | Description         | Example                     |
|-----------|---------|---------------------|-----------------------------|
| loggedIn  | Boolean | Auth status         | true                        |
| user      | String  | Username            | "superadmin"                |
| loginTime | String  | ISO timestamp       | "2026-03-12T10:30:00.000Z"  |

**Credentials:** `username: "superadmin"` / `password: "super@123"`

---

### 5.2 `sa_temples` — All Temples (Master List)

| Field    | Type   | Description           | Example                     |
|----------|--------|-----------------------|-----------------------------|
| id       | String | Temple ID             | "T-1001"                    |
| name     | String | Temple name           | "Sri Meenakshi Temple"      |
| location | String | Location              | "Madurai"                   |
| district | String | District              | "Madurai"                   |
| category | String | Deity category        | "Devi"                      |
| admin    | String | Assigned admin name   | "Rajesh Kumar"              |
| status   | String | Approval status       | "approved" / "pending" / "rejected" / "suspended" |
| created  | String | Creation date         | "2026-01-15"                |

---

### 5.3 `sa_users` — All Platform Users (SHARED: Read by User App)

| Field     | Type   | Description          | Example                     |
|-----------|--------|----------------------|-----------------------------|
| id        | String | User ID              | "U-1001"                    |
| name      | String | User name            | "Ramesh Kumar"              |
| email     | String | Email address        | "ramesh@gmail.com"          |
| phone     | String | Phone number         | "9876543210"                |
| status    | String | Account status       | "active" / "blocked"        |
| joined    | String | Join date            | "2025-12-01"                |
| bookings  | Number | Total bookings       | 5                           |
| donations | Number | Total donations      | 3                           |

**Cross-Role Usage:** User app reads this to check if user is blocked at login and on every page load.

---

### 5.4 `sa_temple_admins` — Temple Admin Accounts

| Field      | Type   | Description          | Example                     |
|------------|--------|----------------------|-----------------------------|
| id         | String | Admin ID             | "TA-1001"                   |
| name       | String | Admin name           | "Rajesh Kumar"              |
| email      | String | Email address        | "rajesh@temple.com"         |
| phone      | String | Phone number         | "9876543210"                |
| username   | String | Login username       | "rajesh_admin"              |
| password   | String | Login password       | "admin123"                  |
| status     | String | Account status       | "active" / "inactive"       |
| templeId   | String | Assigned temple ID   | "T-1001"                    |
| templeName | String | Assigned temple name | "Sri Meenakshi Temple"      |
| lastLogin  | String | Last login timestamp | "2026-03-11"                |

---

### 5.5 `sa_notifications` — Push Notifications Sent

| Field     | Type   | Description          | Example                     |
|-----------|--------|----------------------|-----------------------------|
| id        | String | Notification ID      | "N-1001"                    |
| title     | String | Notification title   | "Festival Update"           |
| message   | String | Body text            | "Panguni Uthiram on..."     |
| target    | String | Audience             | "All Users" / "Temple Admins" |
| priority  | String | Priority level       | "normal" / "high" / "urgent"|
| sentAt    | String | Sent timestamp       | "2026-03-12T10:30:00.000Z"  |
| status    | String | Delivery status      | "sent" / "scheduled"        |

---

### 5.6 `sa_system_alerts` — Internal System Alerts

| Field     | Type    | Description          | Example                     |
|-----------|---------|----------------------|-----------------------------|
| id        | String  | Alert ID             | "alert_1710234567"          |
| type      | String  | Alert category       | "temple" / "user" / "booking" / "system" |
| icon      | String  | Font Awesome icon    | "fa-check-circle"           |
| color     | String  | Alert color          | "green" / "red" / "blue"    |
| title     | String  | Alert title          | "Temple Approved"           |
| message   | String  | Alert detail         | "Meenakshi Temple approved" |
| priority  | String  | Priority             | "normal" / "high"           |
| read      | Boolean | Read status          | false                       |
| timestamp | String  | ISO timestamp        | "2026-03-12T10:30:00.000Z"  |

---

### 5.7 `sa_activity` — Activity Log (Max 50 entries)

```json
[
  { "text": "Temple <strong>Meenakshi</strong> approved", "color": "green", "time": "2026-03-12T10:30:00.000Z" },
  { "text": "User <strong>Ramesh</strong> blocked", "color": "red", "time": "2026-03-12T09:15:00.000Z" }
]
```

---

### 5.8 Other Super Admin Keys

| Key              | Type   | Description                          |
|------------------|--------|--------------------------------------|
| `sa_posts`       | Array  | Managed content posts                |
| `sa_gallery`     | Array  | Platform gallery images              |
| `sa_reviews`     | Object | Moderated reviews                    |
| `sa_flagged`     | Array  | Flagged content for review           |
| `sa_districts`   | Array  | District master data `[{id, name}]`  |
| `sa_categories`  | Array  | Temple categories `[{id, name, color}]` |
| `sa_festivals`   | Array  | Festival calendar definitions        |
| `sa_settings`    | Object | Platform-wide settings               |

---

## 6. CROSS-ROLE DATA FLOW

### Shared Keys (Read/Write across roles)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   USER APP   │     │ TEMPLE ADMIN │     │ SUPER ADMIN  │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       │ WRITE              │ READ/WRITE         │ READ/WRITE
       ├────────────────────┼────────────────────┤
       │           temple_bookings               │
       │           temple_donations              │
       ├────────────────────┼────────────────────┤
       │                    │                    │
       │ READ               │                    │ WRITE
       ├────────────────────┼────────────────────┤
       │              sa_users                   │
       │        (block/unblock check)            │
       ├────────────────────┼────────────────────┤
       │                    │                    │
       │ WRITE              │                    │ READ
       ├────────────────────┼────────────────────┤
       │         community_posts                 │
       │         community_user_verified         │
       │         kula_theivam_bookings           │
       │         kula_theivam_orders             │
       └────────────────────┴────────────────────┘
```

### Data Flow: Booking Lifecycle

```
User creates booking
    │
    ├─ Pooja/Darshan/Motta ──► status: "Confirmed" ──► Admin sees in dashboard
    │
    ├─ Family Function ──► status: "Pending Approval"
    │                          │
    │                          ├──► Admin approves ──► status: "Confirmed"
    │                          └──► Super Admin approves ──► status: "Confirmed"
    │
    └─ Kula Theivam Ritual ──► status: "Confirmed"
                                   │
                                   └──► Saved to BOTH temple_bookings + kula_theivam_bookings
```

### Data Flow: Donation Lifecycle

```
User donates
    │
    ├─ Regular Donation (donation.html) ──► temple_donations
    ├─ Annadhanam Sponsorship ──► temple_donations (type: "Annadhanam")
    └─ KT Temple Fund ──► temple_donations (type: "Temple Maintenance")
            │
            ├──► Admin Finance Dashboard (reads temple_donations)
            └──► Super Admin Finance (reads temple_donations)
```

### Data Flow: User Block/Unblock

```
Super Admin blocks user
    │
    └──► sa_users[email].status = "blocked"
              │
              ├──► User App login checks sa_users ──► Denied with message
              └──► User App page load checks sa_users ──► Redirected to login
```

---

## 7. ENTITY RELATIONSHIP DIAGRAM

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│  temple_user │     │  sa_users    │     │sa_temple_admins│
│─────────────│     │──────────────│     │───────────────│
│ name        │◄───►│ name         │     │ name          │
│ email (PK)  │     │ email        │     │ email         │
│ phone       │     │ status       │     │ templeId (FK) │──┐
│ loggedIn    │     │ joined       │     │ password      │  │
└──────┬──────┘     └──────────────┘     └───────────────┘  │
       │                                                     │
       │ 1:N                                                 │
       ▼                                                     │
┌──────────────┐     ┌──────────────────┐     ┌─────────────┴──┐
│temple_bookings│     │temple_donations  │     │  sa_temples     │
│──────────────│     │──────────────────│     │────────────────│
│ id (PK)      │     │ id (PK)         │     │ id (PK)        │
│ name         │     │ amount          │     │ name           │
│ pooja        │     │ type            │     │ location       │
│ date         │     │ donorName       │     │ status         │
│ price        │     │ donorEmail      │     │ admin          │
│ status       │     │ temple          │     └────────────────┘
│ temple       │     │ date            │
│ type         │     └─────────────────┘
└──────────────┘

┌──────────────────┐     ┌──────────────────┐
│kula_theivam_data │     │community_posts   │
│──────────────────│     │──────────────────│
│ templeName       │     │ id (PK)          │
│ location         │     │ userId           │
│ deity            │     │ title            │
│ gothram          │◄───►│ content          │
│ village          │     │ category         │
│ history          │     │ timestamp        │
└────────┬─────────┘     └──────────────────┘
         │ 1:N
         ▼
┌────────────────────┐     ┌────────────────────┐
│kula_theivam_bookings│    │kula_theivam_orders │
│────────────────────│     │────────────────────│
│ id (PK)            │     │ id (PK)            │
│ ritualName         │     │ itemName           │
│ temple             │     │ temple             │
│ devotee            │     │ customerName       │
│ date               │     │ address            │
│ isRemote           │     │ quantity           │
│ price              │     │ price              │
│ status             │     │ status             │
└────────────────────┘     └────────────────────┘
```

---

## 8. KEY NAMING CONVENTIONS

| Prefix          | Scope         | Example                  |
|-----------------|---------------|--------------------------|
| `temple_`       | User App      | `temple_user`, `temple_bookings` |
| `admin_`        | Temple Admin  | `admin_session`, `admin_events` |
| `sa_`           | Super Admin   | `sa_temples`, `sa_users` |
| `community_`    | Community     | `community_posts`        |
| `feed_`         | Feed/Social   | `feed_likes`, `feed_comments` |
| `kula_theivam_` | Kula Theivam  | `kula_theivam_data`      |
| `ld_`           | Live Darshan  | `ld_darshan_temple`      |
| `selected_`     | Temp Selection| `selected_temple`        |

---

## 9. STORAGE LIMITS & CONSTRAINTS

| Constraint                    | Value                    |
|-------------------------------|--------------------------|
| localStorage max size         | ~5-10 MB per origin      |
| Max activity log entries      | 50 (auto-trimmed)        |
| Max system alerts             | Unlimited (manual clear) |
| Seed data created             | Only if key is empty     |
| Session persistence           | Until manual logout      |
| Data persistence              | Until browser clear      |

---

## 10. SEED DATA SUMMARY

| Module       | Seeded On         | Data Count                        |
|--------------|-------------------|-----------------------------------|
| Super Admin  | First login       | 10 temples, 20 users, 3 admins, 5 notifications, 8 districts, 6 categories |
| Bookings     | Dashboard init    | 15 bookings (if empty)            |
| Temple Admin | First login       | 5 temples, sample events, gallery |

---

*Document generated: March 2026*
*Platform: Temple Digital App v1.0*
*Storage: Browser localStorage (Client-Side)*
