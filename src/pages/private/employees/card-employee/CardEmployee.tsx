import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  lighten,
  Typography,
} from "@mui/material";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { formatDateToString } from "../../../../core/utilities/helpers/dateFormat";
import { translateRole } from "../../../../core/utilities/helpers/translateRole";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";

interface CardEmployeeProps {
  employee: EmployeeModel;
}

export const CardEmployee = ({ employee }: CardEmployeeProps) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: { xs: "0 auto", sm: "0" },
        borderRadius: 2,
        backgroundColor: lighten(selectedTheme.background_color, 0.1),
        color: selectedTheme.text_color,
        boxShadow: `0 0 70px 10px ${selectedTheme.primary_color}15 , 0 0 5px 5px #00000015`,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: selectedTheme.primary_color,
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
          <Typography variant="h6" fontSize={"1rem"}>
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
              backgroundColor: selectedTheme.primary_color,
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
