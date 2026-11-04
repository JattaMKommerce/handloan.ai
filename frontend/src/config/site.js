/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HandLoan.ai — SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every company detail, contact, rate, partner and legal placeholder used on
 *  the website lives here. Edit this file only — every page updates.
 *
 *  Anything wrapped in TODO(...) shows up on the page as "[TODO: …]" and is
 *  listed as a warning by `npm run build`. Do NOT go live (or run Meta ads)
 *  until the build prints "No TODO placeholders found".
 *
 *  Meta reviewers compare your ads, this website and your app. Every number
 *  here must match your lender agreements, the app and your ad copy exactly.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const TODO = (label) => `[TODO: ${label}]`

export const site = {
  brand: 'HandLoan.ai',
  shortBrand: 'HandLoan',
  url: 'https://handloan.ai',
  tagline: 'Your digital loan partner',

  company: {
    legalName: 'Jatta M Kommerce Private Limited',
    cin: 'U58200MH2024PTC428411',
    registeredOffice:
      '1st Floor, Shop No. 220, Building No. 3, Citi Mall, Link Road, Andheri (West), Mumbai, Maharashtra 400053, India',
    // Optional second office. Leave '' to hide it everywhere (footer, About, Contact).
    branchOffice: '',
    foundedYear: 2024,
  },

  contact: {
    email: 'help@handloan.ai',
    phoneDisplay: '+91 99866 07600',
    phoneHref: '+919986607600',
    whatsapp: '919986607600',
    hours: TODO('Support hours, e.g. Monday to Saturday, 10:00 AM to 6:00 PM'),
    careersEmail: 'help@handloan.ai',
  },

  // Required on the website by RBI digital-lending rules and referenced in all policies.
  grievance: {
    name: TODO('Grievance Officer full name'),
    designation: TODO('Grievance Officer designation'),
    email: TODO('Grievance email'),
    phone: TODO('Grievance direct phone'),
    address: TODO('Grievance correspondence address'),
  },

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61578779275003',
    instagram: 'https://www.instagram.com/handloan.ai',
    youtube: 'https://www.youtube.com/@handloan-ai',
  },

  // iamkratu.ai chatbot — its hosted chat page opens in an iframe when a visitor taps the
  // girl in the bottom-right corner. Set iframeSrc to '' to switch it off (the girl then
  // opens the WhatsApp / Call menu instead).
  chatbot: {
    iframeSrc: 'https://iamkratu.ai/customer-chat/?key=6fb4b16f7bd4afadee4f5ed451a89b14',
    title: 'HandLoan.ai Assistant',
    subtitle: 'Ask me about our loans',
  },

  app: {
    // Google Play listing URL. Leave '' until the app is live on Play Store.
    // Do NOT link to a direct .apk download — Meta and RBI both treat that as a red flag.
    playStoreUrl: '',
  },

  legal: {
    effectiveDate: TODO('Policy publication date, e.g. 10 November 2026'),
    refundWorkingDays: TODO('number of working days, e.g. 7'),
    serviceProviders: TODO(
      'Verified names, purposes, data categories and privacy links for lenders, ONDC route participants, KYC and credit-check providers, hosting/support vendors and analytics providers',
    ),
    retentionSchedule: TODO(
      'Verified retention periods/criteria for incomplete applications, submitted applications, consent records, support records and transaction records',
    ),
    trackingNotice: TODO(
      'Verified cookie/tracking notice: list any analytics or advertising tools used on the website and app, or state that none are used',
    ),
  },
}

/**
 * Loan products. Values must match your lender agreements and the KFS shown in the app.
 * `verified: false` makes the build print a warning until you confirm the numbers.
 */
export const products = {
  verified: false,
  personal: {
    key: 'personal',
    name: 'Personal Loan',
    amountMin: 25000,
    amountMax: 2500000,
    tenureMinMonths: 12,
    tenureMaxMonths: 60,
    rateMin: 10.5,
    rateMax: 16,
    decisionTime: 'Typically 24–48 hours after complete documents (varies by lender)',
  },
  business: {
    key: 'business',
    name: 'Business Loan',
    amountMin: 25000,
    amountMax: 5000000,
    tenureMinMonths: 6,
    tenureMaxMonths: 60,
    rateMin: 12,
    rateMax: 18,
    decisionTime: 'Typically 2–3 business days after complete documents (varies by lender)',
  },
  processingFee: TODO('Lender processing fee range, e.g. 0%–3% of loan amount + GST'),
}

/**
 * Representative example shown on Home and Services.
 * Use a realistic example from an actual partner lender's KFS.
 */
export const representativeExample = {
  verified: false,
  principal: 100000,
  annualRate: 14,
  tenureMonths: 24,
  processingFeePct: 2,
  gstPct: 18,
}

/**
 * Regulated Entities (banks/NBFCs) you have a SIGNED arrangement with — RBI requires
 * an LSP to list them on its website. Only list lenders with an active agreement
 * (or reachable through your ONDC route). Never show a lender's logo without written
 * permission; `logo` is optional and should point to /images/partners/<file>.
 */
export const lendingPartners = [
  {
    name: TODO('Lender 1 legal name'),
    type: TODO('NBFC / Bank'),
    rbiReg: TODO('RBI Certificate of Registration no.'),
    products: 'Personal Loan, Business Loan',
    website: '',
    grievanceUrl: '',
    logo: '',
  },
  {
    name: TODO('Lender 2 legal name'),
    type: TODO('NBFC / Bank'),
    rbiReg: TODO('RBI Certificate of Registration no.'),
    products: 'Personal Loan',
    website: '',
    grievanceUrl: '',
    logo: '',
  },
]

/** Warnings printed by the build in addition to TODO placeholders. */
export function configWarnings() {
  const w = []
  if (!products.verified) w.push('products: confirm amounts, tenures and interest rates, then set products.verified = true')
  if (!representativeExample.verified)
    w.push('representativeExample: confirm against a real lender KFS, then set representativeExample.verified = true')
  if (!site.app.playStoreUrl) w.push('site.app.playStoreUrl is empty — "Get the app" buttons point to the Contact page')
  if (site.chatbot.iframeSrc)
    w.push(
      'chatbot: iamkratu chat opens in an iframe — after deploying, send one test message on the live site (and try it on a phone) before running ads',
    )
  return w
}
