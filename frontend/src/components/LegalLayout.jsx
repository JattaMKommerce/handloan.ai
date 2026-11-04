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

export function GrievanceBlock({ label = 'HandLoan Grievance Officer' }) {
  const g = site.grievance
  return (
    <KV
      rows={[
        [label, `${g.name}, ${g.designation}`],
        ['Email and phone', `${g.email} · ${g.phone}`],
        ['Postal address', g.address],
      ]}
    />
  )
}
