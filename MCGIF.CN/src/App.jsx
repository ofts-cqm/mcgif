import './App.css'
import { Box, Paper, Grid, Divider, Stack, Alert, Typography } from '@mui/material';
import { useState } from "react";
import OptionItem from './OptionItem';
import ContentOption from './ContentOption';

import sneak from './assets/sneak.gif'
import sk from './assets/sk.png'
import dsk from './assets/dsk.gif'
import head from './assets/head.png'
import dhead from './assets/dhead.gif'
import homo from './assets/homo.png'

export default function App() {
    const [imgSrc, setImgSrc] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [warnMsg, setWarnMsg] = useState("");
    const [genContent, setGenContent] = useState("sneak");
    const [userId, setUserId] = useState("");
    const [lastGen, setLastGen] = useState(new Date().getTime());
    const [isStatic, setIsStatic] = useState(false);

    async function parseGen(res) {
        try {
            switch (res.status) {
                case 200:
                    break;
                case 400:
                    setImgSrc("");
                    setWarnMsg("请不要点击过快，会坏掉的QAQ");
                    break;
                case 404:
                case 500:
                    setErrorMsg("生成失败！请确认输入ID为正版账号！");
                    break;
            }

            const blob = await res.blob();
            setIsStatic(blob.type == "image/png");
            const url = URL.createObjectURL(blob);
            setLastGen(new Date().getTime());
            setImgSrc(url)
        } catch {
            setErrorMsg("一个未知的错误出现了，请稍后再试");
        }
    }

    function handleGen() {
        if (new Date().getTime() - lastGen < 3000) {
            setWarnMsg("请不要点击过快，会坏掉的QAQ");
            return;
        }
        setImgSrc("w")
        setErrorMsg("")
        setWarnMsg("")
        fetch("http://localhost:5173/api/render/name/" + userId + "/" + genContent + "?bg=0xA7A7FF&light=0xF7F7FF").then(parseGen);
    }

    function handleDownload() {
        if (imgSrc === "" || imgSrc === "w" || errorMsg !== "") {
            setWarnMsg("当前没有可下载的图片！");
            return;
        }
        const imageUrl = imgSrc;
        const fileName = "downloaded" + (isStatic ? ".png" : ".gif");

        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Stack sx={{ mb: 10 }}>
            <Stack spacing={2} sx={{
                width: 0.77,
                mt: "3%",
                ml: "10%",
                background: `linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))`,
                boxShadow: 2,
                borderRadius: 3,
                p: 3
            }}>
                <Typography variant='h3'>
                    请选择生成内容
                </Typography>
                <Grid container spacing={2} >
                    <ContentOption image={sneak} name='打招呼' value='sneak' current={genContent} setValue={setGenContent} />
                    <ContentOption image={sk} name='模型' value='sk' current={genContent} setValue={setGenContent} />
                    <ContentOption image={dsk} name='模型（旋转）' value='dsk' current={genContent} setValue={setGenContent} />
                    <ContentOption image={head} name='头' value='head' current={genContent} setValue={setGenContent} />
                    <ContentOption image={dhead} name='头（旋转）' value='dhead' current={genContent} setValue={setGenContent} />
                    <ContentOption image={homo} name='HOMO' value='homo' current={genContent} setValue={setGenContent} />
                </Grid>
            </Stack>

            <Grid container spacing={10} sx={{
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

                        <input type="text" id="player-id" placeholder="请输入正版账号ID" value={userId} onChange={(e) => setUserId(e.target.value)} className="text-input" />

                        <button className="gen" onClick={handleGen}>生成</button>


                        <Divider sx={{ my: 3 }} variant="h6">
                            <Typography variant="h6">高级</Typography>
                        </Divider>


                        <OptionItem name="背景颜色：">
                            <Typography>还没设置好</Typography>
                        </OptionItem>
                        <OptionItem name="环境光颜色：">
                            <Typography>还没设置好</Typography>
                        </OptionItem>
                        <OptionItem name="头大小：">
                            <Typography>还没设置好</Typography>
                        </OptionItem>
                        <OptionItem name="旋转速度：">
                            <Typography>还没设置好</Typography>
                        </OptionItem>
                        <OptionItem name="俯视角：">
                            <Typography>还没设置好</Typography>
                        </OptionItem>
                        <OptionItem name="瘦模型：">
                            <Typography>还没设置好</Typography>
                        </OptionItem>
                    </Stack>

                </Grid>

                <Grid size={6} sx={{
                    background: `linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))`,
                    boxShadow: 2,
                    borderRadius: 1,
                    p: 2
                }}
                >
                    <Stack direction="row" sx={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                        <Typography variant="h4" align="left" sx={{ my: 2 }}>图片预览：</Typography>
 
                        <button className="Btn" onClick={handleDownload }>
                                <svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
                                <span className="icon2"></span>
                                <span className="tooltip">下载图片</span>
                            </button>
                    </Stack>

                    {warnMsg !== "" && <Alert severity="warning">{warnMsg}</Alert>}
                    {errorMsg === "" && imgSrc !== "" && imgSrc !== "w" && <img src={imgSrc} alt="Generated Content" style={{ width: '100%' }} />}
                    {errorMsg === "" && imgSrc === "" && <Typography sx={{ my: 10 }}>填写完信息后点击“生成”来生成图片！</Typography>}
                    {errorMsg === "" && imgSrc === "w" && <Typography variant="h6" sx={{ mt: 20 }}> 请不要多次点击，服务器正在努力生成！</Typography>}
                    {errorMsg === "" && imgSrc === "w" && <Typography variant="h6" sx={{ mb: 20 }}>动图可能会比较慢，请耐心等待 </Typography>}
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
