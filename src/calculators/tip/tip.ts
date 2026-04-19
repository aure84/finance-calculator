export interface TipInput {
  bill: number
  tipPercent: number
  people: number
}

export interface TipResult {
  tipAmount: number
  totalAmount: number
  perPerson: number
  tipPerPerson: number
}

export function calcTip(input: TipInput): TipResult | null {
  const { bill, tipPercent, people } = input
  if (bill <= 0 || people <= 0 || tipPercent < 0) return null

  const tipAmount = bill * (tipPercent / 100)
  const totalAmount = bill + tipAmount

  return {
    tipAmount,
    totalAmount,
    perPerson: totalAmount / people,
    tipPerPerson: tipAmount / people,
  }
}
