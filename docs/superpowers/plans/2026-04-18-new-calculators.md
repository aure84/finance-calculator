# New Calculators Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Retirement, Tax Refund, and Savings Goal calculator pages to finance-fast.com.

**Architecture:** Each calculator follows the existing pattern: `*.ts` (pure logic) + `*.test.ts` (unit tests) + `*Calc.tsx` (UI) + `*Page.tsx` (SEO wrapper). Three new routes in App.tsx, three new cards on HomePage.

**Tech Stack:** React 19, TypeScript, CSS Modules, React Router DOM, Vitest + Testing Library

---

## File Map

| File | Action |
|------|--------|
| `src/calculators/retirement/retirement.ts` | Create |
| `src/calculators/retirement/retirement.test.ts` | Create |
| `src/calculators/retirement/RetirementCalc.tsx` | Create |
| `src/pages/RetirementPage.tsx` | Create |
| `src/calculators/tax-refund/taxRefund.ts` | Create |
| `src/calculators/tax-refund/taxRefund.test.ts` | Create |
| `src/calculators/tax-refund/TaxRefundCalc.tsx` | Create |
| `src/pages/TaxRefundPage.tsx` | Create |
| `src/calculators/savings-goal/savingsGoal.ts` | Create |
| `src/calculators/savings-goal/savingsGoal.test.ts` | Create |
| `src/calculators/savings-goal/SavingsGoalCalc.tsx` | Create |
| `src/pages/SavingsGoalPage.tsx` | Create |
| `src/App.tsx` | Modify — add 3 routes |
| `src/pages/HomePage.tsx` | Modify — add 3 cards |

---

## Task 1: Retirement Calculator

**Files:**
- Create: `src/calculators/retirement/retirement.test.ts`
- Create: `src/calculators/retirement/retirement.ts`
- Create: `src/calculators/retirement/RetirementCalc.tsx`
- Create: `src/pages/RetirementPage.tsx`

### Step 1: Write failing tests

Create `src/calculators/retirement/retirement.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { calcRetirement } from './retirement'

describe('calcRetirement', () => {
  it('calculates projected balance with compound growth', () => {
    const result = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 6, years: 20 })
    expect(result.projectedBalance).toBeCloseTo(264122, 0)
  })

  it('handles zero return rate without division by zero', () => {
    const result = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 0, years: 10 })
    expect(result.projectedBalance).toBeCloseTo(70000, 0)
    expect(result.totalInterest).toBe(0)
  })

  it('calculates total contributions and interest', () => {
    const result = calcRetirement({ currentSavings: 0, monthlyContribution: 100, annualReturn: 0, years: 10 })
    expect(result.totalContributions).toBe(12000)
    expect(result.totalInterest).toBe(0)
  })
})
```

### Step 2: Run tests — verify they fail

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/retirement/retirement.test.ts
```

Expected: FAIL — `Cannot find module './retirement'`

### Step 3: Create logic

Create `src/calculators/retirement/retirement.ts`:

```ts
export interface RetirementInput {
  currentSavings: number
  monthlyContribution: number
  annualReturn: number  // percentage, e.g. 6 for 6%
  years: number
}

export interface RetirementResult {
  projectedBalance: number
  totalContributions: number
  totalInterest: number
}

export function calcRetirement(input: RetirementInput): RetirementResult {
  const { currentSavings, monthlyContribution, annualReturn, years } = input
  const r = annualReturn / 100 / 12
  const n = years * 12

  const fvSavings = currentSavings * Math.pow(1 + r, n)
  const fvContributions = r === 0
    ? monthlyContribution * n
    : monthlyContribution * ((Math.pow(1 + r, n) - 1) / r)

  const projectedBalance = fvSavings + fvContributions
  const totalContributions = currentSavings + monthlyContribution * n
  const totalInterest = projectedBalance - totalContributions

  return { projectedBalance, totalContributions, totalInterest }
}
```

### Step 4: Run tests — verify they pass

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/retirement/retirement.test.ts
```

Expected: 3 tests passed

### Step 5: Create UI component

Create `src/calculators/retirement/RetirementCalc.tsx`:

```tsx
import { useState } from 'react'
import { calcRetirement } from './retirement'
import { formatCurrency } from '../../utils/format'

export default function RetirementCalc() {
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualReturn, setAnnualReturn] = useState('')
  const [years, setYears] = useState('')

  const cs = parseFloat(currentSavings)
  const mc = parseFloat(monthlyContribution)
  const ar = parseFloat(annualReturn)
  const y = parseFloat(years)
  const result = [cs, mc, ar, y].every(v => !isNaN(v) && v >= 0) && y > 0
    ? calcRetirement({ currentSavings: cs, monthlyContribution: mc, annualReturn: ar, years: y })
    : null

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, height: 43, boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Current Savings ($)</label>
          <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} placeholder="10000" style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Monthly Contribution ($)</label>
          <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} placeholder="500" style={{ ...inputStyle, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Return (%)</label>
          <input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} placeholder="6" style={{ ...inputStyle, width: 140 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Years to Retirement</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="20" style={{ ...inputStyle, width: 140 }} />
        </div>
      </div>

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Projected Balance', formatCurrency(result.projectedBalance)],
              ['Total Contributions', formatCurrency(result.totalContributions)],
              ['Total Interest Earned', formatCurrency(result.totalInterest)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            For illustrative purposes only. Does not account for inflation, taxes, Social Security, or investment fees. Past market returns do not guarantee future results.
          </p>
        </div>
      )}
    </div>
  )
}
```

### Step 6: Create page

Create `src/pages/RetirementPage.tsx`:

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import RetirementCalc from '../calculators/retirement/RetirementCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const RETIREMENT_RELATED = [
  { label: 'Compound Interest Calculator', to: '/compound-interest-calculator', description: 'See how your savings grow over time with compound interest.' },
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
]

const RETIREMENT_FAQ = [
  {
    q: 'What is a realistic annual return rate?',
    a: 'The S&P 500 has historically returned around 10% annually before inflation. A conservative estimate of 6–7% accounts for inflation and diversification.',
  },
  {
    q: 'How much should I save per month?',
    a: 'A common guideline is to save 15% of your gross income for retirement, including any employer match.',
  },
  {
    q: 'What is compound growth?',
    a: 'Compound growth means your returns earn returns. The longer your money is invested, the more powerful this effect becomes — even small monthly contributions add up significantly over decades.',
  },
]

export default function RetirementPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Retirement Calculator — Project Your Savings | finance-fast.com"
        description="Calculate your projected retirement balance based on current savings, monthly contributions, and expected return. Free retirement savings calculator."
      />
      <FAQSchema items={RETIREMENT_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Retirement Calculator
      </div>
      <h1 className={styles.title}>Retirement Calculator</h1>
      <p className={styles.subtitle}>
        Project your retirement savings based on current balance, monthly contributions, and expected annual return.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <RetirementCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> For illustrative purposes only. Does not account for inflation, taxes, Social Security, or investment fees. Past market returns do not guarantee future results.
      </div>
      <RelatedCalculators links={RETIREMENT_RELATED} />
    </main>
  )
}
```

### Step 7: Commit

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/calculators/retirement/ src/pages/RetirementPage.tsx
git commit -m "feat: add retirement calculator"
```

---

## Task 2: Tax Refund Calculator

**Files:**
- Create: `src/calculators/tax-refund/taxRefund.test.ts`
- Create: `src/calculators/tax-refund/taxRefund.ts`
- Create: `src/calculators/tax-refund/TaxRefundCalc.tsx`
- Create: `src/pages/TaxRefundPage.tsx`

### Step 1: Write failing tests

Create `src/calculators/tax-refund/taxRefund.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { calcTaxRefund, FilingStatus } from './taxRefund'

describe('calcTaxRefund', () => {
  it('calculates refund for single filer', () => {
    // $50,000 income, $15,000 standard deduction = $35,000 taxable
    // 10% on first $11,925 = $1,192.50, 12% on $23,075 = $2,769 → total $3,961.50
    const result = calcTaxRefund({ filingStatus: FilingStatus.Single, grossIncome: 50000, federalWithheld: 5000 })
    expect(result.federalTax).toBeCloseTo(3961.5, 0)
    expect(result.refundOrOwed).toBeCloseTo(1038.5, 0)
    expect(result.isRefund).toBe(true)
  })

  it('calculates amount owed when withholding is insufficient', () => {
    const result = calcTaxRefund({ filingStatus: FilingStatus.Single, grossIncome: 50000, federalWithheld: 2000 })
    expect(result.isRefund).toBe(false)
    expect(result.refundOrOwed).toBeCloseTo(1961.5, 0)
  })

  it('returns zero tax when income is below standard deduction', () => {
    const result = calcTaxRefund({ filingStatus: FilingStatus.Single, grossIncome: 10000, federalWithheld: 500 })
    expect(result.federalTax).toBe(0)
    expect(result.refundOrOwed).toBe(500)
    expect(result.isRefund).toBe(true)
  })

  it('uses married filing jointly brackets and deduction', () => {
    const result = calcTaxRefund({ filingStatus: FilingStatus.MarriedFilingJointly, grossIncome: 80000, federalWithheld: 5000 })
    // $80,000 - $30,000 deduction = $50,000 taxable
    // 10% on $23,850 = $2,385, 12% on $26,150 = $3,138 → $5,523
    expect(result.federalTax).toBeCloseTo(5523, 0)
  })
})
```

### Step 2: Run tests — verify they fail

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/tax-refund/taxRefund.test.ts
```

Expected: FAIL — `Cannot find module './taxRefund'`

### Step 3: Create logic

Create `src/calculators/tax-refund/taxRefund.ts`:

```ts
export enum FilingStatus {
  Single = 'single',
  MarriedFilingJointly = 'mfj',
  MarriedFilingSeparately = 'mfs',
  HeadOfHousehold = 'hoh',
}

interface Bracket {
  rate: number
  min: number
  max: number
}

const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  [FilingStatus.Single]: 15000,
  [FilingStatus.MarriedFilingJointly]: 30000,
  [FilingStatus.MarriedFilingSeparately]: 15000,
  [FilingStatus.HeadOfHousehold]: 22500,
}

const BRACKETS: Record<FilingStatus, Bracket[]> = {
  [FilingStatus.Single]: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity },
  ],
  [FilingStatus.MarriedFilingJointly]: [
    { rate: 0.10, min: 0, max: 23850 },
    { rate: 0.12, min: 23850, max: 96950 },
    { rate: 0.22, min: 96950, max: 206700 },
    { rate: 0.24, min: 206700, max: 394600 },
    { rate: 0.32, min: 394600, max: 501050 },
    { rate: 0.35, min: 501050, max: 751600 },
    { rate: 0.37, min: 751600, max: Infinity },
  ],
  [FilingStatus.MarriedFilingSeparately]: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity },
  ],
  [FilingStatus.HeadOfHousehold]: [
    { rate: 0.10, min: 0, max: 17000 },
    { rate: 0.12, min: 17000, max: 64850 },
    { rate: 0.22, min: 64850, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250500 },
    { rate: 0.35, min: 250500, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity },
  ],
}

export interface TaxRefundInput {
  filingStatus: FilingStatus
  grossIncome: number
  federalWithheld: number
}

export interface TaxRefundResult {
  taxableIncome: number
  federalTax: number
  refundOrOwed: number
  isRefund: boolean
}

export function calcTaxRefund(input: TaxRefundInput): TaxRefundResult {
  const { filingStatus, grossIncome, federalWithheld } = input
  const standardDeduction = STANDARD_DEDUCTIONS[filingStatus]
  const taxableIncome = Math.max(0, grossIncome - standardDeduction)

  let federalTax = 0
  for (const bracket of BRACKETS[filingStatus]) {
    if (taxableIncome <= bracket.min) break
    const taxable = Math.min(taxableIncome, bracket.max) - bracket.min
    federalTax += taxable * bracket.rate
  }

  const diff = federalWithheld - federalTax
  return {
    taxableIncome,
    federalTax,
    refundOrOwed: Math.abs(diff),
    isRefund: diff >= 0,
  }
}
```

### Step 4: Run tests — verify they pass

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/tax-refund/taxRefund.test.ts
```

Expected: 4 tests passed

### Step 5: Create UI component

Create `src/calculators/tax-refund/TaxRefundCalc.tsx`:

```tsx
import { useState } from 'react'
import { calcTaxRefund, FilingStatus } from './taxRefund'
import { formatCurrency } from '../../utils/format'

export default function TaxRefundCalc() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(FilingStatus.Single)
  const [grossIncome, setGrossIncome] = useState('')
  const [federalWithheld, setFederalWithheld] = useState('')

  const gi = parseFloat(grossIncome)
  const fw = parseFloat(federalWithheld)
  const result = !isNaN(gi) && gi >= 0 && !isNaN(fw) && fw >= 0
    ? calcTaxRefund({ filingStatus, grossIncome: gi, federalWithheld: fw })
    : null

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, height: 43, boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Filing Status</label>
          <select value={filingStatus} onChange={e => setFilingStatus(e.target.value as FilingStatus)}
            style={{ ...inputStyle, width: 220 }}>
            <option value={FilingStatus.Single}>Single</option>
            <option value={FilingStatus.MarriedFilingJointly}>Married Filing Jointly</option>
            <option value={FilingStatus.MarriedFilingSeparately}>Married Filing Separately</option>
            <option value={FilingStatus.HeadOfHousehold}>Head of Household</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Gross Income ($)</label>
          <input type="number" value={grossIncome} onChange={e => setGrossIncome(e.target.value)} placeholder="60000"
            style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Federal Tax Withheld ($)</label>
          <input type="number" value={federalWithheld} onChange={e => setFederalWithheld(e.target.value)} placeholder="7000"
            style={{ ...inputStyle, width: 180 }} />
        </div>
      </div>

      {result && (
        <div>
          <div style={{
            background: result.isRefund ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${result.isRefund ? '#86efac' : '#fca5a5'}`,
            borderRadius: 8,
            padding: 20,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, color: result.isRefund ? '#166534' : '#991b1b', marginBottom: 4 }}>
              {result.isRefund ? 'Estimated Refund' : 'Estimated Amount Owed'}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: result.isRefund ? '#16a34a' : '#dc2626' }}>
              {formatCurrency(result.refundOrOwed)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              ['Taxable Income', formatCurrency(result.taxableIncome)],
              ['Estimated Federal Tax', formatCurrency(result.federalTax)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            Based on 2025 federal tax brackets and standard deduction. Does not include state taxes, AMT, tax credits, or deductions beyond the standard deduction.
          </p>
        </div>
      )}
    </div>
  )
}
```

### Step 6: Create page

Create `src/pages/TaxRefundPage.tsx`:

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import TaxRefundCalc from '../calculators/tax-refund/TaxRefundCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const TAX_RELATED = [
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
  { label: 'Loan Calculator', to: '/loan-calculator', description: 'Calculate monthly payments for any personal, auto, or student loan.' },
]

const TAX_FAQ = [
  {
    q: 'How is my federal tax calculated?',
    a: 'The US uses a progressive bracket system — each portion of your income is taxed at the corresponding marginal rate, not your entire income at the top rate.',
  },
  {
    q: 'What is the standard deduction for 2025?',
    a: 'For 2025: $15,000 (Single or Married Filing Separately), $30,000 (Married Filing Jointly), and $22,500 (Head of Household). This amount is subtracted from your gross income before tax is calculated.',
  },
  {
    q: 'When will I get my refund?',
    a: 'The IRS issues most refunds within 21 days of e-filing. Paper returns take 4–8 weeks. You can check your status at IRS.gov using the "Where\'s My Refund?" tool.',
  },
]

export default function TaxRefundPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Tax Refund Calculator 2025 — Federal Refund Estimator | finance-fast.com"
        description="Estimate your 2025 federal tax refund or amount owed. Enter your income, filing status, and withholding for an instant estimate."
      />
      <FAQSchema items={TAX_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Tax Refund Calculator
      </div>
      <h1 className={styles.title}>Tax Refund Calculator 2025</h1>
      <p className={styles.subtitle}>
        Estimate your federal tax refund or amount owed based on your income, filing status, and withholding.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <TaxRefundCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates based on 2025 federal standard deductions and tax brackets only. Does not include state taxes, AMT, credits, or itemized deductions. Consult a tax professional for accurate filing.
      </div>
      <RelatedCalculators links={TAX_RELATED} />
    </main>
  )
}
```

### Step 7: Commit

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/calculators/tax-refund/ src/pages/TaxRefundPage.tsx
git commit -m "feat: add tax refund calculator"
```

---

## Task 3: Savings Goal Calculator

**Files:**
- Create: `src/calculators/savings-goal/savingsGoal.test.ts`
- Create: `src/calculators/savings-goal/savingsGoal.ts`
- Create: `src/calculators/savings-goal/SavingsGoalCalc.tsx`
- Create: `src/pages/SavingsGoalPage.tsx`

### Step 1: Write failing tests

Create `src/calculators/savings-goal/savingsGoal.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { calcSavingsGoal } from './savingsGoal'

describe('calcSavingsGoal', () => {
  it('calculates months when return is zero', () => {
    const result = calcSavingsGoal({ goalAmount: 10000, currentSavings: 1000, monthlyContribution: 300, annualReturn: 0 })
    expect(result.months).toBe(30)
    expect(result.totalContributions).toBe(10000)
    expect(result.totalInterest).toBe(0)
  })

  it('calculates months with compound return', () => {
    const result = calcSavingsGoal({ goalAmount: 10000, currentSavings: 1000, monthlyContribution: 300, annualReturn: 5 })
    expect(result.months).toBeLessThan(30)
    expect(result.totalInterest).toBeGreaterThan(0)
  })

  it('returns zero months when current savings already meets goal', () => {
    const result = calcSavingsGoal({ goalAmount: 5000, currentSavings: 6000, monthlyContribution: 100, annualReturn: 3 })
    expect(result.months).toBe(0)
  })

  it('returns null when goal is unreachable (no contribution, no return)', () => {
    const result = calcSavingsGoal({ goalAmount: 10000, currentSavings: 1000, monthlyContribution: 0, annualReturn: 0 })
    expect(result).toBeNull()
  })
})
```

### Step 2: Run tests — verify they fail

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/savings-goal/savingsGoal.test.ts
```

Expected: FAIL — `Cannot find module './savingsGoal'`

### Step 3: Create logic

Create `src/calculators/savings-goal/savingsGoal.ts`:

```ts
export interface SavingsGoalInput {
  goalAmount: number
  currentSavings: number
  monthlyContribution: number
  annualReturn: number  // percentage, e.g. 5 for 5%
}

export interface SavingsGoalResult {
  months: number
  years: number
  totalContributions: number
  totalInterest: number
}

export function calcSavingsGoal(input: SavingsGoalInput): SavingsGoalResult | null {
  const { goalAmount, currentSavings, monthlyContribution, annualReturn } = input

  if (currentSavings >= goalAmount) {
    return { months: 0, years: 0, totalContributions: currentSavings, totalInterest: 0 }
  }

  if (monthlyContribution <= 0 && annualReturn <= 0) return null

  const r = annualReturn / 100 / 12

  let months: number
  if (r === 0) {
    months = Math.ceil((goalAmount - currentSavings) / monthlyContribution)
  } else {
    // Closed-form: months = log((goal*r + pmt) / (pv*r + pmt)) / log(1+r)
    const numerator = goalAmount * r + monthlyContribution
    const denominator = currentSavings * r + monthlyContribution
    if (denominator <= 0) return null
    months = Math.ceil(Math.log(numerator / denominator) / Math.log(1 + r))
  }

  const totalContributions = currentSavings + monthlyContribution * months
  const totalInterest = goalAmount - totalContributions

  return {
    months,
    years: Math.round((months / 12) * 10) / 10,
    totalContributions,
    totalInterest: Math.max(0, totalInterest),
  }
}
```

### Step 4: Run tests — verify they pass

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/savings-goal/savingsGoal.test.ts
```

Expected: 4 tests passed

### Step 5: Create UI component

Create `src/calculators/savings-goal/SavingsGoalCalc.tsx`:

```tsx
import { useState } from 'react'
import { calcSavingsGoal } from './savingsGoal'
import { formatCurrency } from '../../utils/format'

export default function SavingsGoalCalc() {
  const [goalAmount, setGoalAmount] = useState('')
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualReturn, setAnnualReturn] = useState('')

  const ga = parseFloat(goalAmount)
  const cs = parseFloat(currentSavings)
  const mc = parseFloat(monthlyContribution)
  const ar = parseFloat(annualReturn)
  const result = [ga, cs, mc, ar].every(v => !isNaN(v) && v >= 0) && ga > 0
    ? calcSavingsGoal({ goalAmount: ga, currentSavings: cs, monthlyContribution: mc, annualReturn: ar })
    : null

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, height: 43, boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Goal Amount ($)</label>
          <input type="number" value={goalAmount} onChange={e => setGoalAmount(e.target.value)} placeholder="10000" style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Current Savings ($)</label>
          <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} placeholder="1000" style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Monthly Contribution ($)</label>
          <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} placeholder="300" style={{ ...inputStyle, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Return (%)</label>
          <input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} placeholder="4" style={{ ...inputStyle, width: 140 }} />
        </div>
      </div>

      {result === null && [parseFloat(goalAmount), parseFloat(currentSavings), parseFloat(monthlyContribution), parseFloat(annualReturn)].every(v => !isNaN(v)) && (
        <p style={{ color: '#dc2626', fontSize: 14 }}>Goal is unreachable with $0 monthly contribution and 0% return.</p>
      )}

      {result !== null && result.months === 0 && (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: '#166534' }}>You have already reached your goal!</div>
        </div>
      )}

      {result !== null && result.months > 0 && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Months to Goal', result.months.toString()],
              ['Years to Goal', result.years.toString()],
              ['Total Contributions', formatCurrency(result.totalContributions)],
              ['Total Interest Earned', formatCurrency(result.totalInterest)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            For illustrative purposes only. Assumes fixed monthly contribution and constant annual return. Does not account for taxes on investment gains.
          </p>
        </div>
      )}
    </div>
  )
}
```

### Step 6: Create page

Create `src/pages/SavingsGoalPage.tsx`:

```tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import SavingsGoalCalc from '../calculators/savings-goal/SavingsGoalCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const SAVINGS_RELATED = [
  { label: 'Compound Interest Calculator', to: '/compound-interest-calculator', description: 'See how your savings grow over time with compound interest.' },
  { label: 'Retirement Calculator', to: '/retirement-calculator', description: 'Project your savings balance at retirement.' },
]

const SAVINGS_FAQ = [
  {
    q: 'How long will it take to reach my savings goal?',
    a: 'It depends on your starting balance, monthly contribution, and return rate. This calculator uses compound interest to project the exact timeline.',
  },
  {
    q: 'Does investment return really make a difference?',
    a: 'Even a modest 4–5% annual return in a high-yield savings account significantly shortens the timeline compared to keeping money in a 0% checking account.',
  },
  {
    q: 'What is a realistic savings return rate?',
    a: 'High-yield savings accounts currently offer 4–5%. Investing in index funds historically returns 7–10% annually, with more short-term risk. Choose a rate that matches where you plan to save.',
  },
]

export default function SavingsGoalPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Savings Goal Calculator — How Long to Save? | finance-fast.com"
        description="Find out how many months it will take to reach your savings goal. Enter your target amount, current savings, monthly contribution, and return rate."
      />
      <FAQSchema items={SAVINGS_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Savings Goal Calculator
      </div>
      <h1 className={styles.title}>Savings Goal Calculator</h1>
      <p className={styles.subtitle}>
        Find out how long it will take to reach your savings target based on your contributions and expected return.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <SavingsGoalCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> For illustrative purposes only. Assumes a fixed monthly contribution and constant annual return. Does not account for taxes on investment gains or changes in contribution amount.
      </div>
      <RelatedCalculators links={SAVINGS_RELATED} />
    </main>
  )
}
```

### Step 7: Commit

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/calculators/savings-goal/ src/pages/SavingsGoalPage.tsx
git commit -m "feat: add savings goal calculator"
```

---

## Task 4: Wire routes and HomePage

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/HomePage.tsx`

### Step 1: Read current App.tsx

Read `src/App.tsx` to find the existing route pattern before editing.

### Step 2: Add 3 routes to App.tsx

Add these imports at the top of App.tsx (after existing page imports):
```tsx
import RetirementPage from './pages/RetirementPage'
import TaxRefundPage from './pages/TaxRefundPage'
import SavingsGoalPage from './pages/SavingsGoalPage'
```

Add these routes inside the `<Routes>` block (after existing routes):
```tsx
<Route path="/retirement-calculator" element={<RetirementPage />} />
<Route path="/tax-refund-calculator" element={<TaxRefundPage />} />
<Route path="/savings-goal-calculator" element={<SavingsGoalPage />} />
```

### Step 3: Update HomePage.tsx

Add `PiggyBank`, `Receipt`, `Target` to the lucide-react import.

Add 3 entries to the `calculators` array:
```tsx
{ to: '/retirement-calculator', icon: PiggyBank, title: 'Retirement Calculator', desc: 'Project your savings at retirement' },
{ to: '/tax-refund-calculator', icon: Receipt, title: 'Tax Refund Calculator', desc: 'Estimate your federal tax refund or amount owed' },
{ to: '/savings-goal-calculator', icon: Target, title: 'Savings Goal Calculator', desc: 'Find out how long to reach your savings target' },
```

### Step 4: Run full test suite

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run
```

Expected: all tests pass (29 existing + 3 + 4 + 4 = 40 total)

### Step 5: Commit

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/App.tsx src/pages/HomePage.tsx
git commit -m "feat: wire retirement, tax refund, savings goal routes and homepage cards"
```

---

## Self-Review

- [x] All routes use `-calculator` suffix — matches existing pattern
- [x] All RelatedCalculators links use full `-calculator` routes
- [x] Zero-return edge cases handled in all calculators
- [x] TDD: tests written before implementation in every task
- [x] Disclaimer text in both Calc component and Page for each calculator
- [x] inputStyle object reused in each Calc to ensure consistent height
- [x] Lucide icons verified: PiggyBank, Receipt, Target exist in lucide-react
