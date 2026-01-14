import { useTranslation } from 'react-i18next';

export default function ContentOption({ value, current, setValue }) {
    const { t } = useTranslation();
    const isSelected = value.name === current;

    return (
        <mdui-card
            clickable
            onClick={() => setValue(value)}
            style={{
                // 新增：设置一行展示6张卡片
                '--items-to-show': 6,
                // 可选：微调内边距，让缩小后的卡片更美观（原来12px，可改小一点）
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                flex: `0 0 calc((100% - (var(--items-to-show) - 1) * 16px) / var(--items-to-show))`,
                minWidth: '0',
                backgroundColor: isSelected ? 'rgba(var(--mdui-color-primary-container), 1)' : 'rgba(var(--mdui-color-surface-container), 1)',
                border: isSelected ? '2px solid rgba(var(--mdui-color-primary), 1)' : '2px solid transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                zIndex: isSelected ? 2 : 1,
                boxSizing: 'border-box'
            }}
        >
            <img
                src={value.img}
                alt={t(`gen.${value.name}`)}
                className="content-option-img"
                style={{
                    width: '100%',
                    aspectRatio: '2/3',
                    objectFit: 'cover',
                    borderRadius: '8px'
                }}
            />
            <div style={{
                // 可选：微调字体大小，适配缩小后的卡片（原来1.2rem，可改小）
                fontSize: '1rem',
                fontWeight: isSelected ? 'bold' : 'normal',
                textAlign: 'center'
            }}>
                {t(`gen.${value.name}`)}
            </div>
        </mdui-card>
    );
}