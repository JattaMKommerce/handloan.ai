import Icon from './Icon.jsx'
import { images } from '../config/images.js'
import { lendingPartners, representativeExample, site } from '../config/site.js'
import { appExternal, appHref, facts } from '../lib/derived.js'
import { pct, representative, rupees } from '../lib/loan.js'

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

export function AppButton({ className = 'btn btn--primary', children = 'Get the App' }) {
  return (
    <a className={className} href={appHref} {...(appExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
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
        <strong>{site.brand} is not a lender.</strong> We are a Lending Service Provider. Loans are sanctioned and
        disbursed by our <a href="/lending-partners/">RBI-regulated lending partners</a>, subject to their credit
        assessment and policies. Approval is not guaranteed.
      </p>
    </div>
  )
}

/** Key loan facts strip — sits right under the home hero. */
export function QuickFacts() {
  const items = [
    { icon: 'rupee', label: 'Loan amount', value: facts.amount },
    { icon: 'calendar', label: 'Repayment tenure', value: facts.tenure, sub: 'No short-term or payday loans' },
    { icon: 'percent', label: 'Interest rate', value: facts.rate, sub: 'Set by the lender, based on your profile' },
    { icon: 'shield', label: `${site.shortBrand} fee`, value: 'Nil', sub: 'Lender charges are shown in the KFS' },
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

/** Representative example with APR — the most important number for Meta & RBI reviewers. */
export function RepresentativeExample() {
  const ex = representativeExample
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
        any offer. Interest rates on loans facilitated by {site.brand} range from {facts.rate}, with repayment tenures
        of {facts.tenure}. Late payment may attract penal charges as stated in the KFS and can affect your credit
        score.
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

export function PartnersList({ limit }) {
  const list = limit ? lendingPartners.slice(0, limit) : lendingPartners
  return (
    <div className="partners">
      {list.map((p) => (
        <div className="partners__card" key={p.name}>
          {p.logo ? (
            <img src={p.logo} alt={p.name} className="partners__logo" loading="lazy" />
          ) : (
            <span className="partners__icon">
              <Icon name="bank" size={24} />
            </span>
          )}
          <div>
            <p className="partners__name">{p.name}</p>
            <p className="partners__meta">
              {p.type} · RBI Reg. {p.rbiReg}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function AppCta() {
  return (
    <section className="section">
      <div className="container">
        <div className="app-cta">
          <div className="app-cta__text">
            <p className="eyebrow eyebrow--light">Download the {site.brand} app</p>
            <h2>Ready to experience the difference?</h2>
            <p>
              Apply in a few simple steps, compare offers from our lending partners and review every charge before you
              decide — all from your phone.
            </p>
            <div className="btn-row">
              <AppButton className="btn btn--white">
                {site.app.playStoreUrl ? 'Get it on Google Play' : 'Get the App'}
              </AppButton>
              <a className="btn btn--ghost-light" href="/emi-calculator/">
                <Icon name="calculator" size={18} /> Calculate your EMI
              </a>
            </div>
            <p className="app-cta__fine">
              Available to Indian residents aged 18 and above. Loans are subject to the lender&apos;s credit assessment.
            </p>
          </div>
          <div className="app-cta__phone" aria-hidden="true">
            <div className="phone">
              <div className="phone__screen">
                <img src="/images/logo-mark.png" alt="" width="72" height="72" />
                <p className="phone__title">Your loan offers</p>
                <div className="phone__row"><span>Lender</span><span className="phone__bar" /></div>
                <div className="phone__row"><span>Amount</span><span className="phone__bar" /></div>
                <div className="phone__row"><span>APR</span><span className="phone__bar" /></div>
                <div className="phone__row"><span>EMI</span><span className="phone__bar" /></div>
                <div className="phone__btn">View KFS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
