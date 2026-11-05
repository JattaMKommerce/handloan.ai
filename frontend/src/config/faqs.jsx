import { products, site } from './site.js'
import { rupeesShort } from '../lib/loan.js'

const p = products.personal
const b = products.business
const e = site.eligibility
const g = site.grievance

export const faqs = [
  {
    q: 'Is HandLoan.ai a lender?',
    a: (
      <p>
        No. {site.brand} is a loan facilitation platform operated by {site.company.legalName}. It works with the
        lending partners listed on our <a href="/lending-partners/">Lending Partners</a> page. The lender decides
        whether to lend, on what terms, and disburses the loan.
      </p>
    ),
  },
  {
    q: 'Who provides my loan?',
    a: (
      <p>
        Your loan, if approved, is provided by one of the lending partners listed on our{' '}
        <a href="/lending-partners/">Lending Partners</a> page. The lender&apos;s name is shown in your offer, Key
        Facts Statement (KFS) and loan agreement. We share your enquiry with a lender only after telling you which
        lender and taking your consent.
      </p>
    ),
  },
  {
    q: 'Does HandLoan.ai charge me any fee?',
    a: (
      <p>
        No. {site.brand} does not charge you any fee for submitting an enquiry. Never pay anyone an upfront fee. Any
        charges levied by the lender, such as a processing fee, are disclosed in the lender&apos;s Key Facts Statement
        before you accept.
      </p>
    ),
  },
  {
    q: 'Who can apply?',
    a: (
      <p>
        Indian residents aged {e.ageMin} to {e.ageMax} with a monthly income of {e.minMonthlyIncome} or more can send
        an enquiry. {site.brand} accepts enquiries only from age {e.ageMin} to {e.ageMax}. Each lending partner also
        applies its own eligibility criteria and makes the final decision.
      </p>
    ),
  },
  {
    q: 'What loan amounts and tenures are available?',
    a: (
      <p>
        We accept enquiries for personal loans from {rupeesShort(p.amountMin)} to {rupeesShort(p.amountMax)} with
        tenures of {p.tenureMinMonths}–{p.tenureMaxMonths} months, and business loans from {rupeesShort(b.amountMin)} to{' '}
        {rupeesShort(b.amountMax)} with tenures of {b.tenureMinMonths}–{b.tenureMaxMonths} months. The actual amount
        and tenure are set by the lending partner. We do not facilitate short-term or payday loans repayable in 90 days or
        less.
      </p>
    ),
  },
  {
    q: 'What interest rate will I get?',
    a: (
      <p>
        {site.brand} does not set interest rates. Your interest rate is set by the lending partner, based on its
        assessment of your profile, such as income, credit score and repayment history. The lender shows the interest
        rate, all charges and the Annual Percentage Rate (APR) in its Key Facts Statement before you accept.
      </p>
    ),
  },
  {
    q: 'What is a Key Facts Statement (KFS)?',
    a: (
      <p>
        A KFS is a standardised summary that RBI-regulated lenders must give you before you sign a loan agreement. It
        lists the loan amount, interest rate, APR, all fees and charges, the repayment schedule, the cooling-off
        period and the lender&apos;s grievance contact. Please read it carefully before accepting any offer.
      </p>
    ),
  },
  {
    q: 'Will applying affect my credit score?',
    a: (
      <p>
        Sending an enquiry to {site.brand} does not affect your credit score: {site.brand} does not fetch your credit
        report. The lending partner that reviews your enquiry may check your credit report, only with your consent and
        after telling you who is requesting it and why. A lender&apos;s credit enquiry may be recorded on your credit
        report.
      </p>
    ),
  },
  {
    q: 'How do I repay my loan?',
    a: (
      <p>
        If you take a loan from a lender, you repay that lender directly through the repayment channels shown in your
        loan agreement, usually an auto-debit (e-NACH) mandate from your bank account. {site.brand} does not collect
        loan repayments into its own account.
      </p>
    ),
  },
  {
    q: 'What happens if I miss an EMI?',
    a: (
      <p>
        On any loan, a missed or late EMI may attract penal charges as stated in the lender&apos;s KFS and can lower
        your credit score. If you expect difficulty in paying, contact your lender as early as possible to discuss your
        options. Recovery practices are governed by the lender&apos;s fair practices code and RBI rules.
      </p>
    ),
  },
  {
    q: 'Can I cancel a loan after it is disbursed?',
    a: (
      <p>
        Digital loans from RBI-regulated lenders come with a cooling-off period, stated in the KFS, during which you
        can exit by repaying the principal and the proportionate APR without any penalty. You can withdraw an enquiry
        with {site.brand} at any time. See our <a href="/refund-policy/">Refund &amp; Cancellation Policy</a>.
      </p>
    ),
  },
  {
    q: 'How is my personal data protected?',
    a: (
      <p>
        We collect only the information your enquiry needs, and we do not ask for PAN, Aadhaar, bank details or
        documents in our enquiry form. We share your enquiry only with a lending partner listed on our Lending Partners
        page, and only after telling you which lender and taking your consent. We do not sell your data, and we
        do not read your SMS messages, contacts or call logs. Read our <a href="/privacy-policy/">Privacy Policy</a>{' '}
        for details.
      </p>
    ),
  },
  {
    q: 'How do I raise a complaint?',
    a: (
      <p>
        Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call {site.contact.phoneDisplay}; we
        aim to resolve it within {g.supportResolution}. If it isn&apos;t resolved, escalate to our Grievance Officer,{' '}
        {g.name}, at <a href={`mailto:${g.email}`}>{g.email}</a> (resolution within {g.officerResolution}). Complaints
        about a loan from a lender can also be escalated to the RBI at cms.rbi.org.in. See{' '}
        <a href="/grievance-redressal/">Grievance Redressal</a>.
      </p>
    ),
  },
]
