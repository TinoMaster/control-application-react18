import { Box, CardContent, Grid2 as Grid, Typography } from "@mui/material";
import { formatDateToString } from "../../../../../core/utilities/helpers/dateFormat";
import { translateRole } from "../../../../../core/utilities/helpers/translateRole";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import { ERole } from "../../../../../core/models/api";

interface Props {
  employee: EmployeeModel;
}

export const EmployeeDetailDescriptionSection = ({ employee }: Props) => {
  return (
    <CardContent>
      <Grid container spacing={2} sx={{ py: { xs: 0, md: 1 } }}>
        {/* Información básica */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography
            variant="body1"
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.9rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontWeight: "bold" }}>Nombre: </span>
            </Box>
            <span>{employee?.user.name}</span>
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.9rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontWeight: "bold" }}>Dirección: </span>
            </Box>
            <p
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >{`${employee?.address.street} #${employee?.address.number}, ${employee?.address.city}, ${employee?.address.municipality}`}</p>
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.9rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontWeight: "bold" }}>Teléfono: </span>
            </Box>
            <span>{employee?.phone}</span>
          </Typography>
        </Grid>
        {/* Otros detalles */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.9rem",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Cargo: </span>
            <span>{translateRole(employee?.user.role as ERole)}</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.9rem",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Creado: </span>
            <span>
              {formatDateToString(employee?.user.createdAt || new Date())}
            </span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.9rem",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Modificado: </span>
            <span>
              {formatDateToString(employee?.user.updatedAt || new Date())}
            </span>
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );
};
