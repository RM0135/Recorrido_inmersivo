/**
 * Main Web Slides Application Controller
 * Handles slide navigation, UI state, modals, keyboard/touch bindings
 */

class SlidesApp {
  constructor() {
    this.currentIndex = 0;
    this.totalSlides = SLIDES_DATA.length;
    this.deckEl = document.getElementById("slide-deck");
    this.progressBar = document.getElementById("progress-bar");
    this.currentCounter = document.getElementById("current-slide-num");
    this.totalCounter = document.getElementById("total-slide-num");
    this.btnPrev = document.getElementById("btn-prev");
    this.btnNext = document.getElementById("btn-next");

    this.viewer360Instance = null;
    this.quizInstance = null;
    this.touchStartX = 0;

    this.gridModal = document.getElementById("modal-grid");
    this.notesModal = document.getElementById("modal-notes");
  }

  init() {
    this.renderSlides();
    this.updateCounters();
    this.bindEvents();
    this.showSlide(0);

    // Initialize Quiz instance
    if (window.SlidesQuiz) {
      this.quizInstance = new SlidesQuiz();
      window.slidesQuiz = this.quizInstance;
    }
  }

  renderSlides() {
    if (!this.deckEl) return;
    this.totalCounter.textContent = this.totalSlides;

    this.deckEl.innerHTML = SLIDES_DATA.map((slide, idx) => `
      <div class="slide ${idx === 0 ? 'active' : ''}" id="slide-${idx}">
        <div class="slide-header">
          <div class="slide-category">
            <i class="bi bi-bookmark-fill me-1"></i>
            <span>${slide.category}</span>
          </div>
          <h2 class="slide-title">${slide.title}</h2>
          <p class="slide-subtitle">${slide.subtitle}</p>
        </div>
        <div class="slide-body">
          ${slide.bodyHTML}
        </div>
      </div>
    `).join("");
  }

  showSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;

    const currentSlideEl = document.getElementById(`slide-${this.currentIndex}`);
    const nextSlideEl = document.getElementById(`slide-${index}`);

    if (currentSlideEl) currentSlideEl.classList.remove("active", "prev", "next");

    if (nextSlideEl) {
      nextSlideEl.classList.add("active");
    }

    this.currentIndex = index;
    this.updateCounters();
    this.updateProgress();

    this.onSlideChange(index);
  }

  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.showSlide(this.currentIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.showSlide(this.currentIndex - 1);
    }
  }

  updateCounters() {
    if (this.currentCounter) this.currentCounter.textContent = this.currentIndex + 1;
    if (this.btnPrev) this.btnPrev.disabled = this.currentIndex === 0;
    if (this.btnNext) this.btnNext.disabled = this.currentIndex === this.totalSlides - 1;
  }

  updateProgress() {
    if (!this.progressBar) return;
    const pct = ((this.currentIndex + 1) / this.totalSlides) * 100;
    this.progressBar.style.width = `${pct}%`;
  }

  onSlideChange(index) {
    const slide = SLIDES_DATA[index];

    // Slide 8: 360 Viewer
    if (slide.id === 8) {
      setTimeout(() => {
        if (!this.viewer360Instance && window.Viewer360) {
          this.viewer360Instance = new Viewer360("viewer360-canvas", "assets/P001.png");
        }
        if (this.viewer360Instance) {
          this.viewer360Instance.init();
        }
      }, 100);
    }

    // Slide 14: Quiz
    if (slide.id === 14 && this.quizInstance) {
      setTimeout(() => {
        this.quizInstance.init();
      }, 100);
    }

    // Update speaker notes content
    const notesContent = document.getElementById("notes-content");
    if (notesContent) {
      notesContent.innerHTML = `
        <div style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--accent-cyan); margin-bottom: 8px;">
          <i class="bi bi-journal-text me-1"></i> Guía del Orador - Diapositiva ${index + 1}: ${slide.title}
        </div>
        <p style="font-size: 1rem; color: #cbd5e1; line-height: 1.6;">${slide.speakerNotes}</p>
      `;
    }
  }

  toggleGrid() {
    if (!this.gridModal) return;
    const isActive = this.gridModal.classList.contains("active");

    if (!isActive) {
      const gridContainer = document.getElementById("grid-items-container");
      if (gridContainer) {
        gridContainer.innerHTML = SLIDES_DATA.map((slide, idx) => `
          <div class="grid-item ${idx === this.currentIndex ? 'current' : ''}" onclick="window.slidesApp.jumpToSlide(${idx})">
            <span class="grid-item-num">Diapositiva ${idx + 1}</span>
            <span class="grid-item-title">${slide.title}</span>
          </div>
        `).join("");
      }
      this.gridModal.classList.add("active");
    } else {
      this.gridModal.classList.remove("active");
    }
  }

  toggleNotes() {
    if (!this.notesModal) return;
    this.notesModal.classList.toggle("active");
  }

  jumpToSlide(index) {
    this.showSlide(index);
    if (this.gridModal) this.gridModal.classList.remove("active");
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  }

  bindEvents() {
    // Keyboard controls
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          this.nextSlide();
          break;
        case "ArrowLeft":
        case "PageUp":
          this.prevSlide();
          break;
        case "Home":
          this.showSlide(0);
          break;
        case "End":
          this.showSlide(this.totalSlides - 1);
          break;
        case "g":
        case "G":
          this.toggleGrid();
          break;
        case "n":
        case "N":
          this.toggleNotes();
          break;
        case "f":
        case "F":
          this.toggleFullscreen();
          break;
        case "Escape":
          if (this.gridModal) this.gridModal.classList.remove("active");
          if (this.notesModal) this.notesModal.classList.remove("active");
          break;
      }
    });

    // Touch swipe gesture
    window.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    });

    window.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - this.touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) this.nextSlide();
        else this.prevSlide();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.slidesApp = new SlidesApp();
  window.slidesApp.init();
});
