import { Grid, Checkbox, Typography } from '@mui/material';

export default function OptionItem({ name, children }) {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={1}/>
            <Grid size={3}>
                <Typography align="left">{name}</Typography>
            </Grid>
            <Grid size={7} align="left">
                {children}
            </Grid>
            <Grid size={1} />
        </Grid>
    );
}