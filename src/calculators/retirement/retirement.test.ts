import { describe, it, expect } from 'vitest'
import { calcRetirement } from './retirement'

describe('calcRetirement', () => {
  it('calculates projected balance with compound growth', () => {
    const result = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 6, years: 20 })
    expect(result.projectedBalance).toBeCloseTo(264122, 0)
  })

  it('handles zero return rate without division by zero', () => {
    const result = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 0, years: 10 })
    expect(result.projectedBalance).toBeCloseTo(70000, 0)
    expect(result.totalInterest).toBe(0)
  })

  it('calculates total contributions and interest', () => {
    const result = calcRetirement({ currentSavings: 0, monthlyContribution: 100, annualReturn: 0, years: 10 })
    expect(result.totalContributions).toBe(12000)
    expect(result.totalInterest).toBe(0)
  })

  it('returns estimatedStateTax and netProjectedBalance when stateId provided', () => {
    // PA flat 3.07% on projectedBalance
    // projectedBalance ≈ 264122 (from existing test params)
    // estimatedStateTax ≈ 264122 * 0.0307 ≈ 8109
    const result = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 6, years: 20, stateId: 'PA' })
    expect(result.estimatedStateTax).toBeCloseTo(8109, 0)
    expect(result.netProjectedBalance).toBeCloseTo(result.projectedBalance - result.estimatedStateTax!, 0)
  })

  it('returns estimatedStateTax 0 for no-income-tax state and netProjectedBalance equals projectedBalance', () => {
    const withTX = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 6, years: 20, stateId: 'TX' })
    expect(withTX.estimatedStateTax).toBe(0)
    expect(withTX.netProjectedBalance).toBeCloseTo(withTX.projectedBalance, 1)
  })

  it('returns estimatedStateTax null and netProjectedBalance equals projectedBalance when no stateId', () => {
    const result = calcRetirement({ currentSavings: 10000, monthlyContribution: 500, annualReturn: 6, years: 20 })
    expect(result.estimatedStateTax).toBeNull()
    expect(result.netProjectedBalance).toBeCloseTo(result.projectedBalance, 1)
  })
})
