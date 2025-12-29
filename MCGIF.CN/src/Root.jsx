import { StrictMode, useEffect } from 'react'
import './index.css'
import App from './App.jsx'
import HeaderBar from './HeaderBar.jsx'
import Footbar from './Footbar'
import { useTranslation } from 'react-i18next';
import { setTheme } from 'mdui/functions/setTheme';

export default function Root() {
    const { i18n } = useTranslation();

    useEffect(() => {
        setTheme('auto');
    }, []);

    return (
        <StrictMode>
            <div className="mdui-theme-auto" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <HeaderBar />
                <main className="main-content" style={{ flex: 1, padding: '20px' }}>
                    <App />
                </main>
                <Footbar />
            </div>
        </StrictMode>
    )
}
