# Tax Refund Page Enrichment — Design Spec

**Date:** 2026-05-23  
**Project:** finance-fast.com  
**Trigger:** GSC data (7 days, 2026-05-15–21) shows tax refund queries dominating impressions at actionable positions — pos 1, 8, 12. Zero clicks due to low CTR and insufficient content depth. Goal: strengthen the signal with content depth + visual polish.

---

## Context

### GSC signals (7 days)
| Query | Position |
|---|---|
| how to calculate tax refund amount | 1.0 |
| refund calculation explained | 8.0 |
| irs refund equals total payments minus total tax formula | 12.0 |
| calculate irs refund | 28.0 |
| how are tax refunds calculated | 33.0 |

### Current state
- `TaxRefundPage.tsx`: H1 + 2-paragraph explanation + 3 example cards (labeled "2025") + 5 FAQs + related links
- Blog post `how-tax-refund-is-calculated`: 7 sections, comprehensive, formula is a plain paragraph
- No visual formula callout anywhere on either page

---

## Scope

Content enrichment + visual polish on `TaxRefundPage.tsx` and `blogPosts.ts` / `BlogPostPage.tsx`. No new blog posts, no calculator logic changes.

---

## 1. New Component: FormulaBox

**File:** `src/components/FormulaBox.tsx` + `FormulaBox.module.css`

Reusable callout component for displaying mathematical formulas.

```tsx
<FormulaBox
  formula="Refund = Tax withheld − Tax owed"
  note="If the result is negative, you owe the IRS the difference."
/>
```

**Visual:**
```
┌─────────────────────────────────────────────────┐
│  The formula                                    │
│                                                 │
│  Refund = Tax withheld − Tax owed               │
│                                                 │
│  If the result is negative, you owe the IRS.   │
└─────────────────────────────────────────────────┘
```

**Styles (all CSS tokens, no hardcoded hex):**
- Background: `var(--results-bg)`
- Left border: `4px solid var(--navy)`
- Formula text: `var(--navy)`, monospace font, `font-size: 1.25rem`, `font-weight: 700`
- Note text: `var(--text-muted)`, `font-size: 0.875rem`
- Padding: `1.25rem 1.5rem`
- Border-radius: `8px`

Props:
```ts
interface FormulaBoxProps {
  formula: string
  note?: string
}
```

---

## 2. TaxRefundPage Changes

**File:** `src/pages/TaxRefundPage.tsx`

### 2a. Key Facts Strip

Placed between the subtitle paragraph and the AdSlot. Three stat cards in a horizontal grid (stacks on mobile).

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  ~$3,100     │  │  Apr 15      │  │  ~21 days    │
│  avg. refund │  │  2026 filing │  │  e-file      │
│  (IRS 2025)  │  │  deadline    │  │  turnaround  │
└──────────────┘  └──────────────┘  └──────────────┘
```

Styles: `--surface` background, `--border` border, `--navy` for the large number, `--text-muted` for label. Max height ~80px per card. Inline styles using CSS tokens (consistent with existing page patterns).

### 2b. FormulaBox placement

Placed after the calculator panel (`<div className={styles.panel}>`), before the existing "How your tax refund is calculated" content section.

```tsx
<FormulaBox
  formula="Refund = Tax withheld − Tax owed"
  note="If the result is negative, you owe the difference — and may face an underpayment penalty if the shortfall is significant."
/>
```

### 2c. Year bug fix

`"Example refund estimates (single filer, 2025)"` → `"Example refund estimates (single filer, 2026)"`

### 2d. Example card visual tweak

The refund value display (`+$1,638` etc.) gets `fontSize: '1.75rem'` and `fontWeight: 700` (currently smaller and lighter). No structural change.

### 2e. FAQ expansion: 5 → 10 questions

Five new questions added, directly targeting GSC queries:

1. *How do I calculate my tax refund amount?*  
   A: Use the formula: Refund = Total tax withheld − Tax owed. Your tax owed is calculated by applying progressive federal brackets to your taxable income (gross income minus the standard deduction), then subtracting any credits.

2. *What does the IRS mean by "total tax payments minus total tax"?*  
   A: Total tax payments = everything withheld from your paychecks plus any estimated payments you made. Total tax = your actual liability after brackets, deductions, and credits. The difference is your refund or balance due.

3. *How is my refund different from last year?*  
   A: Common reasons: income change, filing status change (marriage, divorce), a new dependent (Child Tax Credit), losing a deduction (paid-off mortgage), or a change in withholding via your W-4.

4. *What is the average federal tax refund?*  
   A: The IRS reported an average refund of approximately $3,100 for tax year 2024. Refunds vary widely by income, filing status, and credits claimed.

5. *How long does it take to receive a tax refund?*  
   A: E-filed returns with direct deposit: typically within 21 days. Paper returns: 4–8 weeks. You can check your status at IRS.gov using "Where's My Refund?"

### 2f. Updated page order

```
H1
subtitle
Key facts strip       ← new
AdSlot
Calculator panel
FormulaBox            ← new
"How your tax refund is calculated" section (existing)
Example cards (2026 label, larger value text)
AdSlot
FAQ (10 questions)
Disclaimer
RelatedCalculators
```

---

## 3. Blog Post Changes

**Files:** `src/data/blogPosts.ts`, `src/pages/BlogPostPage.tsx`, `src/pages/blog.module.css`

### 3a. Formula callout in "The Refund Formula" section

In `BlogPostPage.tsx`, the first paragraph of any section with heading `"The Refund Formula"` is rendered with a `.formulaCallout` CSS class instead of the standard paragraph class.

**Condition:** `section.heading === 'The Refund Formula' && index === 0` (first paragraph only).

**CSS** (in `blog.module.css`):
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

### 3b. relatedLinks expansion

Add two links to the tax refund blog post's `relatedLinks` array:
```ts
{ label: 'How Is Net Salary Calculated?', to: '/blog/how-net-salary-is-calculated' },
{ label: 'What Is a 401(k)?', to: '/blog/what-is-401k' },
```

### 3c. Conclusion update

Append one sentence to the existing conclusion:

> Use the formula — Refund = Tax withheld − Tax owed — as your starting point, then plug your numbers into our tax refund calculator for a personalized estimate.

---

## File Summary

| File | Change type |
|---|---|
| `src/components/FormulaBox.tsx` | New component |
| `src/components/FormulaBox.module.css` | New styles |
| `src/pages/TaxRefundPage.tsx` | Key facts, FormulaBox, year fix, FAQ bővítés, card tweak |
| `src/pages/blog.module.css` | `.formulaCallout` class |
| `src/pages/BlogPostPage.tsx` | Conditional formulaCallout rendering |
| `src/data/blogPosts.ts` | relatedLinks + conclusion update |

---

## Out of Scope

- Calculator logic changes
- New blog posts
- Other calculator pages
- i18n
- AdSense slot placement changes
