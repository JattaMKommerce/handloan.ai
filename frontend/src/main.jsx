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

if (root.firstElementChild) {
  // Production: page was pre-rendered at build time — attach interactivity.
  hydrateRoot(root, app)
} else {
  // Dev server: render on the client.
  document.title = route.title
  createRoot(root).render(app)
}
