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
    a: 'The S&P 500 has historically returned around 10% annually before inflation. A conservative estimate of 6–7% accounts for inflation and diversification.',
  },
  {
    q: 'How much should I save per month?',
    a: 'A common guideline is to save 15% of your gross income for retirement, including any employer match.',
  },
  {
    q: 'What is compound growth?',
    a: 'Compound growth means your returns earn returns. The longer your money is invested, the more powerful this effect becomes — even small monthly contributions add up significantly over decades.',
  },
]

export default function RetirementPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Retirement Calculator — Project Your Savings | finance-fast.com"
        description="Calculate your projected retirement balance based on current savings, monthly contributions, and expected return. Free retirement savings calculator."
      />
      <FAQSchema items={RETIREMENT_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Retirement Calculator
      </div>
      <h1 className={styles.title}>Retirement Calculator</h1>
      <p className={styles.subtitle}>
        Project your retirement savings based on current balance, monthly contributions, and expected annual return.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <RetirementCalc />
      </div>
      <AdSlot slot="content" />
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> For illustrative purposes only. Does not account for inflation, taxes, Social Security, or investment fees. Past market returns do not guarantee future results.
      </div>
      <RelatedCalculators links={RETIREMENT_RELATED} />
    </main>
  )
}
