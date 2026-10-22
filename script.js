// Configuration
const CONFIG = {
  engagementDate: "2026-11-13T12:00:00+05:30",
  venue: "Little Flower Parish Hall, Sreekaryam - Kulathoor Rd, near CET, Sreekaryam, Thiruvananthapuram",
  mapUrl: "https://www.google.com/maps/place/Little+Flower,+Saint+Therese+of+Lisieux+Roman+Catholic+Latin+Church/@8.5426952,76.8952686,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05bebfd57325af:0x61ac11a787baf502!8m2!3d8.5426952!4d76.8952686!16s%2Fg%2F1hhx9msxl?hl=en-US&entry=ttu&g_ep=EgoyMDI2MTAxOC4wIKXMDSoASAFQAw%3D%3D"
};

// Fixed Client Theme Palette: Warm Ivory Parchment + Royal Maroon & Burnished Gold
const THEME_PALETTE = {
  starColors: ['#C59B27', '#B8860B', '#E5C170', '#D4AF37'],
  // Authentic Romantic Rose Petals (Crimson Red, Scarlet, Velvet Ruby, Carmine & Blush Rose)
  roseColors: [
    { fill: '#C8102E', highlight: '#FF4D6D', edge: '#85001C' }, // Crimson Rose
    { fill: '#E6194B', highlight: '#FF6B8B', edge: '#9B0028' }, // Vibrant Scarlet Rose
    { fill: '#B30B2D', highlight: '#F43F5E', edge: '#73051B' }, // Velvet Red Rose
    { fill: '#D91C4A', highlight: '#FF7597', edge: '#8F0024' }, // Ruby Red Rose
    { fill: '#9E0A28', highlight: '#E11D48', edge: '#600014' }, // Deep Romantic Rose
    { fill: '#E0315E', highlight: '#FFA4BC', edge: '#9C0D36' }  // Fresh Rose Petal Pink
  ]
};

let currentStarColors = THEME_PALETTE.starColors;

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

const ROSE_COLORS = THEME_PALETTE.roseColors;

class FlowerPetal {
  constructor() {
    this.reset(true);
  }
  reset(initial = false) {
    this.x = Math.random() * petalCanvas.width;
    this.y = initial ? Math.random() * petalCanvas.height : -40;
    this.size = Math.random() * 11 + 11; // 11px to 22px realistic petal size
    this.speedY = Math.random() * 1.25 + 0.75; // Graceful drifting downward
    this.speedX = Math.random() * 0.6 - 0.3;
    this.swaySpeed = Math.random() * 0.028 + 0.014;
    this.swayAngle = Math.random() * Math.PI * 2;
    this.flipSpeed = Math.random() * 0.035 + 0.016;
    this.flipAngle = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.025;
    this.colorScheme = ROSE_COLORS[Math.floor(Math.random() * ROSE_COLORS.length)];
    this.opacity = Math.random() * 0.35 + 0.6; // High visibility and rich color saturation
  }
  update() {
    this.swayAngle += this.swaySpeed;
    this.flipAngle += this.flipSpeed;
    this.x += Math.sin(this.swayAngle) * 1.25 + this.speedX;
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

    // 3D tumbling flip effect
    const flipScale = Math.sin(this.flipAngle);
    pCtx.scale(1, flipScale);

    pCtx.globalAlpha = this.opacity;

    // Organic Rose Petal Gradient Shading
    const isBackside = flipScale < 0;
    const grad = pCtx.createRadialGradient(-this.size * 0.2, -this.size * 0.25, 1, 0, 0, this.size);

    if (!isBackside) {
      grad.addColorStop(0, this.colorScheme.highlight);
      grad.addColorStop(0.6, this.colorScheme.fill);
      grad.addColorStop(1, this.colorScheme.edge);
    } else {
      // Petal underside is slightly softer velvety matte
      grad.addColorStop(0, '#FFA8BC');
      grad.addColorStop(0.6, this.colorScheme.highlight);
      grad.addColorStop(1, this.colorScheme.fill);
    }

    pCtx.fillStyle = grad;
    pCtx.shadowColor = 'rgba(160, 15, 40, 0.22)';
    pCtx.shadowBlur = 4;
    pCtx.shadowOffsetY = 2;

    // Authentic Rose Petal Curved Heart/Tear Contour
    pCtx.beginPath();
    pCtx.moveTo(0, -this.size * 0.85);
    // Right lobe curve to tapered stem base
    pCtx.bezierCurveTo(this.size * 0.85, -this.size * 0.78, this.size * 0.95, this.size * 0.38, 0, this.size);
    // Left lobe curve back to top indentation
    pCtx.bezierCurveTo(-this.size * 0.95, this.size * 0.38, -this.size * 0.85, -this.size * 0.78, 0, -this.size * 0.85);
    pCtx.fill();

    // Delicate translucent petal highlight curve along upper rim
    pCtx.shadowColor = 'transparent';
    pCtx.strokeStyle = isBackside ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 235, 240, 0.35)';
    pCtx.lineWidth = 0.85;
    pCtx.beginPath();
    pCtx.arc(0, -this.size * 0.42, this.size * 0.45, Math.PI * 0.85, Math.PI * 2.15);
    pCtx.stroke();

    // Subtle natural center vein
    pCtx.strokeStyle = 'rgba(255, 220, 230, 0.22)';
    pCtx.lineWidth = 0.7;
    pCtx.beginPath();
    pCtx.moveTo(0, -this.size * 0.55);
    pCtx.quadraticCurveTo(this.size * 0.05, 0, 0, this.size * 0.7);
    pCtx.stroke();

    pCtx.restore();
  }
}

const petalCount = window.innerWidth < 768 ? 16 : 22;
for (let i = 0; i < petalCount; i++) petals.push(new FlowerPetal());

function animatePetals() {
  pCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
  petals.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animatePetals);
}
animatePetals();



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
let songStartTimeout = null;
let unwrapStartTime = 0;

function completeOpening() {
  if (!openingModal || openingModal.classList.contains('opened')) return;
  if (unwrapTimeout) clearTimeout(unwrapTimeout);
  if (songStartTimeout) clearTimeout(songStartTimeout);
  // Ensure background music starts if it hasn't already
  startContinuousMusic().catch(() => {});
  openingModal.classList.add('opened');
  document.body.classList.remove('locked');
  document.body.style.overflow = '';
  // Ensure no popper particles leak into the inside page
  envParticles = [];
  if (typeof envPopperCtx !== 'undefined' && envPopperCtx && envPopperCanvas) {
    envPopperCtx.clearRect(0, 0, envPopperCanvas.width, envPopperCanvas.height);
  }
  colParticles = [];
  colCtx.clearRect(0, 0, colCanvas.width, colCanvas.height);
  updateRingsPhysics();
  highlightActiveNav();
}

async function triggerUnwrapSequence(event) {
  if (openingModal && openingModal.classList.contains('opened')) return;

  if (!isUnwrapping) {
    isUnwrapping = true;
    unwrapStartTime = Date.now();

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

    // Trigger Ribbon Cutting Popper Confetti Burst on Envelope Page (plays party popper sound immediately)
    triggerEnvelopePartyPopper(cx, cy);

    // Add clicked state to wax seal wrapper
    if (openInviteBtn) openInviteBtn.classList.add('clicked');

    // Trigger 3D Envelope Flap Open, Ribbon Split & Invitation Card Slide Out
    if (envContainer) envContainer.classList.add('unwrapping');

    // Start background music AFTER 2 seconds so the party popper sound is heard clearly first
    songStartTimeout = setTimeout(() => {
      startContinuousMusic().catch(() => {});
    }, 2000);

    // Smoothly fade out modal after unwrapping celebration (no timer UI needed)
    unwrapTimeout = setTimeout(() => {
      completeOpening();
    }, 3800);
  } else {
    // If clicked AGAIN while popped out, prevent rapid touch bouncing from killing popper
    if (Date.now() - unwrapStartTime < 1500) {
      return;
    }
    completeOpening();
  }
}

// Bind click events on Wax Seal, Letter Card, Envelope, and Modal
if (openInviteBtn) openInviteBtn.addEventListener('click', (e) => { e.stopPropagation(); triggerUnwrapSequence(e); });
if (letterCard) letterCard.addEventListener('click', (e) => { e.stopPropagation(); triggerUnwrapSequence(e); });
if (envContainer) envContainer.addEventListener('click', (e) => { e.stopPropagation(); triggerUnwrapSequence(e); });
if (openingModal) openingModal.addEventListener('click', (e) => { triggerUnwrapSequence(e); });

const cardEnteringBadge = document.getElementById('cardEnteringBadge');
if (cardEnteringBadge) {
  cardEnteringBadge.addEventListener('click', (e) => {
    e.stopPropagation();
    completeOpening();
  });
}

// Accessibility: Pressing Enter, Space, or Escape opens the invitation
window.addEventListener('keydown', (e) => {
  if (openingModal && !openingModal.classList.contains('opened')) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      completeOpening();
    }
  }
});

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

// Map each page section ID to its corresponding bottom navigation tab href
const sectionNavMap = {
  'hero': '#hero',
  'messageSection': '#messageSection',
  'interfaithSection': '#interfaithSection',
  'scratchSection': '#interfaithSection',
  'countdownSection': '#interfaithSection',
  'gallerySection': '#gallerySection',
  'ritesSection': '#gallerySection',
  'venueSection': '#venueSection',
  'closingSection': '#closingSection'
};

function highlightActiveNav() {
  // If the envelope modal is still locked or user is at the top of the page, always keep Home active
  if (document.body.classList.contains('locked') || window.scrollY < 80) {
    navItems.forEach(item => {
      if (item.getAttribute('href') === '#hero') {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    return;
  }

  const scrollPosition = window.scrollY + window.innerHeight * 0.38;
  let activeTarget = '#hero';

  navSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    if (scrollPosition >= sectionTop - 60) {
      const secId = section.getAttribute('id');
      if (secId && sectionNavMap[secId]) {
        activeTarget = sectionNavMap[secId];
      }
    }
  });

  // Only highlight Wishes if user has scrolled well down into the page and reached the footer
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (window.scrollY > 500 && (window.innerHeight + window.scrollY) >= scrollHeight - 80) {
    activeTarget = '#closingSection';
  }

  navItems.forEach(item => {
    if (item.getAttribute('href') === activeTarget) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

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
  grad.addColorStop(0, '#C59B27');
  grad.addColorStop(0.35, '#E5C170');
  grad.addColorStop(0.65, '#B8860B');
  grad.addColorStop(1, '#996515');

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

    triggerScratchCrackerCelebration(cx, cy);
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
const ringsWrapper = document.getElementById('ringsWrapper');
const ringLeft = document.getElementById('ringLeft');
const ringRight = document.getElementById('ringRight');
const ringInterlockWeave = document.getElementById('ringInterlockWeave');
const lockedBadge = document.getElementById('lockedBadge');
const lockedBadgeText = document.getElementById('lockedBadgeText');

const envPopperCanvas = document.getElementById('envelopePopperCanvas');
const envPopperCtx = envPopperCanvas ? envPopperCanvas.getContext('2d') : null;
let envParticles = [];

function resizeEnvPopperCanvas() {
  if (!envPopperCanvas) return;
  envPopperCanvas.width = window.innerWidth;
  envPopperCanvas.height = window.innerHeight;
}
if (envPopperCanvas) {
  resizeEnvPopperCanvas();
  window.addEventListener('resize', resizeEnvPopperCanvas);
}

const colCanvas = document.getElementById('collisionCanvas');
const colCtx = colCanvas.getContext('2d');
let colParticles = [];

function resizeColCanvas() {
  colCanvas.width = window.innerWidth;
  colCanvas.height = window.innerHeight;
}
resizeColCanvas();
window.addEventListener('resize', resizeColCanvas);

// Dedicated Party Popper Animation Loop on Envelope Page
function animateEnvelopePopper() {
  if (envPopperCtx && envPopperCanvas) {
    envPopperCtx.clearRect(0, 0, envPopperCanvas.width, envPopperCanvas.height);

    for (let i = envParticles.length - 1; i >= 0; i--) {
      const p = envParticles[i];

      if (p.type === 'shockwave') {
        p.radius += 8;
        p.alpha -= 0.035;
        if (p.alpha <= 0 || p.radius >= p.maxRadius) {
          envParticles.splice(i, 1);
          continue;
        }
        envPopperCtx.save();
        envPopperCtx.globalAlpha = Math.max(0, p.alpha);
        envPopperCtx.strokeStyle = p.color;
        envPopperCtx.lineWidth = p.lineWidth;
        envPopperCtx.beginPath();
        envPopperCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        envPopperCtx.stroke();
        envPopperCtx.restore();
        continue;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.type === 'confetti' || p.type === 'ribbon' || p.type === 'petal') {
        p.vy += p.gravity || 0.12;
        p.vx *= 0.97;
        p.rotation += p.rotSpeed || 0.05;
        p.tilt = (p.tilt || 0) + (p.tiltSpeed || 0.08);
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > envPopperCanvas.height + 60) {
          envParticles.splice(i, 1);
          continue;
        }

        envPopperCtx.save();
        envPopperCtx.translate(p.x, p.y);
        envPopperCtx.rotate(p.rotation);
        envPopperCtx.globalAlpha = Math.max(0, p.alpha);
        envPopperCtx.fillStyle = p.color;

        if (p.type === 'petal') {
          envPopperCtx.beginPath();
          envPopperCtx.ellipse(0, 0, p.w / 2, p.h / 2, Math.PI / 4, 0, Math.PI * 2);
          envPopperCtx.fill();
        } else if (p.type === 'ribbon') {
          const ribbonW = p.w * Math.cos(p.tilt);
          envPopperCtx.fillRect(-ribbonW / 2, -p.h / 2, ribbonW, p.h);
        } else {
          const flutterW = p.w * Math.cos(p.tilt);
          envPopperCtx.fillRect(-flutterW / 2, -p.h / 2, flutterW, p.h);
        }

        envPopperCtx.restore();
        continue;
      }

      // Default Star / Sparkle
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        envParticles.splice(i, 1);
        continue;
      }

      envPopperCtx.save();
      envPopperCtx.globalAlpha = Math.max(0, p.alpha);
      envPopperCtx.fillStyle = p.color;
      envPopperCtx.beginPath();
      envPopperCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      envPopperCtx.fill();
      envPopperCtx.restore();
    }
  }
  requestAnimationFrame(animateEnvelopePopper);
}
animateEnvelopePopper();

// Realistic Festive Party Popper Sound Effect synthesized via Web Audio API (snappy air pop + paper crackle blast)
function playPartyPopperSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const playSingleCannonPop = (delayMs, volume = 1.0, pitchMod = 1.0) => {
      const startTime = ctx.currentTime + delayMs / 1000;

      // 1. Snappy pressure-release "POP" tone (fast pitch drop)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680 * pitchMod, startTime);
      osc.frequency.exponentialRampToValueAtTime(70 * pitchMod, startTime + 0.045);

      oscGain.gain.setValueAtTime(0.001, startTime);
      oscGain.gain.linearRampToValueAtTime(0.75 * volume, startTime + 0.003);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.06);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.065);

      // 2. Canister sub-bass body thump
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(130 * pitchMod, startTime);
      sub.frequency.exponentialRampToValueAtTime(40, startTime + 0.075);

      subGain.gain.setValueAtTime(0.001, startTime);
      subGain.gain.linearRampToValueAtTime(0.6 * volume, startTime + 0.004);
      subGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.08);

      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start(startTime);
      sub.stop(startTime + 0.085);

      // 3. Confetti streamer rush & crackle (Bandpassed noise burst)
      const bufferLength = Math.floor(ctx.sampleRate * 0.16);
      const noiseBuffer = ctx.createBuffer(1, bufferLength, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferLength * 0.35));
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200 * pitchMod, startTime);
      filter.Q.setValueAtTime(1.6, startTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, startTime);
      noiseGain.gain.linearRampToValueAtTime(0.65 * volume, startTime + 0.005);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.15);

      noiseSource.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noiseSource.start(startTime);
      noiseSource.stop(startTime + 0.16);
    };

    // Staggered multi-stage celebration pop matching the visual confetti cannons
    playSingleCannonPop(0, 1.0, 1.0);       // Immediate center pop
    playSingleCannonPop(85, 0.7, 1.18);     // Secondary left cannon pop
    playSingleCannonPop(170, 0.55, 0.92);   // Third right cannon pop

  } catch (err) {}
}

// Multi-Stage Luxury Party Popper Explosion for Envelope Unwrapping
function triggerEnvelopePartyPopper(cx, cy) {
  const popColors = [
    '#C59B27', '#B8860B', '#D4AF37', '#E5C170', // Burnished golds
    '#8E163B', '#D93B68', '#C8102E', '#FAF2E6', // Royal rose, crimson, silk ivory
    '#FFD700', '#FFFFFF', '#FF6B8B', '#B30B2D'
  ];

  // Play realistic party popper sound right when envelope begins opening
  playPartyPopperSound();

  function shootCannon(startX, startY, baseAngle, spread, count, powerMultiplier = 1) {
    // Expanding shockwave ring
    envParticles.push({
      type: 'shockwave',
      x: startX,
      y: startY,
      radius: 12,
      maxRadius: 260 * powerMultiplier,
      alpha: 0.96,
      color: '#ffd700',
      lineWidth: 5
    });

    for (let i = 0; i < count; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * spread;
      const speed = (Math.random() * 16 + 6) * powerMultiplier;
      const isRibbon = Math.random() > 0.68;
      const isPetal = !isRibbon && Math.random() > 0.60;

      envParticles.push({
        type: isRibbon ? 'ribbon' : (isPetal ? 'petal' : 'confetti'),
        x: startX + (Math.random() * 20 - 10),
        y: startY + (Math.random() * 20 - 10),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 3 + 3),
        w: isRibbon ? (Math.random() * 6 + 4) : (Math.random() * 11 + 6),
        h: isRibbon ? (Math.random() * 30 + 16) : (Math.random() * 15 + 7),
        color: popColors[Math.floor(Math.random() * popColors.length)],
        alpha: 1,
        decay: Math.random() * 0.006 + 0.004, // 2.5 - 3.5s duration on envelope screen
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.22,
        tilt: Math.random() * Math.PI * 2,
        tiltSpeed: (Math.random() - 0.5) * 0.16,
        gravity: isRibbon ? 0.13 : (isPetal ? 0.10 : 0.16)
      });
    }

    // Sparkling golden and white stars
    for (let i = 0; i < Math.floor(count * 0.65); i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 14 + 4) * powerMultiplier;
      envParticles.push({
        type: 'star',
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5.5 + 2.5,
        color: Math.random() > 0.35 ? '#ffd700' : '#ffffff',
        alpha: 1,
        decay: Math.random() * 0.012 + 0.005
      });
    }
  }

  // 1. Immediate Center Pop directly from Wax Seal
  shootCannon(cx, cy, -Math.PI / 2, Math.PI * 1.5, 110, 1.2);

  // 2. Dual Party Cannon Bursts from Left and Right sides of Envelope (t=90ms)
  setTimeout(() => {
    const leftX = Math.max(20, cx - Math.min(window.innerWidth * 0.36, 190));
    const rightX = Math.min(window.innerWidth - 20, cx + Math.min(window.innerWidth * 0.36, 190));
    const cannonY = cy + 18;

    shootCannon(leftX, cannonY, -Math.PI * 0.32, Math.PI * 0.52, 75, 1.1);
    shootCannon(rightX, cannonY, -Math.PI * 0.68, Math.PI * 0.52, 75, 1.1);
  }, 90);

  // 3. Secondary Cascade Flutter Shower (t=190ms)
  setTimeout(() => {
    shootCannon(cx, cy - 25, -Math.PI / 2, Math.PI * 1.1, 60, 0.95);
  }, 190);

  if (navigator.vibrate) navigator.vibrate([40, 30, 60, 40, 80]);
}

// High-Energy "Pop Cracking" Ribbon Cutting & Falling Pop Paper Celebration
function triggerPopCrackleBurst(cx, cy) {
  const popPaperColors = ['#C59B27', '#B8860B', '#D4AF37', '#4A0E17', '#800E26', '#FAF2E6', '#E5C170', '#9E1B32'];

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

// Festive Multi-Burst Firecracker Sound Effect for Scratch Card Reveal
// Distinct from the envelope popper: snappy pyrotechnic cracker pops with sizzling sparkle bursts
function playCrackerCelebrationSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Helper: Single sharp firecracker snap
    const fireSnap = (timeOffset, freqStart, freqEnd, snapVol, duration = 0.04) => {
      const t = now + timeOffset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth'; // Sharp acoustic snap of a firecracker
      osc.frequency.setValueAtTime(freqStart, t);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(snapVol, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + duration + 0.01);
    };

    // Helper: Sizzling cracker noise burst (sparkle / powder burst)
    const fireNoiseCrackle = (timeOffset, centerFreq, noiseVol, duration = 0.08) => {
      const t = now + timeOffset;
      const bufferLength = Math.floor(ctx.sampleRate * duration);
      const noiseBuffer = ctx.createBuffer(1, bufferLength, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferLength, 1.8);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(centerFreq, t);
      filter.Q.setValueAtTime(3.2, t); // High resonance sizzle

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(noiseVol, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(t);
      noise.stop(t + duration + 0.01);
    };

    // Rapid celebratory firecracker burst cascade:
    // 1. Initial loud lead cracker snap & burst
    fireSnap(0.00, 1500, 130, 0.75, 0.05);
    fireNoiseCrackle(0.00, 4000, 0.65, 0.12);

    // 2. High-energy staggered cracker string snaps
    fireSnap(0.045, 1900, 240, 0.50, 0.035);
    fireNoiseCrackle(0.045, 4800, 0.45, 0.09);

    fireSnap(0.10, 1300, 150, 0.60, 0.045);
    fireNoiseCrackle(0.10, 3400, 0.55, 0.14);

    fireSnap(0.155, 1700, 200, 0.45, 0.035);
    fireNoiseCrackle(0.155, 5200, 0.40, 0.08);

    fireSnap(0.22, 1150, 110, 0.65, 0.055);
    fireNoiseCrackle(0.22, 3000, 0.50, 0.16);

    // 3. Trailing sizzling golden sparkles
    fireNoiseCrackle(0.26, 5800, 0.30, 0.22);

  } catch (err) {}
}

// Authentic Pyrotechnic Firecracker Burst for Scratch Reveal
function triggerCrackerBurst(cx, cy, intensity = 1.0, spreadAngle = null) {
  const sparkColors = [
    { color: '#FFFFFF', glow: '#FFF59D', width: 2.6 }, // Incandescent white-hot
    { color: '#FFE082', glow: '#FFD700', width: 2.4 }, // Brilliant gold
    { color: '#FFD700', glow: '#FFA000', width: 2.2 }, // Pure golden spark
    { color: '#FF9800', glow: '#FF6D00', width: 2.0 }, // Sizzling amber
    { color: '#FF5722', glow: '#E65100', width: 2.0 }, // Fiery orange
    { color: '#FF1744', glow: '#D50000', width: 2.2 }, // Pyrotechnic crimson red
    { color: '#E0F7FA', glow: '#80DEEA', width: 2.4 }  // Electric diamond silver
  ];

  // 1. Pyrotechnic Flash Shockwave
  colParticles.push({
    type: 'cracker-flash',
    x: cx,
    y: cy,
    radius: 12,
    maxRadius: 230 * intensity,
    expandSpeed: 16 * intensity,
    alpha: 0.95,
    decay: 0.065,
    color: '#FFF8E1',
    lineWidth: 5
  });

  // 2. High-Velocity Incandescent Spark Streaks
  const sparkCount = Math.floor(75 * intensity);
  for (let i = 0; i < sparkCount; i++) {
    let angle;
    if (spreadAngle !== null) {
      angle = spreadAngle + (Math.random() - 0.5) * Math.PI * 0.9;
    } else {
      angle = Math.random() * Math.PI * 2;
    }
    const speed = (Math.random() * 16 + 5) * intensity;
    const style = sparkColors[Math.floor(Math.random() * sparkColors.length)];
    const willBurst = Math.random() < 0.28; // 28% of sparks burst into secondary micro-crackles

    colParticles.push({
      type: 'cracker-spark',
      x: cx + (Math.random() * 20 - 10),
      y: cy + (Math.random() * 20 - 10),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: style.color,
      glowColor: style.glow,
      lineWidth: style.width,
      tail: Math.random() * 1.5 + 2.2,
      friction: Math.random() * 0.02 + 0.93,
      gravity: Math.random() * 0.08 + 0.12,
      alpha: 1,
      decay: Math.random() * 0.012 + 0.016, // Fast sizzling life
      bursts: willBurst,
      hasBursted: false
    });
  }

  // 3. Radiant 4-Point Star Flares (Twinkling Firecracker Starbursts)
  const starCount = Math.floor(32 * intensity);
  for (let i = 0; i < starCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 12 + 3) * intensity;
    colParticles.push({
      type: 'cracker-star',
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 3.5 + 2.5,
      color: Math.random() > 0.4 ? '#FFD700' : '#FFFFFF',
      glowColor: Math.random() > 0.5 ? '#FFA000' : '#FFD54F',
      rotation: Math.random() * Math.PI,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.02,
      flicker: Math.random() * 5
    });
  }
}

// Multi-Stage Firecracker Sequence for Scratch Reveal
function triggerScratchCrackerCelebration(cx, cy) {
  // Play distinct pyrotechnic firecracker string sound
  playCrackerCelebrationSound();

  // 1. Center initial firecracker explosion
  triggerCrackerBurst(cx, cy, 1.25);

  // 2. Left angled firecracker pop (t = 85ms)
  setTimeout(() => {
    triggerCrackerBurst(cx - 85, cy - 25, 0.9, -Math.PI * 0.65);
  }, 85);

  // 3. Right angled firecracker pop (t = 165ms)
  setTimeout(() => {
    triggerCrackerBurst(cx + 85, cy - 25, 0.9, -Math.PI * 0.35);
  }, 165);

  // 4. Center sparkling crackle fountain finale (t = 245ms)
  setTimeout(() => {
    triggerCrackerBurst(cx, cy - 35, 1.0, -Math.PI / 2);
  }, 245);

  if (navigator.vibrate) navigator.vibrate([30, 20, 40, 25, 50, 25, 70]);
}

// Dedicated Popper Effect for Ring Interlock Celebration (Confetti & Paper Shower)
function triggerRingLockPopper(cx, cy) {
  // Use celebratory party popper sound
  playPartyPopperSound();

  // Popper confetti bursts (shockwave + colorful flutter papers & ribbons)
  triggerPopCrackleBurst(cx, cy);

  setTimeout(() => {
    triggerPopCrackleBurst(cx - 80, cy - 20);
  }, 120);

  setTimeout(() => {
    triggerPopCrackleBurst(cx + 80, cy - 20);
  }, 240);
}

// Compatibility alias
function triggerMultiStagePop(cx, cy) {
  triggerScratchCrackerCelebration(cx, cy);
}

// Micro sparks while scratching
function triggerScratchSpark(x, y) {
  for (let i = 0; i < 3; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    colParticles.push({
      type: 'cracker-crackle',
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 2.5 + 1.2,
      color: Math.random() > 0.4 ? '#FFF176' : '#FFD54F',
      alpha: 1,
      decay: 0.05
    });
  }
}

function triggerSparkleBurst(cx, cy) {
  triggerCrackerBurst(cx, cy, 1.0);
}

function animateCollisionParticles() {
  colCtx.clearRect(0, 0, colCanvas.width, colCanvas.height);

  for (let i = colParticles.length - 1; i >= 0; i--) {
    const p = colParticles[i];

    // 1. Popper Shockwave Ring (for ring join popper)
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

    // 2. Cracker Explosion Flash Ring
    if (p.type === 'cracker-flash') {
      p.radius += p.expandSpeed || 14;
      p.alpha -= p.decay || 0.06;
      if (p.alpha <= 0 || p.radius >= p.maxRadius) {
        colParticles.splice(i, 1);
        continue;
      }
      colCtx.save();
      colCtx.globalAlpha = Math.max(0, p.alpha);
      colCtx.strokeStyle = p.color || '#FFF3B0';
      colCtx.lineWidth = p.lineWidth || 4;
      colCtx.shadowColor = '#FFA500';
      colCtx.shadowBlur = 14;
      colCtx.beginPath();
      colCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      colCtx.stroke();
      colCtx.restore();
      continue;
    }

    p.x += p.vx;
    p.y += p.vy;

    // 3. Cracker Fiery Streaks (Incandescent sparks with light trails)
    if (p.type === 'cracker-spark') {
      p.vx *= p.friction || 0.94;
      p.vy *= p.friction || 0.94;
      p.vy += p.gravity || 0.12;
      p.alpha -= p.decay || 0.022;

      // Secondary micro-crackle pop burst
      if (p.bursts && p.alpha < 0.62 && !p.hasBursted) {
        p.hasBursted = true;
        for (let k = 0; k < 4; k++) {
          const microAngle = Math.random() * Math.PI * 2;
          const microSpeed = Math.random() * 3.5 + 1;
          colParticles.push({
            type: 'cracker-crackle',
            x: p.x,
            y: p.y,
            vx: Math.cos(microAngle) * microSpeed,
            vy: Math.sin(microAngle) * microSpeed,
            size: Math.random() * 2 + 1,
            color: Math.random() > 0.4 ? '#FFF59D' : '#FFD54F',
            alpha: 0.95,
            decay: 0.04
          });
        }
      }

      if (p.alpha <= 0) {
        colParticles.splice(i, 1);
        continue;
      }

      colCtx.save();
      colCtx.globalAlpha = Math.max(0, p.alpha);
      colCtx.strokeStyle = p.color;
      colCtx.lineWidth = p.lineWidth || 2.2;
      colCtx.lineCap = 'round';
      colCtx.shadowColor = p.glowColor || p.color;
      colCtx.shadowBlur = p.glowBlur || 6;

      colCtx.beginPath();
      const tailLen = p.tail || 2.6;
      colCtx.moveTo(p.x - p.vx * tailLen, p.y - p.vy * tailLen);
      colCtx.lineTo(p.x, p.y);
      colCtx.stroke();

      // Bright white incandescent spark core
      colCtx.fillStyle = '#FFFFFF';
      colCtx.beginPath();
      colCtx.arc(p.x, p.y, (p.lineWidth || 2.2) * 0.65, 0, Math.PI * 2);
      colCtx.fill();

      colCtx.restore();
      continue;
    }

    // 4. Cracker Twinkling 4-Point Star Flares
    if (p.type === 'cracker-star') {
      p.vx *= 0.93;
      p.vy *= 0.93;
      p.vy += 0.06;
      p.alpha -= p.decay || 0.024;
      p.flicker = (p.flicker || 0) + 0.35;

      if (p.alpha <= 0) {
        colParticles.splice(i, 1);
        continue;
      }

      const currentSize = Math.max(1, p.size * (1 + Math.sin(p.flicker) * 0.35));
      colCtx.save();
      colCtx.globalAlpha = Math.max(0, p.alpha);
      colCtx.fillStyle = p.color;
      colCtx.shadowColor = p.glowColor || '#FFD700';
      colCtx.shadowBlur = 8;

      colCtx.translate(p.x, p.y);
      colCtx.rotate(p.rotation || 0);

      // 4-point star diamond flare
      colCtx.beginPath();
      colCtx.moveTo(0, -currentSize * 2.2);
      colCtx.lineTo(currentSize * 0.45, -currentSize * 0.45);
      colCtx.lineTo(currentSize * 2.2, 0);
      colCtx.lineTo(currentSize * 0.45, currentSize * 0.45);
      colCtx.lineTo(0, currentSize * 2.2);
      colCtx.lineTo(-currentSize * 0.45, currentSize * 0.45);
      colCtx.lineTo(-currentSize * 2.2, 0);
      colCtx.lineTo(-currentSize * 0.45, -currentSize * 0.45);
      colCtx.closePath();
      colCtx.fill();

      // White center flare
      colCtx.fillStyle = '#FFFFFF';
      colCtx.beginPath();
      colCtx.arc(0, 0, currentSize * 0.6, 0, Math.PI * 2);
      colCtx.fill();

      colCtx.restore();
      continue;
    }

    // 5. Cracker Micro Sizzles & Sparks
    if (p.type === 'cracker-crackle') {
      p.vx *= 0.90;
      p.vy *= 0.90;
      p.vy += 0.08;
      p.alpha -= p.decay || 0.035;

      if (p.alpha <= 0) {
        colParticles.splice(i, 1);
        continue;
      }

      colCtx.save();
      colCtx.globalAlpha = Math.max(0, p.alpha);
      colCtx.fillStyle = p.color;
      colCtx.shadowColor = '#FFA500';
      colCtx.shadowBlur = 4;
      colCtx.beginPath();
      colCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      colCtx.fill();
      colCtx.restore();
      continue;
    }

    // 6. Popper Confetti & Flutter Papers (specifically for Ring Join Celebration)
    if (p.type === 'confetti' || p.type === 'ribbon' || p.type === 'petal') {
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

      if (p.type === 'petal') {
        colCtx.beginPath();
        colCtx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
        colCtx.fill();
      } else {
        colCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      colCtx.restore();
      continue;
    }

    // 7. Default Star / Sparkle
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
let ringAnimLoopId = null;
let isScrolling = false;
let scrollTimeout = null;
let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let smoothVelocity = 0;
let lastScrollTime = performance.now();

/* -------------------------------------------------------------
   SCROLL-DRIVEN 3D PERSPECTIVE TUMBLING & SACRED INTERLOCK
   - Freely floating on away-sides when above the scratch card
   - Glides and locks below the scratch card in its dedicated slot (matching Image 2)
   - Stably remains locked below the scratch card when scrolling down (never vanishes)
   - Smoothly unlocks and returns to sides when scrolling back up
   - Strictly stationary when not actively scrolling
   ------------------------------------------------------------- */
function updateRingsPhysics() {
  const scrollPos = window.scrollY;
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const isMobile = screenW < 768;
  const isSmallMobile = screenW < 480;
  const ringW = screenW >= 1200 ? 128 : (screenW >= 768 ? 110 : (isSmallMobile ? 52 : 64));

  // Outer away-side margins (placed far to the sides away from text and photos)
  let sideMarginLeft = 8;
  if (screenW >= 1280) {
    const gutter = (screenW - 960) / 2;
    sideMarginLeft = Math.max(24, Math.min(110, (gutter - ringW) / 2));
  } else if (screenW >= 768) {
    sideMarginLeft = 16;
  } else if (isSmallMobile) {
    sideMarginLeft = 2;
  } else {
    sideMarginLeft = 6;
  }
  const sideMarginRight = screenW - sideMarginLeft - ringW;

  // Floating viewport resting Y position: stationed at eye-level on away-sides right from landing
  const floatingScreenY = isMobile ? Math.min(screenH * 0.35, 255) : screenH * 0.42;

  // Dedicated Rings Lock Slot below the Scratch Card
  const slotEl = document.getElementById('ringsLockSlot');
  let slotRect = null;
  if (slotEl) {
    slotRect = slotEl.getBoundingClientRect();
  }

  let lockFactor = 0;
  let ringScreenY = floatingScreenY;
  let targetCenterX = screenW / 2;

  if (slotRect) {
    const slotCenterY = slotRect.top + slotRect.height / 2;
    targetCenterX = slotRect.left + slotRect.width / 2;
    const targetSlotY = slotCenterY - ringW / 2;

    // Trigger lock as the slot approaches the center of viewport
    const lockTriggerY = screenH * 0.52;
    const approachDistance = 280;
    const diff = slotCenterY - lockTriggerY;

    if (diff <= 0) {
      // Scrolled to or past the slot: FULLY LOCKED & STABLE!
      // Rings remain locked and anchored in the slot below the scratch card, scrolling naturally with the page
      lockFactor = 1.0;
      ringScreenY = targetSlotY;
    } else if (diff < approachDistance) {
      // Smoothly gliding into the lock below the scratch card
      const t = 1 - (diff / approachDistance);
      lockFactor = t * t * (3 - 2 * t);
      ringScreenY = floatingScreenY + (targetSlotY - floatingScreenY) * lockFactor;
    } else {
      // Above the lock zone: freely floating on sides
      lockFactor = 0;
      ringScreenY = floatingScreenY;
    }
  }

  // Interlocked target positions in the center slot:
  // Offset tuned to match the ~44% intertwine ratio of Image 2
  const interlockOffset = ringW * 0.22;
  const targetXLeft = targetCenterX - ringW / 2 - interlockOffset;
  const targetXRight = targetCenterX - ringW / 2 + interlockOffset;

  // Exact X positions (interpolating between away sides and center lock)
  const currentXLeft = sideMarginLeft + (targetXLeft - sideMarginLeft) * lockFactor;
  const currentXRight = sideMarginRight + (targetXRight - sideMarginRight) * lockFactor;

  // Velocity damping when user is not actively scrolling
  if (!isScrolling) {
    scrollVelocity *= 0.76;
  }
  smoothVelocity += (scrollVelocity - smoothVelocity) * 0.22;
  if (Math.abs(smoothVelocity) < 0.015) {
    smoothVelocity = 0;
  }

  // DYNAMIC MOTION ONLY WHILE SCROLLING:
  // When stable (stationary), smoothVelocity = 0, so wave offsets & dynamic tilts are 0!
  const waveDamp = (1 - lockFactor * 0.85);
  const velFactor = smoothVelocity / 18; // normalized factor

  // Wave buoyancy & sway: zero when stationary, active during scrolling
  const waveY_L = (Math.sin(scrollPos * 0.018) * 14 * velFactor) * waveDamp;
  const waveY_R = (Math.sin(scrollPos * 0.018 + 2.5) * 14 * velFactor) * waveDamp;
  const waveX_L = (Math.cos(scrollPos * 0.014) * 8 * velFactor) * waveDamp;
  const waveX_R = (-Math.cos(scrollPos * 0.014) * 8 * velFactor) * waveDamp;

  // 3D Perspective Tilts:
  // Stable resting angles:
  // Left: rotateX(8deg) rotateY(18deg) rotateZ(-6deg)
  // Right: rotateX(8deg) rotateY(-18deg) rotateZ(6deg)
  // Locked angles: lean in and interlace facing each other
  const scrollTiltX = smoothVelocity * 0.55;
  const scrollTiltY = Math.sin(scrollPos * 0.01) * 22 * velFactor;
  const scrollTiltZ = smoothVelocity * 0.25;

  const tiltX_L = (8 + scrollTiltX) * waveDamp;
  const tiltX_R = (8 + scrollTiltX) * waveDamp;

  const tiltY_L = (18 + scrollTiltY) * (1 - lockFactor) + (lockFactor * 22);
  const tiltY_R = (-18 - scrollTiltY) * (1 - lockFactor) - (lockFactor * 22);

  const tiltZ_L = (-6 + scrollTiltZ) * (1 - lockFactor) - (lockFactor * 6);
  const tiltZ_R = (6 - scrollTiltZ) * (1 - lockFactor) + (lockFactor * 6);

  if (ringLeft) {
    ringLeft.style.transform = `translate3d(${currentXLeft + waveX_L}px, ${ringScreenY + waveY_L}px, 0) perspective(1000px) rotateX(${tiltX_L}deg) rotateY(${tiltY_L}deg) rotateZ(${tiltZ_L}deg)`;
  }
  if (ringRight) {
    ringRight.style.transform = `translate3d(${currentXRight + waveX_R}px, ${ringScreenY + waveY_R}px, 0) perspective(1000px) rotateX(${tiltX_R}deg) rotateY(${tiltY_R}deg) rotateZ(${tiltZ_R}deg)`;
  }

  // Interlocked 3D weave: men's lower band passing in front of women's lower band
  if (ringInterlockWeave) {
    ringInterlockWeave.style.transform = ringLeft ? ringLeft.style.transform : '';
    ringInterlockWeave.style.opacity = Math.max(0, (lockFactor - 0.65) / 0.35);
  }



  // Union Celebration Badge & Multi-Stage Confetti Pop (Preserves Popper Effect for Ring Interlock)
  if (lockFactor >= 0.95) {
    if (!scratchHasLocked) {
      scratchHasLocked = true;
      triggerRingLockPopper(targetCenterX, ringScreenY + ringW / 2);
    }
    if (lockedBadge) {
      if (lockedBadgeText) lockedBadgeText.textContent = "✦ VINEETH & SOFIYA • TWO BECOME ONE ✦";
      lockedBadge.style.top = (ringScreenY + ringW + 16) + 'px';
      lockedBadge.style.left = targetCenterX + 'px';
      lockedBadge.classList.add('active');
    }
  } else if (lockFactor < 0.6) {
    scratchHasLocked = false;
    if (lockedBadge) lockedBadge.classList.remove('active');
  }

  // Continue animation if actively scrolling or velocity has not settled to 0
  if (isScrolling || Math.abs(smoothVelocity) > 0.02) {
    ringAnimLoopId = requestAnimationFrame(updateRingsPhysics);
  } else {
    // When stable, stop the animation loop completely so the rings rest still!
    ringAnimLoopId = null;
  }
}

function handleRingScroll() {
  const now = performance.now();
  const dt = Math.max(1, now - lastScrollTime);
  const currentScrollY = window.scrollY;
  const rawVelocity = ((currentScrollY - lastScrollY) / dt) * 16;

  scrollVelocity = Math.max(-28, Math.min(28, rawVelocity));
  lastScrollY = currentScrollY;
  lastScrollTime = now;
  isScrolling = true;

  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 100);

  if (!ringAnimLoopId) {
    ringAnimLoopId = requestAnimationFrame(updateRingsPhysics);
  }
}

window.addEventListener('scroll', handleRingScroll, { passive: true });
window.addEventListener('resize', () => {
  if (!ringAnimLoopId) ringAnimLoopId = requestAnimationFrame(updateRingsPhysics);
});

// Render initial stable position once on page load
updateRingsPhysics();

/* -------------------------------------------------------------
   CALENDAR & QUICK SHARE INTEGRATION
   ------------------------------------------------------------- */
document.getElementById('addToCalBtn').addEventListener('click', () => {
  const calUrl = "https://www.google.com/calendar/render?action=TEMPLATE&text=Vineeth+%26+Sofiya+Engagement+Ceremony&dates=20261113T063000Z/20261113T103000Z&details=Engagement+Ring+Exchange+%26+Celebration&location=Little+Flower+Parish+Hall%2C+Sreekaryam+-+Kulathoor+Rd%2C+near+CET%2C+Sreekaryam%2C+Thiruvananthapuram";
  window.open(calUrl, '_blank');
});

// Quick Share button (Direct WhatsApp + Clipboard fallback - 100% safe across file:// and web)
// Quick Share button (Direct Multi-App Luxury Modal — Safe across file://, localhost & live web)
const shareBtn = document.getElementById('shareBtn');
const shareToast = document.getElementById('shareToast');
const shareModal = document.getElementById('shareModal');
const shareModalBackdrop = document.getElementById('shareModalBackdrop');
const shareModalClose = document.getElementById('shareModalClose');
const shareModalWa = document.getElementById('shareModalWa');
const shareModalTg = document.getElementById('shareModalTg');
const shareModalFb = document.getElementById('shareModalFb');
const shareModalSms = document.getElementById('shareModalSms');
const shareModalEmail = document.getElementById('shareModalEmail');
const shareModalMore = document.getElementById('shareModalMore');
const shareModalCopyBtn = document.getElementById('shareModalCopyBtn');
const shareModalUrlPreview = document.getElementById('shareModalUrlPreview');

function triggerShareToast(message) {
  if (!shareToast) return;
  shareToast.textContent = message;
  shareToast.classList.add('show');
  setTimeout(() => {
    shareToast.classList.remove('show');
  }, 3200);
}

function openShareModal(fullMessage, shareUrl) {
  if (!shareModal) return;

  const displayUrl = shareUrl && shareUrl.startsWith('http') ? shareUrl : "https://vineeth-sofiya-engagement-invitation.vercel.app/";

  if (shareModalUrlPreview) {
    shareModalUrlPreview.textContent = displayUrl;
  }
  if (shareModalWa) {
    shareModalWa.href = "https://api.whatsapp.com/send?text=" + encodeURIComponent(fullMessage);
  }
  if (shareModalTg) {
    shareModalTg.href = "https://t.me/share/url?url=" + encodeURIComponent(displayUrl) + "&text=" + encodeURIComponent(fullMessage);
  }
  if (shareModalFb) {
    shareModalFb.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(displayUrl);
  }
  if (shareModalSms) {
    shareModalSms.href = "sms:?body=" + encodeURIComponent(fullMessage);
  }
  if (shareModalEmail) {
    shareModalEmail.href = "mailto:?subject=" + encodeURIComponent("💍 Vineeth & Sofiya — Engagement Ceremony Invitation") + "&body=" + encodeURIComponent(fullMessage);
  }

  // System share (Only available on secure origins like https:// or localhost, strictly NEVER on file://)
  const canUseSystemShare = window.location.protocol !== 'file:' && 
                            window.isSecureContext === true && 
                            typeof navigator.share === 'function';

  if (shareModalMore) {
    if (canUseSystemShare) {
      shareModalMore.style.display = 'flex';
      shareModalMore.onclick = async (e) => {
        e.preventDefault();
        try {
          await navigator.share({
            title: "Vineeth & Sofiya — Engagement Ceremony Invitation",
            text: fullMessage,
            url: displayUrl
          });
          closeShareModal();
        } catch (err) {}
      };
    } else {
      shareModalMore.style.display = 'none';
    }
  }

  shareModal.classList.add('active');
}

function closeShareModal() {
  if (shareModal) shareModal.classList.remove('active');
}

if (shareModalBackdrop) shareModalBackdrop.addEventListener('click', closeShareModal);
if (shareModalClose) shareModalClose.addEventListener('click', closeShareModal);

if (shareModalCopyBtn) {
  shareModalCopyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isWeb = window.location.protocol.startsWith('http');
    const invitationLink = isWeb ? window.location.href : "https://vineeth-sofiya-engagement-invitation.vercel.app/";
    const fullMessage = 
      "💍 *Engagement Ceremony Invitation* 💍\n\n" +
      "*Vineeth Rajendran & Sofiya Das A*\n\n" +
      "📅 *Date:* Friday, 13 November 2026\n" +
      "⏰ *Time:* Starts at 12:00 PM\n" +
      "⛪ *Venue:* Little Flower Parish Hall, Sreekaryam - Kulathoor Rd, near CET, Sreekaryam, Thiruvananthapuram\n" +
      "📍 *Location Map:* " + CONFIG.mapUrl + "\n\n" +
      "✨ *View Wedding Invitation:* " + invitationLink;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullMessage).then(() => {
          triggerShareToast("📋 Invitation link copied to clipboard!");
          closeShareModal();
        }).catch(() => {
          triggerShareToast("📋 Link copied!");
          closeShareModal();
        });
      } else {
        triggerShareToast("📋 Link copied!");
        closeShareModal();
      }
    } catch (err) {
      triggerShareToast("📋 Link copied!");
      closeShareModal();
    }
  });
}

// When Share button is clicked, open the multi-app luxury chooser directly
if (shareBtn) {
  shareBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    const isWeb = window.location.protocol.startsWith('http');
    const invitationLink = isWeb ? window.location.href : "https://vineeth-sofiya-engagement-invitation.vercel.app/";
    const shareText = 
      "💍 *Engagement Ceremony Invitation* 💍\n\n" +
      "*Vineeth Rajendran & Sofiya Das A*\n\n" +
      "📅 *Date:* Friday, 13 November 2026\n" +
      "⏰ *Time:* Starts at 12:00 PM\n" +
      "⛪ *Venue:* Little Flower Parish Hall, Sreekaryam - Kulathoor Rd, near CET, Sreekaryam, Thiruvananthapuram\n" +
      "📍 *Location Map:* " + CONFIG.mapUrl + "\n\n" +
      "✨ *View Wedding Invitation:* " + invitationLink;

    openShareModal(shareText, invitationLink);
  });
}

/* -------------------------------------------------------------
   OUR ENGAGEMENT STORY: 3D COVERFLOW IMAGE SLIDER
   - Center slide in ultra-crisp focus with glowing gold border
   - Previous and next images are blurred & faded (depth of field)
   - Stylish previous / next glassmorphic arrows at ends
   - 5-Second auto-play timeout with animated timer bar
   - Moves and parallax-drifts dynamically while scrolling
   - Mouse wheel and touch/swipe navigation supported
   ------------------------------------------------------------- */
const storySliderContainer = document.getElementById('storySliderContainer');
const storySliderTrack = document.getElementById('storySliderTrack');
const storySlides = document.querySelectorAll('.story-slide');
const sliderPrevBtn = document.getElementById('sliderPrevBtn');
const sliderNextBtn = document.getElementById('sliderNextBtn');
const sliderDots = document.querySelectorAll('.slider-dot');
const sliderTimerFill = document.getElementById('sliderTimerFill');
const gallerySection = document.getElementById('gallerySection');

let currentSlideIdx = 0;
const totalSlides = storySlides.length;
let autoPlayInterval = null;
let isSliderHovered = false;
const SLIDE_DURATION = 5000;

function updateStorySlider(newIndex) {
  currentSlideIdx = (newIndex + totalSlides) % totalSlides;

  storySlides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');

    let diff = i - currentSlideIdx;
    if (diff > Math.floor(totalSlides / 2)) diff -= totalSlides;
    if (diff < -Math.floor(totalSlides / 2)) diff += totalSlides;

    if (diff === 0) {
      slide.classList.add('active');
    } else if (diff === -1) {
      slide.classList.add('prev');
    } else if (diff === 1) {
      slide.classList.add('next');
    } else if (diff < -1) {
      slide.classList.add('hidden-left');
    } else {
      slide.classList.add('hidden-right');
    }
  });

  // Update dots
  sliderDots.forEach((dot, idx) => {
    const isActive = idx === currentSlideIdx;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  restartSliderTimer();
}

function nextSlide() {
  updateStorySlider(currentSlideIdx + 1);
}

function prevSlide() {
  updateStorySlider(currentSlideIdx - 1);
}

// 5-Second Timer Bar & Auto-Advance
function restartSliderTimer() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);

  if (sliderTimerFill) {
    sliderTimerFill.style.transition = 'none';
    sliderTimerFill.style.width = '0%';
    void sliderTimerFill.offsetWidth; // Force DOM reflow
    if (!isSliderHovered) {
      sliderTimerFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
      sliderTimerFill.style.width = '100%';
    }
  }

  if (!isSliderHovered) {
    autoPlayInterval = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
  }
}

// Controls: Arrows
if (sliderPrevBtn) {
  sliderPrevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSlide();
  });
}

if (sliderNextBtn) {
  sliderNextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSlide();
  });
}

// Controls: Click on slide
storySlides.forEach((slide) => {
  slide.addEventListener('click', () => {
    const idx = parseInt(slide.getAttribute('data-index'), 10);
    if (!isNaN(idx) && idx !== currentSlideIdx) {
      updateStorySlider(idx);
    }
  });
});

// Controls: Pagination Dots
sliderDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.getAttribute('data-index'), 10);
    if (!isNaN(idx)) {
      updateStorySlider(idx);
    }
  });
});

// Hover pause
if (storySliderContainer) {
  storySliderContainer.addEventListener('mouseenter', () => {
    isSliderHovered = true;
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    if (sliderTimerFill) {
      const computedW = window.getComputedStyle(sliderTimerFill).width;
      sliderTimerFill.style.transition = 'none';
      sliderTimerFill.style.width = computedW;
    }
  });

  storySliderContainer.addEventListener('mouseleave', () => {
    isSliderHovered = false;
    restartSliderTimer();
  });

  // Mouse wheel slide changing when hovering container
  let wheelThrottle = false;
  storySliderContainer.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > 35 || Math.abs(e.deltaX) > 35) {
      if (!wheelThrottle) {
        wheelThrottle = true;
        if (e.deltaY > 0 || e.deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        setTimeout(() => { wheelThrottle = false; }, 420);
      }
    }
  }, { passive: true });

  // Touch / Drag Gestures
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;

  storySliderContainer.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      isSliderHovered = true;
    }
  }, { passive: true });

  storySliderContainer.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) prevSlide();
        else nextSlide();
      }
    }
    isSliderHovered = false;
    restartSliderTimer();
  }, { passive: true });

  storySliderContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    touchStartX = e.clientX;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    touchEndX = e.clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) prevSlide();
      else nextSlide();
    }
  });
}

// SCROLL-DRIVEN MOVEMENT:
// Parallax drift & perspective tilt as the user scrolls through the gallery
function handleSliderScrollParallax() {
  if (!gallerySection || !storySliderTrack) return;
  const rect = gallerySection.getBoundingClientRect();
  const winH = window.innerHeight;

  // Check if section is visible in viewport
  if (rect.top < winH && rect.bottom > 0) {
    const progress = (winH - rect.top) / (winH + rect.height);
    // Smooth horizontal parallax drift as page scrolls
    const isMobile = window.innerWidth < 768;
    const maxDrift = isMobile ? 18 : 70;
    const maxTilt = isMobile ? 2 : 4;
    const driftX = (progress - 0.5) * -maxDrift;
    const tiltDeg = (progress - 0.5) * -maxTilt;
    storySliderTrack.style.transform = `translateX(${driftX}px) rotateZ(${tiltDeg}deg)`;
  }
}

window.addEventListener('scroll', handleSliderScrollParallax, { passive: true });

// Initialize slider state immediately
updateStorySlider(0);

