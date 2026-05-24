import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import WebApplicationSchema from '../components/WebApplicationSchema'
import FormulaBox from '../components/FormulaBox'
import BudgetCalc from '../calculators/budget/BudgetCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const RELATED = [
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
  { label: 'Savings Goal Calculator', to: '/savings-goal-calculator', description: 'See how long it takes to reach a savings goal at a given monthly contribution.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff-calculator', description: 'Calculate when you will be debt-free and how much interest you will save.' },
]

const BUDGET_FAQ = [
  {
    q: 'What is the 50/30/20 rule?',
    a: 'A budgeting framework popularized by Senator Elizabeth Warren: allocate 50% of after-tax income to needs, 30% to wants, and 20% to savings and debt repayment. It is a starting point, not a rigid formula — adjust percentages to fit your income and cost of living.',
  },
  {
    q: 'What counts as a need vs. a want?',
    a: 'Needs are expenses you must pay: rent or mortgage, groceries, utilities, insurance, transportation, and minimum debt payments. Wants are optional: dining out, entertainment, subscriptions, travel, and hobbies. The line between them is personal — a car may be a need in a rural area and a want in a city with good transit.',
  },
  {
    q: 'How do I calculate my monthly budget?',
    a: 'Take your after-tax (take-home) monthly income and multiply: by 0.50 for needs, by 0.30 for wants, and by 0.20 for savings and debt. Use the calculator above to adjust the percentages if the standard split does not fit your situation.',
  },
  {
    q: 'What if my needs exceed 50% of income?',
    a: 'This is common in high cost-of-living areas. Reduce the wants allocation first — for example, 60% needs / 20% wants / 20% savings. Try to keep savings above 10% as a minimum. If needs consistently exceed 70%, the solution is usually increasing income rather than cutting further.',
  },
  {
    q: 'Should I budget on gross or net income?',
    a: 'Always net (take-home) income. Taxes, Social Security, and Medicare are deducted before you receive your paycheck — you cannot spend them. Budgeting on gross income leads to overspending.',
  },
  {
    q: 'How do I handle irregular or freelance income?',
    a: 'Budget off your lowest income month from the past 12 months, not your average. In higher months, direct the surplus in order: top up your emergency fund, then pay down debt, then invest. Building a one-month income buffer in a separate account smooths out the variability.',
  },
  {
    q: 'Where does debt repayment fit in the budget?',
    a: 'Minimum payments are a need — they are not optional. Extra debt payments (above minimums) belong in the 20% savings and debt bucket. Once debt is paid off, redirect that amount to savings or investments.',
  },
  {
    q: 'How often should I review my budget?',
    a: 'Monthly. Compare planned vs. actual spending for each category at the end of the month. The first budget is rarely accurate — each monthly review makes the next month more predictable. Most people find 2–3 months of reviews enough to build a realistic baseline.',
  },
]

const KEY_FACTS = [
  { value: '~3.4%', label: 'avg. US personal savings rate', sub: 'BEA, Q1 2026' },
  { value: '3–6 months', label: 'recommended emergency fund', sub: 'expenses, not income' },
  { value: '20%', label: 'savings target', sub: '50/30/20 rule' },
]

const EXAMPLES = [
  { income: '$3,000/mo', needs: '$1,500', wants: '$900', savings: '$600' },
  { income: '$5,000/mo', needs: '$2,500', wants: '$1,500', savings: '$1,000' },
  { income: '$8,000/mo', needs: '$4,000', wants: '$2,400', savings: '$1,600' },
]

export default function BudgetPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="50/30/20 Budget Calculator — Monthly Budget Breakdown"
        description="Enter your monthly take-home income and see your 50/30/20 budget breakdown — how much to spend on needs, wants, and savings. Free, instant, no sign-up."
      />
      <FAQSchema items={BUDGET_FAQ} />
      <WebApplicationSchema
        name="Free Budget Calculator"
        description="Calculate your monthly budget using the 50/30/20 rule. Split income into needs, wants, and savings."
        url="https://finance-fast.com/budget-calculator"
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Budget Calculator
      </div>
      <h1 className={styles.title}>50/30/20 Budget Calculator</h1>
      <p className={styles.subtitle}>
        Enter your monthly take-home income to see your recommended budget split. Adjust the percentages if the standard 50/30/20 does not fit your situation.
      </p>
      <div className={styles.exampleGrid} style={{ margin: '1.5rem 0' }}>
        {KEY_FACTS.map(({ value, label, sub }) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)' }}>{value}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text)', marginTop: 4 }}>{label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <BudgetCalc />
      </div>
      <AdSlot slot="content" />
      <FormulaBox
        formula="Monthly Budget = 50% Needs + 30% Wants + 20% Savings"
        note="Adjust the percentages to fit your situation — if you live in an expensive city, needs may run 60% or more. The structure matters more than the exact split."
      />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>What each budget bucket means</h2>
        <p className={styles.sectionText}>
          <strong>Needs (50%)</strong> are expenses you must pay to maintain your baseline standard of living: rent or mortgage, groceries, utilities, insurance, transportation, and minimum debt payments. If you skip these, there are immediate consequences.
        </p>
        <p className={styles.sectionText}>
          <strong>Wants (30%)</strong> are optional expenses that improve your life but are not essential: dining out, entertainment, streaming subscriptions, travel, hobbies, and clothing beyond basics. These are the first to cut when money is tight.
        </p>
        <p className={styles.sectionText}>
          <strong>Savings &amp; Debt (20%)</strong> is what builds long-term financial health: emergency fund contributions, retirement savings (401(k), IRA), extra debt payments above the minimum, and investments. This is the bucket that creates options in your future.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example monthly budget breakdowns</h2>
        <p className={styles.sectionText}>Default 50/30/20 split. Adjust the percentages in the calculator above to match your situation.</p>
        <div className={styles.exampleGrid}>
          {EXAMPLES.map(({ income, needs, wants, savings }) => (
            <div key={income} className={styles.exampleCard}>
              <div className={styles.exampleLabel}>{income}</div>
              <div className={styles.exampleScenario}>Needs: {needs} · Wants: {wants}</div>
              <div className={styles.exampleValue} style={{ color: 'var(--green)', fontSize: '1.75rem', fontWeight: 700 }}>{savings}</div>
              <div className={styles.exampleSub}>to savings &amp; debt/mo</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {BUDGET_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates based on the 50/30/20 budgeting framework. Actual budget requirements vary by location, household size, and individual circumstances. Does not account for taxes, irregular income, or specific debt obligations. Consult a financial advisor for personalized guidance.
      </div>
      <RelatedCalculators links={RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'How to Create a Monthly Budget', to: '/blog/how-to-budget', description: 'Step-by-step guide to the 50/30/20 rule, zero-based budgeting, and common mistakes.' },
        { label: 'What Is Net Worth?', to: '/blog/what-is-net-worth', description: 'How to calculate your net worth and why it matters more than income.' },
      ]} />
    </main>
  )
}
