import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FormulaBox from './FormulaBox'

describe('FormulaBox', () => {
  it('renders the formula text', () => {
    render(<FormulaBox formula="Refund = Tax withheld − Tax owed" />)
    expect(screen.getByText('Refund = Tax withheld − Tax owed')).toBeTruthy()
  })

  it('renders the note when provided', () => {
    render(<FormulaBox formula="X" note="Some note text" />)
    expect(screen.getByTestId('formula-note')).toBeTruthy()
    expect(screen.getByTestId('formula-note').textContent).toBe('Some note text')
  })

  it('does not render note element when note is omitted', () => {
    render(<FormulaBox formula="X" />)
    expect(screen.queryByTestId('formula-note')).toBeNull()
  })
})
