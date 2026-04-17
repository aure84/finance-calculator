export interface MortgageInput {
  principal: number
  annualRate: number  // percentage, e.g. 7 for 7%
  termYears: number
}

export interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export interface MortgageResult {
  monthlyPayment: number
  totalCost: number
  totalInterest: number
  schedule: AmortizationRow[]
}

export function calcMortgage(input: MortgageInput): MortgageResult {
  const { principal, annualRate, termYears } = input
  const r = annualRate / 100 / 12
  const n = termYears * 12

  const monthlyPayment = r === 0
    ? principal / n
    : principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

  const schedule: AmortizationRow[] = []
  let balance = principal

  for (let month = 1; month <= n; month++) {
    const interest = balance * r
    const principalPaid = monthlyPayment - interest
    balance = Math.max(0, balance - principalPaid)
    schedule.push({ month, payment: monthlyPayment, principal: principalPaid, interest, balance })
  }

  const totalCost = monthlyPayment * n
  const totalInterest = totalCost - principal

  return { monthlyPayment, totalCost, totalInterest, schedule }
}
