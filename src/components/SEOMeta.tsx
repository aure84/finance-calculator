import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOMetaProps {
  title: string
  description: string
}

export interface CollectedMeta {
  title: string
  description: string
}

export const SSRMetaContext = createContext<((meta: CollectedMeta) => void) | null>(null)

export default function SEOMeta({ title, description }: SEOMetaProps) {
  const collect = useContext(SSRMetaContext)

  // SSR: collect meta via context (useEffect doesn't run in renderToString)
  if (collect) collect({ title, description })

  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://finance-fast.com${pathname}`
  }, [title, description, pathname])

  return null
}
