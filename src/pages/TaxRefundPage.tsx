import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import FormulaBox from '../components/FormulaBox'
import TaxRefundCalc from '../calculators/tax-refund/TaxRefundCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const TAX_RELATED = [
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your net take-home pay after federal income tax and FICA.' },
  { label: 'Loan Calculator', to: '/loan-calculator', description: 'Calculate monthly payments for any personal, auto, or student loan.' },
]

const TAX_FAQ = [
  {
    q: 'How is my federal tax calculated?',
    a: 'The US uses a progressive bracket system — each portion of your income is taxed at the corresponding marginal rate, not your entire income at the top rate.',
  },
  {
    q: 'What is the standard deduction for 2026?',
    a: 'For 2026: $15,000 (Single or Married Filing Separately), $30,000 (Married Filing Jointly), and $22,500 (Head of Household). This amount is subtracted from your gross income before tax is calculated.',
  },
  {
    q: 'Which states have no income tax?',
    a: 'Eight states have no individual income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, and Wyoming. New Hampshire taxes only dividend and interest income, not wages.',
  },
  {
    q: 'How accurate is the state tax estimate?',
    a: 'The state estimate applies state brackets to your federal taxable income (gross income minus federal standard deduction). Most states have their own deductions and credits, so the actual liability may differ — treat this as a planning estimate, not a filing number.',
  },
  {
    q: 'When will I get my refund?',
    a: 'The IRS issues most refunds within 21 days of e-filing. Paper returns take 4–8 weeks. You can check your status at IRS.gov using the "Where\'s My Refund?" tool.',
  },
]

// TODO: update for next tax year
const KEY_FACTS = [
  { value: '~$3,100', label: 'avg. federal refund', sub: 'IRS, tax year 2024' },
  { value: 'Apr 15, 2026', label: 'federal filing deadline', sub: 'extensions may apply — verify at IRS.gov' },
  { value: '~21 days', label: 'e-file turnaround', sub: 'no flags or holds on return' },
]

export default function TaxRefundPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Tax Refund Calculator 2026 — How Much Will I Get Back?"
        description="Estimate your 2026 federal and state tax refund or amount owed. Enter your income, filing status, and withholding. Free, no sign-up required."
      />
      <FAQSchema items={TAX_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Tax Refund Calculator
      </div>
      <h1 className={styles.title}>How Much of a Tax Refund Will I Get?</h1>
      <p className={styles.subtitle}>
        Enter your income, filing status, and how much tax was withheld from your paychecks — see your estimated 2026 federal refund or amount owed. Add your state for a combined estimate.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1.5rem 0' }}>
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
        <TaxRefundCalc />
      </div>
      <AdSlot slot="content" />
      <FormulaBox
        formula="Refund = Tax withheld − Tax owed"
        note="If the result is negative, you owe the difference to the IRS. You may also owe an underpayment penalty — the IRS generally waives this if you owe less than $1,000, but rules vary based on your income and prior-year tax. See IRS Form 2210 or consult a tax professional."
      />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How your tax refund is calculated</h2>
        <p className={styles.sectionText}>
          A refund means your employer withheld more tax than you owe. Your actual tax liability is calculated from your taxable income (gross income minus the standard deduction) using progressive federal brackets. If withholding exceeds that amount, the IRS returns the difference.
        </p>
        <p className={styles.sectionText}>
          If you owe instead of receiving a refund, it means your withholding was too low — common when someone has multiple jobs, freelance income, or changed filing status during the year.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example refund estimates (single filer, 2026)</h2>
        <p className={styles.sectionText}>Federal only. Actual results depend on your exact withholding and deductions.</p>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>$45,000 income</div>
            <div className={styles.exampleScenario}>Tax owed: ~$3,362 · Withheld: $5,000</div>
            <div className={styles.exampleValue} style={{ color: 'var(--green)', fontSize: '1.75rem', fontWeight: 700 }}>+$1,638</div>
            <div className={styles.exampleSub}>estimated refund</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>$60,000 income</div>
            <div className={styles.exampleScenario}>Tax owed: ~$5,162 · Withheld: $8,000</div>
            <div className={styles.exampleValue} style={{ color: 'var(--green)', fontSize: '1.75rem', fontWeight: 700 }}>+$2,838</div>
            <div className={styles.exampleSub}>estimated refund</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>$80,000 income</div>
            <div className={styles.exampleScenario}>Tax owed: ~$9,214 · Withheld: $11,000</div>
            <div className={styles.exampleValue} style={{ color: 'var(--green)', fontSize: '1.75rem', fontWeight: 700 }}>+$1,786</div>
            <div className={styles.exampleSub}>estimated refund</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {TAX_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Estimates based on 2026 federal standard deductions and tax brackets. State tax applies state rates to federal taxable income — an approximation, as states have their own deductions and credits. Does not include local taxes, AMT, or itemized deductions. Consult a tax professional for accurate filing.
      </div>
      <RelatedCalculators links={TAX_RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'How Is a Tax Refund Calculated?', to: '/blog/how-tax-refund-is-calculated', description: 'How withholding works and why a big refund is not necessarily good news.' },
        { label: 'How Is Net Salary Calculated?', to: '/blog/how-net-salary-is-calculated', description: 'Which deductions reduce your gross pay and by how much.' },
        { label: 'What Is VAT?', to: '/blog/what-is-vat', description: 'How Value Added Tax works and how to calculate prices with and without it.' },
      ]} />
    </main>
  )
}
