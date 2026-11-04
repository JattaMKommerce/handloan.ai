import Icon from '../components/Icon.jsx'
import { Img, PageHero, SectionHead } from '../components/ui.jsx'
import { site } from '../config/site.js'

const CULTURE = [
  ['heart', 'Customer First', 'We obsess over user experience. Every line of code, design and strategy starts with the customer’s needs.'],
  ['eye', 'Radical Transparency', 'Honest communication, constructive feedback and shared knowledge are part of how we work.'],
  ['bulb', 'Innovation with Purpose', 'We use technology like AI and the ONDC network to solve real-world problems.'],
  ['shield', 'Integrity & Security', 'We build with trust, holding ourselves to high standards of security and ethics.'],
]

export default function Careers() {
  const mail = site.contact.careersEmail
  return (
    <>
      <PageHero crumbs="Careers" eyebrow="Build the future of finance" title="Don't just find a job. Find your mission.">
        Join us in making regulated credit simple, transparent and accessible across India.
      </PageHero>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead eyebrow={`Why ${site.brand}?`} title="Work where finance meets technology" />
            <p>
              {site.brand} is a brand of {site.company.legalName}, working at the exciting intersection of finance and
              technology. Our mission is to make credit accessible through a seamless, transparent and digital-first
              experience — and we can&apos;t do it alone.
            </p>
            <p>
              We&apos;re looking for passionate, innovative and driven people who want to see their work make a
              tangible impact. In a tech-driven, opportunity-rich environment, you&apos;ll grow through learning,
              ownership and collaboration.
            </p>
          </div>
          <div className="split__media">
            <Img name="careers" className="rounded-img" />
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead center eyebrow="Our culture" title="Innovate, collaborate, empower" />
          <div className="cards cards--4">
            {CULTURE.map(([icon, title, text]) => (
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
        <div className="container narrow">
          <div className="panel panel--accent">
            <h2>How to apply</h2>
            <p>
              Email your CV to <a href={`mailto:${mail}?subject=Career%20application`}>{mail}</a> with the role you are
              interested in in the subject line, and a short note about yourself. If your profile matches a current or
              upcoming opening, our team will reach out.
            </p>
            <a className="btn btn--primary" href={`mailto:${mail}?subject=Career%20application`}>
              <Icon name="mail" size={18} /> Email your CV
            </a>
            <p className="muted small mt-2">
              <Icon name="alert" size={14} /> {site.brand} never charges candidates any fee for interviews, training or
              job offers. If anyone asks you for money in our name, please report it to {site.contact.email}.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
