"use client"

// Frontend  -  Homepage

import { useEffect } from "react"
import Link from "next/link"
import NavBar from "@/components/NavBar"

export default function CashCoursePage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.08 }
    )
    document.querySelectorAll(".reveal, .modules").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          <span><span className="dot">●</span> Free forever</span>
          <span>8 modules</span>
          <span>Self-paced</span>
          <span>Ages 10 to 100</span>
          <span><span className="dot">●</span> A free financial literacy project</span>
          <span>No credit card</span>
          <span>Video · Quiz · Notes · Progress</span>
          <span><span className="dot">●</span> Free forever</span>
          <span>8 modules</span>
          <span>Self-paced</span>
          <span>Ages 10 to 100</span>
          <span><span className="dot">●</span> A free financial literacy project</span>
          <span>No credit card</span>
          <span>Video · Quiz · Notes · Progress</span>
        </div>
      </div>

      <NavBar />

      {/* HERO */}
      <section className="hero">
        <svg className="float-coin fc-1" width="68" height="68" viewBox="0 0 68 68">
          <circle cx="34" cy="34" r="28" fill="#ffce3a" stroke="#0c0a07" strokeWidth="2" />
          <circle cx="34" cy="34" r="22" fill="none" stroke="#0c0a07" strokeWidth="1" strokeDasharray="3 4" />
          <text x="34" y="44" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontWeight={600} fontSize="28" fill="#0c0a07">$</text>
        </svg>
        <svg className="float-coin fc-2" width="40" height="40" viewBox="0 0 40 40">
          <path d="M20 4 L23 16 L35 16 L25 23 L29 35 L20 27 L11 35 L15 23 L5 16 L17 16 Z" fill="#b48cff" stroke="#0c0a07" strokeWidth="1.5" />
        </svg>
        <svg className="float-coin fc-3" width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="21" fill="#6dd497" stroke="#0c0a07" strokeWidth="2" />
          <path d="M16 25 L22 31 L34 19" stroke="#0c0a07" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="eyebrow">Coin Course · Est. 2026</div>

        <div className="hero-grid">
          <h1>
            Money skills,<br />
            <span className="ital-color">finally</span> taught<br />
            <span className="marker">well.</span>
          </h1>
          <div className="hero-side">
            <p className="hero-sub">
              Eight short modules covering everything from your first allowance to your first 401(k). Watch a video, take a quiz, save the notes, track your progress. <b>Built for learners 10 to 100.</b> Free, forever.
            </p>
            <div className="hero-cta">
              <Link href="/modules/1" className="btn btn-primary btn-lg">
                Start with Module 1
                <svg className="btn-arrow" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a href="#how" className="btn btn-lg">
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M3 2 L12 7 L3 12 Z" fill="currentColor" />
                </svg>
                How it works
              </a>
            </div>
          </div>
        </div>

        {/* 8-cell module strip */}
        <div className="hero-art">
          <div className="hero-art-cell">
            <div className="num">01</div>
            <div className="hero-art-glyph" style={{ background: 'var(--m1)' }}>
              <svg width="32" height="32" viewBox="0 0 32 32">
                <text x="16" y="24" textAnchor="middle" fontFamily="Instrument Serif" fontStyle="italic" fontWeight={500} fontSize="26" fill="#0c0a07">$</text>
              </svg>
            </div>
            <div className="name">Money Basics</div>
          </div>
          <div className="hero-art-cell">
            <div className="num">02</div>
            <div className="hero-art-glyph" style={{ background: 'var(--m2)' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#0c0a07" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 22 L12 14 L18 18 L26 8" />
                <path d="M20 8 L26 8 L26 14" />
              </svg>
            </div>
            <div className="name">Saving</div>
          </div>
          <div className="hero-art-cell">
            <div className="num">03</div>
            <div className="hero-art-glyph" style={{ background: 'var(--m3)' }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="11" width="24" height="16" rx="2" stroke="#0c0a07" strokeWidth="2.4" />
                <path d="M6 16h24" stroke="#0c0a07" strokeWidth="2.4" />
                <path d="M10 22h4" stroke="#0c0a07" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="name">Credit &amp; Debt</div>
          </div>
          <div className="hero-art-cell">
            <div className="num">04</div>
            <div className="hero-art-glyph" style={{ background: 'var(--m4)' }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 7 L29 13 L29 15 L7 15 L7 13 Z" fill="#0c0a07" />
                <path d="M10 17 L10 25 M14 17 L14 25 M22 17 L22 25 M26 17 L26 25" stroke="#0c0a07" strokeWidth="2" />
                <path d="M7 27 L29 27" stroke="#0c0a07" strokeWidth="2.4" />
              </svg>
            </div>
            <div className="name">Banking</div>
          </div>
          <div className="hero-art-cell">
            <div className="num">05</div>
            <div className="hero-art-glyph" style={{ background: 'var(--m5)' }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M6 26 L13 18 L19 22 L30 8" stroke="#0c0a07" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 8 L30 8 L30 16" stroke="#0c0a07" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="name">Investing</div>
          </div>
          <div className="hero-art-cell">
            <div className="num">06</div>
            <div className="hero-art-glyph" style={{ background: 'var(--m6)' }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 6 L7 10 L7 18 C7 24 12 28 18 30 C24 28 29 24 29 18 L29 10 Z" stroke="#0c0a07" strokeWidth="2.4" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="name">Insurance</div>
          </div>
          <div className="hero-art-cell">
            <div className="num">07</div>
            <div className="hero-art-glyph" style={{ background: 'var(--m7)' }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 7 L9 18 L9 28 L17 28 L17 22 L19 22 L19 28 L27 28 L27 18 Z" stroke="#0c0a07" strokeWidth="2.4" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="name">Big Decisions</div>
          </div>
          <div className="hero-art-cell">
            <div className="num">08</div>
            <div className="hero-art-glyph" style={{ background: 'var(--bg)', border: '1.5px solid var(--m1)' }}>
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="10" fill="none" stroke="#ffce3a" strokeWidth="2.4" />
                <text x="18" y="23" textAnchor="middle" fontFamily="Instrument Serif" fontWeight={500} fontStyle="italic" fontSize="14" fill="#ffce3a">∞</text>
              </svg>
            </div>
            <div className="name">Long-Term</div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="section" id="modules">
        <div className="section-head reveal">
          <div>
            <div className="kicker">The curriculum · 008 modules</div>
            <h2>Eight modules.<br /><span className="ital-gold">One real-world toolkit.</span></h2>
          </div>
          <p className="section-sub">Every module pairs a short video with an interactive quiz, downloadable notes, and progress tracking. Around 25 minutes each. The whole curriculum takes about a weekend.</p>
        </div>

        <div className="modules">
          <div className="modules-row">
            <Link href="/modules/1" className="module m-1">
              <div className="module-num">01 / 08</div>
              <div className="module-glyph">$</div>
              <h3>Money Basics</h3>
              <p>What money actually is, where it comes from, and why prices change. The foundation everything else stands on.</p>
              <div className="module-foot">
                <div className="bits"><span>22 MIN</span><span>8 QUIZ</span></div>
                <div className="arrow">→</div>
              </div>
            </Link>
            <Link href="/modules/2" className="module m-2">
              <div className="module-num">02 / 08</div>
              <div className="module-glyph">+</div>
              <h3>Saving</h3>
              <p>Pay yourself first. Build an emergency fund, set goal-based savings buckets, and beat lifestyle creep before it starts.</p>
              <div className="module-foot">
                <div className="bits"><span>24 MIN</span><span>10 QUIZ</span></div>
                <div className="arrow">→</div>
              </div>
            </Link>
            <Link href="/modules/3" className="module m-3">
              <div className="module-num">03 / 08</div>
              <div className="module-glyph">%</div>
              <h3>Credit &amp; Debt</h3>
              <p>How credit scores really work, when debt helps you, when it eats you, and how to climb out fast if you&apos;re already in.</p>
              <div className="module-foot">
                <div className="bits"><span>28 MIN</span><span>12 QUIZ</span></div>
                <div className="arrow">→</div>
              </div>
            </Link>
            <Link href="/modules/4" className="module m-4">
              <div className="module-num">04 / 08</div>
              <div className="module-glyph">⌂</div>
              <h3>Banking &amp; Income</h3>
              <p>Checking versus savings, direct deposit, taxes on your paycheck, and how to actually read a real bank statement.</p>
              <div className="module-foot">
                <div className="bits"><span>25 MIN</span><span>9 QUIZ</span></div>
                <div className="arrow">→</div>
              </div>
            </Link>
          </div>
          <div className="modules-row">
            <Link href="/modules/5" className="module m-5">
              <div className="module-num">05 / 08</div>
              <div className="module-glyph">↗</div>
              <h3>Investing</h3>
              <p>Compound growth, index funds, risk versus return. Explained with napkin math, not jargon and not hot takes.</p>
              <div className="module-foot">
                <div className="bits"><span>32 MIN</span><span>14 QUIZ</span></div>
                <div className="arrow">→</div>
              </div>
            </Link>
            <Link href="/modules/6" className="module m-6">
              <div className="module-num">06 / 08</div>
              <div className="module-glyph">◊</div>
              <h3>Insurance</h3>
              <p>Health, auto, renters, life. What you actually need at each life stage, and what is a costly upsell in disguise.</p>
              <div className="module-foot">
                <div className="bits"><span>26 MIN</span><span>10 QUIZ</span></div>
                <div className="arrow">→</div>
              </div>
            </Link>
            <Link href="/modules/7" className="module m-7">
              <div className="module-num">07 / 08</div>
              <div className="module-glyph">?</div>
              <h3>Big Decisions</h3>
              <p>Renting versus buying, lease versus purchase, the true cost of college. Frameworks for the choices that move the needle.</p>
              <div className="module-foot">
                <div className="bits"><span>30 MIN</span><span>11 QUIZ</span></div>
                <div className="arrow">→</div>
              </div>
            </Link>
            <Link href="/modules/8" className="module m-8">
              <div className="module-num">08 / 08</div>
              <div className="module-glyph">∞</div>
              <h3>Long-Term Wealth</h3>
              <p>Retirement accounts, real estate, building generational stability. The endgame, demystified and made boring on purpose.</p>
              <div className="module-foot">
                <div className="bits"><span>34 MIN</span><span>15 QUIZ</span></div>
                <div className="arrow">→</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-head reveal">
          <div>
            <div className="kicker">How a lesson works</div>
            <h2>Watch. Quiz.<br /><span className="ital-gold">Notes. Repeat.</span></h2>
          </div>
          <p className="section-sub">A familiar rhythm in every module. No homework, no grades, no upsells. Just the four things that actually make information stick.</p>
        </div>

        <div className="how-grid reveal">
          <div className="how-steps">
            <div className="step">
              <div className="step-num">i</div>
              <div>
                <h4>Watch the video</h4>
                <p>Short, illustrated, and hosted by people who do not talk down to you. Around twenty-five minutes per module.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">ii</div>
              <div>
                <h4>Take the quiz</h4>
                <p>Interactive, no grades, just instant feedback. Answer wrong and you get the why, not just the right answer.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">iii</div>
              <div>
                <h4>Save the notes</h4>
                <p>A clean one-pager PDF you can print, mark up, or keep on your phone. Yours forever, no account required.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">iv</div>
              <div>
                <h4>Track your progress</h4>
                <p>See your streak, modules done, badges earned. Pick up exactly where you left off, on any device.</p>
              </div>
            </div>
          </div>

          <div className="preview">
            <div className="preview-video">
              <div className="preview-scan" />
              <span className="preview-tag">
                <span className="live-dot" />Now playing
              </span>
              <button className="play-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginLeft: '4px' }}>
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
      </section>

      {/* AUDIENCE */}
      <section className="section" id="audience">
        <div className="section-head reveal">
          <div>
            <div className="kicker">Who it&apos;s for</div>
            <h2>One platform.<br /><span className="ital-gold">Every life stage.</span></h2>
          </div>
          <p className="section-sub">We do not dumb things down. We just explain them well. The same modules work whether you are eleven or fifty-one. Different starting points, same destination.</p>
        </div>

        <div className="learners reveal">
          <div className="learner">
            <span className="learner-age">Ages 10 to 14</span>
            <svg className="learner-portrait" viewBox="0 0 88 88" fill="none">
              <rect width="88" height="88" rx="44" fill="#ffce3a" />
              <circle cx="44" cy="38" r="13" fill="#0c0a07" />
              <path d="M22 78 C 22 64, 34 58, 44 58 C 54 58, 66 64, 66 78 Z" fill="#0c0a07" />
              <circle cx="40" cy="36" r="2" fill="#ffce3a" />
              <circle cx="48" cy="36" r="2" fill="#ffce3a" />
              <path d="M40 42 Q 44 45, 48 42" stroke="#ffce3a" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <h4>Curious <span className="ital">kids</span></h4>
            <p>Allowance, saving for the thing you want, why a $20 game costs $20 not $19. Parent dashboards keep grown-ups in the loop.</p>
            <div className="learner-modules">
              <span className="tag"><span className="swatch" style={{ background: 'var(--m1)' }} />Money Basics</span>
              <span className="tag"><span className="swatch" style={{ background: 'var(--m2)' }} />Saving</span>
              <span className="tag"><span className="swatch" style={{ background: 'var(--m4)' }} />Banking</span>
            </div>
          </div>
          <div className="learner">
            <span className="learner-age">Ages 15 to 22</span>
            <svg className="learner-portrait" viewBox="0 0 88 88" fill="none">
              <rect width="88" height="88" rx="44" fill="#ffa066" />
              <circle cx="44" cy="38" r="13" fill="#0c0a07" />
              <path d="M22 78 C 22 64, 34 58, 44 58 C 54 58, 66 64, 66 78 Z" fill="#0c0a07" />
              <circle cx="40" cy="36" r="2" fill="#ffa066" />
              <circle cx="48" cy="36" r="2" fill="#ffa066" />
              <path d="M39 44 L 49 44" stroke="#ffa066" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M30 28 L58 28" stroke="#ffa066" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h4>First-job <span className="ital">learners</span></h4>
            <p>Your first paycheck, the taxes that confused you, FAFSA, credit card traps. The stuff that hits the moment adulthood starts.</p>
            <div className="learner-modules">
              <span className="tag"><span className="swatch" style={{ background: 'var(--m3)' }} />Credit &amp; Debt</span>
              <span className="tag"><span className="swatch" style={{ background: 'var(--m4)' }} />Banking</span>
              <span className="tag"><span className="swatch" style={{ background: 'var(--m7)' }} />Big Decisions</span>
            </div>
          </div>
          <div className="learner">
            <span className="learner-age">Ages 23 and up</span>
            <svg className="learner-portrait" viewBox="0 0 88 88" fill="none">
              <rect width="88" height="88" rx="44" fill="#b48cff" />
              <circle cx="44" cy="38" r="13" fill="#0c0a07" />
              <path d="M22 78 C 22 64, 34 58, 44 58 C 54 58, 66 64, 66 78 Z" fill="#0c0a07" />
              <circle cx="40" cy="36" r="2" fill="#b48cff" />
              <circle cx="48" cy="36" r="2" fill="#b48cff" />
              <path d="M40 43 Q 44 41, 48 43" stroke="#b48cff" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M34 30 Q 38 26, 42 28" stroke="#b48cff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M46 28 Q 50 26, 54 30" stroke="#b48cff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            </svg>
            <h4>Adults <span className="ital">catching up</span></h4>
            <p>It is never too late. Investing, insurance, retirement, the topics nobody actually taught you, in plain language.</p>
            <div className="learner-modules">
              <span className="tag"><span className="swatch" style={{ background: 'var(--m5)' }} />Investing</span>
              <span className="tag"><span className="swatch" style={{ background: 'var(--m6)' }} />Insurance</span>
              <span className="tag"><span className="swatch" style={{ background: 'var(--m1)' }} />Long-Term</span>
            </div>
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner reveal">
          <div>
            <div className="kicker" style={{ marginBottom: '24px' }}>Get started</div>
            <h2>Free.<br />Stay <span className="ital">free.</span><br />Forever.</h2>
            <p>No credit card. No trial. No upsell. Coin Course is funded so you do not have to fund it. Pick a module and start in thirty seconds.</p>
            <Link href="/modules/1" className="btn btn-primary btn-lg">
              Start with Money Basics
              <svg className="btn-arrow" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="cta-illust">
            <svg width="320" height="280" viewBox="0 0 320 280" fill="none">
              <ellipse cx="160" cy="252" rx="120" ry="14" fill="#0c0a07" opacity="0.18" />
              <g>
                <ellipse cx="160" cy="216" rx="92" ry="20" fill="#0c0a07" />
                <rect x="68" y="190" width="184" height="26" fill="#0c0a07" />
                <ellipse cx="160" cy="190" rx="92" ry="20" fill="#ffce3a" stroke="#0c0a07" strokeWidth="2.5" />
                <ellipse cx="160" cy="190" rx="80" ry="14" fill="none" stroke="#0c0a07" strokeWidth="1" strokeDasharray="3 4" />
                <text x="160" y="198" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontWeight={600} fontSize="22" fill="#0c0a07">$</text>
              </g>
              <g>
                <ellipse cx="160" cy="166" rx="78" ry="17" fill="#0c0a07" />
                <rect x="82" y="142" width="156" height="24" fill="#0c0a07" />
                <ellipse cx="160" cy="142" rx="78" ry="17" fill="#ffce3a" stroke="#0c0a07" strokeWidth="2.5" />
                <ellipse cx="160" cy="142" rx="68" ry="11" fill="none" stroke="#0c0a07" strokeWidth="1" strokeDasharray="3 4" />
                <text x="160" y="149" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontWeight={600} fontSize="20" fill="#0c0a07">$</text>
              </g>
              <g>
                <ellipse cx="160" cy="120" rx="64" ry="14" fill="#0c0a07" />
                <rect x="96" y="98" width="128" height="22" fill="#0c0a07" />
                <ellipse cx="160" cy="98" rx="64" ry="14" fill="#ffce3a" stroke="#0c0a07" strokeWidth="2.5" />
                <ellipse cx="160" cy="98" rx="55" ry="9" fill="none" stroke="#0c0a07" strokeWidth="1" strokeDasharray="3 4" />
                <text x="160" y="104" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontWeight={600} fontSize="18" fill="#0c0a07">$</text>
              </g>
              <g transform="translate(248, 56) rotate(22)">
                <circle cx="0" cy="0" r="26" fill="#ffce3a" stroke="#0c0a07" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="20" fill="none" stroke="#0c0a07" strokeWidth="1" strokeDasharray="3 4" />
                <text x="0" y="8" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontWeight={600} fontSize="22" fill="#0c0a07">$</text>
              </g>
              <path d="M50 50 L52 44 L54 50 L60 52 L54 54 L52 60 L50 54 L44 52 Z" fill="#0c0a07" />
              <path d="M280 156 L282 150 L284 156 L290 158 L284 160 L282 166 L280 160 L274 158 Z" fill="#0c0a07" />
              <path d="M44 180 L46 175 L48 180 L53 182 L48 184 L46 189 L44 184 L39 182 Z" fill="#0c0a07" />
            </svg>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="brand" style={{ marginBottom: '6px' }}>
              <div className="coin">$</div>
              Coin Course
            </div>
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
    </>
  )
}
