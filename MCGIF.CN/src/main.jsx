import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HeaderBar from './HeaderBar.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footbar from './Footbar'

const theme = createTheme({
    typography: {
        body1: { fontSize: "1.3rem" },
        fontFamily: [
            'Pixel',
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <HeaderBar />
            <App />
            <Footbar />
        </ThemeProvider>
    </StrictMode>,
)
