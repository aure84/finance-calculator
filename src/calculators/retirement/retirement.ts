export interface RetirementInput {
  currentSavings: number
  monthlyContribution: number
  annualReturn: number  // percentage, e.g. 6 for 6%
  years: number
}

export interface RetirementResult {
  projectedBalance: number
  totalContributions: number
  totalInterest: number
}

export function calcRetirement(input: RetirementInput): RetirementResult {
  const { currentSavings, monthlyContribution, annualReturn, years } = input
  const r = annualReturn / 100 / 12
  const n = years * 12

  const fvSavings = currentSavings * Math.pow(1 + r, n)
  const fvContributions = r === 0
    ? monthlyContribution * n
    : monthlyContribution * ((Math.pow(1 + r, n) - 1) / r)

  const projectedBalance = fvSavings + fvContributions
  const totalContributions = currentSavings + monthlyContribution * n
  const totalInterest = projectedBalance - totalContributions

  return { projectedBalance, totalContributions, totalInterest }
}
