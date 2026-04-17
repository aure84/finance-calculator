import { formatCurrency, formatPercent, formatNumber } from './format'

describe('formatCurrency', () => {
  it('formats whole dollars', () => {
    expect(formatCurrency(1234)).toBe('$1,234.00')
  })
  it('formats cents', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })
  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
  it('formats large numbers', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })
})

describe('formatPercent', () => {
  it('formats decimal as percent', () => {
    expect(formatPercent(0.065)).toBe('6.50%')
  })
  it('formats zero', () => {
    expect(formatPercent(0)).toBe('0.00%')
  })
})

describe('formatNumber', () => {
  it('formats with commas', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
  })
})
