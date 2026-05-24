import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import WebApplicationSchema from '../components/WebApplicationSchema'
import SalaryCalc from '../calculators/salary/SalaryCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const SALARY_RELATED = [
  { label: 'Compound Interest Calculator', to: '/compound-interest-calculator', description: 'See how your savings grow over time with compound interest.' },
  { label: 'Tax Refund Calculator', to: '/tax-refund-calculator', description: 'Estimate your federal tax refund or amount owed.' },
  { label: 'Budget Calculator', to: '/budget-calculator', description: 'Split your income with the 50/30/20 rule.' },
]

const SALARY_FAQ = [
  {
    q: 'How do I calculate my take-home pay?',
    a: 'Subtract federal income tax and FICA (Social Security 6.2% + Medicare 1.45%) from your gross salary. This calculator uses 2026 federal tax brackets with a $15,000 standard deduction for single filers.',
  },
  {
    q: 'What is FICA?',
    a: 'FICA stands for Federal Insurance Contributions Act. It includes Social Security tax (6.2% on income up to $176,100) and Medicare tax (1.45% on all income), totaling 7.65% for most employees.',
  },
  {
    q: 'Does this calculator include state taxes?',
    a: 'Yes — select your state from the optional dropdown to include state income tax. State tax is applied to the same taxable income as federal tax (an approximation, as states have their own deductions). Eight states have no income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, and Wyoming.',
  },
  {
    q: 'What are the 2026 federal tax brackets for single filers?',
    a: '10% on income up to $11,925; 12% up to $48,475; 22% up to $103,350; 24% up to $197,300; 32% up to $250,525; 35% up to $626,350; 37% on income over $626,350.',
  },
]

export default function SalaryPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Salary Calculator — How Much Is My Take-Home Pay After Tax?"
        description="Calculate your net take-home pay after federal income tax, FICA, and optional state tax. Based on 2026 US tax brackets. Free, no sign-up required."
      />
      <FAQSchema items={SALARY_FAQ} />
      <WebApplicationSchema
        name="Free Salary Calculator"
        description="Calculate your net take-home pay after federal income tax, FICA, and optional state tax. Based on 2026 US tax brackets."
        url="https://finance-fast.com/salary-calculator"
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Salary Calculator
      </div>
      <h1 className={styles.title}>Free Salary Calculator — Take-Home Pay After Tax</h1>
      <p className={styles.subtitle}>
        Enter your annual salary to see your exact net pay after federal income tax, Social Security, and Medicare. Add your state for a combined estimate.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <SalaryCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How take-home pay is calculated</h2>
        <p className={styles.sectionText}>
          Your net pay is your gross salary minus three deductions: federal income tax, Social Security (6.2%), and Medicare (1.45%). Federal tax uses a progressive bracket system — only the income within each bracket is taxed at that rate, not your entire salary.
        </p>
        <p className={styles.sectionText}>
          Before tax is applied, the standard deduction ($15,000 for single filers in 2026) is subtracted from your gross income. This reduces your taxable income and lowers your effective tax rate.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Example take-home pay (single filer, federal only)</h2>
        <p className={styles.sectionText}>Based on 2026 federal brackets and standard deduction. No state tax included.</p>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>$50,000 salary</div>
            <div className={styles.exampleScenario}>Federal tax: $3,962 · FICA: $3,825</div>
            <div className={styles.exampleValue}>$42,213<span style={{ fontSize: 14, fontWeight: 400 }}>/yr</span></div>
            <div className={styles.exampleSub}>Effective rate: 15.6%</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>$75,000 salary</div>
            <div className={styles.exampleScenario}>Federal tax: $8,114 · FICA: $5,738</div>
            <div className={styles.exampleValue}>$61,148<span style={{ fontSize: 14, fontWeight: 400 }}>/yr</span></div>
            <div className={styles.exampleSub}>Effective rate: 18.5%</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>$100,000 salary</div>
            <div className={styles.exampleScenario}>Federal tax: $13,614 · FICA: $7,650</div>
            <div className={styles.exampleValue}>$78,736<span style={{ fontSize: 14, fontWeight: 400 }}>/yr</span></div>
            <div className={styles.exampleSub}>Effective rate: 21.3%</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {SALARY_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only. Results are not tax or financial advice. Federal figures are based on 2026 tax brackets. State tax uses the same taxable income as federal (an approximation — states have their own deductions). Does not include local taxes. Consult a CPA for personalized advice.
      </div>
      <RelatedCalculators links={SALARY_RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'How Is Net Salary Calculated?', to: '/blog/how-net-salary-is-calculated', description: 'Which taxes and deductions reduce your gross pay and by how much.' },
        { label: 'How to Create a Monthly Budget', to: '/blog/how-to-budget', description: 'The 50/30/20 rule and step-by-step budgeting methods that actually work.' },
        { label: 'What Is Inflation?', to: '/blog/what-is-inflation', description: 'How inflation erodes purchasing power and what to do about it.' },
      ]} />
    </main>
  )
}
