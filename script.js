// Project modal data
const projects = {
    '01': {
        num: '01 / SECURITY',
        title: 'SIEM-Lite: Linux Security Monitor',
        badge: 'Security',
        badgeClass: 'badge-sec',
        desc: `A lightweight <strong>SIEM-style security dashboard</strong> built to monitor Linux authentication logs in real time. The system parses <code>/var/log/auth.log</code> and flags suspicious activity — SSH brute-force attempts (repeated failed logins), unauthorized <strong>chmod/chown</strong> calls, and privilege escalation patterns. Alerts are correlated by severity and surfaced through a Streamlit dashboard. Built to understand how production SIEM tools work at their core, without the enterprise overhead.`,
        highlight: null,
        tech: ['Python', 'Streamlit', 'Linux', 'Log Parsing', 'Rule Engine'],
        github: 'https://github.com/RajTib/siem-lite',
        live: null
    },
    '02': {
        num: '02 / ML · HACKATHON',
        title: 'GeoAI Hack: IIT Bombay TechFest',
        badge: 'ML · Hackathon',
        badgeClass: 'badge-ml',
        desc: `Built at the <strong>GeoAI National Hackathon, IIT Bombay TechFest</strong>. The pipeline extracts rooftop features from satellite imagery of Indian villages — classifying roof types using <strong>YOLOv8 object detection</strong> and <strong>SegFormer semantic segmentation</strong>. The full stack was containerized with Docker and served via a FastAPI backend. This kind of geospatial ML has real-world applications in urban planning, disaster response, and infrastructure surveying.`,
        highlight: null,
        tech: ['YOLOv8', 'SegFormer', 'FastAPI', 'Docker', 'Python', 'Satellite Imagery'],
        github: 'https://github.com/RajTib/geo-ai-techfest-2025',
        live: 'https://huggingface.co/spaces/team-ardra/geoai?logs=container'
    },
    '03': {
        num: '03 / TOOL · MSP',
        title: 'VTOP GPA Calculator',
        badge: 'Tool · MSP',
        badgeClass: 'badge-tool',
        desc: `Most GPA calculators make you manually type every subject — this one doesn't. The <strong>VTOP GPA Calculator</strong> parses your timetable directly from VIT's VTOP portal, auto-extracting all courses, credit hours, and eligibility status. Zero manual input. Built as my <strong>Mini Student Project (MSP)</strong> and deployed on Vercel under an MIT license. Designed for actual VIT students, by one.`,
        highlight: '13,000+ impressions · 240 likes · 10 comments on LinkedIn',
        tech: ['JavaScript', 'HTML5', 'CSS3', 'Vercel', 'DOM Parsing'],
        github: 'https://github.com/RajTib/vtop-gpa-calculator',
        live: 'https://vtop-gpa-calculator.vercel.app/'
    },
    '04': {
        num: '04 / WEB-DEVELOPMENT',
        title: 'Cosmopedia',
        badge: 'Web Dev',
        badgeClass: 'badge-web',
        desc: `Created an online encyclopedia for only space enthusiasts to explore and know about space in a much more fun and interactive way. Inspired by Wikipedia.`,
        highlight: null,
        tech: ['HTML5', 'CSS3', 'JS', 'ReactJS', 'Figma'],
        github: 'https://github.com/RajTib/ISA-Summer-School',
        live: 'https://cosmopedia-brown.vercel.app/'
    },
    '05': {
        num: '05 / SECURITY',
        title: 'Text Encryption Tool',
        badge: 'Security',
        badgeClass: 'badge-sec',
        desc: `A <strong>hybrid encryption tool</strong> built during the Pinnacle Labs internship. Combines <strong>AES-256 (CBC mode)</strong> for fast, symmetric encryption of the actual data with <strong>RSA-2048</strong> to securely wrap the AES key — the same model HTTPS uses under the hood. Includes PBKDF2 key derivation for added resistance against brute-force. A practical deep-dive into why real-world encryption is never just one algorithm.`,
        highlight: null,
        tech: ['Python', 'AES-256', 'RSA-2048', 'PBKDF2', 'CBC Mode'],
        github: 'https://github.com/RajTib/text-encryption-tool',
        live: null
    },
    '06': {
        num: '06 / SECURITY · RESEARCH',
        title: 'Keylogger Research Tool',
        badge: 'Security · Research',
        badgeClass: 'badge-sec',
        desc: `Built during the <strong>Pinnacle Labs internship</strong> as an educational research tool. Captures keystroke data at the OS level to understand exactly how keyloggers operate — and more importantly, how security software detects and flags them. Comes with a <strong>Tkinter GUI dashboard</strong> and Matplotlib visualizations for key frequency analysis. Understanding the attacker's tooling is step one in building better defenses.`,
        highlight: null,
        tech: ['Python', 'Tkinter', 'Matplotlib', 'OS-level Input Hooks'],
        github: 'https://github.com/RajTib/keylogger-tool',
        live: null
    },
    '07': {
        num: '07 / ASTROPHYSICS',
        title: 'Astrophysics Data Analysis',
        badge: 'Astrophysics',
        badgeClass: 'badge-ml',
        desc: `Used <strong>Type Ia supernova datasets</strong> to independently calculate the <strong>Hubble Constant (H₀)</strong> and estimate the age of the Universe. The pipeline involved CSV ingestion, data cleaning, outlier removal, and regression analysis — then validating the derived H₀ against <strong>Planck 2018 benchmarks</strong>. Built during the India Space Academy Summer School internship. Equal parts astrophysics and data engineering.`,
        highlight: null,
        tech: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Data Cleaning', 'Regression'],
        github: 'https://github.com/RajTib/ISA-Summer-School',
        live: null
    }
};

const certs = {
    
}

function openModal(id) {
    const p = projects[id];
    if (!p) return;

    document.getElementById('modalNum').textContent = p.num;
    document.getElementById('modalTitle').textContent = p.title;

    const badge = document.getElementById('modalBadge');
    badge.textContent = p.badge;
    badge.className = 'modal-badge ' + p.badgeClass;

    document.getElementById('modalDesc').innerHTML = p.desc;

    const hl = document.getElementById('modalHighlight');
    const hlText = document.getElementById('modalHighlightText');
    if (p.highlight) {
        hlText.textContent = p.highlight;
        hl.style.display = 'block';
    } else {
        hl.style.display = 'none';
    }

    const techEl = document.getElementById('modalTech');
    techEl.innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');

    const linksEl = document.getElementById('modalLinks');
    let linksHTML = '';
    if (p.github && !p.github.startsWith('GITHUB')) {
        linksHTML += `<a href="${p.github}" target="_blank" class="modal-link-btn primary">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        GitHub
    </a>`;
    }
    if (p.live && !p.live.startsWith('LIVE')) {
        linksHTML += `<a href="${p.live}" target="_blank" class="modal-link-btn secondary">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      Live Demo
    </a>`;
    }
    if (!linksHTML) {
        linksHTML = `<span style="font-family:var(--mono);font-size:0.65rem;color:var(--muted)">Links coming soon</span>`;
    }
    linksEl.innerHTML = linksHTML;

    document.getElementById('projectModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('open');
    document.body.style.overflow = '';
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById('projectModal')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

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
const roles = ['Cybersecurity Student', 'Systems Builder', 'ML Enthusiast', 'Open Source Dev'];
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
