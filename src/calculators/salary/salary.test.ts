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

  it('deducts state tax from netAnnual when stateId provided', () => {
    // PA flat 3.07%. Single, $50k gross, deduction $15k → taxable $35k
    // stateTax = 35000 * 0.0307 = 1074.50
    const withState = calcSalary({ annualSalary: 50000, filingStatus: 'single', stateId: 'PA' })
    const noState   = calcSalary({ annualSalary: 50000, filingStatus: 'single' })
    expect(withState.stateTax).toBeCloseTo(1074.5, 0)
    expect(withState.netAnnual).toBeCloseTo(noState.netAnnual - 1074.5, 0)
  })

  it('returns stateTax 0 for no-income-tax state and does not change netAnnual', () => {
    const withTX  = calcSalary({ annualSalary: 50000, filingStatus: 'single', stateId: 'TX' })
    const noState = calcSalary({ annualSalary: 50000, filingStatus: 'single' })
    expect(withTX.stateTax).toBe(0)
    expect(withTX.netAnnual).toBeCloseTo(noState.netAnnual, 1)
  })

  it('returns stateTax null when no stateId and netAnnual is unchanged', () => {
    const result = calcSalary({ annualSalary: 50000, filingStatus: 'single' })
    expect(result.stateTax).toBeNull()
  })
})
