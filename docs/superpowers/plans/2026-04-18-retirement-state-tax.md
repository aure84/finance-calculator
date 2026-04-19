# Retirement Calculator State Tax Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional state income tax selector to the Retirement Calculator so users see the estimated state tax liability on their projected balance and an after-tax net balance.

**Architecture:** `calcStateTax()` already exists in `src/data/stateTax.ts`. The retirement calculator models a lump-sum withdrawal at retirement — state tax is applied to `projectedBalance` as ordinary income (the standard treatment for traditional 401k/IRA withdrawals). `calcRetirement()` gains an optional `stateId` param; when provided, `estimatedStateTax` is computed and subtracted to yield `netProjectedBalance`. The UI adds a state dropdown and two new result tiles. No new files needed.

**Tech Stack:** React 19, TypeScript, Vitest + Testing Library

---

## File Map

| File | Action |
|------|--------|
| `src/calculators/retirement/retirement.ts` | Modify — add `stateId?` to input, `estimatedStateTax` and `netProjectedBalance` to result |
| `src/calculators/retirement/retirement.test.ts` | Modify — add 3 state tax tests |
| `src/calculators/retirement/RetirementCalc.tsx` | Modify — add state dropdown, two new result tiles |
| `src/pages/RetirementPage.tsx` | Modify — add FAQ entry + update disclaimer |

---

## Task 1: Update retirement.ts + tests

**Files:**
- Modify: `src/calculators/retirement/retirement.ts`
- Modify: `src/calculators/retirement/retirement.test.ts`

- [ ] **Step 1: Append 3 failing tests to `src/calculators/retirement/retirement.test.ts`**

Add inside the existing `describe('calcRetirement', () => { ... })` block, after the last test:

```ts
  it('returns estimatedStateTax and netProjectedBalance when stateId provided', () => {
    // PA flat 3.07% on projectedBalance
    // projectedBalance ≈ 264122 (from existing test params)
    // estimatedStateTax ≈ 264122 * 0.0307 ≈ 8109
    const result = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 6, years: 20, stateId: 'PA' })
    expect(result.estimatedStateTax).toBeCloseTo(8109, 0)
    expect(result.netProjectedBalance).toBeCloseTo(result.projectedBalance - result.estimatedStateTax!, 0)
  })

  it('returns estimatedStateTax 0 for no-income-tax state and netProjectedBalance equals projectedBalance', () => {
    const withTX = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 6, years: 20, stateId: 'TX' })
    expect(withTX.estimatedStateTax).toBe(0)
    expect(withTX.netProjectedBalance).toBeCloseTo(withTX.projectedBalance, 1)
  })

  it('returns estimatedStateTax null and netProjectedBalance equals projectedBalance when no stateId', () => {
    const result = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 6, years: 20 })
    expect(result.estimatedStateTax).toBeNull()
    expect(result.netProjectedBalance).toBeCloseTo(result.projectedBalance, 1)
  })
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/retirement/retirement.test.ts
```

Expected: FAIL — `result.estimatedStateTax` is not defined

- [ ] **Step 3: Replace `src/calculators/retirement/retirement.ts` entirely**

```ts
import { calcStateTax } from '../../data/stateTax'

export interface RetirementInput {
  currentSavings: number
  monthlyContribution: number
  annualReturn: number  // percentage, e.g. 6 for 6%
  years: number
  stateId?: string
}

export interface RetirementResult {
  projectedBalance: number
  totalContributions: number
  totalInterest: number
  estimatedStateTax: number | null  // null when no stateId provided
  netProjectedBalance: number       // projectedBalance - estimatedStateTax (or projectedBalance when no state)
}

export function calcRetirement(input: RetirementInput): RetirementResult {
  const { currentSavings, monthlyContribution, annualReturn, years, stateId } = input
  const r = annualReturn / 100 / 12
  const n = years * 12

  const fvSavings = currentSavings * Math.pow(1 + r, n)
  const fvContributions = r === 0
    ? monthlyContribution * n
    : monthlyContribution * ((Math.pow(1 + r, n) - 1) / r)

  const projectedBalance = fvSavings + fvContributions
  const totalContributions = currentSavings + monthlyContribution * n
  const totalInterest = projectedBalance - totalContributions

  const estimatedStateTax = stateId != null ? calcStateTax(projectedBalance, stateId) : null
  const netProjectedBalance = projectedBalance - (estimatedStateTax ?? 0)

  return {
    projectedBalance,
    totalContributions,
    totalInterest,
    estimatedStateTax,
    netProjectedBalance,
  }
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/retirement/retirement.test.ts
```

Expected: 6 tests passed

- [ ] **Step 5: Run full suite**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run
```

Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/calculators/retirement/retirement.ts src/calculators/retirement/retirement.test.ts
git commit -m "feat: add optional state tax to calcRetirement"
```

---

## Task 2: Update RetirementCalc.tsx UI

**Files:**
- Modify: `src/calculators/retirement/RetirementCalc.tsx`

- [ ] **Step 1: Replace `src/calculators/retirement/RetirementCalc.tsx` entirely**

```tsx
import { useState } from 'react'
import { calcRetirement } from './retirement'
import { STATES } from '../../data/stateTax'
import { formatCurrency } from '../../utils/format'

export default function RetirementCalc() {
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualReturn, setAnnualReturn] = useState('')
  const [years, setYears] = useState('')
  const [stateId, setStateId] = useState('')

  const cs = parseFloat(currentSavings)
  const mc = parseFloat(monthlyContribution)
  const ar = parseFloat(annualReturn)
  const y = parseFloat(years)
  const result = [cs, mc, ar, y].every(v => !isNaN(v) && v >= 0) && y > 0
    ? calcRetirement({ currentSavings: cs, monthlyContribution: mc, annualReturn: ar, years: y, stateId: stateId || undefined })
    : null

  const selectedState = stateId ? STATES.find(s => s.id === stateId) : null
  const stateHasNoTax = selectedState && selectedState.brackets.length === 0

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, height: 43, boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Current Savings ($)</label>
          <input type="number" min="0" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} placeholder="10000" style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Monthly Contribution ($)</label>
          <input type="number" min="0" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} placeholder="500" style={{ ...inputStyle, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Return (%)</label>
          <input type="number" min="0" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} placeholder="6" style={{ ...inputStyle, width: 140 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Years to Retirement</label>
          <input type="number" min="1" value={years} onChange={e => setYears(e.target.value)} placeholder="20" style={{ ...inputStyle, width: 140 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>State (optional)</label>
          <select
            value={stateId}
            onChange={e => setStateId(e.target.value)}
            style={{ ...inputStyle, width: 200 }}
          >
            <option value="">— No state —</option>
            {STATES.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {stateHasNoTax && (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14, color: '#166534' }}>
          {selectedState!.name} has no state income tax.
        </div>
      )}

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Projected Balance', formatCurrency(result.projectedBalance)],
              ['Total Contributions', formatCurrency(result.totalContributions)],
              ['Total Interest Earned', formatCurrency(result.totalInterest)],
              ...(result.estimatedStateTax != null && result.estimatedStateTax > 0
                ? [
                    ['Est. State Tax on Withdrawal', formatCurrency(result.estimatedStateTax)],
                    ['Net After State Tax', formatCurrency(result.netProjectedBalance)],
                  ]
                : []),
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            For illustrative purposes only. Does not account for inflation, Social Security, or investment fees.
            {result.estimatedStateTax == null
              ? ' Select a state to estimate state tax on withdrawal.'
              : ' State tax estimate assumes full lump-sum withdrawal (an approximation — actual tax depends on withdrawal strategy).'}
          </p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Run full test suite**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run
```

Expected: all tests pass

- [ ] **Step 4: Commit**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/calculators/retirement/RetirementCalc.tsx
git commit -m "feat: add state tax selector to RetirementCalc"
```

---

## Task 3: Update RetirementPage.tsx FAQ + disclaimer

**Files:**
- Modify: `src/pages/RetirementPage.tsx`

- [ ] **Step 1: Add a state tax FAQ entry**

In `src/pages/RetirementPage.tsx`, replace `const RETIREMENT_FAQ = [` block entirely with:

```tsx
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
  {
    q: 'Does this calculator include state income tax?',
    a: 'Yes — select your state from the optional dropdown to estimate state income tax on your projected balance at withdrawal. The estimate assumes a full lump-sum withdrawal, which is an approximation; your actual tax will depend on how and when you withdraw. Eight states have no income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, and Wyoming.',
  },
]
```

- [ ] **Step 2: Update the disclaimer**

Find and replace:

Old:
```tsx
        <strong>Disclaimer:</strong> For illustrative purposes only. Does not account for inflation, taxes, Social Security, or investment fees. Past market returns do not guarantee future results.
```

New:
```tsx
        <strong>Disclaimer:</strong> For illustrative purposes only. Does not account for inflation, Social Security, or investment fees. State tax estimate assumes full lump-sum withdrawal (approximation — actual tax depends on withdrawal strategy and state rules). Past market returns do not guarantee future results.
```

- [ ] **Step 3: TypeScript check**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Run full test suite**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run
```

Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/pages/RetirementPage.tsx
git commit -m "feat: update retirement page FAQ and disclaimer for state tax"
```

---

## Self-Review

**Spec coverage:**
- ✅ Optional state dropdown — 50 states + DC from existing STATES array
- ✅ No-tax state banner — green box when `brackets.length === 0`
- ✅ `estimatedStateTax` — applies `calcStateTax(projectedBalance, stateId)`
- ✅ `netProjectedBalance` — `projectedBalance - estimatedStateTax`
- ✅ Two new tiles: "Est. State Tax on Withdrawal" and "Net After State Tax" — shown only when `estimatedStateTax > 0`
- ✅ Footer note hints at state selector when no state selected
- ✅ FAQ updated — includes state tax info and no-tax states list
- ✅ Disclaimer updated to mention withdrawal approximation

**Placeholder scan:** No TBDs. All code blocks complete.

**Type consistency:**
- `calcRetirement({ stateId })` → defined in Task 1, used in Task 2 ✅
- `result.estimatedStateTax: number | null` → defined in Task 1, rendered in Task 2 ✅
- `result.netProjectedBalance: number` → defined in Task 1, rendered in Task 2 ✅
- `STATES` imported from `src/data/stateTax` in Task 2 ✅
