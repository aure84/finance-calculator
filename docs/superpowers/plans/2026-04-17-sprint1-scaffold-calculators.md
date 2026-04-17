# finance-fast.com Sprint 1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a live, fully functional personal finance calculator site with 5 calculators, shared layout components, and legal pages — ready for Cloudflare Pages deployment.

**Architecture:** Standalone React 19 + Vite + TypeScript app. Each calculator has a pure logic module (`.ts`) and a UI component (`.tsx`). Pages are thin wrappers that compose components. No backend, no API calls — all math runs client-side.

**Tech Stack:** React 19, Vite 6, TypeScript (strict), React Router v6, Vitest, ESLint, Prettier, Cloudflare Pages

---

## File Structure

```
finance-calculator/
├── src/
│   ├── calculators/
│   │   ├── salary/
│   │   │   ├── salary.ts          # pure math: tax calc, net pay
│   │   │   └── SalaryCalc.tsx     # form + result UI
│   │   ├── mortgage/
│   │   │   ├── mortgage.ts        # monthly payment, amortization
│   │   │   └── MortgageCalc.tsx
│   │   ├── compound/
│   │   │   ├── compound.ts        # compound interest formula
│   │   │   └── CompoundCalc.tsx
│   │   ├── loan/
│   │   │   ├── loan.ts            # loan payment formula
│   │   │   └── LoanCalc.tsx
│   │   └── debt-payoff/
│   │       ├── debtPayoff.ts      # snowball + avalanche logic
│   │       └── DebtPayoffCalc.tsx
│   ├── components/
│   │   ├── Nav.tsx                # site navigation
│   │   ├── Footer.tsx             # footer with legal links
│   │   └── AdSlot.tsx             # AdSense placeholder
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── SalaryPage.tsx
│   │   ├── MortgagePage.tsx
│   │   ├── CompoundPage.tsx
│   │   ├── LoanPage.tsx
│   │   ├── DebtPayoffPage.tsx
│   │   └── legal/
│   │       ├── PrivacyPage.tsx
│   │       ├── TermsPage.tsx
│   │       ├── DisclaimerPage.tsx
│   │       └── CookiesPage.tsx
│   ├── utils/
│   │   └── format.ts              # formatCurrency, formatPercent
│   ├── App.tsx                    # router + layout
│   ├── main.tsx
│   └── index.css
├── public/
│   └── robots.txt
├── index.html
├── vite.config.ts
├── tsconfig.json
└── .prettierrc
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `.prettierrc`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `index.html`

- [ ] **Step 1: Initialize Vite project**

```bash
cd "/Volumes/SLT/Claude Code"
npm create vite@latest finance-calculator -- --template react-ts
cd finance-calculator
npm install
```

Expected: `node_modules/` created, `npm run dev` serves a React starter page.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Clean boilerplate**

Delete these files:
```bash
rm src/App.css src/assets/react.svg public/vite.svg
```

Replace `src/App.tsx` with:
```tsx
export default function App() {
  return <div>finance-fast.com</div>
}
```

Replace `src/index.css` with:
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; color: #1a1a1a; background: #fff; }
```

- [ ] **Step 4: Configure Vitest**

Replace `vite.config.ts` with:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

Create `src/test-setup.ts`:
```ts
import '@testing-library/jest-dom'
```

Add to `tsconfig.json` compilerOptions:
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Add scripts to package.json**

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "lint": "eslint src --ext ts,tsx"
}
```

- [ ] **Step 6: Verify**

```bash
npm run dev
```
Expected: React app loads at `http://localhost:5173`, browser shows "finance-fast.com", no console errors.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold React 19 + Vite project"
```

---

### Task 2: Utility Functions

**Files:**
- Create: `src/utils/format.ts`
- Create: `src/utils/format.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/utils/format.test.ts`:
```ts
import { formatCurrency, formatPercent, formatNumber } from './format'

describe('formatCurrency', () => {
  it('formats whole dollars', () => {
    expect(formatCurrency(1234)).toBe('$1,234.00')
  })
  it('formats cents', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })
  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
  it('formats large numbers', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })
})

describe('formatPercent', () => {
  it('formats decimal as percent', () => {
    expect(formatPercent(0.065)).toBe('6.50%')
  })
  it('formats zero', () => {
    expect(formatPercent(0)).toBe('0.00%')
  })
})

describe('formatNumber', () => {
  it('formats with commas', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```
Expected: FAIL — "formatCurrency is not a function"

- [ ] **Step 3: Implement**

Create `src/utils/format.ts`:
```ts
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```
Expected: PASS — 7 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/utils/
git commit -m "feat: add formatting utilities"
```

---

### Task 3: Salary Calculator Logic

**Files:**
- Create: `src/calculators/salary/salary.ts`
- Create: `src/calculators/salary/salary.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/calculators/salary/salary.test.ts`:
```ts
import { calcSalary, type SalaryResult } from './salary'

describe('calcSalary', () => {
  it('calculates net pay for $50,000 salary', () => {
    const result = calcSalary({ annualSalary: 50000, filingStatus: 'single' })
    expect(result.federalTax).toBeGreaterThan(0)
    expect(result.fica).toBeCloseTo(3825, 0)  // 7.65% of 50000
    expect(result.netAnnual).toBeLessThan(50000)
    expect(result.netMonthly).toBeCloseTo(result.netAnnual / 12, 1)
  })

  it('calculates FICA correctly', () => {
    const result = calcSalary({ annualSalary: 100000, filingStatus: 'single' })
    // SS: 6.2% up to $176,100, Medicare: 1.45%
    expect(result.socialSecurity).toBeCloseTo(6200, 0)
    expect(result.medicare).toBeCloseTo(1450, 0)
  })

  it('caps Social Security at wage base', () => {
    const result = calcSalary({ annualSalary: 200000, filingStatus: 'single' })
    expect(result.socialSecurity).toBeCloseTo(176100 * 0.062, 0)
  })

  it('returns all pay periods', () => {
    const result = calcSalary({ annualSalary: 60000, filingStatus: 'single' })
    expect(result.netBiweekly).toBeCloseTo(result.netAnnual / 26, 1)
    expect(result.netWeekly).toBeCloseTo(result.netAnnual / 52, 1)
    expect(result.netHourly).toBeCloseTo(result.netAnnual / 2080, 2)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```
Expected: FAIL — "calcSalary is not a function"

- [ ] **Step 3: Implement**

Create `src/calculators/salary/salary.ts`:
```ts
export interface SalaryInput {
  annualSalary: number
  filingStatus: 'single' | 'married'
}

export interface SalaryResult {
  grossAnnual: number
  federalTax: number
  socialSecurity: number
  medicare: number
  fica: number
  netAnnual: number
  netMonthly: number
  netBiweekly: number
  netWeekly: number
  netHourly: number
  effectiveRate: number
}

// 2026 federal tax brackets
const BRACKETS_SINGLE = [
  { rate: 0.10, min: 0,       max: 11925 },
  { rate: 0.12, min: 11925,   max: 48475 },
  { rate: 0.22, min: 48475,   max: 103350 },
  { rate: 0.24, min: 103350,  max: 197300 },
  { rate: 0.32, min: 197300,  max: 250525 },
  { rate: 0.35, min: 250525,  max: 626350 },
  { rate: 0.37, min: 626350,  max: Infinity },
]

const BRACKETS_MARRIED = [
  { rate: 0.10, min: 0,       max: 23850 },
  { rate: 0.12, min: 23850,   max: 96950 },
  { rate: 0.22, min: 96950,   max: 206700 },
  { rate: 0.24, min: 206700,  max: 394600 },
  { rate: 0.32, min: 394600,  max: 501050 },
  { rate: 0.35, min: 501050,  max: 751600 },
  { rate: 0.37, min: 751600,  max: Infinity },
]

const STANDARD_DEDUCTION_SINGLE = 15000
const STANDARD_DEDUCTION_MARRIED = 30000
const SS_WAGE_BASE = 176100
const SS_RATE = 0.062
const MEDICARE_RATE = 0.0145

function calcFederalTax(taxableIncome: number, filingStatus: 'single' | 'married'): number {
  const brackets = filingStatus === 'single' ? BRACKETS_SINGLE : BRACKETS_MARRIED
  let tax = 0
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break
    const taxableAtRate = Math.min(taxableIncome, bracket.max) - bracket.min
    tax += taxableAtRate * bracket.rate
  }
  return tax
}

export function calcSalary(input: SalaryInput): SalaryResult {
  const { annualSalary, filingStatus } = input
  const deduction = filingStatus === 'single' ? STANDARD_DEDUCTION_SINGLE : STANDARD_DEDUCTION_MARRIED
  const taxableIncome = Math.max(0, annualSalary - deduction)
  const federalTax = calcFederalTax(taxableIncome, filingStatus)
  const socialSecurity = Math.min(annualSalary, SS_WAGE_BASE) * SS_RATE
  const medicare = annualSalary * MEDICARE_RATE
  const fica = socialSecurity + medicare
  const netAnnual = annualSalary - federalTax - fica

  return {
    grossAnnual: annualSalary,
    federalTax,
    socialSecurity,
    medicare,
    fica,
    netAnnual,
    netMonthly: netAnnual / 12,
    netBiweekly: netAnnual / 26,
    netWeekly: netAnnual / 52,
    netHourly: netAnnual / 2080,
    effectiveRate: annualSalary > 0 ? (federalTax + fica) / annualSalary : 0,
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```
Expected: PASS — 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/calculators/salary/
git commit -m "feat: salary calculator logic with 2026 tax brackets"
```

---

### Task 4: Mortgage Calculator Logic

**Files:**
- Create: `src/calculators/mortgage/mortgage.ts`
- Create: `src/calculators/mortgage/mortgage.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/calculators/mortgage/mortgage.test.ts`:
```ts
import { calcMortgage } from './mortgage'

describe('calcMortgage', () => {
  it('calculates monthly payment for $300,000 at 7% for 30 years', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    expect(result.monthlyPayment).toBeCloseTo(1995.91, 1)
  })

  it('calculates total interest', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    expect(result.totalInterest).toBeCloseTo(418527.6, 0)
  })

  it('calculates total cost', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    expect(result.totalCost).toBeCloseTo(result.monthlyPayment * 360, 0)
  })

  it('returns amortization schedule with correct length', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    expect(result.schedule.length).toBe(360)
  })

  it('first payment has correct principal/interest split', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    const first = result.schedule[0]
    expect(first.interest).toBeCloseTo(1750, 0) // 300000 * 0.07 / 12
    expect(first.principal).toBeCloseTo(245.91, 0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```
Expected: FAIL

- [ ] **Step 3: Implement**

Create `src/calculators/mortgage/mortgage.ts`:
```ts
export interface MortgageInput {
  principal: number
  annualRate: number  // percentage, e.g. 7 for 7%
  termYears: number
}

export interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export interface MortgageResult {
  monthlyPayment: number
  totalCost: number
  totalInterest: number
  schedule: AmortizationRow[]
}

export function calcMortgage(input: MortgageInput): MortgageResult {
  const { principal, annualRate, termYears } = input
  const r = annualRate / 100 / 12
  const n = termYears * 12

  const monthlyPayment = r === 0
    ? principal / n
    : principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

  const schedule: AmortizationRow[] = []
  let balance = principal

  for (let month = 1; month <= n; month++) {
    const interest = balance * r
    const principalPaid = monthlyPayment - interest
    balance = Math.max(0, balance - principalPaid)
    schedule.push({ month, payment: monthlyPayment, principal: principalPaid, interest, balance })
  }

  const totalCost = monthlyPayment * n
  const totalInterest = totalCost - principal

  return { monthlyPayment, totalCost, totalInterest, schedule }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```
Expected: PASS — 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/calculators/mortgage/
git commit -m "feat: mortgage calculator with amortization schedule"
```

---

### Task 5: Compound Interest Calculator Logic

**Files:**
- Create: `src/calculators/compound/compound.ts`
- Create: `src/calculators/compound/compound.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/calculators/compound/compound.test.ts`:
```ts
import { calcCompound } from './compound'

describe('calcCompound', () => {
  it('calculates compound interest correctly', () => {
    // $10,000 at 5% for 10 years compounded annually
    const result = calcCompound({ principal: 10000, annualRate: 5, years: 10, compoundingFrequency: 1 })
    expect(result.finalAmount).toBeCloseTo(16288.95, 1)
    expect(result.totalInterest).toBeCloseTo(6288.95, 1)
  })

  it('monthly compounding yields more than annual', () => {
    const annual = calcCompound({ principal: 10000, annualRate: 5, years: 10, compoundingFrequency: 1 })
    const monthly = calcCompound({ principal: 10000, annualRate: 5, years: 10, compoundingFrequency: 12 })
    expect(monthly.finalAmount).toBeGreaterThan(annual.finalAmount)
  })

  it('returns yearly breakdown', () => {
    const result = calcCompound({ principal: 10000, annualRate: 5, years: 5, compoundingFrequency: 12 })
    expect(result.yearlyBreakdown.length).toBe(5)
    expect(result.yearlyBreakdown[0].year).toBe(1)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```
Expected: FAIL

- [ ] **Step 3: Implement**

Create `src/calculators/compound/compound.ts`:
```ts
export interface CompoundInput {
  principal: number
  annualRate: number      // percentage, e.g. 5 for 5%
  years: number
  compoundingFrequency: number  // 1=annually, 4=quarterly, 12=monthly, 365=daily
}

export interface YearlyRow {
  year: number
  balance: number
  interestEarned: number
}

export interface CompoundResult {
  finalAmount: number
  totalInterest: number
  yearlyBreakdown: YearlyRow[]
}

export function calcCompound(input: CompoundInput): CompoundResult {
  const { principal, annualRate, years, compoundingFrequency: n } = input
  const r = annualRate / 100

  const yearlyBreakdown: YearlyRow[] = []
  let prevBalance = principal

  for (let year = 1; year <= years; year++) {
    const balance = principal * Math.pow(1 + r / n, n * year)
    yearlyBreakdown.push({
      year,
      balance,
      interestEarned: balance - prevBalance,
    })
    prevBalance = balance
  }

  const finalAmount = yearlyBreakdown[yearlyBreakdown.length - 1]?.balance ?? principal
  return { finalAmount, totalInterest: finalAmount - principal, yearlyBreakdown }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```
Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/calculators/compound/
git commit -m "feat: compound interest calculator"
```

---

### Task 6: Loan Calculator Logic

**Files:**
- Create: `src/calculators/loan/loan.ts`
- Create: `src/calculators/loan/loan.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/calculators/loan/loan.test.ts`:
```ts
import { calcLoan } from './loan'

describe('calcLoan', () => {
  it('calculates monthly payment for $25,000 car loan at 6% for 5 years', () => {
    const result = calcLoan({ amount: 25000, annualRate: 6, termMonths: 60 })
    expect(result.monthlyPayment).toBeCloseTo(483.32, 1)
  })

  it('calculates total interest', () => {
    const result = calcLoan({ amount: 25000, annualRate: 6, termMonths: 60 })
    expect(result.totalInterest).toBeCloseTo(3999.2, 0)
  })

  it('handles zero interest', () => {
    const result = calcLoan({ amount: 12000, annualRate: 0, termMonths: 12 })
    expect(result.monthlyPayment).toBeCloseTo(1000, 1)
    expect(result.totalInterest).toBeCloseTo(0, 1)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```
Expected: FAIL

- [ ] **Step 3: Implement**

Create `src/calculators/loan/loan.ts`:
```ts
export interface LoanInput {
  amount: number
  annualRate: number   // percentage
  termMonths: number
}

export interface LoanResult {
  monthlyPayment: number
  totalCost: number
  totalInterest: number
}

export function calcLoan(input: LoanInput): LoanResult {
  const { amount, annualRate, termMonths } = input
  const r = annualRate / 100 / 12

  const monthlyPayment = r === 0
    ? amount / termMonths
    : amount * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1)

  const totalCost = monthlyPayment * termMonths
  const totalInterest = totalCost - amount

  return { monthlyPayment, totalCost, totalInterest }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```
Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/calculators/loan/
git commit -m "feat: loan calculator"
```

---

### Task 7: Debt Payoff Calculator Logic

**Files:**
- Create: `src/calculators/debt-payoff/debtPayoff.ts`
- Create: `src/calculators/debt-payoff/debtPayoff.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/calculators/debt-payoff/debtPayoff.test.ts`:
```ts
import { calcDebtPayoff, type Debt } from './debtPayoff'

const debts: Debt[] = [
  { id: '1', name: 'Credit Card A', balance: 5000, apr: 20, minPayment: 100 },
  { id: '2', name: 'Credit Card B', balance: 2000, apr: 15, minPayment: 50 },
]

describe('calcDebtPayoff', () => {
  it('snowball pays smallest balance first', () => {
    const result = calcDebtPayoff({ debts, extraPayment: 100, method: 'snowball' })
    // Card B (smaller balance) should be paid off first
    expect(result.payoffOrder[0].id).toBe('2')
  })

  it('avalanche pays highest interest first', () => {
    const result = calcDebtPayoff({ debts, extraPayment: 100, method: 'avalanche' })
    // Card A (higher APR) should be paid off first
    expect(result.payoffOrder[0].id).toBe('1')
  })

  it('avalanche pays less total interest than snowball', () => {
    const snowball = calcDebtPayoff({ debts, extraPayment: 100, method: 'snowball' })
    const avalanche = calcDebtPayoff({ debts, extraPayment: 100, method: 'avalanche' })
    expect(avalanche.totalInterest).toBeLessThanOrEqual(snowball.totalInterest)
  })

  it('returns months to payoff', () => {
    const result = calcDebtPayoff({ debts, extraPayment: 0, method: 'avalanche' })
    expect(result.monthsToPayoff).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```
Expected: FAIL

- [ ] **Step 3: Implement**

Create `src/calculators/debt-payoff/debtPayoff.ts`:
```ts
export interface Debt {
  id: string
  name: string
  balance: number
  apr: number       // percentage
  minPayment: number
}

export interface DebtPayoffInput {
  debts: Debt[]
  extraPayment: number
  method: 'snowball' | 'avalanche'
}

export interface PayoffDebt {
  id: string
  name: string
  monthsPaidOff: number
  totalInterestPaid: number
}

export interface DebtPayoffResult {
  monthsToPayoff: number
  totalInterest: number
  totalPaid: number
  payoffOrder: PayoffDebt[]
}

export function calcDebtPayoff(input: DebtPayoffInput): DebtPayoffResult {
  const { extraPayment, method } = input
  let balances = input.debts.map(d => ({ ...d, balance: d.balance, interestPaid: 0 }))
  const payoffOrder: PayoffDebt[] = []
  let month = 0
  const MAX_MONTHS = 600

  while (balances.some(d => d.balance > 0) && month < MAX_MONTHS) {
    month++

    // Sort target debt
    const active = balances.filter(d => d.balance > 0)
    const target = method === 'snowball'
      ? active.sort((a, b) => a.balance - b.balance)[0]
      : active.sort((a, b) => b.apr - a.apr)[0]

    for (const debt of balances) {
      if (debt.balance <= 0) continue
      const monthlyRate = debt.apr / 100 / 12
      const interest = debt.balance * monthlyRate
      debt.interestPaid += interest
      let payment = debt.minPayment
      if (debt.id === target.id) payment += extraPayment
      payment = Math.min(payment, debt.balance + interest)
      debt.balance = Math.max(0, debt.balance + interest - payment)

      if (debt.balance === 0 && !payoffOrder.find(p => p.id === debt.id)) {
        payoffOrder.push({
          id: debt.id,
          name: debt.name,
          monthsPaidOff: month,
          totalInterestPaid: debt.interestPaid,
        })
      }
    }
  }

  const totalInterest = balances.reduce((sum, d) => sum + d.interestPaid, 0)
  const totalPaid = input.debts.reduce((sum, d) => sum + d.balance, 0) + totalInterest

  return { monthsToPayoff: month, totalInterest, totalPaid, payoffOrder }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```
Expected: PASS — 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/calculators/debt-payoff/
git commit -m "feat: debt payoff calculator (snowball + avalanche)"
```

---

### Task 8: Shared Components

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/AdSlot.tsx`

- [ ] **Step 1: Create Nav**

Create `src/components/Nav.tsx`:
```tsx
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/salary-calculator', label: 'Salary' },
  { to: '/mortgage-calculator', label: 'Mortgage' },
  { to: '/compound-interest-calculator', label: 'Compound Interest' },
  { to: '/loan-calculator', label: 'Loan' },
  { to: '/debt-payoff-calculator', label: 'Debt Payoff' },
]

export default function Nav() {
  return (
    <header style={{ borderBottom: '1px solid #e5e7eb', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 32 }}>
      <NavLink to="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: 'none', color: '#1a1a1a' }}>
        finance-fast.com
      </NavLink>
      <nav style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#2563eb' : '#4b5563',
              fontWeight: isActive ? 600 : 400,
              fontSize: 14,
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Create Footer**

Create `src/components/Footer.tsx`:
```tsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', padding: '24px', marginTop: 48, fontSize: 13, color: '#6b7280' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <p>© {new Date().getFullYear()} finance-fast.com — For informational purposes only. Not financial advice.</p>
        <nav style={{ display: 'flex', gap: 16 }}>
          <Link to="/disclaimer" style={{ color: '#6b7280' }}>Disclaimer</Link>
          <Link to="/privacy-policy" style={{ color: '#6b7280' }}>Privacy Policy</Link>
          <Link to="/terms-of-use" style={{ color: '#6b7280' }}>Terms of Use</Link>
          <Link to="/cookies" style={{ color: '#6b7280' }}>Cookies</Link>
        </nav>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create AdSlot**

Create `src/components/AdSlot.tsx`:
```tsx
interface AdSlotProps {
  slot: 'header' | 'content' | 'footer'
}

export default function AdSlot({ slot }: AdSlotProps) {
  const dimensions = {
    header: { width: '100%', height: 90, label: 'Advertisement (728×90)' },
    content: { width: 336, height: 280, label: 'Advertisement (336×280)' },
    footer: { width: '100%', height: 90, label: 'Advertisement (728×90)' },
  }[slot]

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        background: '#f3f4f6',
        border: '1px dashed #d1d5db',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af',
        fontSize: 12,
        margin: '16px auto',
      }}
    >
      {dimensions.label}
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/
git commit -m "feat: Nav, Footer, AdSlot components"
```

---

### Task 9: Calculator UI Components

**Files:**
- Create: `src/calculators/salary/SalaryCalc.tsx`
- Create: `src/calculators/mortgage/MortgageCalc.tsx`
- Create: `src/calculators/compound/CompoundCalc.tsx`
- Create: `src/calculators/loan/LoanCalc.tsx`
- Create: `src/calculators/debt-payoff/DebtPayoffCalc.tsx`

- [ ] **Step 1: Create SalaryCalc.tsx**

Create `src/calculators/salary/SalaryCalc.tsx`:
```tsx
import { useState } from 'react'
import { calcSalary } from './salary'
import { formatCurrency, formatPercent } from '../../utils/format'

export default function SalaryCalc() {
  const [salary, setSalary] = useState('')
  const [filing, setFiling] = useState<'single' | 'married'>('single')

  const value = parseFloat(salary)
  const result = !isNaN(value) && value > 0
    ? calcSalary({ annualSalary: value, filingStatus: filing })
    : null

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Salary</label>
          <input
            type="number"
            value={salary}
            onChange={e => setSalary(e.target.value)}
            placeholder="e.g. 75000"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 200 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Filing Status</label>
          <select
            value={filing}
            onChange={e => setFiling(e.target.value as 'single' | 'married')}
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16 }}
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      {result && (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <tbody>
              {[
                ['Gross Annual', formatCurrency(result.grossAnnual)],
                ['Federal Income Tax', formatCurrency(result.federalTax)],
                ['Social Security (6.2%)', formatCurrency(result.socialSecurity)],
                ['Medicare (1.45%)', formatCurrency(result.medicare)],
                ['Total FICA', formatCurrency(result.fica)],
              ].map(([label, val]) => (
                <tr key={label} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 0', color: '#6b7280' }}>{label}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right' }}>{val}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700, fontSize: 16 }}>
                <td style={{ padding: '12px 0' }}>Net Take-Home (Annual)</td>
                <td style={{ padding: '12px 0', textAlign: 'right', color: '#16a34a' }}>{formatCurrency(result.netAnnual)}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
            {[
              ['Monthly', result.netMonthly],
              ['Bi-Weekly', result.netBiweekly],
              ['Weekly', result.netWeekly],
              ['Hourly', result.netHourly],
            ].map(([label, val]) => (
              <div key={label as string} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 120 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{formatCurrency(val as number)}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 12, color: '#9ca3af' }}>
            Effective tax rate: {formatPercent(result.effectiveRate)} · Based on 2026 federal brackets · State tax not included
          </p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create MortgageCalc.tsx**

Create `src/calculators/mortgage/MortgageCalc.tsx`:
```tsx
import { useState } from 'react'
import { calcMortgage } from './mortgage'
import { formatCurrency } from '../../utils/format'

export default function MortgageCalc() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('30')

  const p = parseFloat(principal)
  const r = parseFloat(rate)
  const y = parseFloat(years)
  const result = !isNaN(p) && !isNaN(r) && !isNaN(y) && p > 0 && r > 0 && y > 0
    ? calcMortgage({ principal: p, annualRate: r, termYears: y })
    : null

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        {[
          { label: 'Home Price / Loan Amount ($)', val: principal, set: setPrincipal, placeholder: '300000' },
          { label: 'Annual Interest Rate (%)', val: rate, set: setRate, placeholder: '7.0' },
          { label: 'Loan Term (Years)', val: years, set: setYears, placeholder: '30' },
        ].map(({ label, val, set, placeholder }) => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>{label}</label>
            <input
              type="number"
              value={val}
              onChange={e => set(e.target.value)}
              placeholder={placeholder}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 200 }}
            />
          </div>
        ))}
      </div>

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Monthly Payment', formatCurrency(result.monthlyPayment)],
              ['Total Interest', formatCurrency(result.totalInterest)],
              ['Total Cost', formatCurrency(result.totalCost)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <details>
            <summary style={{ cursor: 'pointer', fontSize: 14, color: '#2563eb', marginBottom: 8 }}>
              View amortization schedule (first 24 months)
            </summary>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  {['Month', 'Payment', 'Principal', 'Interest', 'Balance'].map(h => (
                    <th key={h} style={{ padding: '8px', textAlign: 'right' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.schedule.slice(0, 24).map(row => (
                  <tr key={row.month} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{row.month}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{formatCurrency(row.payment)}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{formatCurrency(row.principal)}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{formatCurrency(row.interest)}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
          <p style={{ marginTop: 12, fontSize: 12, color: '#9ca3af' }}>
            Does not include PMI, HOA, property taxes, or homeowner's insurance. Not a loan offer or pre-approval.
          </p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create CompoundCalc.tsx**

Create `src/calculators/compound/CompoundCalc.tsx`:
```tsx
import { useState } from 'react'
import { calcCompound } from './compound'
import { formatCurrency } from '../../utils/format'

export default function CompoundCalc() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [frequency, setFrequency] = useState('12')

  const p = parseFloat(principal)
  const r = parseFloat(rate)
  const y = parseFloat(years)
  const n = parseFloat(frequency)
  const result = [p, r, y, n].every(v => !isNaN(v) && v > 0)
    ? calcCompound({ principal: p, annualRate: r, years: y, compoundingFrequency: n })
    : null

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Initial Investment ($)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="10000"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="5"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Time (Years)</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="10"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 120 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Compounding</label>
          <select value={frequency} onChange={e => setFrequency(e.target.value)}
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16 }}>
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Final Amount', formatCurrency(result.finalAmount)],
              ['Total Interest', formatCurrency(result.totalInterest)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            Hypothetical results only. Does not account for taxes, inflation, or fees. Not a guarantee of future returns.
          </p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create LoanCalc.tsx**

Create `src/calculators/loan/LoanCalc.tsx`:
```tsx
import { useState } from 'react'
import { calcLoan } from './loan'
import { formatCurrency } from '../../utils/format'

export default function LoanCalc() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [months, setMonths] = useState('')

  const a = parseFloat(amount)
  const r = parseFloat(rate)
  const m = parseFloat(months)
  const result = !isNaN(a) && !isNaN(r) && !isNaN(m) && a > 0 && m > 0
    ? calcLoan({ amount: a, annualRate: r, termMonths: m })
    : null

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Loan Amount ($)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="25000"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="6"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Loan Term (Months)</label>
          <input type="number" value={months} onChange={e => setMonths(e.target.value)} placeholder="60"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 140 }} />
        </div>
      </div>

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Monthly Payment', formatCurrency(result.monthlyPayment)],
              ['Total Interest', formatCurrency(result.totalInterest)],
              ['Total Cost', formatCurrency(result.totalCost)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            Does not include origination fees or prepayment penalties. Advertised rates may differ from rates you qualify for.
          </p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Create DebtPayoffCalc.tsx**

Create `src/calculators/debt-payoff/DebtPayoffCalc.tsx`:
```tsx
import { useState } from 'react'
import { calcDebtPayoff, type Debt } from './debtPayoff'
import { formatCurrency } from '../../utils/format'

const defaultDebts: Debt[] = [
  { id: '1', name: 'Credit Card 1', balance: 5000, apr: 20, minPayment: 100 },
  { id: '2', name: 'Credit Card 2', balance: 2000, apr: 15, minPayment: 50 },
]

export default function DebtPayoffCalc() {
  const [debts, setDebts] = useState<Debt[]>(defaultDebts)
  const [extra, setExtra] = useState('100')

  const extraVal = parseFloat(extra) || 0
  const snowball = calcDebtPayoff({ debts, extraPayment: extraVal, method: 'snowball' })
  const avalanche = calcDebtPayoff({ debts, extraPayment: extraVal, method: 'avalanche' })

  const updateDebt = (id: string, field: keyof Debt, value: string) => {
    setDebts(prev => prev.map(d => d.id === id
      ? { ...d, [field]: field === 'name' ? value : parseFloat(value) || 0 }
      : d
    ))
  }

  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>Your Debts</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 16 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            {['Name', 'Balance ($)', 'APR (%)', 'Min Payment ($)'].map(h => (
              <th key={h} style={{ padding: '8px', textAlign: 'left' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {debts.map(d => (
            <tr key={d.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              {(['name', 'balance', 'apr', 'minPayment'] as (keyof Debt)[]).map(field => (
                <td key={field} style={{ padding: '6px 8px' }}>
                  <input
                    type={field === 'name' ? 'text' : 'number'}
                    value={d[field]}
                    onChange={e => updateDebt(d.id, field, e.target.value)}
                    style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 4, width: '100%' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Extra Monthly Payment ($)</label>
        <input type="number" value={extra} onChange={e => setExtra(e.target.value)} placeholder="100"
          style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 160 }} />
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[
          { label: '❄️ Snowball', result: snowball },
          { label: '🌊 Avalanche', result: avalanche },
        ].map(({ label, result }) => (
          <div key={label} style={{ background: '#f9fafb', padding: 20, borderRadius: 8, minWidth: 200, flex: 1 }}>
            <h4 style={{ marginBottom: 12 }}>{label}</h4>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Months to payoff</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{result.monthsToPayoff} months</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Total interest paid</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#dc2626' }}>{formatCurrency(result.totalInterest)}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: '#9ca3af' }}>
        Assumes no new charges. Minimum payment assumptions may differ from your lender's terms.
      </p>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/calculators/
git commit -m "feat: calculator UI components (salary, mortgage, compound, loan, debt payoff)"
```

---

### Task 10: Legal Pages

**Files:**
- Create: `src/pages/legal/DisclaimerPage.tsx`
- Create: `src/pages/legal/PrivacyPage.tsx`
- Create: `src/pages/legal/TermsPage.tsx`
- Create: `src/pages/legal/CookiesPage.tsx`

- [ ] **Step 1: Create DisclaimerPage.tsx**

Create `src/pages/legal/DisclaimerPage.tsx`:
```tsx
export default function DisclaimerPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 24 }}>Financial Disclaimer</h1>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        <strong>For informational purposes only.</strong> The calculators on finance-fast.com provide estimates only. Results are not financial, tax, investment, or legal advice.
      </p>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        Calculation results may not reflect current interest rates, tax laws, lender requirements, or your personal financial situation. Tax brackets, Social Security wage bases, and other figures are updated periodically but may not reflect the most recent changes. Always consult a licensed financial advisor, CPA, mortgage professional, or attorney before making financial decisions.
      </p>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        finance-fast.com is not a licensed financial advisor, broker, lender, or attorney. Use of this site does not create any advisor-client relationship.
      </p>
      <p style={{ color: '#374151', lineHeight: 1.7 }}>
        finance-fast.com assumes no liability for financial decisions made based on calculations from this site. See our <a href="/terms-of-use" style={{ color: '#2563eb' }}>Terms of Use</a> for full limitation of liability.
      </p>
    </main>
  )
}
```

- [ ] **Step 2: Create PrivacyPage.tsx**

Create `src/pages/legal/PrivacyPage.tsx`:
```tsx
export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ marginBottom: 24, color: '#6b7280', fontSize: 14 }}>Last updated: April 2026</p>

      <h2 style={{ marginBottom: 12 }}>Data We Collect</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        finance-fast.com collects standard web analytics data through Google Analytics 4 (page views, session duration, browser type, approximate location) and advertising data through Google AdSense (cookies for ad personalization). We do not collect your name, email, or the values you enter into calculators.
      </p>

      <h2 style={{ marginBottom: 12 }}>Third-Party Services</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        We use Google Analytics 4 and Google AdSense. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out at <a href="https://www.google.com/settings/ads" style={{ color: '#2563eb' }}>Google Ad Settings</a> or via the <a href="https://optout.networkadvertising.org/" style={{ color: '#2563eb' }}>NAI opt-out page</a>. For more information on how Google uses data, see <a href="https://www.google.com/policies/privacy/partners/" style={{ color: '#2563eb' }}>google.com/policies/privacy/partners</a>.
      </p>

      <h2 style={{ marginBottom: 12 }}>Cookies</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        We use cookies for analytics (_ga, _gid) and advertising (Google AdSense cookies). See our <a href="/cookies" style={{ color: '#2563eb' }}>Cookie Policy</a> for details. You can disable cookies in your browser settings.
      </p>

      <h2 style={{ marginBottom: 12 }}>GDPR (EU Users)</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        If you are located in the EU/EEA, you have the right to access, correct, or delete your personal data. To exercise these rights or for privacy questions, contact us at: privacy@finance-fast.com. Google LLC is a data processor under our use of Google Analytics and AdSense.
      </p>

      <h2 style={{ marginBottom: 12 }}>CCPA (California Users)</h2>
      <p style={{ color: '#374151', lineHeight: 1.7 }}>
        California residents have the right to know what personal information is collected and to opt out of the sale of personal information. We do not sell personal information. To submit a request: privacy@finance-fast.com.
      </p>
    </main>
  )
}
```

- [ ] **Step 3: Create TermsPage.tsx**

Create `src/pages/legal/TermsPage.tsx`:
```tsx
export default function TermsPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Terms of Use</h1>
      <p style={{ marginBottom: 24, color: '#6b7280', fontSize: 14 }}>Last updated: April 2026</p>

      <h2 style={{ marginBottom: 12 }}>Permitted Use</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        finance-fast.com is provided for personal, non-commercial use only. You may not resell, scrape, or embed our calculators on other websites without written permission.
      </p>

      <h2 style={{ marginBottom: 12 }}>No Warranty</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        This site is provided "as is" without warranty of any kind. We do not warrant the accuracy, completeness, or fitness for any particular purpose of any calculation result.
      </p>

      <h2 style={{ marginBottom: 12 }}>Limitation of Liability</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        To the maximum extent permitted by law, finance-fast.com and its owners shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or reliance on any calculation results. Our total liability shall not exceed $0.
      </p>

      <h2 style={{ marginBottom: 12 }}>Dispute Resolution & Arbitration</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        Any dispute arising from these Terms or your use of this site shall be resolved by binding individual arbitration under the American Arbitration Association rules. <strong>You waive your right to participate in any class action lawsuit or class-wide arbitration.</strong> Arbitration shall take place in the state of the site owner.
      </p>

      <h2 style={{ marginBottom: 12 }}>Governing Law</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        These Terms are governed by applicable United States law. We reserve the right to modify these Terms at any time without notice.
      </p>

      <h2 style={{ marginBottom: 12 }}>Indemnification</h2>
      <p style={{ color: '#374151', lineHeight: 1.7 }}>
        You agree to indemnify and hold harmless finance-fast.com from any claims, losses, or damages arising from your use of the site or violation of these Terms.
      </p>
    </main>
  )
}
```

- [ ] **Step 4: Create CookiesPage.tsx**

Create `src/pages/legal/CookiesPage.tsx`:
```tsx
export default function CookiesPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Cookie Policy</h1>
      <p style={{ marginBottom: 24, color: '#6b7280', fontSize: 14 }}>Last updated: April 2026</p>

      <h2 style={{ marginBottom: 12 }}>Cookies We Use</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            {['Cookie', 'Provider', 'Purpose', 'Duration'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['_ga', 'Google Analytics', 'Distinguishes users', '2 years'],
            ['_gid', 'Google Analytics', 'Distinguishes users', '24 hours'],
            ['IDE', 'Google AdSense', 'Ad targeting and measurement', '1 year'],
            ['test_cookie', 'Google', 'Checks browser cookie support', 'Session'],
          ].map(([name, provider, purpose, duration]) => (
            <tr key={name} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>{name}</td>
              <td style={{ padding: '8px' }}>{provider}</td>
              <td style={{ padding: '8px', color: '#6b7280' }}>{purpose}</td>
              <td style={{ padding: '8px' }}>{duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginBottom: 12 }}>How to Control Cookies</h2>
      <p style={{ color: '#374151', lineHeight: 1.7 }}>
        You can disable cookies in your browser settings. You can also opt out of Google advertising cookies at <a href="https://www.google.com/settings/ads" style={{ color: '#2563eb' }}>Google Ad Settings</a>.
      </p>
    </main>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/legal/
git commit -m "feat: legal pages (disclaimer, privacy, terms, cookies)"
```

---

### Task 11: Page Components & Routing

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/SalaryPage.tsx`
- Create: `src/pages/MortgagePage.tsx`
- Create: `src/pages/CompoundPage.tsx`
- Create: `src/pages/LoanPage.tsx`
- Create: `src/pages/DebtPayoffPage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create calculator pages**

Create `src/pages/SalaryPage.tsx`:
```tsx
import AdSlot from '../components/AdSlot'
import SalaryCalc from '../calculators/salary/SalaryCalc'

export default function SalaryPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Salary Calculator — Take-Home Pay After Tax</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        Calculate your net take-home pay after federal income tax and FICA deductions. Based on 2026 tax brackets.
      </p>
      <SalaryCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only. Results are not tax or financial advice. Figures are based on 2026 federal tax brackets and do not include state or local taxes. Consult a CPA for personalized advice.
      </div>
    </main>
  )
}
```

Create `src/pages/MortgagePage.tsx`:
```tsx
import AdSlot from '../components/AdSlot'
import MortgageCalc from '../calculators/mortgage/MortgageCalc'

export default function MortgagePage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Mortgage Calculator</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        Calculate your monthly mortgage payment, total interest, and see a full amortization schedule.
      </p>
      <MortgageCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> Estimates only. Does not include PMI, HOA fees, property taxes, or insurance. Not a loan offer or pre-approval. Consult a licensed mortgage professional before making decisions.
      </div>
    </main>
  )
}
```

Create `src/pages/CompoundPage.tsx`:
```tsx
import AdSlot from '../components/AdSlot'
import CompoundCalc from '../calculators/compound/CompoundCalc'

export default function CompoundPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Compound Interest Calculator</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        See how your investment grows over time with compound interest. Compare annual, quarterly, monthly, and daily compounding.
      </p>
      <CompoundCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> Hypothetical results only. Does not account for taxes on gains, inflation, or fund fees. Not a guarantee of future investment returns.
      </div>
    </main>
  )
}
```

Create `src/pages/LoanPage.tsx`:
```tsx
import AdSlot from '../components/AdSlot'
import LoanCalc from '../calculators/loan/LoanCalc'

export default function LoanPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Loan Calculator</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        Calculate monthly payments, total interest, and total cost for any personal, auto, or student loan.
      </p>
      <LoanCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> Estimates only. Does not include origination fees or prepayment penalties. Rates you qualify for may differ from illustrative rates shown. Not a loan offer.
      </div>
    </main>
  )
}
```

Create `src/pages/DebtPayoffPage.tsx`:
```tsx
import AdSlot from '../components/AdSlot'
import DebtPayoffCalc from '../calculators/debt-payoff/DebtPayoffCalc'

export default function DebtPayoffPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Debt Payoff Calculator — Snowball vs Avalanche</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        Compare two debt payoff strategies: snowball (smallest balance first) vs avalanche (highest interest first). See which saves you more money.
      </p>
      <DebtPayoffCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> Assumes no new charges are added. Minimum payment assumptions may differ from your lender's actual terms. Consult a financial advisor for personalized debt management advice.
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create HomePage.tsx**

Create `src/pages/HomePage.tsx`:
```tsx
import { Link } from 'react-router-dom'

const calculators = [
  { to: '/salary-calculator', emoji: '💰', title: 'Salary Calculator', desc: 'Calculate take-home pay after federal taxes' },
  { to: '/mortgage-calculator', emoji: '🏠', title: 'Mortgage Calculator', desc: 'Monthly payments and amortization schedule' },
  { to: '/compound-interest-calculator', emoji: '📈', title: 'Compound Interest', desc: 'See your investment grow over time' },
  { to: '/loan-calculator', emoji: '🚗', title: 'Loan Calculator', desc: 'Monthly payments for any loan type' },
  { to: '/debt-payoff-calculator', emoji: '💳', title: 'Debt Payoff', desc: 'Snowball vs avalanche comparison' },
]

export default function HomePage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>Free Financial Calculators</h1>
      <p style={{ color: '#6b7280', marginBottom: 40, fontSize: 18 }}>
        Fast, accurate calculators for your most important financial decisions.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {calculators.map(c => (
          <Link key={c.to} to={c.to} style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, display: 'block', transition: 'border-color 0.15s' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{c.emoji}</div>
            <div style={{ fontWeight: 600, fontSize: 16, color: '#1a1a1a', marginBottom: 6 }}>{c.title}</div>
            <div style={{ fontSize: 14, color: '#6b7280' }}>{c.desc}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Wire routing in App.tsx**

Replace `src/App.tsx` with:
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SalaryPage from './pages/SalaryPage'
import MortgagePage from './pages/MortgagePage'
import CompoundPage from './pages/CompoundPage'
import LoanPage from './pages/LoanPage'
import DebtPayoffPage from './pages/DebtPayoffPage'
import DisclaimerPage from './pages/legal/DisclaimerPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import TermsPage from './pages/legal/TermsPage'
import CookiesPage from './pages/legal/CookiesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/salary-calculator" element={<SalaryPage />} />
        <Route path="/mortgage-calculator" element={<MortgagePage />} />
        <Route path="/compound-interest-calculator" element={<CompoundPage />} />
        <Route path="/loan-calculator" element={<LoanPage />} />
        <Route path="/debt-payoff-calculator" element={<DebtPayoffPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-of-use" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="*" element={<main style={{ padding: '60px 24px', textAlign: 'center' }}><h1>404 — Page Not Found</h1></main>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/ src/App.tsx
git commit -m "feat: all pages and routing wired up"
```

---

### Task 12: Cloudflare Pages Config & robots.txt

**Files:**
- Create: `public/robots.txt`
- Create: `_redirects` (Cloudflare SPA routing)

- [ ] **Step 1: Create robots.txt**

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://finance-fast.com/sitemap.xml
```

- [ ] **Step 2: Create _redirects for SPA routing**

Create `public/_redirects`:
```
/* /index.html 200
```

This tells Cloudflare Pages to serve `index.html` for all routes, enabling React Router client-side routing.

- [ ] **Step 3: Final build check**

```bash
npm run build
```

Expected: `dist/` folder created, no TypeScript errors, no build warnings.

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: All tests pass. (Salary: 4, Mortgage: 5, Compound: 3, Loan: 3, Debt Payoff: 4, Format: 7 = 26 total)

- [ ] **Step 5: Smoke test locally**

```bash
npm run preview
```

Open `http://localhost:4173`. Verify:
- Homepage loads with 5 calculator cards
- Each calculator route loads and calculates correctly
- Salary: enter 75000, select Single → shows net pay breakdown
- Mortgage: enter 300000, 7%, 30 years → $1,995.91/month
- Compound: enter 10000, 5%, 10 years, monthly → shows final amount
- Loan: enter 25000, 6%, 60 months → $483.32/month
- Debt payoff: default debts → shows snowball vs avalanche comparison
- All 4 legal pages load
- 404 page shows for unknown routes
- Nav links highlight active route
- Footer legal links work

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: Sprint 1 complete — 5 calculators, legal pages, Cloudflare config"
```

- [ ] **Step 7: Push to GitHub and deploy**

```bash
git remote add origin https://github.com/aure84/finance-calculator.git
git push -u origin main
```

Expected: Cloudflare Pages picks up the push and deploys automatically. Visit `https://finance-fast.com` to verify live site.

---

## Self-Review Checklist

**Spec coverage:**
- [x] 5 calculators with instant results — Tasks 3–9
- [x] Salary: annual↔hourly, federal tax, FICA — Task 3
- [x] Mortgage: monthly payment, amortization table — Task 4
- [x] Compound: principal, rate, years, compounding frequency — Task 5
- [x] Loan: amount, rate, term → payment + total cost — Task 6
- [x] Debt payoff: snowball vs avalanche — Task 7
- [x] Per-calculator disclaimer visible on every page — Task 11
- [x] Legal pages: Privacy, Terms (with arbitration clause), Disclaimer, Cookies — Task 10
- [x] Nav + Footer with legal links — Task 8
- [x] AdSlot placeholders (header, content, footer) — Task 8
- [x] Cloudflare Pages SPA routing — Task 12
- [x] robots.txt — Task 12
- [x] Homepage with calculator cards — Task 11

**Not in Sprint 1 (covered in Sprint 2):**
- sitemap.xml, meta tags, canonical, JSON-LD, GA4, AdSense publisher ID, state salary pages
