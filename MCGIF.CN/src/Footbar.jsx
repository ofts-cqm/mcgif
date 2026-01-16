import { useTranslation } from 'react-i18next';

export default function FootBar() {
    const { t } = useTranslation();

    return (
        <footer style={{
            padding: '32px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            backgroundColor: 'rgba(var(--mdui-color-surface-container), 0.8)',
            borderTop: '1px solid rgba(var(--mdui-color-outline-variant), 0.3)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
                {/* 核心修改：将文本包裹在a标签中，并设置链接和样式 */}
                <a
                    href="https://www.mcnav.net/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    target="_blank"  
                    rel="noopener noreferrer"  
                >
                    {t("footer.friends.mcnav")}
                </a>

                <a href="https://mccag.cn" 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    target="_blank"  // 可选：在新标签页打开链接
                    rel="noopener noreferrer"  // 安全属性，配合target="_blank"使用>
                >
                    {t("footer.friends.mccag")}
                </a>

                <a href="https://o.xbottle.top/mcsounds/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    target="_blank"  // 可选：在新标签页打开链接
                    rel="noopener noreferrer"  // 安全属性，配合target="_blank"使用>
                >
                    {t("footer.friends.sounds")}
                </a>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                {t("footer.disclaimer")}
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                {t("footer.dev")}
            </div>
        </footer>
    );
}