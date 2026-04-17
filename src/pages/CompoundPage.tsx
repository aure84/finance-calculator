import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import CompoundCalc from '../calculators/compound/CompoundCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const COMPOUND_RELATED = [
  { label: 'Salary Calculator', to: '/salary', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
]

const COMPOUND_FAQ = [
  {
    q: 'What is compound interest?',
    a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from prior periods. Unlike simple interest, it causes investments to grow exponentially over time.',
  },
  {
    q: 'What is the difference between compounding frequencies?',
    a: 'More frequent compounding results in slightly higher returns. Daily compounding earns marginally more than annual compounding at the same interest rate, because interest is added to principal more often.',
  },
  {
    q: 'What is the Rule of 72?',
    a: 'Divide 72 by your annual interest rate to estimate how many years it takes to double your investment. For example, at 8% annual return your money doubles in about 9 years (72 ÷ 8 = 9).',
  },
  {
    q: 'Does this calculator account for inflation?',
    a: 'No. The results shown are nominal (not inflation-adjusted). To estimate real returns, subtract the expected inflation rate from your annual interest rate before calculating.',
  },
]

export default function CompoundPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Compound Interest Calculator — See Your Investment Grow | finance-fast.com"
        description="Calculate compound interest with annual, quarterly, monthly, or daily compounding. Free compound interest calculator with year-by-year breakdown."
      />
      <FAQSchema items={COMPOUND_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Compound Interest Calculator
      </div>
      <h1 className={styles.title}>Compound Interest Calculator</h1>
      <p className={styles.subtitle}>
        See how your investment grows over time with compound interest. Compare annual, quarterly, monthly, and daily compounding.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <CompoundCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Hypothetical results only. Does not account for taxes on gains, inflation, or fund fees. Not a guarantee of future investment returns.
      </div>
      <RelatedCalculators links={COMPOUND_RELATED} />
    </main>
  )
}
