# Design: Credit Card Payoff + Investment Return Calculators

Date: 2026-05-10
Status: Approved

## Overview

Two new calculators for finance-fast.com:
1. **Credit Card Payoff Calculator** — `/credit-card-payoff-calculator`
2. **Investment Return / CAGR Calculator** — `/investment-return-calculator`

Both follow the established pattern: pure logic module + Calc component + Page component + nav entry + route + internal links.

---

## 1. Credit Card Payoff Calculator

### Route
`/credit-card-payoff-calculator`

### Purpose
Show how long it takes to pay off a credit card balance at a given monthly payment, and how much interest is paid. Compare against minimum-payment-only scenario to highlight cost of paying minimums.

### Inputs
- **Balance** ($) — current card balance
- **APR** (%) — annual percentage rate
- **Monthly Payment** ($) — what the user will pay each month

### Outputs
- Months to pay off (formatted as "X months" or "X years Y months")
- Total interest paid
- Total amount paid
- **Minimum payment comparison row:** if monthly payment > minimum, show how many extra months and extra interest the minimum-only path would cost

Minimum payment definition: `max(25, balance × 0.02)` — standard industry approximation.

### Logic (`src/calculators/credit-card/creditCard.ts`)

```
function calcCreditCard({ balance, apr, monthlyPayment }):
  monthlyRate = apr / 100 / 12
  simulate month-by-month until balance ≤ 0:
    interest = balance × monthlyRate
    principal = payment - interest
    if principal ≤ 0: return { error: 'payment_too_low' }
    balance -= principal
  return { months, totalInterest, totalPaid }
```

Run twice: once with `monthlyPayment`, once with computed minimum payment. Return both results.

### Edge cases
- Monthly payment ≤ monthly interest → show "Payment too low to pay off" warning
- Balance = 0 → no output
- APR = 0 → simple division (months = balance / payment)

### Files
```
src/calculators/credit-card/
  creditCard.ts       — pure calculation, no React
  CreditCardCalc.tsx  — UI component
src/pages/
  CreditCardPage.tsx  — full page (SEOMeta, H1, AdSlot, CreditCardCalc, FAQ, RelatedCalculators)
```

### SEO
- Title: `Credit Card Payoff Calculator — How Long to Pay Off?`
- Meta: `See how long it takes to pay off your credit card and how much interest you'll pay. Enter balance, APR, and monthly payment.` (≤160 chars)
- H1: `Credit Card Payoff Calculator`
- FAQ: "What is the minimum payment on a credit card?", "How is credit card interest calculated?", "Should I pay more than the minimum?"

### Nav entry
`{ to: '/credit-card-payoff-calculator', label: 'Credit Card' }`

### Internal links
**From this page → existing:**
- Debt Payoff Calculator (`/debt-payoff-calculator`) — "paying multiple debts"
- APR Calculator (`/apr-calculator`) — "understand your APR"
- Loan Calculator (`/loan-calculator`)

**From existing pages → this page:**
- `DebtPayoffPage.tsx` relatedCalculators → add Credit Card Payoff
- `AprPage.tsx` relatedCalculators → add Credit Card Payoff
- `LoanPage.tsx` relatedCalculators → add Credit Card Payoff
- Blog post `snowball-vs-avalanche` relatedLinks → add Credit Card Payoff
- Blog post `debt-to-income-ratio` relatedLinks → add Credit Card Payoff

---

## 2. Investment Return / CAGR Calculator

### Route
`/investment-return-calculator`

### Purpose
Two-mode calculator. Mode A calculates CAGR from known start/end values. Mode B projects future value from a starting investment and assumed annual return.

### Mode A — Calculate CAGR
**Inputs:** Start Value ($), End Value ($), Years
**Outputs:**
- CAGR (%)
- Total return (%)
- Total profit ($)

**Formula:** `CAGR = (endValue / startValue)^(1/years) - 1`

### Mode B — Future Value
**Inputs:** Start Value ($), Annual Return (%), Years
**Outputs:**
- Final Value ($)
- Total Profit ($)
- Total Return (%)
- Year-by-year table (Year, Value, Gain that year) — up to 30 rows

**Formula:** `finalValue = startValue × (1 + rate)^years`

### Edge cases
- Start value = 0 → no output
- End value < start value → CAGR is negative (loss), show clearly
- Years = 0 → no output
- Very large years (>100) → cap table at 50 rows, show note

### Files
```
src/calculators/investment-return/
  investmentReturn.ts           — pure calculation
  InvestmentReturnCalc.tsx      — UI with mode toggle
src/pages/
  InvestmentReturnPage.tsx      — full page
```

### SEO
- Title: `Investment Return Calculator — CAGR & Future Value`
- Meta: `Calculate CAGR from start and end values, or project future investment value with compound annual growth rate.` (≤160 chars)
- H1: `Investment Return Calculator`
- FAQ: "What is CAGR?", "What is a good annual investment return?", "How is compound growth calculated?"

### Nav entry
`{ to: '/investment-return-calculator', label: 'Invest. Return' }`

### Internal links
**From this page → existing:**
- Compound Interest Calculator (`/compound-interest-calculator`)
- Savings Goal Calculator (`/savings-goal-calculator`)
- Retirement Calculator (`/retirement-calculator`)

**From existing pages → this page:**
- `CompoundPage.tsx` relatedCalculators → add Investment Return
- `RetirementPage.tsx` relatedCalculators → add Investment Return
- `SavingsGoalPage.tsx` relatedCalculators → add Investment Return
- Blog `what-is-compound-interest` relatedLinks → add Investment Return
- Blog `how-much-to-save-for-retirement` relatedLinks → add Investment Return
- Blog `what-is-net-worth` relatedLinks → add Investment Return

---

## Implementation Checklist

### finance-fast

- [ ] `src/calculators/credit-card/creditCard.ts`
- [ ] `src/calculators/credit-card/CreditCardCalc.tsx`
- [ ] `src/pages/CreditCardPage.tsx`
- [ ] `src/calculators/investment-return/investmentReturn.ts`
- [ ] `src/calculators/investment-return/InvestmentReturnCalc.tsx`
- [ ] `src/pages/InvestmentReturnPage.tsx`
- [ ] `src/components/Nav.tsx` — add 2 nav entries
- [ ] `src/AppContent.tsx` — add 2 routes + imports
- [ ] `src/pages/HomePage.tsx` — add 2 calculator cards
- [ ] `prerender.mjs` — add 2 new URLs
- [ ] Internal links: outgoing (from new pages) + incoming (existing pages/blog posts)
- [ ] TypeScript check
- [ ] Commit + push
