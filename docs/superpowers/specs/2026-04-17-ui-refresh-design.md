# UI Refresh Design — finance-fast.com

**Goal:** Full UI refresh to a professional, trustworthy look (navy + green, Bankrate/NerdWallet style) across all pages.

**Scope:** Nav + Homepage + all five calculator pages + Footer

**CSS strategy:** CSS Modules for component-scoped styles + global `:root` tokens in `src/styles/globals.css`

**Typography:** Inter (Google Fonts, weights 400/500/600/700) — single `<link>` in `index.html`

---

## Color Palette

All tokens defined in `src/styles/globals.css` under `:root`. Components reference them via `var(--token)`.

| Token | Value | Role |
|---|---|---|
| `--navy` | `#1e3a5f` | Primary — nav, headings, buttons |
| `--navy-dark` | `#152d4a` | Hover on navy elements |
| `--navy-light` | `#2d5a8e` | Subtle navy tints |
| `--green` | `#16a34a` | Accent — filled buttons only |
| `--green-dark` | `#15803d` | Green text/labels (WCAG AA) + hover on green buttons |
| `--bg` | `#f8fafc` | Page background |
| `--surface` | `#ffffff` | Card/panel background |
| `--border` | `#e2e8f0` | Borders |
| `--text` | `#0f172a` | Body text |
| `--text-muted` | `#64748b` | Secondary text |
| `--results-bg` | `#eef3f9` | Results section background |

**z-index scale:** nav = 100. No other layers currently.

---

## Typography Scale

| Element | Size | Weight |
|---|---|---|
| H1 | 32px | 700 |
| H2 | 22px | 600 |
| Body | 16px | 400 |
| Label / small | 14px | 400–500 |

---

## Nav (`src/components/Nav.module.css`)

- White background, subtle `box-shadow: 0 1px 3px rgba(0,0,0,0.08)` bottom
- `position: sticky; top: 0; z-index: 100`
- Logo: `--navy`, 18px, weight 700
- Links: `--text-muted` default, hover → `--navy`
- Active link: `--navy`, weight 600, 2px `--green` underline bottom
- Active state: use `isActive` prop from React Router `NavLink` → apply `.active` CSS Module class

---

## Homepage (`src/pages/HomePage.module.css`)

### Hero section
- Full viewport width, `--navy` background
- White H1: "Free Financial Calculators", 32px/700
- Subtitle: white at 85% opacity, 18px (meets WCAG AA on navy)
- Padding: `80px 24px`

### Calculator cards section
- White background, `padding: 48px 24px`
- Grid: `auto-fill`, `minmax(260px, 1fr)`, gap 20px
- Card: `--surface` bg, `1px solid --border`, `border-radius: 12px`, `padding: 24px`
- Hover: border → `--navy`, `box-shadow: 0 4px 12px rgba(0,0,0,0.08)`
- Icon: Lucide React SVG, `--navy` color, 32px
- Title: `--text`, 16px/600
- Description: `--text-muted`, 14px/400

**Icons per calculator (Lucide React):**
- Salary → `Wallet`
- Mortgage → `Home`
- Compound Interest → `TrendingUp`
- Loan → `Car`
- Debt Payoff → `CreditCard`

---

## Calculator Pages (shared: `src/pages/calculator.module.css`)

All five calculator pages share the same page-level layout module.

### Page header
- White background, `1px solid --border` bottom
- Breadcrumb: `Home › [Calculator Name]`, `--text-muted`, 13px
- H1: `--navy`, 32px/700
- Subtitle: `--text-muted`, 16px

### Calculator panel
- `--surface` bg, `1px solid --border`, `border-radius: 12px`, `padding: 24px`
- `margin-top: 24px`
- Input labels: `--text`, 14px/500
- Inputs: `1px solid --border`, `border-radius: 6px`, `padding: 8px 12px`; focus → `2px solid --navy`, no outline
- Submit button: `--green` bg, white text, 14px/600, `border-radius: 6px`, `padding: 10px 20px`; hover → `--green-dark`

### Results section
- `background: --results-bg` (`#eef3f9`)
- `border-radius: 8px`, `padding: 20px 24px`, `margin-top: 20px`
- Main result number: `--navy`, 32px/700
- Detail labels: `--text-muted`, 14px
- Detail values: `--text`, 14px/500

---

## Footer (`src/components/Footer.module.css`)

- `--navy` background
- White text (copyright) and white links
- Links: white, hover → white/80% opacity
- Padding: `24px 32px`
- Layout: space-between flex, wraps on mobile

---

## File Structure

```
src/
  styles/
    globals.css          ← :root tokens + Inter import + base reset
  components/
    Nav.tsx
    Nav.module.css       ← NEW
    Footer.tsx
    Footer.module.css    ← NEW
  pages/
    HomePage.tsx
    HomePage.module.css  ← NEW
    calculator.module.css ← NEW (shared by all 5 calc pages)
    SalaryPage.tsx
    MortgagePage.tsx
    CompoundPage.tsx
    LoanPage.tsx
    DebtPayoffPage.tsx
```

Individual calculator components (`SalaryCalc.tsx` etc.) keep existing inline styles for now — only the page wrapper and shared layout get the new CSS Modules.

---

## Out of Scope

- Individual calculator component internals (inputs/tables inside `SalaryCalc.tsx` etc.)
- Mobile responsive breakpoints (separate sprint)
- Dark mode
