import Icon from '../components/Icon.jsx'
import { PageHero, PartnersList, SectionHead } from '../components/ui.jsx'
import { site } from '../config/site.js'
import { verifiedLenders, verifiedTechPartners } from '../lib/derived.js'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

export default function Partners() {
  const roles = [
    {
      icon: 'smartphone',
      title: `${site.brand}: loan facilitation platform`,
      points: [
        'Provides the website and the online enquiry form',
        'Collects your enquiry with your consent and explains loan options in plain language',
        'Shares your enquiry with a lending partner listed on this page only after telling you which lender and taking your consent',
        'Handles support and complaints about its own services',
        'Does not lend money, approve loans or collect repayments',
      ],
    },
    {
      icon: 'bank',
      title: 'Lending partner: bank, NBFC or its lending platform',
      points: [
        'Decides eligibility, loan amount, interest rate and charges',
        'Issues the Key Facts Statement and loan agreement',
        'Disburses the loan to your bank account',
        'Collects repayments and services the loan',
        'Handles loan-related complaints through its grievance officer',
      ],
    },
    {
      icon: 'layers',
      title: 'Technology partners',
      points: [
        'Provide supporting technology, such as the chat assistant on this website',
        'Do not make lending decisions',
        'Are listed below',
      ],
    },
  ]

  return (
    <>
      <PageHero crumbs="Lending Partners" eyebrow="Regulated entities" title="Our lending partners">
        {site.brand} is a loan facilitation platform, not a lender. Loans are offered by the lending partners below,
        which make every credit decision.
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Who does what" title="Clear roles in every loan" />
          <div className="cards cards--3">
            {roles.map((r) => (
              <div className="feature" key={r.title}>
                <span className="feature__icon"><Icon name={r.icon} size={24} /></span>
                <h3>{r.title}</h3>
                <ul className="checklist small">
                  {r.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead center eyebrow="Lending partners" title="Who we work with">
            Loans are offered by these lending partners. {site.brand} is not a lender.
          </SectionHead>
          <PartnersList />
          {verifiedLenders.length ? (
            <div className="table-wrap mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Lending partner</th>
                    <th scope="col">Registered name</th>
                    <th scope="col">Type</th>
                    <th scope="col">RBI registration</th>
                  </tr>
                </thead>
                <tbody>
                  {verifiedLenders.map((p) => (
                    <tr key={p.brandName}>
                      <th scope="row">{p.brandName}</th>
                      <td>{p.legalName || 'Named in your loan offer and KFS'}</td>
                      <td>{p.classification}</td>
                      <td>
                        {p.rbiReg || (
                          <a href="https://www.rbi.org.in" {...ext}>
                            Verify on rbi.org.in <Icon name="external" size={14} />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          <p className="muted small mt-2">
            Logos and names belong to their respective owners. The lender for your loan is always named in your offer,
            Key Facts Statement (KFS) and loan agreement.
          </p>
        </div>
      </section>

      {verifiedTechPartners.length ? (
        <section className="section">
          <div className="container">
            <SectionHead eyebrow="Technology partners" title="Services that support the platform" />
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Partner</th>
                    <th scope="col">Role</th>
                    <th scope="col">Website</th>
                  </tr>
                </thead>
                <tbody>
                  {verifiedTechPartners.map((t) => (
                    <tr key={t.name}>
                      <th scope="row">{t.name}</th>
                      <td>{t.role}</td>
                      <td>
                        <a href={t.website} {...ext}>
                          {t.website.replace(/^https?:\/\//, '')} <Icon name="external" size={14} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted small mt-2">Technology partners do not make lending decisions.</p>
          </div>
        </section>
      ) : null}

      <section className="section section--tint">
        <div className="container narrow prose">
          <SectionHead eyebrow="Good to know" title="How lending partners work" />
          <ul>
            <li>
              We share your enquiry only with a lending partner listed on this page, and only after telling you which
              lender and taking your consent.
            </li>
            <li>
              The lender&apos;s name is shown on every offer, in the Key Facts Statement (KFS) and in your loan
              agreement. Your loan contract is always with that lender.
            </li>
            <li>
              You can verify any lender&apos;s registration on the{' '}
              <a href="https://www.rbi.org.in" {...ext}>Reserve Bank of India website</a>.
            </li>
            <li>
              Never pay anyone an upfront fee in {site.brand}&apos;s or a lending partner&apos;s name. Report it to{' '}
              <a href={`mailto:${site.grievance.email}`}>{site.grievance.email}</a> and{' '}
              <a href="https://cybercrime.gov.in" {...ext}>cybercrime.gov.in</a> (1930).
            </li>
            <li>
              For a complaint about {site.brand}, contact our Grievance Officer, {site.grievance.name}, at{' '}
              <a href={`mailto:${site.grievance.email}`}>{site.grievance.email}</a> or see{' '}
              <a href="/grievance-redressal/">Grievance Redressal</a>. For a complaint about a loan, contact that
              lender&apos;s grievance redressal officer (details are in your KFS).
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
