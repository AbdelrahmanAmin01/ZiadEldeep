/* ============================================================
   ABDELRAHMAN AMIN — PORTFOLIO SCRIPT
   ============================================================ */

/* ---- Particles Canvas ---- */
(function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count   = Math.min(Math.floor(window.innerWidth / 12), 90);
    const palette = ['rgba(0,245,212,', 'rgba(108,99,255,', 'rgba(0,180,255,'];
    const particles = [];

    for (let i = 0; i < count; i++) {
        particles.push({
            x     : Math.random() * canvas.width,
            y     : Math.random() * canvas.height,
            r     : Math.random() * 1.6 + 0.3,
            speedX: (Math.random() - 0.5) * 0.25,
            speedY: (Math.random() - 0.5) * 0.25,
            color : palette[Math.floor(Math.random() * palette.length)],
            alpha : Math.random() * 0.5 + 0.05,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();
        });

        /* Connecting lines */
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0,245,212,${0.04 * (1 - dist / 120)})`;
                    ctx.lineWidth   = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
})();

/* ---- Cursor Glow ---- */
(function initCursor() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.matchMedia('(hover: none)').matches) {
        if (glow) glow.style.display = 'none';
        return;
    }

    let tx = 0, ty = 0, cx = 0, cy = 0;

    window.addEventListener('mousemove', e => {
        tx = e.clientX;
        ty = e.clientY;
    });

    function animate() {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        glow.style.left = cx + 'px';
        glow.style.top  = cy + 'px';
        requestAnimationFrame(animate);
    }
    animate();
})();

/* ---- Navbar Scroll Behaviour ---- */
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
})();

/* ---- Mobile Menu ---- */
(function initMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
})();

/* ---- Active Nav Link on Scroll ---- */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function update() {
        const y = window.scrollY + window.innerHeight * 0.35;
        let current = '';

        sections.forEach(s => {
            if (y >= s.offsetTop) current = s.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
})();

/* ---- Typing Effect ---- */
(function initTyping() {
    const el = document.getElementById('typedText');
    if (!el) return;

    const words = [
        'Medical Student',
        'Medical Education Trainer',
        'Future Surgeon',
        'Leadership Enthusiast',
        'Digital Innovator',
    ];

    let wi = 0, ci = 0, deleting = false;
    const SPEED_TYPE = 80, SPEED_DEL = 45, PAUSE = 1800;

    function type() {
        const word = words[wi];
        el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

        let delay = deleting ? SPEED_DEL : SPEED_TYPE;

        if (!deleting && ci === word.length + 1) {
            delay    = PAUSE;
            deleting = true;
        } else if (deleting && ci < 0) {
            deleting = false;
            ci       = 0;
            wi       = (wi + 1) % words.length;
            delay    = 400;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 800);
})();

/* ---- Reveal on Scroll (Intersection Observer) ---- */
(function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            /* Staggered delay for sibling groups */
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let idx = 0;
            siblings.forEach((s, j) => { if (s === entry.target) idx = j; });

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 70);

            io.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => io.observe(el));
})();

/* ---- Animated Counters ---- */
(function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el     = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const dur    = 1600;
            const step   = 16;
            const inc    = target / (dur / step);
            let val      = 0;

            const tick = () => {
                val = Math.min(val + inc, target);
                el.textContent = Math.floor(val);
                if (val < target) setTimeout(tick, step);
            };

            tick();
            io.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => io.observe(c));
})();

/* ---- Contact Form ---- */
(function initForm() {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const btn = form.querySelector('.submit-btn');
        btn.disabled    = true;
        btn.innerHTML   = 'Sending… <i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
            btn.disabled  = false;
            btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            form.reset();
            if (success) {
                success.classList.add('show');
                setTimeout(() => success.classList.remove('show'), 5000);
            }
        }, 1400);
    });
})();

/* ---- Smooth Scroll for Anchor Links ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const id     = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
