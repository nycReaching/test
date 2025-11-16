// Game UI Foundation - Main JavaScript
class GameUIFoundation {
    constructor() {
        this.stats = {
            score: 0,
            level: 1,
            coins: 100
        };
        this.particleSystem = null;
        this.bgEffect = null;
        this.init();
    }

    init() {
        this.setupGameGrid();
        this.setupParticleSystem();
        this.setupBackgroundEffects();
        this.setupEventListeners();
        this.startAnimations();
        this.updateStats();
    }

    setupGameGrid() {
        const grid = document.getElementById('gameGrid');
        grid.innerHTML = '';
        
        // Create 96 grid cells (8x12)
        for (let i = 0; i < 96; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            
            // Add click handler with ripple effect
            cell.addEventListener('click', (e) => this.handleCellClick(e, i));
            
            // Add random content to some cells for demo
            if (Math.random() > 0.7) {
                cell.innerHTML = '<div style="width: 20px; height: 20px; background: #00d4ff; border-radius: 50%; opacity: 0.6;"></div>';
            }
            
            grid.appendChild(cell);
        }
    }

    setupParticleSystem() {
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle system
        this.particles = [];
        this.createParticle = (x, y, color = '#00d4ff') => ({
            x, y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
            decay: 0.02,
            color,
            size: Math.random() * 4 + 2
        });

        this.animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;
                p.size *= 0.98;

                if (p.life <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            
            requestAnimationFrame(this.animateParticles);
        };
        
        this.animateParticles();
    }

    setupBackgroundEffects() {
        // Create animated background using p5.js
        const bgSketch = (p) => {
            let time = 0;
            
            p.setup = () => {
                const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                canvas.parent('bgEffects');
                p.noFill();
            };
            
            p.draw = () => {
                p.clear();
                p.stroke(0, 212, 255, 30);
                p.strokeWeight(1);
                
                for (let x = 0; x < p.width; x += 50) {
                    for (let y = 0; y < p.height; y += 50) {
                        const wave = p.sin(time + x * 0.01 + y * 0.01) * 20;
                        p.circle(x, y, 20 + wave);
                    }
                }
                
                time += 0.02;
            };
            
            p.windowResized = () => {
                p.resizeCanvas(window.innerWidth, window.innerHeight);
            };
        };
        
        new p5(bgSketch);
    }

    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Escape':
                    this.closeAllPanels();
                    break;
                case 'i':
                    this.toggleInventory();
                    break;
                case 'a':
                    this.toggleAchievements();
                    break;
            }
        });

        // Touch gestures for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Swipe gestures
            if (Math.abs(deltaX) > 100) {
                if (deltaX > 0) {
                    this.toggleInventory();
                } else {
                    this.toggleAchievements();
                }
            }
        });
    }

    handleCellClick(event, index) {
        const cell = event.target.closest('.grid-cell');
        
        // Add active state
        cell.classList.add('active');
        setTimeout(() => cell.classList.remove('active'), 300);
        
        // Create particle explosion
        const rect = cell.getBoundingClientRect();
        const canvasRect = document.getElementById('particleCanvas').getBoundingClientRect();
        const x = rect.left + rect.width / 2 - canvasRect.left;
        const y = rect.top + rect.height / 2 - canvasRect.top;
        
        for (let i = 0; i < 10; i++) {
            this.particles.push(this.createParticle(x, y));
        }
        
        // Update stats
        this.stats.score += 10;
        this.updateStats();
        
        // Add bounce animation
        cell.classList.add('bounce-animation');
        setTimeout(() => cell.classList.remove('bounce-animation'), 1000);
        
        // Show notification
        showNotification(`Cell ${index} activated! +10 points`);
    }

    startAnimations() {
        // Animate stats on load
        anime({
            targets: '.stat-item',
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutElastic(1, .8)'
        });

        // Animate grid cells
        anime({
            targets: '.grid-cell',
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(20, {grid: [8, 12], from: 'center'}),
            duration: 600,
            easing: 'easeOutQuart'
        });

        // Animate side panels
        anime({
            targets: '.side-panel',
            translateX: [100, 0],
            opacity: [0, 1],
            delay: 1000,
            duration: 800,
            easing: 'easeOutQuart'
        });

        // Animate bottom bar
        anime({
            targets: '.bottom-btn',
            translateY: [100, 0],
            opacity: [0, 1],
            delay: anime.stagger(100, {start: 1200}),
            duration: 600,
            easing: 'easeOutQuart'
        });

        // Pulse animation for primary button
        setInterval(() => {
            const primaryBtn = document.querySelector('.bottom-btn.primary');
            primaryBtn.classList.add('pulse-animation');
            setTimeout(() => primaryBtn.classList.remove('pulse-animation'), 2000);
        }, 5000);
    }

    updateStats() {
        // Animate stat values
        Object.keys(this.stats).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                anime({
                    targets: element,
                    innerHTML: [parseInt(element.textContent), this.stats[key]],
                    duration: 1000,
                    round: 1,
                    easing: 'easeOutQuart'
                });
            }
        });
    }

    // Panel controls
    toggleSettings() {
        const panel = document.getElementById('settingsPanel');
        panel.classList.toggle('open');
    }

    toggleInventory() {
        const panel = document.getElementById('inventoryPanel');
        panel.classList.toggle('open');
        this.closeOtherPanels('inventory');
    }

    toggleAchievements() {
        const panel = document.getElementById('achievementsPanel');
        panel.classList.toggle('open');
        this.closeOtherPanels('achievements');
    }

    closeOtherPanels(except) {
        const panels = {
            'inventory': document.getElementById('inventoryPanel'),
            'achievements': document.getElementById('achievementsPanel')
        };
        
        Object.keys(panels).forEach(key => {
            if (key !== except) {
                panels[key].classList.remove('open');
            }
        });
    }

    closeAllPanels() {
        document.querySelectorAll('.slide-panel').forEach(panel => {
            panel.classList.remove('open');
        });
    }

    // Primary action
    triggerPrimaryAction() {
        // Create celebration effect
        const canvas = document.getElementById('particleCanvas');
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * 50;
            const y = centerY + Math.sin(angle) * 50;
            this.particles.push(this.createParticle(x, y, '#ffb347'));
        }
        
        // Update stats
        this.stats.score += 50;
        this.stats.coins += 5;
        this.updateStats();
        
        // Show notification
        showNotification('Primary action triggered! +50 points, +5 coins');
        
        // Animate primary button
        anime({
            targets: '.bottom-btn.primary',
            scale: [1, 1.2, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
    }
}

// Notification system
function showNotification(message) {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    
    text.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Global functions for HTML onclick handlers
function toggleSettings() {
    gameUI.toggleSettings();
}

function triggerPrimaryAction() {
    gameUI.triggerPrimaryAction();
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    
    text.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize game UI when page loads
let gameUI;
document.addEventListener('DOMContentLoaded', () => {
    gameUI = new GameUIFoundation();
    
    // Add some demo interactions
    setTimeout(() => {
        showNotification('Welcome to Game UI Foundation! Tap cells to interact.');
    }, 2000);
    
    // Simulate stat updates over time
    setInterval(() => {
        gameUI.stats.coins += Math.floor(Math.random() * 3);
        gameUI.updateStats();
    }, 10000);
});

// Handle window resize
window.addEventListener('resize', () => {
    if (gameUI && gameUI.particleSystem) {
        const canvas = document.getElementById('particleCanvas');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
});