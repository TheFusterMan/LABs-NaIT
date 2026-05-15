import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    marginBottom: "10px"
}))

interface ComponentProps {
    animal: {
        img: string,
        title: string,
        description: string[],
    };
}

function CentralCard({ animal } : ComponentProps) {
    return (
        <Card>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', lg: 'row' },
            }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }} >
                            { animal.title }
                        </Typography>
                        <Grid container spacing={3}>
                            { animal.description.map((item, ind) => (
                                <Grid size={{ xs: 12, md: 6 }} key={ind}>
                                    <StyledTypography variant="body2">
                                        { item }
                                    </StyledTypography>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" sx={{ textDecoration: 'underline', color: 'warning.main' }}>Подробнее»</Button>
                    </CardActions>
                </Box>
                <CardMedia
                    component="img"
                    alt={ animal.title }
                    image={ animal.img }
                    sx={{
                        width: {xs: "100%", lg: "47%"},
                    }}
                />
            </Box>
        </Card>
    )
}

export default CentralCard;