import LegalLayout, { GrievanceBlock } from '../components/LegalLayout.jsx'
import { site } from '../config/site.js'

export default function Terms() {
  const co = site.company
  const c = site.contact
  return (
    <LegalLayout title="Terms & Conditions">
      <h2>1. Who operates HandLoan.ai</h2>
      <p>
        HandLoan.ai is operated by <strong>{co.legalName}</strong>, CIN <strong>{co.cin}</strong>, with its registered
        office at <strong>{co.registeredOffice}</strong>.
      </p>
      <p>
        These Terms govern your use of the HandLoan.ai website, mobile app, and services accessed through supported
        channels, including ONDC-enabled routes where available. References to &ldquo;HandLoan&rdquo;,
        &ldquo;we&rdquo;, and &ldquo;us&rdquo; mean {co.legalName}. References to &ldquo;you&rdquo; mean the person
        using the platform.
      </p>

      <h2>2. Eligibility and acceptance</h2>
      <p>
        You must be at least 18 years old and legally capable of entering into a contract to submit an application.
        Participating lenders may apply additional eligibility criteria.
      </p>
      <p>
        When you proceed with an application, we will ask you to accept these Terms. The{' '}
        <a href="/privacy-policy/">Privacy Policy</a> explains how we handle personal data. Any separate consent or
        authorisation required for a credit check, personal data processing or sharing, or optional marketing will be
        requested at the relevant step.
      </p>

      <h2>3. What HandLoan provides</h2>
      <p>
        HandLoan helps you provide application information to participating lenders or to service providers involved
        in the application route. Where HandLoan acts as a Lending Service Provider for a regulated lender, its
        functions are governed by the applicable arrangement with that lender. An ONDC-enabled route describes how an
        application is facilitated. The lender identified in the offer is the entity responsible for the loan.
      </p>

      <h2>4. Applications, offers, and loan contracts</h2>
      <p>
        An application is a request for consideration. The lender may verify your information, request additional
        documents, decline an application, or issue an offer. Review the lender&apos;s name, loan amount, APR, tenure,
        repayment schedule, charges, and KFS where applicable before accepting an offer. Your loan agreement is with
        the lender.
      </p>
      <p>
        Follow the lender&apos;s verified instructions for disbursement and repayment. HandLoan does not collect loan
        repayments into its own account.
      </p>

      <h2>5. Charges, withdrawals, and refunds</h2>
      <p>
        Where we act as an LSP for a regulated lender, the lender pays us for our LSP services. Any applicable lender
        charges are disclosed by the lender. Please refer to our{' '}
        <a href="/refund-policy/">Refund &amp; Cancellation Policy</a> for how to report a payment issue or request
        application withdrawal. For an already disbursed loan, the lender handles cooling-off, prepayment, and closure
        under the applicable terms and rules.
      </p>

      <h2>6. Your responsibilities</h2>
      <p>
        Provide information that is accurate, current, and yours to share. Keep your account credentials and one-time
        passwords confidential. Notify us promptly if you suspect unauthorised use of your account. You may use the
        platform for lawful purposes. We may restrict access if we reasonably suspect fraud, misuse, or a security
        risk, subject to applicable law.
      </p>

      <h2>7. Platform content and responsibility</h2>
      <p>
        You may use HandLoan&apos;s website and app for their intended purposes. Platform content, software, and
        branding belong to HandLoan or the respective rights holders.
      </p>
      <p>
        HandLoan is responsible for its own services and obligations under applicable law. The lender is responsible
        for its lending decisions and loan obligations. Nothing in these Terms limits rights or remedies that cannot
        lawfully be limited.
      </p>

      <h2>8. Complaints and disputes</h2>
      <p>
        For a HandLoan complaint, email <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a> or call{' '}
        <a href={`tel:${c.phoneHref}`}><strong>{c.phoneDisplay}</strong></a>. Include your application reference and a
        brief description of the issue.
      </p>
      <GrievanceBlock />
      <p>
        For a lender-related complaint, use the lender&apos;s grievance contact shown in its KFS or on its official
        website. If the lender rejects your complaint, you are dissatisfied with its response, or you receive no
        response within 30 days, you may escalate an eligible complaint through the{' '}
        <a href="https://cms.rbi.org.in/" target="_blank" rel="noopener noreferrer">RBI Complaint Management System</a>{' '}
        under the applicable scheme. These Terms are governed by Indian law. Your right to approach a competent court,
        consumer forum, or regulator remains available.
      </p>

      <h2>9. Changes to these Terms</h2>
      <p>
        We will publish updated Terms with their effective date and notify users of material changes where required.
        Existing loan agreements are governed by their own terms and applicable law.
      </p>
    </LegalLayout>
  )
}
