import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { useTableStyles } from "../../../../core/styles/useTableStyles";
import { formatDateToString } from "../../../../core/utilities/helpers/dateFormat";
import { translateRole } from "../../../../core/utilities/helpers/translateRole";

interface CardEmployeeProps {
  employee: EmployeeModel;
}

export const CardEmployee = ({ employee }: CardEmployeeProps) => {
  const { selectedTheme } = useThemeContext();
  const { cardStyle } = useTableStyles();
  return (
    <Card
      sx={{
        ...cardStyle,
        width: { xs: "95%", sm: "400px" },
        mx: "auto",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: "var(--bg-dark)",
              color: "white",
              width: 56,
              height: 56,
              border: "2px dashed",
            }}
          >
            {employee.user.name.charAt(0)}
          </Avatar>
        }
        title={
          <Typography
            sx={{ color: selectedTheme.text_color }}
            variant="h6"
            fontSize={"1rem"}
          >
            {employee.user.name}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            color={selectedTheme.text_color}
            fontSize={"0.7rem"}
          >
            {translateRole(employee.user.role)}
          </Typography>
        }
        action={
          <Button
            variant="contained"
            component={Link}
            to={`/employees/${employee.id}`}
            sx={{
              backgroundColor: "var(--bg-dark)",
              mt: 1,
              fontSize: "0.7rem",
            }}
          >
            ver detalles
          </Button>
        }
      />
      <CardContent>
        <Box>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color={selectedTheme.text_color}
          >
            <strong>Correo Electrónico:</strong> {employee.user.email}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color={selectedTheme.text_color}
          >
            <strong>Telefono:</strong> {employee.phone}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color={selectedTheme.text_color}
          >
            <strong>Dirección:</strong>{" "}
            {`${employee.address.street} ${employee.address.number}, ${employee.address.city}, ${employee.address.municipality}`}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color={selectedTheme.text_color}
          >
            <strong>DNI:</strong> {employee.dni}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color={selectedTheme.text_color}
          >
            <strong>Creado el:</strong>{" "}
            {formatDateToString(employee.user.createdAt as Date)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
