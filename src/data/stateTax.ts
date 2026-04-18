export interface StateBracket {
  min: number
  max: number
  rate: number  // decimal, e.g. 0.05 for 5%
}

export interface StateInfo {
  id: string    // two-letter code
  name: string
  brackets: StateBracket[]  // empty = no income tax; single = flat rate
}

export const STATES: StateInfo[] = [
  { id: 'AL', name: 'Alabama', brackets: [{ min: 0, max: 500, rate: 0.02 }, { min: 500, max: 3000, rate: 0.04 }, { min: 3000, max: Infinity, rate: 0.05 }] },
  { id: 'AK', name: 'Alaska', brackets: [] },
  { id: 'AZ', name: 'Arizona', brackets: [{ min: 0, max: Infinity, rate: 0.025 }] },
  { id: 'AR', name: 'Arkansas', brackets: [{ min: 0, max: 4999, rate: 0.02 }, { min: 4999, max: 24999, rate: 0.04 }, { min: 24999, max: Infinity, rate: 0.047 }] },
  { id: 'CA', name: 'California', brackets: [{ min: 0, max: 10756, rate: 0.01 }, { min: 10756, max: 25499, rate: 0.02 }, { min: 25499, max: 40245, rate: 0.04 }, { min: 40245, max: 55866, rate: 0.06 }, { min: 55866, max: 70606, rate: 0.08 }, { min: 70606, max: 360659, rate: 0.093 }, { min: 360659, max: 432787, rate: 0.103 }, { min: 432787, max: 721315, rate: 0.113 }, { min: 721315, max: Infinity, rate: 0.123 }] },
  { id: 'CO', name: 'Colorado', brackets: [{ min: 0, max: Infinity, rate: 0.044 }] },
  { id: 'CT', name: 'Connecticut', brackets: [{ min: 0, max: 10000, rate: 0.03 }, { min: 10000, max: 50000, rate: 0.05 }, { min: 50000, max: 100000, rate: 0.055 }, { min: 100000, max: 200000, rate: 0.06 }, { min: 200000, max: 250000, rate: 0.065 }, { min: 250000, max: 500000, rate: 0.069 }, { min: 500000, max: Infinity, rate: 0.0699 }] },
  { id: 'DE', name: 'Delaware', brackets: [{ min: 0, max: 2000, rate: 0 }, { min: 2000, max: 5000, rate: 0.022 }, { min: 5000, max: 10000, rate: 0.039 }, { min: 10000, max: 20000, rate: 0.048 }, { min: 20000, max: 25000, rate: 0.052 }, { min: 25000, max: 60000, rate: 0.0555 }, { min: 60000, max: Infinity, rate: 0.066 }] },
  { id: 'DC', name: 'District of Columbia', brackets: [{ min: 0, max: 10000, rate: 0.04 }, { min: 10000, max: 40000, rate: 0.06 }, { min: 40000, max: 60000, rate: 0.065 }, { min: 60000, max: 250000, rate: 0.085 }, { min: 250000, max: 500000, rate: 0.0925 }, { min: 500000, max: 1000000, rate: 0.0975 }, { min: 1000000, max: Infinity, rate: 0.1075 }] },
  { id: 'FL', name: 'Florida', brackets: [] },
  { id: 'GA', name: 'Georgia', brackets: [{ min: 0, max: Infinity, rate: 0.0549 }] },
  { id: 'HI', name: 'Hawaii', brackets: [{ min: 0, max: 2400, rate: 0.014 }, { min: 2400, max: 4800, rate: 0.032 }, { min: 4800, max: 9600, rate: 0.055 }, { min: 9600, max: 14400, rate: 0.064 }, { min: 14400, max: 19200, rate: 0.068 }, { min: 19200, max: 24000, rate: 0.072 }, { min: 24000, max: 36000, rate: 0.076 }, { min: 36000, max: 48000, rate: 0.079 }, { min: 48000, max: 150000, rate: 0.0825 }, { min: 150000, max: 175000, rate: 0.09 }, { min: 175000, max: 200000, rate: 0.10 }, { min: 200000, max: Infinity, rate: 0.11 }] },
  { id: 'ID', name: 'Idaho', brackets: [{ min: 0, max: Infinity, rate: 0.058 }] },
  { id: 'IL', name: 'Illinois', brackets: [{ min: 0, max: Infinity, rate: 0.0495 }] },
  { id: 'IN', name: 'Indiana', brackets: [{ min: 0, max: Infinity, rate: 0.0305 }] },
  { id: 'IA', name: 'Iowa', brackets: [{ min: 0, max: Infinity, rate: 0.044 }] },
  { id: 'KS', name: 'Kansas', brackets: [{ min: 0, max: 15000, rate: 0.031 }, { min: 15000, max: 30000, rate: 0.0525 }, { min: 30000, max: Infinity, rate: 0.057 }] },
  { id: 'KY', name: 'Kentucky', brackets: [{ min: 0, max: Infinity, rate: 0.04 }] },
  { id: 'LA', name: 'Louisiana', brackets: [{ min: 0, max: 12500, rate: 0.0185 }, { min: 12500, max: 50000, rate: 0.035 }, { min: 50000, max: Infinity, rate: 0.0425 }] },
  { id: 'ME', name: 'Maine', brackets: [{ min: 0, max: 26050, rate: 0.058 }, { min: 26050, max: 61600, rate: 0.0675 }, { min: 61600, max: Infinity, rate: 0.0715 }] },
  { id: 'MD', name: 'Maryland', brackets: [{ min: 0, max: 1000, rate: 0.02 }, { min: 1000, max: 2000, rate: 0.03 }, { min: 2000, max: 3000, rate: 0.04 }, { min: 3000, max: 100000, rate: 0.0475 }, { min: 100000, max: 125000, rate: 0.05 }, { min: 125000, max: 150000, rate: 0.0525 }, { min: 150000, max: 250000, rate: 0.055 }, { min: 250000, max: Infinity, rate: 0.0575 }] },
  { id: 'MA', name: 'Massachusetts', brackets: [{ min: 0, max: Infinity, rate: 0.05 }] },
  { id: 'MI', name: 'Michigan', brackets: [{ min: 0, max: Infinity, rate: 0.0425 }] },
  { id: 'MN', name: 'Minnesota', brackets: [{ min: 0, max: 31690, rate: 0.0535 }, { min: 31690, max: 104090, rate: 0.068 }, { min: 104090, max: 193240, rate: 0.0785 }, { min: 193240, max: Infinity, rate: 0.0985 }] },
  { id: 'MS', name: 'Mississippi', brackets: [{ min: 0, max: Infinity, rate: 0.047 }] },
  { id: 'MO', name: 'Missouri', brackets: [{ min: 0, max: 1207, rate: 0.015 }, { min: 1207, max: 2414, rate: 0.02 }, { min: 2414, max: 3621, rate: 0.025 }, { min: 3621, max: 4828, rate: 0.03 }, { min: 4828, max: 6035, rate: 0.035 }, { min: 6035, max: 7242, rate: 0.04 }, { min: 7242, max: 8432, rate: 0.045 }, { min: 8432, max: Infinity, rate: 0.048 }] },
  { id: 'MT', name: 'Montana', brackets: [{ min: 0, max: Infinity, rate: 0.059 }] },
  { id: 'NE', name: 'Nebraska', brackets: [{ min: 0, max: 3700, rate: 0.0246 }, { min: 3700, max: 22170, rate: 0.0351 }, { min: 22170, max: 35730, rate: 0.0501 }, { min: 35730, max: Infinity, rate: 0.0584 }] },
  { id: 'NV', name: 'Nevada', brackets: [] },
  { id: 'NH', name: 'New Hampshire', brackets: [] },
  { id: 'NJ', name: 'New Jersey', brackets: [{ min: 0, max: 20000, rate: 0.014 }, { min: 20000, max: 35000, rate: 0.0175 }, { min: 35000, max: 40000, rate: 0.035 }, { min: 40000, max: 75000, rate: 0.05525 }, { min: 75000, max: 500000, rate: 0.0637 }, { min: 500000, max: 1000000, rate: 0.0897 }, { min: 1000000, max: Infinity, rate: 0.1075 }] },
  { id: 'NM', name: 'New Mexico', brackets: [{ min: 0, max: 5500, rate: 0.017 }, { min: 5500, max: 11000, rate: 0.032 }, { min: 11000, max: 16000, rate: 0.047 }, { min: 16000, max: 210000, rate: 0.049 }, { min: 210000, max: Infinity, rate: 0.059 }] },
  { id: 'NY', name: 'New York', brackets: [{ min: 0, max: 17150, rate: 0.04 }, { min: 17150, max: 23600, rate: 0.045 }, { min: 23600, max: 27900, rate: 0.0525 }, { min: 27900, max: 161550, rate: 0.0585 }, { min: 161550, max: 323200, rate: 0.0625 }, { min: 323200, max: 2155350, rate: 0.0685 }, { min: 2155350, max: 5000000, rate: 0.0965 }, { min: 5000000, max: 25000000, rate: 0.103 }, { min: 25000000, max: Infinity, rate: 0.109 }] },
  { id: 'NC', name: 'North Carolina', brackets: [{ min: 0, max: Infinity, rate: 0.045 }] },
  { id: 'ND', name: 'North Dakota', brackets: [{ min: 0, max: 44725, rate: 0.011 }, { min: 44725, max: 225975, rate: 0.0204 }, { min: 225975, max: Infinity, rate: 0.029 }] },
  { id: 'OH', name: 'Ohio', brackets: [{ min: 0, max: 26050, rate: 0 }, { min: 26050, max: 100000, rate: 0.02765 }, { min: 100000, max: Infinity, rate: 0.0399 }] },
  { id: 'OK', name: 'Oklahoma', brackets: [{ min: 0, max: 1000, rate: 0.0025 }, { min: 1000, max: 2500, rate: 0.0075 }, { min: 2500, max: 3750, rate: 0.0175 }, { min: 3750, max: 4900, rate: 0.0275 }, { min: 4900, max: 7200, rate: 0.0375 }, { min: 7200, max: Infinity, rate: 0.0475 }] },
  { id: 'OR', name: 'Oregon', brackets: [{ min: 0, max: 18400, rate: 0.0475 }, { min: 18400, max: 46200, rate: 0.0675 }, { min: 46200, max: 250000, rate: 0.0875 }, { min: 250000, max: Infinity, rate: 0.099 }] },
  { id: 'PA', name: 'Pennsylvania', brackets: [{ min: 0, max: Infinity, rate: 0.0307 }] },
  { id: 'RI', name: 'Rhode Island', brackets: [{ min: 0, max: 73450, rate: 0.0375 }, { min: 73450, max: 166950, rate: 0.0475 }, { min: 166950, max: Infinity, rate: 0.0599 }] },
  { id: 'SC', name: 'South Carolina', brackets: [{ min: 0, max: 3200, rate: 0 }, { min: 3200, max: 16040, rate: 0.03 }, { min: 16040, max: Infinity, rate: 0.064 }] },
  { id: 'SD', name: 'South Dakota', brackets: [] },
  { id: 'TN', name: 'Tennessee', brackets: [] },
  { id: 'TX', name: 'Texas', brackets: [] },
  { id: 'UT', name: 'Utah', brackets: [{ min: 0, max: Infinity, rate: 0.0485 }] },
  { id: 'VT', name: 'Vermont', brackets: [{ min: 0, max: 45400, rate: 0.0335 }, { min: 45400, max: 110050, rate: 0.066 }, { min: 110050, max: 229550, rate: 0.076 }, { min: 229550, max: Infinity, rate: 0.0875 }] },
  { id: 'VA', name: 'Virginia', brackets: [{ min: 0, max: 3000, rate: 0.02 }, { min: 3000, max: 5000, rate: 0.03 }, { min: 5000, max: 17000, rate: 0.05 }, { min: 17000, max: Infinity, rate: 0.0575 }] },
  { id: 'WA', name: 'Washington', brackets: [] },
  { id: 'WV', name: 'West Virginia', brackets: [{ min: 0, max: 10000, rate: 0.0236 }, { min: 10000, max: 25000, rate: 0.0315 }, { min: 25000, max: 40000, rate: 0.0354 }, { min: 40000, max: 60000, rate: 0.0472 }, { min: 60000, max: Infinity, rate: 0.0512 }] },
  { id: 'WI', name: 'Wisconsin', brackets: [{ min: 0, max: 14320, rate: 0.035 }, { min: 14320, max: 28640, rate: 0.044 }, { min: 28640, max: 315310, rate: 0.053 }, { min: 315310, max: Infinity, rate: 0.0765 }] },
  { id: 'WY', name: 'Wyoming', brackets: [] },
]

export function calcStateTax(taxableIncome: number, stateId: string): number {
  const state = STATES.find(s => s.id === stateId)
  if (!state || state.brackets.length === 0) return 0

  let tax = 0
  for (const bracket of state.brackets) {
    if (taxableIncome <= bracket.min) break
    const taxable = Math.min(taxableIncome, bracket.max) - bracket.min
    tax += taxable * bracket.rate
  }
  return tax
}
