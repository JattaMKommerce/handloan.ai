import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export { routes } from './routes.js'
export { site, configWarnings } from './config/site.js'

export function render(route) {
  return renderToString(
    <StrictMode>
      <App route={route} />
    </StrictMode>,
  )
}
