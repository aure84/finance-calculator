# Salary Calculator State Tax Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional state income tax selector to the Salary Calculator so users see a state tax deduction row and a state-adjusted net take-home pay.

**Architecture:** `calcStateTax()` already exists in `src/data/stateTax.ts` from the Tax Refund Calculator feature. `calcSalary()` gains an optional `stateId` param; when provided, `stateTax` is computed and deducted from `netAnnual`. The UI adds a state dropdown and a State Tax row in the deductions table. No new files needed.

**Tech Stack:** React 19, TypeScript, Vitest + Testing Library

---

## File Map

| File | Action |
|------|--------|
| `src/calculators/salary/salary.ts` | Modify — add `stateId?` to input, `stateTax` to result, deduct from net |
| `src/calculators/salary/salary.test.ts` | Modify — add 3 state tax tests |
| `src/calculators/salary/SalaryCalc.tsx` | Modify — add state dropdown, State Tax row in table |
| `src/pages/SalaryPage.tsx` | Modify — update FAQ answer + disclaimer |

---

## Task 1: Update salary.ts + tests

**Files:**
- Modify: `src/calculators/salary/salary.ts`
- Modify: `src/calculators/salary/salary.test.ts`

- [ ] **Step 1: Append 3 failing tests to `src/calculators/salary/salary.test.ts`**

Add inside the existing `describe('calcSalary', () => { ... })` block, after the last test:

```ts
  it('deducts state tax from netAnnual when stateId provided', () => {
    // PA flat 3.07%. Single, $50k gross, deduction $15k → taxable $35k
    // stateTax = 35000 * 0.0307 = 1074.50
    const withState = calcSalary({ annualSalary: 50000, filingStatus: 'single', stateId: 'PA' })
    const noState   = calcSalary({ annualSalary: 50000, filingStatus: 'single' })
    expect(withState.stateTax).toBeCloseTo(1074.5, 0)
    expect(withState.netAnnual).toBeCloseTo(noState.netAnnual - 1074.5, 0)
  })

  it('returns stateTax 0 for no-income-tax state and does not change netAnnual', () => {
    const withTX  = calcSalary({ annualSalary: 50000, filingStatus: 'single', stateId: 'TX' })
    const noState = calcSalary({ annualSalary: 50000, filingStatus: 'single' })
    expect(withTX.stateTax).toBe(0)
    expect(withTX.netAnnual).toBeCloseTo(noState.netAnnual, 1)
  })

  it('returns stateTax null when no stateId and netAnnual is unchanged', () => {
    const result = calcSalary({ annualSalary: 50000, filingStatus: 'single' })
    expect(result.stateTax).toBeNull()
  })
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/salary/salary.test.ts
```

Expected: FAIL — `result.stateTax` is not defined

- [ ] **Step 3: Replace `src/calculators/salary/salary.ts` entirely**

```ts
import { calcStateTax } from '../../data/stateTax'

export interface SalaryInput {
  annualSalary: number
  filingStatus: 'single' | 'married'
  stateId?: string
}

export interface SalaryResult {
  grossAnnual: number
  federalTax: number
  stateTax: number | null   // null when no stateId provided
  socialSecurity: number
  medicare: number
  fica: number
  netAnnual: number         // after federal + FICA + state (if selected)
  netMonthly: number
  netBiweekly: number
  netWeekly: number
  netHourly: number
  effectiveRate: number     // includes state tax in numerator when selected
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
  const { annualSalary, filingStatus, stateId } = input
  const deduction = filingStatus === 'single' ? STANDARD_DEDUCTION_SINGLE : STANDARD_DEDUCTION_MARRIED
  const taxableIncome = Math.max(0, annualSalary - deduction)
  const federalTax = calcFederalTax(taxableIncome, filingStatus)
  const socialSecurity = Math.min(annualSalary, SS_WAGE_BASE) * SS_RATE
  const medicare = annualSalary * MEDICARE_RATE
  const fica = socialSecurity + medicare
  const stateTax = stateId != null ? calcStateTax(taxableIncome, stateId) : null
  const netAnnual = annualSalary - federalTax - fica - (stateTax ?? 0)

  return {
    grossAnnual: annualSalary,
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    fica,
    netAnnual,
    netMonthly: netAnnual / 12,
    netBiweekly: netAnnual / 26,
    netWeekly: netAnnual / 52,
    netHourly: netAnnual / 2080,
    effectiveRate: annualSalary > 0 ? (federalTax + fica + (stateTax ?? 0)) / annualSalary : 0,
  }
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run src/calculators/salary/salary.test.ts
```

Expected: 7 tests passed

- [ ] **Step 5: Run full suite**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
npm test -- --run
```

Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
cd "/Volumes/SLT/Claude Code/finance-calculator"
git add src/calculators/salary/salary.ts src/calculators/salary/salary.test.ts
git commit -m "feat: add optional state tax to calcSalary"
```

---

## Task 2: Update SalaryCalc.tsx UI

**Files:**
- Modify: `src/calculators/salary/SalaryCalc.tsx`

- [ ] **Step 1: Replace `src/calculators/salary/SalaryCalc.tsx` entirely**

```tsx
import { useState } from 'react'
import { calcSalary } from './salary'
import { STATES } from '../../data/stateTax'
import { formatCurrency, formatPercent } from '../../utils/format'

export default function SalaryCalc() {
  const [salary, setSalary] = useState('')
  const [filing, setFiling] = useState<'single' | 'married'>('single')
  const [stateId, setStateId] = useState('')

  const value = parseFloat(salary)
  const result = !isNaN(value) && value > 0
    ? calcSalary({ annualSalary: value, filingStatus: filing, stateId: stateId || undefined })
    : null

  const selectedState = stateId ? STATES.find(s => s.id === stateId) : null
  const stateHasNoTax = selectedState && selectedState.brackets.length === 0

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, height: 42 }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Salary</label>
          <input
            type="number"
            min="0"
            value={salary}
            onChange={e => setSalary(e.target.value)}
            placeholder="e.g. 75000"
            style={{ ...inputStyle, width: 200 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Filing Status</label>
          <select
            value={filing}
            onChange={e => setFiling(e.target.value as 'single' | 'married')}
            style={inputStyle}
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
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
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <tbody>
              {[
                ['Gross Annual', formatCurrency(result.grossAnnual)],
                ['Federal Income Tax', formatCurrency(result.federalTax)],
                ...(result.stateTax != null && result.stateTax > 0
                  ? [['State Income Tax', formatCurrency(result.stateTax)]]
                  : []),
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
            Effective tax rate: {formatPercent(result.effectiveRate)} · Based on 2026 federal brackets
            {result.stateTax == null ? ' · Select a state to include state income tax' : ''}
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
git add src/calculators/salary/SalaryCalc.tsx
git commit -m "feat: add state tax selector to SalaryCalc"
```

---

## Task 3: Update SalaryPage.tsx FAQ + disclaimer

**Files:**
- Modify: `src/pages/SalaryPage.tsx`

- [ ] **Step 1: Update the FAQ answer for state taxes**

Find and replace the FAQ entry:

Old:
```tsx
  {
    q: 'Does this calculator include state taxes?',
    a: 'No. This calculator covers federal income tax and FICA only. State income tax rates vary widely by state and are not included in these estimates.',
  },
```

New:
```tsx
  {
    q: 'Does this calculator include state taxes?',
    a: 'Yes — select your state from the optional dropdown to include state income tax. State tax is applied to the same taxable income as federal tax (an approximation, as states have their own deductions). Eight states have no income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, and Wyoming.',
  },
```

- [ ] **Step 2: Update the disclaimer**

Find and replace:

Old:
```tsx
        <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only. Results are not tax or financial advice. Figures are based on 2026 federal tax brackets and do not include state or local taxes. Consult a CPA for personalized advice.
```

New:
```tsx
        <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only. Results are not tax or financial advice. Federal figures are based on 2026 tax brackets. State tax uses the same taxable income as federal (an approximation — states have their own deductions). Does not include local taxes. Consult a CPA for personalized advice.
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
git add src/pages/SalaryPage.tsx
git commit -m "feat: update salary page FAQ and disclaimer for state tax"
```

---

## Self-Review

**Spec coverage:**
- ✅ Optional state dropdown in SalaryCalc — 50 states + DC from existing STATES array
- ✅ State Tax row in deductions table — only when stateTax > 0
- ✅ No-tax state banner — same pattern as Tax Refund Calculator
- ✅ Net Take-Home includes state tax deduction when state selected
- ✅ Breakdown tiles (Monthly/Bi-Weekly/Weekly/Hourly) automatically reflect updated netAnnual
- ✅ Effective rate includes state tax in numerator
- ✅ Footer note hints at state selector when no state selected
- ✅ FAQ updated — no longer says "not included"
- ✅ Disclaimer updated to mention state approximation

**Placeholder scan:** No TBDs, all code blocks complete.

**Type consistency:**
- `calcSalary({ stateId })` → defined in Task 1, used in Task 2 ✅
- `result.stateTax: number | null` → defined in Task 1, rendered in Task 2 ✅
- `STATES` imported from `src/data/stateTax` in Task 2 ✅
