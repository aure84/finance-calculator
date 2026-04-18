import { describe, it, expect } from 'vitest'
import { calcSavingsGoal } from './savingsGoal'

describe('calcSavingsGoal', () => {
  it('calculates months when return is zero', () => {
    const result = calcSavingsGoal({ goalAmount: 10000, currentSavings: 1000, monthlyContribution: 300, annualReturn: 0 })
    expect(result).not.toBeNull()
    expect(result!.months).toBe(30)
    expect(result!.totalContributions).toBe(10000)
    expect(result!.totalInterest).toBe(0)
  })

  it('calculates months with compound return', () => {
    const result = calcSavingsGoal({ goalAmount: 10000, currentSavings: 1000, monthlyContribution: 300, annualReturn: 5 })
    expect(result).not.toBeNull()
    expect(result!.months).toBeLessThan(30)
    expect(result!.totalInterest).toBeGreaterThan(0)
  })

  it('returns zero months when current savings already meets goal', () => {
    const result = calcSavingsGoal({ goalAmount: 5000, currentSavings: 6000, monthlyContribution: 100, annualReturn: 3 })
    expect(result).not.toBeNull()
    expect(result!.months).toBe(0)
  })

  it('returns null when goal is unreachable (no contribution, no return)', () => {
    const result = calcSavingsGoal({ goalAmount: 10000, currentSavings: 1000, monthlyContribution: 0, annualReturn: 0 })
    expect(result).toBeNull()
  })
})
