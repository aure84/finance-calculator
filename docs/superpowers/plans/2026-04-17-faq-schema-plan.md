# FAQ Schema Markup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add JSON-LD FAQ structured data to all five calculator pages to enable Google rich snippets in search results.

**Architecture:** A reusable `FAQSchema` component renders a `<script type="application/ld+json">` tag with schema.org FAQPage markup. Each calculator page imports the component and passes its own FAQ items. No external libraries needed.

**Tech Stack:** React 19, TypeScript, schema.org FAQPage JSON-LD

---

## File Structure

| File | Action | Purpose |
|---|---|---|
| `src/components/FAQSchema.tsx` | Create | Reusable JSON-LD FAQPage component |
| `src/components/FAQSchema.test.tsx` | Create | Unit tests for the component |
| `src/pages/SalaryPage.tsx` | Modify | Add FAQSchema with salary-specific questions |
| `src/pages/MortgagePage.tsx` | Modify | Add FAQSchema with mortgage-specific questions |
| `src/pages/CompoundPage.tsx` | Modify | Add FAQSchema with compound interest questions |
| `src/pages/LoanPage.tsx` | Modify | Add FAQSchema with loan-specific questions |
| `src/pages/DebtPayoffPage.tsx` | Modify | Add FAQSchema with debt payoff questions |

---

## Task 1: FAQSchema component

**Files:**
- Create: `src/components/FAQSchema.tsx`
- Create: `src/components/FAQSchema.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/FAQSchema.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FAQSchema from './FAQSchema'

describe('FAQSchema', () => {
  it('renders a script tag with application/ld+json type', () => {
    const { container } = render(
      <FAQSchema items={[{ q: 'What is X?', a: 'X is Y.' }]} />
    )
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
  })

  it('includes FAQPage @type in JSON output', () => {
    const { container } = render(
      <FAQSchema items={[{ q: 'What is X?', a: 'X is Y.' }]} />
    )
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.innerHTML)
    expect(json['@type']).toBe('FAQPage')
    expect(json['@context']).toBe('https://schema.org')
  })

  it('maps each item to a Question with acceptedAnswer', () => {
    const { container } = render(
      <FAQSchema items={[
        { q: 'Question one?', a: 'Answer one.' },
        { q: 'Question two?', a: 'Answer two.' },
      ]} />
    )
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.innerHTML)
    expect(json.mainEntity).toHaveLength(2)
    expect(json.mainEntity[0]['@type']).toBe('Question')
    expect(json.mainEntity[0].name).toBe('Question one?')
    expect(json.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
    expect(json.mainEntity[0].acceptedAnswer.text).toBe('Answer one.')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --run src/components/FAQSchema.test.tsx
```

Expected: FAIL — `FAQSchema` module not found.

- [ ] **Step 3: Create `src/components/FAQSchema.tsx`**

```tsx
interface FAQItem {
  q: string
  a: string
}

interface FAQSchemaProps {
  items: FAQItem[]
}

export default function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --run src/components/FAQSchema.test.tsx
```

Expected: 3 tests passing.

- [ ] **Step 5: Run full test suite**

```bash
npm test -- --run
```

Expected: 29 tests passing (26 existing + 3 new).

- [ ] **Step 6: Commit**

```bash
git add src/components/FAQSchema.tsx src/components/FAQSchema.test.tsx
git commit -m "feat: add FAQSchema component for JSON-LD structured data"
```

---

## Task 2: Add FAQ content to all 5 calculator pages

**Files:**
- Modify: `src/pages/SalaryPage.tsx`
- Modify: `src/pages/MortgagePage.tsx`
- Modify: `src/pages/CompoundPage.tsx`
- Modify: `src/pages/LoanPage.tsx`
- Modify: `src/pages/DebtPayoffPage.tsx`

- [ ] **Step 1: Update `src/pages/SalaryPage.tsx`**

Add `import FAQSchema from '../components/FAQSchema'` and add the component before the closing `</main>` tag:

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import SalaryCalc from '../calculators/salary/SalaryCalc'
import styles from './calculator.module.css'

const SALARY_FAQ = [
  {
    q: 'How do I calculate my take-home pay?',
    a: 'Subtract federal income tax and FICA (Social Security 6.2% + Medicare 1.45%) from your gross salary. This calculator uses 2026 federal tax brackets with a $15,000 standard deduction for single filers.',
  },
  {
    q: 'What is FICA?',
    a: 'FICA stands for Federal Insurance Contributions Act. It includes Social Security tax (6.2% on income up to $176,100) and Medicare tax (1.45% on all income), totaling 7.65% for most employees.',
  },
  {
    q: 'Does this calculator include state taxes?',
    a: 'No. This calculator covers federal income tax and FICA only. State income tax rates vary widely by state and are not included in these estimates.',
  },
  {
    q: 'What are the 2026 federal tax brackets for single filers?',
    a: '10% on income up to $11,925; 12% up to $48,475; 22% up to $103,350; 24% up to $197,300; 32% up to $250,525; 35% up to $626,350; 37% on income over $626,350.',
  },
]

export default function SalaryPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Salary Calculator — Take-Home Pay After Tax | finance-fast.com"
        description="Calculate your net take-home pay after federal income tax and FICA deductions. Free salary calculator based on 2026 US tax brackets."
      />
      <FAQSchema items={SALARY_FAQ} />
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

- [ ] **Step 2: Update `src/pages/MortgagePage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import MortgageCalc from '../calculators/mortgage/MortgageCalc'
import styles from './calculator.module.css'

const MORTGAGE_FAQ = [
  {
    q: 'How is my monthly mortgage payment calculated?',
    a: 'Your payment uses the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n−1], where P is the loan amount, r is the monthly interest rate, and n is the number of monthly payments.',
  },
  {
    q: 'What is not included in this mortgage calculator?',
    a: 'This calculator shows principal and interest only. It does not include property taxes, homeowner\'s insurance, PMI (private mortgage insurance), or HOA fees.',
  },
  {
    q: 'What is mortgage amortization?',
    a: 'Amortization is paying off a loan through regular scheduled payments. Early payments cover mostly interest; later payments cover mostly principal. The full schedule is shown in the amortization table.',
  },
  {
    q: 'How much house can I afford?',
    a: 'A common guideline is to keep total housing costs (principal, interest, taxes, and insurance) below 28% of your gross monthly income. Your total debt payments should stay below 36%.',
  },
]

export default function MortgagePage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Mortgage Calculator — Monthly Payment & Amortization | finance-fast.com"
        description="Calculate your monthly mortgage payment, total interest, and full amortization schedule. Free mortgage calculator for any home price and interest rate."
      />
      <FAQSchema items={MORTGAGE_FAQ} />
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

- [ ] **Step 3: Update `src/pages/CompoundPage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import CompoundCalc from '../calculators/compound/CompoundCalc'
import styles from './calculator.module.css'

const COMPOUND_FAQ = [
  {
    q: 'What is compound interest?',
    a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from prior periods. Unlike simple interest, it causes investments to grow exponentially over time.',
  },
  {
    q: 'What is the difference between compounding frequencies?',
    a: 'More frequent compounding results in slightly higher returns. Daily compounding earns marginally more than annual compounding at the same interest rate, because interest is added to principal more often.',
  },
  {
    q: 'What is the Rule of 72?',
    a: 'Divide 72 by your annual interest rate to estimate how many years it takes to double your investment. For example, at 8% annual return your money doubles in about 9 years (72 ÷ 8 = 9).',
  },
  {
    q: 'Does this calculator account for inflation?',
    a: 'No. The results shown are nominal (not inflation-adjusted). To estimate real returns, subtract the expected inflation rate from your annual interest rate before calculating.',
  },
]

export default function CompoundPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Compound Interest Calculator — See Your Investment Grow | finance-fast.com"
        description="Calculate compound interest with annual, quarterly, monthly, or daily compounding. Free compound interest calculator with year-by-year breakdown."
      />
      <FAQSchema items={COMPOUND_FAQ} />
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

- [ ] **Step 4: Update `src/pages/LoanPage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import LoanCalc from '../calculators/loan/LoanCalc'
import styles from './calculator.module.css'

const LOAN_FAQ = [
  {
    q: 'How is a monthly loan payment calculated?',
    a: 'Using the amortization formula: M = P[r(1+r)^n]/[(1+r)^n−1], where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments.',
  },
  {
    q: 'What types of loans can I calculate?',
    a: 'This calculator works for any fixed-rate installment loan: personal loans, auto loans, student loans, home equity loans, and more. Enter the loan amount, interest rate, and term.',
  },
  {
    q: 'What is APR?',
    a: 'APR (Annual Percentage Rate) is the yearly cost of borrowing. This calculator uses the interest rate directly. Your actual APR may be higher if the lender charges origination fees or other costs.',
  },
  {
    q: 'How can I pay off my loan faster?',
    a: 'Making extra payments toward the principal reduces your balance faster and saves interest. Even an extra $50–$100 per month can shorten a 5-year loan by several months and save hundreds in interest.',
  },
]

export default function LoanPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Loan Calculator — Monthly Payment & Total Cost | finance-fast.com"
        description="Calculate monthly loan payments and total interest for any personal, auto, or student loan. Free loan calculator with instant results."
      />
      <FAQSchema items={LOAN_FAQ} />
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

- [ ] **Step 5: Update `src/pages/DebtPayoffPage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import DebtPayoffCalc from '../calculators/debt-payoff/DebtPayoffCalc'
import styles from './calculator.module.css'

const DEBT_FAQ = [
  {
    q: 'What is the debt snowball method?',
    a: 'The snowball method pays off debts from smallest balance to largest, regardless of interest rate. After paying off the smallest debt, you roll that payment into the next. It provides quick psychological wins.',
  },
  {
    q: 'What is the debt avalanche method?',
    a: 'The avalanche method pays off debts from highest interest rate to lowest. It minimizes the total interest you pay over time and is the mathematically optimal strategy for saving money.',
  },
  {
    q: 'Which debt payoff method saves more money?',
    a: 'The avalanche method always saves more in total interest paid. The snowball method may be better if you need motivational wins to stay on track, since eliminating accounts quickly provides momentum.',
  },
  {
    q: 'What is the "extra monthly payment" field?',
    a: 'This is any amount you can pay above your combined minimum payments each month. The calculator applies it to your target debt (smallest balance for snowball, highest rate for avalanche), accelerating payoff significantly.',
  },
]

export default function DebtPayoffPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Debt Payoff Calculator — Snowball vs Avalanche | finance-fast.com"
        description="Compare snowball vs avalanche debt payoff strategies. See which method saves you more interest and pays off debt faster. Free debt payoff calculator."
      />
      <FAQSchema items={DEBT_FAQ} />
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

- [ ] **Step 6: Run full test suite**

```bash
npm test -- --run
```

Expected: 29 tests passing, 0 failures.

- [ ] **Step 7: Commit**

```bash
git add src/pages/SalaryPage.tsx src/pages/MortgagePage.tsx src/pages/CompoundPage.tsx src/pages/LoanPage.tsx src/pages/DebtPayoffPage.tsx
git commit -m "feat: add FAQ schema markup to all 5 calculator pages"
```
