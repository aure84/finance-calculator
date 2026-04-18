import { calcStateTax } from '../../data/stateTax'

export enum FilingStatus {
  Single = 'single',
  MarriedFilingJointly = 'mfj',
  MarriedFilingSeparately = 'mfs',
  HeadOfHousehold = 'hoh',
}

interface Bracket {
  rate: number
  min: number
  max: number
}

const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  [FilingStatus.Single]: 15000,
  [FilingStatus.MarriedFilingJointly]: 30000,
  [FilingStatus.MarriedFilingSeparately]: 15000,
  [FilingStatus.HeadOfHousehold]: 22500,
}

const BRACKETS: Record<FilingStatus, Bracket[]> = {
  [FilingStatus.Single]: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity },
  ],
  [FilingStatus.MarriedFilingJointly]: [
    { rate: 0.10, min: 0, max: 23850 },
    { rate: 0.12, min: 23850, max: 96950 },
    { rate: 0.22, min: 96950, max: 206700 },
    { rate: 0.24, min: 206700, max: 394600 },
    { rate: 0.32, min: 394600, max: 501050 },
    { rate: 0.35, min: 501050, max: 751600 },
    { rate: 0.37, min: 751600, max: Infinity },
  ],
  [FilingStatus.MarriedFilingSeparately]: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity },
  ],
  [FilingStatus.HeadOfHousehold]: [
    { rate: 0.10, min: 0, max: 17000 },
    { rate: 0.12, min: 17000, max: 64850 },
    { rate: 0.22, min: 64850, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250500 },
    { rate: 0.35, min: 250500, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity },
  ],
}

export interface TaxRefundInput {
  filingStatus: FilingStatus
  grossIncome: number
  federalWithheld: number
  stateId?: string
  stateWithheld?: number
}

export interface TaxRefundResult {
  taxableIncome: number
  federalTax: number
  stateTax: number | null     // null when no stateId provided
  totalTax: number            // federalTax + stateTax; equals federalTax when no state selected
  refundOrOwed: number        // federal only: |federalWithheld - federalTax|
  isRefund: boolean
  stateRefundOrOwed: number | null  // null unless both stateId and stateWithheld are provided
  stateIsRefund: boolean | null
}

export function calcTaxRefund(input: TaxRefundInput): TaxRefundResult {
  const { filingStatus, grossIncome, federalWithheld, stateId, stateWithheld } = input
  const standardDeduction = STANDARD_DEDUCTIONS[filingStatus]
  const taxableIncome = Math.max(0, grossIncome - standardDeduction)

  let federalTax = 0
  for (const bracket of BRACKETS[filingStatus]) {
    if (taxableIncome <= bracket.min) break
    const taxable = Math.min(taxableIncome, bracket.max) - bracket.min
    federalTax += taxable * bracket.rate
  }

  const stateTax = stateId != null ? calcStateTax(taxableIncome, stateId) : null
  const totalTax = federalTax + (stateTax ?? 0)

  const fedDiff = federalWithheld - federalTax

  let stateRefundOrOwed: number | null = null
  let stateIsRefund: boolean | null = null
  if (stateTax != null && stateWithheld != null) {
    const stateDiff = stateWithheld - stateTax
    stateRefundOrOwed = Math.abs(stateDiff)
    stateIsRefund = stateDiff >= 0
  }

  return {
    taxableIncome,
    federalTax,
    stateTax,
    totalTax,
    refundOrOwed: Math.abs(fedDiff),
    isRefund: fedDiff >= 0,
    stateRefundOrOwed,
    stateIsRefund,
  }
}
