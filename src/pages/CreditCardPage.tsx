import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import WebApplicationSchema from '../components/WebApplicationSchema'
import CreditCardCalc from '../calculators/credit-card/CreditCardCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const CC_RELATED = [
  {
    label: 'Debt Payoff Calculator',
    to: '/debt-payoff-calculator',
    description: 'Compare snowball vs avalanche strategies for paying off multiple debts.',
  },
  {
    label: 'APR Calculator',
    to: '/apr-calculator',
    description: 'Find the true annual cost of any loan including fees.',
  },
  {
    label: 'Loan Calculator',
    to: '/loan-calculator',
    description: 'Calculate monthly payments for any personal, auto, or student loan.',
  },
]

const CC_FAQ = [
  {
    q: 'What is the minimum payment on a credit card?',
    a: 'Most credit card issuers set the minimum at either a flat amount (often $25–$35) or a percentage of the balance (typically 1–3%), whichever is greater. This calculator uses max($25, 2% of balance) as an approximation.',
  },
  {
    q: 'How is credit card interest calculated?',
    a: 'Interest accrues daily. Your APR is divided by 365 to get a daily rate, which is multiplied by your average daily balance. For monthly estimates, dividing the APR by 12 gives a close approximation.',
  },
  {
    q: 'Should I pay more than the minimum?',
    a: 'Yes — paying only the minimum dramatically increases the time and total interest you pay. Even an extra $50 per month can cut your payoff time by months and save hundreds in interest. Use the comparison row above to see the difference.',
  },
]

export default function CreditCardPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Credit Card Payoff Calculator — How Long to Pay Off?"
        description="See how long it takes to pay off your credit card and how much interest you'll pay. Enter balance, APR, and monthly payment."
      />
      <FAQSchema items={CC_FAQ} />
      <WebApplicationSchema
        name="Free Credit Card Payoff Calculator"
        description="Calculate how long it will take to pay off your credit card debt and how much interest you will pay."
        url="https://finance-fast.com/credit-card-payoff-calculator"
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Credit Card Payoff Calculator
      </div>
      <h1 className={styles.title}>Credit Card Payoff Calculator</h1>
      <p className={styles.subtitle}>
        Enter your balance, APR, and monthly payment to see how long payoff takes and how much
        interest you&apos;ll pay — plus a comparison to paying the minimum.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <CreditCardCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How credit card interest works</h2>
        <p className={styles.sectionText}>
          Credit card interest compounds daily. Your APR is divided by 365 to produce a daily
          periodic rate, which is applied to your average daily balance each day. At the end of
          the billing cycle, all that accrued interest is added to your balance.
        </p>
        <p className={styles.sectionText}>
          This is why paying only the minimum is costly: most of your minimum payment goes toward
          interest, barely touching the principal. On a $3,500 balance at 22% APR, paying $100 per
          month takes over 4 years and costs around $1,600 in interest. Bumping that to $200 per
          month cuts it to under 2 years and saves roughly $1,000.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {CC_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates only. Assumes a fixed APR and fixed monthly payment
        for the life of the debt. Actual results depend on your card&apos;s specific terms. Not
        financial advice.
      </div>
      <RelatedCalculators links={CC_RELATED} />
      <RelatedCalculators
        title="Related Guides"
        links={[
          {
            label: 'Debt Snowball vs Avalanche',
            to: '/blog/snowball-vs-avalanche',
            description: 'Which strategy pays off debt faster? We compare the math.',
          },
          {
            label: 'What Is Debt-to-Income Ratio?',
            to: '/blog/debt-to-income-ratio',
            description: 'How lenders evaluate your ability to repay.',
          },
        ]}
      />
    </main>
  )
}
