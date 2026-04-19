import { Link } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'
import AdSlot from '../components/AdSlot'
import { blogPosts } from '../data/blogPosts'
import styles from './blog.module.css'

export default function BlogIndexPage() {
  return (
    <main className={styles.page}>
      <SEOMeta
        title="Finance Blog — Guides & Explainers | Finance Fast"
        description="Plain-English guides on mortgages, loans, taxes, retirement, compound interest, and more. Learn how financial tools work before you use them."
      />
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> › Blog
      </div>
      <h1 className={styles.title}>Finance Guides</h1>
      <p className={styles.subtitle}>
        Plain-English explainers on mortgages, loans, taxes, retirement savings, and more.
      </p>

      <AdSlot slot="header" />
      <div className={styles.grid}>
        {blogPosts.map(post => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.card}>
            <p className={styles.cardDate}>{post.date}</p>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardDesc}>{post.description}</p>
            <span className={styles.readMore}>Read more →</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
