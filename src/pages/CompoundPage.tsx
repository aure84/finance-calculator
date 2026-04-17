import AdSlot from '../components/AdSlot'
import CompoundCalc from '../calculators/compound/CompoundCalc'

export default function CompoundPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Compound Interest Calculator</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        See how your investment grows over time with compound interest. Compare annual, quarterly, monthly, and daily compounding.
      </p>
      <CompoundCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> Hypothetical results only. Does not account for taxes on gains, inflation, or fund fees. Not a guarantee of future investment returns.
      </div>
    </main>
  )
}
