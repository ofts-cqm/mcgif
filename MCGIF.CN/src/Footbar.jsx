import { AppBar, Container, Toolbar, Stack, Typography, Link, Divider } from '@mui/material'

function Bar() {
    return <Divider orientation="vertical" flexItem sx={{ mx: 1, borderRightWidth: 1, bgcolor: '#000000' }} />;
}

export default function FootBar() {
    function AayongClicked() {
        navigator.clipboard.writeText("599005767").then(() => {
            alert("已复制阿勇QQ：599005767");
        })
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
                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ width: '100%' }}
                    >
                        <Typography
                            fontWeight={700}
                            sx={{
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                            }}
                        >
                            开发组：404E, OFTS_CQM, Aayong
                        </Typography>
                        <Bar/>
                        <Link href="https://mccag.cn" style={{ fontSize: "1.3rem" }}>友链：mccag.cn</Link>
                        <Bar />
                        <Typography sx={{ "&:hover": { textDecoration: "underline" } }} onClick={AayongClicked}>合作友链：Aayong</Typography>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )

}