import { describe, it, expect } from 'vitest'
import { calcVat } from './vat'

describe('calcVat — add mode', () => {
  it('adds 20% VAT correctly', () => {
    const r = calcVat({ amount: 100, rate: 20, mode: 'add' })
    expect(r.netPrice).toBe(100)
    expect(r.vatAmount).toBeCloseTo(20)
    expect(r.grossPrice).toBeCloseTo(120)
  })

  it('adds 27% VAT correctly', () => {
    const r = calcVat({ amount: 100, rate: 27, mode: 'add' })
    expect(r.vatAmount).toBeCloseTo(27)
    expect(r.grossPrice).toBeCloseTo(127)
  })

  it('handles 0% VAT', () => {
    const r = calcVat({ amount: 200, rate: 0, mode: 'add' })
    expect(r.vatAmount).toBe(0)
    expect(r.grossPrice).toBe(200)
  })
})

describe('calcVat — remove mode', () => {
  it('removes 20% VAT correctly', () => {
    const r = calcVat({ amount: 120, rate: 20, mode: 'remove' })
    expect(r.grossPrice).toBe(120)
    expect(r.netPrice).toBeCloseTo(100)
    expect(r.vatAmount).toBeCloseTo(20)
  })

  it('removes 27% VAT correctly', () => {
    const r = calcVat({ amount: 127, rate: 27, mode: 'remove' })
    expect(r.netPrice).toBeCloseTo(100)
    expect(r.vatAmount).toBeCloseTo(27)
  })

  it('add and remove are inverse operations', () => {
    const added = calcVat({ amount: 250, rate: 21, mode: 'add' })
    const removed = calcVat({ amount: added.grossPrice, rate: 21, mode: 'remove' })
    expect(removed.netPrice).toBeCloseTo(250)
  })
})
