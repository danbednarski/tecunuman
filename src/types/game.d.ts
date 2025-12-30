/**
 * Type definitions for Tecun Uman game
 * These are declaration files - they describe existing code without changing behavior
 */

// ========================================
// DIFFICULTY LEVELS
// ========================================

type DifficultyLevel = 'soldier' | 'warrior' | 'hero';

// ========================================
// MAP NODES
// ========================================

type NodeStatus = 'kiche' | 'spanish' | 'contested' | 'unexplored';

interface NodeRequirement {
  nodeId: string;
  difficulty: DifficultyLevel;
}

interface MapNode {
  id: string;
  x: number;
  y: number;
  name: string;
  description: string;
  lessonType: string;
  status: NodeStatus;
  spanishStrength?: number;
  requires?: NodeRequirement[];
  region?: string;
  revealed?: boolean;
  completed?: {
    soldier?: boolean;
    warrior?: boolean;
    hero?: boolean;
  };
}

// ========================================
// BATTLE STATE
// ========================================

type BattleType = 'attack' | 'defend' | 'train';

interface BattleState {
  node: MapNode;
  type: BattleType;
  difficulty: DifficultyLevel;
  questionCount: number;
  startingArmy: number;
  startingEnemyStrength: number;
  enemyStrength: number;
}

// ========================================
// GAME STATE
// ========================================

interface GameStateType {
  // Resources
  army: number;
  morale: number;
  kicheMastery: number;
  
  // Position
  armyPosition: string;
  
  // Progress
  turn: number;
  year: number;
  completedLessons: Map<string, Set<DifficultyLevel>>;
  learnedWords: Array<{ kiche: string; english: string }>;
  
  // Map state
  nodes: MapNode[];
  revealedNodes: Set<string>;
  
  // Current battle/quiz
  currentBattle: BattleState | null;
  currentQuestions: Question[];
  currentQuestionIndex: number;
  correctAnswers: number;
  
  // Flags
  gameStarted: boolean;
}

// ========================================
// QUESTIONS & LESSONS
// ========================================

interface VocabularyItem {
  kiche: string;
  english: string;
  spanish?: string;
  icon?: string;
  culture?: string;
  difficulty?: DifficultyLevel;
  example?: string;
  conjugation?: string;
}

interface LessonContent {
  core: VocabularyItem[];
  warrior: VocabularyItem[];
  hero: VocabularyItem[];
}

interface Question {
  type: string;
  instruction: string;
  prompt: string;
  promptEs?: string;
  promptHint?: string;
  correctAnswer: string;
  choices?: string[];
  culture?: string;
  lessonId: string;
  word: VocabularyItem;
  isTypingQuestion?: boolean;
  acceptableAnswers?: string[];
}

interface Lesson {
  id: string;
  name: string;
  kicheName: string;
  spanishName: string;
  description: string;
  icon: string;
}

// ========================================
// i18n
// ========================================

type Language = 'en' | 'es';

interface Translations {
  [key: string]: string;
}

// ========================================
// DEBUG
// ========================================

interface DebugObject {
  enabled: boolean;
  log: (...args: any[]) => void;
  addArmy: (amount: number) => void;
  setMorale: (value: number) => void;
  teleport: (nodeId: string) => void;
  captureNode: (nodeId: string) => void;
  completeLesson: (nodeId: string, difficulty?: DifficultyLevel) => void;
  listNodes: () => void;
}

// ========================================
// GLOBAL DECLARATIONS
// ========================================

declare global {
  interface Window {
    GameState: GameStateType;
    DEBUG: DebugObject;
    LESSONS: Record<string, Lesson>;
    CULTURAL_VOCABULARY: LessonContent;
    generateLessonQuestions: (lessonId: string, count?: number, learnedWords?: any[]) => Question[];
    checkLessonAnswer: (question: Question, answer: string) => boolean;
    t: (key: string) => string;
    getLanguage: () => Language;
    setLanguage: (lang: Language) => void;
    getDifficulty: () => DifficultyLevel;
    setDifficulty: (diff: DifficultyLevel) => void;
  }
}

export {};

