import { useEffect, useState } from 'react'
import Icon from '../components/Icon.jsx'
import EmiCalculator from '../components/EmiCalculator.jsx'
import {
  AppCta,
  EnquirySection,
  FaqList,
  FraudNotice,
  Img,
  PartnersList,
  QuickFacts,
  RepresentativeExample,
  SectionHead,
} from '../components/ui.jsx'
import { faqs } from '../config/faqs.jsx'
import { products, site } from '../config/site.js'
import { ratesVerified } from '../lib/derived.js'
import { pct, rupeesShort } from '../lib/loan.js'

const SLIDES = [
  {
    eyebrow: 'Personal & Business Loan Enquiry',
    title: 'Explore personal and business loan options.',
    text: 'We help you start a loan enquiry with our lending partners. HandLoan.ai is a loan facilitation platform, not a lender. Eligibility, interest rates, charges, approval and disbursement are always decided by the lender.',
    image: 'hero1',
  },
  {
    eyebrow: 'Your digital loan partner',
    title: 'Skip the bank queue. Your digital loan partner is here.',
    text: 'Start your enquiry online, with no branch visits and no fee from us. Review the lender’s interest rate, fees and repayment schedule in its Key Facts Statement before you decide.',
    image: 'hero2',
  },
]

function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 7000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__stage">
        {SLIDES.map((s, idx) => {
          const Heading = idx === 0 ? 'h1' : 'h2'
          return (
            <div
              key={s.title}
              className={`hero__slide ${idx === i ? 'is-active' : ''}`}
              aria-hidden={idx !== i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${SLIDES.length}`}
            >
              <div className="hero__copy">
                <p className="eyebrow">{s.eyebrow}</p>
                <Heading className="hero__title">{s.title}</Heading>
                <p className="hero__text">{s.text}</p>
                <div className="btn-row">
                  <a className="btn btn--primary btn--lg" href="#enquiry" tabIndex={idx === i ? 0 : -1}>
                    Start your enquiry <Icon name="arrowRight" size={18} />
                  </a>
                  <a className="btn btn--outline btn--lg" href="/emi-calculator/" tabIndex={idx === i ? 0 : -1}>
                    <Icon name="calculator" size={18} /> Calculate EMI
                  </a>
                </div>
                <ul className="hero__ticks">
                  <li><Icon name="check" size={16} /> Online enquiry</li>
                  <li><Icon name="check" size={16} /> No fee from {site.shortBrand}</li>
                  <li><Icon name="check" size={16} /> No PAN or Aadhaar asked</li>
                </ul>
              </div>
              <div className="hero__media">
                <Img name={s.image} eager={idx === 0} className="hero__img" />
              </div>
            </div>
          )
        })}
        <div className="hero__controls">
          <button type="button" aria-label="Previous slide" onClick={() => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length)}>
            <Icon name="chevronLeft" size={20} />
          </button>
          {SLIDES.map((s, idx) => (
            <button
              type="button"
              key={s.title}
              className={`hero__dot ${idx === i ? 'is-active' : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
            />
          ))}
          <button type="button" aria-label="Next slide" onClick={() => setI((v) => (v + 1) % SLIDES.length)}>
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  const tags = [
    ['smartphone', 'Online enquiry'],
    ['file', 'No paperwork'],
    ['message', 'Plain-language guidance'],
    ['eye', 'Honest disclosures'],
  ]
  return (
    <section className="section">
      <div className="container split">
        <div className="split__media">
          <Img name="intro" className="rounded-img" />
        </div>
        <div>
          <SectionHead eyebrow="Why go digital" title="Skip the bank queue. Your digital loan partner is here." />
          <p>
            Exploring a loan shouldn&apos;t mean long queues, piles of photocopies and unclear terms. With {site.brand}{' '}
            you start with a simple online enquiry, and our team explains loan options, EMIs and charges in plain
            language.
          </p>
          <p>
            Every offer from a lending partner shows the lender&apos;s name, the loan amount, interest rate, APR, EMI
            and all charges in its Key Facts Statement, so you can decide with complete clarity.
          </p>
          <ul className="tags">
            {tags.map(([icon, label]) => (
              <li key={label}>
                <Icon name={icon} size={18} /> {label}
              </li>
            ))}
          </ul>
          <a className="btn btn--primary" href="/about/">
            More about us <Icon name="arrowRight" size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    ['file', 'Send an online enquiry', 'Share your name, contact details and what you need. We do not ask for PAN, Aadhaar, bank details or documents.'],
    ['user', 'We explain your options', 'Our team contacts you with your consent and explains loan options, EMIs and charges in plain language.'],
    ['lock', 'Matched with a lending partner', 'With your consent, we share your enquiry with a suitable lending partner listed on our Lending Partners page.'],
    ['bank', 'The lender decides', 'The lender checks eligibility, shows its Key Facts Statement and decides. Approval is not guaranteed.'],
  ]
  return (
    <section className="section section--tint" id="how-it-works">
      <div className="container">
        <SectionHead center eyebrow="How it works" title="Simple, secure and hassle-free loan enquiry">
          A digital enquiry with clear information at every step. We are not a lender.
        </SectionHead>
        <ol className="steps">
          {steps.map(([icon, title, text], idx) => (
            <li className="steps__item" key={title}>
              <span className="steps__num">{idx + 1}</span>
              <span className="steps__icon"><Icon name={icon} size={26} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Services() {
  const list = [
    {
      ...products.personal,
      image: 'personal',
      text: 'Unsecured funding for planned or unexpected expenses — education, a wedding, medical bills, home improvement or travel.',
    },
    {
      ...products.business,
      image: 'business',
      text: 'Collateral-free working capital and growth funding for proprietors, self-employed professionals and small businesses.',
    },
  ]
  return (
    <section className="section">
      <div className="container">
        <SectionHead center eyebrow="Our services" title="Loans for every need">
          Learn about personal and business loans offered by our lending partners. {site.brand} is not a lender.
        </SectionHead>
        <div className="cards cards--2">
          {list.map((p) => (
            <article className="product" key={p.key}>
              <Img name={p.image} className="product__img" />
              <div className="product__body">
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <dl className="product__facts">
                  <div><dt>Amount</dt><dd>{rupeesShort(p.amountMin)} – {rupeesShort(p.amountMax)}</dd></div>
                  <div><dt>Tenure</dt><dd>{p.tenureMinMonths} – {p.tenureMaxMonths} months</dd></div>
                  <div><dt>Interest rate</dt><dd>{ratesVerified ? `${pct(p.rateMin)} – ${pct(p.rateMax)} p.a.` : 'Set by lender'}</dd></div>
                </dl>
                <a className="btn btn--outline" href={`/services/#${p.key}`}>
                  Read more <Icon name="arrowRight" size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CalculatorBlock() {
  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead center eyebrow="EMI calculator" title="Plan your repayments before you borrow">
          Move the sliders to estimate your monthly EMI and the total interest you would pay.
        </SectionHead>
        <EmiCalculator compact />
        <p className="center mt-2">
          <a className="link-arrow" href="/emi-calculator/">
            Open the full calculator with repayment schedule <Icon name="arrowRight" size={16} />
          </a>
        </p>
      </div>
    </section>
  )
}

function WhyChoose() {
  const items = [
    ['zap', 'Fully digital process', 'Skip the bank queue. Start your enquiry from home, with no branch visits and no physical paperwork.'],
    ['eye', 'Transparency first', 'No surprises. We tell you plainly that we are not a lender and name every lending partner we work with. We never charge you a fee.'],
    ['layers', 'Plain-language guidance', 'We explain loan types, EMIs, APR and charges in simple words, so you know what to check before you borrow.'],
    ['lock', 'Privacy & consent', 'We collect only what your enquiry needs and never ask for PAN, Aadhaar, bank details or documents in our enquiry form.'],
    ['heart', 'Real human support', 'We’re your partner, not just a platform. Reach our team by phone, email or WhatsApp, with a clear grievance process.'],
    ['shield', 'Your consent comes first', 'Your enquiry is shared only with a lending partner listed on our website, and only with your consent.'],
  ]
  return (
    <section className="section">
      <div className="container">
        <SectionHead center eyebrow="Why choose us" title={`Why choose ${site.brand}?`} />
        <div className="cards cards--3">
          {items.map(([icon, title, text]) => (
            <div className="feature" key={title}>
              <span className="feature__icon"><Icon name={icon} size={24} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Comparison() {
  const rows = [
    ['Branch visits and physical paperwork', 'A simple online enquiry from your phone'],
    ['Visit lenders one at a time', 'One enquiry, and our team explains your options'],
    ['Fees and terms explained late', 'APR, fees and EMI explained in plain language upfront'],
    ['Days or weeks of follow-ups', 'Updates on your enquiry by call, SMS, WhatsApp or email'],
    ['Unclear who you are dealing with', 'A clear statement that we are not a lender'],
  ]
  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead center eyebrow="Your journey, simplified" title="The traditional way vs. the HandLoan.ai way" />
        <div className="compare">
          <div className="compare__col compare__col--old">
            <h3>Traditional process</h3>
            <ul>
              {rows.map(([a]) => (
                <li key={a}><Icon name="minus" size={18} /> {a}</li>
              ))}
            </ul>
          </div>
          <div className="compare__col compare__col--new">
            <h3>With {site.brand}</h3>
            <ul>
              {rows.map(([, b]) => (
                <li key={b}><Icon name="check" size={18} /> {b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="section">
      <div className="container">
        <RepresentativeExample />
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead center eyebrow="Lending partners" title="Our lending partners">
          Loans are offered by these lending partners, which decide on every application. {site.brand} is not a lender.
        </SectionHead>
        <PartnersList />
        <p className="center mt-2">
          <a className="link-arrow" href="/lending-partners/">
            View all lending partners <Icon name="arrowRight" size={16} />
          </a>
        </p>
      </div>
    </section>
  )
}

function Faqs() {
  return (
    <section className="section">
      <div className="container narrow">
        <SectionHead center eyebrow="FAQs" title="Questions, answered" />
        <FaqList items={faqs.slice(0, 6)} />
        <p className="center mt-2">
          <a className="link-arrow" href="/faq/">
            See all FAQs <Icon name="arrowRight" size={16} />
          </a>
        </p>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <EnquirySection />
      <Intro />
      <HowItWorks />
      <Services />
      <CalculatorBlock />
      <WhyChoose />
      <Comparison />
      <Pricing />
      <Partners />
      <FraudNotice />
      <Faqs />
      <AppCta />
    </>
  )
}
