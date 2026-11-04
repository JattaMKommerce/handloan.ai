import Icon from '../components/Icon.jsx'
import { PageHero, SectionHead } from '../components/ui.jsx'
import { site } from '../config/site.js'

export default function Grievance() {
  const g = site.grievance
  return (
    <>
      <PageHero crumbs="Grievance Redressal" eyebrow="We're listening" title="Grievance redressal">
        If something isn&apos;t right, we want to fix it. Here is how to raise a complaint and how to escalate it.
      </PageHero>

      <section className="section">
        <div className="container narrow">
          <ol className="levels">
            <li className="levels__item">
              <span className="levels__num">1</span>
              <div>
                <h2>Contact customer support</h2>
                <p>Email or call us with your application reference and a short description of the issue.</p>
                <ul className="plain">
                  <li><Icon name="mail" size={16} /> <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
                  <li><Icon name="phone" size={16} /> <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phoneDisplay}</a></li>
                  <li><Icon name="clock" size={16} /> {site.contact.hours}</li>
                </ul>
              </div>
            </li>
            <li className="levels__item">
              <span className="levels__num">2</span>
              <div>
                <h2>Escalate to our Grievance Officer</h2>
                <p>If you are not satisfied with the response, or haven&apos;t received one, write to our Grievance Officer.</p>
                <dl className="info-list info-list--compact">
                  <div><dt>Name</dt><dd>{g.name}</dd></div>
                  <div><dt>Designation</dt><dd>{g.designation}</dd></div>
                  <div><dt>Email</dt><dd>{g.email}</dd></div>
                  <div><dt>Phone</dt><dd>{g.phone}</dd></div>
                  <div><dt>Address</dt><dd>{g.address}</dd></div>
                </dl>
              </div>
            </li>
            <li className="levels__item">
              <span className="levels__num">3</span>
              <div>
                <h2>Complaints about a loan</h2>
                <p>
                  The lender is responsible for its credit decision, loan terms, disbursement, repayment and recovery.
                  Contact the lender&apos;s grievance redressal officer, whose details are in your Key Facts Statement
                  and on the lender&apos;s website. See our <a href="/lending-partners/">Lending Partners</a> page.
                </p>
              </div>
            </li>
            <li className="levels__item">
              <span className="levels__num">4</span>
              <div>
                <h2>Escalate to the Reserve Bank of India</h2>
                <p>
                  If the lender rejects your complaint, you are not satisfied with its response, or you receive no
                  response within 30 days, you may escalate an eligible complaint through the RBI&apos;s Complaint
                  Management System under the Reserve Bank – Integrated Ombudsman Scheme.
                </p>
                <a className="btn btn--outline" href="https://cms.rbi.org.in/" target="_blank" rel="noopener noreferrer">
                  RBI Complaint Management System <Icon name="external" size={16} />
                </a>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container narrow prose">
          <SectionHead eyebrow="Your rights" title="Other remedies remain available" />
          <p>
            Your right to approach a competent court, consumer forum or regulator is not affected by this process. To
            report a suspected fraud, visit <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a> or
            call the national cyber-crime helpline <strong>1930</strong>.
          </p>
        </div>
      </section>
    </>
  )
}
