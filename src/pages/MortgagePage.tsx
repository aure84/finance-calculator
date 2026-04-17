import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import MortgageCalc from '../calculators/mortgage/MortgageCalc'
import styles from './calculator.module.css'

const MORTGAGE_FAQ = [
  {
    q: 'How is my monthly mortgage payment calculated?',
    a: 'Your payment uses the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n−1], where P is the loan amount, r is the monthly interest rate, and n is the number of monthly payments.',
  },
  {
    q: 'What is not included in this mortgage calculator?',
    a: "This calculator shows principal and interest only. It does not include property taxes, homeowner's insurance, PMI (private mortgage insurance), or HOA fees.",
  },
  {
    q: 'What is mortgage amortization?',
    a: 'Amortization is paying off a loan through regular scheduled payments. Early payments cover mostly interest; later payments cover mostly principal. The full schedule is shown in the amortization table.',
  },
  {
    q: 'How much house can I afford?',
    a: 'A common guideline is to keep total housing costs (principal, interest, taxes, and insurance) below 28% of your gross monthly income. Your total debt payments should stay below 36%.',
  },
]

export default function MortgagePage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Mortgage Calculator — Monthly Payment & Amortization | finance-fast.com"
        description="Calculate your monthly mortgage payment, total interest, and full amortization schedule. Free mortgage calculator for any home price and interest rate."
      />
      <FAQSchema items={MORTGAGE_FAQ} />
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
