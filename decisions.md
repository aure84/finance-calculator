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

## 2026-04-17 -- Growth Priority: UI Refresh Before SEO Content

**Decision:** Ship the navy + green UI refresh (CSS Modules) before adding SEO content layers.

**Reasoning:** AdSense approval depends heavily on perceived site quality -- design, professionalism, UX. A polished UI increases approval odds significantly. SEO content (FAQ schema, "How it works" sections) layered on top of a professional design converts better and avoids rework. GSC URL inspection is zero-effort and runs in parallel.

**Score:** 21/25 (High Priority)
- ROI Potential: 4 (AdSense approval unlocks revenue; SEO content drives traffic)
- Time to Market: 4 (UI refresh is a focused sprint, not a rebuild)
- Complexity: 4 (CSS Modules swap, no logic changes)
- Scalability: 4 (design system applies to all future pages)
- Monetization: 5 (directly gates AdSense approval)

**Execution Order:**
1. UI refresh -- navy + green design, CSS Modules (Sprint priority)
2. GSC URL inspection -- request indexing for all 5 pages (5 min, do immediately)
3. FAQ schema + "How it works" content sections on each calculator page
4. Internal cross-linking between related calculators
5. New calculator pages (retirement, tax refund) -- after traffic data validates demand

**Next Steps:**
1. Implement UI refresh across all calculator pages
2. Request indexing in GSC for all live URLs
3. Add FAQ schema markup + content sections post-refresh
4. Monitor AdSense review status
