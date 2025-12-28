import { useTranslation } from 'react-i18next';
import { snackbar } from 'mdui/functions/snackbar';

export default function FootBar() {
    const { t } = useTranslation();

    function AayongClicked() {
        navigator.clipboard.writeText("599005767").then(() => {
            snackbar({ message: t("footer.aayong") });
        })
    }

    function OFTSClicked() {
        navigator.clipboard.writeText("qianmuchen.sam@gmail.com").then(() => {
            snackbar({ message: t("footer.ofts") });
        });
    }

    return (
        <mdui-bottom-app-bar style={{ padding: '16px', height: 'auto', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', gap: '16px' }}>
                <a href="https://mccag.cn" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {t("footer.friend")}
                </a>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                {t("footer.dev")}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
                <span>{t("footer.contact")}</span>
                <mdui-button variant="text" onClick={AayongClicked} style={{ minWidth: 'auto', padding: '0 4px' }}>
                    Aayong
                </mdui-button>
                <div style={{ width: '1px', height: '12px', backgroundColor: 'currentColor', opacity: 0.3 }}></div>
                <mdui-button variant="text" onClick={OFTSClicked} style={{ minWidth: 'auto', padding: '0 4px' }}>
                    OFTS_CQM
                </mdui-button>
            </div>
        </mdui-bottom-app-bar>
    );
}