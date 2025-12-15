import { Grid, Box, Typography } from '@mui/material';

export default function OptionItem({ name, children, disabled }) {
    return (
        <Box position="relative">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                justifyContent: "center",
                alignItems: "center",
                my: 1
            }}>
                <Grid size={1} />
                <Grid size={3} >
                    <Typography align="left">{name}</Typography>
                </Grid>
                <Grid size={7} align="left">
                    {children}
                </Grid>
                <Grid size={1} />
            </Grid>

            {disabled && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(230, 230, 230, 0.6)',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'auto',
                    }}
                >
                </Box>
            )}
        </Box>
    );
}