import LegalLayout, { CompanyBlock, GrievanceBlock } from '../components/LegalLayout.jsx'
import { site } from '../config/site.js'

export default function Disclaimer() {
  const c = site.contact
  return (
    <LegalLayout title="Disclaimer">
      <h2>About HandLoan.ai</h2>
      <p>
        HandLoan.ai is a loan facilitation platform operated by <strong>{site.company.legalName}</strong> (CIN{' '}
        {site.company.cin}). We help you start a loan enquiry with the lending partners listed on our{' '}
        <a href="/lending-partners/">Lending Partners</a> page, and share your enquiry with a lender only with your
        consent. HandLoan.ai does not lend money or sanction loans.
      </p>
      <p>
        HandLoan.ai is not a bank or a Non-Banking Financial Company (NBFC) and does not hold a lending licence. It
        does not sanction or disburse loans. The lending partner sanctions and disburses any loan at its sole
        discretion, subject to its own eligibility assessment, verification,
        underwriting and approval process.
      </p>

      <h2>Loan offers and approval</h2>
      <p>
        Submitting an enquiry does not guarantee a loan offer, approval, or disbursement. The lending partner
        evaluates any application and decide whether to lend, how much to lend, what
        terms to offer, and when to disburse. The lender may request additional information or documents as part of its assessment.
      </p>
      <p>
        Any loan amount, interest rate, repayment period, or timeline displayed as an illustration is indicative.
        Before accepting an offer, review the lender&apos;s <strong>Key Facts Statement (KFS)</strong>, where
        applicable, and the loan agreement. Check the Annual Percentage Rate (APR), applicable charges, repayment
        schedule, and total amount payable.
      </p>

      <h2>Charges and payments</h2>
      <p>
        HandLoan.ai does not charge you any fee for submitting an enquiry. Never pay anyone an upfront fee. Any applicable
        lender charges are disclosed by the lending partner in its offer documents and Key Facts Statement before you
        accept.
      </p>

      <h2>Credit checks and application information</h2>
      <p>
        Provide accurate and complete information in your enquiry. HandLoan.ai does not fetch your credit report; a
        lender that reviews your enquiry in future may do so, only after telling you who is requesting the report and
        why, and with your separate authorisation.
      </p>

      <h2>Calculators and general information</h2>
      <p>
        Calculators and examples on HandLoan.ai provide estimates. They do not constitute a loan offer or financial
        advice. Review the lender&apos;s actual terms before making a borrowing decision.
      </p>

      <h2>AI chat assistant</h2>
      <p>
        The chat assistant on this website is an automated AI tool provided by our technology partner iamkratu.ai. It
        can explain general loan information and guide you on how to send an enquiry. It does not make credit
        decisions, cannot guarantee approval, an interest rate or a disbursement timeline, and may occasionally give
        incomplete or inaccurate answers. Any final loan decision would be made by a lending institution, and the terms
        that would apply to you are those in the lender&apos;s offer, Key Facts Statement and loan agreement. To speak with a
        person, call <a href={`tel:${c.phoneHref}`}>{c.phoneDisplay}</a> or email{' '}
        <a href={`mailto:${c.email}`}>{c.email}</a>.
      </p>

      <h2>Third-party links</h2>
      <p>
        This website links to third-party websites, such as the Reserve Bank of India, WhatsApp and our technology
        partners. We are not responsible for their content or practices; their own terms and privacy
        policies apply.
      </p>

      <h2>Support and responsibilities</h2>
      <p>
        Any lender is responsible for its own credit decision, loan terms, and disbursement. HandLoan handles questions
        and complaints about its own platform and services. Your rights and remedies under applicable law remain
        available.
      </p>
      <p>
        For support, email <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a> or call{' '}
        <a href={`tel:${c.phoneHref}`}><strong>{c.phoneDisplay}</strong></a> ({c.hours}). For data handling and payment
        disputes, see the <a href="/privacy-policy/">Privacy Policy</a> and{' '}
        <a href="/refund-policy/">Refund &amp; Cancellation Policy</a>.
      </p>
      <h2>Grievance Officer</h2>
      <GrievanceBlock />
      <CompanyBlock />
    </LegalLayout>
  )
}
