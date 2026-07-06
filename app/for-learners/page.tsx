import Link from "next/link"
import NavBar from "@/components/NavBar"

const GROUPS = [
  {
    age: "Ages 7 to 14",
    fill: "#ffce3a",
    eyeFill: "#ffce3a",
    mouthPath: "M40 42 Q 44 45, 48 42",
    title: "Curious",
    titleItal: "kids",
    body: "Allowance, saving for the thing you want, why a $20 game costs $20 not $19. Parent dashboards keep grown-ups in the loop.",
    modules: [
      { label: "Money Basics", color: "var(--m1)" },
      { label: "Saving", color: "var(--m2)" },
      { label: "Banking", color: "var(--m4)" },
    ],
  },
  {
    age: "Ages 15 to 22",
    fill: "#ffa066",
    eyeFill: "#ffa066",
    mouthPath: "M39 44 L 49 44",
    title: "First-job",
    titleItal: "learners",
    body: "Your first paycheck, the taxes that confused you, FAFSA, credit card traps. The stuff that hits the moment adulthood starts.",
    modules: [
      { label: "Credit & Debt", color: "var(--m3)" },
      { label: "Banking", color: "var(--m4)" },
      { label: "Big Decisions", color: "var(--m7)" },
    ],
  },
  {
    age: "Ages 23 and up",
    fill: "#b48cff",
    eyeFill: "#b48cff",
    mouthPath: "M40 43 Q 44 41, 48 43",
    title: "Adults",
    titleItal: "catching up",
    body: "It is never too late. Investing, insurance, retirement. The topics nobody actually taught you, in plain language.",
    modules: [
      { label: "Investing", color: "var(--m5)" },
      { label: "Insurance", color: "var(--m6)" },
      { label: "Long-Term", color: "var(--m1)" },
    ],
  },
]

export default function ForLearnersPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <section className="fl-hero">
        <div className="kicker">Who it&apos;s for</div>
        <h1>One platform.<br /><span className="ital-gold">Every life stage.</span></h1>
        <p className="fl-sub">We do not dumb things down. We just explain them well. The same modules work whether you are seven or fifty-one.</p>
      </section>

      <div className="fl-body">
        <div className="learners">
          {GROUPS.map(g => (
            <div key={g.age} className="learner">
              <span className="learner-age">{g.age}</span>
              <svg className="learner-portrait" viewBox="0 0 88 88" fill="none">
                <rect width="88" height="88" rx="44" fill={g.fill} />
                <circle cx="44" cy="38" r="13" fill="#0c0a07" />
                <path d="M22 78 C 22 64, 34 58, 44 58 C 54 58, 66 64, 66 78 Z" fill="#0c0a07" />
                <circle cx="40" cy="36" r="2" fill={g.eyeFill} />
                <circle cx="48" cy="36" r="2" fill={g.eyeFill} />
                <path d={g.mouthPath} stroke={g.eyeFill} strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <h4>{g.title} <span className="ital">{g.titleItal}</span></h4>
              <p>{g.body}</p>
              <div className="learner-modules">
                {g.modules.map(m => (
                  <span key={m.label} className="tag">
                    <span className="swatch" style={{ background: m.color }} />
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="fl-cta">
          <Link href="/modules/1" className="btn btn-primary btn-lg">
            Start with Module 1
            <svg className="btn-arrow" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/modules" className="btn btn-lg">See all 8 modules</Link>
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
          <span>Harsimran Gill & Ashwin Sivakumar</span>
        </div>
      </footer>
    </div>
  )
}
