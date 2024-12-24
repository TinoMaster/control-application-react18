import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { EmployeeModel } from "../../../../core/models/api/employee";
import { formatDateToString } from "../../../../core/utilities/helpers/dateFormat";

interface CardEmployeeProps {
  employee: EmployeeModel;
}

export const CardEmployee = ({ employee }: CardEmployeeProps) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
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
        title={<Typography variant="h6">{employee.user.name}</Typography>}
        subheader={
          <Typography variant="body2" color="text.secondary">
            {employee.user.role}
          </Typography>
        }
        action={
          <Button
            variant="contained"
            sx={{ backgroundColor: "var(--primary-color)", mt: 1 }}
          >
            Show Details
          </Button>
        }
      />
      <CardContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Email:</strong> {employee.user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Phone:</strong> {employee.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Address:</strong>{" "}
            {`${employee.address.street} ${employee.address.number}, ${employee.address.city}, ${employee.address.municipality}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>ID:</strong> {employee.dni}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Created On:</strong>{" "}
            {formatDateToString(employee.user.createdAt as Date)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
