import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { site } from '../config/site.js'

/**
 * One form, three variants — all post to /api/contact.php (runs on Hostinger):
 *  - "enquiry"   (Home, Services)  → emailed to help@handloan.ai
 *  - "contact"   (Contact page)    → same fields + optional message → help@handloan.ai
 *  - "grievance" (Grievance page)  → emailed to help@handloan.ai, marked [Grievance] for the Grievance Officer
 *
 * Deliberately asks for NO PAN, Aadhaar, bank details, documents or OTP. Consent boxes are
 * never pre-ticked; the required ones block submission here AND in contact.php.
 * Nothing from this form is sent to any advertising or analytics tool.
 */

const LOAN_TYPES = ['Personal Loan', 'Business Loan']
const EMPLOYMENT = ['Salaried', 'Self-employed professional', 'Self-employed business owner']
const INCOME = ['₹15,000 – ₹25,000', '₹25,001 – ₹50,000', '₹50,001 – ₹1,00,000', 'Above ₹1,00,000']
const GRIEVANCE_TOPICS = [
  'My enquiry',
  'Customer support',
  'Website or chat assistant',
  'Privacy or personal data',
  'Someone asked for money, OTP or documents in HandLoan.ai’s name',
  'Other',
]

/** Exact consent wording — contact.php copies the same text into the email as the consent record. */
const ENQUIRY_CONSENTS = [
  {
    name: 'consent_terms',
    required: true,
    text: (
      <>
        I have read and agree to the <a href="/privacy-policy/">Privacy Policy</a> and{' '}
        <a href="/terms/">Terms &amp; Conditions</a>.
      </>
    ),
  },
  {
    name: 'consent_contact',
    required: true,
    text: (
      <>
        I consent to {site.brand} contacting me about my enquiry by call, SMS, WhatsApp and email. I understand{' '}
        {site.brand} is not a lender.
      </>
    ),
  },
  {
    name: 'consent_future',
    required: true,
    text: (
      <>
        I understand that {site.brand} will share my details only with a lending partner listed on its{' '}
        <a href="/lending-partners/">Lending Partners</a> page, and only after telling me which lender and taking my
        consent.
      </>
    ),
  },
  {
    name: 'consent_marketing',
    required: false,
    text: (
      <>
        Optional: Send me information about other loan products from {site.brand} by SMS, WhatsApp or email. I can
        withdraw this at any time.
      </>
    ),
  },
]

const GRIEVANCE_CONSENTS = [
  ENQUIRY_CONSENTS[0],
  {
    name: 'consent_contact',
    required: true,
    text: <>I consent to {site.brand} contacting me about this complaint by call, SMS, WhatsApp and email.</>,
  },
]

function Select({ name, label, options, placeholder = 'Choose one' }) {
  return (
    <label className="form__field">
      <span>{label} *</span>
      <select name={name} required defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  )
}

export default function ContactForm({ variant = 'enquiry' }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const grievance = variant === 'grievance'
  const consents = grievance ? GRIEVANCE_CONSENTS : ENQUIRY_CONSENTS

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    // Belt and braces: block submission unless every mandatory consent is ticked.
    const missing = consents.filter((c) => c.required && !form.elements[c.name]?.checked)
    if (missing.length) {
      setError('Please tick all the required consent boxes (marked *) to continue.')
      setStatus('error')
      return
    }
    setStatus('sending')
    setError('')
    const body = new FormData(form)
    body.append('elapsed', String(Date.now() - startedAt.current)) // bots submit within a second or two
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
        {grievance ? (
          <>
            <h3>Thank you — your complaint has been sent.</h3>
            <p>
              Our Grievance Officer will acknowledge it within {site.grievance.acknowledgement} and aim to resolve it
              within {site.grievance.officerResolution}.
            </p>
          </>
        ) : (
          <>
            <h3>Thank you — your enquiry has been sent.</h3>
            <p>
              Our team will contact you during support hours ({site.contact.hoursShort}). {site.brand} is not a lender
              and will ask for your consent before sharing your enquiry with any lending partner.
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit} id={grievance ? 'grievance-form' : undefined}>
      <input type="hidden" name="form_type" value={variant} />
      <div className="form__hp" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="muted small form__note">Fields marked * are required.</p>
      <div className="form__row">
        <label className="form__field">
          <span>Full name *</span>
          <input type="text" name="name" required maxLength={80} autoComplete="name" />
        </label>
        <label className="form__field">
          <span>Mobile number *</span>
          <input
            type="tel"
            name="phone"
            required
            pattern="[0-9+\s\-]{10,16}"
            maxLength={16}
            autoComplete="tel"
            inputMode="tel"
            title="10-digit Indian mobile number"
          />
        </label>
      </div>
      <label className="form__field">
        <span>Email address *</span>
        <input type="email" name="email" required maxLength={120} autoComplete="email" />
      </label>

      {grievance ? (
        <>
          <Select name="topic" label="What is your complaint about?" options={GRIEVANCE_TOPICS} />
          <label className="form__field">
            <span>Enquiry or reference number (if any)</span>
            <input type="text" name="reference" maxLength={60} />
          </label>
          <label className="form__field">
            <span>Describe your complaint *</span>
            <textarea name="message" rows={5} required maxLength={2000} />
          </label>
        </>
      ) : (
        <>
          <div className="form__row">
            <Select name="loan_type" label="Loan type" options={LOAN_TYPES} />
            <label className="form__field">
              <span>Loan amount needed (₹) *</span>
              <input
                type="number"
                name="loan_amount"
                required
                min={25000}
                max={5000000}
                step={1000}
                inputMode="numeric"
                placeholder="25,000 to 50,00,000"
              />
            </label>
          </div>
          <div className="form__row">
            <label className="form__field">
              <span>City *</span>
              <input type="text" name="city" required maxLength={60} autoComplete="address-level2" />
            </label>
            <Select name="employment" label="Employment" options={EMPLOYMENT} />
          </div>
          <Select name="income" label="Monthly income" options={INCOME} />
          {variant === 'contact' ? (
            <label className="form__field">
              <span>Message (optional)</span>
              <textarea name="message" rows={4} maxLength={2000} />
            </label>
          ) : null}
        </>
      )}

      <p className="form__hint">
        <Icon name="lock" size={14} /> Please don&apos;t share PAN, Aadhaar, bank account, card, OTP or password details
        in this form.
      </p>

      {consents.map((c) => (
        <label className="form__consent" key={c.name}>
          <input type="checkbox" name={c.name} value="yes" required={c.required} />
          <span>
            {c.text}
            {c.required ? ' *' : null}
          </span>
        </label>
      ))}

      {status === 'error' ? (
        <p className="form__error" role="alert">
          {error} You can also email us at{' '}
          <a href={`mailto:${grievance ? site.grievance.email : site.contact.email}`}>
            {grievance ? site.grievance.email : site.contact.email}
          </a>
          .
        </p>
      ) : null}
      <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
        <Icon name="send" size={18} />{' '}
        {status === 'sending' ? 'Sending…' : grievance ? 'Submit complaint' : 'Submit enquiry'}
      </button>

      {grievance ? (
        <p className="muted small form__note">
          Your complaint is sent to {site.grievance.email} and marked for our Grievance Officer, {site.grievance.name}.
          We acknowledge complaints within {site.grievance.acknowledgement} and aim to
          resolve them within {site.grievance.officerResolution}. Sent over an encrypted (HTTPS) connection.
        </p>
      ) : (
        <>
          <p className="muted small form__note">
            By submitting, you confirm you are aged {site.eligibility.ageMin} to {site.eligibility.ageMax} and an Indian
            resident. Your details are shared with a listed lending partner only after we tell you which lender and you
            give your consent. {site.brand} does not fetch your credit report; the lending partner that reviews your
            enquiry may do so.
          </p>
          <p className="muted small form__note">
            Sent over an encrypted (HTTPS) connection | No obligation to accept any offer | We do not ask for PAN,
            Aadhaar, bank details or documents here, and we do not send the contents of this form to advertising or
            analytics platforms.
          </p>
        </>
      )}
    </form>
  )
}
