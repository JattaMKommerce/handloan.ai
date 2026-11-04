import EmiCalculator from '../components/EmiCalculator.jsx'
import { AppCta, LenderNotice, PageHero, SectionHead } from '../components/ui.jsx'

export default function Emi() {
  return (
    <>
      <PageHero crumbs="EMI Calculator" eyebrow="Plan smarter" title="EMI Calculator">
        Estimate your monthly instalment, total interest and total amount payable before you apply.
      </PageHero>

      <section className="section">
        <div className="container">
          <EmiCalculator />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container narrow prose">
          <SectionHead eyebrow="Understand your EMI" title="How is EMI calculated?" />
          <p>
            An Equated Monthly Instalment (EMI) is the fixed amount you pay the lender every month until the loan is
            repaid. Each EMI covers part of the principal and the interest on the outstanding balance. Early EMIs have a
            larger interest component; later EMIs repay more principal.
          </p>
          <p className="formula">
            EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]
          </p>
          <ul>
            <li><strong>P</strong> — loan amount (principal)</li>
            <li><strong>r</strong> — monthly interest rate (annual rate ÷ 12 ÷ 100)</li>
            <li><strong>n</strong> — tenure in months</li>
          </ul>
          <h3>EMI vs. APR</h3>
          <p>
            The EMI shows what you pay each month. The <strong>Annual Percentage Rate (APR)</strong> shows the full
            yearly cost of the loan, including interest <em>and</em> fees such as the processing fee. Always compare
            offers on APR — you will find it in every lender&apos;s Key Facts Statement.
          </p>
          <h3>Tips for a comfortable EMI</h3>
          <ul>
            <li>Keep your total EMIs within 40–50% of your monthly income.</li>
            <li>A longer tenure lowers the EMI but increases the total interest you pay.</li>
            <li>Paying EMIs on time helps maintain a healthy credit score.</li>
          </ul>
          <LenderNotice compact />
        </div>
      </section>

      <AppCta />
    </>
  )
}
