import { useState } from 'react'
import { calcTaxRefund, FilingStatus } from './taxRefund'
import { formatCurrency } from '../../utils/format'

export default function TaxRefundCalc() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(FilingStatus.Single)
  const [grossIncome, setGrossIncome] = useState('')
  const [federalWithheld, setFederalWithheld] = useState('')

  const gi = parseFloat(grossIncome)
  const fw = parseFloat(federalWithheld)
  const result = !isNaN(gi) && gi >= 0 && !isNaN(fw) && fw >= 0
    ? calcTaxRefund({ filingStatus, grossIncome: gi, federalWithheld: fw })
    : null

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, height: 43, boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Filing Status</label>
          <select value={filingStatus} onChange={e => setFilingStatus(e.target.value as FilingStatus)}
            style={{ ...inputStyle, width: 220 }}>
            <option value={FilingStatus.Single}>Single</option>
            <option value={FilingStatus.MarriedFilingJointly}>Married Filing Jointly</option>
            <option value={FilingStatus.MarriedFilingSeparately}>Married Filing Separately</option>
            <option value={FilingStatus.HeadOfHousehold}>Head of Household</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Gross Income ($)</label>
          <input type="number" value={grossIncome} onChange={e => setGrossIncome(e.target.value)} placeholder="60000"
            style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Federal Tax Withheld ($)</label>
          <input type="number" value={federalWithheld} onChange={e => setFederalWithheld(e.target.value)} placeholder="7000"
            style={{ ...inputStyle, width: 180 }} />
        </div>
      </div>

      {result && (
        <div>
          <div style={{
            background: result.isRefund ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${result.isRefund ? '#86efac' : '#fca5a5'}`,
            borderRadius: 8,
            padding: 20,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, color: result.isRefund ? '#166534' : '#991b1b', marginBottom: 4 }}>
              {result.isRefund ? 'Estimated Refund' : 'Estimated Amount Owed'}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: result.isRefund ? '#16a34a' : '#dc2626' }}>
              {formatCurrency(result.refundOrOwed)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              ['Taxable Income', formatCurrency(result.taxableIncome)],
              ['Estimated Federal Tax', formatCurrency(result.federalTax)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            Based on 2025 federal tax brackets and standard deduction. Does not include state taxes, AMT, tax credits, or deductions beyond the standard deduction.
          </p>
        </div>
      )}
    </div>
  )
}
