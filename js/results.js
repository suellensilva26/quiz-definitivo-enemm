// ============================================
// NEUROHACK QUIZ - RESULTS & PROFILES
// ============================================

const PROFILES = {
    LOW: {
        min: 0,
        max: 150,
        icon: "🎯",
        title: "CÉREBRO OTIMIZADO",
        subtitle: "Você está no caminho certo, mas pode acelerar",
        description: "Seus hábitos estão bons, mas o NeuroHack pode levar você ao próximo nível. Com os padrões secretos, você vai de bom para excepcional.",
        color: "#4ECDC4",
        headline: "Você está quase lá! Falta só o último empurrão...",
        solutions: [
            "🎯 Acesso ao maior sistema de aprovação já desenvolvido",
            "💎 Abas premium revolucionárias com conteúdo exclusivo",
            "📚 8 ebooks gratuitos com os maiores macetes e hacks das provas",
            "🔄 Padrões que se repetem todos os anos e cobrem 45% das provas",
            "✍️ 3 modelos de redações nota 1000 validados por corretores oficiais",
            "🤖 IA desvenda 3 possíveis temas da redação 2024 baseado em pesquisas avançadas",
            "🎲 Técnicas infalíveis de chutes inteligentes que aumentam em 30% sua chance",
            "🧠 Sistema de memorização científica com repetição espaçada automática",
            "⚡ Estratégias de otimização para ir de bom para excepcional",
            "🔐 Acesso exclusivo a questões-chave dos últimos 25 anos do ENEM"
        ]
    },
    MEDIUM: {
        min: 151,
        max: 350,
        icon: "⚠️",
        title: "CÉREBRO EM ALERTA",
        subtitle: "Você está na zona de perigo - ação urgente necessária",
        description: "Seu cérebro está lutando contra métodos ineficazes. Você tem potencial, mas está desperdiçando 70% dele. O NeuroHack vai corrigir isso.",
        color: "#FFA500",
        headline: "Situação controlável, mas ação imediata necessária...",
        solutions: [
            "🎯 Acesso ao maior sistema de aprovação já desenvolvido",
            "💎 Abas premium revolucionárias com conteúdo exclusivo",
            "📚 8 ebooks gratuitos com os maiores macetes e hacks das provas",
            "🔄 Padrões que se repetem todos os anos e cobrem 45% das provas",
            "✍️ 3 modelos de redações nota 1000 validados por corretores oficiais",
            "🤖 IA desvenda 3 possíveis temas da redação 2024 baseado em pesquisas avançadas",
            "🎲 Técnicas infalíveis de chutes inteligentes que aumentam em 30% sua chance",
            "🔧 Correção completa dos métodos de estudo ineficazes",
            "📊 Sistema de repetição espaçada científica personalizado",
            "🚀 Eliminação da procrastinação com técnicas neurológicas comprovadas"
        ]
    },
    HIGH: {
        min: 351,
        max: 550,
        icon: "🚨",
        title: "CÉREBRO EM PÂNICO",
        subtitle: "Situação crítica - transformação urgente necessária",
        description: "Você é o perfil exato que o NeuroHack foi criado para salvar. Procrastinador, ansioso, sem método. MAS ainda dá tempo de virar o jogo completamente.",
        color: "#FF6B6B",
        headline: "Código amarelo! Ainda dá para virar o jogo...",
        solutions: [
            "🎯 Acesso ao maior sistema de aprovação já desenvolvido",
            "💎 Abas premium revolucionárias com conteúdo exclusivo",
            "📚 8 ebooks gratuitos com os maiores macetes e hacks das provas",
            "🔄 Padrões que se repetem todos os anos e cobrem 45% das provas",
            "✍️ 3 modelos de redações nota 1000 validados por corretores oficiais",
            "🤖 IA desvenda 3 possíveis temas da redação 2024 baseado em pesquisas avançadas",
            "🎲 Técnicas infalíveis de chutes inteligentes que aumentam em 30% sua chance",
            "⚡ Transformação completa dos hábitos de estudo com método comprovado",
            "🛡️ Sistema anti-procrastinação baseado em neurociência",
            "😌 Controle total da ansiedade pré-prova com técnicas de alta performance",
            "⏱️ Método científico que funciona mesmo com pouco tempo disponível"
        ]
    },
    CRITICAL: {
        min: 551,
        max: 700,
        icon: "💀",
        title: "CÉREBRO PROCRASTINADOR EXTREMO",
        subtitle: "Código vermelho - última chance de aprovação",
        description: "Você é EXATAMENTE o perfil dos 15.247 que se salvaram com o NeuroHack. Procrastinação máxima, mas ainda há esperança. Este sistema foi feito para você.",
        color: "#FF0000",
        headline: "ÚLTIMA CHANCE! Mas você ainda pode se salvar...",
        solutions: [
            "🎯 Acesso ao maior sistema de aprovação já desenvolvido",
            "💎 Abas premium revolucionárias com conteúdo exclusivo",
            "📚 8 ebooks gratuitos com os maiores macetes e hacks das provas",
            "🔄 Padrões que se repetem todos os anos e cobrem 45% das provas",
            "✍️ 3 modelos de redações nota 1000 validados por corretores oficiais",
            "🤖 IA desvenda 3 possíveis temas da redação 2024 baseado em pesquisas avançadas",
            "🎲 Técnicas infalíveis de chutes inteligentes que aumentam em 30% sua chance",
            "🆘 Sistema de emergência para última hora - aprenda em tempo recorde",
            "💪 Técnicas que funcionam mesmo com procrastinação extrema",
            "🎯 Padrões do ENEM que garantem pontos mesmo sem estudar tudo",
            "⚡ Método de memorização rápida para véspera da prova",
            "🔥 Acesso imediato aos 20% de conteúdos que representam 80% da prova"
        ]
    }
};

let couponRevealTimeout = null;
let couponTimerInterval = null;
let notificationTimeout = null;
let notificationInterval = null;

// Determinar perfil baseado na pontuação
function getProfile(score) {
    if (score >= PROFILES.CRITICAL.min && score <= PROFILES.CRITICAL.max) {
        return PROFILES.CRITICAL;
    } else if (score >= PROFILES.HIGH.min && score <= PROFILES.HIGH.max) {
        return PROFILES.HIGH;
    } else if (score >= PROFILES.MEDIUM.min && score <= PROFILES.MEDIUM.max) {
        return PROFILES.MEDIUM;
    } else {
        return PROFILES.LOW;
    }
}

// Calcular risco de reprovação
function calculateRiskPercentage(score) {
    return Math.min(95, Math.max(5, (score / 700) * 100));
}

// Mostrar resultado
function showResult(score) {
    const profile = getProfile(score);
    const riskPercentage = calculateRiskPercentage(score);
    
    // Tracking
    if (typeof trackResultView === 'function') {
        trackResultView(profile.title, score);
    }
    
    // Mudar para tela de resultado
    if (typeof showScreen === 'function') {
        showScreen('result-screen');
    } else {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        const resultScreen = document.getElementById('result-screen');
        if (resultScreen) {
            resultScreen.classList.add('active');
        }
    }
    
    // Criar HTML do resultado
    const resultHTML = `
        <div class="result-content fade-in">
            <div class="result-header">
                <div class="result-icon pulse-animation" style="color: ${profile.color}">
                    ${profile.icon}
                </div>
                <h1 class="result-title">${profile.title}</h1>
                <p class="result-subtitle">${profile.subtitle}</p>
                <div class="result-score">${score} pontos</div>
            </div>
            
            <div class="analysis-section">
                <h2 class="analysis-title">${profile.headline}</h2>
                <p class="analysis-description">${profile.description}</p>
                
                <div class="risk-chart">
                    <canvas id="risk-chart-canvas" width="200" height="200"></canvas>
                </div>
                
                <p class="analysis-description" style="text-align: center; margin-top: 20px;">
                    <strong style="color: ${profile.color}">Risco de Reprovação: ${riskPercentage.toFixed(1)}%</strong>
                </p>
            </div>
            
            <div class="video-card fade-in" id="video-card">
                <div class="video-header">
                    <span class="video-badge">🎥 NeuroHack Explicado</span>
                    <h3 class="video-title">Veja em 2 minutos como o NeuroHack reprograma seu cérebro para o ENEM</h3>
                </div>
                <div class="video-wrapper">
                    <iframe 
                        src="https://player.vimeo.com/video/1134809671?h=8b61186ebe&title=0&byline=0&portrait=0"
                        title="NeuroHack ENEM"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
            
            <div class="solution-section">
                <h2 class="solution-title">COMO O NEUROHACK RESOLVE SEU PROBLEMA:</h2>
                <ul class="solution-list">
                    ${profile.solutions.map(solution => `<li>${solution}</li>`).join('')}
                </ul>
            </div>
            
            <div class="urgency-section shake-animation">
                <div class="urgency-timer" id="urgency-timer">
                    Oferta expira em: <span id="timer-display">23:45:12</span>
                </div>
                <p class="urgency-text">
                    ⚡ Outros <strong id="purchases-today">47</strong> com seu perfil compraram hoje
                </p>
                <p class="urgency-text">
                    🔥 Restam apenas <strong id="remaining-spots">23</strong> vagas
                </p>
            </div>
            
            <div class="coupon-section hidden" id="coupon-section">
                <h3 class="coupon-title">🎁 Parabéns! Cupom liberado</h3>
                <p class="coupon-description">
                    Você acaba de desbloquear o cupom <strong>NEURO97</strong> válido por 
                    <span class="coupon-timer" id="coupon-timer">15:00</span>.
                </p>
                <p class="coupon-price">Valor especial com o cupom: <span>R$ 97</span></p>
                <p class="coupon-note">Use o cupom no checkout antes que o tempo acabe.</p>
            </div>
            
            <div class="cta-section">
                <div class="price-tag">
                    <span class="price-original">R$ 297</span>
                    <span style="color: var(--color-secondary);">R$ 97</span>
                </div>
                <p class="price-discount">67% OFF - Oferta por tempo limitado</p>
                <p class="guarantee">✅ Garantia: 7 dias ou devolvo o dobro do seu dinheiro</p>
                
                <button class="btn-cta glow-animation" id="buy-btn" onclick="handlePurchase()">
                    TRANSFORMAR MEU CÉREBRO AGORA
                </button>
                
                <p style="text-align: center; margin-top: 15px; color: rgba(255, 255, 255, 0.7); font-size: 13px;">
                    💳 Pagamento 100% seguro via Kiwify
                </p>
            </div>
        </div>
    `;
    
    const resultContent = document.getElementById('result-content');
    if (resultContent) {
        resultContent.innerHTML = resultHTML;
        
        // Desenhar gráfico de risco
        drawRiskChart(riskPercentage, profile.color);
        
        // Iniciar timer de urgência
        startUrgencyTimer(2 * 60 * 60 * 1000); // 2 horas
        
        // Iniciar sistema de cupom
        initCouponOffer();
        
        // Atualizar números dinâmicos
        updateDynamicNumbers();
        
        // Scroll suave
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Desenhar gráfico circular de risco
function drawRiskChart(percentage, color) {
    const canvas = document.getElementById('risk-chart-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar círculo de fundo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 15;
    ctx.stroke();
    
    // Desenhar círculo de risco
    const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Texto no centro
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Poppins';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${percentage.toFixed(0)}%`, centerX, centerY);
}

// Iniciar timer de urgência
function startUrgencyTimer(durationMs = 24 * 60 * 60 * 1000) {
    const endTime = Date.now() + durationMs;
    let intervalId = null;
    
    function updateTimer() {
        const now = Date.now();
        const remaining = endTime - now;
        
        if (remaining <= 0) {
            document.getElementById('timer-display').textContent = '00:00:00';
            if (intervalId) {
                clearInterval(intervalId);
            }
            return;
        }
        
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        
        const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const timerDisplay = document.getElementById('timer-display');
        if (timerDisplay) {
            timerDisplay.textContent = display;
        }
    }
    
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
}

// Atualizar números dinâmicos (simulação)
function updateDynamicNumbers() {
    // Simular números que mudam
    const purchasesToday = document.getElementById('purchases-today');
    const remainingSpots = document.getElementById('remaining-spots');
    
    if (purchasesToday) {
        const basePurchases = 47;
        setInterval(() => {
            const newPurchases = basePurchases + Math.floor(Math.random() * 3);
            purchasesToday.textContent = newPurchases;
        }, 30000); // Atualiza a cada 30 segundos
    }
    
    if (remainingSpots) {
        const baseSpots = 23;
        let currentSpots = baseSpots;
        setInterval(() => {
            if (currentSpots > 5) {
                currentSpots -= Math.floor(Math.random() * 2);
                remainingSpots.textContent = currentSpots;
            }
        }, 45000); // Atualiza a cada 45 segundos
    }
}

// Lidar com compra
function handlePurchase() {
    // Tracking
    if (typeof trackPurchaseClick === 'function') {
        trackPurchaseClick();
    }
    
    // Adicionar informações do lead ao tracking se disponível
    if (window.leadInfo) {
        console.log('Lead comprando:', window.leadInfo.name, window.leadInfo.email);
        
        // Tracking adicional com dados do lead
        if (typeof trackEvent === 'function') {
            trackEvent('checkout_initiated', {
                lead_name: window.leadInfo.name,
                lead_email: window.leadInfo.email,
                lead_institution: window.leadInfo.institution,
                price: 97
            });
        }
    }
    
    // Redirecionar para o checkout da Kiwify
    window.location.href = 'https://pay.kiwify.com.br/za05nt2';
}

function initCouponOffer() {
    const couponSection = document.getElementById('coupon-section');
    const couponTimerDisplay = document.getElementById('coupon-timer');
    
    if (!couponSection || !couponTimerDisplay) {
        return;
    }
    
    // Garantir que timers anteriores sejam limpos
    if (couponRevealTimeout) {
        clearTimeout(couponRevealTimeout);
    }
    if (couponTimerInterval) {
        clearInterval(couponTimerInterval);
        couponTimerInterval = null;
    }
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
    }
    if (notificationInterval) {
        clearInterval(notificationInterval);
        notificationInterval = null;
    }
    
    couponSection.classList.add('hidden');
    couponSection.classList.remove('shake-animation', 'fade-in', 'glow-animation');
    
    couponRevealTimeout = setTimeout(() => {
        couponSection.classList.remove('hidden');
        couponSection.classList.add('fade-in');
        couponSection.classList.add('glow-animation');
        
        startCouponCountdown(15 * 60); // 15 minutos
        
        showCouponNotification(15 * 60);
        
        if (typeof trackEvent === 'function') {
            trackEvent('coupon_revealed', {
                coupon_code: 'NEURO97',
                validity_seconds: 15 * 60
            });
        }
    }, 10000);
}

function startCouponCountdown(durationSeconds) {
    const display = document.getElementById('coupon-timer');
    const couponSection = document.getElementById('coupon-section');
    
    if (!display || !couponSection) {
        return;
    }
    
    let remaining = durationSeconds;
    
    const updateDisplay = () => {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    
    updateDisplay();
    
    couponTimerInterval = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
            clearInterval(couponTimerInterval);
            couponTimerInterval = null;
            display.textContent = '00:00';
            couponSection.classList.remove('glow-animation');
            couponSection.classList.add('shake-animation');
            return;
        }
        updateDisplay();
    }, 1000);
}

function showCouponNotification(durationSeconds) {
    hideCouponNotification();
    
    const banner = document.createElement('div');
    banner.className = 'notification-banner';
    banner.id = 'coupon-notification';
    
    banner.innerHTML = `
        <span>🎉</span>
        <div>
            <p>Você acaba de ganhar um cupom válido pelos próximos <span class="notification-timer"></span>!</p>
            <p>Use o código <strong>NEURO97</strong> e garanta o acesso por <strong>R$ 97</strong>.</p>
        </div>
        <button class="close-btn" aria-label="Fechar notificação">×</button>
    `;
    
    document.body.appendChild(banner);
    
    const closeBtn = banner.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        hideCouponNotification(true);
    });
    
    let remaining = durationSeconds;
    const timerElement = banner.querySelector('.notification-timer');
    
    const updateTimer = () => {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        if (timerElement) {
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    };
    
    updateTimer();
    
    notificationInterval = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
            hideCouponNotification();
            return;
        }
        updateTimer();
    }, 1000);
    
    notificationTimeout = setTimeout(() => {
        hideCouponNotification();
    }, durationSeconds * 1000);
}

function hideCouponNotification(force = false) {
    const banner = document.getElementById('coupon-notification');
    if (!banner) {
        return;
    }
    
    if (notificationInterval) {
        clearInterval(notificationInterval);
        notificationInterval = null;
    }
    
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
    }
    
    if (force) {
        banner.remove();
        return;
    }
    
    banner.classList.add('fade-out');
    setTimeout(() => {
        banner.remove();
    }, 400);
}

// Exportar funções
window.showResult = showResult;
window.getProfile = getProfile;

