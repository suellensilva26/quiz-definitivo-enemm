// ============================================
// NEUROHACK QUIZ - MAIN QUIZ LOGIC
// ============================================

let currentQuestion = 0;
let totalScore = 0;
let questionsData = [];
let startTime = null;
let questionTimes = [];

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await loadQuestions();
    initializeQuiz();
});

// Carregar perguntas do JSON
async function loadQuestions() {
    try {
        const response = await fetch('data/questions.json');
        const data = await response.json();
        questionsData = data.questions;
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
    }
}

// Inicializar quiz
function initializeQuiz() {
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
}

// Iniciar quiz
function startQuiz() {
    // Tracking
    if (typeof trackQuizStarted === 'function') {
        trackQuizStarted();
    }
    
    startTime = Date.now();
    currentQuestion = 0;
    totalScore = 0;
    questionTimes = [];
    
    // Mudar para tela do quiz
    showScreen('quiz-screen');
    
    // Mostrar primeira pergunta
    displayQuestion();
}

// Mostrar pergunta atual
function displayQuestion() {
    if (currentQuestion >= questionsData.length) {
        finishQuiz();
        return;
    }
    
    const question = questionsData[currentQuestion];
    const questionContainer = document.getElementById('question-container');
    
    // Atualizar progresso
    updateProgress();
    
    // Criar HTML da pergunta
    const questionHTML = `
        <div class="question-visual fade-in">${question.visual}</div>
        <h2 class="question-title fade-in">${question.title}</h2>
        <div class="options-container">
            ${question.options.map((option, index) => `
                <button class="option-btn fade-in" 
                        data-points="${option.points}"
                        data-question="${question.id}"
                        style="animation-delay: ${index * 0.1}s">
                    ${option.text}
                </button>
            `).join('')}
        </div>
    `;
    
    questionContainer.innerHTML = questionHTML;
    
    // Adicionar event listeners
    const optionButtons = questionContainer.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.addEventListener('click', selectOption);
    });
    
    // Tracking
    if (typeof trackQuestionView === 'function') {
        trackQuestionView(question.id);
    }
    
    // Registrar tempo de início da pergunta
    questionTimes[currentQuestion] = { start: Date.now() };
    
    // Scroll suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Selecionar opção
function selectOption(event) {
    const button = event.currentTarget;
    const points = parseInt(button.dataset.points);
    const questionId = parseInt(button.dataset.question);
    
    // Remover seleção anterior
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Marcar como selecionado
    button.classList.add('selected');
    
    // Adicionar pontos
    totalScore += points;
    
    // Registrar tempo de resposta
    if (questionTimes[currentQuestion]) {
        questionTimes[currentQuestion].end = Date.now();
        questionTimes[currentQuestion].time = questionTimes[currentQuestion].end - questionTimes[currentQuestion].start;
    }
    
    // Tracking
    if (typeof trackOptionSelected === 'function') {
        trackOptionSelected(questionId, points, button.textContent.trim());
    }
    
    // Vibração no mobile
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Criar partículas douradas
    createParticles(button);
    
    // Avançar para próxima pergunta após delay
    setTimeout(() => {
        currentQuestion++;
        displayQuestion();
    }, 800);
}

// Atualizar barra de progresso
function updateProgress() {
    const progress = ((currentQuestion + 1) / questionsData.length) * 100;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${currentQuestion + 1}/${questionsData.length}`;
    }
}

// Finalizar quiz
function finishQuiz() {
    const totalTime = Date.now() - startTime;
    
    // Tracking
    if (typeof trackQuizCompleted === 'function') {
        trackQuizCompleted(totalScore, totalTime, questionTimes);
    }
    
    // Mostrar resultado
    if (typeof showResult === 'function') {
        showResult(totalScore);
    }
}

// Mostrar tela específica
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Exportar para uso global
window.showScreen = showScreen;

// Criar partículas douradas
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.animationDelay = `${i * 0.1}s`;
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Exportar para uso em outros módulos
window.quizLogic = {
    getTotalScore: () => totalScore,
    getQuestionTimes: () => questionTimes,
    getCurrentQuestion: () => currentQuestion
};

