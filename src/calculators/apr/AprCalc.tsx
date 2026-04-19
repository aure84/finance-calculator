import { useState } from 'react'
import { calcApr } from './apr'

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export default function AprCalc() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [term, setTerm] = useState('')
  const [fees, setFees] = useState('0')

  const a = parseFloat(amount)
  const r = parseFloat(rate)
  const t = parseFloat(term)
  const f = parseFloat(fees) || 0

  const result = !isNaN(a) && a > 0 && !isNaN(r) && r >= 0 && !isNaN(t) && t > 0
    ? calcApr({ loanAmount: a, nominalRate: r, termMonths: t, fees: f })
    : null

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 160 }
  const labelStyle = { display: 'block', fontSize: 14, marginBottom: 6 } as const

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={labelStyle}>Loan Amount ($)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="10000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="5" step="0.01" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Loan Term (months)</label>
          <input type="number" value={term} onChange={e => setTerm(e.target.value)} placeholder="60" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Upfront Fees ($)</label>
          <input type="number" value={fees} onChange={e => setFees(e.target.value)} placeholder="0" style={inputStyle} />
        </div>
      </div>

      {result && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            ['APR', `${fmt(result.apr, 3)}%`],
            ['Monthly Payment', `$${fmt(result.monthlyPayment)}`],
            ['Total Interest', `$${fmt(result.totalInterest)}`],
            ['Total Cost (int. + fees)', `$${fmt(result.totalCost)}`],
          ].map(([label, val]) => (
            <div key={label} style={{ background: '#eef3f9', padding: '16px 20px', borderRadius: 8, minWidth: 160 }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f' }}>{val}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
