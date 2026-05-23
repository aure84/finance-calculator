# Budget Calculator + Blog Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/budget-calculator` page with a 50/30/20 allocator and enrich the `how-to-budget` blog post with a formula callout, budget calculator link, and conclusion update.

**Architecture:** Five tasks build bottom-up — pure calc logic first, then calculator UI, then full page, then routing, then blog enrichment. The `FormulaBox` component already exists at `src/components/FormulaBox.tsx` from the tax refund sprint and is reused unchanged. The blog enrichment generalizes the existing `formulaCallout` renderer from heading-match to a data flag.

**Tech Stack:** React 18 + TypeScript + Vite, CSS Modules + CSS custom properties (no hardcoded hex), Vitest + Testing Library, React Router v7.

---

## File Map

| File | Action |
|---|---|
| `src/calculators/budget/budget.ts` | Create — pure calc logic |
| `src/calculators/budget/budget.test.ts` | Create — unit tests |
| `src/calculators/budget/BudgetCalc.tsx` | Create — calculator UI |
| `src/pages/BudgetPage.tsx` | Create — full page |
| `src/AppContent.tsx` | Modify — add import + Route |
| `src/entry-server.tsx` | Modify — add to staticRoutes |
| `src/data/blogPosts.ts` | Modify — type, flags, relatedLinks, conclusion |
| `src/pages/BlogPostPage.tsx` | Modify — generalize formulaCallout condition |
| `src/pages/BlogPostPage.test.tsx` | Modify — update test description |

---

### Task 1: Budget calc logic

**Files:**
- Create: `src/calculators/budget/budget.ts`
- Create: `src/calculators/budget/budget.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/calculators/budget/budget.test.ts
import { describe, it, expect } from 'vitest'
import { calcBudget } from './budget'

describe('calcBudget', () => {
  it('applies 50/30/20 split on $5,000', () => {
    const r = calcBudget({ monthlyIncome: 5000, needsPct: 50, wantsPct: 30, savingsPct: 20 })
    expect(r.needs).toBeCloseTo(2500)
    expect(r.wants).toBeCloseTo(1500)
    expect(r.savings).toBeCloseTo(1000)
  })

  it('calculates annual as monthly * 12', () => {
    const r = calcBudget({ monthlyIncome: 4000, needsPct: 50, wantsPct: 30, savingsPct: 20 })
    expect(r.needsAnnual).toBeCloseTo(24000)
    expect(r.wantsAnnual).toBeCloseTo(14400)
    expect(r.savingsAnnual).toBeCloseTo(9600)
  })

  it('returns totalPct as sum of the three inputs', () => {
    const r = calcBudget({ monthlyIncome: 5000, needsPct: 60, wantsPct: 20, savingsPct: 20 })
    expect(r.totalPct).toBe(100)
  })

  it('works with custom 60/20/20 split', () => {
    const r = calcBudget({ monthlyIncome: 5000, needsPct: 60, wantsPct: 20, savingsPct: 20 })
    expect(r.needs).toBeCloseTo(3000)
    expect(r.wants).toBeCloseTo(1000)
    expect(r.savings).toBeCloseTo(1000)
  })

  it('works with $0 income — all results are 0', () => {
    const r = calcBudget({ monthlyIncome: 0, needsPct: 50, wantsPct: 30, savingsPct: 20 })
    expect(r.needs).toBe(0)
    expect(r.wants).toBe(0)
    expect(r.savings).toBe(0)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- --reporter=verbose src/calculators/budget/budget.test.ts
```

Expected: FAIL with `Cannot find module './budget'`

- [ ] **Step 3: Implement budget.ts**

```ts
// src/calculators/budget/budget.ts
export interface BudgetInput {
  monthlyIncome: number
  needsPct: number
  wantsPct: number
  savingsPct: number
}

export interface BudgetResult {
  needs: number
  wants: number
  savings: number
  needsAnnual: number
  wantsAnnual: number
  savingsAnnual: number
  totalPct: number
}

export function calcBudget(input: BudgetInput): BudgetResult {
  const { monthlyIncome, needsPct, wantsPct, savingsPct } = input
  const needs = monthlyIncome * needsPct / 100
  const wants = monthlyIncome * wantsPct / 100
  const savings = monthlyIncome * savingsPct / 100
  return {
    needs,
    wants,
    savings,
    needsAnnual: needs * 12,
    wantsAnnual: wants * 12,
    savingsAnnual: savings * 12,
    totalPct: needsPct + wantsPct + savingsPct,
  }
}
```

- [ ] **Step 4: Run to verify tests pass**

```bash
npm test -- --reporter=verbose src/calculators/budget/budget.test.ts
```

Expected: 5 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/calculators/budget/budget.ts src/calculators/budget/budget.test.ts
git commit -m "feat(budget): add budget calc logic and tests"
```

---

### Task 2: BudgetCalc UI

**Files:**
- Create: `src/calculators/budget/BudgetCalc.tsx`

Inputs are controlled number fields. Percentages default to 50/30/20. When percentages do not sum to 100 a warning shows using `--error-*` tokens. Results show when income > 0 and percentages sum to 100. No submit button — real-time derived state.

`formatCurrency` from `src/utils/format.ts` returns `"$2,500.00"` format — use this for result cards.

- [ ] **Step 1: Write BudgetCalc.tsx**

```tsx
// src/calculators/budget/BudgetCalc.tsx
import { useState } from 'react'
import { calcBudget } from './budget'
import { formatCurrency } from '../../utils/format'

export default function BudgetCalc() {
  const [income, setIncome] = useState('')
  const [needsPct, setNeedsPct] = useState('50')
  const [wantsPct, setWantsPct] = useState('30')
  const [savingsPct, setSavingsPct] = useState('20')

  const inc = parseFloat(income)
  const np = parseFloat(needsPct)
  const wp = parseFloat(wantsPct)
  const sp = parseFloat(savingsPct)

  const pctsValid = !isNaN(np) && !isNaN(wp) && !isNaN(sp)
  const totalPct = pctsValid ? np + wp + sp : 0
  const pctSumOk = totalPct === 100
  const incomeOk = !isNaN(inc) && inc > 0

  const result = incomeOk && pctSumOk
    ? calcBudget({ monthlyIncome: inc, needsPct: np, wantsPct: wp, savingsPct: sp })
    : null

  const inputStyle = {
    padding: '10px 12px',
    border: '1px solid var(--border)',
    borderRadius: 6,
    fontSize: 16,
    background: 'var(--surface)',
    color: 'var(--text)',
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>
            Monthly Take-Home Income ($)
          </label>
          <input
            type="number"
            value={income}
            onChange={e => setIncome(e.target.value)}
            placeholder="4000"
            style={{ ...inputStyle, width: 200 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Needs (%)</label>
          <input
            type="number"
            value={needsPct}
            onChange={e => setNeedsPct(e.target.value)}
            min="0"
            max="100"
            style={{ ...inputStyle, width: 90 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Wants (%)</label>
          <input
            type="number"
            value={wantsPct}
            onChange={e => setWantsPct(e.target.value)}
            min="0"
            max="100"
            style={{ ...inputStyle, width: 90 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Savings & Debt (%)</label>
          <input
            type="number"
            value={savingsPct}
            onChange={e => setSavingsPct(e.target.value)}
            min="0"
            max="100"
            style={{ ...inputStyle, width: 120 }}
          />
        </div>
      </div>

      {pctsValid && !pctSumOk && (
        <div style={{
          background: 'var(--error-bg)',
          border: '1px solid var(--error-border)',
          color: 'var(--error-text)',
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 16,
          fontSize: 14,
        }}>
          Percentages must add up to 100% (currently {totalPct}%)
        </div>
      )}

      {result && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'Needs', monthly: result.needs, annual: result.needsAnnual, color: 'var(--text)' },
            { label: 'Wants', monthly: result.wants, annual: result.wantsAnnual, color: 'var(--text)' },
            { label: 'Savings & Debt', monthly: result.savings, annual: result.savingsAnnual, color: 'var(--green)' },
          ].map(({ label, monthly, annual, color }) => (
            <div key={label} style={{ background: 'var(--results-bg)', padding: 16, borderRadius: 8, minWidth: 180 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color }}>
                {formatCurrency(monthly)}
                <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}>/mo</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                {formatCurrency(annual)}/yr
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/calculators/budget/BudgetCalc.tsx
git commit -m "feat(budget): add BudgetCalc UI component"
```

---

### Task 3: BudgetPage

**Files:**
- Create: `src/pages/BudgetPage.tsx`

Pattern reference: `src/pages/TaxRefundPage.tsx` — same structure (Key Facts strip, AdSlots, FormulaBox, example cards, FAQ, RelatedCalculators). The `FormulaBox` component is at `src/components/FormulaBox.tsx`. The `RelatedCalculators` component is at `src/components/RelatedCalculators.tsx`. CSS classes come from `src/pages/calculator.module.css` — use `styles.page`, `styles.title`, `styles.subtitle`, `styles.panel`, `styles.exampleGrid`, `styles.exampleCard`, `styles.exampleLabel`, `styles.exampleScenario`, `styles.exampleValue`, `styles.exampleSub`, `styles.contentSection`, `styles.sectionHeading`, `styles.sectionText`, `styles.faqList`, `styles.faqItem`, `styles.faqQ`, `styles.faqA`, `styles.disclaimer`, `styles.breadcrumb`.

- [ ] **Step 1: Write BudgetPage.tsx**

```tsx
// src/pages/BudgetPage.tsx
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import FormulaBox from '../components/FormulaBox'
import BudgetCalc from '../calculators/budget/BudgetCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const RELATED = [
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
  { label: 'Savings Goal Calculator', to: '/savings-goal-calculator', description: 'See how long it takes to reach a savings goal at a given monthly contribution.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff-calculator', description: 'Calculate when you will be debt-free and how much interest you will save.' },
]

const BUDGET_FAQ = [
  {
    q: 'What is the 50/30/20 rule?',
    a: 'A budgeting framework popularized by Senator Elizabeth Warren: allocate 50% of after-tax income to needs, 30% to wants, and 20% to savings and debt repayment. It is a starting point, not a rigid formula — adjust percentages to fit your income and cost of living.',
  },
  {
    q: 'What counts as a need vs. a want?',
    a: 'Needs are expenses you must pay: rent or mortgage, groceries, utilities, insurance, transportation, and minimum debt payments. Wants are optional: dining out, entertainment, subscriptions, travel, and hobbies. The line between them is personal — a car may be a need in a rural area and a want in a city with good transit.',
  },
  {
    q: 'How do I calculate my monthly budget?',
    a: 'Take your after-tax (take-home) monthly income and multiply: by 0.50 for needs, by 0.30 for wants, and by 0.20 for savings and debt. Use the calculator above to adjust the percentages if the standard split does not fit your situation.',
  },
  {
    q: 'What if my needs exceed 50% of income?',
    a: 'This is common in high cost-of-living areas. Reduce the wants allocation first — for example, 60% needs / 20% wants / 20% savings. Try to keep savings above 10% as a minimum. If needs consistently exceed 70%, the solution is usually increasing income rather than cutting further.',
  },
  {
    q: 'Should I budget on gross or net income?',
    a: 'Always net (take-home) income. Taxes, Social Security, and Medicare are deducted before you receive your paycheck — you cannot spend them. Budgeting on gross income leads to overspending.',
  },
  {
    q: 'How do I handle irregular or freelance income?',
    a: 'Budget off your lowest income month from the past 12 months, not your average. In higher months, direct the surplus in order: top up your emergency fund, then pay down debt, then invest. Building a one-month income buffer in a separate account smooths out the variability.',
  },
  {
    q: 'Where does debt repayment fit in the budget?',
    a: 'Minimum payments are a need — they are not optional. Extra debt payments (above minimums) belong in the 20% savings and debt bucket. Once debt is paid off, redirect that amount to savings or investments.',
  },
  {
    q: 'How often should I review my budget?',
    a: 'Monthly. Compare planned vs. actual spending for each category at the end of the month. The first budget is rarely accurate — each monthly review makes the next month more predictable. Most people find 2–3 months of reviews enough to build a realistic baseline.',
  },
]

const KEY_FACTS = [
  { value: '~3.4%', label: 'avg. US personal savings rate', sub: 'BEA, Q1 2026' },
  { value: '3–6 months', label: 'recommended emergency fund', sub: 'expenses, not income' },
  { value: '20%', label: 'savings target', sub: '50/30/20 rule' },
]

const EXAMPLES = [
  { income: '$3,000/mo', needs: '$1,500', wants: '$900', savings: '$600' },
  { income: '$5,000/mo', needs: '$2,500', wants: '$1,500', savings: '$1,000' },
  { income: '$8,000/mo', needs: '$4,000', wants: '$2,400', savings: '$1,600' },
]

export default function BudgetPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="50/30/20 Budget Calculator — Monthly Budget Breakdown"
        description="Enter your monthly take-home income and see your 50/30/20 budget breakdown — how much to spend on needs, wants, and savings. Free, instant, no sign-up."
      />
      <FAQSchema items={BUDGET_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Budget Calculator
      </div>
      <h1 className={styles.title}>50/30/20 Budget Calculator</h1>
      <p className={styles.subtitle}>
        Enter your monthly take-home income to see your recommended budget split. Adjust the percentages if the standard 50/30/20 does not fit your situation.
      </p>
      <div className={styles.exampleGrid} style={{ margin: '1.5rem 0' }}>
        {KEY_FACTS.map(({ value, label, sub }) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)' }}>{value}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text)', marginTop: 4 }}>{label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <BudgetCalc />
      </div>
      <AdSlot slot="content" />
      <FormulaBox
        formula="Monthly Budget = 50% Needs + 30% Wants + 20% Savings"
        note="Adjust the percentages to fit your situation — if you live in an expensive city, needs may run 60% or more. The structure matters more than the exact split."
      />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>What each budget bucket means</h2>
        <p className={styles.sectionText}>
          <strong>Needs (50%)</strong> are expenses you must pay to maintain your baseline standard of living: rent or mortgage, groceries, utilities, insurance, transportation, and minimum debt payments. If you skip these, there are immediate consequences.
        </p>
        <p className={styles.sectionText}>
          <strong>Wants (30%)</strong> are optional expenses that improve your life but are not essential: dining out, entertainment, streaming subscriptions, travel, hobbies, and clothing beyond basics. These are the first to cut when money is tight.
        </p>
        <p className={styles.sectionText}>
          <strong>Savings &amp; Debt (20%)</strong> is what builds long-term financial health: emergency fund contributions, retirement savings (401(k), IRA), extra debt payments above the minimum, and investments. This is the bucket that creates options in your future.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example monthly budget breakdowns</h2>
        <p className={styles.sectionText}>Default 50/30/20 split. Adjust the percentages in the calculator above to match your situation.</p>
        <div className={styles.exampleGrid}>
          {EXAMPLES.map(({ income, needs, wants, savings }) => (
            <div key={income} className={styles.exampleCard}>
              <div className={styles.exampleLabel}>{income}</div>
              <div className={styles.exampleScenario}>Needs: {needs} · Wants: {wants}</div>
              <div className={styles.exampleValue} style={{ color: 'var(--green)', fontSize: '1.75rem', fontWeight: 700 }}>{savings}</div>
              <div className={styles.exampleSub}>to savings &amp; debt/mo</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {BUDGET_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates based on the 50/30/20 budgeting framework. Actual budget requirements vary by location, household size, and individual circumstances. Does not account for taxes, irregular income, or specific debt obligations. Consult a financial advisor for personalized guidance.
      </div>
      <RelatedCalculators links={RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'How to Create a Monthly Budget', to: '/blog/how-to-budget', description: 'Step-by-step guide to the 50/30/20 rule, zero-based budgeting, and common mistakes.' },
        { label: 'What Is Net Worth?', to: '/blog/what-is-net-worth', description: 'How to calculate your net worth and why it matters more than income.' },
      ]} />
    </main>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/BudgetPage.tsx
git commit -m "feat(budget): add BudgetPage with 50/30/20 calculator"
```

---

### Task 4: Wire up routes

**Files:**
- Modify: `src/AppContent.tsx`
- Modify: `src/entry-server.tsx`

- [ ] **Step 1: Add import to AppContent.tsx**

In `src/AppContent.tsx`, add the import after the `InvestmentReturnPage` import line:

```tsx
import BudgetPage from './pages/BudgetPage'
```

- [ ] **Step 2: Add Route to AppContent.tsx**

In `src/AppContent.tsx`, add the route after the `/investment-return-calculator` route:

```tsx
<Route path="/budget-calculator" element={<BudgetPage />} />
```

- [ ] **Step 3: Add to staticRoutes in entry-server.tsx**

In `src/entry-server.tsx`, add `'/budget-calculator'` to the `staticRoutes` array after `'/investment-return-calculator'`:

```ts
    '/investment-return-calculator',
    '/budget-calculator',
```

- [ ] **Step 4: Run the full test suite**

```bash
npm test
```

Expected: all tests pass. The pre-existing `BlogIndexPage.test.tsx` failure (link order mismatch) is unrelated to this sprint — confirm it was failing before these changes by checking `git stash && npm test && git stash pop` if uncertain.

- [ ] **Step 5: Commit**

```bash
git add src/AppContent.tsx src/entry-server.tsx
git commit -m "feat(budget): wire up /budget-calculator route and prerender"
```

---

### Task 5: Blog post enrichment

**Files:**
- Modify: `src/data/blogPosts.ts` (type + flags + relatedLinks + conclusion)
- Modify: `src/pages/BlogPostPage.tsx` (generalize formulaCallout condition)
- Modify: `src/pages/BlogPostPage.test.tsx` (update test description)

**Context on the formulaCallout system:**
- `BlogPostPage.tsx` line 74: `section.heading === 'The Refund Formula' && i === 0 ? styles.formulaCallout : styles.sectionText`
- After this task: the condition becomes `section.formulaCallout === true && i === 0`
- We migrate the existing "The Refund Formula" section to use the flag (so the existing test keeps passing)
- We add the flag to "The 50/30/20 Rule" section in `how-to-budget`

- [ ] **Step 1: Add `formulaCallout?` to the BlogPost section type in blogPosts.ts**

In `src/data/blogPosts.ts` at lines 20–24, the section type is:

```ts
  sections: {
    heading: string
    paragraphs: string[]
    list?: string[]
  }[]
```

Change it to:

```ts
  sections: {
    heading: string
    paragraphs: string[]
    list?: string[]
    formulaCallout?: boolean
  }[]
```

- [ ] **Step 2: Add `formulaCallout: true` to "The Refund Formula" section (migration)**

In `src/data/blogPosts.ts`, find the section at line 1176–1184:

```ts
      {
        heading: 'The Refund Formula',
        paragraphs: [
```

Change to:

```ts
      {
        heading: 'The Refund Formula',
        formulaCallout: true,
        paragraphs: [
```

- [ ] **Step 3: Add `formulaCallout: true` to "The 50/30/20 Rule" section**

In `src/data/blogPosts.ts`, find the section at line 1530–1531:

```ts
      {
        heading: 'The 50/30/20 Rule',
        paragraphs: [
```

Change to:

```ts
      {
        heading: 'The 50/30/20 Rule',
        formulaCallout: true,
        paragraphs: [
```

- [ ] **Step 4: Add Budget Calculator to how-to-budget relatedLinks**

In `src/data/blogPosts.ts`, find the `how-to-budget` post's `relatedLinks` array (around line 1595):

```ts
    relatedLinks: [
      { label: 'Salary Calculator', to: '/salary-calculator' },
      { label: 'Savings Goal Calculator', to: '/savings-goal-calculator' },
      { label: 'What Is Net Worth?', to: '/blog/what-is-net-worth' },
    ],
```

Change to:

```ts
    relatedLinks: [
      { label: 'Budget Calculator', to: '/budget-calculator' },
      { label: 'Salary Calculator', to: '/salary-calculator' },
      { label: 'Savings Goal Calculator', to: '/savings-goal-calculator' },
      { label: 'What Is Net Worth?', to: '/blog/what-is-net-worth' },
    ],
```

- [ ] **Step 5: Append sentence to how-to-budget conclusion**

In `src/data/blogPosts.ts`, find the `how-to-budget` conclusion (around line 1594). It ends with:

```
...The goal is not perfection; it is awareness and intentionality. Once you know exactly where your money goes, every financial goal becomes a matter of math rather than willpower.'
```

Append one sentence before the closing quote:

```
 Try our budget calculator to enter your income and see your 50/30/20 breakdown instantly.
```

Full conclusion ending:

```ts
    conclusion: '...Once you know exactly where your money goes, every financial goal becomes a matter of math rather than willpower. Try our budget calculator to enter your income and see your 50/30/20 breakdown instantly.',
```

- [ ] **Step 6: Generalize the formulaCallout condition in BlogPostPage.tsx**

In `src/pages/BlogPostPage.tsx` at line 74, change:

```tsx
                  section.heading === 'The Refund Formula' && i === 0
                    ? styles.formulaCallout
```

To:

```tsx
                  section.formulaCallout === true && i === 0
                    ? styles.formulaCallout
```

- [ ] **Step 7: Update test description in BlogPostPage.test.tsx**

In `src/pages/BlogPostPage.test.tsx` at line 71, the test description is:

```ts
  it('applies formulaCallout class to first paragraph of "The Refund Formula" section', () => {
```

Change to:

```ts
  it('applies formulaCallout class to first paragraph when section has formulaCallout: true', () => {
```

The test body (lines 72–76) does not need to change — it renders `how-tax-refund-is-calculated` which now has `formulaCallout: true` on "The Refund Formula" section, so the behavior is identical.

- [ ] **Step 8: Run the full test suite**

```bash
npm test
```

Expected: all tests pass (same result as before this task). Confirm the formulaCallout test still passes.

- [ ] **Step 9: Commit**

```bash
git add src/data/blogPosts.ts src/pages/BlogPostPage.tsx src/pages/BlogPostPage.test.tsx
git commit -m "feat(budget): enrich how-to-budget post, generalize formulaCallout renderer"
```
