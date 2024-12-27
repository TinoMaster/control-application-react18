import {
  Box,
  Button,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";

export const CountBillBox = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "960px",
        minHeight: "420px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        style={{
          width: "80%",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          align="center"
          sx={{
            padding: "12px",
            backgroundColor: "violet",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px 8px 0 0",
          }}
        >
          Desglose
        </Typography>

        <Grid container spacing={2} sx={{ paddingBottom: "16px" }}>
          {[
            "mil",
            "quinientos",
            "doscientos",
            "cien",
            "cincuenta",
            "veinte",
            "diez",
            "cinco",
            "tres",
            "uno",
          ].map((bill, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={bill}>
              <TextField
                label={`$${[1000, 500, 200, 100, 50, 20, 10, 5, 3, 1][index]}`}
                type="number"
                name={bill}
                fullWidth
                variant="outlined"
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #ddd",
            paddingTop: "16px",
          }}
        >
          <Button variant="outlined" color="error" sx={{ width: "30%" }}>
            Resetear
          </Button>
          <Button variant="contained" color="primary" sx={{ width: "30%" }}>
            Procesar
          </Button>
          <TextField
            label="Resultado"
            variant="outlined"
            fullWidth
            sx={{ width: "30%" }}
            InputProps={{
              readOnly: true,
              style: { textAlign: "center" },
            }}
          />
        </Box>
      </form>
    </Box>
  );
};
