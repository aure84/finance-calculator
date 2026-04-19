export type VatMode = 'add' | 'remove'

export interface VatInput {
  amount: number   // net price (add mode) or gross price (remove mode)
  rate: number     // VAT rate as percentage (e.g. 20)
  mode: VatMode
}

export interface VatResult {
  netPrice: number
  vatAmount: number
  grossPrice: number
}

export function calcVat(input: VatInput): VatResult {
  const { amount, rate, mode } = input
  const r = rate / 100

  if (mode === 'add') {
    const netPrice = amount
    const vatAmount = netPrice * r
    const grossPrice = netPrice + vatAmount
    return { netPrice, vatAmount, grossPrice }
  } else {
    const grossPrice = amount
    const netPrice = grossPrice / (1 + r)
    const vatAmount = grossPrice - netPrice
    return { netPrice, vatAmount, grossPrice }
  }
}
