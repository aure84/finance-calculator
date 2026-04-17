import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import DebtPayoffCalc from '../calculators/debt-payoff/DebtPayoffCalc'
import styles from './calculator.module.css'

export default function DebtPayoffPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Debt Payoff Calculator — Snowball vs Avalanche | finance-fast.com"
        description="Compare snowball vs avalanche debt payoff strategies. See which method saves you more interest and pays off debt faster. Free debt payoff calculator."
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Debt Payoff Calculator
      </div>
      <h1 className={styles.title}>Debt Payoff Calculator — Snowball vs Avalanche</h1>
      <p className={styles.subtitle}>
        Compare two debt payoff strategies: snowball (smallest balance first) vs avalanche (highest interest first). See which saves you more money.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <DebtPayoffCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Assumes no new charges are added. Minimum payment assumptions may differ from your lender's actual terms. Consult a financial advisor for personalized debt management advice.
      </div>
    </main>
  )
}
