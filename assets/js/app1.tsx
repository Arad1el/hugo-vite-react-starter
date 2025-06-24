import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Incrementor from './src/incrementer'

console.log(document.getElementById('root'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Incrementor />
  </StrictMode>,
)
