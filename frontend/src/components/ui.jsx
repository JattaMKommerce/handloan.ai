import EnquiryForm from './ContactForm.jsx'
import Icon from './Icon.jsx'
import { images } from '../config/images.js'
import { representativeExample, site } from '../config/site.js'
import { ageRange, appApk, appHref, appLabel, appLinkProps, eligibilityLine, facts, verifiedLenders } from '../lib/derived.js'
import { emi, pct, representative, rupees } from '../lib/loan.js'

export function Img({ name, className = '', eager = false }) {
  const i = images[name]
  return (
    <img
      className={className}
      src={i.src}
      width={i.w}
      height={i.h}
      alt={i.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

export function PageHero({ eyebrow, title, children, crumbs }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs ? (
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <Icon name="chevronRight" size={14} />
            <span aria-current="page">{crumbs}</span>
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow eyebrow--light">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {children ? <p className="page-hero__lead">{children}</p> : null}
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, children, center = false }) {
  return (
    <div className={`section-head ${center ? 'section-head--center' : ''}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <p className="section-head__lead">{children}</p> : null}
    </div>
  )
}

export function AppButton({ className = 'btn btn--primary', children = appLabel }) {
  return (
    <a className={className} href={appHref} {...appLinkProps}>
      <Icon name="smartphone" size={18} /> {children}
    </a>
  )
}

/** The "we are not a lender" disclosure, used near every call to action. */
export function LenderNotice({ compact = false }) {
  return (
    <div className={`notice ${compact ? 'notice--compact' : ''}`} role="note">
      <Icon name="bank" size={22} />
      <p>
        <strong>{site.brand} is not a bank or NBFC and does not lend money.</strong> We are a loan facilitation
        platform. Loans are offered by our <a href="/lending-partners/">lending partners</a>, which sanction and
        disburse them at their sole discretion, subject to their own eligibility checks, verification and credit
        assessment. We share your enquiry with a lending partner only with your consent. Approval is not guaranteed
        and applications may be declined.
      </p>
    </div>
  )
}

/** "Start with an online enquiry" box — Home, About and Services. */
export function EnquiryBox() {
  return (
    <div className="notice" role="note">
      <Icon name="message" size={22} />
      <p>
        <strong>Start with an online enquiry.</strong> {site.brand} collects your enquiry and explains loan options in
        plain language. We share your enquiry with a lending partner listed on our Lending Partners page only with
        your consent. <strong>We are not a lender.</strong>
      </p>
    </div>
  )
}

/** Enquiry form section with eligibility — Home and Services. */
export function EnquirySection({ tint = true, title = 'Start with an online enquiry' }) {
  const e = site.eligibility
  return (
    <section className={`section ${tint ? 'section--tint' : ''}`} id="enquiry">
      <div className="container split split--top">
        <div>
          <SectionHead eyebrow="Loan enquiry" title={title} />
          <EnquiryBox />
          <h3 className="mt-3">Who can send an enquiry</h3>
          <ul className="checklist">
            <li>Indian resident</li>
            <li>Aged {e.ageMin} to {e.ageMax}</li>
            <li>Monthly income of {e.minMonthlyIncome} or more</li>
          </ul>
          <p className="muted small">
            Your enquiry is shared with a lending partner only after we tell you which lender and you give your
            consent.
          </p>
        </div>
        <div className="panel">
          <EnquiryForm />
        </div>
      </div>
    </section>
  )
}

/** Key loan facts strip — sits right under the home hero. */
export function QuickFacts() {
  const items = [
    { icon: 'rupee', label: 'Loan amount', value: facts.amount },
    { icon: 'calendar', label: 'Repayment tenure', value: facts.tenure, sub: 'No short-term or payday loans' },
    facts.rate
      ? { icon: 'percent', label: 'Interest rate', value: facts.rate, sub: 'Set by the lender, based on your profile' }
      : { icon: 'percent', label: 'Interest rate & APR', value: 'Set by the lender', sub: 'HandLoan.ai does not set rates or charges' },
    { icon: 'shield', label: `${site.shortBrand} fee`, value: 'Nil', sub: 'No fee for submitting an enquiry' },
  ]
  return (
    <section className="facts" aria-label="Key loan facts">
      <div className="container">
        <div className="facts__grid">
          {items.map((f) => (
            <div className="facts__item" key={f.label}>
              <span className="facts__icon">
                <Icon name={f.icon} size={22} />
              </span>
              <div>
                <p className="facts__label">{f.label}</p>
                <p className="facts__value">{f.value}</p>
                {f.sub ? <p className="facts__sub">{f.sub}</p> : null}
              </div>
            </div>
          ))}
        </div>
        <LenderNotice compact />
      </div>
    </section>
  )
}

/**
 * Representative example with APR — the most important number for Meta & RBI reviewers.
 * Until it is verified against a real lender KFS, only a plain illustrative EMI
 * calculation is shown (no invented processing fee or APR).
 */
export function RepresentativeExample() {
  const ex = representativeExample
  if (!ex.verified) return <IllustrativeEmi />
  const r = representative(ex)
  const rows = [
    ['Loan amount', rupees(ex.principal)],
    ['Tenure', `${ex.tenureMonths} months`],
    ['Interest rate (reducing balance)', `${pct(ex.annualRate)} p.a.`],
    [`Processing fee charged by lender (${pct(ex.processingFeePct)} + ${pct(ex.gstPct, 0)} GST)`, rupees(r.upfront)],
    ['Amount disbursed to your bank account', rupees(r.netDisbursed)],
    ['Monthly EMI', rupees(r.emi)],
    ['Total interest payable', rupees(r.totalInterest)],
    ['Total amount repayable (EMI × tenure)', rupees(r.totalRepay)],
    ['Total cost of the loan (interest + fees)', rupees(r.totalCost)],
  ]
  return (
    <div className="rep">
      <div className="rep__head">
        <div>
          <p className="eyebrow">Representative example</p>
          <h3>Know the full cost before you borrow</h3>
        </div>
        <div className="rep__apr">
          <span>Annual Percentage Rate (APR)</span>
          <strong>{pct(r.apr, 2)}</strong>
        </div>
      </div>
      <table className="rep__table">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="rep__note">
        This example is for illustration only. Your actual interest rate, charges and APR are decided by the lender
        based on its assessment of your application and are shown in the Key Facts Statement (KFS) before you accept
        any offer.{facts.rate ? ` Interest rates on loans facilitated by ${site.brand} range from ${facts.rate}.` : ''}{' '}
        Repayment tenures range from {facts.tenure}. Late payment may attract penal charges as stated in the KFS and
        can affect your credit score.
      </p>
    </div>
  )
}

function IllustrativeEmi() {
  const P = 100000
  const rate = 14
  const n = 24
  const e = emi(P, rate, n)
  const rows = [
    ['Loan amount', rupees(P)],
    ['Tenure', `${n} months`],
    ['Example interest rate (reducing balance)', `${pct(rate)} p.a.`],
    ['Monthly EMI', rupees(e)],
    ['Total interest payable', rupees(e * n - P)],
    ['Total amount repayable', rupees(e * n)],
  ]
  return (
    <div className="rep">
      <div className="rep__head">
        <div>
          <p className="eyebrow">Illustrative EMI calculation</p>
          <h3>See how an EMI is worked out</h3>
        </div>
      </div>
      <table className="rep__table">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="rep__note">
        This is a mathematical illustration using an example rate. It is <strong>not a loan offer</strong> and does
        not represent any lender&apos;s pricing. It excludes processing fees and other charges. Your actual interest
        rate, all fees and charges, and the Annual Percentage Rate (APR), which includes interest and fees, are set by
        the lending partner and shown in its Key Facts Statement (KFS) before you accept. Repayment tenures range from{' '}
        {facts.tenure}.
      </p>
    </div>
  )
}

export function FraudNotice() {
  return (
    <section className="section section--tint">
      <div className="container">
        <div className="fraud">
          <div className="fraud__icon">
            <Icon name="alert" size={30} />
          </div>
          <div>
            <h2 className="fraud__title">Stay safe from loan fraud</h2>
            <ul className="checklist checklist--two">
              <li>{site.brand} <strong>never</strong> asks for any upfront payment to process, approve or disburse a loan.</li>
              <li>We never ask for your OTP, UPI PIN, CVV, card number or passwords.</li>
              <li>Loans are disbursed only by the lender named in your KFS, directly to your bank account.</li>
              <li>
                Check that a lender is listed on our <a href="/lending-partners/">Lending Partners</a> page, and never pay
                anyone an upfront fee in {site.brand}&apos;s name.
              </li>
              <li>Repay only through the lender&apos;s official channels shown in your loan agreement.</li>
              <li>
                Check a lender&apos;s registration on the{' '}
                <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer">RBI website</a>.
              </li>
              <li>
                Report fraud at{' '}
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a> or
                call the national helpline <strong>1930</strong>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FaqList({ items }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details className="faq__item" key={f.q}>
          <summary>
            <span>{f.q}</span>
            <Icon name="chevronDown" size={20} className="faq__chev" />
          </summary>
          <div className="faq__a">{f.a}</div>
        </details>
      ))}
    </div>
  )
}

/** Shown wherever lenders would be listed while there is no active lending partner. */
export function PartnersPending() {
  const g = site.grievance
  return (
    <div className="notice notice--stack" role="note">
      <Icon name="shield" size={22} />
      <div>
        <p>
          <strong>No Active Lending Partner At Present</strong>
        </p>
        <p>
          As of {site.partnerStatus.asOf}, {site.brand} has no active partnership with any bank or NBFC.
        </p>
        <p>
          We do not share your enquiry with any lender today. We will publish here the full registered name, RBI
          Certificate of Registration number, website and grievance contact of each lender <strong>before</strong> we
          start sharing any enquiry with that lender.
        </p>
        <p>Your enquiry is stored only with {site.brand} and is not sent to any lender until then.</p>
        <p>
          Do not pay anyone who claims to be a {site.brand} partner lender. If you are contacted in our name asking for
          money, OTP or documents, report it to <a href={`mailto:${g.email}`}>{g.email}</a> and{' '}
          <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a> (1930).
        </p>
      </div>
    </div>
  )
}

/**
 * Lending-partner logos moving left → right in an endless loop. The row is rendered twice
 * (second copy hidden from screen readers) and the track slides by exactly one row width,
 * so the loop is seamless. Pauses on hover/focus; shown as a still grid for visitors who
 * turn off animations (prefers-reduced-motion).
 */
export function PartnersList() {
  if (!verifiedLenders.length) return <PartnersPending />
  const row = (copy) => (
    <ul className="marquee__row" aria-hidden={copy ? 'true' : undefined}>
      {verifiedLenders.map((p) => (
        <li className={`marquee__item ${p.logoOnDark ? 'marquee__item--dark' : ''}`} key={p.brandName}>
          <img src={p.logo} alt={copy ? '' : p.brandName} title={p.brandName} loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" role="region" aria-label="Our lending partners">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

export function AppCta() {
  return (
    <section className="section">
      <div className="container">
        <div className="app-cta">
          <div className="app-cta__text">
            <p className="eyebrow eyebrow--light">
              {site.app.playStoreUrl || appApk ? `Download the ${site.brand} app` : 'Start your loan enquiry'}
            </p>
            <h2>Ready to experience the difference?</h2>
            <p>
              Understand loan options, then review the lending partner&apos;s offer and every charge in its Key Facts
              Statement before you decide.
            </p>
            <div className="btn-row">
              <AppButton className="btn btn--white">
                {site.app.playStoreUrl ? 'Get it on Google Play' : appApk ? 'Download for Android' : 'Start your enquiry'}
              </AppButton>
              <a className="btn btn--ghost-light" href="/emi-calculator/">
                <Icon name="calculator" size={18} /> Calculate your EMI
              </a>
            </div>
            <p className="app-cta__fine">
              Available to {eligibilityLine}. {site.brand} accepts enquiries only from age {ageRange}. Any loan would
              be subject to a lender&apos;s credit assessment.
            </p>
            {appApk ? (
              <p className="app-cta__fine">
                Android app, version {appApk.version} ({appApk.size}). Download it only from {site.brand}. The app is not
                on Google Play yet, so your phone may ask you to allow the install.{' '}
                <span className="app-cta__hash">SHA-256: {appApk.sha256}</span>
              </p>
            ) : null}
          </div>
          <div className="app-cta__phone" aria-hidden="true">
            <div className="phone">
              <div className="phone__screen">
                <img src="/images/logo-mark.png" alt="" width="72" height="72" />
                <p className="phone__title">Your loan enquiry</p>
                <div className="phone__row"><span>Loan type</span><span className="phone__bar" /></div>
                <div className="phone__row"><span>Amount</span><span className="phone__bar" /></div>
                <div className="phone__row"><span>City</span><span className="phone__bar" /></div>
                <div className="phone__row"><span>Income</span><span className="phone__bar" /></div>
                <div className="phone__btn">Send enquiry</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
