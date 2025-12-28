import { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Description from './Description.jsx';

export default function HeaderBar() {
    const [open, setOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const menuRef = useRef(null);

    useEffect(() => {
        const menu = menuRef.current;
        if (menu) {
            const handleChange = (e) => {
                const newLang = e.target.value;
                if (newLang && newLang !== i18n.language) {
                    i18n.changeLanguage(newLang);
                }
            };
            menu.addEventListener('change', handleChange);
            return () => menu.removeEventListener('change', handleChange);
        }
    }, [i18n]);

    const languages = [
        { code: 'zh-CN', name: '简体中文' },
        { code: 'zh-TW', name: '繁體中文' },
        { code: 'en', name: 'English' },
        { code: 'ja', name: '日本語' },
        { code: 'ko', name: '한국어' },
        { code: 'de', name: 'Deutsch' },
        { code: 'ru', name: 'русский язык' }
    ];

    return (
        <>
            <mdui-top-app-bar
                className="bar responsive-bar"
                style={{
                    boxShadow: 'var(--mdui-elevation-level2)',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <mdui-top-app-bar-title style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }}>
                        <img src="/mcgif.svg" alt="logo" className="logo-img" />
                        <div className="responsive-title" style={{
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                        }}>
                            {t("title")}
                        </div>
                    </div>
                </mdui-top-app-bar-title>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div
                        onClick={() => setOpen(true)}
                        style={{
                            cursor: 'pointer',
                            fontSize: '1.25rem',
                            fontWeight: 500,
                            whiteSpace: 'nowrap'
                        }}
                        onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                    >
                        {t("about")}
                    </div>

                    <mdui-dropdown placement="bottom-end">
                        <mdui-button-icon slot="trigger">
                            <mdui-icon-g-translate></mdui-icon-g-translate>
                        </mdui-button-icon>
                        <mdui-menu
                            ref={menuRef}
                            selects="single"
                            value={i18n.language === 'zh' ? 'zh-CN' : i18n.language}
                        >
                            {languages.map((lang) => {
                                const isSelected = i18n.language === lang.code || (i18n.language === 'zh' && lang.code === 'zh-CN');
                                return (
                                    <mdui-menu-item
                                        key={lang.code}
                                        value={lang.code}
                                        style={{ paddingLeft: '12px' }}
                                    >
                                        {isSelected && (
                                            <mdui-icon-check slot="start-icon"></mdui-icon-check>
                                        )}
                                        {lang.name}
                                    </mdui-menu-item>
                                );
                            })}
                        </mdui-menu>
                    </mdui-dropdown>
                </div>
            </mdui-top-app-bar>

            <Description open={open} setOpen={setOpen} />
        </>
    );
}