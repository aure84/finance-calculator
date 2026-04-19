import { Link } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <SEOMeta
        title="Contact — Finance Fast"
        description="Get in touch with the Finance Fast team. Send us feedback, report a bug, or ask a question."
      />
      <div style={{ marginBottom: 16, fontSize: 14, color: '#6b7280' }}>
        <Link to="/" style={{ color: '#2563eb' }}>Home</Link> › Contact
      </div>
      <h1 style={{ marginBottom: 16, color: '#1e3a5f' }}>Contact Us</h1>

      <p style={{ marginBottom: 24, color: '#374151', lineHeight: 1.7 }}>
        Have a question, found a bug, or want to suggest a calculator? We read every message and typically respond within 1–2 business days.
      </p>

      <div style={{ background: '#eef3f9', borderRadius: 8, padding: '24px 28px', marginBottom: 32 }}>
        <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>Email</div>
        <a
          href="mailto:contact@finance-fast.com"
          style={{ fontSize: 18, fontWeight: 600, color: '#1e3a5f', textDecoration: 'none' }}
        >
          contact@finance-fast.com
        </a>
      </div>

      <h2 style={{ marginBottom: 12, color: '#1e3a5f' }}>Common questions</h2>
      <ul style={{ color: '#374151', lineHeight: 1.9, paddingLeft: 20 }}>
        <li><strong>Found an error in a calculator?</strong> Please include the inputs you used and the expected result.</li>
        <li><strong>Requesting a new calculator?</strong> Tell us what you need — we add new tools regularly.</li>
        <li><strong>Privacy or data questions?</strong> See our <Link to="/privacy-policy" style={{ color: '#2563eb' }}>Privacy Policy</Link>.</li>
        <li><strong>Advertising or partnership inquiries?</strong> Use the email above with the subject line "Partnership".</li>
      </ul>
    </main>
  )
}
