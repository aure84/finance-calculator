import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FAQSchema from './FAQSchema'

describe('FAQSchema', () => {
  it('renders a script tag with application/ld+json type', () => {
    const { container } = render(
      <FAQSchema items={[{ q: 'What is X?', a: 'X is Y.' }]} />
    )
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
  })

  it('includes FAQPage @type in JSON output', () => {
    const { container } = render(
      <FAQSchema items={[{ q: 'What is X?', a: 'X is Y.' }]} />
    )
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.innerHTML)
    expect(json['@type']).toBe('FAQPage')
    expect(json['@context']).toBe('https://schema.org')
  })

  it('maps each item to a Question with acceptedAnswer', () => {
    const { container } = render(
      <FAQSchema items={[
        { q: 'Question one?', a: 'Answer one.' },
        { q: 'Question two?', a: 'Answer two.' },
      ]} />
    )
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.innerHTML)
    expect(json.mainEntity).toHaveLength(2)
    expect(json.mainEntity[0]['@type']).toBe('Question')
    expect(json.mainEntity[0].name).toBe('Question one?')
    expect(json.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
    expect(json.mainEntity[0].acceptedAnswer.text).toBe('Answer one.')
  })
})
