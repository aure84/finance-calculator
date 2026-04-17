import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import SalaryCalc from '../calculators/salary/SalaryCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const SALARY_RELATED = [
  { label: 'Compound Interest Calculator', to: '/compound-interest-calculator', description: 'See how your savings grow over time with compound interest.' },
]

const SALARY_FAQ = [
  {
    q: 'How do I calculate my take-home pay?',
    a: 'Subtract federal income tax and FICA (Social Security 6.2% + Medicare 1.45%) from your gross salary. This calculator uses 2026 federal tax brackets with a $15,000 standard deduction for single filers.',
  },
  {
    q: 'What is FICA?',
    a: 'FICA stands for Federal Insurance Contributions Act. It includes Social Security tax (6.2% on income up to $176,100) and Medicare tax (1.45% on all income), totaling 7.65% for most employees.',
  },
  {
    q: 'Does this calculator include state taxes?',
    a: 'No. This calculator covers federal income tax and FICA only. State income tax rates vary widely by state and are not included in these estimates.',
  },
  {
    q: 'What are the 2026 federal tax brackets for single filers?',
    a: '10% on income up to $11,925; 12% up to $48,475; 22% up to $103,350; 24% up to $197,300; 32% up to $250,525; 35% up to $626,350; 37% on income over $626,350.',
  },
]

export default function SalaryPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Salary Calculator — Take-Home Pay After Tax | finance-fast.com"
        description="Calculate your net take-home pay after federal income tax and FICA deductions. Free salary calculator based on 2026 US tax brackets."
      />
      <FAQSchema items={SALARY_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Salary Calculator
      </div>
      <h1 className={styles.title}>Salary Calculator — Take-Home Pay After Tax</h1>
      <p className={styles.subtitle}>
        Calculate your net take-home pay after federal income tax and FICA deductions. Based on 2026 tax brackets.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <SalaryCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only. Results are not tax or financial advice. Figures are based on 2026 federal tax brackets and do not include state or local taxes. Consult a CPA for personalized advice.
      </div>
      <RelatedCalculators links={SALARY_RELATED} />
    </main>
  )
}
