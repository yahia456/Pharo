// Language direction utility functions
function updateDirectionalClasses() {
    const isRTL = currentLang === 'ar';
    
    // Update Bootstrap margin classes
    document.querySelectorAll('.me-auto, .ms-auto').forEach(el => {
        el.classList.remove('me-auto', 'ms-auto');
        el.classList.add(isRTL ? 'ms-auto' : 'me-auto');
    });
    
    // Update form alignments
    document.querySelectorAll('.form-group, .input-group').forEach(el => {
        el.style.textAlign = isRTL ? 'right' : 'left';
    });

    // Handle Bootstrap modal dialogs
    document.querySelectorAll('.modal').forEach(el => {
        el.classList.remove('fade-right', 'fade-left');
        el.classList.add(isRTL ? 'fade-right' : 'fade-left');
    });

    // Update flexbox order for headers and sections
    document.querySelectorAll('.header-content, .section-content').forEach(el => {
        el.style.flexDirection = isRTL ? 'row-reverse' : 'row';
    });

    // Update icons and buttons
    document.querySelectorAll('.btn-icon, .icon-container').forEach(el => {
        el.style.transform = isRTL ? 'scaleX(-1)' : 'none';
    });

    // Handle special RTL/LTR specific margins
    document.querySelectorAll('[class*="m"]').forEach(el => {
        Array.from(el.classList).forEach(cls => {
            if (cls.match(/^m[erls][els]?-\d+$/)) {
                const [margin, size] = cls.split('-');
                const direction = margin.slice(1);
                let newMargin = 'm';
                
                if (isRTL) {
                    newMargin += direction.replace('r', 'l').replace('e', 'l').replace('s', 'r');
                } else {
                    newMargin += direction.replace('l', 'r').replace('e', 'r').replace('s', 'l');
                }
                
                el.classList.remove(cls);
                el.classList.add(`${newMargin}-${size}`);
            }
        });
    });
}

function updateLanguageAndDirection() {
    // Update language attributes
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update body classes
    document.body.className = document.body.className.replace(/\b(rtl|ltr)\b/g, '');
    document.body.classList.add(currentLang === 'ar' ? 'rtl' : 'ltr');
    
    // Update directional classes
    updateDirectionalClasses();
    
    // Update content
    updateLanguage();
    
    // Reinitialize Swiper if exists
    if (window.swiper) {
        setTimeout(() => {
            window.swiper.destroy();
            initializeSwiper();
        }, 100);
    }
}

// Language toggle function
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('preferredLanguage', currentLang);
    updateLanguageAndDirection();
}