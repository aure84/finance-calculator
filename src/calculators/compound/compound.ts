export interface CompoundInput {
  principal: number
  annualRate: number      // percentage, e.g. 5 for 5%
  years: number
  compoundingFrequency: number  // 1=annually, 4=quarterly, 12=monthly, 365=daily
}

export interface YearlyRow {
  year: number
  balance: number
  interestEarned: number
}

export interface CompoundResult {
  finalAmount: number
  totalInterest: number
  yearlyBreakdown: YearlyRow[]
}

export function calcCompound(input: CompoundInput): CompoundResult {
  const { principal, annualRate, years, compoundingFrequency: n } = input
  const r = annualRate / 100

  const yearlyBreakdown: YearlyRow[] = []
  let prevBalance = principal

  for (let year = 1; year <= years; year++) {
    const balance = principal * Math.pow(1 + r / n, n * year)
    yearlyBreakdown.push({
      year,
      balance,
      interestEarned: balance - prevBalance,
    })
    prevBalance = balance
  }

  const finalAmount = yearlyBreakdown[yearlyBreakdown.length - 1]?.balance ?? principal
  return { finalAmount, totalInterest: finalAmount - principal, yearlyBreakdown }
}
