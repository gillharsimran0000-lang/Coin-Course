import Link from "next/link"
import NavBar from "@/components/NavBar"

const STEPS = [
  {
    num: "i",
    title: "Watch the video",
    body: "Short, illustrated, and hosted by people who do not talk down to you. Around twenty-five minutes per module.",
  },
  {
    num: "ii",
    title: "Take the quiz",
    body: "Interactive, no grades, just instant feedback. Answer wrong and you get the why, not just the right answer.",
  },
  {
    num: "iii",
    title: "Save the notes",
    body: "A clean one-pager PDF you can print, mark up, or keep on your phone. Yours forever, no account required.",
  },
  {
    num: "iv",
    title: "Track your progress",
    body: "See your streak, modules done, badges earned. Pick up exactly where you left off, on any device.",
  },
]

export default function HowItWorksPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <section className="hiw-hero">
        <div className="kicker">How a lesson works</div>
        <h1>Watch. Quiz.<br /><span className="ital-gold">Notes. Repeat.</span></h1>
        <p className="hiw-sub">A familiar rhythm in every module. No homework, no grades, no upsells. Just the four things that actually make information stick.</p>
      </section>

      <div className="hiw-body">
        <div className="how-grid">
          <div className="how-steps">
            {STEPS.map(s => (
              <div key={s.num} className="step">
                <div className="step-num">{s.num}</div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="preview">
            <div className="preview-video">
              <span className="preview-tag">
                <span className="live-dot" />Now playing
              </span>
              <button className="play-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginLeft: "4px" }}>
                  <path d="M6 4 L20 12 L6 20 Z" fill="#0c0a07" />
                </svg>
              </button>
              <span className="preview-time">12:34 / 22:08</span>
            </div>
            <div className="preview-body">
              <h3>What is money, really?</h3>
              <div className="meta">
                <span>Module 01 · Lesson 2</span>
                <span>10 min</span>
              </div>
              <div className="progress-bar"><div /></div>
              <div className="preview-foot">
                <span>PROGRESS TRACKED</span>
                <span>PICK UP WHERE YOU LEFT OFF →</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hiw-cta">
          <Link href="/modules/1" className="btn btn-primary btn-lg">
            Start with Module 1
            <svg className="btn-arrow" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 6 }}>
              <div className="coin">$</div>
              Coin Course
            </Link>
            <p className="footer-tag">Free financial literacy for every age.</p>
          </div>
          <div>
            <h5>Learn</h5>
            <div className="footer-links">
              <Link href="/modules">All 8 modules</Link>
              <Link href="/resources">Resources</Link>
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
          <span>Made for learners 10 to 100</span>
        </div>
      </footer>
    </div>
  )
}
