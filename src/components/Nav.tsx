import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

const links = [
  { to: '/salary-calculator', label: 'Salary' },
  { to: '/mortgage-calculator', label: 'Mortgage' },
  { to: '/compound-interest-calculator', label: 'Compound Interest' },
  { to: '/loan-calculator', label: 'Loan' },
  { to: '/debt-payoff-calculator', label: 'Debt Payoff' },
  { to: '/retirement-calculator', label: 'Retirement' },
  { to: '/tax-refund-calculator', label: 'Tax Refund' },
  { to: '/savings-goal-calculator', label: 'Savings Goal' },
]

export default function Nav() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        finance-fast.com
      </NavLink>
      <nav className={styles.nav}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
