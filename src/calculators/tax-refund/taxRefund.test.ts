import { describe, it, expect } from 'vitest'
import { calcTaxRefund, FilingStatus } from './taxRefund'

describe('calcTaxRefund', () => {
  it('calculates refund for single filer', () => {
    // $50,000 income, $15,000 standard deduction = $35,000 taxable
    // 10% on first $11,925 = $1,192.50, 12% on $23,075 = $2,769 → total $3,961.50
    const result = calcTaxRefund({ filingStatus: FilingStatus.Single, grossIncome: 50000, federalWithheld: 5000 })
    expect(result.federalTax).toBeCloseTo(3961.5, 0)
    expect(result.refundOrOwed).toBeCloseTo(1038.5, 0)
    expect(result.isRefund).toBe(true)
  })

  it('calculates amount owed when withholding is insufficient', () => {
    const result = calcTaxRefund({ filingStatus: FilingStatus.Single, grossIncome: 50000, federalWithheld: 2000 })
    expect(result.isRefund).toBe(false)
    expect(result.refundOrOwed).toBeCloseTo(1961.5, 0)
  })

  it('returns zero tax when income is below standard deduction', () => {
    const result = calcTaxRefund({ filingStatus: FilingStatus.Single, grossIncome: 10000, federalWithheld: 500 })
    expect(result.federalTax).toBe(0)
    expect(result.refundOrOwed).toBe(500)
    expect(result.isRefund).toBe(true)
  })

  it('uses married filing jointly brackets and deduction', () => {
    const result = calcTaxRefund({ filingStatus: FilingStatus.MarriedFilingJointly, grossIncome: 80000, federalWithheld: 5000 })
    // $80,000 - $30,000 deduction = $50,000 taxable
    // 10% on $23,850 = $2,385, 12% on $26,150 = $3,138 → $5,523
    expect(result.federalTax).toBeCloseTo(5523, 0)
  })
})
