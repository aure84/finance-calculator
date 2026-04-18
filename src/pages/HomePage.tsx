import { Link } from 'react-router-dom'
import { Wallet, Home, TrendingUp, Car, CreditCard, PiggyBank, Receipt, Target } from 'lucide-react'
import SEOMeta from '../components/SEOMeta'
import styles from './HomePage.module.css'

const calculators = [
  { to: '/salary-calculator', icon: Wallet, title: 'Salary Calculator', desc: 'Calculate take-home pay after federal taxes' },
  { to: '/mortgage-calculator', icon: Home, title: 'Mortgage Calculator', desc: 'Monthly payments and amortization schedule' },
  { to: '/compound-interest-calculator', icon: TrendingUp, title: 'Compound Interest', desc: 'See your investment grow over time' },
  { to: '/loan-calculator', icon: Car, title: 'Loan Calculator', desc: 'Monthly payments for any loan type' },
  { to: '/debt-payoff-calculator', icon: CreditCard, title: 'Debt Payoff', desc: 'Snowball vs avalanche comparison' },
  { to: '/retirement-calculator', icon: PiggyBank, title: 'Retirement Calculator', desc: 'Project your savings at retirement' },
  { to: '/tax-refund-calculator', icon: Receipt, title: 'Tax Refund Calculator', desc: 'Estimate your federal tax refund or amount owed' },
  { to: '/savings-goal-calculator', icon: Target, title: 'Savings Goal Calculator', desc: 'Find out how long to reach your savings target' },
]

export default function HomePage() {
  return (
    <>
      <SEOMeta
        title="Free Financial Calculators — Salary, Mortgage, Loan & More | finance-fast.com"
        description="Free financial calculators for salary take-home pay, mortgage payments, compound interest, loans, and debt payoff. Fast, accurate, no sign-up required."
      />
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Free Financial Calculators</h1>
        <p className={styles.heroSubtitle}>
          Fast, accurate calculators for your most important financial decisions.
        </p>
      </div>
      <div className={styles.section}>
        <div className={styles.grid}>
          {calculators.map(({ to, icon: Icon, title, desc }) => (
            <Link key={to} to={to} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon size={20} />
              </div>
              <div className={styles.cardTitle}>{title}</div>
              <div className={styles.cardDesc}>{desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
