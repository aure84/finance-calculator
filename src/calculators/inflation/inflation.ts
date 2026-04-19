export type InflationMode = 'future' | 'historical'

export interface InflationInput {
  amount: number
  rate: number
  years: number
  mode: InflationMode
}

export interface InflationResult {
  adjustedValue: number
  totalChangePercent: number
  difference: number
}

export function calcInflation(input: InflationInput): InflationResult {
  const { amount, rate, years, mode } = input
  const r = rate / 100
  const factor = Math.pow(1 + r, years)

  const adjustedValue = mode === 'future' ? amount / factor : amount * factor
  const difference = adjustedValue - amount
  const totalChangePercent = (difference / amount) * 100

  return { adjustedValue, totalChangePercent, difference }
}
