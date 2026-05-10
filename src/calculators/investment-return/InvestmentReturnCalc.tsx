import { useState } from 'react'
import { calcCAGR, calcFutureValue } from './investmentReturn'
import { formatCurrency, formatPercent } from '../../utils/format'

type Mode = 'cagr' | 'future'

export default function InvestmentReturnCalc() {
  const [mode, setMode] = useState<Mode>('cagr')

  const [startVal, setStartVal] = useState('')
  const [endVal, setEndVal] = useState('')
  const [years, setYears] = useState('')

  const [fvStart, setFvStart] = useState('')
  const [fvRate, setFvRate] = useState('')
  const [fvYears, setFvYears] = useState('')

  const cagrResult =
    mode === 'cagr' &&
    parseFloat(startVal) > 0 &&
    parseFloat(endVal) > 0 &&
    parseFloat(years) > 0
      ? calcCAGR({
          startValue: parseFloat(startVal),
          endValue: parseFloat(endVal),
          years: parseFloat(years),
        })
      : null

  const fvResult =
    mode === 'future' &&
    parseFloat(fvStart) > 0 &&
    !isNaN(parseFloat(fvRate)) &&
    parseFloat(fvYears) > 0
      ? calcFutureValue({
          startValue: parseFloat(fvStart),
          annualReturn: parseFloat(fvRate),
          years: parseFloat(fvYears),
        })
      : null

  const inputStyle: React.CSSProperties = {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 16,
    width: 160,
  }
  const cardStyle: React.CSSProperties = {
    background: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    minWidth: 160,
  }
  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 20px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    background: active ? '#2563eb' : '#fff',
    color: active ? '#fff' : '#374151',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
  })

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button style={btnStyle(mode === 'cagr')} onClick={() => setMode('cagr')}>
          Calculate CAGR
        </button>
        <button style={btnStyle(mode === 'future')} onClick={() => setMode('future')}>
          Project Future Value
        </button>
      </div>

      {mode === 'cagr' && (
        <div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Start Value ($)</label>
              <input
                type="number"
                value={startVal}
                onChange={e => setStartVal(e.target.value)}
                placeholder="10000"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>End Value ($)</label>
              <input
                type="number"
                value={endVal}
                onChange={e => setEndVal(e.target.value)}
                placeholder="18000"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Years</label>
              <input
                type="number"
                value={years}
                onChange={e => setYears(e.target.value)}
                placeholder="7"
                style={{ ...inputStyle, width: 100 }}
              />
            </div>
          </div>
          {cagrResult && (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {(
                [
                  ['CAGR', formatPercent(cagrResult.cagr)],
                  ['Total Return', formatPercent(cagrResult.totalReturn)],
                  ['Total Profit', formatCurrency(cagrResult.totalProfit)],
                ] as [string, string][]
              ).map(([label, val]) => (
                <div key={label} style={cardStyle}>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {mode === 'future' && (
        <div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Start Value ($)</label>
              <input
                type="number"
                value={fvStart}
                onChange={e => setFvStart(e.target.value)}
                placeholder="10000"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Annual Return (%)</label>
              <input
                type="number"
                value={fvRate}
                onChange={e => setFvRate(e.target.value)}
                placeholder="7"
                style={{ ...inputStyle, width: 120 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Years</label>
              <input
                type="number"
                value={fvYears}
                onChange={e => setFvYears(e.target.value)}
                placeholder="20"
                style={{ ...inputStyle, width: 100 }}
              />
            </div>
          </div>
          {fvResult && (
            <div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
                {(
                  [
                    ['Final Value', formatCurrency(fvResult.finalValue)],
                    ['Total Profit', formatCurrency(fvResult.totalProfit)],
                    ['Total Return', formatPercent(fvResult.totalReturn)],
                  ] as [string, string][]
                ).map(([label, val]) => (
                  <div key={label} style={cardStyle}>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
                  </div>
                ))}
              </div>
              {parseFloat(fvYears) > 50 && (
                <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
                  Table capped at 50 years.
                </p>
              )}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6' }}>
                      <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Year</th>
                      <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Value</th>
                      <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Gain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fvResult.table.map(({ year, value, gain }) => (
                      <tr key={year} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '6px 12px' }}>{year}</td>
                        <td style={{ padding: '6px 12px', textAlign: 'right' }}>{formatCurrency(value)}</td>
                        <td style={{ padding: '6px 12px', textAlign: 'right', color: gain >= 0 ? '#16a34a' : '#dc2626' }}>
                          {gain >= 0 ? '+' : ''}{formatCurrency(gain)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
