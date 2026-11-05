import Icon from '../components/Icon.jsx'
import {
  AppButton,
  EnquiryBox,
  EnquirySection,
  FaqList,
  Img,
  LenderNotice,
  PageHero,
  RepresentativeExample,
  SectionHead,
} from '../components/ui.jsx'
import { faqs } from '../config/faqs.jsx'
import { products, site } from '../config/site.js'
import { decisionTime, processingFee, rateRange } from '../lib/derived.js'
import { rupeesShort } from '../lib/loan.js'

function Product({ p, image, intro, uses, eligibility, notEligible, documents, reverse }) {
  return (
    <section className={`section ${reverse ? 'section--tint' : ''}`} id={p.key}>
      <div className={`container split ${reverse ? 'split--reverse' : ''}`}>
        <div>
          <SectionHead eyebrow={p.key === 'personal' ? 'For individuals' : 'For businesses'} title={p.name} />
          <p>{intro}</p>
          <ul className="checklist">
            {uses.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="split__media">
            <Img name={image} className="rounded-img" />
          </div>
          <dl className="quick">
            <div><dt><Icon name="rupee" size={18} /> Loan amount</dt><dd>{rupeesShort(p.amountMin)} – {rupeesShort(p.amountMax)}</dd></div>
            <div><dt><Icon name="calendar" size={18} /> Tenure</dt><dd>{p.tenureMinMonths} – {p.tenureMaxMonths} months</dd></div>
            <div><dt><Icon name="percent" size={18} /> Interest rate</dt><dd>{rateRange(p)}</dd></div>
            <div><dt><Icon name="clock" size={18} /> Decision time</dt><dd>{decisionTime(p)}</dd></div>
          </dl>
        </div>
      </div>

      <div className={`container cards cards--2 mt-3`}>
        <div className="panel" id={`${p.key}-eligibility`}>
          <h3><Icon name="user" size={20} /> Typical eligibility</h3>
          <ul className="checklist">
            {eligibility.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          {notEligible ? <p className="muted small">{notEligible}</p> : null}
          <p className="muted small">
            {site.brand} accepts enquiries only from Indian residents aged {site.eligibility.ageMin} to{' '}
            {site.eligibility.ageMax} with a monthly income of {site.eligibility.minMonthlyIncome} or more. Final
            eligibility, amount and rate are decided by the lending partner.
          </p>
        </div>
        <div className="panel">
          <h3><Icon name="file" size={20} /> Documents the lender may ask for</h3>
          <ul className="checklist">
            {documents.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="muted small">
            {site.brand} does not ask for these documents. The lending partner may ask for them at its own step, only
            with your consent.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  const p = products.personal
  const b = products.business
  return (
    <>
      <PageHero crumbs="Services" eyebrow="Our services" title="Personal loans & business loans">
        We help you start a loan enquiry with our lending partners. Understand loan options, then review the
        lender&apos;s offer and every charge in its Key Facts Statement before you decide.
      </PageHero>

      <section className="section section--slim">
        <div className="container">
          <LenderNotice />
          <div className="mt-2">
            <EnquiryBox />
          </div>
        </div>
      </section>

      <Product
        p={p}
        image="personal"
        intro="A personal loan is an unsecured loan — no collateral or guarantor needed — that you repay in fixed monthly instalments (EMIs). Use it for planned or unplanned expenses:"
        uses={[
          'Education and skill-building courses',
          'Wedding and family functions',
          'Medical expenses',
          'Home renovation and furnishing',
          'Travel',
          'Consolidating existing loans into one EMI',
        ]}
        eligibility={[
          'Indian resident aged 21 to 58',
          'Salaried or self-employed with a regular income',
          'Monthly income of ₹15,000 or more',
          'Credit score generally 750 or above',
          'Salaried: usually 6+ months with current employer and 2+ years total experience',
          'Existing EMIs ideally below 40–50% of monthly income',
        ]}
        documents={[
          'PAN card',
          'Aadhaar (for eKYC, with your consent) or other officially valid KYC document',
          'Bank statements for the last 3–6 months',
          'Salaried: recent salary slips',
          'Self-employed: latest Income Tax Return (ITR)',
        ]}
      />

      <Product
        p={b}
        image="business"
        reverse
        intro="A collateral-free business loan to fund working capital, inventory, equipment, expansion or new opportunities — repaid in fixed monthly EMIs."
        uses={[
          'Working capital and cash-flow management',
          'Buying inventory or raw material',
          'Purchasing or upgrading equipment',
          'Opening a new outlet or expanding operations',
          'Marketing and growth initiatives',
        ]}
        eligibility={[
          'Indian resident aged 21 to 58, with a monthly income of ₹15,000 or more',
          'Business operating for at least 12 months',
          'Proprietorships, partnerships, self-employed professionals (doctors, CAs and others), gig workers and self-help groups',
          'Credit score typically 650 or above; some lenders consider new-to-credit applicants',
          'Business and office not on the lender’s negative list',
        ]}
        notEligible="Charities, NGOs and trusts are not eligible."
        documents={[
          'KYC: Aadhaar, passport or Voter ID (any one)',
          'PAN card',
          'Bank statements for the last 12 months',
          'Business registration proof: GST, Udyam registration or Shop & Establishment certificate (any one)',
          'Business address proof: GST certificate, recent utility bill, rent agreement or Udyam registration',
        ]}
      />

      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Rates & charges" title="Transparent pricing">
            {site.brand} does not set loan prices. Learn about loan amounts, tenures, interest rates and charges. The
            lending partner sets these and shows them in its Key Facts Statement.
          </SectionHead>
          <div className="table-wrap">
            <table className="table table--pricing">
              <thead>
                <tr>
                  <th scope="col">Charge</th>
                  <th scope="col">Personal Loan</th>
                  <th scope="col">Business Loan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Interest rate (reducing balance)</th>
                  <td>{rateRange(p)}</td>
                  <td>{rateRange(b)}</td>
                </tr>
                <tr>
                  <th scope="row">Loan amount</th>
                  <td>{rupeesShort(p.amountMin)} – {rupeesShort(p.amountMax)}</td>
                  <td>{rupeesShort(b.amountMin)} – {rupeesShort(b.amountMax)}</td>
                </tr>
                <tr>
                  <th scope="row">Repayment tenure</th>
                  <td>{p.tenureMinMonths} – {p.tenureMaxMonths} months</td>
                  <td>{b.tenureMinMonths} – {b.tenureMaxMonths} months</td>
                </tr>
                <tr>
                  <th scope="row">Processing fee (charged by lender)</th>
                  <td colSpan={2}>{processingFee()}</td>
                </tr>
                <tr>
                  <th scope="row">Repayment frequency</th>
                  <td colSpan={2}>{products.repayment}</td>
                </tr>
                <tr>
                  <th scope="row">Annual Percentage Rate (APR)</th>
                  <td colSpan={2}>Shown in the lender&apos;s KFS before you accept — includes interest and all fees</td>
                </tr>
                <tr>
                  <th scope="row">Late payment / penal charges</th>
                  <td colSpan={2}>As stated in the lender&apos;s KFS and loan agreement</td>
                </tr>
                <tr>
                  <th scope="row">Prepayment / foreclosure</th>
                  <td colSpan={2}>As per the lender&apos;s policy, stated in the KFS</td>
                </tr>
                <tr>
                  <th scope="row">Lender responsible for the loan</th>
                  <td colSpan={2}>
                    The lending partner named in your offer and KFS (see <a href="/lending-partners/">Lending Partners</a>)
                  </td>
                </tr>
                <tr className="table__highlight">
                  <th scope="row">{site.brand} fee to borrower</th>
                  <td colSpan={2}><strong>Nil</strong> — no fee for submitting an enquiry; never pay anyone an upfront fee</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <RepresentativeExample />
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container cta-inline">
          <div>
            <h2>Know your EMI before you borrow</h2>
            <p>Use our EMI calculator to plan a repayment that fits your budget.</p>
          </div>
          <div className="btn-row">
            <a className="btn btn--primary" href="/emi-calculator/">
              <Icon name="calculator" size={18} /> Open EMI calculator
            </a>
            <AppButton className="btn btn--outline" />
          </div>
        </div>
      </section>

      <EnquirySection tint={false} />

      <section className="section section--tint">
        <div className="container narrow">
          <SectionHead center eyebrow="FAQs" title="Common questions about loans" />
          <FaqList items={faqs.filter((f) => /tenure|interest|charge|eligib|apply|KFS|repay|miss/i.test(f.q))} />
        </div>
      </section>
    </>
  )
}
