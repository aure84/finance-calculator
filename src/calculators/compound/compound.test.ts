import { calcCompound } from './compound'

describe('calcCompound', () => {
  it('calculates compound interest correctly', () => {
    // $10,000 at 5% for 10 years compounded annually
    const result = calcCompound({ principal: 10000, annualRate: 5, years: 10, compoundingFrequency: 1 })
    expect(result.finalAmount).toBeCloseTo(16288.95, 1)
    expect(result.totalInterest).toBeCloseTo(6288.95, 1)
  })

  it('monthly compounding yields more than annual', () => {
    const annual = calcCompound({ principal: 10000, annualRate: 5, years: 10, compoundingFrequency: 1 })
    const monthly = calcCompound({ principal: 10000, annualRate: 5, years: 10, compoundingFrequency: 12 })
    expect(monthly.finalAmount).toBeGreaterThan(annual.finalAmount)
  })

  it('returns yearly breakdown', () => {
    const result = calcCompound({ principal: 10000, annualRate: 5, years: 5, compoundingFrequency: 12 })
    expect(result.yearlyBreakdown.length).toBe(5)
    expect(result.yearlyBreakdown[0].year).toBe(1)
  })
})
