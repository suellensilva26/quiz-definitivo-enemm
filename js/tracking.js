// ============================================
// NEUROHACK QUIZ - TRACKING & ANALYTICS
// ============================================

// Configuração de tracking
const TRACKING_CONFIG = {
    googleAnalytics: {
        enabled: false, // Mudar para true e configurar ID real
        trackingId: 'UA-XXXXXXXXX-X' // Substituir com seu ID real
    },
    facebookPixel: {
        enabled: false, // Mudar para true e configurar ID real
        pixelId: 'XXXXXXXXXXXXXXX' // Substituir com seu ID real
    },
    hotjar: {
        enabled: false, // Mudar para true e configurar ID real
        siteId: 0000000 // Substituir com seu ID real
    },
    debug: false // Mudar para false em produção
};

// Verificar se está em ambiente de desenvolvimento
const isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' ||
                    window.location.protocol === 'http:';

// Verificar se ID é válido
function isValidId(id) {
    return id && 
           id !== 'UA-XXXXXXXXX-X' && 
           id !== 'XXXXXXXXXXXXXXX' && 
           id !== '0000000' && 
           id !== 0 &&
           id !== null &&
           id !== undefined;
}

// Inicializar tracking
function initTracking() {
    // Google Analytics
    if (TRACKING_CONFIG.googleAnalytics.enabled && 
        isValidId(TRACKING_CONFIG.googleAnalytics.trackingId)) {
        initGoogleAnalytics();
    }
    
    // Facebook Pixel - só em produção ou se ID válido
    if (TRACKING_CONFIG.facebookPixel.enabled && 
        isValidId(TRACKING_CONFIG.facebookPixel.pixelId)) {
        initFacebookPixel();
    }
    
    // Hotjar - só funciona em HTTPS, não inicializar em localhost
    if (TRACKING_CONFIG.hotjar.enabled && 
        isValidId(TRACKING_CONFIG.hotjar.siteId) &&
        !isLocalhost &&
        window.location.protocol === 'https:') {
        initHotjar();
    }
}

// Google Analytics
function initGoogleAnalytics() {
    // Verificar se já foi inicializado
    if (window.gtag) {
        return;
    }
    
    const trackingId = TRACKING_CONFIG.googleAnalytics.trackingId;
    if (!isValidId(trackingId)) {
        return;
    }
    
    // Adicionar script do GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', trackingId);
    
    window.gtag = gtag;
}

// Facebook Pixel
function initFacebookPixel() {
    // Verificar se já foi inicializado
    if (window.fbq) {
        return;
    }
    
    const pixelId = TRACKING_CONFIG.facebookPixel.pixelId;
    if (!isValidId(pixelId)) {
        return;
    }
    
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', pixelId);
    fbq('track', 'PageView');
    
    window.fbq = window.fbq || function() {
        (window.fbq.q = window.fbq.q || []).push(arguments);
    };
}

// Hotjar
function initHotjar() {
    // Verificar se já foi inicializado
    if (window.hj) {
        return;
    }
    
    const siteId = TRACKING_CONFIG.hotjar.siteId;
    if (!isValidId(siteId)) {
        return;
    }
    
    // Hotjar só funciona em HTTPS
    if (window.location.protocol !== 'https:' && isLocalhost) {
        if (TRACKING_CONFIG.debug) {
            console.log('Hotjar: Requer HTTPS para funcionar');
        }
        return;
    }
    
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:siteId,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
}

// Eventos de tracking
function trackEvent(eventName, eventData = {}) {
    // Google Analytics
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (window.fbq) {
        fbq('trackCustom', eventName, eventData);
    }
    
    // Console log apenas em modo debug
    if (TRACKING_CONFIG.debug) {
        console.log('Event tracked:', eventName, eventData);
    }
}

// Tracking de início do quiz
function trackQuizStarted() {
    trackEvent('quiz_started', {
        timestamp: new Date().toISOString()
    });
}

// Tracking de visualização de pergunta
function trackQuestionView(questionId) {
    trackEvent('question_viewed', {
        question_id: questionId,
        timestamp: new Date().toISOString()
    });
}

// Tracking de seleção de opção
function trackOptionSelected(questionId, points, optionText) {
    trackEvent('option_selected', {
        question_id: questionId,
        points: points,
        option_text: optionText.substring(0, 50), // Limitar tamanho
        timestamp: new Date().toISOString()
    });
}

// Tracking de conclusão do quiz
function trackQuizCompleted(totalScore, totalTime, questionTimes) {
    const avgTimePerQuestion = questionTimes.reduce((sum, q) => sum + (q.time || 0), 0) / questionTimes.length;
    
    trackEvent('quiz_completed', {
        total_score: totalScore,
        total_time: totalTime,
        avg_time_per_question: avgTimePerQuestion,
        number_of_questions: questionTimes.length,
        timestamp: new Date().toISOString()
    });
    
    // Facebook Pixel - Lead
    if (window.fbq) {
        fbq('track', 'Lead', {
            content_name: 'Quiz Completed',
            content_category: 'Education',
            value: totalScore,
            currency: 'BRL'
        });
    }
}

// Tracking de visualização de resultado
function trackResultView(profile, score) {
    trackEvent('result_viewed', {
        profile: profile,
        score: score,
        timestamp: new Date().toISOString()
    });
}

// Tracking de clique no botão de compra
function trackPurchaseClick() {
    trackEvent('purchase_button_clicked', {
        timestamp: new Date().toISOString()
    });
    
    // Facebook Pixel - InitiateCheckout
    if (window.fbq) {
        fbq('track', 'InitiateCheckout', {
            content_name: 'NeuroHack ENEM',
            value: 97.00,
            currency: 'BRL'
        });
    }
}

// Tracking de tempo de permanência
let pageStartTime = Date.now();

function trackTimeOnPage() {
    const timeOnPage = Date.now() - pageStartTime;
    
    trackEvent('time_on_page', {
        seconds: Math.floor(timeOnPage / 1000),
        timestamp: new Date().toISOString()
    });
}

// Tracking de scroll
let maxScroll = 0;

function trackScroll() {
    const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        trackEvent('scroll_depth', {
            percent: scrollPercent,
            timestamp: new Date().toISOString()
        });
    }
}

// Inicializar tracking de scroll
window.addEventListener('scroll', trackScroll);

// Tracking ao sair da página
window.addEventListener('beforeunload', () => {
    trackTimeOnPage();
    
    // Enviar evento de saída
    if (navigator.sendBeacon) {
        const data = JSON.stringify({
            event: 'page_exit',
            time_on_page: Math.floor((Date.now() - pageStartTime) / 1000)
        });
        navigator.sendBeacon('/api/track', data);
    }
});

// Rate limiting (simulação - implementar no backend)
const MAX_ATTEMPTS = 3;
const attempts = new Map();

function checkRateLimit(ip) {
    const now = Date.now();
    const userAttempts = attempts.get(ip) || [];
    
    // Remover tentativas antigas (últimas 24 horas)
    const recentAttempts = userAttempts.filter(time => now - time < 24 * 60 * 60 * 1000);
    
    if (recentAttempts.length >= MAX_ATTEMPTS) {
        return false;
    }
    
    recentAttempts.push(now);
    attempts.set(ip, recentAttempts);
    return true;
}

// Obter IP do usuário (simulação)
function getUserIP() {
    // Em produção, isso seria feito no backend
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Flag para evitar inicialização duplicada
let trackingInitialized = false;

// Inicializar tracking ao carregar
document.addEventListener('DOMContentLoaded', () => {
    if (!trackingInitialized) {
        initTracking();
        trackingInitialized = true;
    }
    pageStartTime = Date.now();
});

// Exportar funções
window.trackEvent = trackEvent;
window.trackQuizStarted = trackQuizStarted;
window.trackQuestionView = trackQuestionView;
window.trackOptionSelected = trackOptionSelected;
window.trackQuizCompleted = trackQuizCompleted;
window.trackResultView = trackResultView;
window.trackPurchaseClick = trackPurchaseClick;

