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
    bgCtx.fillStyle = '#f7dda0';
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
   FLOWER PETAL FALLING ANIMATION SYSTEM (ROSE & JASMINE PETALS)
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

class FlowerPetal {
  constructor() {
    this.reset(true);
  }
  reset(initial = false) {
    this.x = Math.random() * petalCanvas.width;
    this.y = initial ? Math.random() * petalCanvas.height : -30;
    this.size = Math.random() * 10 + 8;
    this.speedY = Math.random() * 1.2 + 0.6;
    this.speedX = Math.random() * 0.8 - 0.4;
    this.swaySpeed = Math.random() * 0.03 + 0.01;
    this.swayAngle = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.04;
    this.color = Math.random() > 0.4 ? '#f7d3d9' : '#fff4d6';
    this.opacity = Math.random() * 0.7 + 0.3;
  }
  update() {
    this.swayAngle += this.swaySpeed;
    this.x += Math.sin(this.swayAngle) * 0.8 + this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;

    if (this.y > petalCanvas.height + 40) {
      this.reset();
    }
  }
  draw() {
    pCtx.save();
    pCtx.translate(this.x, this.y);
    pCtx.rotate(this.rotation);
    pCtx.globalAlpha = this.opacity;
    pCtx.fillStyle = this.color;

    pCtx.beginPath();
    pCtx.moveTo(0, -this.size / 2);
    pCtx.bezierCurveTo(this.size / 2, -this.size / 2, this.size / 1.5, this.size / 2, 0, this.size);
    pCtx.bezierCurveTo(-this.size / 1.5, this.size / 2, -this.size / 2, -this.size / 2, 0, -this.size / 2);
    pCtx.fill();
    pCtx.restore();
  }
}

for (let i = 0; i < 40; i++) petals.push(new FlowerPetal());

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

// Configure robust audio properties for seamless continuous playing
bgMusic.loop = true;
bgMusic.volume = 0.75;

// Fallback loop event listener in case loop attribute is ignored by browser
bgMusic.addEventListener('ended', () => {
  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => {});
});

async function startContinuousMusic() {
  try {
    await bgMusic.play();
    musicBtn.classList.add('playing');
  } catch (err) {
    console.log("Audio play request waiting for interaction:", err);
  }
}

openInviteBtn.addEventListener('click', async () => {
  openingModal.classList.add('opened');
  document.body.classList.remove('locked');
  await startContinuousMusic();
});

musicBtn.addEventListener('click', async () => {
  if (bgMusic.paused) {
    await startContinuousMusic();
  } else {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
  }
});

// Resume playback seamlessly on user touch if audio is interrupted
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
   SCROLL REVEAL OBSERVER
   ------------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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
  grad.addColorStop(0, '#bf953f');
  grad.addColorStop(0.3, '#fcf6ba');
  grad.addColorStop(0.6, '#b38728');
  grad.addColorStop(1, '#aa771c');

  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, rect.width, rect.height);

  sCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
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

  scratchedPixels++;
  if (scratchedPixels > 28 && !isRevealed) {
    isRevealed = true;
    scratchCanvas.style.opacity = '0';
    document.getElementById('scratchInstruction').style.opacity = '0';
    triggerSparkleBurst(window.innerWidth / 2, window.innerHeight / 2);
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
   ENGRAVED CLASSIC RINGS SCROLL COLLISION & LOCK ANIMATION LOGIC
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

function triggerSparkleBurst(cx, cy) {
  for (let i = 0; i < 75; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 3;
    colParticles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 4 + 2,
      color: Math.random() > 0.4 ? '#f9e4b7' : '#ffffff',
      alpha: 1,
      decay: Math.random() * 0.03 + 0.015
    });
  }
}

function animateCollisionParticles() {
  colCtx.clearRect(0, 0, colCanvas.width, colCanvas.height);
  for (let i = colParticles.length - 1; i >= 0; i--) {
    const p = colParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.96;
    p.vy *= 0.96;
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
  const ringW = screenW >= 768 ? 125 : 95;
  const sideMargin = screenW >= 768 ? screenW * 0.07 : screenW * 0.04;

  const startXLeft = sideMargin;
  const startXRight = screenW - sideMargin - ringW;

  const targetXLeft = (screenW / 2) - ringW + 20;
  const targetXRight = (screenW / 2) - 20;

  const deltaLeft = targetXLeft - startXLeft;
  const deltaRight = targetXRight - startXRight;

  const ringStage = document.getElementById('ringSpotlightStage');
  let targetOffsetY = 0;
  if (ringStage) {
    const stageRect = ringStage.getBoundingClientRect();
    const initialRingY = screenH * 0.28;
    const stageCenterY = stageRect.top + (stageRect.height / 2);
    targetOffsetY = stageCenterY - initialRingY;
  }

  if (progress < 0.86) {
    hasCollided = false;
    lockedBadge.classList.remove('active');

    const travelP = progress / 0.86;
    const currentDxLeft = travelP * deltaLeft;
    const currentDxRight = travelP * deltaRight;

    const floatYLeft = Math.sin(progress * Math.PI * 5) * 14;
    const floatYRight = Math.cos(progress * Math.PI * 5) * 14;

    const rotL = progress * 360;
    const rotR = -progress * 360;

    ringLeft.style.transform = `translate3d(${currentDxLeft}px, ${floatYLeft}px, 0) rotate(${rotL}deg)`;
    ringRight.style.transform = `translate3d(${currentDxRight}px, ${floatYRight}px, 0) rotate(${rotR}deg)`;

  } else {
    const lockProgress = Math.min(1, (progress - 0.86) / 0.14);
    const easeLock = lockProgress * lockProgress * (3 - 2 * lockProgress);

    const currentDxLeft = deltaLeft;
    const currentDxRight = deltaRight;

    const floatYLeft = Math.sin(0.86 * Math.PI * 5) * 14;
    const floatYRight = Math.cos(0.86 * Math.PI * 5) * 14;

    const currentDyLeft = floatYLeft * (1 - easeLock) + targetOffsetY * easeLock;
    const currentDyRight = floatYRight * (1 - easeLock) + targetOffsetY * easeLock;

    const rotL = 360 + easeLock * 20;
    const rotR = -360 - easeLock * 20;

    ringLeft.style.transform = `translate3d(${currentDxLeft}px, ${currentDyLeft}px, 0) rotate(${rotL}deg)`;
    ringRight.style.transform = `translate3d(${currentDxRight}px, ${currentDyRight}px, 0) rotate(${rotR}deg)`;

    if (progress >= 0.93) {
      if (!hasCollided) {
        hasCollided = true;
        const ringStageRect = ringStage.getBoundingClientRect();
        triggerSparkleBurst(screenW / 2, ringStageRect.top + ringStageRect.height / 2);
        if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
      }
      lockedBadge.classList.add('active');
    } else {
      hasCollided = false;
      lockedBadge.classList.remove('active');
    }
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
