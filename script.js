/**
 * OUR GARDEN - Interactive Romantic Memory Experience
 * Pure Vanilla JavaScript (ES6+) - Mobile Responsive Optimization
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. DATA DEFINITIONS & STATE
     ========================================================================== */

  // Responsive coordinates optimized for mobile phone screens
  const ROSE_MEMORIES = [
    {
      id: 1,
      image: 'rose1.jpeg',
      text: "I'll always remember this day.\nYou looked so beautiful.",
      x: 8,
      y: 75
    },
    {
      id: 2,
      image: 'rose2.jpeg',
      text: "If I could relive one moment,\nI'd choose to stay beside you.",
      x: 25,
      y: 83
    },
    {
      id: 3,
      image: 'rose3.jpeg',
      text: "You were the home\nI never knew\nI was looking for.",
      x: 42,
      y: 68
    },
    {
      id: 4,
      image: 'rose4.jpeg',
      text: "I'm sorry\nI wasn't there\nwhen you needed me the most.",
      x: 58,
      y: 84
    },
    {
      id: 5,
      image: 'rose5.jpeg',
      text: "Every picture reminds me\nof a moment\nI'll never stop cherishing.",
      x: 75,
      y: 70
    },
    {
      id: 6,
      image: 'rose6.jpeg',
      text: "Please come back.",
      x: 88,
      y: 81
    }
  ];

  const visitedRoseIds = new Set();
  let isGardenFullyBloomed = false;

  /* ==========================================================================
     2. DOM ELEMENTS
     ========================================================================== */

  const plantsLayer = document.getElementById('plants-layer');
  const countDisplay = document.getElementById('roses-found-count');
  
  // Memory Modal Elements
  const memoryModal = document.getElementById('memory-modal');
  const modalImage = document.getElementById('modal-image');
  const modalText = document.getElementById('modal-text');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Final Celebration Modal Elements
  const finalModal = document.getElementById('final-modal');
  const finalCloseBtn = document.getElementById('final-close-btn');

  /* ==========================================================================
     3. GARDEN GENERATION
     ========================================================================== */

  function buildGarden() {
    const fragment = document.createDocumentFragment();

    const wildflowerColors = ['#f472b6', '#c084fc', '#fde047', '#60a5fa', '#ffffff'];
    const largeFlowerColors = ['#c084fc', '#fde047', '#818cf8', '#ffffff'];

    // --- Generate Ambient Wildflowers & Grass Tufts ---
    for (let i = 0; i < 55; i++) {
      const leftPercent = Math.random() * 96;
      const bottomPercent = Math.random() * 82; 
      const scale = 0.5 + Math.random() * 0.6;
      const swaySpeed = ['sway-slow', 'sway-medium', 'sway-fast'][Math.floor(Math.random() * 3)];
      const color = wildflowerColors[Math.floor(Math.random() * wildflowerColors.length)];

      const plantEl = document.createElement('div');
      plantEl.className = `plant-item ${swaySpeed}`;
      plantEl.style.left = `${leftPercent}%`;
      plantEl.style.bottom = `${bottomPercent}%`;
      plantEl.style.transform = `scale(${scale})`;

      if (i % 2 === 0) {
        plantEl.innerHTML = `
          <svg class="wildflower" width="22" height="36" viewBox="0 0 24 40">
            <path d="M12 40 Q10 25 12 12" stroke="#1e4d2b" stroke-width="2" fill="none"/>
            <circle cx="12" cy="10" r="6" fill="${color}" opacity="0.9"/>
            <circle cx="12" cy="10" r="2.5" fill="#fde047"/>
          </svg>
        `;
      } else {
        plantEl.innerHTML = `
          <svg class="grass-tuft" width="26" height="30" viewBox="0 0 30 35">
            <path d="M0 35 Q5 10 10 0 Q12 15 15 35 Q20 5 25 2 Q23 20 30 35 Z" fill="#234832"/>
          </svg>
        `;
      }
      fragment.appendChild(plantEl);
    }

    // --- Generate Large Non-Red Flowers ---
    for (let i = 0; i < 12; i++) {
      const leftPercent = 2 + Math.random() * 92;
      const bottomPercent = 12 + Math.random() * 50; 
      const color = largeFlowerColors[Math.floor(Math.random() * largeFlowerColors.length)];
      
      const largeFlowerEl = document.createElement('div');
      largeFlowerEl.className = 'large-decorative-flower sway-slow';
      largeFlowerEl.style.left = `${leftPercent}%`;
      largeFlowerEl.style.bottom = `${bottomPercent}%`;
      
      largeFlowerEl.innerHTML = `
        <svg viewBox="0 0 60 80">
          <path d="M30 80 Q28 50 30 30" stroke="#153e25" stroke-width="3" fill="none"/>
          <path d="M30 40 C15 30 5 45 15 60 C25 70 30 50 30 50" fill="#22543d" opacity="0.7"/>
          <path d="M30 40 C45 30 55 45 45 60 C35 70 30 50 30 50" fill="#22543d" opacity="0.7"/>
          <path d="M30 10 C20 10 10 20 10 30 Q10 50 30 60 Q50 50 50 30 C50 20 40 10 30 10 Z" fill="${color}" opacity="0.95"/>
          <circle cx="30" cy="25" r="7" fill="#fde047" opacity="0.6"/>
        </svg>
      `;
      fragment.appendChild(largeFlowerEl);
    }

    // --- Place the Interactive Red Roses ---
    ROSE_MEMORIES.forEach((roseData) => {
      const roseWrapper = document.createElement('div');
      roseWrapper.className = 'rose-wrapper sway-medium';
      roseWrapper.style.left = `${roseData.x}%`;
      roseWrapper.style.bottom = `${roseData.y}%`;
      roseWrapper.dataset.id = roseData.id;

      roseWrapper.innerHTML = `
        <div class="rose-sparkle"></div>
        <div class="rose-svg-container">
          <svg viewBox="0 0 60 80" width="100%" height="100%">
            <path d="M30 80 Q28 50 30 30" stroke="#153e25" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path d="M30 55 Q15 48 10 52 Q20 62 30 58" fill="#22543d" stroke="#123324" stroke-width="1"/>
            <path d="M30 42 Q45 35 50 39 Q40 49 30 45" fill="#22543d" stroke="#123324" stroke-width="1"/>
            
            <path d="M22 32 C15 20 22 10 30 15 C38 10 45 20 38 32 C30 38 22 32 22 32 Z" fill="#b91c1c"/>
            <path d="M16 26 C10 14 24 5 30 12 C36 5 50 14 44 26 C30 34 16 26 16 26 Z" fill="#dc2626"/>
            
            <path d="M20 22 C18 12 28 8 30 12 C32 8 42 12 40 22 C30 28 20 22 20 22 Z" fill="#e62e4d"/>
            <circle cx="30" cy="16" r="5" fill="#ff4d6d"/>
          </svg>
        </div>
      `;

      // Touch & Click trigger for Mobile Devices
      const handleTap = (e) => {
        e.preventDefault();
        openRoseMemory(roseData, roseWrapper);
      };

      roseWrapper.addEventListener('click', handleTap);
      fragment.appendChild(roseWrapper);
    });

    plantsLayer.appendChild(fragment);
  }

  /* ==========================================================================
     4. ROSE INTERACTION & MODALS
     ========================================================================== */

  function openRoseMemory(roseData, roseElement) {
    modalImage.src = roseData.image;
    modalText.textContent = roseData.text;

    memoryModal.classList.add('active');
    memoryModal.setAttribute('aria-hidden', 'false');

    spawnBurstPetals();

    if (!visitedRoseIds.has(roseData.id)) {
      visitedRoseIds.add(roseData.id);
      roseElement.classList.add('visited');
      countDisplay.textContent = visitedRoseIds.size;

      if (visitedRoseIds.size === 6 && !isGardenFullyBloomed) {
        triggerGardenBloom();
      }
    }
  }

  function closeModal() {
    memoryModal.classList.remove('active');
    memoryModal.setAttribute('aria-hidden', 'true');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  memoryModal.addEventListener('click', (e) => {
    if (e.target === memoryModal) closeModal();
  });

  /* ==========================================================================
     5. COMPLETION & CELEBRATION
     ========================================================================== */

  function triggerGardenBloom() {
    isGardenFullyBloomed = true;

    setTimeout(() => {
      document.body.classList.add('garden-bloomed');

      petalConfig.density = 55;
      petalConfig.speedMultiplier = 1.6;
      fireflyConfig.count = 60;
      initFireflies();

      finalModal.classList.add('active');
      finalModal.setAttribute('aria-hidden', 'false');
    }, 1000);
  }

  finalCloseBtn.addEventListener('click', () => {
    finalModal.classList.remove('active');
    finalModal.setAttribute('aria-hidden', 'true');
  });

  /* ==========================================================================
     6. CANVAS ANIMATIONS (60 FPS PERFORMANCE)
     ========================================================================== */

  const petalCanvas = document.getElementById('petal-canvas');
  const petalCtx = petalCanvas.getContext('2d');

  let width = (petalCanvas.width = window.innerWidth);
  let height = (petalCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = petalCanvas.width = window.innerWidth;
    height = petalCanvas.height = window.innerHeight;
    fireflyCanvas.width = width;
    fireflyCanvas.height = height;
  });

  const petalConfig = { density: 25, speedMultiplier: 1 };
  const petals = [];

  class Petal {
    constructor() { this.reset(); }

    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.size = 5 + Math.random() * 6;
      this.speedY = (0.8 + Math.random() * 1.4) * petalConfig.speedMultiplier;
      this.speedX = -0.4 + Math.random() * 0.8;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (-0.02 + Math.random() * 0.04);
      this.color = ['#fbcfe8', '#f472b6', '#e62e4d', '#fda4af'][Math.floor(Math.random() * 4)];
      this.opacity = 0.6 + Math.random() * 0.4;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.8 + this.speedX;
      this.angle += this.spin;
      if (this.y > height + 20) this.reset();
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 30; i++) {
    const p = new Petal();
    p.y = Math.random() * height; 
    petals.push(p);
  }

  function spawnBurstPetals() {
    for (let i = 0; i < 12; i++) {
      const p = new Petal();
      p.x = width / 2 + (Math.random() - 0.5) * 200;
      p.y = height / 2 + (Math.random() - 0.5) * 150;
      petals.push(p);
    }
  }

  function animatePetals() {
    petalCtx.clearRect(0, 0, width, height);
    while (petals.length < petalConfig.density) petals.push(new Petal());
    petals.forEach((p) => { p.update(); p.draw(petalCtx); });
    requestAnimationFrame(animatePetals);
  }

  // --- Fireflies Canvas ---
  const fireflyCanvas = document.getElementById('firefly-canvas');
  const fireflyCtx = fireflyCanvas.getContext('2d');
  fireflyCanvas.width = width;
  fireflyCanvas.height = height;

  const fireflyConfig = { count: 25 };
  let fireflies = [];

  class Firefly {
    constructor() {
      this.x = Math.random() * width;
      this.y = height * 0.3 + Math.random() * (height * 0.7);
      this.radius = 1 + Math.random() * 1.8;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = 0.3 + Math.random() * 0.5;
      this.alpha = Math.random();
      this.pulseSpeed = 0.01 + Math.random() * 0.02;
    }

    update() {
      this.angle += (Math.random() - 0.5) * 0.1;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha += this.pulseSpeed;
      if (this.alpha > 1 || this.alpha < 0) this.pulseSpeed = -this.pulseSpeed;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < height * 0.2) this.y = height;
      if (this.y > height) this.y = height * 0.2;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#fde047';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#fde047';
      ctx.fill();
      ctx.restore();
    }
  }

  function initFireflies() {
    fireflies = [];
    for (let i = 0; i < fireflyConfig.count; i++) fireflies.push(new Firefly());
  }

  function animateFireflies() {
    fireflyCtx.clearRect(0, 0, width, height);
    fireflies.forEach((f) => { f.update(); f.draw(fireflyCtx); });
    requestAnimationFrame(animateFireflies);
  }

  /* ==========================================================================
     7. INITIALIZATION
     ========================================================================== */

  buildGarden();
  initFireflies();
  animatePetals();
  animateFireflies();
});
