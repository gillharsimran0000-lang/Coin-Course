"use client"

// Frontend  -  Sign in / Sign up

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
  const [googleLoading, setGoogleLoading] = useState(false)

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

  async function handleGoogleSignIn() {
    setGoogleLoading(true)
    setServerError("")
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/signin`,
      },
    })
    if (error) {
      setServerError(error.message)
      setGoogleLoading(false)
    }
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

          <button
            type="button"
            className="auth-google-btn"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
            </svg>
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          <div className="auth-divider"><span>or use email</span></div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className={`auth-field-wrap${mode === "signup" ? " open" : ""}`}>
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
                  tabIndex={mode === "signup" ? 0 : -1}
                />
                {errors.name && <span className="auth-field-error">{errors.name}</span>}
              </div>
            </div>
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
          <h5>Help</h5>
          <div className="footer-links">
            <Link href="/#faq">FAQ</Link><a href="mailto:hello@coin-course.com">Contact</a>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>2026 Coin Course. A free financial literacy project</span>
        <span>Harsimran Gill & Ashwin Sivakumar</span>
      </div>
    </footer>
  )
}
