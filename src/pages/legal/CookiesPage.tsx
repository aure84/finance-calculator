export default function CookiesPage() {
  const s = { color: 'var(--text)', lineHeight: 1.7 as const }
  const h2 = { marginBottom: 12, color: 'var(--text)' }
  const tdStyle = { padding: '8px', color: 'var(--text-muted)' }

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Cookie Policy</h1>
      <p style={{ marginBottom: 24, color: 'var(--text-muted)', fontSize: 14 }}>Last updated: April 24, 2026</p>

      <h2 style={h2}>Cookies We Use</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--results-bg)' }}>
            {['Cookie', 'Provider', 'Purpose', 'Duration'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left', color: 'var(--text)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['_ga', 'Google Analytics', 'Distinguishes users', '2 years'],
            ['_ga_NZLGYL6DBG', 'Google Analytics', 'Stores session state', '2 years'],
            ['_gid', 'Google Analytics', 'Distinguishes users', '24 hours'],
            ['IDE', 'Google AdSense', 'Ad targeting and measurement', '1 year'],
            ['test_cookie', 'Google', 'Checks browser cookie support', 'Session'],
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

      <h2 style={h2}>Functional Storage (not cookies)</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--results-bg)' }}>
            {['Name', 'Purpose', 'Duration'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left', color: 'var(--text)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['cookieConsent', 'Stores your Accept/Reject choice from the cookie banner', 'Persistent'],
          ].map(([name, purpose, duration]) => (
            <tr key={name} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: 'var(--text)' }}>{name}</td>
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
          <strong>Cookie banner:</strong> Clear the <code>cookieConsent</code> key from your
          browser's localStorage (DevTools → Application → Local Storage), then reload the page
          to see the consent prompt again.
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>Google Analytics opt-out:</strong> Install the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
            Google Analytics Opt-out Browser Add-on
          </a>.
        </li>
        <li>
          <strong>Google advertising opt-out:</strong> Visit{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
            Google Ad Settings
          </a>{' '}
          to turn off personalised ads.
        </li>
      </ul>
    </main>
  )
}
