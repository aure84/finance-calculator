import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import TaxRefundCalc from '../calculators/tax-refund/TaxRefundCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const TAX_RELATED = [
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
  { label: 'Loan Calculator', to: '/loan-calculator', description: 'Calculate monthly payments for any personal, auto, or student loan.' },
]

const TAX_FAQ = [
  {
    q: 'How is my federal tax calculated?',
    a: 'The US uses a progressive bracket system — each portion of your income is taxed at the corresponding marginal rate, not your entire income at the top rate.',
  },
  {
    q: 'What is the standard deduction for 2025?',
    a: 'For 2025: $15,000 (Single or Married Filing Separately), $30,000 (Married Filing Jointly), and $22,500 (Head of Household). This amount is subtracted from your gross income before tax is calculated.',
  },
  {
    q: "When will I get my refund?",
    a: "The IRS issues most refunds within 21 days of e-filing. Paper returns take 4–8 weeks. You can check your status at IRS.gov using the \"Where's My Refund?\" tool.",
  },
]

export default function TaxRefundPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Tax Refund Calculator 2025 — Federal Refund Estimator | finance-fast.com"
        description="Estimate your 2025 federal tax refund or amount owed. Enter your income, filing status, and withholding for an instant estimate."
      />
      <FAQSchema items={TAX_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Tax Refund Calculator
      </div>
      <h1 className={styles.title}>Tax Refund Calculator 2025</h1>
      <p className={styles.subtitle}>
        Estimate your federal tax refund or amount owed based on your income, filing status, and withholding.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <TaxRefundCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates based on 2025 federal standard deductions and tax brackets only. Does not include state taxes, AMT, credits, or itemized deductions. Consult a tax professional for accurate filing.
      </div>
      <RelatedCalculators links={TAX_RELATED} />
    </main>
  )
}
