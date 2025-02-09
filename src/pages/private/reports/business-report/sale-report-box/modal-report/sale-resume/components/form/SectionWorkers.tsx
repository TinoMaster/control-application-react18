import {
  Avatar,
  Box,
  Checkbox,
  darken,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  lighten,
  Typography,
} from "@mui/material";
import { FieldErrors } from "react-hook-form";
import { useThemeContext } from "../../../../../../../../../core/context/use/useThemeContext";
import { BusinessFinalSaleModel } from "../../../../../../../../../core/models/api/businessFinalSale.model";
import { EmployeeModel } from "../../../../../../../../../core/models/api/employee.model";
import { filterEmployeesReadyToWork } from "../../../../../../../../../core/utilities/helpers/globals";
import { TSaleResume } from "../../zod/saleResume.zodSchema";

interface Props {
  errors: FieldErrors<TSaleResume>;
  employees: EmployeeModel[];
  businessSale: BusinessFinalSaleModel;
  handleSelectEmployee: (employeeId: string) => void;
}
export const SectionWorkers = ({
  errors,
  employees,
  businessSale,
  handleSelectEmployee,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ color: selectedTheme.text_color }}>
        Trabajadores
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: darken(selectedTheme.text_color, 0.3),
          fontSize: "0.8rem",
        }}
      >
        Nota: Solo aparecerán los trabajadores activos y con algún tipo de
        salario asignado
      </Typography>
      <FormControl error={!!errors.workers} fullWidth>
        <Grid container spacing={2}>
          {filterEmployeesReadyToWork(employees).map((employee) => (
            <Grid
              key={employee.id}
              size={{ xs: 12, sm: 6 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                padding: 1,
                borderRadius: 1,
                backgroundColor: lighten(selectedTheme.background_color, 0.1),
                color: selectedTheme.text_color,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: selectedTheme.secondary_color,
                }}
                alt={employee.user.name}
              >
                {employee.user.name.charAt(0)}
              </Avatar>
              <Typography variant="body2">{employee.user.name}</Typography>
              <Checkbox
                checked={businessSale.workers.some((w) => w.id === employee.id)}
                onChange={() => handleSelectEmployee(employee.id)}
                sx={{
                  padding: 0,
                  color: selectedTheme.text_color,
                  "&.Mui-checked": {
                    color: selectedTheme.secondary_color,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
        {errors.workers && (
          <FormHelperText>{errors.workers.message}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
