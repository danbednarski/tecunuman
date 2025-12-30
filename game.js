const DEBUG = {
  enabled: new URLSearchParams(window.location.search).get("debug") === "true",
  log(...args) {
    if (this.enabled) {
      console.log("[TecunUman DEBUG]", ...args);
    }
  },
  warn(...args) {
    if (this.enabled) {
      console.warn("[TecunUman DEBUG]", ...args);
    }
  },
  error(...args) {
    console.error("[TecunUman ERROR]", ...args);
  },
  // Log game state
  logState() {
    if (this.enabled) {
      console.group("[TecunUman DEBUG] Game State");
      console.log("Army:", GameState.army);
      console.log("Morale:", GameState.morale);
      console.log("Mastery:", GameState.mastery);
      console.log("Turn:", GameState.turn);
      console.log("Army Position:", GameState.armyPosition);
      console.log("Words Learned:", GameState.wordsLearned.size);
      console.log("Battles Won/Lost:", GameState.battlesWon, "/", GameState.battlesLost);
      console.log("Completed Lessons:", GameState.completedLessons);
      console.log("Current Battle:", GameState.currentBattle);
      console.groupEnd();
    }
  },
  // Log node info
  logNode(node) {
    if (this.enabled && node) {
      console.group("[TecunUman DEBUG] Node:", node.name);
      console.log("ID:", node.id);
      console.log("Status:", node.status);
      console.log("Lesson Type:", node.lessonType);
      console.log("Spanish Strength:", node.spanishStrength);
      console.log("Requirements:", node.requires);
      console.log("Revealed:", node.revealed);
      console.groupEnd();
    }
  },
  // Helper functions for console use
  addArmy(amount = 500) {
    if (!this.enabled) return;
    GameState.army += amount;
    if (typeof updateStats === "function") updateStats();
    this.log("Added", amount, "army. Total:", GameState.army);
  },
  setMorale(value = 100) {
    if (!this.enabled) return;
    GameState.morale = Math.min(100, Math.max(0, value));
    if (typeof updateStats === "function") updateStats();
    this.log("Morale set to:", GameState.morale);
  },
  teleport(nodeId) {
    if (!this.enabled) return;
    const node = GameState.nodes.find((n) => n.id === nodeId);
    if (node) {
      GameState.armyPosition = nodeId;
      GameState.revealedNodes.add(nodeId);
      if (typeof revealAdjacentNodes === "function") revealAdjacentNodes(nodeId);
      if (typeof renderMap === "function") renderMap();
      if (typeof centerCameraOnNode === "function") centerCameraOnNode(node, true);
      this.log("Teleported to:", node.name);
    } else {
      this.warn("Node not found:", nodeId);
      this.log("Available nodes:", GameState.nodes.map((n) => n.id).join(", "));
    }
  },
  captureNode(nodeId) {
    if (!this.enabled) return;
    const node = GameState.nodes.find((n) => n.id === nodeId);
    if (node) {
      node.status = "kiche";
      node.spanishStrength = 0;
      GameState.revealedNodes.add(nodeId);
      if (typeof revealAdjacentNodes === "function") revealAdjacentNodes(nodeId);
      if (typeof renderMap === "function") renderMap();
      this.log("Captured:", node.name);
    } else {
      this.warn("Node not found:", nodeId);
    }
  },
  completeLesson(nodeId, difficulty = "hero") {
    if (!this.enabled) return;
    if (!GameState.completedLessons[nodeId]) {
      GameState.completedLessons[nodeId] = {};
    }
    GameState.completedLessons[nodeId][difficulty] = true;
    if (difficulty === "hero") {
      GameState.completedLessons[nodeId]["warrior"] = true;
      GameState.completedLessons[nodeId]["soldier"] = true;
    } else if (difficulty === "warrior") {
      GameState.completedLessons[nodeId]["soldier"] = true;
    }
    this.log("Completed lesson at", nodeId, "difficulty:", difficulty);
  },
  listNodes() {
    if (!this.enabled) return;
    console.table(GameState.nodes.map((n) => ({
      id: n.id,
      name: n.name,
      status: n.status,
      spanishStrength: n.spanishStrength,
      lessonType: n.lessonType,
      revealed: GameState.revealedNodes.has(n.id)
    })));
  }
};
if (DEBUG.enabled) {
  console.log("%c[TecunUman] DEBUG MODE ENABLED", "background: #ff6b35; color: white; padding: 4px 8px; font-weight: bold;");
  console.log("Debug features:");
  console.log("  - All nodes accessible (requirements bypassed)");
  console.log("  - All nodes revealed on map");
  console.log("  - Extra logging enabled");
  console.log("  - DEBUG object available in console");
  console.log("  - Press D to dump game state");
  console.log("  - Press S on tutorial screen to skip to quiz");
  console.log("  - Press W to auto-win current battle");
  document.addEventListener("keydown", (e) => {
    var _a, _b;
    if (e.target.matches("input, textarea")) return;
    switch (e.key.toLowerCase()) {
      case "d":
        DEBUG.logState();
        break;
      case "s":
        if ((_a = document.getElementById("tutorial-screen")) == null ? void 0 : _a.classList.contains("active")) {
          DEBUG.log("Skipping tutorial...");
          if (typeof startQuizFromTutorial === "function") {
            startQuizFromTutorial();
          }
        }
        break;
      case "w":
        if (((_b = document.getElementById("battle-screen")) == null ? void 0 : _b.classList.contains("active")) && GameState.currentBattle) {
          DEBUG.log("Auto-winning battle...");
          GameState.currentQuestions.length - GameState.currentQuestionIndex;
          GameState.correctAnswers = GameState.currentQuestions.length;
          GameState.currentQuestionIndex = GameState.currentQuestions.length;
          GameState.currentBattle.enemyStrength = 0;
          endBattle();
        }
        break;
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const indicator = document.createElement("div");
    indicator.id = "debug-indicator";
    indicator.innerHTML = "🔧 DEBUG MODE";
    indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ff6b35;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            font-weight: bold;
            z-index: 99999;
            pointer-events: none;
        `;
    document.body.appendChild(indicator);
    window.DEBUG = DEBUG;
    window.GameState = GameState;
  });
}
const GameState = {
  // Player resources
  army: 1e3,
  morale: 100,
  mastery: 0,
  wordsLearned: /* @__PURE__ */ new Set(),
  battlesWon: 0,
  battlesLost: 0,
  // Campaign progress
  turn: 1,
  year: 1524,
  month: 2,
  // Army position
  armyPosition: null,
  // Current node ID
  // Current battle
  currentBattle: null,
  currentQuestions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0,
  // Map state
  nodes: [],
  edges: [],
  revealedNodes: /* @__PURE__ */ new Set(),
  // Completed lessons per node: { nodeId: { soldier: true, warrior: false, hero: false } }
  completedLessons: {},
  // Camera/viewport
  camera: { x: 0, y: 0 },
  isDragging: false,
  lastMouse: { x: 0, y: 0 },
  // Selected node
  selectedNode: null,
  // Spanish attack event
  activeAttack: null
};
const NODE_TYPES = {
  START: { lesson: "vocabulary", icon: "🏛️", name: "Capital" },
  VOCABULARY: { lesson: "vocabulary", icon: "📚", name: "Village" },
  GREETINGS: { lesson: "greetings", icon: "👋", name: "Trading Post" },
  PRONOUNS: { lesson: "pronouns", icon: "👤", name: "Sacred Grove" },
  POSSESSION: { lesson: "possession", icon: "🏠", name: "Fortress" },
  NEGATION: { lesson: "negation", icon: "🚫", name: "Watchtower" },
  VERBS: { lesson: "intransitive_verbs", icon: "🚶", name: "Training Ground" },
  NUMBERS: { lesson: "numbers", icon: "🔢", name: "Counting House" },
  EXISTENTIAL: { lesson: "existential", icon: "✨", name: "Temple" },
  QUESTIONS: { lesson: "questions", icon: "❓", name: "Council Hall" },
  COMMANDS: { lesson: "commands", icon: "👆", name: "War Camp" },
  ADJECTIVES: { lesson: "adjectives", icon: "🎨", name: "Artisan Quarter" },
  SPANISH_FORT: { lesson: "vocabulary", icon: "🏰", name: "Spanish Fort" }
};
function generateMap() {
  const nodes = [];
  const edges = [];
  function createNode(config) {
    const nodeType = Object.keys(NODE_TYPES).find(
      (key) => NODE_TYPES[key].lesson === config.lessonType && key !== "START" && key !== "SPANISH_FORT"
    ) || "VOCABULARY";
    return {
      id: config.id,
      x: config.x,
      y: config.y,
      type: config.isSpanish ? "SPANISH_FORT" : config.isCapital ? "START" : nodeType,
      name: config.name,
      description: config.description,
      status: config.status || "kiche",
      isCapital: config.isCapital || false,
      revealed: config.revealed || false,
      spanishStrength: config.spanishStrength || 0,
      lessonType: config.lessonType,
      requires: config.requires || [],
      // Array of {nodeId, difficulty} requirements
      region: config.region || "highlands",
      isFinalBoss: config.isFinalBoss || false
    };
  }
  nodes.push(createNode({
    id: "qumarkaj",
    x: 1e3,
    y: 900,
    name: "Q'umarkaj",
    description: "The sacred capital of the K'iche' Kingdom, seat of the Ajpop. Your journey begins here in the heart of Iximulew (Guatemala).",
    lessonType: "vocabulary",
    status: "kiche",
    isCapital: true,
    revealed: true,
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "chichi",
    x: 1100,
    y: 1100,
    name: "Chichicastenango",
    description: "The sacred market town, home to the Popol Vuh manuscript. Learn greetings used in the famous market.",
    lessonType: "greetings",
    status: "kiche",
    revealed: true,
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "sacapulas",
    x: 1050,
    y: 650,
    name: "Sacapulas",
    description: "Ancient salt-trading town along the Río Negro. Learn to count and trade.",
    lessonType: "numbers",
    status: "kiche",
    revealed: true,
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "totonicapan",
    x: 700,
    y: 850,
    name: "Totonicapán",
    description: "Highland city of artisans. Learn adjectives to describe their beautiful crafts.",
    lessonType: "adjectives",
    status: "kiche",
    requires: [{ nodeId: "qumarkaj", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "xelaju",
    x: 400,
    y: 900,
    name: "Xelaju",
    description: "The great city of Quetzaltenango. Master commands to lead the warriors here.",
    lessonType: "commands",
    status: "contested",
    spanishStrength: 250,
    requires: [{ nodeId: "totonicapan", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "zunil",
    x: 350,
    y: 1100,
    name: "Zunil",
    description: "Village of sacred hot springs. Learn about existence and being.",
    lessonType: "existential",
    status: "kiche",
    requires: [{ nodeId: "xelaju", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "huehue",
    x: 250,
    y: 600,
    name: "Huehuetenango",
    description: "The Mam Maya stronghold. Learn the vocabulary of war and resistance.",
    lessonType: "vocabulary_warfare",
    status: "contested",
    spanishStrength: 200,
    requires: [{ nodeId: "xelaju", difficulty: "warrior" }],
    region: "mam"
  }));
  nodes.push(createNode({
    id: "zaculeu",
    x: 200,
    y: 500,
    name: "Zaculeu",
    description: "The ancient Mam capital. Learn the geography and places of the highlands.",
    lessonType: "vocabulary_places",
    status: "spanish",
    spanishStrength: 350,
    requires: [{ nodeId: "huehue", difficulty: "soldier" }],
    region: "mam"
  }));
  nodes.push(createNode({
    id: "nebaj",
    x: 1200,
    y: 450,
    name: "Nebaj",
    description: "Heart of the Ixil Maya territory. Learn pronouns and forms of address.",
    lessonType: "pronouns",
    status: "kiche",
    requires: [{ nodeId: "sacapulas", difficulty: "soldier" }],
    region: "ixil"
  }));
  nodes.push(createNode({
    id: "chajul",
    x: 1400,
    y: 400,
    name: "Chajul",
    description: "Remote Ixil village. Master negation to defend against Spanish lies.",
    lessonType: "negation",
    status: "kiche",
    requires: [{ nodeId: "nebaj", difficulty: "soldier" }],
    region: "ixil"
  }));
  nodes.push(createNode({
    id: "cotzal",
    x: 1350,
    y: 550,
    name: "San Juan Cotzal",
    description: "Complete the Ixil triangle. Learn verbs of movement and action.",
    lessonType: "intransitive_verbs",
    status: "kiche",
    requires: [{ nodeId: "nebaj", difficulty: "soldier" }],
    region: "ixil"
  }));
  nodes.push(createNode({
    id: "uspantan",
    x: 1550,
    y: 500,
    name: "Uspantán",
    description: "Gateway to the Verapaz region. Birthplace of Rigoberta Menchú.",
    lessonType: "questions",
    status: "contested",
    spanishStrength: 180,
    requires: [{ nodeId: "chajul", difficulty: "soldier" }, { nodeId: "cotzal", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "solola",
    x: 900,
    y: 1200,
    name: "Sololá",
    description: "Gateway to Lake Atitlán. Spanish forces are advancing from the south! Learn about possession and ownership to rally the defenders.",
    lessonType: "possession",
    status: "contested",
    spanishStrength: 150,
    revealed: true,
    // Visible from start - shows the Spanish threat
    requires: [{ nodeId: "chichi", difficulty: "soldier" }],
    region: "kaqchikel"
  }));
  nodes.push(createNode({
    id: "panajachel",
    x: 850,
    y: 1400,
    name: "Panajachel",
    description: "Beautiful shores of Lake Atitlán, the navel of the world. Learn the animals of the lake.",
    lessonType: "vocabulary_animals",
    status: "kiche",
    requires: [{ nodeId: "solola", difficulty: "soldier" }],
    region: "kaqchikel"
  }));
  nodes.push(createNode({
    id: "santiago",
    x: 700,
    y: 1500,
    name: "Santiago Atitlán",
    description: "Home of Maximón. The Tz'utujil Maya allies await.",
    lessonType: "existential",
    status: "kiche",
    requires: [{ nodeId: "panajachel", difficulty: "soldier" }],
    region: "tzutujil"
  }));
  nodes.push(createNode({
    id: "joyabaj",
    x: 1300,
    y: 900,
    name: "Joyabaj",
    description: "Eastern K'iche' town known for its dances. Practice greetings.",
    lessonType: "greetings",
    status: "kiche",
    requires: [{ nodeId: "qumarkaj", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "rabinal",
    x: 1550,
    y: 850,
    name: "Rabinal",
    description: "Home of the Rabinal Achí dance-drama. The Achi Maya join your cause.",
    lessonType: "commands",
    status: "contested",
    spanishStrength: 200,
    requires: [{ nodeId: "joyabaj", difficulty: "warrior" }],
    region: "achi"
  }));
  nodes.push(createNode({
    id: "salama",
    x: 1700,
    y: 750,
    name: "Salamá",
    description: "Capital of Baja Verapaz. Spanish missionaries are active here.",
    lessonType: "negation",
    status: "spanish",
    spanishStrength: 280,
    requires: [{ nodeId: "rabinal", difficulty: "soldier" }],
    region: "verapaz"
  }));
  nodes.push(createNode({
    id: "coban",
    x: 1900,
    y: 600,
    name: "Cobán",
    description: "Heart of Q'eqchi' territory. Learn sacred and spiritual vocabulary.",
    lessonType: "vocabulary_spiritual",
    status: "spanish",
    spanishStrength: 320,
    requires: [{ nodeId: "salama", difficulty: "soldier" }, { nodeId: "uspantan", difficulty: "soldier" }],
    region: "verapaz"
  }));
  nodes.push(createNode({
    id: "tecpan",
    x: 1200,
    y: 1300,
    name: "Tecpán Guatemala",
    description: "Near the ancient Kaqchikel capital of Iximche.",
    lessonType: "pronouns",
    status: "contested",
    spanishStrength: 220,
    requires: [{ nodeId: "solola", difficulty: "soldier" }, { nodeId: "chichi", difficulty: "warrior" }],
    region: "kaqchikel"
  }));
  nodes.push(createNode({
    id: "chimaltenango",
    x: 1400,
    y: 1400,
    name: "Chimaltenango",
    description: "Gateway to the central valley. Spanish forces are strong here.",
    lessonType: "intransitive_verbs",
    status: "spanish",
    spanishStrength: 300,
    requires: [{ nodeId: "tecpan", difficulty: "warrior" }],
    region: "kaqchikel"
  }));
  nodes.push(createNode({
    id: "antigua",
    x: 1500,
    y: 1550,
    name: "Antigua Guatemala",
    description: "The Spanish colonial capital. A major battle awaits.",
    lessonType: "questions",
    status: "spanish",
    spanishStrength: 400,
    requires: [{ nodeId: "chimaltenango", difficulty: "warrior" }],
    region: "central"
  }));
  nodes.push(createNode({
    id: "mazatenango",
    x: 500,
    y: 1400,
    name: "Mazatenango",
    description: "Gateway to the Pacific coast. Rich cacao-growing region.",
    lessonType: "numbers",
    status: "contested",
    spanishStrength: 180,
    requires: [{ nodeId: "zunil", difficulty: "soldier" }, { nodeId: "santiago", difficulty: "soldier" }],
    region: "coast"
  }));
  nodes.push(createNode({
    id: "retalhuleu",
    x: 350,
    y: 1550,
    name: "Retalhuleu",
    description: "Pacific coastal town. The Spanish import goods through here.",
    lessonType: "adjectives",
    status: "spanish",
    spanishStrength: 250,
    requires: [{ nodeId: "mazatenango", difficulty: "warrior" }],
    region: "coast"
  }));
  nodes.push(createNode({
    id: "iximche",
    x: 1300,
    y: 1500,
    name: "Iximche",
    description: "The ancient Kaqchikel capital. Master advanced concepts and history.",
    lessonType: "vocabulary_advanced",
    status: "spanish",
    spanishStrength: 500,
    isSpanish: true,
    requires: [
      { nodeId: "tecpan", difficulty: "hero" },
      { nodeId: "antigua", difficulty: "warrior" }
    ],
    region: "kaqchikel",
    isFinalBoss: true
  }));
  const connections = [
    // From Q'umarkaj (center hub)
    ["qumarkaj", "chichi"],
    ["qumarkaj", "sacapulas"],
    ["qumarkaj", "totonicapan"],
    ["qumarkaj", "joyabaj"],
    // Western route
    ["totonicapan", "xelaju"],
    ["xelaju", "zunil"],
    ["xelaju", "huehue"],
    ["huehue", "zaculeu"],
    // Northern route (Ixil)
    ["sacapulas", "nebaj"],
    ["nebaj", "chajul"],
    ["nebaj", "cotzal"],
    ["chajul", "uspantan"],
    ["cotzal", "uspantan"],
    // Southern route (Lake Atitlán)
    ["chichi", "solola"],
    ["solola", "panajachel"],
    ["panajachel", "santiago"],
    // Eastern route
    ["joyabaj", "rabinal"],
    ["rabinal", "salama"],
    ["salama", "coban"],
    ["uspantan", "coban"],
    // Southeast route
    ["solola", "tecpan"],
    ["chichi", "tecpan"],
    ["tecpan", "chimaltenango"],
    ["chimaltenango", "antigua"],
    ["tecpan", "iximche"],
    ["antigua", "iximche"],
    // Pacific coast
    ["zunil", "mazatenango"],
    ["santiago", "mazatenango"],
    ["mazatenango", "retalhuleu"],
    // Cross-connections (loop backs)
    ["totonicapan", "sacapulas"],
    // Mountain route
    ["zunil", "santiago"],
    // Lake western shore
    ["rabinal", "uspantan"],
    // Northern traverse
    ["joyabaj", "cotzal"]
    // Eastern-northern link
  ];
  for (const [from, to] of connections) {
    edges.push({ from, to });
  }
  return { nodes, edges };
}
let canvas, ctx;
function initCanvas() {
  canvas = document.getElementById("campaign-map");
  ctx = canvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  const container = document.getElementById("map-container");
  container.addEventListener("mousedown", handleMouseDown);
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseup", handleMouseUp);
  container.addEventListener("mouseleave", handleMouseUp);
  container.addEventListener("wheel", handleWheel);
  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchmove", handleTouchMove);
  container.addEventListener("touchend", handleTouchEnd);
}
function resizeCanvas() {
  const container = document.getElementById("map-container");
  if (container.clientWidth > 0 && container.clientHeight > 0) {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    renderMap();
  }
}
function handleMouseDown(e) {
  if (e.target.closest(".territory-panel") || e.target.closest(".attack-alert")) return;
  GameState.isDragging = true;
  GameState.lastMouse = { x: e.clientX, y: e.clientY };
}
function handleMouseMove(e) {
  if (!GameState.isDragging) return;
  const dx = e.clientX - GameState.lastMouse.x;
  const dy = e.clientY - GameState.lastMouse.y;
  GameState.camera.x -= dx;
  GameState.camera.y -= dy;
  GameState.lastMouse = { x: e.clientX, y: e.clientY };
  renderMap();
}
function handleMouseUp() {
  GameState.isDragging = false;
}
function handleWheel(e) {
  e.preventDefault();
  GameState.camera.x += e.deltaX;
  GameState.camera.y += e.deltaY;
  renderMap();
}
let touchStart = null;
function handleTouchStart(e) {
  if (e.touches.length === 1) {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
}
function handleTouchMove(e) {
  if (!touchStart || e.touches.length !== 1) return;
  e.preventDefault();
  const dx = e.touches[0].clientX - touchStart.x;
  const dy = e.touches[0].clientY - touchStart.y;
  GameState.camera.x -= dx;
  GameState.camera.y -= dy;
  touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  renderMap();
}
function handleTouchEnd() {
  touchStart = null;
}
function renderMap() {
  if (!ctx) return;
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1a3d2e");
  gradient.addColorStop(0.5, "#0f2a1f");
  gradient.addColorStop(1, "#0a1f15");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawTerrain();
  drawEdges();
  drawNodes();
  updateArmyMarker();
}
function drawTerrain() {
  ctx.fillStyle = "rgba(34, 139, 34, 0.15)";
  for (let i = 0; i < 50; i++) {
    const x = i * 197 % 2500 - GameState.camera.x;
    const y = i * 131 % 2e3 - GameState.camera.y;
    ctx.beginPath();
    ctx.arc(x, y, 40 + i % 30, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(26, 77, 62, 0.25)";
  for (let i = 0; i < 80; i++) {
    const x = i * 157 % 2500 - GameState.camera.x;
    const y = i * 103 % 2e3 - GameState.camera.y;
    ctx.beginPath();
    ctx.arc(x, y, 25 + i % 20, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(212, 168, 67, 0.03)";
  ctx.lineWidth = 1;
  const tileSize = 100;
  const offsetX = GameState.camera.x % tileSize;
  const offsetY = GameState.camera.y % tileSize;
  for (let x = -offsetX; x < canvas.width + tileSize; x += tileSize) {
    for (let y = -offsetY; y < canvas.height + tileSize; y += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, y + tileSize / 2);
      ctx.lineTo(x + tileSize / 4, y + tileSize / 2);
      ctx.lineTo(x + tileSize / 4, y + tileSize / 4);
      ctx.lineTo(x + tileSize / 2, y + tileSize / 4);
      ctx.lineTo(x + tileSize / 2, y);
      ctx.stroke();
    }
  }
  ctx.fillStyle = "rgba(10, 31, 21, 0.4)";
  ctx.beginPath();
  const mountainY = 50 - GameState.camera.y * 0.1;
  ctx.moveTo(0, mountainY + 200);
  for (let x = 0; x < canvas.width + 100; x += 80) {
    const peakHeight = 50 + Math.sin(x * 0.02) * 30 + Math.cos(x * 0.01) * 40;
    ctx.lineTo(x, mountainY + peakHeight);
  }
  ctx.lineTo(canvas.width, mountainY + 200);
  ctx.closePath();
  ctx.fill();
}
function drawMayanTile(x, y, size, fillColor, strokeColor, isCapital) {
  const halfSize = size / 2;
  const step = size * 0.15;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.beginPath();
  if (isCapital) {
    ctx.moveTo(x - halfSize + step, y - halfSize);
    ctx.lineTo(x + halfSize - step, y - halfSize);
    ctx.lineTo(x + halfSize, y - halfSize + step);
    ctx.lineTo(x + halfSize, y + halfSize - step);
    ctx.lineTo(x + halfSize - step, y + halfSize);
    ctx.lineTo(x - halfSize + step, y + halfSize);
    ctx.lineTo(x - halfSize, y + halfSize - step);
    ctx.lineTo(x - halfSize, y - halfSize + step);
  } else {
    ctx.moveTo(x - halfSize + step, y - halfSize);
    ctx.lineTo(x + halfSize - step, y - halfSize);
    ctx.lineTo(x + halfSize, y - halfSize + step);
    ctx.lineTo(x + halfSize, y + halfSize - step);
    ctx.lineTo(x + halfSize - step, y + halfSize);
    ctx.lineTo(x - halfSize + step, y + halfSize);
    ctx.lineTo(x - halfSize, y + halfSize - step);
    ctx.lineTo(x - halfSize, y - halfSize + step);
  }
  ctx.closePath();
  ctx.translate(3, 4);
  ctx.fill();
  ctx.translate(-3, -4);
  ctx.beginPath();
  if (isCapital) {
    ctx.moveTo(x - halfSize + step, y - halfSize);
    ctx.lineTo(x + halfSize - step, y - halfSize);
    ctx.lineTo(x + halfSize, y - halfSize + step);
    ctx.lineTo(x + halfSize, y + halfSize - step);
    ctx.lineTo(x + halfSize - step, y + halfSize);
    ctx.lineTo(x - halfSize + step, y + halfSize);
    ctx.lineTo(x - halfSize, y + halfSize - step);
    ctx.lineTo(x - halfSize, y - halfSize + step);
  } else {
    ctx.moveTo(x - halfSize + step, y - halfSize);
    ctx.lineTo(x + halfSize - step, y - halfSize);
    ctx.lineTo(x + halfSize, y - halfSize + step);
    ctx.lineTo(x + halfSize, y + halfSize - step);
    ctx.lineTo(x + halfSize - step, y + halfSize);
    ctx.lineTo(x - halfSize + step, y + halfSize);
    ctx.lineTo(x - halfSize, y + halfSize - step);
    ctx.lineTo(x - halfSize, y - halfSize + step);
  }
  ctx.closePath();
  const gradient = ctx.createLinearGradient(x - halfSize, y - halfSize, x + halfSize, y + halfSize);
  gradient.addColorStop(0, lightenColor(fillColor, 20));
  gradient.addColorStop(0.5, fillColor);
  gradient.addColorStop(1, darkenColor(fillColor, 20));
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = isCapital ? 4 : 3;
  ctx.stroke();
  if (isCapital) {
    const innerStep = step * 0.7;
    const innerHalf = halfSize * 0.75;
    ctx.beginPath();
    ctx.moveTo(x - innerHalf + innerStep, y - innerHalf);
    ctx.lineTo(x + innerHalf - innerStep, y - innerHalf);
    ctx.lineTo(x + innerHalf, y - innerHalf + innerStep);
    ctx.lineTo(x + innerHalf, y + innerHalf - innerStep);
    ctx.lineTo(x + innerHalf - innerStep, y + innerHalf);
    ctx.lineTo(x - innerHalf + innerStep, y + innerHalf);
    ctx.lineTo(x - innerHalf, y + innerHalf - innerStep);
    ctx.lineTo(x - innerHalf, y - innerHalf + innerStep);
    ctx.closePath();
    ctx.strokeStyle = "rgba(212, 168, 67, 0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(x - halfSize + step + 2, y - halfSize + 2);
  ctx.lineTo(x + halfSize - step - 2, y - halfSize + 2);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}
function lightenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 255) + amt);
  const B = Math.min(255, (num & 255) + amt);
  return `rgb(${R},${G},${B})`;
}
function darkenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, (num >> 8 & 255) - amt);
  const B = Math.max(0, (num & 255) - amt);
  return `rgb(${R},${G},${B})`;
}
function drawEdges() {
  for (const edge of GameState.edges) {
    const fromNode = GameState.nodes.find((n) => n.id === edge.from);
    const toNode = GameState.nodes.find((n) => n.id === edge.to);
    if (!fromNode || !toNode) continue;
    const fromRevealed = GameState.revealedNodes.has(fromNode.id);
    const toRevealed = GameState.revealedNodes.has(toNode.id);
    if (!fromRevealed && !toRevealed) continue;
    const x1 = fromNode.x - GameState.camera.x;
    const y1 = fromNode.y - GameState.camera.y;
    const x2 = toNode.x - GameState.camera.x;
    const y2 = toNode.y - GameState.camera.y;
    ctx.beginPath();
    ctx.moveTo(x1 + 2, y1 + 2);
    ctx.lineTo(x2 + 2, y2 + 2);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    if (!toRevealed) {
      ctx.strokeStyle = "rgba(100, 80, 60, 0.4)";
      ctx.setLineDash([15, 10]);
      ctx.lineWidth = 4;
    } else {
      ctx.strokeStyle = "rgba(139, 115, 85, 0.7)";
      ctx.setLineDash([]);
      ctx.lineWidth = 4;
    }
    ctx.stroke();
    ctx.setLineDash([]);
    if (toRevealed && fromRevealed) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.floor(dist / 30);
      ctx.fillStyle = "rgba(212, 168, 67, 0.3)";
      for (let i = 1; i < steps; i++) {
        const t2 = i / steps;
        const px = x1 + dx * t2;
        const py = y1 + dy * t2;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
function drawNodes() {
  for (const node of GameState.nodes) {
    const isRevealed = GameState.revealedNodes.has(node.id);
    const x = node.x - GameState.camera.x;
    const y = node.y - GameState.camera.y;
    if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50) continue;
    const size = node.isCapital ? 50 : 36;
    const halfSize = size / 2;
    if (!isRevealed) {
      drawMayanTile(x, y, size, "#2a2a4a", "#3a3a5a", false);
      ctx.fillStyle = "#555";
      ctx.font = "bold 22px Cinzel";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("?", x, y);
      continue;
    }
    let fillColor, strokeColor;
    switch (node.status) {
      case "kiche":
        fillColor = "#1a4d3e";
        strokeColor = "#3fa878";
        break;
      case "spanish":
        fillColor = "#6a1a1a";
        strokeColor = "#c41e3a";
        break;
      case "contested":
        fillColor = "#5a3a1a";
        strokeColor = "#d4a843";
        break;
    }
    if (node.id === GameState.armyPosition) {
      const glowSize = size + 20;
      const gradient = ctx.createRadialGradient(x, y, size / 2, x, y, glowSize);
      gradient.addColorStop(0, "rgba(63, 168, 120, 0.5)");
      gradient.addColorStop(0.5, "rgba(63, 168, 120, 0.2)");
      gradient.addColorStop(1, "rgba(63, 168, 120, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2);
    }
    drawMayanTile(x, y, size, fillColor, strokeColor, node.isCapital);
    const typeInfo = NODE_TYPES[node.type];
    ctx.font = node.isCapital ? "26px Arial" : "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillText(typeInfo.icon, x + 1, y + 2);
    ctx.fillStyle = "#fff";
    ctx.fillText(typeInfo.icon, x, y);
    if (node.status === "contested") {
      ctx.font = "16px Arial";
      ctx.fillStyle = "rgba(212, 168, 67, 0.8)";
      ctx.fillText("⚔️", x + halfSize - 3, y - halfSize + 3);
    }
    ctx.fillStyle = "#f4e4bc";
    ctx.font = "bold 11px Cinzel";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 4;
    ctx.fillText(node.name, x, y + halfSize + 15);
    ctx.shadowBlur = 0;
    node._screenX = x;
    node._screenY = y;
    node._radius = halfSize;
  }
}
function updateArmyMarker() {
  const armyMarker = document.getElementById("army-marker");
  const currentNode = GameState.nodes.find((n) => n.id === GameState.armyPosition);
  if (!currentNode) {
    armyMarker.style.display = "none";
    return;
  }
  const x = currentNode.x - GameState.camera.x;
  const y = currentNode.y - GameState.camera.y;
  armyMarker.style.display = "block";
  armyMarker.style.left = `${x}px`;
  armyMarker.style.top = `${y - 25}px`;
}
function handleMapClick(e) {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  for (const node of GameState.nodes) {
    if (!GameState.revealedNodes.has(node.id)) continue;
    const dx = clickX - node._screenX;
    const dy = clickY - node._screenY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= node._radius + 10) {
      selectNode(node);
      return;
    }
  }
  deselectNode();
}
function selectNode(node) {
  GameState.selectedNode = node;
  const panel = document.getElementById("territory-info");
  panel.classList.remove("hidden");
  document.getElementById("territory-name").textContent = node.name;
  document.getElementById("territory-desc").textContent = node.description;
  const statusDiv = document.getElementById("territory-status");
  let statusHTML = "";
  switch (node.status) {
    case "kiche":
      statusHTML = `<span style="color: #2d7d5f;">✓ ${t("underKicheControl")}</span>`;
      break;
    case "spanish":
      statusHTML = `<span style="color: #c41e3a;">✗ ${t("spanishControlledStatus")}</span>
                <br>${t("enemyStrength")}: ${node.spanishStrength} ${t("soldiers")}`;
      break;
    case "contested":
      statusHTML = `<span style="color: #c45c3b;">⚔️ ${t("underAttackStatus")}</span>
                <br>${t("enemyStrength")}: ${node.spanishStrength} ${t("soldiers")}`;
      break;
  }
  statusDiv.innerHTML = statusHTML;
  const lessonInfo = document.getElementById("lesson-info");
  const lesson = LESSONS[node.lessonType];
  if (lesson) {
    lessonInfo.innerHTML = `
            <div class="lesson-type">
                <span>${lesson.icon || "📚"}</span>
                <span>${lesson.englishName}</span>
            </div>
            <div class="lesson-desc">${lesson.description}</div>
        `;
    lessonInfo.style.display = "block";
  } else {
    lessonInfo.style.display = "none";
  }
  const completedDiv = document.createElement("div");
  completedDiv.className = "completed-difficulties";
  const completions = GameState.completedLessons[node.id];
  if (completions) {
    const completedText = [];
    if (completions.soldier) completedText.push("🪖");
    if (completions.warrior) completedText.push("⚔️");
    if (completions.hero) completedText.push("🦸");
    if (completedText.length > 0) {
      completedDiv.innerHTML = `<span style="color: #3fa878; font-size: 0.85rem;">${t("completed")}: ${completedText.join(" ")}</span>`;
    }
  }
  const actionsDiv = document.getElementById("territory-actions");
  actionsDiv.innerHTML = "";
  if (completedDiv.innerHTML) {
    actionsDiv.appendChild(completedDiv);
  }
  const reqCheck = checkNodeRequirements(node);
  const isCurrentPosition = node.id === GameState.armyPosition;
  if (isCurrentPosition) {
    if (node.status === "contested" || node.status === "spanish") {
      showDifficultySelector(actionsDiv, node, node.status === "contested" ? "defend" : "attack");
    } else {
      showDifficultySelector(actionsDiv, node, "train");
    }
  } else if (!reqCheck.met) {
    const reqDiv = document.createElement("div");
    reqDiv.className = "requirements-info";
    reqDiv.innerHTML = `
            <p style="color: #c45c3b; margin-bottom: 0.5rem;">🔒 ${t("requirementsNeeded")}:</p>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.85rem;">
                ${reqCheck.missing.map((req) => `
                    <li style="color: #888; margin-bottom: 0.3rem;">
                        • ${t("complete")} <strong>${req.nodeName}</strong> 
                        ${t("at")} <span style="color: #d4a843;">${t(req.difficulty)}</span> ${t("level")}
                    </li>
                `).join("")}
            </ul>
        `;
    actionsDiv.appendChild(reqDiv);
  } else {
    const canReach = canReachNode(node);
    if (canReach) {
      if (node.status === "spanish" || node.status === "contested") {
        showDifficultySelector(actionsDiv, node, node.status === "contested" ? "defend" : "attack");
      } else {
        const moveBtn = document.createElement("button");
        moveBtn.className = "stone-button small";
        moveBtn.textContent = t("marchHere");
        moveBtn.onclick = () => moveToNode(node);
        actionsDiv.appendChild(moveBtn);
      }
    } else {
      const infoText = document.createElement("p");
      infoText.style.color = "#888";
      infoText.style.fontSize = "0.9rem";
      infoText.textContent = t("cannotReachPath");
      actionsDiv.appendChild(infoText);
    }
  }
}
function showDifficultySelector(container, node, battleType) {
  const selectorDiv = document.createElement("div");
  selectorDiv.className = "panel-difficulty-selector";
  const label = document.createElement("p");
  label.className = "panel-diff-label";
  label.textContent = t("selectDifficulty");
  selectorDiv.appendChild(label);
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "panel-diff-buttons";
  const difficulties = [
    { id: "soldier", icon: "🪖", name: t("soldier"), desc: t("soldierDesc") },
    { id: "warrior", icon: "⚔️", name: t("warrior"), desc: t("warriorDesc") },
    { id: "hero", icon: "🦸", name: t("hero"), desc: t("heroDesc") }
  ];
  difficulties.forEach((diff) => {
    const btn = document.createElement("button");
    btn.className = "panel-diff-btn";
    btn.innerHTML = `
            <span class="diff-icon">${diff.icon}</span>
            <span class="diff-name">${diff.name}</span>
        `;
    btn.title = diff.desc;
    btn.onclick = () => {
      setDifficulty(diff.id);
      if (battleType === "train") {
        startBattle(node, "train");
      } else {
        moveAndBattle(node);
      }
    };
    buttonsDiv.appendChild(btn);
  });
  selectorDiv.appendChild(buttonsDiv);
  container.appendChild(selectorDiv);
  const actionLabel = document.createElement("p");
  actionLabel.className = "panel-action-label";
  if (battleType === "train") {
    actionLabel.innerHTML = `<span style="color: var(--jade-light);">📚 ${t("train")}</span>`;
  } else if (battleType === "defend") {
    actionLabel.innerHTML = `<span style="color: var(--terracotta);">🛡️ ${t("defend")}</span>`;
  } else {
    actionLabel.innerHTML = `<span style="color: var(--terracotta);">⚔️ ${t("attack")}</span>`;
  }
  container.insertBefore(actionLabel, selectorDiv);
}
function deselectNode() {
  GameState.selectedNode = null;
  document.getElementById("territory-info").classList.add("hidden");
}
function checkNodeRequirements(node) {
  if (DEBUG.enabled) {
    DEBUG.log("Requirements bypassed for node:", node.name);
    return { met: true, missing: [] };
  }
  if (!node.requires || node.requires.length === 0) {
    return { met: true, missing: [] };
  }
  const missing = [];
  for (const req of node.requires) {
    const reqNodeId = req.nodeId;
    const reqDifficulty = req.difficulty || "soldier";
    const completions = GameState.completedLessons[reqNodeId];
    const difficultyLevels = ["soldier", "warrior", "hero"];
    const reqLevel = difficultyLevels.indexOf(reqDifficulty);
    let requirementMet = false;
    if (completions) {
      for (let i = reqLevel; i < difficultyLevels.length; i++) {
        if (completions[difficultyLevels[i]]) {
          requirementMet = true;
          break;
        }
      }
    }
    if (!requirementMet) {
      const reqNode = GameState.nodes.find((n) => n.id === reqNodeId);
      missing.push({
        nodeId: reqNodeId,
        nodeName: reqNode ? reqNode.name : reqNodeId,
        difficulty: reqDifficulty
      });
    }
  }
  return { met: missing.length === 0, missing };
}
function canReachNode(targetNode) {
  const currentPos = GameState.armyPosition;
  const adjacentIds = GameState.edges.filter((e) => e.from === currentPos || e.to === currentPos).map((e) => e.from === currentPos ? e.to : e.from);
  if (adjacentIds.includes(targetNode.id)) {
    return true;
  }
  const visited = /* @__PURE__ */ new Set([currentPos]);
  const queue = [currentPos];
  while (queue.length > 0) {
    const nodeId = queue.shift();
    const neighbors = GameState.edges.filter((e) => e.from === nodeId || e.to === nodeId).map((e) => e.from === nodeId ? e.to : e.from);
    for (const neighborId of neighbors) {
      if (visited.has(neighborId)) continue;
      visited.add(neighborId);
      if (neighborId === targetNode.id) return true;
      const neighbor = GameState.nodes.find((n) => n.id === neighborId);
      if (neighbor && neighbor.status === "kiche" && GameState.revealedNodes.has(neighborId)) {
        queue.push(neighborId);
      }
    }
  }
  return false;
}
function moveToNode(targetNode) {
  GameState.armyPosition = targetNode.id;
  revealAdjacentNodes(targetNode.id);
  centerCameraOnNode(targetNode);
  deselectNode();
  renderMap();
  updateArmyMarker();
  advanceTurn();
}
function moveAndBattle(targetNode) {
  GameState.armyPosition = targetNode.id;
  revealAdjacentNodes(targetNode.id);
  centerCameraOnNode(targetNode);
  renderMap();
  updateArmyMarker();
  startBattle(targetNode, targetNode.status === "contested" ? "defend" : "attack");
}
function revealAdjacentNodes(nodeId) {
  GameState.revealedNodes.add(nodeId);
  const adjacentIds = GameState.edges.filter((e) => e.from === nodeId || e.to === nodeId).map((e) => e.from === nodeId ? e.to : e.from);
  for (const adjId of adjacentIds) {
    GameState.revealedNodes.add(adjId);
  }
}
function centerCameraOnNode(node, animate = true) {
  const container = document.getElementById("map-container");
  const targetX = node.x - container.clientWidth / 2;
  const targetY = node.y - container.clientHeight / 2;
  if (!animate) {
    GameState.camera.x = targetX;
    GameState.camera.y = targetY;
    renderMap();
    return;
  }
  const startX = GameState.camera.x;
  const startY = GameState.camera.y;
  const duration = 500;
  const startTime = performance.now();
  function animateCamera(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    GameState.camera.x = startX + (targetX - startX) * easeProgress;
    GameState.camera.y = startY + (targetY - startY) * easeProgress;
    renderMap();
    if (progress < 1) {
      requestAnimationFrame(animateCamera);
    }
  }
  requestAnimationFrame(animateCamera);
}
let tutorialState = {
  items: [],
  currentIndex: 0,
  node: null,
  battleType: null
};
function getTutorialContent(lessonId) {
  const difficulty = getDifficulty();
  let items = [];
  const contentMap = {
    "vocabulary": typeof CULTURAL_VOCABULARY !== "undefined" ? CULTURAL_VOCABULARY : null,
    "vocabulary_animals": typeof VOCABULARY_ANIMALS !== "undefined" ? VOCABULARY_ANIMALS : null,
    "vocabulary_warfare": typeof VOCABULARY_WARFARE !== "undefined" ? VOCABULARY_WARFARE : null,
    "vocabulary_places": typeof VOCABULARY_PLACES !== "undefined" ? VOCABULARY_PLACES : null,
    "vocabulary_spiritual": typeof VOCABULARY_SPIRITUAL !== "undefined" ? VOCABULARY_SPIRITUAL : null,
    "vocabulary_advanced": typeof VOCABULARY_ADVANCED !== "undefined" ? VOCABULARY_ADVANCED : null,
    "greetings": typeof GREETINGS_CONTENT !== "undefined" ? GREETINGS_CONTENT : null,
    "numbers": typeof NUMBERS_CONTENT !== "undefined" ? NUMBERS_CONTENT : null,
    "pronouns": typeof PRONOUNS_CONTENT !== "undefined" ? PRONOUNS_CONTENT : null,
    "possession": typeof POSSESSION_CONTENT !== "undefined" ? POSSESSION_CONTENT : null,
    "negation": typeof NEGATION_CONTENT !== "undefined" ? NEGATION_CONTENT : null,
    "intransitive_verbs": typeof VERBS_CONTENT !== "undefined" ? VERBS_CONTENT : null,
    "adjectives": typeof ADJECTIVES_CONTENT !== "undefined" ? ADJECTIVES_CONTENT : null,
    "commands": typeof COMMANDS_CONTENT !== "undefined" ? COMMANDS_CONTENT : null,
    "existential": typeof EXISTENTIAL_CONTENT !== "undefined" ? EXISTENTIAL_CONTENT : null,
    "questions": typeof QUESTIONS_CONTENT !== "undefined" ? QUESTIONS_CONTENT : null
  };
  const contentSource = contentMap[lessonId] || contentMap["vocabulary"];
  if (!contentSource) {
    console.warn("No content source found for lesson:", lessonId);
    return [];
  }
  items = [...contentSource.core || []];
  if (difficulty === "warrior" || difficulty === "hero") {
    items = items.concat(contentSource.warrior || []);
  }
  if (difficulty === "hero") {
    items = items.concat(contentSource.hero || []);
  }
  return items;
}
function showTutorial(node, battleType) {
  const lessonId = node.lessonType || "vocabulary";
  const lesson = LESSONS[lessonId];
  tutorialState.items = getTutorialContent(lessonId);
  tutorialState.currentIndex = 0;
  tutorialState.node = node;
  tutorialState.battleType = battleType;
  if (DEBUG.enabled) {
    DEBUG.log("Tutorial started for:", node.name, "- Press S to skip");
  }
  document.getElementById("tutorial-icon").textContent = (lesson == null ? void 0 : lesson.icon) || "📚";
  document.getElementById("tutorial-title").textContent = `${t("learning")}: ${(lesson == null ? void 0 : lesson.englishName) || "Vocabulary"}`;
  document.getElementById("tutorial-location").textContent = node.name;
  document.getElementById("tutorial-total").textContent = tutorialState.items.length;
  renderTutorialCard();
  updateTutorialNavigation();
  showScreen("tutorial");
}
function renderTutorialCard() {
  const container = document.getElementById("tutorial-content");
  const item = tutorialState.items[tutorialState.currentIndex];
  if (!item) {
    container.innerHTML = "<p>No content available for this lesson.</p>";
    return;
  }
  const cultureHtml = item.culture ? `
        <div class="tutorial-culture">
            <div class="tutorial-culture-label">🌿 ${t("culturalContext")}</div>
            <p>${item.culture}</p>
        </div>
    ` : "";
  let extraHtml = "";
  if (item.conjugation) {
    extraHtml += `
            <div class="tutorial-extra-item">
                <span class="tutorial-extra-label">${t("conjugation")}: </span>
                <span class="tutorial-extra-value">${item.conjugation}</span>
            </div>
        `;
  }
  if (item.example) {
    extraHtml += `
            <div class="tutorial-extra-item">
                <span class="tutorial-extra-label">${t("example")}: </span>
                <span class="tutorial-extra-value">${item.example}</span>
            </div>
        `;
  }
  container.innerHTML = `
        <div class="tutorial-card">
            <div class="tutorial-card-header">
                <div class="tutorial-word-icon">${item.icon || "📝"}</div>
                <div class="tutorial-word-main">
                    <h3 class="tutorial-kiche">${item.kiche}</h3>
                    <p class="tutorial-english">${item.english}</p>
                    <p class="tutorial-spanish">${item.spanish || ""}</p>
                </div>
            </div>
            <div class="tutorial-card-body">
                ${cultureHtml}
                ${extraHtml ? `<div class="tutorial-extra">${extraHtml}</div>` : ""}
            </div>
        </div>
    `;
  document.getElementById("tutorial-current").textContent = tutorialState.currentIndex + 1;
}
function updateTutorialNavigation() {
  const prevBtn = document.getElementById("tutorial-prev");
  const nextBtn = document.getElementById("tutorial-next");
  const startBtn = document.getElementById("start-quiz");
  prevBtn.disabled = tutorialState.currentIndex === 0;
  const isLastCard = tutorialState.currentIndex >= tutorialState.items.length - 1;
  if (isLastCard) {
    nextBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    startBtn.classList.add("hidden");
  }
}
function tutorialNext() {
  if (tutorialState.currentIndex < tutorialState.items.length - 1) {
    tutorialState.currentIndex++;
    renderTutorialCard();
    updateTutorialNavigation();
  }
}
function tutorialPrev() {
  if (tutorialState.currentIndex > 0) {
    tutorialState.currentIndex--;
    renderTutorialCard();
    updateTutorialNavigation();
  }
}
function startQuizFromTutorial() {
  startBattleQuiz(tutorialState.node, tutorialState.battleType);
}
function startBattle(node, type) {
  DEBUG.log("Starting battle:", { node: node.name, type });
  DEBUG.logNode(node);
  showTutorial(node, type);
}
function startBattleQuiz(node, type) {
  const currentDifficulty = typeof getDifficulty === "function" ? getDifficulty() : "soldier";
  const questionCounts = { soldier: 5, warrior: 10, hero: 15 };
  const questionCount = questionCounts[currentDifficulty] || 5;
  DEBUG.log("Starting battle quiz:", {
    node: node.name,
    type,
    difficulty: currentDifficulty,
    questionCount,
    enemyStrength: node.spanishStrength
  });
  GameState.currentBattle = {
    node,
    type,
    // 'attack', 'defend', or 'train'
    difficulty: currentDifficulty,
    // Store the difficulty for this battle
    questionCount,
    // Store question count for this battle
    startingArmy: GameState.army,
    enemyStrength: node.spanishStrength || 0,
    startingEnemyStrength: node.spanishStrength || 0
  };
  const lessonId = node.lessonType || "vocabulary";
  const learnedWordsList = Array.from(GameState.wordsLearned).map((w) => ({ kiche: w }));
  GameState.currentQuestions = generateLessonQuestions(lessonId, questionCount, learnedWordsList);
  GameState.currentQuestionIndex = 0;
  GameState.correctAnswers = 0;
  const title = type === "train" ? `${t("trainingAt")} ${node.name}` : type === "defend" ? `${t("defenseOf")} ${node.name}` : `${t("attackOn")} ${node.name}`;
  document.getElementById("battle-title").textContent = title;
  const lesson = LESSONS[lessonId];
  if (lesson) {
    document.getElementById("lesson-badge").innerHTML = `
            <span class="lesson-icon">${lesson.icon || "📚"}</span>
            <span class="lesson-name">${lesson.englishName}</span>
        `;
  }
  const dotsContainer = document.getElementById("progress-dots");
  dotsContainer.innerHTML = "";
  for (let i = 0; i < questionCount; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dotsContainer.appendChild(dot);
  }
  document.querySelector(".round-counter").innerHTML = `<span data-i18n="round">${t("round")}</span> <span id="round-number">1</span>/${questionCount}`;
  updateBattleUI();
  showQuestion();
  showScreen("battle");
}
function updateBattleUI() {
  const battle = GameState.currentBattle;
  document.getElementById("kiche-troops").textContent = GameState.army;
  document.getElementById("spanish-troops").textContent = battle.enemyStrength;
  const kichePercent = GameState.army / battle.startingArmy * 100;
  const spanishPercent = battle.startingEnemyStrength > 0 ? battle.enemyStrength / battle.startingEnemyStrength * 100 : 100;
  document.getElementById("kiche-health-fill").style.width = `${Math.max(0, kichePercent)}%`;
  document.getElementById("spanish-health-fill").style.width = `${Math.max(0, spanishPercent)}%`;
  document.getElementById("round-number").textContent = GameState.currentQuestionIndex + 1;
  const dots = document.querySelectorAll("#progress-dots .dot");
  dots.forEach((dot, i) => {
    dot.classList.remove("correct", "incorrect", "current");
    if (i < GameState.currentQuestionIndex) {
      dot.classList.add(GameState.currentQuestions[i].wasCorrect ? "correct" : "incorrect");
    } else if (i === GameState.currentQuestionIndex) {
      dot.classList.add("current");
    }
  });
  const kicheWarriors = document.getElementById("kiche-warriors");
  const spanishForces = document.getElementById("spanish-forces");
  const kicheCount = Math.min(5, Math.ceil(GameState.army / 200));
  const spanishCount = Math.min(5, Math.ceil(battle.enemyStrength / 100));
  kicheWarriors.textContent = "🏹".repeat(kicheCount);
  spanishForces.textContent = battle.type === "train" ? "📚📚📚" : "⚔️".repeat(Math.max(1, spanishCount));
}
function showQuestion() {
  const question = GameState.currentQuestions[GameState.currentQuestionIndex];
  const instructionEl = document.getElementById("lesson-instruction");
  const promptEl = document.getElementById("word-to-translate");
  instructionEl.textContent = question.instruction || "";
  if (question.type === "conversation_respond") {
    promptEl.innerHTML = `<span class="kiche-prompt">${question.prompt}</span>
            <span class="prompt-translation">(${question.promptTranslation})</span>`;
  } else if (question.type === "phrase_select") {
    const lang = typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "en";
    promptEl.textContent = lang === "es" && question.promptEs ? question.promptEs : question.prompt;
  } else if (question.type === "recall_type" && question.promptHint) {
    promptEl.innerHTML = `<span class="recall-icon">${question.prompt}</span>
            <span class="recall-hint">${question.promptHint}</span>`;
  } else {
    promptEl.textContent = question.prompt;
  }
  const textInput = document.getElementById("answer-input");
  const choicesContainer = document.getElementById("choices-container");
  const feedback = document.getElementById("feedback");
  feedback.classList.add("hidden");
  feedback.classList.remove("correct", "incorrect");
  const isTypingQuestion = question.isTypingQuestion || question.type === "translate_to_kiche" || question.type === "translate_from_kiche" || question.type === "recall_type";
  const isMultipleChoice = !isTypingQuestion && (question.type === "multiple_choice" || question.type === "icon_select" || question.type === "icon_text_select" || question.type === "phrase_select" || question.type === "conversation_respond" || question.choices);
  const isIconQuestion = question.isIconQuestion || question.type === "icon_select";
  const isIconTextQuestion = question.isIconTextQuestion || question.type === "icon_text_select";
  const isPhraseQuestion = question.type === "phrase_select" || question.type === "conversation_respond";
  if (isMultipleChoice) {
    textInput.classList.add("hidden");
    choicesContainer.classList.remove("hidden");
    choicesContainer.classList.toggle("icon-choices", isIconQuestion);
    choicesContainer.classList.toggle("icon-text-choices", isIconTextQuestion);
    choicesContainer.classList.toggle("phrase-choices", isPhraseQuestion);
    const buttons = choicesContainer.querySelectorAll(".choice-btn");
    buttons.forEach((btn, i) => {
      if (question.choices && question.choices[i]) {
        btn.textContent = question.choices[i];
        btn.style.display = "";
        btn.classList.toggle("phrase-btn", isPhraseQuestion);
      } else {
        btn.style.display = "none";
      }
      btn.classList.remove("correct", "incorrect");
      btn.disabled = false;
      btn.onclick = () => selectChoice(btn, question.choices[i]);
    });
  } else {
    textInput.classList.remove("hidden");
    choicesContainer.classList.add("hidden");
    choicesContainer.classList.remove("icon-choices", "icon-text-choices", "phrase-choices");
    textInput.value = "";
    textInput.placeholder = question.type === "recall_type" ? t("typeKicheWord") || "Type the K'iche' word..." : t("typeAnswer") || "Type your answer...";
    textInput.focus();
  }
  const submitBtn = document.getElementById("submit-answer");
  if (isMultipleChoice) {
    submitBtn.classList.add("hidden");
  } else {
    submitBtn.classList.remove("hidden");
  }
  document.getElementById("next-question").classList.add("hidden");
}
function selectChoice(button, answer) {
  const question = GameState.currentQuestions[GameState.currentQuestionIndex];
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === question.correctAnswer) {
      btn.classList.add("correct");
    }
  });
  const isCorrect = answer === question.correctAnswer;
  question.wasCorrect = isCorrect;
  if (isCorrect) {
    GameState.correctAnswers++;
    if (question.word && question.word.kiche) {
      GameState.wordsLearned.add(question.word.kiche.toLowerCase());
    }
  } else {
    button.classList.add("incorrect");
  }
  showFeedback(isCorrect, question);
}
function submitAnswer() {
  const question = GameState.currentQuestions[GameState.currentQuestionIndex];
  if (question.type === "multiple_choice") {
    return;
  }
  const userAnswer = document.getElementById("answer-input").value;
  if (!userAnswer.trim()) return;
  const isCorrect = checkLessonAnswer(userAnswer, question);
  question.wasCorrect = isCorrect;
  if (isCorrect) {
    GameState.correctAnswers++;
    if (question.word && question.word.kiche) {
      GameState.wordsLearned.add(question.word.kiche.toLowerCase());
    }
  }
  showFeedback(isCorrect, question);
}
function showFeedback(isCorrect, question) {
  var _a;
  const feedback = document.getElementById("feedback");
  feedback.classList.remove("hidden", "correct", "incorrect");
  feedback.classList.add(isCorrect ? "correct" : "incorrect");
  const battle = GameState.currentBattle;
  let feedbackMessage;
  if (battle.type === "train") {
    feedbackMessage = isCorrect ? `✓ ${t("correctTrain")}` : `✗ ${t("incorrectTrain")}`;
  } else {
    feedbackMessage = isCorrect ? `✓ ${t("correctBattle")}` : `✗ ${t("incorrectBattle")}`;
  }
  document.getElementById("feedback-text").textContent = feedbackMessage;
  const correctAnswerEl = document.getElementById("correct-answer");
  if (isCorrect) {
    if (question.type === "conversation_respond" && question.responseTranslation) {
      correctAnswerEl.innerHTML = `<span class="response-meaning">"${question.correctAnswer}" = "${question.responseTranslation}"</span>`;
    } else {
      correctAnswerEl.textContent = "";
    }
  } else {
    if (question.type === "conversation_respond" && question.responseTranslation) {
      correctAnswerEl.innerHTML = `${t("correctAnswerWas")} <strong>${question.correctAnswer}</strong><br><span class="response-meaning">(${question.responseTranslation})</span>`;
    } else {
      correctAnswerEl.textContent = `${t("correctAnswerWas")} ${question.correctAnswer}`;
    }
  }
  const explanationEl = document.getElementById("feedback-explanation");
  if (question.culture) {
    explanationEl.innerHTML = `<div class="cultural-note"><span class="cultural-note-label">${t("culturalNote")}</span>${question.culture}</div>`;
  } else if (question.explanation) {
    explanationEl.textContent = question.explanation;
  } else {
    explanationEl.textContent = "";
  }
  if (battle.type !== "train") {
    if (isCorrect) {
      const damagePercent = 0.25;
      const damage = Math.max(10, Math.floor(battle.enemyStrength * damagePercent));
      battle.enemyStrength = Math.max(0, battle.enemyStrength - damage);
      DEBUG.log(`Dealt ${damage} damage to enemies. Remaining: ${battle.enemyStrength}`);
    } else {
      GameState.army = Math.max(100, GameState.army - Math.floor(GameState.army * 0.08));
    }
  }
  updateBattleUI();
  document.getElementById("submit-answer").classList.add("hidden");
  document.getElementById("next-question").classList.remove("hidden");
  const totalQuestions = ((_a = GameState.currentBattle) == null ? void 0 : _a.questionCount) || GameState.currentQuestions.length;
  const isLastQuestion = GameState.currentQuestionIndex >= totalQuestions - 1;
  document.getElementById("next-question").textContent = isLastQuestion ? "See Results" : "Next Challenge";
}
function nextQuestion() {
  GameState.currentQuestionIndex++;
  if (GameState.currentQuestionIndex >= GameState.currentQuestions.length) {
    endBattle();
  } else {
    showQuestion();
  }
}
function endBattle() {
  var _a;
  const battle = GameState.currentBattle;
  const node = battle.node;
  const totalQuestions = battle.questionCount || GameState.currentQuestions.length || 5;
  const correctRatio = GameState.correctAnswers / totalQuestions;
  const difficulty = battle.difficulty || "soldier";
  DEBUG.log("Battle ended:", {
    node: node.name,
    type: battle.type,
    difficulty,
    correctAnswers: GameState.correctAnswers,
    totalQuestions,
    correctRatio: (correctRatio * 100).toFixed(1) + "%",
    remainingEnemies: battle.enemyStrength,
    startingEnemies: battle.startingEnemyStrength
  });
  let result = {
    title: "",
    message: "",
    icon: "",
    territoryChange: "",
    armyChange: 0
  };
  if (correctRatio >= 0.6) {
    if (!GameState.completedLessons[node.id]) {
      GameState.completedLessons[node.id] = {};
    }
    GameState.completedLessons[node.id][difficulty] = true;
  }
  if (battle.type === "train") {
    result.title = t("trainingComplete");
    result.icon = "📚";
    result.message = `${t("studiedLesson")} ${((_a = LESSONS[node.lessonType]) == null ? void 0 : _a.englishName) || "K'iche'"}.`;
    if (correctRatio >= 0.6) {
      result.message += ` (${t(difficulty)} ${t("level")} ✓)`;
    }
    result.territoryChange = t("na");
    result.armyChange = Math.floor(correctRatio * 30);
    GameState.army += result.armyChange;
    GameState.morale = Math.min(100, GameState.morale + Math.floor(correctRatio * 5));
  } else if (correctRatio >= 0.8) {
    result.title = t("victory");
    result.icon = "🏆";
    GameState.battlesWon++;
    node.status = "kiche";
    node.spanishStrength = 0;
    result.message = `${t("masteryInspires")} ${node.name} ${t("liberated")}`;
    result.territoryChange = t("captured");
    result.armyChange = 50;
    GameState.army += result.armyChange;
    GameState.morale = Math.min(100, GameState.morale + 10);
  } else if (correctRatio >= 0.6) {
    result.icon = "⚔️";
    GameState.battlesWon++;
    const remainingEnemies = battle.enemyStrength;
    if (remainingEnemies <= 0 || remainingEnemies < battle.startingEnemyStrength * 0.2) {
      result.title = t("hardFoughtVictory");
      node.status = "kiche";
      node.spanishStrength = 0;
      result.message = `${node.name} ${t("liberated")}`;
      result.territoryChange = t("captured");
    } else {
      result.title = t("pushedBack");
      node.status = "contested";
      node.spanishStrength = remainingEnemies;
      result.message = `${t("enemiesWeakened")} ${node.name}. ${remainingEnemies} ${t("soldiersRemain")}`;
      result.territoryChange = t("contested");
    }
    result.armyChange = -30;
    GameState.army = Math.max(100, GameState.army + result.armyChange);
  } else if (correctRatio >= 0.4) {
    result.title = t("stalemate");
    result.icon = "🛡️";
    node.status = "contested";
    node.spanishStrength = Math.max(battle.enemyStrength, Math.floor(battle.startingEnemyStrength * 0.3));
    result.message = `${t("neitherGains")} ${node.name}. ${t("struggleContinues")}`;
    result.territoryChange = t("contested");
    result.armyChange = -60;
    GameState.army = Math.max(100, GameState.army + result.armyChange);
    GameState.morale = Math.max(20, GameState.morale - 5);
  } else {
    result.title = t("defeat");
    result.icon = "💀";
    GameState.battlesLost++;
    node.status = "spanish";
    node.spanishStrength = Math.max(battle.enemyStrength, Math.floor(battle.startingEnemyStrength * 0.6));
    result.message = `${t("attackFails")} ${node.name}.`;
    result.territoryChange = t("lost");
    result.armyChange = -100;
    GameState.army = Math.max(100, GameState.army + result.armyChange);
    GameState.morale = Math.max(10, GameState.morale - 15);
    retreatToSafeNode();
  }
  GameState.mastery = Math.min(100, Math.floor(GameState.wordsLearned.size / 80 * 100));
  const titleEl = document.getElementById("result-title");
  titleEl.textContent = result.title;
  titleEl.className = correctRatio >= 0.6 ? "victory" : correctRatio >= 0.4 ? "draw" : "defeat";
  document.getElementById("result-icon").textContent = result.icon;
  document.getElementById("result-message").textContent = result.message;
  document.getElementById("correct-count").textContent = `${GameState.correctAnswers}/${totalQuestions}`;
  document.getElementById("territory-result").textContent = result.territoryChange;
  document.getElementById("army-change").textContent = result.armyChange >= 0 ? `+${result.armyChange}` : result.armyChange;
  document.getElementById("words-learned").textContent = GameState.wordsLearned.size;
  autoSave();
  showScreen("result");
}
function retreatToSafeNode() {
  const currentPos = GameState.armyPosition;
  const adjacentIds = GameState.edges.filter((e) => e.from === currentPos || e.to === currentPos).map((e) => e.from === currentPos ? e.to : e.from);
  for (const adjId of adjacentIds) {
    const node = GameState.nodes.find((n) => n.id === adjId);
    if (node && node.status === "kiche") {
      GameState.armyPosition = adjId;
      return;
    }
  }
  GameState.armyPosition = "qumarkaj";
}
function advanceTurn() {
  GameState.turn++;
  GameState.month++;
  if (GameState.month > 12) {
    GameState.month = 1;
    GameState.year++;
  }
  spanishTurn();
  if (checkGameOver()) return;
  autoSave();
  updateStats();
  renderMap();
}
function spanishTurn() {
  const spanishNodes = GameState.nodes.filter((n) => n.status === "spanish");
  if (spanishNodes.length > 0) {
    const vulnerableNodes = GameState.nodes.filter((n) => {
      if (n.status !== "kiche" || n.isCapital) return false;
      if (!GameState.revealedNodes.has(n.id)) return false;
      const adjacentIds = GameState.edges.filter((e) => e.from === n.id || e.to === n.id).map((e) => e.from === n.id ? e.to : e.from);
      return adjacentIds.some((adjId) => {
        const adjNode = GameState.nodes.find((nd) => nd.id === adjId);
        return adjNode && adjNode.status === "spanish";
      });
    });
    if (vulnerableNodes.length > 0 && Math.random() < 0.15) {
      const targetNode = vulnerableNodes[Math.floor(Math.random() * vulnerableNodes.length)];
      targetNode.status = "contested";
      targetNode.spanishStrength = 100 + Math.floor(Math.random() * 100);
      showAttackAlert(targetNode);
    }
  }
  GameState.nodes.filter((n) => n.status === "contested").forEach((n) => {
    const adjacentIds = GameState.edges.filter((e) => e.from === n.id || e.to === n.id).map((e) => e.from === n.id ? e.to : e.from);
    const hasSpanishSupply = adjacentIds.some((adjId) => {
      const adjNode = GameState.nodes.find((nd) => nd.id === adjId);
      return adjNode && adjNode.status === "spanish";
    });
    if (hasSpanishSupply) {
      n.spanishStrength = Math.min(300, n.spanishStrength + 10);
    }
  });
  GameState.nodes.filter((n) => n.status === "spanish").forEach((n) => {
    n.spanishStrength = Math.min(350, (n.spanishStrength || 200) + 5);
  });
}
function showAttackAlert(node) {
  GameState.activeAttack = node;
  const alert = document.getElementById("attack-alert");
  alert.classList.remove("hidden");
  document.getElementById("alert-message").textContent = `${t("spanishAttacking")} ${node.name}! ${t("peopleNeedHelp")}`;
  document.getElementById("btn-rush-defend").onclick = () => {
    alert.classList.add("hidden");
    GameState.armyPosition = node.id;
    revealAdjacentNodes(node.id);
    renderMap();
    updateArmyMarker();
    startBattle(node, "defend");
  };
  document.getElementById("btn-ignore-attack").onclick = () => {
    alert.classList.add("hidden");
    node.status = "spanish";
    node.spanishStrength = 250;
    GameState.morale = Math.max(10, GameState.morale - 10);
    renderMap();
  };
}
function continueCampaign() {
  advanceTurn();
  if (checkGameOver()) return;
  deselectNode();
  updateStats();
  renderMap();
  showScreen("map");
}
function checkGameOver() {
  const capital = GameState.nodes.find((n) => n.isCapital);
  const finalBoss = GameState.nodes.find((n) => n.id === "antigua");
  if (finalBoss && finalBoss.status === "kiche") {
    showGameOver(true);
    return true;
  }
  if (capital && capital.status !== "kiche") {
    showGameOver(false);
    return true;
  }
  if (GameState.army <= 0) {
    showGameOver(false);
    return true;
  }
  return false;
}
function showGameOver(victory) {
  const titleEl = document.getElementById("gameover-title");
  const messageEl = document.getElementById("gameover-message");
  if (victory) {
    titleEl.textContent = t("victoryTitle");
    titleEl.className = "victory";
    messageEl.textContent = t("victoryMessage");
  } else {
    titleEl.textContent = t("defeatTitle");
    titleEl.className = "defeat";
    messageEl.textContent = t("defeatMessage");
  }
  deleteSave();
  document.getElementById("final-turns").textContent = GameState.turn;
  document.getElementById("final-words").textContent = GameState.wordsLearned.size;
  document.getElementById("final-battles").textContent = GameState.battlesWon;
  showScreen("gameover");
}
function showScreen(screenName) {
  const screens = {
    title: document.getElementById("title-screen"),
    map: document.getElementById("map-screen"),
    tutorial: document.getElementById("tutorial-screen"),
    battle: document.getElementById("battle-screen"),
    result: document.getElementById("result-screen"),
    gameover: document.getElementById("gameover-screen")
  };
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
  if (screenName === "map") {
    requestAnimationFrame(() => {
      resizeCanvas();
    });
  }
}
function updateStats() {
  document.getElementById("army-count").textContent = GameState.army;
  document.getElementById("morale").textContent = `${GameState.morale}%`;
  document.getElementById("mastery").textContent = `${GameState.mastery}%`;
  document.getElementById("turn-number").textContent = GameState.turn;
  document.getElementById("year").textContent = GameState.year;
}
function startGame() {
  DEBUG.log("startGame called");
  GameState.army = 1e3;
  GameState.morale = 100;
  GameState.mastery = 0;
  GameState.wordsLearned = /* @__PURE__ */ new Set();
  GameState.battlesWon = 0;
  GameState.battlesLost = 0;
  GameState.turn = 1;
  GameState.year = 1524;
  GameState.month = 2;
  GameState.camera = { x: 0, y: 0 };
  GameState.selectedNode = null;
  GameState.activeAttack = null;
  GameState.completedLessons = {};
  const { nodes, edges } = generateMap();
  GameState.nodes = nodes;
  GameState.edges = edges;
  if (DEBUG.enabled) {
    GameState.revealedNodes = new Set(nodes.map((n) => n.id));
    DEBUG.log("All nodes revealed:", GameState.revealedNodes.size, "nodes");
  } else {
    GameState.revealedNodes = /* @__PURE__ */ new Set(["qumarkaj"]);
    revealAdjacentNodes("qumarkaj");
  }
  GameState.armyPosition = "qumarkaj";
  autoSave();
  showScreen("map");
  const startNode = nodes.find((n) => n.id === "qumarkaj");
  updateStats();
  if (startNode) {
    requestAnimationFrame(() => {
      resizeCanvas();
      centerCameraOnNode(startNode, false);
    });
  } else {
    renderMap();
  }
}
function restartGame() {
  checkForSavedGame();
  showScreen("title");
}
function setupEventListeners() {
  const startBtn = document.getElementById("start-game");
  if (startBtn) {
    startBtn.addEventListener("click", startGame);
  }
  document.getElementById("campaign-map").addEventListener("click", handleMapClick);
  document.getElementById("close-panel").addEventListener("click", deselectNode);
  document.getElementById("submit-answer").addEventListener("click", submitAnswer);
  document.getElementById("next-question").addEventListener("click", nextQuestion);
  document.getElementById("answer-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") submitAnswer();
  });
  document.getElementById("tutorial-prev").addEventListener("click", tutorialPrev);
  document.getElementById("tutorial-next").addEventListener("click", tutorialNext);
  document.getElementById("start-quiz").addEventListener("click", startQuizFromTutorial);
  document.getElementById("continue-campaign").addEventListener("click", continueCampaign);
  document.getElementById("restart-game").addEventListener("click", restartGame);
  document.getElementById("save-quit").addEventListener("click", saveAndQuit);
  document.getElementById("continue-game").addEventListener("click", loadGame);
}
const SAVE_KEY = "tecunuman_save";
function autoSave() {
  try {
    saveGame();
    DEBUG.log("Game auto-saved");
  } catch (e) {
    DEBUG.log("Auto-save failed:", e);
  }
}
function saveGame() {
  const saveData = {
    // Player resources
    army: GameState.army,
    morale: GameState.morale,
    mastery: GameState.mastery,
    wordsLearned: Array.from(GameState.wordsLearned),
    battlesWon: GameState.battlesWon,
    battlesLost: GameState.battlesLost,
    // Campaign progress
    turn: GameState.turn,
    year: GameState.year,
    month: GameState.month,
    // Army position
    armyPosition: GameState.armyPosition,
    // Map state - save node statuses
    nodeStatuses: GameState.nodes.map((n) => ({
      id: n.id,
      status: n.status,
      spanishStrength: n.spanishStrength
    })),
    // Revealed nodes
    revealedNodes: Array.from(GameState.revealedNodes),
    // Completed lessons
    completedLessons: GameState.completedLessons,
    // Camera position
    camera: GameState.camera,
    // Save timestamp
    savedAt: Date.now()
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return true;
  } catch (e) {
    console.error("Failed to save game:", e);
    return false;
  }
}
function loadGame() {
  try {
    const saveDataStr = localStorage.getItem(SAVE_KEY);
    if (!saveDataStr) return false;
    const saveData = JSON.parse(saveDataStr);
    const { nodes, edges } = generateMap();
    GameState.nodes = nodes;
    GameState.edges = edges;
    GameState.army = saveData.army;
    GameState.morale = saveData.morale;
    GameState.mastery = saveData.mastery;
    GameState.wordsLearned = new Set(saveData.wordsLearned);
    GameState.battlesWon = saveData.battlesWon;
    GameState.battlesLost = saveData.battlesLost;
    GameState.turn = saveData.turn;
    GameState.year = saveData.year;
    GameState.month = saveData.month;
    GameState.armyPosition = saveData.armyPosition;
    if (saveData.nodeStatuses) {
      for (const savedNode of saveData.nodeStatuses) {
        const node = GameState.nodes.find((n) => n.id === savedNode.id);
        if (node) {
          node.status = savedNode.status;
          node.spanishStrength = savedNode.spanishStrength;
        }
      }
    }
    GameState.revealedNodes = new Set(saveData.revealedNodes);
    GameState.completedLessons = saveData.completedLessons || {};
    if (saveData.camera) {
      GameState.camera = saveData.camera;
    }
    GameState.selectedNode = null;
    GameState.activeAttack = null;
    GameState.currentBattle = null;
    updateStats();
    showScreen("map");
    requestAnimationFrame(() => {
      resizeCanvas();
    });
    return true;
  } catch (e) {
    console.error("Failed to load game:", e);
    return false;
  }
}
function hasSavedGame() {
  try {
    const saveData = localStorage.getItem(SAVE_KEY);
    return saveData !== null;
  } catch (e) {
    return false;
  }
}
function deleteSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {
    console.error("Failed to delete save:", e);
  }
}
function saveAndQuit() {
  if (saveGame()) {
    showScreen("title");
    checkForSavedGame();
  }
}
function checkForSavedGame() {
  const continueBtn = document.getElementById("continue-game");
  const hasSave = hasSavedGame();
  DEBUG.log("Checking for saved game:", hasSave);
  if (hasSave) {
    continueBtn.classList.remove("hidden");
  } else {
    continueBtn.classList.add("hidden");
  }
}
function initializeGame() {
  initI18n();
  initCanvas();
  setupEventListeners();
  checkForSavedGame();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame);
} else {
  initializeGame();
}
