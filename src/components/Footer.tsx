import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} finance-fast.com — For informational purposes only. Not financial advice.
        </p>
        <nav className={styles.nav}>
          <Link to="/disclaimer" className={styles.link}>Disclaimer</Link>
          <Link to="/privacy-policy" className={styles.link}>Privacy Policy</Link>
          <Link to="/terms-of-use" className={styles.link}>Terms of Use</Link>
          <Link to="/cookies" className={styles.link}>Cookies</Link>
          <Link to="/privacy-policy#ccpa" className={styles.link}>Do Not Sell My Personal Information</Link>
        </nav>
      </div>
    </footer>
  )
}
