// ============================================
// NEUROHACK QUIZ - ANIMATIONS & EFFECTS
// ============================================

// Animações de transição entre telas
function animateScreenTransition(fromScreen, toScreen) {
    const from = document.getElementById(fromScreen);
    const to = document.getElementById(toScreen);
    
    if (!from || !to) return;
    
    from.classList.add('fade-out');
    
    setTimeout(() => {
        from.classList.remove('active', 'fade-out');
        to.classList.add('active', 'fade-in');
        
        setTimeout(() => {
            to.classList.remove('fade-in');
        }, 500);
    }, 500);
}

// Animação de typewriter effect
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    element.style.borderRight = '2px solid var(--color-secondary)';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }, speed);
}

// Animação de shake para elementos urgentes
function shakeElement(element) {
    element.classList.add('shake-animation');
    setTimeout(() => {
        element.classList.remove('shake-animation');
    }, 500);
}

// Animação de pulso para elementos importantes
function pulseElement(element, duration = 2000) {
    element.classList.add('pulse-animation');
    setTimeout(() => {
        element.classList.remove('pulse-animation');
    }, duration);
}

// Animação de heartbeat para elementos de ansiedade
function heartbeatElement(element) {
    element.classList.add('heartbeat-animation');
}

// Criar efeito de partículas douradas
function createGoldParticles(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animationDelay = `${i * 0.05}s`;
        
        // Posição aleatória inicial
        const angle = (Math.PI * 2 * i) / count;
        const distance = 20 + Math.random() * 30;
        particle.style.setProperty('--start-x', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--start-y', `${Math.sin(angle) * distance}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Animação de progresso suave
function animateProgress(element, targetValue, duration = 500) {
    const startValue = parseFloat(element.style.width) || 0;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (targetValue - startValue) * eased;
        
        element.style.width = `${currentValue}%`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Animação de contagem regressiva
function animateCountdown(element, startValue, endValue, duration = 1000) {
    const startTime = Date.now();
    const difference = endValue - startValue;
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + difference * eased);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = endValue;
        }
    }
    
    update();
}

// Efeito de glow pulsante
function glowPulse(element, color = 'rgba(255, 215, 0, 0.6)') {
    element.classList.add('glow-animation');
    element.style.setProperty('--glow-color', color);
}

// Animação de slide para perguntas
function slideQuestion(direction = 'right') {
    const container = document.getElementById('question-container');
    if (!container) return;
    
    container.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');
    
    setTimeout(() => {
        container.classList.remove('slide-in-right', 'slide-in-left');
    }, 500);
}

// Efeito de vibração no mobile
function vibrate(pattern = [50]) {
    if (navigator.vibrate) {
        navigator.vibrate(pattern);
    }
}

// Animação de loading spinner
function showLoading(element) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    element.appendChild(spinner);
    
    return () => {
        spinner.remove();
    };
}

// Animação de revelação gradual
function revealElement(element, delay = 0) {
    setTimeout(() => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    }, delay);
}

// Animação de número incrementando
function animateNumber(element, start, end, duration = 1000) {
    const startTime = Date.now();
    const difference = end - start;
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(start + difference * progress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end;
        }
    }
    
    update();
}

// Efeito de parallax suave
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Inicializar animações ao carregar
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar efeitos de hover aos botões
    const buttons = document.querySelectorAll('.btn-primary, .btn-cta, .option-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            createGoldParticles(
                btn.getBoundingClientRect().left + btn.offsetWidth / 2,
                btn.getBoundingClientRect().top + btn.offsetHeight / 2,
                5
            );
        });
    });
    
    // Inicializar parallax se necessário
    // initParallax();
});

// Exportar funções
window.animations = {
    animateScreenTransition,
    typewriterEffect,
    shakeElement,
    pulseElement,
    heartbeatElement,
    createGoldParticles,
    animateProgress,
    animateCountdown,
    glowPulse,
    slideQuestion,
    vibrate,
    showLoading,
    revealElement,
    animateNumber
};

