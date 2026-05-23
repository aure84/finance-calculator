export interface BudgetInput {
  monthlyIncome: number
  needsPct: number
  wantsPct: number
  savingsPct: number
}

export interface BudgetResult {
  needs: number
  wants: number
  savings: number
  needsAnnual: number
  wantsAnnual: number
  savingsAnnual: number
  totalPct: number
}

export function calcBudget(input: BudgetInput): BudgetResult {
  const { monthlyIncome, needsPct, wantsPct, savingsPct } = input
  const needs = monthlyIncome * needsPct / 100
  const wants = monthlyIncome * wantsPct / 100
  const savings = monthlyIncome * savingsPct / 100
  return {
    needs,
    wants,
    savings,
    needsAnnual: needs * 12,
    wantsAnnual: wants * 12,
    savingsAnnual: savings * 12,
    totalPct: needsPct + wantsPct + savingsPct,
  }
}
