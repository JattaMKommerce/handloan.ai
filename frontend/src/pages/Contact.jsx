import ContactForm from '../components/ContactForm.jsx'
import Icon from '../components/Icon.jsx'
import { EnquiryBox, Img, PageHero } from '../components/ui.jsx'
import { site } from '../config/site.js'

export default function Contact() {
  const c = site.company
  const g = site.grievance
  const cards = [
    { icon: 'phone', title: 'Call us', body: <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phoneDisplay}</a> },
    { icon: 'mail', title: 'Email us', body: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      body: (
        <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
          {site.contact.phoneDisplay}
        </a>
      ),
    },
    { icon: 'clock', title: 'Support hours', body: site.contact.hours },
  ]
  return (
    <>
      <PageHero crumbs="Contact Us" eyebrow="We're here to help" title="Contact us">
        Questions about a loan enquiry or our services? Reach out — our team will get back to you during support hours.
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="cards cards--4">
            {cards.map((card) => (
              <div className="contact-card" key={card.title}>
                <span className="feature__icon"><Icon name={card.icon} size={24} /></span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="enquiry">
        <div className="container split split--top">
          <div>
            <h2>Send us an enquiry</h2>
            <p className="muted">
              Tell us what you need. We use the details you enter only to respond to your enquiry, and share it with a
              listed lending partner only with your consent; see our <a href="/privacy-policy/">Privacy Policy</a>.
            </p>
            <ContactForm variant="contact" />
          </div>
          <div>
            <div className="split__media">
              <Img name="contact" className="rounded-img" />
            </div>
            <div className="panel mt-2">
              <h3><Icon name="building" size={20} /> Company</h3>
              <p>
                {c.legalName}
                <br />
                <span className="muted small">CIN: {c.cin}</span>
              </p>
              <h3><Icon name="mapPin" size={20} /> Registered office</h3>
              <p>{c.registeredOffice}</p>
              <h3><Icon name="mapPin" size={20} /> Operating office</h3>
              <p>{c.operatingOffice}</p>
            </div>
            <div className="panel mt-2">
              <h3><Icon name="message" size={20} /> Have a complaint?</h3>
              <p>
                Grievance Officer: {g.name},{' '}
                <a href={`mailto:${g.email}`}>{g.email}</a>, <a href={`tel:${g.phoneHref}`}>{g.phoneDisplay}</a>. See our{' '}
                <a href="/grievance-redressal/">Grievance Redressal</a> page for response times, the complaint form and
                how to escalate.
              </p>
            </div>
            <div className="mt-2">
              <EnquiryBox />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
