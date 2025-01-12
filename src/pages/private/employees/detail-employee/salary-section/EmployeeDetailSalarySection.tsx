import {
  Box,
  Card,
  Grid2 as Grid,
  Typography,
  darken
} from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";

interface Props {
  employee: EmployeeModel;
}

export const EmployeeDetailSalarySection = ({ employee }: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Salarios
      </Typography>
      <Grid container spacing={2}>
        {/* Fixed Salary Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={2}
            sx={{
              p: 2,
              height: "100%",
              backgroundColor: darken(selectedTheme.background_color, 0.1),
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={selectedTheme.text_color}
              >
                Salario Fijo
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                color: selectedTheme.primary_color,
                fontWeight: "bold",
                textAlign: "center",
                my: 2,
              }}
            >
              ${employee?.fixedSalary?.toLocaleString() || 0}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: selectedTheme.text_color,
                textAlign: "center",
              }}
            >
              Monto fijo mensual
            </Typography>
          </Card>
        </Grid>

        {/* Percentage Salary Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={2}
            sx={{
              p: 2,
              height: "100%",
              backgroundColor: darken(selectedTheme.background_color, 0.1),
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={selectedTheme.text_color}
              >
                Salario Porcentual
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                color: selectedTheme.primary_color,
                fontWeight: "bold",
                textAlign: "center",
                my: 2,
              }}
            >
              {employee?.percentSalary
                ? (employee?.percentSalary * 100).toFixed()
                : 0}
              %
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: selectedTheme.text_color,
                textAlign: "center",
              }}
            >
              Porcentaje sobre ventas
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
