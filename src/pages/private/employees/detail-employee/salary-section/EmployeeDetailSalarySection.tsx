import {
  Box,
  Typography,
  Grid2 as Grid,
  Card,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { Link } from "react-router-dom";
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
            sx={{
              p: 2,
              height: "100%",
              backgroundColor: selectedTheme.background_color,
              boxShadow: `0 0 15px 2px ${selectedTheme.secondary_color}15`,
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
              <IconButton
                component={Link}
                to={`/employees/${employee?.id}/edit-salary/fixed`}
                sx={{
                  color: selectedTheme.text_color,
                  "&:hover": { color: selectedTheme.primary_color },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
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
            sx={{
              p: 2,
              height: "100%",
              backgroundColor: selectedTheme.background_color,
              boxShadow: `0 0 15px 2px ${selectedTheme.secondary_color}15`,
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
              <IconButton
                component={Link}
                to={`/employees/${employee?.id}/edit-salary/percent`}
                sx={{
                  color: selectedTheme.text_color,
                  "&:hover": { color: selectedTheme.primary_color },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
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
              {employee?.percentSalary || 0}%
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
