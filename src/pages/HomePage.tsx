import { Link } from 'react-router-dom'

const calculators = [
  { to: '/salary-calculator', emoji: '💰', title: 'Salary Calculator', desc: 'Calculate take-home pay after federal taxes' },
  { to: '/mortgage-calculator', emoji: '🏠', title: 'Mortgage Calculator', desc: 'Monthly payments and amortization schedule' },
  { to: '/compound-interest-calculator', emoji: '📈', title: 'Compound Interest', desc: 'See your investment grow over time' },
  { to: '/loan-calculator', emoji: '🚗', title: 'Loan Calculator', desc: 'Monthly payments for any loan type' },
  { to: '/debt-payoff-calculator', emoji: '💳', title: 'Debt Payoff', desc: 'Snowball vs avalanche comparison' },
]

export default function HomePage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>Free Financial Calculators</h1>
      <p style={{ color: '#6b7280', marginBottom: 40, fontSize: 18 }}>
        Fast, accurate calculators for your most important financial decisions.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {calculators.map(c => (
          <Link key={c.to} to={c.to} style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, display: 'block' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{c.emoji}</div>
            <div style={{ fontWeight: 600, fontSize: 16, color: '#1a1a1a', marginBottom: 6 }}>{c.title}</div>
            <div style={{ fontSize: 14, color: '#6b7280' }}>{c.desc}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
