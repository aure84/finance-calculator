export default function DisclaimerPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Financial Disclaimer</h1>
      <p style={{ marginBottom: 24, color: '#6b7280', fontSize: 14 }}>Last updated: April 24, 2026</p>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        <strong>For informational purposes only.</strong> The calculators on finance-fast.com provide estimates only. Results are not financial, tax, investment, or legal advice.
      </p>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        Calculation results may not reflect current interest rates, tax laws, lender requirements, or your personal financial situation. Tax brackets, Social Security wage bases, and other figures are updated periodically but may not reflect the most recent changes. Always consult a licensed financial advisor, CPA, mortgage professional, or attorney before making financial decisions.
      </p>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        finance-fast.com is not a licensed financial advisor, broker, lender, or attorney. Use of this site does not create any advisor-client relationship.
      </p>
      <p style={{ color: '#374151', lineHeight: 1.7 }}>
        finance-fast.com assumes no liability for financial decisions made based on calculations from this site. See our <a href="/terms-of-use" style={{ color: '#2563eb' }}>Terms of Use</a> for full limitation of liability.
      </p>
    </main>
  )
}
