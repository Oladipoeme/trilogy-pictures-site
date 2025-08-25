// assets/js/landing.js

const titleStage  = document.getElementById('titleStage');
const blackout    = document.getElementById('blackout');
const centerStage = document.getElementById('centerStage');
const motifCenter = document.getElementById('motifCenter');

// Timings (match styles.css suggestion)
const INTRO_FADE    = 1400; // title fade-in
const INTRO_HOLD    = 900;  // title on-screen hold
const BLACKOUT_MS   = 900;  // global fade to/from black
const STEP_SHORT    = 500;  // small step between phases

window.addEventListener('load', () => {
  // Global page fade-in (800ms via CSS)
  document.body.classList.add('loaded');

  // 1) Fade in title
  if (titleStage) titleStage.classList.add('loaded');

  // 2) Hold, then fade out title → fade to black
  setTimeout(() => {
    titleStage?.classList.add('hide');

    setTimeout(() => {
      blackout?.classList.add('on'); // 0.9s fade to black

      // 3) Bring motif in under blackout
      setTimeout(() => {
        centerStage?.classList.add('show');
        motifCenter?.classList.add('show');

        // 4) Start lifting blackout after a short beat
        setTimeout(() => {
          blackout?.classList.remove('on'); // 0.9s fade back in
        }, Math.max(400, BLACKOUT_MS * 0.5));

      }, STEP_SHORT);
    }, STEP_SHORT);

  }, INTRO_FADE + INTRO_HOLD);
});

// ---- Fade-to-black navigation for bar links (landing) ----
function navigateWithFade(url){
  if (!url) return;
  blackout?.classList.add('on');           // 0.9s CSS fade
  setTimeout(() => { window.location.href = url; }, 950); // ~match CSS
}

document.querySelectorAll('#menuOverlay a.bar-hit').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    navigateWithFade(a.getAttribute('href'));
  });
});
