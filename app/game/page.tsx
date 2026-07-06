"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MoneyDefense, TOWERS, STORY_WAVES, type Snapshot, type TowerType, type Difficulty, type GameMode } from "@/lib/game/engine"
import TowerIcon from "./TowerIcon"

const TOWER_TABS: { label: string; towers: TowerType[] }[] = [
  { label: "Starters", towers: ["emergencyFund", "budgetPlan", "insurance", "incomeBoost"] },
  { label: "Specialists", towers: ["investment", "frugalFrog", "creditCat", "compoundCrab"] },
]
const TOWER_ALL: TowerType[] = TOWER_TABS.flatMap((t) => t.towers)

const DIFF_INFO: { key: Difficulty; label: string; desc: string }[] = [
  { key: "easy", label: "Easy", desc: "Gentler pace · great for first-timers" },
  { key: "normal", label: "Normal", desc: "Swarms & bosses · a fair fight" },
  { key: "hard", label: "Hard", desc: "Goblins, sharks & double bosses" },
]

const MODE_INFO: { key: GameMode; label: string; desc: string }[] = [
  { key: "story", label: "📖 Story Mode", desc: `Save Coinville! ${STORY_WAVES} chapters with a tale before every wave.` },
  { key: "endless", label: "♾️ Endless Waves", desc: "No ending. Survive as many waves as you can and chase a high score." },
]

type Device = "mobile" | "desktop"

export default function GamePage() {
  const mountRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<MoneyDefense | null>(null)
  const [snap, setSnap] = useState<Snapshot | null>(null)
  const [hovered, setHovered] = useState<TowerType | null>(null)
  const [tab, setTab] = useState(0)
  const [device, setDevice] = useState<Device>("desktop")
  const [pickedMode, setPickedMode] = useState<GameMode | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("cc-device")
    if (saved === "mobile" || saved === "desktop") setDevice(saved)
    else {
      const d: Device = window.matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop"
      setDevice(d)
    }
  }, [])

  const mobile = device === "mobile"

  useEffect(() => {
    if (!mountRef.current) return
    const game = new MoneyDefense(mountRef.current)
    game.onUpdate = (s) => setSnap({ ...s })
    gameRef.current = game

    const onKey = (e: KeyboardEvent) => {
      const g = gameRef.current
      if (!g) return
      if (g.state !== "prep" && g.state !== "wave") return
      const n = Number(e.key)
      if (n >= 1 && n <= TOWER_ALL.length) {
        const t = TOWER_ALL[n - 1]
        setTab(Math.floor((n - 1) / 4))
        g.selectTower(g.selectedTower === t ? null : t)
      } else if (e.code === "Space") {
        e.preventDefault()
        if (g.state === "prep" && !g.paused) g.startNextWave()
        else g.togglePause()
      } else if (e.key === "Escape") {
        g.selectTower(null)
      } else if (e.key === "f" || e.key === "F") {
        g.toggleFast()
      }
    }
    window.addEventListener("keydown", onKey)

    return () => {
      window.removeEventListener("keydown", onKey)
      game.dispose()
      gameRef.current = null
    }
  }, [])

  const g = gameRef.current
  const state = snap?.state ?? "menu"

  const start = (d: Difficulty, m?: GameMode) => g?.startGame(d, m ?? pickedMode ?? "endless")
  const select = (t: TowerType) => {
    if (!g) return
    g.selectTower(snap?.selectedTower === t ? null : t)
  }

  return (
    <div className={`md-root ${mobile ? "md-mobile" : ""}`}>
      <div ref={mountRef} className="md-canvas" />

      {/* Top HUD */}
      {state !== "menu" && snap && (
        <div className="md-top">
          <Link href="/" className="md-chip md-back">← Exit</Link>
          <div className="md-chip md-money"><span className="md-chip-k">Money</span> ${snap.money}</div>
          <div className="md-chip md-lives" title={`${snap.lives} lives left`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`md-heart ${i < snap.lives ? "" : "gone"}`}>♥</span>
            ))}
          </div>
          <div className="md-chip"><span className="md-chip-k">Wave</span> {snap.wave}</div>
          <div className="md-chip md-score"><span className="md-chip-k">Score</span> {snap.score}</div>
          <button
            className={`md-chip md-pause ${snap.fast ? "on" : ""}`}
            onClick={() => g?.toggleFast()}
            title="Toggle fast-forward (F)"
          >
            {snap.fast ? "2x" : "1x"}
          </button>
          <button className="md-chip md-pause" onClick={() => g?.togglePause()}>
            {g?.paused ? "Resume" : "Pause"}
          </button>
        </div>
      )}

      {/* Wave progress */}
      {state === "wave" && snap && snap.waveSize > 0 && (
        <div className="md-waveprog" title={`${snap.threatsLeft} threats left`}>
          <div
            className="md-waveprog-fill"
            style={{ width: `${Math.max(0, 100 - (snap.threatsLeft / snap.waveSize) * 100)}%` }}
          />
        </div>
      )}

      {/* Message banner */}
      {state !== "menu" && snap?.message && (state === "prep" || state === "wave") && (
        <div className="md-banner">{snap.message}</div>
      )}

      {/* Story chapter card (story mode, between waves) */}
      {state === "prep" && snap?.story && (
        <div className="md-story">
          <div className="md-story-chapter">Chapter {snap.story.chapter} of {snap.storyWaves}</div>
          <div className="md-story-title">{snap.story.title}</div>
          <p className="md-story-text">{snap.story.text}</p>
        </div>
      )}

      {/* Prep / start-wave control */}
      {state === "prep" && snap && (
        <button className="md-startwave" onClick={() => g?.startNextWave()}>
          {snap.mode === "story" ? `Start Chapter ${snap.wave + 1}` : `Start Wave ${snap.wave + 1}`} &nbsp;<span className="md-prep">({snap.prepTime}s)</span>
        </button>
      )}

      {/* Sell panel for an inspected tower */}
      {(state === "prep" || state === "wave") && snap?.inspected && (
        <div className="md-sell">
          <span className="md-sell-icon"><TowerIcon type={snap.inspected.type} size={26} /></span>
          <span className="md-sell-name">{snap.inspected.name}</span>
          <button className="md-sell-btn" onClick={() => g?.sellInspected()}>
            Sell +${snap.inspected.refund}
          </button>
        </div>
      )}

      {/* Tower shop */}
      {(state === "prep" || state === "wave") && snap && (
        <div className="md-shop">
          <div className="md-shop-tabs">
            {TOWER_TABS.map((tb, ti) => (
              <button
                key={tb.label}
                className={`md-shop-tab ${tab === ti ? "sel" : ""}`}
                onClick={() => setTab(ti)}
              >
                {tb.label}
              </button>
            ))}
          </div>
          {TOWER_TABS[tab].towers.map((t, i) => {
            const def = TOWERS[t]
            const sel = snap.selectedTower === t
            const afford = snap.money >= def.cost
            return (
              <button
                key={t}
                className={`md-tower ${sel ? "sel" : ""} ${afford ? "" : "broke"}`}
                style={{ ["--tc" as any]: def.color }}
                onClick={() => select(t)}
                onMouseEnter={mobile ? undefined : () => setHovered(t)}
                onMouseLeave={mobile ? undefined : () => setHovered(null)}
              >
                {!mobile && <span className="md-tower-key">{tab * 4 + i + 1}</span>}
                <span className="md-tower-icon"><TowerIcon type={t} size={42} /></span>
                <span className="md-tower-name">{def.name}</span>
                <span className="md-tower-concept">{def.concept}</span>
                <span className="md-tower-cost">${def.cost}</span>
                {(mobile ? sel : hovered === t) && (
                  <span className="md-tip">
                    <b>{def.blurb}</b>
                    <em>{def.tip}</em>
                  </span>
                )}
              </button>
            )
          })}
          <div className="md-shop-hint">
            {snap.selectedTower
              ? `${mobile ? "Tap" : "Click"} the grass to place ${TOWERS[snap.selectedTower].name}. Keep off the path.`
              : mobile
                ? "Tap a defender, then tap the grass to place them. Tap a placed defender to sell."
                : "Pick a defender (1–8), then click the grass to place them. Click a placed defender to sell."}
          </div>
        </div>
      )}

      {/* Quiz overlay - shown after each wave */}
      {state === "quiz" && snap?.pendingQuestion && (
        <div className="md-overlay">
          <div className="md-card md-quiz-card">
            <div className="md-kicker">{snap.pendingQuestion.concept}</div>
            <p className="md-quiz-wave">Wave {snap.wave} cleared</p>
            <h2 className="md-quiz-q">{snap.pendingQuestion.q}</h2>
            <p className="md-quiz-stake">
              Correct → <strong>${snap.pendingQuestion.reward}</strong> &nbsp;|&nbsp; Wrong → ${Math.round(snap.pendingQuestion.reward * 0.25)}
            </p>
            <div className="md-quiz-opts">
              {snap.pendingQuestion.opts.map((opt, i) => (
                <button key={i} className="md-quiz-opt" onClick={() => g?.submitAnswer(i)}>
                  <span className="md-quiz-letter">{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Start screen */}
      {state === "menu" && (
        <div className="md-overlay">
          <div className="md-card">
            <div className="md-kicker">Coin Course presents</div>
            <h1 className="md-title">Money <span>Defense</span></h1>
            {!pickedMode ? (
              <>
                <p className="md-sub">Debt Bats, Scam Rats and Gamble Goblins are marching on the town vault! Recruit money-smart critters to stop them. You start with <b>$1,000</b> and earn more by answering money questions after every wave, just like a quiz game.</p>
                {(snap?.best ?? 0) > 0 && (
                  <div className="md-best">Best score: <b>{snap!.best}</b></div>
                )}
                <div className="md-diffs md-modes">
                  {MODE_INFO.map((m) => (
                    <button key={m.key} className="md-diff" onClick={() => setPickedMode(m.key)}>
                      <span className="md-diff-label">{m.label}</span>
                      <span className="md-diff-desc">{m.desc}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="md-sub">
                  {pickedMode === "story"
                    ? `Story Mode: protect Coinville through ${STORY_WAVES} chapters. Pick how tough the journey is:`
                    : "Endless Waves: survive as long as you can. Pick your challenge:"}
                </p>
                <div className="md-diffs">
                  {DIFF_INFO.map((d) => (
                    <button key={d.key} className="md-diff" onClick={() => start(d.key)}>
                      <span className="md-diff-label">{d.label}</span>
                      <span className="md-diff-desc">{d.desc}</span>
                    </button>
                  ))}
                </div>
                <button className="md-btn ghost md-modeback" onClick={() => setPickedMode(null)}>← Back to modes</button>
              </>
            )}
            <details className="md-how">
              <summary>How to play</summary>
              <ul>
                <li>Money menaces follow the path to your vault: <b>Shopaholic Squirrel</b>, <b>Sting Bee</b>, <b>Debt Bat</b>, <b>Scam Rat</b>, <b>Impulse Imp</b> (swarms!), <b>Subscription Snake</b> (regenerates!), <b>Emergency Elephant</b>, <b>Loan Shark</b>, <b>Gamble Goblin</b>… and the <b>Inflation Dragon</b> boss every 5 waves.</li>
                <li>You start with <b>$1,000</b>. Spend it to recruit defenders on the grass. Each one is a real money idea.</li>
                <li><b>After each wave</b>, answer a money question to earn cash for more defenders. Correct answers pay the full reward; wrong answers still pay a little.</li>
                <li><b>Story Mode</b> tells the tale of Coinville across {STORY_WAVES} chapters. <b>Endless Waves</b> never stops. Go for the high score!</li>
                <li><b>Starters:</b> Piggy Bank Pal attacks, Budget Beaver slows, Insurance Turtle snipes big threats, Hustle Hen earns passive income.</li>
                <li><b>Specialists:</b> Investing Iguana pays per kill, Frugal Frog does splash damage, Credit Score Cat is a long-range sniper, Compound Crab's damage grows over time.</li>
                <li>You lose a life and money every time a threat reaches the vault. Don't let them through!</li>
                {mobile ? (
                  <li>Controls: tap a defender to select it, then tap the grass to place it.</li>
                ) : (
                  <li>Shortcuts: <b>1–8</b> pick a defender, <b>Space</b> start wave / pause, <b>F</b> fast-forward, <b>Esc</b> deselect.</li>
                )}
              </ul>
            </details>
          </div>
        </div>
      )}

      {/* Win / Lose */}
      {(state === "won" || state === "lost") && snap && (
        <div className="md-overlay">
          <div className="md-card">
            <h1 className={`md-title ${state === "won" ? "win" : "lose"}`}>
              {state === "won" ? (snap.mode === "story" ? "Coinville is Saved!" : "You Won!") : "Game Over"}
            </h1>
            <p className="md-sub">{snap.message}</p>
            <div className="md-final">
              <div><span>{snap.score}</span>Final score</div>
              <div><span>{snap.wave}</span>{snap.mode === "story" ? "Chapters cleared" : "Waves survived"}</div>
              <div><span>${snap.money}</span>Money saved</div>
            </div>
            {snap.best > 0 && snap.score >= snap.best && (
              <div className="md-best md-best-new">New best score!</div>
            )}
            <p className="md-lesson">
              {state === "won"
                ? "Just like in real life: an emergency fund, a budget, insurance, and investments work together to keep you financially safe."
                : "Tip: layer your defenses. Slow threats with Budget Beaver, then let Insurance Turtle and Investing Iguana finish them off."}
            </p>
            <div className="md-end-actions">
              <button className="md-btn" onClick={() => start(snap.difficulty, snap.mode)}>Play Again</button>
              <Link href="/" className="md-btn ghost">Back to Coin Course</Link>
            </div>
          </div>
        </div>
      )}

      {/* Pause overlay */}
      {g?.paused && (state === "wave" || state === "prep") && (
        <div className="md-overlay md-pause-over">
          <div className="md-card">
            <h1 className="md-title">Paused</h1>
            <button className="md-btn" onClick={() => g?.togglePause()}>Resume</button>
          </div>
        </div>
      )}
    </div>
  )
}
