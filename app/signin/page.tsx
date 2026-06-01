"use client"

// Frontend — Sign in / Sign up

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers"
import { supabase } from "@/lib/supabase"
import NavBar from "@/components/NavBar"

type Mode = "signin" | "signup"
type Field = "name" | "email" | "password"
type Errors = Partial<Record<Field, string>>

export default function SignInPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [mode, setMode] = useState<Mode>("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [serverError, setServerError] = useState("")
  const [loading, setLoading] = useState(false)
  const [mlEmail, setMlEmail] = useState("")
  const [mlSent, setMlSent] = useState(false)
  const [mlLoading, setMlLoading] = useState(false)

  useEffect(() => {
    if (user) router.push("/modules/1")
  }, [user, router])

  if (user) {
    return (
      <div className="auth-page">
        <NavBar />
        <div className="auth-shell">
          <div className="auth-card">
            <div className="auth-success">
              <div className="auth-success-glyph">&#10003;</div>
              <h2 className="auth-success-title">You are signed in</h2>
              <p className="auth-success-sub">Welcome back, {user.name}. Pick up where you left off.</p>
              <Link href="/modules/1" className="auth-submit-btn">
                Continue learning
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
          <AuthSidebar />
        </div>
        <AuthFooter />
      </div>
    )
  }

  function validate(): boolean {
    const e: Errors = {}
    if (mode === "signup" && !name.trim()) e.name = "Please enter your name."
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email address."
    if (!password || password.length < 6) e.password = "Password must be at least 6 characters."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return

    setLoading(true)
    setServerError("")

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { data: { full_name: name.trim() } },
      })
      if (error) {
        setServerError(error.message)
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })
      if (error) {
        setServerError(error.message)
        setLoading(false)
        return
      }
    }

    router.push("/modules/1")
  }

  async function handleMagicLink() {
    if (!mlEmail.trim() || !mlEmail.includes("@")) return
    setMlLoading(true)
    setServerError("")
    const { error } = await supabase.auth.signInWithOtp({
      email: mlEmail.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/signin` },
    })
    if (error) setServerError(error.message)
    else setMlSent(true)
    setMlLoading(false)
  }

  return (
    <div className="auth-page">
      <NavBar />
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="coin" style={{ width: 48, height: 48, fontSize: 20 }}>$</div>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab${mode === "signin" ? " active" : ""}`} onClick={() => { setMode("signin"); setErrors({}); setServerError("") }}>
              Sign in
            </button>
            <button className={`auth-tab${mode === "signup" ? " active" : ""}`} onClick={() => { setMode("signup"); setErrors({}); setServerError("") }}>
              Create account
            </button>
          </div>

          <h1 className="auth-title">{mode === "signin" ? "Welcome back" : "Join Coin Course"}</h1>
          <p className="auth-sub">{mode === "signin" ? "Sign in to continue your progress." : "Free forever. No credit card required."}</p>

          {mlSent ? (
            <div className="auth-magic-sent">
              <span className="auth-magic-check">✓</span>
              <p>Check your inbox at <strong>{mlEmail}</strong></p>
              <button className="auth-magic-retry" onClick={() => { setMlSent(false); setMlEmail("") }}>
                Use a different email
              </button>
            </div>
          ) : (
            <div className="auth-magic-wrap">
              <input
                type="email"
                className="auth-magic-input"
                placeholder="your@email.com"
                value={mlEmail}
                onChange={e => setMlEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleMagicLink()}
              />
              <button
                type="button"
                className="auth-magic-btn"
                onClick={handleMagicLink}
                disabled={mlLoading}
              >
                {mlLoading ? "Sending..." : "Send magic link →"}
              </button>
            </div>
          )}

          <div className="auth-divider"><span>or</span></div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {mode === "signup" && (
              <div className="auth-field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && <span className="auth-field-error">{errors.name}</span>}
              </div>
            )}
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="auth-field-error">{errors.email}</span>}
            </div>
            <div className="auth-field">
              <label htmlFor="password">
                Password
                {mode === "signin" && <a href="#" className="auth-forgot">Forgot password?</a>}
              </label>
              <input
                id="password"
                type="password"
                placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <span className="auth-field-error">{errors.password}</span>}
            </div>

            {serverError && <p className="auth-server-error">{serverError}</p>}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Just a sec..." : mode === "signin" ? "Sign in" : "Create free account"}
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </form>

          <p className="auth-switch">
            {mode === "signin" ? (
              <>Don&apos;t have an account?{" "}
                <button onClick={() => { setMode("signup"); setErrors({}); setServerError("") }}>Create one free</button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => { setMode("signin"); setErrors({}); setServerError("") }}>Sign in</button>
              </>
            )}
          </p>

          {mode === "signup" && (
            <p className="auth-legal">
              By creating an account you agree to our <a href="#">Terms</a> and <Link href="/privacy">Privacy Policy</Link>.
              Coin Course will never sell your data.
            </p>
          )}
        </div>

        <AuthSidebar />
      </div>
      <AuthFooter />
    </div>
  )
}

function AuthSidebar() {
  const modules = [
    { n: "01", t: "Money Basics", c: "#ffce3a" },
    { n: "02", t: "Saving", c: "#6dd497" },
    { n: "03", t: "Credit and Debt", c: "#ff6a4e" },
    { n: "04", t: "Banking and Income", c: "#6e9bff" },
    { n: "05", t: "Investing", c: "#b48cff" },
    { n: "06", t: "Insurance", c: "#ffa066" },
    { n: "07", t: "Big Decisions", c: "#50d8c4" },
    { n: "08", t: "Long-Term Wealth", c: "#ffce3a" },
  ]
  return (
    <div className="auth-sidebar">
      <div className="auth-sidebar-head">
        <div className="coin" style={{ width: 36, height: 36, fontSize: 16, flexShrink: 0 }}>$</div>
        <span className="auth-sidebar-brand">Coin Course</span>
      </div>

      <div className="auth-modules-preview">
        {modules.map(m => (
          <div key={m.n} className="auth-module-row">
            <span className="auth-module-dot" style={{ background: m.c }} />
            <span className="auth-module-num">{m.n}</span>
            <span className="auth-module-title">{m.t}</span>
          </div>
        ))}
      </div>
      <p className="auth-sidebar-foot">Free, forever. No credit card. No ads.</p>
    </div>
  )
}

function AuthFooter() {
  return (
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
  )
}
