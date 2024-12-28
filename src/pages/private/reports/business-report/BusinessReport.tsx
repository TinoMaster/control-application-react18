import { Grid2 as Grid } from "@mui/material";
import { CountBillBox } from "./count-bills-box/CountBillBox";

const BusinessReport = () => {
  return (
    <Grid container spacing={2}>
      <CountBillBox />
      <CountBillBox />
    </Grid>
  );
};
export default BusinessReport;
