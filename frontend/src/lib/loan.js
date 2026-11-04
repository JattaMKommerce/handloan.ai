/** Loan maths + Indian number formatting. Pure functions, safe for SSR. */

export function emi(principal, annualRatePct, months) {
  const r = annualRatePct / 12 / 100
  if (months <= 0) return 0
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return (principal * r * f) / (f - 1)
}

/** Yearly amortisation: [{ year, principal, interest, balance }] */
export function yearlySchedule(principal, annualRatePct, months) {
  const r = annualRatePct / 12 / 100
  const pay = emi(principal, annualRatePct, months)
  let balance = principal
  const rows = []
  for (let m = 1; m <= months; m++) {
    const interest = balance * r
    const princ = Math.min(pay - interest, balance)
    balance = Math.max(balance - princ, 0)
    const y = Math.ceil(m / 12)
    if (!rows[y - 1]) rows[y - 1] = { year: y, principal: 0, interest: 0, balance: 0 }
    rows[y - 1].principal += princ
    rows[y - 1].interest += interest
    rows[y - 1].balance = balance
  }
  return rows
}

/**
 * APR as an annualised internal rate of return (monthly IRR × 12), the way
 * RBI's Key Facts Statement computes it: borrower receives (principal − upfront
 * charges) and pays `months` equal EMIs.
 */
export function apr(netDisbursed, monthlyPayment, months) {
  let lo = 0
  let hi = 1 // 100% per month — far above any realistic rate
  const pv = (r) => {
    if (r === 0) return monthlyPayment * months
    return (monthlyPayment * (1 - Math.pow(1 + r, -months))) / r
  }
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2
    if (pv(mid) > netDisbursed) lo = mid
    else hi = mid
  }
  return ((lo + hi) / 2) * 12 * 100
}

export function representative({ principal, annualRate, tenureMonths, processingFeePct, gstPct }) {
  const pay = emi(principal, annualRate, tenureMonths)
  const roundedEmi = Math.round(pay)
  const fee = (principal * processingFeePct) / 100
  const gst = (fee * gstPct) / 100
  const upfront = fee + gst
  const totalRepay = roundedEmi * tenureMonths
  const totalInterest = totalRepay - principal
  return {
    emi: roundedEmi,
    fee,
    gst,
    upfront,
    netDisbursed: principal - upfront,
    totalInterest,
    totalRepay,
    totalCost: totalInterest + upfront,
    apr: apr(principal - upfront, roundedEmi, tenureMonths),
  }
}

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
export const rupees = (n) => `₹${inr.format(Math.round(n))}`

/** ₹25,000 · ₹1.5 lakh · ₹25 lakh · ₹1 crore */
export function rupeesShort(n) {
  if (n >= 10000000) return `₹${trim(n / 10000000)} crore`
  if (n >= 100000) return `₹${trim(n / 100000)} lakh`
  return rupees(n)
}
const trim = (x) => (Math.round(x * 100) / 100).toString()

export const pct = (n, digits = 2) => `${Number(n.toFixed(digits))}%`

export function tenureLabel(months) {
  if (months % 12 === 0) {
    const y = months / 12
    return `${y} year${y > 1 ? 's' : ''}`
  }
  return `${months} months`
}
