import LegalLayout, { GrievanceBlock, KV } from '../components/LegalLayout.jsx'
import { site } from '../config/site.js'

const DATA = [
  [
    'Name, contact details, and account or application reference',
    'To identify your application, send service updates, and respond to support requests.',
  ],
  [
    'Age, address, employment, income, and loan request details',
    'To submit information needed for the lender to assess your application.',
  ],
  [
    'KYC documents, financial records, or credit information',
    'Where necessary and permitted, to support identity verification or the lender’s assessment. The relevant step identifies who requests the information and why.',
  ],
  [
    'Support messages, transaction references, and consent records',
    'To respond to queries, investigate issues, and maintain required records.',
  ],
  [
    'Device, browser, and security logs',
    'To operate and secure the platform. Any optional analytics or advertising tools are described in Section 6.',
  ],
]

export default function Privacy() {
  const c = site.contact
  return (
    <LegalLayout title="Privacy Policy">
      <h2>1. Who we are and what this policy covers</h2>
      <p>
        This policy explains how <strong>{site.company.legalName}</strong>, operating as <strong>HandLoan.ai</strong>,
        handles personal data when you visit our website, use our mobile app, contact support, or submit an application
        through a supported channel. A participating lender may issue its own privacy notice for the information it
        handles.
      </p>

      <h2>2. Information we handle</h2>
      <p>
        The information required depends on the service and lender route you choose. We explain the purpose at the
        point of collection and request prior, explicit consent where required.
      </p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Information</th>
              <th scope="col">Why it may be needed</th>
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
        HandLoan does not read or upload SMS messages, contact lists, or call logs from your phone. Where permitted and
        necessary for onboarding or KYC, the app may request one-time access to a device feature such as the camera,
        with your explicit permission.
      </p>

      <h2>3. How we use and share information</h2>
      <p>
        We use personal data to operate your account, facilitate an application you initiate, provide updates, handle
        complaints, prevent misuse, and meet legal obligations. We share only the information needed for the stated
        purpose, with your explicit consent where required or where disclosure is required by law.
      </p>
      <p>
        Recipients may include the participating lender, verification providers, and service providers needed to
        operate the selected route. Where a third party collects information directly through HandLoan, its identity,
        purpose, and privacy notice are listed below or shown at the relevant step.
      </p>
      <KV rows={[['Service-provider disclosures', site.legal.serviceProviders]]} />

      <h2>4. Storage, retention, and security</h2>
      <p>
        HandLoan retains the minimum applicant information needed for its role, subject to applicable digital lending
        requirements. Personal data subject to RBI digital lending localisation requirements is stored in India in
        accordance with those requirements. We restrict access to authorised personnel and use safeguards appropriate
        to the data we handle.
      </p>
      <KV rows={[['Retention schedule', site.legal.retentionSchedule]]} />
      <p>
        We delete or anonymise data when it is no longer needed, subject to applicable retention obligations and lawful
        holds.
      </p>

      <h2>5. Your choices and requests</h2>
      <p>
        You can request access to or correction of your information, withdraw consent, request deletion, or raise a
        privacy complaint, subject to applicable law. You may decline a particular request for data or sharing. If the
        information is necessary for a specific application step, we will explain how declining affects that step.
      </p>
      <p>
        To make a request, email <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a>. We may verify your
        identity before acting. For information held independently by a lender, you may also need to contact the
        lender directly.
      </p>

      <h2>6. Cookies, analytics, and marketing</h2>
      <p>
        We use essential technologies for features such as security and session management. Any optional analytics or
        advertising tools we use, their purposes, and the choices available to you are listed in{' '}
        {site.legal.trackingNotice}. Loan application information, identity documents, credit reports, and bank details
        are excluded from advertising tracking.
      </p>
      <p>
        Promotional messages are separate from application and account updates. You can opt out of promotions using the
        option provided in the message or by contacting support.
      </p>

      <h2>7. Privacy complaints and policy changes</h2>
      <GrievanceBlock label="Grievance Officer" />
      <p>We will publish material changes with a new effective date and notify you or seek fresh consent where required.</p>
    </LegalLayout>
  )
}
