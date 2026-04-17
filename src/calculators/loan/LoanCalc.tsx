import { useState } from 'react'
import { calcLoan } from './loan'
import { formatCurrency } from '../../utils/format'

export default function LoanCalc() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [months, setMonths] = useState('')

  const a = parseFloat(amount)
  const r = parseFloat(rate)
  const m = parseFloat(months)
  const result = !isNaN(a) && !isNaN(r) && !isNaN(m) && a > 0 && m > 0
    ? calcLoan({ amount: a, annualRate: r, termMonths: m })
    : null

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Loan Amount ($)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="25000"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="6"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Loan Term (Months)</label>
          <input type="number" value={months} onChange={e => setMonths(e.target.value)} placeholder="60"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 140 }} />
        </div>
      </div>

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Monthly Payment', formatCurrency(result.monthlyPayment)],
              ['Total Interest', formatCurrency(result.totalInterest)],
              ['Total Cost', formatCurrency(result.totalCost)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            Does not include origination fees or prepayment penalties. Advertised rates may differ from rates you qualify for.
          </p>
        </div>
      )}
    </div>
  )
}
