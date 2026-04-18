export interface SavingsGoalInput {
  goalAmount: number
  currentSavings: number
  monthlyContribution: number
  annualReturn: number
}

export interface SavingsGoalResult {
  months: number
  years: number
  totalContributions: number
  totalInterest: number
}

export function calcSavingsGoal(input: SavingsGoalInput): SavingsGoalResult | null {
  const { goalAmount, currentSavings, monthlyContribution, annualReturn } = input

  if (currentSavings >= goalAmount) {
    return { months: 0, years: 0, totalContributions: currentSavings, totalInterest: 0 }
  }

  if (monthlyContribution <= 0 && annualReturn <= 0) return null

  const r = annualReturn / 100 / 12

  let months: number
  if (r === 0) {
    months = Math.ceil((goalAmount - currentSavings) / monthlyContribution)
  } else {
    const numerator = goalAmount * r + monthlyContribution
    const denominator = currentSavings * r + monthlyContribution
    if (denominator <= 0) return null
    months = Math.ceil(Math.log(numerator / denominator) / Math.log(1 + r))
  }

  const totalContributions = currentSavings + monthlyContribution * months
  const totalInterest = Math.max(0, goalAmount - totalContributions)

  return {
    months,
    years: Math.round((months / 12) * 10) / 10,
    totalContributions,
    totalInterest,
  }
}
