import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Navbar from '../components/Navbar';
import structures from '../data';
import { useParams, Link as RouterLink } from 'react-router-dom';

function Building() {
    const { id } = useParams();
    const index = Number(id);

    return (
        <Box>
            <Navbar active="1" />
            <Container
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Breadcrumbs sx={{ alignSelf: 'flex-start', my: 3 }}>
                    <Link underline="hover" href="/">
                        ГЛАВНАЯ
                    </Link>
                    <Typography color="text.primary">Ворота Запада, США</Typography>
                </Breadcrumbs>
                <Typography variant="h5" color="textSecondary">
                    {structures[index].title}
                </Typography>
                <Box
                    component="img"
                    alt={structures[index].title}
                    src={structures[index].img}
                    sx={{
                        width: {
                            xs: '60%',
                            sm: '30%',
                        },
                        my: 3
                    }}
                />
                <Grid
                    container
                    spacing={5}
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row'
                        },
                    }}
                >
                {structures[index].description.map((text, index) => (
                    <Grid size={{
                        xs: 12,
                        sm: 6
                    }}>
                        <Typography key={index} variant="body1" align="justify">
                            {text}
                        </Typography>
                    </Grid>
                ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default Building;