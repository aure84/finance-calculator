import AdSlot from '../components/AdSlot'
import SEOMeta from '../components/SEOMeta'
import MortgageCalc from '../calculators/mortgage/MortgageCalc'

export default function MortgagePage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <SEOMeta
        title="Mortgage Calculator — Monthly Payment & Amortization | finance-fast.com"
        description="Calculate your monthly mortgage payment, total interest, and full amortization schedule. Free mortgage calculator for any home price and interest rate."
      />
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Mortgage Calculator</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        Calculate your monthly mortgage payment, total interest, and see a full amortization schedule.
      </p>
      <MortgageCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> Estimates only. Does not include PMI, HOA fees, property taxes, or insurance. Not a loan offer or pre-approval. Consult a licensed mortgage professional before making decisions.
      </div>
    </main>
  )
}
