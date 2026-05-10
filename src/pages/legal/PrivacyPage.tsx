export default function PrivacyPage() {
  const s = { marginBottom: 16, color: 'var(--text)', lineHeight: 1.7 as const }
  const h2 = { marginBottom: 12, color: 'var(--text)' }

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ marginBottom: 24, color: 'var(--text-muted)', fontSize: 14 }}>Last updated: May 10, 2026</p>

      <h2 style={h2}>1. Who We Are</h2>
      <p style={s}>
        finance-fast.com is operated by Stromájer László, an individual based in Hungary. For
        privacy-related questions, contact us at{' '}
        <a href="mailto:privacy@finance-fast.com" style={{ color: 'var(--navy)' }}>privacy@finance-fast.com</a>.
      </p>

      <h2 style={h2}>2. Calculator Data Privacy</h2>
      <p style={s}>
        All financial data you enter into our calculators — including salary figures, loan amounts,
        mortgage balances, retirement projections, credit card details, and investment values — is
        processed entirely within your browser. This data is never transmitted to our servers or
        to any third party. We have no access to the values you enter, and nothing is stored beyond
        your current browser session.
      </p>

      <h2 style={h2}>3. Other Data We Collect</h2>
      <p style={s}>
        We do not collect your name or email address. The following data is collected automatically
        when you visit the site:
      </p>
      <ul style={{ ...s, paddingLeft: 24 }}>
        <li><strong>Usage data</strong> — pages visited, session duration, browser type, operating system, and approximate location (country/region). Collected via Google Analytics 4.</li>
        <li><strong>IP address</strong> — transmitted to Google as part of Analytics and AdSense requests. Google may use it to approximate geographic location. We do not store IP addresses ourselves.</li>
        <li><strong>Cookies</strong> — set by Google Analytics and Google AdSense. See our <a href="/cookies" style={{ color: 'var(--navy)' }}>Cookie Policy</a> for details.</li>
      </ul>

      <h2 style={h2}>4. Legal Basis for Processing (GDPR Art. 6)</h2>
      <p style={s}>For users in the European Economic Area, our legal basis for processing is:</p>
      <ul style={{ ...s, paddingLeft: 24 }}>
        <li><strong>Analytics cookies</strong> — consent (Art. 6(1)(a)). You can withdraw consent via the cookie banner at any time.</li>
        <li><strong>Advertising cookies</strong> — consent (Art. 6(1)(a)). You can withdraw consent via the cookie banner or Google Ad Settings.</li>
        <li><strong>Functional storage</strong> (theme preference) — legitimate interest (Art. 6(1)(f)) in providing a consistent user experience. No tracking purpose.</li>
      </ul>

      <h2 style={h2}>5. Third-Party Services</h2>
      <p style={s}>
        We use <strong>Google Analytics 4</strong> (ID: G-NZLGYL6DBG) and <strong>Google AdSense</strong>{' '}
        (publisher ID: ca-pub-6164838820338976). Google acts as a data processor under Standard
        Contractual Clauses approved by the European Commission. Google may transfer data to the
        United States. For more information:{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>policies.google.com/privacy</a>.
      </p>
      <p style={s}>
        You can opt out of personalised advertising at{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>Google Ad Settings</a> or the{' '}
        <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>NAI opt-out page</a>.
      </p>

      <h2 style={h2}>6. Data Retention</h2>
      <p style={s}>
        We do not store personal data on our own servers. Google Analytics data is retained for
        14 months by default, after which it is automatically deleted by Google. You can request
        earlier deletion by contacting us.
      </p>

      <h2 id="ccpa" style={h2}>7. Your Rights</h2>
      <p style={s}>
        EU/EEA users have the right to access, rectify, erase, restrict processing, and port their
        data, and to object to processing or withdraw consent at any time. California residents have
        the right to know what personal information is collected and to opt out of its sale — we do
        not sell personal information. To exercise any of these rights, contact us at{' '}
        <a href="mailto:privacy@finance-fast.com" style={{ color: 'var(--navy)' }}>privacy@finance-fast.com</a>.
        We will respond within 30 days.
      </p>

      <h2 style={h2}>8. Children's Privacy</h2>
      <p style={s}>
        This site is not directed at children under 13 years of age. We do not knowingly collect
        personal data from children. If you believe a child has provided us personal information,
        please contact us at <a href="mailto:privacy@finance-fast.com" style={{ color: 'var(--navy)' }}>privacy@finance-fast.com</a> so
        we can delete it promptly.
      </p>

      <h2 style={h2}>9. Changes to This Policy</h2>
      <p style={s}>
        We may update this policy from time to time. The "last updated" date at the top of this
        page will reflect any changes.
      </p>
    </main>
  )
}
