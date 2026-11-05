import LegalLayout, { CompanyBlock, GrievanceBlock } from '../components/LegalLayout.jsx'
import { site } from '../config/site.js'

export default function Terms() {
  const co = site.company
  const c = site.contact
  return (
    <LegalLayout title="Terms & Conditions">
      <h2>1. Who operates HandLoan.ai</h2>
      <p>
        HandLoan.ai is operated by <strong>{co.legalName}</strong>, CIN <strong>{co.cin}</strong>, with its registered
        address at <strong>{co.registeredOffice}</strong> and its operating office at{' '}
        <strong>{co.operatingOffice}</strong>.
      </p>
      <CompanyBlock />
      <p>
        These Terms govern your use of the HandLoan.ai website, its enquiry and grievance forms, chat assistant and
        related services. References to &ldquo;HandLoan&rdquo;,
        &ldquo;we&rdquo;, and &ldquo;us&rdquo; mean {co.legalName}. References to &ldquo;you&rdquo; mean the person
        using the platform.
      </p>

      <h2>2. Eligibility and acceptance</h2>
      <p>
        To submit an enquiry you must be 21 to 58 years old, an Indian citizen or resident, able to enter into a
        contract, and have a monthly income of at least ₹15,000. Lending partners may apply additional eligibility
        criteria.
      </p>
      <p>
        When you submit an enquiry, we will ask you to accept these Terms. The{' '}
        <a href="/privacy-policy/">Privacy Policy</a> explains how we handle personal data. Any separate consent or
        authorisation required for a credit check, personal data processing or sharing, or optional marketing will be
        requested at the relevant step.
      </p>

      <h2>3. What HandLoan provides</h2>
      <p>
        HandLoan.ai is a loan facilitation platform that works with the lending partners listed on its{' '}
        <a href="/lending-partners/">Lending Partners</a> page. HandLoan collects your enquiry and explains loan
        options in plain language; it does not lend money, approve loans or collect repayments. HandLoan shares your
        enquiry with a listed lending partner only after telling you which lender and taking your consent. The lender
        identified in any offer is the entity responsible for the loan.
      </p>

      <h2>4. Enquiries, offers, and loan contracts</h2>
      <p>
        An enquiry is not a loan application or a loan offer, and does not guarantee a loan. If you choose to apply
        with a lending partner, the lender may verify your information, request additional documents,
        decline an application, or issue an offer. Review the lender&apos;s name, loan amount, APR, tenure,
        repayment schedule, charges, and KFS where applicable before accepting an offer. Your loan agreement is with
        the lender.
      </p>
      <p>
        Follow the lender&apos;s verified instructions for disbursement and repayment. HandLoan does not collect loan
        repayments into its own account.
      </p>

      <h2>5. Charges, withdrawals, and refunds</h2>
      <p>
        HandLoan.ai does not charge you any fee for submitting an enquiry. Never pay anyone an upfront fee. Any lender
        charges are disclosed by the lender in its Key Facts Statement. Please refer to our{' '}
        <a href="/refund-policy/">Refund &amp; Cancellation Policy</a> for how to report a payment issue or withdraw
        an enquiry. For an already disbursed loan, the lender handles cooling-off, prepayment, and closure
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

      <h2>8. Third-party services</h2>
      <p>
        Some features are provided by third parties: the AI chat assistant on our website (provided by iamkratu.ai),
        WhatsApp, our hosting and email providers, and the lending partners listed on our Lending Partners page (only
        with your consent). Their own
        terms and privacy notices also apply when you use them. The chat assistant is an automated tool: it gives
        general information, cannot approve or guarantee a loan, and may occasionally be inaccurate, so always rely on
        the lender&apos;s offer, Key Facts Statement and loan agreement.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        HandLoan is responsible for providing its own services with reasonable care and skill. To the extent permitted
        by law, HandLoan is not responsible for a lender&apos;s decision to approve or decline an application, the
        lender&apos;s loan terms, disbursement or recovery actions, or for loss caused by inaccurate information you
        provide, by your sharing your credentials or one-time passwords, or by events beyond our reasonable control.
        Nothing in these Terms excludes or limits any liability, or any right you have, that cannot be excluded or
        limited under applicable law, including consumer protection law.
      </p>

      <h2>10. Suspension, termination, and account deletion</h2>
      <p>
        You can stop using the platform at any time. To withdraw an enquiry and request deletion of your personal data,
        email <a href={`mailto:${c.email}`}>{c.email}</a>; we will act on your request as described in
        the <a href="/privacy-policy/">Privacy Policy</a>, subject to records we must keep by law. Closing your
        HandLoan account does not close or cancel a loan you have taken from a lender: your loan agreement continues
        until it is repaid or closed under its terms.
      </p>
      <p>
        We may suspend or close access to the platform if we reasonably suspect fraud, misuse, a security risk or a
        breach of these Terms, and will tell you the reason where the law allows.
      </p>

      <h2>11. Complaints and disputes</h2>
      <p>
        For a HandLoan complaint, email <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a> or call{' '}
        <a href={`tel:${c.phoneHref}`}><strong>{c.phoneDisplay}</strong></a> ({c.hours}). Include your enquiry
        reference (if any) and a brief description of the issue. If it is not resolved, escalate to our Grievance
        Officer, {site.grievance.name}, at{' '}
        <a href={`mailto:${site.grievance.email}`}><strong>{site.grievance.email}</strong></a> or{' '}
        {site.grievance.phoneDisplay}.
      </p>
      <GrievanceBlock />
      <CompanyBlock />
      <p>
        For a lender-related complaint, use the lender&apos;s grievance contact shown in its KFS or on its official
        website. If the lender rejects your complaint, you are dissatisfied with its response, or you receive no
        response within 30 days, you may escalate an eligible complaint through the{' '}
        <a href="https://cms.rbi.org.in/" target="_blank" rel="noopener noreferrer">RBI Complaint Management System</a>{' '}
        under the applicable scheme. These Terms are governed by Indian law. Your right to approach a competent court,
        consumer forum, or regulator remains available.
      </p>

      <h2>12. Changes to these Terms</h2>
      <p>
        We will publish updated Terms with their effective date and notify users of material changes where required.
        Existing loan agreements are governed by their own terms and applicable law.
      </p>
    </LegalLayout>
  )
}
