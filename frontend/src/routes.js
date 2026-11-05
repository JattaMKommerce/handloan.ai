/**
 * Every page on the site. Each one is pre-rendered to static HTML at build time
 * (dist/<path>/index.html) so Meta's crawler and reviewers see full content.
 */
export const routes = [
  {
    path: '/',
    page: 'home',
    title: 'Personal & Business Loan Enquiry - HandLoan.ai is not a lender',
    description:
      'Start a personal or business loan enquiry digitally with HandLoan.ai and its lending partners. HandLoan.ai is a loan facilitation platform, not a lender.',
  },
  {
    path: '/about/',
    page: 'about',
    title: 'About Us — HandLoan.ai',
    description:
      'HandLoan.ai is a digital loan facilitation platform by Jatta M Kommerce Private Limited (CIN U58200MH2024PTC428411). We are not a lender; loans are offered by our listed lending partners.',
  },
  {
    path: '/services/',
    page: 'services',
    title: 'Personal Loans & Business Loans — HandLoan.ai',
    description:
      'Learn about loan amounts, tenures, interest rates, eligibility and documents for personal and business loans. The lending partner sets these and shows them in its Key Facts Statement.',
  },
  {
    path: '/emi-calculator/',
    page: 'emi',
    title: 'EMI Calculator — HandLoan.ai',
    description:
      'Estimate your monthly EMI, total interest and total amount payable for a personal or business loan with the HandLoan.ai EMI calculator.',
  },
  {
    path: '/lending-partners/',
    page: 'partners',
    title: 'Lending Partners — HandLoan.ai',
    description:
      'The lending partners HandLoan.ai works with, including L&T Finance, Aditya Birla Capital, Bajaj Finance, DMI Finance, Karnataka Bank, Respo Financial Capital (Zype), Fibe, FlexiLoans and GROx (MyShubhLife).',
  },
  {
    path: '/faq/',
    page: 'faq',
    title: 'Frequently Asked Questions — HandLoan.ai',
    description:
      'Answers about how HandLoan.ai works, who provides your loan, charges, eligibility, credit checks, repayment, cancellation and complaints.',
  },
  {
    path: '/careers/',
    page: 'careers',
    title: 'Careers — HandLoan.ai',
    description: 'Build the future of digital lending in India with HandLoan.ai. See how to apply.',
  },
  {
    path: '/contact/',
    page: 'contact',
    title: 'Contact Us — HandLoan.ai',
    description: 'Send a loan enquiry or reach HandLoan.ai support by phone, email or WhatsApp, Monday to Saturday, 9:30 AM – 6:30 PM IST.',
  },
  {
    path: '/grievance-redressal/',
    page: 'grievance',
    title: 'Grievance Redressal — HandLoan.ai',
    description:
      'How to raise a complaint with HandLoan.ai, contact our Grievance Officer, reach a lender, and escalate to the RBI Complaint Management System.',
  },
  {
    path: '/disclaimer/',
    page: 'disclaimer',
    title: 'Disclaimer — HandLoan.ai',
    description: 'Important information about HandLoan.ai, loan offers, approvals, charges and calculators.',
  },
  {
    path: '/terms/',
    page: 'terms',
    title: 'Terms & Conditions — HandLoan.ai',
    description: 'Terms governing the use of the HandLoan.ai website, app and services.',
  },
  {
    path: '/privacy-policy/',
    page: 'privacy',
    title: 'Privacy Policy — HandLoan.ai',
    description: 'How HandLoan.ai collects, uses, shares, stores and protects personal data.',
  },
  {
    path: '/refund-policy/',
    page: 'refund',
    title: 'Refund & Cancellation Policy — HandLoan.ai',
    description:
      'How to withdraw an application, exit a loan during the cooling-off period, or report a payment issue.',
  },
  {
    path: '/404.html',
    page: 'notFound',
    title: 'Page not found — HandLoan.ai',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  },
]

export function normalizePath(pathname) {
  let p = pathname.replace(/index\.html$/, '')
  if (!p.endsWith('/') && !p.endsWith('.html')) p += '/'
  return p
}

export function findRoute(pathname) {
  const p = normalizePath(pathname)
  return routes.find((r) => r.path === p) || routes.find((r) => r.page === 'notFound')
}
