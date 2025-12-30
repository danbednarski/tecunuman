// ========================================
// K'ICHE' LESSON CONTENT
// Based on University of Texas K'iche' Course
// With cultural context from Popol Vuh and Maya history
// ========================================

import { t, getLanguage } from './i18n';

// ========================================
// TYPES
// ========================================

export type DifficultyLevel = 'soldier' | 'warrior' | 'hero';

export const DIFFICULTY = {
    SOLDIER: 'soldier' as const,
    WARRIOR: 'warrior' as const,
    HERO: 'hero' as const,
};

export const LESSON_TYPES = {
    VOCABULARY: 'vocabulary',
    VOCABULARY_ANIMALS: 'vocabulary_animals',
    VOCABULARY_WARFARE: 'vocabulary_warfare',
    VOCABULARY_PLACES: 'vocabulary_places',
    VOCABULARY_SPIRITUAL: 'vocabulary_spiritual',
    VOCABULARY_ADVANCED: 'vocabulary_advanced',
    PRONOUNS: 'pronouns',
    GREETINGS: 'greetings',
    POSSESSION: 'possession',
    NEGATION: 'negation',
    INTRANSITIVE_VERBS: 'intransitive_verbs',
    TRANSITIVE_VERBS: 'transitive_verbs',
    NUMBERS: 'numbers',
    PLURALS: 'plurals',
    QUESTIONS: 'questions',
    COMMANDS: 'commands',
    ADJECTIVES: 'adjectives',
} as const;

export type LessonType = typeof LESSON_TYPES[keyof typeof LESSON_TYPES];

export const QUESTION_TYPE = {
    MULTIPLE_CHOICE: 'multiple_choice',
    ICON_SELECT: 'icon_select',
    ICON_TEXT_SELECT: 'icon_text_select',
    TRANSLATE_TO_KICHE: 'translate_to_kiche',
    TRANSLATE_FROM_KICHE: 'translate_from_kiche',
    FILL_BLANK: 'fill_blank',
    RECALL_TYPE: 'recall_type',
    PHRASE_SELECT: 'phrase_select',
    CONVERSATION_RESPOND: 'conversation_respond',
    AUDIO_SELECT: 'audio_select',
} as const;

export type QuestionTypeValue = typeof QUESTION_TYPE[keyof typeof QUESTION_TYPE];

export interface VocabularyItem {
    kiche: string;
    english: string;
    spanish?: string;
    icon?: string;
    culture?: string;
    difficulty?: DifficultyLevel;
    example?: string;
    conjugation?: string;
}

export interface LessonContent {
    core: VocabularyItem[];
    warrior: VocabularyItem[];
    hero: VocabularyItem[];
}

export interface Question {
    type: QuestionTypeValue | string;
    instruction: string;
    prompt: string;
    promptEs?: string;
    promptHint?: string;
    promptTranslation?: string;
    correctAnswer: string;
    choices?: string[];
    culture?: string;
    lessonId: string;
    word: VocabularyItem;
    isTypingQuestion?: boolean;
    acceptableAnswers?: string[];
    icon?: string;
    responseTranslation?: string;
}

export interface Lesson {
    id: string;
    name: string;
    englishName: string;
    spanishName: string;
    description: string;
    icon: string;
}

// ========================================
// STATE
// ========================================

let currentDifficulty: DifficultyLevel = DIFFICULTY.WARRIOR;

export function setDifficulty(level: DifficultyLevel): void {
    if (Object.values(DIFFICULTY).includes(level)) {
        currentDifficulty = level;
        localStorage.setItem('tecunuman_difficulty', level);
    }
}

export function getDifficulty(): DifficultyLevel {
    const saved = localStorage.getItem('tecunuman_difficulty');
    if (saved && Object.values(DIFFICULTY).includes(saved as DifficultyLevel)) {
        currentDifficulty = saved as DifficultyLevel;
    }
    return currentDifficulty;
}

// ========================================
// VOCABULARY WITH CULTURAL CONTEXT
// ========================================

export const CULTURAL_VOCABULARY: LessonContent = {
    core: [
        { kiche: "ja'", english: "water", spanish: "agua", icon: "💧", culture: "In the Popol Vuh, the world began as an endless sea. Ja' is one of the most sacred elements.", difficulty: 'soldier' },
        { kiche: "q'aq'", english: "fire", spanish: "fuego", icon: "🔥", culture: "Fire was a gift from Tohil, the K'iche' patron deity, to the ancestors at Tulan.", difficulty: 'soldier' },
        { kiche: "ulew", english: "earth/land", spanish: "tierra", icon: "🌍", culture: "Guatemala's K'iche' name is 'Iximulew' - 'Land of Corn'. Ulew is sacred.", difficulty: 'soldier' },
        { kiche: "ixim", english: "corn/maize", spanish: "maíz", icon: "🌽", culture: "In the Popol Vuh, humans were created from corn. Ixim is the flesh of the Maya people.", difficulty: 'soldier' },
        { kiche: "q'ij", english: "sun/day", spanish: "sol/día", icon: "☀️", culture: "Jun Ajpu became the sun in the Popol Vuh. Q'ij also means 'day' - time follows the sun.", difficulty: 'soldier' },
        { kiche: "ik'", english: "moon/month", spanish: "luna/mes", icon: "🌙", culture: "Xb'alanke became the moon. The Maya calendar tracks lunar cycles precisely.", difficulty: 'soldier' },
        { kiche: "che'", english: "tree/wood", spanish: "árbol/madera", icon: "🌳", culture: "The ceiba tree (inup) is the sacred world tree connecting earth, sky, and underworld.", difficulty: 'soldier' },
        { kiche: "ja", english: "house", spanish: "casa", icon: "🏠", culture: "Traditional K'iche' homes face east to greet the rising sun.", difficulty: 'soldier' },
        { kiche: "wa", english: "tortilla/food", spanish: "tortilla/comida", icon: "🫓", culture: "Wa is sustenance itself. 'Kinwa'ik' (I eat) shares this root. Food is sacred.", difficulty: 'soldier' },
        { kiche: "winaq", english: "person/people", spanish: "persona/gente", icon: "👤", culture: "Winaq also means 'twenty' - the complete human (10 fingers + 10 toes).", difficulty: 'soldier' },
        { kiche: "ajaw", english: "lord/god", spanish: "señor/dios", icon: "👑", culture: "The Ajaw were divine rulers. 'Uk'u'x Kaj, Uk'u'x Ulew' (Heart of Sky, Heart of Earth) is the supreme Ajaw.", difficulty: 'soldier' },
        { kiche: "b'alam", english: "jaguar", spanish: "jaguar", icon: "🐆", culture: "B'alam Kitze', B'alam Aq'ab' - the first K'iche' ancestors had jaguar names.", difficulty: 'soldier' },
    ],
    warrior: [
        { kiche: "kaq", english: "red", spanish: "rojo", icon: "🔴", culture: "Kaq iq' means 'red chile'. In Q'eqchi' Maya, this dish is called Kak'ik - a sacred turkey soup.", difficulty: 'warrior' },
        { kiche: "q'eq", english: "black", spanish: "negro", icon: "⚫", culture: "Q'eq represents the night, the underworld Xib'alb'a, and the west.", difficulty: 'warrior' },
        { kiche: "saq", english: "white", spanish: "blanco", icon: "⚪", culture: "Saq represents dawn, purity, and the north. Saqarik means 'it dawns/good morning'.", difficulty: 'warrior' },
        { kiche: "rax", english: "green/blue", spanish: "verde/azul", icon: "🟢", culture: "K'iche' uses one word for green and blue - the color of jade and the sky.", difficulty: 'warrior' },
        { kiche: "q'an", english: "yellow", spanish: "amarillo", icon: "🟡", culture: "Q'an represents the south and ripe corn. Q'anil is a day sign meaning 'seed'.", difficulty: 'warrior' },
        { kiche: "juyub'", english: "mountain", spanish: "montaña", icon: "🏔️", culture: "Mountains are living beings in Maya thought. Many are named Juyub' + a quality.", difficulty: 'warrior' },
        { kiche: "k'uk'", english: "quetzal", spanish: "quetzal", icon: "🦜", culture: "The quetzal's feathers adorned K'iche' royalty. Tecun Uman wore a quetzal headdress.", difficulty: 'warrior' },
        { kiche: "tz'i'", english: "dog", spanish: "perro", icon: "🐕", culture: "Tz'i' is also a day sign. Dogs guided souls to Xib'alb'a in Maya belief.", difficulty: 'warrior' },
        { kiche: "ab'aj", english: "stone", spanish: "piedra", icon: "🪨", culture: "The Maya built their pyramids from ab'aj. Stone altars are still used in ceremonies.", difficulty: 'warrior' },
        { kiche: "kej", english: "deer/horse", spanish: "venado/caballo", icon: "🦌", culture: "Kej originally meant deer. After Spanish arrival, it also came to mean horse.", difficulty: 'warrior' },
        { kiche: "achi", english: "man", spanish: "hombre", icon: "👨", culture: "The Rabinal Achi is a famous K'iche' drama about a captured warrior.", difficulty: 'warrior' },
        { kiche: "ixoq", english: "woman", spanish: "mujer", icon: "👩", culture: "Ixoq shares the 'ix' prefix with Ixchel, the Maya moon goddess.", difficulty: 'warrior' },
        { kiche: "ak'al", english: "child", spanish: "niño", icon: "👶", culture: "Children are treasured. An ak'al's first words are celebrated in Maya families.", difficulty: 'warrior' },
        { kiche: "tat", english: "father", spanish: "padre", icon: "👨‍👦", culture: "Tat is used as an honorific for elder men, like 'tat Wel' (Mr. Manuel).", difficulty: 'warrior' },
        { kiche: "nan", english: "mother", spanish: "madre", icon: "👩‍👦", culture: "Nan is used respectfully for women. Nan Mariy (Mrs. María) shows respect.", difficulty: 'warrior' },
        { kiche: "ch'umil", english: "star", spanish: "estrella", icon: "⭐", culture: "The Hero Twins became the sun and moon; other ancestors became ch'umil (stars).", difficulty: 'warrior' },
        { kiche: "kotz'i'j", english: "flower", spanish: "flor", icon: "🌸", culture: "Kotz'i'j also means 'candle' and 'Maya ceremony' - flowers honor the ancestors.", difficulty: 'warrior' },
    ],
    hero: [
        { kiche: "kaminaq", english: "death/the dead", spanish: "muerte/los muertos", icon: "💀", culture: "Kaminaq are honored ancestors. Jun Kame and Wuqub' Kame ruled Xib'alb'a.", difficulty: 'hero' },
        { kiche: "sutz'", english: "cloud", spanish: "nube", icon: "☁️", culture: "Clouds carry the rain (jab'). The Maya observed clouds to predict weather.", difficulty: 'hero' },
        { kiche: "kaq'iq'", english: "wind", spanish: "viento", icon: "💨", culture: "Juraqan (hurricane) was a wind deity. Kaq'iq' carries prayers to the sky.", difficulty: 'hero' },
        { kiche: "jab'", english: "rain", spanish: "lluvia", icon: "🌧️", culture: "Chaak (the rain deity) was honored with ceremonies to bring jab' for crops.", difficulty: 'hero' },
        { kiche: "tinamit", english: "town/city", spanish: "pueblo/ciudad", icon: "🏘️", culture: "Tinamit were organized communities. Q'umarkaj was the great K'iche' tinamit.", difficulty: 'hero' },
        { kiche: "b'e", english: "road/path", spanish: "camino", icon: "🛤️", culture: "Maya roads (sakb'e) connected cities. B'e also means destiny or way of life.", difficulty: 'hero' },
        { kiche: "siwan", english: "ravine/canyon", spanish: "barranco", icon: "🏜️", culture: "The highlands are full of siwan. They were strategic in K'iche' warfare.", difficulty: 'hero' },
        { kiche: "cho", english: "lake", spanish: "lago", icon: "🌊", culture: "Lake Atitlán (Chi ya') is the sacred lake surrounded by volcanoes.", difficulty: 'hero' },
    ],
};

// Note: Full vocabulary content would be imported here. For brevity in this migration,
// we'll create placeholder exports that will be populated from the legacy file.
// The actual content remains in lessons.js for now and is loaded via window globals.

// Placeholder exports - these will be populated by the legacy JS file
export const VOCABULARY_ANIMALS: LessonContent = { core: [], warrior: [], hero: [] };
export const VOCABULARY_WARFARE: LessonContent = { core: [], warrior: [], hero: [] };
export const VOCABULARY_PLACES: LessonContent = { core: [], warrior: [], hero: [] };
export const VOCABULARY_SPIRITUAL: LessonContent = { core: [], warrior: [], hero: [] };
export const VOCABULARY_ADVANCED: LessonContent = { core: [], warrior: [], hero: [] };
export const GREETINGS_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const NUMBERS_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const PRONOUNS_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const POSSESSION_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const NEGATION_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const VERBS_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const ADJECTIVES_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const COMMANDS_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const EXISTENTIAL_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const QUESTIONS_CONTENT: LessonContent = { core: [], warrior: [], hero: [] };
export const NEGATION_QUESTIONS = { yesNo: [], sentencePairs: [] };

// ========================================
// LESSONS METADATA
// ========================================

export const LESSONS: Record<string, Lesson> = {
    vocabulary: {
        id: 'vocabulary',
        name: "Taq Tzij",
        englishName: 'Nature & Elements',
        spanishName: 'Naturaleza y Elementos',
        description: 'Sacred words of earth, water, fire, and sky',
        icon: '🌿',
    },
    vocabulary_animals: {
        id: 'vocabulary_animals',
        name: "Taq Awaj",
        englishName: 'Animals & Creatures',
        spanishName: 'Animales y Criaturas',
        description: 'Animals of the Maya world - jaguar, quetzal, and more',
        icon: '🦜',
    },
    vocabulary_warfare: {
        id: 'vocabulary_warfare',
        name: "Ch'akoj Tzij",
        englishName: 'War & Conflict',
        spanishName: 'Guerra y Conflicto',
        description: 'Words of battle, defense, and resistance',
        icon: '⚔️',
    },
    vocabulary_places: {
        id: 'vocabulary_places',
        name: "K'olib'al",
        englishName: 'Places & Geography',
        spanishName: 'Lugares y Geografía',
        description: 'Mountains, rivers, cities of the K\'iche\' world',
        icon: '🏔️',
    },
    vocabulary_spiritual: {
        id: 'vocabulary_spiritual',
        name: "Tyoxil Tzij",
        englishName: 'Spiritual & Sacred',
        spanishName: 'Espiritual y Sagrado',
        description: 'Sacred concepts from the Popol Vuh',
        icon: '✨',
    },
    vocabulary_advanced: {
        id: 'vocabulary_advanced',
        name: "Nimalaj Tzij",
        englishName: 'Advanced Concepts',
        spanishName: 'Conceptos Avanzados',
        description: 'Complex ideas and abstract vocabulary',
        icon: '📚',
    },
    greetings: {
        id: 'greetings',
        name: "Taq Tzij",
        englishName: 'Greetings',
        spanishName: 'Saludos',
        description: 'Daily greetings and polite expressions',
        icon: '👋',
    },
    pronouns: {
        id: 'pronouns',
        name: "K'amon Tzij",
        englishName: 'Pronouns',
        spanishName: 'Pronombres',
        description: 'I, you, we, they - essential person markers',
        icon: '👥',
    },
    possession: {
        id: 'possession',
        name: "Wajaw",
        englishName: 'Possession',
        spanishName: 'Posesión',
        description: 'My house, your name - expressing ownership',
        icon: '🏠',
    },
    negation: {
        id: 'negation',
        name: 'Na...taj',
        englishName: 'Negation',
        spanishName: 'Negación',
        description: 'Learn to say "no" and negate verbs',
        icon: '🚫',
    },
    intransitive_verbs: {
        id: 'intransitive_verbs',
        name: "Taq B'anoj",
        englishName: 'Verbs (Intransitive)',
        spanishName: 'Verbos (Intransitivo)',
        description: 'Actions without objects - go, sleep, eat',
        icon: '🏃',
    },
    numbers: {
        id: 'numbers',
        name: "Taq Ajilab'al",
        englishName: 'Numbers',
        spanishName: 'Números',
        description: 'The Maya vigesimal (base-20) number system',
        icon: '🔢',
    },
    adjectives: {
        id: 'adjectives',
        name: "B'anowinaq",
        englishName: 'Adjectives',
        spanishName: 'Adjetivos',
        description: 'Describe things - big, small, good, bad',
        icon: '🎨',
    },
    commands: {
        id: 'commands',
        name: "Pixab'",
        englishName: 'Commands',
        spanishName: 'Mandatos',
        description: 'Give orders and requests',
        icon: '👆',
    },
    questions: {
        id: 'questions',
        name: "Taq K'utunïk",
        englishName: 'Questions',
        spanishName: 'Preguntas',
        description: 'Ask yes/no and information questions',
        icon: '❓',
    },
};

// ========================================
// HELPER FUNCTIONS
// ========================================

function getContentForDifficulty(contentObj: LessonContent): VocabularyItem[] {
    const difficulty = getDifficulty();
    let items = [...contentObj.core];
    
    if (difficulty === DIFFICULTY.WARRIOR || difficulty === DIFFICULTY.HERO) {
        items = items.concat(contentObj.warrior || []);
    }
    
    if (difficulty === DIFFICULTY.HERO) {
        items = items.concat(contentObj.hero || []);
    }
    
    return items;
}

// ========================================
// QUESTION GENERATION
// ========================================

function createRecallQuestion(item: VocabularyItem, allItems: VocabularyItem[], lessonId: string): Question {
    return {
        type: QUESTION_TYPE.RECALL_TYPE,
        instruction: t('typeWordYouLearned'),
        prompt: item.icon || `[${item.english}]`,
        promptHint: item.english,
        correctAnswer: item.kiche,
        acceptableAnswers: [item.kiche.toLowerCase()],
        culture: item.culture,
        lessonId: lessonId,
        word: item,
        isTypingQuestion: true,
    };
}

function createCulturalQuestion(item: VocabularyItem, type: QuestionTypeValue, allItems: VocabularyItem[], lessonId: string): Question {
    const question: Question = {
        word: item,
        type: type,
        lessonId: lessonId,
        culture: item.culture,
        correctAnswer: '',
        prompt: '',
        instruction: '',
    };
    
    switch (type) {
        case QUESTION_TYPE.ICON_SELECT:
            question.instruction = t('selectIconFor');
            question.prompt = item.kiche;
            question.correctAnswer = item.icon || '';
            
            const wrongIcons = allItems
                .filter(w => w.icon && w.icon !== item.icon)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(w => w.icon!);
            question.choices = [item.icon!, ...wrongIcons].sort(() => Math.random() - 0.5);
            break;
            
        case QUESTION_TYPE.ICON_TEXT_SELECT:
            question.instruction = t('selectMeaningOf');
            question.prompt = item.kiche;
            question.correctAnswer = `${item.icon} ${item.english}`;
            
            const wrongChoices = allItems
                .filter(w => w.kiche !== item.kiche && w.icon)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(w => `${w.icon} ${w.english}`);
            question.choices = [`${item.icon} ${item.english}`, ...wrongChoices].sort(() => Math.random() - 0.5);
            break;
            
        case QUESTION_TYPE.MULTIPLE_CHOICE:
            const toKiche = Math.random() > 0.5;
            if (toKiche) {
                question.instruction = t('selectKicheFor');
                question.prompt = item.english;
                question.correctAnswer = item.kiche;
                const wrong = allItems
                    .filter(w => w.kiche !== item.kiche)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map(w => w.kiche);
                question.choices = [item.kiche, ...wrong].sort(() => Math.random() - 0.5);
            } else {
                question.instruction = t('selectMeaningOf');
                question.prompt = item.kiche;
                question.correctAnswer = item.english;
                const wrong = allItems
                    .filter(w => w.english !== item.english)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map(w => w.english);
                question.choices = [item.english, ...wrong].sort(() => Math.random() - 0.5);
            }
            break;
            
        case QUESTION_TYPE.TRANSLATE_TO_KICHE:
            question.instruction = t('translateToKiche');
            question.prompt = item.english;
            question.correctAnswer = item.kiche;
            question.isTypingQuestion = true;
            question.acceptableAnswers = [item.kiche.toLowerCase()];
            break;
            
        case QUESTION_TYPE.TRANSLATE_FROM_KICHE:
            question.instruction = t('translateToEnglish');
            question.prompt = item.kiche;
            question.correctAnswer = item.english;
            question.isTypingQuestion = true;
            question.acceptableAnswers = [item.english.toLowerCase()];
            break;
    }
    
    return question;
}

// For now, this function delegates to the legacy JS implementation
// We'll fully migrate it later
export function generateLessonQuestions(lessonId: string, count: number = 5, learnedWords: any[] = []): Question[] {
    // Use the window global if it exists (from legacy JS)
    if ((window as any).generateLessonQuestions && (window as any)._legacyGenerateLessonQuestions) {
        return (window as any)._legacyGenerateLessonQuestions(lessonId, count, learnedWords);
    }
    
    // Fallback implementation for CULTURAL_VOCABULARY only
    const items = getContentForDifficulty(CULTURAL_VOCABULARY);
    const questions: Question[] = [];
    const difficulty = getDifficulty();
    
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    
    selected.forEach((item, index) => {
        const hasIcon = item.icon && item.icon.length > 0;
        
        let questionTypes: QuestionTypeValue[];
        if (difficulty === DIFFICULTY.SOLDIER) {
            questionTypes = hasIcon 
                ? [QUESTION_TYPE.ICON_TEXT_SELECT, QUESTION_TYPE.ICON_SELECT, QUESTION_TYPE.MULTIPLE_CHOICE]
                : [QUESTION_TYPE.MULTIPLE_CHOICE];
        } else if (difficulty === DIFFICULTY.WARRIOR) {
            questionTypes = hasIcon 
                ? [QUESTION_TYPE.ICON_SELECT, QUESTION_TYPE.ICON_TEXT_SELECT, QUESTION_TYPE.MULTIPLE_CHOICE, QUESTION_TYPE.TRANSLATE_TO_KICHE]
                : [QUESTION_TYPE.MULTIPLE_CHOICE, QUESTION_TYPE.TRANSLATE_TO_KICHE];
        } else {
            questionTypes = hasIcon 
                ? [QUESTION_TYPE.ICON_SELECT, QUESTION_TYPE.TRANSLATE_TO_KICHE, QUESTION_TYPE.RECALL_TYPE, QUESTION_TYPE.MULTIPLE_CHOICE]
                : [QUESTION_TYPE.TRANSLATE_TO_KICHE, QUESTION_TYPE.TRANSLATE_FROM_KICHE, QUESTION_TYPE.MULTIPLE_CHOICE];
        }
        
        const type = questionTypes[index % questionTypes.length];
        questions.push(createCulturalQuestion(item, type, items, lessonId));
    });
    
    return questions.sort(() => Math.random() - 0.5);
}

export function checkLessonAnswer(question: Question, userAnswer: string): boolean {
    const normalizedUser = userAnswer.toLowerCase().trim();
    const normalizedCorrect = question.correctAnswer.toLowerCase().trim();
    
    // Exact match
    if (normalizedUser === normalizedCorrect) return true;
    
    // Check acceptable answers
    if (question.acceptableAnswers) {
        if (question.acceptableAnswers.some(a => normalizedUser === a.toLowerCase())) {
            return true;
        }
    }
    
    // Allow for common K'iche' typing variations
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
// NOTE ON GLOBAL EXPORTS
// ========================================
// The window globals are still provided by lessons.js
// This TypeScript file provides typed exports for future migration
// When lessons.js is removed, uncomment these:
//
// (window as any).LESSON_TYPES = LESSON_TYPES;
// (window as any).LESSONS = LESSONS;
// (window as any).DIFFICULTY = DIFFICULTY;
// (window as any).QUESTION_TYPE = QUESTION_TYPE;
// (window as any).setDifficulty = setDifficulty;
// (window as any).getDifficulty = getDifficulty;
// (window as any).generateLessonQuestions = generateLessonQuestions;
// (window as any).checkLessonAnswer = checkLessonAnswer;
// (window as any).CULTURAL_VOCABULARY = CULTURAL_VOCABULARY;

