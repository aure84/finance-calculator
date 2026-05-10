# finance-fast.com — Agent Instructions

## Design System

**Never use hardcoded hex colors in inline styles or CSS.** Always use CSS variables defined in `src/styles/globals.css`.

### CSS Token Reference

| Token | Light | Dark | Use for |
|-------|-------|------|---------|
| `--navy` | #1e3a5f | #6fa3d8 | Primary color, buttons |
| `--bg` | #f8fafc | #0f172a | Page background |
| `--surface` | #ffffff | #1e293b | Cards, inputs |
| `--border` | #e2e8f0 | #334155 | Borders, dividers |
| `--text` | #0f172a | #f1f5f9 | Body text |
| `--text-muted` | #64748b | #94a3b8 | Secondary text |
| `--results-bg` | #eef3f9 | #1e293b | Result cards, table rows |
| `--green` | #16a34a | #4ade80 | Positive values |
| `--error` | #dc2626 | #f87171 | Error text |
| `--error-bg` | #fef2f2 | #450a0a | Error container background |
| `--error-border` | #fecaca | #7f1d1d | Error container border |
| `--error-text` | #991b1b | #fca5a5 | Error container text |
| `--success-bg` | #f0fdf4 | #052e16 | Success container background |
| `--success-border` | #86efac | #166534 | Success container border |
| `--success-text` | #166534 | #4ade80 | Success container text |

### Common Patterns

Input fields:
```tsx
const inputStyle = {
  padding: '10px 12px',
  border: '1px solid var(--border)',
  borderRadius: 6,
  fontSize: 16,
  background: 'var(--surface)',
  color: 'var(--text)',
}
```

Result cards:
```tsx
<div style={{ background: 'var(--results-bg)', padding: 16, borderRadius: 8 }}>
```

Error state:
```tsx
<div style={{ background: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error-text)' }}>
```

Success state:
```tsx
<div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', color: 'var(--success-text)' }}>
```

Table row dividers:
```tsx
<tr style={{ borderBottom: '1px solid var(--border)' }}>
```

## Tech Stack

- React 18 + TypeScript + Vite
- `react-router-dom` for routing
- SSR prerender via `entry-server.tsx` (49 routes)
- CSS Modules for layout (`calculator.module.css`), global tokens in `globals.css`
- Google Consent Mode v2: default all signals denied, upgrade on consent

## File Structure

- `src/calculators/<name>/` — each calculator has its own directory
- `src/pages/` — static pages (Home, legal)
- `src/components/` — shared components (CookieBanner, Layout, etc.)
- `src/utils/format.ts` — `formatCurrency`, `formatPercent` helpers
- `src/styles/globals.css` — CSS variables + reset
