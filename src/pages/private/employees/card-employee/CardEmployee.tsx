import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { formatDateToString } from "../../../../core/utilities/helpers/dateFormat";
import { translateRole } from "../../../../core/utilities/helpers/translateRole";
import { Link } from "react-router-dom";

interface CardEmployeeProps {
  employee: EmployeeModel;
}

export const CardEmployee = ({ employee }: CardEmployeeProps) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: { xs: "0 auto", sm: "0" },
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: "var(--primary-color)",
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
            color="text.secondary"
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
              backgroundColor: "var(--primary-color)",
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
            color="text.secondary"
          >
            <strong>Correo Electrónico:</strong> {employee.user.email}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color="text.secondary"
          >
            <strong>Telefono:</strong> {employee.phone}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color="text.secondary"
          >
            <strong>Dirección:</strong>{" "}
            {`${employee.address.street} ${employee.address.number}, ${employee.address.city}, ${employee.address.municipality}`}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color="text.secondary"
          >
            <strong>DNI:</strong> {employee.dni}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color="text.secondary"
          >
            <strong>Creado el:</strong>{" "}
            {formatDateToString(employee.user.createdAt as Date)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
