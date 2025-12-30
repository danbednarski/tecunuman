// ========================================
// K'ICHE' LESSONS MODULE
// Main entry point - exports all lesson functionality
// ========================================

// Re-export types
export * from './types';

// Re-export vocabulary data
export * from './vocabulary-data';

// Re-export question generation functions
export {
    setDifficulty,
    getDifficulty,
    getContentForDifficulty,
    generateLessonQuestions,
    checkLessonAnswer,
} from './question-generator';

import { Lesson } from './types';

// ========================================
// LESSON METADATA FOR UI
// ========================================

export const LESSONS: Record<string, Lesson> = {
    vocabulary: {
        id: 'vocabulary',
        name: "K'ak'a taq tzij",
        englishName: 'Basic Vocabulary',
        spanishName: 'Vocabulario Básico',
        description: 'Learn essential words: elements, nature, and sacred concepts',
        icon: '📚',
    },
    vocabulary_animals: {
        id: 'vocabulary_animals',
        name: "Taq awaj",
        englishName: 'Animals & Nature',
        spanishName: 'Animales y Naturaleza',
        description: 'Learn the animals of Lake Atitlán and the highlands',
        icon: '🦜',
    },
    vocabulary_warfare: {
        id: 'vocabulary_warfare',
        name: "Ch'akoj tzij",
        englishName: 'War & Resistance',
        spanishName: 'Guerra y Resistencia',
        description: 'Learn the vocabulary of battle and defense',
        icon: '⚔️',
    },
    vocabulary_places: {
        id: 'vocabulary_places',
        name: "K'olib'al",
        englishName: 'Places & Geography',
        spanishName: 'Lugares y Geografía',
        description: 'Learn words for mountains, rivers, and sacred places',
        icon: '🏔️',
    },
    vocabulary_spiritual: {
        id: 'vocabulary_spiritual',
        name: "Loq'olaj tzij",
        englishName: 'Sacred & Spiritual',
        spanishName: 'Sagrado y Espiritual',
        description: 'Learn spiritual concepts and sacred vocabulary',
        icon: '✨',
    },
    vocabulary_advanced: {
        id: 'vocabulary_advanced',
        name: "Nim taq tzij",
        englishName: 'Advanced Concepts',
        spanishName: 'Conceptos Avanzados',
        description: 'Master complex words about history, philosophy, and culture',
        icon: '🏛️',
    },
    greetings: {
        id: 'greetings',
        name: 'Rutzil wachaj',
        englishName: 'Greetings',
        spanishName: 'Saludos',
        description: 'Traditional K\'iche\' greetings and courtesy',
        icon: '👋',
    },
    pronouns: {
        id: 'pronouns',
        name: "Taq b'i'aj",
        englishName: 'Pronouns',
        spanishName: 'Pronombres',
        description: 'Personal pronouns - I, you, we, they',
        icon: '👤',
    },
    possession: {
        id: 'possession',
        name: 'Possessive Markers',
        englishName: 'Possession',
        spanishName: 'Posesión',
        description: 'How to say my, your, our in K\'iche\'',
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
        name: 'Kemchi\'',
        englishName: 'Verbs',
        spanishName: 'Verbos',
        description: 'Action words - go, eat, sleep, speak',
        icon: '🚶',
    },
    numbers: {
        id: 'numbers',
        name: "Rajilab'al",
        englishName: 'Numbers',
        spanishName: 'Números',
        description: 'Count in the Maya vigesimal system',
        icon: '🔢',
    },
    existential: {
        id: 'existential',
        name: "K'o",
        englishName: 'Existence',
        spanishName: 'Existencia',
        description: 'Express "there is" and "to have"',
        icon: '✨',
    },
    questions: {
        id: 'questions',
        name: "K'otoj chi'aj",
        englishName: 'Questions',
        spanishName: 'Preguntas',
        description: 'Ask yes/no and information questions',
        icon: '❓',
    },
    commands: {
        id: 'commands',
        name: "Pixab'",
        englishName: 'Commands',
        spanishName: 'Mandatos',
        description: 'Give orders and requests',
        icon: '👆',
    },
    adjectives: {
        id: 'adjectives',
        name: "B'anowinaq",
        englishName: 'Adjectives',
        spanishName: 'Adjetivos',
        description: 'Describe things - big, small, good, bad',
        icon: '🎨',
    },
};


