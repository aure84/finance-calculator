export interface Debt {
  id: string
  name: string
  balance: number
  apr: number       // percentage
  minPayment: number
}

export interface DebtPayoffInput {
  debts: Debt[]
  extraPayment: number
  method: 'snowball' | 'avalanche'
}

export interface PayoffDebt {
  id: string
  name: string
  monthsPaidOff: number
  totalInterestPaid: number
}

export interface DebtPayoffResult {
  monthsToPayoff: number
  totalInterest: number
  totalPaid: number
  payoffOrder: PayoffDebt[]
}

export function calcDebtPayoff(input: DebtPayoffInput): DebtPayoffResult {
  const { extraPayment, method } = input
  let balances = input.debts.map(d => ({ ...d, balance: d.balance, interestPaid: 0 }))
  const payoffOrder: PayoffDebt[] = []
  let month = 0
  const MAX_MONTHS = 600

  while (balances.some(d => d.balance > 0) && month < MAX_MONTHS) {
    month++

    // Sort target debt
    const active = balances.filter(d => d.balance > 0)
    const target = method === 'snowball'
      ? active.sort((a, b) => a.balance - b.balance)[0]
      : active.sort((a, b) => b.apr - a.apr)[0]

    for (const debt of balances) {
      if (debt.balance <= 0) continue
      const monthlyRate = debt.apr / 100 / 12
      const interest = debt.balance * monthlyRate
      debt.interestPaid += interest
      let payment = debt.minPayment
      if (debt.id === target.id) payment += extraPayment
      payment = Math.min(payment, debt.balance + interest)
      debt.balance = Math.max(0, debt.balance + interest - payment)

      if (debt.balance === 0 && !payoffOrder.find(p => p.id === debt.id)) {
        payoffOrder.push({
          id: debt.id,
          name: debt.name,
          monthsPaidOff: month,
          totalInterestPaid: debt.interestPaid,
        })
      }
    }
  }

  const totalInterest = balances.reduce((sum, d) => sum + d.interestPaid, 0)
  const totalPaid = input.debts.reduce((sum, d) => sum + d.balance, 0) + totalInterest

  return { monthsToPayoff: month, totalInterest, totalPaid, payoffOrder }
}
