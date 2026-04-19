import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import RelatedCalculators from './RelatedCalculators'

const LINKS = [
  { label: 'Loan Calculator', to: '/loan', description: 'Calculate monthly loan payments.' },
  { label: 'Debt Payoff Calculator', to: '/debt-payoff', description: 'Compare snowball vs avalanche.' },
]

describe('RelatedCalculators', () => {
  it('renders the default heading', () => {
    render(
      <MemoryRouter>
        <RelatedCalculators links={LINKS} />
      </MemoryRouter>
    )
    expect(screen.getByText('Related Calculators')).toBeTruthy()
  })

  it('renders a custom title when provided', () => {
    render(
      <MemoryRouter>
        <RelatedCalculators links={LINKS} title="Related Guides" />
      </MemoryRouter>
    )
    expect(screen.getByText('Related Guides')).toBeTruthy()
  })

  it('renders the correct number of links', () => {
    render(
      <MemoryRouter>
        <RelatedCalculators links={LINKS} />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })

  it('renders each link label and description', () => {
    render(
      <MemoryRouter>
        <RelatedCalculators links={LINKS} />
      </MemoryRouter>
    )
    expect(screen.getByText('Loan Calculator')).toBeTruthy()
    expect(screen.getByText('Calculate monthly loan payments.')).toBeTruthy()
    expect(screen.getByText('Debt Payoff Calculator')).toBeTruthy()
    expect(screen.getByText('Compare snowball vs avalanche.')).toBeTruthy()
  })

  it('each link points to the correct path', () => {
    render(
      <MemoryRouter>
        <RelatedCalculators links={LINKS} />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links[0].getAttribute('href')).toBe('/loan')
    expect(links[1].getAttribute('href')).toBe('/debt-payoff')
  })
})
