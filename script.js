// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
    }, 80);
});
document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.transform = 'translate(-50%,-50%) scale(1.8)'; ring.style.borderColor = 'rgba(0,255,170,0.8)'; });
    el.addEventListener('mouseleave', () => { ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.borderColor = 'rgba(0,255,170,0.5)'; });
});

// Stars canvas
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); initStars(); });
function initStars() {
    stars = [];
    for (let i = 0; i < 180; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.2,
            o: Math.random() * 0.6 + 0.1,
            speed: Math.random() * 0.3 + 0.05,
            pulse: Math.random() * Math.PI * 2
        });
    }
}
initStars();
function drawStars(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.pulse += 0.01;
        const opacity = s.o + Math.sin(s.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${opacity})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
    });
    // Nebula glow spots
    const grad1 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.2, 0, canvas.width * 0.8, canvas.height * 0.2, 300);
    grad1.addColorStop(0, 'rgba(124,107,255,0.04)');
    grad1.addColorStop(1, 'transparent');
    ctx.fillStyle = grad1; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const grad2 = ctx.createRadialGradient(canvas.width * 0.1, canvas.height * 0.7, 0, canvas.width * 0.1, canvas.height * 0.7, 250);
    grad2.addColorStop(0, 'rgba(0,255,170,0.03)');
    grad2.addColorStop(1, 'transparent');
    ctx.fillStyle = grad2; ctx.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawStars);
}
drawStars(0);

// Scroll nav
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Typing effect
const roles = ['Cybersecurity Student', 'Systems Builder', 'ML Researcher', 'Ethical Hacker', 'Open Source Dev'];
let ri = 0, ci = 0, deleting = false;
const typed = document.getElementById('typed-text');
function typeLoop() {
    const word = roles[ri];
    if (!deleting) {
        typed.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    } else {
        typed.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 60 : 100);
}
typeLoop();

// Blink cursor
setInterval(() => {
    const b = document.getElementById('cursor-blink');
    if (b) b.style.opacity = b.style.opacity === '0' ? '1' : '0';
}, 500);

// Scroll animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
