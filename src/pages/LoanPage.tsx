import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import WebApplicationSchema from '../components/WebApplicationSchema'
import LoanCalc from '../calculators/loan/LoanCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const LOAN_RELATED = [
  { label: 'Mortgage Calculator', to: '/mortgage-calculator', description: 'Calculate your monthly mortgage payment and amortization schedule.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff-calculator', description: 'Compare snowball vs avalanche debt payoff strategies.' },
  { label: 'Credit Card Payoff Calculator', to: '/credit-card-payoff-calculator', description: "See how long it takes to pay off revolving debt and how much interest you'll pay." },
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
        title="Loan Calculator — How Much Will My Monthly Payment Be?"
        description="Calculate monthly loan payments and total interest for any personal, auto, or student loan. Free loan calculator with instant results."
      />
      <FAQSchema items={LOAN_FAQ} />
      <WebApplicationSchema
        name="Free Loan Calculator"
        description="Calculate monthly loan payments, total interest, and payoff schedule. Free online loan payment calculator."
        url="https://finance-fast.com/loan-calculator"
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Loan Calculator
      </div>
      <h1 className={styles.title}>How Much Will My Monthly Loan Payment Be?</h1>
      <p className={styles.subtitle}>
        Enter your loan amount, interest rate, and term to see your monthly payment and total interest. Works for personal loans, auto loans, student loans, and more.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <LoanCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How loan payments are calculated</h2>
        <p className={styles.sectionText}>
          Fixed-rate loans use an amortization formula that spreads your total repayment across equal monthly payments. Each payment covers the month's interest first, then reduces the remaining principal. Early payments are interest-heavy; later payments go mostly to principal.
        </p>
        <p className={styles.sectionText}>
          A shorter loan term means higher monthly payments but significantly less total interest. A longer term lowers your payment but increases the total cost of the loan.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example monthly payments</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Auto loan</div>
            <div className={styles.exampleScenario}>$15,000 · 6% · 5 years</div>
            <div className={styles.exampleValue}>$290<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
            <div className={styles.exampleSub}>Total interest: ~$2,396</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Personal loan</div>
            <div className={styles.exampleScenario}>$25,000 · 12% · 3 years</div>
            <div className={styles.exampleValue}>$830<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
            <div className={styles.exampleSub}>Total interest: ~$4,894</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Student loan</div>
            <div className={styles.exampleScenario}>$35,000 · 5.5% · 10 years</div>
            <div className={styles.exampleValue}>$380<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
            <div className={styles.exampleSub}>Total interest: ~$10,571</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {LOAN_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates only. Does not include origination fees or prepayment penalties. Rates you qualify for may differ from illustrative rates shown. Not a loan offer.
      </div>
      <RelatedCalculators links={LOAN_RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'How Is a Monthly Loan Payment Calculated?', to: '/blog/how-loan-payment-is-calculated', description: 'Step-by-step walkthrough of the amortization formula with examples.' },
        { label: 'What Is APR?', to: '/blog/what-is-apr', description: 'APR is the true cost of borrowing — learn how it differs from the interest rate.' },
        { label: 'What Is Debt-to-Income Ratio?', to: '/blog/debt-to-income-ratio', description: 'How lenders evaluate your ability to repay a loan.' },
      ]} />
    </main>
  )
}
