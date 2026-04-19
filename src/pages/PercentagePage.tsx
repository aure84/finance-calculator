import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import PercentageCalc from '../calculators/percentage/PercentageCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const RELATED = [
  { label: 'Inflation Calculator', to: '/inflation-calculator', description: 'See how inflation erodes purchasing power over time.' },
  { label: 'Loan Calculator', to: '/loan-calculator', description: 'Calculate monthly payments for any loan type.' },
  { label: 'Savings Goal Calculator', to: '/savings-goal-calculator', description: 'Find out how long to reach your savings target.' },
]

const FAQ = [
  {
    q: 'How do I calculate what percentage one number is of another?',
    a: 'Divide the part by the whole and multiply by 100. For example: 30 is what % of 200? → (30 ÷ 200) × 100 = 15%.',
  },
  {
    q: 'How do I find X% of a number?',
    a: 'Multiply the number by the percentage and divide by 100. For example: 15% of 200 → (15 ÷ 100) × 200 = 30.',
  },
  {
    q: 'How do I calculate percentage change?',
    a: 'Subtract the original value from the new value, divide by the original value, and multiply by 100. Example: from 100 to 150 → ((150 − 100) ÷ 100) × 100 = +50%.',
  },
  {
    q: 'What is the difference between percentage and percentage points?',
    a: 'A percentage point is an absolute difference between two percentages. If interest rates rise from 3% to 5%, that is a 2 percentage point increase — but a 66.7% relative increase. Always check which is meant when reading financial data.',
  },
  {
    q: 'How do I calculate a percentage increase in price?',
    a: 'Use the % change formula: ((new price − old price) ÷ old price) × 100. If a product goes from $80 to $100, the increase is ((100 − 80) ÷ 80) × 100 = 25%.',
  },
]

export default function PercentagePage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Percentage Calculator — Finance Fast"
        description="Calculate percentages instantly. Find X% of a number, what percentage one number is of another, or the percentage change between two values."
      />
      <FAQSchema items={FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Percentage Calculator
      </div>
      <h1 className={styles.title}>Percentage Calculator</h1>
      <p className={styles.subtitle}>
        Three calculators in one — find X% of a number, calculate what percentage one value is of another, or work out the percentage change between two numbers.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <PercentageCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How percentages work</h2>
        <p className={styles.sectionText}>
          A percentage is a number expressed as a fraction of 100. The word comes from the Latin <em>per centum</em> — "per hundred." Percentages appear in everyday finance: interest rates, tax rates, discounts, investment returns, and salary changes are all expressed as percentages.
        </p>
        <p className={styles.sectionText}>
          The three most common percentage questions each have a simple formula. This calculator handles all three so you never need to remember which to use.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Examples</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>X% of Y</div>
            <div className={styles.exampleScenario}>15% of $240</div>
            <div className={styles.exampleValue}>$36<span style={{ fontSize: 14, fontWeight: 400 }}> result</span></div>
            <div className={styles.exampleSub}>tip, discount, tax</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>X is what %</div>
            <div className={styles.exampleScenario}>45 out of 180</div>
            <div className={styles.exampleValue}>25%<span style={{ fontSize: 14, fontWeight: 400 }}> of total</span></div>
            <div className={styles.exampleSub}>score, share, ratio</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>% Change</div>
            <div className={styles.exampleScenario}>$80,000 → $95,000 salary</div>
            <div className={styles.exampleValue}>+18.75%<span style={{ fontSize: 14, fontWeight: 400 }}> increase</span></div>
            <div className={styles.exampleSub}>raise, price change, growth</div>
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
        <strong>Disclaimer:</strong> For informational purposes only. Results are mathematical calculations based on the values you enter.
      </div>
      <RelatedCalculators links={RELATED} />
    </main>
  )
}
