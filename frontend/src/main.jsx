import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { findRoute } from './routes.js'
import './styles/global.css'

const route = findRoute(window.location.pathname)
const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App route={route} />
  </StrictMode>
)

if (root.firstElementChild && root.dataset.page === route.page) {
  // Production: this exact page was pre-rendered at build time — attach interactivity.
  hydrateRoot(root, app)
} else {
  // Dev server, or a server that returned a different pre-rendered page for this URL
  // (e.g. the home page for an unknown address): render the right page on the client.
  root.textContent = ''
  document.title = route.title
  createRoot(root).render(app)
}
