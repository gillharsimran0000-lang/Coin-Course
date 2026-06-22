"use client"

// Frontend  -  Quiz page

import { useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { modules } from "@/lib/modules"
import NavBar from "@/components/NavBar"
import { useAuth } from "@/app/providers"
import { upsertQuizScore } from "@/lib/progress"

type Phase = "intro" | "question" | "results"

export default function QuizPage({ params }: { params: { id: string } }) {
  const moduleId = parseInt(params.id)
  const mod = modules.find(m => m.id === moduleId)
  if (!mod) notFound()

  const questions = mod.quiz
  const nextModule = modules.find(m => m.id === moduleId + 1)

  const { user } = useAuth()
  const [phase, setPhase] = useState<Phase>("intro")
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [revealed, setRevealed] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => { setAnimating(false) }, [current, phase])

  useEffect(() => {
    if (phase !== "results" || !user) return
    upsertQuizScore(user.id, moduleId, score, questions.length).then(({ ok }) => {
      if (!ok) console.warn("[quiz] Score could not be saved for module", moduleId)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const score = answers.filter((a, i) => a === questions[i].answer).length
  const pct = Math.round((score / questions.length) * 100)

  function startQuiz() {
    setAnimating(true)
    setTimeout(() => { setPhase("question"); setCurrent(0); setAnimating(false) }, 220)
  }

  function handleSelect(idx: number) {
    if (revealed) return
    setSelected(idx)
    const next = [...answers]
    next[current] = idx
    setAnswers(next)
    setRevealed(true)
  }

  function goNext() {
    if (current < questions.length - 1) {
      setAnimating(true)
      setTimeout(() => {
        setCurrent(c => c + 1)
        setSelected(answers[current + 1])
        setRevealed(answers[current + 1] !== null)
        setAnimating(false)
      }, 180)
    } else {
      setAnimating(true)
      setTimeout(() => { setPhase("results"); setAnimating(false) }, 220)
    }
  }

  function goPrev() {
    if (current > 0) {
      setAnimating(true)
      setTimeout(() => {
        setCurrent(c => c - 1)
        setSelected(answers[current - 1])
        setRevealed(answers[current - 1] !== null)
        setAnimating(false)
      }, 180)
    }
  }

  function restartQuiz() {
    setAnswers(Array(questions.length).fill(null))
    setSelected(null)
    setRevealed(false)
    setCurrent(0)
    setPhase("question")
  }

  const q = questions[current]
  const isCorrect = selected === q?.answer
  const badge =
    pct === 100 ? { label: "Perfect score", sub: "Flawless run.", cls: "perfect" } :
    pct >= 80  ? { label: "Excellent", sub: "You've got this.", cls: "excellent" } :
    pct >= 60  ? { label: "Solid work", sub: "Worth a review.", cls: "good" } :
                 { label: "Keep going", sub: "Revisit the lessons.", cls: "retry" }

  return (
    <div className="quiz-page">
      <NavBar />

      {/* BREADCRUMB */}
      <div className="mod-breadcrumb">
        <Link href="/">Coin Course</Link>
        <span className="mod-bc-sep">→</span>
        <Link href="/#modules">Modules</Link>
        <span className="mod-bc-sep">→</span>
        <Link href={`/modules/${mod.id}`}>{mod.title}</Link>
        <span className="mod-bc-sep">→</span>
        <span style={{ color: 'var(--ink-2)' }}>Quiz</span>
      </div>

      <div className={`quiz-shell${animating ? " quiz-fade-out" : " quiz-fade-in"}`}>

        {/* ── INTRO ── */}
        {phase === "intro" && (
          <div className="quiz-intro">
            <div className="quiz-intro-glyph" style={{ background: mod.colorVar }}>
              {mod.glyph}
            </div>
            <div className="quiz-intro-kicker">Module {String(mod.id).padStart(2, "0")} · Quiz</div>
            <h1 className="quiz-intro-title">{mod.title}</h1>
            <p className="quiz-intro-sub">{mod.tagline}</p>
            <div className="quiz-intro-meta">
              <div className="quiz-meta-pill">
                <span className="quiz-meta-num">{questions.length}</span>
                <span className="quiz-meta-lbl">questions</span>
              </div>
              <div className="quiz-meta-divider" />
              <div className="quiz-meta-pill">
                <span className="quiz-meta-num">~{Math.round(questions.length * 0.75)}</span>
                <span className="quiz-meta-lbl">minutes</span>
              </div>
              <div className="quiz-meta-divider" />
              <div className="quiz-meta-pill">
                <span className="quiz-meta-num">80%</span>
                <span className="quiz-meta-lbl">to pass</span>
              </div>
            </div>
            <button className="quiz-start-btn" style={{ background: mod.colorVar }} onClick={startQuiz}>
              Start quiz
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <Link href={`/modules/${mod.id}`} className="quiz-back-link">← Back to module</Link>
          </div>
        )}

        {/* ── QUESTION ── */}
        {phase === "question" && q && (
          <div className="quiz-question-wrap">
            {/* progress strip */}
            <div className="quiz-progress-strip">
              {questions.map((_, i) => (
                <button
                  key={i}
                  className={`quiz-prog-seg${i === current ? " active" : ""}${answers[i] !== null ? (answers[i] === questions[i].answer ? " correct" : " wrong") : ""}`}
                  style={i === current ? { background: mod.colorHex } : undefined}
                  onClick={() => {
                    setAnimating(true)
                    setTimeout(() => {
                      setCurrent(i)
                      setSelected(answers[i])
                      setRevealed(answers[i] !== null)
                      setAnimating(false)
                    }, 180)
                  }}
                />
              ))}
            </div>

            <div className="quiz-q-header">
              <span className="quiz-q-count" style={{ color: mod.colorHex }}>
                {String(current + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
              </span>
              <span className="quiz-q-answered">
                {answers.filter(a => a !== null).length} answered
              </span>
            </div>

            <h2 className="quiz-q-text">{q.q}</h2>

            <div className="quiz-options">
              {q.options.map((opt, i) => {
                const letter = ["A", "B", "C", "D"][i]
                let cls = "quiz-option"
                if (revealed) {
                  if (i === q.answer) cls += " correct"
                  else if (i === selected && i !== q.answer) cls += " wrong"
                  else cls += " dim"
                } else if (selected === i) {
                  cls += " chosen"
                }
                return (
                  <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
                    <span className="quiz-opt-letter">{letter}</span>
                    <span className="quiz-opt-text">{opt}</span>
                    {revealed && i === q.answer && (
                      <span className="quiz-opt-icon correct-icon">✓</span>
                    )}
                    {revealed && i === selected && i !== q.answer && (
                      <span className="quiz-opt-icon wrong-icon">✗</span>
                    )}
                  </button>
                )
              })}
            </div>

            {revealed && (
              <div className={`quiz-explanation${isCorrect ? " correct" : " wrong"}`}>
                <span className="quiz-exp-badge">{isCorrect ? "✓ Correct" : "✗ Incorrect"}</span>
                <p>{q.explanation}</p>
              </div>
            )}

            <div className="quiz-nav-row">
              <button
                className="quiz-nav-btn"
                onClick={goPrev}
                disabled={current === 0}
              >
                ← Prev
              </button>
              <button
                className={`quiz-nav-btn primary${!revealed ? " disabled" : ""}`}
                onClick={goNext}
                disabled={!revealed}
                style={revealed ? { background: mod.colorVar, color: '#0c0a07' } : undefined}
              >
                {current === questions.length - 1 ? "See results →" : "Next →"}
              </button>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {phase === "results" && (
          <div className="quiz-results">
            <div className="quiz-score-ring" style={{ "--ring-color": mod.colorHex } as React.CSSProperties}>
              <svg viewBox="0 0 120 120" className="quiz-ring-svg">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg-3)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke={mod.colorHex}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 326.7} 326.7`}
                  transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dasharray 1s ease" }}
                />
              </svg>
              <div className="quiz-ring-inner">
                <span className="quiz-ring-pct">{pct}%</span>
                <span className="quiz-ring-frac">{score}/{questions.length}</span>
              </div>
            </div>

            <div className={`quiz-badge ${badge.cls}`} style={{ borderColor: mod.colorHex }}>
              {badge.label}
            </div>
            <p className="quiz-badge-sub">{badge.sub}</p>

            {/* answer breakdown */}
            <div className="quiz-breakdown">
              <div className="quiz-breakdown-label">Answer review</div>
              {questions.map((question, i) => {
                const userAnswer = answers[i]
                const correct = userAnswer === question.answer
                return (
                  <button
                    key={i}
                    className={`quiz-breakdown-row${correct ? " correct" : " wrong"}`}
                    onClick={() => {
                      setCurrent(i)
                      setSelected(answers[i])
                      setRevealed(true)
                      setPhase("question")
                    }}
                  >
                    <span className={`quiz-bd-icon${correct ? " correct" : " wrong"}`}>
                      {correct ? "✓" : "✗"}
                    </span>
                    <span className="quiz-bd-q">{question.q}</span>
                    <span className="quiz-bd-arrow">→</span>
                  </button>
                )
              })}
            </div>

            <div className="quiz-results-actions">
              <button className="quiz-action-btn" onClick={restartQuiz}>
                Retake quiz
              </button>
              <Link href={`/modules/${mod.id}`} className="quiz-action-btn">
                Back to module
              </Link>
              {nextModule && nextModule.status !== "locked" && (
                <Link href={`/modules/${nextModule.id}`} className="quiz-action-btn primary" style={{ background: mod.colorVar }}>
                  Next module →
                </Link>
              )}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 6 }}>
              <div className="coin">$</div>
              Coin Course
            </Link>
            <p className="footer-tag">Free financial literacy for every age. Free financial literacy for every age.</p>
          </div>
          <div>
            <h5>Learn</h5>
            <div className="footer-links">
              <Link href="/#modules">All 8 modules</Link>
              <Link href="/#audience">For students</Link>
              <Link href="/#audience">For parents</Link>
              <Link href="/#audience">For teachers</Link>
            </div>
          </div>
          <div>
            <h5>Help</h5>
            <div className="footer-links">
              <Link href="/#faq">FAQ</Link>
              <a href="mailto:hello@coin-course.com">Contact</a>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Coin Course · A free financial literacy project</span>
          <span>Harsimran Gill & Ashwin Sivakumar</span>
        </div>
      </footer>
    </div>
  )
}
