// ========================================
// K'ICHE' LESSON TYPES
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
    isIconQuestion?: boolean;
    isIconTextQuestion?: boolean;
    isRecallQuestion?: boolean;
}

export interface Lesson {
    id: string;
    name: string;
    englishName: string;
    spanishName: string;
    description: string;
    icon: string;
}

export interface ConversationPhrase {
    situation: string;
    situationEs: string;
    icon: string;
    correctPhrase: string;
    wrongPhrases: string[];
    culture: string;
    difficulty: DifficultyLevel;
}

export interface KicheResponse {
    prompt: string;
    promptTranslation: string;
    icon: string;
    correctResponse: string;
    wrongResponses: string[];
    responseTranslation: string;
    culture: string;
    difficulty: DifficultyLevel;
}

export interface YesNoQuestion {
    question: string;
    questionEn: string;
    questionEs: string;
    correctAnswer: string;
    correctAnswerAlt: string;
    difficulty: DifficultyLevel;
}

export interface SentencePair {
    affirmative: string;
    affirmativeEn: string;
    negative: string;
    negativeEn: string;
    verb: string;
    difficulty: DifficultyLevel;
}

