// ========================================
// INTERNATIONALIZATION (i18n)
// English and Spanish translations
// ========================================

const TRANSLATIONS = {
    en: {
        // Title screen
        subtitle: "Defender of the K'iche' Kingdom",
        tagline: "Learn K'iche'. Defend Your People. Change History.",
        startGame: "Begin Campaign",
        continueGame: "Continue Campaign",
        sourceCode: "Source Code",
        
        // Difficulty selection
        selectDifficulty: "Select Difficulty",
        soldier: "Soldier",
        soldierDesc: "Core essentials - perfect for beginners",
        warrior: "Warrior",
        warriorDesc: "More vocabulary and grammar",
        hero: "Hero",
        heroDesc: "Full cultural immersion - become a true hero!",
        
        // Map screen
        army: "Army:",
        morale: "Morale:",
        mastery: "K'iche' Mastery:",
        turn: "Turn",
        year: "Year",
        kicheTerritory: "K'iche' Territory",
        spanishControlled: "Spanish Controlled",
        underAttack: "Under Attack",
        unexplored: "Unexplored",
        yourArmy: "Your Army",
        
        // Territory panel
        underKicheControl: "Under K'iche' Control",
        spanishControlledStatus: "Spanish Controlled",
        underAttackStatus: "Under Attack!",
        enemyStrength: "Enemy strength",
        soldiers: "soldiers",
        marchHere: "March Here",
        attack: "Attack!",
        defend: "Defend!",
        train: "Train (Study)",
        cannotReach: "Your army cannot reach this location directly.",
        cannotReachPath: "You need to travel through other territories to reach here.",
        requirementsNeeded: "Requirements needed",
        complete: "Complete",
        at: "at",
        level: "level",
        completed: "Completed",
        
        // Attack alert
        spanishAttack: "Spanish Attack!",
        spanishAttacking: "The Spanish are attacking",
        peopleNeedHelp: "Your people need your help!",
        rushDefend: "Rush to Defend",
        continueForward: "Continue Forward",
        
        // Tutorial screen
        learning: "Learning",
        previous: "Previous",
        next: "Next",
        beginQuiz: "Begin Quiz!",
        culturalContext: "Cultural Context",
        conjugation: "Conjugation",
        example: "Example",
        
        // Battle screen
        kicheWarriors: "K'iche' Warriors",
        spanishForces: "Spanish Forces",
        warriors: "warriors",
        round: "Round",
        typeAnswer: "Type your answer...",
        typeKicheWord: "Type the K'iche' word...",
        submitAnswer: "Submit Answer",
        nextChallenge: "Next Challenge",
        seeResults: "See Results",
        
        // Feedback
        correctBattle: "Correct! Your warriors attack with renewed strength!",
        incorrectBattle: "Incorrect. The Spanish press their advantage!",
        correctTrain: "Correct! Your knowledge grows stronger!",
        incorrectTrain: "Not quite. Keep studying!",
        correctAnswerWas: "The correct answer was:",
        
        // Lesson questions
        selectIconFor: "Select the icon for:",
        selectMeaningOf: "Select the meaning of:",
        selectKicheFor: "Select the K'iche' word for:",
        whatDoesMean: "What does this mean?",
        translateToKiche: "Translate to K'iche':",
        translateToEnglish: "Translate to English:",
        typeWordYouLearned: "Type the K'iche' word you learned:",
        howWouldYou: "How would you:",
        respondInKiche: "Respond in K'iche':",
        someoneAsksYou: "Someone asks you:",
        culturalNote: "Cultural note:",
        
        // Results
        victory: "Victory!",
        hardFoughtVictory: "Hard-Fought Victory",
        stalemate: "Stalemate",
        defeat: "Defeat",
        trainingComplete: "Training Complete",
        questionsCorrect: "Questions Correct:",
        territoryStatus: "Territory Status:",
        armyChange: "Army Change:",
        wordsLearned: "Words Learned:",
        continueCampaign: "Continue Campaign",
        captured: "Captured",
        defended: "Defended",
        contested: "Contested",
        lost: "Lost",
        failed: "Failed",
        na: "N/A",
        
        // Game over
        victoryTitle: "VICTORY!",
        defeatTitle: "The Kingdom Falls",
        victoryMessage: "Through your mastery of K'iche' and brilliant tactics, you have driven the Spanish from the highlands! The K'iche' kingdom survives, and your language endures for generations to come. Tecun Uman's legacy lives on!",
        defeatMessage: "Though the Spanish have conquered the highlands, the K'iche' language and culture survive in the hearts of the people. Continue learning K'iche' to honor the memory of Tecun Uman and his warriors.",
        turnsSurvived: "Turns Survived",
        wordsMastered: "K'iche' Words Mastered",
        battlesWon: "Battles Won",
        tryAgain: "Try Again",
        
        // Battle messages
        liberated: "is liberated!",
        masteryInspires: "Your mastery of K'iche' inspires your warriors!",
        pushedBack: "Spanish Pushed Back",
        enemiesWeakened: "You've weakened the Spanish forces at",
        soldiersRemain: "soldiers remain.",
        neitherGains: "Neither side gains ground at",
        struggleContinues: "The struggle continues.",
        attackFails: "The attack fails. Your warriors must retreat.",
        studiedLesson: "Your warriors have studied",
        
        // Misc
        battleFor: "Battle for",
        defenseOf: "Defense of",
        attackOn: "Attack on",
        trainingAt: "Training at",
    },
    
    es: {
        // Title screen
        subtitle: "Defensor del Reino K'iche'",
        tagline: "Aprende K'iche'. Defiende a tu Pueblo. Cambia la Historia.",
        startGame: "Iniciar Campaña",
        continueGame: "Continuar Campaña",
        sourceCode: "Código Fuente",
        
        // Difficulty selection
        selectDifficulty: "Selecciona Dificultad",
        soldier: "Soldado",
        soldierDesc: "Lo esencial - perfecto para principiantes",
        warrior: "Guerrero",
        warriorDesc: "Más vocabulario y gramática",
        hero: "Héroe",
        heroDesc: "Inmersión cultural completa - ¡conviértete en héroe!",
        
        // Map screen
        army: "Ejército:",
        morale: "Moral:",
        mastery: "Dominio del K'iche':",
        turn: "Turno",
        year: "Año",
        kicheTerritory: "Territorio K'iche'",
        spanishControlled: "Control Español",
        underAttack: "Bajo Ataque",
        unexplored: "Sin Explorar",
        yourArmy: "Tu Ejército",
        
        // Territory panel
        underKicheControl: "Bajo Control K'iche'",
        cannotReachPath: "Necesitas viajar por otros territorios para llegar aquí.",
        requirementsNeeded: "Requisitos necesarios",
        complete: "Completa",
        at: "en nivel",
        level: "nivel",
        completed: "Completado",
        spanishControlledStatus: "Controlado por Españoles",
        underAttackStatus: "¡Bajo Ataque!",
        enemyStrength: "Fuerza enemiga",
        soldiers: "soldados",
        marchHere: "Marchar Aquí",
        attack: "¡Atacar!",
        defend: "¡Defender!",
        train: "Entrenar (Estudiar)",
        cannotReach: "Tu ejército no puede llegar directamente a esta ubicación.",
        
        // Attack alert
        spanishAttack: "¡Ataque Español!",
        spanishAttacking: "Los españoles están atacando",
        peopleNeedHelp: "¡Tu pueblo necesita tu ayuda!",
        rushDefend: "Correr a Defender",
        continueForward: "Continuar Adelante",
        
        // Tutorial screen
        learning: "Aprendiendo",
        previous: "Anterior",
        next: "Siguiente",
        beginQuiz: "¡Comenzar Quiz!",
        culturalContext: "Contexto Cultural",
        conjugation: "Conjugación",
        example: "Ejemplo",
        
        // Battle screen
        kicheWarriors: "Guerreros K'iche'",
        spanishForces: "Fuerzas Españolas",
        warriors: "guerreros",
        round: "Ronda",
        typeAnswer: "Escribe tu respuesta...",
        typeKicheWord: "Escribe la palabra K'iche'...",
        submitAnswer: "Enviar Respuesta",
        nextChallenge: "Siguiente Desafío",
        seeResults: "Ver Resultados",
        
        // Feedback
        correctBattle: "¡Correcto! ¡Tus guerreros atacan con fuerza renovada!",
        incorrectBattle: "Incorrecto. ¡Los españoles aprovechan la ventaja!",
        correctTrain: "¡Correcto! ¡Tu conocimiento crece!",
        incorrectTrain: "No del todo. ¡Sigue estudiando!",
        correctAnswerWas: "La respuesta correcta era:",
        
        // Lesson questions
        selectIconFor: "Selecciona el ícono para:",
        selectMeaningOf: "Selecciona el significado de:",
        selectKicheFor: "Selecciona la palabra K'iche' para:",
        whatDoesMean: "¿Qué significa esto?",
        translateToKiche: "Traduce al K'iche':",
        translateToEnglish: "Traduce al español:",
        typeWordYouLearned: "Escribe la palabra K'iche' que aprendiste:",
        howWouldYou: "¿Cómo harías para:",
        respondInKiche: "Responde en K'iche':",
        someoneAsksYou: "Alguien te pregunta:",
        culturalNote: "Nota cultural:",
        
        // Results
        victory: "¡Victoria!",
        hardFoughtVictory: "Victoria Difícil",
        stalemate: "Empate",
        defeat: "Derrota",
        trainingComplete: "Entrenamiento Completo",
        questionsCorrect: "Preguntas Correctas:",
        territoryStatus: "Estado del Territorio:",
        armyChange: "Cambio de Ejército:",
        wordsLearned: "Palabras Aprendidas:",
        continueCampaign: "Continuar Campaña",
        captured: "Capturado",
        defended: "Defendido",
        contested: "Disputado",
        lost: "Perdido",
        failed: "Fallido",
        na: "N/A",
        
        // Game over
        victoryTitle: "¡VICTORIA!",
        defeatTitle: "El Reino Cae",
        victoryMessage: "¡A través de tu dominio del K'iche' y tácticas brillantes, has expulsado a los españoles de las tierras altas! El reino K'iche' sobrevive, y tu idioma perdura por generaciones. ¡El legado de Tecun Uman vive!",
        defeatMessage: "Aunque los españoles han conquistado las tierras altas, el idioma y la cultura K'iche' sobreviven en los corazones del pueblo. Continúa aprendiendo K'iche' para honrar la memoria de Tecun Uman y sus guerreros.",
        turnsSurvived: "Turnos Sobrevividos",
        wordsMastered: "Palabras K'iche' Dominadas",
        battlesWon: "Batallas Ganadas",
        tryAgain: "Intentar de Nuevo",
        
        // Battle messages
        liberated: "¡está liberado!",
        masteryInspires: "¡Tu dominio del K'iche' inspira a tus guerreros!",
        pushedBack: "Españoles Rechazados",
        enemiesWeakened: "Has debilitado a las fuerzas españolas en",
        soldiersRemain: "soldados quedan.",
        neitherGains: "Ningún lado gana terreno en",
        struggleContinues: "La lucha continúa.",
        attackFails: "El ataque falla. Tus guerreros deben retirarse.",
        studiedLesson: "Tus guerreros han estudiado",
        
        // Misc
        battleFor: "Batalla por",
        defenseOf: "Defensa de",
        attackOn: "Ataque a",
        trainingAt: "Entrenamiento en",
    }
};

// Spanish-speaking country codes
const SPANISH_COUNTRIES = [
    'es', // Spain
    'mx', // Mexico
    'ar', // Argentina
    'co', // Colombia
    'pe', // Peru
    've', // Venezuela
    'cl', // Chile
    'ec', // Ecuador
    'gt', // Guatemala
    'cu', // Cuba
    'bo', // Bolivia
    'do', // Dominican Republic
    'hn', // Honduras
    'py', // Paraguay
    'sv', // El Salvador
    'ni', // Nicaragua
    'cr', // Costa Rica
    'pa', // Panama
    'uy', // Uruguay
    'pr', // Puerto Rico
    'gq', // Equatorial Guinea
];

// Current language
let currentLanguage = 'en';

// Detect user's preferred language
function detectLanguage() {
    // Check saved preference first
    const saved = localStorage.getItem('tecunuman_language');
    if (saved && (saved === 'en' || saved === 'es')) {
        return saved;
    }
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage || 'en';
    const langCode = browserLang.toLowerCase();
    
    // If browser language starts with 'es', use Spanish
    if (langCode.startsWith('es')) {
        return 'es';
    }
    
    // Check if user is likely from a Spanish-speaking country
    // This uses the language tag which sometimes includes country (e.g., 'es-MX')
    const parts = langCode.split('-');
    if (parts.length > 1) {
        const country = parts[1].toLowerCase();
        if (SPANISH_COUNTRIES.includes(country)) {
            return 'es';
        }
    }
    
    return 'en';
}

// Set language and update all UI elements
function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'es') {
        lang = 'en';
    }
    
    currentLanguage = lang;
    localStorage.setItem('tecunuman_language', lang);
    
    // Update language button states
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-es').classList.toggle('active', lang === 'es');
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (TRANSLATIONS[lang][key]) {
            el.placeholder = TRANSLATIONS[lang][key];
        }
    });
}

// Get a translation
function t(key) {
    return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS['en'][key] || key;
}

// Initialize i18n
function initI18n() {
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
    
    // Language switcher event listeners
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-es').addEventListener('click', () => setLanguage('es'));
}

// Export
window.t = t;
window.setLanguage = setLanguage;
window.currentLanguage = () => currentLanguage;
window.getCurrentLanguage = () => currentLanguage;
window.initI18n = initI18n;

