import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import CompoundCalc from '../calculators/compound/CompoundCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const COMPOUND_RELATED = [
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
  { label: 'Retirement Calculator', to: '/retirement-calculator', description: 'Project your savings balance at retirement.' },
]

const COMPOUND_FAQ = [
  {
    q: 'What is compound interest?',
    a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from prior periods. Unlike simple interest, it causes investments to grow exponentially over time.',
  },
  {
    q: 'What is the difference between compounding frequencies?',
    a: 'More frequent compounding results in slightly higher returns. Daily compounding earns marginally more than annual compounding at the same interest rate, because interest is added to principal more often.',
  },
  {
    q: 'What is the Rule of 72?',
    a: 'Divide 72 by your annual interest rate to estimate how many years it takes to double your investment. For example, at 8% annual return your money doubles in about 9 years (72 ÷ 8 = 9).',
  },
  {
    q: 'Does this calculator account for inflation?',
    a: 'No. The results shown are nominal (not inflation-adjusted). To estimate real returns, subtract the expected inflation rate from your annual interest rate before calculating.',
  },
]

export default function CompoundPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Compound Interest Calculator — How Much Will My Investment Grow?"
        description="See how your investment grows over time with compound interest. Compare annual, quarterly, monthly, and daily compounding. Free calculator with year-by-year breakdown."
      />
      <FAQSchema items={COMPOUND_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Compound Interest Calculator
      </div>
      <h1 className={styles.title}>How Much Will My Investment Grow with Compound Interest?</h1>
      <p className={styles.subtitle}>
        Enter a starting amount, annual interest rate, and time horizon — see your final balance and a year-by-year growth breakdown. Compare compounding frequencies to see the difference.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <CompoundCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How compound interest works</h2>
        <p className={styles.sectionText}>
          With compound interest, your returns earn returns. Each period, the interest earned is added to your principal, and the next period's interest is calculated on the new, larger balance. The longer the time horizon, the more dramatic this effect becomes.
        </p>
        <p className={styles.sectionText}>
          Compounding frequency matters, but less than most people expect. The real driver of growth is time and rate — even a 1% higher annual return makes a large difference over 20–30 years.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example growth at 7% annual return (monthly compounding)</h2>
        <p className={styles.sectionText}>Starting with $10,000. No additional contributions.</p>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>10 years</div>
            <div className={styles.exampleScenario}>$10,000 · 7% · monthly</div>
            <div className={styles.exampleValue}>$20,097</div>
            <div className={styles.exampleSub}>Interest earned: $10,097</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>20 years</div>
            <div className={styles.exampleScenario}>$10,000 · 7% · monthly</div>
            <div className={styles.exampleValue}>$40,388</div>
            <div className={styles.exampleSub}>Interest earned: $30,388</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>15 years at 10%</div>
            <div className={styles.exampleScenario}>$10,000 · 10% · monthly</div>
            <div className={styles.exampleValue}>$44,539</div>
            <div className={styles.exampleSub}>Interest earned: $34,539</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {COMPOUND_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Hypothetical results only. Does not account for taxes on gains, inflation, or fund fees. Not a guarantee of future investment returns.
      </div>
      <RelatedCalculators links={COMPOUND_RELATED} />
    </main>
  )
}
