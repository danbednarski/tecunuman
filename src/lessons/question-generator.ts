// ========================================
// QUESTION GENERATION FUNCTIONS
// ========================================

import {
    DifficultyLevel,
    DIFFICULTY,
    QUESTION_TYPE,
    VocabularyItem,
    LessonContent,
    Question,
    ConversationPhrase,
    KicheResponse,
    YesNoQuestion,
    SentencePair,
} from './types';

import {
    CULTURAL_VOCABULARY,
    VOCABULARY_ANIMALS,
    VOCABULARY_WARFARE,
    VOCABULARY_PLACES,
    VOCABULARY_SPIRITUAL,
    VOCABULARY_ADVANCED,
    GREETINGS_CONTENT,
    NUMBERS_CONTENT,
    PRONOUNS_CONTENT,
    POSSESSION_CONTENT,
    NEGATION_CONTENT,
    NEGATION_QUESTIONS,
    VERBS_CONTENT,
    COMMANDS_CONTENT,
    EXISTENTIAL_CONTENT,
    QUESTIONS_CONTENT,
    ADJECTIVES_CONTENT,
    CONVERSATION_EXCHANGES,
} from './vocabulary-data';

// Current difficulty (default to warrior)
let currentDifficulty: DifficultyLevel = DIFFICULTY.WARRIOR as DifficultyLevel;

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

// Helper to get t() function from global window
function t(key: string): string {
    return typeof (window as any).t === 'function' ? (window as any).t(key) : key;
}

// Helper to get language from global window
function getLanguage(): string {
    return typeof (window as any).getCurrentLanguage === 'function' 
        ? (window as any).getCurrentLanguage() 
        : 'en';
}

export function getContentForDifficulty(contentObj: LessonContent): VocabularyItem[] {
    const difficulty = getDifficulty();
    let items: VocabularyItem[] = [...contentObj.core];
    
    if (difficulty === DIFFICULTY.WARRIOR || difficulty === DIFFICULTY.HERO) {
        items = items.concat(contentObj.warrior || []);
    }
    
    if (difficulty === DIFFICULTY.HERO) {
        items = items.concat(contentObj.hero || []);
    }
    
    return items;
}

export function generateLessonQuestions(lessonId: string, count: number = 5, learnedWords: VocabularyItem[] = []): Question[] {
    let contentSource: LessonContent;
    
    switch (lessonId) {
        case 'vocabulary':
            contentSource = CULTURAL_VOCABULARY;
            break;
        case 'vocabulary_animals':
            contentSource = VOCABULARY_ANIMALS;
            break;
        case 'vocabulary_warfare':
            contentSource = VOCABULARY_WARFARE;
            break;
        case 'vocabulary_places':
            contentSource = VOCABULARY_PLACES;
            break;
        case 'vocabulary_spiritual':
            contentSource = VOCABULARY_SPIRITUAL;
            break;
        case 'vocabulary_advanced':
            contentSource = VOCABULARY_ADVANCED;
            break;
        case 'greetings':
            contentSource = GREETINGS_CONTENT;
            break;
        case 'numbers':
            contentSource = NUMBERS_CONTENT;
            break;
        case 'pronouns':
            contentSource = PRONOUNS_CONTENT;
            break;
        case 'possession':
            contentSource = POSSESSION_CONTENT;
            break;
        case 'negation':
            contentSource = NEGATION_CONTENT;
            break;
        case 'intransitive_verbs':
            contentSource = VERBS_CONTENT;
            break;
        case 'adjectives':
            contentSource = ADJECTIVES_CONTENT;
            break;
        case 'commands':
            contentSource = COMMANDS_CONTENT;
            break;
        case 'existential':
            contentSource = EXISTENTIAL_CONTENT;
            break;
        case 'questions':
            contentSource = QUESTIONS_CONTENT;
            break;
        default:
            contentSource = CULTURAL_VOCABULARY;
    }
    
    const items = getContentForDifficulty(contentSource);
    const questions: Question[] = [];
    const difficulty = getDifficulty();
    
    // For greetings, mix in conversational phrase questions
    if (lessonId === 'greetings') {
        const phraseQuestions = generateConversationQuestions(count, difficulty);
        // Replace some standard questions with conversation ones
        const numConversation = Math.min(Math.ceil(count / 2), phraseQuestions.length);
        questions.push(...phraseQuestions.slice(0, numConversation));
    }
    
    // For negation, add special question types
    if (lessonId === 'negation') {
        const negationQuestions = generateNegationQuestions(count, difficulty);
        // Mix negation-specific questions with standard ones
        const numNegation = Math.min(Math.ceil(count * 0.6), negationQuestions.length);
        questions.push(...negationQuestions.slice(0, numNegation));
    }
    
    // Check for recall questions - if user has learned words, include some
    const recallItems = items.filter(item => 
        learnedWords.some(lw => lw.kiche === item.kiche)
    );
    
    if (recallItems.length > 0 && difficulty !== DIFFICULTY.SOLDIER) {
        // Add 1-2 recall questions for words they've learned
        const numRecall = Math.min(Math.ceil(count / 4), recallItems.length);
        const recallSelected = recallItems.sort(() => Math.random() - 0.5).slice(0, numRecall);
        recallSelected.forEach(item => {
            questions.push(createRecallQuestion(item, items, lessonId));
        });
    }
    
    // Fill remaining slots with standard questions
    const remainingCount = count - questions.length;
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, remainingCount);
    
    // Generate varied question types
    selected.forEach((item, index) => {
        const hasIcon = item.icon && item.icon.length > 0;
        
        // More variety in question types based on difficulty
        let questionTypes: string[];
        if (difficulty === DIFFICULTY.SOLDIER) {
            // Simpler: mostly icon selection with text hints
            questionTypes = hasIcon 
                ? [QUESTION_TYPE.ICON_TEXT_SELECT, QUESTION_TYPE.ICON_SELECT, QUESTION_TYPE.MULTIPLE_CHOICE]
                : [QUESTION_TYPE.MULTIPLE_CHOICE];
        } else if (difficulty === DIFFICULTY.WARRIOR) {
            // Mix of icon, text, and some typing
            questionTypes = hasIcon 
                ? [QUESTION_TYPE.ICON_SELECT, QUESTION_TYPE.ICON_TEXT_SELECT, QUESTION_TYPE.MULTIPLE_CHOICE, QUESTION_TYPE.TRANSLATE_TO_KICHE]
                : [QUESTION_TYPE.MULTIPLE_CHOICE, QUESTION_TYPE.TRANSLATE_TO_KICHE];
        } else {
            // Hero: more typing, K'iche' conversations
            questionTypes = hasIcon 
                ? [QUESTION_TYPE.ICON_SELECT, QUESTION_TYPE.TRANSLATE_TO_KICHE, QUESTION_TYPE.RECALL_TYPE, QUESTION_TYPE.MULTIPLE_CHOICE]
                : [QUESTION_TYPE.TRANSLATE_TO_KICHE, QUESTION_TYPE.TRANSLATE_FROM_KICHE, QUESTION_TYPE.MULTIPLE_CHOICE];
        }
        
        const type = questionTypes[index % questionTypes.length];
        questions.push(createCulturalQuestion(item, type, items, lessonId));
    });
    
    // Shuffle final questions
    return questions.sort(() => Math.random() - 0.5);
}

// Generate conversational phrase selection questions
function generateConversationQuestions(count: number, difficulty: DifficultyLevel): Question[] {
    const questions: Question[] = [];
    
    // Filter by difficulty
    const phraseSelect = CONVERSATION_EXCHANGES.phraseSelect.filter((p: ConversationPhrase) => {
        if (difficulty === DIFFICULTY.SOLDIER) return p.difficulty === 'soldier';
        if (difficulty === DIFFICULTY.WARRIOR) return p.difficulty === 'soldier' || p.difficulty === 'warrior';
        return true; // Hero gets all
    });
    
    const kicheResponses = CONVERSATION_EXCHANGES.kicheResponses.filter((p: KicheResponse) => {
        if (difficulty === DIFFICULTY.SOLDIER) return false; // No K'iche' responses for soldiers
        if (difficulty === DIFFICULTY.WARRIOR) return p.difficulty === 'warrior';
        return true; // Hero gets all
    });
    
    // Add phrase select questions (How would you ask X?)
    const selectedPhrases = phraseSelect.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 2));
    selectedPhrases.forEach((phrase: ConversationPhrase) => {
        questions.push({
            type: QUESTION_TYPE.PHRASE_SELECT,
            instruction: t('howWouldYou'),
            prompt: phrase.icon + ' ' + phrase.situation,
            promptEs: phrase.icon + ' ' + phrase.situationEs,
            correctAnswer: phrase.correctPhrase,
            choices: [phrase.correctPhrase, ...phrase.wrongPhrases].sort(() => Math.random() - 0.5),
            culture: phrase.culture,
            lessonId: 'greetings',
            word: { kiche: phrase.correctPhrase, english: phrase.situation, culture: phrase.culture } as VocabularyItem,
        });
    });
    
    // Add K'iche' conversation response questions (advanced)
    if (kicheResponses.length > 0) {
        const selectedResponses = kicheResponses.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 3));
        selectedResponses.forEach((conv: KicheResponse) => {
            questions.push({
                type: QUESTION_TYPE.CONVERSATION_RESPOND,
                instruction: t('respondInKiche'),
                prompt: conv.prompt,
                promptTranslation: conv.promptTranslation,
                icon: conv.icon,
                correctAnswer: conv.correctResponse,
                choices: [conv.correctResponse, ...conv.wrongResponses].sort(() => Math.random() - 0.5),
                responseTranslation: conv.responseTranslation,
                culture: conv.culture,
                lessonId: 'greetings',
                word: { kiche: conv.correctResponse, english: conv.responseTranslation, culture: conv.culture } as VocabularyItem,
            });
        });
    }
    
    return questions;
}

// Generate special questions for negation practice
function generateNegationQuestions(count: number, difficulty: DifficultyLevel): Question[] {
    const questions: Question[] = [];
    const lang = getLanguage();
    
    // Filter by difficulty
    const yesNoQuestions = NEGATION_QUESTIONS.yesNo.filter((q: YesNoQuestion) => {
        if (difficulty === DIFFICULTY.SOLDIER) return q.difficulty === 'soldier';
        if (difficulty === DIFFICULTY.WARRIOR) return q.difficulty === 'soldier' || q.difficulty === 'warrior';
        return true; // Hero gets all
    });
    
    const sentencePairs = NEGATION_QUESTIONS.sentencePairs.filter((q: SentencePair) => {
        if (difficulty === DIFFICULTY.SOLDIER) return q.difficulty === 'soldier';
        if (difficulty === DIFFICULTY.WARRIOR) return q.difficulty === 'soldier' || q.difficulty === 'warrior';
        return true;
    });
    
    // 1. Yes/No answer questions - "How do you answer 'no' to this question?"
    const selectedYesNo = yesNoQuestions.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 3));
    selectedYesNo.forEach((q: YesNoQuestion) => {
        const askForNo = Math.random() > 0.5;
        questions.push({
            type: QUESTION_TYPE.MULTIPLE_CHOICE,
            instruction: lang === 'es' 
                ? (askForNo ? '¿Cómo dices "no" a esta pregunta?' : '¿Cómo dices "sí" a esta pregunta?')
                : (askForNo ? 'How do you say "no" to this question?' : 'How do you say "yes" to this question?'),
            prompt: q.question,
            promptHint: lang === 'es' ? q.questionEs : q.questionEn,
            correctAnswer: askForNo ? 'mani' : 'je\'',
            choices: ['mani', 'je\'', 'na...taj', 'majun'].sort(() => Math.random() - 0.5),
            culture: askForNo 
                ? 'Mani is used to answer "no" to yes/no questions.'
                : 'Je\' is used to answer "yes" to yes/no questions.',
            lessonId: 'negation',
            word: { kiche: askForNo ? 'mani' : 'je\'', english: askForNo ? 'no' : 'yes' } as VocabularyItem,
        });
    });
    
    // 2. Affirmative to Negative transformation
    const selectedPairs = sentencePairs.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 3));
    selectedPairs.forEach((pair: SentencePair) => {
        // Randomly choose: negate affirmative OR affirm negative
        const toNegative = Math.random() > 0.3; // More often ask to negate
        
        if (toNegative) {
            // "How do you say 'I don't go'?"
            questions.push({
                type: QUESTION_TYPE.MULTIPLE_CHOICE,
                instruction: lang === 'es' 
                    ? `¿Cómo niegas "${pair.affirmativeEn}"?`
                    : `How do you negate "${pair.affirmativeEn}"?`,
                prompt: `${pair.affirmative} → ???`,
                promptHint: `${pair.affirmativeEn} → ${pair.negativeEn}`,
                correctAnswer: pair.negative,
                choices: generateNegationChoices(pair.negative, sentencePairs),
                culture: `Na...taj wraps around the verb: ${pair.affirmative} → ${pair.negative}`,
                lessonId: 'negation',
                word: { kiche: pair.negative, english: pair.negativeEn } as VocabularyItem,
            });
        } else {
            // "What does 'na kimb'e taj' mean?"
            questions.push({
                type: QUESTION_TYPE.MULTIPLE_CHOICE,
                instruction: lang === 'es' 
                    ? '¿Qué significa esta oración?'
                    : 'What does this sentence mean?',
                prompt: pair.negative,
                correctAnswer: pair.negativeEn,
                choices: [pair.negativeEn, pair.affirmativeEn, 
                    sentencePairs[(sentencePairs.indexOf(pair) + 1) % sentencePairs.length].negativeEn,
                    sentencePairs[(sentencePairs.indexOf(pair) + 2) % sentencePairs.length].affirmativeEn
                ].sort(() => Math.random() - 0.5),
                culture: `${pair.negative} = ${pair.negativeEn}`,
                lessonId: 'negation',
                word: { kiche: pair.negative, english: pair.negativeEn } as VocabularyItem,
            });
        }
    });
    
    // 3. Negative command questions (for warrior+)
    if (difficulty !== DIFFICULTY.SOLDIER) {
        const negativeCommands = [
            { positive: "Jab'e!", positiveEn: "Go!", negative: "Matb'e!", negativeEn: "Don't go!" },
            { positive: "Chatwa'!", positiveEn: "Eat!", negative: "Matwa'!", negativeEn: "Don't eat!" },
            { positive: "Chach'awa!", positiveEn: "Speak!", negative: "Match'awa!", negativeEn: "Don't speak!" },
        ];
        
        const selectedCommands = negativeCommands.sort(() => Math.random() - 0.5).slice(0, 1);
        selectedCommands.forEach(cmd => {
            questions.push({
                type: QUESTION_TYPE.MULTIPLE_CHOICE,
                instruction: lang === 'es'
                    ? `Si "${cmd.positiveEn}" es "${cmd.positive}", ¿cómo dices "${cmd.negativeEn}"?`
                    : `If "${cmd.positiveEn}" is "${cmd.positive}", how do you say "${cmd.negativeEn}"?`,
                prompt: `${cmd.positive} → ???`,
                correctAnswer: cmd.negative,
                choices: [cmd.negative, cmd.positive, 
                    negativeCommands[(negativeCommands.indexOf(cmd) + 1) % negativeCommands.length].negative,
                    'Mani ' + cmd.positive.toLowerCase()
                ].sort(() => Math.random() - 0.5),
                culture: `Positive commands use Ja-/Cha-, negative commands use Mat-. ${cmd.positive} → ${cmd.negative}`,
                lessonId: 'negation',
                word: { kiche: cmd.negative, english: cmd.negativeEn } as VocabularyItem,
            });
        });
    }
    
    return questions;
}

// Helper to generate plausible wrong answers for negation
function generateNegationChoices(correct: string, sentencePairs: SentencePair[]): string[] {
    const choices = [correct];
    
    // Add other negated sentences as wrong choices
    const others = sentencePairs
        .filter(p => p.negative !== correct)
        .map(p => p.negative)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
    choices.push(...others);
    
    // Add an affirmative as a tricky wrong answer
    const affirmative = sentencePairs.find(p => p.negative === correct);
    if (affirmative) {
        choices.push(affirmative.affirmative);
    } else {
        choices.push('mani');
    }
    
    return choices.sort(() => Math.random() - 0.5);
}

// Create a recall question - see the icon, type the word you learned
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

function createCulturalQuestion(item: VocabularyItem, type: string, allItems: VocabularyItem[], lessonId: string): Question {
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
            // Show K'iche' word, select the matching icon
            question.instruction = t('selectIconFor');
            question.prompt = item.kiche;
            question.correctAnswer = item.icon || '';
            
            // Get 3 wrong icon answers
            const otherIcons = allItems
                .filter(i => i.icon !== item.icon && i.icon)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(i => i.icon!);
            
            question.choices = [item.icon!, ...otherIcons].sort(() => Math.random() - 0.5);
            question.isIconQuestion = true;
            break;
        
        case QUESTION_TYPE.ICON_TEXT_SELECT:
            // Show K'iche' word, select icon + text label (clearer for beginners)
            question.instruction = t('selectMeaningOf');
            question.prompt = item.kiche;
            question.correctAnswer = `${item.icon} ${item.english}`;
            
            // Get 3 wrong icon+text answers
            const otherIconText = allItems
                .filter(i => i.kiche !== item.kiche && i.icon)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(i => `${i.icon} ${i.english}`);
            
            question.choices = [question.correctAnswer, ...otherIconText].sort(() => Math.random() - 0.5);
            question.isIconTextQuestion = true;
            break;
            
        case QUESTION_TYPE.MULTIPLE_CHOICE:
            // Random direction
            const toKiche = Math.random() > 0.5;
            if (toKiche) {
                question.instruction = t('selectKicheFor');
                question.prompt = item.icon ? `${item.icon} ${item.english}` : item.english;
                question.correctAnswer = item.kiche;
                const wrongKiche = allItems
                    .filter(i => i.kiche !== item.kiche)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map(i => i.kiche);
                question.choices = [item.kiche, ...wrongKiche].sort(() => Math.random() - 0.5);
            } else {
                question.instruction = t('whatDoesMean');
                question.prompt = item.kiche;
                question.correctAnswer = item.icon ? `${item.icon} ${item.english}` : item.english;
                const wrongEnglish = allItems
                    .filter(i => i.english !== item.english)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map(i => i.icon ? `${i.icon} ${i.english}` : i.english);
                question.choices = [question.correctAnswer, ...wrongEnglish].sort(() => Math.random() - 0.5);
            }
            break;
            
        case QUESTION_TYPE.TRANSLATE_TO_KICHE:
            question.instruction = t('translateToKiche');
            question.prompt = item.icon ? `${item.icon} ${item.english}` : item.english;
            question.correctAnswer = item.kiche;
            question.acceptableAnswers = [item.kiche.toLowerCase()];
            question.isTypingQuestion = true;
            break;
            
        case QUESTION_TYPE.TRANSLATE_FROM_KICHE:
            question.instruction = t('translateToEnglish');
            question.prompt = item.kiche;
            question.correctAnswer = item.english;
            question.acceptableAnswers = [item.english.toLowerCase(), item.spanish?.toLowerCase()].filter(Boolean) as string[];
            question.isTypingQuestion = true;
            break;
        
        case QUESTION_TYPE.RECALL_TYPE:
            // See icon/image, type the K'iche' word
            question.instruction = t('typeWordYouLearned');
            question.prompt = item.icon || `[${item.english}]`;
            question.promptHint = item.english;
            question.correctAnswer = item.kiche;
            question.acceptableAnswers = [item.kiche.toLowerCase()];
            question.isTypingQuestion = true;
            question.isRecallQuestion = true;
            break;
    }
    
    return question;
}

// Check answer with flexibility
export function checkLessonAnswer(userAnswer: string, question: Question): boolean {
    const normalizedUser = userAnswer.toLowerCase().trim();
    const normalizedCorrect = question.correctAnswer.toLowerCase().trim();
    
    // Exact match
    if (normalizedUser === normalizedCorrect) return true;
    
    // Check acceptable answers
    if (question.acceptableAnswers) {
        for (const acceptable of question.acceptableAnswers) {
            if (normalizedUser === acceptable.toLowerCase().trim()) {
                return true;
            }
        }
    }
    
    // Allow for common K'iche' character variations
    const simplify = (str: string): string => str
        .replace(/'/g, "'")
        .replace(/'/g, "'")
        .replace(/'/g, "")
        .replace(/'/g, "");
    
    if (simplify(normalizedUser) === simplify(normalizedCorrect)) {
        return true;
    }
    
    return false;
}

