import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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
    imagePosition: 'left' | 'right';
}

function CentralArticle({ animal } : ComponentProps) {
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
                    { animal.description.map((item, ind) => (
                        <StyledTypography key={ind} variant="body2">
                            { item }
                        </StyledTypography>
                    ))}
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