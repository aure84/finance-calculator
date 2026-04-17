import { calcSalary, type SalaryResult } from './salary'

describe('calcSalary', () => {
  it('calculates net pay for $50,000 salary', () => {
    const result = calcSalary({ annualSalary: 50000, filingStatus: 'single' })
    expect(result.federalTax).toBeGreaterThan(0)
    expect(result.fica).toBeCloseTo(3825, 0)  // 7.65% of 50000
    expect(result.netAnnual).toBeLessThan(50000)
    expect(result.netMonthly).toBeCloseTo(result.netAnnual / 12, 1)
  })

  it('calculates FICA correctly', () => {
    const result = calcSalary({ annualSalary: 100000, filingStatus: 'single' })
    // SS: 6.2% up to $176,100, Medicare: 1.45%
    expect(result.socialSecurity).toBeCloseTo(6200, 0)
    expect(result.medicare).toBeCloseTo(1450, 0)
  })

  it('caps Social Security at wage base', () => {
    const result = calcSalary({ annualSalary: 200000, filingStatus: 'single' })
    expect(result.socialSecurity).toBeCloseTo(176100 * 0.062, 0)
  })

  it('returns all pay periods', () => {
    const result = calcSalary({ annualSalary: 60000, filingStatus: 'single' })
    expect(result.netBiweekly).toBeCloseTo(result.netAnnual / 26, 1)
    expect(result.netWeekly).toBeCloseTo(result.netAnnual / 52, 1)
    expect(result.netHourly).toBeCloseTo(result.netAnnual / 2080, 2)
  })
})
