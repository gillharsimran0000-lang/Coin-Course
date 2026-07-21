"use client"

// Frontend  -  Terms of service

import Link from "next/link"
import NavBar from "@/components/NavBar"

export default function TermsPage() {
  return (
    <div className="policy-page">
      <NavBar />

      <div className="policy-shell">
        <div className="policy-header">
          <div className="kicker">Legal</div>
          <h1>Terms of Service</h1>
          <p className="policy-meta">Last updated: May 2026 · Coin Course is a free financial literacy project.</p>
        </div>

        <div className="policy-body">

          <section>
            <h2>The short version</h2>
            <p>Coin Course is a free educational tool. Use it to learn about money, be respectful of the platform and other users, and remember that nothing here is professional financial advice. That's really the whole thing.</p>
          </section>

          <section>
            <h2>Using Coin Course</h2>
            <p>Coin Course is provided free of charge for personal, educational use. By creating an account or using the site, you agree to these terms. You must be at least 10 years old to use Coin Course; if you are under 18, we recommend a parent or guardian is aware you are using it.</p>
            <p>You agree to provide accurate information when creating an account and to keep your login credentials secure. You are responsible for activity that happens under your account.</p>
          </section>

          <section>
            <h2>Not financial advice</h2>
            <p>Coin Course is an educational resource. Lessons, quizzes, calculators, and the in-app game are meant to teach general financial concepts, not to tell you what to do with your own money. Nothing on this site is professional financial, investment, tax, or legal advice, and we are not licensed financial advisors.</p>
            <p>Always do your own research or talk to a qualified professional before making real financial decisions.</p>
          </section>

          <section>
            <h2>Acceptable use</h2>
            <p>When using Coin Course, you agree not to:</p>
            <ul>
              <li>Attempt to disrupt, hack, or reverse-engineer the platform.</li>
              <li>Use automated tools to scrape content or create accounts in bulk.</li>
              <li>Impersonate another person or misrepresent your affiliation with anyone.</li>
              <li>Use the platform for any unlawful purpose.</li>
            </ul>
            <p>We reserve the right to suspend or delete accounts that violate these terms.</p>
          </section>

          <section>
            <h2>Your content and progress</h2>
            <p>Your lesson progress, quiz scores, and any other data you generate while using Coin Course belong to you. See our <Link href="/privacy">Privacy Policy</Link> for details on what we collect and how it is used.</p>
          </section>

          <section>
            <h2>Intellectual property</h2>
            <p>The lessons, quizzes, illustrations, game, and other content on Coin Course belong to Coin Course and its founders. You may use them for your own learning, but you may not copy, redistribute, or sell them without permission.</p>
          </section>

          <section>
            <h2>No warranty</h2>
            <p>Coin Course is provided "as is," without warranties of any kind. We do our best to keep the platform accurate and available, but we do not guarantee it will be error-free, uninterrupted, or suitable for any particular purpose.</p>
          </section>

          <section>
            <h2>Limitation of liability</h2>
            <p>To the fullest extent permitted by law, Coin Course and its founders are not liable for any indirect, incidental, or consequential damages arising from your use of the platform, including any financial decisions made after using it.</p>
          </section>

          <section>
            <h2>Changes to Coin Course</h2>
            <p>We may add, change, or remove features, lessons, or parts of the platform at any time. We may also update these terms; if we make a material change, we will notify signed-in users by email at least 14 days before it takes effect. The date at the top of this page always reflects when it was last updated.</p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>Questions about these terms:</p>
            <p>
              <strong>Coin Course</strong><br />
              A free financial literacy project<br />
              <a href="mailto:coincourse8@gmail.com">coincourse8@gmail.com</a>
            </p>
          </section>

        </div>

        <div className="policy-footer-link">
          <Link href="/">← Back to Coin Course</Link>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 6 }}>
              <div className="coin">$</div>
              Coin Course
            </Link>
            <p className="footer-tag">Free financial literacy for every age. A free financial literacy project.</p>
          </div>
          <div>
            <h5>Learn</h5>
            <div className="footer-links">
              <Link href="/#modules">All 8 modules</Link><Link href="/#audience">For students</Link>
              <Link href="/#audience">For parents</Link><Link href="/#audience">For teachers</Link>
            </div>
          </div>
          <div>
            <h5>Help</h5>
            <div className="footer-links">
              <Link href="/#faq">FAQ</Link><a href="mailto:coincourse8@gmail.com">Contact</a>
              <Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>2026 Coin Course. A free financial literacy project</span>
          <span>Harsimran Gill & Ashwin Sivakumar</span>
        </div>
      </footer>
    </div>
  )
}
