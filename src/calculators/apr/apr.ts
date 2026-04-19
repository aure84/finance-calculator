export interface AprInput {
  loanAmount: number
  nominalRate: number  // annual %, e.g. 5
  termMonths: number
  fees: number         // upfront fees in $
}

export interface AprResult {
  apr: number
  monthlyPayment: number
  totalInterest: number
  totalCost: number     // total interest + fees
}

function monthlyPayment(principal: number, monthlyRate: number, n: number): number {
  if (monthlyRate === 0) return principal / n
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
}

function presentValue(payment: number, monthlyRate: number, n: number): number {
  if (monthlyRate === 0) return payment * n
  return payment * (1 - Math.pow(1 + monthlyRate, -n)) / monthlyRate
}

export function calcApr(input: AprInput): AprResult | null {
  const { loanAmount, nominalRate, termMonths, fees } = input
  if (loanAmount <= 0 || termMonths <= 0 || nominalRate < 0) return null

  const nominalMonthly = nominalRate / 100 / 12
  const payment = monthlyPayment(loanAmount, nominalMonthly, termMonths)
  const effectivePrincipal = loanAmount - fees

  if (effectivePrincipal <= 0) return null

  // Bisection to find monthly APR rate
  let low = 0
  let high = 5  // 500% annual, more than enough
  for (let i = 0; i < 200; i++) {
    const mid = (low + high) / 2
    const pv = presentValue(payment, mid / 12, termMonths)
    if (pv > effectivePrincipal) low = mid
    else high = mid
  }

  const apr = (low + high) / 2 * 100
  const totalPaid = payment * termMonths
  const totalInterest = totalPaid - loanAmount

  return {
    apr,
    monthlyPayment: payment,
    totalInterest,
    totalCost: totalInterest + fees,
  }
}
