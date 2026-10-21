// Configuration
const CONFIG = {
  engagementDate: "2026-11-13T12:00:00+05:30",
  venue: "Vettukad Auditorium",
  mapUrl: "https://share.google/mMGFLypsmjwbw9kCy"
};

const THEME_PALETTES = {
  'rose-gold': {
    starColors: ['#e0829d', '#ffccd5', '#ffffff'],
    roseColors: [
      { fill: '#e62e5c', highlight: '#ff7597' },
      { fill: '#d81b60', highlight: '#ff669a' },
      { fill: '#c2185b', highlight: '#f48fb1' }
    ]
  },
  'midnight': {
    starColors: ['#e6c875', '#fff3c4', '#60a5fa'],
    roseColors: [
      { fill: '#d4af37', highlight: '#fff3c4' },
      { fill: '#b8860b', highlight: '#f5e3ad' },
      { fill: '#e6c875', highlight: '#ffffff' }
    ]
  },
  'emerald': {
    starColors: ['#e5c170', '#86efac', '#f7e4b2'],
    roseColors: [
      { fill: '#10b981', highlight: '#f7e4b2' },
      { fill: '#059669', highlight: '#e5c170' },
      { fill: '#d97706', highlight: '#fef3c7' }
    ]
  },
  'burgundy': {
    starColors: ['#f2a6b8', '#fcdbe3', '#ffd700'],
    roseColors: [
      { fill: '#9f1239', highlight: '#f2a6b8' },
      { fill: '#881337', highlight: '#fcdbe3' },
      { fill: '#be123c', highlight: '#ffe4e6' }
    ]
  }
};

let currentStarColors = THEME_PALETTES['rose-gold'].starColors;

/* -------------------------------------------------------------
   BACKGROUND CANVAS: FLOATING GOLD PARTICLES & STARLIGHT
   ------------------------------------------------------------- */
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
let particles = [];

function resizeBgCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
resizeBgCanvas();
window.addEventListener('resize', resizeBgCanvas);

class StarParticle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.size = Math.random() * 1.8 + 0.5;
    this.alpha = Math.random() * 0.7 + 0.1;
    this.speedY = Math.random() * -0.4 - 0.1;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
  }
  update() {
    this.y += this.speedY;
    this.alpha += Math.sin(Date.now() * this.twinkleSpeed) * 0.01;
    if (this.y < 0) this.reset();
  }
  draw() {
    bgCtx.save();
    bgCtx.globalAlpha = Math.max(0.1, Math.min(0.9, this.alpha));
    bgCtx.fillStyle = currentStarColors[Math.floor(Math.random() * currentStarColors.length)];
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    bgCtx.fill();
    bgCtx.restore();
  }
}

for (let i = 0; i < 70; i++) particles.push(new StarParticle());

function animateBg() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateBg);
}
animateBg();

/* -------------------------------------------------------------
   REALISTIC LUXURY ROSE PETAL FALLING ANIMATION SYSTEM
   ------------------------------------------------------------- */
const petalCanvas = document.getElementById('petalCanvas');
const pCtx = petalCanvas.getContext('2d');
let petals = [];

function resizePetalCanvas() {
  petalCanvas.width = window.innerWidth;
  petalCanvas.height = window.innerHeight;
}
resizePetalCanvas();
window.addEventListener('resize', resizePetalCanvas);

const ROSE_COLORS = [
  { fill: '#e62e5c', highlight: '#ff7597' }, // Classic Ruby Red Rose
  { fill: '#d81b60', highlight: '#ff669a' }, // Deep Velvet Rose
  { fill: '#c2185b', highlight: '#f48fb1' }, // Rich Crimson Rose
  { fill: '#e91e63', highlight: '#ff80ab' }, // Bright Romantic Rose
  { fill: '#f06292', highlight: '#ffb2c9' }  // Soft Blush Pink Rose
];

class FlowerPetal {
  constructor() {
    this.reset(true);
  }
  reset(initial = false) {
    this.x = Math.random() * petalCanvas.width;
    this.y = initial ? Math.random() * petalCanvas.height : -40;
    this.size = Math.random() * 12 + 10;
    this.speedY = Math.random() * 1.3 + 0.7;
    this.speedX = Math.random() * 0.8 - 0.4;
    this.swaySpeed = Math.random() * 0.035 + 0.012;
    this.swayAngle = Math.random() * Math.PI * 2;
    this.flipSpeed = Math.random() * 0.04 + 0.015;
    this.flipAngle = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.colorScheme = ROSE_COLORS[Math.floor(Math.random() * ROSE_COLORS.length)];
    this.opacity = Math.random() * 0.55 + 0.45;
  }
  update() {
    this.swayAngle += this.swaySpeed;
    this.flipAngle += this.flipSpeed;
    this.x += Math.sin(this.swayAngle) * 1.1 + this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;

    if (this.y > petalCanvas.height + 50) {
      this.reset();
    }
  }
  draw() {
    pCtx.save();
    pCtx.translate(this.x, this.y);
    pCtx.rotate(this.rotation);
    const flipScale = Math.sin(this.flipAngle);
    pCtx.scale(1, flipScale);

    pCtx.globalAlpha = this.opacity;

    // Rose Petal Gradient
    const grad = pCtx.createRadialGradient(0, 0, 2, 0, 0, this.size);
    grad.addColorStop(0, this.colorScheme.highlight);
    grad.addColorStop(0.7, this.colorScheme.fill);
    grad.addColorStop(1, 'rgba(120, 10, 40, 0.9)');

    pCtx.fillStyle = grad;
    pCtx.beginPath();
    pCtx.moveTo(0, -this.size * 0.8);
    pCtx.bezierCurveTo(this.size * 0.8, -this.size * 0.7, this.size * 0.9, this.size * 0.5, 0, this.size);
    pCtx.bezierCurveTo(-this.size * 0.9, this.size * 0.5, -this.size * 0.8, -this.size * 0.7, 0, -this.size * 0.8);
    pCtx.fill();

    // Delicate Rose Petal Vein Accent
    pCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    pCtx.lineWidth = 0.8;
    pCtx.beginPath();
    pCtx.moveTo(0, -this.size * 0.5);
    pCtx.quadraticCurveTo(0, 0, 0, this.size * 0.6);
    pCtx.stroke();

    pCtx.restore();
  }
}

for (let i = 0; i < 55; i++) petals.push(new FlowerPetal());

function animatePetals() {
  pCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
  petals.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animatePetals);
}
animatePetals();

/* -------------------------------------------------------------
   DYNAMIC STYLE THEME SWITCHER & CANVAS PALETTE SYSTEM
   ------------------------------------------------------------- */
const themeBtns = document.querySelectorAll('.theme-btn');
themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedTheme = btn.getAttribute('data-theme-val');
    document.body.setAttribute('data-theme', selectedTheme);
    themeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Dynamically transform canvas particle palettes
    const pal = THEME_PALETTES[selectedTheme] || THEME_PALETTES['rose-gold'];
    currentStarColors = pal.starColors;
    petals.forEach(p => {
      p.colorScheme = pal.roseColors[Math.floor(Math.random() * pal.roseColors.length)];
    });
  });
});

/* -------------------------------------------------------------
   CONTINUOUS MUSIC PLAYBACK & 3D ENVELOPE UNWRAPPING SYSTEM
   ------------------------------------------------------------- */
const openingModal = document.getElementById('openingModal');
const openInviteBtn = document.getElementById('openInviteBtn');
const envContainer = document.getElementById('envContainer');
const letterCard = document.getElementById('letterCard');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

bgMusic.loop = true;
bgMusic.volume = 0.75;

bgMusic.addEventListener('ended', () => {
  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => {});
});

async function startContinuousMusic() {
  try {
    await bgMusic.play();
    musicBtn.classList.add('playing');
  } catch (err) {
    console.log("Audio waiting for user interaction:", err);
  }
}

let isUnwrapping = false;
let unwrapTimeout = null;
let countdownInterval = null;

function completeOpening() {
  if (!openingModal || openingModal.classList.contains('opened')) return;
  if (unwrapTimeout) clearTimeout(unwrapTimeout);
  if (countdownInterval) clearInterval(countdownInterval);
  openingModal.classList.add('opened');
  document.body.classList.remove('locked');
}

async function triggerUnwrapSequence(event) {
  if (openingModal && openingModal.classList.contains('opened')) return;

  if (!isUnwrapping) {
    isUnwrapping = true;

    // Calculate center of wax seal coin button or event click point for ribbon cutting popper burst
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight * 0.48;
    if (openInviteBtn) {
      const rect = openInviteBtn.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        cx = rect.left + rect.width / 2;
        cy = rect.top + rect.height / 2;
      }
    }
    if (event && event.clientX && event.clientY) {
      cx = event.clientX;
      cy = event.clientY;
    }

    // Trigger Ribbon Cutting Popper Confetti Burst
    if (typeof triggerMultiStagePop === 'function') {
      triggerMultiStagePop(cx, cy);
    }

    // Add clicked state to wax seal wrapper
    if (openInviteBtn) openInviteBtn.classList.add('clicked');

    // Trigger 3D Envelope Flap Open, Ribbon Split & Invitation Card Slide Out
    if (envContainer) envContainer.classList.add('unwrapping');

    // Start background music playback
    await startContinuousMusic();

    // 5-Second Countdown Timer UI
    let secLeft = 5;
    const cdSecEl = document.getElementById('countdownSec');
    if (cdSecEl) cdSecEl.textContent = secLeft;

    countdownInterval = setInterval(() => {
      secLeft--;
      if (cdSecEl && secLeft >= 0) cdSecEl.textContent = secLeft;
      if (secLeft <= 0) clearInterval(countdownInterval);
    }, 1000);

    // Smoothly fade out modal after 5 full seconds (5000ms)
    unwrapTimeout = setTimeout(() => {
      completeOpening();
    }, 5000);
  } else {
    // If clicked AGAIN while popped out during the 5s window, open immediately!
    completeOpening();
  }
}

// Bind click events on Wax Seal, Letter Card, and Envelope Container
if (openInviteBtn) openInviteBtn.addEventListener('click', (e) => { e.stopPropagation(); triggerUnwrapSequence(e); });
if (letterCard) letterCard.addEventListener('click', (e) => { e.stopPropagation(); triggerUnwrapSequence(e); });
if (envContainer) envContainer.addEventListener('click', (e) => { e.stopPropagation(); triggerUnwrapSequence(e); });

if (musicBtn) {
  musicBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const musicIcon = document.getElementById('musicIcon');
    if (bgMusic.paused || bgMusic.muted) {
      bgMusic.muted = false;
      await startContinuousMusic();
      musicBtn.classList.add('playing');
      if (musicIcon) musicIcon.textContent = '🎵';
    } else {
      bgMusic.muted = true;
      bgMusic.pause();
      musicBtn.classList.remove('playing');
      if (musicIcon) musicIcon.textContent = '🔇';
    }
  });
}

function autoResumeAudio() {
  if (openingModal.classList.contains('opened') && bgMusic.paused) {
    bgMusic.play().then(() => {
      musicBtn.classList.add('playing');
    }).catch(() => {});
  }
}
window.addEventListener('touchstart', autoResumeAudio, { passive: true });
window.addEventListener('click', autoResumeAudio, { passive: true });

/* -------------------------------------------------------------
   LIVE COUNTDOWN TIMER
   ------------------------------------------------------------- */
const targetTime = new Date(CONFIG.engagementDate).getTime();
function updateCountdown() {
  const diff = Math.max(0, targetTime - Date.now());
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById('cdDays').textContent = String(d).padStart(2, '0');
  document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
  document.getElementById('cdMins').textContent = String(m).padStart(2, '0');
  document.getElementById('cdSecs').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* -------------------------------------------------------------
   SCROLL REVEAL OBSERVER & BOTTOM NAV HIGHLIGHTING
   ------------------------------------------------------------- */
if (typeof IntersectionObserver !== 'undefined') {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

const navItems = document.querySelectorAll('.bottom-nav-item');
const navSections = document.querySelectorAll('section[id], header[id]');

function highlightActiveNav() {
  let currentSectionId = 'hero';
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;

  navSections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
    currentSectionId = 'closingSection';
  }

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSectionId}`) {
      item.classList.add('active');
    }
  });
}

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('href').replace('#', '');
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

window.addEventListener('scroll', highlightActiveNav, { passive: true });
highlightActiveNav();

/* -------------------------------------------------------------
   SCRATCH-TO-REVEAL CARD
   ------------------------------------------------------------- */
const scratchWrapper = document.getElementById('scratchWrapper');
const scratchCanvas = document.getElementById('scratchCanvas');
const sCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });
let scratchedPixels = 0, isScratching = false, isRevealed = false;

function initScratch() {
  const rect = scratchWrapper.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  scratchCanvas.width = rect.width * dpr;
  scratchCanvas.height = rect.height * dpr;
  if (sCtx.setTransform) sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const grad = sCtx.createLinearGradient(0, 0, rect.width, rect.height);
  grad.addColorStop(0, '#e57d9b');
  grad.addColorStop(0.35, '#ffc2d1');
  grad.addColorStop(0.7, '#c84b72');
  grad.addColorStop(1, '#a63255');

  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, rect.width, rect.height);

  sCtx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  for (let x = -rect.height; x < rect.width + rect.height; x += 18) {
    sCtx.beginPath();
    sCtx.moveTo(x, 0);
    sCtx.lineTo(x + 10, 0);
    sCtx.lineTo(x + 10 + rect.height, rect.height);
    sCtx.lineTo(x + rect.height, rect.height);
    sCtx.fill();
  }
}

function doScratch(x, y) {
  const rect = scratchWrapper.getBoundingClientRect();
  sCtx.globalCompositeOperation = 'destination-out';
  sCtx.beginPath();
  sCtx.arc(x - rect.left, y - rect.top, 32, 0, Math.PI * 2);
  sCtx.fill();

  triggerScratchSpark(x, y);

  scratchedPixels++;
  if (scratchedPixels > 25 && !isRevealed) {
    isRevealed = true;
    scratchCanvas.style.opacity = '0';
    document.getElementById('scratchInstruction').style.opacity = '0';
    
    scratchWrapper.classList.add('pop-bounce');

    const cardRect = scratchWrapper.getBoundingClientRect();
    const cx = cardRect.left + cardRect.width / 2;
    const cy = cardRect.top + cardRect.height / 2;

    triggerMultiStagePop(cx, cy);
  }
}

scratchCanvas.addEventListener('pointerdown', (e) => { isScratching = true; doScratch(e.clientX, e.clientY); });
scratchCanvas.addEventListener('pointermove', (e) => { if (isScratching) doScratch(e.clientX, e.clientY); });
window.addEventListener('pointerup', () => isScratching = false);
scratchCanvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
scratchCanvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (e.touches[0]) doScratch(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: false });

initScratch();
window.addEventListener('resize', initScratch);

/* -------------------------------------------------------------
   ENGRAVED CLASSIC RINGS & SCRATCH REVEAL POP CRACKLE CELEBRATION
   ------------------------------------------------------------- */
const ringLeft = document.getElementById('ringLeft');
const ringRight = document.getElementById('ringRight');
const lockedBadge = document.getElementById('lockedBadge');

const colCanvas = document.getElementById('collisionCanvas');
const colCtx = colCanvas.getContext('2d');
let colParticles = [];

function resizeColCanvas() {
  colCanvas.width = window.innerWidth;
  colCanvas.height = window.innerHeight;
}
resizeColCanvas();
window.addEventListener('resize', resizeColCanvas);

// High-Energy "Pop Cracking" Ribbon Cutting & Falling Pop Paper Celebration
function triggerPopCrackleBurst(cx, cy) {
  const popPaperColors = ['#f48fb1', '#ffd700', '#ffffff', '#ff4081', '#60a5fa', '#a7f3d0', '#f8b4c4', '#ffe082', '#d96b8d'];

  // Popping Shockwave Ring
  colParticles.push({
    type: 'shockwave',
    x: cx,
    y: cy,
    radius: 10,
    maxRadius: 220,
    alpha: 0.95,
    color: '#ffd700',
    lineWidth: 6
  });

  // 1. Confetti & Falling Pop Papers Bursting Upward then Fluttering Down
  for (let i = 0; i < 110; i++) {
    const angle = (Math.random() * 0.85 + 0.075) * -Math.PI; // Upward arc blast
    const speed = Math.random() * 16 + 4;
    colParticles.push({
      type: 'confetti',
      x: cx + (Math.random() * 50 - 25),
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      w: Math.random() * 10 + 4,
      h: Math.random() * 16 + 8,
      color: popPaperColors[Math.floor(Math.random() * popPaperColors.length)],
      alpha: 1,
      decay: Math.random() * 0.012 + 0.005, // Slower decay so paper drops flutter and fall across page
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.28,
      gravity: 0.18
    });
  }

  // 2. High Velocity Golden & Silver Sparkle Particles
  for (let i = 0; i < 85; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 14 + 3;
    colParticles.push({
      type: 'star',
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 6 + 3,
      color: Math.random() > 0.3 ? '#ffd700' : '#ffffff',
      alpha: 1,
      decay: Math.random() * 0.02 + 0.008
    });
  }

  if (navigator.vibrate) navigator.vibrate([40, 40, 60, 40, 80]);
}

// Staggered Pop Burst for Scratch Reveal Celebration
function triggerMultiStagePop(cx, cy) {
  triggerPopCrackleBurst(cx, cy);

  setTimeout(() => {
    triggerPopCrackleBurst(cx - 90, cy - 30);
  }, 110);

  setTimeout(() => {
    triggerPopCrackleBurst(cx + 90, cy - 30);
  }, 220);
}

// Micro sparks while scratching
function triggerScratchSpark(x, y) {
  for (let i = 0; i < 3; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    colParticles.push({
      type: 'star',
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 3 + 1.5,
      color: '#fcf6ba',
      alpha: 1,
      decay: 0.05
    });
  }
}

function triggerSparkleBurst(cx, cy) {
  triggerPopCrackleBurst(cx, cy);
}

function animateCollisionParticles() {
  colCtx.clearRect(0, 0, colCanvas.width, colCanvas.height);

  for (let i = colParticles.length - 1; i >= 0; i--) {
    const p = colParticles[i];

    if (p.type === 'shockwave') {
      p.radius += 8;
      p.alpha -= 0.04;
      if (p.alpha <= 0 || p.radius >= p.maxRadius) {
        colParticles.splice(i, 1);
        continue;
      }
      colCtx.save();
      colCtx.globalAlpha = p.alpha;
      colCtx.strokeStyle = p.color;
      colCtx.lineWidth = p.lineWidth;
      colCtx.beginPath();
      colCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      colCtx.stroke();
      colCtx.restore();
      continue;
    }

    p.x += p.vx;
    p.y += p.vy;

    if (p.type === 'confetti') {
      p.vy += p.gravity || 0.1;
      p.vx *= 0.96;
      p.rotation += p.rotSpeed || 0.05;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        colParticles.splice(i, 1);
        continue;
      }

      colCtx.save();
      colCtx.translate(p.x, p.y);
      colCtx.rotate(p.rotation);
      colCtx.globalAlpha = p.alpha;
      colCtx.fillStyle = p.color;
      colCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      colCtx.restore();
      continue;
    }

    // Default Star / Sparkle
    p.vx *= 0.95;
    p.vy *= 0.95;
    p.alpha -= p.decay;

    if (p.alpha <= 0) {
      colParticles.splice(i, 1);
      continue;
    }

    colCtx.save();
    colCtx.globalAlpha = p.alpha;
    colCtx.fillStyle = p.color;
    colCtx.beginPath();
    colCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    colCtx.fill();
    colCtx.restore();
  }
  requestAnimationFrame(animateCollisionParticles);
}
animateCollisionParticles();

let scratchHasLocked = false;
let bottomHasLocked = false;

function handleScrollRings() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return;

  const scrollPos = window.scrollY;
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const ringW = screenW >= 768 ? 140 : 105;

  // Horizontal side margins
  const sideMarginLeft = screenW >= 768 ? screenW * 0.08 : screenW * 0.04;
  const sideMarginRight = screenW - sideMarginLeft - ringW;

  // Target interlocked X positions in center
  const targetXLeft = (screenW / 2) - ringW + 24;
  const targetXRight = (screenW / 2) - 24;

  const deltaXLeft = targetXLeft - sideMarginLeft;
  const deltaXRight = targetXRight - sideMarginRight;

  // Find Scratch Card wrapper element Y position
  const scratchWrapper = document.getElementById('scratchWrapper');
  let scratchY = screenH * 1.5;
  if (scratchWrapper) {
    const rect = scratchWrapper.getBoundingClientRect();
    scratchY = rect.top + window.scrollY;
  }

  // Find Closing Section Spotlight Stage Y position
  const closingStage = document.getElementById('ringSpotlightStage');
  let closingY = docHeight;
  if (closingStage) {
    const rect = closingStage.getBoundingClientRect();
    closingY = rect.top + window.scrollY;
  }

  // Vertical Y entrance from top (-180px) falling down to screen floating height (screenH * 0.52)
  const topEntranceProgress = Math.min(1, scrollPos / 350);
  const fallEase = topEntranceProgress * (2 - topEntranceProgress);
  const startY = -180;
  const targetScreenY = screenH * 0.52;
  const ringScreenY = startY + (targetScreenY - startY) * fallEase;

  // Compute scroll distances for Scratch Card lock and Closing lock
  const scratchDist = scrollPos - (scratchY - screenH * 0.42);
  const scratchRange = 420; // 420px scroll window for scratch card lock

  const closingDist = scrollPos - (closingY - screenH * 0.65);
  const closingRange = 450; // 450px scroll window for closing lock

  let lockFactor = 0; // 0 = separated on sides, 1 = interlocked in center
  let isScratchLock = false;
  let isClosingLock = false;

  if (Math.abs(scratchDist) < scratchRange) {
    // Near Scratch Card section!
    lockFactor = Math.cos((scratchDist / scratchRange) * (Math.PI / 2));
    lockFactor = Math.max(0, Math.min(1, lockFactor * lockFactor));
    isScratchLock = lockFactor > 0.82;
  } else if (closingDist > 0) {
    // Near Closing section at bottom!
    lockFactor = Math.min(1, closingDist / (closingRange * 0.6));
    isClosingLock = lockFactor > 0.82;
  }

  // Smooth Interpolation for X positions
  const currentDxLeft = deltaXLeft * lockFactor;
  const currentDxRight = deltaXRight * lockFactor;

  // Floating sway side-to-side motion when separated
  const floatSwayL = (1 - lockFactor) * Math.sin(scrollPos * 0.008) * 10;
  const floatSwayR = (1 - lockFactor) * Math.cos(scrollPos * 0.008) * 10;

  // Dynamic 3D tilt as rings converge to interlock
  const tiltL = (1 - lockFactor) * 14 - (lockFactor * 12);
  const tiltR = (1 - lockFactor) * -14 + (lockFactor * 12);

  if (ringLeft) ringLeft.style.transform = `translate3d(${currentDxLeft}px, ${ringScreenY + floatSwayL}px, 0) rotate(${tiltL}deg)`;
  if (ringRight) ringRight.style.transform = `translate3d(${currentDxRight}px, ${ringScreenY + floatSwayR}px, 0) rotate(${tiltR}deg)`;

  // Handle Lock Celebration Triggers & Badges
  const lockedBadge = document.getElementById('lockedBadge');
  const lockedBadgeText = document.getElementById('lockedBadgeText');

  if (isScratchLock) {
    if (!scratchHasLocked) {
      scratchHasLocked = true;
      triggerMultiStagePop(screenW / 2, ringScreenY + ringW / 2);
    }
    if (lockedBadge) {
      if (lockedBadgeText) lockedBadgeText.textContent = "✦ VINEETH & SOFIYA • TWO BECOME ONE ✦";
      lockedBadge.classList.add('active');
    }
  } else if (isClosingLock) {
    if (!bottomHasLocked) {
      bottomHasLocked = true;
      triggerMultiStagePop(screenW / 2, ringScreenY + ringW / 2);
    }
    if (lockedBadge) {
      if (lockedBadgeText) lockedBadgeText.textContent = "✦ VINEETH & SOFIYA • FOREVER ENGAGED ✦";
      lockedBadge.classList.add('active');
    }
  } else {
    scratchHasLocked = false;
    bottomHasLocked = false;
    if (lockedBadge) lockedBadge.classList.remove('active');
  }
}

window.addEventListener('scroll', handleScrollRings, { passive: true });
window.addEventListener('resize', handleScrollRings);
handleScrollRings();

/* -------------------------------------------------------------
   CALENDAR INTEGRATION
   ------------------------------------------------------------- */
document.getElementById('addToCalBtn').addEventListener('click', () => {
  const calUrl = "https://www.google.com/calendar/render?action=TEMPLATE&text=Vineeth+%26+Sofiya+Engagement+Ceremony&dates=20261113T063000Z/20261113T103000Z&details=Engagement+Ring+Exchange+%26+Celebration&location=Vettukad+Auditorium%2C+Trivandrum";
  window.open(calUrl, '_blank');
});
