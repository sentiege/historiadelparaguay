function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function toggleCard(card) {
  card.classList.toggle("active");
}

function showInfo(id, text) {
  document.getElementById(id).textContent = text;
}

function checkAnswer(button, isCorrect) {
  const container = button.closest(".quiz-mini");
  const feedback = container.querySelector(".feedback");
  const buttons = container.querySelectorAll(".options button");

  buttons.forEach(btn => {
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

let currentStep = 1;

function markSequence(button, step) {
  const message = document.getElementById("sequenceMessage");

  if (button.classList.contains("correct")) return;

  if (step === currentStep) {
    button.classList.add("correct");
    currentStep++;

    if (currentStep === 4) {
      message.textContent = "✅ Secuencia completada correctamente.";
      message.style.color = "#15803d";
    } else {
      message.textContent = "✅ Bien. SeguÍ con el siguiente.";
      message.style.color = "#15803d";
    }
  } else {
    message.textContent = "❌ Ese no sigue todavía. Probá otra vez.";
    message.style.color = "#b91c1c";
  }
}

function gradeQuiz() {
  const form = document.getElementById("finalQuiz");
  const result = document.getElementById("quizResult");
  let score = 0;

  for (let i = 1; i <= 5; i++) {
    const answer = form.querySelector(`input[name="q${i}"]:checked`);
    if (answer && answer.value === "correct") {
      score++;
    }
  }

  if (score === 5) {
    result.textContent = `🎉 Excelente: obtuviste ${score}/5.`;
  } else if (score >= 3) {
    result.textContent = `👏 Muy bien: obtuviste ${score}/5.`;
  } else {
    result.textContent = `📘 Obtuviste ${score}/5. Conviene repasar y volver a intentar.`;
  }
}

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById("progressBar").style.width = `${progress}%`;
}

function revealSections() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const elementTop = section.getBoundingClientRect().top;
    const visiblePoint = 100;

    if (elementTop < windowHeight - visiblePoint) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", updateProgressBar);
window.addEventListener("scroll", revealSections);
window.addEventListener("load", () => {
  updateProgressBar();
  revealSections();
});