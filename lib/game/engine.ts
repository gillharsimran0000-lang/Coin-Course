// Money Defense - 2D tower-defense engine (HTML5 Canvas)
// Bloons-style: threats follow a winding path to your vault; plant defenses on the grass to stop them.

// ── Types ────────────────────────────────────────────────────────────────
export type Difficulty = "easy" | "normal" | "hard"
export type GameMode = "story" | "endless"
export type TowerType =
  | "emergencyFund" | "budgetPlan" | "insurance" | "investment" | "incomeBoost"
  | "frugalFrog" | "creditCat" | "compoundCrab"
export type GameState = "menu" | "prep" | "wave" | "quiz" | "won" | "lost"

export interface TowerDef {
  type: TowerType
  name: string
  concept: string
  cost: number
  color: string
  range: number
  blurb: string
  tip: string
}

export interface QuizQuestion {
  q: string
  opts: string[]
  reward: number
  concept: string
}

export interface Snapshot {
  state: GameState
  money: number
  lives: number
  wave: number
  score: number
  best: number
  prepTime: number
  selectedTower: TowerType | null
  inspected: { name: string; type: TowerType; refund: number } | null
  difficulty: Difficulty
  mode: GameMode
  story: { chapter: number; title: string; text: string } | null
  storyWaves: number
  message: string
  threatsLeft: number
  waveSize: number
  fast: boolean
  pendingQuestion: QuizQuestion | null
}

// ── Tower catalogue ──────────────────────────────────────────────────────
export const TOWERS: Record<TowerType, TowerDef> = {
  emergencyFund: {
    type: "emergencyFund", name: "Piggy Bank Pal", concept: "Emergency Fund", cost: 100, color: "#ff9ec7", range: 150,
    blurb: "Steady saver. Fires coins at the nearest threat.",
    tip: "An emergency fund (3–6 months of expenses) keeps small surprises from becoming debt.",
  },
  budgetPlan: {
    type: "budgetPlan", name: "Budget Beaver", concept: "Budget Plan", cost: 75, color: "#6e9bff", range: 135,
    blurb: "Slows every threat inside its range by 50%.",
    tip: "A budget controls spending before it controls you. It buys you time.",
  },
  insurance: {
    type: "insurance", name: "Insurance Turtle", concept: "Insurance", cost: 150, color: "#50d8c4", range: 205,
    blurb: "Long range, heavy damage. Great against big emergencies.",
    tip: "Insurance protects you from rare but huge expenses you couldn't otherwise absorb.",
  },
  investment: {
    type: "investment", name: "Investing Iguana", concept: "Investment", cost: 200, color: "#6dd497", range: 165,
    blurb: "Solid damage and pays you +$50 for every threat it defeats.",
    tip: "Investing makes your money grow over time through compounding.",
  },
  incomeBoost: {
    type: "incomeBoost", name: "Hustle Hen", concept: "Passive Income", cost: 120, color: "#ffce3a", range: 0,
    blurb: "Lays a golden egg: +$10 every second. Does not attack.",
    tip: "Active and passive income give you more to save, spend, and invest.",
  },
  frugalFrog: {
    type: "frugalFrog", name: "Frugal Frog", concept: "Smart Spending", cost: 175, color: "#8fd44d", range: 130,
    blurb: "Tongue-slap splash damage that hits every threat near the target. Great against swarms.",
    tip: "Smart spending: small savings on every purchase add up across everything you buy.",
  },
  creditCat: {
    type: "creditCat", name: "Credit Score Cat", concept: "Credit Score", cost: 250, color: "#c9a2ff", range: 320,
    blurb: "Sniper. Huge range and heavy single-target damage.",
    tip: "A good credit score reaches far. It unlocks better rates on everything you borrow.",
  },
  compoundCrab: {
    type: "compoundCrab", name: "Compound Crab", concept: "Compounding", cost: 225, color: "#ff6f61", range: 150,
    blurb: "Damage keeps growing the longer it stays placed. Patience pays.",
    tip: "Compound interest: gains earn gains. The earlier you start, the stronger it gets.",
  },
}

const SELL_RATIO = 0.7

// ── Threats ──────────────────────────────────────────────────────────────
type ThreatType =
  | "overspending" | "creditcard" | "emergency" | "badinvestment" | "unexpected" | "gambling"
  | "impulse" | "subscription" | "loanshark" | "inflation"

interface ThreatDef {
  type: ThreatType
  name: string
  concept: string
  damage: number
  hp: number
  speed: number
  color: string
  radius: number
}

const THREATS: Record<ThreatType, ThreatDef> = {
  overspending:  { type: "overspending",  name: "Shopaholic Squirrel", concept: "Overspending",      damage: 50,  hp: 34, speed: 58,  color: "#ff7a4d", radius: 21 },
  unexpected:    { type: "unexpected",    name: "Sting Bee",           concept: "Unexpected Cost",   damage: 75,  hp: 40, speed: 78,  color: "#ffb84d", radius: 21 },
  creditcard:    { type: "creditcard",    name: "Debt Bat",            concept: "Credit Card Debt",  damage: 100, hp: 58, speed: 74,  color: "#ff5c5c", radius: 23 },
  badinvestment: { type: "badinvestment", name: "Scam Rat",            concept: "Bad Investment",    damage: 150, hp: 46, speed: 104, color: "#ff924d", radius: 21 },
  emergency:     { type: "emergency",     name: "Emergency Elephant",  concept: "Emergency Expense", damage: 200, hp: 100, speed: 52, color: "#ff4d6d", radius: 26 },
  gambling:      { type: "gambling",      name: "Gamble Goblin",       concept: "Gambling",          damage: 250, hp: 78, speed: 132, color: "#d14dff", radius: 23 },
  impulse:       { type: "impulse",       name: "Impulse Imp",         concept: "Impulse Buying",    damage: 40,  hp: 16, speed: 150, color: "#ff5cd0", radius: 15 },
  subscription:  { type: "subscription",  name: "Subscription Snake",  concept: "Forgotten Subscriptions", damage: 120, hp: 55, speed: 62, color: "#9ad84a", radius: 22 },
  loanshark:     { type: "loanshark",     name: "Loan Shark",          concept: "Payday Loans",      damage: 220, hp: 130, speed: 68, color: "#5c9eff", radius: 25 },
  inflation:     { type: "inflation",     name: "Inflation Dragon",    concept: "Inflation",         damage: 999, hp: 850, speed: 34, color: "#e03a3a", radius: 34 },
}

// ── Quiz question bank ───────────────────────────────────────────────────
interface QuestionData { q: string; opts: string[]; correct: number; concept: string }

const QUESTIONS: QuestionData[] = [
  { q: "Why is it smart to keep some money saved for surprises?", opts: ["So you can spend it all on candy", "So a surprise (like a broken bike) doesn't wipe you out", "Because saving is against the rules", "So your money can hide from you"], correct: 1, concept: "Emergency Fund" },
  { q: "A budget is basically:", opts: ["A way to earn more allowance", "A plan for where your money goes", "A machine that prints money", "A rule that says you can never buy toys"], correct: 1, concept: "Budgeting" },
  { q: "You save $10 and the bank pays you a little extra. Next year you earn extra on the extra! This is called:", opts: ["Paying a fee", "Compound interest, where your money grows on its own", "A bank mistake", "Inflation"], correct: 1, concept: "Compounding" },
  { q: "A good credit score (a grown-up 'trust score' for borrowing) helps you:", opts: ["Get free groceries", "Borrow money at a cheaper price", "Skip school", "Spend as much as you want forever"], correct: 1, concept: "Credit Score" },
  { q: "Instead of betting all your money on ONE thing, you spread it across many. Why?", opts: ["It looks cooler", "If one thing fails, you don't lose everything", "Stores give you discounts", "It makes counting easier"], correct: 1, concept: "Investing" },
  { q: "Money that keeps coming in without you working every minute (like a lemonade machine) is called:", opts: ["Active income", "Passive income", "A loan", "A tax"], correct: 1, concept: "Passive Income" },
  { q: "If you borrow money and only pay back a tiny bit each month, what happens?", opts: ["The debt disappears", "You end up paying back way MORE than you borrowed", "The bank pays you", "Nothing at all"], correct: 1, concept: "Credit Card Debt" },
  { q: "Insurance is like:", opts: ["A piggy bank", "A shield you pay a little for, so one big disaster doesn't cost you everything", "A way to get free stuff", "A type of candy"], correct: 1, concept: "Insurance" },
  { q: "'Pay yourself first' means:", opts: ["Buy yourself a treat before anything else", "Put some money into savings BEFORE you spend any of it", "Pay your friends back last", "Keep all your money in your pocket"], correct: 1, concept: "Saving" },
  { q: "A 'payday loan' shop offers quick cash but charges HUGE fees. That deal is:", opts: ["Awesome, free money!", "A trap that costs way more than it gives", "A government program", "A secret bank bonus"], correct: 1, concept: "Payday Loans" },
  { q: "Inflation means:", opts: ["Your allowance grows every year", "Balloons getting bigger", "Prices slowly go up, so the same money buys less stuff", "Banks giving away money"], correct: 2, concept: "Inflation" },
  { q: "If you want your money to grow the most over many years, history says the best pick is usually:", opts: ["Cash under your mattress", "A regular piggy bank", "Investing in lots of companies (an index fund)", "Buying more snacks"], correct: 2, concept: "Investing" },
  { q: "A simple money plan splits your money into:", opts: ["Candy, toys, and games", "Things you NEED, things you WANT, and savings", "Coins, bills, and cards", "Morning, noon, and night money"], correct: 1, concept: "Budgeting" },
  { q: "You see a toy and buy it INSTANTLY without thinking. That's called:", opts: ["A smart planned purchase", "An impulse buy", "A subscription", "An investment"], correct: 1, concept: "Smart Spending" },
  { q: "You pay every month for an app you never use anymore. What's the smart move?", opts: ["Keep paying forever", "Cancel it and keep your money", "Pay double just in case", "Forget about it"], correct: 1, concept: "Forgotten Subscriptions" },
  { q: "The 'Rule of 72' is a trick to figure out:", opts: ["How long until your saved money DOUBLES", "How many toys you can buy", "Your grade on a test", "How old your bank is"], correct: 0, concept: "Compounding" },
  { q: "To know how rich you really are, count what you OWN and subtract what you OWE. That number is your:", opts: ["Allowance", "Net worth", "Credit score", "Bank fee"], correct: 1, concept: "Personal Finance" },
  { q: "The BEST way to build trust with banks over time is:", opts: ["Closing all your accounts", "Borrowing as much as possible", "Paying what you owe on time, every time", "Asking lots of banks for money at once"], correct: 2, concept: "Credit Score" },
  { q: "Putting the same amount into your investments every month, no matter what, is:", opts: ["Gambling", "Dollar-cost averaging, slow and steady", "Cheating", "Impossible"], correct: 1, concept: "Investing" },
  { q: "If you spend MORE money than you have in your bank account, the bank:", opts: ["Gives you a prize", "Charges you an extra fee (an overdraft fee)", "Says nothing", "Doubles your money"], correct: 1, concept: "Banking" },
  { q: "You get $20 for your birthday. What's the money-smart split?", opts: ["Spend all $20 today", "Save some, spend some", "Hide it and forget where", "Give it to a stranger who promises to double it"], correct: 1, concept: "Saving" },
  { q: "A stranger online says 'send me $10 and I'll send back $100!' This is:", opts: ["A great investment", "A scam. Real investing never promises free money", "How banks work", "A government program"], correct: 1, concept: "Scams" },
  { q: "Which one is a NEED (not a want)?", opts: ["A new video game", "Food and a place to live", "Extra sparkly shoes", "A bigger TV"], correct: 1, concept: "Needs vs. Wants" },
  { q: "Saving a little bit EVERY week beats saving a lot once in a while because:", opts: ["Small amounts add up and it becomes a habit", "Banks only accept small coins", "It doesn't. Saving once is better", "Big saving is illegal"], correct: 0, concept: "Saving" },
]

// ── Story mode ───────────────────────────────────────────────────────────
export const STORY_WAVES = 10

const STORY: { title: string; text: string }[] = [
  { title: "Welcome to Coinville", text: "The town of Coinville keeps all its savings in the Great Vault, and word just got out. A Shopaholic Squirrel is sneaking down the path to nibble at it! Recruit your first defenders and protect the vault." },
  { title: "The Buzzing Bill", text: "Uh oh, Sting Bees! They're surprise costs that show up when you least expect them, like a flat bike tire. The town elder whispers: 'A little saved up front stops a lot of trouble later.'" },
  { title: "Bats in the Vault", text: "Debt Bats have woken up! Every bite they take grows bigger over time. That's how debt works. Stop them early, before a small bite becomes a big one." },
  { title: "The Rat with a Plan", text: "A slick Scam Rat is going door to door promising to double everyone's coins. Coinville's kids know better: if it sounds too good to be true, it is. Don't let him reach the vault!" },
  { title: "Here Comes the Dragon", text: "The ground is rumbling… the Inflation Dragon is coming! It slowly makes everything in Coinville cost more. It's big and tough, so layer your defenders and work together!" },
  { title: "The Sneaky Snake", text: "A Subscription Snake slithered into town. It quietly charges everyone a little bit every month, and it heals itself if you don't finish the job! Cancel it for good." },
  { title: "Imp Invasion", text: "A swarm of Impulse Imps! Each one is tiny ('it's just a little buy!') but a whole swarm can empty a vault fast. Splash defenders like Frugal Frog love this fight." },
  { title: "Shark in the Water", text: "The Loan Shark rolled into Coinville offering 'easy money, pay me back whenever!' But his prices are enormous. He's tough, so you'll need your strongest defenders." },
  { title: "The Goblin's Game", text: "The Gamble Goblin is fast and promises everyone they'll 'win it all back next time.' Coinville knows the truth: the goblin always wins in the end. Don't bet the vault. Defend it!" },
  { title: "The Final Stand", text: "Everything you've built comes down to this. The Inflation Dragon is back with every menace in the land behind it. Trust your defenders (savings, budget, insurance, and investments) and save Coinville!" },
]

// ── Difficulty config ────────────────────────────────────────────────────
interface DiffCfg {
  money: number
  speedMul: number
  pool: (wave: number) => ThreatType[]
}

const DIFFS: Record<Difficulty, DiffCfg> = {
  easy: {
    money: 1000, speedMul: 0.8,
    pool: (w) => {
      const p: ThreatType[] = ["overspending", "unexpected"]
      if (w >= 2) p.push("creditcard")
      if (w >= 3) p.push("badinvestment", "impulse")
      if (w >= 4) p.push("emergency")
      if (w >= 5) p.push("subscription")
      if (w >= 7) p.push("loanshark")
      if (w >= 9) p.push("gambling")
      return p
    },
  },
  normal: {
    money: 1000, speedMul: 1.0,
    pool: (w) => {
      const p: ThreatType[] = ["overspending", "unexpected"]
      if (w >= 2) p.push("creditcard", "impulse")
      if (w >= 3) p.push("badinvestment")
      if (w >= 4) p.push("emergency", "subscription")
      if (w >= 6) p.push("loanshark")
      if (w >= 8) p.push("gambling")
      return p
    },
  },
  hard: {
    money: 1000, speedMul: 1.2,
    pool: (w) => {
      const p: ThreatType[] = ["overspending", "unexpected", "creditcard", "impulse"]
      if (w >= 2) p.push("badinvestment")
      if (w >= 3) p.push("emergency", "subscription")
      if (w >= 4) p.push("loanshark")
      if (w >= 6) p.push("gambling")
      return p
    },
  },
}

// ── Virtual world + path ─────────────────────────────────────────────────
const VW = 1280
const VH = 720
const PATH_W = 62

// winding path waypoints (virtual coords). Starts off the left edge, ends at the vault on the right.
const WAYPOINTS: { x: number; y: number }[] = [
  { x: -60, y: 150 },
  { x: 250, y: 150 },
  { x: 250, y: 330 },
  { x: 95, y: 330 },
  { x: 95, y: 545 },
  { x: 470, y: 545 },
  { x: 470, y: 215 },
  { x: 720, y: 215 },
  { x: 720, y: 470 },
  { x: 960, y: 470 },
  { x: 960, y: 250 },
  { x: 1170, y: 250 },
  { x: 1340, y: 250 },
]

interface Seg { ax: number; ay: number; bx: number; by: number; len: number; cum: number }

function buildPath(): { segs: Seg[]; total: number } {
  const segs: Seg[] = []
  let cum = 0
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    const a = WAYPOINTS[i], b = WAYPOINTS[i + 1]
    const len = Math.hypot(b.x - a.x, b.y - a.y)
    segs.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, len, cum })
    cum += len
  }
  return { segs, total: cum }
}

function pointAt(segs: Seg[], d: number): { x: number; y: number } {
  for (const s of segs) {
    if (d <= s.cum + s.len || s === segs[segs.length - 1]) {
      const t = s.len === 0 ? 0 : (d - s.cum) / s.len
      return { x: s.ax + (s.bx - s.ax) * t, y: s.ay + (s.by - s.ay) * t }
    }
  }
  const last = WAYPOINTS[WAYPOINTS.length - 1]
  return { x: last.x, y: last.y }
}

// distance from point to a segment (for grass/path collision)
function distToSeg(px: number, py: number, s: Seg): number {
  const dx = s.bx - s.ax, dy = s.by - s.ay
  const l2 = dx * dx + dy * dy
  let t = l2 === 0 ? 0 : ((px - s.ax) * dx + (py - s.ay) * dy) / l2
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(px - (s.ax + dx * t), py - (s.ay + dy * t))
}

// deterministic RNG so the scenery is identical every visit
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ── Entities ─────────────────────────────────────────────────────────────
interface Threat {
  def: ThreatDef
  d: number // distance travelled along path
  hp: number
  maxHp: number
  alive: boolean
  slow: number
  x: number
  y: number
  wobble: number
  flash: number // hit-flash timer
  face: number // 1 = facing right, -1 = facing left
}

interface Tower {
  type: TowerType
  x: number
  y: number
  cooldown: number
  angle: number
  age: number // for the pop-in animation
  recoil: number
  pulse: number // income payout ring
}

interface Projectile {
  x: number
  y: number
  target: Threat | null
  damage: number
  fromInvestment: boolean
  splash: number // area-damage radius (0 = single target)
  color: string
  life: number
  trail: { x: number; y: number }[]
}

interface Floater { x: number; y: number; text: string; color: string; life: number }

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number
  color: string
  kind: "coin" | "spark" | "puff"
}

interface Deco {
  kind: "tree" | "bush" | "rock" | "flower" | "tuft"
  x: number; y: number
  s: number // scale
  hue: number // color variation 0..1
}

// ── Engine ───────────────────────────────────────────────────────────────
export class MoneyDefense {
  private container: HTMLElement
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private dpr = 1
  private cw = 0
  private ch = 0
  private scale = 1
  private ox = 0
  private oy = 0
  private raf = 0
  private last = 0
  private time = 0

  private path = buildPath()
  private grassPattern: CanvasPattern | null = null
  private decos: Deco[] = []

  private towers: Tower[] = []
  private threats: Threat[] = []
  private projectiles: Projectile[] = []
  private floaters: Floater[] = []
  private particles: Particle[] = []

  state: GameState = "menu"
  difficulty: Difficulty = "normal"
  mode: GameMode = "endless"
  money = 0
  lives = 5
  wave = 0
  score = 0
  best = 0
  selectedTower: TowerType | null = null
  inspected: number | null = null // index into towers
  paused = false
  fast = false
  private prepTime = 0
  private incomeAcc = 0
  private message = ""
  private shake = 0
  private hurt = 0

  private spawnQueue: ThreatType[] = []
  private spawnTimer = 0
  private spawnInterval = 1.3
  private spawnedInWave = 0
  private waveSize = 0

  private pendingQuestionData: (QuestionData & { reward: number }) | null = null
  private usedQuestions = new Set<number>()

  private mouse = { x: -999, y: -999, on: false }
  private downPos = { x: 0, y: 0 }
  private emitThrottle = 0
  onUpdate: (s: Snapshot) => void = () => {}

  constructor(container: HTMLElement) {
    this.container = container
    this.canvas = document.createElement("canvas")
    this.canvas.style.width = "100%"
    this.canvas.style.height = "100%"
    this.canvas.style.display = "block"
    this.canvas.style.touchAction = "none"
    container.appendChild(this.canvas)
    this.ctx = this.canvas.getContext("2d")!
    try { this.best = Number(localStorage.getItem("cc-md-best") || 0) } catch { /* private mode */ }
    this.makeGrass()
    this.makeDecos()
    this.resize()
    this.bind()
    this.last = performance.now()
    this.loop()
    this.emit()
  }

  private get diff() { return DIFFS[this.difficulty] }

  // ── sizing ──
  private resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.cw = this.container.clientWidth
    this.ch = this.container.clientHeight
    this.canvas.width = Math.round(this.cw * this.dpr)
    this.canvas.height = Math.round(this.ch * this.dpr)
    this.scale = Math.min(this.cw / VW, this.ch / VH)
    this.ox = (this.cw - VW * this.scale) / 2
    this.oy = (this.ch - VH * this.scale) / 2
  }

  private toWorld(clientX: number, clientY: number) {
    const r = this.canvas.getBoundingClientRect()
    return {
      x: (clientX - r.left - this.ox) / this.scale,
      y: (clientY - r.top - this.oy) / this.scale,
    }
  }

  // ── grass texture pattern ──
  private makeGrass() {
    const p = document.createElement("canvas")
    p.width = p.height = 96
    const c = p.getContext("2d")!
    c.fillStyle = "#234a2c"
    c.fillRect(0, 0, 96, 96)
    for (let i = 0; i < 70; i++) {
      const x = Math.random() * 96, y = Math.random() * 96
      c.strokeStyle = Math.random() > 0.5 ? "rgba(60,110,70,0.5)" : "rgba(20,55,30,0.6)"
      c.lineWidth = 1.2
      c.beginPath()
      c.moveTo(x, y)
      c.lineTo(x + (Math.random() - 0.5) * 4, y - Math.random() * 6)
      c.stroke()
    }
    this.grassPattern = this.ctx.createPattern(p, "repeat")
  }

  // ── scenery (kept off the path and away from the gate/vault) ──
  private makeDecos() {
    const rnd = mulberry32(20260703)
    const kinds: Deco["kind"][] = ["tree", "bush", "rock", "flower", "tuft"]
    const weights = [0.16, 0.2, 0.12, 0.24, 0.28]
    const gate = WAYPOINTS[1]
    const vault = WAYPOINTS[WAYPOINTS.length - 2]
    let guard = 0
    while (this.decos.length < 46 && guard++ < 800) {
      const x = 30 + rnd() * (VW - 60)
      const y = 30 + rnd() * (VH - 60)
      if (this.onPath(x, y, 34)) continue
      if (Math.hypot(x - gate.x, y - gate.y) < 130 || Math.hypot(x - vault.x - 42, y - vault.y) < 150) continue
      if (this.decos.some((d) => Math.hypot(d.x - x, d.y - y) < 68)) continue
      let kind: Deco["kind"] = "tuft"
      let r = rnd()
      for (let i = 0; i < kinds.length; i++) { if (r < weights[i]) { kind = kinds[i]; break } r -= weights[i] }
      this.decos.push({ kind, x, y, s: 0.75 + rnd() * 0.55, hue: rnd() })
    }
    // trees read better sorted back-to-front
    this.decos.sort((a, b) => a.y - b.y)
  }

  // ── events ──
  private bind() {
    this.canvas.addEventListener("pointermove", this.onMove)
    this.canvas.addEventListener("pointerdown", this.onDown)
    this.canvas.addEventListener("pointerup", this.onUp)
    this.canvas.addEventListener("pointerleave", () => { this.mouse.on = false })
    window.addEventListener("resize", this.onResize)
  }
  private onResize = () => this.resize()
  private onMove = (e: PointerEvent) => {
    const w = this.toWorld(e.clientX, e.clientY)
    this.mouse.x = w.x; this.mouse.y = w.y; this.mouse.on = true
  }
  private onDown = (e: PointerEvent) => { this.downPos = { x: e.clientX, y: e.clientY } }
  private onUp = (e: PointerEvent) => {
    const moved = Math.abs(e.clientX - this.downPos.x) + Math.abs(e.clientY - this.downPos.y)
    if (moved > 8) return
    if (this.state !== "prep" && this.state !== "wave") return
    const w = this.toWorld(e.clientX, e.clientY)
    if (this.selectedTower) { this.tryPlace(w.x, w.y); return }
    // no shop selection → inspect an existing tower (click again / elsewhere to close)
    const idx = this.towers.findIndex((t) => Math.hypot(t.x - w.x, t.y - w.y) < 30)
    this.inspected = idx >= 0 && idx !== this.inspected ? idx : null
    this.emit()
  }

  // ── placement validity ──
  private onPath(x: number, y: number, pad: number): boolean {
    for (const s of this.path.segs) {
      if (distToSeg(x, y, s) < PATH_W / 2 + pad) return true
    }
    return false
  }
  private canPlace(x: number, y: number): boolean {
    if (x < 30 || x > VW - 30 || y < 30 || y > VH - 30) return false
    if (this.onPath(x, y, 14)) return false
    for (const t of this.towers) {
      if (Math.hypot(t.x - x, t.y - y) < 52) return false
    }
    return true
  }
  private tryPlace(x: number, y: number) {
    if (!this.selectedTower) return
    const def = TOWERS[this.selectedTower]
    if (this.money < def.cost) { this.flash("Not enough money"); return }
    if (!this.canPlace(x, y)) { this.flash("Can't build there. Keep off the path"); return }
    this.money -= def.cost
    this.towers.push({ type: this.selectedTower, x, y, cooldown: 0, angle: 0, age: 0, recoil: 0, pulse: 0 })
    this.floaters.push({ x, y: y - 30, text: "-$" + def.cost, color: "#ff8a6b", life: 1 })
    this.burst(x, y, def.color, 8, "puff")
    this.emit()
  }

  // ── public API ──
  startGame(difficulty: Difficulty, mode: GameMode = "endless") {
    this.difficulty = difficulty
    this.mode = mode
    this.towers = []; this.threats = []; this.projectiles = []; this.floaters = []; this.particles = []
    this.spawnQueue = []; this.spawnedInWave = 0; this.waveSize = 0
    this.pendingQuestionData = null; this.usedQuestions.clear()
    this.money = this.diff.money
    this.lives = 5
    this.wave = 0
    this.score = 0
    this.paused = false
    this.fast = false
    this.inspected = null
    this.message = "Build your defenses, then start Wave 1"
    this.state = "prep"
    this.prepTime = mode === "story" ? 20 : 12
    this.emit()
  }

  selectTower(type: TowerType | null) {
    this.selectedTower = type
    if (type) this.inspected = null
    this.emit()
  }

  sellInspected() {
    if (this.inspected === null) return
    const t = this.towers[this.inspected]
    if (!t) { this.inspected = null; this.emit(); return }
    const refund = Math.round(TOWERS[t.type].cost * SELL_RATIO)
    this.money += refund
    this.towers.splice(this.inspected, 1)
    this.inspected = null
    this.floaters.push({ x: t.x, y: t.y - 30, text: "+$" + refund, color: "#ffce3a", life: 1 })
    this.burst(t.x, t.y, "#ffce3a", 10, "coin")
    this.emit()
  }

  startNextWave() {
    if (this.state !== "prep") return
    this.wave++
    this.state = "wave"
    this.message = `Wave ${this.wave} incoming!`
    this.buildWave(this.wave)
    this.emit()
  }

  submitAnswer(optionIdx: number) {
    if (!this.pendingQuestionData || this.state !== "quiz") return
    const correct = optionIdx === this.pendingQuestionData.correct
    const reward = correct ? this.pendingQuestionData.reward : Math.round(this.pendingQuestionData.reward * 0.25)
    this.money += reward
    this.floaters.push({
      x: VW / 2, y: VH / 3,
      text: (correct ? "Correct! " : "Wrong! ") + "+$" + reward,
      color: correct ? "#6dd497" : "#ff8a6b",
      life: 1.5,
    })
    if (correct) this.burst(VW / 2, VH / 3, "#6dd497", 20, "coin")
    this.pendingQuestionData = null
    if (this.mode === "story" && this.wave >= STORY_WAVES) {
      this.win()
      return
    }
    this.state = "prep"
    this.prepTime = this.mode === "story" ? 20 : 12
    this.emit()
  }

  togglePause() { this.paused = !this.paused; this.emit() }
  toggleFast() { this.fast = !this.fast; this.emit() }

  private buildWave(wave: number) {
    const count = Math.round(6 + wave * 2.2 + (this.difficulty === "hard" ? 4 : 0))
    const pool = this.diff.pool(wave)
    this.spawnQueue = []
    for (let i = 0; i < count; i++) this.spawnQueue.push(pool[Math.floor(Math.random() * pool.length)])
    // boss every 5 waves, double boss every 10 waves on hard
    if (wave % 5 === 0) {
      this.spawnQueue.push("inflation")
      if (this.difficulty === "hard" && wave % 10 === 0) this.spawnQueue.push("inflation")
      this.message = `Wave ${wave}: boss incoming!`
    }
    this.spawnedInWave = 0
    this.waveSize = this.spawnQueue.length
    this.spawnInterval = Math.max(0.35, 1.3 - wave * 0.04)
    this.spawnTimer = 0.5
  }

  // ── loop ──
  private loop = () => {
    this.raf = requestAnimationFrame(this.loop)
    const now = performance.now()
    let dt = (now - this.last) / 1000
    this.last = now
    if (dt > 0.05) dt = 0.05
    this.time += dt
    if (!this.paused && (this.state === "wave" || this.state === "prep")) {
      this.update(this.fast ? dt * 1.8 : dt)
    }
    this.shake = Math.max(0, this.shake - dt * 2.2)
    this.hurt = Math.max(0, this.hurt - dt * 1.6)
    this.render()
    this.emitThrottle += dt
    if (this.emitThrottle > 0.12) { this.emitThrottle = 0; this.emit() }
  }

  private update(dt: number) {
    if (this.state === "prep") {
      this.prepTime -= dt
      if (this.prepTime <= 0) this.startNextWave()
    }

    // passive income
    this.incomeAcc += dt
    const incomeTowers = this.towers.filter((t) => t.type === "incomeBoost")
    if (this.incomeAcc >= 1) {
      if (incomeTowers.length) {
        const gain = 10 * incomeTowers.length
        this.money += gain
        const t = incomeTowers[0]
        this.floaters.push({ x: t.x, y: t.y - 28, text: "+$" + gain, color: "#ffce3a", life: 1 })
        for (const it of incomeTowers) it.pulse = 1
      }
      this.incomeAcc = 0
    }

    // spawn
    if (this.state === "wave" && this.spawnQueue.length) {
      this.spawnTimer -= dt
      if (this.spawnTimer <= 0) {
        const type = this.spawnQueue.shift()!
        const def = THREATS[type]
        // threats toughen up every wave so late game stays dangerous
        const hpMul = (this.difficulty === "hard" ? 1.25 : 1) * (1 + (this.wave - 1) * 0.05)
        this.threats.push({
          def, d: 0, hp: def.hp * hpMul, maxHp: def.hp * hpMul,
          alive: true, slow: 1, x: WAYPOINTS[0].x, y: WAYPOINTS[0].y,
          wobble: Math.random() * Math.PI * 2, flash: 0, face: 1,
        })
        this.spawnedInWave++
        this.spawnTimer = this.spawnInterval
      }
    }

    // reset slow, apply budget auras
    for (const th of this.threats) th.slow = 1
    for (const t of this.towers) {
      if (t.type !== "budgetPlan") continue
      for (const th of this.threats) {
        if (Math.hypot(th.x - t.x, th.y - t.y) <= TOWERS.budgetPlan.range) th.slow = Math.min(th.slow, 0.5)
      }
    }

    // move threats
    for (const th of this.threats) {
      if (!th.alive) continue
      th.d += th.def.speed * this.diff.speedMul * th.slow * dt
      th.flash = Math.max(0, th.flash - dt * 6)
      // subscriptions keep charging: the snake regenerates unless you finish it off
      if (th.def.type === "subscription" && th.hp < th.maxHp) th.hp = Math.min(th.maxHp, th.hp + 4 * dt)
      const p = pointAt(this.path.segs, th.d)
      if (Math.abs(p.x - th.x) > 0.1) th.face = p.x > th.x ? 1 : -1
      th.x = p.x; th.y = p.y
      if (th.d >= this.path.total) this.leak(th)
    }

    // towers fire (budget = slow aura only, income = passive only)
    for (const t of this.towers) {
      t.age += dt
      t.recoil = Math.max(0, t.recoil - dt * 5)
      t.pulse = Math.max(0, t.pulse - dt * 1.4)
      if (t.type === "budgetPlan" || t.type === "incomeBoost") continue
      const def = TOWERS[t.type]
      if (def.range <= 0) continue
      t.cooldown -= dt
      // aim at furthest-along threat in range
      let target: Threat | null = null
      let bestD = -1
      for (const th of this.threats) {
        if (!th.alive) continue
        if (Math.hypot(th.x - t.x, th.y - t.y) > def.range) continue
        if (th.d > bestD) { bestD = th.d; target = th }
      }
      if (target) {
        t.angle = Math.atan2(target.y - t.y, target.x - t.x)
        if (t.cooldown <= 0) {
          this.fire(t, target)
          t.recoil = 1
          const cd: Record<TowerType, number> = {
            emergencyFund: 0.65, insurance: 0.9, investment: 0.75, budgetPlan: 0, incomeBoost: 0,
            frugalFrog: 0.8, creditCat: 1.6, compoundCrab: 0.7,
          }
          t.cooldown = cd[t.type]
        }
      }
    }

    // projectiles
    for (const p of this.projectiles) {
      p.life -= dt
      const tx = p.target && p.target.alive ? p.target.x : null
      const ty = p.target && p.target.alive ? p.target.y : null
      if (tx === null || ty === null) { p.life = Math.min(p.life, 0.05); continue }
      const dx = tx - p.x, dy = ty - p.y
      const dist = Math.hypot(dx, dy)
      const step = 560 * dt
      p.trail.push({ x: p.x, y: p.y })
      if (p.trail.length > 5) p.trail.shift()
      if (dist <= step + (p.target!.def.radius)) {
        this.damage(p.target!, p.damage, p.fromInvestment)
        if (p.splash > 0) {
          for (const th of this.threats) {
            if (th === p.target || !th.alive) continue
            if (Math.hypot(th.x - p.x, th.y - p.y) <= p.splash) this.damage(th, p.damage, false)
          }
          this.burst(p.x, p.y, p.color, 8, "puff")
        }
        this.burst(p.x, p.y, p.color, 4, "spark")
        p.life = 0
      } else {
        p.x += (dx / dist) * step
        p.y += (dy / dist) * step
      }
    }
    this.projectiles = this.projectiles.filter((p) => p.life > 0)

    // floaters
    for (const f of this.floaters) { f.life -= dt * 0.9; f.y -= 26 * dt }
    this.floaters = this.floaters.filter((f) => f.life > 0)

    // particles
    for (const pt of this.particles) {
      pt.life -= dt
      pt.x += pt.vx * dt
      pt.y += pt.vy * dt
      if (pt.kind === "coin") pt.vy += 420 * dt
      else { pt.vx *= 1 - 2.5 * dt; pt.vy *= 1 - 2.5 * dt }
    }
    this.particles = this.particles.filter((p) => p.life > 0)

    if (this.inspected !== null && this.inspected >= this.towers.length) this.inspected = null
    this.threats = this.threats.filter((t) => t.alive)

    if (this.state === "wave" && !this.spawnQueue.length && !this.threats.length && this.spawnedInWave > 0) {
      this.completeWave()
    }
  }

  private burst(x: number, y: number, color: string, n: number, kind: Particle["kind"]) {
    if (this.particles.length > 220) return
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const sp = kind === "coin" ? 90 + Math.random() * 200 : 50 + Math.random() * 160
      const life = kind === "puff" ? 0.4 + Math.random() * 0.3 : 0.45 + Math.random() * 0.45
      this.particles.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - (kind === "coin" ? 130 : 0),
        life, maxLife: life,
        size: kind === "coin" ? 4 + Math.random() * 3 : kind === "puff" ? 6 + Math.random() * 6 : 2 + Math.random() * 2,
        color, kind,
      })
    }
  }

  private fire(t: Tower, target: Threat) {
    const dmgMap: Record<TowerType, number> = {
      emergencyFund: 16, budgetPlan: 0, insurance: 34, investment: 23, incomeBoost: 0,
      frugalFrog: 14, creditCat: 70, compoundCrab: 10,
    }
    let damage = dmgMap[t.type]
    // compound interest: the crab's damage grows the longer it's been placed
    if (t.type === "compoundCrab") damage = Math.round(10 + Math.min(50, t.age * 1.2))
    this.projectiles.push({
      x: t.x, y: t.y, target, damage,
      fromInvestment: t.type === "investment",
      splash: t.type === "frugalFrog" ? 55 : 0,
      color: TOWERS[t.type].color, life: 1.2, trail: [],
    })
  }

  private damage(th: Threat, dmg: number, fromInvestment: boolean) {
    if (!th.alive) return
    th.hp -= dmg
    th.flash = 1
    if (th.hp <= 0) {
      th.alive = false
      const isBoss = th.def.type === "inflation"
      // Small kill reward to keep gameplay flowing; main money comes from quiz answers
      const reward = isBoss ? 30 : fromInvestment ? 10 : 5
      this.money += reward
      this.score += isBoss ? 500 : 50
      this.floaters.push({ x: th.x, y: th.y - 20, text: "+$" + reward, color: fromInvestment ? "#6dd497" : "#ffce3a", life: 0.8 })
      this.burst(th.x, th.y, "#ffce3a", isBoss ? 24 : 8, "coin")
      this.burst(th.x, th.y, th.def.color, isBoss ? 16 : 6, "puff")
      if (isBoss) { this.shake = 0.8; this.flash("Inflation Dragon defeated!") }
    }
  }

  private leak(th: Threat) {
    if (!th.alive) return
    th.alive = false
    this.lives -= 1
    this.money = Math.max(0, this.money - th.def.damage)
    this.shake = 1
    this.hurt = 1
    this.burst(th.x, th.y, th.def.color, 12, "puff")
    this.flash(`${th.def.name} (${th.def.concept}) hit the vault! −$${th.def.damage}`)
    if (this.lives <= 0 || this.money <= 0) this.lose()
  }

  private completeWave() {
    this.score += 100
    // Pick a question, avoiding recent repeats
    if (this.usedQuestions.size >= QUESTIONS.length) this.usedQuestions.clear()
    let idx: number
    do { idx = Math.floor(Math.random() * QUESTIONS.length) } while (this.usedQuestions.has(idx))
    this.usedQuestions.add(idx)
    const q = QUESTIONS[idx]
    const reward = Math.round(120 + this.wave * 10)
    this.pendingQuestionData = { ...q, reward }
    this.state = "quiz"
    this.message = `Wave ${this.wave} cleared!`
    this.emit()
  }

  private saveBest() {
    if (this.score > this.best) {
      this.best = Math.floor(this.score)
      try { localStorage.setItem("cc-md-best", String(this.best)) } catch { /* private mode */ }
    }
  }
  private win() {
    this.score += 200 + this.money
    this.saveBest()
    this.state = "won"
    this.message = this.mode === "story"
      ? "You saved Coinville! The Great Vault is safe."
      : "You protected the vault!"
    this.emit()
  }
  private lose() {
    this.saveBest()
    this.state = "lost"
    this.message = this.lives <= 0 ? "The vault was overrun." : "Out of money. Bankrupt!"
    this.emit()
  }
  private flash(m: string) { this.message = m; this.emit() }

  // ── rendering ──
  private render() {
    const ctx = this.ctx
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    ctx.clearRect(0, 0, this.cw, this.ch)
    // letterbox backdrop
    ctx.fillStyle = "#0c0a07"
    ctx.fillRect(0, 0, this.cw, this.ch)
    ctx.save()
    if (this.shake > 0) {
      const m = this.shake * this.shake * 9
      ctx.translate((Math.random() - 0.5) * m, (Math.random() - 0.5) * m)
    }
    ctx.translate(this.ox, this.oy)
    ctx.scale(this.scale, this.scale)
    // clip to virtual board
    ctx.beginPath(); ctx.rect(0, 0, VW, VH); ctx.clip()

    this.drawGrass(ctx)
    this.drawPath(ctx)
    this.drawDecos(ctx)
    this.drawEndpoints(ctx)
    this.drawTowers(ctx)
    this.drawThreats(ctx)
    this.drawProjectiles(ctx)
    this.drawParticles(ctx)
    this.drawFloaters(ctx)
    this.drawGhost(ctx)

    // red edge flash when the vault takes a hit
    if (this.hurt > 0) {
      const g = ctx.createRadialGradient(VW / 2, VH / 2, 300, VW / 2, VH / 2, 780)
      g.addColorStop(0, "rgba(255,40,40,0)")
      g.addColorStop(1, `rgba(255,40,40,${0.4 * this.hurt})`)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, VW, VH)
    }

    ctx.restore()
  }

  private drawGrass(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.grassPattern ?? "#234a2c"
    ctx.fillRect(0, 0, VW, VH)
    // soft sunlight patches
    ctx.fillStyle = "rgba(120,190,110,0.05)"
    ctx.beginPath(); ctx.ellipse(340, 420, 260, 170, 0.4, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(900, 160, 230, 140, -0.3, 0, Math.PI * 2); ctx.fill()
    // soft vignette
    const g = ctx.createRadialGradient(VW / 2, VH / 2, 200, VW / 2, VH / 2, 820)
    g.addColorStop(0, "rgba(0,0,0,0)")
    g.addColorStop(1, "rgba(0,0,0,0.45)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, VW, VH)
  }

  private drawDecos(ctx: CanvasRenderingContext2D) {
    for (const d of this.decos) {
      ctx.save()
      ctx.translate(d.x, d.y)
      ctx.scale(d.s, d.s)
      switch (d.kind) {
        case "tree": {
          ctx.fillStyle = "rgba(0,0,0,0.25)"
          ctx.beginPath(); ctx.ellipse(3, 26, 22, 8, 0, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = "#5a3d22"
          ctx.fillRect(-4, 6, 8, 22)
          const leaf = d.hue > 0.5 ? "#2e6b3a" : "#357a44"
          const leafHi = d.hue > 0.5 ? "#3f8a4e" : "#4a9c5c"
          ctx.fillStyle = leaf
          ctx.beginPath(); ctx.arc(0, -8, 24, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(-15, 2, 16, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(15, 2, 16, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = leafHi
          ctx.beginPath(); ctx.arc(-6, -13, 12, 0, Math.PI * 2); ctx.fill()
          break
        }
        case "bush": {
          ctx.fillStyle = "rgba(0,0,0,0.22)"
          ctx.beginPath(); ctx.ellipse(2, 10, 18, 6, 0, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = d.hue > 0.5 ? "#2d6338" : "#347241"
          ctx.beginPath(); ctx.arc(-8, 2, 10, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(8, 2, 10, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(0, -5, 11, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = "#478a53"
          ctx.beginPath(); ctx.arc(-2, -6, 6, 0, Math.PI * 2); ctx.fill()
          break
        }
        case "rock": {
          ctx.fillStyle = "rgba(0,0,0,0.22)"
          ctx.beginPath(); ctx.ellipse(2, 8, 14, 5, 0, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = "#6f6a5e"
          ctx.beginPath()
          ctx.moveTo(-12, 6); ctx.lineTo(-8, -6); ctx.lineTo(2, -9); ctx.lineTo(11, -3); ctx.lineTo(12, 6)
          ctx.closePath(); ctx.fill()
          ctx.fillStyle = "#8c8677"
          ctx.beginPath()
          ctx.moveTo(-8, -6); ctx.lineTo(2, -9); ctx.lineTo(6, -1); ctx.lineTo(-4, 1)
          ctx.closePath(); ctx.fill()
          break
        }
        case "flower": {
          const c = d.hue > 0.66 ? "#ffce3a" : d.hue > 0.33 ? "#ff9ec7" : "#e8ecff"
          ctx.strokeStyle = "#3d7a4a"; ctx.lineWidth = 2
          ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(0, 0); ctx.stroke()
          ctx.fillStyle = c
          for (let i = 0; i < 5; i++) {
            const a = (i / 5) * Math.PI * 2
            ctx.beginPath(); ctx.arc(Math.cos(a) * 4, -2 + Math.sin(a) * 4, 3, 0, Math.PI * 2); ctx.fill()
          }
          ctx.fillStyle = "#8a5c1e"
          ctx.beginPath(); ctx.arc(0, -2, 2.4, 0, Math.PI * 2); ctx.fill()
          break
        }
        case "tuft": {
          ctx.strokeStyle = d.hue > 0.5 ? "rgba(90,160,95,0.8)" : "rgba(60,120,70,0.8)"
          ctx.lineWidth = 2
          for (let i = -2; i <= 2; i++) {
            ctx.beginPath()
            ctx.moveTo(i * 3, 6)
            ctx.quadraticCurveTo(i * 3 + i, -2, i * 4, -9)
            ctx.stroke()
          }
          break
        }
      }
      ctx.restore()
    }
  }

  private tracePath(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(WAYPOINTS[0].x, WAYPOINTS[0].y)
    for (let i = 1; i < WAYPOINTS.length; i++) ctx.lineTo(WAYPOINTS[i].x, WAYPOINTS[i].y)
  }
  private drawPath(ctx: CanvasRenderingContext2D) {
    ctx.lineJoin = "round"; ctx.lineCap = "round"
    // shadow border
    this.tracePath(ctx); ctx.strokeStyle = "#1c1208"; ctx.lineWidth = PATH_W + 14; ctx.stroke()
    // dirt
    this.tracePath(ctx); ctx.strokeStyle = "#c9a368"; ctx.lineWidth = PATH_W; ctx.stroke()
    this.tracePath(ctx); ctx.strokeStyle = "#b8945a"; ctx.lineWidth = PATH_W - 12; ctx.stroke()
    // dashed center, marching in the direction of travel
    this.tracePath(ctx)
    ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 3
    ctx.setLineDash([14, 18])
    ctx.lineDashOffset = -this.time * 22
    ctx.stroke()
    ctx.setLineDash([]); ctx.lineDashOffset = 0
  }

  private drawEndpoints(ctx: CanvasRenderingContext2D) {
    // start gate
    const s = WAYPOINTS[1]
    ctx.fillStyle = "#3a1414"
    this.roundRect(ctx, s.x - 70, s.y - 52, 70, 104, 12); ctx.fill()
    ctx.strokeStyle = "#ff5c5c"; ctx.lineWidth = 4
    this.roundRect(ctx, s.x - 70, s.y - 52, 70, 104, 12); ctx.stroke()
    // warning glow while a wave is spawning
    if (this.state === "wave" && this.spawnQueue.length) {
      ctx.save()
      ctx.globalAlpha = 0.35 + Math.sin(this.time * 7) * 0.25
      ctx.strokeStyle = "#ff8a8a"; ctx.lineWidth = 7
      this.roundRect(ctx, s.x - 74, s.y - 56, 78, 112, 15); ctx.stroke()
      ctx.restore()
    }
    this.label(ctx, "THREATS", s.x - 35, s.y - 66, "#ff9a9a", 18)

    // vault / end
    const e = WAYPOINTS[WAYPOINTS.length - 2]
    ctx.save()
    ctx.shadowColor = "rgba(255,206,58,0.5)"
    ctx.shadowBlur = 20 + Math.sin(this.time * 2.4) * 8
    // body
    ctx.fillStyle = "#b8902f"
    this.roundRect(ctx, e.x - 18, e.y - 56, 120, 112, 16); ctx.fill()
    ctx.shadowBlur = 0
    ctx.strokeStyle = "#ffce3a"; ctx.lineWidth = 5
    this.roundRect(ctx, e.x - 18, e.y - 56, 120, 112, 16); ctx.stroke()
    // dial (spins slowly)
    ctx.fillStyle = "#ffce3a"; ctx.beginPath(); ctx.arc(e.x + 42, e.y, 30, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = "#9a7420"; ctx.lineWidth = 4
    const spin = this.time * 0.35
    for (let i = 0; i < 6; i++) {
      const a = spin + (i / 6) * Math.PI * 2
      ctx.beginPath(); ctx.moveTo(e.x + 42, e.y)
      ctx.lineTo(e.x + 42 + Math.cos(a) * 30, e.y + Math.sin(a) * 30); ctx.stroke()
    }
    ctx.fillStyle = "#9a7420"
    ctx.beginPath(); ctx.arc(e.x + 42, e.y, 6, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
    this.label(ctx, "YOUR VAULT", e.x + 42, e.y - 70, "#ffe08a", 18)
  }

  private drawTowers(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.towers.length; i++) {
      const t = this.towers[i]
      const def = TOWERS[t.type]
      const inspected = i === this.inspected
      // range ring (faint; bright when inspected)
      if (def.range > 0) {
        ctx.fillStyle = inspected ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"
        ctx.beginPath(); ctx.arc(t.x, t.y, def.range, 0, Math.PI * 2); ctx.fill()
        if (inspected) {
          ctx.strokeStyle = def.color; ctx.lineWidth = 2
          ctx.setLineDash([8, 8]); ctx.lineDashOffset = -this.time * 16
          ctx.beginPath(); ctx.arc(t.x, t.y, def.range, 0, Math.PI * 2); ctx.stroke()
          ctx.setLineDash([]); ctx.lineDashOffset = 0
        }
      }
      // income payout ring
      if (t.pulse > 0) {
        ctx.strokeStyle = `rgba(255,206,58,${0.6 * t.pulse})`
        ctx.lineWidth = 3
        ctx.beginPath(); ctx.arc(t.x, t.y, 26 + (1 - t.pulse) * 30, 0, Math.PI * 2); ctx.stroke()
      }
      const pop = Math.min(1, t.age / 0.25)
      const scale = 0.6 + 0.4 * (1 - Math.pow(1 - pop, 3)) // ease-out pop-in
      this.drawTowerIcon(ctx, t.type, t.x, t.y, t.angle, scale, t.recoil)
      if (inspected) {
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.5
        ctx.beginPath(); ctx.arc(t.x, t.y, 31, 0, Math.PI * 2); ctx.stroke()
      }
    }
  }

  private drawTowerIcon(
    ctx: CanvasRenderingContext2D, type: TowerType, x: number, y: number,
    angle: number, scale = 1, recoil = 0,
  ) {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)
    // recoil kick opposite the aim direction
    if (recoil > 0) ctx.translate(-Math.cos(angle) * recoil * 4, -Math.sin(angle) * recoil * 4)
    // base platform
    ctx.shadowColor = "rgba(0,0,0,0.4)"; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4
    ctx.fillStyle = "#2c2113"; ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.fill()
    ctx.shadowBlur = 0; ctx.shadowOffsetY = 0
    ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.stroke()
    drawTowerCharacter(ctx, type, this.time)
    ctx.restore()
  }

  private drawThreats(ctx: CanvasRenderingContext2D) {
    for (const th of this.threats) {
      const r = th.def.radius
      const bob = Math.sin(this.time * 7 + th.wobble) * 2.2
      const squash = 1 + Math.sin(this.time * 7 + th.wobble) * 0.05
      // ground shadow (stays put while the body bobs)
      ctx.fillStyle = "rgba(0,0,0,0.3)"
      ctx.beginPath(); ctx.ellipse(th.x, th.y + r * 0.7, r * 0.85, r * 0.3, 0, 0, Math.PI * 2); ctx.fill()

      ctx.save()
      ctx.translate(th.x, th.y + bob)
      ctx.scale(squash * th.face, 2 - squash)
      drawThreatCharacter(ctx, th.def.type, r, this.time + th.wobble)
      // hit flash
      if (th.flash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${0.55 * th.flash})`
        ctx.beginPath(); ctx.arc(0, 0, r * 1.15, 0, Math.PI * 2); ctx.fill()
      }
      // slow ring when caught in a budget aura
      if (th.slow < 1) {
        ctx.strokeStyle = "rgba(110,155,255,0.8)"; ctx.lineWidth = 2.5
        ctx.beginPath(); ctx.arc(0, 0, r + 6, this.time * 3, this.time * 3 + 1.8); ctx.stroke()
      }
      ctx.restore()

      // hp bar + name label (hidden until the threat clears the spawn gate, so they don't stack)
      if (th.d > 360) {
        const bw = r * 2.1, ratio = Math.max(0, th.hp / th.maxHp)
        ctx.fillStyle = "rgba(0,0,0,0.55)"
        this.roundRect(ctx, th.x - bw / 2, th.y - r - 16, bw, 7, 3); ctx.fill()
        ctx.fillStyle = ratio > 0.5 ? "#6dd497" : ratio > 0.25 ? "#ffce3a" : "#ff5c5c"
        this.roundRect(ctx, th.x - bw / 2 + 1, th.y - r - 15, (bw - 2) * ratio, 5, 2); ctx.fill()
        this.label(ctx, th.def.name, th.x, th.y + r + 16, "#f6efd9", 13, "rgba(0,0,0,0.7)")
        this.label(ctx, th.def.concept, th.x, th.y + r + 30, "#ffd98a", 10.5, "rgba(0,0,0,0.65)")
      }
    }
  }

  private drawProjectiles(ctx: CanvasRenderingContext2D) {
    for (const p of this.projectiles) {
      // trail
      for (let i = 0; i < p.trail.length; i++) {
        const tp = p.trail[i]
        ctx.globalAlpha = ((i + 1) / p.trail.length) * 0.35
        ctx.fillStyle = p.color
        ctx.beginPath(); ctx.arc(tp.x, tp.y, 2 + i * 0.6, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.save()
      ctx.shadowColor = p.color; ctx.shadowBlur = 10
      ctx.fillStyle = "#fff2c0"
      ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = p.color
      ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }
  }

  private drawParticles(ctx: CanvasRenderingContext2D) {
    for (const pt of this.particles) {
      const a = Math.max(0, pt.life / pt.maxLife)
      ctx.globalAlpha = a
      if (pt.kind === "coin") {
        ctx.fillStyle = "#ffce3a"
        ctx.strokeStyle = "#9a7420"; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      } else if (pt.kind === "spark") {
        ctx.fillStyle = pt.color
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill()
      } else {
        ctx.fillStyle = pt.color
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size * (1.6 - a * 0.6), 0, Math.PI * 2); ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  }

  private drawFloaters(ctx: CanvasRenderingContext2D) {
    for (const f of this.floaters) {
      ctx.globalAlpha = Math.max(0, Math.min(1, f.life))
      this.label(ctx, f.text, f.x, f.y, f.color, 17, "rgba(0,0,0,0.6)")
      ctx.globalAlpha = 1
    }
  }

  private drawGhost(ctx: CanvasRenderingContext2D) {
    if (!this.selectedTower || !this.mouse.on) return
    if (this.state !== "prep" && this.state !== "wave") return
    const def = TOWERS[this.selectedTower]
    const ok = this.canPlace(this.mouse.x, this.mouse.y) && this.money >= def.cost
    ctx.save()
    ctx.globalAlpha = 0.85
    // range
    if (def.range > 0) {
      ctx.fillStyle = ok ? "rgba(109,212,151,0.12)" : "rgba(255,92,92,0.12)"
      ctx.beginPath(); ctx.arc(this.mouse.x, this.mouse.y, def.range, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = ok ? "rgba(109,212,151,0.6)" : "rgba(255,92,92,0.6)"
      ctx.lineWidth = 2; ctx.stroke()
    }
    ctx.globalAlpha = ok ? 0.9 : 0.4
    this.drawTowerIcon(ctx, this.selectedTower, this.mouse.x, this.mouse.y, 0)
    ctx.restore()
  }

  // ── canvas helpers ──
  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }
  private label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, size: number, stroke?: string) {
    ctx.font = `700 ${size}px "DM Sans", system-ui, sans-serif`
    ctx.textAlign = "center"; ctx.textBaseline = "middle"
    if (stroke) { ctx.lineWidth = 4; ctx.strokeStyle = stroke; ctx.strokeText(text, x, y) }
    ctx.fillStyle = color; ctx.fillText(text, x, y)
  }

  // ── emit ──
  private emit() {
    const insp = this.inspected !== null ? this.towers[this.inspected] : null
    this.onUpdate({
      state: this.state,
      money: Math.floor(this.money),
      lives: this.lives,
      wave: this.wave,
      score: Math.floor(this.score),
      best: this.best,
      prepTime: Math.max(0, Math.ceil(this.prepTime)),
      selectedTower: this.selectedTower,
      inspected: insp
        ? { name: TOWERS[insp.type].name, type: insp.type, refund: Math.round(TOWERS[insp.type].cost * SELL_RATIO) }
        : null,
      difficulty: this.difficulty,
      mode: this.mode,
      story:
        this.mode === "story" && this.state === "prep" && this.wave < STORY_WAVES
          ? { chapter: this.wave + 1, ...STORY[this.wave] }
          : null,
      storyWaves: STORY_WAVES,
      message: this.message,
      threatsLeft: this.spawnQueue.length + this.threats.length,
      waveSize: this.waveSize,
      fast: this.fast,
      pendingQuestion: this.pendingQuestionData
        ? { q: this.pendingQuestionData.q, opts: this.pendingQuestionData.opts, reward: this.pendingQuestionData.reward, concept: this.pendingQuestionData.concept }
        : null,
    })
  }

  dispose() {
    cancelAnimationFrame(this.raf)
    this.canvas.removeEventListener("pointermove", this.onMove)
    this.canvas.removeEventListener("pointerdown", this.onDown)
    this.canvas.removeEventListener("pointerup", this.onUp)
    window.removeEventListener("resize", this.onResize)
    if (this.canvas.parentElement) this.canvas.parentElement.removeChild(this.canvas)
  }
}

// ── character art (shared by canvas + exported for the HUD) ──────────────
// All characters are drawn centered at (0,0). Towers fill a ~21px-radius
// footprint; threats are designed at radius 21 and scaled to their def radius.
const OUTLINE = "rgba(0,0,0,0.35)"

function drawTowerCharacter(ctx: CanvasRenderingContext2D, type: TowerType, t: number) {
  ctx.lineWidth = 2
  ctx.strokeStyle = OUTLINE
  switch (type) {
    case "emergencyFund": { // Piggy Bank Pal - pig with a coin slot
      ctx.fillStyle = "#ff9ec7"
      ctx.beginPath(); ctx.moveTo(-16, -9); ctx.lineTo(-11, -21); ctx.lineTo(-5, -14); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(16, -9); ctx.lineTo(11, -21); ctx.lineTo(5, -14); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // coin slot + bobbing coin
      ctx.fillStyle = "#8a3d5e"
      ctx.beginPath(); roundPath(ctx, -5, -19, 10, 3.5, 1.5); ctx.fill()
      const cy = -25 + Math.sin(t * 3) * 1.8
      ctx.fillStyle = "#ffce3a"; ctx.strokeStyle = "#9a7420"
      ctx.beginPath(); ctx.arc(0, cy, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // eyes
      ctx.fillStyle = "#3d1226"
      ctx.beginPath(); ctx.arc(-7, -4, 2.4, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(7, -4, 2.4, 0, Math.PI * 2); ctx.fill()
      // snout
      ctx.fillStyle = "#ffbcd9"; ctx.strokeStyle = OUTLINE
      ctx.beginPath(); ctx.ellipse(0, 5, 8.5, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#8a3d5e"
      ctx.beginPath(); ctx.arc(-3, 5, 1.5, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(3, 5, 1.5, 0, Math.PI * 2); ctx.fill()
      // blush
      ctx.fillStyle = "rgba(255,255,255,0.4)"
      ctx.beginPath(); ctx.arc(-12, 2, 2.6, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(12, 2, 2.6, 0, Math.PI * 2); ctx.fill()
      break
    }
    case "budgetPlan": { // Budget Beaver - buck teeth + calculator
      ctx.fillStyle = "#6e9bff"
      ctx.beginPath(); ctx.arc(-13, -14, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.arc(13, -14, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // muzzle
      ctx.fillStyle = "#a8c0ff"
      ctx.beginPath(); ctx.ellipse(0, 6, 10, 8, 0, 0, Math.PI * 2); ctx.fill()
      // nose
      ctx.fillStyle = "#1d2f55"
      ctx.beginPath(); roundPath(ctx, -3.5, -1, 7, 5, 2); ctx.fill()
      // buck teeth
      ctx.fillStyle = "#fff"; ctx.strokeStyle = "rgba(0,0,0,0.3)"
      ctx.beginPath(); roundPath(ctx, -4, 4, 8, 8, 1.5); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0, 12); ctx.stroke()
      // eyes
      ctx.fillStyle = "#101d3a"
      ctx.beginPath(); ctx.arc(-7, -6, 2.4, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(7, -6, 2.4, 0, Math.PI * 2); ctx.fill()
      // calculator held up
      ctx.save(); ctx.translate(14, 9); ctx.rotate(0.25)
      ctx.fillStyle = "#e8ecff"; ctx.strokeStyle = OUTLINE
      ctx.beginPath(); roundPath(ctx, -4.5, -6, 9, 12, 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#1d2f55"; ctx.fillRect(-3, -4.5, 6, 3)
      ctx.fillStyle = "#5a6a95"
      for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) ctx.fillRect(-3 + c * 3.5, r * 3, 2.2, 2)
      ctx.restore()
      break
    }
    case "insurance": { // Insurance Turtle - shell with shield emblem
      // legs + head
      ctx.fillStyle = "#7fe3d2"
      for (const [lx, ly] of [[-14, 12], [14, 12], [-16, -8], [16, -8]]) {
        ctx.beginPath(); ctx.arc(lx, ly, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      }
      ctx.beginPath(); ctx.arc(0, -17, 6.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#0f3d36"
      ctx.beginPath(); ctx.arc(-2.4, -18, 1.3, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(2.4, -18, 1.3, 0, Math.PI * 2); ctx.fill()
      // shell
      ctx.fillStyle = "#50d8c4"
      ctx.beginPath(); ctx.arc(0, 1, 16.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.lineWidth = 1.6
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + Math.PI / 6
        ctx.moveTo(Math.cos(a) * 8, 1 + Math.sin(a) * 8)
        ctx.lineTo(Math.cos(a) * 16, 1 + Math.sin(a) * 16)
      }
      ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 1, 8, 0, Math.PI * 2); ctx.stroke()
      // shield emblem
      ctx.fillStyle = "#fff"; ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(0, -4.5); ctx.lineTo(5, -2.5); ctx.lineTo(4.2, 3); ctx.lineTo(0, 6.5); ctx.lineTo(-4.2, 3); ctx.lineTo(-5, -2.5)
      ctx.closePath(); ctx.fill(); ctx.stroke()
      break
    }
    case "investment": { // Investing Iguana - crest spikes + up chart
      // crest
      ctx.fillStyle = "#45a86e"
      for (let i = 0; i < 4; i++) {
        const a = -Math.PI / 2 - 0.6 + i * 0.4
        ctx.beginPath()
        ctx.moveTo(Math.cos(a - 0.12) * 17, Math.sin(a - 0.12) * 17)
        ctx.lineTo(Math.cos(a) * 26, Math.sin(a) * 26)
        ctx.lineTo(Math.cos(a + 0.12) * 17, Math.sin(a + 0.12) * 17)
        ctx.closePath(); ctx.fill(); ctx.stroke()
      }
      // head
      ctx.fillStyle = "#6dd497"
      ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // big lizard eyes
      for (const s of [-1, 1]) {
        ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(s * 6.5, -4, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
        ctx.fillStyle = "#143d26"
        ctx.beginPath(); ctx.arc(s * 6.5 + 1, -3.6, 2.1, 0, Math.PI * 2); ctx.fill()
      }
      // smile + nostrils
      ctx.strokeStyle = "rgba(0,0,0,0.45)"; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(0, 4, 7, 0.35, Math.PI - 0.35); ctx.stroke()
      ctx.fillStyle = "rgba(0,0,0,0.35)"
      ctx.beginPath(); ctx.arc(-2, 2, 1, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(2, 2, 1, 0, Math.PI * 2); ctx.fill()
      // chart badge
      ctx.save(); ctx.translate(12, 12)
      ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.strokeStyle = "#2c8a55"; ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.moveTo(-4, 3); ctx.lineTo(-1, 0); ctx.lineTo(1, 1.5); ctx.lineTo(4, -3); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(4, -3); ctx.lineTo(1.4, -3); ctx.moveTo(4, -3); ctx.lineTo(4, -0.4); ctx.stroke()
      ctx.restore()
      break
    }
    case "incomeBoost": { // Hustle Hen - lays golden eggs
      // comb
      ctx.fillStyle = "#ff5c5c"
      for (const [cx, cyy, cr] of [[-6, -17, 4], [0, -19.5, 4.5], [6, -17, 4]]) {
        ctx.beginPath(); ctx.arc(cx, cyy, cr, 0, Math.PI * 2); ctx.fill()
      }
      // body
      ctx.fillStyle = "#ffce3a"; ctx.strokeStyle = OUTLINE
      ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // wings
      ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(-13, 4, 7, -0.6, 1.8); ctx.stroke()
      ctx.beginPath(); ctx.arc(13, 4, 7, Math.PI - 1.8, Math.PI + 0.6); ctx.stroke()
      // eyes
      ctx.fillStyle = "#4a3413"
      ctx.beginPath(); ctx.arc(-6, -6, 2.4, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(6, -6, 2.4, 0, Math.PI * 2); ctx.fill()
      // beak + wattle
      ctx.fillStyle = "#ff9d2e"
      ctx.beginPath(); ctx.moveTo(-4, -2); ctx.lineTo(4, -2); ctx.lineTo(0, 3); ctx.closePath(); ctx.fill()
      ctx.fillStyle = "#ff5c5c"
      ctx.beginPath(); ctx.arc(0, 6, 2.6, 0, Math.PI * 2); ctx.fill()
      // golden egg (wiggles with the hustle)
      ctx.save(); ctx.translate(0, 14); ctx.rotate(Math.sin(t * 2.2) * 0.15)
      ctx.fillStyle = "#ffe08a"; ctx.strokeStyle = "#9a7420"; ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.ellipse(0, 0, 4.5, 5.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.restore()
      break
    }
    case "frugalFrog": { // Frugal Frog - splash-damage tongue
      // eye bumps on top
      ctx.fillStyle = "#8fd44d"
      ctx.beginPath(); ctx.arc(-8, -15, 6.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.arc(8, -15, 6.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // head
      ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // belly
      ctx.fillStyle = "#d8f0b0"
      ctx.beginPath(); ctx.ellipse(0, 10, 10, 7, 0, 0, Math.PI * 2); ctx.fill()
      // eyes on the bumps
      for (const s of [-1, 1]) {
        ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(s * 8, -15, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
        ctx.fillStyle = "#1d3a10"
        ctx.beginPath(); ctx.arc(s * 8, -14.4, 2, 0, Math.PI * 2); ctx.fill()
      }
      // wide mouth
      ctx.strokeStyle = "rgba(0,0,0,0.45)"; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(0, -1, 11, 0.3, Math.PI - 0.3); ctx.stroke()
      // nostrils
      ctx.fillStyle = "rgba(0,0,0,0.35)"
      ctx.beginPath(); ctx.arc(-3, -6, 1.1, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(3, -6, 1.1, 0, Math.PI * 2); ctx.fill()
      // saved coin tucked by its foot
      ctx.fillStyle = "#ffce3a"; ctx.strokeStyle = "#9a7420"; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(13, 12, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      break
    }
    case "creditCat": { // Credit Score Cat - sniper with a monocle
      // ears
      ctx.fillStyle = "#c9a2ff"
      ctx.beginPath(); ctx.moveTo(-16, -8); ctx.lineTo(-13, -21); ctx.lineTo(-5, -14); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(16, -8); ctx.lineTo(13, -21); ctx.lineTo(5, -14); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#8a5cc9"
      ctx.beginPath(); ctx.moveTo(-13, -10); ctx.lineTo(-11.5, -17); ctx.lineTo(-7, -13); ctx.closePath(); ctx.fill()
      ctx.beginPath(); ctx.moveTo(13, -10); ctx.lineTo(11.5, -17); ctx.lineTo(7, -13); ctx.closePath(); ctx.fill()
      // head
      ctx.fillStyle = "#c9a2ff"
      ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // left eye (narrowed, taking aim)
      ctx.strokeStyle = "#3d1a5e"; ctx.lineWidth = 2.2
      ctx.beginPath(); ctx.moveTo(-10, -4); ctx.lineTo(-4, -4); ctx.stroke()
      // right eye with gold monocle
      ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(7, -4, 3.6, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = "#3d1a5e"
      ctx.beginPath(); ctx.arc(7, -3.6, 1.9, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = "#ffce3a"; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(7, -4, 6, 0, Math.PI * 2); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(11, 0.5); ctx.lineTo(13, 8); ctx.stroke()
      // nose + mouth
      ctx.fillStyle = "#8a5cc9"
      ctx.beginPath(); ctx.moveTo(-2.5, 3); ctx.lineTo(2.5, 3); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill()
      ctx.strokeStyle = "rgba(0,0,0,0.4)"; ctx.lineWidth = 1.6
      ctx.beginPath(); ctx.arc(-3, 7, 3, 0.2, Math.PI - 0.6); ctx.stroke()
      // whiskers
      ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1.3
      ctx.beginPath()
      ctx.moveTo(-11, 3); ctx.lineTo(-19, 1)
      ctx.moveTo(-11, 6); ctx.lineTo(-19, 7)
      ctx.moveTo(11, 3); ctx.lineTo(19, 1)
      ctx.stroke()
      break
    }
    case "compoundCrab": { // Compound Crab - damage compounds over time
      // eye stalks
      ctx.strokeStyle = "#c94a3e"; ctx.lineWidth = 2.5
      ctx.beginPath(); ctx.moveTo(-6, -10); ctx.lineTo(-8, -18); ctx.moveTo(6, -10); ctx.lineTo(8, -18); ctx.stroke()
      for (const s of [-1, 1]) {
        ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(s * 8, -19, 3.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
        ctx.fillStyle = "#4a0f0a"
        ctx.beginPath(); ctx.arc(s * 8, -18.6, 1.8, 0, Math.PI * 2); ctx.fill()
      }
      // pincers (snip as time passes)
      const snip = Math.abs(Math.sin(t * 3)) * 0.35
      ctx.fillStyle = "#ff6f61"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 2
      for (const s of [-1, 1]) {
        ctx.save(); ctx.translate(s * 17, -2); ctx.rotate(s * (-0.5 + snip))
        ctx.beginPath(); ctx.arc(0, 0, 7, s === 1 ? 0.5 : Math.PI + 0.5, s === 1 ? Math.PI * 2 - 0.5 : Math.PI - 0.5); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill(); ctx.stroke()
        ctx.restore()
      }
      // body
      ctx.fillStyle = "#ff6f61"
      ctx.beginPath(); ctx.ellipse(0, 0, 14, 11.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // legs
      ctx.strokeStyle = "#c94a3e"; ctx.lineWidth = 2.2
      ctx.beginPath()
      for (const s of [-1, 1]) {
        ctx.moveTo(s * 10, 7); ctx.lineTo(s * 15, 13)
        ctx.moveTo(s * 5, 10); ctx.lineTo(s * 8, 16)
      }
      ctx.stroke()
      // grumpy little mouth
      ctx.strokeStyle = "rgba(0,0,0,0.45)"; ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.moveTo(-3, 4); ctx.lineTo(3, 4); ctx.stroke()
      // % badge (compound interest)
      ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(0, -4, 5.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#a83228"
      ctx.font = "700 8px 'DM Sans', sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"
      ctx.fillText("%", 0, -3.6)
      break
    }
  }
}

function drawThreatCharacter(ctx: CanvasRenderingContext2D, type: ThreatType, r: number, t: number) {
  ctx.save()
  const u = r / 21
  ctx.scale(u, u)
  ctx.lineWidth = 2
  ctx.strokeStyle = OUTLINE
  switch (type) {
    case "overspending": { // Shopaholic Squirrel
      // tail behind
      ctx.fillStyle = "#e05f35"
      ctx.beginPath()
      ctx.moveTo(-10, 4)
      ctx.quadraticCurveTo(-27, 8, -25, -8)
      ctx.quadraticCurveTo(-24, -20, -13, -17)
      ctx.quadraticCurveTo(-19, -7, -10, -2)
      ctx.closePath(); ctx.fill(); ctx.stroke()
      // ears
      ctx.fillStyle = "#ff7a4d"
      ctx.beginPath(); ctx.arc(-6, -14, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.arc(5, -15, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // body
      ctx.beginPath(); ctx.ellipse(0, 0, 15, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // belly
      ctx.fillStyle = "#ffd9c4"
      ctx.beginPath(); ctx.ellipse(3, 6, 8, 6.5, 0, 0, Math.PI * 2); ctx.fill()
      // eyes (wide, wants to buy everything)
      for (const [ex, ey] of [[1, -5], [9, -5]]) {
        ctx.fillStyle = "#fff"; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(ex, ey, 3.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
        ctx.fillStyle = "#33150a"
        ctx.beginPath(); ctx.arc(ex + 1.2, ey - 0.2, 1.8, 0, Math.PI * 2); ctx.fill()
      }
      // buck teeth
      ctx.fillStyle = "#fff"; ctx.strokeStyle = "rgba(0,0,0,0.3)"
      ctx.beginPath(); roundPath(ctx, 2, 1, 6, 5, 1); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(5, 1); ctx.lineTo(5, 6); ctx.stroke()
      // shopping bag in paws
      ctx.save(); ctx.translate(14, 7); ctx.rotate(0.15)
      ctx.fillStyle = "#f6e7c8"; ctx.strokeStyle = OUTLINE
      ctx.beginPath(); roundPath(ctx, -5, -4, 10, 10, 1.5); ctx.fill(); ctx.stroke()
      ctx.strokeStyle = "rgba(0,0,0,0.4)"; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(-2, -4, 2, Math.PI, 0); ctx.moveTo(4, -4); ctx.arc(2, -4, 2, Math.PI, 0); ctx.stroke()
      ctx.restore()
      break
    }
    case "unexpected": { // Sting Bee
      const flap = Math.sin(t * 26)
      // wings
      ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.strokeStyle = "rgba(0,0,0,0.2)"
      ctx.save(); ctx.translate(-2, -9); ctx.rotate(-0.45 + flap * 0.25)
      ctx.beginPath(); ctx.ellipse(0, -7, 5.5, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore()
      ctx.save(); ctx.translate(6, -9); ctx.rotate(0.35 - flap * 0.25)
      ctx.beginPath(); ctx.ellipse(0, -7, 5, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore()
      // stinger
      ctx.fillStyle = "#4a3413"
      ctx.beginPath(); ctx.moveTo(-14, -2); ctx.lineTo(-22, 1); ctx.lineTo(-13, 4); ctx.closePath(); ctx.fill()
      // striped body
      ctx.fillStyle = "#ffce3a"; ctx.strokeStyle = OUTLINE
      ctx.beginPath(); ctx.ellipse(0, 0, 16, 12, 0, 0, Math.PI * 2); ctx.fill()
      ctx.save()
      ctx.beginPath(); ctx.ellipse(0, 0, 16, 12, 0, 0, Math.PI * 2); ctx.clip()
      ctx.fillStyle = "#4a3413"
      ctx.fillRect(-7, -12, 5.5, 24)
      ctx.fillRect(1, -12, 5.5, 24)
      ctx.restore()
      ctx.beginPath(); ctx.ellipse(0, 0, 16, 12, 0, 0, Math.PI * 2); ctx.stroke()
      // face
      ctx.fillStyle = "#fff"; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(11, -4, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#33150a"
      ctx.beginPath(); ctx.arc(12, -3.6, 2, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = "rgba(0,0,0,0.45)"; ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.arc(11, 3, 3.5, 0.4, Math.PI - 0.8); ctx.stroke()
      // antennae
      ctx.beginPath(); ctx.moveTo(13, -9); ctx.quadraticCurveTo(16, -15, 14, -18); ctx.stroke()
      ctx.fillStyle = "#4a3413"
      ctx.beginPath(); ctx.arc(14, -18, 1.6, 0, Math.PI * 2); ctx.fill()
      break
    }
    case "creditcard": { // Debt Bat
      const flap = Math.sin(t * 16)
      // wings
      ctx.fillStyle = "#b23744"
      for (const s of [-1, 1]) {
        ctx.save(); ctx.translate(s * 9, -3); ctx.scale(s, 1); ctx.rotate(-0.2 + flap * 0.35)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(10, -10, 20, -6)
        ctx.quadraticCurveTo(16, -1, 17, 4)
        ctx.quadraticCurveTo(11, 2, 9, 6)
        ctx.quadraticCurveTo(5, 3, 0, 5)
        ctx.closePath(); ctx.fill(); ctx.stroke()
        ctx.restore()
      }
      // ears
      ctx.fillStyle = "#ff5c5c"
      ctx.beginPath(); ctx.moveTo(-10, -8); ctx.lineTo(-8, -18); ctx.lineTo(-2, -12); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(10, -8); ctx.lineTo(8, -18); ctx.lineTo(2, -12); ctx.closePath(); ctx.fill(); ctx.stroke()
      // head
      ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // angry eyes
      for (const s of [-1, 1]) {
        ctx.fillStyle = "#fff"; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(s * 5, -2, 3, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#33060c"
        ctx.beginPath(); ctx.arc(s * 5, -1.6, 1.6, 0, Math.PI * 2); ctx.fill()
        ctx.strokeStyle = "#4a0d15"; ctx.lineWidth = 2
        ctx.beginPath(); ctx.moveTo(s * 8, -7); ctx.lineTo(s * 2, -5); ctx.stroke()
      }
      // fangs
      ctx.fillStyle = "#fff"
      ctx.beginPath(); ctx.moveTo(-4.5, 6); ctx.lineTo(-3, 10); ctx.lineTo(-1.5, 6); ctx.closePath(); ctx.fill()
      ctx.beginPath(); ctx.moveTo(4.5, 6); ctx.lineTo(3, 10); ctx.lineTo(1.5, 6); ctx.closePath(); ctx.fill()
      ctx.strokeStyle = "rgba(0,0,0,0.4)"; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(-6, 6); ctx.lineTo(6, 6); ctx.stroke()
      // stolen credit card
      ctx.save(); ctx.translate(0, 15); ctx.rotate(-0.08)
      ctx.fillStyle = "#ffd77a"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); roundPath(ctx, -8, -5, 16, 10, 1.5); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(-8, -2.5, 16, 2.6)
      ctx.restore()
      break
    }
    case "badinvestment": { // Scam Rat
      // tail
      ctx.strokeStyle = "#d98a7a"; ctx.lineWidth = 2.6
      ctx.beginPath(); ctx.moveTo(-13, 5); ctx.quadraticCurveTo(-23, 8, -26, -3); ctx.stroke()
      // ear
      ctx.fillStyle = "#ff924d"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(-3, -11, 5.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#ffc09a"
      ctx.beginPath(); ctx.arc(-3, -11, 2.8, 0, Math.PI * 2); ctx.fill()
      // pointy body
      ctx.fillStyle = "#ff924d"
      ctx.beginPath()
      ctx.moveTo(19, 2)
      ctx.quadraticCurveTo(8, -14, -6, -11)
      ctx.quadraticCurveTo(-17, -8, -16, 2)
      ctx.quadraticCurveTo(-15, 11, -2, 12)
      ctx.quadraticCurveTo(12, 12, 19, 2)
      ctx.closePath(); ctx.fill(); ctx.stroke()
      // nose
      ctx.fillStyle = "#7a2e14"
      ctx.beginPath(); ctx.arc(19, 2, 2, 0, Math.PI * 2); ctx.fill()
      // shifty half-lidded eye
      ctx.fillStyle = "#fff"
      ctx.beginPath(); ctx.arc(6, -4, 3.6, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = "#33150a"
      ctx.beginPath(); ctx.arc(7, -3.4, 1.8, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = "#ff924d"
      ctx.beginPath(); ctx.arc(6, -5.6, 3.9, Math.PI, 0); ctx.fill()
      // whiskers
      ctx.strokeStyle = "rgba(0,0,0,0.35)"; ctx.lineWidth = 1.3
      ctx.beginPath()
      ctx.moveTo(14, 1); ctx.lineTo(22, -2)
      ctx.moveTo(14, 3); ctx.lineTo(22, 4)
      ctx.stroke()
      // dodgy "TO THE MOON" flyer with a crashing chart
      ctx.save(); ctx.translate(8, 9); ctx.rotate(0.18)
      ctx.fillStyle = "#fff"; ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1.3
      ctx.beginPath(); roundPath(ctx, -6, -4.5, 12, 9, 1); ctx.fill(); ctx.stroke()
      ctx.strokeStyle = "#e04444"; ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.moveTo(-4, -2); ctx.lineTo(-1, 0); ctx.lineTo(1, -1); ctx.lineTo(4, 2.5); ctx.stroke()
      ctx.restore()
      break
    }
    case "emergency": { // Emergency Elephant
      // ear behind
      ctx.fillStyle = "#d63c5c"
      ctx.beginPath(); ctx.arc(-7, -3, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#f28aa2"
      ctx.beginPath(); ctx.arc(-7, -3, 7, 0, Math.PI * 2); ctx.fill()
      // body
      ctx.fillStyle = "#ff4d6d"
      ctx.beginPath(); ctx.ellipse(2, 1, 16, 14.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // trunk (swings gently)
      ctx.strokeStyle = "#ff4d6d"; ctx.lineWidth = 6; ctx.lineCap = "round"
      const sway = Math.sin(t * 4) * 1.5
      ctx.beginPath(); ctx.moveTo(14, -3); ctx.quadraticCurveTo(23, 2, 19 + sway, 11); ctx.stroke()
      ctx.lineCap = "butt"
      // tusk
      ctx.strokeStyle = "#fff2d9"; ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(11, 6); ctx.quadraticCurveTo(15, 9, 13, 12); ctx.stroke()
      // worried eye
      ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(8, -6, 3.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#40101f"
      ctx.beginPath(); ctx.arc(8.6, -5.4, 1.8, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = "rgba(0,0,0,0.4)"; ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.arc(8, -10, 3, Math.PI + 0.5, -0.5); ctx.stroke()
      // first-aid patch
      ctx.fillStyle = "#fff"; ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.lineWidth = 1.5
      ctx.beginPath(); roundPath(ctx, -9, -1, 11, 11, 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#e04444"
      ctx.fillRect(-4.8, 0.8, 2.6, 7.4)
      ctx.fillRect(-7.2, 3.2, 7.4, 2.6)
      break
    }
    case "gambling": { // Gamble Goblin
      // pointy ears
      ctx.fillStyle = "#d14dff"
      ctx.beginPath(); ctx.moveTo(-11, -4); ctx.lineTo(-22, -11); ctx.lineTo(-12, 3); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(11, -4); ctx.lineTo(22, -11); ctx.lineTo(12, 3); ctx.closePath(); ctx.fill(); ctx.stroke()
      // head
      ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // mischievous eyes + brows
      for (const s of [-1, 1]) {
        ctx.fillStyle = "#fff"; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(s * 5, -4, 3.2, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#33073d"
        ctx.beginPath(); ctx.arc(s * 5, -3.4, 1.7, 0, Math.PI * 2); ctx.fill()
        ctx.strokeStyle = "#4a1266"; ctx.lineWidth = 2
        ctx.beginPath(); ctx.moveTo(s * 8.5, -9.5); ctx.lineTo(s * 2, -7.5); ctx.stroke()
      }
      // wide grin with teeth
      ctx.fillStyle = "#4a1266"
      ctx.beginPath(); ctx.arc(0, 3.5, 7, 0, Math.PI); ctx.closePath(); ctx.fill()
      ctx.fillStyle = "#fff"
      ctx.fillRect(-5, 3.5, 3, 2.4)
      ctx.fillRect(-1, 3.5, 3, 2.4)
      ctx.fillRect(3, 3.5, 2.4, 2.4)
      // lucky die (juggled)
      ctx.save(); ctx.translate(12, 10 + Math.sin(t * 5) * 1.5); ctx.rotate(0.3 + Math.sin(t * 5 + 1) * 0.15)
      ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); roundPath(ctx, -5.5, -5.5, 11, 11, 2.5); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#4a1266"
      for (const [dx, dy] of [[-2.5, -2.5], [2.5, 2.5], [2.5, -2.5], [-2.5, 2.5], [0, 0]]) {
        ctx.beginPath(); ctx.arc(dx, dy, 1.3, 0, Math.PI * 2); ctx.fill()
      }
      ctx.restore()
      break
    }
    case "impulse": { // Impulse Imp - tiny, fast, waving a SALE tag
      // horns
      ctx.fillStyle = "#c9309e"
      ctx.beginPath(); ctx.moveTo(-8, -10); ctx.lineTo(-11, -19); ctx.lineTo(-3, -13); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(8, -10); ctx.lineTo(11, -19); ctx.lineTo(3, -13); ctx.closePath(); ctx.fill(); ctx.stroke()
      // body
      ctx.fillStyle = "#ff5cd0"
      ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // crazy wide eyes
      for (const s of [-1, 1]) {
        ctx.fillStyle = "#fff"; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(s * 5, -3, 3.4, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#4a0a38"
        ctx.beginPath(); ctx.arc(s * 5 + 1, -2.6, 1.5, 0, Math.PI * 2); ctx.fill()
      }
      // gleeful grin
      ctx.fillStyle = "#4a0a38"
      ctx.beginPath(); ctx.arc(0, 4, 6, 0, Math.PI); ctx.closePath(); ctx.fill()
      ctx.fillStyle = "#fff"
      ctx.fillRect(-4, 4, 2.6, 2.2); ctx.fillRect(-0.5, 4, 2.6, 2.2); ctx.fillRect(3, 4, 2, 2.2)
      // SALE price tag waved overhead
      ctx.save(); ctx.translate(11, -12 + Math.sin(t * 8) * 1.5); ctx.rotate(0.35 + Math.sin(t * 8) * 0.2)
      ctx.fillStyle = "#ffe08a"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(3, -4); ctx.lineTo(7, 0); ctx.lineTo(3, 4); ctx.lineTo(-6, 4); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#a8321e"
      ctx.font = "800 5.5px 'DM Sans', sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"
      ctx.fillText("SALE", -1, 0.4)
      ctx.restore()
      break
    }
    case "subscription": { // Subscription Snake - regenerates like a renewing charge
      // coiled body
      ctx.fillStyle = "#7db83a"
      ctx.beginPath(); ctx.arc(-4, 6, 11, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#9ad84a"
      ctx.beginPath(); ctx.arc(2, 1, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // tail tip poking out
      ctx.strokeStyle = "#7db83a"; ctx.lineWidth = 4; ctx.lineCap = "round"
      ctx.beginPath(); ctx.moveTo(-13, 10); ctx.quadraticCurveTo(-19, 12, -21, 7); ctx.stroke()
      ctx.lineCap = "butt"
      // head
      ctx.fillStyle = "#9ad84a"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 2
      ctx.beginPath(); ctx.ellipse(8, -8, 9, 7, 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // eyes
      for (const s of [0, 1]) {
        ctx.fillStyle = "#fff"; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(6 + s * 6, -10, 2.6, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#1d3a10"
        ctx.beginPath(); ctx.arc(6.8 + s * 6, -9.8, 1.3, 0, Math.PI * 2); ctx.fill()
      }
      // flicking forked tongue
      const flick = Math.sin(t * 10) > 0.3 ? 1 : 0
      if (flick) {
        ctx.strokeStyle = "#e04444"; ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(16, -6); ctx.lineTo(22, -5)
        ctx.moveTo(22, -5); ctx.lineTo(24, -7)
        ctx.moveTo(22, -5); ctx.lineTo(24, -3)
        ctx.stroke()
      }
      // renewal badge: circular arrows (auto-renew)
      ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(1, 2, 5.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.strokeStyle = "#4a7a1e"; ctx.lineWidth = 1.6
      ctx.beginPath(); ctx.arc(1, 2, 3, -0.5, Math.PI - 0.9); ctx.stroke()
      ctx.beginPath(); ctx.arc(1, 2, 3, Math.PI - 0.5, Math.PI * 2 - 0.9); ctx.stroke()
      ctx.fillStyle = "#4a7a1e"
      ctx.beginPath(); ctx.moveTo(4.4, 0); ctx.lineTo(2.6, -1); ctx.lineTo(4.8, -2.2); ctx.closePath(); ctx.fill()
      ctx.beginPath(); ctx.moveTo(-2.4, 4); ctx.lineTo(-0.6, 5); ctx.lineTo(-2.8, 6.2); ctx.closePath(); ctx.fill()
      break
    }
    case "loanshark": { // Loan Shark - briefcase full of bad deals
      // dorsal fin
      ctx.fillStyle = "#3d7ad9"
      ctx.beginPath(); ctx.moveTo(-4, -11); ctx.lineTo(2, -22); ctx.lineTo(7, -11); ctx.closePath(); ctx.fill(); ctx.stroke()
      // body
      ctx.fillStyle = "#5c9eff"
      ctx.beginPath()
      ctx.moveTo(19, -1)
      ctx.quadraticCurveTo(10, -13, -8, -11)
      ctx.quadraticCurveTo(-18, -9, -17, 0)
      ctx.quadraticCurveTo(-16, 10, -4, 11)
      ctx.quadraticCurveTo(11, 11, 19, -1)
      ctx.closePath(); ctx.fill(); ctx.stroke()
      // tail fin
      ctx.fillStyle = "#3d7ad9"
      ctx.beginPath(); ctx.moveTo(-15, -2); ctx.lineTo(-23, -9); ctx.lineTo(-21, 2); ctx.closePath(); ctx.fill(); ctx.stroke()
      // white belly
      ctx.fillStyle = "#d9e8ff"
      ctx.beginPath(); ctx.ellipse(2, 7, 12, 5, -0.08, 0, Math.PI * 2); ctx.fill()
      // toothy grin
      ctx.strokeStyle = "rgba(0,0,0,0.5)"; ctx.lineWidth = 1.6
      ctx.beginPath(); ctx.moveTo(16, 2); ctx.quadraticCurveTo(8, 7, -2, 6); ctx.stroke()
      ctx.fillStyle = "#fff"
      for (let i = 0; i < 4; i++) {
        const tx = 13 - i * 4
        ctx.beginPath(); ctx.moveTo(tx, 3 + i * 0.8); ctx.lineTo(tx - 1.6, 6.6 + i * 0.6); ctx.lineTo(tx - 3.2, 3.6 + i * 0.8); ctx.closePath(); ctx.fill()
      }
      // cold little eye
      ctx.fillStyle = "#fff"
      ctx.beginPath(); ctx.arc(8, -5, 2.8, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = "#0a1d3d"
      ctx.beginPath(); ctx.arc(8.6, -4.6, 1.5, 0, Math.PI * 2); ctx.fill()
      // gill lines
      ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(-1, -6); ctx.quadraticCurveTo(-3, -2, -1, 2)
      ctx.moveTo(-5, -6); ctx.quadraticCurveTo(-7, -2, -5, 2)
      ctx.stroke()
      // briefcase of predatory loans
      ctx.save(); ctx.translate(4, 14)
      ctx.fillStyle = "#8a5c2e"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); roundPath(ctx, -7, -4, 14, 9, 1.5); ctx.fill(); ctx.stroke()
      ctx.strokeStyle = "#5e3d1a"; ctx.lineWidth = 1.6
      ctx.beginPath(); ctx.arc(0, -4, 2.5, Math.PI, 0); ctx.stroke()
      ctx.fillStyle = "#ffce3a"
      ctx.font = "800 6px 'DM Sans', sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"
      ctx.fillText("$", 0, 0.8)
      ctx.restore()
      break
    }
    case "inflation": { // Inflation Dragon - the boss. It literally inflates.
      const puff = 1 + Math.sin(t * 2.5) * 0.05
      ctx.save()
      ctx.scale(puff, puff)
      const flap = Math.sin(t * 6)
      // wings
      ctx.fillStyle = "#8a1e2e"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 2
      for (const s of [-1, 1]) {
        ctx.save(); ctx.translate(s * 10, -6); ctx.scale(s, 1); ctx.rotate(-0.3 + flap * 0.3)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(12, -14, 24, -10)
        ctx.quadraticCurveTo(19, -4, 21, 3)
        ctx.quadraticCurveTo(13, 0, 11, 6)
        ctx.quadraticCurveTo(6, 3, 0, 5)
        ctx.closePath(); ctx.fill(); ctx.stroke()
        ctx.restore()
      }
      // horns
      ctx.fillStyle = "#f2d9a0"
      ctx.beginPath(); ctx.moveTo(-9, -12); ctx.quadraticCurveTo(-14, -22, -8, -24); ctx.quadraticCurveTo(-8, -18, -4, -14); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(9, -12); ctx.quadraticCurveTo(14, -22, 8, -24); ctx.quadraticCurveTo(8, -18, 4, -14); ctx.closePath(); ctx.fill(); ctx.stroke()
      // head
      ctx.fillStyle = "#e03a3a"
      ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // balloon shine (it's inflating!)
      ctx.fillStyle = "rgba(255,255,255,0.25)"
      ctx.beginPath(); ctx.ellipse(-5, -6, 5, 3.4, -0.6, 0, Math.PI * 2); ctx.fill()
      // furious eyes
      for (const s of [-1, 1]) {
        ctx.fillStyle = "#ffe08a"; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(s * 6, -4, 3.4, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#40060a"
        ctx.beginPath(); ctx.arc(s * 6, -3.4, 1.7, 0, Math.PI * 2); ctx.fill()
        ctx.strokeStyle = "#40060a"; ctx.lineWidth = 2.2
        ctx.beginPath(); ctx.moveTo(s * 10, -9.5); ctx.lineTo(s * 2, -7); ctx.stroke()
      }
      // snout + smoke puffs
      ctx.fillStyle = "#c92e2e"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 2
      ctx.beginPath(); ctx.ellipse(0, 6, 8, 5.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#40060a"
      ctx.beginPath(); ctx.arc(-2.6, 5, 1.4, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(2.6, 5, 1.4, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = "rgba(200,200,200,0.5)"
      ctx.beginPath(); ctx.arc(-4, 12 + Math.sin(t * 3) * 1.5, 2.2, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(5, 13 + Math.cos(t * 3) * 1.5, 1.7, 0, Math.PI * 2); ctx.fill()
      // fangs
      ctx.fillStyle = "#fff"
      ctx.beginPath(); ctx.moveTo(-6.5, 9); ctx.lineTo(-5, 13); ctx.lineTo(-3.5, 9.5); ctx.closePath(); ctx.fill()
      ctx.beginPath(); ctx.moveTo(6.5, 9); ctx.lineTo(5, 13); ctx.lineTo(3.5, 9.5); ctx.closePath(); ctx.fill()
      // rising-prices badge
      ctx.save(); ctx.translate(13, 9)
      ctx.fillStyle = "#fff"; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.strokeStyle = "#c92e2e"; ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.moveTo(0, 3); ctx.lineTo(0, -3); ctx.moveTo(0, -3); ctx.lineTo(-2.2, -0.6); ctx.moveTo(0, -3); ctx.lineTo(2.2, -0.6); ctx.stroke()
      ctx.restore()
      ctx.restore()
      break
    }
  }
  ctx.restore()
}

function roundPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

// Exported so the React shop can render matching crisp character portraits.
export function paintTowerIcon(ctx: CanvasRenderingContext2D, type: TowerType, size: number) {
  ctx.save()
  ctx.translate(size / 2, size / 2 + size * 0.04)
  ctx.scale(size / 56, size / 56)
  drawTowerCharacter(ctx, type, 0)
  ctx.restore()
}
