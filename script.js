/* ============================================================
   Raj Tibarewala — portfolio interactions
   Sections: data · modals · nav · cursor · starfield · typing · reveal
   ============================================================ */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ------------------------------------------------------------
   Project data
   ------------------------------------------------------------ */
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
        live: 'https://huggingface.co/spaces/team-ardra/geoai'
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
        num: '04 / WEB DEV',
        title: 'Cosmopedia',
        badge: 'Web Dev',
        badgeClass: 'badge-web',
        desc: `An <strong>interactive space encyclopedia</strong> inspired by Wikipedia — built for space enthusiasts who want exploration, not just articles. Designed first in <strong>Figma</strong>, then implemented as a component-based <strong>React</strong> app with a browsable article structure. An exercise in taking a product from design system to deployed site.`,
        highlight: null,
        tech: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Figma'],
        github: 'https://github.com/RajTib/cosmopedia-react',
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

/* ------------------------------------------------------------
   Certificate data
   Drop the matching image into assets/certs/ (e.g. assets/certs/pinnacle.jpg)
   and it will appear in the modal automatically.
   ------------------------------------------------------------ */
const certs = {
    'pinnacle': {
        issuer: 'Pinnacle Labs',
        name: 'Certificate of Internship',
        date: 'Mar 2026',
        credentialId: null,
        skills: ['Cybersecurity', 'Linux', 'Python Tooling'],
        image: 'assets/certs/pinnacle.jpg',
        verifyUrl: null
    },
    'thm-presec': {
        issuer: 'TryHackMe',
        name: 'Pre Security Certificate',
        date: 'Feb 2026',
        credentialId: 'THM-9AGQEO61IF',
        skills: ['Networking Fundamentals', 'Linux', 'Web Basics', 'Security Concepts'],
        image: 'assets/certs/thm-presec.jpg',
        verifyUrl: 'https://tryhackme.com/certificate/THM-9AGQEO61IF'
    },
    'google-foundations': {
        issuer: 'Google · Coursera',
        name: 'Foundations of Cybersecurity',
        date: 'Dec 2025',
        credentialId: 'EFNTCI2IBS6F',
        skills: ['Security Fundamentals', 'CISSP Domains', 'Security Frameworks'],
        image: 'assets/certs/google-foundations.jpg',
        verifyUrl: 'https://coursera.org/verify/EFNTCI2IBS6F'
    },
    'google-risks': {
        issuer: 'Google · Coursera',
        name: 'Play It Safe: Manage Security Risks',
        date: 'Dec 2025',
        credentialId: 'ADEM4YO13VBT',
        skills: ['Risk Management', 'NIST Frameworks', 'Incident Response Basics'],
        image: 'assets/certs/google-risks.jpg',
        verifyUrl: 'https://coursera.org/verify/ADEM4YO13VBT'
    },
    'isa-summer': {
        issuer: 'India Space Academy',
        name: 'Astronomy & Astrophysics Summer School',
        date: 'Jun 2025',
        credentialId: null,
        skills: ['Data Analysis', 'NumPy', 'Data Cleaning', 'Astrophysics'],
        image: 'assets/certs/isa-summer.jpg',
        verifyUrl: null
    }
};

/* ------------------------------------------------------------
   Modal manager — shared open/close, focus handling, ESC
   ------------------------------------------------------------ */
let lastFocusedElement = null;

function openOverlay(overlay) {
    lastFocusedElement = document.activeElement;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeOverlays() {
    document.querySelectorAll('.modal-overlay.open').forEach(o => o.classList.remove('open'));
    document.body.style.overflow = '';
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeOverlays();
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeOverlays();
    });
});

document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', closeOverlays);
});

const iconSvg = id =>
    `<svg width="12" height="12" aria-hidden="true"><use href="#${id}"></use></svg>`;

/* ------------------------------------------------------------
   Project modal
   ------------------------------------------------------------ */
function openProjectModal(id) {
    const p = projects[id];
    if (!p) return;

    document.getElementById('modalNum').textContent = p.num;
    document.getElementById('modalTitle').textContent = p.title;

    const badge = document.getElementById('modalBadge');
    badge.textContent = p.badge;
    badge.className = 'modal-badge ' + p.badgeClass;

    document.getElementById('modalDesc').innerHTML = p.desc;

    const hl = document.getElementById('modalHighlight');
    if (p.highlight) {
        document.getElementById('modalHighlightText').textContent = p.highlight;
        hl.hidden = false;
    } else {
        hl.hidden = true;
    }

    document.getElementById('modalTech').innerHTML =
        p.tech.map(t => `<span>${t}</span>`).join('');

    let linksHTML = '';
    if (p.github) {
        linksHTML += `<a href="${p.github}" target="_blank" rel="noopener" class="modal-link-btn primary">${iconSvg('icon-github')} GitHub</a>`;
    }
    if (p.live) {
        linksHTML += `<a href="${p.live}" target="_blank" rel="noopener" class="modal-link-btn secondary">${iconSvg('icon-globe')} Live Demo</a>`;
    }
    document.getElementById('modalLinks').innerHTML =
        linksHTML || `<span class="modal-links-empty">Links coming soon</span>`;

    openOverlay(document.getElementById('projectModal'));
}

/* ------------------------------------------------------------
   Certificate modal
   ------------------------------------------------------------ */
function openCertModal(id) {
    const c = certs[id];
    if (!c) return;

    document.getElementById('certModalIssuer').textContent = c.issuer.toUpperCase();
    document.getElementById('certModalName').textContent = c.name;
    document.getElementById('certModalDate').textContent = c.date;

    const credWrap = document.getElementById('certModalCredWrap');
    if (c.credentialId) {
        document.getElementById('certModalCred').textContent = c.credentialId;
        credWrap.style.display = '';
    } else {
        credWrap.style.display = 'none';
    }

    document.getElementById('certModalSkills').innerHTML =
        c.skills.map(s => `<span>${s}</span>`).join('');

    document.getElementById('certModalLinks').innerHTML = c.verifyUrl
        ? `<a href="${c.verifyUrl}" target="_blank" rel="noopener" class="modal-link-btn primary">${iconSvg('icon-globe')} Verify Credential</a>`
        : '';

    // Show the certificate image if the file exists; placeholder otherwise
    const img = document.getElementById('certModalImg');
    const placeholder = document.getElementById('certModalPlaceholder');
    img.hidden = true;
    placeholder.hidden = false;
    img.onload = () => { img.hidden = false; placeholder.hidden = true; };
    img.onerror = () => { img.hidden = true; placeholder.hidden = false; };
    img.alt = `${c.name} — ${c.issuer}`;
    img.src = c.image;

    openOverlay(document.getElementById('certModal'));
}

/* ------------------------------------------------------------
   Card bindings — click + keyboard (Enter / Space)
   ------------------------------------------------------------ */
function bindCard(el, handler) {
    el.addEventListener('click', handler);
    el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handler();
        }
    });
}

document.querySelectorAll('[data-project]').forEach(card =>
    bindCard(card, () => openProjectModal(card.dataset.project)));

document.querySelectorAll('[data-cert]').forEach(card =>
    bindCard(card, () => openCertModal(card.dataset.cert)));

/* ------------------------------------------------------------
   Mobile navigation
   ------------------------------------------------------------ */
const navToggle = document.getElementById('nav-toggle');
const navbar = document.getElementById('navbar');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const open = navbar.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close the menu after choosing a destination
    document.querySelectorAll('.nav-links a').forEach(link =>
        link.addEventListener('click', () => {
            navbar.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }));
}

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ------------------------------------------------------------
   Custom cursor — rAF-driven trailing ring (desktop pointers only)
   ------------------------------------------------------------ */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

if (!isTouchDevice && cursor && ring) {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }, { passive: true });

    (function trailRing() {
        // Ease the ring toward the cursor for the trailing effect
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(trailRing);
    })();

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
            ring.style.borderColor = 'rgba(0,255,170,0.8)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.transform = 'translate(-50%,-50%) scale(1)';
            ring.style.borderColor = 'rgba(0,255,170,0.5)';
        });
    });
}

/* ------------------------------------------------------------
   Starfield — density scales with viewport, pauses when hidden,
   renders a single static frame under reduced motion
   ------------------------------------------------------------ */
const canvas = document.getElementById('stars-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let stars = [];
let starsRunning = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initStars() {
    const count = Math.min(180, Math.floor(window.innerWidth / 8));
    stars = [];
    for (let i = 0; i < count; i++) {
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

function paintFrame(animate) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        if (animate) s.pulse += 0.01;
        const opacity = s.o + Math.sin(s.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${opacity})`;
        ctx.fill();
        if (animate) {
            s.y -= s.speed;
            if (s.y < 0) {
                s.y = canvas.height;
                s.x = Math.random() * canvas.width;
            }
        }
    });
    // Nebula glow spots
    const g1 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.2, 0, canvas.width * 0.8, canvas.height * 0.2, 300);
    g1.addColorStop(0, 'rgba(124,107,255,0.04)');
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const g2 = ctx.createRadialGradient(canvas.width * 0.1, canvas.height * 0.7, 0, canvas.width * 0.1, canvas.height * 0.7, 250);
    g2.addColorStop(0, 'rgba(0,255,170,0.03)');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function starLoop() {
    if (!starsRunning) return;
    paintFrame(true);
    requestAnimationFrame(starLoop);
}

function startStars() {
    if (prefersReducedMotion) {
        paintFrame(false);
        return;
    }
    if (!starsRunning) {
        starsRunning = true;
        starLoop();
    }
}

function stopStars() {
    starsRunning = false;
}

if (canvas) {
    resizeCanvas();
    initStars();
    startStars();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initStars();
        if (prefersReducedMotion) paintFrame(false);
    });

    document.addEventListener('visibilitychange', () => {
        document.hidden ? stopStars() : startStars();
    });
}

/* ------------------------------------------------------------
   Typing effect — static text under reduced motion
   ------------------------------------------------------------ */
const roles = ['Cybersecurity Student', 'Systems Builder', 'ML Enthusiast', 'Open Source Dev'];
const typed = document.getElementById('typed-text');

if (!typed) {
    // Not on this page (e.g. resume.html) — skip the typing effect
} else if (prefersReducedMotion) {
    typed.textContent = roles[0];
} else {
    let ri = 0, ci = 0, deleting = false;
    (function typeLoop() {
        const word = roles[ri];
        if (!deleting) {
            typed.textContent = word.slice(0, ++ci);
            if (ci === word.length) {
                deleting = true;
                setTimeout(typeLoop, 1800);
                return;
            }
        } else {
            typed.textContent = word.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                ri = (ri + 1) % roles.length;
            }
        }
        setTimeout(typeLoop, deleting ? 60 : 100);
    })();
}

/* ------------------------------------------------------------
   Scroll reveal
   ------------------------------------------------------------ */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
