const PASSWORD = "1910";

const slides = [...document.querySelectorAll(".slide")];
let current = "password";

function showSlide(id) {
  const target = document.getElementById(id);
  if (!target) return;
  slides.forEach(s => s.classList.remove("active"));
  target.classList.add("active");
  current = id;

  // Reload the YouTube frame when leaving the song page so playback stops.
  if (id !== "video") {
    const frame = document.getElementById("youtubeFrame");
    if (frame) {
      const src = frame.getAttribute("src");
      frame.setAttribute("src", src);
    }
  }
}

function checkPassword() {
  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");
  const card = document.querySelector(".password-card");

  if (input.value === PASSWORD) {
    error.textContent = "";
    input.value = "";
    showSlide("welcome");
  } else {
    error.textContent = "Wrong password ♡";
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
    input.select();
  }
}

document.getElementById("passwordButton").addEventListener("click", checkPassword);
document.getElementById("passwordInput").addEventListener("keydown", e => {
  if (e.key === "Enter") checkPassword();
});

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => showSlide(button.dataset.next));
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && current !== "password") showSlide("bouquets");
});
