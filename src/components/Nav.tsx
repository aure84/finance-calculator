import { useState, useEffect, useRef } from 'react'
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
  { to: '/vat-calculator', label: 'VAT' },
  { to: '/inflation-calculator', label: 'Inflation' },
  { to: '/percentage-calculator', label: 'Percentage' },
  { to: '/apr-calculator', label: 'APR' },
  { to: '/blog', label: 'Blog' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <header className={styles.header} ref={menuRef}>
      <NavLink to="/" className={styles.logo}>
        finance-fast.com
      </NavLink>

      <button
        className={styles.hamburger}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className={open ? styles.barTop + ' ' + styles.barTopOpen : styles.barTop} />
        <span className={open ? styles.barMid + ' ' + styles.barMidOpen : styles.barMid} />
        <span className={open ? styles.barBot + ' ' + styles.barBotOpen : styles.barBot} />
      </button>

      <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
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
