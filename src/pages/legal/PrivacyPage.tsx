export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ marginBottom: 24, color: '#6b7280', fontSize: 14 }}>Last updated: April 2026</p>

      <h2 style={{ marginBottom: 12 }}>Data We Collect</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        finance-fast.com collects standard web analytics data through Google Analytics 4 (page views, session duration, browser type, approximate location) and advertising data through Google AdSense (cookies for ad personalization). We do not collect your name, email, or the values you enter into calculators.
      </p>

      <h2 style={{ marginBottom: 12 }}>Third-Party Services</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        We use Google Analytics 4 and Google AdSense. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out at <a href="https://www.google.com/settings/ads" style={{ color: '#2563eb' }}>Google Ad Settings</a> or via the <a href="https://optout.networkadvertising.org/" style={{ color: '#2563eb' }}>NAI opt-out page</a>. For more information on how Google uses data, see <a href="https://www.google.com/policies/privacy/partners/" style={{ color: '#2563eb' }}>google.com/policies/privacy/partners</a>.
      </p>

      <h2 style={{ marginBottom: 12 }}>Cookies</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        We use cookies for analytics (_ga, _gid) and advertising (Google AdSense cookies). See our <a href="/cookies" style={{ color: '#2563eb' }}>Cookie Policy</a> for details. You can disable cookies in your browser settings.
      </p>

      <h2 style={{ marginBottom: 12 }}>GDPR (EU Users)</h2>
      <p style={{ marginBottom: 16, color: '#374151', lineHeight: 1.7 }}>
        If you are located in the EU/EEA, you have the right to access, correct, or delete your personal data. To exercise these rights or for privacy questions, contact us at: privacy@finance-fast.com. Google LLC is a data processor under our use of Google Analytics and AdSense.
      </p>

      <h2 id="ccpa" style={{ marginBottom: 12 }}>CCPA (California Users)</h2>
      <p style={{ color: '#374151', lineHeight: 1.7 }}>
        California residents have the right to know what personal information is collected and to opt out of the sale of personal information. We do not sell personal information. To submit a request: privacy@finance-fast.com.
      </p>
    </main>
  )
}
