import AdSlot from '../components/AdSlot'
import DebtPayoffCalc from '../calculators/debt-payoff/DebtPayoffCalc'

export default function DebtPayoffPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Debt Payoff Calculator — Snowball vs Avalanche</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        Compare two debt payoff strategies: snowball (smallest balance first) vs avalanche (highest interest first). See which saves you more money.
      </p>
      <DebtPayoffCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> Assumes no new charges are added. Minimum payment assumptions may differ from your lender's actual terms. Consult a financial advisor for personalized debt management advice.
      </div>
    </main>
  )
}
