const DOM = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    ampm: document.getElementById('ampm'),
    greeting: document.getElementById('greeting'),
    date: document.getElementById('date'),
};

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12';

    updateElementContent(DOM.hours, hours);
    updateElementContent(DOM.minutes, minutes);
    updateElementContent(DOM.seconds, seconds);
    updateElementContent(DOM.ampm, ampm);

    const hour24 = now.getHours();
    let greetingText = '';

    if (now.getMonth() === 2 && now.getDate() === 8) {
        greetingText = 'Happy Women\'s Day, Alina! <span class="heart-blink">❤️</span>';
    } else if (hour24 >= 5 && hour24 < 12) {
        greetingText = 'Good Morning';
    } else if (hour24 >= 12 && hour24 < 17) {
        greetingText = 'Good Afternoon';
    } else if (hour24 >= 17 && hour24 < 22) {
        greetingText = 'Good Evening';
    } else {
        greetingText = 'Good Night';
    }

    updateElementContent(DOM.greeting, greetingText, true);
    updateElementContent(DOM.date, DATE_FORMAT.format(now));
}

function updateElementContent(element, content, isHTML = false) {
    if (element) {
        const property = isHTML ? 'innerHTML' : 'textContent';
        if (element[property] !== content) {
            element[property] = content;
        }
    }
}

updateClock();
const now = new Date();
const delay = 1000 - now.getMilliseconds();
setTimeout(() => {
    updateClock();
    setInterval(updateClock, 1000);
}, delay);
// Parallax and Orientation effects
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const moveX = (clientX - centerX) / 50;
    const moveY = (clientY - centerY) / 50;

    document.querySelectorAll('.drift').forEach((spot, index) => {
        const speed = (index + 1) * 0.2;
        spot.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
        const tiltX = e.gamma / 10; // Left-to-right tilt
        const tiltY = e.beta / 10;  // Front-to-back tilt

        document.querySelectorAll('.drift').forEach((spot, index) => {
            const speed = (index + 1) * 0.5;
            spot.style.transform = `translate(${tiltX * speed}px, ${tiltY * speed}px)`;
        });
    });
}
