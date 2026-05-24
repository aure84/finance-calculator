interface WebApplicationSchemaProps {
  name: string
  description: string
  url: string
  applicationCategory?: string
}

export default function WebApplicationSchema({
  name,
  description,
  url,
  applicationCategory = 'FinanceApplication',
}: WebApplicationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'Finance Fast',
      url: 'https://finance-fast.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
