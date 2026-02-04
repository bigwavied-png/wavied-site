let time = 5;
const countdown = document.getElementById("countdown");
const intro = document.getElementById("intro");
const vault = document.getElementById("vault");

const timer = setInterval(() => {
  time--;
  countdown.textContent = `00:00:0${time}`;

  if (time <= 0) {
    clearInterval(timer);

    intro.style.opacity = "0";
    intro.style.transition = "opacity 1.5s ease";

    setTimeout(() => {
      intro.style.display = "none";
      vault.classList.remove("hidden");
    }, 1500);
  }
}, 1000);
