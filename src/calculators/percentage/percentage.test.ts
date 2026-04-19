import { describe, it, expect } from 'vitest'
import { calcPercentage } from './percentage'

describe('calcPercentage — of mode', () => {
  it('calculates 15% of 200', () => {
    const r = calcPercentage({ a: 15, b: 200, mode: 'of' })
    expect(r?.result).toBeCloseTo(30)
  })
  it('calculates 100% of 50', () => {
    const r = calcPercentage({ a: 100, b: 50, mode: 'of' })
    expect(r?.result).toBeCloseTo(50)
  })
  it('calculates 0% of anything', () => {
    const r = calcPercentage({ a: 0, b: 500, mode: 'of' })
    expect(r?.result).toBeCloseTo(0)
  })
})

describe('calcPercentage — is mode', () => {
  it('30 is what % of 200', () => {
    const r = calcPercentage({ a: 30, b: 200, mode: 'is' })
    expect(r?.result).toBeCloseTo(15)
  })
  it('returns null when b is 0', () => {
    const r = calcPercentage({ a: 30, b: 0, mode: 'is' })
    expect(r).toBeNull()
  })
})

describe('calcPercentage — change mode', () => {
  it('% change from 100 to 150 is +50%', () => {
    const r = calcPercentage({ a: 100, b: 150, mode: 'change' })
    expect(r?.result).toBeCloseTo(50)
  })
  it('% change from 200 to 150 is -25%', () => {
    const r = calcPercentage({ a: 200, b: 150, mode: 'change' })
    expect(r?.result).toBeCloseTo(-25)
  })
  it('returns null when a is 0', () => {
    const r = calcPercentage({ a: 0, b: 100, mode: 'change' })
    expect(r).toBeNull()
  })
})
