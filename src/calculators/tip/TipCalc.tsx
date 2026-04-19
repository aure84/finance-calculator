import { useState } from 'react'
import { calcTip } from './tip'

const TIP_PRESETS = [10, 15, 18, 20, 25]

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function TipCalc() {
  const [bill, setBill] = useState('')
  const [tip, setTip] = useState('18')
  const [people, setPeople] = useState('1')

  const b = parseFloat(bill)
  const t = parseFloat(tip)
  const p = parseFloat(people)
  const result = !isNaN(b) && b > 0 && !isNaN(t) && t >= 0 && !isNaN(p) && p > 0
    ? calcTip({ bill: b, tipPercent: t, people: p })
    : null

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16 }

  return (
    <div>
      {/* Bill amount */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Bill Amount ($)</label>
          <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="0.00" style={{ ...inputStyle, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Number of People</label>
          <input type="number" value={people} onChange={e => setPeople(e.target.value)} min="1" step="1" placeholder="1" style={{ ...inputStyle, width: 120 }} />
        </div>
      </div>

      {/* Tip % presets + custom */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: 14, marginBottom: 10 }}>Tip Percentage</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {TIP_PRESETS.map(pct => (
            <button
              key={pct}
              onClick={() => setTip(String(pct))}
              style={{
                padding: '8px 16px',
                borderRadius: 6,
                border: '1px solid',
                borderColor: tip === String(pct) ? '#1e3a5f' : '#d1d5db',
                background: tip === String(pct) ? '#1e3a5f' : '#fff',
                color: tip === String(pct) ? '#fff' : '#374151',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {pct}%
            </button>
          ))}
          <input
            type="number"
            value={tip}
            onChange={e => setTip(e.target.value)}
            placeholder="Custom %"
            style={{ ...inputStyle, width: 120 }}
          />
        </div>
      </div>

      {/* Results */}
      {result && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            ['Tip Amount', `$${fmt(result.tipAmount)}`],
            ['Total Bill', `$${fmt(result.totalAmount)}`],
            ...(p > 1 ? [
              ['Per Person (total)', `$${fmt(result.perPerson)}`],
              ['Per Person (tip)', `$${fmt(result.tipPerPerson)}`],
            ] : []),
          ].map(([label, val]) => (
            <div key={label} style={{ background: '#eef3f9', padding: '16px 20px', borderRadius: 8, minWidth: 150 }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1e3a5f' }}>{val}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
