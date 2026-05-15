import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import structures from "../../data";
import {useMediaQuery, useTheme} from "@mui/material";
import { Link } from 'react-router-dom';

const imgData= structures.slice(0, 5);

function Gallery() {
    const theme = useTheme();
    const mdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
    const lgBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Container maxWidth="xl">
            <Box sx={{ height: 585, overflowY: 'scroll', m: '20px auto'}}>
                <ImageList
                    variant="quilted"
                    cols={lgBreakpoint ? 3 : 2}
                    gap={0}
                    //rowHeight={200} // убрать если надо полные
                    // sx={{
                    //     cols: {
                    //         xs: '1 !important',
                    //         sm: '2 !important',
                    //         md: '3 !important',
                    //         lg: '4 !important',
                    //     },
                    // }}
                    >
                    {imgData.map((item, index) => (
                            <ImageListItem
                                key={item.img}
                                cols={lgBreakpoint ? item.cols : mdBreakpoint ? 1 : 2}
                                rows={item.rows}
                                component={Link}
                                to={"/animal/" + index}
                            >
                                <img
                                    srcSet={ item.img }
                                    src={ item.img }
                                    alt={ item.title }
                                    loading="lazy"
                                />
                            </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Container>
);
}

export default Gallery;