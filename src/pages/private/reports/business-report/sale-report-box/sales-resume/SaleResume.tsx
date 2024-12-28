import { Grid2 as Grid, InputAdornment, TextField, Typography } from "@mui/material";

export const SaleResume = () => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: 2, width: "50%" }}
    >
      <Typography variant="h5" align="center">
        Daily Sales Entry
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary">
        Enter your business's daily sales data.
      </Typography>
      {/* <DatePicker /> */}
      <TextField
        label="Total Sales"
        type="number"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
        helperText="The total amount of sales for the day."
        fullWidth
      />
      <TextField
        label="Number of Transactions"
        type="number"
        helperText="The total number of transactions for the day."
        fullWidth
      />
      <TextField
        label="Average Transaction Value"
        type="number"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
        helperText="The average value per transaction."
        fullWidth
      />
    </Grid>
  );
};
