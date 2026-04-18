import { calcStateTax } from '../../data/stateTax'

export interface RetirementInput {
  currentSavings: number
  monthlyContribution: number
  annualReturn: number  // percentage, e.g. 6 for 6%
  years: number
  stateId?: string
}

export interface RetirementResult {
  projectedBalance: number
  totalContributions: number
  totalInterest: number
  estimatedStateTax: number | null  // null when no stateId provided
  netProjectedBalance: number       // projectedBalance - estimatedStateTax (or projectedBalance when no state)
}

export function calcRetirement(input: RetirementInput): RetirementResult {
  const { currentSavings, monthlyContribution, annualReturn, years, stateId } = input
  const r = annualReturn / 100 / 12
  const n = years * 12

  const fvSavings = currentSavings * Math.pow(1 + r, n)
  const fvContributions = r === 0
    ? monthlyContribution * n
    : monthlyContribution * ((Math.pow(1 + r, n) - 1) / r)

  const projectedBalance = fvSavings + fvContributions
  const totalContributions = currentSavings + monthlyContribution * n
  const totalInterest = projectedBalance - totalContributions

  const estimatedStateTax = stateId != null ? calcStateTax(projectedBalance, stateId) : null
  const netProjectedBalance = projectedBalance - (estimatedStateTax ?? 0)

  return {
    projectedBalance,
    totalContributions,
    totalInterest,
    estimatedStateTax,
    netProjectedBalance,
  }
}
