import { describe, it, expect } from 'vitest'
import { calcTip } from './tip'

describe('calcTip', () => {
  it('calculates 15% tip on $100 bill', () => {
    const r = calcTip({ bill: 100, tipPercent: 15, people: 1 })
    expect(r?.tipAmount).toBeCloseTo(15)
    expect(r?.totalAmount).toBeCloseTo(115)
  })

  it('splits correctly between 4 people', () => {
    const r = calcTip({ bill: 100, tipPercent: 20, people: 4 })
    expect(r?.perPerson).toBeCloseTo(30)
    expect(r?.tipPerPerson).toBeCloseTo(5)
  })

  it('handles 0% tip', () => {
    const r = calcTip({ bill: 80, tipPercent: 0, people: 2 })
    expect(r?.tipAmount).toBeCloseTo(0)
    expect(r?.perPerson).toBeCloseTo(40)
  })

  it('returns null for zero bill', () => {
    expect(calcTip({ bill: 0, tipPercent: 15, people: 1 })).toBeNull()
  })

  it('returns null for zero people', () => {
    expect(calcTip({ bill: 100, tipPercent: 15, people: 0 })).toBeNull()
  })
})
