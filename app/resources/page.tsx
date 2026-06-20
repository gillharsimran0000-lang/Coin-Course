"use client"

import Link from "next/link"
import NavBar from "@/components/NavBar"

const TOOLS = [
  {
    label: "Budgeting & Saving",
    items: [
      { name: "50/30/20 Budget Calculator", href: "https://www.nerdwallet.com/article/finance/nerdwallet-50-30-20-budget-calculator", desc: "Instantly split your take-home pay into needs, wants, and savings." },
      { name: "Mint (Intuit)", href: "https://mint.intuit.com", desc: "Connect your accounts and track spending automatically." },
      { name: "YNAB", href: "https://www.youneedabudget.com", desc: "Zero-based budgeting for people who want every dollar to have a job." },
    ],
  },
  {
    label: "Credit & Debt",
    items: [
      { name: "AnnualCreditReport.com", href: "https://www.annualcreditreport.com", desc: "Pull your free credit report from all three bureaus once a year." },
      { name: "Credit Karma", href: "https://www.creditkarma.com", desc: "Free credit score monitoring and personalized tips." },
      { name: "CFPB – Debt Collection", href: "https://www.consumerfinance.gov/consumer-tools/debt-collection/", desc: "Know your rights when debt collectors call." },
    ],
  },
  {
    label: "Investing",
    items: [
      { name: "Investor.gov (SEC)", href: "https://www.investor.gov", desc: "Compound interest calculator and unbiased investing basics from the SEC." },
      { name: "Bogleheads Wiki", href: "https://www.bogleheads.org/wiki/Main_Page", desc: "Community-maintained guide to low-cost index-fund investing." },
      { name: "Khan Academy – Finance", href: "https://www.khanacademy.org/economics-finance-domain/core-finance", desc: "Free videos on everything from stocks to options to macroeconomics." },
    ],
  },
  {
    label: "Banking & Taxes",
    items: [
      { name: "FDIC BankFind Suite", href: "https://banks.data.fdic.gov/", desc: "Verify that any bank is federally insured before you deposit." },
      { name: "IRS Free File", href: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free", desc: "File federal taxes for free if you earn under the income cap." },
      { name: "MyMoney.gov", href: "https://www.mymoney.gov", desc: "Official U.S. government financial literacy portal." },
    ],
  },
  {
    label: "Insurance",
    items: [
      { name: "HealthCare.gov", href: "https://www.healthcare.gov", desc: "Shop and compare health insurance plans in the federal marketplace." },
      { name: "NAIC Consumer Tools", href: "https://content.naic.org/consumer", desc: "Insurance basics, complaint lookups, and agent license checks." },
    ],
  },
  {
    label: "Big Decisions & Retirement",
    items: [
      { name: "SSA.gov – My Account", href: "https://www.ssa.gov/myaccount/", desc: "See your projected Social Security benefit at any age." },
      { name: "IRS Retirement Plans", href: "https://www.irs.gov/retirement-plans", desc: "Official contribution limits and rules for 401(k), IRA, and Roth accounts." },
      { name: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov", desc: "Free tools for mortgages, student loans, and financial complaints." },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="resources-page">
      <NavBar />

      <section className="resources-hero">
        <div className="kicker">Free resources</div>
        <h1>The toolkit.<br /><span className="ital-color">All in one place.</span></h1>
        <p className="resources-sub">
          Every link on this page is free, trusted, and chosen because it adds something the modules cannot — real calculators, live data, and government tools you will actually use.
        </p>
      </section>

      <div className="resources-grid-wrap">
        {TOOLS.map(group => (
          <div key={group.label} className="resources-group">
            <div className="resources-group-label">{group.label}</div>
            <div className="resources-cards">
              {group.items.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card"
                >
                  <div className="resource-card-top">
                    <span className="resource-card-name">{item.name}</span>
                    <svg className="resource-card-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="resource-card-desc">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
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
              <Link href="/#modules">All 8 modules</Link>
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
