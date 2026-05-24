import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import WebApplicationSchema from '../components/WebApplicationSchema'
import InflationCalc from '../calculators/inflation/InflationCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const INFLATION_RELATED = [
  { label: 'Compound Interest Calculator', to: '/compound-interest-calculator', description: 'See how investments grow over time at a given rate.' },
  { label: 'Savings Goal Calculator', to: '/savings-goal-calculator', description: 'Find out how long to reach your savings target.' },
  { label: 'Retirement Calculator', to: '/retirement-calculator', description: 'Project your savings at retirement.' },
]

const INFLATION_FAQ = [
  {
    q: 'What is the average rate of inflation?',
    a: 'In the United States, the Federal Reserve targets 2% annual inflation. Actual rates have varied: inflation averaged around 2–3% through the 2010s, then spiked to over 9% in mid-2022 before returning to lower levels.',
  },
  {
    q: 'How does inflation reduce purchasing power?',
    a: 'At 3% annual inflation, prices roughly double every 24 years (using the Rule of 72). A basket of goods costing $100 today will cost about $134 in 10 years. Your money buys less each year unless it grows faster than inflation.',
  },
  {
    q: 'What is the difference between future value and historical equivalent?',
    a: "Future Value mode shows what today's money will be worth in N years at a given inflation rate — purchasing power erodes. Historical Equivalent mode shows what a past amount equals in today's money — useful for comparing salaries or prices across decades.",
  },
  {
    q: 'How can I protect my savings from inflation?',
    a: 'Common strategies include investing in equities or real estate (which historically outpace inflation), using inflation-linked bonds such as TIPS, keeping savings in high-yield accounts that match or exceed the inflation rate, and diversifying into foreign assets.',
  },
  {
    q: 'Why does the calculator use a manual rate instead of real CPI data?',
    a: 'CPI data is country-specific and updated monthly. A manual rate lets you model any scenario — past US inflation, current EU rates, or a worst-case rate for planning. Enter the current CPI rate for your country to get an accurate estimate.',
  },
]

export default function InflationPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Inflation Calculator — Finance Fast"
        description="Find out what your money is worth after inflation. Calculate future purchasing power or the historical equivalent of any amount. Free and instant."
      />
      <FAQSchema items={INFLATION_FAQ} />
      <WebApplicationSchema
        name="Free Inflation Calculator"
        description="Calculate the real value of money over time. See how inflation affects purchasing power using historical CPI data."
        url="https://finance-fast.com/inflation-calculator"
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Inflation Calculator
      </div>
      <h1 className={styles.title}>How Does Inflation Affect Your Money?</h1>
      <p className={styles.subtitle}>
        Enter an amount, an annual inflation rate, and a number of years. Switch between Future Value — what today's money buys later — and Historical Equivalent — what a past amount equals today.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <InflationCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How the calculator works</h2>
        <p className={styles.sectionText}>
          <strong>Future Value</strong> shows how much purchasing power erodes over time. The formula is: <em>adjusted = amount ÷ (1 + rate)^years</em>. At 3% annual inflation, $1,000 today buys only about $744 worth of goods in 10 years.
        </p>
        <p className={styles.sectionText}>
          <strong>Historical Equivalent</strong> shows what a past amount equals in today's money. The formula reverses: <em>adjusted = amount × (1 + rate)^years</em>. A salary of $50,000 from 20 years ago at 3% average inflation equals roughly $90,000 today.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Inflation examples</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Moderate inflation</div>
            <div className={styles.exampleScenario}>$10,000 · 3% · 10 years</div>
            <div className={styles.exampleValue}>$7,441<span style={{ fontSize: 14, fontWeight: 400 }}> future value</span></div>
            <div className={styles.exampleSub}>−25.6% purchasing power</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>High inflation</div>
            <div className={styles.exampleScenario}>$10,000 · 7% · 10 years</div>
            <div className={styles.exampleValue}>$5,083<span style={{ fontSize: 14, fontWeight: 400 }}> future value</span></div>
            <div className={styles.exampleSub}>−49.2% purchasing power</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Historical equivalent</div>
            <div className={styles.exampleScenario}>$50,000 · 3% · 20 years ago</div>
            <div className={styles.exampleValue}>$90,306<span style={{ fontSize: 14, fontWeight: 400 }}> today</span></div>
            <div className={styles.exampleSub}>+80.6% in nominal terms</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {INFLATION_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> For informational purposes only. This calculator uses a fixed annual rate and does not account for variable inflation, taxes, or investment returns. Consult a qualified financial adviser for personal planning.
      </div>
      <RelatedCalculators links={INFLATION_RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'What Is Inflation?', to: '/blog/what-is-inflation', description: 'How inflation is measured, what causes it, and how to protect your savings.' },
        { label: 'How Does Inflation Erode Your Savings?', to: '/blog/how-inflation-erodes-savings', description: 'Why cash loses value over time and what you can do about it.' },
        { label: 'What Is Compound Interest?', to: '/blog/what-is-compound-interest', description: 'How compounding works and why it matters for long-term investing.' },
      ]} />
    </main>
  )
}
