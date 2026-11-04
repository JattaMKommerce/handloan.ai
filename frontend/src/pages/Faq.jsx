import { FaqList, PageHero } from '../components/ui.jsx'
import { faqs } from '../config/faqs.jsx'
import { site } from '../config/site.js'

export default function Faq() {
  return (
    <>
      <PageHero crumbs="FAQs" eyebrow="Help centre" title="Frequently asked questions">
        Everything you need to know about how {site.brand} works.
      </PageHero>
      <section className="section">
        <div className="container narrow">
          <FaqList items={faqs} />
          <p className="center mt-3">
            Still have a question? <a href="/contact/">Contact us</a> — we&apos;re happy to help.
          </p>
        </div>
      </section>
    </>
  )
}
