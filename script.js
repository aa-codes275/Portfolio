/* ═══════════════════════════════════════════════════
   AHMED PORTFOLIO — script.js
   ═══════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────────
   1. LOADER
────────────────────────────────────────────────── */
(function loader() {
  const fill   = document.getElementById('loader-fill');
  const loader = document.getElementById('loader');
  if (!fill || !loader) return;

  let pct = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 18 + 6;
    if (pct >= 100) {
      pct = 100;
      clearInterval(iv);
      setTimeout(() => loader.classList.add('hide'), 300);
    }
    fill.style.width = pct + '%';
  }, 80);
})();

/* ──────────────────────────────────────────────────
   2. CUSTOM CURSOR  (desktop only)
────────────────────────────────────────────────── */
(function cursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring || window.matchMedia('(hover:none)').matches) return;

  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.12;
    ry += (e.clientY - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  });

  let rafId;
  function smooth() {
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    rafId = requestAnimationFrame(smooth);
  }
  smooth();

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  document.querySelectorAll('a,button,.tool,.f-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(168,85,247,.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(168,85,247,.5)';
    });
  });
})();

/* ──────────────────────────────────────────────────
   3. PARTICLES CANVAS
────────────────────────────────────────────────── */
(function particles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  const N    = 100;
  const DIST = 130;
  const SPD  = 0.28;
  const COL  = '124,58,237';

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }

  function mkPt() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.5 + .3,
      dx: (Math.random() - .5) * SPD,
      dy: (Math.random() - .5) * SPD,
      a:  Math.random() * .4 + .08,
    };
  }

  function init() { resize(); pts = Array.from({length:N}, mkPt); }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COL},${p.a})`;
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q  = pts[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${COL},${.11 * (1 - d / DIST)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }

      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    }
    requestAnimationFrame(draw);
  }

  addEventListener('resize', init);
  init();
  draw();
})();

/* ──────────────────────────────────────────────────
   4. NAVBAR
────────────────────────────────────────────────── */
(function nav() {
  const nav   = document.getElementById('nav');
  const links = document.querySelectorAll('.nav-a');
  const secs  = document.querySelectorAll('section[id]');

  addEventListener('scroll', () => {
    nav.classList.toggle('stuck', scrollY > 60);

    let cur = '';
    secs.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
    links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + cur));
  });
})();

/* ──────────────────────────────────────────────────
   5. MOBILE DROPDOWN MENU
────────────────────────────────────────────────── */
(function mobileMenu() {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mob-menu');
  if (!burger || !menu) return;

  function shut() {
    menu.classList.remove('on');
    burger.classList.remove('on');
  }

  burger.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.toggle('on');
    burger.classList.toggle('on');
  });

  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && e.target !== burger) shut();
  });

  document.querySelectorAll('.mob-a,.mob-cta').forEach(a => a.addEventListener('click', shut));
})();

/* ──────────────────────────────────────────────────
   6. TYPEWRITER (Multi-language optimized)
────────────────────────────────────────────────── */
let updateTypewriterData; // متغير عام لتمرير التحديث عند تغيير اللغة

(function typewriter() {
  const el = document.getElementById('typed');
  if (!el) return;

  const rolesAr = [
    'Frontend Developer ',
    'CSS & Animation Expert ',
    'JavaScript Developer ',
    'Admin Panel Builder ',
    'Responsive Design Pro ',
  ];

  const rolesEn = [
    'Frontend Developer ',
    'CSS & Animation Expert ',
    'JavaScript Developer ',
    'Admin Panel Builder ',
    'Responsive Design Pro ',
  ];

  let currentRoles = document.documentElement.getAttribute('lang') === 'en' ? rolesEn : rolesAr;
  let ri = 0, ci = 0, del = false;
  let timerId;

  function tick() {
    const word = currentRoles[ri];
    if (!word) return;
    
    if (!del) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { del = true; timerId = setTimeout(tick, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { del = false; ri = (ri + 1) % currentRoles.length; }
    }
    timerId = setTimeout(tick, del ? 60 : 82);
  }

  timerId = setTimeout(tick, 1000);

  // تحديث النصوص فوراً عند قلب اللغة
  updateTypewriterData = function(lang) {
    clearTimeout(timerId);
    currentRoles = lang === 'en' ? rolesEn : rolesAr;
    ri = 0;
    ci = 0;
    del = false;
    tick();
  };
})();

/* ──────────────────────────────────────────────────
   7. SCROLL REVEAL
────────────────────────────────────────────────── */
(function reveal() {
  const els = document.querySelectorAll('.ri');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el    = e.target;
      const delay = parseInt(el.dataset.delay || 0);

      setTimeout(() => {
        el.classList.add('in');

        /* skill bars */
        el.querySelectorAll('.sk-fill').forEach(b => {
          b.style.width = b.dataset.w + '%';
          b.classList.add('go');
        });

        /* counters */
        el.querySelectorAll('[data-count]').forEach(n => {
          const target = parseInt(n.dataset.count);
          let cur = 0;
          const step = Math.max(1, Math.ceil(target / 50));
          const iv = setInterval(() => {
            cur = Math.min(cur + step, target);
            n.textContent = cur;
            if (cur >= target) clearInterval(iv);
          }, 35);
        });

      }, delay);

      obs.unobserve(el);
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
})();

/* ──────────────────────────────────────────────────
   8. PROJECT FILTER
────────────────────────────────────────────────── */
(function filter() {
  const btns  = document.querySelectorAll('.f-btn');
  const cards = document.querySelectorAll('.proj-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');

      const f = btn.dataset.f;
      cards.forEach(c => {
        const match = f === 'all' || c.dataset.cat === f;
        c.classList.toggle('hide', !match);
      });
    });
  });
})();

/* ──────────────────────────────────────────────────
   9. SMOOTH SCROLL (accounts for navbar offset)
────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id  = a.getAttribute('href');
    const tgt = document.querySelector(id);
    if (!tgt) return;
    e.preventDefault();
    window.scrollTo({ top: tgt.offsetTop - 66, behavior: 'smooth' });
  });
});

/* ──────────────────────────────────────────────────
   10. TOAST
────────────────────────────────────────────────── */
let _toastTimer;
function showToast(msg, type) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { t.className = 'toast'; }, 2800);
}

/* ──────────────────────────────────────────────────
   11. COPY EMAIL
────────────────────────────────────────────────── */
function copyEmail() {
  const el = document.getElementById('email-display');
  if (!el) return;
  const isEn = document.documentElement.getAttribute('lang') === 'en';
  const successMsg = isEn ? '✓ Email copied!' : '✓ تم نسخ الإيميل!';
  const failMsg = isEn ? 'Copy manually: ' : 'انسخه يدوياً: ';

  navigator.clipboard.writeText(el.textContent.trim())
    .then(() => showToast(successMsg, 'ok'))
    .catch(() => showToast(failMsg + el.textContent.trim()));
}

/* ──────────────────────────────────────────────────
   12. BACK TO TOP
────────────────────────────────────────────────── */
(function backTop() {
  const btn = document.getElementById('top-btn');
  if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ──────────────────────────────────────────────────
   13. LANGUAGE SWITCH ENGINE (Custom Add-on)
────────────────────────────────────────────────── */
function setLanguage(lang) {
  const html = document.documentElement;
  const isEn = lang === 'en';

  html.setAttribute('lang', lang);
  html.setAttribute('dir', isEn ? 'ltr' : 'rtl');

  // تبديل محتوى الـ HTML بناءً على الـ Data-Attributes
  document.querySelectorAll('[data-en]').forEach(el => {
    if (!el.getAttribute('data-ar')) {
      el.setAttribute('data-ar', el.innerHTML);
    }
    el.innerHTML = isEn ? el.getAttribute('data-en') : el.getAttribute('data-ar');
  });

  // تحديث نصوص أزرار تبديل اللغة في الـ Desktop والـ Mobile
  const btnPc = document.getElementById('lang-switch');
  const btnMob = document.getElementById('lang-switch-mob');
  if (btnPc) btnPc.textContent = isEn ? 'AR' : 'EN';
  if (btnMob) btnMob.textContent = isEn ? 'AR' : 'EN';

  // تحديث الـ Typewriter
  if (typeof updateTypewriterData === 'function') {
    updateTypewriterData(lang);
  }

  // حفظ الاختيار في الكوكيز/الملفات المحلية
  localStorage.setItem('pref-lang', lang);
}

function toggleLanguage() {
  const currentLang = document.documentElement.getAttribute('lang') || 'ar';
  setLanguage(currentLang === 'ar' ? 'en' : 'ar');
}

// تشغيل التفضيل المحفوظ تلقائياً عند تحميل الصفحة أول مرة
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('pref-lang') || 'ar';
  if (savedLang === 'en') {
    setLanguage('en');
  }
});

