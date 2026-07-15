"use client"

// Frontend  -  Navigation bar

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/app/providers"

const NAV_ITEMS = [
  { href: "/modules", label: "Modules" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-learners", label: "For learners" },
  { href: "/resources", label: "Resources" },
  { href: "/game", label: "Game" },
]

export default function NavBar() {
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  useEffect(() => {
    let ticking = false
    function update() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0
      if (progressRef.current) progressRef.current.style.width = `${pct}%`
      ticking = false
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const initial = user?.name?.[0]?.toUpperCase() ?? ""

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"><div ref={progressRef} /></div>
      <div className={scrolled ? "nav-outer scrolled" : "nav-outer"}>
        <nav className="nav">
        <Link href="/" className="brand">
          <div className="coin">$</div>
          Coin Course
        </Link>
        <div className="nav-links">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
        <div className="nav-cta">
          {user ? (
            <div className="nav-user" ref={menuRef}>
              <button
                className="nav-avatar"
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Account menu"
              >
                {initial}
              </button>
              {menuOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-name">{user.name}</div>
                  <div className="nav-dropdown-email">{user.email}</div>
                  <div className="nav-dropdown-rule" />
                  <Link href="/modules/1" className="nav-dropdown-item" onClick={() => setMenuOpen(false)}>
                    My progress
                  </Link>
                  <button
                    className="nav-dropdown-item signout"
                    onClick={() => { signOut(); setMenuOpen(false) }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="btn">Sign in</Link>
          )}
          <Link href="/modules/1" className="btn btn-primary">
            Continue
            <svg className="btn-arrow" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <button
          className={mobileOpen ? "nav-burger open" : "nav-burger"}
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div id="mobile-nav-drawer" className={mobileOpen ? "nav-drawer open" : "nav-drawer"}>
        <div className="nav-drawer-links">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="nav-drawer-cta">
          {user ? (
            <button
              className="btn"
              onClick={() => { signOut(); setMobileOpen(false) }}
            >
              Sign out
            </button>
          ) : (
            <Link href="/signin" className="btn" onClick={() => setMobileOpen(false)}>Sign in</Link>
          )}
          <Link href="/modules/1" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
            Continue
            <svg className="btn-arrow" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        </div>
      </div>
    </>
  )
}
