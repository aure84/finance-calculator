export interface SalaryInput {
  annualSalary: number
  filingStatus: 'single' | 'married'
}

export interface SalaryResult {
  grossAnnual: number
  federalTax: number
  socialSecurity: number
  medicare: number
  fica: number
  netAnnual: number
  netMonthly: number
  netBiweekly: number
  netWeekly: number
  netHourly: number
  effectiveRate: number
}

// 2026 federal tax brackets
const BRACKETS_SINGLE = [
  { rate: 0.10, min: 0,       max: 11925 },
  { rate: 0.12, min: 11925,   max: 48475 },
  { rate: 0.22, min: 48475,   max: 103350 },
  { rate: 0.24, min: 103350,  max: 197300 },
  { rate: 0.32, min: 197300,  max: 250525 },
  { rate: 0.35, min: 250525,  max: 626350 },
  { rate: 0.37, min: 626350,  max: Infinity },
]

const BRACKETS_MARRIED = [
  { rate: 0.10, min: 0,       max: 23850 },
  { rate: 0.12, min: 23850,   max: 96950 },
  { rate: 0.22, min: 96950,   max: 206700 },
  { rate: 0.24, min: 206700,  max: 394600 },
  { rate: 0.32, min: 394600,  max: 501050 },
  { rate: 0.35, min: 501050,  max: 751600 },
  { rate: 0.37, min: 751600,  max: Infinity },
]

const STANDARD_DEDUCTION_SINGLE = 15000
const STANDARD_DEDUCTION_MARRIED = 30000
const SS_WAGE_BASE = 176100
const SS_RATE = 0.062
const MEDICARE_RATE = 0.0145

function calcFederalTax(taxableIncome: number, filingStatus: 'single' | 'married'): number {
  const brackets = filingStatus === 'single' ? BRACKETS_SINGLE : BRACKETS_MARRIED
  let tax = 0
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break
    const taxableAtRate = Math.min(taxableIncome, bracket.max) - bracket.min
    tax += taxableAtRate * bracket.rate
  }
  return tax
}

export function calcSalary(input: SalaryInput): SalaryResult {
  const { annualSalary, filingStatus } = input
  const deduction = filingStatus === 'single' ? STANDARD_DEDUCTION_SINGLE : STANDARD_DEDUCTION_MARRIED
  const taxableIncome = Math.max(0, annualSalary - deduction)
  const federalTax = calcFederalTax(taxableIncome, filingStatus)
  const socialSecurity = Math.min(annualSalary, SS_WAGE_BASE) * SS_RATE
  const medicare = annualSalary * MEDICARE_RATE
  const fica = socialSecurity + medicare
  const netAnnual = annualSalary - federalTax - fica

  return {
    grossAnnual: annualSalary,
    federalTax,
    socialSecurity,
    medicare,
    fica,
    netAnnual,
    netMonthly: netAnnual / 12,
    netBiweekly: netAnnual / 26,
    netWeekly: netAnnual / 52,
    netHourly: netAnnual / 2080,
    effectiveRate: annualSalary > 0 ? (federalTax + fica) / annualSalary : 0,
  }
}
