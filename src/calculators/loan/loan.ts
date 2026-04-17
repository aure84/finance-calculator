export interface LoanInput {
  amount: number
  annualRate: number   // percentage
  termMonths: number
}

export interface LoanResult {
  monthlyPayment: number
  totalCost: number
  totalInterest: number
}

export function calcLoan(input: LoanInput): LoanResult {
  const { amount, annualRate, termMonths } = input
  const r = annualRate / 100 / 12

  const monthlyPayment = r === 0
    ? amount / termMonths
    : amount * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1)

  const totalCost = monthlyPayment * termMonths
  const totalInterest = totalCost - amount

  return { monthlyPayment, totalCost, totalInterest }
}
