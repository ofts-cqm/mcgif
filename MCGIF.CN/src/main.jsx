import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HeaderBar from './HeaderBar.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HeaderBar />
        <App />
    </StrictMode>,
)
