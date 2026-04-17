import { useState } from 'react'
import { calcDebtPayoff, type Debt } from './debtPayoff'
import { formatCurrency } from '../../utils/format'

const defaultDebts: Debt[] = [
  { id: '1', name: 'Credit Card 1', balance: 5000, apr: 20, minPayment: 100 },
  { id: '2', name: 'Credit Card 2', balance: 2000, apr: 15, minPayment: 50 },
]

export default function DebtPayoffCalc() {
  const [debts, setDebts] = useState<Debt[]>(defaultDebts)
  const [extra, setExtra] = useState('100')

  const extraVal = parseFloat(extra) || 0
  const snowball = calcDebtPayoff({ debts, extraPayment: extraVal, method: 'snowball' })
  const avalanche = calcDebtPayoff({ debts, extraPayment: extraVal, method: 'avalanche' })

  const updateDebt = (id: string, field: keyof Debt, value: string) => {
    setDebts(prev => prev.map(d => d.id === id
      ? { ...d, [field]: field === 'name' ? value : parseFloat(value) || 0 }
      : d
    ))
  }

  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>Your Debts</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 16 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            {['Name', 'Balance ($)', 'APR (%)', 'Min Payment ($)'].map(h => (
              <th key={h} style={{ padding: '8px', textAlign: 'left' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {debts.map(d => (
            <tr key={d.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              {(['name', 'balance', 'apr', 'minPayment'] as (keyof Debt)[]).map(field => (
                <td key={field} style={{ padding: '6px 8px' }}>
                  <input
                    type={field === 'name' ? 'text' : 'number'}
                    value={d[field]}
                    onChange={e => updateDebt(d.id, field, e.target.value)}
                    style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 4, width: '100%' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Extra Monthly Payment ($)</label>
        <input type="number" value={extra} onChange={e => setExtra(e.target.value)} placeholder="100"
          style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 160 }} />
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[
          { label: '❄️ Snowball', result: snowball },
          { label: '🌊 Avalanche', result: avalanche },
        ].map(({ label, result }) => (
          <div key={label} style={{ background: '#f9fafb', padding: 20, borderRadius: 8, minWidth: 200, flex: 1 }}>
            <h4 style={{ marginBottom: 12 }}>{label}</h4>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Months to payoff</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{result.monthsToPayoff} months</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Total interest paid</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#dc2626' }}>{formatCurrency(result.totalInterest)}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: '#9ca3af' }}>
        Assumes no new charges. Minimum payment assumptions may differ from your lender's terms.
      </p>
    </div>
  )
}
