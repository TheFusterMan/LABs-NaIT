import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import {RatingContext, RatingContextType} from "./RatingContext";
import Link from '@mui/material/Link';
import Navbar from '../components/Navbar';
import structures from '../data';
import { useParams, Link as RouterLink } from 'react-router-dom';
import React, { useState, useContext } from 'react';

function TransitionLeft(props: Omit<SlideProps, 'direction'>) {
    return <Slide {...props} direction="left" />;
}

function Building() {
    const { id } = useParams();
    const index = Number(id);

    const { ratings, setRating } = useContext(RatingContext) as RatingContextType;
    const rating = ratings[index] || 0;

    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
        setRating(index, newValue);
        setShowSnackbar(true);
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnackbar(false);
    };

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
                    <Typography color="text.primary">{structures[index].title}</Typography>
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography component="legend" sx={{ mr: 2 }}>
                        Оцените сооружение:
                    </Typography>
                    <Rating
                        name="building-rating"
                        value={rating}
                        onChange={handleRatingChange}
                        precision={0.5}
                        size="large"
                    />
                </Box>
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
            <Snackbar
                open={showSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message="Спасибо! Ваша оценка сохранена!"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                slots={{ transition: TransitionLeft }}
            >
                <Alert severity="info" onClose={handleCloseSnackbar}>
                    Спасибо! Ваша оценка сохранена!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Building;