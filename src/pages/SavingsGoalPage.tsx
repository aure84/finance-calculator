import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import SavingsGoalCalc from '../calculators/savings-goal/SavingsGoalCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const SAVINGS_RELATED = [
  { label: 'Compound Interest Calculator', to: '/compound-interest-calculator', description: 'See how your savings grow over time with compound interest.' },
  { label: 'Retirement Calculator', to: '/retirement-calculator', description: 'Project your savings balance at retirement.' },
]

const SAVINGS_FAQ = [
  {
    q: 'How long will it take to reach my savings goal?',
    a: 'It depends on your starting balance, monthly contribution, and return rate. This calculator uses compound interest to project the exact timeline.',
  },
  {
    q: 'Does investment return really make a difference?',
    a: 'Even a modest 4–5% annual return in a high-yield savings account significantly shortens the timeline compared to keeping money in a 0% checking account.',
  },
  {
    q: 'What is a realistic savings return rate?',
    a: 'High-yield savings accounts currently offer 4–5%. Investing in index funds historically returns 7–10% annually, with more short-term risk. Choose a rate that matches where you plan to save.',
  },
]

export default function SavingsGoalPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Savings Goal Calculator — How Long to Save? | finance-fast.com"
        description="Find out how many months it will take to reach your savings goal. Enter your target amount, current savings, monthly contribution, and return rate."
      />
      <FAQSchema items={SAVINGS_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Savings Goal Calculator
      </div>
      <h1 className={styles.title}>Savings Goal Calculator</h1>
      <p className={styles.subtitle}>
        Find out how long it will take to reach your savings target based on your contributions and expected return.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <SavingsGoalCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> For illustrative purposes only. Assumes a fixed monthly contribution and constant annual return. Does not account for taxes on investment gains or changes in contribution amount.
      </div>
      <RelatedCalculators links={SAVINGS_RELATED} />
    </main>
  )
}
