const PASSWORD = "1910";

const slides = Array.from(document.querySelectorAll(".slide"));
let currentSlide = "password";

/* =========================
   SHOW A SLIDE
========================= */

function showSlide(id) {
  const targetSlide = document.getElementById(id);

  if (!targetSlide) {
    console.error("Slide not found:", id);
    return;
  }

  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  // Show selected slide
  targetSlide.classList.add("active");
  currentSlide = id;

  // Stop/reset YouTube when leaving the video page
  if (id !== "video") {
    const youtubeFrame = document.getElementById("youtubeFrame");

    if (youtubeFrame) {
      const originalSrc = youtubeFrame.getAttribute("src");

      if (originalSrc) {
        youtubeFrame.setAttribute("src", "");
        setTimeout(() => {
          youtubeFrame.setAttribute("src", originalSrc);
        }, 50);
      }
    }
  }

  // Put the page back at the top
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


/* =========================
   PASSWORD
========================= */

function checkPassword() {
  const passwordInput = document.getElementById("passwordInput");
  const passwordError = document.getElementById("passwordError");
  const passwordCard = document.querySelector(".password-card");

  if (!passwordInput || !passwordError || !passwordCard) {
    return;
  }

  if (passwordInput.value === PASSWORD) {

    // Correct password
    passwordError.textContent = "";
    passwordInput.value = "";

    showSlide("welcome");

  } else {

    // Wrong password
    passwordError.textContent = "Wrong password ♡";

    // Restart shake animation
    passwordCard.classList.remove("shake");

    void passwordCard.offsetWidth;

    passwordCard.classList.add("shake");

    passwordInput.select();
  }
}


/* =========================
   PASSWORD BUTTON
========================= */

const passwordButton = document.getElementById("passwordButton");

if (passwordButton) {
  passwordButton.addEventListener("click", checkPassword);
}


/* =========================
   ENTER KEY FOR PASSWORD
========================= */

const passwordInput = document.getElementById("passwordInput");

if (passwordInput) {
  passwordInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      checkPassword();
    }

  });
}


/* =========================
   ALL NEXT / BACK BUTTONS
========================= */

document.querySelectorAll("[data-next]").forEach(button => {

  button.addEventListener("click", function() {

    const nextSlide = this.getAttribute("data-next");

    if (nextSlide) {
      showSlide(nextSlide);
    }

  });

});


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", function(event) {

  if (
    event.key === "Escape" &&
    currentSlide !== "password"
  ) {
    showSlide("bouquets");
  }

});


/* =========================
   START WEBSITE
========================= */

showSlide("password");
