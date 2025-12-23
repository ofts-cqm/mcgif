import './App.css'
import {
    FormGroup,
    FormControl,
    RadioGroup,
    Radio,
    Checkbox,
    FormControlLabel,
    Slider,
    Paper,
    Grid,
    Divider,
    Stack,
    Alert,
    Typography,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input'
import { useState } from "react";
import OptionItem from './OptionItem';
import ContentOption from './ContentOption';
import { useTranslation } from 'react-i18next';

import sneak from './assets/sneak.gif'
import sk from './assets/sk.png'
import dsk from './assets/dsk.gif'
import head from './assets/head.png'
import dhead from './assets/dhead.gif'
import homo from './assets/homo.png'

export default function App({theme}) {
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
    const [mobileWarningOpen, setMobileWarningOpen] = useState(useMediaQuery(theme.breakpoints.down('sm')));

    const { t } = useTranslation();

    function handleSlim(event) {
        setSlim(event.target.value);
    }

    async function parseGen(res) {
        try {
            switch (res.status) {
                case 200:
                    break;
                case 400:
                case 429:
                    setImgSrc("");
                    setWarnMsg(t("warning.too_fast"));
                    return;
                case 404:
                case 500:
                    setErrorMsg(t("error.failed"));
                    return;
                case 503:
                    setErrorMsg(t("error.network"));
                    return;
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
        //fetch(`http://localhost:5173/api/render/name/${userId}/${genContent}?${args}`).then(parseGen);
    }

    function handleDownload() {
        if (imgSrc === "" || imgSrc === "w" || errorMsg !== "") {
            setWarnMsg(t("warning.no_content"));
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

    return (
        <Stack sx={{
            mb: 10,
        }}>
            <Dialog open={mobileWarningOpen} onClose={() => setMobileWarningOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{t("warning.title")}</DialogTitle>
                <DialogContent>{t("warning.not_adaptive")} </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setMobileWarningOpen(false)}>{t("close")}</Button>
                </DialogActions>
            </Dialog>

            <Stack spacing={2} sx={{
                width: 0.77,
                mt: "3%",
                ml: "10%",
                background: `linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))`,
                boxShadow: 2,
                borderRadius: 3,
                p: 3
            }}>
                <Typography variant='h3'>{t("gen.title")}</Typography>
                <Grid container spacing={2} >
                    <ContentOption image={sneak} value='sneak' current={genContent} setValue={setGenContent} />
                    <ContentOption image={sk} value='sk' current={genContent} setValue={setGenContent} />
                    <ContentOption image={dsk} value='dsk' current={genContent} setValue={setGenContent} />
                    <ContentOption image={head} value='head' current={genContent} setValue={setGenContent} />
                    <ContentOption image={dhead} value='dhead' current={genContent} setValue={setGenContent} />
                    <ContentOption image={homo} value='homo' current={genContent} setValue={setGenContent} />
                </Grid>
            </Stack>

            <Grid container spacing={6} sx={{
                width: 0.8,
                mt: "3%",
                ml: "10%",
                background: `linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))`,
                boxShadow: 2,
                borderRadius: 3,
                p: 3
            }}>
                <Grid size={6}>
                    <Stack >

                        <input type="text" id="player-id" placeholder={t("gen.id")} value={userId} onChange={(e) => setUserId(e.target.value)} className="text-input" />

                        <button className="gen" onClick={handleGen}>{t("gen.apply")}</button>


                        <Divider sx={{ my: 3 }} variant="h6">
                            <Typography variant="h6">{t("config.title")}</Typography>
                        </Divider>


                        <OptionItem name="bg" disabled={genContent === "homo"} reset={() => { setBackground('#ffffff'); setTransparentBG(false) }}>
                            <Stack direction="row" sx={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}>
                                <MuiColorInput format="hex" value={background} onChange={(v) => setBackground(v)} sx={{ mr: 2 }} style={
                                    transparentBG ? {
                                        pointerEvents: "none",
                                        opacity: 0.5,
                                    } : {}
                                } />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={transparentBG} onChange={event => setTransparentBG(event.target.checked)} />} label={t("config.transparent")} />
                                </FormGroup>
                            </Stack>
                        </OptionItem>
                        <OptionItem name="light" disabled={false} reset={() => { setLight('#ffffff'); setIgnoreLight(false) }}>
                            <Stack direction="row" sx={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}>
                                <MuiColorInput format="hex" value={light} onChange={(v) => setLight(v)} sx={{ mr: 2 }} style={
                                    ignoreLight ? {
                                        pointerEvents: "none",
                                        opacity: 0.5,
                                    } : {}
                                } />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={ignoreLight} onChange={event => setIgnoreLight(event.target.checked)} />} label={t("config.transparent")} />
                                </FormGroup>
                            </Stack>
                        </OptionItem>
                        <OptionItem name="head" disabled={genContent === "head" || genContent === "dhead"} reset={() => setHeadSize(1)}>
                            <Slider
                                min={0}
                                max={5}
                                value={headSize}
                                onChange={(e, v) => setHeadSize(v)}
                                step={0.01 }
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${~~(value * 100)}%`}
                            />
                        </OptionItem>
                        <OptionItem name="speed" disabled={genContent !== "dsk" && genContent !== "sneak" && genContent !== "dhead"} reset={() => setSpeed(1)}>
                            <Slider
                                min={0.3}
                                max={5}
                                value={speed}
                                onChange={(e, v) => setSpeed(v)}
                                step={0.01}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${~~(value * 100)}%`}
                            />
                        </OptionItem>
                        <OptionItem name="pitch" disabled={genContent !== "dsk" && genContent !== "dhead"} reset={() => setPitch(0)}>
                            <Slider
                                min={-90}
                                max={90}
                                value={pitch}
                                onChange={(e, v) => setPitch(v)}
                                valueLabelDisplay="auto"
                            />
                        </OptionItem>
                        <OptionItem name="slim" disabled={genContent === "head" || genContent === "dhead" || genContent === "homo"} reset={() => setSlim(0)}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue="0"
                                    value={slim}
                                    onChange={handleSlim}
                                >
                                    <FormControlLabel value="0" control={<Radio />} label={t("model.default")} />
                                    <FormControlLabel value="1" control={<Radio />} label={t("model.standard")} />
                                    <FormControlLabel value="2" control={<Radio />} label={t("model.slim")} />
                                </RadioGroup>
                            </FormControl>
                        </OptionItem>
                    </Stack>

                </Grid>

                <Grid size={6} sx={{
                    background: `linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))`,
                    boxShadow: 2,
                    borderRadius: 1,
                    p: 2,
                }}
                >
                    <Stack direction="row" sx={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                        <Typography variant="h4" align="left" sx={{ my: 2 }}>{t("message.view")}</Typography>

                        <button className="Btn" onClick={handleDownload}>
                            <svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
                            <span className="icon2"></span>
                            <span className="tooltip">{t("message.download")}</span>
                        </button>
                    </Stack>

                    {warnMsg !== "" && <Alert severity="warning">{warnMsg}</Alert>}
                    {errorMsg === "" && imgSrc !== "" && imgSrc !== "w" && <img src={imgSrc} alt="Generated Content" style={{ maxWidth: '100%', maxHeight: '50vh'}} />}
                    {errorMsg === "" && imgSrc === "" && <Typography sx={{ my: 10 }}>{t("message.info")}</Typography>}
                    {errorMsg === "" && imgSrc === "w" && <Typography variant="h6" sx={{ mt: 20 }}>{t("message.warn1")}</Typography>}
                    {errorMsg === "" && imgSrc === "w" && <Typography variant="h6" sx={{ mb: 20 }}>{t("message.warn2")}</Typography>}
                    {errorMsg !== "" && <Paper
                        sx={{
                            background: `linear-gradient(135deg, rgba(255, 102, 102, 0.1), rgba(162, 75, 75, 0.1))`,
                            height: '70%',
                            display: "grid",
                            placeItems: "center", // centers both vertically & horizontally
                            p: 2
                        }}
                    >
                        <Typography variant="h6" align="center" sx={{ height: '100%' }}>{errorMsg}</Typography>
                    </Paper>}
                </Grid>
            </Grid>
        </Stack>
    );
}
