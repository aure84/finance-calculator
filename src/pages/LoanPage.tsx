import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import LoanCalc from '../calculators/loan/LoanCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const LOAN_RELATED = [
  { label: 'Mortgage Calculator', to: '/mortgage-calculator', description: 'Calculate your monthly mortgage payment and amortization schedule.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff-calculator', description: 'Compare snowball vs avalanche debt payoff strategies.' },
]

const LOAN_FAQ = [
  {
    q: 'How is a monthly loan payment calculated?',
    a: 'Using the amortization formula: M = P[r(1+r)^n]/[(1+r)^n−1], where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments.',
  },
  {
    q: 'What types of loans can I calculate?',
    a: 'This calculator works for any fixed-rate installment loan: personal loans, auto loans, student loans, home equity loans, and more. Enter the loan amount, interest rate, and term.',
  },
  {
    q: 'What is APR?',
    a: 'APR (Annual Percentage Rate) is the yearly cost of borrowing. This calculator uses the interest rate directly. Your actual APR may be higher if the lender charges origination fees or other costs.',
  },
  {
    q: 'How can I pay off my loan faster?',
    a: 'Making extra payments toward the principal reduces your balance faster and saves interest. Even an extra $50–$100 per month can shorten a 5-year loan by several months and save hundreds in interest.',
  },
]

export default function LoanPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Loan Calculator — Monthly Payment & Total Cost | finance-fast.com"
        description="Calculate monthly loan payments and total interest for any personal, auto, or student loan. Free loan calculator with instant results."
      />
      <FAQSchema items={LOAN_FAQ} />
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
      <RelatedCalculators links={LOAN_RELATED} />
    </main>
  )
}
