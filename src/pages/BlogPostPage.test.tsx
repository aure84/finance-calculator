import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import BlogPostPage from './BlogPostPage'
import { blogPosts } from '../data/blogPosts'

function renderPost(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('BlogPostPage', () => {
  const post = blogPosts[0]

  it('renders the post title as h1', () => {
    renderPost(post.slug)
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
    expect(screen.getByText(post.title)).toBeTruthy()
  })

  it('renders the intro paragraph', () => {
    renderPost(post.slug)
    expect(screen.getByText(post.intro)).toBeTruthy()
  })

  it('renders all section headings', () => {
    renderPost(post.slug)
    post.sections.forEach(section => {
      expect(screen.getByText(section.heading)).toBeTruthy()
    })
  })

  it('renders the disclaimer', () => {
    renderPost(post.slug)
    expect(screen.getByText(/general educational purposes only/i)).toBeTruthy()
  })

  it('renders related calculator links', () => {
    renderPost(post.slug)
    post.relatedLinks.forEach(link => {
      expect(screen.getAllByText(new RegExp(link.label)).length).toBeGreaterThan(0)
    })
  })

  it('renders breadcrumb with Home and Blog links', () => {
    renderPost(post.slug)
    const homeLink = screen.getAllByRole('link').find(l => l.getAttribute('href') === '/')
    const blogLink = screen.getAllByRole('link').find(l => l.getAttribute('href') === '/blog')
    expect(homeLink).toBeTruthy()
    expect(blogLink).toBeTruthy()
  })

  it('renders 404 message for unknown slug', () => {
    renderPost('this-does-not-exist')
    expect(screen.getByText(/post not found/i)).toBeTruthy()
  })

  it('renders all 20 posts without error', () => {
    blogPosts.forEach(p => {
      const { unmount } = renderPost(p.slug)
      expect(screen.getAllByText(p.title).length).toBeGreaterThan(0)
      unmount()
    })
  })

  it('applies formulaCallout class to first paragraph of "The Refund Formula" section', () => {
    renderPost('how-tax-refund-is-calculated')
    const callout = document.querySelector('[class*="formulaCallout"]')
    expect(callout).not.toBeNull()
    expect(callout?.textContent).toContain('Refund = Total tax withheld')
  })
})
