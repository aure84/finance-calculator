import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import VatCalc from '../calculators/vat/VatCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const VAT_RELATED = [
  { label: 'Tax Refund Calculator', to: '/tax-refund-calculator', description: 'Estimate your federal income tax refund or amount owed.' },
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your take-home pay after taxes and deductions.' },
]

const VAT_FAQ = [
  {
    q: 'How do I add VAT to a price?',
    a: 'Multiply the net price by (1 + VAT rate). For example, £100 at 20% VAT: £100 × 1.20 = £120 gross price.',
  },
  {
    q: 'How do I remove VAT from a price?',
    a: 'Divide the gross price by (1 + VAT rate). For example, £120 at 20% VAT: £120 ÷ 1.20 = £100 net price.',
  },
  {
    q: 'What is the VAT rate in the UK?',
    a: 'The standard UK VAT rate is 20%. A reduced rate of 5% applies to some goods (energy, children\'s car seats). Zero-rated goods (food, books, children\'s clothing) carry 0% VAT.',
  },
  {
    q: 'What is the VAT rate in the EU?',
    a: 'EU VAT rates vary by country. Common standard rates: Germany 19%, France 20%, Hungary 27%, Sweden 25%, Netherlands 21%. Each country also has reduced rates for certain goods.',
  },
  {
    q: 'What is the difference between VAT and sales tax?',
    a: 'VAT is collected at every stage of production and remitted at each step. Sales tax is collected only at the final point of sale. The consumer pays roughly the same in both systems, but VAT is harder to evade because it is verified throughout the supply chain.',
  },
]

export default function VatPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="VAT Calculator — Add or Remove VAT Instantly | finance-fast.com"
        description="Add VAT to a net price or remove VAT from a gross price. Supports all standard VAT rates: 5%, 10%, 19%, 20%, 21%, 25%, 27%. Free and instant."
      />
      <FAQSchema items={VAT_FAQ} />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › VAT Calculator
      </div>
      <h1 className={styles.title}>VAT Calculator — Add or Remove VAT</h1>
      <p className={styles.subtitle}>
        Enter a price and VAT rate to calculate the net price, VAT amount, and gross price instantly. Switch between adding VAT to a net price or removing it from a gross price.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <VatCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>How VAT is calculated</h2>
        <p className={styles.sectionText}>
          VAT (Value Added Tax) is a consumption tax applied as a percentage of the price. To add VAT: multiply the net price by (1 + rate). To remove VAT from a gross price: divide by (1 + rate).
        </p>
        <p className={styles.sectionText}>
          The key is to divide by (1 + rate) — not subtract the percentage directly. Subtracting 20% from £120 gives £96, not £100. The correct method: £120 ÷ 1.20 = £100.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>VAT rate examples</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>UK standard rate</div>
            <div className={styles.exampleScenario}>£100 net + 20% VAT</div>
            <div className={styles.exampleValue}>£120<span style={{ fontSize: 14, fontWeight: 400 }}> gross</span></div>
            <div className={styles.exampleSub}>VAT amount: £20.00</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Germany</div>
            <div className={styles.exampleScenario}>€100 net + 19% VAT</div>
            <div className={styles.exampleValue}>€119<span style={{ fontSize: 14, fontWeight: 400 }}> gross</span></div>
            <div className={styles.exampleSub}>VAT amount: €19.00</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Hungary</div>
            <div className={styles.exampleScenario}>10,000 Ft net + 27% VAT</div>
            <div className={styles.exampleValue}>12,700 Ft<span style={{ fontSize: 12, fontWeight: 400 }}> gross</span></div>
            <div className={styles.exampleSub}>VAT amount: 2,700 Ft</div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {VAT_FAQ.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <div className={styles.faqQ}>{q}</div>
              <div className={styles.faqA}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> For informational purposes only. VAT rates and rules vary by country and product type. Always verify the applicable rate with your local tax authority or a qualified accountant.
      </div>
      <RelatedCalculators links={VAT_RELATED} />
      <RelatedCalculators title="Related Guides" links={[
        { label: 'What Is VAT?', to: '/blog/what-is-vat', description: 'How VAT works, how it differs from sales tax, and rates by country.' },
        { label: 'How Is a Tax Refund Calculated?', to: '/blog/how-tax-refund-is-calculated', description: 'How withholding works and what affects your refund.' },
      ]} />
    </main>
  )
}
