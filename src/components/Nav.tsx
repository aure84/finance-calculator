import { NavLink } from 'react-router-dom'

const links = [
  { to: '/salary-calculator', label: 'Salary' },
  { to: '/mortgage-calculator', label: 'Mortgage' },
  { to: '/compound-interest-calculator', label: 'Compound Interest' },
  { to: '/loan-calculator', label: 'Loan' },
  { to: '/debt-payoff-calculator', label: 'Debt Payoff' },
]

export default function Nav() {
  return (
    <header style={{ borderBottom: '1px solid #e5e7eb', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 32 }}>
      <NavLink to="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: 'none', color: '#1a1a1a' }}>
        finance-fast.com
      </NavLink>
      <nav style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#2563eb' : '#4b5563',
              fontWeight: isActive ? 600 : 400,
              fontSize: 14,
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
