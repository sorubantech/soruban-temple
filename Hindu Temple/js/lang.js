// ===== Temple Digital - Language System =====
// Supports: English, Tamil, Hindi, Telugu

var LANG = (function() {

  var translations = {
    // ============================
    // ENGLISH (default - fallback)
    // ============================
    en: {
      // App-wide
      app_name: 'Temple Digital',
      app_tagline: 'Your Divine Connection Online',
      greeting_morning: 'Good Morning',
      greeting_afternoon: 'Good Afternoon',
      greeting_evening: 'Good Evening',

      // Bottom nav
      nav_home: 'Home',
      nav_temples: 'Temples',
      nav_feed: 'Feed',
      nav_profile: 'Profile',
      nav_pooja: 'Pooja',
      nav_donate: 'Donate',

      // Login / Register
      welcome_devotee: 'Welcome, Devotee',
      login: 'Login',
      register: 'Register',
      email_or_phone: 'Email or Phone',
      enter_email_phone: 'Enter email or phone number',
      password: 'Password',
      enter_password: 'Enter password',
      forgot_password: 'Forgot Password?',
      full_name: 'Full Name',
      enter_full_name: 'Enter your full name',
      email: 'Email',
      enter_email: 'Enter email address',
      phone_number: 'Phone Number',
      enter_phone: 'Enter phone number',
      create_password: 'Create a password',
      create_account: 'Create Account',
      login_success: 'Login successful!',
      fill_all_fields: 'Please fill all fields',
      account_created: 'Account created successfully!',
      password_reset: 'Password reset link sent!',

      // Home page
      quick_services: 'Quick Services',
      browse_temples: 'Browse Temples',
      book_pooja: 'Book Pooja',
      donate_label: 'Donate',
      darshan_token: 'Darshan Token',
      live_darshan: 'Live Darshan',
      annadhanam: 'Annadhanam',
      nalla_neram: 'Nalla Neram',
      rasi_palan: 'Rasi Palan',
      todays_panchang: "Today's Panchang",
      temple_categories: 'Temple Categories',
      see_all: 'See All',
      browse_by_district: 'Browse by District',
      all_temples: 'All Temples',
      featured_temples: 'Featured Temples',
      latest_updates: 'Latest Updates',
      show_all_districts: 'Show All Districts',
      show_less: 'Show Less',
      temples_suffix: 'temples',
      explore_sacred: 'Explore Sacred Temples of India',
      discover_worship: 'Discover, worship, and book services at 30+ temples',

      // Categories
      cat_shiva: 'Shiva',
      cat_vishnu: 'Vishnu',
      cat_devi: 'Devi',
      cat_ganesh: 'Ganesh',
      cat_murugan: 'Murugan',
      cat_hanuman: 'Hanuman',
      cat_local: 'Local',

      // Updates
      announcement: 'Announcement',
      new_feature: 'New Feature',
      festival_alert: 'Festival Alert',
      online_pooja_title: 'Online Pooja Booking Available',
      online_pooja_desc: 'Now book special pooja, darshan tokens, and homam services online through Temple Digital platform.',
      temples_tn_title: '49 Temples Across Tamil Nadu',
      temples_tn_desc: 'Explore temples by deity category or browse by district - Chennai, Madurai, Thanjavur, Trichy, Coimbatore & more.',
      panguni_title: 'Panguni Uthiram Coming Soon',
      panguni_desc: 'Grand celebrations planned at major temples. Special darshan and pooja arrangements available for booking.',

      // Profile page
      devotee: 'Devotee',
      bookings: 'Bookings',
      donations: 'Donations',
      following: 'Following',
      total_given: 'Total Given',
      my_bookings_donations: 'My Bookings & Donations',
      view_booking_history: 'View all your booking & donation history',
      daily_pooja: 'Daily Pooja',
      daily_pooja_desc: 'Archana, Abhishekam & daily sevas',
      homam_services: 'Homam Services',
      homam_desc: 'Book sacred fire rituals',
      family_functions: 'Family Functions',
      family_desc: 'Wedding, naming, upanayanam',
      motta_booking: 'Motta Booking',
      motta_desc: 'Book tonsure seva',
      my_donations: 'My Donations',
      my_donations_desc: 'View donation receipts',
      annadhanam_desc: 'Sponsor free food for devotees',
      nalla_neram_desc: 'Daily auspicious timings & panchangam',
      rasi_palan_desc: 'Daily horoscope for all 12 rasis',
      darshan_token_desc: 'Book virtual queue token',
      prasadam_shop: 'Prasadam & Shop',
      prasadam_desc: 'Order prasadam & pooja items',
      followed_temples: 'Followed Temples',
      followed_desc: 'Temples you are following',
      updates_feed: 'Updates Feed',
      updates_desc: 'Latest temple news & updates',
      notifications: 'Notifications',
      notifications_desc: 'Manage alerts & reminders',
      language: 'Language',
      language_desc: 'English, Tamil, Hindi, Telugu',
      help_support: 'Help & Support',
      help_desc: 'Contact temple administration',
      about: 'About',
      about_desc: 'App version & terms',
      logout: 'Logout',
      logged_out: 'Logged out successfully',
      notifications_enabled: 'Notifications enabled',
      edit_profile: 'Edit Profile',
      save_profile: 'Save Profile',
      profile_updated: 'Profile updated!',
      cancel: 'Cancel',

      // Donation page
      temple_donation: 'Temple Donation',
      select_amount: 'Select Amount',
      or_enter_custom: 'Or Enter Custom Amount',
      enter_amount: 'Enter amount in ₹',
      donation_type: 'Donation Type',
      annadhanam_donate: 'Annadhanam',
      serve_free_food: 'Serve free food to devotees',
      temple_maintenance: 'Temple Maintenance',
      support_upkeep: 'Support temple upkeep & renovation',
      flower_decoration: 'Flower Decoration',
      daily_flower: 'Daily flower offerings to deity',
      cow_shelter: 'Go Seva (Cow Shelter)',
      support_cow: 'Support the temple cow shelter',
      general_hundi: 'General Hundi',
      general_donation: 'General temple donation',
      donor_details: 'Donor Details',
      name: 'Name',
      enter_name: 'Enter your name',
      phone: 'Phone',
      enter_10digit: 'Enter 10-digit mobile number',
      email_receipt: 'for receipt',
      enter_email_receipt: 'Enter email for donation receipt',
      donate_now: 'Donate Now',
      secure_payment: 'Secure payment via Razorpay. Tax-exempt under 80G.',
      donation_successful: 'Donation Successful!',
      thank_contribution: 'Thank you for your generous contribution',
      donation_receipt: 'Donation Receipt',
      receipt_no: 'Receipt No',
      date_time: 'Date & Time',
      donor: 'Donor',
      type: 'Type',
      amount: 'Amount',
      tax_exempt: 'Tax exemption under Section 80G of Income Tax Act',
      phone_error: 'Please enter a valid 10-digit mobile number',
      valid_amount_error: 'Please enter a valid amount',
      select_donation_type: 'Please select donation type',

      // Darshan Token
      live_queue_status: 'Live Queue Status',
      in_queue: 'In Queue',
      wait_time: 'Wait Time',
      served_today: 'Served Today',
      select_darshan_type: 'Select Darshan Type',
      free_darshan: 'Free Darshan (Sarva Darshan)',
      free_darshan_desc: 'General queue darshan open to all devotees. No booking fee.',
      special_darshan: 'Special Darshan',
      special_darshan_desc: 'Priority queue with shorter waiting time. Limited tokens per day.',
      vip_darshan: 'VIP Darshan',
      vip_darshan_desc: 'Express queue with minimal wait. Includes close darshan and prasadam.',
      senior_darshan: 'Senior Citizen / Divyang',
      senior_darshan_desc: 'Special queue for age 65+ and differently-abled devotees. ID proof required.',
      free: 'Free',
      per_person: '/ person',
      wait_prefix: 'Wait:',
      select_temple: 'Select Temple',
      select_temple_error: 'Please select a temple',
      select_date: 'Select Date',
      select_time_slot: 'Select Time Slot',
      left_suffix: 'left',
      break_label: 'Break',
      full_label: 'Full',
      num_persons: 'Number of Persons',
      person: 'Person',
      persons: 'Persons',
      primary_devotee: 'Primary Devotee Name',
      enter_fullname: 'Enter your full name',
      for_token_sms: 'For token SMS & updates',
      id_proof: 'ID Proof Number',
      id_placeholder: 'Aadhaar / PAN / Voter ID number',
      your_darshan_token: 'Your Darshan Token',
      get_darshan_token: 'Get Darshan Token',
      darshan_guidelines: 'Darshan Guidelines:',
      guideline_1: 'Arrive 30 minutes before your slot time',
      guideline_2: 'Carry a valid government ID proof',
      guideline_3: 'Mobile phones & cameras not allowed inside sanctum',
      guideline_4: 'Dress code: Traditional attire recommended',
      guideline_5: 'Token is non-transferable & valid for selected date only',
      select_darshan_error: 'Please select darshan type',
      select_date_error: 'Please select a date',
      select_slot_error: 'Please select a time slot',
      enter_name_error: 'Please enter your name',
      token_booked: 'Token Booked:',

      // My Activity / Bookings
      my_activity: 'My Activity',
      bookings: 'Bookings',
      donations: 'Donations',
      no_bookings: 'No Bookings Yet',
      no_bookings_desc: 'Your pooja, homam, and motta bookings will appear here.',
      browse_poojas: 'Browse Poojas',
      no_donations: 'No Donations Yet',
      no_donations_desc: 'Your donations and annadhanam sponsorships will appear here.',
      make_donation: 'Make a Donation',

      // Events
      events_festivals: 'Events & Festivals',

      // Reviews, Like & Share
      temple_liked: 'Temple liked!',
      temple_unliked: 'Like removed',
      link_copied: 'Link copied to clipboard!',
      share_failed: 'Share not available',
      select_rating: 'Please select a rating',
      write_review_error: 'Please write a review',
      review_submitted: 'Review submitted! Thank you.',

      // Follow & Feed
      temple_followed: 'Following this temple!',
      temple_unfollowed: 'Unfollowed',
      stories_coming_soon: 'Stories coming soon!',
      post_saved: 'Post saved!',
      post_unsaved: 'Post unsaved',
      comment_added: 'Comment posted!',
      write_comment: 'Please write a comment',

      // Book Pooja
      select_pooja: 'Select a Pooja',
      booking_details: 'Booking Details',
      devotee_name: 'Devotee Name',
      pooja_date: 'Preferred Date',
      rasi_star: 'Rasi (Zodiac)',
      gothram: 'Gothram',
      nakshatram: 'Nakshatram (Star)',
      optional: 'optional',
      booking_summary: 'Booking Summary',
      selected_pooja: 'Selected Pooja',
      total_amount: 'Total Amount',
      confirm_booking: 'Confirm & Pay',
      booking_confirmed: 'Booking Confirmed!',
      select_pooja_error: 'Please select a pooja',
      fill_details_error: 'Please fill all details',

      // Temple list / home
      search_temples: 'Search temples...',
      all_categories: 'All Categories',
      famous: 'Famous',
      history_label: 'History',
      fun_facts: 'Fun Facts',

      // Temple details
      temple_services: 'Temple Services',
      daily_rituals: 'Daily Rituals & Schedule',
      temple_history: 'Temple History',
      interesting_facts: 'Interesting Facts',
      how_to_reach: 'How to Reach',
      by_train: 'By Train',
      by_bus: 'By Bus',
      by_road: 'By Road',
      by_air: 'By Air',
      bus_routes: 'Bus Routes',
      parking: 'Parking',
      travel_tips: 'Travel Tips',
      view_maps: 'View on Google Maps',
      back: 'Back',

      // Common
      confirm: 'Confirm',
      cancel: 'Cancel',
      ok: 'OK',
      done: 'Done',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',

      // Footer
      footer_copy: '© 2026 Temple Digital. All rights reserved.',

      // Language modal
      select_language: 'Select Language',
      lang_english: 'English',
      lang_tamil: 'Tamil - தமிழ்',
      lang_hindi: 'Hindi - हिन्दी',
      lang_telugu: 'Telugu - తెలుగు',
      language_changed: 'Language changed to',

      // Other pages
      daily_pooja_title: 'Daily Pooja Services',
      homam_booking_title: 'Homam Booking',
      family_booking_title: 'Family Functions',
      motta_booking_title: 'Motta Booking',
      annadhanam_title: 'Annadhanam Seva',
      nalla_neram_title: 'Nalla Neram',
      rasi_palan_title: 'Rasi Palan',
      prasadam_title: 'Prasadam & Temple Shop',
      my_bookings_title: 'My Bookings',
      live_darshan_title: 'Live Darshan',
      events_title: 'Temple Events',
      feed_title: 'Temple Feed',
      temple_list_title: 'Temples'
    },

    // ============================
    // TAMIL
    // ============================
    ta: {
      app_name: 'டெம்பிள் டிஜிட்டல்',
      app_tagline: 'உங்கள் தெய்வீக இணைப்பு ஆன்லைனில்',
      greeting_morning: 'காலை வணக்கம்',
      greeting_afternoon: 'மதிய வணக்கம்',
      greeting_evening: 'மாலை வணக்கம்',

      nav_home: 'முகப்பு',
      nav_temples: 'கோயில்கள்',
      nav_feed: 'செய்தி',
      nav_profile: 'சுயவிவரம்',
      nav_pooja: 'பூஜை',
      nav_donate: 'நன்கொடை',

      welcome_devotee: 'வணக்கம், பக்தரே',
      login: 'உள்நுழை',
      register: 'பதிவு செய்',
      email_or_phone: 'மின்னஞ்சல் அல்லது தொலைபேசி',
      enter_email_phone: 'மின்னஞ்சல் அல்லது தொலைபேசி எண் உள்ளிடவும்',
      password: 'கடவுச்சொல்',
      enter_password: 'கடவுச்சொல்லை உள்ளிடவும்',
      forgot_password: 'கடவுச்சொல் மறந்துவிட்டதா?',
      full_name: 'முழு பெயர்',
      enter_full_name: 'உங்கள் முழு பெயரை உள்ளிடவும்',
      email: 'மின்னஞ்சல்',
      enter_email: 'மின்னஞ்சல் முகவரியை உள்ளிடவும்',
      phone_number: 'தொலைபேசி எண்',
      enter_phone: 'தொலைபேசி எண்ணை உள்ளிடவும்',
      create_password: 'கடவுச்சொல் உருவாக்கவும்',
      create_account: 'கணக்கை உருவாக்கு',
      login_success: 'உள்நுழைவு வெற்றிகரம்!',
      fill_all_fields: 'அனைத்து புலங்களையும் நிரப்பவும்',
      account_created: 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!',
      password_reset: 'கடவுச்சொல் மீட்டமைப்பு இணைப்பு அனுப்பப்பட்டது!',

      quick_services: 'விரைவு சேவைகள்',
      browse_temples: 'கோயில்களை காண',
      book_pooja: 'பூஜை முன்பதிவு',
      donate_label: 'நன்கொடை',
      darshan_token: 'தரிசன டோக்கன்',
      live_darshan: 'நேரடி தரிசனம்',
      annadhanam: 'அன்னதானம்',
      nalla_neram: 'நல்ல நேரம்',
      rasi_palan: 'ராசிபலன்',
      todays_panchang: 'இன்றைய பஞ்சாங்கம்',
      temple_categories: 'கோயில் வகைகள்',
      see_all: 'அனைத்தும்',
      browse_by_district: 'மாவட்டம் வாரியாக',
      all_temples: 'அனைத்து கோயில்கள்',
      featured_temples: 'சிறப்பு கோயில்கள்',
      latest_updates: 'சமீபத்திய செய்திகள்',
      show_all_districts: 'அனைத்து மாவட்டங்களும்',
      show_less: 'குறைவாகக் காட்டு',
      temples_suffix: 'கோயில்கள்',
      explore_sacred: 'இந்தியாவின் புனித கோயில்களை ஆராயுங்கள்',
      discover_worship: '30+ கோயில்களில் சேவைகளை கண்டறிந்து முன்பதிவு செய்யுங்கள்',

      cat_shiva: 'சிவன்',
      cat_vishnu: 'விஷ்ணு',
      cat_devi: 'தேவி',
      cat_ganesh: 'கணேஷ்',
      cat_murugan: 'முருகன்',
      cat_hanuman: 'அனுமான்',
      cat_local: 'உள்ளூர்',

      announcement: 'அறிவிப்பு',
      new_feature: 'புதிய அம்சம்',
      festival_alert: 'திருவிழா எச்சரிக்கை',
      online_pooja_title: 'ஆன்லைன் பூஜை முன்பதிவு',
      online_pooja_desc: 'டெம்பிள் டிஜிட்டல் மூலம் சிறப்பு பூஜை, தரிசன டோக்கன், ஹோமம் சேவைகளை ஆன்லைனில் முன்பதிவு செய்யலாம்.',
      temples_tn_title: 'தமிழ்நாடு முழுவதும் 49 கோயில்கள்',
      temples_tn_desc: 'தெய்வ வகை அல்லது மாவட்டம் வாரியாக கோயில்களை ஆராயுங்கள் - சென்னை, மதுரை, தஞ்சாவூர், திருச்சி, கோவை மற்றும் பல.',
      panguni_title: 'பங்குனி உத்திரம் விரைவில்',
      panguni_desc: 'முக்கிய கோயில்களில் பெரிய கொண்டாட்டங்கள் திட்டமிடப்பட்டுள்ளன. சிறப்பு தரிசனம் மற்றும் பூஜை ஏற்பாடுகள் முன்பதிவுக்கு தயாராக உள்ளன.',

      devotee: 'பக்தர்',
      bookings: 'முன்பதிவுகள்',
      donations: 'நன்கொடைகள்',
      following: 'பின்தொடர்தல்',
      total_given: 'மொத்த நன்கொடை',
      my_bookings_donations: 'எனது முன்பதிவுகள் & நன்கொடைகள்',
      view_booking_history: 'உங்கள் அனைத்து முன்பதிவு & நன்கொடை வரலாற்றை காணுங்கள்',
      daily_pooja: 'தினசரி பூஜை',
      daily_pooja_desc: 'அர்ச்சனை, அபிஷேகம் & தினசரி சேவைகள்',
      homam_services: 'ஹோமம் சேவைகள்',
      homam_desc: 'புனித அக்னி சடங்குகளை முன்பதிவு செய்யுங்கள்',
      family_functions: 'குடும்ப நிகழ்வுகள்',
      family_desc: 'திருமணம், நாமகரணம், உபநயனம்',
      motta_booking: 'மொட்டை முன்பதிவு',
      motta_desc: 'மொட்டை சேவையை முன்பதிவு செய்யுங்கள்',
      my_donations: 'எனது நன்கொடைகள்',
      my_donations_desc: 'நன்கொடை ரசீதுகளை காணுங்கள்',
      annadhanam_desc: 'பக்தர்களுக்கு இலவச உணவு வழங்குங்கள்',
      nalla_neram_desc: 'தினசரி நல்ல நேரம் & பஞ்சாங்கம்',
      rasi_palan_desc: '12 ராசிகளுக்கும் தினசரி ராசிபலன்',
      darshan_token_desc: 'மெய்நிகர் வரிசை டோக்கன் முன்பதிவு',
      prasadam_shop: 'பிரசாதம் & கடை',
      prasadam_desc: 'பிரசாதம் & பூஜை பொருட்களை ஆர்டர் செய்யுங்கள்',
      followed_temples: 'பின்தொடரும் கோயில்கள்',
      followed_desc: 'நீங்கள் பின்தொடரும் கோயில்கள்',
      updates_feed: 'புதுப்பிப்பு செய்திகள்',
      updates_desc: 'சமீபத்திய கோயில் செய்திகள் & புதுப்பிப்புகள்',
      notifications: 'அறிவிப்புகள்',
      notifications_desc: 'எச்சரிக்கைகள் & நினைவூட்டல்களை நிர்வகிக்கவும்',
      language: 'மொழி',
      language_desc: 'ஆங்கிலம், தமிழ், இந்தி, தெலுங்கு',
      help_support: 'உதவி & ஆதரவு',
      help_desc: 'கோயில் நிர்வாகத்தை தொடர்பு கொள்ளுங்கள்',
      about: 'பற்றி',
      about_desc: 'ஆப் பதிப்பு & விதிமுறைகள்',
      logout: 'வெளியேறு',
      logged_out: 'வெற்றிகரமாக வெளியேறினீர்கள்',
      notifications_enabled: 'அறிவிப்புகள் இயக்கப்பட்டன',
      edit_profile: 'சுயவிவரத்தை திருத்து',
      save_profile: 'சுயவிவரத்தை சேமி',
      profile_updated: 'சுயவிவரம் புதுப்பிக்கப்பட்டது!',
      cancel: 'ரத்து',

      temple_donation: 'கோயில் நன்கொடை',
      select_amount: 'தொகையைத் தேர்வுசெய்யவும்',
      or_enter_custom: 'அல்லது விரும்பிய தொகையை உள்ளிடவும்',
      enter_amount: '₹ தொகையை உள்ளிடவும்',
      donation_type: 'நன்கொடை வகை',
      annadhanam_donate: 'அன்னதானம்',
      serve_free_food: 'பக்தர்களுக்கு இலவச உணவு வழங்குங்கள்',
      temple_maintenance: 'கோயில் பராமரிப்பு',
      support_upkeep: 'கோயில் பராமரிப்பு & புனரமைப்பை ஆதரிக்கவும்',
      flower_decoration: 'மலர் அலங்காரம்',
      daily_flower: 'தெய்வத்திற்கு தினசரி மலர் காணிக்கை',
      cow_shelter: 'கோ சேவா (பசுப்பண்ணை)',
      support_cow: 'கோயில் பசுப்பண்ணையை ஆதரிக்கவும்',
      general_hundi: 'பொது உண்டியல்',
      general_donation: 'பொது கோயில் நன்கொடை',
      donor_details: 'நன்கொடையாளர் விவரங்கள்',
      name: 'பெயர்',
      enter_name: 'உங்கள் பெயரை உள்ளிடவும்',
      phone: 'தொலைபேசி',
      enter_10digit: '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
      email_receipt: 'ரசீதுக்கு',
      enter_email_receipt: 'நன்கொடை ரசீதுக்கு மின்னஞ்சலை உள்ளிடவும்',
      donate_now: 'இப்போது நன்கொடை அளிக்கவும்',
      secure_payment: 'Razorpay மூலம் பாதுகாப்பான பணம். 80G கீழ் வரி விலக்கு.',
      donation_successful: 'நன்கொடை வெற்றிகரம்!',
      thank_contribution: 'உங்கள் தாராள மனதுக்கு நன்றி',
      donation_receipt: 'நன்கொடை ரசீது',
      receipt_no: 'ரசீது எண்',
      date_time: 'தேதி & நேரம்',
      donor: 'நன்கொடையாளர்',
      type: 'வகை',
      amount: 'தொகை',
      tax_exempt: 'வருமான வரி சட்டம் பிரிவு 80G கீழ் வரி விலக்கு',
      phone_error: 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
      valid_amount_error: 'சரியான தொகையை உள்ளிடவும்',
      select_donation_type: 'நன்கொடை வகையைத் தேர்வுசெய்யவும்',

      live_queue_status: 'நேரடி வரிசை நிலை',
      in_queue: 'வரிசையில்',
      wait_time: 'காத்திருப்பு நேரம்',
      served_today: 'இன்று சேவை',
      select_darshan_type: 'தரிசன வகையைத் தேர்வுசெய்யவும்',
      free_darshan: 'இலவச தரிசனம் (சர்வ தரிசனம்)',
      free_darshan_desc: 'அனைத்து பக்தர்களுக்கும் திறந்த பொது வரிசை தரிசனம். முன்பதிவு கட்டணம் இல்லை.',
      special_darshan: 'சிறப்பு தரிசனம்',
      special_darshan_desc: 'குறைந்த காத்திருப்பு நேரத்துடன் முன்னுரிமை வரிசை. நாளுக்கு குறிப்பிட்ட டோக்கன்கள் மட்டுமே.',
      vip_darshan: 'VIP தரிசனம்',
      vip_darshan_desc: 'குறைந்தபட்ச காத்திருப்புடன் விரைவு வரிசை. நெருக்கமான தரிசனம் மற்றும் பிரசாதம் உள்ளடக்கியது.',
      senior_darshan: 'மூத்த குடிமக்கள் / மாற்றுத்திறனாளிகள்',
      senior_darshan_desc: '65+ வயதினர் மற்றும் மாற்றுத்திறனாளி பக்தர்களுக்கான சிறப்பு வரிசை. அடையாள ஆவணம் தேவை.',
      free: 'இலவசம்',
      per_person: '/ நபர்',
      wait_prefix: 'காத்திருப்பு:',
      select_temple: 'கோயிலைத் தேர்வுசெய்யவும்',
      select_temple_error: 'கோயிலைத் தேர்வுசெய்யவும்',
      select_date: 'தேதியைத் தேர்வுசெய்யவும்',
      select_time_slot: 'நேர இடைவெளியைத் தேர்வுசெய்யவும்',
      left_suffix: 'உள்ளது',
      break_label: 'இடைவேளை',
      full_label: 'நிரம்பியது',
      num_persons: 'நபர்கள் எண்ணிக்கை',
      person: 'நபர்',
      persons: 'நபர்கள்',
      primary_devotee: 'முதன்மை பக்தர் பெயர்',
      enter_fullname: 'உங்கள் முழு பெயரை உள்ளிடவும்',
      for_token_sms: 'டோக்கன் SMS & புதுப்பிப்புகளுக்கு',
      id_proof: 'அடையாள ஆவண எண்',
      id_placeholder: 'ஆதார் / PAN / வாக்காளர் அட்டை எண்',
      your_darshan_token: 'உங்கள் தரிசன டோக்கன்',
      get_darshan_token: 'தரிசன டோக்கன் பெறுங்கள்',
      darshan_guidelines: 'தரிசன வழிகாட்டுதல்கள்:',
      guideline_1: 'உங்கள் நேர இடைவெளிக்கு 30 நிமிடங்களுக்கு முன்பே வாருங்கள்',
      guideline_2: 'செல்லுபடியாகும் அரசு அடையாள ஆவணத்தை எடுத்துவாருங்கள்',
      guideline_3: 'கருவறைக்குள் கைபேசிகள் & கேமராக்கள் அனுமதிக்கப்படாது',
      guideline_4: 'உடையமை: பாரம்பரிய ஆடை பரிந்துரைக்கப்படுகிறது',
      guideline_5: 'டோக்கன் மாற்ற இயலாதது & தேர்ந்தெடுக்கப்பட்ட தேதிக்கு மட்டுமே செல்லும்',
      select_darshan_error: 'தரிசன வகையைத் தேர்வுசெய்யவும்',
      select_date_error: 'தேதியைத் தேர்வுசெய்யவும்',
      select_slot_error: 'நேர இடைவெளியைத் தேர்வுசெய்யவும்',
      enter_name_error: 'உங்கள் பெயரை உள்ளிடவும்',
      token_booked: 'டோக்கன் முன்பதிவு:',

      // My Activity / Bookings
      my_activity: 'எனது செயல்பாடு',
      bookings: 'முன்பதிவுகள்',
      donations: 'நன்கொடைகள்',
      no_bookings: 'முன்பதிவுகள் இல்லை',
      no_bookings_desc: 'உங்கள் பூஜை, ஹோமம், மொட்டை முன்பதிவுகள் இங்கே தோன்றும்.',
      browse_poojas: 'பூஜைகளை பார்க்க',
      no_donations: 'நன்கொடைகள் இல்லை',
      no_donations_desc: 'உங்கள் நன்கொடைகள் இங்கே தோன்றும்.',
      make_donation: 'நன்கொடை செய்யுங்கள்',
      events_festivals: 'நிகழ்வுகள் & திருவிழாக்கள்',

      temple_liked: 'கோயில் விரும்பப்பட்டது!',
      temple_unliked: 'விருப்பம் நீக்கப்பட்டது',
      link_copied: 'இணைப்பு நகலெடுக்கப்பட்டது!',
      share_failed: 'பகிர்வு கிடைக்கவில்லை',
      select_rating: 'தரவரிசையைத் தேர்வுசெய்யவும்',
      write_review_error: 'மதிப்புரையை எழுதுங்கள்',
      review_submitted: 'மதிப்புரை சமர்ப்பிக்கப்பட்டது! நன்றி.',

      temple_followed: 'இந்த கோயிலைப் பின்தொடர்கிறீர்கள்!',
      temple_unfollowed: 'பின்தொடர்வது நிறுத்தப்பட்டது',
      stories_coming_soon: 'கதைகள் விரைவில் வரும்!',
      post_saved: 'இடுகை சேமிக்கப்பட்டது!',
      post_unsaved: 'இடுகை நீக்கப்பட்டது',
      comment_added: 'கருத்து இடப்பட்டது!',
      write_comment: 'கருத்தை எழுதுங்கள்',

      select_pooja: 'ஒரு பூஜையைத் தேர்வுசெய்யவும்',
      booking_details: 'முன்பதிவு விவரங்கள்',
      devotee_name: 'பக்தரின் பெயர்',
      pooja_date: 'விரும்பிய தேதி',
      rasi_star: 'ராசி',
      gothram: 'கோத்திரம்',
      nakshatram: 'நட்சத்திரம்',
      optional: 'விருப்பம்',
      booking_summary: 'முன்பதிவு சுருக்கம்',
      selected_pooja: 'தேர்ந்தெடுக்கப்பட்ட பூஜை',
      total_amount: 'மொத்த தொகை',
      confirm_booking: 'உறுதிசெய் & பணம் செலுத்து',
      booking_confirmed: 'முன்பதிவு உறுதி!',
      select_pooja_error: 'ஒரு பூஜையைத் தேர்வுசெய்யவும்',
      fill_details_error: 'அனைத்து விவரங்களையும் நிரப்பவும்',

      search_temples: 'கோயில்களைத் தேடுங்கள்...',
      all_categories: 'அனைத்து வகைகள்',
      famous: 'பிரபலம்',
      history_label: 'வரலாறு',
      fun_facts: 'சுவாரஸ்ய தகவல்கள்',

      temple_services: 'கோயில் சேவைகள்',
      daily_rituals: 'தினசரி வழிபாட்டு முறைகள்',
      temple_history: 'கோயில் வரலாறு',
      interesting_facts: 'சுவாரஸ்யமான தகவல்கள்',
      how_to_reach: 'எப்படி செல்வது',
      by_train: 'ரயிலில்',
      by_bus: 'பஸ்ஸில்',
      by_road: 'சாலை வழி',
      by_air: 'விமானம் வழி',
      bus_routes: 'பஸ் வழித்தடங்கள்',
      parking: 'வாகன நிறுத்தம்',
      travel_tips: 'பயண குறிப்புகள்',
      view_maps: 'Google Maps இல் காணுங்கள்',
      back: 'பின்செல்',

      confirm: 'உறுதிசெய்',
      cancel: 'ரத்து',
      ok: 'சரி',
      done: 'முடிந்தது',
      loading: 'ஏற்றுகிறது...',
      error: 'பிழை',
      success: 'வெற்றி',

      footer_copy: '© 2026 டெம்பிள் டிஜிட்டல். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

      select_language: 'மொழியைத் தேர்வுசெய்யவும்',
      lang_english: 'English - ஆங்கிலம்',
      lang_tamil: 'தமிழ்',
      lang_hindi: 'Hindi - இந்தி',
      lang_telugu: 'Telugu - தெலுங்கு',
      language_changed: 'மொழி மாற்றப்பட்டது:',

      daily_pooja_title: 'தினசரி பூஜை சேவைகள்',
      homam_booking_title: 'ஹோமம் முன்பதிவு',
      family_booking_title: 'குடும்ப நிகழ்வுகள்',
      motta_booking_title: 'மொட்டை முன்பதிவு',
      annadhanam_title: 'அன்னதான சேவை',
      nalla_neram_title: 'நல்ல நேரம்',
      rasi_palan_title: 'ராசிபலன்',
      prasadam_title: 'பிரசாதம் & கோயில் கடை',
      my_bookings_title: 'எனது முன்பதிவுகள்',
      live_darshan_title: 'நேரடி தரிசனம்',
      events_title: 'கோயில் நிகழ்வுகள்',
      feed_title: 'கோயில் செய்திகள்',
      temple_list_title: 'கோயில்கள்'
    },

    // ============================
    // HINDI
    // ============================
    hi: {
      app_name: 'टेम्पल डिजिटल',
      app_tagline: 'आपका दिव्य कनेक्शन ऑनलाइन',
      greeting_morning: 'सुप्रभात',
      greeting_afternoon: 'नमस्कार',
      greeting_evening: 'शुभ संध्या',

      nav_home: 'होम',
      nav_temples: 'मंदिर',
      nav_feed: 'फ़ीड',
      nav_profile: 'प्रोफ़ाइल',
      nav_pooja: 'पूजा',
      nav_donate: 'दान',

      welcome_devotee: 'स्वागत है, भक्त',
      login: 'लॉगिन',
      register: 'रजिस्टर',
      email_or_phone: 'ईमेल या फ़ोन',
      enter_email_phone: 'ईमेल या फ़ोन नंबर दर्ज करें',
      password: 'पासवर्ड',
      enter_password: 'पासवर्ड दर्ज करें',
      forgot_password: 'पासवर्ड भूल गए?',
      full_name: 'पूरा नाम',
      enter_full_name: 'अपना पूरा नाम दर्ज करें',
      email: 'ईमेल',
      enter_email: 'ईमेल पता दर्ज करें',
      phone_number: 'फ़ोन नंबर',
      enter_phone: 'फ़ोन नंबर दर्ज करें',
      create_password: 'पासवर्ड बनाएं',
      create_account: 'खाता बनाएं',
      login_success: 'लॉगिन सफल!',
      fill_all_fields: 'सभी फ़ील्ड भरें',
      account_created: 'खाता सफलतापूर्वक बनाया गया!',
      password_reset: 'पासवर्ड रीसेट लिंक भेजा गया!',

      quick_services: 'त्वरित सेवाएं',
      browse_temples: 'मंदिर देखें',
      book_pooja: 'पूजा बुक करें',
      donate_label: 'दान',
      darshan_token: 'दर्शन टोकन',
      live_darshan: 'लाइव दर्शन',
      annadhanam: 'अन्नदानम',
      nalla_neram: 'शुभ मुहूर्त',
      rasi_palan: 'राशिफल',
      todays_panchang: 'आज का पंचांग',
      temple_categories: 'मंदिर श्रेणियां',
      see_all: 'सभी देखें',
      browse_by_district: 'जिलेवार देखें',
      all_temples: 'सभी मंदिर',
      featured_temples: 'विशेष मंदिर',
      latest_updates: 'नवीनतम अपडेट',
      show_all_districts: 'सभी जिले दिखाएं',
      show_less: 'कम दिखाएं',
      temples_suffix: 'मंदिर',
      explore_sacred: 'भारत के पवित्र मंदिरों का अन्वेषण करें',
      discover_worship: '30+ मंदिरों में सेवाओं की खोज और बुकिंग करें',

      cat_shiva: 'शिव',
      cat_vishnu: 'विष्णु',
      cat_devi: 'देवी',
      cat_ganesh: 'गणेश',
      cat_murugan: 'मुरुगन',
      cat_hanuman: 'हनुमान',
      cat_local: 'स्थानीय',

      devotee: 'भक्त',
      bookings: 'बुकिंग',
      donations: 'दान',
      following: 'फ़ॉलोइंग',
      total_given: 'कुल दान',
      my_bookings_donations: 'मेरी बुकिंग और दान',
      view_booking_history: 'अपनी सभी बुकिंग और दान का इतिहास देखें',
      daily_pooja: 'दैनिक पूजा',
      daily_pooja_desc: 'अर्चना, अभिषेकम और दैनिक सेवाएं',
      homam_services: 'हवन सेवाएं',
      homam_desc: 'पवित्र अग्नि अनुष्ठान बुक करें',
      family_functions: 'पारिवारिक कार्यक्रम',
      family_desc: 'विवाह, नामकरण, उपनयन',
      motta_booking: 'मुंडन बुकिंग',
      motta_desc: 'मुंडन सेवा बुक करें',
      my_donations: 'मेरे दान',
      my_donations_desc: 'दान रसीदें देखें',
      annadhanam_desc: 'भक्तों को मुफ्त भोजन प्रायोजित करें',
      nalla_neram_desc: 'दैनिक शुभ समय और पंचांग',
      rasi_palan_desc: 'सभी 12 राशियों के लिए दैनिक राशिफल',
      darshan_token_desc: 'वर्चुअल कतार टोकन बुक करें',
      prasadam_shop: 'प्रसाद और दुकान',
      prasadam_desc: 'प्रसाद और पूजा सामग्री ऑर्डर करें',
      followed_temples: 'फ़ॉलो किए मंदिर',
      followed_desc: 'जिन मंदिरों को आप फ़ॉलो कर रहे हैं',
      updates_feed: 'अपडेट फ़ीड',
      updates_desc: 'नवीनतम मंदिर समाचार और अपडेट',
      notifications: 'सूचनाएं',
      notifications_desc: 'अलर्ट और रिमाइंडर प्रबंधित करें',
      language: 'भाषा',
      language_desc: 'अंग्रेज़ी, तमिल, हिंदी, तेलुगू',
      help_support: 'सहायता और समर्थन',
      help_desc: 'मंदिर प्रशासन से संपर्क करें',
      about: 'बारे में',
      about_desc: 'ऐप संस्करण और शर्तें',
      logout: 'लॉगआउट',
      logged_out: 'सफलतापूर्वक लॉगआउट',
      notifications_enabled: 'सूचनाएं सक्रिय',
      edit_profile: 'प्रोफ़ाइल संपादित करें',
      save_profile: 'प्रोफ़ाइल सहेजें',
      profile_updated: 'प्रोफ़ाइल अपडेट किया गया!',
      cancel: 'रद्द करें',

      temple_donation: 'मंदिर दान',
      select_amount: 'राशि चुनें',
      or_enter_custom: 'या अपनी राशि दर्ज करें',
      donation_type: 'दान का प्रकार',
      donor_details: 'दानकर्ता विवरण',
      name: 'नाम',
      enter_name: 'अपना नाम दर्ज करें',
      phone: 'फ़ोन',
      donate_now: 'अभी दान करें',
      donation_successful: 'दान सफल!',
      thank_contribution: 'आपके उदार योगदान के लिए धन्यवाद',
      donation_receipt: 'दान रसीद',

      select_language: 'भाषा चुनें',
      lang_english: 'English - अंग्रेज़ी',
      lang_tamil: 'Tamil - तमिल',
      lang_hindi: 'हिंदी',
      lang_telugu: 'Telugu - तेलुगू',
      language_changed: 'भाषा बदली गई:',

      temple_services: 'मंदिर सेवाएं',
      daily_rituals: 'दैनिक पूजा अनुसूची',
      temple_history: 'मंदिर का इतिहास',
      interesting_facts: 'रोचक तथ्य',
      how_to_reach: 'कैसे पहुंचें',
      by_train: 'ट्रेन से',
      by_bus: 'बस से',
      by_road: 'सड़क से',
      by_air: 'हवाई मार्ग से',
      back: 'वापस',

      confirm: 'पुष्टि करें',
      cancel: 'रद्द करें',
      ok: 'ठीक है',
      done: 'पूर्ण',
      footer_copy: '© 2026 टेम्पल डिजिटल. सर्वाधिकार सुरक्षित.',

      daily_pooja_title: 'दैनिक पूजा सेवाएं',
      homam_booking_title: 'हवन बुकिंग',
      family_booking_title: 'पारिवारिक कार्यक्रम',
      motta_booking_title: 'मुंडन बुकिंग',
      annadhanam_title: 'अन्नदानम सेवा',
      nalla_neram_title: 'शुभ मुहूर्त',
      rasi_palan_title: 'राशिफल',
      prasadam_title: 'प्रसाद और मंदिर दुकान',
      my_bookings_title: 'मेरी बुकिंग',
      live_darshan_title: 'लाइव दर्शन',
      events_title: 'मंदिर कार्यक्रम',
      feed_title: 'मंदिर फ़ीड',
      temple_list_title: 'मंदिर',
      search_temples: 'मंदिर खोजें...',

      // My Activity / Bookings
      my_activity: 'मेरी गतिविधि',
      bookings: 'बुकिंग',
      donations: 'दान',
      no_bookings: 'अभी तक कोई बुकिंग नहीं',
      no_bookings_desc: 'आपकी पूजा, हवन और मुंडन बुकिंग यहां दिखाई देंगी।',
      browse_poojas: 'पूजाएं देखें',
      no_donations: 'अभी तक कोई दान नहीं',
      no_donations_desc: 'आपके दान और अन्नदानम प्रायोजन यहां दिखाई देंगे।',
      make_donation: 'दान करें',
      events_festivals: 'कार्यक्रम और त्योहार',

      temple_liked: 'मंदिर पसंद किया!',
      temple_unliked: 'पसंद हटाया',
      link_copied: 'लिंक कॉपी किया गया!',
      share_failed: 'शेयर उपलब्ध नहीं',
      select_rating: 'कृपया रेटिंग चुनें',
      write_review_error: 'कृपया समीक्षा लिखें',
      review_submitted: 'समीक्षा सबमिट! धन्यवाद।',

      temple_followed: 'इस मंदिर को फ़ॉलो कर रहे हैं!',
      temple_unfollowed: 'अनफ़ॉलो किया',
      stories_coming_soon: 'स्टोरीज़ जल्द आ रहीं!',
      post_saved: 'पोस्ट सेव किया!',
      post_unsaved: 'पोस्ट हटाया',
      comment_added: 'टिप्पणी पोस्ट!',
      write_comment: 'कृपया टिप्पणी लिखें'
    },

    // ============================
    // TELUGU
    // ============================
    te: {
      app_name: 'టెంపుల్ డిజిటల్',
      app_tagline: 'మీ దివ్య కనెక్షన్ ఆన్‌లైన్‌లో',
      greeting_morning: 'శుభోదయం',
      greeting_afternoon: 'నమస్కారం',
      greeting_evening: 'శుభ సాయంత్రం',

      nav_home: 'హోమ్',
      nav_temples: 'దేవాలయాలు',
      nav_feed: 'ఫీడ్',
      nav_profile: 'ప్రొఫైల్',
      nav_pooja: 'పూజ',
      nav_donate: 'విరాళం',

      welcome_devotee: 'స్వాగతం, భక్తుడా',
      login: 'లాగిన్',
      register: 'రిజిస్టర్',
      password: 'పాస్‌వర్డ్',
      forgot_password: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      full_name: 'పూర్తి పేరు',
      email: 'ఇమెయిల్',
      phone_number: 'ఫోన్ నంబర్',
      create_account: 'ఖాతా సృష్టించు',
      login_success: 'లాగిన్ విజయవంతం!',
      fill_all_fields: 'అన్ని ఫీల్డ్‌లు నింపండి',

      quick_services: 'త్వరిత సేవలు',
      browse_temples: 'దేవాలయాలు చూడండి',
      book_pooja: 'పూజ బుక్ చేయండి',
      donate_label: 'విరాళం',
      darshan_token: 'దర్శన్ టోకెన్',
      live_darshan: 'లైవ్ దర్శనం',
      annadhanam: 'అన్నదానం',
      nalla_neram: 'శుభ ముహూర్తం',
      rasi_palan: 'రాశిఫలం',
      todays_panchang: 'నేటి పంచాంగం',
      temple_categories: 'దేవాలయ విభాగాలు',
      see_all: 'అన్నీ చూడు',
      browse_by_district: 'జిల్లా వారీగా',
      all_temples: 'అన్ని దేవాలయాలు',
      featured_temples: 'ప్రత్యేక దేవాలయాలు',
      latest_updates: 'తాజా నవీకరణలు',
      show_all_districts: 'అన్ని జిల్లాలు చూపు',
      show_less: 'తక్కువ చూపు',
      temples_suffix: 'దేవాలయాలు',

      cat_shiva: 'శివుడు',
      cat_vishnu: 'విష్ణు',
      cat_devi: 'దేవి',
      cat_ganesh: 'గణేష్',
      cat_murugan: 'మురుగన్',
      cat_hanuman: 'హనుమాన్',
      cat_local: 'స్థానికం',

      devotee: 'భక్తుడు',
      bookings: 'బుకింగ్‌లు',
      donations: 'విరాళాలు',
      following: 'ఫాలో',
      total_given: 'మొత్తం విరాళం',
      daily_pooja: 'రోజువారీ పూజ',
      homam_services: 'హోమం సేవలు',
      family_functions: 'కుటుంబ కార్యక్రమాలు',
      my_donations: 'నా విరాళాలు',
      notifications: 'నోటిఫికేషన్లు',
      language: 'భాష',
      language_desc: 'ఆంగ్లం, తమిళం, హిందీ, తెలుగు',
      help_support: 'సహాయం & మద్దతు',
      about: 'గురించి',
      logout: 'లాగౌట్',
      logged_out: 'విజయవంతంగా లాగౌట్',
      edit_profile: 'ప్రొఫైల్ మార్చండి',
      save_profile: 'ప్రొఫైల్ సేవ్ చేయండి',
      profile_updated: 'ప్రొఫైల్ అప్‌డేట్ అయింది!',
      cancel: 'రద్దు',

      temple_donation: 'దేవాలయ విరాళం',
      select_amount: 'మొత్తాన్ని ఎంచుకోండి',
      donation_type: 'విరాళ రకం',
      donor_details: 'విరాళదారు వివరాలు',
      name: 'పేరు',
      phone: 'ఫోన్',
      donate_now: 'ఇప్పుడు విరాళం ఇవ్వండి',
      donation_successful: 'విరాళం విజయవంతం!',
      donation_receipt: 'విరాళ రసీదు',

      select_language: 'భాషను ఎంచుకోండి',
      lang_english: 'English - ఆంగ్లం',
      lang_tamil: 'Tamil - తమిళం',
      lang_hindi: 'Hindi - హిందీ',
      lang_telugu: 'తెలుగు',
      language_changed: 'భాష మారింది:',

      temple_services: 'దేవాలయ సేవలు',
      daily_rituals: 'రోజువారీ పూజా షెడ్యూల్',
      temple_history: 'దేవాలయ చరిత్ర',
      interesting_facts: 'ఆసక్తికరమైన విషయాలు',
      how_to_reach: 'ఎలా చేరుకోవాలి',
      by_train: 'రైలులో',
      by_bus: 'బస్సులో',
      by_road: 'రోడ్డు ద్వారా',
      by_air: 'విమానం ద్వారా',
      back: 'వెనుకకు',

      confirm: 'నిర్ధారించు',
      cancel: 'రద్దు',
      ok: 'సరే',
      done: 'పూర్తి',
      footer_copy: '© 2026 టెంపుల్ డిజిటల్. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',

      daily_pooja_title: 'రోజువారీ పూజ సేవలు',
      homam_booking_title: 'హోమం బుకింగ్',
      family_booking_title: 'కుటుంబ కార్యక్రమాలు',
      annadhanam_title: 'అన్నదాన సేవ',
      nalla_neram_title: 'శుభ ముహూర్తం',
      rasi_palan_title: 'రాశిఫలం',
      prasadam_title: 'ప్రసాదం & దేవాలయ షాపు',
      my_bookings_title: 'నా బుకింగ్‌లు',
      live_darshan_title: 'లైవ్ దర్శనం',
      events_title: 'దేవాలయ కార్యక్రమాలు',
      feed_title: 'దేవాలయ ఫీడ్',
      temple_list_title: 'దేవాలయాలు',
      search_temples: 'దేవాలయాలు వెతకండి...',

      // My Activity / Bookings
      my_activity: 'నా కార్యకలాపం',
      bookings: 'బుకింగ్‌లు',
      donations: 'విరాళాలు',
      no_bookings: 'ఇంకా బుకింగ్‌లు లేవు',
      no_bookings_desc: 'మీ పూజ, హోమం, మొట్ట బుకింగ్‌లు ఇక్కడ కనిపిస్తాయి.',
      browse_poojas: 'పూజలు చూడండి',
      no_donations: 'ఇంకా విరాళాలు లేవు',
      no_donations_desc: 'మీ విరాళాలు మరియు అన్నదానం స్పాన్సర్‌షిప్‌లు ఇక్కడ కనిపిస్తాయి.',
      make_donation: 'విరాళం ఇవ్వండి',
      events_festivals: 'కార్యక్రమాలు & పండుగలు',

      temple_liked: 'దేవాలయం ఇష్టపడింది!',
      temple_unliked: 'ఇష్టం తొలగించబడింది',
      link_copied: 'లింక్ కాపీ చేయబడింది!',
      share_failed: 'షేర్ అందుబాటులో లేదు',
      select_rating: 'దయచేసి రేటింగ్ ఎంచుకోండి',
      write_review_error: 'దయచేసి సమీక్ష రాయండి',
      review_submitted: 'సమీక్ష సమర్పించబడింది! ధన్యవాదాలు.',

      temple_followed: 'ఈ దేవాలయాన్ని అనుసరిస్తున్నారు!',
      temple_unfollowed: 'అన్‌ఫాలో చేయబడింది',
      stories_coming_soon: 'స్టోరీలు త్వరలో వస్తాయి!',
      post_saved: 'పోస్ట్ సేవ్ చేయబడింది!',
      post_unsaved: 'పోస్ట్ తొలగించబడింది',
      comment_added: 'వ్యాఖ్య పోస్ట్ చేయబడింది!',
      write_comment: 'దయచేసి వ్యాఖ్య రాయండి'
    }
  };

  // Language names for display
  var langNames = {
    en: { name: 'English', native: 'English', flag: '🇬🇧' },
    ta: { name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    hi: { name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    te: { name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' }
  };

  // Get current language
  function getCurrentLang() {
    return localStorage.getItem('temple_app_language') || 'en';
  }

  // Set language
  function setLang(lang) {
    if (!translations[lang]) lang = 'en';
    localStorage.setItem('temple_app_language', lang);
    return lang;
  }

  // Translate function - returns translated string or fallback
  function t(key, fallback) {
    var lang = getCurrentLang();
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  }

  // Apply translations to all elements with data-lang attribute
  function applyLanguage() {
    var lang = getCurrentLang();
    var dict = translations[lang] || translations.en;

    // Translate elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(function(el) {
      var key = el.getAttribute('data-lang');
      var val = dict[key] || (translations.en && translations.en[key]);
      if (val) {
        // Check if it's an input placeholder
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', val);
        } else {
          el.textContent = val;
        }
      }
    });

    // Translate elements with data-lang-placeholder
    document.querySelectorAll('[data-lang-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-lang-placeholder');
      var val = dict[key] || (translations.en && translations.en[key]);
      if (val) {
        el.setAttribute('placeholder', val);
      }
    });

    // Translate elements with data-lang-title attribute (for page titles in headers)
    document.querySelectorAll('[data-lang-title]').forEach(function(el) {
      var key = el.getAttribute('data-lang-title');
      var val = dict[key] || (translations.en && translations.en[key]);
      if (val) {
        el.textContent = val;
      }
    });

    // Update page title
    var pageTitle = document.querySelector('title');
    if (pageTitle) {
      var appName = dict.app_name || 'Temple Digital';
      var currentTitle = pageTitle.textContent;
      var dashIdx = currentTitle.indexOf(' - ');
      if (dashIdx > -1) {
        var pagePart = currentTitle.substring(0, dashIdx);
        // Try to translate the page part
        pageTitle.textContent = pagePart + ' - ' + appName;
      }
    }

    // Update document lang attribute
    document.documentElement.lang = lang === 'ta' ? 'ta' : lang === 'hi' ? 'hi' : lang === 'te' ? 'te' : 'en';
  }

  // Show language selection modal
  function showLanguageModal() {
    var currentLang = getCurrentLang();
    var dict = translations[currentLang] || translations.en;

    // Remove existing modal if any
    var existing = document.getElementById('lang-modal-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'lang-modal-overlay';
    overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:9999; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeIn 0.3s ease;';

    var modal = document.createElement('div');
    modal.style.cssText = 'background:white; border-radius:16px; width:100%; max-width:340px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.3); animation:slideUp 0.3s ease;';

    // Header
    var header = document.createElement('div');
    header.style.cssText = 'background:linear-gradient(135deg, #e65100, #bf360c); color:white; padding:18px 20px; text-align:center;';
    header.innerHTML = '<div style="font-size:1.8rem; margin-bottom:6px;">🌐</div><h3 style="font-size:1.05rem; font-weight:700;">' + (dict.select_language || 'Select Language') + '</h3>';
    modal.appendChild(header);

    // Language options
    var body = document.createElement('div');
    body.style.cssText = 'padding:12px;';

    var langs = ['en', 'ta', 'hi', 'te'];
    langs.forEach(function(code) {
      var info = langNames[code];
      var isActive = code === currentLang;

      var item = document.createElement('div');
      item.style.cssText = 'display:flex; align-items:center; gap:12px; padding:14px 16px; border-radius:12px; cursor:pointer; transition:all 0.2s; margin-bottom:4px;' +
        (isActive ? 'background:#fff3e0; border:2px solid #e65100;' : 'border:2px solid #f5f5f5; background:white;');

      item.innerHTML =
        '<span style="font-size:1.5rem;">' + info.flag + '</span>' +
        '<div style="flex:1;">' +
          '<div style="font-size:0.95rem; font-weight:700; color:' + (isActive ? '#e65100' : '#333') + ';">' + info.native + '</div>' +
          '<div style="font-size:0.75rem; color:#999;">' + info.name + '</div>' +
        '</div>' +
        (isActive ? '<span style="color:#e65100; font-size:1.2rem; font-weight:700;">✓</span>' : '');

      item.onmouseenter = function() { if (!isActive) item.style.background = '#fafafa'; };
      item.onmouseleave = function() { if (!isActive) item.style.background = 'white'; };

      item.onclick = function() {
        if (code !== currentLang) {
          setLang(code);
          overlay.remove();
          // Show toast
          if (typeof showToast === 'function') {
            var msg = (translations[code] && translations[code].language_changed) || 'Language changed to';
            showToast(msg + ' ' + info.native, 'success');
          }
          // Reload page to apply all translations
          setTimeout(function() {
            window.location.reload();
          }, 800);
        } else {
          overlay.remove();
        }
      };

      body.appendChild(item);
    });

    modal.appendChild(body);

    // Close button
    var closeDiv = document.createElement('div');
    closeDiv.style.cssText = 'padding:0 12px 14px;';
    var closeBtn = document.createElement('button');
    closeBtn.style.cssText = 'width:100%; padding:12px; border:none; border-radius:10px; background:#f5f5f5; font-size:0.88rem; font-weight:600; color:#666; cursor:pointer;';
    closeBtn.textContent = dict.cancel || 'Cancel';
    closeBtn.onclick = function() { overlay.remove(); };
    closeDiv.appendChild(closeBtn);
    modal.appendChild(closeDiv);

    overlay.appendChild(modal);

    // Close on overlay click
    overlay.onclick = function(e) {
      if (e.target === overlay) overlay.remove();
    };

    document.body.appendChild(overlay);
  }

  // Auto-apply on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    applyLanguage();
  });

  // Public API
  return {
    t: t,
    getCurrentLang: getCurrentLang,
    setLang: setLang,
    applyLanguage: applyLanguage,
    showLanguageModal: showLanguageModal,
    translations: translations,
    langNames: langNames
  };

})();

// Shortcut function for easy access
function t(key, fallback) {
  return LANG.t(key, fallback);
}
