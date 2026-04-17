import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import SalaryCalc from '../calculators/salary/SalaryCalc'
import styles from './calculator.module.css'

export default function SalaryPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Salary Calculator — Take-Home Pay After Tax | finance-fast.com"
        description="Calculate your net take-home pay after federal income tax and FICA deductions. Free salary calculator based on 2026 US tax brackets."
      />
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
    </main>
  )
}
