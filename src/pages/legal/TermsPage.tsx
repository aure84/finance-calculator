export default function TermsPage() {
  const s = { marginBottom: 16, color: 'var(--text)', lineHeight: 1.7 as const }
  const h2 = { marginBottom: 12, color: 'var(--text)' }

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Terms of Use</h1>
      <p style={{ marginBottom: 24, color: 'var(--text-muted)', fontSize: 14 }}>Last updated: May 10, 2026</p>

      <h2 style={h2}>Financial Disclaimer</h2>
      <p style={s}>
        The calculators and content on finance-fast.com are provided for <strong>informational and
        educational purposes only</strong>. Results are estimates based on the inputs you provide
        and simplified mathematical models. They do not constitute financial, tax, investment,
        mortgage, or legal advice.
      </p>
      <p style={s}>
        You should not rely on any calculation result to make financial decisions. Always consult a
        qualified financial advisor, accountant, mortgage broker, or other licensed professional
        before making significant financial commitments. Finance-fast.com assumes no liability for
        decisions made based on calculator results.
      </p>

      <h2 style={h2}>Permitted Use</h2>
      <p style={s}>
        finance-fast.com is provided for personal, non-commercial use only. You may not resell,
        scrape, or embed our calculators on other websites without written permission.
      </p>

      <h2 style={h2}>No Warranty</h2>
      <p style={s}>
        This site is provided "as is" without warranty of any kind. We do not warrant the accuracy,
        completeness, or fitness for any particular purpose of any calculation result. Results are
        estimates only and do not constitute financial, tax, investment, or legal advice.
      </p>

      <h2 style={h2}>Limitation of Liability</h2>
      <p style={s}>
        To the maximum extent permitted by applicable law, finance-fast.com and its operators shall
        not be liable for any direct, indirect, incidental, or consequential damages arising from
        your use of this site or reliance on any calculation results.
      </p>

      <h2 style={h2}>Governing Law</h2>
      <p style={s}>
        These Terms are governed by the laws of Hungary. Disputes shall be subject to the
        jurisdiction of the courts of Hungary, without prejudice to your statutory rights as a
        consumer under the law of your country of residence. EU consumers retain the right to
        bring claims before the courts of their member state and to use available consumer
        protection remedies under EU law. Nothing in these Terms limits or excludes rights that
        cannot be waived under applicable consumer law.
      </p>

      <h2 style={h2}>Indemnification</h2>
      <p style={s}>
        You agree to indemnify and hold harmless finance-fast.com from any claims, losses, or
        damages arising from your use of the site or violation of these Terms, to the extent
        permitted by applicable law.
      </p>

      <h2 style={h2}>Changes to These Terms</h2>
      <p style={s}>
        We reserve the right to modify these Terms at any time. The "last updated" date at the
        top of this page will reflect any changes. Continued use of the site after changes are
        posted constitutes acceptance of the revised Terms.
      </p>

      <h2 style={h2}>Contact</h2>
      <p style={s}>
        Questions about these Terms? Email us at{' '}
        <a href="mailto:contact@finance-fast.com" style={{ color: 'var(--navy)' }}>contact@finance-fast.com</a>.
      </p>
    </main>
  )
}
