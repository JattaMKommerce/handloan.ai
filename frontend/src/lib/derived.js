/** Values derived from config, shared by several components. */
import { lendingPartners, products, site, technologyPartners } from '../config/site.js'
import { pct, rupeesShort } from './loan.js'

export const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  'Hi HandLoan.ai, I would like to know more about your loans.',
)}`

/** No app on Play Store yet → app buttons become "Start Enquiry" and open the enquiry form. */
export const appHref = site.app.playStoreUrl || '/contact/#enquiry'
export const appExternal = Boolean(site.app.playStoreUrl)
export const appLabel = site.app.playStoreUrl ? 'Get the App' : 'Start Enquiry'

const e = site.eligibility
/** "Indian residents aged 21 to 58 with a monthly income of ₹15,000 or more" */
export const eligibilityLine = `Indian residents aged ${e.ageMin} to ${e.ageMax} with a monthly income of ${e.minMonthlyIncome} or more`
export const ageRange = `${e.ageMin} to ${e.ageMax}`

/** One-line partner statement used across the site. */
export const PARTNER_LINE = `Loans are offered by the lending partners listed on our Lending Partners page.`

/** Rates, fees and timelines are only published once verified against lender terms. */
export const ratesVerified = Boolean(products.verified)
export const LENDER_SETS = 'Set by the lender, shown in the KFS'

const p = products.personal
const b = products.business

export const facts = {
  amount: `${rupeesShort(Math.min(p.amountMin, b.amountMin))} – ${rupeesShort(Math.max(p.amountMax, b.amountMax))}`,
  tenure: `${Math.min(p.tenureMinMonths, b.tenureMinMonths)} – ${Math.max(p.tenureMaxMonths, b.tenureMaxMonths)} months`,
  rate: ratesVerified ? `${pct(Math.min(p.rateMin, b.rateMin))} – ${pct(Math.max(p.rateMax, b.rateMax))} p.a.` : null,
}

/** "10.5% – 16% p.a." when verified, otherwise the lender-sets wording. */
export const rateRange = (prod) => (ratesVerified ? `${pct(prod.rateMin)} – ${pct(prod.rateMax)} p.a.` : LENDER_SETS)
export const decisionTime = (prod) => (ratesVerified ? prod.decisionTime : 'Varies by lender')
export const processingFee = () => (ratesVerified ? products.processingFee : 'Charged by the lender, if any — shown in the KFS')

export const verifiedLenders = lendingPartners.filter((x) => x.verified)
export const verifiedTechPartners = technologyPartners.filter((x) => x.verified)

export const YEAR = new Date().getFullYear()
