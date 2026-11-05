import ContactForm from '../components/ContactForm.jsx'
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
                <h2>Level 1: Customer support</h2>
                <p>
                  Email or call us with your enquiry reference (if any) and a short description of the issue. We aim to
                  resolve complaints at this level within <strong>{g.supportResolution}</strong>.
                </p>
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
                <h2>Level 2: Grievance Officer</h2>
                <p>
                  If you are not satisfied with the response, or haven&apos;t received one, write to our Grievance
                  Officer. We aim to resolve complaints at this level within <strong>{g.officerResolution}</strong>.
                </p>
                <dl className="info-list info-list--compact">
                  <div><dt>Name</dt><dd>{g.name}</dd></div>
                  <div><dt>Designation</dt><dd>{g.designation}</dd></div>
                  <div><dt>Email</dt><dd><a href={`mailto:${g.email}`}>{g.email}</a></dd></div>
                  <div><dt>Phone</dt><dd><a href={`tel:${g.phoneHref}`}>{g.phoneDisplay}</a></dd></div>
                  <div><dt>Postal address</dt><dd>{g.address}</dd></div>
                  <div><dt>Working hours</dt><dd>{site.contact.hours}</dd></div>
                  <div>
                    <dt>Response time</dt>
                    <dd>
                      Acknowledgement within {g.acknowledgement} and resolution within {g.officerResolution} for{' '}
                      {site.brand} complaints. For complaints about a loan from a lender, {g.lenderResolution} via the
                      lender.
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
            <li className="levels__item">
              <span className="levels__num">3</span>
              <div>
                <h2>Level 3: Reserve Bank of India (RBI Ombudsman)</h2>
                <p>
                  If you have a complaint about a loan from one of our lending partners, first contact that
                  lender&apos;s grievance redressal officer. If the lender rejects your complaint, you are not satisfied
                  with its response, or you receive no response within {g.lenderResolution}, you may escalate an
                  eligible complaint through the RBI&apos;s Complaint Management System under the Reserve Bank –
                  Integrated Ombudsman Scheme.
                </p>
                <a className="btn btn--outline" href="https://cms.rbi.org.in/" target="_blank" rel="noopener noreferrer">
                  RBI Complaint Management System (cms.rbi.org.in) <Icon name="external" size={16} />
                </a>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section--tint" id="complaint">
        <div className="container narrow">
          <SectionHead eyebrow="Raise a complaint online" title="Grievance form">
            Your complaint is emailed to {g.email} and marked for our Grievance Officer, {g.name}.
          </SectionHead>
          <div className="panel">
            <ContactForm variant="grievance" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow prose">
          <SectionHead eyebrow="Your rights" title="Other remedies remain available" />
          <p>
            Your right to approach a competent court, consumer forum or regulator is not affected by this process. Do
            not pay anyone who claims to be a {site.brand} partner lender. To report a suspected fraud, write to{' '}
            <a href={`mailto:${g.email}`}>{g.email}</a>, visit{' '}
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a> or call
            the national cyber-crime helpline <strong>1930</strong>.
          </p>
        </div>
      </section>
    </>
  )
}
