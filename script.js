// =====================
// GLOBAL SAFETY GUARD
// Disable site JS on Vault pages
// =====================
if (document.body.classList.contains("vault-bg")) {
  console.log("Vault page detected — main script disabled");
} else {

/* =====================
   SIDEBAR TOGGLE TABS
===================== */
function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-panel');
  const buttons = document.querySelectorAll('.sidebar button');
  const target = document.getElementById(tabId);

  if (!target) return;

  // If clicked tab is already open → CLOSE it
  if (target.classList.contains('active')) {
    target.classList.remove('active');
    buttons.forEach(btn => btn.classList.remove('active'));
    return;
  }

  // Otherwise → close all tabs
  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  // Open selected tab
  target.classList.add('active');

  // Highlight active button
  const activeButton = [...buttons].find(
    btn => btn.getAttribute('onclick')?.includes(tabId)
  );
  if (activeButton) activeButton.classList.add('active');
}

// Default closed (no auto-open)
window.onload = () => {};

/* =====================
   BIO FULLSCREEN TOGGLE
===================== */
function toggleBioFullscreen(img) {
  const wrapper = img.parentElement;
  if (!wrapper) return;

  if (wrapper.classList.contains("bio-fullscreen")) {
    wrapper.classList.remove("bio-fullscreen");
  } else {
    wrapper.classList.add("bio-fullscreen");
  }
}

// =====================
// THEME SWITCHER
// =====================
function setTheme(theme) {
  document.body.classList.remove('ice', 'emerald', 'gold');
  document.body.classList.add(theme);
}

// =====================
// AUDIO PREVIEW LOCK
// =====================
function initAudioPreviews() {
  document.querySelectorAll("audio[data-preview]").forEach(audio => {
    if (audio.dataset.locked === "true") return;

    audio.dataset.locked = "true";
    const limit = parseInt(audio.dataset.preview, 10);

    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= limit) {
        audio.pause();
        audio.currentTime = 0;
        alert("Preview ended. Purchase to unlock full track.");
      }
    });
  });
}

// =====================
// INIT ON LOAD
// =====================
window.addEventListener("DOMContentLoaded", () => {
  setTheme("gold");

  if (document.getElementById("music")) {
    openTab("music");
  }

  initAudioPreviews();
});

// =====================
// FOOTER HIDE / SHOW
// =====================
let lastScrollY = window.scrollY;
const footer = document.querySelector('.social-footer');

window.addEventListener('scroll', () => {
  if (!footer) return;

  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    footer.classList.add('hidden');
  } else {
    footer.classList.remove('hidden');
  }

  lastScrollY = window.scrollY;
});

} // 🔒 END VAULT SAFETY GUARD

