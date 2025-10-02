// Virtual Tour: fullscreen toggle and lazy-loading observer
(function() {
    // Expose toggleFullscreen globally for inline onclick handlers in HTML
    window.toggleFullscreen = function(button) {
        const frameWrapper = button.closest('.tour-frame-wrapper');
        const iframe = frameWrapper.querySelector('iframe');
        
        if (!document.fullscreenElement) {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) { // Safari
                iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) { // IE11
                iframe.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { // Safari
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE11
                document.msExitFullscreen();
            }
        }
    };

    // Lazy-load tour iframes when they enter viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const tourObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && iframe.dataset && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    iframe.removeAttribute('data-src');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all tour items when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.tour-item').forEach(item => {
            tourObserver.observe(item);
        });
    });
})();
