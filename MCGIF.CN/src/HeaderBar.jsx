import { AppBar, Container, Toolbar, Stack, Typography } from '@mui/material'

export default function HeaderBar() {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: '#F7F7FF',
                color: 'common.black',
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
                            MCGIF.CN｜MC动图网
                        </Typography>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )

}