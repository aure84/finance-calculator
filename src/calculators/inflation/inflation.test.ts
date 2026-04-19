import { describe, it, expect } from 'vitest'
import { calcInflation } from './inflation'

describe('calcInflation — future mode', () => {
  it('calculates purchasing power loss at 3% over 10 years', () => {
    const r = calcInflation({ amount: 1000, rate: 3, years: 10, mode: 'future' })
    expect(r.adjustedValue).toBeCloseTo(744.09, 0)
    expect(r.totalChangePercent).toBeCloseTo(-25.59, 0)
    expect(r.difference).toBeCloseTo(-255.91, 0)
  })

  it('returns same amount at 0% inflation', () => {
    const r = calcInflation({ amount: 1000, rate: 0, years: 10, mode: 'future' })
    expect(r.adjustedValue).toBeCloseTo(1000, 2)
    expect(r.totalChangePercent).toBeCloseTo(0, 2)
    expect(r.difference).toBeCloseTo(0, 2)
  })

  it('returns same amount at 0 years', () => {
    const r = calcInflation({ amount: 500, rate: 5, years: 0, mode: 'future' })
    expect(r.adjustedValue).toBeCloseTo(500, 2)
  })
})

describe('calcInflation — historical mode', () => {
  it('calculates historical equivalent at 3% over 10 years', () => {
    const r = calcInflation({ amount: 1000, rate: 3, years: 10, mode: 'historical' })
    expect(r.adjustedValue).toBeCloseTo(1343.92, 0)
    expect(r.totalChangePercent).toBeCloseTo(34.39, 0)
    expect(r.difference).toBeCloseTo(343.92, 0)
  })

  it('calculates historical at 7% over 20 years', () => {
    const r = calcInflation({ amount: 1000, rate: 7, years: 20, mode: 'historical' })
    expect(r.adjustedValue).toBeCloseTo(3869.68, 0)
  })

  it('returns same amount at 0% inflation', () => {
    const r = calcInflation({ amount: 1000, rate: 0, years: 10, mode: 'historical' })
    expect(r.adjustedValue).toBeCloseTo(1000, 2)
  })
})

describe('calcInflation — inverse property', () => {
  it('future and historical are inverse of each other', () => {
    const future = calcInflation({ amount: 1000, rate: 3, years: 10, mode: 'future' })
    const back = calcInflation({ amount: future.adjustedValue, rate: 3, years: 10, mode: 'historical' })
    expect(back.adjustedValue).toBeCloseTo(1000, 1)
  })
})
