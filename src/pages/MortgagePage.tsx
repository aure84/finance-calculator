import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import MortgageCalc from '../calculators/mortgage/MortgageCalc'
import styles from './calculator.module.css'

export default function MortgagePage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Mortgage Calculator — Monthly Payment & Amortization | finance-fast.com"
        description="Calculate your monthly mortgage payment, total interest, and full amortization schedule. Free mortgage calculator for any home price and interest rate."
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Mortgage Calculator
      </div>
      <h1 className={styles.title}>Mortgage Calculator</h1>
      <p className={styles.subtitle}>
        Calculate your monthly mortgage payment, total interest, and see a full amortization schedule.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <MortgageCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates only. Does not include PMI, HOA fees, property taxes, or insurance. Not a loan offer or pre-approval. Consult a licensed mortgage professional before making decisions.
      </div>
    </main>
  )
}
