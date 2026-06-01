"use client"

// Frontend — Privacy policy

import Link from "next/link"
import NavBar from "@/components/NavBar"

export default function PrivacyPage() {
  return (
    <div className="policy-page">
      <NavBar />

      <div className="policy-shell">
        <div className="policy-header">
          <div className="kicker">Legal</div>
          <h1>Privacy Policy</h1>
          <p className="policy-meta">Last updated: May 2026 · Coin Course is a free financial literacy project.</p>
        </div>

        <div className="policy-body">

          <section>
            <h2>The short version</h2>
            <p>We collect only what we need to save your learning progress. We never sell your data. We never show you ads. We never share your information with third parties for marketing. You can delete your account and all your data at any time.</p>
          </section>

          <section>
            <h2>What we collect</h2>
            <p>When you create an account we store:</p>
            <ul>
              <li><strong>Your email address</strong> — used to sign you in and send you the occasional product update (you can unsubscribe any time).</li>
              <li><strong>Your display name</strong> — shown in the navigation bar. You set this when you sign up.</li>
              <li><strong>Lesson progress</strong> — which lessons you have marked complete and your watch progress percentage for each one.</li>
              <li><strong>Quiz scores</strong> — your score and percentage for each module quiz you complete.</li>
            </ul>
            <p>We do not collect payment information (Coin Course is free), browsing history, location data, or any data from third parties.</p>
          </section>

          <section>
            <h2>How we use it</h2>
            <p>Your data is used for exactly one purpose: to let you pick up where you left off. Lesson progress and quiz scores are loaded when you visit a module so the app knows what you have completed. That is it.</p>
            <p>We may use your email to send important product announcements (new modules, major changes to the platform). These are infrequent. Every email includes a one-click unsubscribe link.</p>
          </section>

          <section>
            <h2>Who we share it with</h2>
            <p>Nobody, for commercial purposes. Your data is stored in <strong>Supabase</strong> (our database provider), which processes it on our behalf under a data processing agreement. Supabase is GDPR-compliant and stores data in the US by default.</p>
            <p>We will disclose data if required by law, but we will notify you first unless legally prohibited from doing so.</p>
          </section>

          <section>
            <h2>Cookies and tracking</h2>
            <p>We use a single session cookie set by Supabase to keep you signed in. We do not use advertising cookies, analytics trackers, or any third-party tracking scripts.</p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>You can, at any time:</p>
            <ul>
              <li><strong>Access your data</strong> — email us and we will send you everything we have on file within 30 days.</li>
              <li><strong>Correct your data</strong> — update your name or email from your account settings.</li>
              <li><strong>Delete your account</strong> — email us at <a href="mailto:privacy@cashcourse.org">privacy@cashcourse.org</a> and we will permanently delete your account and all associated data within 14 days.</li>
              <li><strong>Export your data</strong> — request a copy of your progress and quiz history in JSON format.</li>
            </ul>
            <p>If you are in the European Economic Area (EEA) or United Kingdom, you also have rights under GDPR including the right to object to processing and the right to lodge a complaint with your local supervisory authority.</p>
          </section>

          <section>
            <h2>Children</h2>
            <p>Coin Course is designed for learners aged 10 and up. We do not knowingly collect personal information from children under 13 without parental consent. If you are a parent and believe your child has created an account without your consent, contact us at <a href="mailto:privacy@cashcourse.org">privacy@cashcourse.org</a> and we will delete the account promptly.</p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>If we make a material change to this policy, we will notify signed-in users by email at least 14 days before the change takes effect. The date at the top of this page always reflects when it was last updated.</p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>Questions about this policy or your data:</p>
            <p>
              <strong>Coin Course</strong><br />
              A free financial literacy project project<br />
              <a href="mailto:privacy@cashcourse.org">privacy@cashcourse.org</a>
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
            <h5>About</h5>
            <div className="footer-links">
              <a href="#">Our mission</a><a href="#">Curriculum board</a>
              <a href="#">Donate</a><a href="#">Press</a>
            </div>
          </div>
          <div>
            <h5>Help</h5>
            <div className="footer-links">
              <a href="#">FAQ</a><a href="mailto:privacy@cashcourse.org">Contact</a>
              <a href="#">Accessibility</a><Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>2026 Coin Course. A free financial literacy project</span>
          <span>Made for learners 10 to 100</span>
        </div>
      </footer>
    </div>
  )
}
