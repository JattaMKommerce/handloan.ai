/** Values derived from config, shared by several components. */
import { products, site } from '../config/site.js'
import { pct, rupeesShort } from './loan.js'

export const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  'Hi HandLoan.ai, I would like to know more about your loans.',
)}`

export const appHref = site.app.playStoreUrl || '/contact/'
export const appExternal = Boolean(site.app.playStoreUrl)

const p = products.personal
const b = products.business

export const facts = {
  amount: `${rupeesShort(Math.min(p.amountMin, b.amountMin))} – ${rupeesShort(Math.max(p.amountMax, b.amountMax))}`,
  tenure: `${Math.min(p.tenureMinMonths, b.tenureMinMonths)} – ${Math.max(p.tenureMaxMonths, b.tenureMaxMonths)} months`,
  rate: `${pct(Math.min(p.rateMin, b.rateMin))} – ${pct(Math.max(p.rateMax, b.rateMax))} p.a.`,
}

export const YEAR = new Date().getFullYear()
