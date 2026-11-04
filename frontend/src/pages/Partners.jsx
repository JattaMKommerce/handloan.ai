import Icon from '../components/Icon.jsx'
import { PageHero, SectionHead } from '../components/ui.jsx'
import { lendingPartners, site } from '../config/site.js'

export default function Partners() {
  return (
    <>
      <PageHero crumbs="Lending Partners" eyebrow="Regulated entities" title="Our lending partners">
        {site.brand} works as a Lending Service Provider (LSP) for the RBI-regulated entities listed below, in line
        with the Reserve Bank of India (Digital Lending) Directions, 2025.
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Lender</th>
                  <th scope="col">Type</th>
                  <th scope="col">RBI registration</th>
                  <th scope="col">Products</th>
                  <th scope="col">Lender website &amp; grievance</th>
                </tr>
              </thead>
              <tbody>
                {lendingPartners.map((p) => (
                  <tr key={p.name}>
                    <th scope="row">{p.name}</th>
                    <td>{p.type}</td>
                    <td>{p.rbiReg}</td>
                    <td>{p.products}</td>
                    <td>
                      {p.website ? (
                        <a href={p.website} target="_blank" rel="noopener noreferrer">
                          Website <Icon name="external" size={14} />
                        </a>
                      ) : null}
                      {p.website && p.grievanceUrl ? ' · ' : null}
                      {p.grievanceUrl ? (
                        <a href={p.grievanceUrl} target="_blank" rel="noopener noreferrer">
                          Grievance redressal <Icon name="external" size={14} />
                        </a>
                      ) : null}
                      {!p.website && !p.grievanceUrl ? 'Shown in your KFS' : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container narrow prose">
          <SectionHead eyebrow="Good to know" title="How lending partners work" />
          <ul>
            <li>
              The lender&apos;s name is shown on every offer, in the Key Facts Statement (KFS) and in your loan
              agreement. Your loan contract is always with that lender.
            </li>
            <li>
              Where your application is routed through the Open Network for Digital Commerce (ONDC), offers may come
              from regulated lenders participating on the network. Each offer names the lender before you accept.
            </li>
            <li>
              When more than one lender is able to make an offer, you can compare all matching offers — including the
              lender&apos;s name, amount, tenure, APR and EMI — in the app.
            </li>
            <li>
              You can verify any lender&apos;s registration on the{' '}
              <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer">Reserve Bank of India website</a>.
            </li>
            <li>
              For a complaint about a loan, contact the lender&apos;s grievance redressal officer (details in your KFS).
              For a complaint about {site.brand}, see <a href="/grievance-redressal/">Grievance Redressal</a>.
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
