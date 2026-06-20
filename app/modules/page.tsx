import Link from "next/link"
import NavBar from "@/components/NavBar"

const MODULES = [
  { id: 1, cls: "m-1", glyph: "$", title: "Money Basics", desc: "What money actually is, where it comes from, and why prices change. The foundation everything else stands on.", time: "22 MIN", quiz: "8 QUIZ" },
  { id: 2, cls: "m-2", glyph: "+", title: "Saving", desc: "Pay yourself first. Build an emergency fund, set goal-based savings buckets, and beat lifestyle creep before it starts.", time: "24 MIN", quiz: "10 QUIZ" },
  { id: 3, cls: "m-3", glyph: "%", title: "Credit & Debt", desc: "How credit scores really work, when debt helps you, when it eats you, and how to climb out fast if you're already in.", time: "28 MIN", quiz: "12 QUIZ" },
  { id: 4, cls: "m-4", glyph: "⌂︎", title: "Banking & Income", desc: "Checking versus savings, direct deposit, taxes on your paycheck, and how to actually read a real bank statement.", time: "25 MIN", quiz: "9 QUIZ" },
  { id: 5, cls: "m-5", glyph: "↗︎", title: "Investing", desc: "Compound growth, index funds, risk versus return. Explained with napkin math, not jargon and not hot takes.", time: "32 MIN", quiz: "14 QUIZ" },
  { id: 6, cls: "m-6", glyph: "◊︎", title: "Insurance", desc: "Health, auto, renters, life. What you actually need at each life stage, and what is a costly upsell in disguise.", time: "26 MIN", quiz: "10 QUIZ" },
  { id: 7, cls: "m-7", glyph: "?", title: "Big Decisions", desc: "Renting versus buying, lease versus purchase, the true cost of college. Frameworks for the choices that move the needle.", time: "30 MIN", quiz: "11 QUIZ" },
  { id: 8, cls: "m-8", glyph: "∞︎", title: "Long-Term Wealth", desc: "Retirement accounts, real estate, building generational stability. The endgame, demystified and made boring on purpose.", time: "34 MIN", quiz: "15 QUIZ" },
]

export default function ModulesPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <section className="modules-page-hero">
        <div className="kicker">The curriculum</div>
        <h1>Eight modules.<br /><span className="ital-gold">One real-world toolkit.</span></h1>
        <p className="modules-page-sub">Every module pairs a short video with an interactive quiz, downloadable notes, and progress tracking. Around 25 minutes each.</p>
      </section>

      <div className="modules-page-grid">
        <div className="modules">
          <div className="modules-row">
            {MODULES.slice(0, 4).map(m => (
              <Link key={m.id} href={`/modules/${m.id}`} className={`module ${m.cls}`}>
                <div className="module-num">0{m.id} / 08</div>
                <div className="module-glyph">{m.glyph}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <div className="module-foot">
                  <div className="bits"><span>{m.time}</span><span>{m.quiz}</span></div>
                  <div className="arrow">→</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="modules-row">
            {MODULES.slice(4).map(m => (
              <Link key={m.id} href={`/modules/${m.id}`} className={`module ${m.cls}`}>
                <div className="module-num">0{m.id} / 08</div>
                <div className="module-glyph">{m.glyph}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <div className="module-foot">
                  <div className="bits"><span>{m.time}</span><span>{m.quiz}</span></div>
                  <div className="arrow">→</div>
                </div>
              </Link>
            ))}
          </div>
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
