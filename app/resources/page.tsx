"use client"

import Link from "next/link"
import { useState } from "react"
import NavBar from "@/components/NavBar"

const GLOSSARY = [
  { term: "Compound Interest", def: "Interest earned on both your original deposit and the interest already accumulated. The reason starting early matters so much: time multiplies everything." },
  { term: "Net Worth", def: "What you own minus what you owe. Assets (cash, investments, property) minus liabilities (loans, credit card debt). The real number that tracks your financial progress." },
  { term: "Emergency Fund", def: "Three to six months of essential expenses kept in a liquid savings account. The buffer that keeps one bad month from becoming a financial crisis." },
  { term: "Credit Score", def: "A number from 300 to 850 that represents how reliably you repay debt. Lenders, landlords, and sometimes employers use it. Payment history is the biggest factor." },
  { term: "APR", def: "Annual Percentage Rate. The true yearly cost of borrowing money, including fees. Higher APR on a credit card balance means more money out of your pocket each month." },
  { term: "Index Fund", def: "A fund that tracks a market index like the S&P 500 instead of trying to beat it. Lower fees and historically better long-term returns than most actively managed funds." },
  { term: "401(k)", def: "An employer-sponsored retirement account where contributions come out of your paycheck pre-tax. Many employers match a percentage. That match is free money, so take it." },
  { term: "Roth IRA", def: "A retirement account you fund with after-tax money. Withdrawals in retirement are tax-free. Better than a traditional IRA if you expect to be in a higher tax bracket later." },
  { term: "Inflation", def: "The rate at which prices rise over time. At 3% annual inflation, $100 today buys what $97 buys next year. Why keeping cash under a mattress loses value." },
  { term: "Liquidity", def: "How quickly you can convert an asset to cash without losing value. Your checking account is highly liquid. A house is not." },
  { term: "Diversification", def: "Spreading investments across different assets so one bad investment does not sink everything. The financial version of not putting all your eggs in one basket." },
  { term: "Deductible", def: "The amount you pay out-of-pocket before your insurance kicks in. A higher deductible means lower monthly premiums but more cost when you actually make a claim." },
]

const TIPS = [
  { cat: "Saving", color: "var(--m2)", tips: [
    "Pay yourself first: move money to savings the day you get paid, before you spend anything.",
    "Automate transfers so saving requires no willpower.",
    "Save raises and bonuses before you adjust your lifestyle to them.",
    "Keep your emergency fund in a high-yield savings account, not a checking account.",
  ]},
  { cat: "Credit", color: "var(--m3)", tips: [
    "Pay your full statement balance every month. Carrying a balance costs you in interest.",
    "Keep your credit utilization below 30%. Below 10% is even better.",
    "The age of your oldest account matters. Do not close old cards unless they have high fees.",
    "Check your credit report at annualcreditreport.com once a year for errors.",
  ]},
  { cat: "Investing", color: "var(--m5)", tips: [
    "Always contribute enough to get your full employer 401(k) match. It is an instant 50–100% return.",
    "Time in the market beats timing the market. Invest consistently and do not panic-sell.",
    "Choose low-fee index funds over actively managed funds for long-term accounts.",
    "Increase your contribution rate by 1% every year until you hit 15% of your income.",
  ]},
  { cat: "Budgeting", color: "var(--m1)", tips: [
    "The 50/30/20 rule: 50% needs, 30% wants, 20% savings and debt. Adjust to your situation.",
    "Track spending for one month before making a budget. Most people underestimate by 30%.",
    "Cancel subscriptions you forgot you had. Most people waste $50–$100/month on them.",
    "Wait 48 hours before buying anything over $50. Most impulse urges fade.",
  ]},
]

const CHECKLISTS = [
  {
    title: "First Paycheck",
    items: [
      "Set up direct deposit to a checking account",
      "Understand your pay stub: gross pay, net pay, and each deduction",
      "Contribute enough to your 401(k) to get the full employer match",
      "Open a high-yield savings account for your emergency fund",
      "Set up automatic transfers to savings on payday",
      "File your W-4 correctly to avoid a big tax bill in April",
    ],
  },
  {
    title: "Before Getting a Credit Card",
    items: [
      "Understand APR and what it costs to carry a balance",
      "Know your credit limit and plan to stay under 30% utilization",
      "Set up autopay for at least the minimum (aim for the full balance)",
      "Read the rewards structure and pick a card that matches your spending",
      "Understand the annual fee and whether the benefits justify it",
      "Check your credit report before applying so there are no surprises",
    ],
  },
  {
    title: "Monthly Money Review",
    items: [
      "Check all account balances and transaction history",
      "Confirm savings transfer happened",
      "Review spending against your budget categories",
      "Pay any outstanding credit card balance in full",
      "Check progress toward your current savings goal",
      "Cancel any subscriptions you did not use this month",
    ],
  },
]

function BudgetCalculator() {
  const [income, setIncome] = useState("")
  const num = parseFloat(income.replace(/,/g, "")) || 0
  const needs = num * 0.5
  const wants = num * 0.3
  const savings = num * 0.2

  return (
    <div className="calc-wrap">
      <div className="calc-input-row">
        <label className="calc-label">Monthly take-home pay</label>
        <div className="calc-input-shell">
          <span className="calc-dollar">$</span>
          <input
            className="calc-input"
            type="number"
            min="0"
            placeholder="0"
            value={income}
            onChange={e => setIncome(e.target.value)}
          />
        </div>
      </div>
      {num > 0 && (
        <div className="calc-results">
          <div className="calc-bar">
            <div className="calc-bar-seg" style={{ width: "50%", background: "var(--m4)" }} />
            <div className="calc-bar-seg" style={{ width: "30%", background: "var(--m5)" }} />
            <div className="calc-bar-seg" style={{ width: "20%", background: "var(--m2)" }} />
          </div>
          <div className="calc-rows">
            <div className="calc-row">
              <span className="calc-dot" style={{ background: "var(--m4)" }} />
              <span className="calc-cat">Needs (50%)</span>
              <span className="calc-amt">${needs.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="calc-row">
              <span className="calc-dot" style={{ background: "var(--m5)" }} />
              <span className="calc-cat">Wants (30%)</span>
              <span className="calc-amt">${wants.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="calc-row">
              <span className="calc-dot" style={{ background: "var(--m2)" }} />
              <span className="calc-cat">Savings (20%)</span>
              <span className="calc-amt">${savings.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ResourcesPage() {
  const [openGloss, setOpenGloss] = useState<string | null>(null)

  return (
    <div className="resources-page">
      <NavBar />

      <section className="resources-hero">
        <div className="kicker">Resources</div>
        <h1>The toolkit.<br /><span className="ital-color">All in one place.</span></h1>
        <p className="resources-sub">
          Key terms, quick tips, checklists, and a budget calculator: everything from the modules, condensed for quick reference.
        </p>
      </section>

      {/* BUDGET CALCULATOR */}
      <div className="res-section">
        <div className="res-section-label">50/30/20 Calculator</div>
        <h2 className="res-section-title">Figure out where your money goes.</h2>
        <p className="res-section-sub">Enter your monthly take-home pay and see how the 50/30/20 rule splits it. Adjust based on your actual situation.</p>
        <BudgetCalculator />
      </div>

      {/* GLOSSARY */}
      <div className="res-section">
        <div className="res-section-label">Key Terms</div>
        <h2 className="res-section-title">Words you need to know.</h2>
        <p className="res-section-sub">Plain definitions for the terms that show up in every financial conversation. No jargon to explain the jargon.</p>
        <div className="gloss-list">
          {GLOSSARY.map(g => (
            <div key={g.term} className="gloss-item">
              <button
                className="gloss-term"
                onClick={() => setOpenGloss(openGloss === g.term ? null : g.term)}
                aria-expanded={openGloss === g.term}
              >
                {g.term}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`gloss-chevron${openGloss === g.term ? " open" : ""}`}>
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openGloss === g.term && (
                <p className="gloss-def">{g.def}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* TIPS */}
      <div className="res-section">
        <div className="res-section-label">Quick Tips</div>
        <h2 className="res-section-title">Things to actually do.</h2>
        <p className="res-section-sub">Actionable moves, organized by topic. Each one matters more than it might seem.</p>
        <div className="tips-grid">
          {TIPS.map(t => (
            <div key={t.cat} className="tips-card">
              <div className="tips-card-cat" style={{ color: t.color }}>
                <span className="tips-dot" style={{ background: t.color }} />
                {t.cat}
              </div>
              <ul className="tips-list">
                {t.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CHECKLISTS */}
      <div className="res-section">
        <div className="res-section-label">Checklists</div>
        <h2 className="res-section-title">Step by step, when it counts.</h2>
        <p className="res-section-sub">Use these before big financial moments so you do not miss anything important.</p>
        <div className="checklists-grid">
          {CHECKLISTS.map(cl => (
            <div key={cl.title} className="checklist-card">
              <div className="checklist-title">{cl.title}</div>
              <ul className="checklist-items">
                {cl.items.map((item, i) => (
                  <li key={i}>
                    <span className="check-box" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <section className="resources-cta">
        <p>Ready to put this to use?</p>
        <Link href="/modules/1" className="btn btn-primary">
          Start with Module 1
          <svg className="btn-arrow" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

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
