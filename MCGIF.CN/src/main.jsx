import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n' 
import Root from './Root';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)