import { useState } from 'react'
import { calcMortgage } from './mortgage'
import { formatCurrency } from '../../utils/format'

export default function MortgageCalc() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('30')

  const p = parseFloat(principal)
  const r = parseFloat(rate)
  const y = parseFloat(years)
  const result = !isNaN(p) && !isNaN(r) && !isNaN(y) && p > 0 && r > 0 && y > 0
    ? calcMortgage({ principal: p, annualRate: r, termYears: y })
    : null

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        {[
          { label: 'Home Price / Loan Amount ($)', val: principal, set: setPrincipal, placeholder: '300000' },
          { label: 'Annual Interest Rate (%)', val: rate, set: setRate, placeholder: '7.0' },
          { label: 'Loan Term (Years)', val: years, set: setYears, placeholder: '30' },
        ].map(({ label, val, set, placeholder }) => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>{label}</label>
            <input
              type="number"
              value={val}
              onChange={e => set(e.target.value)}
              placeholder={placeholder}
              style={{ padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 16, width: 200 }}
            />
          </div>
        ))}
      </div>

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Monthly Payment', formatCurrency(result.monthlyPayment)],
              ['Total Interest', formatCurrency(result.totalInterest)],
              ['Total Cost', formatCurrency(result.totalCost)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: 'var(--results-bg)', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <details>
            <summary style={{ cursor: 'pointer', fontSize: 14, color: 'var(--navy)', marginBottom: 8 }}>
              View amortization schedule (first 24 months)
            </summary>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--results-bg)' }}>
                  {['Month', 'Payment', 'Principal', 'Interest', 'Balance'].map(h => (
                    <th key={h} style={{ padding: '8px', textAlign: 'right' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.schedule.slice(0, 24).map(row => (
                  <tr key={row.month} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{row.month}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{formatCurrency(row.payment)}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{formatCurrency(row.principal)}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{formatCurrency(row.interest)}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
          <p style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
            Does not include PMI, HOA, property taxes, or homeowner's insurance. Not a loan offer or pre-approval.
          </p>
        </div>
      )}
    </div>
  )
}
