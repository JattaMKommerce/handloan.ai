import ContactForm from '../components/ContactForm.jsx'
import Icon from '../components/Icon.jsx'
import { Img, PageHero } from '../components/ui.jsx'
import { site } from '../config/site.js'

export default function Contact() {
  const c = site.company
  const cards = [
    { icon: 'phone', title: 'Call us', body: <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phoneDisplay}</a> },
    { icon: 'mail', title: 'Email us', body: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      body: (
        <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
          Chat with us
        </a>
      ),
    },
    { icon: 'clock', title: 'Support hours', body: site.contact.hours },
  ]
  return (
    <>
      <PageHero crumbs="Contact Us" eyebrow="We're here to help" title="Contact us">
        Questions about the app, your application or our services? Reach out — our team will get back to you.
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

      <section className="section section--tint">
        <div className="container split split--top">
          <div>
            <h2>Send us a message</h2>
            <p className="muted">Tell us how we can help and our team will get back to you.</p>
            <ContactForm />
          </div>
          <div>
            <div className="split__media">
              <Img name="contact" className="rounded-img" />
            </div>
            <div className="panel mt-2">
              <h3><Icon name="mapPin" size={20} /> Registered office</h3>
              <p>
                {c.legalName}
                <br />
                {c.registeredOffice}
              </p>
              {c.branchOffice ? (
                <>
                  <h3><Icon name="building" size={20} /> Branch office</h3>
                  <p>{c.branchOffice}</p>
                </>
              ) : null}
            </div>
            <div className="panel mt-2">
              <h3><Icon name="message" size={20} /> Have a complaint?</h3>
              <p>
                See our <a href="/grievance-redressal/">Grievance Redressal</a> page to reach our Grievance Officer or
                escalate a complaint about a loan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
