import { describe, it, expect } from 'vitest'
import { calcApr } from './apr'

describe('calcApr', () => {
  it('APR equals nominal rate when there are no fees', () => {
    const r = calcApr({ loanAmount: 10000, nominalRate: 5, termMonths: 60, fees: 0 })
    expect(r?.apr).toBeCloseTo(5, 1)
  })

  it('APR is higher than nominal rate when fees exist', () => {
    const r = calcApr({ loanAmount: 10000, nominalRate: 5, termMonths: 60, fees: 200 })
    expect(r!.apr).toBeGreaterThan(5)
  })

  it('APR increases significantly with large fees on short loan', () => {
    const noFee = calcApr({ loanAmount: 5000, nominalRate: 6, termMonths: 12, fees: 0 })
    const withFee = calcApr({ loanAmount: 5000, nominalRate: 6, termMonths: 12, fees: 300 })
    expect(withFee!.apr).toBeGreaterThan(noFee!.apr + 3)
  })

  it('monthly payment is correct for 0% fees', () => {
    const r = calcApr({ loanAmount: 12000, nominalRate: 6, termMonths: 12, fees: 0 })
    expect(r?.monthlyPayment).toBeCloseTo(1032.93, 0)
  })

  it('returns null for zero loan amount', () => {
    const r = calcApr({ loanAmount: 0, nominalRate: 5, termMonths: 12, fees: 0 })
    expect(r).toBeNull()
  })

  it('returns null when fees exceed loan amount', () => {
    const r = calcApr({ loanAmount: 1000, nominalRate: 5, termMonths: 12, fees: 1000 })
    expect(r).toBeNull()
  })

  it('handles 0% interest rate', () => {
    const r = calcApr({ loanAmount: 1200, nominalRate: 0, termMonths: 12, fees: 0 })
    expect(r?.monthlyPayment).toBeCloseTo(100, 1)
    expect(r?.apr).toBeCloseTo(0, 1)
  })
})
