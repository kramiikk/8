function updateClock() {
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // Always 2-digit hours for symmetry in Zen mode
    const hoursStr = String(hours).padStart(2, '0');
    
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    
    if (hoursEl) hoursEl.textContent = hoursStr;
    if (minsEl) minsEl.textContent = minutes;

    // Simplified date update
    const dateEl = document.getElementById('date');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Initial update
updateClock();
// Update every minute (more than enough for Zen mode without seconds)
setInterval(updateClock, 60000);

// Smooth entry
document.addEventListener('DOMContentLoaded', updateClock);
