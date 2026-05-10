export interface CAGRInput {
  startValue: number
  endValue: number
  years: number
}

export interface CAGROutput {
  cagr: number
  totalReturn: number
  totalProfit: number
}

export interface FutureValueInput {
  startValue: number
  annualReturn: number
  years: number
}

export interface YearRow {
  year: number
  value: number
  gain: number
}

export interface FutureValueOutput {
  finalValue: number
  totalProfit: number
  totalReturn: number
  table: YearRow[]
}

export function calcCAGR(input: CAGRInput): CAGROutput | null {
  const { startValue, endValue, years } = input
  if (startValue <= 0 || years <= 0) return null
  const cagr = Math.pow(endValue / startValue, 1 / years) - 1
  const totalReturn = (endValue - startValue) / startValue
  const totalProfit = endValue - startValue
  return { cagr, totalReturn, totalProfit }
}

export function calcFutureValue(input: FutureValueInput): FutureValueOutput | null {
  const { startValue, annualReturn, years } = input
  if (startValue <= 0 || years <= 0) return null
  const rate = annualReturn / 100
  const finalValue = startValue * Math.pow(1 + rate, years)
  const totalProfit = finalValue - startValue
  const totalReturn = totalProfit / startValue
  const tableYears = Math.min(Math.floor(years), 50)
  const table: YearRow[] = []
  let prev = startValue
  for (let y = 1; y <= tableYears; y++) {
    const value = startValue * Math.pow(1 + rate, y)
    table.push({ year: y, value, gain: value - prev })
    prev = value
  }
  return { finalValue, totalProfit, totalReturn, table }
}
