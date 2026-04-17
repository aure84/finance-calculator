import { calcMortgage } from './mortgage'

describe('calcMortgage', () => {
  it('calculates monthly payment for $300,000 at 7% for 30 years', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    expect(result.monthlyPayment).toBeCloseTo(1995.91, 1)
  })

  it('calculates total interest', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    expect(result.totalInterest).toBeCloseTo(418526.7, 0)
  })

  it('calculates total cost', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    expect(result.totalCost).toBeCloseTo(result.monthlyPayment * 360, 0)
  })

  it('returns amortization schedule with correct length', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    expect(result.schedule.length).toBe(360)
  })

  it('first payment has correct principal/interest split', () => {
    const result = calcMortgage({ principal: 300000, annualRate: 7, termYears: 30 })
    const first = result.schedule[0]
    expect(first.interest).toBeCloseTo(1750, 0) // 300000 * 0.07 / 12
    expect(first.principal).toBeCloseTo(245.91, 0)
  })
})
