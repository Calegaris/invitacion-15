// ── ABRIR SOBRE ──
function abrirSobre() {
    const sobre = document.querySelector('.sobre');
    if (sobre.classList.contains('abierto')) return;

    sobre.classList.add('abierto');

    sonidoMagico();
    lanzarParticulas();

    setTimeout(() => {
        window.location.href = 'confirmacion.html';
    }, 1400);
}

// ── SONIDO MÁGICO ──
function sonidoMagico() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const notas = [523, 659, 784, 1047, 1319];
    notas.forEach((freq, i) => {
        setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.3);

            gain.gain.setValueAtTime(0.18, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.5);
        }, i * 80);
    });
}

// ── PARTÍCULAS ──
function lanzarParticulas() {
    const sello = document.querySelector('.sello');
    const rect = sello.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const colores = [
        '#7aaee8', '#a8c8f0', '#ffffff',
        '#4a7fc1', '#c8dff5', '#e8f0fc'
    ];

    for (let i = 0; i < 32; i++) {
        const p = document.createElement('div');
        p.classList.add('particula');

        const angulo = Math.random() * 360;
        const distancia = 60 + Math.random() * 120;
        const dx = Math.cos((angulo * Math.PI) / 180) * distancia;
        const dy = Math.sin((angulo * Math.PI) / 180) * distancia;
        const size = 3 + Math.random() * 5;
        const color = colores[Math.floor(Math.random() * colores.length)];
        const delay = Math.random() * 0.2;

        p.style.cssText = `
      left: ${cx}px;
      top: ${cy}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      --dx: ${dx}px;
      --dy: ${dy}px;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1600);
    }
}

// ── CONTADOR (confirmacion.html) ──
const fechaFiesta = new Date('2026-04-18T21:00:00');

function actualizarContador() {
    const ahora = new Date();
    const diferencia = fechaFiesta - ahora;

    if (diferencia <= 0) {
        ['dias', 'horas', 'minutos', 'segundos'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '00';
        });
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(val).padStart(2, '0');
    };

    set('dias', dias);
    set('horas', horas);
    set('minutos', minutos);
    set('segundos', segundos);
}

if (document.getElementById('dias')) {
    actualizarContador();
    setInterval(actualizarContador, 1000);
}

// ── BOTÓN WHATSAPP ──
const btn = document.getElementById('btnWhatsapp');
if (btn) {
    const numeroMama = '5491112345678';
    const mensaje = encodeURIComponent('¡Hola! Confirmo que voy a estar en los 15 de Sofía 🎉');
    btn.href = `https://wa.me/${numeroMama}?text=${mensaje}`;
}

// ── SLIDESHOW DE FONDO ──
const slides = document.querySelectorAll('.slide-bg img');
if (slides.length) {
    let actual = 0;
    setInterval(() => {
        slides[actual].classList.remove('activa');
        actual = (actual + 1) % slides.length;
        slides[actual].classList.add('activa');
    }, 4000);
}