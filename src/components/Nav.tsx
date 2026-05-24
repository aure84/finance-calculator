import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState<string>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (saved) return saved
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))]
}

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
  { to: '/credit-card-payoff-calculator', label: 'Credit Card' },
  { to: '/investment-return-calculator', label: 'Invest. Return' },
  { to: '/budget-calculator', label: 'Budget' },
  { to: '/tip-calculator', label: 'Tip' },
  { to: '/blog', label: 'Blog' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()
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

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

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
    </header>
  )
}
