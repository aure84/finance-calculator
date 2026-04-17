import { Link } from 'react-router-dom'
import styles from './RelatedCalculators.module.css'

interface RelatedLink {
  label: string
  to: string
  description: string
}

interface Props {
  links: RelatedLink[]
}

export default function RelatedCalculators({ links }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Related Calculators</h2>
      <div className={styles.grid}>
        {links.map((link) => (
          <Link key={link.to} to={link.to} className={styles.card}>
            <span className={styles.cardLabel}>{link.label}</span>
            <span className={styles.cardDesc}>{link.description}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
