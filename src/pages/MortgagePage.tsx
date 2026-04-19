import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import MortgageCalc from '../calculators/mortgage/MortgageCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const MORTGAGE_RELATED = [
  { label: 'Loan Calculator', to: '/loan-calculator', description: 'Calculate monthly payments for any personal, auto, or student loan.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff-calculator', description: 'Compare snowball vs avalanche debt payoff strategies.' },
]

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
        title="Mortgage Calculator — How Much Will Your Monthly Payment Be?"
        description="Calculate your monthly mortgage payment, total interest paid, and full amortization schedule. Free mortgage calculator — enter any home price and interest rate."
      />
      <FAQSchema items={MORTGAGE_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Mortgage Calculator
      </div>
      <h1 className={styles.title}>How Much Will My Monthly Mortgage Payment Be?</h1>
      <p className={styles.subtitle}>
        Enter your loan amount, interest rate, and term — get your exact monthly payment and a full amortization schedule in seconds. Principal and interest only; see the disclaimer below for what's not included.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <MortgageCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How mortgage payments are calculated</h2>
        <p className={styles.sectionText}>
          Your monthly payment is determined by three factors: the loan amount (home price minus your down payment), the annual interest rate, and the loan term. The standard amortization formula spreads your total cost across equal monthly payments — each covering both interest and a portion of the principal.
        </p>
        <p className={styles.sectionText}>
          In the early years, most of each payment goes toward interest. As the balance decreases, more goes to principal. The amortization table above shows the exact breakdown for every month of your loan.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example mortgage payments</h2>
        <p className={styles.sectionText}>These examples use principal and interest only at current typical US rates.</p>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Starter home</div>
            <div className={styles.exampleScenario}>$280,000 loan · 6.75% · 30 yr</div>
            <div className={styles.exampleValue}>$1,815<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
            <div className={styles.exampleSub}>Total interest: ~$373,000</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Mid-range home</div>
            <div className={styles.exampleScenario}>$450,000 loan · 6.5% · 30 yr</div>
            <div className={styles.exampleValue}>$2,844<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
            <div className={styles.exampleSub}>Total interest: ~$573,000</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>15-year payoff</div>
            <div className={styles.exampleScenario}>$200,000 loan · 6.75% · 15 yr</div>
            <div className={styles.exampleValue}>$1,767<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
            <div className={styles.exampleSub}>Total interest: ~$118,000</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {MORTGAGE_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates only. Does not include PMI, HOA fees, property taxes, or insurance. Not a loan offer or pre-approval. Consult a licensed mortgage professional before making decisions.
      </div>
      <RelatedCalculators links={MORTGAGE_RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'How Does a Mortgage Work?', to: '/blog/how-mortgage-works', description: 'A plain-English explanation of mortgage structure, amortization, and fixed vs variable rates.' },
        { label: 'What Is Amortization?', to: '/blog/what-is-amortization', description: 'Learn how each payment splits between interest and principal over the loan term.' },
        { label: 'How Much House Can I Afford?', to: '/blog/how-much-house-can-i-afford', description: 'Use the 28/36 rule to find your realistic home price range.' },
        { label: 'What Is APR?', to: '/blog/what-is-apr', description: 'APR is the true cost of borrowing — learn how it differs from the interest rate.' },
      ]} />
    </main>
  )
}
