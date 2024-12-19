import { Container, Typography, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const WaitingConfirmation = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography component="h1" variant="h5" style={{ marginTop: '1rem' }}>
                            Espera de Confirmación
                        </Typography>
                        <Typography variant="body1" style={{ marginTop: '1rem', textAlign: 'center' }}>
                            Gracias por registrarte. Tu cuenta está en espera de ser habilitada por un administrador. Te notificaremos via email una vez que tu cuenta esté activa.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default WaitingConfirmation;