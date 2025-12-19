import { AppBar, Container, Toolbar, Stack, Typography, Link, Divider } from '@mui/material'

function Bar({ middle = false }) {
    return <Divider orientation="vertical" variant={middle ? "middle" : ""} flexItem sx={{ mx: 1, borderRightWidth: 1, bgcolor: '#000000' }} />;
}

function TextButton({ children, onClick }) {
    return <Typography sx={{ "&:hover": { textDecoration: "underline" } }} style={{ cursor: 'pointer' }} onClick={onClick}>{children}</Typography>;
}

export default function FootBar() {
    function AayongClicked() {
        navigator.clipboard.writeText("599005767").then(() => {
            alert("已复制阿永QQ：599005767");
        })
    }

    function OFTSClicked() {
        navigator.clipboard.writeText("qianmuchen.sam@gmail.com").then(() => {
            alert("已复制OFTS邮箱：qianmuchen.sam@gmail.com");
        });
    }

    return (
        <AppBar
            position="sticky"
            elevation={0}
            className="bar"
            sx={{
                boxShadow: 2,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ py: 1.5, minHeight: '88px' }}>
                    <Stack alignItems="center" sx={{
                        width: '100%',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{
                                width: '100%', justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Link href="https://mccag.cn" style={{ fontSize: "1.3rem" }} color="inherit" underline="none">友情链接：mccag.cn</Link>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{
                                width: '100%', justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Typography>开发人员：404E | OFTS_CQM | Aayong</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{
                                width: '100%', justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Typography >友链投稿：</Typography>
                            <TextButton onClick={AayongClicked}>Aayong</TextButton>
                            <Bar middle={true} />
                            <TextButton onClick={OFTSClicked}>OFTS_CQM</TextButton>
                        </Stack>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}