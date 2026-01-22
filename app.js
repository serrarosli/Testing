const loginTrigger = document.getElementById("loginTrigger");

if (loginTrigger) {
  loginTrigger.addEventListener("click", () => {
    loginTrigger.textContent = "Login";
  });
}
