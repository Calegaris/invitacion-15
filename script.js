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
    const audio = new Audio('audio/magia.mp3');
    audio.volume = 0.8;
    audio.play();
}

// ── PARTÍCULAS ──
function lanzarParticulas() {
    const sello = document.querySelector('.sello');
    const rect = sello.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const colores = [
        '#7B152E', '#c47a8a', '#ffffff',
        '#a03050', '#e8c0c8', '#f0e8ea'
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
const fechaFiesta = new Date('2026-05-30T21:00:00');

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

// ── REPRODUCTOR SPOTIFY MINIMIZABLE ──
const headerToggleReproductor = document.getElementById('reproductor-header-toggle');
const reproductorContainer = document.getElementById('reproductor-wrapper');

if (headerToggleReproductor && reproductorContainer) {
    // Recuperar estado guardado
    const estadoReproductor = localStorage.getItem('reproductor-estado') || 'expandido';
    reproductorContainer.classList.remove('expandido', 'minimizado');
    reproductorContainer.classList.add(estadoReproductor);

    // Toggle al hacer click en el header
    headerToggleReproductor.addEventListener('click', () => {
        reproductorContainer.classList.toggle('minimizado');
        reproductorContainer.classList.toggle('expandido');

        // Guardar estado
        const nuevoEstado = reproductorContainer.classList.contains('expandido') ? 'expandido' : 'minimizado';
        localStorage.setItem('reproductor-estado', nuevoEstado);
    });

    // Cerrar con tecla Escape (opcional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && reproductorContainer.classList.contains('expandido')) {
            headerToggleReproductor.click();
        }
    });
}

// ── AUDIO DE FONDO ──
const audioFondo = document.getElementById('audio-fondo');
if (audioFondo) {
    audioFondo.volume = 0.2; // Volumen bajo para no interferir
    window.addEventListener('load', () => {
        audioFondo.play().catch(() => {
            // Si autoplay está bloqueado, reproducir al primer click
            document.addEventListener('click', () => {
                audioFondo.play();
            }, { once: true });
        });
    });
}
