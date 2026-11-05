/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HandLoan.ai — SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every company detail, contact, rate, partner and legal placeholder used on
 *  the website lives here. Edit this file only — every page updates.
 *
 *  If you ever wrap a value in TODO(...), it shows on the page as "[TODO: …]"
 *  and `npm run build` lists it as a blocker. Do NOT go live (or run Meta ads)
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
    website: 'https://jattamkommerce.com',
    registeredOffice:
      '1st Floor, Shop No. 220, Building No. 3, Citi Mall, Link Road, Andheri (West), Mumbai, Maharashtra 400053, India',
    operatingOffice:
      'Jatta M Kommerce Pvt Ltd, REGUS, Unit No 2201A, 22nd Floor, World Trade Center, Brigade Gateway Campus, Malleswaram (W), Bangalore - 560055, Karnataka, India',
    foundedYear: 2024,
  },

  contact: {
    email: 'help@handloan.ai',
    phoneDisplay: '+91 99866 07600',
    phoneHref: '+919986607600',
    whatsapp: '919986607600',
    hours: 'Monday to Saturday, 9:30 AM – 6:30 PM IST (closed on public holidays)',
    hoursShort: 'Monday to Saturday, 9:30 AM – 6:30 PM IST',
    careersEmail: 'help@handloan.ai',
  },

  // Shown in the footer, Contact, Grievance and every policy. Complaints use the same mailbox as
  // support (help@handloan.ai); grievance-form emails arrive with "[Grievance]" in the subject,
  // so make sure the Grievance Officer reads that mailbox.
  grievance: {
    name: 'Amit',
    designation: 'Grievance Redressal Officer, Jatta M Kommerce Private Limited',
    email: 'help@handloan.ai',
    phoneDisplay: '+91 99866 07600',
    phoneHref: '+919986607600',
    address:
      'Jatta M Kommerce Pvt Ltd, REGUS, Unit No 2201A, 22nd Floor, World Trade Center, Brigade Gateway Campus, Malleswaram (W), Bangalore - 560055, Karnataka, India',
    supportResolution: '7 working days',
    officerResolution: '15 days',
    acknowledgement: '2 working days',
    lenderResolution: '30 days',
  },

  // 5 November 2026: management confirmed the lending partners listed in `lendingPartners`.
  // (The earlier "no active lending partner" version of the site is saved as git stash
  // "no-partner-version" — restore it with `git stash apply` if that ever changes.)
  partnerStatus: {
    hasActivePartner: true,
    asOf: '5 November 2026',
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
    subtitle: 'Ask me about loan options',
  },

  app: {
    // Google Play listing URL. Leave '' until the app is live on Play Store. When set, it wins over `apk`.
    playStoreUrl: '',
    // Direct Android download (added for testing, 5 November 2026).
    // ⚠ Meta and RBI treat direct APK downloads of financial apps as a red flag — see COMPLIANCE_REPORT.md.
    // The file lives in public/apk/ and is NOT in git (it is over GitHub's 100 MB limit): upload it to
    // public_html/apk/ on Hostinger yourself. Set url to '' to switch the download off — the app buttons
    // then go back to "Start Enquiry" and open the enquiry form.
    apk: {
      url: '/apk/app-2.1.4.apk',
      version: '2.1.4',
      size: '123 MB',
      sha256: '10f39d84eaf8d7d36169375ee5faf957a87594ca67a05a44f8bcf6b7e2c2cfde',
    },
  },

  // Enquiries are accepted only from people who meet all three.
  eligibility: {
    ageMin: 21,
    ageMax: 58,
    minMonthlyIncome: '₹15,000',
  },

  legal: {
    effectiveDate: '5 November 2026',
    retention: '24 months',
  },
}

/**
 * Loan products. Values must match your lender agreements and the KFS shown in the app.
 *
 * `verified: false` → the website does NOT show interest rates, processing fees or
 * decision timelines; it says "set by the lender, shown in the KFS" instead.
 * Set `verified: true` only after confirming every number against partner lender terms.
 * Amounts and tenures describe which loans HandLoan.ai facilitates and are always shown.
 */
export const products = {
  verified: false,
  repayment: 'Fixed monthly EMIs, usually by auto-debit (e-NACH) from your bank account',
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
  // Fill from the lender's KFS before setting verified: true (not shown while verified is false).
  processingFee: '',
}

/**
 * Representative example shown on Home and Services.
 * `verified: false` → only an illustrative EMI calculation is shown (no fee or APR).
 * Set `verified: true` after replacing these values with a real partner lender's KFS
 * example; the full example with processing fee and APR then appears.
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
 * Lending partners, as confirmed by HandLoan.ai management on 5 November 2026.
 * Shown in the moving logo strip (Home, Lending Partners page) and the partners table.
 * An entry appears on the website ONLY when `verified: true`.
 *
 * Names and logos are taken from each company's own website (November 2026). `website` is kept
 * for reference only — it is deliberately NOT shown on the site (we don't send customers to lenders).
 * `rbiReg` must be copied from the signed agreement / the lender's RBI Certificate of
 * Registration — never guessed. Until it is filled, the table links to the RBI website instead.
 * `logoOnDark: true` = the official logo is white, so its tile gets a dark background.
 */
const L = (o) => ({ verified: true, rbiReg: '', grievanceUrl: '', logoOnDark: false, ...o })
export const lendingPartners = [
  L({
    brandName: 'GROx (formerly MyShubhLife)',
    legalName: '',
    classification: 'Digital lending platform',
    website: 'https://www.myshubhlife.com',
    logo: '/images/partners/grox.webp',
  }),
  L({
    brandName: 'FlexiLoans',
    legalName: '',
    classification: 'Digital lending platform',
    website: 'https://flexiloans.com',
    logo: '/images/partners/flexiloans.svg',
  }),
  L({
    brandName: 'Fibe',
    legalName: '',
    classification: 'Digital lending platform',
    website: 'https://www.fibe.in',
    logo: '/images/partners/fibe.svg',
  }),
  L({
    brandName: 'Zype',
    legalName: '',
    classification: 'Digital lending app of Respo Financial Capital',
    website: 'https://www.getzype.com',
    logo: '/images/partners/zype.webp',
    logoOnDark: true,
  }),
  L({
    brandName: 'Respo Financial Capital',
    legalName: 'Respo Financial Capital Private Limited',
    classification: 'NBFC',
    website: 'https://respo.co.in',
    logo: '/images/partners/respo.svg',
  }),
  L({
    brandName: 'L&T Finance',
    legalName: 'L&T Finance Limited',
    classification: 'NBFC',
    website: 'https://www.ltfinance.com',
    logo: '/images/partners/lt-finance.svg',
  }),
  L({
    brandName: 'Aditya Birla Capital (formerly Aditya Birla Finance)',
    legalName: 'Aditya Birla Capital Limited',
    classification: 'NBFC',
    website: 'https://www.adityabirlacapital.com',
    logo: '/images/partners/aditya-birla-capital.svg',
  }),
  L({
    brandName: 'Bajaj Finance (Bajaj Finserv)',
    legalName: 'Bajaj Finance Limited',
    classification: 'NBFC',
    website: 'https://www.bajajfinserv.in',
    logo: '/images/partners/bajaj-finance.webp',
    logoOnDark: true,
  }),
  L({
    brandName: 'DMI Finance',
    legalName: 'DMI Finance Private Limited',
    classification: 'NBFC',
    website: 'https://www.dmifinance.in',
    logo: '/images/partners/dmi-finance.svg',
  }),
  L({
    brandName: 'Karnataka Bank',
    legalName: 'Karnataka Bank Limited',
    classification: 'Bank',
    website: 'https://www.karnatakabank.bank.in',
    logo: '/images/partners/karnataka-bank.webp',
  }),
]

/**
 * Technology / service partners involved in the customer journey (not lenders).
 * Shown on the Lending Partners page only when `verified: true`.
 */
export const technologyPartners = [
  {
    verified: true, // embedded on this website (Assistant.jsx)
    name: 'iamkratu.ai',
    role: 'Provides the AI chat assistant on this website',
    website: 'https://iamkratu.ai',
  },
  {
    verified: false, // confirm HandLoan.ai's ONDC participation before switching on
    name: 'Open Network for Digital Commerce (ONDC)',
    role: 'Open network through which loan applications can reach participating regulated lenders',
    website: 'https://ondc.org',
  },
]

/** Warnings printed by the build in addition to TODO placeholders. */
export function configWarnings() {
  const w = []
  if (!products.verified) w.push('products: interest rates, fees and decision times are hidden (each lending partner sets them in its KFS)')
  if (!representativeExample.verified) w.push('representativeExample: only an illustrative EMI is shown (no lender KFS yet)')
  const shown = lendingPartners.filter((p) => p.verified)
  if (!shown.length) w.push('BLOCKER: no verified lending partner, but the site copy says HandLoan.ai has lending partners')
  const noReg = shown.filter((p) => !p.rbiReg).map((p) => p.brandName)
  if (noReg.length)
    w.push(`lendingPartners: RBI registration number missing for ${noReg.length} of ${shown.length} partners — copy them from the agreements into site.js before running ads (${noReg.join(', ')})`)
  if (shown.some((p) => !p.legalName))
    w.push('lendingPartners: registered company name missing for: ' + shown.filter((p) => !p.legalName).map((p) => p.brandName).join(', '))
  if (products.verified && !products.processingFee) w.push('BLOCKER: products.verified is true but products.processingFee is empty')
  if (!site.app.playStoreUrl && site.app.apk?.url)
    w.push(`site.app.apk: direct APK download is ON (${site.app.apk.url}) — Meta/RBI red flag; upload the file to public_html/apk/ separately`)
  else if (!site.app.playStoreUrl) w.push('site.app.playStoreUrl is empty — "Get the App" buttons read "Start Enquiry" and open the enquiry form')
  if (site.chatbot.iframeSrc)
    w.push(
      'chatbot: iamkratu chat opens in an iframe — after deploying, send one test message on the live site (and try it on a phone) before running ads',
    )
  return w
}
