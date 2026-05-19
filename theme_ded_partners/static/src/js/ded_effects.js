/**
 * D&D Partners Theme - WOW Effects JavaScript
 * Particle network, typing animation, counters, scroll reveals,
 * parallax, neon cursor, magnetic buttons & more.
 */

(function () {
    'use strict';

    // ─── Utility ────────────────────────────────────────────────
    const $ = (s, p = document) => p.querySelector(s);
    const $$ = (s, p = document) => [...p.querySelectorAll(s)];
    const raf = requestAnimationFrame;

    // ─── 1. PARTICLE NETWORK CANVAS ─────────────────────────────
    function initParticles() {
        const canvas = document.getElementById('ded-particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let W, H, particles = [];
        const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;
        const MAX_DIST = 140;
        const COLORS = ['#2563EB', '#E07B1A', '#3B82F6', '#93C5FD'];

        function resize() {
            W = canvas.width  = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x  = Math.random() * W;
                this.y  = Math.random() * H;
                this.vx = (Math.random() - .5) * .6;
                this.vy = (Math.random() - .5) * .6;
                this.r  = Math.random() * 2.5 + 1;
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.alpha = Math.random() * .6 + .2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > W) this.vx *= -1;
                if (this.y < 0 || this.y > H) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function connect() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d  = Math.sqrt(dx * dx + dy * dy);
                    if (d < MAX_DIST) {
                        const alpha = (1 - d / MAX_DIST) * .25;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(37,99,235,${alpha})`;
                        ctx.lineWidth = .8;
                        ctx.stroke();
                    }
                }
            }
        }

        function loop() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => { p.update(); p.draw(); });
            connect();
            raf(loop);
        }

        resize();
        window.addEventListener('resize', () => { resize(); });
        particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
        loop();
    }

    // ─── 2. TYPING ANIMATION ────────────────────────────────────
    function initTyping() {
        $$('[data-typed]').forEach(el => {
            const words   = (el.dataset.typed || '').split('|');
            const speed   = parseInt(el.dataset.typedSpeed || 80);
            const pause   = parseInt(el.dataset.typedPause || 1800);
            let wi = 0, ci = 0, deleting = false;

            // Insert cursor sibling
            const cursor = document.createElement('span');
            cursor.className = 'typed-cursor';
            el.after(cursor);

            function tick() {
                const word = words[wi % words.length];
                if (!deleting) {
                    el.textContent = word.slice(0, ++ci);
                    if (ci === word.length) {
                        deleting = true;
                        setTimeout(tick, pause);
                        return;
                    }
                } else {
                    el.textContent = word.slice(0, --ci);
                    if (ci === 0) {
                        deleting = false;
                        wi++;
                    }
                }
                setTimeout(tick, deleting ? speed / 2 : speed);
            }
            tick();
        });
    }

    // ─── 3. ANIMATED COUNTERS ───────────────────────────────────
    function initCounters() {
        const counters = $$('[data-count]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el  = entry.target;
                const end = parseFloat(el.dataset.count);
                const dur = parseInt(el.dataset.countDuration || 2000);
                const dec = parseInt(el.dataset.countDecimals || 0);
                const suf = el.dataset.countSuffix || '';
                const pref = el.dataset.countPrefix || '';
                let start = null;

                function frame(ts) {
                    if (!start) start = ts;
                    const progress = Math.min((ts - start) / dur, 1);
                    const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
                    el.textContent = pref + (end * ease).toFixed(dec) + suf;
                    if (progress < 1) raf(frame);
                }
                raf(frame);
                observer.unobserve(el);
            });
        }, { threshold: .4 });

        counters.forEach(c => observer.observe(c));
    }

    // ─── 4. SCROLL REVEAL ───────────────────────────────────────
    function initReveal() {
        const els = $$('[data-ded-reveal]');
        if (!els.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

        els.forEach(el => observer.observe(el));
    }

    // ─── 5. PARALLAX ────────────────────────────────────────────
    function initParallax() {
        const layers = $$('[data-parallax]');
        if (!layers.length || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

        window.addEventListener('scroll', () => {
            const sy = window.scrollY;
            layers.forEach(el => {
                const speed = parseFloat(el.dataset.parallax || .3);
                el.style.transform = `translateY(${sy * speed}px)`;
            });
        }, { passive: true });
    }

    // ─── 6. MAGNETIC BUTTONS ────────────────────────────────────
    function initMagneticBtns() {
        $$('.btn-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect   = btn.getBoundingClientRect();
                const cx     = rect.left + rect.width  / 2;
                const cy     = rect.top  + rect.height / 2;
                const dx     = (e.clientX - cx) * .35;
                const dy     = (e.clientY - cy) * .35;
                btn.style.transform = `translate(${dx}px, ${dy}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ─── 7. NEON CURSOR TRAIL ───────────────────────────────────
    function initCursorTrail() {
        if (window.matchMedia('(pointer:coarse)').matches) return; // skip on touch
        const trail = [];
        const TRAIL_LEN = 12;

        for (let i = 0; i < TRAIL_LEN; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position:fixed; pointer-events:none; z-index:9999;
                border-radius:50%;
                background: ${i < 4 ? 'var(--ded-orange)' : 'var(--ded-blue)'};
                opacity:0; transition: opacity .3s;
                will-change: transform;
            `;
            const size = Math.max(4, TRAIL_LEN - i) * 1.2;
            dot.style.width = dot.style.height = size + 'px';
            document.body.appendChild(dot);
            trail.push({ el: dot, x: -100, y: -100 });
        }

        let mx = -100, my = -100;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

        function animTrail() {
            let px = mx, py = my;
            trail.forEach((t, i) => {
                t.x += (px - t.x) * (.3 - i * .018);
                t.y += (py - t.y) * (.3 - i * .018);
                t.el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%,-50%)`;
                t.el.style.opacity   = (1 - i / TRAIL_LEN) * .6;
                px = t.x; py = t.y;
            });
            raf(animTrail);
        }
        animTrail();

        // show on mouse enter
        document.addEventListener('mouseenter', () =>
            trail.forEach(t => t.el.style.opacity = ''));
    }

    // ─── 8. HEADER SCROLL BEHAVIOUR ─────────────────────────────
    function initHeader() {
        const header = $('header#top, nav.navbar, header.o_header_standard');
        if (!header) return;
        let lastY = 0;

        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            // Hide on scroll down, show on scroll up
            if (y > lastY && y > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = '';
            }
            lastY = y;
        }, { passive: true });
    }

    // ─── 9. SMOOTH ANCHOR SCROLL ────────────────────────────────
    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = $(a.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                const offset = 80; // header height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            });
        });
    }

    // ─── 10. TILT CARDS ─────────────────────────────────────────
    function initTiltCards() {
        $$('.ded-card, .service-card, .ded-product-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x  = (e.clientX - rect.left) / rect.width  - .5;
                const y  = (e.clientY - rect.top)  / rect.height - .5;
                card.style.transform =
                    `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px) scale(1.01)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ─── 11. GLITCH TEXT ────────────────────────────────────────
    function initGlitch() {
        $$('[data-glitch]').forEach(el => {
            const text = el.textContent;
            el.setAttribute('data-text', text);
        });
    }

    // ─── 12. COUNT-UP for hero badges ───────────────────────────
    function initHeroBadges() {
        // Animate the progress bar / hero number badges
        $$('.ded-hero [data-progress]').forEach(bar => {
            const pct = parseInt(bar.dataset.progress || 0);
            setTimeout(() => {
                bar.style.width = pct + '%';
            }, 600);
        });
    }

    // ─── INIT ────────────────────────────────────────────────────
    function init() {
        initParticles();
        initTyping();
        initCounters();
        initReveal();
        initParallax();
        initMagneticBtns();
        initCursorTrail();
        initHeader();
        initSmoothScroll();
        initTiltCards();
        initGlitch();
        initHeroBadges();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-run reveal & tilt after Odoo snippet adds
    if (window.owl) {
        // Odoo 16+ uses OWL
        document.addEventListener('odoo-save-before', () => {
            initReveal();
            initTiltCards();
            initCounters();
        });
    }

})();
