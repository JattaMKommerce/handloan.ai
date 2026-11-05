import LegalLayout, { GrievanceBlock } from '../components/LegalLayout.jsx'
import { site } from '../config/site.js'

const DATA = [
  [
    'Name, mobile number and email address',
    'To respond to your enquiry or complaint and to send you updates about it.',
  ],
  [
    'Loan type, loan amount, city, employment type and monthly income range',
    'To understand what you need, explain suitable loan options and, with your consent, pass your enquiry to a listed lending partner.',
  ],
  [
    'Your consent choices, support messages and complaint records',
    'To record what you agreed to, respond to queries, resolve complaints and keep required records.',
  ],
  [
    'Device, browser and security logs (for example IP address and browser type)',
    'To operate and secure the website and prevent misuse. Not used to make lending decisions.',
  ],
]

const WEBSITE = [
  [
    'Enquiry and contact forms',
    'Name, mobile number, email, loan type, loan amount, city, employment type, monthly income range, an optional message and your consent choices — used to respond to your enquiry. The forms do not ask for PAN, Aadhaar, bank, card, OTP or password details or documents.',
  ],
  [
    'Grievance form',
    'Name, mobile number, email, complaint topic, an optional reference and your complaint — sent to help@handloan.ai and marked for our Grievance Officer to resolve it.',
  ],
  [
    'Chat assistant',
    'The chat window on this website is an AI assistant provided by our technology partner iamkratu.ai. Messages you type, and any name, phone number or email you choose to share in the chat, are processed by iamkratu.ai to answer you and to let our team follow up. If you use the voice-call option, your browser will ask for microphone permission first.',
  ],
  [
    'WhatsApp',
    'If you choose to message us on WhatsApp, your conversation is also subject to WhatsApp’s own privacy policy.',
  ],
  [
    'Fonts',
    'Pages load fonts from Google Fonts, which receives your device’s IP address and browser details to deliver them.',
  ],
  [
    'EMI calculator',
    'Runs only in your browser. The numbers you enter are not sent to us or anyone else.',
  ],
]

const SHARING = [
  [
    'Lending institutions',
    'Only the lending partners listed on our Lending Partners page, only after we tell you which lender and you consent, and only the details that lender needs to assess your loan request.',
  ],
  ['Website hosting (Hostinger)', 'Hosts this website and sends form submissions to our team by email.'],
  ['Our email service providers', 'Deliver and store the emails your form submissions and messages create.'],
  ['iamkratu.ai', 'Provides the AI chat assistant, for messages you type in the chat.'],
  ['WhatsApp (Meta)', 'Only if you choose to contact us on WhatsApp.'],
  ['Authorities', 'Where disclosure is required by law, or to prevent fraud or protect our users.'],
]

export default function Privacy() {
  const co = site.company
  const c = site.contact
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <LegalLayout title="Privacy Policy">
      <h2>1. Who we are and what this policy covers</h2>
      <p>
        HandLoan.ai (handloan.ai) is operated by <strong>{co.legalName}</strong>, CIN: <strong>{co.cin}</strong>,
        Registered address: {co.registeredOffice}. Operating office: {co.operatingOffice}.
      </p>
      <p>
        This policy explains how we handle personal data when you visit our website, send an enquiry, use the chat
        assistant, raise a complaint or contact support. {site.brand} is a loan facilitation platform, not a lender, and
        works with the lending partners listed on our <a href="/lending-partners/">Lending Partners</a> page.
      </p>

      <h2>2. Information we handle</h2>
      <p>
        We collect only what your enquiry or request needs. We explain the purpose at the point of collection and ask
        for your prior, explicit consent.
      </p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Information</th>
              <th scope="col">Why we need it</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <strong>What we do not collect:</strong> {site.brand} does not collect PAN, Aadhaar, bank account or card
        details, documents, OTPs or credit reports, and does not fetch your credit report. {site.brand} does not read
        or upload SMS messages, contact lists or call logs from your phone.
      </p>

      <h2>3. Sensitive information</h2>
      <h3>Aadhaar, PAN and KYC</h3>
      <p>
        {site.brand} does not collect Aadhaar, PAN or other KYC documents and does not carry out KYC. Please do not send
        Aadhaar or PAN details through our forms, the chat assistant or WhatsApp. Where a lending partner needs KYC,
        it is done by or for that lender at its own step, only with your explicit consent, under that lender&apos;s
        privacy notice.
      </p>
      <h3>Bank account and financial information</h3>
      <p>
        {site.brand} does not collect bank statements, bank account numbers or card details. We only ask for your monthly
        income range so we can explain suitable loan options. We never ask for your card number, CVV, OTP, UPI PIN or
        banking passwords.
      </p>
      <h3>Device and technical information</h3>
      <p>
        Our hosting provider processes device, browser and security information, such as IP address and browser type, to
        operate the website, keep it secure and prevent fraud. We do not use this information to make lending decisions.
      </p>

      <h2>4. Information collected on this website</h2>
      <div className="table-wrap">
        <table className="table">
          <tbody>
            {WEBSITE.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        This website does not place personal, financial or identity information in web addresses (URLs), and does not
        send the contents of our forms to any analytics or advertising platform.
      </p>

      <h2>5. How we use and share information</h2>
      <p>
        We use personal data to respond to your enquiry, explain loan options, provide updates, handle complaints,
        prevent misuse and meet legal obligations. <strong>We do not sell your personal data.</strong> We share only the
        information needed for the stated purpose:
      </p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Recipient</th>
              <th scope="col">What and why</th>
            </tr>
          </thead>
          <tbody>
            {SHARING.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {site.brand} does not use credit-check or KYC providers today. If that changes, we will list each provider, its
        purpose and its privacy notice here before any data is shared with it.
      </p>

      <h2>6. Consent</h2>
      <p>
        We ask for your consent separately for each purpose, in clear language, before collecting or sharing information.
        Consent boxes are never pre-ticked, and consent for marketing is optional and separate from the consent needed to
        respond to your enquiry. You can withdraw consent at any time by emailing{' '}
        <a href={`mailto:${c.email}`}>{c.email}</a>. Withdrawal does not affect processing already carried out, or
        information we must keep by law.
      </p>

      <h2>7. Storage, retention, and security</h2>
      <p>
        We keep enquiry, consent, support and complaint records for up to <strong>{site.legal.retention}</strong> from
        your last interaction with us, unless you ask us to delete them sooner or the law requires us to keep them
        longer. We then delete or anonymise them. We restrict access to authorised personnel and use safeguards
        appropriate to the data we handle, including encrypted (HTTPS) connections for every form.
      </p>

      <h2>8. Your choices and rights</h2>
      <p>Subject to the Digital Personal Data Protection Act, 2023 and the rules made under it, you may:</p>
      <ul>
        <li>ask for a summary of the personal data we process about you and the purposes for which we process it;</li>
        <li>ask us to correct, complete, update or erase your personal data;</li>
        <li>withdraw your consent;</li>
        <li>raise a grievance with us about how your personal data is handled; and</li>
        <li>nominate another person to exercise these rights on your behalf in case of death or incapacity.</li>
      </ul>
      <p>
        To make a request, email <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a>. We may verify your
        identity before acting.
      </p>

      <h2>9. Children</h2>
      <p>
        We accept enquiries only from people aged {site.eligibility.ageMin} to {site.eligibility.ageMax}. We do not
        knowingly collect personal data from anyone under 18. If you believe a child has shared personal data with us,
        please contact us so that we can delete it.
      </p>

      <h2>10. Cookies, analytics, and advertising</h2>
      <p>
        This website uses only essential technology, such as a temporary session cookie that helps protect our forms
        from spam. It does not currently use advertising or analytics tools.
      </p>
      <p>
        If we run advertisements, we may use Meta Pixel and Google Analytics with your consent to understand which ads
        bring enquiries. We never send them the contents of your enquiry (such as name, mobile, income, loan amount). You
        can withdraw consent anytime via <a href={`mailto:${c.email}`}>{c.email}</a>.
      </p>
      <p>
        Promotional messages are sent only if you tick the optional marketing box, and are separate from updates about
        your enquiry. You can opt out at any time using the option in the message or by contacting support.
      </p>

      <h2>11. Grievance Officer, privacy complaints and policy changes</h2>
      <GrievanceBlock label="Grievance Officer" />
      <p>
        If you are not satisfied with how we resolve your grievance, you may approach the Data Protection Board of India
        as provided under the Digital Personal Data Protection Act, 2023. See our{' '}
        <a href="/grievance-redressal/">Grievance Redressal</a> page for all levels, including escalation of
        complaints about a loan from a lender to the <a href="https://cms.rbi.org.in/" {...ext}>RBI Complaint
        Management System</a>.
      </p>
      <p>We will publish material changes with a new effective date and seek fresh consent where required.</p>
    </LegalLayout>
  )
}
