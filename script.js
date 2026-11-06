// =========================================================
// 1. MOBILE MENU (hamburger button)
// =========================================================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Open / close the menu when hamburger is clicked
menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

// Close the menu after clicking any link (on mobile)
const allLinks = document.querySelectorAll(".nav-link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
  });
});

// =========================================================
// 2. TYPING EFFECT in the hero section
// =========================================================
const words = ["CSE (AI) Student", "Future AI Engineer", "Web Developer", "Problem Solver"];
const typingText = document.getElementById("typingText");

let wordIndex = 0;   // which word we are typing
let charIndex = 0;   // how many letters are shown
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--; // remove one letter
  } else {
    charIndex++; // add one letter
  }

  typingText.textContent = currentWord.substring(0, charIndex);

  let speed = isDeleting ? 60 : 120;

  // Word fully typed -> wait, then start deleting
  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500;
    isDeleting = true;
  }
  // Word fully deleted -> move to next word
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// =========================================================
// 3. HEADER BACKGROUND, BACK-TO-TOP & ACTIVE LINK ON SCROLL
// =========================================================
const header = document.getElementById("header");
const backToTop = document.getElementById("backToTop");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;

  // Add dark background to header after scrolling 50px
  header.classList.toggle("scrolled", scrollY > 50);

  // Show back-to-top button after scrolling 400px
  backToTop.classList.toggle("show", scrollY > 400);

  // Highlight the menu link of the section we are viewing
  sections.forEach(function (section) {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < bottom) {
      allLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active");
        }
      });
    }
  });
});

// =========================================================
// 4. SCROLL REVEAL ANIMATION + SKILL BARS
// =========================================================
// IntersectionObserver tells us when an element appears on screen
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // If this section has skill bars, fill them
        const bars = entry.target.querySelectorAll(".skill-fill");
        bars.forEach(function (bar) {
          bar.style.width = bar.dataset.level + "%";
        });

        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(function (el) {
  observer.observe(el);
});

// =========================================================
// 5. CONTACT FORM VALIDATION
// =========================================================
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page from reloading

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Simple email pattern: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  // Check each field and add red border if wrong
  [name, email, message].forEach(function (field) {
    field.classList.remove("error");
    if (field.value.trim() === "") {
      field.classList.add("error");
      isValid = false;
    }
  });

  if (email.value.trim() !== "" && !emailPattern.test(email.value)) {
    email.classList.add("error");
    isValid = false;
  }

  if (!isValid) {
    formStatus.textContent = "Please fill all fields correctly.";
    formStatus.className = "form-status fail";
    return;
  }

  // No real server here, so we just show a thank-you message
  formStatus.textContent = "Thanks " + name.value.trim() + "! Your message has been sent.";
  formStatus.className = "form-status success";
  form.reset();
});

// =========================================================
// 6. AUTO YEAR IN FOOTER
// =========================================================
document.getElementById("year").textContent = new Date().getFullYear();
