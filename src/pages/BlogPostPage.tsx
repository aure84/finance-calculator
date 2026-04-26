import { Link, useParams } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'
import AdSlot from '../components/AdSlot'
import MarketCrashChart from '../components/MarketCrashChart'
import { getPostBySlug, type BlogPost } from '../data/blogPosts'
import styles from './blog.module.css'

const TAG_CLASS: Record<NonNullable<BlogPost['tag']>, string> = {
  'How-To Guide':   styles.tagHowTo,
  'Quick Reference': styles.tagQuickRef,
  'Market History': styles.tagMarketHist,
}

function BlogTag({ tag }: { tag?: BlogPost['tag'] }) {
  if (!tag) return null
  return <span className={`${styles.tag} ${TAG_CLASS[tag]}`}>{tag}</span>
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <main className={styles.page}>
        <h1>Post not found</h1>
        <Link to="/blog">← Back to Blog</Link>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <SEOMeta
        title={`${post.title} | Finance Fast`}
        description={post.description}
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › <Link to="/blog">Blog</Link> › {post.title}
      </div>

      <article className={styles.article}>
        <BlogTag tag={post.tag} />
        <p className={styles.cardDate}>{post.date}</p>
        <h1 className={styles.articleTitle}>{post.title}</h1>
        {post.image && (
          <img
            src={post.image.url}
            alt={post.image.alt}
            className={styles.heroImage}
            loading="lazy"
          />
        )}
        <p className={styles.intro}>{post.intro}</p>

        {post.chart && (
          <MarketCrashChart
            title={post.chart.title}
            index={post.chart.index}
            unit={post.chart.unit}
            data={post.chart.data}
          />
        )}

        <AdSlot slot="header" />

        {post.sections.map(section => (
          <section key={section.heading} className={styles.section}>
            <h2 className={styles.sectionHeading}>{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className={styles.sectionText}>{p}</p>
            ))}
            {section.list && (
              <ul className={styles.list}>
                {section.list.map((item, i) => (
                  <li key={i} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Summary</h2>
          <p className={styles.sectionText}>{post.conclusion}</p>
        </section>

        <AdSlot slot="content" />

        <div className={styles.disclaimer}>
          <strong>Disclaimer:</strong> The information in this article is for general educational purposes only and does not constitute personal financial, tax, or legal advice. Examples and figures are illustrative and may not reflect current rates, limits, or regulations. Consult a qualified financial professional before making any financial decisions.
        </div>

        {post.relatedLinks.length > 0 && (
          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Related Calculators</h3>
            <div className={styles.relatedLinks}>
              {post.relatedLinks.map(link => (
                <Link key={link.to} to={link.to} className={styles.relatedLink}>
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
