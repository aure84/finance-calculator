export default function CookiesPage() {
  const s = { color: 'var(--text)', lineHeight: 1.7 as const }
  const h2 = { marginBottom: 12, color: 'var(--text)' }
  const h3 = { marginBottom: 8, color: 'var(--text)', fontSize: 18 }
  const tdStyle = { padding: '8px', color: 'var(--text-muted)' }

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Cookie Policy</h1>
      <p style={{ marginBottom: 24, color: 'var(--text-muted)', fontSize: 14 }}>Last updated: 2026-05-24</p>

      <p style={{ ...s, marginBottom: 24 }}>
        This page explains what cookies we use, why we use them, and how you can control them.
        We use three categories of cookies: essential, analytics, and advertising. Non-essential
        cookies (analytics and advertising) are only set after you give consent via our cookie banner.
      </p>

      <h2 style={{ ...h2, marginTop: 8 }}>Essential Cookies</h2>
      <p style={{ ...s, marginBottom: 12 }}>
        Essential cookies are necessary for the site to function correctly. They do not track you
        for marketing purposes and cannot be disabled without breaking core functionality.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32, fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--results-bg)' }}>
            {['Name', 'Purpose', 'Duration'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left', color: 'var(--text)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['cookieConsent', 'Stores your Accept/Reject choice from the cookie banner so we do not show it on every visit', 'Persistent (localStorage)'],
          ].map(([name, purpose, duration]) => (
            <tr key={name} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: 'var(--text)' }}>{name}</td>
              <td style={tdStyle}>{purpose}</td>
              <td style={tdStyle}>{duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2}>Analytics Cookies</h2>
      <p style={{ ...s, marginBottom: 12 }}>
        Analytics cookies help us understand how visitors use the site — which pages are most
        popular, how long sessions last, and where visitors come from. We use{' '}
        <strong>Google Analytics 4</strong> (property ID: G-NZLGYL6DBG). These cookies are only
        set after you accept via the cookie banner.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32, fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--results-bg)' }}>
            {['Cookie', 'Provider', 'Purpose', 'Duration'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left', color: 'var(--text)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['_ga', 'Google Analytics', 'Distinguishes unique users', '2 years'],
            ['_ga_NZLGYL6DBG', 'Google Analytics', 'Stores and counts page views for this property', '2 years'],
            ['_gid', 'Google Analytics', 'Distinguishes users within a 24-hour window', '24 hours'],
          ].map(([name, provider, purpose, duration]) => (
            <tr key={name} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: 'var(--text)' }}>{name}</td>
              <td style={tdStyle}>{provider}</td>
              <td style={tdStyle}>{purpose}</td>
              <td style={tdStyle}>{duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2}>Advertising Cookies</h2>
      <p style={{ ...s, marginBottom: 12 }}>
        Advertising cookies are set by <strong>Google AdSense</strong> (publisher ID:
        ca-pub-6164838820338976) and Google's DoubleClick ad network. They are used to show you
        relevant ads, limit how often you see the same ad, and measure the effectiveness of
        advertising campaigns. These cookies are only set after you accept via the cookie banner.
      </p>
      <p style={{ ...s, marginBottom: 12 }}>
        For full details on how Google uses data from advertising cookies, see{' '}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
          Google's advertising policies
        </a>{' '}
        and the{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
          Google Privacy Policy
        </a>.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32, fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--results-bg)' }}>
            {['Cookie', 'Provider', 'Purpose', 'Duration'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left', color: 'var(--text)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['IDE', 'Google AdSense / DoubleClick', 'Ad targeting and performance measurement', '1 year'],
            ['DSID', 'Google AdSense', 'Identifies signed-in users for ad personalisation on non-Google sites', '2 weeks'],
            ['NID', 'Google', 'Stores user preferences for Google services and ad targeting', '6 months'],
            ['test_cookie', 'Google', 'Checks whether the browser supports cookies; not used for tracking', 'Session'],
          ].map(([name, provider, purpose, duration]) => (
            <tr key={name} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: 'var(--text)' }}>{name}</td>
              <td style={tdStyle}>{provider}</td>
              <td style={tdStyle}>{purpose}</td>
              <td style={tdStyle}>{duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ ...h2, marginTop: 8 }}>How to Control or Withdraw Consent</h2>
      <p style={{ ...s, marginBottom: 12 }}>
        You can withdraw or change your cookie consent at any time:
      </p>
      <ul style={{ ...s, paddingLeft: 24, marginBottom: 16 }}>
        <li style={{ marginBottom: 8 }}>
          <strong>Reset your choice:</strong>{' '}
          <button
            style={{ background: 'none', border: 'none', color: 'var(--navy)', cursor: 'pointer', padding: 0, font: 'inherit', textDecoration: 'underline' }}
            onClick={() => { localStorage.removeItem('cookieConsent'); window.location.reload() }}
          >
            Click here to reset your cookie preferences
          </button>{' '}
          — this clears your saved choice and shows the consent banner again.
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>Google Analytics opt-out:</strong> Install the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
            Google Analytics Opt-out Browser Add-on
          </a>.
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>Google advertising opt-out:</strong> Visit{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
            Google Ad Settings
          </a>{' '}
          to turn off personalised ads.
        </li>
        <li>
          <strong>Browser settings:</strong> You can also block or delete cookies through your
          browser settings. Note that disabling cookies may affect the functionality of some
          websites. Refer to your browser's help documentation for instructions.
        </li>
      </ul>
    </main>
  )
}
