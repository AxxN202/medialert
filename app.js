// ═══════════════════════════════════
//  MediAlert — Landing Page JS
// ═══════════════════════════════════

// ── Nav scroll effect ──────────────
const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40)
})

// ── Mobile hamburger ───────────────
const hamburger = document.getElementById('nav-hamburger')
const mobileNav = document.getElementById('nav-mobile')
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open')
})
// Cerrar al hacer clic en un link
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'))
})

// ── Reveal on scroll ───────────────
const reveals = document.querySelectorAll('.how, .features, .pricing, .updates, .contact, .step, .feature-card, .plan, .contact-card')
reveals.forEach(el => el.classList.add('reveal'))

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80)
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

// ── Cargar changelog desde version.json ──
async function loadChangelog() {
  try {
    const res  = await fetch('version.json?t=' + Date.now())
    const data = await res.json()
    const container = document.getElementById('changelog')

    if (!data.versions || data.versions.length === 0) {
      container.innerHTML = '<p style="color:var(--muted)">No hay actualizaciones aún.</p>'
      return
    }

    container.innerHTML = data.versions.map(v => `
      <div class="changelog-item reveal">
        <div>
          <div class="changelog-version">v${v.version}</div>
          <div class="changelog-date">${v.date}</div>
        </div>
        <div>
          <div class="changelog-title">${v.title}</div>
          <div class="changelog-notes">${v.notes.map(n => '• ' + n).join('<br>')}</div>
        </div>
      </div>
    `).join('')

    // Re-observar los nuevos elementos
    document.querySelectorAll('.changelog-item').forEach(el => {
      el.classList.add('reveal')
      observer.observe(el)
    })

  } catch (e) {
    document.getElementById('changelog').innerHTML =
      '<p style="color:var(--muted);font-size:14px">Próximamente.</p>'
  }
}

loadChangelog()
