import { calcLoan } from './loan'

describe('calcLoan', () => {
  it('calculates monthly payment for $25,000 car loan at 6% for 5 years', () => {
    const result = calcLoan({ amount: 25000, annualRate: 6, termMonths: 60 })
    expect(result.monthlyPayment).toBeCloseTo(483.32, 1)
  })

  it('calculates total interest', () => {
    const result = calcLoan({ amount: 25000, annualRate: 6, termMonths: 60 })
    expect(result.totalInterest).toBeCloseTo(3999.2, 0)
  })

  it('handles zero interest', () => {
    const result = calcLoan({ amount: 12000, annualRate: 0, termMonths: 12 })
    expect(result.monthlyPayment).toBeCloseTo(1000, 1)
    expect(result.totalInterest).toBeCloseTo(0, 1)
  })
})
