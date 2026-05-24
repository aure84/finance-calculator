import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOMetaProps {
  title: string
  description: string
}

export interface CollectedMeta {
  title: string
  description: string
  canonical: string
}

export const SSRMetaContext = createContext<((meta: CollectedMeta) => void) | null>(null)

const BASE_URL = 'https://finance-fast.com'

export default function SEOMeta({ title, description }: SEOMetaProps) {
  const collect = useContext(SSRMetaContext)
  const { pathname } = useLocation()
  const canonical = `${BASE_URL}${pathname}`

  // SSR: collect meta via context (useEffect doesn't run in renderToString)
  if (collect) collect({ title, description, canonical })

  useEffect(() => {
    document.title = title

    setMeta('name', 'description', description)
    setLink('canonical', canonical)

    // Open Graph
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'Finance Fast')

    // Twitter
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
  }, [title, description, pathname, canonical])

  return null
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}
