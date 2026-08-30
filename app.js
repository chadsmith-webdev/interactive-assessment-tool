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
    4. SCORE CALCULATION & EVALUATION ENGINE
    ========================================================================= */
function calculateResults() {
  const formData = new FormData(form);
  let totalScore = 0;
  let questionsAnswered = 0;

  // Iterate through form key/value pairs to accumulate scores
  for (let [question, value] of formData.entries()) {
    totalScore += parseInt(value, 10);
    questionsAnswered++;
  }

  // Maximum possible score (3 points per question * 2 graded questions)
  const maxScore = questionsAnswered * 3;

  // Safety check to prevent dividing by zero if data is missing
  const scorePercentage =
    maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Render results view components
  renderEvaluation(scorePercentage);
}

function renderEvaluation(score) {
  const resultsDisplay = document.getElementById("resultsDisplay");
  const scoreValue = document.getElementById("scoreValue");
  const feedbackText = document.getElementById("feedbackText");

  // Update visual percentage integer counter
  scoreValue.textContent = score;

  // Dynamically inject conditional text strings based on mathematical tier metrics
  if (score >= 85) {
    feedbackText.textContent =
      "Excellent optimization! Your workflows are streamlined, automated, and ready for high-velocity operations. Focus on minor scaling refinements.";
  } else if (score >= 50) {
    feedbackText.textContent =
      "Good foundation, but clear bottleneck vulnerabilities exist. Your processes are partially automated, but manually jumping apps is limiting your production scaling.";
  } else {
    feedbackText.textContent =
      "High operational risk detected. Heavy reliance on manual spreadsheets, decentralized emails, or disjointed tracking creates critical business blind spots. Automation upgrades recommended.";
  }

  // Reveal result layout metrics container card
  resultsDisplay.classList.remove("hidden-element");
}

/* =============================================================================
    5. REVISED EVENT BINDING LIFECYCLES
    ========================================================================= */
nextBtn.addEventListener("click", () => {
  // Determine if the current step requires active score processing
  // Since Step 2 is the final question view before Step 3 (Results);
  if (currentStep === 2) {
    calculateResults();
  }

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
