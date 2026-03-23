/* ════════════════════════════════
   MEDIALERT — JavaScript
   ════════════════════════════════ */


/* ══════════════════════════════════
   PARTÍCULAS DE FONDO
   Píldoras y puntos flotantes animados
   Para cambiar cantidad: edita PARTICLE_COUNT
   Para cambiar colores: edita el array 'color'
   Para desactivar: borra todo este bloque y
   el <canvas id="particles-canvas"> del HTML
   ══════════════════════════════════ */
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');

// Cantidad de partículas — más = más carga en el CPU
// 40 es un buen balance entre visual y rendimiento
const PARTICLE_COUNT = 40;

let W, H;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Crear una partícula con valores aleatorios
function createParticle() {
  return {
    x:      Math.random() * W,
    y:      Math.random() * H,
    size:   Math.random() * 2.5 + 1,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: (Math.random() - 0.5) * 0.35,
    opacity: Math.random() * 0.35 + 0.08,
    type:   Math.random() > 0.65 ? 'pill' : 'dot',
    // Paleta de colores — cambia estos para otra paleta
    color: ['#388bfd', '#58a6ff', '#79c0ff', '#1f6feb', '#388bfd'][
      Math.floor(Math.random() * 5)
    ],
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.008,
  };
}

const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

function animateParticles() {
  ctx.clearRect(0, 0, W, H);

  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle   = p.color;
    ctx.strokeStyle = p.color;
    ctx.lineWidth   = 0.8;

    if (p.type === 'pill') {
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const w = p.size * 4, h = p.size * 1.5;
      ctx.beginPath();
      ctx.roundRect(-w/2, -h/2, w, h, h/2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    p.x        += p.speedX;
    p.y        += p.speedY;
    p.rotation += p.rotSpeed;

    if (p.x < -20)  p.x = W + 20;
    if (p.x > W+20) p.x = -20;
    if (p.y < -20)  p.y = H + 20;
    if (p.y > H+20) p.y = -20;
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();


/* ══════════════════════════════════
   NAVBAR — EFECTO AL SCROLL
   La nav se vuelve sólida al bajar
   ══════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});


/* ══════════════════════════════════
   MENÚ HAMBURGUESA (MÓVIL)
   ══════════════════════════════════ */
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('nav-mobile');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});


/* ══════════════════════════════════
   SCROLL REVEAL
   Los elementos se animan al entrar
   en pantalla mientras haces scroll
   ══════════════════════════════════ */
const revealEls = document.querySelectorAll(
  '.step, .feature-card, .plan, .contact-card, .changelog-item, .reveal'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 70);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -30px 0px'
});

revealEls.forEach(el => observer.observe(el));


/* ══════════════════════════════════
   CHANGELOG DINÁMICO
   Lee version.json y genera las
   tarjetas de actualizaciones
   Para agregar versiones: edita version.json
   ══════════════════════════════════ */
async function loadChangelog() {
  try {
    const res  = await fetch('version.json?t=' + Date.now());
    const data = await res.json();
    const container = document.getElementById('changelog');

    if (!data.versions?.length) {
      container.innerHTML = '<p style="color:var(--muted)">Próximamente.</p>';
      return;
    }

    container.innerHTML = data.versions.map(v => `
      <div class="changelog-item">
        <div>
          <div class="changelog-version">v${v.version}</div>
          <div class="changelog-date">${v.date}</div>
        </div>
        <div>
          <div class="changelog-title">${v.title}</div>
          <div class="changelog-notes">${v.notes.map(n => '• ' + n).join('<br>')}</div>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.changelog-item').forEach(el => {
      observer.observe(el);
    });

  } catch {
    document.getElementById('changelog').innerHTML =
      '<p style="color:var(--muted);font-size:13px">Próximamente.</p>';
  }
}

loadChangelog();


/* ══════════════════════════════════
   BOTÓN VOLVER ARRIBA
   Aparece después de 300px de scroll
   Para cambiar a qué altura aparece: edita 300
   ══════════════════════════════════ */
const btnTop = document.getElementById('btn-top');

window.addEventListener('scroll', () => {
  btnTop.classList.toggle('show', window.scrollY > 300);
});


/* ══════════════════════════════════
   SCROLL REVEAL EXTENDIDO
   Incluye las nuevas clases:
   .reveal-left, .reveal-right, .reveal-scale
   ══════════════════════════════════ */
const extraReveal = document.querySelectorAll(
  '.reveal-left, .reveal-right, .reveal-scale'
);

const extraObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      extraObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

extraReveal.forEach(el => extraObserver.observe(el));


/* ══════════════════════════════════
   DEMO TABS
   Controla qué tab está activo en la
   sección de demostración.
   Se llama desde onclick en cada botón.
   ══════════════════════════════════ */
function switchTab(tabId, btnEl) {
  // Ocultar todos los contenidos de tab
  document.querySelectorAll('.demo-tab-content').forEach(el => {
    el.classList.remove('active');
  });

  // Desactivar todos los botones
  document.querySelectorAll('.demo-tab-btn').forEach(el => {
    el.classList.remove('active');
  });

  // Mostrar el tab seleccionado
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');

  // Activar el botón presionado
  if (btnEl) btnEl.classList.add('active');
}

// También observar los nuevos elementos de la sección Windows
document.querySelectorAll('.alert-box, .alert-step').forEach(el => {
  observer.observe(el);
});
