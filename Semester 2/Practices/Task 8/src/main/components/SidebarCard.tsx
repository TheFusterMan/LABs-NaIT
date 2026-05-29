import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom';

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
    imageIndex: number;
}

function SidebarCard({ animal, imagePosition, imageIndex } : ComponentProps) {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: {
                xs: 'column-reverse',
                lg: imagePosition === 'right' ? 'row-reverse' : 'row'
            }
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
                        { animal.title }
                    </Typography>
                    { animal.description.map((item, ind) => (
                        <StyledTypography key={ind} variant="body2">
                            { item }
                        </StyledTypography>
                    ))}
                </CardContent>
                <CardActions sx={{ justifyContent: (imagePosition == 'right') ? 'left' : 'end' }}>
                    <Button size="small" sx={{ textDecoration: 'underline', color: 'warning.main' }}>Подробнее»</Button>
                </CardActions>
            </Box>
            <Link to={"/animal/" + imageIndex} style={{ display: 'contents', color: 'black', textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    alt={ animal.title }
                    image={ animal.img }
                    sx={{
                        width: {xs: "100%", lg: "47%"},
                    }}
                />
            </Link>
        </Card>
    )
}

export default SidebarCard;