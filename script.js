// ── ABRIR SOBRE ──
function abrirSobre() {
    const sobre = document.querySelector('.sobre');
    if (sobre.classList.contains('abierto')) return;

    sobre.classList.add('abierto');

    setTimeout(() => {
        window.location.href = 'confirmacion.html';
    }, 900);
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