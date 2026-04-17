import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', padding: '24px', marginTop: 48, fontSize: 13, color: '#6b7280' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <p>© {new Date().getFullYear()} finance-fast.com — For informational purposes only. Not financial advice.</p>
        <nav style={{ display: 'flex', gap: 16 }}>
          <Link to="/disclaimer" style={{ color: '#6b7280' }}>Disclaimer</Link>
          <Link to="/privacy-policy" style={{ color: '#6b7280' }}>Privacy Policy</Link>
          <Link to="/terms-of-use" style={{ color: '#6b7280' }}>Terms of Use</Link>
          <Link to="/cookies" style={{ color: '#6b7280' }}>Cookies</Link>
          <Link to="/privacy-policy#ccpa" style={{ color: '#6b7280' }}>Do Not Sell My Personal Information</Link>
        </nav>
      </div>
    </footer>
  )
}
