import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import CompoundCalc from '../calculators/compound/CompoundCalc'
import styles from './calculator.module.css'

export default function CompoundPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Compound Interest Calculator — See Your Investment Grow | finance-fast.com"
        description="Calculate compound interest with annual, quarterly, monthly, or daily compounding. Free compound interest calculator with year-by-year breakdown."
      />
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
    </main>
  )
}
