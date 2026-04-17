# Internal Linking — Design Spec

**Goal:** Add a "Related Calculators" section to all 5 calculator pages to improve SEO topical authority and user navigation.

**Date:** 2026-04-17

---

## Architecture

A single reusable `RelatedCalculators` component accepts a list of links and renders them as cards. Each calculator page imports the component and passes its own static link list. No global state, no routing logic — just props-driven rendering.

## Component

**`src/components/RelatedCalculators.tsx`**

Props:
```ts
interface RelatedLink {
  label: string        // e.g. "Loan Calculator"
  to: string           // React Router path, e.g. "/loan"
  description: string  // one-line description, e.g. "Calculate monthly payments for any loan."
}

interface Props {
  links: RelatedLink[]
}
```

Renders:
```tsx
<section className={styles.section}>
  <h2 className={styles.heading}>Related Calculators</h2>
  <div className={styles.grid}>
    {links.map(link => (
      <Link key={link.to} to={link.to} className={styles.card}>
        <span className={styles.cardLabel}>{link.label}</span>
        <span className={styles.cardDesc}>{link.description}</span>
      </Link>
    ))}
  </div>
</section>
```

**`src/components/RelatedCalculators.module.css`**

- `.section`: `margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border)`
- `.heading`: `font-size: 1rem; font-weight: 600; color: var(--navy); margin-bottom: 1rem`
- `.grid`: `display: flex; flex-wrap: wrap; gap: 0.75rem`
- `.card`: block link, `border: 1px solid var(--border); border-radius: 8px; padding: 0.75rem 1rem; text-decoration: none; flex: 1; min-width: 160px`
- `.card:hover`: `border-color: var(--navy); color: var(--navy)`
- `.cardLabel`: block, `font-weight: 600; font-size: 0.9rem; color: var(--navy)`
- `.cardDesc`: block, `font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem`

## Link Map

| Page | Related links |
|------|--------------|
| `/mortgage` | Loan Calculator `/loan`, Debt Payoff Calculator `/debt-payoff` |
| `/loan` | Mortgage Calculator `/mortgage`, Debt Payoff Calculator `/debt-payoff` |
| `/debt-payoff` | Loan Calculator `/loan`, Mortgage Calculator `/mortgage` |
| `/salary` | Compound Interest Calculator `/compound` |
| `/compound` | Salary Calculator `/salary` |

## Placement

In each calculator page's JSX, add `<RelatedCalculators links={...} />` **after** the `<div className={styles.disclaimer}>` block, before `</main>`.

## Testing

One Vitest unit test in `src/components/RelatedCalculators.test.tsx`:
- Renders the correct number of links
- Each link has the correct `href` and label text
