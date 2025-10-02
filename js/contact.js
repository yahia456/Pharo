// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    handleNavbarScroll();
    initializeContactForm();
});

// Initialize AOS (Animate on Scroll)
function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Handle Navbar Scroll Effects
function handleNavbarScroll() {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.contact-hero');
    let lastScrollY = window.scrollY;

    if (!header || !hero) return;

    // Set initial state
    updateHeaderStyle();

    window.addEventListener('scroll', function() {
        // Auto-hide/show navbar
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;

        // Update header style based on hero position
        updateHeaderStyle();
    });

    function updateHeaderStyle() {
        const headerHeight = header.offsetHeight;
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.bottom > headerHeight) {
            header.classList.add('contact-top');
            header.classList.remove('scrolled');
        } else {
            header.classList.remove('contact-top');
            header.classList.add('scrolled');
        }
    }
}

// Initialize Contact Form
function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const phone = this.querySelector('input[name="phone"]').value;
        const package = this.querySelector('select[name="package"]').value;
        const message = this.querySelector('textarea[name="message"]').value;

        const currentLang = document.documentElement.lang;
        
        if (!name || !email || !package || !message) {
            showContactNotification(
                currentLang === 'ar' 
                    ? 'يرجى ملء جميع الحقول المطلوبة'
                    : 'Please fill in all required fields',
                'error'
            );
            return;
        }

        // Basic email validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showContactNotification(
                currentLang === 'ar'
                    ? 'يرجى إدخال بريد إلكتروني صحيح'
                    : 'Please enter a valid email address',
                'error'
            );
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        showContactNotification(
            currentLang === 'ar'
                ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً'
                : 'Your message has been sent successfully! We will contact you soon',
            'success'
        );
        form.reset();
    });
}

// Contact Form Notification System
function showContactNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification contact-notification ${type}`;
    notification.textContent = message;
    
    // إضافة الإشعار في منطقة نموذج الاتصال
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.parentElement.insertBefore(notification, contactForm);
        
        // إزالة الإشعار بعد 3 ثواني
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Page-specific translations (contact page)
const pageTranslations = {
    en: {
        contactTitle: 'Contact Us',
        contactSubtitle: 'Get in touch with us',
        nameLabel: 'Your Name',
        emailLabel: 'Your Email',
        phoneLabel: 'Phone Number',
        // keep both keys used across the codebase: 'packageLabel' and legacy 'selectPackage'
        packageLabel: 'Select Package',
        selectPackage: 'Select Package',
        messageLabel: 'Your Message',
        sendMessage: 'Send Message',
        addressTitle: 'Address',
        contactInfoTitle: 'Contact Information',
        phoneTitle: 'Phone',
        emailTitle: 'Email',
        hoursTitle: 'Working Hours',
        // common footer / nav strings that may be required on this page
        footerAbout: 'Your gateway to ancient Egyptian wonders',
        quickLinks: 'Quick Links',
        home: 'Home',
        destinations: 'Destinations',
        packages: 'Packages',
        faq: 'FAQ',
        contact: 'Contact',
        contactInfo: 'Contact Information',
        followUs: 'Follow Us',
        copyright: '© 2025 PHAROH TOUR. All rights reserved.'
        },
    ar: {
        contactTitle: 'اتصل بنا',
        contactSubtitle: 'تواصل معنا',
        nameLabel: 'الاسم',
        emailLabel: 'البريد الإلكتروني',
        phoneLabel: 'رقم الهاتف',
        packageLabel: 'الباقة المطلوبة',
        selectPackage: 'اختر الباقة',
        messageLabel: 'رسالتك',
        sendMessage: 'إرسال الرسالة',
        addressTitle: 'العنوان',
        contactInfoTitle: 'معلومات الاتصال',
        phoneTitle: 'الهاتف',
        emailTitle: 'البريد الإلكتروني',
        hoursTitle: 'ساعات العمل',
        footerAbout: 'بوابتك إلى عجائب مصر القديمة',
        quickLinks: 'روابط سريعة',
        home: 'الرئيسية',
        destinations: 'الوجهات السياحية',
        packages: 'الباقات السياحية',
        faq: 'الأسئلة الشائعة',
        contact: 'اتصل بنا',
        contactInfo: 'معلومات الاتصال',
        followUs: 'تابعنا',
        copyright: '© 2025 فرعون تور. جميع الحقوق محفوظة.'
        }
};

// Expose a page-level translations hook that the global language manager will call
window.applyPageTranslations = function(lang) {
    const translationsForPage = pageTranslations && pageTranslations[lang] ? pageTranslations[lang] : {};
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translationsForPage && translationsForPage[key]) {
            element.textContent = translationsForPage[key];
        }
    });
};