export interface CreditCardInput {
  balance: number
  apr: number
  monthlyPayment: number
}

export interface PayoffResult {
  months: number
  totalInterest: number
  totalPaid: number
}

export interface CreditCardOutput {
  result: PayoffResult
  minPayment: number
  minResult: PayoffResult | null
}

function simulate(balance: number, apr: number, payment: number): PayoffResult | null {
  if (apr === 0) {
    const months = Math.ceil(balance / payment)
    return { months, totalInterest: 0, totalPaid: balance }
  }
  const monthlyRate = apr / 100 / 12
  let remaining = balance
  let months = 0
  let totalInterest = 0
  while (remaining > 0.01 && months < 1200) {
    const interest = Math.round(remaining * monthlyRate * 100) / 100
    if (payment <= interest) return null
    totalInterest += interest
    remaining = remaining + interest - payment
    if (remaining < 0) remaining = 0
    months++
  }
  return { months, totalInterest, totalPaid: balance + totalInterest }
}

export function calcCreditCard(
  input: CreditCardInput
): CreditCardOutput | { error: 'payment_too_low' } {
  const { balance, apr, monthlyPayment } = input
  const result = simulate(balance, apr, monthlyPayment)
  if (!result) return { error: 'payment_too_low' }
  const minPayment = Math.max(25, balance * 0.02)
  const minResult = simulate(balance, apr, minPayment)
  return { result, minPayment, minResult }
}
