import { useState } from 'react'
import { calcInflation, InflationMode } from './inflation'

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function InflationCalc() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('3')
  const [years, setYears] = useState('10')
  const [mode, setMode] = useState<InflationMode>('future')

  const a = parseFloat(amount)
  const r = parseFloat(rate)
  const y = parseFloat(years)
  const result =
    !isNaN(a) && a > 0 && !isNaN(r) && r >= 0 && !isNaN(y) && y >= 0
      ? calcInflation({ amount: a, rate: r, years: y, mode })
      : null

  const adjustedLabel = mode === 'future' ? 'Future Value' : "Today's Equivalent"
  const changeSign = result && result.difference >= 0 ? '+' : ''

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {([['future', 'Future Value'], ['historical', 'Historical Equivalent']] as [InflationMode, string][]).map(([val, label]) => (
          <button
            key={val}
            onClick={() => setMode(val)}
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              border: '1px solid',
              borderColor: mode === val ? 'var(--navy)' : 'var(--border)',
              background: mode === val ? 'var(--navy)' : 'var(--surface)',
              color: mode === val ? 'var(--surface)' : 'var(--text)',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="1000"
            style={{ padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 16, width: 180 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Inflation Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={e => setRate(e.target.value)}
            step="0.1"
            min="0"
            placeholder="3"
            style={{ padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 16, width: 160 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Number of Years</label>
          <input
            type="number"
            value={years}
            onChange={e => setYears(e.target.value)}
            min="0"
            placeholder="10"
            style={{ padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 16, width: 140 }}
          />
        </div>
      </div>

      {result && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            [adjustedLabel, `$${fmt(result.adjustedValue)}`],
            ['Total Change', `${changeSign}${fmt(result.totalChangePercent)}%`],
            ['Difference', `${result.difference >= 0 ? '+' : '-'}$${fmt(Math.abs(result.difference))}`],
          ].map(([label, val]) => (
            <div key={label} style={{ background: 'var(--results-bg)', padding: '16px 20px', borderRadius: 8, minWidth: 160 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>{val}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
