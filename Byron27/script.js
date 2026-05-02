// BYRON 27: ESCAPE PROTOCOL - Main Game Engine
// =============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ===== GAME STATE =====
const gameState = {
  gameActive: false,
  currentChamber: 1,
  totalChambers: 8,
  isPaused: false,
  timeElapsed: 0,
  score: 0,
  health: 100,
  maxHealth: 100
};

// ===== PLAYER OBJECT =====
const player = {
  x: 100,
  y: 300,
  width: 20,
  height: 30,
  velX: 0,
  velY: 0,
  speed: 5,
  jumpForce: 15,
  isJumping: false,
  isWallRunning: false,
  canDoubleJump: true,
  kem: 100,
  maxKem: 100,
  kemRegenRate: 0.3,
  
  draw() {
    // Draw Byron (lab mouse with glowing sapatos)
    ctx.save();
    ctx.translate(this.x, this.y);
    
    // Body
    ctx.fillStyle = '#b0b0b0';
    ctx.fillRect(-8, -15, 16, 20);
    
    // Head
    ctx.fillStyle = '#888888';
    ctx.beginPath();
    ctx.arc(0, -15, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(-4, -17, 2, 2);
    ctx.fillRect(2, -17, 2, 2);
    
    // Glowing Sapatos (shoes)
    ctx.fillStyle = this.getSapatoColor();
    ctx.shadowColor = this.getSapatoColor();
    ctx.shadowBlur = 15;
    ctx.fillRect(-10, 8, 8, 6);
    ctx.fillRect(2, 8, 8, 6);
    
    ctx.restore();
  },
  
  getSapatoColor() {
    const kemRatio = this.kem / this.maxKem;
    if (kemRatio > 0.75) return '#ff26d1'; // Magenta peak
    if (kemRatio > 0.5) return '#39f0ff'; // Cyan optimal
    if (kemRatio > 0.25) return '#ffcc00'; // Yellow moderate
    return '#ff4444'; // Red critical
  },
  
  update(keys) {
    if (!gameState.gameActive || gameState.isPaused) return;
    
    const gravity = 0.6;
    
    // Horizontal movement
    this.velX *= 0.85; // friction
    if (keys['a'] || keys['ArrowLeft']) {
      this.velX = Math.max(this.velX - 0.5, -this.speed);
    }
    if (keys['d'] || keys['ArrowRight']) {
      this.velX = Math.min(this.velX + 0.5, this.speed);
    }
    
    // Sprint
    if ((keys['Shift'] || keys['shift']) && this.kem >= 2) {
      this.velX *= 1.5;
      this.kem -= 2 / 60; // Per frame
    }
    
    // Vertical movement
    this.velY += gravity;
    this.velY = Math.min(this.velY, 20); // Terminal velocity
    
    // Update position
    this.x += this.velX;
    this.y += this.velY;
    
    // KEM Regeneration
    if (Math.abs(this.velY) > 5) {
      // Falling regenerates KEM
      this.kem = Math.min(this.kem + 0.5, this.maxKem);
    } else {
      this.kem = Math.min(this.kem + this.kemRegenRate, this.maxKem);
    }
    
    // Boundary checks
    if (this.x - this.width / 2 < 0) this.x = this.width / 2;
    if (this.x + this.width / 2 > canvas.width) this.x = canvas.width - this.width / 2;
    if (this.y > canvas.height) this.takeDamage(50);
  },
  
  jump() {
    if (this.kem >= 5) {
      this.velY = -this.jumpForce;
      this.isJumping = true;
      this.canDoubleJump = true;
      this.kem -= 5;
    }
  },
  
  doubleJump() {
    if (this.canDoubleJump && this.isJumping && this.kem >= 15) {
      this.velY = -this.jumpForce * 1.5;
      this.canDoubleJump = false;
      this.kem -= 15;
    }
  },
  
  dash(direction) {
    if (this.kem >= 30) {
      this.velX = direction * 15;
      this.velY = -5;
      this.kem -= 30;
      
      // Particle effect
      createParticles(this.x, this.y, 8, '#39f0ff');
    }
  },
  
  takeDamage(amount) {
    gameState.health -= amount;
    createParticles(this.x, this.y, 12, '#ff4444');
    
    if (gameState.health <= 0) {
      endGame();
    }
  }
};

// ===== PARTICLES =====
const particles = [];

function createParticles(x, y, count, color) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 30,
      color: color
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2; // gravity
    p.life--;
    
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  for (const p of particles) {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life / 30;
    ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
  }
  ctx.globalAlpha = 1;
}

// ===== HAZARDS =====
const hazards = [];
const platforms = [];

function createChamber(chamberNum) {
  hazards.length = 0;
  platforms.length = 0;
  
  // Base platform
  platforms.push({ x: 0, y: canvas.height - 40, width: canvas.width, height: 40, type: 'ground' });
  
  if (chamberNum === 1) {
    // Training chamber - simple obstacles, REACHABLE
    platforms.push({ x: 150, y: canvas.height - 120, width: 120, height: 20, type: 'platform' });
    platforms.push({ x: 350, y: canvas.height - 200, width: 120, height: 20, type: 'platform' });
    platforms.push({ x: 550, y: canvas.height - 280, width: 120, height: 20, type: 'platform' });
    platforms.push({ x: 750, y: canvas.height - 360, width: 120, height: 20, type: 'platform' });
    
    // Exit
    platforms.push({ x: canvas.width - 150, y: canvas.height - 440, width: 120, height: 80, type: 'exit' });
  } else if (chamberNum === 2) {
    // More complex
    platforms.push({ x: 80, y: canvas.height - 100, width: 100, height: 20, type: 'platform' });
    platforms.push({ x: 250, y: canvas.height - 160, width: 100, height: 20, type: 'platform' });
    platforms.push({ x: 420, y: canvas.height - 220, width: 100, height: 20, type: 'platform' });
    platforms.push({ x: 590, y: canvas.height - 280, width: 100, height: 20, type: 'platform' });
    platforms.push({ x: 760, y: canvas.height - 340, width: 100, height: 20, type: 'platform' });
    
    // Laser hazards
    hazards.push({ x: 200, y: canvas.height - 220, width: 20, height: 120, type: 'laser' });
    hazards.push({ x: 550, y: canvas.height - 180, width: 20, height: 150, type: 'laser' });
    
    platforms.push({ x: canvas.width - 120, y: canvas.height - 400, width: 100, height: 80, type: 'exit' });
  } else if (chamberNum >= 3) {
    // Higher difficulty
    platforms.push({ x: 40, y: canvas.height - 100, width: 90, height: 20, type: 'platform' });
    platforms.push({ x: 200, y: canvas.height - 160, width: 90, height: 20, type: 'platform' });
    platforms.push({ x: 360, y: canvas.height - 220, width: 90, height: 20, type: 'platform' });
    platforms.push({ x: 520, y: canvas.height - 280, width: 90, height: 20, type: 'platform' });
    platforms.push({ x: 680, y: canvas.height - 340, width: 90, height: 20, type: 'platform' });
    platforms.push({ x: 840, y: canvas.height - 400, width: 90, height: 20, type: 'platform' });
    
    // Multiple hazards
    hazards.push({ x: 120, y: canvas.height - 220, width: 25, height: 120, type: 'laser' });
    hazards.push({ x: 340, y: canvas.height - 180, width: 25, height: 150, type: 'laser' });
    hazards.push({ x: 620, y: canvas.height - 140, width: 25, height: 180, type: 'laser' });
    
    // Spike pits
    hazards.push({ x: 250, y: canvas.height - 40, width: 70, height: 40, type: 'spike' });
    hazards.push({ x: 550, y: canvas.height - 40, width: 70, height: 40, type: 'spike' });
    
    platforms.push({ x: canvas.width - 120, y: canvas.height - 460, width: 100, height: 80, type: 'exit' });
  }
}

// ===== COLLISION DETECTION =====
function checkCollisions() {
  // Platform collisions
  for (const platform of platforms) {
    if (checkAABB(player, platform)) {
      if (player.velY > 0 && player.y - player.height / 2 < platform.y + platform.height / 2) {
        // Landing on platform
        player.y = platform.y - player.height / 2;
        player.velY = 0;
        player.isJumping = false;
        player.canDoubleJump = true;
      }
    }
  }
  
  // Hazard collisions
  for (const hazard of hazards) {
    if (checkAABB(player, hazard)) {
      if (hazard.type === 'laser' || hazard.type === 'spike') {
        player.takeDamage(25);
      }
    }
  }
  
  // Exit collision
  for (const platform of platforms) {
    if (platform.type === 'exit' && checkAABB(player, platform)) {
      nextChamber();
    }
  }
}

function checkAABB(a, b) {
  return a.x - a.width / 2 < b.x + b.width &&
         a.x + a.width / 2 > b.x &&
         a.y - a.height / 2 < b.y + b.height &&
         a.y + a.height / 2 > b.y;
}

// ===== RENDERING =====
function render() {
  // Clear canvas
  ctx.fillStyle = 'rgba(7, 10, 18, 0.9)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(10, 16, 32, 0.5)');
  gradient.addColorStop(1, 'rgba(8, 12, 22, 0.5)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw platforms
  for (const platform of platforms) {
    if (platform.type === 'ground') {
      ctx.fillStyle = '#333333';
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      // Grid pattern
      ctx.strokeStyle = '#555555';
      ctx.lineWidth = 1;
      for (let x = platform.x; x < platform.x + platform.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, platform.y);
        ctx.lineTo(x, platform.y + platform.height);
        ctx.stroke();
      }
    } else if (platform.type === 'platform') {
      ctx.fillStyle = '#39f0ff';
      ctx.shadowColor = 'rgba(57, 240, 255, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      ctx.shadowColor = 'transparent';
    } else if (platform.type === 'exit') {
      ctx.fillStyle = '#9dff57';
      ctx.shadowColor = 'rgba(157, 255, 87, 0.6)';
      ctx.shadowBlur = 15;
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      ctx.fillStyle = '#070a12';
      ctx.font = 'bold 14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('EXIT', platform.x + platform.width / 2, platform.y + platform.height / 2 + 5);
      ctx.shadowColor = 'transparent';
    }
  }
  
  // Draw hazards
  for (const hazard of hazards) {
    if (hazard.type === 'laser') {
      ctx.fillStyle = '#ff4444';
      ctx.shadowColor = 'rgba(255, 68, 68, 0.8)';
      ctx.shadowBlur = 20;
      // Pulsing effect
      const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
      ctx.globalAlpha = pulse;
      ctx.fillRect(hazard.x, hazard.y, hazard.width, hazard.height);
      ctx.globalAlpha = 1;
      ctx.shadowColor = 'transparent';
    } else if (hazard.type === 'spike') {
      ctx.fillStyle = '#ff6600';
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(hazard.x + i * 20, hazard.y + hazard.height);
        ctx.lineTo(hazard.x + i * 20 + 10, hazard.y);
        ctx.lineTo(hazard.x + i * 20 + 20, hazard.y + hazard.height);
        ctx.fill();
      }
    }
  }
  
  // Draw player
  player.draw();
  
  // Draw particles
  drawParticles();
}

// ===== UI UPDATES =====
function updateUI() {
  document.getElementById('chamber-num').textContent = gameState.currentChamber;
  document.getElementById('score-display').textContent = gameState.score;
  document.getElementById('health-display').textContent = Math.max(0, Math.floor(gameState.health));
  
  const kemPercent = (player.kem / player.maxKem) * 100;
  document.getElementById('kem-bar').style.width = kemPercent + '%';
  document.getElementById('kem-text').textContent = Math.floor(player.kem);
  
  const minutes = Math.floor(gameState.timeElapsed / 60);
  const seconds = Math.floor(gameState.timeElapsed % 60);
  document.getElementById('time-display').textContent = 
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// ===== GAME LOOP =====
let lastTime = Date.now();

function gameLoop() {
  const currentTime = Date.now();
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  
  if (gameState.gameActive && !gameState.isPaused) {
    gameState.timeElapsed += deltaTime;
    gameState.score = Math.floor(gameState.timeElapsed * 10);
    
    player.update(keysPressed);
    checkCollisions();
    updateParticles();
  }
  
  render();
  updateUI();
  requestAnimationFrame(gameLoop);
}

// ===== INPUT HANDLING =====
const keysPressed = {};

window.addEventListener('keydown', (e) => {
  keysPressed[e.key] = true;
  
  if (e.key === ' ' || e.code === 'Space') {
    e.preventDefault();
    if (!player.isJumping) {
      player.jump();
    } else {
      player.doubleJump();
    }
  }
  
  if (e.key === 'e' || e.key === 'E') {
    player.dash(keysPressed['d'] ? 1 : -1);
  }
  
  if (e.key === 'Escape') {
    if (gameState.gameActive) {
      togglePause();
    }
  }
});

window.addEventListener('keyup', (e) => {
  keysPressed[e.key] = false;
});

// ===== MENU MANAGEMENT =====
function showMenu(menuId) {
  document.querySelectorAll('.menu-screen').forEach(menu => {
    menu.classList.remove('active');
  });
  if (menuId) {
    const menu = document.getElementById(menuId);
    if (menu) menu.classList.add('active');
  }
}

function startGame() {
  gameState.gameActive = true;
  gameState.isPaused = false;
  gameState.currentChamber = 1;
  gameState.health = 100;
  gameState.score = 0;
  gameState.timeElapsed = 0;
  player.x = 50;
  player.y = canvas.height - 100;
  player.velX = 0;
  player.velY = 0;
  player.kem = 100;
  particles.length = 0;
  createChamber(1);
  showMenu('');
  gameLoop();
}

function togglePause() {
  gameState.isPaused = !gameState.isPaused;
  if (gameState.isPaused) {
    showMenu('pause-menu');
  } else {
    showMenu('');
  }
}

function nextChamber() {
  gameState.currentChamber++;
  if (gameState.currentChamber > gameState.totalChambers) {
    // Victory!
    showVictory();
  } else {
    // Reset for next chamber
    player.x = 50;
    player.y = canvas.height - 100;
    player.velX = 0;
    player.velY = 0;
    player.kem = 100;
    player.health = Math.min(100, gameState.health + 30);
    createChamber(gameState.currentChamber);
  }
}

function endGame() {
  gameState.gameActive = false;
  document.getElementById('gameover-chamber').textContent = gameState.currentChamber;
  const minutes = Math.floor(gameState.timeElapsed / 60);
  const seconds = Math.floor(gameState.timeElapsed % 60);
  document.getElementById('gameover-time').textContent = 
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('gameover-score').textContent = gameState.score;
  showMenu('gameover-menu');
}

function showVictory() {
  gameState.gameActive = false;
  document.getElementById('victory-chamber').textContent = gameState.currentChamber - 1;
  const minutes = Math.floor(gameState.timeElapsed / 60);
  const seconds = Math.floor(gameState.timeElapsed % 60);
  document.getElementById('victory-time').textContent = 
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('victory-score').textContent = gameState.score;
  showMenu('victory-menu');
}

// ===== BUTTON LISTENERS =====
document.getElementById('btn-play').addEventListener('click', startGame);
document.getElementById('btn-continue').addEventListener('click', startGame);
document.getElementById('btn-resume').addEventListener('click', togglePause);
document.getElementById('btn-restart').addEventListener('click', () => {
  createChamber(gameState.currentChamber);
  gameState.isPaused = false;
  showMenu('');
});
document.getElementById('btn-menu').addEventListener('click', () => showMenu('main-menu'));
document.getElementById('btn-retry').addEventListener('click', () => {
  createChamber(gameState.currentChamber);
  gameState.health = 100;
  player.x = 50;
  player.y = canvas.height - 100;
  gameState.isPaused = false;
  gameState.gameActive = true;
  showMenu('');
});
document.getElementById('btn-menu-fail').addEventListener('click', () => showMenu('main-menu'));
document.getElementById('btn-next').addEventListener('click', () => {
  gameState.health = 100;
  player.x = 50;
  player.y = canvas.height - 100;
  createChamber(gameState.currentChamber);
  gameState.gameActive = true;
  showMenu('');
});
document.getElementById('btn-menu-victory').addEventListener('click', () => showMenu('main-menu'));

// Start
showMenu('main-menu');
requestAnimationFrame(gameLoop);
