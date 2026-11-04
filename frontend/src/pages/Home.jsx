import { useEffect, useState } from 'react'
import Icon from '../components/Icon.jsx'
import EmiCalculator from '../components/EmiCalculator.jsx'
import {
  AppCta,
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
import { pct, rupeesShort } from '../lib/loan.js'

const SLIDES = [
  {
    eyebrow: 'Personal & Business Loans',
    title: 'Personalised loan offers. One simple digital application.',
    text: 'Apply online, compare offers from RBI-regulated lending partners and review every rate and charge before you accept — from application to disbursement, without the bank queue.',
    image: 'hero1',
  },
  {
    eyebrow: 'Your digital loan partner',
    title: 'Skip the bank queue. Your digital loan partner is here.',
    text: 'Transparent, simple and secure — everything a loan application should be. No branch visits, no paperwork piles, no hidden fees from us.',
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
                  <a className="btn btn--primary btn--lg" href="/services/" tabIndex={idx === i ? 0 : -1}>
                    Explore loan options <Icon name="arrowRight" size={18} />
                  </a>
                  <a className="btn btn--outline btn--lg" href="/emi-calculator/" tabIndex={idx === i ? 0 : -1}>
                    <Icon name="calculator" size={18} /> Calculate EMI
                  </a>
                </div>
                <ul className="hero__ticks">
                  <li><Icon name="check" size={16} /> RBI-regulated lenders</li>
                  <li><Icon name="check" size={16} /> No fee from {site.shortBrand}</li>
                  <li><Icon name="check" size={16} /> 100% digital</li>
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
    ['smartphone', 'Easy-to-use app'],
    ['file', 'Paperless application'],
    ['zap', 'Quick lender decisions'],
    ['eye', 'Clear terms upfront'],
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
            Applying for a loan shouldn&apos;t mean long queues, piles of photocopies and unclear terms. {site.brand}{' '}
            brings the whole journey online: share your details once, give consent at every step, and receive offers
            from participating lenders on the Open Network for Digital Commerce (ONDC) and our partner institutions.
          </p>
          <p>
            Every offer shows the lender&apos;s name, the loan amount, interest rate, APR, EMI and all charges, so you
            can decide with complete clarity.
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
    ['smartphone', 'Download & register', `Sign up on the ${site.brand} app with your mobile number.`],
    ['user', 'Share details with consent', 'Tell us what you need and share the information the lender asks for. You choose what to share at each step.'],
    ['file', 'Compare offers & read the KFS', "See offers from participating lenders with the lender's name, amount, APR, EMI and all charges."],
    ['bank', 'Accept & receive funds', 'Sign the agreement digitally. The lender disburses the loan directly to your bank account.'],
  ]
  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead center eyebrow="How it works" title="Simple, secure and hassle-free digital loans">
          A 24×7 digital journey with clear terms at every step, from application to disbursement.
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
          Offered by RBI-regulated banks and NBFCs, facilitated by {site.brand}.
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
                  <div><dt>Interest rate</dt><dd>{pct(p.rateMin)} – {pct(p.rateMax)} p.a.</dd></div>
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
        <SectionHead center eyebrow="EMI calculator" title="Plan your repayments before you apply">
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
    ['zap', 'Fully digital process', 'Skip the bank queue for good. Apply from home at any hour — no branch visits and no physical paperwork.'],
    ['eye', 'Transparency first', 'No surprises. See the lender’s name, APR, fees and repayment schedule in the KFS before you accept. We never charge borrowers a fee.'],
    ['layers', 'One application, many lenders', 'Your application can be matched with offers from several participating lenders, so you can compare before you decide.'],
    ['lock', 'Privacy & consent', 'We collect only what is needed, ask for your consent at each step, and store personal data in India as RBI requires.'],
    ['heart', 'Real human support', 'We’re your partner, not just a platform. Reach our team by phone, email or WhatsApp, with a clear grievance process.'],
    ['network', 'Built on open networks', 'Built on the Open Network for Digital Commerce (ONDC) to bring you a wider choice of regulated lenders.'],
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
    ['Branch visits and physical paperwork', 'Fully digital application from your phone'],
    ['Visit lenders one at a time', 'One application, offers from multiple participating lenders'],
    ['Fees and terms explained late', 'APR, fees and EMI shown in the KFS before you accept'],
    ['Days or weeks of follow-ups', 'Quick digital decisions by lenders (timelines vary)'],
    ['One-size-fits-all products', 'Offers based on your profile'],
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
        <SectionHead center eyebrow="Our lending partners" title="Loans from RBI-regulated banks and NBFCs">
          Your loan is always provided by a regulated lender, named in your offer and KFS.
        </SectionHead>
        <PartnersList limit={6} />
        <p className="center mt-2">
          <a className="link-arrow" href="/lending-partners/">
            View all lending partners and registration details <Icon name="arrowRight" size={16} />
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
