# Budget Calculator Page + Blog Enrichment — Design Spec

**Date:** 2026-05-23
**Project:** finance-fast.com
**Trigger:** GSC data (3 months) shows "how to create a monthly budget" at pos 28.2 with 25 impressions. Blog post `/blog/how-to-budget` exists and ranks, but no budget calculator page exists to capture tool-intent queries or provide internal link depth.

---

## Context

### GSC signal
| Query | Position |
|---|---|
| how to create a monthly budget | 28.2 |

### Current state
- `src/data/blogPosts.ts` slug `how-to-budget`: 7 sections, comprehensive editorial, no formula callout, links to `/savings-goal-calculator`
- No `/budget-calculator` route, no `BudgetPage.tsx`, no `budget` calculator directory

---

## Scope

1. New Budget Calculator page (`/budget-calculator`)
2. Blog post enrichment (formula callout + relatedLinks + conclusion update)

No new blog posts. No changes to other calculator pages.

---

## 1. New Budget Calculator

### Route and files

| File | Type |
|---|---|
| `src/calculators/budget/budget.ts` | Pure calc logic |
| `src/calculators/budget/budget.test.ts` | Unit tests |
| `src/calculators/budget/BudgetCalc.tsx` | Calculator UI component |
| `src/pages/BudgetPage.tsx` | Full page |

Route: `/budget-calculator` (added to `src/AppContent.tsx` + `entry-server.tsx`)

### Calculator logic (`budget.ts`)

```ts
interface BudgetInput {
  monthlyIncome: number
  needsPct: number   // default 50
  wantsPct: number   // default 30
  savingsPct: number // default 20
}

interface BudgetResult {
  needs: number
  wants: number
  savings: number
  needsAnnual: number
  wantsAnnual: number
  savingsAnnual: number
  totalPct: number
}

function calcBudget(input: BudgetInput): BudgetResult
```

- `totalPct = needsPct + wantsPct + savingsPct`
- `needs = monthlyIncome * needsPct / 100`, etc.
- Annual = monthly × 12
- Caller is responsible for validating totalPct === 100 before using results

### Calculator UI (`BudgetCalc.tsx`)

Inputs:
- Monthly take-home income ($) — number input, placeholder `$4,000`
- Needs % — number input, default `50`, min 0 max 100
- Wants % — number input, default `30`, min 0 max 100
- Savings & Debt % — number input, default `20`, min 0 max 100

Validation:
- If percentages do not sum to 100: show warning `"Percentages must add up to 100% (currently X%)"` — use `--error-bg`/`--error-border`/`--error-text` tokens
- If income is empty or 0: no result shown (same pattern as other calculators)

Result cards (shown when income > 0 and pcts sum to 100):
- 3 cards: `Needs · $X/mo · $X/yr`, `Wants · $X/mo · $X/yr`, `Savings & Debt · $X/mo · $X/yr`
- Colors: Needs → `--text`, Wants → `--text`, Savings → `--green`
- Background: `--results-bg`, border-radius 8, padding 16

Real-time (no submit button). All existing calculator patterns use `useState` + derived values.

### Page structure (`BudgetPage.tsx`)

```
SEOMeta (title + description)
FAQSchema
breadcrumb: Home › Budget Calculator
H1: "50/30/20 Budget Calculator"
subtitle paragraph
Key Facts strip (3 cards)
AdSlot slot="header"
Calculator panel
AdSlot slot="content"
FormulaBox
"What each budget bucket means" section
Example cards (3 income levels)
FAQ (8 questions)
Disclaimer
RelatedCalculators → salary, savings-goal, debt-payoff
Related Guides → how-to-budget blog post
```

### Key Facts strip

| Value | Label | Sub |
|---|---|---|
| ~3.4% | avg. US personal savings rate | BEA, Q1 2026 |
| 3–6 months | recommended emergency fund | expenses, not income |
| 20% | savings target | 50/30/20 rule |

### FormulaBox

```tsx
<FormulaBox
  formula="Monthly Budget = 50% Needs + 30% Wants + 20% Savings"
  note="Adjust the percentages to fit your situation — if you live in an expensive city, needs may run 60%+. The structure matters more than the exact split."
/>
```

### Example cards (single filer)

| Income | Needs (50%) | Wants (30%) | Savings (20%) |
|---|---|---|---|
| $3,000/mo | $1,500 | $900 | $600 |
| $5,000/mo | $2,500 | $1,500 | $1,000 |
| $8,000/mo | $4,000 | $2,400 | $1,600 |

### FAQ (8 questions)

1. *What is the 50/30/20 rule?* — Elizabeth Warren framework: 50% needs, 30% wants, 20% savings and debt repayment. A starting point, not a rigid formula.
2. *What counts as a "need" vs a "want"?* — Needs: rent, groceries, utilities, insurance, transport, minimum debt payments. Wants: dining out, entertainment, subscriptions, travel, hobbies.
3. *How do I calculate my monthly budget?* — Take your after-tax income, multiply by 0.50 for needs, 0.30 for wants, 0.20 for savings and debt. Adjust percentages as your situation requires.
4. *What if my needs exceed 50% of income?* — Common in high cost-of-living areas. Reduce the wants allocation first (e.g., 60/20/20). The goal is to keep savings above 10% minimum.
5. *Should I budget on gross or net income?* — Always net (take-home) income. Taxes and deductions are already gone before you make spending decisions.
6. *How do I handle irregular income?* — Budget off your lowest income month from the past 12 months. In higher months, direct the surplus to emergency fund first, then debt, then investments.
7. *Where does debt repayment fit in the budget?* — Minimum payments are a "need." Extra debt payments count toward the 20% savings/debt bucket.
8. *How often should I review my budget?* — Monthly. Compare planned vs. actual spending. The first budget is rarely accurate — each month's review makes the next one more precise.

### SEO meta

- **title:** `50/30/20 Budget Calculator — Monthly Budget Breakdown`
- **description:** `Enter your monthly take-home income and see your 50/30/20 budget breakdown — how much to spend on needs, wants, and savings. Free, instant, no sign-up.`

### Disclaimer

> Estimates based on the 50/30/20 budgeting framework. Actual budget requirements vary by location, household size, and individual circumstances. Does not account for taxes, irregular income, or specific debt obligations. Consult a financial advisor for personalized guidance.

---

## 2. Blog Post Enrichment

**File:** `src/data/blogPosts.ts`, `src/pages/BlogPostPage.tsx`

### 2a. Section `formulaCallout` flag

Add `formulaCallout: true` to the `'The 50/30/20 Rule'` section in the `how-to-budget` blog post. This is the trigger for the visual callout on the first paragraph.

Extend the `BlogPostPage.tsx` renderer: change the condition from `section.heading === 'The Refund Formula'` to `section.formulaCallout === true`. Update the `blogPosts.ts` TypeScript section type to include `formulaCallout?: boolean`.

The tax refund blog post's "The Refund Formula" section gets `formulaCallout: true` added (migrating it from the heading-match approach).

### 2b. `relatedLinks` update

Add to the `how-to-budget` post's `relatedLinks` array:
```ts
{ label: 'Budget Calculator', to: '/budget-calculator' }
```

### 2c. Conclusion update

Append one sentence to the existing conclusion:
> Try our budget calculator to enter your income and see your 50/30/20 breakdown instantly.

---

## File Summary

| File | Change type |
|---|---|
| `src/calculators/budget/budget.ts` | New — pure calc logic |
| `src/calculators/budget/budget.test.ts` | New — unit tests |
| `src/calculators/budget/BudgetCalc.tsx` | New — calculator UI |
| `src/pages/BudgetPage.tsx` | New — full page |
| `src/AppContent.tsx` | Modified — add route + import |
| `src/entry-server.tsx` | Modified — add route to prerender list |
| `src/data/blogPosts.ts` | Modified — formulaCallout flag, relatedLinks, conclusion |
| `src/pages/BlogPostPage.tsx` | Modified — generalize formulaCallout condition |

---

## Out of Scope

- New blog posts
- Changes to other calculator pages
- State tax breakdown in budget calculator
- Itemized expense tracking
- Custom expense categories
- i18n
