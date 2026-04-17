import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import LoanCalc from '../calculators/loan/LoanCalc'
import styles from './calculator.module.css'

export default function LoanPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Loan Calculator — Monthly Payment & Total Cost | finance-fast.com"
        description="Calculate monthly loan payments and total interest for any personal, auto, or student loan. Free loan calculator with instant results."
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Loan Calculator
      </div>
      <h1 className={styles.title}>Loan Calculator</h1>
      <p className={styles.subtitle}>
        Calculate monthly payments, total interest, and total cost for any personal, auto, or student loan.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <LoanCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates only. Does not include origination fees or prepayment penalties. Rates you qualify for may differ from illustrative rates shown. Not a loan offer.
      </div>
    </main>
  )
}
