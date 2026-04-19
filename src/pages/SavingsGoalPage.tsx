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
    a: 'High-yield savings accounts have recently offered around 4–5% (as of 2025). Investing in index funds historically returns 7–10% annually, with more short-term risk. Choose a rate that matches where you plan to save.',
  },
]

export default function SavingsGoalPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Savings Goal Calculator — How Long Will It Take to Save?"
        description="Find out how many months it will take to reach your savings goal. Enter your target, current savings, monthly contribution, and return rate. Free calculator."
      />
      <FAQSchema items={SAVINGS_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Savings Goal Calculator
      </div>
      <h1 className={styles.title}>How Long Will It Take to Reach My Savings Goal?</h1>
      <p className={styles.subtitle}>
        Enter your target amount, current savings, monthly contribution, and expected return — see exactly how many months until you reach your goal.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <SavingsGoalCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How savings timelines are calculated</h2>
        <p className={styles.sectionText}>
          This calculator combines your starting balance (growing with interest) and your monthly contributions (each earning compound interest from the month they're added) until the total reaches your goal. A higher return rate shortens the timeline; a higher monthly contribution shortens it even more.
        </p>
        <p className={styles.sectionText}>
          The biggest lever is your monthly contribution — doubling it roughly halves the time to reach your goal, regardless of the return rate.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example savings timelines</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Emergency fund</div>
            <div className={styles.exampleScenario}>Goal: $10,000 · $0 start · $400/mo · 4.5%</div>
            <div className={styles.exampleValue}>~26 months</div>
            <div className={styles.exampleSub}>About 2 years 2 months</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Car down payment</div>
            <div className={styles.exampleScenario}>Goal: $20,000 · $1,000 start · $600/mo · 4.5%</div>
            <div className={styles.exampleValue}>~30 months</div>
            <div className={styles.exampleSub}>About 2 years 6 months</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Home down payment</div>
            <div className={styles.exampleScenario}>Goal: $50,000 · $5,000 start · $1,500/mo · 5%</div>
            <div className={styles.exampleValue}>~28 months</div>
            <div className={styles.exampleSub}>About 2 years 4 months</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {SAVINGS_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> For illustrative purposes only. Assumes a fixed monthly contribution and constant annual return. Does not account for taxes on investment gains or changes in contribution amount.
      </div>
      <RelatedCalculators links={SAVINGS_RELATED} />
    </main>
  )
}
