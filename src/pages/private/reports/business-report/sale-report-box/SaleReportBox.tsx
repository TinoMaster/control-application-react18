import { Grid2 as Grid } from "@mui/material";
import { SaleResume } from "./sales-resume/SaleResume";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";

export const SaleReportBox = () => {
  const { selectedTheme } = useThemeContext();
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        minHeight: "80vh",
        gap: 2,
        padding: 4,
        border: "1px solid",
        borderColor: selectedTheme.secondary_color,
        borderRadius: "8px",
        boxShadow: `0 0 70px 10px ${selectedTheme.secondary_color}15 , 0 0 5px 2px #00000015`,
      }}
    >
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          width: "50%",
        }}
      >
        <SaleResume />
      </Grid>
    </Grid>
  );
};
