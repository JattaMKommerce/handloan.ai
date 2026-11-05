import { useEffect, useState } from 'react'
import Assistant from './Assistant.jsx'
import Icon from './Icon.jsx'
import { site } from '../config/site.js'
import { PARTNER_LINE, YEAR, appHref, appLabel, appLinkProps, whatsappHref } from '../lib/derived.js'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About Us' },
  { href: '/services/', label: 'Services' },
  { href: '/emi-calculator/', label: 'EMI Calculator' },
  { href: '/careers/', label: 'Careers' },
  { href: '/contact/', label: 'Contact Us' },
]

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__contact">
          <a href={`tel:${site.contact.phoneHref}`}>
            <Icon name="phone" size={14} /> {site.contact.phoneDisplay}
          </a>
          <a href={`mailto:${site.contact.email}`}>
            <Icon name="mail" size={14} /> {site.contact.email}
          </a>
        </div>
        <div className="topbar__note">
          <Icon name="shield" size={14} /> HandLoan.ai never asks for any upfront fee to process a loan
        </div>
        <Social className="topbar__social" size={15} />
      </div>
    </div>
  )
}

export function Social({ className = '', size = 18 }) {
  const items = [
    ['facebook', site.social.facebook, 'Facebook'],
    ['instagram', site.social.instagram, 'Instagram'],
    ['youtube', site.social.youtube, 'YouTube'],
  ].filter(([, url]) => url)
  return (
    <div className={`social ${className}`}>
      {items.map(([icon, url, label]) => (
        <a key={icon} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${site.brand} on ${label}`}>
          <Icon name={icon} size={size} />
        </a>
      ))}
    </div>
  )
}

function Header({ path }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
  }, [open])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="/" className="header__logo" aria-label={`${site.brand} home`}>
          <img src="/images/logo.png" alt={site.brand} width="817" height="216" />
        </a>
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} aria-current={path === n.href ? 'page' : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn--primary nav__cta"
            href={appHref}
            {...appLinkProps}
          >
            <Icon name="smartphone" size={18} /> {appLabel}
          </a>
        </nav>
        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'x' : 'menu'} size={24} />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  const c = site.company
  const g = site.grievance
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/images/logo.png" alt={site.brand} width="817" height="216" className="footer__logo" />
          <p>
            {site.brand} is a digital loan facilitation platform operated by {c.legalName}.{' '}
            <strong>We are not a lender.</strong>
          </p>
          <Social />
        </div>

        <div>
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__links">
            <li><a href="/">Home</a></li>
            <li><a href="/about/">About Us</a></li>
            <li><a href="/#how-it-works">How It Works</a></li>
            <li><a href="/services/">Loan Products</a></li>
            <li><a href="/services/#personal-eligibility">Eligibility</a></li>
            <li><a href="/emi-calculator/">EMI Calculator</a></li>
            <li><a href="/faq/">FAQs</a></li>
            <li><a href="/careers/">Careers</a></li>
            <li><a href="/contact/">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__title">Policies &amp; Compliance</h3>
          <ul className="footer__links">
            <li><a href="/lending-partners/">Lending Partners</a></li>
            <li><a href="/grievance-redressal/">Grievance Redressal</a></li>
            <li><a href="/disclaimer/">Disclaimer</a></li>
            <li><a href="/terms/">Terms &amp; Conditions</a></li>
            <li><a href="/privacy-policy/">Privacy Policy</a></li>
            <li><a href="/refund-policy/">Refund &amp; Cancellation Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__title">Company</h3>
          <ul className="footer__contact">
            <li>
              <Icon name="building" size={18} />
              <span>
                <strong>Legal name:</strong> {c.legalName}
                <br />
                <strong>CIN:</strong> {c.cin}
              </span>
            </li>
            <li>
              <Icon name="mapPin" size={18} />
              <span>
                <strong>Registered Office:</strong> {c.registeredOffice}
              </span>
            </li>
            <li>
              <Icon name="mapPin" size={18} />
              <span>
                <strong>Operating office:</strong> {c.operatingOffice}
              </span>
            </li>
            <li>
              <Icon name="clock" size={18} />
              <span>{site.contact.hours}</span>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phoneDisplay}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__legal">
        <p>
          <strong>Role:</strong> {site.brand} is a brand of {c.legalName} (CIN {c.cin}). It is a loan facilitation
          platform, not a lender, and does not lend money or make credit decisions. Loans are offered by the lending
          partners listed on our <a href="/lending-partners/">Lending Partners</a> page, which sanction and disburse
          them at their sole discretion; each lender&apos;s interest rate, fees and Annual Percentage Rate (APR) are
          shown in its Key Facts Statement before you accept. Repayment tenures range from 6 to 60 months; we do not offer short-term or payday loans.
        </p>
        <p>
          <strong>No guarantee:</strong> Submitting an enquiry does not guarantee a loan offer, approval or
          disbursement. {site.brand} does not charge you any fee for submitting an enquiry.
        </p>
        <p>
          <strong>Fraud warning:</strong> Never pay anyone an upfront fee and never share your OTP, UPI PIN, CVV or
          passwords. {site.brand} never asks for them. Report fraud at{' '}
          <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a> or call{' '}
          <strong>1930</strong>.
        </p>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span suppressHydrationWarning>
            © {YEAR} {c.legalName}. All Rights Reserved. CIN: {c.cin}
          </span>
          <div className="footer__bottom-notes">
            <p>
              {site.brand} is a loan facilitation platform, not a lender. Loans are provided by lending institutions
              (banks and RBI-registered NBFCs).
            </p>
            <p>
              Grievance Officer: {g.name} | Email: <a href={`mailto:${g.email}`}>{g.email}</a> | Phone:{' '}
              <a href={`tel:${g.phoneHref}`}>{g.phoneDisplay}</a> | Address: {g.address} | Working Hours:{' '}
              {site.contact.hoursShort}
            </p>
            <p>
              {PARTNER_LINE} Your enquiry is shared with a lender only after you are told which lender and give
              your consent.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

/** Bottom-left: opens a WhatsApp chat with a pre-filled message. */
function WhatsAppButton() {
  return (
    <a
      className="wa-btn"
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HandLoan.ai on WhatsApp"
    >
      <Icon name="whatsapp" size={26} strokeWidth={1.9} />
      <span className="wa-btn__label">Chat on WhatsApp</span>
    </a>
  )
}

export default function Layout({ path, children }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopBar />
      <Header path={path} />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
      <Assistant />
    </>
  )
}
