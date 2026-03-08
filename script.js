// Battery-conscious clock — updates only once per minute
// Pauses all work when the tab/screen is hidden (Page Visibility API)

const hoursEl  = document.getElementById('hours');
const minsEl   = document.getElementById('minutes');
const dateEl   = document.getElementById('date');
const heartEl  = document.querySelector('.heart');

const DATE_OPTS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function updateClock() {
    const now     = new Date();
    const hours   = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    if (hoursEl)  hoursEl.textContent  = hours;
    if (minsEl)   minsEl.textContent   = minutes;
    if (dateEl)   dateEl.textContent   = now.toLocaleDateString('en-US', DATE_OPTS);
}

// Schedule next tick exactly at the next whole minute
function scheduleNextMinute() {
    const now  = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    return setTimeout(() => {
        updateClock();
        intervalId = setInterval(updateClock, 60_000);
    }, msUntilNextMinute);
}

let timeoutId  = null;
let intervalId = null;

function startClock() {
    updateClock();
    timeoutId = scheduleNextMinute();
    if (heartEl) heartEl.style.animationPlayState = 'running';
}

function stopClock() {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    timeoutId  = null;
    intervalId = null;
    // Pause heart animation to save GPU/battery
    if (heartEl) heartEl.style.animationPlayState = 'paused';
}

// Page Visibility API — pause when screen is off or tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopClock();
    } else {
        startClock();
    }
});

// Kick off
startClock();
