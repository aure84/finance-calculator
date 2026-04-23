import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './CookieBanner.module.css'

declare function gtag(...args: unknown[]): void

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    document.body.style.paddingBottom = visible ? '64px' : ''
    return () => { document.body.style.paddingBottom = '' }
  }, [visible])

  function accept() {
    localStorage.setItem('cookieConsent', 'granted')
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
    setVisible(false)
  }

  function reject() {
    localStorage.setItem('cookieConsent', 'denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p className={styles.text}>
        We use cookies for analytics and advertising.{' '}
        <Link to="/cookies" className={styles.link}>Cookie Policy</Link>
      </p>
      <div className={styles.actions}>
        <button className={styles.reject} onClick={reject}>Reject</button>
        <button className={styles.accept} onClick={accept}>Accept</button>
        <button className={styles.close} onClick={() => setVisible(false)} aria-label="Close">✕</button>
      </div>
    </div>
  )
}
