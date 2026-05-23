import { useState } from 'react'
import { calcBudget } from './budget'
import { formatCurrency } from '../../utils/format'

export default function BudgetCalc() {
  const [income, setIncome] = useState('')
  const [needsPct, setNeedsPct] = useState('50')
  const [wantsPct, setWantsPct] = useState('30')
  const [savingsPct, setSavingsPct] = useState('20')

  const inc = parseFloat(income)
  const np = parseFloat(needsPct)
  const wp = parseFloat(wantsPct)
  const sp = parseFloat(savingsPct)

  const pctsValid = !isNaN(np) && !isNaN(wp) && !isNaN(sp)
  const totalPct = pctsValid ? np + wp + sp : 0
  const pctSumOk = totalPct === 100
  const incomeOk = !isNaN(inc) && inc > 0

  const result = incomeOk && pctSumOk
    ? calcBudget({ monthlyIncome: inc, needsPct: np, wantsPct: wp, savingsPct: sp })
    : null

  const inputStyle = {
    padding: '10px 12px',
    border: '1px solid var(--border)',
    borderRadius: 6,
    fontSize: 16,
    background: 'var(--surface)',
    color: 'var(--text)',
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>
            Monthly Take-Home Income ($)
          </label>
          <input
            type="number"
            value={income}
            onChange={e => setIncome(e.target.value)}
            placeholder="4000"
            style={{ ...inputStyle, width: 200 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Needs (%)</label>
          <input
            type="number"
            value={needsPct}
            onChange={e => setNeedsPct(e.target.value)}
            min="0"
            max="100"
            style={{ ...inputStyle, width: 90 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Wants (%)</label>
          <input
            type="number"
            value={wantsPct}
            onChange={e => setWantsPct(e.target.value)}
            min="0"
            max="100"
            style={{ ...inputStyle, width: 90 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Savings & Debt (%)</label>
          <input
            type="number"
            value={savingsPct}
            onChange={e => setSavingsPct(e.target.value)}
            min="0"
            max="100"
            style={{ ...inputStyle, width: 120 }}
          />
        </div>
      </div>

      {pctsValid && !pctSumOk && (
        <div style={{
          background: 'var(--error-bg)',
          border: '1px solid var(--error-border)',
          color: 'var(--error-text)',
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 16,
          fontSize: 14,
        }}>
          Percentages must add up to 100% (currently {totalPct}%)
        </div>
      )}

      {result && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'Needs', monthly: result.needs, annual: result.needsAnnual, color: 'var(--text)' },
            { label: 'Wants', monthly: result.wants, annual: result.wantsAnnual, color: 'var(--text)' },
            { label: 'Savings & Debt', monthly: result.savings, annual: result.savingsAnnual, color: 'var(--green)' },
          ].map(({ label, monthly, annual, color }) => (
            <div key={label} style={{ background: 'var(--results-bg)', padding: 16, borderRadius: 8, minWidth: 180 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color }}>
                {formatCurrency(monthly)}
                <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}>/mo</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                {formatCurrency(annual)}/yr
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
