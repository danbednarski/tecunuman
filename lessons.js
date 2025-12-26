// ========================================
// K'ICHE' LESSON CONTENT
// Based on University of Texas K'iche' Course
// With cultural context from Popol Vuh and Maya history
// ========================================

const LESSON_TYPES = {
    VOCABULARY: 'vocabulary',
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
};

// Difficulty levels
const DIFFICULTY = {
    SOLDIER: 'soldier',   // Core essentials only
    WARRIOR: 'warrior',   // Soldier + more content
    HERO: 'hero',         // Everything - become a true hero
};

// Current difficulty (default to warrior)
let currentDifficulty = DIFFICULTY.WARRIOR;

function setDifficulty(level) {
    if (Object.values(DIFFICULTY).includes(level)) {
        currentDifficulty = level;
        localStorage.setItem('tecunuman_difficulty', level);
    }
}

function getDifficulty() {
    const saved = localStorage.getItem('tecunuman_difficulty');
    if (saved && Object.values(DIFFICULTY).includes(saved)) {
        currentDifficulty = saved;
    }
    return currentDifficulty;
}

// Question types
const QUESTION_TYPE = {
    MULTIPLE_CHOICE: 'multiple_choice',
    ICON_SELECT: 'icon_select',           // Select the icon that matches the word
    ICON_TEXT_SELECT: 'icon_text_select', // Icon + text label for clarity
    TRANSLATE_TO_KICHE: 'translate_to_kiche',
    TRANSLATE_FROM_KICHE: 'translate_from_kiche',
    FILL_BLANK: 'fill_blank',
    RECALL_TYPE: 'recall_type',           // See icon, type the K'iche' word you learned
    PHRASE_SELECT: 'phrase_select',       // "How would you ask someone's name?" -> select phrase
    CONVERSATION_RESPOND: 'conversation_respond', // Given K'iche' question, respond in K'iche'
    AUDIO_SELECT: 'audio_select',         // Future: listen and select
};

// ========================================
// VOCABULARY WITH CULTURAL CONTEXT
// ========================================

const CULTURAL_VOCABULARY = {
    // CORE - Always included (Soldier level)
    core: [
        {
            kiche: "ja'",
            english: "water",
            spanish: "agua",
            icon: "💧",
            culture: "In the Popol Vuh, the world began as an endless sea. Ja' is one of the most sacred elements.",
            difficulty: 'soldier',
        },
        {
            kiche: "q'aq'",
            english: "fire",
            spanish: "fuego",
            icon: "🔥",
            culture: "Fire was a gift from Tohil, the K'iche' patron deity, to the ancestors at Tulan.",
            difficulty: 'soldier',
        },
        {
            kiche: "ulew",
            english: "earth/land",
            spanish: "tierra",
            icon: "🌍",
            culture: "Guatemala's K'iche' name is 'Iximulew' - 'Land of Corn'. Ulew is sacred.",
            difficulty: 'soldier',
        },
        {
            kiche: "ixim",
            english: "corn/maize",
            spanish: "maíz",
            icon: "🌽",
            culture: "In the Popol Vuh, humans were created from corn. Ixim is the flesh of the Maya people.",
            difficulty: 'soldier',
        },
        {
            kiche: "q'ij",
            english: "sun/day",
            spanish: "sol/día",
            icon: "☀️",
            culture: "Jun Ajpu became the sun in the Popol Vuh. Q'ij also means 'day' - time follows the sun.",
            difficulty: 'soldier',
        },
        {
            kiche: "ik'",
            english: "moon/month",
            spanish: "luna/mes",
            icon: "🌙",
            culture: "Xb'alanke became the moon. The Maya calendar tracks lunar cycles precisely.",
            difficulty: 'soldier',
        },
        {
            kiche: "che'",
            english: "tree/wood",
            spanish: "árbol/madera",
            icon: "🌳",
            culture: "The ceiba tree (inup) is the sacred world tree connecting earth, sky, and underworld.",
            difficulty: 'soldier',
        },
        {
            kiche: "ja",
            english: "house",
            spanish: "casa",
            icon: "🏠",
            culture: "Traditional K'iche' homes face east to greet the rising sun.",
            difficulty: 'soldier',
        },
        {
            kiche: "wa",
            english: "tortilla/food",
            spanish: "tortilla/comida",
            icon: "🫓",
            culture: "Wa is sustenance itself. 'Kinwa'ik' (I eat) shares this root. Food is sacred.",
            difficulty: 'soldier',
        },
        {
            kiche: "winaq",
            english: "person/people",
            spanish: "persona/gente",
            icon: "👤",
            culture: "Winaq also means 'twenty' - the complete human (10 fingers + 10 toes).",
            difficulty: 'soldier',
        },
        {
            kiche: "ajaw",
            english: "lord/god",
            spanish: "señor/dios",
            icon: "👑",
            culture: "The Ajaw were divine rulers. 'Uk'u'x Kaj, Uk'u'x Ulew' (Heart of Sky, Heart of Earth) is the supreme Ajaw.",
            difficulty: 'soldier',
        },
        {
            kiche: "b'alam",
            english: "jaguar",
            spanish: "jaguar",
            icon: "🐆",
            culture: "B'alam Kitze', B'alam Aq'ab' - the first K'iche' ancestors had jaguar names.",
            difficulty: 'soldier',
        },
    ],
    
    // WARRIOR level additions
    warrior: [
        {
            kiche: "kaq",
            english: "red",
            spanish: "rojo",
            icon: "🔴",
            culture: "Kaq iq' means 'red chile'. In Q'eqchi' Maya, this dish is called Kak'ik - a sacred turkey soup.",
            difficulty: 'warrior',
        },
        {
            kiche: "q'eq",
            english: "black",
            spanish: "negro",
            icon: "⚫",
            culture: "Q'eq represents the night, the underworld Xib'alb'a, and the west.",
            difficulty: 'warrior',
        },
        {
            kiche: "saq",
            english: "white",
            spanish: "blanco",
            icon: "⚪",
            culture: "Saq represents dawn, purity, and the north. Saqarik means 'it dawns/good morning'.",
            difficulty: 'warrior',
        },
        {
            kiche: "rax",
            english: "green/blue",
            spanish: "verde/azul",
            icon: "🟢",
            culture: "K'iche' uses one word for green and blue - the color of jade and the sky.",
            difficulty: 'warrior',
        },
        {
            kiche: "q'an",
            english: "yellow",
            spanish: "amarillo",
            icon: "🟡",
            culture: "Q'an represents the south and ripe corn. Q'anil is a day sign meaning 'seed'.",
            difficulty: 'warrior',
        },
        {
            kiche: "juyub'",
            english: "mountain",
            spanish: "montaña",
            icon: "🏔️",
            culture: "Mountains are living beings in Maya thought. Many are named Juyub' + a quality.",
            difficulty: 'warrior',
        },
        {
            kiche: "k'uk'",
            english: "quetzal",
            spanish: "quetzal",
            icon: "🦜",
            culture: "The quetzal's feathers adorned K'iche' royalty. Tecun Uman wore a quetzal headdress.",
            difficulty: 'warrior',
        },
        {
            kiche: "tz'i'",
            english: "dog",
            spanish: "perro",
            icon: "🐕",
            culture: "Tz'i' is also a day sign. Dogs guided souls to Xib'alb'a in Maya belief.",
            difficulty: 'warrior',
        },
        {
            kiche: "ab'aj",
            english: "stone",
            spanish: "piedra",
            icon: "🪨",
            culture: "The Maya built their pyramids from ab'aj. Stone altars are still used in ceremonies.",
            difficulty: 'warrior',
        },
        {
            kiche: "kej",
            english: "deer/horse",
            spanish: "venado/caballo",
            icon: "🦌",
            culture: "Kej originally meant deer. After Spanish arrival, it also came to mean horse.",
            difficulty: 'warrior',
        },
        {
            kiche: "achi",
            english: "man",
            spanish: "hombre",
            icon: "👨",
            culture: "The Rabinal Achi is a famous K'iche' drama about a captured warrior.",
            difficulty: 'warrior',
        },
        {
            kiche: "ixoq",
            english: "woman",
            spanish: "mujer",
            icon: "👩",
            culture: "Ixoq shares the 'ix' prefix with Ixchel, the Maya moon goddess.",
            difficulty: 'warrior',
        },
        {
            kiche: "ak'al",
            english: "child",
            spanish: "niño",
            icon: "👶",
            culture: "Children are treasured. An ak'al's first words are celebrated in Maya families.",
            difficulty: 'warrior',
        },
        {
            kiche: "tat",
            english: "father",
            spanish: "padre",
            icon: "👨‍👦",
            culture: "Tat is used as an honorific for elder men, like 'tat Wel' (Mr. Manuel).",
            difficulty: 'warrior',
        },
        {
            kiche: "nan",
            english: "mother",
            spanish: "madre",
            icon: "👩‍👦",
            culture: "Nan is used respectfully for women. Nan Mariy (Mrs. María) shows respect.",
            difficulty: 'warrior',
        },
        {
            kiche: "ch'umil",
            english: "star",
            spanish: "estrella",
            icon: "⭐",
            culture: "The Hero Twins became the sun and moon; other ancestors became ch'umil (stars).",
            difficulty: 'warrior',
        },
        {
            kiche: "kotz'i'j",
            english: "flower",
            spanish: "flor",
            icon: "🌸",
            culture: "Kotz'i'j also means 'candle' and 'Maya ceremony' - flowers honor the ancestors.",
            difficulty: 'warrior',
        },
    ],
    
    // HERO level additions
    hero: [
        {
            kiche: "kaminaq",
            english: "death/the dead",
            spanish: "muerte/los muertos",
            icon: "💀",
            culture: "Kaminaq are honored ancestors. Jun Kame and Wuqub' Kame ruled Xib'alb'a.",
            difficulty: 'hero',
        },
        {
            kiche: "sutz'",
            english: "cloud",
            spanish: "nube",
            icon: "☁️",
            culture: "Clouds carry the rain (jab'). The Maya observed clouds to predict weather.",
            difficulty: 'hero',
        },
        {
            kiche: "kaq'iq'",
            english: "wind",
            spanish: "viento",
            icon: "💨",
            culture: "Juraqan (hurricane) was a wind deity. Kaq'iq' carries prayers to the sky.",
            difficulty: 'hero',
        },
        {
            kiche: "jab'",
            english: "rain",
            spanish: "lluvia",
            icon: "🌧️",
            culture: "Chaak (the rain deity) was honored with ceremonies to bring jab' for crops.",
            difficulty: 'hero',
        },
        {
            kiche: "tinamit",
            english: "town/city",
            spanish: "pueblo/ciudad",
            icon: "🏘️",
            culture: "Q'umarkaj was the great tinamit of the K'iche' before the Spanish invasion.",
            difficulty: 'hero',
        },
        {
            kiche: "b'e",
            english: "road/path",
            spanish: "camino",
            icon: "🛤️",
            culture: "The Maya built sacbeob (white roads) connecting cities. B'e also means destiny.",
            difficulty: 'hero',
        },
        {
            kiche: "pom",
            english: "incense/copal",
            spanish: "incienso/copal",
            icon: "🪔",
            culture: "Pom (copal resin) is burned in all Maya ceremonies. Its smoke carries prayers.",
            difficulty: 'hero',
        },
        {
            kiche: "uk'u'x",
            english: "heart/center",
            spanish: "corazón/centro",
            icon: "❤️",
            culture: "'Uk'u'x Kaj, Uk'u'x Ulew' - Heart of Sky, Heart of Earth - the supreme deity.",
            difficulty: 'hero',
        },
        {
            kiche: "nawal",
            english: "spirit/nagual",
            spanish: "espíritu/nagual",
            icon: "👻",
            culture: "Each person has a nawal - an animal spirit companion from their birth day sign.",
            difficulty: 'hero',
        },
        {
            kiche: "ajq'ij",
            english: "daykeeper/priest",
            spanish: "sacerdote maya",
            icon: "🧙",
            culture: "Ajq'ijab' keep the sacred 260-day calendar and perform ceremonies.",
            difficulty: 'hero',
        },
        {
            kiche: "cholq'ij",
            english: "sacred calendar",
            spanish: "calendario sagrado",
            icon: "📅",
            culture: "The 260-day cholq'ij determines one's nawal and destiny. Still used today.",
            difficulty: 'hero',
        },
        {
            kiche: "k'aslemal",
            english: "life",
            spanish: "vida",
            icon: "🌱",
            culture: "K'aslemal encompasses all living things. 'Saqil k'aslemal' means 'life in peace'.",
            difficulty: 'hero',
        },
        {
            kiche: "pixab'",
            english: "counsel/advice",
            spanish: "consejo",
            icon: "📜",
            culture: "Pixab' are sacred teachings passed down from ancestors. The Popol Vuh contains many.",
            difficulty: 'hero',
        },
        {
            kiche: "ub'i'",
            english: "name",
            spanish: "nombre",
            icon: "🏷️",
            culture: "A person's ub'i' connects them to ancestors. Many are named for their birth day.",
            difficulty: 'hero',
        },
        {
            kiche: "kem",
            english: "weaving",
            spanish: "tejido",
            icon: "🧶",
            culture: "Weaving is sacred feminine knowledge. Each town has distinct patterns.",
            difficulty: 'hero',
        },
        {
            kiche: "po't",
            english: "huipil (blouse)",
            spanish: "huipil",
            icon: "👚",
            culture: "The po't's designs tell the wearer's town, status, and cosmological beliefs.",
            difficulty: 'hero',
        },
        {
            kiche: "uq",
            english: "corte (skirt)",
            spanish: "corte/falda",
            icon: "👗",
            culture: "The uq wraps around like the cosmos wraps around the earth.",
            difficulty: 'hero',
        },
        {
            kiche: "kakaw",
            english: "cacao",
            spanish: "cacao",
            icon: "🍫",
            culture: "Kakaw was currency and a sacred drink. Only nobles drank chocolate.",
            difficulty: 'hero',
        },
        {
            kiche: "kinaq'",
            english: "beans",
            spanish: "frijoles",
            icon: "🫘",
            culture: "Kinaq' and ixim (corn) together make a complete protein - Maya wisdom.",
            difficulty: 'hero',
        },
        {
            kiche: "ik",
            english: "chile",
            spanish: "chile",
            icon: "🌶️",
            culture: "Ik adds heat to every meal. Kaq ik' (red chile) is essential in K'iche' cooking.",
            difficulty: 'hero',
        },
    ],
};

// ========================================
// GREETINGS WITH CULTURAL CONTEXT
// ========================================

const GREETINGS_CONTENT = {
    core: [
        {
            kiche: "Saqarik",
            english: "Good morning",
            spanish: "Buenos días",
            icon: "🌅",
            culture: "From 'saq' (white/dawn) + 'arik' (it becomes). The dawn is sacred - a new beginning.",
            difficulty: 'soldier',
        },
        {
            kiche: "Xb'e q'ij",
            english: "Good afternoon",
            spanish: "Buenas tardes",
            icon: "🌤️",
            culture: "Literally 'the sun went' - acknowledging the sun's journey across the sky.",
            difficulty: 'soldier',
        },
        {
            kiche: "Xok aq'ab'",
            english: "Good evening",
            spanish: "Buenas noches",
            icon: "🌙",
            culture: "Literally 'night entered'. Evening is time for family and rest.",
            difficulty: 'soldier',
        },
        {
            kiche: "La utz awach?",
            english: "How are you?",
            spanish: "¿Cómo estás?",
            icon: "😊",
            culture: "Utz = good, awach = your face/self. Asking about wellbeing is essential courtesy.",
            difficulty: 'soldier',
        },
        {
            kiche: "Utz maltyox",
            english: "Fine, thank you",
            spanish: "Bien, gracias",
            icon: "👍",
            culture: "Maltyox comes from Spanish 'Dios te lo pague' - adapted into K'iche'.",
            difficulty: 'soldier',
        },
        {
            kiche: "Maltyox",
            english: "Thank you",
            spanish: "Gracias",
            icon: "🙏",
            culture: "Gratitude is central to K'iche' culture. Always thank those who help you.",
            difficulty: 'soldier',
        },
    ],
    warrior: [
        {
            kiche: "La utz wach la?",
            english: "How are you? (formal)",
            spanish: "¿Cómo está usted?",
            icon: "🎩",
            culture: "The 'la' suffix shows respect - used for elders, in-laws, and authorities.",
            difficulty: 'warrior',
        },
        {
            kiche: "Jas ab'i'?",
            english: "What is your name?",
            spanish: "¿Cómo te llamas?",
            icon: "🏷️",
            culture: "Names are sacred. Traditionally, names came from the day of birth.",
            difficulty: 'warrior',
        },
        {
            kiche: "___ le nub'i'",
            english: "My name is ___",
            spanish: "Mi nombre es ___",
            icon: "📛",
            culture: "Nub'i' = my name. Sharing your name creates a bond.",
            difficulty: 'warrior',
        },
        {
            kiche: "Jeb'a'",
            english: "Goodbye",
            spanish: "Adiós",
            icon: "👋",
            culture: "A warm farewell. K'iche' culture values proper greetings and farewells.",
            difficulty: 'warrior',
        },
        {
            kiche: "K'a chi k'a",
            english: "See you later",
            spanish: "Hasta luego",
            icon: "🔜",
            culture: "Implies you will meet again. Relationships are ongoing in K'iche' culture.",
            difficulty: 'warrior',
        },
    ],
    hero: [
        {
            kiche: "Sachb'al mak",
            english: "Excuse me / Sorry",
            spanish: "Perdón / Disculpe",
            icon: "😅",
            culture: "Literally 'loss of sin/fault'. Acknowledging mistakes restores harmony.",
            difficulty: 'hero',
        },
        {
            kiche: "B'a'n",
            english: "Please",
            spanish: "Por favor",
            icon: "🙏",
            culture: "Politeness is highly valued. B'a'n softens requests.",
            difficulty: 'hero',
        },
        {
            kiche: "Maj kab'ij la",
            english: "You're welcome (formal)",
            spanish: "De nada (formal)",
            icon: "😌",
            culture: "Literally 'say nothing of it'. Humility in receiving thanks.",
            difficulty: 'hero',
        },
        {
            kiche: "Kinb'e chik",
            english: "I'm leaving now",
            spanish: "Ya me voy",
            icon: "🚶",
            culture: "It's polite to announce departure rather than just leaving.",
            difficulty: 'hero',
        },
        {
            kiche: "Utz apetik",
            english: "Welcome (to one arriving)",
            spanish: "Bienvenido",
            icon: "🤗",
            culture: "Literally 'good your-coming'. Welcoming guests is sacred duty.",
            difficulty: 'hero',
        },
    ],
};

// ========================================
// CONVERSATIONAL PHRASES - Interactive dialogues
// ========================================

const CONVERSATION_EXCHANGES = {
    // Phrase selection questions - "How would you ask/say X?"
    phraseSelect: [
        {
            situation: "Ask someone their name",
            situationEs: "Pregunta el nombre de alguien",
            icon: "🏷️",
            correctPhrase: "Jas ab'i'?",
            wrongPhrases: ["La utz awach?", "Jas kab'ij?", "At at?"],
            culture: "Names are sacred in K'iche' culture. B'i' means name.",
            difficulty: 'soldier',
        },
        {
            situation: "Say good morning",
            situationEs: "Di buenos días",
            icon: "🌅",
            correctPhrase: "Saqarik",
            wrongPhrases: ["Xok aq'ab'", "Xb'e q'ij", "Maltyox"],
            culture: "Saqarik comes from 'saq' (white/light). Dawn is sacred.",
            difficulty: 'soldier',
        },
        {
            situation: "Ask how someone is doing",
            situationEs: "Pregunta cómo está alguien",
            icon: "😊",
            correctPhrase: "La utz awach?",
            wrongPhrases: ["Jas ab'i'?", "Jas ri?", "La at?"],
            culture: "Utz means good, awach is 'your face' - asking about wellbeing.",
            difficulty: 'soldier',
        },
        {
            situation: "Say thank you",
            situationEs: "Di gracias",
            icon: "🙏",
            correctPhrase: "Maltyox",
            wrongPhrases: ["Utz", "Jeb'a'", "B'a'n"],
            culture: "Maltyox evolved from Spanish 'Dios te lo pague'.",
            difficulty: 'soldier',
        },
        {
            situation: "Say goodbye",
            situationEs: "Despídete",
            icon: "👋",
            correctPhrase: "Jeb'a'",
            wrongPhrases: ["Saqarik", "Maltyox", "La utz?"],
            culture: "Proper farewells are important for maintaining relationships.",
            difficulty: 'warrior',
        },
        {
            situation: "Say 'see you later'",
            situationEs: "Di 'hasta luego'",
            icon: "🔜",
            correctPhrase: "K'a chi k'a",
            wrongPhrases: ["Jeb'a'", "Kinb'e chik", "Saqarik"],
            culture: "Implies an ongoing relationship - you will meet again.",
            difficulty: 'warrior',
        },
        {
            situation: "Say 'I'm fine, thank you'",
            situationEs: "Di 'estoy bien, gracias'",
            icon: "👍",
            correctPhrase: "Utz maltyox",
            wrongPhrases: ["La utz?", "Maltyox utz", "Jeb'a'"],
            culture: "The standard response when asked how you are.",
            difficulty: 'warrior',
        },
        {
            situation: "Apologize / say excuse me",
            situationEs: "Pide disculpas",
            icon: "😅",
            correctPhrase: "Sachb'al mak",
            wrongPhrases: ["Maltyox", "B'a'n", "Utz"],
            culture: "Literally 'loss of fault'. Acknowledging mistakes restores harmony.",
            difficulty: 'hero',
        },
    ],
    
    // K'iche'-to-K'iche' conversations (advanced)
    kicheResponses: [
        {
            prompt: "La utz awach?",
            promptTranslation: "How are you?",
            icon: "💬",
            correctResponse: "Utz maltyox",
            wrongResponses: ["Maltyox", "Jeb'a'", "Saqarik"],
            responseTranslation: "Fine, thank you",
            culture: "This is the most common exchange. Practice until it's automatic!",
            difficulty: 'warrior',
        },
        {
            prompt: "Saqarik!",
            promptTranslation: "Good morning!",
            icon: "🌅",
            correctResponse: "Saqarik",
            wrongResponses: ["Xok aq'ab'", "Maltyox", "Utz"],
            responseTranslation: "Good morning (back)",
            culture: "Mirror greetings back - it's polite to return the same greeting.",
            difficulty: 'warrior',
        },
        {
            prompt: "Jas ab'i'?",
            promptTranslation: "What is your name?",
            icon: "🏷️",
            correctResponse: "___ le nub'i'",
            wrongResponses: ["Utz maltyox", "At at", "Maltyox"],
            responseTranslation: "___ is my name",
            culture: "Nub'i' = my name. Fill in your own name where the blank is.",
            difficulty: 'warrior',
        },
        {
            prompt: "Jeb'a'!",
            promptTranslation: "Goodbye!",
            icon: "👋",
            correctResponse: "K'a chi k'a",
            wrongResponses: ["Saqarik", "Maltyox", "Utz"],
            responseTranslation: "See you later",
            culture: "A warm response that implies you'll meet again.",
            difficulty: 'hero',
        },
        {
            prompt: "Maltyox chawe",
            promptTranslation: "Thank you (to you)",
            icon: "🙏",
            correctResponse: "Maj kab'ij",
            wrongResponses: ["Maltyox", "Utz", "Jeb'a'"],
            responseTranslation: "You're welcome",
            culture: "Literally 'say nothing of it'. Humble way to receive thanks.",
            difficulty: 'hero',
        },
    ],
};

// ========================================
// NUMBERS WITH CULTURAL CONTEXT
// ========================================

const NUMBERS_CONTENT = {
    core: [
        { kiche: "jun", english: "1 / one", spanish: "uno", icon: "1️⃣", culture: "Jun also means 'a/an'. Jun Ajpu (One Blowgunner) was a Hero Twin.", difficulty: 'soldier' },
        { kiche: "keb'", english: "2 / two", spanish: "dos", icon: "2️⃣", culture: "The Hero Twins (Keb' Ajpu) represent duality - a core Maya concept.", difficulty: 'soldier' },
        { kiche: "oxib'", english: "3 / three", spanish: "tres", icon: "3️⃣", culture: "Three stones form the traditional hearth (k'otz'ij) - the heart of the home.", difficulty: 'soldier' },
        { kiche: "kajib'", english: "4 / four", spanish: "cuatro", icon: "4️⃣", culture: "Four directions, four colors, four first ancestors. The world has four corners.", difficulty: 'soldier' },
        { kiche: "jo'ob'", english: "5 / five", spanish: "cinco", icon: "5️⃣", culture: "Five is one hand (q'ab'). The Maya counted in base 20 (hands + feet).", difficulty: 'soldier' },
    ],
    warrior: [
        { kiche: "waqib'", english: "6 / six", spanish: "seis", icon: "6️⃣", culture: "Waqib' B'atz' is the K'iche' New Year ceremony.", difficulty: 'warrior' },
        { kiche: "wuqub'", english: "7 / seven", spanish: "siete", icon: "7️⃣", culture: "Wuqub' Kame (Seven Death) was a Lord of Xib'alb'a.", difficulty: 'warrior' },
        { kiche: "wajxaqib'", english: "8 / eight", spanish: "ocho", icon: "8️⃣", culture: "Eight is considered a powerful number in divination.", difficulty: 'warrior' },
        { kiche: "b'elejeb'", english: "9 / nine", spanish: "nueve", icon: "9️⃣", culture: "Nine levels of the underworld (Xib'alb'a) in Maya cosmology.", difficulty: 'warrior' },
        { kiche: "lajuj", english: "10 / ten", spanish: "diez", icon: "🔟",culture: "Ten = two hands. Lajuj Noj is a powerful day for wisdom.", difficulty: 'warrior' },
    ],
    hero: [
        { kiche: "julajuj", english: "11", spanish: "once", icon: "1️⃣1️⃣", culture: "Eleven continues the count toward jwinaq (20).", difficulty: 'hero' },
        { kiche: "kab'lajuj", english: "12", spanish: "doce", icon: "1️⃣2️⃣", culture: "Twelve months in the solar calendar (Haab').", difficulty: 'hero' },
        { kiche: "oxlajuj", english: "13", spanish: "trece", icon: "1️⃣3️⃣", culture: "Thirteen levels of heaven. 13 × 20 = 260 days of the cholq'ij.", difficulty: 'hero' },
        { kiche: "jwinaq", english: "20 / twenty", spanish: "veinte", icon: "2️⃣0️⃣", culture: "Jwinaq (one person) = 20 (fingers + toes). Base of Maya math!", difficulty: 'hero' },
        { kiche: "k'al", english: "20 (for counting)", spanish: "veinte (contando)", icon: "✌️0️⃣", culture: "K'al is used when counting objects. Jun k'al = 20 things.", difficulty: 'hero' },
    ],
};

// ========================================
// PRONOUNS
// ========================================

const PRONOUNS_CONTENT = {
    core: [
        { kiche: "in", english: "I", spanish: "yo", icon: "🙋", culture: "The self. In K'iche' thought, the 'I' is connected to community.", difficulty: 'soldier' },
        { kiche: "at", english: "you (informal)", spanish: "tú", icon: "🫵", culture: "Used with friends, family, and children. Shows familiarity.", difficulty: 'soldier' },
        { kiche: "are", english: "he/she/it", spanish: "él/ella", icon: "👤", culture: "K'iche' doesn't distinguish gender - are covers he, she, and it!", difficulty: 'soldier' },
        { kiche: "oj", english: "we", spanish: "nosotros", icon: "👥", culture: "Community (oj) is central to K'iche' identity. We before I.", difficulty: 'soldier' },
    ],
    warrior: [
        { kiche: "ix", english: "you all", spanish: "ustedes", icon: "👥", culture: "Used to address a group informally.", difficulty: 'warrior' },
        { kiche: "are'", english: "they", spanish: "ellos/ellas", icon: "👥👥", culture: "The plural of are. Also gender-neutral.", difficulty: 'warrior' },
        { kiche: "lal", english: "you (formal)", spanish: "usted", icon: "🎩", culture: "Shows respect. Used for elders, authorities, in-laws.", difficulty: 'warrior' },
    ],
    hero: [
        { kiche: "alaq", english: "you all (formal)", spanish: "ustedes (formal)", icon: "🎩👥", culture: "Formal plural - for addressing respected groups.", difficulty: 'hero' },
        { kiche: "ri in", english: "as for me", spanish: "en cuanto a mí", icon: "☝️", culture: "Topic marker - emphasizes the speaker.", difficulty: 'hero' },
        { kiche: "ri at", english: "as for you", spanish: "en cuanto a ti", icon: "👆", culture: "Topic marker - emphasizes the listener.", difficulty: 'hero' },
    ],
};

// ========================================
// POSSESSION
// ========================================

const POSSESSION_CONTENT = {
    core: [
        { kiche: "nu-", english: "my (before consonant)", spanish: "mi", icon: "1️⃣👤", culture: "Nuwuj = my book. Possession prefixes attach to the noun.", difficulty: 'soldier', example: "nuwuj = my book" },
        { kiche: "w-", english: "my (before vowel)", spanish: "mi", icon: "1️⃣👤", culture: "Wachi'il = my friend. 'W' before vowels.", difficulty: 'soldier', example: "wachi'il = my friend" },
        { kiche: "a-/aw-", english: "your", spanish: "tu", icon: "2️⃣👤", culture: "Awuj = your book. Awachi'il = your friend.", difficulty: 'soldier', example: "awuj = your book" },
        { kiche: "u-/r-", english: "his/her/its", spanish: "su", icon: "3️⃣👤", culture: "Uwuj = his/her book. Rachi'il = his/her friend.", difficulty: 'soldier', example: "uwuj = his/her book" },
    ],
    warrior: [
        { kiche: "qa-/q-", english: "our", spanish: "nuestro", icon: "👥❤️", culture: "Qawuj = our book. Community ownership is valued.", difficulty: 'warrior', example: "qatinamit = our town" },
        { kiche: "i-/iw-", english: "your (plural)", spanish: "su (ustedes)", icon: "👥📖", culture: "Iwuj = your (all) book.", difficulty: 'warrior', example: "iwuj = your (all) book" },
        { kiche: "ki-/k-", english: "their", spanish: "su (ellos)", icon: "👥👥❤️", culture: "Kiwuj = their book. Kachi'il = their friend.", difficulty: 'warrior', example: "kiwuj = their book" },
    ],
    hero: [
        { kiche: "-il", english: "inherent possession", spanish: "posesión inherente", icon: "🔗", culture: "Nub'aqil = my body (inherent). Nub'aq = bones I own (not mine).", difficulty: 'hero', example: "nub'aqil = my body" },
        { kiche: "wochoch", english: "my home", spanish: "mi hogar", icon: "🏡", culture: "Ja = house, but -ochoch = home (possessed). Irregular form.", difficulty: 'hero', example: "rochoch = his/her home" },
    ],
};

// ========================================
// NEGATION
// ========================================

const NEGATION_CONTENT = {
    core: [
        { kiche: "na...taj", english: "not (verb negation)", spanish: "no (negación)", icon: "🚫", culture: "Na VERB taj - two-part negation surrounds the verb.", difficulty: 'soldier', example: "Na kinwar taj = I don't sleep" },
        { kiche: "mani", english: "no/nothing", spanish: "no/nada", icon: "❌", culture: "Used alone as 'no' or 'there isn't'.", difficulty: 'soldier', example: "Mani = No / There isn't any" },
    ],
    warrior: [
        { kiche: "na weta'm taj", english: "I don't know", spanish: "no sé", icon: "🤷", culture: "Very common phrase. Literally: not I-know not.", difficulty: 'warrior', example: "Na weta'm taj = I don't know" },
        { kiche: "na k'o taj", english: "there isn't", spanish: "no hay", icon: "0️⃣", culture: "Negated existential. Na k'o taj ja' = There isn't water.", difficulty: 'warrior', example: "Na k'o taj = There isn't" },
    ],
    hero: [
        { kiche: "majun", english: "nothing/nobody", spanish: "nada/nadie", icon: "🕳️", culture: "Stronger than mani. Majun k'o = absolutely nothing.", difficulty: 'hero', example: "Majun = Nothing at all" },
        { kiche: "mat-", english: "don't! (negative command)", spanish: "¡no! (imperativo)", icon: "🛑", culture: "Matb'e! = Don't go! Used for warnings and prohibitions.", difficulty: 'hero', example: "Matwa'ik! = Don't eat!" },
    ],
};

// ========================================
// INTRANSITIVE VERBS
// ========================================

const VERBS_CONTENT = {
    core: [
        { kiche: "b'e", english: "to go", spanish: "ir", icon: "🚶", culture: "Kimb'e = I go. B'e also means 'road' and 'destiny'.", difficulty: 'soldier', conjugation: "kimb'e, katb'e, kab'e" },
        { kiche: "war", english: "to sleep", spanish: "dormir", icon: "😴", culture: "Kinwarik = I sleep. Rest is sacred - dreams carry messages.", difficulty: 'soldier', conjugation: "kinwarik, katwarik, kawarik" },
        { kiche: "wa'", english: "to eat", spanish: "comer", icon: "🍽️", culture: "Kinwa'ik = I eat. Shares root with 'wa' (tortilla/food).", difficulty: 'soldier', conjugation: "kinwa'ik, katwa'ik, kawa'ik" },
    ],
    warrior: [
        { kiche: "pet", english: "to come", spanish: "venir", icon: "🔙", culture: "Kimpetik = I come. 'Kimpe pa...' = 'I'm from...'", difficulty: 'warrior', conjugation: "kimpetik, katpetik, kapetik" },
        { kiche: "b'in", english: "to walk", spanish: "caminar", icon: "🦶", culture: "Kimb'inik = I walk. Walking meditation is part of ceremony.", difficulty: 'warrior', conjugation: "kimb'inik, katb'inik, kab'inik" },
        { kiche: "ch'aw", english: "to speak", spanish: "hablar", icon: "🗣️", culture: "Kinch'awik = I speak. Ch'ab'al = language.", difficulty: 'warrior', conjugation: "kinch'awik, katch'awik, kach'awik" },
    ],
    hero: [
        { kiche: "wa'lij", english: "to get up", spanish: "levantarse", icon: "🛏️", culture: "Kinwa'lijik = I get up. The morning rising greets the sun.", difficulty: 'hero', conjugation: "kinwa'lijik" },
        { kiche: "opan", english: "to arrive (there)", spanish: "llegar (allá)", icon: "📍", culture: "Kinopan = I arrive (at a place I'm not at now).", difficulty: 'hero', conjugation: "kinopan, katopan, kopan" },
        { kiche: "ul", english: "to arrive (here)", spanish: "llegar (aquí)", icon: "🏠", culture: "Kinul = I arrive (here, where I am). Different from opan!", difficulty: 'hero', conjugation: "kinul, katul, kul" },
        { kiche: "etz'an", english: "to play", spanish: "jugar", icon: "⚽", culture: "The Maya ball game (pitz) was sacred. Winners were honored.", difficulty: 'hero', conjugation: "kinetz'anik" },
    ],
};

// ========================================
// COMMANDS - GIVING ORDERS
// ========================================

const COMMANDS_CONTENT = {
    core: [
        { kiche: "Jab'e!", english: "Go!", spanish: "¡Ve!", icon: "👉", culture: "Imperative of b'e (to go). Direct command to one person.", difficulty: 'soldier' },
        { kiche: "Chawila!", english: "Look!", spanish: "¡Mira!", icon: "👀", culture: "From 'ila' (to see). Draw attention to something.", difficulty: 'soldier' },
        { kiche: "Chab'ana!", english: "Do it!", spanish: "¡Hazlo!", icon: "💪", culture: "B'an = to do/make. Used for action commands.", difficulty: 'soldier' },
        { kiche: "Chatija!", english: "Eat!", spanish: "¡Come!", icon: "🍽️", culture: "From tij (to eat). Common at mealtimes.", difficulty: 'soldier' },
    ],
    warrior: [
        { kiche: "Chak'ama'!", english: "Bring it!", spanish: "¡Tráelo!", icon: "🤲", culture: "K'am = to receive/bring. Requesting an object.", difficulty: 'warrior' },
        { kiche: "Chatzijoj!", english: "Tell/say it!", spanish: "¡Cuéntalo!", icon: "🗣️", culture: "Tzijoj = to tell/narrate. Request for a story.", difficulty: 'warrior' },
        { kiche: "Chach'awa!", english: "Speak!", spanish: "¡Habla!", icon: "💬", culture: "Ch'aw = to speak. Invitation to share.", difficulty: 'warrior' },
        { kiche: "Chaweta'maj!", english: "Learn it!", spanish: "¡Aprende!", icon: "📚", culture: "Eta'maj = to learn/know. Encouragement to study.", difficulty: 'warrior' },
    ],
    hero: [
        { kiche: "Ixpetik!", english: "Come! (plural)", spanish: "¡Vengan!", icon: "👥", culture: "Plural command - calling a group.", difficulty: 'hero' },
        { kiche: "Chayuj rij!", english: "Help him/her!", spanish: "¡Ayúdale!", icon: "🤝", culture: "Yuj = to help. Communal assistance is sacred.", difficulty: 'hero' },
        { kiche: "Matb'e!", english: "Don't go!", spanish: "¡No vayas!", icon: "🛑", culture: "Negative command with mat-. Warning or prohibition.", difficulty: 'hero' },
        { kiche: "Chak'oje' pa k'u'x!", english: "Have heart/courage!", spanish: "¡Ten valor!", icon: "❤️‍🔥", culture: "K'u'x = heart/center. Encouragement before battle.", difficulty: 'hero' },
    ],
};

// ========================================
// EXISTENTIAL - THERE IS / TO HAVE
// ========================================

const EXISTENTIAL_CONTENT = {
    core: [
        { kiche: "k'o", english: "there is / to have", spanish: "hay / tener", icon: "✨", culture: "K'o ja = there is a house. K'o wachin = I have a face (I exist).", difficulty: 'soldier' },
        { kiche: "k'o la", english: "there is (respectful)", spanish: "hay (respetuoso)", icon: "🎩", culture: "Adding 'la' shows respect to the listener.", difficulty: 'soldier' },
        { kiche: "majun k'o", english: "there is nothing", spanish: "no hay nada", icon: "🕳️", culture: "Majun intensifies negation. Complete absence.", difficulty: 'soldier' },
    ],
    warrior: [
        { kiche: "k'o nu-", english: "I have...", spanish: "tengo...", icon: "🙋", culture: "K'o nuchaak = I have work. Possession through existence.", difficulty: 'warrior' },
        { kiche: "k'o a-", english: "you have...", spanish: "tienes...", icon: "👆", culture: "K'o awinaq = you have people (family).", difficulty: 'warrior' },
        { kiche: "k'o r-", english: "he/she has...", spanish: "él/ella tiene...", icon: "👤", culture: "K'o ruchak = he/she has work.", difficulty: 'warrior' },
        { kiche: "man k'o taj", english: "there is not", spanish: "no hay", icon: "❌", culture: "Standard negation of existence.", difficulty: 'warrior' },
    ],
    hero: [
        { kiche: "k'o qa-", english: "we have...", spanish: "tenemos...", icon: "👥", culture: "K'o qatijob'al = we have our school.", difficulty: 'hero' },
        { kiche: "k'o ki-", english: "they have...", spanish: "ellos tienen...", icon: "👪", culture: "K'o kija = they have their house.", difficulty: 'hero' },
        { kiche: "k'o nuk'u'x", english: "I feel / my heart says", spanish: "siento / mi corazón dice", icon: "💓", culture: "Emotions come from the heart. K'o nuk'u'x chi... = I feel that...", difficulty: 'hero' },
    ],
};

// ========================================
// QUESTIONS - ASKING THINGS
// ========================================

const QUESTIONS_CONTENT = {
    core: [
        { kiche: "jas?", english: "what?", spanish: "¿qué?", icon: "❓", culture: "Jas ri? = What is that? Most common question word.", difficulty: 'soldier' },
        { kiche: "jachin?", english: "who?", spanish: "¿quién?", icon: "👤", culture: "Jachin rat? = Who are you? Asking identity.", difficulty: 'soldier' },
        { kiche: "jawije'?", english: "where?", spanish: "¿dónde?", icon: "📍", culture: "Jawije' k'o ri ja? = Where is the house?", difficulty: 'soldier' },
        { kiche: "jampa?", english: "when?", spanish: "¿cuándo?", icon: "📅", culture: "Jampa katb'e? = When do you go?", difficulty: 'soldier' },
    ],
    warrior: [
        { kiche: "jas ruma?", english: "why?", spanish: "¿por qué?", icon: "🤔", culture: "Literally 'what because'. Jas ruma katb'e? = Why do you go?", difficulty: 'warrior' },
        { kiche: "jas ub'anik?", english: "how?", spanish: "¿cómo?", icon: "🔧", culture: "Literally 'what its doing'. Jas ub'anik? = How is it done?", difficulty: 'warrior' },
        { kiche: "jarupe'?", english: "how many?", spanish: "¿cuántos?", icon: "🔢", culture: "Jarupe' winaq? = How many people?", difficulty: 'warrior' },
        { kiche: "la...?", english: "is it...? (yes/no)", spanish: "¿es...?", icon: "⚖️", culture: "La utz? = Is it good? Yes/no question marker.", difficulty: 'warrior' },
    ],
    hero: [
        { kiche: "achike?", english: "which one?", spanish: "¿cuál?", icon: "👈", culture: "Achike ja? = Which house? Selection questions.", difficulty: 'hero' },
        { kiche: "jas uwach?", english: "what kind?", spanish: "¿qué tipo?", icon: "🏷️", culture: "Literally 'what its face'. Asking about nature/type.", difficulty: 'hero' },
        { kiche: "la k'o...?", english: "is there...?", spanish: "¿hay...?", icon: "🔍", culture: "La k'o ja'? = Is there water? Existence question.", difficulty: 'hero' },
        { kiche: "pa jas?", english: "in what? / about what?", spanish: "¿en qué?", icon: "📦", culture: "Pa jas kach'awik? = What are you talking about?", difficulty: 'hero' },
    ],
};

// ========================================
// ADJECTIVES - DESCRIBING THINGS
// ========================================

const ADJECTIVES_CONTENT = {
    core: [
        { kiche: "nim", english: "big/large", spanish: "grande", icon: "🐘", culture: "Nim ja = big house. 'Nim' also means important or great.", difficulty: 'soldier' },
        { kiche: "ch'uti'n", english: "small/little", spanish: "pequeño", icon: "🐜", culture: "Ch'uti'n tz'i' = little dog. Endearing diminutive.", difficulty: 'soldier' },
        { kiche: "utz", english: "good", spanish: "bueno", icon: "👍", culture: "Utz is fundamental - used in greetings: 'La utz awach?'", difficulty: 'soldier' },
        { kiche: "itzel", english: "bad/evil", spanish: "malo", icon: "👎", culture: "Itzel winaq = bad person. Used for moral and quality judgments.", difficulty: 'soldier' },
        { kiche: "saq", english: "white/light", spanish: "blanco/claro", icon: "⬜", culture: "Saq also means dawn, clarity, truth. Saqarik = it becomes light.", difficulty: 'soldier' },
        { kiche: "q'eq", english: "black/dark", spanish: "negro/oscuro", icon: "⬛", culture: "Q'eq aq'ab' = dark night. Q'eq symbolizes mystery and depth.", difficulty: 'soldier' },
    ],
    warrior: [
        { kiche: "kaq", english: "red", spanish: "rojo", icon: "🔴", culture: "Kaq is the color of blood, life force, and the east where sun rises.", difficulty: 'warrior' },
        { kiche: "q'an", english: "yellow/ripe", spanish: "amarillo/maduro", icon: "🟡", culture: "Q'an ixim = ripe corn. Yellow represents maturity and south.", difficulty: 'warrior' },
        { kiche: "rax", english: "green/blue", spanish: "verde/azul", icon: "🟢", culture: "Rax covers green and blue - the colors of sky and growing things.", difficulty: 'warrior' },
        { kiche: "nimalaj", english: "very big/great", spanish: "muy grande", icon: "🏔️", culture: "Intensifier form: nimalaj winaq = great person/leader.", difficulty: 'warrior' },
        { kiche: "ko'oj", english: "hard/difficult", spanish: "duro/difícil", icon: "🪨", culture: "Ko'oj ab'aj = hard stone. Also used for challenging tasks.", difficulty: 'warrior' },
        { kiche: "yab'", english: "sick/ill", spanish: "enfermo", icon: "🤒", culture: "Kin yab'ik = I am sick. Health and balance are central to Maya life.", difficulty: 'warrior' },
        { kiche: "tyox", english: "holy/sacred", spanish: "sagrado", icon: "✨", culture: "From Spanish 'Dios'. Tyoxil = holiness, sacredness.", difficulty: 'warrior' },
    ],
    hero: [
        { kiche: "jotol", english: "tall/high", spanish: "alto", icon: "📏", culture: "Jotol che' = tall tree. Height represents reaching toward the divine.", difficulty: 'hero' },
        { kiche: "tzuy", english: "seated/short", spanish: "sentado/bajo", icon: "🪑", culture: "Describes something low or in a seated position.", difficulty: 'hero' },
        { kiche: "q'ayis", english: "bitter", spanish: "amargo", icon: "🍋", culture: "Q'ayis kakaw = bitter cacao. Traditional chocolate was unsweetened.", difficulty: 'hero' },
        { kiche: "ki'", english: "sweet/delicious", spanish: "dulce/rico", icon: "🍯", culture: "Ki' ri wa = the food is delicious. Ki' also means pleasant.", difficulty: 'hero' },
        { kiche: "chom", english: "fat/thick", spanish: "gordo/grueso", icon: "🐷", culture: "Chom describes abundance and prosperity.", difficulty: 'hero' },
        { kiche: "qas", english: "thin/skinny", spanish: "delgado/flaco", icon: "🦴", culture: "Qas winaq = thin person. Opposite of chom.", difficulty: 'hero' },
        { kiche: "k'ak'a", english: "new", spanish: "nuevo", icon: "🆕", culture: "K'ak'a jab' = new year. K'ak'a taq tzij = new words (vocabulary).", difficulty: 'hero' },
        { kiche: "ojer", english: "old/ancient", spanish: "viejo/antiguo", icon: "🏛️", culture: "Ojer taq tzij = ancient words. Ojer Maya = ancient Maya.", difficulty: 'hero' },
    ],
};

// ========================================
// GENERATE QUESTIONS WITH ICONS
// ========================================

function getContentForDifficulty(contentObj) {
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

function generateLessonQuestions(lessonId, count = 5, learnedWords = []) {
    let contentSource;
    
    switch (lessonId) {
        case 'vocabulary':
            contentSource = CULTURAL_VOCABULARY;
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
    const questions = [];
    const difficulty = getDifficulty();
    
    // For greetings, mix in conversational phrase questions
    if (lessonId === 'greetings') {
        const phraseQuestions = generateConversationQuestions(count, difficulty);
        // Replace some standard questions with conversation ones
        const numConversation = Math.min(Math.ceil(count / 2), phraseQuestions.length);
        questions.push(...phraseQuestions.slice(0, numConversation));
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
        let questionTypes;
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
function generateConversationQuestions(count, difficulty) {
    const questions = [];
    
    // Filter by difficulty
    const phraseSelect = CONVERSATION_EXCHANGES.phraseSelect.filter(p => {
        if (difficulty === DIFFICULTY.SOLDIER) return p.difficulty === 'soldier';
        if (difficulty === DIFFICULTY.WARRIOR) return p.difficulty === 'soldier' || p.difficulty === 'warrior';
        return true; // Hero gets all
    });
    
    const kicheResponses = CONVERSATION_EXCHANGES.kicheResponses.filter(p => {
        if (difficulty === DIFFICULTY.SOLDIER) return false; // No K'iche' responses for soldiers
        if (difficulty === DIFFICULTY.WARRIOR) return p.difficulty === 'warrior';
        return true; // Hero gets all
    });
    
    // Add phrase select questions (How would you ask X?)
    const selectedPhrases = phraseSelect.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 2));
    selectedPhrases.forEach(phrase => {
        questions.push({
            type: QUESTION_TYPE.PHRASE_SELECT,
            instruction: t('howWouldYou'),
            prompt: phrase.icon + ' ' + phrase.situation,
            promptEs: phrase.icon + ' ' + phrase.situationEs,
            correctAnswer: phrase.correctPhrase,
            choices: [phrase.correctPhrase, ...phrase.wrongPhrases].sort(() => Math.random() - 0.5),
            culture: phrase.culture,
            lessonId: 'greetings',
            word: { kiche: phrase.correctPhrase, english: phrase.situation, culture: phrase.culture },
        });
    });
    
    // Add K'iche' conversation response questions (advanced)
    if (kicheResponses.length > 0) {
        const selectedResponses = kicheResponses.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 3));
        selectedResponses.forEach(conv => {
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
                word: { kiche: conv.correctResponse, english: conv.responseTranslation, culture: conv.culture },
            });
        });
    }
    
    return questions;
}

// Create a recall question - see the icon, type the word you learned
function createRecallQuestion(item, allItems, lessonId) {
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

function createCulturalQuestion(item, type, allItems, lessonId) {
    const question = {
        word: item,
        type: type,
        lessonId: lessonId,
        culture: item.culture,
        correctAnswer: null,
        prompt: null,
        choices: null,
        instruction: null,
    };
    
    switch (type) {
        case QUESTION_TYPE.ICON_SELECT:
            // Show K'iche' word, select the matching icon
            question.instruction = t('selectIconFor');
            question.prompt = item.kiche;
            question.correctAnswer = item.icon;
            
            // Get 3 wrong icon answers
            const otherIcons = allItems
                .filter(i => i.icon !== item.icon && i.icon)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(i => i.icon);
            
            question.choices = [item.icon, ...otherIcons].sort(() => Math.random() - 0.5);
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
            question.acceptableAnswers = [item.english.toLowerCase(), item.spanish?.toLowerCase()].filter(Boolean);
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
function checkLessonAnswer(userAnswer, question) {
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
    const simplify = (str) => str
        .replace(/'/g, "'")
        .replace(/'/g, "'")
        .replace(/'/g, "")
        .replace(/'/g, "");
    
    if (simplify(normalizedUser) === simplify(normalizedCorrect)) {
        return true;
    }
    
    return false;
}

// Lesson metadata for UI
const LESSONS = {
    vocabulary: {
        id: 'vocabulary',
        name: "K'ak'a taq tzij",
        englishName: 'Vocabulary',
        spanishName: 'Vocabulario',
        description: 'Learn words with cultural context from the Popol Vuh',
        icon: '📚',
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

// Export
window.LESSON_TYPES = LESSON_TYPES;
window.LESSONS = LESSONS;
window.DIFFICULTY = DIFFICULTY;
window.QUESTION_TYPE = QUESTION_TYPE;
window.setDifficulty = setDifficulty;
window.getDifficulty = getDifficulty;
window.generateLessonQuestions = generateLessonQuestions;
window.checkLessonAnswer = checkLessonAnswer;
