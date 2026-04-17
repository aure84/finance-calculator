import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import DebtPayoffCalc from '../calculators/debt-payoff/DebtPayoffCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const DEBT_RELATED = [
  { label: 'Loan Calculator', to: '/loan-calculator', description: 'Calculate monthly payments for any personal, auto, or student loan.' },
  { label: 'Mortgage Calculator', to: '/mortgage-calculator', description: 'Calculate your monthly mortgage payment and amortization schedule.' },
]

const DEBT_FAQ = [
  {
    q: 'What is the debt snowball method?',
    a: 'The snowball method pays off debts from smallest balance to largest, regardless of interest rate. After paying off the smallest debt, you roll that payment into the next. It provides quick psychological wins.',
  },
  {
    q: 'What is the debt avalanche method?',
    a: 'The avalanche method pays off debts from highest interest rate to lowest. It minimizes the total interest you pay over time and is the mathematically optimal strategy for saving money.',
  },
  {
    q: 'Which debt payoff method saves more money?',
    a: 'The avalanche method always saves more in total interest paid. The snowball method may be better if you need motivational wins to stay on track, since eliminating accounts quickly provides momentum.',
  },
  {
    q: 'What is the "extra monthly payment" field?',
    a: 'This is any amount you can pay above your combined minimum payments each month. The calculator applies it to your target debt (smallest balance for snowball, highest rate for avalanche), accelerating payoff significantly.',
  },
]

export default function DebtPayoffPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Debt Payoff Calculator — Snowball vs Avalanche | finance-fast.com"
        description="Compare snowball vs avalanche debt payoff strategies. See which method saves you more interest and pays off debt faster. Free debt payoff calculator."
      />
      <FAQSchema items={DEBT_FAQ} />
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
      <RelatedCalculators links={DEBT_RELATED} />
    </main>
  )
}
