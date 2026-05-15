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
    building: {
        img: string,
        title: string,
        description: string[],
    };
    index: number;
}

function BuildCard({ building, index } : ComponentProps) {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: (index % 2) ? 'row-reverse' : 'row'
        }}>
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={{
                        textAlign: "center"
                    }} >
                        { building.title }
                    </Typography>
                    { building.description.map((item, ind) => (
                        <StyledTypography key={ind} variant="body2">
                            { item }
                        </StyledTypography>
                    ))}
                </CardContent>
                <CardActions sx={{ justifyContent: index % 2 ?'left' : 'end' }} >
                    <Button size="small">Подробнее</Button>
                </CardActions>
            </Box>
            <CardMedia
                component="img"
                alt={ building.title }
                image={ building.img }
            />
        </Card>
    )
}

export default BuildCard;