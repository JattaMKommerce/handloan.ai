import LegalLayout, { CompanyBlock, GrievanceBlock, KV } from '../components/LegalLayout.jsx'
import { site } from '../config/site.js'

export default function Refund() {
  const c = site.contact
  const g = site.grievance
  return (
    <LegalLayout title="Refund & Cancellation Policy">
      <h2>1. What this policy covers</h2>
      <p>
        This policy explains how to withdraw an enquiry, what to do if anyone has asked you for a payment in
        HandLoan.ai&apos;s name, and how cancellation works for a digital loan from a lender. HandLoan.ai is operated by{' '}
        <strong>{site.company.legalName}</strong> (CIN {site.company.cin}). HandLoan.ai is a loan facilitation
        platform, not a lender, and works with the lending partners listed on our Lending Partners page.
      </p>

      <h2>2. Fees</h2>
      <p>
        HandLoan.ai does not charge you any fee for submitting an enquiry and does not accept payments from borrowers.
        Never pay anyone an upfront fee. Because HandLoan.ai takes no fee, there is nothing for HandLoan.ai to refund
        for an enquiry.
      </p>
      <p>
        Any fee charged by a lending partner is disclosed in the lender&apos;s offer documents and Key Facts Statement
        (KFS) before you accept, and questions about it should be directed to the lender.
      </p>

      <h2>3. Withdrawing your enquiry</h2>
      <p>
        You can withdraw your enquiry at any time by emailing <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a>{' '}
        or calling <a href={`tel:${c.phoneHref}`}><strong>{c.phoneDisplay}</strong></a>. We will stop contacting you
        about it and, if you ask, delete your details, subject to any records we must keep by law. If your enquiry has
        already been shared with a lending partner (with your consent), contact that lender too; we will help you find
        the right contact.
      </p>

      <h2>4. Exiting a digital loan after disbursement</h2>
      <p>
        If you take a digital loan from an RBI-regulated lender, contact that lender promptly if you want to exit during
        the applicable cooling-off period. The lender&apos;s KFS and loan documents explain the period, the amount
        payable, and how to exercise that right. During the applicable period, you may exit by paying the principal and
        the proportionate cost calculated using the APR, without a penalty. The lender may retain a reasonable one-time
        processing fee where permitted and disclosed upfront. After the cooling-off period, the lender&apos;s applicable
        prepayment and closure rules apply.
      </p>

      <h2>5. Payments made to anyone in HandLoan.ai&apos;s name</h2>
      <p>
        HandLoan.ai never asks for money, OTP, UPI PIN, CVV or documents. If you have paid, or been asked to pay, anyone
        claiming to be HandLoan.ai or a HandLoan.ai partner lender, it was not authorised by us. Report it straight away
        to <a href={`mailto:${g.email}`}><strong>{g.email}</strong></a> and{' '}
        <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a>, contact your bank or payment provider, and report
        it at <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a> or
        call <strong>1930</strong>. We will cooperate with your bank and with lawful requests from the authorities.
      </p>

      <h2>6. Contact and escalation</h2>
      <KV
        rows={[
          ['Customer support', `${c.email} · ${c.phoneDisplay} · ${c.hours}`],
        ]}
      />
      <GrievanceBlock label="Grievance Officer" />
      <CompanyBlock />
      <p>
        For complaints about a loan from a lender, use the contact in the lender&apos;s KFS or on its official website.
        Eligible unresolved lender complaints may be escalated after {g.lenderResolution} through the{' '}
        <a href="https://cms.rbi.org.in/" target="_blank" rel="noopener noreferrer">RBI Complaint Management System</a>{' '}
        under the applicable scheme.
      </p>
    </LegalLayout>
  )
}
