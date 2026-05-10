import { useState } from 'react'
import { calcVat, VatMode } from './vat'

const VAT_RATES = [5, 7, 10, 12, 15, 19, 20, 21, 23, 25, 27]

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function VatCalc() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('20')
  const [mode, setMode] = useState<VatMode>('add')

  const a = parseFloat(amount)
  const r = parseFloat(rate)
  const result = !isNaN(a) && a > 0 && !isNaN(r) && r >= 0
    ? calcVat({ amount: a, rate: r, mode })
    : null

  const inputLabel = mode === 'add' ? 'Net Price (excl. VAT)' : 'Gross Price (incl. VAT)'

  return (
    <div>
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {([['add', 'Add VAT'], ['remove', 'Remove VAT']] as [VatMode, string][]).map(([val, label]) => (
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

      {/* Inputs */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>{inputLabel}</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="100.00"
            style={{ padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 16, width: 180 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>VAT Rate (%)</label>
          <select
            value={rate}
            onChange={e => setRate(e.target.value)}
            style={{ padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 16, width: 140, background: 'var(--surface)' }}
          >
            {VAT_RATES.map(r => (
              <option key={r} value={r}>{r}%</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            ['Net Price', fmt(result.netPrice)],
            ['VAT Amount', fmt(result.vatAmount)],
            ['Gross Price', fmt(result.grossPrice)],
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
