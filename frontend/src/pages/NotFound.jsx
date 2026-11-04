import Icon from '../components/Icon.jsx'

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container narrow center">
        <p className="notfound__code">404</p>
        <h1>We couldn&apos;t find that page</h1>
        <p className="muted">The page may have moved. Try one of these instead:</p>
        <div className="btn-row btn-row--center">
          <a className="btn btn--primary" href="/">
            Go to home <Icon name="arrowRight" size={18} />
          </a>
          <a className="btn btn--outline" href="/services/">Our services</a>
          <a className="btn btn--outline" href="/contact/">Contact us</a>
        </div>
      </div>
    </section>
  )
}
