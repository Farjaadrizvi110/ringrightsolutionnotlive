# RingRight Solution — Integrated Growth Partner Landing Site

> **⚠️ SEO Disclaimer (current push state — NOT optimized yet)**
>
> This code is pushed **WITHOUT the optimized LLM / Google SGE (Search Generative Experience) SEO layer**.
> The following advanced SEO items are NOT implemented in this commit and are planned for a
> follow-up push on a dedicated `seo/llm-ranking-v1` branch:
>
> - **No** `robots.txt` + `sitemap.xml` (Google-Extended, GoogleOther, Google-InspectionTool allow rules missing)
> - **No** `og:image` / Twitter Card meta tags on any page (og: title/description/url/type are present)
> - **No** Schema.org graph expansions (current Home schema only includes `Organization` + `ProfessionalService`
>   — missing: `WebSite` + `SearchAction`, `OfferCatalog`, `ContactPoint` + `hoursAvailable` for 24/7,
>   `sameAs` array, `AreaServed` GeoShape, `AggregateRating`/`Review`, `PriceRange`, `mentions` entity linker,
>   `Product`/`Offer` per service, `FAQPage`, `HowTo` (Growth 6-stage), `BreadcrumbList`, `Speakable`)
> - **No** hidden `ground-truth/` entity JSON + Markdown site-export + `.well-known/ai-plugin.json`
> - **No** anti-hallucination meta tags (`google-ai-overview:*`) or `id="ground-truth"` JSON blocks
> - **No** hreflang tags (English-only `x-default` placeholder omitted)
> - **No** real FAQ section rendered on Home / Contact + schema (FAQPage JSON-LD omitted)
> - **No** `<dfn>` entity-anchor tags, Why-Us differentiation section, tiered pricing section, or
>   "results timeline" entity facts in Service.outcomes
> - Service page slugs, per-service landing routes, and service-level canonical URLs — NOT wired yet
>
> All of the above are ready as a documented playbook in the prior review artifact
> (`30-Day SGE-LLM Action Plan`). Ask maintainers for the `seo/llm-ranking-v1` branch when you want them applied.

---

## What this repo IS (production-grade frontend landing SPA)

RingRight Solution is a **B2B integrated growth partner** that unifies 6 disciplines under one roof:

1. **24/7 Live Human Answering** — under 3 rings, always-on virtual reception
2. **Email Marketing & Automation** — lifecycle campaigns, abandoned-cart, revenue attribution
3. **Social Media & Paid Acquisition** — Meta, LinkedIn, X, TikTok full-funnel
4. **MERN Web Development & SaaS** — custom software, CRM sync, web chat
5. **Commercial Printing** — branded print, signage, packaging, promotional
6. **Brand Strategy & Creative** — identity, positioning, voice, art direction

This project is a **React 19 + Vite 7 + TypeScript 5 + Tailwind 3.4 + Framer Motion 13 + react-router 7**
single-page landing site designed, built, and ready to be wired to a backend (Contact form is
preview-only at commit time, no network submission — validated client-side with react-hook-form + zod).

## Pages (4 routes)

| Route            | File                                             |
|------------------|--------------------------------------------------|
| `/`              | [src/pages/Home.tsx](src/pages/Home.tsx)         |
| `/growth-strategy` | [src/pages/GrowthStrategy.tsx](src/pages/GrowthStrategy.tsx) |
| `/about`         | [src/pages/About.tsx](src/pages/About.tsx)       |
| `/contact`       | [src/pages/Contact.tsx](src/pages/Contact.tsx)   |

## Tech Stack

- **Build tool:** Vite 7 (`vite.config.ts`)
- **UI framework:** React 19 (StrictMode, class ErrorBoundary at root)
- **Language:** TypeScript 5.9 (strict + `noUnusedLocals` + `verbatimModuleSyntax` + `noUncheckedSideEffectImports`)
- **Styling:** Tailwind CSS 3.4 + custom layered design system (`src/index.css` ~1500 lines)
- **Animation:** Framer Motion 13 (`RevealWords`, `fadeUp` variants, `Marquee`, `ScrollProgress`, `Magnetic`, `CursorGlow`, `Preloader` 5-panel wipe)
- **Smooth scrolling:** Lenis (`@studio-freight/lenis` v1 — deprecated, planned rename to `lenis` in a follow-up commit)
- **UI primitives:** 60+ shadcn/ui Radix components in `src/components/ui/` (NOT yet adopted in site pages — tree-shaken candidates for a later pass)
- **Routing:** react-router 7 (`BrowserRouter` in `src/main.tsx`)
- **SEO per-page:** react-helmet-async 3 (`Helmet` per page with title, description, canonical, og:*)
- **Form validation (Contact):** react-hook-form + zod resolver + `@hookform/resolvers/zod`
- **Icons:** lucide-react
- **Linting:** ESLint flat config (`eslint.config.js`) — tseslint recommended + react-hooks + reactRefresh vite

## Quality & Security state at push time

All of the following ARE implemented in this commit (applied during the senior QA / security review pass):

✅ **Error resilience:** `src/components/ErrorBoundary.tsx` class component wraps entire app — prevents
total white-out on any descendant render throw, shows friendly fallback UI with "return home" + "reload"
actions.

✅ **Accessibility (WCAG 2.4.1):** `src/components/SkipLink.tsx` "Skip to main content" bypass anchor
(sr-only, focus-visible revealed). All 4 pages have `<main id="main" tabIndex={-1}>`.

✅ **Form security (Contact):** Full Zod + RHF validation on 6 fields (name, company, email, phone,
service, message): `trim() / .min() / .max()`, RFC email regex + TLD refine, phone allowlist regex
`/^[\d\s+()\-.ext,]+$/i`, service enum allowlist refine, message 10–5000 chars; inputs wrapped in
`Controller`; errors use `aria-invalid` + `aria-describedby` + `role="alert"`; submit button
`disabled={isSubmitting}`; `maxLength` + `autoComplete` attributes set; reset() on "Edit request".

✅ **Hash-sanitization guard:** `ScrollManager` in `src/App.tsx` validates URL hash before
`document.querySelector(hash)` against regex `/^#[A-Za-z0-9_-]+$/`.

✅ **Cookie security flags:** Shadcn sidebar cookie write in `src/components/ui/sidebar.tsx` uses
`; SameSite=Lax; Secure` (OWASP CSRF / MITM protection flags).

✅ **Type safety:** Data arrays in `src/data/site.ts` have explicit exported types (`Service`,
`ServicePillar`, `NavLink`, `HomeSection`, `integrations: string[]`). Home Schema.org JSON-LD is
strongly typed (`SchemaOrg` + `SchemaGraphNode`).

✅ **Canonical + og:url SEO:** Every page declares `<link rel="canonical">` + `<meta og:url>`
targeting `https://ringrightsolution.com/<path>` (placeholder domain — replace on go-live).

✅ **Duplicate title fix:** Home page no longer has two competing `document.title` owners; only
Helmet sets title now (removed imperative `useEffect` sidecar).

✅ **Font performance:** Google Fonts load via `<link rel="preconnect">` + `<link rel="stylesheet">`
in `index.html` instead of the old synchronous CSS `@import url(...)` in `src/index.css` — eliminates
render-blocking stylesheet round-trip (~300ms est LCP improvement on cold cache).

✅ **Vite path-ambiguity fix:** `vite.config.ts` `base` changed from `'./'` → `'/'` so sub-path and
proxied deploys resolve assets correctly.

✅ **Git guardrails:** `.gitignore` covers `node_modules/`, `dist/`, full `.env*` hierarchy,
`*.pem/*.key`, `.DS_Store`, `*.log` — prevents credential/secret leaks.

✅ **npm network isolation:** Project-local `.npmrc` pins `registry=https://registry.npmjs.org/`
as a sandbox guardrail against system-level custom registry mirror poisoning in CI.

✅ **Passes locally:** TypeScript strict 0 errors (`npx tsc --noEmit -p tsconfig.app.json`); ESLint 0
errors on all touched files; VSCode diagnostics empty; Vite build + dev server start on port 3000
without warnings.

## Local development

```bash
# 1. Install (uses project-local registry override)
npm install

# 2. Start dev server (default port 3000)
npm run dev
# → http://localhost:3000/

# 3. Type-check
npx tsc -b

# 4. Lint
npm run lint

# 5. Production build (output: dist/)
npm run build
```

## Project structure (highlights)

```
app/
├── public/
│   └── favicon.png                     (og:images + robots.txt + sitemap.xml NOT yet added — see SEO disclaimer)
├── src/
│   ├── assets/                         (hero images, services 5-pair detail images, logo/mark)
│   │   └── services/                   (6 service cards + 6 detail photos)
│   ├── components/
│   │   ├── ErrorBoundary.tsx           (NEW — top-level crash guard)
│   │   ├── SkipLink.tsx                (NEW — WCAG 2.4.1 skip to main)
│   │   ├── site/
│   │   │   ├── Header.tsx              (glass pill header, hamburger AnimatePresence mobile)
│   │   │   ├── Footer.tsx              (12-col services/integration grid)
│   │   │   ├── Preloader.tsx           (5-panel wipe + fake progress)
│   │   │   ├── shared.tsx              (SectionIntro / PageHero / FinalCta reusable sections)
│   │   │   ├── presets.ts              (ease + fadeUp/stagger Framer variants)
│   │   │   └── effects.tsx             (ScrollProgress + CursorGlow + Magnetic)
│   │   └── ui/                         (60+ shadcn/ui Radix primitives — unused in site pages today)
│   ├── data/
│   │   └── site.ts                     (services[], industries[], growthStages[], integrations[], navLinks[], homeSections[])
│   ├── hooks/
│   │   └── use-mobile.ts               (matches window width for responsive)
│   ├── lib/
│   │   └── utils.ts                    (cn() = twMerge(clsx(...)))
│   ├── pages/
│   │   ├── Home.tsx                    (680L — inline sections: RevealWords, StatCell, Marquee, HeroSection, EditorialIntro, ServiceIndex ×6, ServiceDetail ×6, WorkflowDiagram, 9 IndustryCards, FinalCta)
│   │   ├── GrowthStrategy.tsx          (3 principles + 6-stage framework + 3 engine cards)
│   │   ├── About.tsx                   (values band + 3-layer model + FinalCta)
│   │   └── Contact.tsx                 (RHF+Zod 6-field form → preview confirmation)
│   ├── App.tsx                         (useLenis singleton + ScrollManager + Preloader + 4 Routes)
│   ├── App.css
│   ├── index.css                       (custom design system: glass UI · Ken Burns · marquee · lead-flow · workflow SVG · service cards · CTAs · responsive overrides · prefers-reduced-motion)
│   └── main.tsx                        (root: StrictMode → ErrorBoundary → HelmetProvider → BrowserRouter → SkipLink + App)
├── index.html                          (shell: favicon · preconnect + Google Fonts link · title · description · theme-color)
├── vite.config.ts                      (base: '/' · kimi inspect-react dev plugin)
├── tailwind.config.js                  (shadcn HSL tokens · custom radii · tailwindcss-animate plugin)
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json                   (strict + noUnusedLocals + noUnusedParameters + verbatimModuleSyntax + noUncheckedSideEffectImports · target ES2022)
├── tsconfig.node.json
├── eslint.config.js                    (flat config: js.recommended · tseslint.recommended · react-hooks/flat.recommended · reactRefresh vite)
├── components.json                     (shadcn init manifest)
├── .gitignore                          (expanded guardrails)
├── .npmrc                              (pinned npmjs registry — sandbox guardrail)
├── package.json                        (63 deps/devDeps — see "Known notes" below)
└── README.md                           (this file)
```

## Known notes (NOT bugs, documented for follow-up cleanup)

These are deliberately **NOT** changed in this push to avoid scope creep; they are tracked for a
later dedicated branch. See SEO Disclaimer top of file for the SEO subset.

- **10+ heavy unused packages still in `package.json`**: `three`, `@react-three/fiber`,
  `@react-three/drei`, `recharts`, `cmdk`, `date-fns`, `react-day-picker`, `input-otp`, `vaul`,
  `resizable-panels`, `next-themes` — installed at scaffold time, never imported. Removing them
  cuts production bundle by an est 400–500 KB gz.
- **60 shadcn/ui components NOT yet adopted** — site pages use hand-rolled `<div>` cards/sections;
  the Radix wrappers are ready for use but not wired.
- **Home.tsx 680-line monolith**: 10+ inline sub-components (`RevealWords`, `StatCell`, `Marquee`,
  `HeroSection`, `EditorialIntro`, `ServiceIndex`, `ServiceDetail`, `WorkflowDiagram`, etc.) should
  be extracted to `src/components/site/sections/` for HMR granularity + readability.
- **No route code-splitting**: 100% of all 4 pages ship on first paint. `React.lazy` + `<Suspense>`
  wrapper around each route would reduce first-byte JS by ~50-65%.
- **Transitive dependency CVEs**: 12 HIGH-severity npm audit advisories (vite, postcss, lodash,
  rollup, nanoid, brace-expansion, picomatch, flatted, js-yaml) reported in prior scan.
  `npm audit fix` + build regression-test planned on `chore/audit-transitives` branch.
- **Deprecated package**: `@studio-freight/lenis` 1.0.42 is renamed upstream to `lenis`. The import
  path and API are identical; a rename + `rm package-lock.json; npm install` follow-up is safe.
- **No backend wired**: Contact form uses client-side-only validation and shows a preview
  confirmation card. On go-live, replace `onValidSubmit` with a fetch() to a Formspree / Resend /
  serverless endpoint and add CSRF token.
- **Browserslist**: No explicit `browserslist` field in `package.json` → autoprefixer uses defaults;
  add `[" >0.5%", "last 2 versions", "not dead", "safari >=15.4"]` for production builds.
- **Images lack width/height + srcset**: All `<img>` load at original resolution → contributes to
  CLS and 2–4× heavier payloads on mobile; planned on `perf/images-responsive` branch.
- **StrictMode double-init of Lenis singleton**: Lenis `useLenis()` module-level instance is
  idempotent but is constructed twice in StrictMode. It does NOT cause double-scrolling and is
  filtered out of production builds.

## Repository admin

- **Remote (this push):** `origin → https://github.com/Farjaadrizvi110/ringrightsolutionnotlive.git`
- **Canonical domain (placeholder, SEO tags only):** `https://ringrightsolution.com/` — replace all
  canonical + og:url references on go-live if the actual production domain differs.
- **Deploy target:** SPA — static hosting on Vercel / Netlify / Cloudflare Pages is recommended
  (`npm run build` outputs `dist/`).

## Scripts

| Script             | What it does                            |
|--------------------|-----------------------------------------|
| `npm run dev`      | Vite dev server (port 3000, HMR)        |
| `npm run build`    | TypeScript + Vite production build      |
| `npm run lint`     | ESLint flat config on all src files     |
| `npm run preview`  | Preview the built dist/ on port 4173    |
