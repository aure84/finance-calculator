import { describe, it, expect } from 'vitest'
import { calcBudget } from './budget'

describe('calcBudget', () => {
  it('applies 50/30/20 split on $5,000', () => {
    const r = calcBudget({ monthlyIncome: 5000, needsPct: 50, wantsPct: 30, savingsPct: 20 })
    expect(r?.needs).toBeCloseTo(2500)
    expect(r?.wants).toBeCloseTo(1500)
    expect(r?.savings).toBeCloseTo(1000)
  })

  it('calculates annual as monthly * 12', () => {
    const r = calcBudget({ monthlyIncome: 4000, needsPct: 50, wantsPct: 30, savingsPct: 20 })
    expect(r?.needsAnnual).toBeCloseTo(24000)
    expect(r?.wantsAnnual).toBeCloseTo(14400)
    expect(r?.savingsAnnual).toBeCloseTo(9600)
  })

  it('returns totalPct as sum of the three inputs', () => {
    const r = calcBudget({ monthlyIncome: 3000, needsPct: 40, wantsPct: 40, savingsPct: 20 })
    expect(r?.totalPct).toBe(100)
  })

  it('works with custom 60/20/20 split', () => {
    const r = calcBudget({ monthlyIncome: 5000, needsPct: 60, wantsPct: 20, savingsPct: 20 })
    expect(r?.needs).toBeCloseTo(3000)
    expect(r?.wants).toBeCloseTo(1000)
    expect(r?.savings).toBeCloseTo(1000)
  })

  it('works with $0 income — all results are 0', () => {
    const r = calcBudget({ monthlyIncome: 0, needsPct: 50, wantsPct: 30, savingsPct: 20 })
    expect(r?.needs).toBe(0)
    expect(r?.wants).toBe(0)
    expect(r?.savings).toBe(0)
    expect(r?.needsAnnual).toBe(0)
    expect(r?.wantsAnnual).toBe(0)
    expect(r?.savingsAnnual).toBe(0)
    expect(r?.totalPct).toBe(100)
  })

  it('returns null for negative income', () => {
    expect(calcBudget({ monthlyIncome: -1000, needsPct: 50, wantsPct: 30, savingsPct: 20 })).toBeNull()
  })
})
