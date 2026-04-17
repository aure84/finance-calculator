import { useState } from 'react'
import { calcRetirement } from './retirement'
import { formatCurrency } from '../../utils/format'

export default function RetirementCalc() {
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualReturn, setAnnualReturn] = useState('')
  const [years, setYears] = useState('')

  const cs = parseFloat(currentSavings)
  const mc = parseFloat(monthlyContribution)
  const ar = parseFloat(annualReturn)
  const y = parseFloat(years)
  const result = [cs, mc, ar, y].every(v => !isNaN(v) && v >= 0) && y > 0
    ? calcRetirement({ currentSavings: cs, monthlyContribution: mc, annualReturn: ar, years: y })
    : null

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, height: 43, boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Current Savings ($)</label>
          <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} placeholder="10000" style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Monthly Contribution ($)</label>
          <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} placeholder="500" style={{ ...inputStyle, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Return (%)</label>
          <input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} placeholder="6" style={{ ...inputStyle, width: 140 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Years to Retirement</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="20" style={{ ...inputStyle, width: 140 }} />
        </div>
      </div>

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Projected Balance', formatCurrency(result.projectedBalance)],
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
            For illustrative purposes only. Does not account for inflation, taxes, Social Security, or investment fees. Past market returns do not guarantee future results.
          </p>
        </div>
      )}
    </div>
  )
}
