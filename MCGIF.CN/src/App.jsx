import './App.css'
import { useState, useRef, useEffect } from "react";
import OptionItem from './OptionItem';
import ContentOption from './ContentOption';
import { useTranslation } from 'react-i18next';
import { snackbar } from 'mdui/functions/snackbar';

import sneak from './assets/sneak.gif'
import sk from './assets/sk.png'
import dsk from './assets/dsk.gif'
import homo from './assets/homo.png'
import hip from './assets/hip.gif'
import temple from './assets/temple.png'
import trump from './assets/trump.png'
import head from './assets/head.png'
import dhead from './assets/dhead.gif'
import litang from './assets/litang.png'

class GenContentProfile {
    constructor(img, name, hasBG, hasHead, hasSpeed, hasPitch, hasModel) {
        this.img = img;
        this.name = name;
        this.hasBG = hasBG;
        this.hasHead = hasHead;
        this.hasSpeed = hasSpeed;
        this.hasPitch = hasPitch;
        this.hasModel = hasModel;
    }
}

const allContents = [
    new GenContentProfile(sneak, 'sneak', true, true, true, false, true),
    new GenContentProfile(dsk, 'dsk', true, true, true, true, true),
    new GenContentProfile(sk, 'sk', true, true, false, false, true),
    new GenContentProfile(trump, 'trump', false, true, false, false, true),
    new GenContentProfile(homo, 'homo', false, true, false, false, true),
    new GenContentProfile(temple, 'temple', false, true, false, false, true),
    new GenContentProfile(litang, 'litang', false, true, false, false, true),
    new GenContentProfile(dhead, 'dhead', false, true, true, true, false),
    new GenContentProfile(head, 'head', false, true, false, false, false),
    new GenContentProfile(hip, 'hip', true, true, true, false, true),
]

export default function App() {
    const [imgSrc, setImgSrc] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [warnMsg, setWarnMsg] = useState("");
    const [genContent, setGenContent] = useState("sneak");
    const [userId, setUserId] = useState("");
    const [lastGen, setLastGen] = useState(new Date().getTime());
    const [isStatic, setIsStatic] = useState(false);
    const [background, setBackground] = useState('#ffffff');
    const [transparentBG, setTransparentBG] = useState(false);
    const [light, setLight] = useState('#ffffff');
    const [ignoreLight, setIgnoreLight] = useState(false);
    const [headSize, setHeadSize] = useState(1);
    const [speed, setSpeed] = useState(1);
    const [pitch, setPitch] = useState(0);
    const [slim, setSlim] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(window.innerWidth < 600 ? 2 : (window.innerWidth < 900 ? 3 : 4));
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [mobileWarningOpen, setMobileWarningOpen] = useState(window.innerWidth < 600);
    const [currentGenProfile, setCurrentGenProfile] = useState(allContents[0]);

    const { t, i18n } = useTranslation();
    const dialogRef = useRef(null);

    const NUMBER_CONTENT = allContents.length;
    const errorDialogRef = useRef(null);
    const mobileWarningDialogRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setItemsToShow(2);
            } else if (window.innerWidth < 900) {
                setItemsToShow(3);
            } else {
                setItemsToShow(4);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (errorDialogOpen) {
            errorDialogRef.current?.setAttribute('open', '');
        } else {
            errorDialogRef.current?.removeAttribute('open');
        }
    }, [errorDialogOpen]);


    useEffect(() => {
        setTransparentBG(false);
        setIgnoreLight(false);
    }, [genContent]);

    function setCurrentGen(profile) {
        setCurrentGenProfile(profile);
        setGenContent(profile.name);
    }


    async function parseGen(res) {
        try {
            if (res.status !== 200) {
                setErrorDialogOpen(true);
                setImgSrc("");
                switch (res.status) {
                    case 400:
                    case 429:
                        setWarnMsg(t("warning.too_fast"));
                        return;
                    case 404:
                    case 500:
                        setErrorMsg(t("error.failed"));
                        return;
                    case 503:
                        setErrorMsg(t("error.network"));
                        return;
                    default:
                        setErrorMsg(t("error.unknown"));
                        return;
                }
            }

            const blob = await res.blob();
            setIsStatic(blob.type == "image/png");
            const url = URL.createObjectURL(blob);
            setLastGen(new Date().getTime());
            setImgSrc(url)
        } catch {
            setErrorMsg(t("error.unknown"));
        }
    }

    function handleGen() {
        if (new Date().getTime() - lastGen < 3000) {
            setWarnMsg(t("warning.too_fast"));
            snackbar({ message: t("warning.too_fast") });
            return;
        }
        setImgSrc("w")
        setErrorMsg("")
        setWarnMsg("")

        const parsedBG = transparentBG ? "0x00000000" : background.replace("#", "0x");
        const parsedLight = ignoreLight ? "0xFFFFFFFF" : light.replace("#", "0x");
        let args = `bg=${parsedBG}&light=${parsedLight}&head=${headSize}&x=${1 / speed * 20}&y=${pitch}`;

        if (slim != 0) {
            args += `&t=${slim == 2}`;
        }

        if (genContent === "sneak") {
            args += "&duration=" + (Math.round((100 / speed) / 10) * 10).toString();
        } else args += "&duration=100"

        fetch(`/api/render/?name=${userId}&pose=${genContent}&${args}`).then(parseGen);
        //fetch(`/render/name/${userId}/${genContent}?${args}`).then(parseGen);
    }

    async function handleRefresh() {
        try {
            const res = await fetch(`/refresh/name/${userId}`)
            if (res.status !== 204) {
                setErrorMsg(t("error.refresh_failed"));
                return;
            }
        } catch {
            setErrorMsg(t("error.refresh_failed"));
            return;
        }
        handleGen();
    }

    function handleDownload() {
        if (imgSrc === "" || imgSrc === "w" || errorMsg !== "") {
            setWarnMsg(t("warning.no_content"));
            snackbar({ message: t("warning.no_content") });
            return;
        }
        const imageUrl = imgSrc;
        const fileName = "mcgif" + (isStatic ? ".png" : ".gif");

        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function contentLeft() {
        if (startIndex === 0) return;
        setStartIndex(Math.max(0, startIndex - 1));
    }

    function contentRight() {
        if (startIndex >= NUMBER_CONTENT - itemsToShow) return;
        setStartIndex(Math.min(NUMBER_CONTENT - itemsToShow, startIndex + 1));
    }

    return (
        <div className="main-container">


            <div className="options-header">
                <mdui-button-icon
                    onClick={contentLeft}
                    disabled={startIndex === 0}
                >
                    <mdui-icon-chevron-left></mdui-icon-chevron-left>
                </mdui-button-icon>

                <div style={{
                    flex: 1,
                    overflow: 'hidden',
                    padding: '16px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(var(--mdui-color-surface-container), 0.5)'
                }}>
                    <div className="responsive-title" style={{ marginBottom: '16px', textAlign: 'left', fontWeight: 'bold' }}>
                        {t("gen.title")}
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        transition: 'transform 0.3s ease',
                        transform: `translateX(-${startIndex * (100 / itemsToShow)}%)`,
                        '--items-to-show': itemsToShow
                    }}>
                        {allContents.map((content) => (
                            <ContentOption
                                key={content.name}
                                value={content}
                                current={genContent}
                                setValue={setCurrentGen}
                            />
                        ))}
                    </div>
                </div>

                <mdui-button-icon
                    onClick={contentRight}
                    disabled={startIndex >= NUMBER_CONTENT - itemsToShow}
                >
                    <mdui-icon-chevron-right></mdui-icon-chevron-right>
                </mdui-button-icon>
            </div>

            <mdui-card style={{ marginTop: '24px', padding: '24px' }}>
                <div className="config-grid">
                    <div>
                        <mdui-text-field
                            label={t("gen.id")}
                            value={userId}
                            onInput={(e) => setUserId(e.target.value)}
                            style={{ width: '100%', marginBottom: '16px' }}
                        ></mdui-text-field>

                        <mdui-button
                            full-width
                            onClick={handleGen}
                            disabled={!userId.trim()}
                            style={{ marginBottom: '24px' }}
                        >
                            {t("gen.apply")}
                        </mdui-button>

                        <mdui-divider style={{ marginBottom: '24px' }}></mdui-divider>
                        <div style={{ fontSize: '1.5rem', marginBottom: '16px', fontWeight: 'bold' }}>{t("config.title")}</div>

                        <OptionItem name="bg" enable={currentGenProfile.hasBG} reset={() => { setBackground('#ffffff'); setTransparentBG(false) }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', justifyContent: 'space-between' }}>
                                <div className={`color-input-container ${transparentBG ? 'hidden' : ''}`}>
                                    <div className="color-preview" style={{ backgroundColor: background }}>
                                        <input
                                            type="color"
                                            value={background}
                                            onChange={(e) => setBackground(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        className="hex-input"
                                        value={background}
                                        onChange={(e) => setBackground(e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{t("config.transparent")}</span>
                                    <mdui-switch
                                        checked={transparentBG}
                                        onChange={(e) => setTransparentBG(e.target.checked)}
                                    ></mdui-switch>
                                </div>
                            </div>
                        </OptionItem>

                        <OptionItem name="light" enable={true} reset={() => { setLight('#ffffff'); setIgnoreLight(false) }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', justifyContent: 'space-between' }}>
                                <div className={`color-input-container ${ignoreLight ? 'hidden' : ''}`}>
                                    <div className="color-preview" style={{ backgroundColor: light }}>
                                        <input
                                            type="color"
                                            value={light}
                                            onChange={(e) => setLight(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        className="hex-input"
                                        value={light}
                                        onChange={(e) => setLight(e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{t("config.transparent")}</span>
                                    <mdui-switch
                                        checked={ignoreLight}
                                        onChange={(e) => setIgnoreLight(e.target.checked)}
                                    ></mdui-switch>
                                </div>
                            </div>
                        </OptionItem>

                        <OptionItem name="head" enable={currentGenProfile.hasHead} reset={() => setHeadSize(1)}>
                            <mdui-slider
                                min="0"
                                max="500"
                                step="1"
                                value={headSize * 100}
                                onInput={(e) => setHeadSize(parseFloat(e.target.value) / 100)}
                                labelFormatter={(value) => `${Number(value)}%`}
                                style={{ width: '100%' }}
                            ></mdui-slider>
                        </OptionItem>

                        <OptionItem name="speed" enable={currentGenProfile.hasSpeed} reset={() => setSpeed(1)}>
                            <mdui-slider
                                min="0"
                                max="500"
                                step="1"
                                value={speed * 100}
                                onInput={(e) => setSpeed(parseFloat(e.target.value) / 100)}
                                labelFormatter={(value) => `${Number(value)}%`}
                                style={{ width: '100%' }}
                            ></mdui-slider>
                        </OptionItem>

                        <OptionItem name="pitch" enable={currentGenProfile.hasPitch} reset={() => setPitch(90)}>
                            <mdui-slider
                                min="0"
                                max="360"
                                step="1"
                                value={pitch}
                                onInput={(e) => setPitch(parseFloat(e.target.value))}
                                labelFormatter={(value) => `${Number(value)}°`}
                                style={{ width: '100%' }}
                            ></mdui-slider>
                        </OptionItem>

                        <OptionItem name="slim" enable={currentGenProfile.hasModel} reset={() => setSlim(0)}>
                            <mdui-radio-group value={slim.toString()} onInput={(e) => setSlim(parseInt(e.target.value))}>
                                <mdui-radio value="0">{t("model.default")}</mdui-radio>
                                <mdui-radio value="1">{t("model.standard")}</mdui-radio>
                                <mdui-radio value="2">{t("model.slim")}</mdui-radio>
                            </mdui-radio-group>
                        </OptionItem>
                    </div>

                    <mdui-card style={{
                        padding: '24px',
                        backgroundColor: 'rgba(var(--mdui-color-surface-container), 0.3)',
                        minHeight: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div className="responsive-title" style={{ fontWeight: 'bold' }}>{t("message.view")}</div>
                            <mdui-button-icon onClick={handleDownload}>
                                <mdui-icon-download></mdui-icon-download>
                            </mdui-button-icon>
                        </div>

                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {imgSrc === "w" ? (
                                <div style={{ textAlign: 'center' }}>
                                    <mdui-circular-progress></mdui-circular-progress>
                                    <div style={{ marginTop: '16px' }}>{t("message.warn1")}</div>
                                    <div style={{ opacity: 0.6 }}>{t("message.warn2")}</div>
                                </div>
                            ) : errorMsg ? (
                                <div style={{ color: 'rgba(var(--mdui-color-error), 1)', textAlign: 'center' }}>
                                    <mdui-icon-error></mdui-icon-error>
                                    <div style={{ marginTop: '8px' }}>{errorMsg}</div>
                                </div>
                            ) : imgSrc ? (
                                <img src={imgSrc} alt="Generated" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                            ) : (
                                <div style={{ opacity: 0.5, textAlign: 'center' }}>
                                    <mdui-icon-image style={{ fontSize: '4rem' }}></mdui-icon-image>
                                    <div>{t("message.info")}</div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div>{t("message.refresh")}</div>
                            <mdui-button-icon onClick={handleRefresh}>
                                <mdui-icon-refresh></mdui-icon-refresh>
                            </mdui-button-icon>
                        </div>
                    </mdui-card>
                </div>
            </mdui-card>
        </div >
    );
}
