document.addEventListener('DOMContentLoaded', function() {
    // Load the navbar
    fetch('/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            // Ensure translations and language UI update after navbar is injected.
            function callUpdate() {
                if (typeof updateLanguage === 'function') {
                    try { updateLanguage(); } catch (e) { console.warn('updateLanguage() failed after navbar injection', e); }
                    return true;
                }
                return false;
            }

            if (window.languageReady) {
                callUpdate();
            } else {
                // Wait for languageReady flag, or poll briefly as a fallback
                let attempts = 0;
                const maxAttempts = 30;
                const poll = setInterval(() => {
                    attempts++;
                    if (window.languageReady && callUpdate()) {
                        clearInterval(poll);
                    }
                    if (attempts >= maxAttempts) clearInterval(poll);
                }, 100);
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
});