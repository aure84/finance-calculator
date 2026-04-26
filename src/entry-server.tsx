import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import AppContent from './AppContent'
import { SSRMetaContext, type CollectedMeta } from './components/SEOMeta'
import { blogPosts } from './data/blogPosts'

export function render(url: string): { appHtml: string; meta: CollectedMeta } {
  const meta: CollectedMeta = {
    title: 'Free Financial Calculators — finance-fast.com',
    description: 'Free financial calculators for salary, mortgage, loans, and more.',
  }

  const appHtml = renderToString(
    <SSRMetaContext.Provider value={(m) => { meta.title = m.title; meta.description = m.description }}>
      <MemoryRouter initialEntries={[url]}>
        <AppContent />
      </MemoryRouter>
    </SSRMetaContext.Provider>
  )

  return { appHtml, meta }
}

export function getAllRoutes(): string[] {
  const staticRoutes = [
    '/',
    '/salary-calculator',
    '/mortgage-calculator',
    '/compound-interest-calculator',
    '/loan-calculator',
    '/debt-payoff-calculator',
    '/retirement-calculator',
    '/tax-refund-calculator',
    '/savings-goal-calculator',
    '/vat-calculator',
    '/inflation-calculator',
    '/percentage-calculator',
    '/apr-calculator',
    '/tip-calculator',
    '/blog',
    '/about',
    '/contact',
    '/disclaimer',
    '/privacy-policy',
    '/terms-of-use',
    '/cookies',
  ]
  const blogRoutes = blogPosts.map(p => `/blog/${p.slug}`)
  return [...staticRoutes, ...blogRoutes]
}
