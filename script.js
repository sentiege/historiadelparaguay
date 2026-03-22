/* ══════════════════════════════════════
   ESTADO
══════════════════════════════════════ */
const slides  = document.querySelectorAll('.slide');
const dotsEl  = document.getElementById('dots');
const counter = document.getElementById('counter');
const total   = slides.length;
let current   = 0;

/* ══════════════════════════════════════
   DOTS — generar dinámicamente
══════════════════════════════════════ */
slides.forEach((_, i) => {
  const btn = document.createElement('button');
  btn.className = 'dot' + (i === 0 ? ' active' : '');
  btn.setAttribute('aria-label', `Ir a cartilla ${i + 1}`);
  btn.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(btn);
});

/* ══════════════════════════════════════
   NAVEGACIÓN
══════════════════════════════════════ */
function goTo(index) {
  if (index < 0 || index >= total) return;

  slides[current].classList.remove('active');
  document.querySelectorAll('.dot')[current].classList.remove('active');

  current = index;

  slides[current].classList.add('active');
  slides[current].scrollTop = 0;
  document.querySelectorAll('.dot')[current].classList.add('active');
  counter.textContent = `${current + 1} / ${total}`;
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft')  prev();
});

/* ══════════════════════════════════════
   MOTIVOS — cartilla 1
══════════════════════════════════════ */
const motivoTextos = {
  oro: '💰 Europa necesitaba oro y plata para acuñar monedas. Sin metales preciosos no podían sostener el comercio ni fortalecer la economía.',
  asia: '🌏 El comercio con Asia era caro y peligroso: intermediarios árabes y turcos encarecían las especias. Era urgente encontrar una ruta directa.',
  constantinopla: '🏰 En 1453 los turcos otomanos tomaron Constantinopla, bloqueando las rutas terrestres hacia Oriente. Europa debió buscar caminos por mar.'
};

function showMotivo(tipo, btn) {
  const box = document.getElementById('motivoBox');
  document.querySelectorAll('.motivo-card').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  box.textContent = motivoTextos[tipo];
  box.style.display = 'block';
}

/* ══════════════════════════════════════
   INFO TOOL — cartilla 2
══════════════════════════════════════ */
function showInfo(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ══════════════════════════════════════
   QUIZ INLINE — cartillas 1-8
══════════════════════════════════════ */
function checkQ(btn, isCorrect) {
  const box = btn.closest('.quiz-box');
  const feedback = box.querySelector('.feedback');

  box.querySelectorAll('.options button').forEach(b => {
    b.disabled = true;
    b.style.opacity = '0.75';
  });

  if (isCorrect) {
    btn.style.background  = '#dcfce7';
    btn.style.borderColor = '#86efac';
    btn.style.opacity     = '1';
    feedback.textContent  = '✅ ¡Correcto!';
    feedback.style.color  = '#15803d';
  } else {
    btn.style.background  = '#fee2e2';
    btn.style.borderColor = '#fca5a5';
    btn.style.opacity     = '1';
    feedback.textContent  = '❌ Incorrecto';
    feedback.style.color  = '#b91c1c';
  }
}

/* ══════════════════════════════════════
   QUIZ FINAL — cartilla 10
══════════════════════════════════════ */
function gradeQuiz() {
  const form   = document.getElementById('quizForm');
  const result = document.getElementById('quizResult');
  const retry  = document.getElementById('retryBtn');

  let score = 0;
  for (let i = 1; i <= 10; i++) {
    const sel = form.querySelector(`input[name="q${i}"]:checked`);
    if (sel && sel.value === 'c') score++;
  }

  let emoji, titulo, msg, rec;

  if (score === 10) {
    emoji  = '🎉';
    titulo = '¡Perfecto! 10 / 10';
    msg    = 'Dominás el contenido de esta unidad completamente.';
    rec    = '📖 Recomendamos pasar 2 veces más por esta lección y luego avanzar a la siguiente.';
  } else if (score >= 7) {
    emoji  = '👏';
    titulo = `¡Muy bien! ${score} / 10`;
    msg    = 'Casi lo tenés dominado, hay pequeños detalles para repasar.';
    rec    = '📖 Recomendamos pasar 2 veces más por esta lección y luego avanzar a la siguiente.';
  } else if (score >= 5) {
    emoji  = '📘';
    titulo = `Bien. ${score} / 10`;
    msg    = 'Hay varios conceptos para repasar antes de continuar.';
    rec    = '🔄 Recomendamos repasar toda la lección antes de avanzar a la siguiente.';
  } else {
    emoji  = '📚';
    titulo = `${score} / 10`;
    msg    = 'Necesitás repasar el contenido con más detalle.';
    rec    = '🔄 Recomendamos repasar toda la lección desde el inicio antes de avanzar.';
  }

  result.innerHTML = `
    <div style="font-size:2rem;margin-bottom:0.4rem">${emoji}</div>
    <div class="result-score">${titulo}</div>
    <div class="result-msg">${msg}</div>
    <div class="result-rec">${rec}</div>
  `;

  result.style.display = 'block';
  retry.style.display  = 'inline-block';

  setTimeout(() => result.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
}

function resetQuiz() {
  document.getElementById('quizForm').reset();
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('retryBtn').style.display   = 'none';
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
goTo(0);