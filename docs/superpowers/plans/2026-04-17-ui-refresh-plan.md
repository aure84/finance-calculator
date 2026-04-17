# UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all inline styles with CSS Modules and a global token system, giving finance-fast.com a professional navy + green visual identity.

**Architecture:** A single `src/styles/globals.css` defines all color/spacing tokens as CSS custom properties. Each component gets a co-located `.module.css` file. The five calculator pages share one `src/pages/calculator.module.css` for page-level layout. Individual calculator components (`SalaryCalc.tsx` etc.) are not touched.

**Tech Stack:** React 19, Vite (CSS Modules built-in), Lucide React (SVG icons), Inter via Google Fonts

---

## File Structure

| File | Action | Purpose |
|---|---|---|
| `src/styles/globals.css` | Create | `:root` color/spacing tokens + Inter import + base reset |
| `src/main.tsx` | Modify | Import `globals.css` instead of `index.css` |
| `src/index.css` | Delete | Replaced by globals.css |
| `src/components/Nav.module.css` | Create | Nav scoped styles |
| `src/components/Nav.tsx` | Modify | Use CSS Module + Lucide-free (no icons here) |
| `src/components/Footer.module.css` | Create | Footer scoped styles |
| `src/components/Footer.tsx` | Modify | Use CSS Module |
| `src/pages/HomePage.module.css` | Create | Hero + cards grid styles |
| `src/pages/HomePage.tsx` | Modify | Use CSS Module + Lucide icons |
| `src/pages/calculator.module.css` | Create | Shared page layout for all 5 calc pages |
| `src/pages/SalaryPage.tsx` | Modify | Use calculator.module.css |
| `src/pages/MortgagePage.tsx` | Modify | Use calculator.module.css |
| `src/pages/CompoundPage.tsx` | Modify | Use calculator.module.css |
| `src/pages/LoanPage.tsx` | Modify | Use calculator.module.css |
| `src/pages/DebtPayoffPage.tsx` | Modify | Use calculator.module.css |
| `index.html` | Modify | Add Inter Google Fonts `<link>` |

---

## Task 1: Global tokens + Inter font

**Files:**
- Create: `src/styles/globals.css`
- Modify: `src/main.tsx`
- Modify: `index.html`
- Delete: `src/index.css` (after main.tsx is updated)

- [ ] **Step 1: Create `src/styles/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --navy: #1e3a5f;
  --navy-dark: #152d4a;
  --navy-light: #2d5a8e;
  --green: #16a34a;
  --green-dark: #15803d;
  --bg: #f8fafc;
  --surface: #ffffff;
  --border: #e2e8f0;
  --text: #0f172a;
  --text-muted: #64748b;
  --results-bg: #eef3f9;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--text);
  background: var(--bg);
  font-size: 16px;
  line-height: 1.5;
}

a {
  color: inherit;
}
```

- [ ] **Step 2: Update `src/main.tsx` to import globals.css**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: Delete `src/index.css`**

```bash
rm "src/index.css"
```

- [ ] **Step 4: Install Lucide React**

```bash
npm install lucide-react
```

Expected output: `added 1 package`

- [ ] **Step 5: Start dev server and verify**

```bash
npm run dev
```

Open http://localhost:5173 — the site should still render (layout broken is OK, fonts should be Inter now). No console errors about missing CSS.

- [ ] **Step 6: Commit**

```bash
git add src/styles/globals.css src/main.tsx index.html
git rm src/index.css
git commit -m "feat: add global CSS tokens and Inter font, install lucide-react"
```

---

## Task 2: Nav

**Files:**
- Create: `src/components/Nav.module.css`
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Create `src/components/Nav.module.css`**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 32px;
  height: 56px;
}

.logo {
  font-weight: 700;
  font-size: 18px;
  color: var(--navy);
  text-decoration: none;
  white-space: nowrap;
}

.nav {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.link {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 400;
  padding: 6px 10px;
  border-radius: 6px;
  transition: color 0.15s;
}

.link:hover {
  color: var(--navy);
}

.active {
  color: var(--navy);
  font-weight: 600;
  border-bottom: 2px solid var(--green);
  border-radius: 0;
  padding-bottom: 4px;
}
```

- [ ] **Step 2: Rewrite `src/components/Nav.tsx`**

```tsx
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

const links = [
  { to: '/salary-calculator', label: 'Salary' },
  { to: '/mortgage-calculator', label: 'Mortgage' },
  { to: '/compound-interest-calculator', label: 'Compound Interest' },
  { to: '/loan-calculator', label: 'Loan' },
  { to: '/debt-payoff-calculator', label: 'Debt Payoff' },
]

export default function Nav() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        finance-fast.com
      </NavLink>
      <nav className={styles.nav}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
```

- [ ] **Step 3: Verify locally**

```bash
npm run dev
```

Open http://localhost:5173 — Nav should show: white sticky header, navy logo, gray links, active link navy with green underline.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.module.css src/components/Nav.tsx
git commit -m "feat: Nav — CSS Module, sticky, navy + green active indicator"
```

---

## Task 3: Footer

**Files:**
- Create: `src/components/Footer.module.css`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Create `src/components/Footer.module.css`**

```css
.footer {
  background: var(--navy);
  padding: 24px 32px;
  margin-top: 48px;
}

.inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.copy {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.nav {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.link {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: color 0.15s;
}

.link:hover {
  color: #ffffff;
}
```

- [ ] **Step 2: Rewrite `src/components/Footer.tsx`**

```tsx
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} finance-fast.com — For informational purposes only. Not financial advice.
        </p>
        <nav className={styles.nav}>
          <Link to="/disclaimer" className={styles.link}>Disclaimer</Link>
          <Link to="/privacy-policy" className={styles.link}>Privacy Policy</Link>
          <Link to="/terms-of-use" className={styles.link}>Terms of Use</Link>
          <Link to="/cookies" className={styles.link}>Cookies</Link>
          <Link to="/privacy-policy#ccpa" className={styles.link}>Do Not Sell My Personal Information</Link>
        </nav>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Verify locally**

```bash
npm run dev
```

Footer should show: navy background, white/semi-transparent text and links.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.module.css src/components/Footer.tsx
git commit -m "feat: Footer — CSS Module, navy background, white links"
```

---

## Task 4: Homepage

**Files:**
- Create: `src/pages/HomePage.module.css`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Create `src/pages/HomePage.module.css`**

```css
.hero {
  background: var(--navy);
  padding: 80px 24px;
  text-align: center;
}

.heroTitle {
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
}

.heroSubtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 480px;
  margin: 0 auto;
}

.section {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.card {
  display: block;
  text-decoration: none;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.card:hover {
  border-color: var(--navy);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.iconWrap {
  width: 40px;
  height: 40px;
  background: var(--navy);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: #ffffff;
}

.cardTitle {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 6px;
}

.cardDesc {
  font-size: 14px;
  color: var(--text-muted);
}
```

- [ ] **Step 2: Rewrite `src/pages/HomePage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { Wallet, Home, TrendingUp, Car, CreditCard } from 'lucide-react'
import SEOMeta from '../components/SEOMeta'
import styles from './HomePage.module.css'

const calculators = [
  { to: '/salary-calculator', icon: Wallet, title: 'Salary Calculator', desc: 'Calculate take-home pay after federal taxes' },
  { to: '/mortgage-calculator', icon: Home, title: 'Mortgage Calculator', desc: 'Monthly payments and amortization schedule' },
  { to: '/compound-interest-calculator', icon: TrendingUp, title: 'Compound Interest', desc: 'See your investment grow over time' },
  { to: '/loan-calculator', icon: Car, title: 'Loan Calculator', desc: 'Monthly payments for any loan type' },
  { to: '/debt-payoff-calculator', icon: CreditCard, title: 'Debt Payoff', desc: 'Snowball vs avalanche comparison' },
]

export default function HomePage() {
  return (
    <>
      <SEOMeta
        title="Free Financial Calculators — Salary, Mortgage, Loan & More | finance-fast.com"
        description="Free financial calculators for salary take-home pay, mortgage payments, compound interest, loans, and debt payoff. Fast, accurate, no sign-up required."
      />
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Free Financial Calculators</h1>
        <p className={styles.heroSubtitle}>
          Fast, accurate calculators for your most important financial decisions.
        </p>
      </div>
      <div className={styles.section}>
        <div className={styles.grid}>
          {calculators.map(({ to, icon: Icon, title, desc }) => (
            <Link key={to} to={to} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon size={20} />
              </div>
              <div className={styles.cardTitle}>{title}</div>
              <div className={styles.cardDesc}>{desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Verify locally**

```bash
npm run dev
```

Homepage should show: full-width navy hero with white text, white cards grid below with navy icon boxes, hover effect on cards.

- [ ] **Step 4: Commit**

```bash
git add src/pages/HomePage.module.css src/pages/HomePage.tsx
git commit -m "feat: Homepage — navy hero, Lucide icons, CSS Module card grid"
```

---

## Task 5: Calculator pages (shared layout)

**Files:**
- Create: `src/pages/calculator.module.css`
- Modify: `src/pages/SalaryPage.tsx`
- Modify: `src/pages/MortgagePage.tsx`
- Modify: `src/pages/CompoundPage.tsx`
- Modify: `src/pages/LoanPage.tsx`
- Modify: `src/pages/DebtPayoffPage.tsx`

- [ ] **Step 1: Create `src/pages/calculator.module.css`**

```css
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px;
}

.breadcrumb {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.breadcrumb a {
  color: var(--text-muted);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: var(--navy);
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 28px;
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 0;
}

.disclaimer {
  margin-top: 32px;
  padding: 16px;
  background: #fef9c3;
  border-radius: 8px;
  font-size: 13px;
  color: #713f12;
}
```

- [ ] **Step 2: Rewrite `src/pages/SalaryPage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import SalaryCalc from '../calculators/salary/SalaryCalc'
import styles from './calculator.module.css'

export default function SalaryPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Salary Calculator — Take-Home Pay After Tax | finance-fast.com"
        description="Calculate your net take-home pay after federal income tax and FICA deductions. Free salary calculator based on 2026 US tax brackets."
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Salary Calculator
      </div>
      <h1 className={styles.title}>Salary Calculator — Take-Home Pay After Tax</h1>
      <p className={styles.subtitle}>
        Calculate your net take-home pay after federal income tax and FICA deductions. Based on 2026 tax brackets.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <SalaryCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only. Results are not tax or financial advice. Figures are based on 2026 federal tax brackets and do not include state or local taxes. Consult a CPA for personalized advice.
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Rewrite `src/pages/MortgagePage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import MortgageCalc from '../calculators/mortgage/MortgageCalc'
import styles from './calculator.module.css'

export default function MortgagePage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Mortgage Calculator — Monthly Payment & Amortization | finance-fast.com"
        description="Calculate your monthly mortgage payment, total interest, and full amortization schedule. Free mortgage calculator for any home price and interest rate."
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Mortgage Calculator
      </div>
      <h1 className={styles.title}>Mortgage Calculator</h1>
      <p className={styles.subtitle}>
        Calculate your monthly mortgage payment, total interest, and see a full amortization schedule.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <MortgageCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates only. Does not include PMI, HOA fees, property taxes, or insurance. Not a loan offer or pre-approval. Consult a licensed mortgage professional before making decisions.
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Rewrite `src/pages/CompoundPage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import CompoundCalc from '../calculators/compound/CompoundCalc'
import styles from './calculator.module.css'

export default function CompoundPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Compound Interest Calculator — See Your Investment Grow | finance-fast.com"
        description="Calculate compound interest with annual, quarterly, monthly, or daily compounding. Free compound interest calculator with year-by-year breakdown."
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Compound Interest Calculator
      </div>
      <h1 className={styles.title}>Compound Interest Calculator</h1>
      <p className={styles.subtitle}>
        See how your investment grows over time with compound interest. Compare annual, quarterly, monthly, and daily compounding.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <CompoundCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Hypothetical results only. Does not account for taxes on gains, inflation, or fund fees. Not a guarantee of future investment returns.
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Rewrite `src/pages/LoanPage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import LoanCalc from '../calculators/loan/LoanCalc'
import styles from './calculator.module.css'

export default function LoanPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Loan Calculator — Monthly Payment & Total Cost | finance-fast.com"
        description="Calculate monthly loan payments and total interest for any personal, auto, or student loan. Free loan calculator with instant results."
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Loan Calculator
      </div>
      <h1 className={styles.title}>Loan Calculator</h1>
      <p className={styles.subtitle}>
        Calculate monthly payments, total interest, and total cost for any personal, auto, or student loan.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <LoanCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates only. Does not include origination fees or prepayment penalties. Rates you qualify for may differ from illustrative rates shown. Not a loan offer.
      </div>
    </main>
  )
}
```

- [ ] **Step 6: Rewrite `src/pages/DebtPayoffPage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import DebtPayoffCalc from '../calculators/debt-payoff/DebtPayoffCalc'
import styles from './calculator.module.css'

export default function DebtPayoffPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Debt Payoff Calculator — Snowball vs Avalanche | finance-fast.com"
        description="Compare snowball vs avalanche debt payoff strategies. See which method saves you more interest and pays off debt faster. Free debt payoff calculator."
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Debt Payoff Calculator
      </div>
      <h1 className={styles.title}>Debt Payoff Calculator — Snowball vs Avalanche</h1>
      <p className={styles.subtitle}>
        Compare two debt payoff strategies: snowball (smallest balance first) vs avalanche (highest interest first). See which saves you more money.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <DebtPayoffCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Assumes no new charges are added. Minimum payment assumptions may differ from your lender's actual terms. Consult a financial advisor for personalized debt management advice.
      </div>
    </main>
  )
}
```

- [ ] **Step 7: Verify locally — open all 5 calculator pages**

```bash
npm run dev
```

Check each URL:
- http://localhost:5173/salary-calculator
- http://localhost:5173/mortgage-calculator
- http://localhost:5173/compound-interest-calculator
- http://localhost:5173/loan-calculator
- http://localhost:5173/debt-payoff-calculator

Each should show: breadcrumb, navy H1, muted subtitle, white panel card, yellow disclaimer.

- [ ] **Step 8: Commit**

```bash
git add src/pages/calculator.module.css src/pages/SalaryPage.tsx src/pages/MortgagePage.tsx src/pages/CompoundPage.tsx src/pages/LoanPage.tsx src/pages/DebtPayoffPage.tsx
git commit -m "feat: calculator pages — CSS Module layout, breadcrumb, navy headings"
```

---

## Task 6: Final review + push

- [ ] **Step 1: Run full local review**

```bash
npm run dev
```

Visit every page and verify:
- [ ] Homepage: navy hero visible, Lucide icons in navy boxes, card hover works
- [ ] Nav: sticky, logo navy, active link has green underline
- [ ] Footer: navy background, white links
- [ ] All 5 calculator pages: breadcrumb, navy H1, white panel, yellow disclaimer
- [ ] No console errors

- [ ] **Step 2: Run type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Push**

```bash
git push
```

Cloudflare Pages deploys automatically. Verify at https://finance-fast.com after ~2 minutes.
