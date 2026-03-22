const slider   = document.getElementById("slider");
const slides   = document.querySelectorAll(".slide");
const curEl    = document.getElementById("currentCard");
const totEl    = document.getElementById("totalCards");
const dotsWrap = document.getElementById("dotsWrap");

let current = 0;
totEl.textContent = slides.length;

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(dot);
});

function goTo(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  slider.style.transform = `translateX(-${current * 100}%)`;
  curEl.textContent = current + 1;
  document.querySelectorAll(".dot").forEach((d, i) =>
    d.classList.toggle("active", i === current));
  slides[current].scrollTop = 0;
}

function nextSlide() { goTo(current + 1); }
function prevSlide() { goTo(current - 1); }

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft")  prevSlide();
});

const motivoTextos = {
  oro: "Europa necesitaba oro y plata para acuñar monedas. Sin metales preciosos no podían sostener el comercio ni fortalecer la economía.",
  asia: "El comercio con Asia era caro y peligroso: los intermediarios árabes y turcos encarecían las especias. Era urgente encontrar una ruta directa.",
  constantinopla: "En 1453 los turcos otomanos tomaron Constantinopla, bloqueando las rutas terrestres hacia Oriente. Europa debió buscar caminos por mar."
};

function showMotivo(tipo, btn) {
  const box = document.getElementById("motivoBox");
  document.querySelectorAll(".motivo-card").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  box.textContent = motivoTextos[tipo];
  box.style.display = "block";
}

function showInfo(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function checkAnswer(button, isCorrect) {
  const box      = button.closest(".quiz-box");
  const feedback = box.querySelector(".feedback");
  box.querySelectorAll(".options button").forEach(b => {
    b.disabled = true;
    b.style.opacity = "0.8";
  });
  if (isCorrect) {
    button.style.background  = "#dcfce7";
    button.style.borderColor = "#86efac";
    feedback.textContent     = "✅ Correcto";
    feedback.style.color     = "#15803d";
  } else {
    button.style.background  = "#fee2e2";
    button.style.borderColor = "#fca5a5";
    feedback.textContent     = "❌ Incorrecto";
    feedback.style.color     = "#b91c1c";
  }
}

function gradeQuiz() {
  const form   = document.getElementById("quizForm");
  const result = document.getElementById("quizResult");
  const retry  = document.getElementById("retryBtn");

  let score = 0;
  for (let i = 1; i <= 10; i++) {
    const sel = form.querySelector(`input[name="q${i}"]:checked`);
    if (sel && sel.value === "c") score++;
  }

  // Mensaje según puntaje
  let emoji, titulo, detalle, recomendacion;

  if (score === 10) {
    emoji = "🎉";
    titulo = "¡Perfecto! Obtuviste 10/10.";
    detalle = "Dominás el contenido de esta unidad.";
    recomendacion = "📖 Recomendamos pasar 2 veces más por esta lección y luego avanzar a la siguiente.";
  } else if (score >= 7) {
    emoji = "👏";
    titulo = `¡Muy bien! Obtuviste ${score}/10.`;
    detalle = "Casi lo tenés dominado.";
    recomendacion = "📖 Recomendamos pasar 2 veces más por esta lección y luego avanzar a la siguiente.";
  } else if (score >= 5) {
    emoji = "📘";
    titulo = `Bien. Obtuviste ${score}/10.`;
    detalle = "Hay algunos conceptos para repasar.";
    recomendacion = "🔄 Recomendamos repasar toda la lección antes de avanzar a la siguiente.";
  } else {
    emoji = "📚";
    titulo = `Obtuviste ${score}/10.`;
    detalle = "Necesitás repasar el contenido con más detalle.";
    recomendacion = "🔄 Recomendamos repasar toda la lección desde el inicio antes de avanzar.";
  }

  result.innerHTML = `
    <div style="font-size:2rem;margin-bottom:0.4rem">${emoji}</div>
    <div style="font-size:1.05rem;font-weight:800;margin-bottom:0.2rem">${titulo}</div>
    <div style="font-size:0.93rem;font-weight:400;color:#4c1d95;margin-bottom:0.6rem">${detalle}</div>
    <div style="background:#ddd6fe;border-radius:8px;padding:0.65rem 0.9rem;font-size:0.92rem;font-weight:700;color:#3b0764;border-left:4px solid #7c3aed">
      ${recomendacion}
    </div>
  `;

  result.style.display = "block";
  retry.style.display  = "inline-block";

  // Scroll automático al resultado
  setTimeout(() => {
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 100);
}

function resetQuiz() {
  document.getElementById("quizForm").reset();
  document.getElementById("quizResult").style.display = "none";
  document.getElementById("retryBtn").style.display   = "none";
}

goTo(0);
