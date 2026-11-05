import { PageHero } from './ui.jsx'
import { site } from '../config/site.js'

export default function LegalLayout({ title, crumbs, children }) {
  return (
    <>
      <PageHero crumbs={crumbs || title} title={title} />
      <section className="section">
        <div className="container narrow">
          <article className="prose legal">
            <p className="legal__date">
              <strong>Effective date</strong> · {site.legal.effectiveDate}
            </p>
            {children}
          </article>
        </div>
      </section>
    </>
  )
}

/** "Label · value" lines used for grievance / contact blocks in the policies. */
export function KV({ rows }) {
  return (
    <p className="legal__kv">
      {rows.map(([k, v], i) => (
        <span key={k}>
          <strong>{k}</strong> · {v}
          {i < rows.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  )
}

export function GrievanceBlock({ label = 'HandLoan.ai Grievance Officer' }) {
  const g = site.grievance
  return (
    <KV
      rows={[
        [label, `${g.name}, ${g.designation}`],
        ['Email', <a key="e" href={`mailto:${g.email}`}>{g.email}</a>],
        ['Phone', <a key="p" href={`tel:${g.phoneHref}`}>{g.phoneDisplay}</a>],
        ['Postal address', g.address],
        ['Working hours', site.contact.hours],
        [
          'Response time',
          `Customer support (${site.contact.email}) within ${g.supportResolution}; Grievance Officer within ${g.officerResolution}. Acknowledgement within ${g.acknowledgement}.`,
        ],
      ]}
    />
  )
}

/** Operator, CIN and both addresses — used in the policies. */
export function CompanyBlock() {
  const c = site.company
  return (
    <KV
      rows={[
        ['Operated by', `${c.legalName} (brand: ${site.brand})`],
        ['CIN', c.cin],
        ['Registered address', c.registeredOffice],
        ['Operating office', c.operatingOffice],
        ['Support', `${site.contact.email} · ${site.contact.phoneDisplay} · ${site.contact.hours}`],
      ]}
    />
  )
}
