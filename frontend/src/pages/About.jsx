import Icon from '../components/Icon.jsx'
import { AppCta, EnquiryBox, Img, LenderNotice, PageHero, SectionHead } from '../components/ui.jsx'
import { site } from '../config/site.js'

const VALUES = [
  ['heart', 'Customer First', 'Every screen, policy and process is designed around what borrowers need to make a confident decision.'],
  ['eye', 'Radical Transparency', 'Honest disclosures about who we are and what we do, and no fees charged to borrowers by us.'],
  ['bulb', 'Innovation with Purpose', 'We use technology like AI to solve real problems, not for the sake of it.'],
  ['shield', 'Integrity & Security', 'We handle data only with consent and never ask for PAN, Aadhaar or bank details in our enquiry form.'],
  ['users', 'Empowerment through Access', 'We want every eligible Indian to have fair, simple access to regulated credit.'],
]

const DOES = [
  ['file', 'Online loan enquiry', 'A simple digital enquiry for personal and business loans.'],
  ['users', 'Plain-language guidance', 'Explaining loan types, EMIs, APR and charges in simple words.'],
  ['layers', 'Connecting you with lenders', 'Sharing your enquiry with a lending partner listed on our website — only with your consent.'],
  ['message', 'Support & grievance handling', 'Helping you through the process and resolving issues about our services.'],
]

export default function About() {
  const c = site.company
  return (
    <>
      <PageHero crumbs="About Us" eyebrow="About us" title="Your digital loan partner">
        Skip the bank queue. We help you start a loan enquiry with our lending partners — online, transparently and
        securely.
      </PageHero>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead eyebrow="Who we are" title="Making regulated credit simple and accessible" />
            <p>
              {site.brand} is a brand of <strong>{c.legalName}</strong>, a technology company working at the
              intersection of finance and AI. Our mission is to make credit more accessible through a fully digital,
              paperless and transparent journey.
            </p>
            <p>
              We are <strong>not a lender</strong>. {site.brand} is a loan facilitation platform that works with the
              lending partners listed on our <a href="/lending-partners/">Lending Partners</a> page. The lender makes
              every credit decision, sets the loan terms and disburses the loan.
            </p>
            <LenderNotice />
            <EnquiryBox />
          </div>
          <div className="split__media">
            <Img name="about" className="rounded-img" />
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead center eyebrow="What we do" title="How we help you borrow better" />
          <div className="cards cards--4">
            {DOES.map(([icon, title, text]) => (
              <div className="feature" key={title}>
                <span className="feature__icon"><Icon name={icon} size={24} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="How we work" title="A clear model you can trust">
            Here is exactly how money and responsibility flow when you send an enquiry through {site.brand}.
          </SectionHead>
          <div className="cards cards--3">
            <div className="feature feature--plain">
              <h3>You pay us nothing</h3>
              <p>
                {site.brand} does not charge you any fee for submitting an enquiry. Never pay anyone an upfront fee —
                we never ask for one.
              </p>
            </div>
            <div className="feature feature--plain">
              <h3>A lender decides and disburses</h3>
              <p>
                The lending partner assesses your application, issues a Key Facts Statement and disburses any loan
                directly to your bank account.
              </p>
            </div>
            <div className="feature feature--plain">
              <h3>You repay the lender directly</h3>
              <p>
                Any loan you take from a lender is repaid to that lender through the channels in your loan agreement.
                {site.brand} does not collect loan repayments into its own account.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="mv">
            <div className="mv__card">
              <span className="feature__icon"><Icon name="target" size={24} /></span>
              <h3>Our mission</h3>
              <p>
                To make credit accessible to every eligible Indian through a seamless, transparent and digital-first
                experience, built on trust and responsible lending.
              </p>
            </div>
            <div className="mv__card">
              <span className="feature__icon"><Icon name="bulb" size={24} /></span>
              <h3>Our vision</h3>
              <p>To become India&apos;s most trusted digital loan partner for individuals and small businesses.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Our values" title="What guides us every day" />
          <div className="cards cards--5">
            {VALUES.map(([icon, title, text]) => (
              <div className="feature feature--center" key={title}>
                <span className="feature__icon"><Icon name={icon} size={24} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container narrow">
          <SectionHead center eyebrow="Company information" title="The company behind HandLoan.ai" />
          <dl className="info-list">
            <div><dt>Legal name</dt><dd>{c.legalName}</dd></div>
            <div><dt>Brand</dt><dd>{site.brand}</dd></div>
            <div><dt>CIN</dt><dd>{c.cin}</dd></div>
            <div><dt>Registered office</dt><dd>{c.registeredOffice}</dd></div>
            <div><dt>Operating office</dt><dd>{c.operatingOffice}</dd></div>
            <div><dt>Company website</dt><dd><a href={c.website} target="_blank" rel="noopener noreferrer">{c.website.replace(/^https?:\/\//, '')}</a></dd></div>
            <div><dt>Role</dt><dd>Loan facilitation platform — not a lender. Works with the lending partners listed on our <a href="/lending-partners/">Lending Partners</a> page.</dd></div>
            <div><dt>Support hours</dt><dd>{site.contact.hours}</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></dd></div>
            <div><dt>Phone</dt><dd><a href={`tel:${site.contact.phoneHref}`}>{site.contact.phoneDisplay}</a></dd></div>
          </dl>
        </div>
      </section>

      <AppCta />
    </>
  )
}
