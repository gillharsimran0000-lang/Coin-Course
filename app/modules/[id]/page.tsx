"use client"

// Frontend — Module lesson page

import { useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { modules } from "@/lib/modules"
import type { Lesson } from "@/lib/modules"
import NavBar from "@/components/NavBar"
import { generateNotes } from "@/lib/generateNotes"
import { useAuth } from "@/app/providers"
import { loadModuleProgress, upsertLessonProgress, isModuleUnlocked, type LessonProgress } from "@/lib/progress"

export default function ModulePage({ params }: { params: { id: string } }) {
  const moduleId = parseInt(params.id)
  const mod = modules.find(m => m.id === moduleId)
  if (!mod) notFound()

  const { user } = useAuth()
  const [activeLesson, setActiveLesson] = useState<Lesson>(mod.lessons[0])
  const [progressMap, setProgressMap] = useState<Record<number, LessonProgress>>({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    if (!user) return
    loadModuleProgress(user.id, moduleId).then(records => {
      const map: Record<number, LessonProgress> = {}
      records.forEach(r => { map[r.lesson_id] = r })
      setProgressMap(map)
    })
  }, [user, moduleId])

  useEffect(() => {
    if (moduleId <= 1 || !user) return
    isModuleUnlocked(user.id, moduleId).then(unlocked => setIsLocked(!unlocked))
  }, [user, moduleId])

  async function markComplete(lessonId: number) {
    if (!user) return
    setSaving(true)
    const prev = progressMap[lessonId]
    setProgressMap(p => ({ ...p, [lessonId]: { lesson_id: lessonId, watch_progress: 100, completed: true } }))
    const { ok } = await upsertLessonProgress(user.id, moduleId, lessonId, 100)
    if (!ok) {
      setProgressMap(p => ({ ...p, [lessonId]: prev ?? { lesson_id: lessonId, watch_progress: 0, completed: false } }))
      setSaveError("Could not save progress. Check your connection and try again.")
    } else {
      setSaveError("")
    }
    setSaving(false)
  }

  function getLessonWatchProgress(lessonId: number): number {
    return progressMap[lessonId]?.watch_progress ?? 0
  }

  function isLessonComplete(lessonId: number): boolean {
    return progressMap[lessonId]?.completed ?? false
  }

  const prevModule = modules.find(m => m.id === moduleId - 1)
  const nextModule = modules.find(m => m.id === moduleId + 1)
  const activeLessonIndex = mod.lessons.findIndex(l => l.id === activeLesson.id)
  const prevLesson = mod.lessons[activeLessonIndex - 1]
  const nextLesson = mod.lessons[activeLessonIndex + 1]

  const effectiveWatchProgress = getLessonWatchProgress(activeLesson.id)
  const totalDuration = mod.lessons.reduce((sum, l) => sum + l.duration, 0)
  const totalWatched = Math.round(
    mod.lessons.reduce((sum, l) => sum + (l.duration * getLessonWatchProgress(l.id)) / 100, 0)
  )
  const moduleProgress = Math.round(
    mod.lessons.reduce((sum, l) => sum + getLessonWatchProgress(l.id), 0) / mod.lessons.length
  )

  return (
    <div className="mod-page">
      <NavBar />

      {/* BREADCRUMB */}
      <div className="mod-breadcrumb">
        <Link href="/">Coin Course</Link>
        <span className="mod-bc-sep">→</span>
        <Link href="/#modules">Modules</Link>
        <span className="mod-bc-sep">→</span>
        <span style={{ color: 'var(--ink-2)' }}>{mod.title}</span>
      </div>

      {/* MODULE HEADER */}
      <div className="mod-header">
        <div className="mod-header-inner">
          <div className="mod-glyph-xl" style={{ background: mod.colorVar }}>
            {mod.glyph}
          </div>
          <div className="mod-header-text">
            <div className="mod-header-num">
              Module {String(mod.id).padStart(2, "0")} / 08
              {moduleProgress === 100 ? (
                <span className="mod-status-badge complete">✓ Complete</span>
              ) : moduleProgress > 0 ? (
                <span className="mod-status-badge in-progress">● In progress · {moduleProgress}%</span>
              ) : null}
            </div>
            <h1 className="mod-header-title">{mod.title}</h1>
            <p className="mod-header-tag">{mod.tagline}</p>
          </div>
          <div className="mod-header-stats">
            <div className="mod-stat">
              <div className="mod-stat-num">{mod.duration}<span className="mod-stat-unit"> min</span></div>
              <div className="mod-stat-lbl">Total length</div>
            </div>
            <div className="mod-stat">
              <div className="mod-stat-num">{mod.quizCount}</div>
              <div className="mod-stat-lbl">Quiz questions</div>
            </div>
            <div className="mod-stat">
              <div className="mod-stat-num">{mod.lessons.length}</div>
              <div className="mod-stat-lbl">Lessons</div>
            </div>
          </div>
        </div>

        {/* progress bar */}
        {!isLocked && (
          <div className="mod-progress-row">
            <div className="mod-progress-bar">
              <div style={{ width: `${moduleProgress}%`, background: mod.colorVar }} />
            </div>
            <span className="mod-progress-label">{totalWatched} / {totalDuration} min watched</span>
          </div>
        )}
      </div>

      {/* LOCKED GATE */}
      {isLocked ? (
        <div className="mod-locked-gate">
          <div className="mod-locked-inner">
            <div className="mod-locked-glyph" style={{ borderColor: mod.colorVar, color: mod.colorVar }}>
              {mod.glyph}
            </div>
            <h2>Complete the previous modules first</h2>
            <p>This module unlocks after you finish Module {mod.id - 1}. You are making great progress.</p>
            {prevModule && (
              <Link href={`/modules/${prevModule.id}`} className="btn btn-primary btn-lg">
                Go to Module {prevModule.id}: {prevModule.title}
                <svg className="btn-arrow" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
            <div className="mod-locked-lessons">
              <div className="sidebar-label">Coming up in this module</div>
              {mod.lessons.map(l => (
                <div key={l.id} className="mod-locked-lesson">
                  <span className="lesson-num">{String(l.id).padStart(2, "0")}</span>
                  <span className="lesson-title-text">{l.title}</span>
                  <span className="lesson-dur-text">{l.duration} min</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* MAIN LAYOUT */
        <div className="mod-layout">
          {/* SIDEBAR */}
          <aside className="lesson-sidebar">
            <div className="sidebar-label">Lessons in this module</div>
            {mod.lessons.map(l => {
              const isActive = l.id === activeLesson.id
              const complete = isLessonComplete(l.id)
              const wp = getLessonWatchProgress(l.id)
              const derivedStatus = complete ? "complete" : wp > 0 ? "in-progress" : ""
              return (
                <button
                  key={l.id}
                  className={`lesson-item ${derivedStatus}${isActive ? " active" : ""}`}
                  onClick={() => setActiveLesson(l)}
                >
                  <span className="lesson-num">{String(l.id).padStart(2, "0")}</span>
                  <div>
                    <div className="lesson-title-text">{l.title}</div>
                    <div className="lesson-dur-text">{l.duration} min</div>
                  </div>
                  <span className="lesson-icon">
                    {complete ? "✓" : wp > 0 ? "▶" : "○"}
                  </span>
                </button>
              )
            })}

            {/* module nav */}
            <div className="mod-sidebar-nav">
              {prevModule && (
                <Link href={`/modules/${prevModule.id}`} className="mod-nav-link">
                  <span className="mod-nav-dir">← Previous</span>
                  <span className="mod-nav-title">{prevModule.title}</span>
                </Link>
              )}
              {nextModule && (
                <Link href={`/modules/${nextModule.id}`} className={`mod-nav-link ${nextModule.status === "locked" ? "locked" : ""}`}>
                  <span className="mod-nav-dir">Next module →</span>
                  <span className="mod-nav-title">{nextModule.title}</span>
                </Link>
              )}
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="lesson-main">
            {/* VIDEO PLAYER */}
            <div className="lesson-video-card">
              <div className="lesson-video-player lesson-video-embed">
                <iframe
                  key={activeLesson.id}
                  src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0&modestbranding=1`}
                  title={activeLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="lesson-video-source">
                  <span style={{ color: "var(--ink-4)", fontSize: 11 }}>
                    Educational video via YouTube · Khan Academy / Two Cents PBS
                  </span>
                </div>
              </div>

              <div className="lesson-body">
                <div className="lesson-body-top">
                  <div>
                    <h2 className="lesson-body-title">{activeLesson.title}</h2>
                    <div className="lesson-body-meta">
                      <span>Module {String(mod.id).padStart(2, "0")} · Lesson {String(activeLesson.id).padStart(2, "0")}</span>
                      <span>{activeLesson.duration} min</span>
                      {isLessonComplete(activeLesson.id) && <span style={{ color: 'var(--m2)' }}>✓ Watched</span>}
                    </div>
                  </div>
                  <div className="lesson-body-actions-inline">
                    {prevLesson && (
                      <button className="lesson-nav-btn" onClick={() => setActiveLesson(prevLesson)}>← Prev</button>
                    )}
                    {!isLessonComplete(activeLesson.id) && user && (
                      <button
                        className="lesson-nav-btn primary"
                        onClick={() => markComplete(activeLesson.id)}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Mark complete ✓"}
                      </button>
                    )}
                    {nextLesson && (
                      <button className="lesson-nav-btn primary" onClick={() => setActiveLesson(nextLesson)}>Next →</button>
                    )}
                  </div>
                </div>

                <div className="lesson-scrubber">
                  <div className="lesson-scrubber-fill" style={{ width: `${effectiveWatchProgress}%` }} />
                </div>
                <div className="lesson-scrubber-foot">
                  <span>{effectiveWatchProgress}% complete</span>
                  <span>{activeLesson.duration - Math.round((effectiveWatchProgress / 100) * activeLesson.duration)} min remaining</span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="lesson-desc-card">
              <div className="kicker" style={{ marginBottom: 16 }}>About this module</div>
              <p className="lesson-desc-text">{mod.description}</p>
            </div>

            {/* KEY TAKEAWAYS */}
            <div className="takeaways-card">
              <div className="kicker" style={{ marginBottom: 24 }}>Key takeaways</div>
              <ul className="takeaways-list">
                {mod.takeaways.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            {saveError && (
              <div className="lesson-save-error">{saveError}</div>
            )}

            {/* ACTIONS */}
            <div className="lesson-actions-card">
              <Link href={`/modules/${mod.id}/quiz`} className="lesson-action-btn primary">
                <span className="action-btn-label">Take the quiz</span>
                <span className="action-btn-sub">{mod.quizCount} questions · ~{Math.round(mod.quizCount * 0.75)} min</span>
              </Link>
              <button className="lesson-action-btn" onClick={() => generateNotes(mod)}>
                <span className="action-btn-label">Download notes</span>
                <span className="action-btn-sub">PDF · 1 page · free</span>
              </button>
            </div>
          </main>
        </div>
      )}

      {/* NEXT MODULE BANNER */}
      {nextModule && !isLocked && (
        <div className="mod-next-banner">
          <Link href={`/modules/${nextModule.id}`} className="mod-next-inner">
            <div>
              <div className="mod-next-label">Up next</div>
              <div className="mod-next-title">
                Module {String(nextModule.id).padStart(2, "0")} · <em>{nextModule.title}</em>
              </div>
              <div className="mod-next-tag">{nextModule.tagline}</div>
            </div>
            <div className="mod-next-glyph" style={{
              background: nextModule.status === "locked" ? "transparent" : nextModule.colorVar,
              border: nextModule.status === "locked" ? `1.5px solid ${nextModule.colorHex}` : "none",
              color: nextModule.status === "locked" ? nextModule.colorHex : "var(--bg)",
            }}>
              {nextModule.glyph}
            </div>
          </Link>
        </div>
      )}

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
            <h5>About</h5>
            <div className="footer-links">
              <a href="#">Our mission</a>
              <a href="#">Curriculum board</a>
              <a href="#">Donate</a>
              <a href="#">Press</a>
            </div>
          </div>
          <div>
            <h5>Help</h5>
            <div className="footer-links">
              <a href="#">FAQ</a>
              <a href="mailto:privacy@cashcourse.org">Contact</a>
              <a href="#">Accessibility</a>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Coin Course · A free financial literacy project</span>
          <span>Made for learners 10 to 100</span>
        </div>
      </footer>
    </div>
  )
}
