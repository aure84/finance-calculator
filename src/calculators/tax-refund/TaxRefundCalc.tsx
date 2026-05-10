import { useState } from 'react'
import { calcTaxRefund, FilingStatus } from './taxRefund'
import { STATES } from '../../data/stateTax'
import { formatCurrency } from '../../utils/format'

export default function TaxRefundCalc() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(FilingStatus.Single)
  const [grossIncome, setGrossIncome] = useState('')
  const [federalWithheld, setFederalWithheld] = useState('')
  const [stateId, setStateId] = useState('')
  const [stateWithheld, setStateWithheld] = useState('')

  const gi = parseFloat(grossIncome)
  const fw = parseFloat(federalWithheld)
  const sw = stateWithheld !== '' ? parseFloat(stateWithheld) : undefined
  const result = !isNaN(gi) && gi >= 0 && !isNaN(fw) && fw >= 0
    ? calcTaxRefund({ filingStatus, grossIncome: gi, federalWithheld: fw, stateId: stateId || undefined, stateWithheld: sw })
    : null

  const inputStyle = { padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 16, height: 43, boxSizing: 'border-box' as const }

  const selectedState = stateId ? STATES.find(s => s.id === stateId) : null
  const stateHasNoTax = selectedState && selectedState.brackets.length === 0

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
          <input type="number" min="0" value={grossIncome} onChange={e => setGrossIncome(e.target.value)} placeholder="60000"
            style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Federal Tax Withheld ($)</label>
          <input type="number" min="0" value={federalWithheld} onChange={e => setFederalWithheld(e.target.value)} placeholder="7000"
            style={{ ...inputStyle, width: 180 }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>State (optional)</label>
          <select value={stateId} onChange={e => { setStateId(e.target.value); setStateWithheld('') }}
            style={{ ...inputStyle, width: 220 }}>
            <option value="">— No state —</option>
            {STATES.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        {stateId && !stateHasNoTax && (
          <div>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>State Tax Withheld ($, optional)</label>
            <input type="number" min="0" value={stateWithheld} onChange={e => setStateWithheld(e.target.value)} placeholder="2000"
              style={{ ...inputStyle, width: 180 }} />
          </div>
        )}
      </div>

      {stateHasNoTax && (
        <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14, color: 'var(--success-text)' }}>
          {selectedState!.name} has no state income tax.
        </div>
      )}

      {result && (
        <div>
          <div style={{
            background: result.isRefund ? 'var(--success-bg)' : 'var(--error-bg)',
            border: `1px solid ${result.isRefund ? 'var(--success-border)' : 'var(--error-border)'}`,
            borderRadius: 8,
            padding: 20,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, color: result.isRefund ? 'var(--success-text)' : 'var(--error-text)', marginBottom: 4 }}>
              {result.isRefund ? 'Estimated Federal Refund' : 'Estimated Federal Amount Owed'}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: result.isRefund ? 'var(--green)' : 'var(--error)' }}>
              {formatCurrency(result.refundOrOwed)}
            </div>
          </div>

          {result.stateRefundOrOwed != null && result.stateIsRefund != null && (
            <div style={{
              background: result.stateIsRefund ? 'var(--success-bg)' : 'var(--error-bg)',
              border: `1px solid ${result.stateIsRefund ? 'var(--success-border)' : 'var(--error-border)'}`,
              borderRadius: 8,
              padding: 20,
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, color: result.stateIsRefund ? 'var(--success-text)' : 'var(--error-text)', marginBottom: 4 }}>
                {result.stateIsRefund ? 'Estimated State Refund' : 'Estimated State Amount Owed'}
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: result.stateIsRefund ? 'var(--green)' : 'var(--error)' }}>
                {formatCurrency(result.stateRefundOrOwed)}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              ['Taxable Income', formatCurrency(result.taxableIncome)],
              ['Federal Tax', formatCurrency(result.federalTax)],
              ...(result.stateTax != null && result.stateTax > 0 ? [
                ['State Tax', formatCurrency(result.stateTax)],
                ['Total Tax', formatCurrency(result.totalTax)],
              ] : []),
            ].map(([label, val]) => (
              <div key={label} style={{ background: 'var(--results-bg)', padding: 16, borderRadius: 8, minWidth: 150 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Based on 2025 federal brackets and standard deduction. State tax uses the same taxable income as federal (an approximation — states have their own deductions). Does not include AMT, tax credits, or local taxes.
          </p>
        </div>
      )}
    </div>
  )
}
