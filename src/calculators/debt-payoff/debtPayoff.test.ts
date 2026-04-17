import { calcDebtPayoff, type Debt } from './debtPayoff'

const debts: Debt[] = [
  { id: '1', name: 'Credit Card A', balance: 5000, apr: 20, minPayment: 100 },
  { id: '2', name: 'Credit Card B', balance: 2000, apr: 15, minPayment: 50 },
]

describe('calcDebtPayoff', () => {
  it('snowball pays smallest balance first', () => {
    const result = calcDebtPayoff({ debts, extraPayment: 100, method: 'snowball' })
    // Card B (smaller balance) should be paid off first
    expect(result.payoffOrder[0].id).toBe('2')
  })

  it('avalanche pays highest interest first', () => {
    const result = calcDebtPayoff({ debts, extraPayment: 100, method: 'avalanche' })
    // Card A (higher APR) should be paid off first
    expect(result.payoffOrder[0].id).toBe('1')
  })

  it('avalanche pays less total interest than snowball', () => {
    const snowball = calcDebtPayoff({ debts, extraPayment: 100, method: 'snowball' })
    const avalanche = calcDebtPayoff({ debts, extraPayment: 100, method: 'avalanche' })
    expect(avalanche.totalInterest).toBeLessThanOrEqual(snowball.totalInterest)
  })

  it('returns months to payoff', () => {
    const result = calcDebtPayoff({ debts, extraPayment: 0, method: 'avalanche' })
    expect(result.monthsToPayoff).toBeGreaterThan(0)
  })
})
