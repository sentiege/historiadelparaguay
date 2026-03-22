/* ==============================
   SLIDER
============================== */
const slider    = document.getElementById("slider");
const slides    = document.querySelectorAll(".slide");
const curEl     = document.getElementById("currentCard");
const totEl     = document.getElementById("totalCards");
const dotsWrap  = document.getElementById("dotsWrap");

let current = 0;
totEl.textContent = slides.length;

// Crear puntos de navegación
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", "Ir a cartilla " + (i + 1));
  dot.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(dot);
});

function goTo(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  slider.style.transform = `translateX(-${current * 100}%)`;
  curEl.textContent = current + 1;
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === current);
  });
}

function nextSlide() { goTo(current + 1); }
function prevSlide() { goTo(current - 1); }

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft")  prevSlide();
});

/* ==============================
   MOTIVOS (Cartilla 1)
============================== */
const motivoTextos = {
  oro: "Europa necesitaba oro y plata para acuñar monedas. Sin metales preciosos no podían sostener el comercio ni fortalecer su economía.",
  asia: "El comercio con Asia era caro y peligroso: los intermediarios árabes y turcos encarecían las especias y productos de lujo. Era urgente encontrar una ruta directa.",
  constantinopla: "En 1453 los turcos otomanos tomaron Constantinopla, bloqueando las rutas terrestres tradicionales hacia Oriente. Eso obligó a Europa a buscar caminos alternativos por mar."
};

function showMotivo(tipo, btn) {
  const box   = document.getElementById("motivoBox");
  const texto = document.getElementById("motivoTexto");

  document.querySelectorAll(".motivo-card").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");

  texto.textContent = motivoTextos[tipo];
  box.classList.remove("hidden");
}

/* ==============================
   INFO PANEL
============================== */
function showInfo(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ==============================
   QUIZ POR CARTILLA
============================== */
function checkAnswer(button, isCorrect) {
  const box      = button.closest(".quiz-box");
  const feedback = box.querySelector(".feedback");
  const btns     = box.querySelectorAll(".options button");

  btns.forEach(b => {
    b.disabled = true;
    b.style.opacity = "0.8";
  });

  if (isCorrect) {
    button.style.background    = "#dcfce7";
    button.style.borderColor   = "#86efac";
    feedback.textContent       = "✅ Correcto";
    feedback.style.color       = "#15803d";
  } else {
    button.style.background    = "#fee2e2";
    button.style.borderColor   = "#fca5a5";
    feedback.textContent       = "❌ Incorrecto";
    feedback.style.color       = "#b91c1c";
  }
}

/* ==============================
   QUIZ FINAL
============================== */
function gradeQuiz() {
  const form   = document.getElementById("quizForm");
  const result = document.getElementById("quizResult");
  const retry  = document.getElementById("retryBtn");
  let score    = 0;

  for (let i = 1; i <= 10; i++) {
    const sel = form.querySelector(`input[name="q${i}"]:checked`);
    if (sel && sel.value === "c") score++;
  }

  let msg = "";
  if (score === 10)      msg = `🎉 ¡Perfecto! Obtuviste ${score}/10.`;
  else if (score >= 8)   msg = `🥇 Excelente: obtuviste ${score}/10.`;
  else if (score >= 6)   msg = `👏 Muy bien: obtuviste ${score}/10.`;
  else if (score >= 4)   msg = `📘 Bien: obtuviste ${score}/10. Repasá las cartillas.`;
  else                   msg = `📚 Obtuviste ${score}/10. Volvé a revisar el contenido.`;

  result.textContent = msg;
  result.classList.remove("hidden");
  retry.classList.remove("hidden");
}

function resetQuiz() {
  const form   = document.getElementById("quizForm");
  const result = document.getElementById("quizResult");
  const retry  = document.getElementById("retryBtn");

  form.reset();
  result.classList.add("hidden");
  retry.classList.add("hidden");
  result.textContent = "";
}

/* Inicializar */
goTo(0);
