import { useState } from 'react'
import { calcCreditCard } from './creditCard'
import { formatCurrency } from '../../utils/format'

function formatMonths(months: number): string {
  if (months < 12) return `${months} month${months === 1 ? '' : 's'}`
  const y = Math.floor(months / 12)
  const m = months % 12
  if (m === 0) return `${y} year${y === 1 ? '' : 's'}`
  return `${y} year${y === 1 ? '' : 's'} ${m} month${m === 1 ? '' : 's'}`
}

export default function CreditCardCalc() {
  const [balance, setBalance] = useState('')
  const [apr, setApr] = useState('')
  const [payment, setPayment] = useState('')

  const b = parseFloat(balance)
  const a = parseFloat(apr)
  const p = parseFloat(payment)

  const output =
    !isNaN(b) && !isNaN(a) && !isNaN(p) && b > 0 && p > 0
      ? calcCreditCard({ balance: b, apr: a, monthlyPayment: p })
      : null

  const isError = output && 'error' in output
  const data = output && !('error' in output) ? output : null

  const inputStyle: React.CSSProperties = {
    padding: '10px 12px',
    border: '1px solid var(--border)',
    borderRadius: 6,
    fontSize: 16,
    width: 160,
  }
  const cardStyle: React.CSSProperties = {
    background: 'var(--results-bg)',
    padding: 16,
    borderRadius: 8,
    minWidth: 160,
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Balance ($)</label>
          <input
            type="number"
            value={balance}
            onChange={e => setBalance(e.target.value)}
            placeholder="3500"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>APR (%)</label>
          <input
            type="number"
            value={apr}
            onChange={e => setApr(e.target.value)}
            placeholder="22.99"
            style={{ ...inputStyle, width: 120 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Monthly Payment ($)</label>
          <input
            type="number"
            value={payment}
            onChange={e => setPayment(e.target.value)}
            placeholder="150"
            style={inputStyle}
          />
        </div>
      </div>

      {isError && (
        <p style={{ color: 'var(--error)', fontWeight: 600, marginBottom: 16 }}>
          Monthly payment is too low to cover interest. Increase your payment.
        </p>
      )}

      {data && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {(
              [
                ['Time to Pay Off', formatMonths(data.result.months)],
                ['Total Interest', formatCurrency(data.result.totalInterest)],
                ['Total Paid', formatCurrency(data.result.totalPaid)],
              ] as [string, string][]
            ).map(([label, val]) => (
              <div key={label} style={cardStyle}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>

          {data.minResult && data.result.months < data.minResult.months && (
            <div
              style={{
                background: 'var(--error-bg)',
                border: '1px solid var(--error-border)',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                Minimum payment ({formatCurrency(data.minPayment)}/mo) comparison:
              </div>
              <div style={{ fontSize: 14, color: 'var(--text)' }}>
                Payoff time: {formatMonths(data.minResult.months)} &nbsp;·&nbsp; Extra interest:{' '}
                {formatCurrency(data.minResult.totalInterest - data.result.totalInterest)}
              </div>
            </div>
          )}

          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Assumes fixed APR and fixed monthly payment. Minimum payment approximation: max($25, 2%
            of balance).
          </p>
        </div>
      )}
    </div>
  )
}
