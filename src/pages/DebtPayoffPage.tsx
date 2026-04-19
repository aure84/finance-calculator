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
        title="Debt Payoff Calculator — Snowball vs Avalanche: Which Saves More?"
        description="Compare snowball vs avalanche debt payoff strategies. See which method pays off your debt faster and saves you the most interest. Free debt payoff calculator."
      />
      <FAQSchema items={DEBT_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Debt Payoff Calculator
      </div>
      <h1 className={styles.title}>Snowball vs Avalanche: Which Debt Payoff Method Should I Use?</h1>
      <p className={styles.subtitle}>
        Enter your debts and a monthly payment amount — compare how long each strategy takes and how much interest you'll save. Snowball targets smallest balances first; avalanche targets highest rates.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <DebtPayoffCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Snowball vs avalanche explained</h2>
        <p className={styles.sectionText}>
          Both strategies use the same total monthly payment. The difference is where the extra money goes. Snowball directs it to the smallest balance — you get the satisfaction of closing accounts quickly. Avalanche directs it to the highest interest rate — you pay less overall.
        </p>
        <p className={styles.sectionText}>
          For most people with credit card debt at 20%+, the avalanche method saves a meaningful amount. But if you've struggled to stay motivated before, the snowball's quick wins can be worth the extra interest cost.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example: 3 debts, $600/month total payment</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>The debts</div>
            <div className={styles.exampleScenario}>CC: $3,000 @ 22% · CC: $8,000 @ 18% · Auto: $12,000 @ 7%</div>
            <div className={styles.exampleValue} style={{ fontSize: 18 }}>$23,000 total</div>
            <div className={styles.exampleSub}>Min payments: ~$480/mo</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Snowball result</div>
            <div className={styles.exampleScenario}>Smallest balance first</div>
            <div className={styles.exampleValue} style={{ fontSize: 18 }}>~48 months</div>
            <div className={styles.exampleSub}>More total interest paid</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Avalanche result</div>
            <div className={styles.exampleScenario}>Highest rate first (22% CC)</div>
            <div className={styles.exampleValue} style={{ fontSize: 18 }}>~46 months</div>
            <div className={styles.exampleSub}>Less total interest paid</div>
          </div>
        </div>
        <p className={styles.sectionText} style={{ marginTop: 12, fontSize: 13 }}>
          Illustrative only. Exact results depend on your lender's minimum payment terms — use the calculator above for your specific debts.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {DEBT_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Assumes no new charges are added. Minimum payment assumptions may differ from your lender's actual terms. Consult a financial advisor for personalized debt management advice.
      </div>
      <RelatedCalculators links={DEBT_RELATED} />
    </main>
  )
}
