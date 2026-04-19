import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import BlogIndexPage from './BlogIndexPage'
import { blogPosts } from '../data/blogPosts'

describe('BlogIndexPage', () => {
  it('renders the page title', () => {
    render(<MemoryRouter><BlogIndexPage /></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
  })

  it('renders a card for every blog post', () => {
    render(<MemoryRouter><BlogIndexPage /></MemoryRouter>)
    const links = screen.getAllByRole('link').filter(l =>
      l.getAttribute('href')?.startsWith('/blog/')
    )
    expect(links.length).toBe(blogPosts.length)
  })

  it('renders the first post title', () => {
    render(<MemoryRouter><BlogIndexPage /></MemoryRouter>)
    expect(screen.getByText(blogPosts[0].title)).toBeTruthy()
  })

  it('each card links to the correct blog post slug', () => {
    render(<MemoryRouter><BlogIndexPage /></MemoryRouter>)
    const blogLinks = screen.getAllByRole('link').filter(l =>
      l.getAttribute('href')?.startsWith('/blog/')
    )
    blogPosts.forEach((post, i) => {
      expect(blogLinks[i].getAttribute('href')).toBe(`/blog/${post.slug}`)
    })
  })

  it('renders the breadcrumb Home link', () => {
    render(<MemoryRouter><BlogIndexPage /></MemoryRouter>)
    const homeLink = screen.getAllByRole('link').find(l => l.getAttribute('href') === '/')
    expect(homeLink).toBeTruthy()
  })
})
