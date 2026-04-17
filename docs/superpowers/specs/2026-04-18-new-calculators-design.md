# New Calculators — Design Spec

**Goal:** Add Retirement, Tax Refund, and Savings Goal calculator pages to finance-fast.com.

**Date:** 2026-04-18

---

## Architecture

Each calculator follows the identical pattern used by the existing 5 calculators:

- `src/calculators/<name>/<name>.ts` — pure calculation logic, no side effects
- `src/calculators/<name>/<name>.test.ts` — unit tests for the logic
- `src/calculators/<name>/<Name>Calc.tsx` — UI component (inputs + results)
- `src/pages/<Name>Page.tsx` — SEO page wrapper (SEOMeta, FAQSchema, AdSlot, RelatedCalculators)

Three new routes added to `src/App.tsx`:
- `/retirement-calculator`
- `/tax-refund-calculator`
- `/savings-goal-calculator`

`src/pages/HomePage.tsx` grid extended with 3 new cards.

---

## Calculator 1: Retirement Calculator

### Inputs
- Current Savings ($)
- Monthly Contribution ($)
- Annual Return (%)
- Years to Retirement

### Outputs
- Projected Balance (large, prominent)
- Total Contributions
- Total Interest Earned

### Formula
Future value of present savings plus future value of recurring contributions:

```
r = annualReturn / 100 / 12
n = years * 12
FV_savings = currentSavings × (1 + r)^n
FV_contributions = monthlyContribution × [((1 + r)^n − 1) / r]
projectedBalance = FV_savings + FV_contributions
totalContributions = currentSavings + monthlyContribution × n
totalInterest = projectedBalance − totalContributions
```

Edge case: if annualReturn = 0, FV_contributions = monthlyContribution × n (no division by zero).

### FAQ
1. **What is a realistic annual return rate?** The S&P 500 has historically returned around 10% annually before inflation. A conservative estimate of 6–7% accounts for inflation and diversification.
2. **How much should I save per month?** A common guideline is to save 15% of your gross income for retirement, including any employer match.
3. **What is compound growth?** Compound growth means your returns earn returns. The longer your money is invested, the more powerful this effect becomes.

### Related Calculators
- Compound Interest Calculator (`/compound-interest-calculator`)
- Salary Calculator (`/salary-calculator`)

### Advanced Mode (planned, not in this sprint)
Future inputs: current age, retirement age, inflation rate, Social Security monthly estimate. Toggle shown but greyed out with "Coming soon" label, or simply deferred until sprint after GSC data.

---

## Calculator 2: Tax Refund Calculator

### Inputs
- Filing Status: Single / Married Filing Jointly / Married Filing Separately / Head of Household
- Gross Income ($)
- Federal Tax Withheld ($)

### Outputs
- Estimated Refund (green) or Amount Owed (red)

### Formula (tax year 2025)

**Standard deductions:**
| Filing Status | Deduction |
|---|---|
| Single | $15,000 |
| Married Filing Jointly | $30,000 |
| Married Filing Separately | $15,000 |
| Head of Household | $22,500 |

**Federal tax brackets (2025, Single / Married Filing Separately):**
| Rate | Income |
|---|---|
| 10% | $0 – $11,925 |
| 12% | $11,926 – $48,475 |
| 22% | $48,476 – $103,350 |
| 24% | $103,351 – $197,300 |
| 32% | $197,301 – $250,525 |
| 35% | $250,526 – $626,350 |
| 37% | over $626,350 |

**Federal tax brackets (2025, Married Filing Jointly):**
| Rate | Income |
|---|---|
| 10% | $0 – $23,850 |
| 12% | $23,851 – $96,950 |
| 22% | $96,951 – $206,700 |
| 24% | $206,701 – $394,600 |
| 32% | $394,601 – $501,050 |
| 35% | $501,051 – $751,600 |
| 37% | over $751,600 |

**Federal tax brackets (2025, Head of Household):**
| Rate | Income |
|---|---|
| 10% | $0 – $17,000 |
| 12% | $17,001 – $64,850 |
| 22% | $64,851 – $103,350 |
| 24% | $103,351 – $197,300 |
| 32% | $197,301 – $250,500 |
| 35% | $250,501 – $626,350 |
| 37% | over $626,350 |

**Calculation:**
```
taxableIncome = max(0, grossIncome − standardDeduction)
federalTax = sum of marginal tax across brackets
result = federalTaxWithheld − federalTax
  positive → refund
  negative → amount owed
```

### FAQ
1. **How is my federal tax calculated?** The US uses a progressive bracket system — each portion of your income is taxed at the corresponding rate, not your entire income at the top rate.
2. **What is the standard deduction?** A flat amount that reduces your taxable income. For 2025: $15,000 (Single), $30,000 (Married Filing Jointly), $22,500 (Head of Household).
3. **When will I get my refund?** The IRS issues most refunds within 21 days of e-filing. Paper returns take 4–8 weeks.

### Related Calculators
- Salary Calculator (`/salary-calculator`)
- Loan Calculator (`/loan-calculator`)

---

## Calculator 3: Savings Goal Calculator

### Inputs
- Goal Amount ($)
- Current Savings ($)
- Monthly Contribution ($)
- Annual Return (%)

### Outputs
- Months to Goal (large, prominent)
- Years to Goal
- Total Contributions
- Total Interest Earned

### Formula
```
r = annualReturn / 100 / 12

If r = 0:
  months = (goal − currentSavings) / monthlyContribution

If r > 0:
  months = log((goal × r + monthlyContribution) / (currentSavings × r + monthlyContribution)) / log(1 + r)

totalContributions = currentSavings + monthlyContribution × months
totalInterest = goal − totalContributions
```

Edge cases:
- If currentSavings ≥ goal → goal already reached (months = 0)
- If monthlyContribution = 0 and r = 0 → goal unreachable (show error)
- Round months up to nearest integer (ceil)

### FAQ
1. **How long will it take to reach my savings goal?** It depends on your starting balance, monthly contribution, and the return rate on your savings. This calculator uses compound interest to project the timeline.
2. **Does investment return really make a difference?** Even a modest 4–5% annual return in a high-yield savings account significantly shortens the timeline compared to 0%.
3. **What is a realistic savings return rate?** High-yield savings accounts currently offer 4–5%. Investing in index funds historically returns 7–10% annually, with more risk.

### Related Calculators
- Compound Interest Calculator (`/compound-interest-calculator`)
- Retirement Calculator (`/retirement-calculator`)

---

## Homepage Updates

Add 3 new cards to the `calculators` array in `src/pages/HomePage.tsx`:

```tsx
{ to: '/retirement-calculator', icon: PiggyBank, title: 'Retirement Calculator', desc: 'Project your savings at retirement' },
{ to: '/tax-refund-calculator', icon: Receipt, title: 'Tax Refund Calculator', desc: 'Estimate your federal tax refund or amount owed' },
{ to: '/savings-goal-calculator', icon: Target, title: 'Savings Goal Calculator', desc: 'Find out how long to reach your savings target' },
```

Icons from `lucide-react`: `PiggyBank`, `Receipt`, `Target`.

---

## Testing

Each calculator gets unit tests in its `.test.ts` file:

**Retirement:** known input → known output (zero-return edge case included)

**Tax Refund:** one test per filing status, edge case for income below standard deduction (tax = 0, full withholding = refund)

**Savings Goal:** known input → known output, zero-return edge case, goal-already-reached edge case, unreachable goal edge case

---

## Disclaimer Text

**Retirement:** For illustrative purposes only. Does not account for inflation, taxes, Social Security, or investment fees. Past market returns do not guarantee future results.

**Tax Refund:** Estimates based on 2025 federal standard deductions and tax brackets only. Does not include state taxes, AMT, credits, or deductions. Consult a tax professional for accurate filing.

**Savings Goal:** For illustrative purposes only. Assumes a fixed monthly contribution and constant annual return. Does not account for taxes on investment gains or changes in contribution amount.
