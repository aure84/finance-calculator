import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import RetirementCalc from '../calculators/retirement/RetirementCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const RETIREMENT_RELATED = [
  { label: 'Compound Interest Calculator', to: '/compound-interest-calculator', description: 'See how your savings grow over time with compound interest.' },
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
]

const RETIREMENT_FAQ = [
  {
    q: 'What is a realistic annual return rate?',
    a: 'The S&P 500 has historically returned around 10% annually before inflation. Some planners use 6–7% as a conservative long-term estimate — your actual returns will vary based on your investments and market conditions.',
  },
  {
    q: 'How much should I save per month?',
    a: 'A common guideline is to save 15% of your gross income for retirement, including any employer match.',
  },
  {
    q: 'What is compound growth?',
    a: 'Compound growth means your returns earn returns. The longer your money is invested, the more powerful this effect becomes — even small monthly contributions add up significantly over decades.',
  },
  {
    q: 'Does this calculator include state income tax?',
    a: 'Yes — select your state from the optional dropdown to estimate state income tax on your projected balance at withdrawal. The estimate assumes a full lump-sum withdrawal, which is an approximation; your actual tax will depend on how and when you withdraw. Eight states have no income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, and Wyoming.',
  },
]

export default function RetirementPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Retirement Calculator — How Much Will I Have Saved?"
        description="Project your retirement balance based on current savings, monthly contributions, and expected return rate. Free retirement savings calculator with state tax estimate."
      />
      <FAQSchema items={RETIREMENT_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Retirement Calculator
      </div>
      <h1 className={styles.title}>How Much Will I Have Saved by Retirement?</h1>
      <p className={styles.subtitle}>
        Enter your current savings, monthly contribution, expected return, and years to retirement — see your projected balance and the power of starting early.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <RetirementCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Why starting early makes such a big difference</h2>
        <p className={styles.sectionText}>
          Retirement savings grow through compound interest — your returns earn returns. The earlier you start, the more time each dollar has to compound. Ten extra years of growth can double your final balance even if you never increase your contributions.
        </p>
        <p className={styles.sectionText}>
          Employer match is essentially a 100% return on the matched amount from day one. Always contribute at least enough to capture the full match before investing elsewhere.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example retirement projections at 7% annual return</h2>
        <p className={styles.sectionText}>Monthly compounding. No starting balance.</p>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Start at 25</div>
            <div className={styles.exampleScenario}>$300/mo · 7% · 40 years</div>
            <div className={styles.exampleValue}>$787,000</div>
            <div className={styles.exampleSub}>Total contributed: $144,000</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Start at 30</div>
            <div className={styles.exampleScenario}>$500/mo · 7% · 35 years</div>
            <div className={styles.exampleValue}>$900,000</div>
            <div className={styles.exampleSub}>Total contributed: $210,000</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Start at 35</div>
            <div className={styles.exampleScenario}>$1,000/mo · 7% · 30 years</div>
            <div className={styles.exampleValue}>$1,220,000</div>
            <div className={styles.exampleSub}>Total contributed: $360,000</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {RETIREMENT_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> For illustrative purposes only. Does not account for inflation, Social Security, or investment fees. State tax estimate assumes full lump-sum withdrawal (approximation — actual tax depends on withdrawal strategy and state rules). Past market returns do not guarantee future results.
      </div>
      <RelatedCalculators links={RETIREMENT_RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'How Much Should You Save for Retirement?', to: '/blog/how-much-to-save-for-retirement', description: 'The 4% rule, savings rate benchmarks, and age-based milestones.' },
        { label: 'What Is a 401(k)?', to: '/blog/what-is-401k', description: 'How 401(k) contributions, employer matching, and Roth vs traditional work.' },
        { label: 'What Is Compound Interest?', to: '/blog/what-is-compound-interest', description: 'Why starting early makes such a dramatic difference to retirement savings.' },
      ]} />
    </main>
  )
}
