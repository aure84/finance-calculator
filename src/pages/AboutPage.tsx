import { Link } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <SEOMeta
        title="About — Finance Fast"
        description="Finance Fast is a free financial calculator site built to help you make better money decisions — no sign-up, no ads in the way, just fast and accurate results."
      />
      <div style={{ marginBottom: 16, fontSize: 14, color: '#6b7280' }}>
        <Link to="/" style={{ color: '#2563eb' }}>Home</Link> › About
      </div>
      <h1 style={{ marginBottom: 16, color: '#1e3a5f' }}>About Finance Fast</h1>

      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        Finance Fast is a free collection of financial calculators built to help everyday people understand their financial numbers — quickly, without sign-ups or paywalls. Whether you need to estimate your take-home pay, calculate mortgage payments, or figure out how long it takes to reach a savings goal, the answer is one click away.
      </p>

      <h2 style={{ marginTop: 32, marginBottom: 12, color: '#1e3a5f' }}>Why we built this</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        Too many financial tools are buried behind newsletter signups, cluttered with irrelevant content, or simply give wrong answers. We wanted a clean, fast alternative: carefully checked calculators, plain-English explanations, and no friction.
      </p>

      <h2 style={{ marginTop: 32, marginBottom: 12, color: '#1e3a5f' }}>Who we are</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        Finance Fast is operated by an independent developer based in Hungary. The site is not affiliated with any bank, financial institution, or investment firm. All calculators are for informational purposes only — see our <Link to="/disclaimer" style={{ color: '#2563eb' }}>Disclaimer</Link> for details.
      </p>

      <h2 style={{ marginTop: 32, marginBottom: 12, color: '#1e3a5f' }}>Get in touch</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        Questions, feedback, or found a bug? We'd love to hear from you. Visit our <Link to="/contact" style={{ color: '#2563eb' }}>Contact page</Link> or email us directly at{' '}
        <a href="mailto:contact@finance-fast.com" style={{ color: '#2563eb' }}>contact@finance-fast.com</a>.
      </p>
    </main>
  )
}
