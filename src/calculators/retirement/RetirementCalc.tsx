import { useState } from 'react'
import { calcRetirement } from './retirement'
import { STATES } from '../../data/stateTax'
import { formatCurrency } from '../../utils/format'

export default function RetirementCalc() {
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualReturn, setAnnualReturn] = useState('')
  const [years, setYears] = useState('')
  const [stateId, setStateId] = useState('')

  const cs = parseFloat(currentSavings)
  const mc = parseFloat(monthlyContribution)
  const ar = parseFloat(annualReturn)
  const y = parseFloat(years)
  const result = [cs, mc, ar, y].every(v => !isNaN(v) && v >= 0) && y > 0
    ? calcRetirement({ currentSavings: cs, monthlyContribution: mc, annualReturn: ar, years: y, stateId: stateId || undefined })
    : null

  const selectedState = stateId ? STATES.find(s => s.id === stateId) : null
  const stateHasNoTax = selectedState && selectedState.brackets.length === 0

  const inputStyle = { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, height: 43, boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Current Savings ($)</label>
          <input type="number" min="0" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} placeholder="10000" style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Monthly Contribution ($)</label>
          <input type="number" min="0" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} placeholder="500" style={{ ...inputStyle, width: 180 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Return (%)</label>
          <input type="number" min="0" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} placeholder="6" style={{ ...inputStyle, width: 140 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Years to Retirement</label>
          <input type="number" min="1" value={years} onChange={e => setYears(e.target.value)} placeholder="20" style={{ ...inputStyle, width: 140 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>State (optional)</label>
          <select
            value={stateId}
            onChange={e => setStateId(e.target.value)}
            style={{ ...inputStyle, width: 200 }}
          >
            <option value="">— No state —</option>
            {STATES.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {stateHasNoTax && (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14, color: '#166534' }}>
          {selectedState!.name} has no state income tax.
        </div>
      )}

      {result && (
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              ['Projected Balance', formatCurrency(result.projectedBalance)],
              ['Total Contributions', formatCurrency(result.totalContributions)],
              ['Total Interest Earned', formatCurrency(result.totalInterest)],
              ...(result.estimatedStateTax != null && result.estimatedStateTax > 0
                ? [
                    ['Est. State Tax on Withdrawal', formatCurrency(result.estimatedStateTax)],
                    ['Net After State Tax', formatCurrency(result.netProjectedBalance)],
                  ]
                : []),
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 160 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            For illustrative purposes only. Does not account for inflation, federal income tax, Social Security, or investment fees.
            {result.estimatedStateTax == null
              ? ' Select a state to estimate state tax on withdrawal.'
              : ' State tax estimate assumes full lump-sum withdrawal (an approximation — actual tax depends on withdrawal strategy).'}
          </p>
        </div>
      )}
    </div>
  )
}
