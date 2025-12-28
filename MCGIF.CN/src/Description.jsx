import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from "react";

export default function Description({ open, setOpen }) {
    const { t } = useTranslation();
    const dialogRef = useRef(null);

    useEffect(() => {
        if (open) {
            dialogRef.current?.setAttribute('open', '');
        } else {
            dialogRef.current?.removeAttribute('open');
        }
    }, [open]);

    return (
        <mdui-dialog
            ref={dialogRef}
            onClosed={() => setOpen(false)}
            close-on-overlay-click
        >
            <span slot="headline">关于本站</span>
            <div style={{ whiteSpace: "pre-line" }}>{t("description")}</div>
            <mdui-button slot="action" variant="text" onClick={() => setOpen(false)}>
                {t("close")}
            </mdui-button>
        </mdui-dialog>
    );
}