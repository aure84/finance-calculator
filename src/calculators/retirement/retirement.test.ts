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
})
