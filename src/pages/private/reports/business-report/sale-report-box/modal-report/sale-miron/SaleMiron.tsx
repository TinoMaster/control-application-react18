import { Box, Button, darken, Grid2 as Grid, Typography } from "@mui/material";
import { useBusinessReportContext } from "../../../context/useBusinessReportContext";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import ConstructionIcon from "@mui/icons-material/Construction";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export const SaleMiron = () => {
  const { nextSection, prevSection } = useBusinessReportContext();
  const { selectedTheme } = useThemeContext();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{
        marginBottom: 2,
        width: "100%",
        maxWidth: 500,
        minWidth: { xs: "100%", sm: "400px" },
        color: selectedTheme.text_color,
      }}
    >
      <Grid size={12} sx={{ textAlign: "center", py: 4 }}>
        <ConstructionIcon
          sx={{ fontSize: 60, color: selectedTheme.text_color }}
        />
        <Typography variant="h5" sx={{ mt: 2 }}>
          En Construcción
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 1, color: darken(selectedTheme.text_color, 0.3) }}
        >
          Esta sección está actualmente en desarrollo
        </Typography>
      </Grid>

      <Grid size={12}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            onClick={prevSection}
            size="small"
            variant="outlined"
            startIcon={<KeyboardArrowLeftIcon />}
            sx={{
              borderColor: darken(selectedTheme.secondary_color, 0.3),
              color: selectedTheme.text_color,
            }}
          >
            Atrás
          </Button>
          <Button
            onClick={nextSection}
            size="small"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
            sx={{ backgroundColor: darken(selectedTheme.secondary_color, 0.3) }}
          >
            Siguiente
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
