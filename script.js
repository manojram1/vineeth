// Configuration
const CONFIG = {
  engagementDate: "2026-11-13T12:00:00+05:30",
  venue: "Vettukad Auditorium",
  mapUrl: "https://share.google/mMGFLypsmjwbw9kCy"
};

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
    bgCtx.fillStyle = Math.random() > 0.4 ? '#e0829d' : '#ffccd5';
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
  { fill: '#a63d50', highlight: '#f0a1a8' }, // Velvet rose
  { fill: '#b84b61', highlight: '#f5b2b6' }, // Dusty rose
  { fill: '#8f3349', highlight: '#df8794' }, // Deep rose
  { fill: '#c45b72', highlight: '#f4bdc3' }, // Blush rose
  { fill: '#ad5266', highlight: '#ed9da9' }  // Antique rose
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
   CONTINUOUS MUSIC PLAYBACK SYSTEM
   ------------------------------------------------------------- */
const openingModal = document.getElementById('openingModal');
const openInviteBtn = document.getElementById('openInviteBtn');
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

function openInvitationCard() {
  if (openingModal.classList.contains('previewing') || openingModal.classList.contains('opened')) return;

  const cardRect = document.querySelector('.cover-card').getBoundingClientRect();
  openingModal.classList.add('previewing');
  document.body.classList.add('card-opening');
  triggerMultiStagePop(cardRect.left + cardRect.width / 2, cardRect.top + cardRect.height * 0.52);
  startContinuousMusic();

  window.setTimeout(() => {
    openingModal.classList.add('opened');
    document.body.classList.remove('locked');
  }, 5900);
  window.setTimeout(() => document.body.classList.remove('card-opening'), 6800);
}

openInviteBtn.addEventListener('click', openInvitationCard);
openInviteBtn.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openInvitationCard();
  }
});

musicBtn.addEventListener('click', async () => {
  if (bgMusic.paused) {
    await startContinuousMusic();
  } else {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
  }
});

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
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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
  sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

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

// High-Energy "Pop Cracking" Fireworks & Confetti Celebration
function triggerPopCrackleBurst(cx, cy) {
  const colors = ['#9f5c52', '#e5c5a1', '#c78e77', '#fffaf4', '#875047', '#ead8c5', '#d9ad8d'];

  // Popping Shockwave Ring
  colParticles.push({
    type: 'shockwave',
    x: cx,
    y: cy,
    radius: 10,
    maxRadius: 180,
    alpha: 0.9,
    color: '#e5c5a1',
    lineWidth: 5
  });

  // 1. Confetti Ribbon Poppers
  for (let i = 0; i < 90; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 14 + 4;
    colParticles.push({
      type: 'confetti',
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      w: Math.random() * 8 + 4,
      h: Math.random() * 14 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.015 + 0.008,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      gravity: 0.15
    });
  }

  // 2. High Velocity Golden Star Particles
  for (let i = 0; i < 80; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 2;
    colParticles.push({
      type: 'star',
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 6 + 3,
      color: Math.random() > 0.3 ? '#f9e4b7' : '#ffffff',
      alpha: 1,
      decay: Math.random() * 0.025 + 0.01
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

let hasCollided = false;

function handleScrollRings() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPos = window.scrollY;
  const progress = docHeight > 0 ? Math.max(0, Math.min(1, scrollPos / docHeight)) : 0;

  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const ringW = screenW >= 768 ? 86 : 70;
  const sideMargin = screenW * 0.02;
  const baseY = screenH * 0.28;
  const startXLeft = sideMargin;
  const startXRight = screenW - sideMargin - ringW;
  const targetXLeft = (screenW / 2) - ringW;
  const targetXRight = screenW / 2;
  const deltaLeft = targetXLeft - startXLeft;
  const deltaRight = targetXRight - startXRight;
  const ringStage = document.getElementById('ringSpotlightStage');
  const stageRect = ringStage ? ringStage.getBoundingClientRect() : null;
  const stageCenterY = stageRect ? stageRect.top + stageRect.height / 2 : screenH * .72;
  const joinStart = .92;
  const ease = value => value * value * (3 - 2 * value);
  const fallProgress = ease(Math.min(1, progress / joinStart));
  const joinProgress = ease(Math.max(0, Math.min(1, (progress - joinStart) / (1 - joinStart))));
  const fallY = baseY + (screenH * .76 - baseY) * fallProgress;
  const currentY = fallY + (stageCenterY - fallY) * joinProgress;
  const currentDxLeft = deltaLeft * joinProgress;
  const currentDxRight = deltaRight * joinProgress;
  const rotation = progress * 150 * (1 - joinProgress);
  const softFloat = Math.sin(progress * Math.PI * 8) * 3 * (1 - joinProgress);

  ringLeft.style.transform = `translate3d(${currentDxLeft}px, ${currentY - baseY + softFloat}px, 0) rotate(${rotation}deg)`;
  ringRight.style.transform = `translate3d(${currentDxRight}px, ${currentY - baseY - softFloat}px, 0) rotate(${-rotation}deg)`;

  const joined = joinProgress >= .985;
  document.body.classList.toggle('rings-joined', joined);
  if (joined) {
    if (!hasCollided) {
      hasCollided = true;
      triggerSparkleBurst(screenW / 2, stageCenterY);
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
    }
    lockedBadge.classList.add('active');
  } else {
    hasCollided = false;
    lockedBadge.classList.remove('active');
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

/* -------------------------------------------------------------
   PHOTO ALBUM SLIDER
   ------------------------------------------------------------- */
const albumTrack = document.getElementById('albumTrack');
if (albumTrack) {
  const albumSlides = Array.from(albumTrack.querySelectorAll('.photo-frame'));
  const previousClone = albumSlides[albumSlides.length - 1].cloneNode(true);
  const nextClone = albumSlides[0].cloneNode(true);
  previousClone.setAttribute('aria-hidden', 'true');
  previousClone.setAttribute('inert', '');
  nextClone.setAttribute('aria-hidden', 'true');
  nextClone.setAttribute('inert', '');
  albumTrack.insertBefore(previousClone, albumSlides[0]);
  albumTrack.appendChild(nextClone);
  const albumVisualSlides = [previousClone, ...albumSlides, nextClone];
  const albumDots = document.getElementById('albumDots');
  const albumCount = document.getElementById('albumCount');
  const albumSlider = albumTrack.closest('.album-slider');
  const albumViewport = albumTrack.closest('.album-viewport');
  let albumIndex = 0;
  let albumVisualIndex = 1;
  let swipeStartX = null;
  let albumTimer = null;
  let albumInView = false;
  let albumHovered = false;
  let albumFocused = false;
  const albumMotionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function centerAlbumPhoto(animate = true) {
    const activeSlide = albumVisualSlides[albumVisualIndex];
    if (!activeSlide) return;
    if (!animate) albumTrack.classList.add('no-transition');
    const offset = albumViewport.clientWidth / 2 - activeSlide.offsetLeft - activeSlide.clientWidth / 2;
    albumTrack.style.transform = `translate3d(${offset}px, 0, 0)`;
    if (!animate) window.requestAnimationFrame(() => window.requestAnimationFrame(() => albumTrack.classList.remove('no-transition')));
  }

  function scheduleAlbumAutoplay() {
    window.clearTimeout(albumTimer);
    if (albumMotionReduced || document.hidden || !albumInView || albumHovered || albumFocused) return;
    albumTimer = window.setTimeout(() => showAlbumPhoto(albumIndex + 1), 5600);
  }

  function showAlbumPhoto(index) {
    const nextIndex = (index + albumSlides.length) % albumSlides.length;
    const stepForward = (nextIndex - albumIndex + albumSlides.length) % albumSlides.length === 1;
    if (stepForward && albumIndex === albumSlides.length - 1 && nextIndex === 0) albumVisualIndex = albumSlides.length + 1;
    else if (!stepForward && albumIndex === 0 && nextIndex === albumSlides.length - 1) albumVisualIndex = 0;
    else albumVisualIndex = nextIndex + 1;
    albumIndex = nextIndex;
    albumSlides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', String(i !== albumIndex));
      if (i === albumIndex) slide.removeAttribute('inert');
      else slide.setAttribute('inert', '');
    });
    albumVisualSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === albumVisualIndex));
    centerAlbumPhoto();
    albumDots.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('active', i === albumIndex);
      dot.setAttribute('aria-current', String(i === albumIndex));
    });
    albumCount.innerHTML = `<span>${String(albumIndex + 1).padStart(2, '0')}</span> <i>/</i> ${String(albumSlides.length).padStart(2, '0')}`;
    scheduleAlbumAutoplay();
  }

  albumSlides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'album-dot';
    dot.setAttribute('aria-label', `Show photo ${i + 1} of ${albumSlides.length}`);
    dot.addEventListener('click', () => showAlbumPhoto(i));
    albumDots.appendChild(dot);
  });

  document.querySelector('.album-arrow-prev').addEventListener('click', () => showAlbumPhoto(albumIndex - 1));
  document.querySelector('.album-arrow-next').addEventListener('click', () => showAlbumPhoto(albumIndex + 1));
  albumViewport.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showAlbumPhoto(albumIndex - 1);
    if (event.key === 'ArrowRight') showAlbumPhoto(albumIndex + 1);
  });
  albumViewport.addEventListener('pointerdown', event => { swipeStartX = event.clientX; });
  albumViewport.addEventListener('pointerup', event => {
    if (swipeStartX === null) return;
    const swipeDistance = event.clientX - swipeStartX;
    if (Math.abs(swipeDistance) > 45) showAlbumPhoto(albumIndex + (swipeDistance < 0 ? 1 : -1));
    swipeStartX = null;
  });
  albumViewport.addEventListener('pointercancel', () => { swipeStartX = null; });
  window.addEventListener('resize', () => centerAlbumPhoto(false));
  albumTrack.addEventListener('transitionend', event => {
    if (event.target !== albumTrack || event.propertyName !== 'transform') return;
    if (albumVisualIndex === 0) albumVisualIndex = albumSlides.length;
    else if (albumVisualIndex === albumSlides.length + 1) albumVisualIndex = 1;
    else return;
    albumVisualSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === albumVisualIndex));
    centerAlbumPhoto(false);
  });
  albumSlider.addEventListener('pointerenter', () => { albumHovered = true; scheduleAlbumAutoplay(); });
  albumSlider.addEventListener('pointerleave', () => { albumHovered = false; scheduleAlbumAutoplay(); });
  albumSlider.addEventListener('focusin', () => { albumFocused = true; scheduleAlbumAutoplay(); });
  albumSlider.addEventListener('focusout', event => {
    if (!albumSlider.contains(event.relatedTarget)) {
      albumFocused = false;
      scheduleAlbumAutoplay();
    }
  });
  document.addEventListener('visibilitychange', scheduleAlbumAutoplay);
  if ('IntersectionObserver' in window) {
    const albumObserver = new IntersectionObserver(entries => {
      albumInView = entries[0].isIntersecting;
      scheduleAlbumAutoplay();
    }, { threshold: .25 });
    albumObserver.observe(albumSlider);
  } else {
    albumInView = true;
  }
  showAlbumPhoto(0);
  centerAlbumPhoto(false);
}
