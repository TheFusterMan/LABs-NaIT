import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import structures from "../data";
import SidebarCard from "./SidebarCard"
import CentralCard from "./CentralCard"
import CentralArticle from "./CentralArticle";

const leftSidebarCardData = structures.slice(5, 7);
const centerCardData = structures.slice(7, 8);
const centralArticleData = structures.slice(10, 11);
const rightSidebarCardData = structures.slice(8, 10);

function Content() {
    return (
        <Container maxWidth="xl" sx={{ my: 5 }}>
            <Grid container spacing={{ xs: 3, md: 6 }}>

                <Grid
                    size={{ xs: 12, md: 6, lg: 3 }}
                    sx={{ order: { xs: 2, lg: 1 } }}
                >
                    <Grid container spacing={3}>
                        {leftSidebarCardData.map((item, index) => (
                            <Grid size={12} key={index}>
                                <SidebarCard animal={ item } imagePosition={ "left" }/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid
                    size={{ xs: 12, md: 12, lg: 6 }}
                    sx={{ order: { xs: 1, lg: 2 } }}
                >
                    <Grid container spacing={3}>
                        {centerCardData.map((item, index) => (
                            <Grid size={12} key={index}>
                                <CentralCard animal={ item } />
                            </Grid>
                        ))}
                        {centralArticleData.map((item, index) => (
                            <Grid size={12} key={index}>
                                <CentralArticle animal={ item } />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid
                    size={{ xs: 12, md: 6, lg: 3 }}
                    sx={{ order: { xs: 3, lg: 3 } }}
                >
                    <Grid container spacing={3}>
                        {rightSidebarCardData.map((item, index) => (
                            <Grid size={12} key={index}>
                                <SidebarCard animal={ item } imagePosition={ "right" }/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    );
}

export default Content;