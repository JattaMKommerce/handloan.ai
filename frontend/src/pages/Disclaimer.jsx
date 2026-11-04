import LegalLayout from '../components/LegalLayout.jsx'
import { site } from '../config/site.js'

export default function Disclaimer() {
  const c = site.contact
  return (
    <LegalLayout title="Disclaimer">
      <h2>About HandLoan.ai</h2>
      <p>
        HandLoan.ai is a loan application facilitation platform operated by <strong>{site.company.legalName}</strong>.
        We help applicants submit information and applications to participating lenders through the website, mobile
        app, and supported application channels. HandLoan.ai does not lend money or sanction loans.
      </p>

      <h2>Loan offers and approval</h2>
      <p>
        Submitting an application does not guarantee a loan offer, approval, or disbursement. The participating lender
        evaluates your application and decides whether to lend, how much to lend, what terms to offer, and when to
        disburse. The lender may request additional information or documents as part of its assessment.
      </p>
      <p>
        Any loan amount, interest rate, repayment period, or timeline displayed as an illustration is indicative.
        Before accepting an offer, review the lender&apos;s <strong>Key Facts Statement (KFS)</strong>, where
        applicable, and the loan agreement. Check the Annual Percentage Rate (APR), applicable charges, repayment
        schedule, and total amount payable.
      </p>

      <h2>Charges and payments</h2>
      <p>
        Where HandLoan acts as a Lending Service Provider in a regulated digital lending arrangement, the lender pays
        HandLoan for its LSP services. HandLoan does not charge borrowers for those services. Any applicable lender
        charges will be disclosed by the lender in the relevant offer documents and KFS, where required.
      </p>

      <h2>Credit checks and application information</h2>
      <p>
        Provide accurate and complete information when applying. A credit check will be requested by an entity
        authorised to obtain the report. At the relevant step, you will be told who is requesting the report and why,
        and separate authorisation will be sought where required.
      </p>

      <h2>Calculators and general information</h2>
      <p>
        Calculators and examples on HandLoan.ai provide estimates. They do not constitute a loan offer or financial
        advice. Review the lender&apos;s actual terms before making a borrowing decision.
      </p>

      <h2>Support and responsibilities</h2>
      <p>
        The lender is responsible for its credit decision, loan terms, and disbursement. HandLoan handles questions
        and complaints about its own platform and services. Your rights and remedies under applicable law remain
        available.
      </p>
      <p>
        For support, email <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a> or call{' '}
        <a href={`tel:${c.phoneHref}`}><strong>{c.phoneDisplay}</strong></a>. For data handling and payment disputes,
        see the <a href="/privacy-policy/">Privacy Policy</a> and{' '}
        <a href="/refund-policy/">Refund &amp; Cancellation Policy</a>.
      </p>
    </LegalLayout>
  )
}
