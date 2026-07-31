const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll(".main-nav a");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

const rotatingText = document.querySelector("[data-rotating-text]");
const rotatingPhrases = [
  "znaleźć przyczynę niskiej produkcji",
  "zwiększyć autokonsumpcję",
  "dobrać magazyn energii",
  "połączyć PV ze Smart Home",
  "sprawdzić instalację pomiarami",
];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (rotatingText && !reducedMotion.matches) {
  let phraseIndex = 0;

  window.setInterval(() => {
    rotatingText.classList.add("is-changing");

    window.setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % rotatingPhrases.length;
      rotatingText.textContent = rotatingPhrases[phraseIndex];
      rotatingText.classList.remove("is-changing");
    }, 260);
  }, 3800);
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
