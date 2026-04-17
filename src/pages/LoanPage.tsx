import AdSlot from '../components/AdSlot'
import LoanCalc from '../calculators/loan/LoanCalc'

export default function LoanPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Loan Calculator</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        Calculate monthly payments, total interest, and total cost for any personal, auto, or student loan.
      </p>
      <LoanCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> Estimates only. Does not include origination fees or prepayment penalties. Rates you qualify for may differ from illustrative rates shown. Not a loan offer.
      </div>
    </main>
  )
}
