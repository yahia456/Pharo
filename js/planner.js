// Trip Planner logic (migrated from main.js)
document.addEventListener('DOMContentLoaded', function() {
    const calcBtn = document.getElementById('planner-calc');
    if (!calcBtn) return;
    if (calcBtn.dataset.plannerBound) return;

    calcBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const dest = document.getElementById('planner-destination').value;
        const nights = parseInt(document.getElementById('planner-nights').value, 10) || 1;
        const hotel = document.getElementById('planner-hotel').value;
        const guests = parseInt(document.getElementById('planner-guests').value, 10) || 1;

        // Base prices per night per person by hotel category
        const hotelRates = { standard: 30, deluxe: 60, luxury: 140 };
        // Destination multipliers for excursions/transport
        const destMultiplier = { giza: 1.0, luxor: 1.2, aswan: 1.3, alexandria: 0.9 };

        const baseRate = hotelRates[hotel] || 30;
        const multiplier = destMultiplier[dest] || 1.0;

        // simple formula: (hotelRate * nights * guests) + (300 * multiplier)
        const hotelCost = baseRate * nights * guests;
        const extras = Math.round(300 * multiplier);
        const total = hotelCost + extras;

        const resultEl = document.getElementById('planner-result');
        if (resultEl) {
            const prefix = (window.translations && window.translations[document.documentElement.lang] && window.translations[document.documentElement.lang].planner_result) ? window.translations[document.documentElement.lang].planner_result : 'Estimated cost';
            resultEl.textContent = `${prefix}: ${total} $`;
        }
    });
    calcBtn.dataset.plannerBound = '1';
});
