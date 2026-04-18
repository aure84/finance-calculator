import { useState } from 'react'
import { calcSavingsGoal } from './savingsGoal'
import { formatCurrency } from '../../utils/format'

export default function SavingsGoalCalc() {
  const [goalAmount, setGoalAmount] = useState('')
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualReturn, setAnnualReturn] = useState('')

  const ga = parseFloat(goalAmount)
  const cs = parseFloat(currentSavings)
  const mc = parseFloat(monthlyContribution)
  const ar = parseFloat(annualReturn)
  const allFilled = [ga, cs, mc, ar].every(v => !isNaN(v) && v >= 0) && ga > 0
  const result = allFilled
    ? calcSavingsGoal({ goalAmount: ga, currentSavings: cs, monthlyContribution: mc, annualReturn: ar })
    : null

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, height: 43, boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Goal Amount ($)</label>
          <input type="number" value={goalAmount} onChange={e => setGoalAmount(e.target.value)} placeholder="10000" style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Current Savings ($)</label>
          <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} placeholder="1000" style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Monthly Contribution ($)</label>
          <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} placeholder="300" style={{ ...inputStyle, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Return (%)</label>
          <input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} placeholder="4" style={{ ...inputStyle, width: 140 }} />
        </div>
      </div>

      {allFilled && result === null && (
        <p style={{ color: '#dc2626', fontSize: 14 }}>Goal is unreachable with $0 monthly contribution and 0% return.</p>
      )}

      {result !== null && result.months === 0 && (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: '#166534' }}>You have already reached your goal!</div>
        </div>
      )}

      {result !== null && result.months > 0 && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Months to Goal', result.months.toString()],
              ['Years to Goal', result.years.toString()],
              ['Total Contributions', formatCurrency(result.totalContributions)],
              ['Total Interest Earned', formatCurrency(result.totalInterest)],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            For illustrative purposes only. Assumes fixed monthly contribution and constant annual return. Does not account for taxes on investment gains.
          </p>
        </div>
      )}
    </div>
  )
}
