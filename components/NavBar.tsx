"use client"

// Frontend — Navigation bar

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/app/providers"

export default function NavBar() {
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const initial = user?.name?.[0]?.toUpperCase() ?? ""

  return (
    <nav className="nav">
      <Link href="/" className="brand">
        <div className="coin">$</div>
        Coin Course
      </Link>
      <div className="nav-links">
        <Link href="/#modules">Modules</Link>
        <Link href="/#how">How it works</Link>
        <Link href="/#audience">For learners</Link>
        <a href="#">Resources</a>
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
    </nav>
  )
}
