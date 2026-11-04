import Layout from './components/Layout.jsx'
import About from './pages/About.jsx'
import Careers from './pages/Careers.jsx'
import Contact from './pages/Contact.jsx'
import Disclaimer from './pages/Disclaimer.jsx'
import Emi from './pages/Emi.jsx'
import Faq from './pages/Faq.jsx'
import Grievance from './pages/Grievance.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Partners from './pages/Partners.jsx'
import Privacy from './pages/Privacy.jsx'
import Refund from './pages/Refund.jsx'
import Services from './pages/Services.jsx'
import Terms from './pages/Terms.jsx'

const PAGES = {
  home: Home,
  about: About,
  services: Services,
  emi: Emi,
  partners: Partners,
  faq: Faq,
  careers: Careers,
  contact: Contact,
  grievance: Grievance,
  disclaimer: Disclaimer,
  terms: Terms,
  privacy: Privacy,
  refund: Refund,
  notFound: NotFound,
}

export default function App({ route }) {
  const Page = PAGES[route.page] || NotFound
  return (
    <Layout path={route.path}>
      <Page />
    </Layout>
  )
}
