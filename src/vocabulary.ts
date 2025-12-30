// ========================================
// K'ICHE' VOCABULARY DATABASE
// Organized by lesson/difficulty level
// ========================================

// Types
export interface VocabularyWord {
    kiche: string;
    spanish: string;
    english: string;
    audio: string | null;
}

export type VocabularyLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'expert';

export type VocabularyDatabase = Record<VocabularyLevel, VocabularyWord[]>;

// Question types for variety
export const QUESTION_TYPES = {
    TRANSLATE_TO_KICHE: 'translate_to_kiche',
    TRANSLATE_FROM_KICHE: 'translate_from_kiche',
    MULTIPLE_CHOICE: 'multiple_choice',
    LISTEN_AND_TYPE: 'listen_and_type', // For future audio implementation
} as const;

export type QuestionType = typeof QUESTION_TYPES[keyof typeof QUESTION_TYPES];

// ========================================
// VOCABULARY DATA
// ========================================

export const VOCABULARY: VocabularyDatabase = {
    // Level 1: Basic Greetings and Common Words
    beginner: [
        { kiche: "ja", spanish: "casa", english: "house", audio: null },
        { kiche: "ja'", spanish: "agua", english: "water", audio: null },
        { kiche: "q'ij", spanish: "sol/día", english: "sun/day", audio: null },
        { kiche: "ik'", spanish: "luna/mes", english: "moon/month", audio: null },
        { kiche: "ulew", spanish: "tierra", english: "earth", audio: null },
        { kiche: "che'", spanish: "árbol", english: "tree", audio: null },
        { kiche: "ab'aj", spanish: "piedra", english: "stone", audio: null },
        { kiche: "q'aq'", spanish: "fuego", english: "fire", audio: null },
        { kiche: "kaq'iq'", spanish: "viento", english: "wind", audio: null },
        { kiche: "jab'", spanish: "lluvia", english: "rain", audio: null },
        { kiche: "saq", spanish: "blanco", english: "white", audio: null },
        { kiche: "q'eq", spanish: "negro", english: "black", audio: null },
        { kiche: "kaq", spanish: "rojo", english: "red", audio: null },
        { kiche: "rax", spanish: "verde/azul", english: "green/blue", audio: null },
        { kiche: "q'an", spanish: "amarillo", english: "yellow", audio: null },
        { kiche: "winaq", spanish: "persona", english: "person", audio: null },
        { kiche: "achi", spanish: "hombre", english: "man", audio: null },
        { kiche: "ixoq", spanish: "mujer", english: "woman", audio: null },
        { kiche: "ak'al", spanish: "niño", english: "child", audio: null },
        { kiche: "tat", spanish: "padre", english: "father", audio: null },
        { kiche: "nan", spanish: "madre", english: "mother", audio: null },
        { kiche: "wa", spanish: "tortilla/comida", english: "tortilla/food", audio: null },
        { kiche: "tz'i'", spanish: "perro", english: "dog", audio: null },
        { kiche: "mis", spanish: "gato", english: "cat", audio: null },
        { kiche: "kar", spanish: "pescado", english: "fish", audio: null },
    ],
    
    // Level 2: Numbers and Basic Phrases
    elementary: [
        { kiche: "jun", spanish: "uno", english: "one", audio: null },
        { kiche: "ka'ib'", spanish: "dos", english: "two", audio: null },
        { kiche: "oxib'", spanish: "tres", english: "three", audio: null },
        { kiche: "kajib'", spanish: "cuatro", english: "four", audio: null },
        { kiche: "job'", spanish: "cinco", english: "five", audio: null },
        { kiche: "waqib'", spanish: "seis", english: "six", audio: null },
        { kiche: "wuqub'", spanish: "siete", english: "seven", audio: null },
        { kiche: "wajxaqib'", spanish: "ocho", english: "eight", audio: null },
        { kiche: "b'elejeb'", spanish: "nueve", english: "nine", audio: null },
        { kiche: "lajuj", spanish: "diez", english: "ten", audio: null },
        { kiche: "junlajuj", spanish: "once", english: "eleven", audio: null },
        { kiche: "kab'lajuj", spanish: "doce", english: "twelve", audio: null },
        { kiche: "oxlajuj", spanish: "trece", english: "thirteen", audio: null },
        { kiche: "jwinaq", spanish: "veinte", english: "twenty", audio: null },
        { kiche: "saq'arik", spanish: "amanecer", english: "dawn", audio: null },
        { kiche: "nik'aj q'ij", spanish: "mediodía", english: "noon", audio: null },
        { kiche: "q'equmal", spanish: "oscuridad", english: "darkness", audio: null },
        { kiche: "aq'ab'", spanish: "noche", english: "night", audio: null },
        { kiche: "utz", spanish: "bueno", english: "good", audio: null },
        { kiche: "itzel", spanish: "malo", english: "bad", audio: null },
        { kiche: "nim", spanish: "grande", english: "big", audio: null },
        { kiche: "ch'utin", spanish: "pequeño", english: "small", audio: null },
        { kiche: "nimalaj", spanish: "muy grande", english: "very big", audio: null },
        { kiche: "k'o", spanish: "hay/existe", english: "there is", audio: null },
        { kiche: "majun", spanish: "nada/nadie", english: "nothing/nobody", audio: null },
    ],
    
    // Level 3: Greetings and Social Phrases
    intermediate: [
        { kiche: "Saqarik", spanish: "Buenos días", english: "Good morning", audio: null },
        { kiche: "Xq'ij", spanish: "Buenas tardes", english: "Good afternoon", audio: null },
        { kiche: "Xokaq'ab'", spanish: "Buenas noches", english: "Good evening", audio: null },
        { kiche: "La utz awach?", spanish: "¿Cómo estás?", english: "How are you?", audio: null },
        { kiche: "Utz matyox", spanish: "Bien, gracias", english: "Good, thank you", audio: null },
        { kiche: "Matyox", spanish: "Gracias", english: "Thank you", audio: null },
        { kiche: "Je'", spanish: "Sí", english: "Yes", audio: null },
        { kiche: "Mani", spanish: "No", english: "No", audio: null },
        { kiche: "Jas ub'i' la?", spanish: "¿Cómo se llama?", english: "What is your name?", audio: null },
        { kiche: "Nub'i'...", spanish: "Mi nombre es...", english: "My name is...", audio: null },
        { kiche: "Kinb'e", spanish: "Me voy", english: "I'm leaving", audio: null },
        { kiche: "Chib'an che", spanish: "Adiós", english: "Goodbye", audio: null },
        { kiche: "K'a chi k'a", spanish: "Hasta luego", english: "See you later", audio: null },
        { kiche: "B'a'n", spanish: "Por favor", english: "Please", audio: null },
        { kiche: "Sachb'al mak", spanish: "Perdón", english: "Excuse me/Sorry", audio: null },
        { kiche: "Qas", spanish: "verdad", english: "truth", audio: null },
        { kiche: "Tzij", spanish: "palabra", english: "word", audio: null },
        { kiche: "Ch'ab'al", spanish: "idioma/lengua", english: "language", audio: null },
        { kiche: "K'iche' ch'ab'al", spanish: "idioma K'iche'", english: "K'iche' language", audio: null },
        { kiche: "Kinwetamaj", spanish: "Estoy aprendiendo", english: "I am learning", audio: null },
    ],
    
    // Level 4: War and Battle Terms (thematically appropriate!)
    advanced: [
        { kiche: "ch'eken", spanish: "guerra", english: "war", audio: null },
        { kiche: "achi'il", spanish: "guerrero", english: "warrior", audio: null },
        { kiche: "b'alam", spanish: "jaguar", english: "jaguar", audio: null },
        { kiche: "k'uk'", spanish: "quetzal", english: "quetzal", audio: null },
        { kiche: "ajaw", spanish: "señor/rey", english: "lord/king", audio: null },
        { kiche: "amaq'", spanish: "nación/pueblo", english: "nation/people", audio: null },
        { kiche: "tinamit", spanish: "ciudad", english: "city", audio: null },
        { kiche: "jul", spanish: "cueva", english: "cave", audio: null },
        { kiche: "juyub'", spanish: "montaña", english: "mountain", audio: null },
        { kiche: "siwan", spanish: "barranco", english: "ravine", audio: null },
        { kiche: "chak'ab'", spanish: "hacha", english: "axe", audio: null },
        { kiche: "tz'alam", spanish: "escudo", english: "shield", audio: null },
        { kiche: "ch'ich'", spanish: "metal/espada", english: "metal/sword", audio: null },
        { kiche: "k'uxb'al", spanish: "flecha", english: "arrow", audio: null },
        { kiche: "jun'ik", spanish: "unirse", english: "to unite", audio: null },
        { kiche: "ch'akoj", spanish: "batalla", english: "battle", audio: null },
        { kiche: "ch'eken ya'oj", spanish: "atacar", english: "to attack", audio: null },
        { kiche: "kolob'al", spanish: "defender", english: "to defend", audio: null },
        { kiche: "ch'akanik", spanish: "victoria", english: "victory", audio: null },
        { kiche: "sachoj", spanish: "derrota", english: "defeat", audio: null },
        { kiche: "k'aslemal", spanish: "vida", english: "life", audio: null },
        { kiche: "kaminaq", spanish: "muerte", english: "death", audio: null },
        { kiche: "uk'u'x", spanish: "corazón/centro", english: "heart/center", audio: null },
        { kiche: "no'jib'al", spanish: "sabiduría", english: "wisdom", audio: null },
        { kiche: "k'axk'olil", spanish: "sufrimiento", english: "suffering", audio: null },
    ],
    
    // Level 5: Spiritual and Cultural Terms
    expert: [
        { kiche: "K'ab'awil", spanish: "dios/deidad", english: "god/deity", audio: null },
        { kiche: "Uk'u'x Kaj", spanish: "Corazón del Cielo", english: "Heart of Sky", audio: null },
        { kiche: "Uk'u'x Ulew", spanish: "Corazón de la Tierra", english: "Heart of Earth", audio: null },
        { kiche: "Xib'alb'a", spanish: "inframundo", english: "underworld", audio: null },
        { kiche: "Pop Wuj", spanish: "Popol Vuh", english: "Popol Vuh", audio: null },
        { kiche: "ajq'ij", spanish: "sacerdote maya", english: "Mayan priest", audio: null },
        { kiche: "cholq'ij", spanish: "calendario sagrado", english: "sacred calendar", audio: null },
        { kiche: "nawal", spanish: "espíritu/nagual", english: "spirit/nagual", audio: null },
        { kiche: "ch'umilal", spanish: "destino/estrella", english: "destiny/star", audio: null },
        { kiche: "tz'aqat", spanish: "completo/sagrado", english: "complete/sacred", audio: null },
        { kiche: "k'amal b'e", spanish: "guía/líder", english: "guide/leader", audio: null },
        { kiche: "Q'umarkaj", spanish: "capital K'iche'", english: "K'iche' capital", audio: null },
        { kiche: "ixim", spanish: "maíz", english: "corn/maize", audio: null },
        { kiche: "pixab'", spanish: "consejo/mandamiento", english: "counsel/commandment", audio: null },
        { kiche: "sib'alaj", spanish: "mucho", english: "much/very", audio: null },
        { kiche: "ronojel", spanish: "todo", english: "all/everything", audio: null },
        { kiche: "nuk'aslemal", spanish: "mi vida", english: "my life", audio: null },
        { kiche: "qati't qamam", spanish: "nuestros abuelos", english: "our ancestors", audio: null },
        { kiche: "ojer tzij", spanish: "historia antigua", english: "ancient story", audio: null },
        { kiche: "saqil k'aslemal", spanish: "vida en paz", english: "life in peace", audio: null },
    ]
};

// ========================================
// VOCABULARY FUNCTIONS
// ========================================

const LEVEL_ORDER: VocabularyLevel[] = ['beginner', 'elementary', 'intermediate', 'advanced', 'expert'];

/** Get vocabulary by difficulty level (includes all levels up to the specified one) */
export function getVocabularyByLevel(level: number): VocabularyWord[] {
    const maxLevel = Math.min(level, LEVEL_ORDER.length - 1);
    
    let vocab: VocabularyWord[] = [];
    for (let i = 0; i <= maxLevel; i++) {
        vocab = vocab.concat(VOCABULARY[LEVEL_ORDER[i]]);
    }
    return vocab;
}

/** Get a random subset of vocabulary */
export function getRandomVocab(vocab: VocabularyWord[], count: number): VocabularyWord[] {
    const shuffled = [...vocab].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/** Generate wrong answers for multiple choice */
export function generateWrongAnswers(
    correctWord: VocabularyWord, 
    vocab: VocabularyWord[], 
    count: number = 3, 
    field: keyof VocabularyWord = 'kiche'
): string[] {
    const others = vocab.filter(w => w[field] !== correctWord[field]);
    const shuffled = others.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(w => w[field] as string);
}

// Question interface
export interface VocabQuestion {
    word: VocabularyWord;
    type: QuestionType;
    correctAnswer: string;
    prompt: string;
    instruction: string;
    choices: string[] | null;
}

/** Create a question object */
export function createQuestion(
    word: VocabularyWord, 
    type: QuestionType, 
    vocab: VocabularyWord[]
): VocabQuestion {
    const question: VocabQuestion = {
        word: word,
        type: type,
        correctAnswer: '',
        prompt: '',
        instruction: '',
        choices: null,
    };
    
    switch(type) {
        case QUESTION_TYPES.TRANSLATE_TO_KICHE:
            question.prompt = word.english;
            question.correctAnswer = word.kiche;
            question.instruction = "Translate to K'iche':";
            break;
            
        case QUESTION_TYPES.TRANSLATE_FROM_KICHE:
            question.prompt = word.kiche;
            question.correctAnswer = word.english;
            question.instruction = "Translate to English:";
            break;
            
        case QUESTION_TYPES.MULTIPLE_CHOICE:
            // Randomly choose direction
            const toKiche = Math.random() > 0.5;
            if (toKiche) {
                question.prompt = word.english;
                question.correctAnswer = word.kiche;
                question.instruction = "Select the K'iche' translation:";
                const wrongAnswers = generateWrongAnswers(word, vocab, 3, 'kiche');
                question.choices = [word.kiche, ...wrongAnswers].sort(() => Math.random() - 0.5);
            } else {
                question.prompt = word.kiche;
                question.correctAnswer = word.english;
                question.instruction = "Select the English translation:";
                const wrongAnswers = generateWrongAnswers(word, vocab, 3, 'english');
                question.choices = [word.english, ...wrongAnswers].sort(() => Math.random() - 0.5);
            }
            break;
    }
    
    return question;
}

/** Generate a set of questions for a battle */
export function generateBattleQuestions(level: number, count: number = 5): VocabQuestion[] {
    const vocab = getVocabularyByLevel(level);
    const selectedWords = getRandomVocab(vocab, count);
    
    return selectedWords.map((word) => {
        // Mix question types - more multiple choice early, more typing later
        let type: QuestionType;
        if (level === 0 || Math.random() < 0.5) {
            type = QUESTION_TYPES.MULTIPLE_CHOICE;
        } else {
            type = Math.random() < 0.5 
                ? QUESTION_TYPES.TRANSLATE_TO_KICHE 
                : QUESTION_TYPES.TRANSLATE_FROM_KICHE;
        }
        
        return createQuestion(word, type, vocab);
    });
}

/** Check answer with some flexibility (case-insensitive, trim whitespace) */
export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
    const normalizedUser = userAnswer.toLowerCase().trim();
    const normalizedCorrect = correctAnswer.toLowerCase().trim();
    
    // Exact match
    if (normalizedUser === normalizedCorrect) return true;
    
    // Allow for common variations (without special characters)
    const simplifyKiche = (str: string): string => str
        .replace(/'/g, "'")
        .replace(/'/g, "'")
        .replace(/'/g, "")
        .replace(/b'/g, "b")
        .replace(/k'/g, "k")
        .replace(/q'/g, "q")
        .replace(/tz'/g, "tz")
        .replace(/ch'/g, "ch");
    
    if (simplifyKiche(normalizedUser) === simplifyKiche(normalizedCorrect)) {
        return true;
    }
    
    return false;
}

// ========================================
// GLOBAL EXPORTS (for compatibility with game.js)
// ========================================

(window as any).VOCABULARY = VOCABULARY;
(window as any).QUESTION_TYPES = QUESTION_TYPES;
(window as any).getVocabularyByLevel = getVocabularyByLevel;
(window as any).generateBattleQuestions = generateBattleQuestions;
(window as any).checkAnswer = checkAnswer;

