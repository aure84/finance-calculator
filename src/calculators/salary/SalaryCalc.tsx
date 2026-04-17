import { useState } from 'react'
import { calcSalary } from './salary'
import { formatCurrency, formatPercent } from '../../utils/format'

export default function SalaryCalc() {
  const [salary, setSalary] = useState('')
  const [filing, setFiling] = useState<'single' | 'married'>('single')

  const value = parseFloat(salary)
  const result = !isNaN(value) && value > 0
    ? calcSalary({ annualSalary: value, filingStatus: filing })
    : null

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Salary</label>
          <input
            type="number"
            value={salary}
            onChange={e => setSalary(e.target.value)}
            placeholder="e.g. 75000"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 200 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Filing Status</label>
          <select
            value={filing}
            onChange={e => setFiling(e.target.value as 'single' | 'married')}
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16 }}
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      {result && (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <tbody>
              {[
                ['Gross Annual', formatCurrency(result.grossAnnual)],
                ['Federal Income Tax', formatCurrency(result.federalTax)],
                ['Social Security (6.2%)', formatCurrency(result.socialSecurity)],
                ['Medicare (1.45%)', formatCurrency(result.medicare)],
                ['Total FICA', formatCurrency(result.fica)],
              ].map(([label, val]) => (
                <tr key={label} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 0', color: '#6b7280' }}>{label}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right' }}>{val}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700, fontSize: 16 }}>
                <td style={{ padding: '12px 0' }}>Net Take-Home (Annual)</td>
                <td style={{ padding: '12px 0', textAlign: 'right', color: '#16a34a' }}>{formatCurrency(result.netAnnual)}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
            {[
              ['Monthly', result.netMonthly],
              ['Bi-Weekly', result.netBiweekly],
              ['Weekly', result.netWeekly],
              ['Hourly', result.netHourly],
            ].map(([label, val]) => (
              <div key={label as string} style={{ background: '#f9fafb', padding: 16, borderRadius: 8, minWidth: 120 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{formatCurrency(val as number)}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 12, color: '#9ca3af' }}>
            Effective tax rate: {formatPercent(result.effectiveRate)} · Based on 2026 federal brackets · State tax not included
          </p>
        </div>
      )}
    </div>
  )
}
