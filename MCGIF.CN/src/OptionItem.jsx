import { useTranslation } from 'react-i18next';

export default function OptionItem({ name, children, enable, reset }) {
    const { t } = useTranslation();

    return (
        <div className="option-item-container" style={{
            position: 'relative',
            marginBottom: '16px',
            padding: '4px 0'
        }}>
            <div className="option-item-grid" style={{
                opacity: enable ? 1 : 0.5,
                pointerEvents: enable ? 'auto' : 'none',
                transition: 'opacity 0.3s ease'
            }}>
                <div className="option-item-label">
                    {t(`config.${name}`)}
                </div>
                <div className="option-item-value">
                    {children}
                </div>
                <div style={{ textAlign: 'right' }}>
                    <mdui-button
                        variant="outlined"
                        onClick={reset}
                        disabled={!enable}
                        style={{ width: '100%' }}
                    >
                        {t("config.reset")}
                    </mdui-button>
                </div>
            </div>

            {!enable && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(var(--mdui-color-surface-container), 0.4)',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    pointerEvents: 'auto'
                }}>
                </div>
            )}
        </div>
    );
}