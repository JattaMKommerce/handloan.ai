import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { site } from '../config/site.js'

/**
 * Posts to /api/contact.php (runs on Hostinger). Deliberately asks for NO
 * financial or identity data — Meta does not allow loan landing pages to
 * collect bank, card, PAN or Aadhaar details through ad-driven forms.
 */
export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    setError('')
    const body = new FormData(form)
    body.append('elapsed', String(Date.now() - startedAt.current)) // bots submit instantly
    try {
      const res = await fetch('/api/contact.php', { method: 'POST', body })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.')
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <Icon name="check" size={28} />
        <h3>Thank you — your message has been sent.</h3>
        <p>Our team will get back to you at the email or phone number you shared.</p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__hp" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form__row">
        <label className="form__field">
          <span>Full name</span>
          <input type="text" name="name" required maxLength={80} autoComplete="name" />
        </label>
        <label className="form__field">
          <span>Mobile number</span>
          <input type="tel" name="phone" required pattern="[0-9+\s\-]{10,15}" maxLength={15} autoComplete="tel" />
        </label>
      </div>
      <label className="form__field">
        <span>Email address</span>
        <input type="email" name="email" required maxLength={120} autoComplete="email" />
      </label>
      <label className="form__field">
        <span>Subject</span>
        <select name="subject" required defaultValue="">
          <option value="" disabled>
            Choose a topic
          </option>
          <option>General enquiry</option>
          <option>Help with my application</option>
          <option>App support</option>
          <option>Complaint / grievance</option>
          <option>Partnership enquiry</option>
          <option>Careers</option>
        </select>
      </label>
      <label className="form__field">
        <span>Message</span>
        <textarea name="message" rows={5} required maxLength={2000} />
      </label>
      <p className="form__hint">
        <Icon name="lock" size={14} /> Please don&apos;t share bank account, card, PAN, Aadhaar, OTP or password details
        in this form.
      </p>
      <label className="form__consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          I agree that {site.brand} may contact me about this enquiry by phone, email or WhatsApp, as described in the{' '}
          <a href="/privacy-policy/">Privacy Policy</a>.
        </span>
      </label>
      {status === 'error' ? (
        <p className="form__error" role="alert">
          {error} You can also email us at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      ) : null}
      <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
        <Icon name="send" size={18} /> {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
