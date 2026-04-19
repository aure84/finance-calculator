export type PercentageMode = 'of' | 'is' | 'change'

export interface PercentageInput {
  a: number
  b: number
  mode: PercentageMode
}

export interface PercentageResult {
  result: number
  label: string
}

export function calcPercentage(input: PercentageInput): PercentageResult | null {
  const { a, b, mode } = input

  if (mode === 'of') {
    return { result: (a / 100) * b, label: 'Result' }
  }

  if (mode === 'is') {
    if (b === 0) return null
    return { result: (a / b) * 100, label: 'Percentage' }
  }

  if (mode === 'change') {
    if (a === 0) return null
    return { result: ((b - a) / Math.abs(a)) * 100, label: '% Change' }
  }

  return null
}
