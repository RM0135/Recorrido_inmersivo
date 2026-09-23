/**
 * Interactive Quiz Module
 * Handles questions, choices, feedback and score calculation
 */

class SlidesQuiz {
  constructor() {
    this.questions = [
      {
        question: "1. ¿Qué es Godot Engine?",
        options: [
          "Un visor de realidad virtual que cuesta dinero.",
          "Un motor gráfico libre, gratuito y multiplataforma.",
          "Una cámara panorámica de alta resolución.",
          "Un sistema operativo para celulares."
        ],
        correctIndex: 1,
        explanation: "¡Correcto! Godot es un motor gráfico 100% gratuito y de código abierto desarrollado bajo la licencia MIT."
      },
      {
        question: "2. ¿Por qué utilizamos fotografías 360° en lugar de modelado 3D?",
        options: [
          "Porque el modelado 3D consume mucho más espacio.",
          "Ofrecen realismo fotográfico perfecto con bajísimo costo computacional y sin lag.",
          "Porque Godot no permite importar objetos 3D.",
          "Porque es una exigencia de la alcaldía."
        ],
        correctIndex: 1,
        explanation: "¡Exacto! Una sola esfera texturizada ofrece realismo fotográfico 100% fiel a la ciénaga y reduce el mareo en VR."
      },
      {
        question: "3. ¿Qué función cumple el estándar OpenXR?",
        options: [
          "Conecta las gafas Meta Quest con Godot de forma universal sin atarse a marcas.",
          "Servir de tienda para vender la aplicación.",
          "Tomar las fotografías físicamente en el campo.",
          "Comprimir las imágenes panorámicas."
        ],
        correctIndex: 0,
        explanation: "¡Excelente! OpenXR es el estándar abierto internacional que comunica el código de Godot con los visores VR."
      }
    ];

    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
  }

  init() {
    this.currentIndex = 0;
    this.score = 0;
    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.questions[this.currentIndex];
    const titleEl = document.getElementById("quiz-title");
    const optionsEl = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");
    const bulletsEl = document.getElementById("quiz-bullets");

    if (!titleEl || !optionsEl) return;

    this.answered = false;
    feedbackEl.className = "quiz-feedback";
    feedbackEl.innerHTML = "";

    // Update bullets
    if (bulletsEl) {
      bulletsEl.innerHTML = this.questions.map((_, idx) => {
        let cls = "quiz-bullet";
        if (idx === this.currentIndex) cls += " active";
        if (idx < this.currentIndex) cls += " completed";
        return `<span class="${cls}"></span>`;
      }).join("");
    }

    titleEl.textContent = q.question;

    optionsEl.innerHTML = q.options.map((opt, idx) => `
      <button class="quiz-option" onclick="window.slidesQuiz.selectAnswer(${idx})">
        <span>${opt}</span>
        <span class="quiz-opt-icon">👉</span>
      </button>
    `).join("");
  }

  selectAnswer(idx) {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentIndex];
    const optionsEl = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");
    const buttons = optionsEl.querySelectorAll(".quiz-option");

    if (idx === q.correctIndex) {
      this.score++;
      buttons[idx].classList.add("correct");
      feedbackEl.className = "quiz-feedback show correct";
      feedbackEl.innerHTML = `<strong>✨ ¡Excelente!</strong> ${q.explanation}`;
    } else {
      buttons[idx].classList.add("incorrect");
      buttons[q.correctIndex].classList.add("correct");
      feedbackEl.className = "quiz-feedback show incorrect";
      feedbackEl.innerHTML = `<strong>❌ No exactamente.</strong> La respuesta correcta era: "${q.options[q.correctIndex]}".`;
    }

    // Auto next or summary button
    setTimeout(() => {
      if (this.currentIndex < this.questions.length - 1) {
        feedbackEl.innerHTML += `
          <div style="margin-top: 12px;">
            <button class="btn-primary" style="padding: 6px 16px; font-size: 0.85rem;" onclick="window.slidesQuiz.nextQuestion()">
              Siguiente Pregunta ➔
            </button>
          </div>
        `;
      } else {
        feedbackEl.innerHTML += `
          <div style="margin-top: 12px; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
            <h4>🏆 Resultado de la Trivia: ${this.score} / ${this.questions.length} respuestas correctas</h4>
            <p style="font-size: 0.85rem; margin-top: 4px;">¡Felicidades por completar la presentación didáctica del Recorrido Inmersivo 360°!</p>
            <button class="btn-primary" style="margin-top: 10px; padding: 6px 16px; font-size: 0.85rem;" onclick="window.slidesQuiz.init()">
              🔄 Reiniciar Trivia
            </button>
          </div>
        `;
      }
    }, 400);
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    }
  }
}

window.SlidesQuiz = SlidesQuiz;
