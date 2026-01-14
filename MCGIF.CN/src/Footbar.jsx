import { useTranslation } from 'react-i18next';

export default function FootBar() {
    const { t } = useTranslation();

    // 已删除：AayongClicked 函数
    // 已删除：OFTSClicked 函数

    return (
        <footer style={{
            padding: '32px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            backgroundColor: 'rgba(var(--mdui-color-surface-container), 0.8)',
            borderTop: '1px solid rgba(var(--mdui-color-outline-variant), 0.3)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', gap: '16px' }}>
                <a href="https://mccag.cn" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                    {t("footer.friend")}
                </a>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                {t("footer.dev")}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
                {/* 核心修改：将文本包裹在a标签中，并设置链接和样式 */}
                <a 
                    href="https://www.mcnav.net/" 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    target="_blank"  // 可选：在新标签页打开链接
                    rel="noopener noreferrer"  // 安全属性，配合target="_blank"使用
                >
                    {t("footer.contact")}
                </a>
                {/* 已删除：Aayong 对应的 mdui-button */}
                {/* 已删除：垂直分隔线 div */}
                {/* 已删除：OFTS_CQM 对应的 mdui-button */}
            </div>
        </footer>
    );
}