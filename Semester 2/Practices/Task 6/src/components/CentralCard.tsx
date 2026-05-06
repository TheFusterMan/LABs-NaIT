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
    type: 1 | 2;
}

function CentralArticle({ animal, type } : ComponentProps) {
    return (
        <Card sx={{
            display: 'flex',
        }}>
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={{
                        textAlign: "center"
                    }} >
                        { animal.title }
                    </Typography>
                    <Grid container spacing={5}>
                        { animal.description.map((item, ind) => (
                            <Grid size={5}>
                                <StyledTypography key={ind} variant="body2">
                                    { item }
                                </StyledTypography>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small">Подробнее</Button>
                </CardActions>
            </Box>
            <CardMedia
                component="img"
                alt={ animal.title }
                image={ animal.img }
            />
        </Card>
    )
}

export default CentralArticle;