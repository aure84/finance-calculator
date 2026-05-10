import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import InvestmentReturnCalc from '../calculators/investment-return/InvestmentReturnCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const INV_RELATED = [
  {
    label: 'Compound Interest Calculator',
    to: '/compound-interest-calculator',
    description: 'See how regular contributions grow with compound interest.',
  },
  {
    label: 'Savings Goal Calculator',
    to: '/savings-goal-calculator',
    description: 'Find out how long to reach your savings target.',
  },
  {
    label: 'Retirement Calculator',
    to: '/retirement-calculator',
    description: 'Project your savings at retirement age.',
  },
]

const INV_FAQ = [
  {
    q: 'What is CAGR?',
    a: 'CAGR stands for Compound Annual Growth Rate. It expresses how much an investment grows per year on average, assuming gains are reinvested. Formula: CAGR = (End Value / Start Value)^(1/Years) − 1.',
  },
  {
    q: 'What is a good annual investment return?',
    a: 'The S&P 500 has averaged roughly 10% per year before inflation (about 7% after inflation) over long periods. A 6–8% real return is a commonly used planning assumption. Returns vary significantly by asset class and time horizon.',
  },
  {
    q: 'How is compound growth calculated?',
    a: 'Compound growth applies the return to the full balance each period. Future Value = Start Value × (1 + Rate)^Years. After each year, gains are added to the principal and earn returns themselves — this is the compounding effect.',
  },
]

export default function InvestmentReturnPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Investment Return Calculator — CAGR & Future Value"
        description="Calculate CAGR from start and end values, or project future investment value with compound annual growth rate."
      />
      <FAQSchema items={INV_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Investment Return Calculator
      </div>
      <h1 className={styles.title}>Investment Return Calculator</h1>
      <p className={styles.subtitle}>
        Two modes: calculate CAGR from known start and end values, or project how an investment
        grows over time at a given annual return rate.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <InvestmentReturnCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>CAGR vs simple return</h2>
        <p className={styles.sectionText}>
          Simple return tells you total gain as a percentage. CAGR tells you the equivalent
          steady annual rate. An investment that doubles in 10 years has a 100% simple return
          but a CAGR of about 7.2% — because compounding means each year&apos;s gain builds on
          the previous year&apos;s gains.
        </p>
        <p className={styles.sectionText}>
          CAGR is the standard metric for comparing investments held over different time periods.
          A fund with a 5-year CAGR of 9% outperformed one with a 3-year CAGR of 7% — but only
          if the time periods align. Always compare CAGRs over the same horizon.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {INV_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Projections assume a constant annual return and reinvested
        gains. Actual investment returns fluctuate and past performance does not guarantee future
        results. Not financial advice.
      </div>
      <RelatedCalculators links={INV_RELATED} />
      <RelatedCalculators
        title="Related Guides"
        links={[
          {
            label: 'What Is Compound Interest?',
            to: '/blog/what-is-compound-interest',
            description: 'How compounding turns small gains into large ones over time.',
          },
          {
            label: 'How Much Should I Save for Retirement?',
            to: '/blog/how-much-to-save-for-retirement',
            description: 'Rule-of-thumb guidelines and personalized projections.',
          },
          {
            label: 'What Is Net Worth?',
            to: '/blog/what-is-net-worth',
            description: 'Assets minus liabilities — and how to grow it over time.',
          },
        ]}
      />
    </main>
  )
}
