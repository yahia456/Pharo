
// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
    // disable animations on small screens to avoid layout jumps
    disable: function() {
        return window.innerWidth < 768; // disable on mobile
    }
});


// Main initialization function
function initializeApplication() {


    // Initialize page elements and core features
    initializeLanguage();
    initializeSwiper();
    contactHeaderHandler();
    initHeaderState();
    initializePageElements();
}

// تهيئة اللغة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeApplication);
// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = this.getAttribute('href');
        if (target && target.length > 1 && document.querySelector(target)) {
            e.preventDefault();
            // Close Bootstrap navbar collapse if open (mobile)
            const bsCollapseEl = document.getElementById('mainNavbar');
            if (bsCollapseEl && bsCollapseEl.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(bsCollapseEl) || new bootstrap.Collapse(bsCollapseEl, {toggle:false});
                bsCollapse.hide();
            }
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Auto-hide/show navbar on scroll + white background when not over hero
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
// pick hero section: #home (index) or .contact-hero (contact page)
const hero = document.getElementById('home') || document.querySelector('.contact-hero');

window.addEventListener('scroll', function() {
    if (!header) return;
    // Auto-hide/show
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;

    // Transparent over hero, white background after hero
    if (hero) {
        const headerHeight = header.offsetHeight;
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.bottom > headerHeight) {
            // still over the hero area
            header.classList.add('contact-top');
            header.classList.remove('scrolled');
        } else {
            // scrolled past the hero
            header.classList.remove('contact-top');
            header.classList.add('scrolled');
        }
    }
});

// Language Switch Implementation
const translations = {
    en: {
        // Navigation
        home: 'Home',
        destinations: 'Popular Destinations',
        virtualTour: '360° Virtual Tours',
        packages: 'Tour Packages',
        about: 'About',
        contact: 'Contact',
        language: 'العربية',
        
        // Hero Section
        heroTitle: 'Discover the Magic of Ancient Egypt',
        heroSubtitle: 'Experience thousands of years of history and culture',
        exploreBtn: 'Explore Now',
        
        // Destinations
        pyramids: 'Great Pyramids of Giza',
        pyramidsDesc: 'The last surviving wonder of the ancient world',
    // Select-friendly destination keys (used by planner select)
    dest_giza: 'Great Pyramids of Giza',
    dest_luxor: 'Luxor Temple',
    dest_aswan: 'Aswan / Abu Simbel',
    dest_alex: 'Bibliotheca Alexandrina',
        luxor: 'Luxor Temple',
        luxorDesc: 'Ancient Egyptian temple complex',
        abuSimbel: 'Abu Simbel Temple',
        abuSimbelDesc: 'Architectural masterpiece from the reign of Ramesses II',
        museum: 'Egyptian Museum',
        museumDesc: 'Home of ancient Egyptian artifacts',
        karnak: 'Karnak Temple',
        karnakDesc: 'Largest religious site in the ancient world',
        valley: 'Valley of the Kings',
        valleyDesc: 'Burial ground of Egyptian pharaohs',
        alexandria: 'Alexandria Library',
        alexandriaDesc: 'Beacon of knowledge and culture',
        
        // Virtual Tours
        virtualToursTitle: '360° Virtual Tours',
        tourDescription: 'Explore the wonders of ancient Egypt with 360° technology. Walk through famous archaeological sites as if you were there.',
        pyramidsTour: 'Great Pyramids - Virtual Tour',
        pyramidsTourDesc: 'Discover the greatness of the Pyramids and Sphinx up close. See the amazing construction details and surrounding views.',
        luxorTour: 'Luxor Temple - Virtual Tour',
        luxorTourDesc: 'Walk through the corridors of the historic Luxor Temple. See the carvings and giant columns up close.',
        karnakTour: 'Karnak Temple - Virtual Tour',
        karnakTourDesc: 'Explore the largest religious complex in the ancient world. Walk among the massive columns and pharaonic obelisks.',
        abuSimbelTour: 'Abu Simbel - Virtual Tour',
        abuSimbelTourDesc: 'See the splendor of Abu Simbel Temple and its giant statues. Discover the secrets of this unique temple.',
        fullscreen: 'Full Screen',
        guide: 'Tour Guide',
        
        // Packages
        packagesTitle: 'Tour Packages',
        classicPackage: 'Classic Egypt',
        classicPrice: '$999',
        classicDuration: '5 Days / 4 Nights',
        classicFeatures: [
            'Pyramids & Sphinx Tour',
            'Egyptian Museum Visit',
            'Nile Dinner Cruise',
            'Luxury Accommodation'
        ],
        
        luxuryPackage: 'Luxury Nile Cruise',
        luxuryPrice: '$1,499',
        luxuryDuration: '8 Days / 7 Nights',
        luxuryFeatures: [
            'Luxor to Aswan Cruise',
            'All Temple Visits',
            'Full Board Meals',
            'Expert Guide'
        ],
        
        adventurePackage: 'Adventure Explorer',
        adventurePrice: '$1,299',
        adventureDuration: '7 Days / 6 Nights',
        adventureFeatures: [
            'Desert Safari',
            'Red Sea Snorkeling',
            'Historical Sites',
            'Bedouin Experience'
        ],
        
        // Hotel options for planner
        hotel_standard: 'Comfort',
        hotel_deluxe: 'Comfort Plus',
        hotel_luxury: 'Royal Suite',

        // Buttons
        learnMore: 'Learn More',
        bookNow: 'Book Now',
    // Footer (site-wide)
    footerAbout: 'Your gateway to ancient Egyptian wonders',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Information',
    email: 'Email: info@pharohtour.com',
    phone: 'Phone: +20 123 456 789',
    followUs: 'Follow Us',
    // Planner
    planner_title: 'Plan Your Trip',
    planner_destination_label: 'Destination',
    planner_nights_label: 'Nights',
    planner_hotel_label: 'Hotel Type',
    planner_guests_label: 'Guests',
    planner_calc: 'Calculate',
    planner_result: 'Estimated cost',
        
        // Loading Screen
        loadingTitle: 'PHAROH TOUR',
        loadingSubtitle: 'Discover the Magic of Ancient Egypt',
        
        // About Us Section
        aboutTitle: 'About Us',
        aboutSubtitle: 'PHAROH TOUR - Your Gateway to Ancient Egyptian Wonders',
        aboutDesc1: 'We are a leading tourism company specialized in providing unique and distinctive tourism experiences in Egypt. Since our establishment, we have been working to provide the best tourism services to our valued customers.',
        aboutDesc2: 'We are proud to offer professional tours that include the most important historical landmarks in Egypt, from the Great Pyramids to the temples of Luxor and Aswan, through world museums and unique archaeological sites.',
        
        // Features
        feature1Title: '15+ Years Experience',
        feature1Desc: 'Long experience in Egyptian tourism',
        feature2Title: '+50,000 Tourists',
        feature2Desc: 'We served more than 50,000 tourists from around the world',
        feature3Title: '4.9/5 Rating',
        feature3Desc: 'Excellent rating from our customers on all platforms',
        feature4Title: 'Quality Guarantee',
        feature4Desc: 'We guarantee you a safe, comfortable and enjoyable trip',
        
        // Team Section
        teamTitle: 'Our Professional Team',
        team1Name: 'Any Name',
        team1Position: 'Any position',
        team1Desc: '20 years experience in Egyptian tourism',
        team2Name: 'Any Name',
        team2Position: 'Any position',
        team2Desc: 'Specialized in coordinating tourism trips',
        team3Name: 'Any Name',
        team3Position: 'Any position',
        team3Desc: 'Expert in ancient Egyptian history',
    },    
    
    ar: {
        // Navigation
        home: 'الرئيسية',
        destinations: 'الوجهات السياحية الشهيرة',
        virtualTour: 'جولة افتراضية 360 درجة',
        packages: 'الباقات السياحية',
        about: 'عن الشركة',
        contact: 'اتصل بنا',
        language: 'English',
        
        // Hero Section
        heroTitle: 'اكتشف سحر مصر القديمة',
        heroSubtitle: 'عش تجربة آلاف السنين من التاريخ والحضارة',
        exploreBtn: 'اكتشف الآن',
        
        // Destinations
        pyramids: 'أهرامات الجيزة',
        pyramidsDesc: 'آخر عجائب العالم القديم الباقية',
    // keys for planner selects
    dest_giza: 'أهرامات الجيزة',
    dest_luxor: 'معبد الأقصر',
    dest_aswan: 'أسوان / أبو سمبل',
    dest_alex: 'مكتبة الإسكندرية',
        luxor: 'معبد الأقصر',
        luxorDesc: 'مجمع المعابد المصرية القديمة',
        abuSimbel: 'معبد أبو سمبل',
        abuSimbelDesc: 'تحفة معمارية من عصر رمسيس الثاني',
        museum: 'المتحف المصري',
        museumDesc: 'موطن الآثار المصرية القديمة',
        karnak: 'معبد الكرنك',
        karnakDesc: 'أكبر دار عبادة دينية في العالم القديم',
        valley: 'وادي الملوك',
        valleyDesc: 'مقبرة ملوك مصر القديمة',
        alexandria: 'مكتبة الإسكندرية',
        alexandriaDesc: 'منارة المعرفة والثقافة',
        
        // Virtual Tours
        virtualToursTitle: 'جولات افتراضية 360 درجة',
        tourDescription: 'استكشف عجائب مصر القديمة بتقنية 360 درجة. تجول في المواقع الأثرية الشهيرة وكأنك هناك.',
        pyramidsTour: 'أهرامات الجيزة - جولة افتراضية',
        pyramidsTourDesc: 'اكتشف عظمة الأهرامات وأبو الهول عن قرب. شاهد تفاصيل البناء المذهلة والمناظر المحيطة.',
        luxorTour: 'معبد الأقصر - جولة افتراضية',
        luxorTourDesc: 'تجول في أروقة معبد الأقصر التاريخي. شاهد النقوش والأعمدة العملاقة عن قرب.',
        karnakTour: 'معبد الكرنك - جولة افتراضية',
        karnakTourDesc: 'استكشف أكبر المجمعات الدينية في العالم القديم. تجول بين الأعمدة الضخمة والمسلات الفرعونية.',
        abuSimbelTour: 'معبد أبو سمبل - جولة افتراضية',
        abuSimbelTourDesc: 'شاهد روعة معبد أبو سمبل وتماثيله العملاقة. اكتشف أسرار هذا المعبد الفريد.',
        fullscreen: 'عرض كامل الشاشة',
        guide: 'الدليل السياحي',
        
        // Buttons
        learnMore: 'اكتشف المزيد',
        bookNow: 'احجز الآن',
        // Footer (site-wide)
        footerAbout: 'بوابتك إلى عجائب مصر القديمة',
        quickLinks: 'روابط سريعة',
        contactInfo: 'معلومات الاتصال',
        email: 'البريد الإلكتروني: info@pharohtour.com',
        phone: 'الهاتف: ٢٠+ ١٢٣ ٤٥٦ ٧٨٩',
        followUs: 'تابعنا',
        adventurePrice: '1,299 دولار',
        adventureDuration: '7 أيام / 6 ليالي',
        adventureFeatures: [
            'سفاري الصحراء',
            'غوص في البحر الأحمر',
            'المواقع التاريخية',
            'تجربة بدوية'
        ],
        
    // Planner
    planner_title: 'خطط لرحلتك',
    planner_destination_label: 'الوجهة',
    planner_nights_label: 'عدد الليالي',
    planner_hotel_label: 'نوع الفندق',
    hotel_standard: 'مريح',
    hotel_deluxe: 'مريح بلس',
    hotel_luxury: 'الجناح الملكي',
    planner_guests_label: 'عدد الضيوف',
    planner_calc: 'احسب',
    planner_result: 'التكلفة المقدرة',
        
        // Loading Screen
        loadingTitle: 'فرعون تور',
        loadingSubtitle: 'اكتشف سحر مصر القديمة',
        
        // About Us Section
        aboutTitle: 'عن الشركة',
        aboutSubtitle: 'فرعون تور - بوابتك إلى عجائب مصر القديمة',
        aboutDesc1: 'نحن شركة سياحية رائدة متخصصة في تقديم تجربة سياحية فريدة ومميزة في مصر. منذ تأسيسنا ، نحن نعمل على تقديم أفضل خدمات السياحة لعملائنا المهمين.',
        aboutDesc2: 'نحن سعداء بتقديم جولات سياحية محترفة تشمل أهم المعالم التاريخية في مصر، من أهرامات الجيزة إلى معابد الأقصر وأسوان، من خلال المتاحف العالمية والمواقع الأثرية الفريدة.',
        
        // Features
        feature1Title: 'خبرة 15+ سنة',
        feature1Desc: 'خبرة طويلة في سياحة مصر',
        feature2Title: '+50,000 سائح',
        feature2Desc: 'خدمنا أكثر من 50,000 سائح من جميع أنحاء العالم',
        feature3Title: 'تصنيف 4.9/5',
        feature3Desc: 'تصنيف ممتاز من عملائنا على جميع المنصات',
        feature4Title: 'تأكيد الجودة',
        feature4Desc: 'نحن نضمن لك رحلة آمنة، مريحة، وممتعة',
        
        // Team Section
        teamTitle: 'فريقنا المحترف',
        team1Name: 'اي اسم',
        team1Position: 'اي منصب',
        team1Desc: 'خبرة 20 عاماً في سياحة مصر',
        team2Name: 'اي اسم',
        team2Position: 'اي منصب',
        team2Desc: 'متخصص في تنظيم رحلات سياحية',
        team3Name: 'اي اسم',
        team3Position: 'اي منصب',
        team3Desc: 'خبير في التاريخ المصري القديم',
    }
};

let currentLang = 'ar';

// Update translations object with missing translations
translations.en = {
    ...translations.en,
    // Reviews Section
    reviewsTitle: 'Customer Reviews',
    reviewText1: 'An unforgettable experience with a highly professional team!',
    reviewText2: 'Excellent services and hotels exceeded expectations.',
    reviewText3: 'The guides were highly professional and knowledgeable.',
    reviewerName1: 'Ahmed',
    reviewerName2: 'Sarah',
    reviewerName3: 'Mahmoud',
    rating5: '★★★★★',
    rating4: '★★★★☆',
    // Contact page
    contactSubtitle: 'We are here to help you plan your perfect trip',
    phoneLabel: 'Phone Number',
    packageLabel: 'Desired Package',
    sendButton: 'Send Message',
    addressInfo: 'Cairo, Egypt',
    emailInfo: 'info@pharohtour.com',
    phoneInfo: '+20 123 456 789',
    hoursInfo: 'Sunday - Thursday: 9 AM - 6 PM',
    defaultPackage: 'Select a Package',
    // Success & Error Messages
    messageSent: 'Your message has been sent successfully!',
    messageError: 'Please fill all required fields',
    emailError: 'Please enter a valid email address',
    // Search & Filter
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    // Social Media
    facebook: 'Follow us on Facebook',
    instagram: 'Follow us on Instagram',
    twitter: 'Follow us on Twitter',
    whatsapp: 'Contact us on WhatsApp',
    // Cookies & Privacy
    acceptCookies: 'Accept Cookies',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions'
};

translations.ar = {
    ...translations.ar,
    // Reviews Section
    reviewsTitle: 'تقييمات العملاء',
    reviewText1: 'تجربة لا تُنسى مع فريق محترف للغاية!',
    reviewText2: 'الخدمات ممتازة والفنادق كانت فوق المتوقع.',
    reviewText3: 'المرشدون كانوا على مستوى عالٍ من الاحتراف.',
    reviewerName1: 'أحمد',
    reviewerName2: 'سارة',
    reviewerName3: 'محمود',
    rating5: '★★★★★',
    rating4: '★★★★☆',
    // Contact page
    contactSubtitle: 'نحن هنا لمساعدتك في تخطيط رحلتك المثالية',
    phoneLabel: 'رقم الهاتف',
    packageLabel: 'الباقة المطلوبة',
    sendButton: 'إرسال الرسالة',
    addressInfo: 'القاهرة، مصر',
    emailInfo: 'info@pharohtour.com',
    phoneInfo: '٢٠+ ١٢٣ ٤٥٦ ٧٨٩',
    hoursInfo: 'الأحد - الخميس: ٩ صباحاً - ٦ مساءً',
    defaultPackage: 'اختر باقة',
    // رسائل النجاح والخطأ
    messageSent: 'تم إرسال رسالتك بنجاح!',
    messageError: 'يرجى ملء جميع الحقول المطلوبة',
    emailError: 'يرجى إدخال بريد إلكتروني صحيح',
    // البحث والتصفية
    search: 'بحث',
    filter: 'تصفية',
    all: 'الكل',
    // وسائل التواصل الاجتماعي
    facebook: 'تابعنا على فيسبوك',
    instagram: 'تابعنا على انستجرام',
    twitter: 'تابعنا على تويتر',
    whatsapp: 'تواصل معنا على واتساب',
    // ملفات تعريف الارتباط والخصوصية
    acceptCookies: 'قبول ملفات تعريف الارتباط',
    privacyPolicy: 'سياسة الخصوصية',
    termsConditions: 'الشروط والأحكام'
};

// Swiper Initialization with safe guard and dynamic loader
function loadSwiper() {
    return new Promise((resolve, reject) => {
        if (typeof Swiper !== 'undefined') return resolve();
        // if a script tag for swiper already exists, wait for it
        const existing = document.querySelector('script[src*="swiper-bundle.min.js"]');
        if (existing) {
            existing.addEventListener('load', () => resolve());
            existing.addEventListener('error', () => reject(new Error('Failed to load Swiper')));
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js';
        script.async = false; // preserve execution order if appended late
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Swiper'));
        document.head.appendChild(script);
    });
}

function initializeSwiper() {
    if (typeof Swiper === 'undefined') {
        // Try to load Swiper dynamically, then initialize
        loadSwiper().then(() => initializeSwiper()).catch(err => {
            console.warn('Swiper initialization skipped:', err);
        });
        return;
    }

    // destroy previous instance safely
    if (window.swiper && typeof window.swiper.destroy === 'function') {
        try { window.swiper.destroy(true, true); } catch (e) { /* ignore */ }
    }

    window.swiper = new Swiper('.destinationsSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}

// تحديد اللغة الافتراضية وإعداد الصفحة
function initializeLanguage() {
    // التحقق من وجود لغة محفوظة
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLang = savedLanguage;
    } else {
        // التحقق من لغة المتصفح
        const browserLang = navigator.language || navigator.userLanguage;
        currentLang = browserLang.startsWith('ar') ? 'ar' : 'en';
        localStorage.setItem('preferredLanguage', currentLang);
    }

    // تطبيق اللغة والاتجاه
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(currentLang === 'ar' ? 'rtl' : 'ltr');
    
    // ضبط اتجاهات العناصر المهمة (لا نفرض اتجاه الفوتر هنا - دع CSS يتولى ذلك عبر html[dir])
    document.querySelectorAll('.navbar-nav, .contact-form, .social-links').forEach(el => {
        // Some elements (forms, navs) may need explicit direction for proper alignment
        if (el && el.style) el.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
    });
    
    // تحديث خصائص المحاذاة
    document.querySelectorAll('.text-right, .text-left').forEach(el => {
        el.classList.remove('text-right', 'text-left');
        el.classList.add(currentLang === 'ar' ? 'text-right' : 'text-left');
    });
    
    // تحديث الترجمات
    updateLanguage();

    // Signal that language initialization has completed so components can update safely
    try { window.languageReady = true; } catch (e) { /* ignore */ }
}

// Special handling for Contact page header background when at top
function contactHeaderHandler() {
    try {
        const isContactPage = window.location.pathname.endsWith('contact.html') || window.location.href.indexOf('contact.html') !== -1;
        const headerEl = document.querySelector('.header');
        const heroEl = document.querySelector('.contact-hero');
        if (!isContactPage || !headerEl || !heroEl) return;

        // set initial state based on current scroll (global scroll handler will keep it updated)
        const headerHeight = headerEl.offsetHeight;
        const heroRect = heroEl.getBoundingClientRect();
        if (heroRect.bottom > headerHeight) {
            headerEl.classList.add('contact-top');
            headerEl.classList.remove('scrolled');
        } else {
            headerEl.classList.remove('contact-top');
            headerEl.classList.add('scrolled');
        }
    } catch (e) {
        // ignore
    }
}

// Initialize header classes based on presence of a hero section (#home or .contact-hero)
function initHeaderState() {
    try {
        const headerEl = document.querySelector('.header');
        const heroEl = document.getElementById('home') || document.querySelector('.contact-hero');
        if (!headerEl || !heroEl) return;
        const headerHeight = headerEl.offsetHeight;
        const heroRect = heroEl.getBoundingClientRect();
        if (heroRect.bottom > headerHeight) {
            headerEl.classList.add('contact-top');
            headerEl.classList.remove('scrolled');
        } else {
            headerEl.classList.remove('contact-top');
            headerEl.classList.add('scrolled');
        }
    } catch (e) {
        // ignore
    }
}

// تحديث محتوى الصفحة حسب اللغة (يدعم القوائم)
function updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        // دعم عناصر القوائم مثل classicFeatures.0
        if (key.includes('.')) {
            const [mainKey, index] = key.split('.');
            if (translations[currentLang][mainKey] && Array.isArray(translations[currentLang][mainKey])) {
                element.textContent = translations[currentLang][mainKey][parseInt(index)];
            }
        } else if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });

    // تحديث عنوان الصفحة
    document.title = currentLang === 'ar' ? 'PHAROH TOUR - اكتشف مصر القديمة' : 'PHAROH TOUR - Discover Ancient Egypt';
    
    // تحديث زر تغيير اللغة
    const langButton = document.querySelector('.lang-switch .lang-text');
    if (langButton) {
        langButton.textContent = translations[currentLang].language;
    }

    // Apply any page-specific translations if the page script provided a hook
    try {
        if (window.applyPageTranslations && typeof window.applyPageTranslations === 'function') {
            window.applyPageTranslations(currentLang);
        }
    } catch (e) {
        console.warn('applyPageTranslations() hook failed', e);
    }
    // If the page didn't register its applyPageTranslations hook yet (page script may load after main.js),
    // poll briefly and call it when available. This handles HTML where page scripts are included after main.js.
    if (!window.applyPageTranslations || typeof window.applyPageTranslations !== 'function') {
        let attempts = 0;
        const maxAttempts = 10;
        const poll = setInterval(() => {
            attempts++;
            if (window.applyPageTranslations && typeof window.applyPageTranslations === 'function') {
                try { window.applyPageTranslations(currentLang); } catch (err) { console.warn('applyPageTranslations() late call failed', err); }
                clearInterval(poll);
            }
            if (attempts >= maxAttempts) clearInterval(poll);
        }, 100);
        // Also ensure we try once more after full window load
        window.addEventListener('load', () => {
            if (window.applyPageTranslations && typeof window.applyPageTranslations === 'function') {
                try { window.applyPageTranslations(currentLang); } catch (err) { /* ignore */ }
            }
        });
    }

    // تحديث اتجاه عناصر Swiper
    if (window.swiper) {
        window.swiper.destroy();
        initializeSwiper();
    }
}

// تبديل اللغة
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('preferredLanguage', currentLang);
    
    // تحديث اتجاه الصفحة
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // إضافة كلاس للجسم لتسهيل التنسيق
    document.body.className = document.body.className.replace(/\b(rtl|ltr)\b/g, '');
    document.body.classList.add(currentLang === 'ar' ? 'rtl' : 'ltr');
    
    updateLanguage();
    
    // إعادة تهيئة Swiper إذا كان موجوداً
    if (window.swiper) {
        setTimeout(() => {
            window.swiper.destroy();
            initializeSwiper();
        }, 100);
    }
}

// Initialization happens in initializeApplication (bound earlier)

// Virtual Tour Lazy Loading

// Language and Direction Switching
function switchLanguage(lang) {
    // Centralize language switching: set lang and defer to the central updater if available
    currentLang = lang === 'ar' ? 'ar' : 'en';
    localStorage.setItem('preferredLanguage', currentLang);

    // Prefer the canonical function (singular) then plural; fall back to lightweight update
    if (typeof updateLanguageAndDirection === 'function') {
        updateLanguageAndDirection();
        return;
    }

    if (typeof updateLanguageAndDirections === 'function') {
        updateLanguageAndDirections();
        return;
    }

    // Fallback: minimal updates
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(currentLang === 'ar' ? 'rtl' : 'ltr');
    updateLanguage();
}

// Initialize all tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Language switching is handled centrally via toggleLanguage and updateLanguageAndDirections

// Initialize iframes and loading screen on DOM ready
function initializePageElements() {
    // Iframe Error Handling
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('error', function() {
            this.style.display = 'none';
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'width: 100%; height: 400px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; border-radius: 10px;';
            errorDiv.innerHTML = '<p style="color: #666; text-align: center;">عذراً، الجولة الافتراضية غير متوفرة حالياً</p>';
            this.parentNode.insertBefore(errorDiv, this);
        });
    });

    // Loading Screen Management
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (loadingScreen && loadingProgress) {
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => loadingScreen.style.display = 'none', 500);
                }, 500);
            }
            loadingProgress.style.width = progress + '%';
        }, 100);

        // Fallback: Hide loading screen after 5 seconds
        setTimeout(() => {
            if (!loadingScreen.classList.contains('hidden')) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => loadingScreen.style.display = 'none', 1000);
            }
        }, 5000);
    }
}