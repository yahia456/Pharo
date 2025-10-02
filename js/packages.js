// نظام الإشعارات للباقات السياحية
function showBookingNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification booking-notification ${type}`;
    notification.textContent = message;
    
    // إضافة الإشعار في منطقة الباقات
    const packagesSection = document.querySelector('#packages');
    if (packagesSection) {
        const firstCard = packagesSection.querySelector('.package-card');
        if (firstCard) {
            packagesSection.insertBefore(notification, firstCard);
        } else {
            packagesSection.appendChild(notification);
        }
        
        // إزالة الإشعار بعد 3 ثواني
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// إضافة مستمعي الأحداث لأزرار الحجز
document.querySelectorAll('.package-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const packageTitle = this.closest('.package-card').querySelector('h3').textContent;
        const currentLang = document.documentElement.lang;
        
        showBookingNotification(
            currentLang === 'ar' 
                ? `تم تسجيل طلب حجز "${packageTitle}" بنجاح! سنتواصل معك قريباً` 
                : `Booking request for "${packageTitle}" has been received! We will contact you soon`,
            'success'
        );
    });
});

// Package card hover effect (visual lift)
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});