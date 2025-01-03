import { Grid2 as Grid } from "@mui/material";
import { SaleReportBox } from "./sale-report-box/SaleReportBox";
import { BusinessReportProvider } from "./context/businessReportContext";

const BusinessReport = () => {
  return (
    <Grid container spacing={2}>
      <BusinessReportProvider>
        <SaleReportBox />
      </BusinessReportProvider>
    </Grid>
  );
};
export default BusinessReport;
