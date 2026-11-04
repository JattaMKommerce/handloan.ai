import LegalLayout, { KV } from '../components/LegalLayout.jsx'
import { site } from '../config/site.js'

export default function Refund() {
  const c = site.contact
  const g = site.grievance
  return (
    <LegalLayout title="Refund & Cancellation Policy">
      <h2>1. What this policy covers</h2>
      <p>
        This policy explains how to withdraw an application, report a payment issue involving HandLoan.ai, or contact
        the lender about a disbursed loan. HandLoan.ai is operated by <strong>{site.company.legalName}</strong>.
      </p>

      <h2>2. LSP fees and lender charges</h2>
      <p>
        Where HandLoan acts as a Lending Service Provider for a regulated lender, the lender pays HandLoan for its LSP
        services. HandLoan does not charge borrowers for those services.
      </p>
      <p>
        Any applicable fee charged by the lender is disclosed in the lender&apos;s offer documents and KFS where
        required. Direct questions about a lender charge to the lender identified on your receipt, KFS, or loan
        agreement. HandLoan can help you locate the relevant contact.
      </p>

      <h2>3. Withdrawing an application before disbursement</h2>
      <p>
        To request withdrawal before disbursement, email <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a>{' '}
        with your application reference. If the lender already has the application, contact the lender through its
        official support channel as well. The lender can confirm whether processing has stopped or funds have already
        been released. Withdrawal does not override any legal obligation to retain records.
      </p>

      <h2>4. Exiting a digital loan after disbursement</h2>
      <p>
        Contact the lender promptly if you want to exit during the applicable cooling-off period. Your KFS and loan
        documents explain the period, the amount payable, and how to exercise that right. During the applicable period,
        you may exit by paying the principal and the proportionate cost calculated using the APR, without a penalty.
        The lender may retain a reasonable one-time processing fee where permitted and disclosed upfront. After the
        cooling-off period, the lender&apos;s applicable prepayment and closure rules apply.
      </p>

      <h2>5. Duplicate, excess, or erroneous payments</h2>
      <p>
        If a payment made to HandLoan appears duplicate, excessive, or incorrect, email{' '}
        <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a> with the transaction reference, payment date,
        amount, and a short description of the issue. Please report it promptly. Keep your OTP, UPI PIN, and full card
        details private.
      </p>
      <p>
        We will review the transaction and notify you of the outcome. If a refund is due, we will initiate it to the
        original payment method within <strong>{site.legal.refundWorkingDays} working days</strong> after confirming
        eligibility and provide a reference where available. Your bank or payment provider may take additional time to
        reflect the credit.
      </p>

      <h2>6. Unauthorised payments and disputes</h2>
      <p>
        If you suspect an unauthorised payment, contact your bank or payment provider promptly and notify HandLoan if
        the transaction involves our platform. We will review our records and cooperate with lawful requests relating
        to the dispute. You may use the complaint, payment dispute, and statutory remedies available to you.
      </p>

      <h2>7. Contact and escalation</h2>
      <KV
        rows={[
          ['Email', c.email],
          ['Phone', c.phoneDisplay],
          ['Grievance escalation', `${g.name} · ${g.email} · ${g.phone}`],
        ]}
      />
      <p>
        For lender complaints, use the contact in the lender&apos;s KFS or on its official website. Eligible unresolved
        lender complaints may be escalated through the{' '}
        <a href="https://cms.rbi.org.in/" target="_blank" rel="noopener noreferrer">RBI Complaint Management System</a>{' '}
        under the applicable scheme.
      </p>
    </LegalLayout>
  )
}
