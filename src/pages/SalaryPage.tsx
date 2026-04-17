import AdSlot from '../components/AdSlot'
import SalaryCalc from '../calculators/salary/SalaryCalc'

export default function SalaryPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <AdSlot slot="header" />
      <h1 style={{ marginBottom: 8 }}>Salary Calculator — Take-Home Pay After Tax</h1>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>
        Calculate your net take-home pay after federal income tax and FICA deductions. Based on 2026 tax brackets.
      </p>
      <SalaryCalc />
      <AdSlot slot="content" />
      <div style={{ marginTop: 32, padding: 16, background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
        <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only. Results are not tax or financial advice. Figures are based on 2026 federal tax brackets and do not include state or local taxes. Consult a CPA for personalized advice.
      </div>
    </main>
  )
}
