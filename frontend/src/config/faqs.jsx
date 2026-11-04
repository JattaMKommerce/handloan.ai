import { products, site } from './site.js'
import { facts } from '../lib/derived.js'
import { rupeesShort } from '../lib/loan.js'

const p = products.personal
const b = products.business

export const faqs = [
  {
    q: 'Is HandLoan.ai a lender?',
    a: (
      <p>
        No. {site.brand} is a loan facilitation platform operated by {site.company.legalName}. We act as a Lending
        Service Provider (LSP) and help you apply to RBI-regulated banks and NBFCs. The lender named in your offer and
        Key Facts Statement decides whether to lend, on what terms, and disburses the loan.
      </p>
    ),
  },
  {
    q: 'Who provides my loan?',
    a: (
      <p>
        Your loan is provided by one of our RBI-regulated lending partners. The lender&apos;s name is always shown in
        your offer, Key Facts Statement (KFS) and loan agreement. See the full list on our{' '}
        <a href="/lending-partners/">Lending Partners</a> page.
      </p>
    ),
  },
  {
    q: 'Does HandLoan.ai charge me any fee?',
    a: (
      <p>
        No. Where {site.brand} acts as a Lending Service Provider, the lender pays us for our services and we do not
        charge borrowers. Any charges levied by the lender, such as a processing fee, are disclosed upfront in the
        lender&apos;s KFS. We will never ask you to pay anything before a loan is approved or disbursed.
      </p>
    ),
  },
  {
    q: 'Who can apply?',
    a: (
      <p>
        Indian residents aged 18 or above with a regular source of income can apply. Most lenders look for applicants
        aged 21–60, a stable salaried or self-employed income, and a healthy credit history. Each lender applies its
        own eligibility criteria and makes the final decision.
      </p>
    ),
  },
  {
    q: 'What loan amounts and tenures are available?',
    a: (
      <p>
        Personal loans range from {rupeesShort(p.amountMin)} to {rupeesShort(p.amountMax)} with tenures of{' '}
        {p.tenureMinMonths}–{p.tenureMaxMonths} months. Business loans range from {rupeesShort(b.amountMin)} to{' '}
        {rupeesShort(b.amountMax)} with tenures of {b.tenureMinMonths}–{b.tenureMaxMonths} months. We do not facilitate short-term or payday loans repayable in 90
        days or less.
      </p>
    ),
  },
  {
    q: 'What interest rate will I get?',
    a: (
      <p>
        Interest rates on loans facilitated by {site.brand} range from {facts.rate}. Your actual rate depends on the
        lender&apos;s assessment of your profile, such as income, credit score and repayment history. The lender shows
        the interest rate, all charges and the Annual Percentage Rate (APR) in the KFS before you accept.
      </p>
    ),
  },
  {
    q: 'What is a Key Facts Statement (KFS)?',
    a: (
      <p>
        A KFS is a standardised summary that RBI-regulated lenders must give you before you sign a loan agreement. It
        lists the loan amount, interest rate, APR, all fees and charges, the repayment schedule, the cooling-off
        period and the lender&apos;s grievance contact. Please read it carefully before accepting an offer.
      </p>
    ),
  },
  {
    q: 'Will applying affect my credit score?',
    a: (
      <p>
        To assess your application, the lender or an entity authorised by it may check your credit report. This is
        done only with your consent, and you are told who is requesting the report and why. A lender&apos;s credit
        enquiry may be recorded on your credit report.
      </p>
    ),
  },
  {
    q: 'How do I repay my loan?',
    a: (
      <p>
        You repay the lender directly through the repayment channels shown in your loan agreement, usually an auto-debit
        (e-NACH) mandate from your bank account. {site.brand} does not collect loan repayments into its own account.
      </p>
    ),
  },
  {
    q: 'What happens if I miss an EMI?',
    a: (
      <p>
        A missed or late EMI may attract penal charges as stated in your KFS and can lower your credit score. If you
        expect difficulty in paying, contact your lender as early as possible to discuss your options. Recovery
        practices are governed by the lender&apos;s fair practices code and RBI rules.
      </p>
    ),
  },
  {
    q: 'Can I cancel a loan after it is disbursed?',
    a: (
      <p>
        Yes. Digital loans come with a cooling-off period, stated in your KFS, during which you can exit by repaying
        the principal and the proportionate APR without any penalty. See our{' '}
        <a href="/refund-policy/">Refund &amp; Cancellation Policy</a> for details.
      </p>
    ),
  },
  {
    q: 'How is my personal data protected?',
    a: (
      <p>
        We collect only the information needed for your application, ask for your explicit consent before sharing it
        with a lender, and store personal data in India in line with RBI digital lending requirements. The{' '}
        {site.brand} app does not read your SMS messages, contacts or call logs. Read our{' '}
        <a href="/privacy-policy/">Privacy Policy</a> for details.
      </p>
    ),
  },
  {
    q: 'How do I raise a complaint?',
    a: (
      <p>
        Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call {site.contact.phoneDisplay}. If
        your complaint isn&apos;t resolved, you can escalate it to our Grievance Officer. Complaints about a loan can
        also be raised with the lender and, if unresolved within 30 days, with the RBI. See{' '}
        <a href="/grievance-redressal/">Grievance Redressal</a>.
      </p>
    ),
  },
]
