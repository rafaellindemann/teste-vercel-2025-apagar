/* ==========================================
   🎨 FIRULAS - JavaScript Magic!
   ========================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1500);

    // Initialize all features
    initParticles();
    initThemeToggle();
    initScrollEffects();
    initCounters();
    initNavigation();
    initFormEffects();
});

// ========== Particle System ==========
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const colors = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, colors);
    }
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 15 + 5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${Math.random() * 0.3 + 0.1};
    `;
    
    container.appendChild(particle);
}

// ========== Theme Toggle ==========
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const toggleIcon = themeToggle?.querySelector('.toggle-icon');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(toggleIcon, savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(toggleIcon, newTheme);
            
            // Add a little animation
            themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }
}

function updateThemeIcon(icon, theme) {
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ========== Scroll Effects ==========
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
        
        // Parallax effect for floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${window.scrollY * speed}px)`;
        });
    });
    
    // Scroll to top functionality
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                
                // Trigger counter animation if element has counter class
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.feature-card, .interactive-card, .stat-item, .contact-form').forEach(el => {
        observer.observe(el);
    });
}

// ========== Counter Animation ==========
function initCounters() {
    // Initial counters that are visible on load
    const visibleCounters = document.querySelectorAll('.hero .counter');
    visibleCounters.forEach(counter => animateCounter(counter));
}

function animateCounter(element) {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';
    
    const target = parseInt(element.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

// ========== Navigation ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========== Form Effects ==========
function initFormEffects() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>⏳ Enviando...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>✅ Enviado com Sucesso!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)';
                
                // Reset form
                form.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // Add focus effects to inputs
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// ========== 3D Card Effect ==========
document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========== Easter Egg - Konami Code ==========
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateRainbowMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateRainbowMode() {
    document.body.style.animation = 'rainbowBg 2s linear infinite';
    
    // Add rainbow keyframes if not exists
    if (!document.getElementById('rainbow-style')) {
        const style = document.createElement('style');
        style.id = 'rainbow-style';
        style.textContent = `
            @keyframes rainbowBg {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show celebration
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉🎊🥳 MODO FESTA ATIVADO! 🥳🎊🎉';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        font-weight: bold;
        padding: 2rem;
        background: white;
        border-radius: 1rem;
        z-index: 10000;
        animation: bounce 0.5s ease infinite;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
        document.body.style.animation = '';
    }, 5000);
}

// ========== Confetti Effect on Click ==========
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        createConfetti(e.clientX, e.clientY);
    });
});

function createConfetti(x, y) {
    const colors = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 10000;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        let rotation = 0;
        
        const animate = () => {
            posX += vx * 0.02;
            posY += vy * 0.02 + 5;
            opacity -= 0.02;
            rotation += 10;
            
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// ========== Cursor Trail Effect ==========
let isTrailEnabled = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 't' && e.ctrlKey) {
        isTrailEnabled = !isTrailEnabled;
        console.log(isTrailEnabled ? '✨ Cursor trail enabled!' : '❌ Cursor trail disabled');
    }
});

document.addEventListener('mousemove', (e) => {
    if (!isTrailEnabled) return;
    
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        border-radius: 50%;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        pointer-events: none;
        z-index: 10000;
        opacity: 1;
        transition: all 0.5s ease;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 10);
    
    setTimeout(() => trail.remove(), 500);
});

// ========== Console Welcome Message ==========
console.log(`
%c🎨 Firulas - Site de Teste Vercel
%c
✨ Bem-vindo ao código do site mais cheio de firulas da internet!
🎮 Easter Egg: Digite o Konami Code para ativar o Modo Festa!
   ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️
🖱️ Ctrl+T: Ativar/Desativar rastro do cursor
💜 Feito com amor para testar deploy na Vercel!
`, 'font-size: 24px; font-weight: bold; color: #6366f1;', 'font-size: 14px; color: #64748b;');
