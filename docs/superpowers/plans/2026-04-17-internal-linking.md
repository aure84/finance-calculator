# Internal Linking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Related Calculators" section to all 5 calculator pages to improve SEO internal linking and user navigation.

**Architecture:** A single reusable `RelatedCalculators` component renders a grid of link cards. Each calculator page imports it and passes a static array of related links. The component has no state or side effects.

**Tech Stack:** React 19, TypeScript, CSS Modules, React Router DOM, Vitest + Testing Library

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/components/RelatedCalculators.tsx` | Create | Reusable link card grid component |
| `src/components/RelatedCalculators.module.css` | Create | Component styles using existing CSS tokens |
| `src/components/RelatedCalculators.test.tsx` | Create | Unit tests |
| `src/pages/MortgagePage.tsx` | Modify | Add RelatedCalculators after disclaimer |
| `src/pages/LoanPage.tsx` | Modify | Add RelatedCalculators after disclaimer |
| `src/pages/DebtPayoffPage.tsx` | Modify | Add RelatedCalculators after disclaimer |
| `src/pages/SalaryPage.tsx` | Modify | Add RelatedCalculators after disclaimer |
| `src/pages/CompoundPage.tsx` | Modify | Add RelatedCalculators after disclaimer |

---

## Task 1: RelatedCalculators component (TDD)

**Files:**
- Create: `src/components/RelatedCalculators.test.tsx`
- Create: `src/components/RelatedCalculators.tsx`
- Create: `src/components/RelatedCalculators.module.css`

### Step 1: Write the failing tests

Create `src/components/RelatedCalculators.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import RelatedCalculators from './RelatedCalculators'

const LINKS = [
  { label: 'Loan Calculator', to: '/loan', description: 'Calculate monthly loan payments.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff', description: 'Compare snowball vs avalanche.' },
]

describe('RelatedCalculators', () => {
  it('renders the section heading', () => {
    render(
      <MemoryRouter>
        <RelatedCalculators links={LINKS} />
      </MemoryRouter>
    )
    expect(screen.getByText('Related Calculators')).toBeTruthy()
  })

  it('renders the correct number of links', () => {
    render(
      <MemoryRouter>
        <RelatedCalculators links={LINKS} />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })

  it('renders each link label and description', () => {
    render(
      <MemoryRouter>
        <RelatedCalculators links={LINKS} />
      </MemoryRouter>
    )
    expect(screen.getByText('Loan Calculator')).toBeTruthy()
    expect(screen.getByText('Calculate monthly loan payments.')).toBeTruthy()
    expect(screen.getByText('Debt Payoff Calculator')).toBeTruthy()
    expect(screen.getByText('Compare snowball vs avalanche.')).toBeTruthy()
  })

  it('each link points to the correct path', () => {
    render(
      <MemoryRouter>
        <RelatedCalculators links={LINKS} />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links[0].getAttribute('href')).toBe('/loan')
    expect(links[1].getAttribute('href')).toBe('/debt-payoff')
  })
})
```

### Step 2: Run tests — verify they fail

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/components/RelatedCalculators.test.tsx
```

Expected: FAIL — `Cannot find module './RelatedCalculators'`

### Step 3: Create the component

Create `src/components/RelatedCalculators.tsx`:

```tsx
import { Link } from 'react-router-dom'
import styles from './RelatedCalculators.module.css'

interface RelatedLink {
  label: string
  to: string
  description: string
}

interface Props {
  links: RelatedLink[]
}

export default function RelatedCalculators({ links }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Related Calculators</h2>
      <div className={styles.grid}>
        {links.map((link) => (
          <Link key={link.to} to={link.to} className={styles.card}>
            <span className={styles.cardLabel}>{link.label}</span>
            <span className={styles.cardDesc}>{link.description}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

### Step 4: Create the CSS module

Create `src/components/RelatedCalculators.module.css`:

```css
.section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.heading {
  font-size: 1rem;
  font-weight: 600;
  color: var(--navy);
  margin: 0 0 1rem;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.card {
  display: block;
  flex: 1;
  min-width: 160px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.card:hover {
  border-color: var(--navy);
  box-shadow: 0 2px 6px rgba(30, 58, 95, 0.1);
}

.cardLabel {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--navy);
}

.cardDesc {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}
```

### Step 5: Run tests — verify they pass

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/components/RelatedCalculators.test.tsx
```

Expected: `4 tests passed`

### Step 6: Commit

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/components/RelatedCalculators.tsx src/components/RelatedCalculators.module.css src/components/RelatedCalculators.test.tsx
git commit -m "feat: add RelatedCalculators component"
```

---

## Task 2: Wire into all 5 calculator pages

**Files:**
- Modify: `src/pages/MortgagePage.tsx`
- Modify: `src/pages/LoanPage.tsx`
- Modify: `src/pages/DebtPayoffPage.tsx`
- Modify: `src/pages/SalaryPage.tsx`
- Modify: `src/pages/CompoundPage.tsx`

### Step 1: Update MortgagePage.tsx

Add import at the top (after existing imports):
```tsx
import RelatedCalculators from '../components/RelatedCalculators'
```

Add constant before the component function:
```tsx
const MORTGAGE_RELATED = [
  { label: 'Loan Calculator', to: '/loan', description: 'Calculate monthly payments for any personal, auto, or student loan.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff', description: 'Compare snowball vs avalanche debt payoff strategies.' },
]
```

In the JSX, add `<RelatedCalculators>` after the disclaimer `<div>`, before `</main>`:
```tsx
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates only. Does not include PMI, HOA fees, property taxes, or insurance. Not a loan offer or pre-approval. Consult a licensed mortgage professional before making decisions.
      </div>
      <RelatedCalculators links={MORTGAGE_RELATED} />
    </main>
```

### Step 2: Update LoanPage.tsx

Add import:
```tsx
import RelatedCalculators from '../components/RelatedCalculators'
```

Add constant:
```tsx
const LOAN_RELATED = [
  { label: 'Mortgage Calculator', to: '/mortgage', description: 'Calculate your monthly mortgage payment and amortization schedule.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff', description: 'Compare snowball vs avalanche debt payoff strategies.' },
]
```

In JSX, after the disclaimer, before `</main>`:
```tsx
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates only. Does not include origination fees or prepayment penalties. Rates you qualify for may differ from illustrative rates shown. Not a loan offer.
      </div>
      <RelatedCalculators links={LOAN_RELATED} />
    </main>
```

### Step 3: Update DebtPayoffPage.tsx

Add import:
```tsx
import RelatedCalculators from '../components/RelatedCalculators'
```

Add constant:
```tsx
const DEBT_RELATED = [
  { label: 'Loan Calculator', to: '/loan', description: 'Calculate monthly payments for any personal, auto, or student loan.' },
  { label: 'Mortgage Calculator', to: '/mortgage', description: 'Calculate your monthly mortgage payment and amortization schedule.' },
]
```

In JSX, after the disclaimer, before `</main>`:
```tsx
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Assumes no new charges are added. Minimum payment assumptions may differ from your lender's actual terms. Consult a financial advisor for personalized debt management advice.
      </div>
      <RelatedCalculators links={DEBT_RELATED} />
    </main>
```

### Step 4: Update SalaryPage.tsx

Add import:
```tsx
import RelatedCalculators from '../components/RelatedCalculators'
```

Add constant:
```tsx
const SALARY_RELATED = [
  { label: 'Compound Interest Calculator', to: '/compound', description: 'See how your savings grow over time with compound interest.' },
]
```

In JSX, after the disclaimer, before `</main>`:
```tsx
      <RelatedCalculators links={SALARY_RELATED} />
    </main>
```

(Add after the existing disclaimer `<div>` — read the file to find the exact closing tag.)

### Step 5: Update CompoundPage.tsx

Add import:
```tsx
import RelatedCalculators from '../components/RelatedCalculators'
```

Add constant:
```tsx
const COMPOUND_RELATED = [
  { label: 'Salary Calculator', to: '/salary', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
]
```

In JSX, after the disclaimer, before `</main>`:
```tsx
      <RelatedCalculators links={COMPOUND_RELATED} />
    </main>
```

### Step 6: Run full test suite

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run
```

Expected: `30 passed` (29 existing + 4 new from Task 1 = 33 total — note: Task 1 adds 4 tests)

### Step 7: Commit

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/pages/MortgagePage.tsx src/pages/LoanPage.tsx src/pages/DebtPayoffPage.tsx src/pages/SalaryPage.tsx src/pages/CompoundPage.tsx
git commit -m "feat: add related calculators section to all 5 pages"
```

---

## Self-Review

- [x] Component spec: `RelatedCalculators` with `RelatedLink[]` prop — Task 1
- [x] CSS tokens used (`--border`, `--navy`, `--text-muted`) — Task 1 Step 4
- [x] TDD: tests before implementation — Task 1 Steps 1–2
- [x] All 5 pages wired — Task 2 Steps 1–5
- [x] Link map matches spec exactly — Task 2
- [x] Placement: after disclaimer, before `</main>` — Task 2
- [x] Import: `react-router-dom` (not `react-router`) — matches codebase pattern
