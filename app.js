/*
Author: Chad Smith
Date: 2026-08-30
File: app.js
 */

/* =============================================================================
    1. DOM ELEMENT ARCHITECTURE SELECTION
    ========================================================================= */
const form = document.getElementById("assessmentForm");
const steps = Array.form(document.querySelectorAll(".form-step"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const progressWrapper = document.querySelectorAll("progress-wrapper");

/* Global application state tracking */
let currentStep = 1;
const totalSteps = steps.length;

/* =============================================================================
    2. INTERACTIVE NAVIGATION CONTROLLER
    ========================================================================= */
function updateStepVisibility() {
  // Loop through all step components to adjust active rendering
  steps.forEach((step, index) => {
    const stepNum = index + 1;

    if (stepNum === currentStep) {
      step.classList.remove("hidden-step");
      step.classList.add("active-step");
    } else {
      step.classList.remove("active-step");
      step.classList.add("hidden-step");
    }
  });

  // Orchestrate conditional button visibility parameters
  if (currentStep === 1) {
    prevBtn.classList.add("hidden-element");
    prevBtn.disabled = true;
  } else if (currentStep === totalSteps) {
    // Hide standard controls once final results step is reached
    prevBtn.classList.add("hidden-element");
    nextBtn.classList.add("hidden-element");
  } else {
    prevBtn.classList.remove("hidden-element");
    prevBtn.disabled = false;
    nextBtn.textContent = "Continue";
  }

  // Refresh dynamic progression calculations
  updateProgressBar();
}

/* =============================================================================
    3. PROGRESSIVE TRACKING ENGINE
    ========================================================================= */
function updateProgressbar() {
  const percentage = (currentStep / totalSteps) * 100;

  // Programatically inject property adjustments into CSS transitions
  progressBar.style.setProperty("--progress-width", `${percentage}%`);

  // Inject dynamic width directly for standard browser layout fallback
  progressBar.style.width = `${percentage}%`;

  // Update text trackers and screen-reader accessibility metrics
  progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
  progressWrapper.setAttribute("aria-valuenow", currentStep);
}

/* =============================================================================
    4. EVENT BINDING LIFECYCLES
    ========================================================================= */
nextBtn.addEventListener("click", () => {
  // Basic structural safety check before step advancement
  if (currentStep < totalSteps) {
    currentStep++;
    updateStepVisibility();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    updateStepVisibility();
  }
});

// Run initial execution block on page installation
updateStepVisibility();
