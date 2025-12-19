import { AppBar, Container, Toolbar, Stack, Typography } from '@mui/material'
import Description from './Description.jsx'
import { useState } from "react";

export default function HeaderBar() {
    const [open, setOpen] = useState(false);

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
                        justifyContent="space-between"
                        sx={{ width: '100%' }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            sx={{
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                            }}
                        >
                            MCGIF.CN｜我的世界动图网，让你的皮肤动起来~
                        </Typography>

                        <Typography variant='h5' onClick={() => setOpen(true)} sx={{ "&:hover": { textDecoration: "underline" } }}>关于本站</Typography>
                    </Stack>
                </Toolbar>

                <Description open={open} setOpen={setOpen} />
            </Container>
        </AppBar>
    )

}