import { Grid, Stack, Radio, Typography } from '@mui/material'

export default function ContentOption({ image, name, value, current, setValue }) {
    let properties = { borderRadius: 2, border: 2, borderColor: '#B0B0FF' }

    if (value === current) {
        properties.boxShadow = 2,
        properties.backgroundColor = '#E0E0FF'
    }

    return (
        <Grid size={2} sx={properties} onClick={() => setValue(value)} >
            <Stack sx={{p: 1}} >
                <Radio
                    checked={current === value}
                    onChange={() => setValue(value)}
                    value={value}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': value }} />
                <img src={image} alt={name} style={{ width: '100%' }} />
            </Stack>
            <Typography variant='h5' sx={{ my: 2 }} >
                {name}
            </Typography>
        </Grid>
    )
}