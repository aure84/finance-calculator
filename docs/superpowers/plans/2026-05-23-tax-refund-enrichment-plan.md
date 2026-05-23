# Tax Refund Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen the Tax Refund Calculator page and blog post with a formula highlight component, key facts strip, expanded FAQs, and visual polish — directly targeting GSC queries at positions 1–33.

**Architecture:** New reusable `FormulaBox` component added to `src/components/`. `TaxRefundPage` gets a key facts strip above the calculator and a FormulaBox below it; FAQ expands from 5 to 10 questions. `BlogPostPage` conditionally renders a `.formulaCallout` CSS class on the first paragraph of sections headed "The Refund Formula". `blogPosts.ts` updates the tax refund post's conclusion and relatedLinks.

**Tech Stack:** React 18 + TypeScript, Vite, CSS Modules, CSS custom properties (`globals.css` tokens), Vitest + Testing Library, react-router-dom v6

**Spec:** `docs/superpowers/specs/2026-05-23-tax-refund-enrichment-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/FormulaBox.tsx` | Create | Reusable formula callout component |
| `src/components/FormulaBox.module.css` | Create | FormulaBox styles (CSS tokens only) |
| `src/components/FormulaBox.test.tsx` | Create | Unit tests for FormulaBox |
| `src/pages/TaxRefundPage.tsx` | Modify | Key facts strip, FormulaBox, year fix, FAQ expand, card tweak |
| `src/pages/blog.module.css` | Modify | Add `.formulaCallout` class |
| `src/pages/BlogPostPage.tsx` | Modify | Conditionally apply formulaCallout to "The Refund Formula" section |
| `src/pages/BlogPostPage.test.tsx` | Modify | Add formulaCallout test |
| `src/data/blogPosts.ts` | Modify | Update tax refund post relatedLinks + conclusion |

---

## Task 1: FormulaBox component

**Files:**
- Create: `src/components/FormulaBox.test.tsx`
- Create: `src/components/FormulaBox.module.css`
- Create: `src/components/FormulaBox.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/FormulaBox.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FormulaBox from './FormulaBox'

describe('FormulaBox', () => {
  it('renders the formula text', () => {
    render(<FormulaBox formula="Refund = Tax withheld − Tax owed" />)
    expect(screen.getByText('Refund = Tax withheld − Tax owed')).toBeTruthy()
  })

  it('renders the note when provided', () => {
    render(<FormulaBox formula="X" note="Some note text" />)
    expect(screen.getByTestId('formula-note')).toBeTruthy()
    expect(screen.getByTestId('formula-note').textContent).toBe('Some note text')
  })

  it('does not render note element when note is omitted', () => {
    render(<FormulaBox formula="X" />)
    expect(screen.queryByTestId('formula-note')).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npx vitest run src/components/FormulaBox.test.tsx
```

Expected: FAIL — `Cannot find module './FormulaBox'`

- [ ] **Step 3: Create the CSS module**

```css
/* src/components/FormulaBox.module.css */
.container {
  background: var(--results-bg);
  border-left: 4px solid var(--navy);
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.formula {
  font-family: monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--navy);
}

.note {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 0.75rem;
}
```

- [ ] **Step 4: Create the component**

```tsx
// src/components/FormulaBox.tsx
import styles from './FormulaBox.module.css'

interface FormulaBoxProps {
  formula: string
  note?: string
}

export default function FormulaBox({ formula, note }: FormulaBoxProps) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>The formula</div>
      <div className={styles.formula}>{formula}</div>
      {note && (
        <div className={styles.note} data-testid="formula-note">
          {note}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Run test to confirm it passes**

```bash
npx vitest run src/components/FormulaBox.test.tsx
```

Expected: 3 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/FormulaBox.tsx src/components/FormulaBox.module.css src/components/FormulaBox.test.tsx
git commit -m "feat: add FormulaBox component"
```

---

## Task 2: TaxRefundPage — Key Facts strip + FormulaBox + visual tweaks

**Files:**
- Modify: `src/pages/TaxRefundPage.tsx`

- [ ] **Step 1: Add imports and KEY_FACTS constant**

At the top of `src/pages/TaxRefundPage.tsx`, add the FormulaBox import after the existing imports:

```tsx
import FormulaBox from '../components/FormulaBox'
```

After the `TAX_FAQ` constant and before `export default function TaxRefundPage()`, add:

```tsx
// TODO: update for next tax year
const KEY_FACTS = [
  { value: '~$3,100', label: 'avg. federal refund', sub: 'IRS, tax year 2024' },
  { value: 'Apr 15, 2026', label: 'federal filing deadline', sub: 'extensions may apply — verify at IRS.gov' },
  { value: '~21 days', label: 'e-file turnaround', sub: 'no flags or holds on return' },
]
```

- [ ] **Step 2: Insert Key Facts strip between subtitle and AdSlot header**

Find this exact block in the JSX (after the `<h1>` tag):

```tsx
      <p className={styles.subtitle}>
        Enter your income, filing status, and how much tax was withheld from your paychecks — see your estimated 2026 federal refund or amount owed. Add your state for a combined estimate.
      </p>
      <AdSlot slot="header" />
```

Replace with:

```tsx
      <p className={styles.subtitle}>
        Enter your income, filing status, and how much tax was withheld from your paychecks — see your estimated 2026 federal refund or amount owed. Add your state for a combined estimate.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1.5rem 0' }}>
        {KEY_FACTS.map(({ value, label, sub }) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)' }}>{value}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text)', marginTop: 4 }}>{label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>
      <AdSlot slot="header" />
```

- [ ] **Step 3: Add FormulaBox after the calculator panel**

Find this exact block:

```tsx
      <div className={styles.panel}>
        <TaxRefundCalc />
      </div>
      <AdSlot slot="content" />
```

Replace with:

```tsx
      <div className={styles.panel}>
        <TaxRefundCalc />
      </div>
      <AdSlot slot="content" />
      <FormulaBox
        formula="Refund = Tax withheld − Tax owed"
        note="If the result is negative, you owe the difference to the IRS. You may also owe an underpayment penalty — the IRS generally waives this if you owe less than $1,000, but rules vary based on your income and prior-year tax. See IRS Form 2210 or consult a tax professional."
      />
```

- [ ] **Step 4: Fix year label (2025 → 2026)**

Find:

```tsx
        <h2 className={styles.sectionHeading}>Example refund estimates (single filer, 2025)</h2>
```

Replace with:

```tsx
        <h2 className={styles.sectionHeading}>Example refund estimates (single filer, 2026)</h2>
```

- [ ] **Step 5: Increase refund value font size on all three example cards**

Find and replace all three example value divs. Each currently looks like:

```tsx
            <div className={styles.exampleValue} style={{ color: 'var(--green, #16a34a)' }}>+$1,638</div>
```

Replace all three (amounts differ: `+$1,638`, `+$2,838`, `+$1,786`) with the same pattern — add `fontSize` and `fontWeight`, drop the fallback hex:

```tsx
            <div className={styles.exampleValue} style={{ color: 'var(--green)', fontSize: '1.75rem', fontWeight: 700 }}>+$1,638</div>
```

```tsx
            <div className={styles.exampleValue} style={{ color: 'var(--green)', fontSize: '1.75rem', fontWeight: 700 }}>+$2,838</div>
```

```tsx
            <div className={styles.exampleValue} style={{ color: 'var(--green)', fontSize: '1.75rem', fontWeight: 700 }}>+$1,786</div>
```

- [ ] **Step 6: Run full test suite to confirm no regressions**

```bash
npx vitest run
```

Expected: all existing tests pass (51 total: 48 original + 3 from Task 1).

- [ ] **Step 7: Commit**

```bash
git add src/pages/TaxRefundPage.tsx
git commit -m "feat: add key facts strip and formula box to TaxRefundPage"
```

---

## Task 3: TaxRefundPage — FAQ expansion (5 → 10 questions)

**Files:**
- Modify: `src/pages/TaxRefundPage.tsx`

- [ ] **Step 1: Replace the TAX_FAQ constant with the 10-question version**

Find the existing `TAX_FAQ` constant (starts with `const TAX_FAQ = [`) and replace it entirely:

```tsx
const TAX_FAQ = [
  {
    q: 'How is my federal tax calculated?',
    a: 'The US uses a progressive bracket system — each portion of your income is taxed at the corresponding marginal rate, not your entire income at the top rate.',
  },
  {
    q: 'What is the standard deduction for 2026?',
    a: 'For 2026: $15,000 (Single or Married Filing Separately), $30,000 (Married Filing Jointly), and $22,500 (Head of Household). This amount is subtracted from your gross income before tax is calculated.',
  },
  {
    q: 'Which states have no income tax?',
    a: 'Eight states have no individual income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, and Wyoming. New Hampshire taxes only dividend and interest income, not wages.',
  },
  {
    q: 'How accurate is the state tax estimate?',
    a: 'The state estimate applies state brackets to your federal taxable income (gross income minus federal standard deduction). Most states have their own deductions and credits, so the actual liability may differ — treat this as a planning estimate, not a filing number.',
  },
  {
    q: "When will I get my refund?",
    a: "The IRS issues most refunds within 21 days of e-filing. Paper returns take 4–8 weeks. You can check your status at IRS.gov using the \"Where's My Refund?\" tool.",
  },
  {
    q: 'How do I calculate my tax refund amount?',
    a: 'Use the formula: Refund = Total tax withheld − Tax owed. Your tax owed is calculated by applying progressive federal brackets to your taxable income (gross income minus the standard deduction), then subtracting any credits. Note that refundable credits (such as the Earned Income Tax Credit) can increase your refund beyond your withholding amount, while non-refundable credits can only reduce your tax owed to zero.',
  },
  {
    q: 'How does the IRS calculate whether you get a refund or owe money?',
    a: 'Total tax payments = everything withheld from your paychecks plus any estimated payments you made. Total tax = your actual liability after brackets, deductions, and credits. The difference is your refund or balance due.',
  },
  {
    q: 'Why is my refund different from last year?',
    a: 'Common reasons: income change, filing status change (marriage, divorce), a new dependent (Child Tax Credit), losing a deduction (paid-off mortgage), or a change in withholding via your W-4.',
  },
  {
    q: 'What is the average federal tax refund?',
    a: 'The IRS reported an average refund of approximately $3,100 for tax year 2024. Refunds vary widely by income, filing status, and credits claimed.',
  },
  {
    q: 'How long does it take to receive a tax refund after e-filing?',
    a: "E-filed returns with direct deposit: typically within 21 days. Paper returns: 4–8 weeks. Returns claiming the Earned Income Tax Credit or Additional Child Tax Credit may be held until mid-February by law, regardless of when you file. Check your status at IRS.gov using \"Where's My Refund?\"",
  },
]
```

- [ ] **Step 2: Run full test suite**

```bash
npx vitest run
```

Expected: all 51 tests pass. No test changes needed — the FAQ renders via `.map()`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/TaxRefundPage.tsx
git commit -m "feat: expand TaxRefundPage FAQ from 5 to 10 questions"
```

---

## Task 4: Blog post formula callout

**Files:**
- Modify: `src/pages/blog.module.css`
- Modify: `src/pages/BlogPostPage.tsx`
- Modify: `src/pages/BlogPostPage.test.tsx`

- [ ] **Step 1: Add `.formulaCallout` to `blog.module.css`**

Open `src/pages/blog.module.css` and append at the end of the file:

```css
.formulaCallout {
  background: var(--results-bg);
  border-left: 4px solid var(--navy);
  padding: 1rem 1.25rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--navy);
  margin: 1rem 0;
}
```

- [ ] **Step 2: Write the failing test in `BlogPostPage.test.tsx`**

The test file uses a `renderPost(slug)` helper. Add this test inside the existing `describe('BlogPostPage', ...)` block:

```tsx
  it('applies formulaCallout class to first paragraph of "The Refund Formula" section', () => {
    renderPost('how-tax-refund-is-calculated')
    const callout = document.querySelector('[class*="formulaCallout"]')
    expect(callout).not.toBeNull()
    expect(callout?.textContent).toContain('Refund = Total tax withheld')
  })
```

- [ ] **Step 3: Run the test to confirm it fails**

```bash
npx vitest run src/pages/BlogPostPage.test.tsx
```

Expected: FAIL — `formulaCallout` element not found (querySelector returns null).

- [ ] **Step 4: Update BlogPostPage.tsx to apply the callout conditionally**

In `src/pages/BlogPostPage.tsx`, find the paragraph rendering inside the sections map (currently at line ~70–72):

```tsx
            {section.paragraphs.map((p, i) => (
              <p key={i} className={styles.sectionText}>{p}</p>
            ))}
```

Replace with:

```tsx
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  section.heading === 'The Refund Formula' && i === 0
                    ? styles.formulaCallout
                    : styles.sectionText
                }
              >
                {p}
              </p>
            ))}
```

- [ ] **Step 5: Run BlogPostPage tests to confirm they pass**

```bash
npx vitest run src/pages/BlogPostPage.test.tsx
```

Expected: all BlogPostPage tests pass (including the new one — 9 total).

- [ ] **Step 6: Run full test suite**

```bash
npx vitest run
```

Expected: all 52 tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/pages/blog.module.css src/pages/BlogPostPage.tsx src/pages/BlogPostPage.test.tsx
git commit -m "feat: add formula callout to tax refund blog post"
```

---

## Task 5: Blog post data — relatedLinks and conclusion

**Files:**
- Modify: `src/data/blogPosts.ts`

- [ ] **Step 1: Update relatedLinks for the tax refund post**

In `src/data/blogPosts.ts`, find the `how-tax-refund-is-calculated` post (around line 1158). Locate its `relatedLinks` array:

```ts
    relatedLinks: [
      { label: 'Tax Refund Calculator', to: '/tax-refund-calculator' },
      { label: 'Salary Calculator', to: '/salary-calculator' },
    ],
```

Replace with:

```ts
    relatedLinks: [
      { label: 'Tax Refund Calculator', to: '/tax-refund-calculator' },
      { label: 'Salary Calculator', to: '/salary-calculator' },
      { label: 'How Is Net Salary Calculated?', to: '/blog/how-net-salary-is-calculated' },
      { label: 'What Is a 401(k)?', to: '/blog/what-is-401k' },
    ],
```

- [ ] **Step 2: Update the conclusion**

In the same post, find the `conclusion` field:

```ts
    conclusion: 'Your refund is simply over-withheld tax returned to you — it is not a bonus, and a large refund means you gave the government an interest-free loan. Optimize your W-4 to keep more money each paycheck throughout the year. Review your W-4 after any major life event, and understand which deductions and credits apply to your situation. Use our tax refund calculator to estimate your liability and see how changes to deductions, credits, and withholding affect your outcome.',
```

Replace with:

```ts
    conclusion: 'Your refund is simply over-withheld tax returned to you — it is not a bonus, and a large refund means you gave the government an interest-free loan. Optimize your W-4 to keep more money each paycheck throughout the year. Review your W-4 after any major life event, and understand which deductions and credits apply to your situation. Use the formula — Refund = Tax withheld − Tax owed — as your starting point, then plug your numbers into our tax refund calculator for a quick federal estimate.',
```

- [ ] **Step 3: Run full test suite**

```bash
npx vitest run
```

Expected: all 52 tests pass. The "renders all 20 posts without error" test in BlogPostPage.test.tsx will automatically cover the updated post.

- [ ] **Step 4: Commit**

```bash
git add src/data/blogPosts.ts
git commit -m "feat: update tax refund blog post relatedLinks and conclusion"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| FormulaBox component + CSS module | Task 1 ✅ |
| Key facts strip (3 stat cards) | Task 2 ✅ |
| FormulaBox on TaxRefundPage | Task 2 ✅ |
| Year bug fix 2025 → 2026 | Task 2 ✅ |
| Example card value font increase | Task 2 ✅ |
| FAQ expansion 5 → 10 (LEGAL-reviewed copy) | Task 3 ✅ |
| `.formulaCallout` CSS class | Task 4 ✅ |
| BlogPostPage conditional formulaCallout | Task 4 ✅ |
| relatedLinks expansion (+2 links) | Task 5 ✅ |
| Conclusion update ("quick federal estimate") | Task 5 ✅ |

**Placeholder scan:** None found. All steps include exact code.

**Type consistency:** `FormulaBoxProps.formula` (string) and `FormulaBoxProps.note` (string | undefined) — used consistently in Task 1 (definition) and Task 2 (usage). `styles.formulaCallout` referenced in Task 4 Steps 1 and 4 — consistent.

**LEGAL fixes included:**
- `(IRS, tax year 2024)` attribution ✅ (Task 2 KEY_FACTS)
- Filing deadline with "extensions may apply" qualifier ✅ (Task 2 KEY_FACTS)
- `// TODO: update for next tax year` comment ✅ (Task 2)
- Underpayment penalty with $1,000 threshold + Form 2210 ref ✅ (Task 2 FormulaBox note)
- Refundable vs non-refundable credit note in FAQ Q6 ✅ (Task 3)
- PATH Act EITC/ACTC hold in FAQ Q10 ✅ (Task 3)
- "quick federal estimate" in blog conclusion ✅ (Task 5)
