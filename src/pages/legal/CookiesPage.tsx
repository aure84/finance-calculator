export default function CookiesPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Cookie Policy</h1>
      <p style={{ marginBottom: 24, color: '#6b7280', fontSize: 14 }}>Last updated: April 2026</p>

      <h2 style={{ marginBottom: 12 }}>Cookies We Use</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            {['Cookie', 'Provider', 'Purpose', 'Duration'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['_ga', 'Google Analytics', 'Distinguishes users', '2 years'],
            ['_gid', 'Google Analytics', 'Distinguishes users', '24 hours'],
            ['IDE', 'Google AdSense', 'Ad targeting and measurement', '1 year'],
            ['test_cookie', 'Google', 'Checks browser cookie support', 'Session'],
          ].map(([name, provider, purpose, duration]) => (
            <tr key={name} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>{name}</td>
              <td style={{ padding: '8px' }}>{provider}</td>
              <td style={{ padding: '8px', color: '#6b7280' }}>{purpose}</td>
              <td style={{ padding: '8px' }}>{duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginBottom: 12 }}>How to Control Cookies</h2>
      <p style={{ color: '#374151', lineHeight: 1.7 }}>
        You can disable cookies in your browser settings. You can also opt out of Google advertising cookies at <a href="https://www.google.com/settings/ads" style={{ color: '#2563eb' }}>Google Ad Settings</a>.
      </p>
    </main>
  )
}
