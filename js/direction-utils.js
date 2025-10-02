// Update direction and alignment based on language
function updateElementDirections() {
    const isRTL = currentLang === 'ar';
    
    // القوائم: فقط اضبط القوائم الرئيسية (لا نفرض اتجاه على الفوتر هنا)
    document.querySelectorAll('.navbar-nav').forEach(el => {
        el.style.direction = isRTL ? 'rtl' : 'ltr';
        if (isRTL) {
            el.classList.remove('ms-auto');
            el.classList.add('me-auto');
        } else {
            el.classList.remove('me-auto');
            el.classList.add('ms-auto');
        }
    });

    // form controls: set dir attribute (text alignment handled by CSS [dir] rules)
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(el => {
        el.dir = isRTL ? 'rtl' : 'ltr';
    });

    // general layout alignment is handled via CSS [dir] selectors

    // social links: set dir attribute only
    document.querySelectorAll('.social-links').forEach(el => {
        el.dir = isRTL ? 'rtl' : 'ltr';
    });

    // محاذاة النصوص
    document.querySelectorAll('[data-text-align]').forEach(el => {
        const alignment = el.dataset.textAlign;
        if (alignment === 'start') {
            el.style.textAlign = isRTL ? 'right' : 'left';
        } else if (alignment === 'end') {
            el.style.textAlign = isRTL ? 'left' : 'right';
        }
    });

    // الأزرار في القوائم
    document.querySelectorAll('.btn-icon').forEach(el => {
        el.style.transform = isRTL ? 'scaleX(-1)' : 'none';
    });

    // Swiper
    document.querySelectorAll('.swiper-container').forEach(el => {
        el.dir = isRTL ? 'rtl' : 'ltr';
    });
}

// تحديث اللغة مع مراعاة الاتجاهات
function updateLanguageAndDirections() {
    // تحديث اتجاه المستند
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث كلاسات الجسم
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(currentLang === 'ar' ? 'rtl' : 'ltr');
    
    // تحديث اتجاهات العناصر
    updateElementDirections();
    
    // تحديث النصوص
    updateLanguage();
    
    // إعادة تهيئة Swiper
    if (window.swiper) {
        setTimeout(() => {
            window.swiper.destroy();
            initializeSwiper();
        }, 100);
    }
}

// Backwards-compatible alias: some files call the singular name
if (typeof updateLanguageAndDirection === 'undefined') {
    var updateLanguageAndDirection = updateLanguageAndDirections;
}