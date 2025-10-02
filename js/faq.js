// FAQ Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    handleNavbarScroll();
    initializeAccordion();
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
    let lastScrollY = window.scrollY;

    if (!header) return;

    window.addEventListener('scroll', function() {
        // Auto-hide/show navbar
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;

        // Add background when scrolled
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize Accordion Behavior
function initializeAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const content = item.querySelector('.accordion-collapse');

        if (button && content) {
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                
                // Update ARIA attributes
                button.setAttribute('aria-expanded', !isExpanded);
                content.classList.toggle('show');

                // Smooth height transition
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            });
        }
    });
}

// Page-specific translations for FAQ
const pageTranslations = {
    en: {
        faq: 'Frequently Asked Questions',
        faqSubtitle: 'Quick answers to your questions about booking, packages and support',
        faq_q1: 'What is the cancellation policy?',
        faq_a1: 'Bookings can be canceled up to 7 days in advance for a full refund. After that, partial charges may apply.',
        faq_q2: 'Do packages include flights?',
        faq_a2: 'Standard packages do not include flights unless explicitly stated in the package details.',
        faq_q3: 'How can I contact support?',
        faq_a3: 'You can use the WhatsApp button at the bottom of the page or the contact form on the Contact page.',
        home: 'Home',
        destinations: 'Destinations',
        packages: 'Packages',
        virtualTour: 'Virtual Tour',
        about: 'About Us',
        contact: 'Contact',
        footerAbout: 'Your gateway to ancient Egyptian wonders',
        quickLinks: 'Quick Links',
        contactInfo: 'Contact Information',
        followUs: 'Follow Us',
        copyright: '© 2025 PHAROH TOUR. All rights reserved.'
    },
    ar: {
        faq: 'الأسئلة الشائعة',
        faqSubtitle: 'أجوبة سريعة على أسئلتكم حول الحجز والباقات والدعم',
        faq_q1: 'ما هي سياسة الإلغاء؟',
        faq_a1: 'يمكن إلغاء الحجوزات قبل 7 أيام من الموعد للحصول على استرداد كامل. بعد ذلك، قد يتم تطبيق رسوم جزئية.',
        faq_q2: 'هل تشمل الباقات تذاكر الطيران؟',
        faq_a2: 'الباقات القياسية لا تشمل تذاكر الطيران ما لم يُذكر خلاف ذلك في تفاصيل الباقة.',
        faq_q3: 'كيف يمكنني التواصل مع الدعم؟',
        faq_a3: 'يمكنك استخدام زر الواتساب في أسفل الصفحة أو نموذج الاتصال في صفحة "اتصل بنا".',
        home: 'الرئيسية',
        destinations: 'الوجهات السياحية',
        packages: 'الباقات السياحية',
        virtualTour: 'جولة 360 درجة',
        about: 'عن الشركة',
        contact: 'اتصل بنا',
        footerAbout: 'بوابتك إلى عجائب مصر القديمة',
        quickLinks: 'روابط سريعة',
        contactInfo: 'معلومات الاتصال',
        followUs: 'تابعنا',
        copyright: '© 2025 فرعون تور. جميع الحقوق محفوظة.'
    }
};

// Provide page-level translations hook for the global language manager
window.applyPageTranslations = function(lang) {
    const translationsForPage = pageTranslations && pageTranslations[lang] ? pageTranslations[lang] : {};
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translationsForPage && translationsForPage[key]) {
            element.textContent = translationsForPage[key];
        }
    });
};

