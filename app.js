const loginTrigger = document.getElementById("loginTrigger");
const authModal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");
const biometricStep = document.getElementById("biometricStep");
const passwordStep = document.getElementById("passwordStep");
const homepage = document.getElementById("homepage");
const prelogin = document.getElementById("prelogin");
const logout = document.getElementById("logout");
const toggleButtons = Array.from(document.querySelectorAll(".toggle"));

let biometricTimeout;
let biometricOutcome = "success";

const openModal = () => {
  authModal.classList.remove("hidden");
  authModal.setAttribute("aria-hidden", "false");
  startBiometricPrompt();
};

const closeAuth = () => {
  authModal.classList.add("hidden");
  authModal.setAttribute("aria-hidden", "true");
  clearTimeout(biometricTimeout);
};

const navigateHome = () => {
  closeAuth();
  prelogin.classList.add("hidden");
  homepage.classList.remove("hidden");
};

const startBiometricPrompt = () => {
  biometricStep.classList.remove("hidden");
  passwordStep.classList.add("hidden");
  clearTimeout(biometricTimeout);
  biometricTimeout = setTimeout(() => {
    if (biometricOutcome === "success") {
      navigateHome();
      return;
    }
    biometricStep.classList.add("hidden");
    passwordStep.classList.remove("hidden");
  }, 1200);
};

loginTrigger.addEventListener("click", openModal);
closeModal.addEventListener("click", closeAuth);

passwordStep.addEventListener("submit", (event) => {
  event.preventDefault();
  navigateHome();
});

logout.addEventListener("click", () => {
  homepage.classList.add("hidden");
  prelogin.classList.remove("hidden");
});

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    biometricOutcome = button.dataset.outcome;
    toggleButtons.forEach((toggle) => toggle.classList.remove("active"));
    button.classList.add("active");
    if (!authModal.classList.contains("hidden")) {
      startBiometricPrompt();
    }
  });
});
