import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import FAQSchema from '../components/FAQSchema'
import WebApplicationSchema from '../components/WebApplicationSchema'
import TipCalc from '../calculators/tip/TipCalc'
import RelatedCalculators from '../components/RelatedCalculators'
import styles from './calculator.module.css'

const RELATED = [
  { label: 'Percentage Calculator', to: '/percentage-calculator', description: 'Calculate any percentage instantly.' },
  { label: 'Salary Calculator', to: '/salary-calculator', description: 'Calculate your take-home pay after taxes.' },
  { label: 'VAT Calculator', to: '/vat-calculator', description: 'Add or remove VAT from any price.' },
]

const FAQ = [
  {
    q: 'How much should I tip at a restaurant?',
    a: 'In the US, the standard restaurant tip is 15–20% for average service, 20–25% for excellent service, and 10% or less for poor service. In many other countries, tipping is optional or a smaller amount (5–10%).',
  },
  {
    q: 'How do I calculate a tip quickly in my head?',
    a: 'For a 10% tip: move the decimal one place left ($45 → $4.50). For 15%: find 10% and add half. For 20%: find 10% and double it. For example, 20% of $45 = $9.00.',
  },
  {
    q: 'Should I tip on the pre-tax or post-tax amount?',
    a: 'Tipping on the pre-tax amount is technically correct, but most people tip on the total bill (post-tax) for simplicity. The difference on a typical meal is small — usually less than $1.',
  },
  {
    q: 'How do I split the bill and tip fairly?',
    a: 'Enter the full bill amount, select your tip percentage, and set the number of people. The calculator shows the exact amount each person owes including tip. If people ordered different amounts, split manually by calculating each person\'s share separately.',
  },
  {
    q: 'Do I tip on delivery orders?',
    a: 'Yes — for delivery orders, 15–20% is standard in the US. For pickup orders, tipping is optional but appreciated. Always tip in cash or via the app so the driver or staff receives it directly.',
  },
]

export default function TipPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Tip Calculator — Finance Fast"
        description="Calculate tip and split the bill instantly. Enter the bill amount, tip percentage, and number of people to get the tip per person and total per person."
      />
      <FAQSchema items={FAQ} />
      <WebApplicationSchema
        name="Free Tip Calculator"
        description="Calculate tip amount and split the bill between any number of people. Free online tip calculator."
        url="https://finance-fast.com/tip-calculator"
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Tip Calculator
      </div>
      <h1 className={styles.title}>Tip Calculator</h1>
      <p className={styles.subtitle}>
        Enter the bill amount and select a tip percentage. Split evenly between any number of people.
      </p>
      <AdSlot slot="header" />
      <div className={styles.panel}>
        <TipCalc />
      </div>
      <AdSlot slot="content" />

      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Tipping guide by situation</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Restaurant (US)</div>
            <div className={styles.exampleScenario}>Standard service</div>
            <div className={styles.exampleValue}>18–20%</div>
            <div className={styles.exampleSub}>Excellent service: 20–25%</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Food Delivery</div>
            <div className={styles.exampleScenario}>Home delivery</div>
            <div className={styles.exampleValue}>15–20%</div>
            <div className={styles.exampleSub}>Min. $3–5 for small orders</div>
          </div>
          <div className={styles.exampleCard}>
            <div className={styles.exampleLabel}>Bar / Coffee</div>
            <div className={styles.exampleScenario}>Counter service</div>
            <div className={styles.exampleValue}>10–15%</div>
            <div className={styles.exampleSub}>Or $1–2 per drink</div>
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
        <strong>Disclaimer:</strong> Tipping norms vary by country, region, and establishment. The amounts shown are common US guidelines only.
      </div>
      <RelatedCalculators links={RELATED} />
    </main>
  )
}
