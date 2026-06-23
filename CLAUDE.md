# Coin Course

Financial literacy web app built with Next.js + Supabase. Founders: Harsimran Gill & Ashwin Sivakumar.

## Stack
- Next.js 13 App Router
- Supabase (auth + database)
- Tailwind + custom CSS (globals.css)
- Vercel (deploy) — pushes to main go live automatically

## Key files
- `app/page.tsx` — homepage
- `app/modules/[id]/page.tsx` — individual module lesson page
- `lib/modules.ts` — all module/lesson data and quiz questions
- `app/globals.css` — all styles (design system)
- `components/NavBar.tsx` — shared nav
- `lib/supabase.ts` — supabase client

## Routes
- `/` — homepage
- `/modules` — all 8 modules listing
- `/modules/[id]` — individual module
- `/modules/[id]/quiz` — quiz for module
- `/how-it-works` — how it works page
- `/for-learners` — audience page
- `/resources` — resources (glossary, tips, calculator, checklists)
- `/signin` — auth page (email + Google OAuth via Supabase)

## Notes
- Google OAuth requires Supabase dashboard config + Google Cloud Console redirect URI
- Module cards use IntersectionObserver for reveal animation — any page using `.modules` needs the observer set up in a useEffect
- Design uses `var(--m1)` through `var(--m8)` for module accent colors

@~/Code/ai/Fable5.md
