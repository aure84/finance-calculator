# Decisions Log -- finance-fast.com

## 2026-04-16 -- Domain Selection

**Decision:** finance-fast.com (Option B)

**Reasoning:** Broadest SEO keyword coverage across all six planned calculators, consistent `-fast.com` brand family pattern, and "finance" does not pigeonhole the site into a single feature unlike "budget" or "salary." High-CPC niche.

**Score:** 22/25 (High Priority)

**Next Steps:**
1. Register finance-fast.com
2. Scaffold repo from convert-fast.com template
3. Define Sprint 1 (salary, mortgage, compound interest calculators)
4. Set up GSC + Analytics

## 2026-04-16 -- MVP Scope: 5 Calculators (Option B)

**Decision:** Launch with 5 calculators -- salary, mortgage, compound interest, loan, debt payoff.

**Reasoning:** 3 calculators is too thin for meaningful organic traffic in the finance niche. 10 delays launch by weeks with diminishing returns. 5 covers the highest-volume personal finance search clusters and gives Google enough content to start ranking. All five are formula-based with no API dependencies, so development stays fast using the convert-fast.com template.

**Score:** 23/25 (High Priority)

**MVP Scope:**
- Salary / take-home pay calculator (federal + state tax)
- Mortgage calculator (amortization schedule)
- Compound interest calculator
- Loan calculator (auto/personal)
- Debt payoff calculator (snowball/avalanche)
- SEO landing page per calculator
- AdSense integration
- GSC + GA4

**Next Steps:**
1. Scaffold repo from convert-fast.com template (React 19 + Vite)
2. Build salary and mortgage calculators first (highest search volume)
3. Ship compound interest, loan, debt payoff in parallel
4. Deploy to Cloudflare Pages, submit sitemap to GSC
5. Apply for AdSense once 5 pages are live
