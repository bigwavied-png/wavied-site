// =====================
// SIDEBAR TOGGLE TABS
// =====================
function openTab(tabId) {
  const target = document.getElementById(tabId);
  if (!target) return; // ⛔️ STOP if tab does not exist

  const tabs = document.querySelectorAll('.tab-panel');
  const buttons = document.querySelectorAll('.sidebar button');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  target.classList.add('active');

  const activeButton = [...buttons].find(
    btn => btn.getAttribute('onclick')?.includes(tabId)
  );
  if (activeButton) activeButton.classList.add('active');
}

// =====================
// BIO FULLSCREEN TOGGLE
// =====================
function toggleBioFullscreen(img) {
  const wrapper = img.parentElement;
  wrapper.classList.toggle("bio-fullscreen");
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
    const limit = parseInt(audio.dataset.preview, 10);

    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= limit) {
        audio.pause();
        audio.currentTime = 0;
        alert("Preview ended — purchase to hear full track.");
      }
    });
  });
}

// =====================
// INIT ON LOAD (SAFE)
// =====================
window.addEventListener("DOMContentLoaded", () => {
  setTheme("gold");

  // ONLY open tabs if sidebar exists (homepage only)
  if (document.querySelector(".sidebar")) {
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
