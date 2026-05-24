export default function PrivacyPage() {
  const s = { marginBottom: 16, color: 'var(--text)', lineHeight: 1.7 as const }
  const h2 = { marginBottom: 12, color: 'var(--text)' }

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ marginBottom: 24, color: 'var(--text-muted)', fontSize: 14 }}>Last updated: 2026-05-24</p>

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

      <h2 style={h2}>3. Data We Collect Automatically</h2>
      <p style={s}>
        We do not collect your name or email address. The following data is collected automatically
        when you visit the site:
      </p>
      <ul style={{ ...s, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>
          <strong>Usage data</strong> — pages visited, session duration, browser type, operating
          system, and approximate location (country/region). Collected via Google Analytics 4
          (property ID: G-NZLGYL6DBG). Analytics data is only collected after you give consent
          via the cookie banner. You can opt out at any time using the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
            Google Analytics Opt-out Browser Add-on
          </a>.
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>IP address</strong> — transmitted to Google as part of Analytics and advertising
          requests. Google may use it to approximate geographic location. We do not store IP
          addresses ourselves.
        </li>
        <li>
          <strong>Cookies</strong> — set by Google Analytics and Google AdSense (publisher ID:
          ca-pub-6164838820338976). Advertising cookies are only set after you give consent. See
          our <a href="/cookies" style={{ color: 'var(--navy)' }}>Cookie Policy</a> for the full
          list and details.
        </li>
      </ul>

      <h2 style={h2}>4. Google AdSense and Third-Party Advertising</h2>
      <p style={s}>
        We display advertisements served by <strong>Google AdSense</strong> (publisher ID:
        ca-pub-6164838820338976). Google and its partners may use cookies to show you ads based
        on your prior visits to this site and other sites. This includes cookies such as{' '}
        <code>IDE</code> and <code>DSID</code> set by Google's DoubleClick ad network. Advertising
        cookies are only activated after you accept via the cookie banner.
      </p>
      <p style={s}>
        You can opt out of personalised advertising at{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>Google Ad Settings</a>{' '}
        or the{' '}
        <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>NAI opt-out page</a>.
        For more information on how Google uses data from sites that use its advertising services,
        see{' '}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
          How Google uses information from sites or apps that use our services
        </a>.
      </p>

      <h2 style={h2}>5. Legal Basis for Processing (GDPR Art. 6)</h2>
      <p style={s}>For users in the European Economic Area, our legal basis for processing is:</p>
      <ul style={{ ...s, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}><strong>Analytics cookies</strong> — consent (Art. 6(1)(a)). You can withdraw consent via the cookie banner at any time.</li>
        <li style={{ marginBottom: 8 }}><strong>Advertising cookies</strong> — consent (Art. 6(1)(a)). You can withdraw consent via the cookie banner or Google Ad Settings.</li>
        <li><strong>Functional storage</strong> (theme preference) — legitimate interest (Art. 6(1)(f)) in providing a consistent user experience. No tracking purpose.</li>
      </ul>

      <h2 style={h2}>6. Third-Party Services</h2>
      <p style={s}>
        We use <strong>Google Analytics 4</strong> (ID: G-NZLGYL6DBG) and <strong>Google AdSense</strong>{' '}
        (publisher ID: ca-pub-6164838820338976). Google acts as a data processor under Standard
        Contractual Clauses approved by the European Commission. Google may transfer data to the
        United States. For more information:{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>policies.google.com/privacy</a>.
      </p>

      <h2 style={h2}>7. Data Retention</h2>
      <p style={s}>
        We do not store personal data on our own servers. Google Analytics data is retained for
        14 months by default, after which Google deletes it automatically. Google AdSense cookie
        data is retained according to each cookie's duration (see our{' '}
        <a href="/cookies" style={{ color: 'var(--navy)' }}>Cookie Policy</a> for durations). You
        can request earlier deletion by contacting us at{' '}
        <a href="mailto:privacy@finance-fast.com" style={{ color: 'var(--navy)' }}>privacy@finance-fast.com</a>.
      </p>

      <h2 id="ccpa" style={h2}>8. Your Rights</h2>
      <p style={s}><strong>EU / EEA users</strong> have the following rights under GDPR:</p>
      <ul style={{ ...s, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
        <li style={{ marginBottom: 8 }}><strong>Rectification</strong> — request correction of inaccurate data.</li>
        <li style={{ marginBottom: 8 }}><strong>Erasure</strong> — request deletion of your personal data ("right to be forgotten").</li>
        <li style={{ marginBottom: 8 }}><strong>Restriction</strong> — request that we restrict processing of your data in certain circumstances.</li>
        <li style={{ marginBottom: 8 }}><strong>Portability</strong> — request your data in a structured, machine-readable format.</li>
        <li style={{ marginBottom: 8 }}><strong>Objection</strong> — object to processing based on legitimate interest.</li>
        <li><strong>Withdraw consent</strong> — withdraw consent at any time without affecting the lawfulness of prior processing. Use the cookie banner reset on our <a href="/cookies" style={{ color: 'var(--navy)' }}>Cookie Policy</a> page.</li>
      </ul>
      <p style={s}>
        <strong>California residents (CCPA)</strong> have the right to know what personal information
        is collected about them, to request deletion, and to opt out of the sale of their personal
        information. We do not sell personal information to third parties.
      </p>
      <p style={s}>
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:privacy@finance-fast.com" style={{ color: 'var(--navy)' }}>privacy@finance-fast.com</a>.
        We will respond within 30 days.
      </p>

      <h2 style={h2}>9. Children's Privacy</h2>
      <p style={s}>
        This site is not directed at children under 13 years of age. We do not knowingly collect
        personal data from children. If you believe a child has provided us personal information,
        please contact us at <a href="mailto:privacy@finance-fast.com" style={{ color: 'var(--navy)' }}>privacy@finance-fast.com</a> so
        we can delete it promptly.
      </p>

      <h2 style={h2}>10. Changes to This Policy</h2>
      <p style={s}>
        We may update this policy from time to time. The "last updated" date at the top of this
        page will reflect any changes.
      </p>
    </main>
  )
}
