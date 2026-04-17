# finance-fast.com — Design Spec

**Date:** 2026-04-17  
**Status:** Approved  
**Project path:** `/Volumes/SLT/Claude Code/finance-calculator/`

---

## Overview

Personal Finance Calculator site. Static React 19 + Vite app on Cloudflare Pages, monetized via Google AdSense. US primary market, English only. Zero recurring cost beyond the domain (~$10/year).

---

## MVP Scope — 5 Calculators

| Calculator | URL | Monthly Search Vol |
|---|---|---|
| Salary / Take-Home Pay | `/salary-calculator` | 500K+ | Annual ↔ hourly, federal + state tax, net pay |
| Mortgage | `/mortgage-calculator` | 2M+ | Monthly payment, total interest, amortization table |
| Compound Interest | `/compound-interest-calculator` | 500K+ | Principal, rate, years, compounding frequency |
| Loan | `/loan-calculator` | 1M+ | Amount, rate, term → monthly payment + total cost |
| Debt Payoff | `/debt-payoff-calculator` | 200K+ | Snowball vs avalanche comparison, payoff timeline |

Homepage at `/` links to all 5 calculators.

---

## Architecture

**Standalone project** — new repo, same stack as convert-fast.com. Finance-specific form components (multi-field inputs, result tables, amortization schedules). No shared codebase with convert-fast.com.

### Repo Structure

```
finance-calculator/
├── src/
│   ├── calculators/
│   │   ├── salary/        # logic + component
│   │   ├── mortgage/
│   │   ├── compound/
│   │   ├── loan/
│   │   └── debt-payoff/
│   ├── components/        # Nav, Footer, AdSlot, ResultTable
│   ├── pages/             # route components
│   └── utils/             # formatting, validation, math
├── public/
│   ├── sitemap.xml
│   └── robots.txt
└── project-docs/
```

### Each Calculator Contains

- Multi-field form with instant results (no submit button)
- Input validation — non-numeric input silently clears output
- Result table or amortization table where relevant
- Shareable URL via `?` query params
- 3 AdSense slots (header, in-content, footer)
- Unique H1, `<title>`, `<meta description>`, JSON-LD structured data
- Canonical tag

---

## SEO Strategy

**Sprint 1:** 6 pages (5 calculators + homepage)  
**Sprint 2:** 50 state-specific salary pages (`/salary-calculator/california`, `/salary-calculator/texas`, etc.) — same React component, parameterized tax tables  
**Sprint 3+:** Loan type variants, mortgage scenario pages — guided by GSC data

All pages: `sitemap.xml`, `robots.txt` (full crawl), Open Graph tags, canonical tags.

---

## Monetization

3 AdSense slots per page:
1. Header banner (728×90 / responsive) — above fold
2. In-content (336×280) — below calculator result
3. Footer banner (728×90)

Ad slots use reserved dimensions to prevent CLS. Publisher ID injected via environment variable.

**Revenue estimate (finance niche CPM $12–25):**

| Scenario | Monthly Visitors | CPM | Monthly Revenue |
|---|---|---|---|
| Low | 5,000 | $12 | $60 |
| Realistic | 30,000 | $15 | $450 |
| High | 100,000 | $20 | $2,000 |

AdSense approval: ~2 weeks after launch. Google ranking buildup: 3–6 months.

---

## Tech Stack

| Layer | Technology | Cost |
|---|---|---|
| Frontend | React 19 + Vite + TypeScript | Free |
| Hosting | Cloudflare Pages | Free |
| Domain | finance-fast.com (Cloudflare Registrar) | ~$10/year |
| Analytics | Google Analytics 4 | Free |
| Search | Google Search Console | Free |
| Monetization | Google AdSense | Free |

---

## Sprint Plan

| Sprint | Goal | Output |
|---|---|---|
| Sprint 1 | Scaffold + 5 calculators | Live site, 6 indexed pages |
| Sprint 2 | SEO pipeline + AdSense + GA4 | sitemap.xml, meta tags, ad slots live |
| Sprint 3 | 50 state salary pages | 56 indexed pages, long-tail SEO |
| Sprint 4+ | GSC-data-driven expansion | 100+ pages, optimized revenue |

---

## Agent Team

CEO, CFO, MRA, PO, SM, FE, SEO, CW, QA, LEGAL, DESIGNER — same roles as convert-fast.com.

---

## Legal Requirements

### Kötelező oldalak (minden sprint előtt élőnek kell lenniük)

| Oldal | URL | Prioritás |
|---|---|---|
| Privacy Policy | `/privacy-policy` | 🔴 Kritikus — AdSense feltétel |
| Terms of Use | `/terms-of-use` | 🔴 Kritikus — arbitrációs záradék |
| Financial Disclaimer | `/disclaimer` | 🔴 Kritikus — perlés ellen |
| Cookie Policy | `/cookies` | 🟡 Magas — GDPR |

### Minden kalkulátor oldalon kötelező disclaimer

Közvetlenül az eredmény alatt, jól látható helyen:

> **This calculator provides estimates for informational purposes only.** Results are not financial, tax, or legal advice. Figures may not reflect current interest rates, tax laws, or your personal financial situation. Always consult a licensed financial advisor, CPA, or mortgage professional before making financial decisions. finance-fast.com assumes no liability for decisions made based on these calculations.

### Kalkulátor-specifikus figyelmeztetések

- **Salary:** "Based on [year] federal tax brackets. Does not include state/local tax unless shown."
- **Mortgage:** "Does not include PMI, HOA, property taxes, or insurance. This is not a loan offer."
- **Loan:** "Does not account for origination fees or prepayment penalties."
- **Compound Interest:** "Hypothetical results only. Not a guarantee of future returns."
- **Debt Payoff:** "Assumes no new charges. Minimum payment assumptions may differ from your lender."

### AdSense compliance

- Privacy Policy linkje minden oldalon (footer)
- Google Funding Choices CMP — cookie consent EU látogatóknak
- Nincs reklám a kalkulátor gombok közvetlen közelében
- CCPA "Do Not Sell My Personal Information" footer link

### Terms of Use — kötelező záradékok

- **Arbitrációs záradék + class action waiver** — ez a legfontosabb perlés elleni védelem
- No warranty clause — site "as is"
- Limitation of liability — $0 cap
- Governing law — owner's state

---

## Out of Scope (v1)

- Currency / crypto calculators (live API = cost)
- User accounts, saved calculations
- i18n / multi-language
- PWA / offline mode
- Blog / CMS
- International tax tables (Sprint 4+)
