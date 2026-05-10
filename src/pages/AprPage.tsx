import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import AprCalc from '../calculators/apr/AprCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const RELATED = [
  { label: 'Loan Calculator', to: '/loan-calculator', description: 'Calculate monthly payments for any loan type.' },
  { label: 'Mortgage Calculator', to: '/mortgage-calculator', description: 'Monthly payments and amortization schedule.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff-calculator', description: 'Snowball vs avalanche comparison.' },
  { label: 'Credit Card Payoff Calculator', to: '/credit-card-payoff-calculator', description: 'Once you know your APR, see how long payoff takes at any monthly payment.' },
]

const FAQ = [
  {
    q: 'What is APR?',
    a: 'APR stands for Annual Percentage Rate. It is the true annual cost of a loan, expressed as a percentage, including both the interest rate and any mandatory upfront fees. APR gives you a single number to compare different loan offers.',
  },
  {
    q: 'What is the difference between APR and interest rate?',
    a: 'The interest rate is the cost of borrowing the principal. APR is the interest rate plus fees, annualized. A loan advertised at 5% interest with a $500 origination fee on a $10,000 loan will have an APR higher than 5% — the exact amount depends on the loan term.',
  },
  {
    q: 'Why is APR always higher than the interest rate?',
    a: 'Because APR includes fees that the interest rate does not. The only time APR equals the interest rate is when there are zero fees. The longer the loan term, the smaller the effect of upfront fees on the APR.',
  },
  {
    q: 'How do I use APR to compare loans?',
    a: 'Compare the APR of two loans with the same term. A lower APR means less total cost. For loans with different terms, use the total cost (monthly payment × months + fees) for a fair comparison, because a shorter loan with a higher APR may still be cheaper overall.',
  },
  {
    q: 'What fees are included in APR?',
    a: 'APR typically includes origination fees, broker fees, and certain closing costs. It does NOT include optional fees (like late payment fees), insurance, or taxes. Always check the loan disclosure for the full fee list.',
  },
]

export default function AprPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="APR Calculator — Finance Fast"
        description="Calculate the true APR of any loan. Enter the loan amount, interest rate, term, and fees to find the Annual Percentage Rate and compare loan offers accurately."
      />
      <FAQSchema items={FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › APR Calculator
      </div>
      <h1 className={styles.title}>APR Calculator</h1>
      <p className={styles.subtitle}>
        Enter your loan details and upfront fees to calculate the true Annual Percentage Rate. APR is the single best number for comparing loan offers side by side.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <AprCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Why APR matters more than interest rate</h2>
        <p className={styles.sectionText}>
          Two loans can have the same interest rate but very different costs. A loan with a 5% rate and a $1,000 origination fee is more expensive than one with a 5.3% rate and no fees — if the term is short enough. APR accounts for both, giving you one number to compare.
        </p>
        <p className={styles.sectionText}>
          The APR calculation finds the rate at which the present value of all your payments equals the amount you actually receive (loan amount minus upfront fees). This is why APR is always higher than the nominal rate when fees exist.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Examples</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>No fees</div>
            <div className={styles.exampleScenario}>$10,000 · 5% · 60 months · $0 fees</div>
            <div className={styles.exampleValue}>5.000%<span style={{ fontSize: 14, fontWeight: 400 }}> APR</span></div>
            <div className={styles.exampleSub}>APR = nominal rate</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>With fees</div>
            <div className={styles.exampleScenario}>$10,000 · 5% · 60 months · $300 fees</div>
            <div className={styles.exampleValue}>5.671%<span style={{ fontSize: 14, fontWeight: 400 }}> APR</span></div>
            <div className={styles.exampleSub}>fees add 0.67 points</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Short term amplifies fees</div>
            <div className={styles.exampleScenario}>$10,000 · 5% · 12 months · $300 fees</div>
            <div className={styles.exampleValue}>8.48%<span style={{ fontSize: 14, fontWeight: 400 }}> APR</span></div>
            <div className={styles.exampleSub}>same fees, bigger impact</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> For informational purposes only. APR calculations are estimates based on the values you enter. Actual APR may vary depending on your lender's fee structure and local regulations. Always review the full loan disclosure before signing.
      </div>
      <RelatedCalculators links={RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'What Is APR and How Does It Affect Your Loan?', to: '/blog/what-is-apr', description: 'How APR differs from interest rate and how to compare loan offers.' },
        { label: 'How Is a Loan Payment Calculated?', to: '/blog/how-loan-payment-is-calculated', description: 'The math behind monthly payments and amortization.' },
      ]} />
    </main>
  )
}
