import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { ChartDataPoint } from '../data/blogPosts'
import styles from './MarketCrashChart.module.css'

interface Props {
  title: string
  index: string
  unit: string
  data: ChartDataPoint[]
}

function Chart({ title, index, data }: Props) {
  const peak = Math.max(...data.map(d => d.value))
  const trough = Math.min(...data.map(d => d.value))
  const drop = Math.round((1 - trough / peak) * 100)

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.stats}>
        <span className={styles.stat}><span className={styles.statLabel}>Peak</span> {peak.toLocaleString()}</span>
        <span className={styles.stat}><span className={styles.statLabel}>Trough</span> {trough.toLocaleString()}</span>
        <span className={`${styles.stat} ${styles.drop}`}><span className={styles.statLabel}>Drop</span> −{drop}%</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => v.toLocaleString()}
            width={55}
          />
          <Tooltip
            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
            labelStyle={{ color: 'var(--text)', fontWeight: 600 }}
            formatter={(v) => [typeof v === 'number' ? v.toLocaleString() : v, index]}
          />
          <ReferenceLine y={trough} stroke="#ef4444" strokeDasharray="4 2" strokeOpacity={0.5} />
          <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fill={`url(#grad-${index})`} dot={{ r: 3, fill: '#ef4444', strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
      <p className={styles.source}>Source: historical index data</p>
    </div>
  )
}

export default function MarketCrashChart(props: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <Chart {...props} />
}
