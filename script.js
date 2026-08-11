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

document.querySelectorAll(".pv-service-grid").forEach((grid) => {
  const cards = [...grid.querySelectorAll(".pv-service-card")];
  const defaultCard = grid.querySelector(".pv-service-primary") || cards[0];

  const activateCard = (activeCard) => {
    cards.forEach((card) => card.classList.toggle("is-active", card === activeCard));
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => activateCard(card));
    card.addEventListener("focus", () => activateCard(card));
  });

  grid.addEventListener("mouseleave", () => activateCard(defaultCard));
  grid.addEventListener("focusout", (event) => {
    if (!grid.contains(event.relatedTarget)) activateCard(defaultCard);
  });
});

const analyticsConsentKey = "smartpomiary-analytics-consent";
const consentBanner = document.querySelector("[data-consent-banner]");
const acceptAnalyticsButton = document.querySelector("[data-consent-accept]");
const declineAnalyticsButton = document.querySelector("[data-consent-decline]");
const consentSettingsButton = document.querySelector("[data-consent-settings]");
const privacyDialog = document.querySelector("[data-privacy-dialog]");
const privacyOpenButtons = document.querySelectorAll("[data-open-privacy]");
const privacyCloseButton = document.querySelector("[data-close-privacy]");

function readAnalyticsConsent() {
  try {
    return window.localStorage.getItem(analyticsConsentKey);
  } catch (error) {
    return null;
  }
}

function saveAnalyticsConsent(value) {
  try {
    window.localStorage.setItem(analyticsConsentKey, value);
  } catch (error) {
    // Gdy pamięć przeglądarki jest niedostępna, decyzja obowiązuje do zamknięcia strony.
  }
}

function applyAnalyticsConsent(value) {
  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: value === "granted" ? "granted" : "denied",
  });
}

function chooseAnalyticsConsent(value) {
  saveAnalyticsConsent(value);
  applyAnalyticsConsent(value);
  consentBanner?.setAttribute("hidden", "");
}

if (!readAnalyticsConsent()) {
  consentBanner?.removeAttribute("hidden");
}

acceptAnalyticsButton?.addEventListener("click", () => chooseAnalyticsConsent("granted"));
declineAnalyticsButton?.addEventListener("click", () => chooseAnalyticsConsent("denied"));

consentSettingsButton?.addEventListener("click", () => {
  consentBanner?.removeAttribute("hidden");
  acceptAnalyticsButton?.focus();
});

privacyOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof privacyDialog?.showModal === "function") {
      privacyDialog.showModal();
    }
  });
});

privacyCloseButton?.addEventListener("click", () => privacyDialog?.close());

privacyDialog?.addEventListener("click", (event) => {
  if (event.target === privacyDialog) privacyDialog.close();
});

const contactForm = document.querySelector("[data-contact-form]");
const contactSubmitButton = contactForm?.querySelector("[data-form-submit]");
const contactFormStatus = contactForm?.querySelector("[data-form-status]");

function setContactFormStatus(message, type = "") {
  if (!contactFormStatus) return;
  contactFormStatus.textContent = message;
  contactFormStatus.classList.toggle("is-success", type === "success");
  contactFormStatus.classList.toggle("is-error", type === "error");
}

contactForm?.addEventListener("submit", (event) => {
  const formData = new FormData(contactForm);
  if (String(formData.get("_honey") || "").trim()) {
    event.preventDefault();
    contactForm.reset();
    setContactFormStatus("Dziękuję. Wiadomość została przyjęta.", "success");
    return;
  }

  if (contactSubmitButton) {
    contactSubmitButton.disabled = true;
    contactSubmitButton.textContent = "Wysyłanie…";
  }
  setContactFormStatus("Bezpiecznie przekazuję wiadomość…");
});

const contactUrlParams = new URLSearchParams(window.location.search);
if (contactForm && contactUrlParams.get("wyslano") === "1") {
  contactForm.reset();
  setContactFormStatus("Wiadomość wysłana. Odpowiem na podany adres e-mail.", "success");

  const cleanContactUrl = `${window.location.pathname}${window.location.hash || "#formularz"}`;
  window.history.replaceState({}, "", cleanContactUrl);
  if (contactSubmitButton) {
    contactSubmitButton.disabled = false;
  }
}
