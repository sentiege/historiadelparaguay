const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const currentCard = document.getElementById("currentCard");
const totalCards = document.getElementById("totalCards");

let currentIndex = 0;
totalCards.textContent = slides.length;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  currentCard.textContent = currentIndex + 1;
}

function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlider();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

function showInfo(id, text) {
  const box = document.getElementById(id);
  if (box) box.textContent = text;
}

function showMotivo(tipo) {
  const box = document.getElementById("motivoBox");

  const textos = {
    oro: "Europa necesitaba oro y plata para acuñar monedas y fortalecer su economía comercial.",
    asia: "El comercio con Asia era difícil y caro, por eso buscaban rutas nuevas para llegar a especias y productos de lujo.",
    constantinopla: "La caída de Constantinopla complicó las rutas tradicionales hacia Oriente y empujó a buscar caminos alternativos."
  };

  box.textContent = textos[tipo] || "Seleccioná una opción.";
}

function checkAnswer(button, isCorrect) {
  const box = button.closest(".quiz-box");
  const feedback = box.querySelector(".feedback");
  const buttons = box.querySelectorAll(".options button");

  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.85";
  });

  if (isCorrect) {
    button.style.background = "#dcfce7";
    button.style.borderColor = "#86efac";
    feedback.textContent = "✅ Correcto";
    feedback.style.color = "#15803d";
  } else {
    button.style.background = "#fee2e2";
    button.style.borderColor = "#fca5a5";
    feedback.textContent = "❌ Incorrecto";
    feedback.style.color = "#b91c1c";
  }
}

function gradeQuiz() {
  const form = document.getElementById("finalQuiz");
  const result = document.getElementById("quizResult");
  let score = 0;

  for (let i = 1; i <= 4; i++) {
    const checked = form.querySelector(`input[name="q${i}"]:checked`);
    if (checked && checked.value === "correct") score++;
  }

  if (score === 4) {
    result.textContent = `🎉 Excelente: obtuviste ${score}/4.`;
  } else if (score >= 2) {
    result.textContent = `👏 Muy bien: obtuviste ${score}/4.`;
  } else {
    result.textContent = `📘 Obtuviste ${score}/4. Conviene repasar las cartillas.`;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

updateSlider();
