import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Alerter from './src/alerter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Alerter />
  </StrictMode>,
)
