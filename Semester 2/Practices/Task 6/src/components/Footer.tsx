import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <Box component="footer" sx={{ py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="body1" align="center">
                    Дмитрий Пожидаев, Б9123-09.03.04
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    СиИТ, 2026
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer;