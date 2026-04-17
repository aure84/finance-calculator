import { useState } from 'react'
import { calcCompound } from './compound'
import { formatCurrency } from '../../utils/format'

export default function CompoundCalc() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [frequency, setFrequency] = useState('12')

  const p = parseFloat(principal)
  const r = parseFloat(rate)
  const y = parseFloat(years)
  const n = parseFloat(frequency)
  const result = [p, r, y, n].every(v => !isNaN(v) && v > 0)
    ? calcCompound({ principal: p, annualRate: r, years: y, compoundingFrequency: n })
    : null

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Initial Investment ($)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="10000"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="5"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Time (Years)</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="10"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 120 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Compounding</label>
          <select value={frequency} onChange={e => setFrequency(e.target.value)}
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16 }}>
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Final Amount', formatCurrency(result.finalAmount)],
              ['Total Interest', formatCurrency(result.totalInterest)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            Hypothetical results only. Does not account for taxes, inflation, or fees. Not a guarantee of future returns.
          </p>
        </div>
      )}
    </div>
  )
}
