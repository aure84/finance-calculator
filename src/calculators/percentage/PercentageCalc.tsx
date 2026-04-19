import { useState } from 'react'
import { calcPercentage, PercentageMode } from './percentage'

function fmt(n: number) {
  const abs = Math.abs(n)
  if (Number.isInteger(n) || abs >= 100) return n.toLocaleString('en-US', { maximumFractionDigits: 2 })
  return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 6 })
}

const MODES: { value: PercentageMode; label: string; aLabel: string; bLabel: string; question: string }[] = [
  { value: 'of', label: 'X% of Y', aLabel: 'Percentage (%)', bLabel: 'Value', question: 'What is __a__% of __b__?' },
  { value: 'is', label: 'X is what %', aLabel: 'Part', bLabel: 'Whole', question: '__a__ is what % of __b__?' },
  { value: 'change', label: '% Change', aLabel: 'From', bLabel: 'To', question: '% change from __a__ to __b__?' },
]

export default function PercentageCalc() {
  const [mode, setMode] = useState<PercentageMode>('of')
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const aVal = parseFloat(a)
  const bVal = parseFloat(b)
  const result = !isNaN(aVal) && !isNaN(bVal)
    ? calcPercentage({ a: aVal, b: bVal, mode })
    : null

  const current = MODES.find(m => m.value === mode)!
  const question = current.question
    .replace('__a__', a || '?')
    .replace('__b__', b || '?')

  const sign = result && result.result > 0 && mode === 'change' ? '+' : ''

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {MODES.map(m => (
          <button
            key={m.value}
            onClick={() => { setMode(m.value); setA(''); setB('') }}
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              border: '1px solid',
              borderColor: mode === m.value ? '#1e3a5f' : '#d1d5db',
              background: mode === m.value ? '#1e3a5f' : '#fff',
              color: mode === m.value ? '#fff' : '#374151',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20, fontStyle: 'italic' }}>{question}</p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>{current.aLabel}</label>
          <input
            type="number"
            value={a}
            onChange={e => setA(e.target.value)}
            placeholder="0"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 160 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>{current.bLabel}</label>
          <input
            type="number"
            value={b}
            onChange={e => setB(e.target.value)}
            placeholder="0"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 160 }}
          />
        </div>
      </div>

      {result && (
        <div style={{ background: '#eef3f9', padding: '16px 20px', borderRadius: 8, display: 'inline-block', minWidth: 180 }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{result.label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e3a5f' }}>
            {sign}{fmt(result.result)}{mode === 'is' || mode === 'change' ? '%' : ''}
          </div>
        </div>
      )}
    </div>
  )
}
