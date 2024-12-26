import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { BusinessModel } from "../../../../core/models/api";
import { formatDateToString } from "../../../../core/utilities/helpers/dateFormat";
import { Link } from "react-router-dom";

interface IBusinessCardProps {
  business: BusinessModel;
  currentBusinessId: number;
}

export const BusinessCard = ({
  business,
  currentBusinessId,
}: IBusinessCardProps) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: { xs: "0 auto", sm: "0" },
        boxShadow: 3,
        borderRadius: 2,
        border: "2px solid",
        position: "relative",
        borderColor:
          currentBusinessId === business.id
            ? "var(--secondary-color)"
            : "white",
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: 0,
          right: "10px",
          fontSize: "0.7rem",
          color: "success.main",
        }}
      >
        {currentBusinessId === business.id && "Seleccionado"}
      </Typography>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: "var(--secondary-color)",
              color: "white",
              width: 56,
              height: 56,
              border: "2px dashed",
            }}
          >
            {business.name.charAt(0)}
          </Avatar>
        }
        title={
          <Typography variant="h6" fontSize={"1rem"}>
            {business.name}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={"0.7rem"}
          >
            {business.address.municipality}
          </Typography>
        }
        action={
          <Link to={`/businesses/${business.id}`}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "var(--secondary-color)",
                mt: 1,
                fontSize: "0.7rem",
              }}
            >
              ver detalles
            </Button>
          </Link>
        }
      />
      <CardContent>
        <Box>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color="text.secondary"
          >
            <strong>Creado el:</strong>{" "}
            {formatDateToString(business.createdAt as Date)}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color="text.secondary"
          >
            <strong>Telefono:</strong> {business.phone}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color="text.secondary"
          >
            <strong>Dirección:</strong>{" "}
            {`${business.address.street} ${business.address.number}, ${business.address.city}, ${business.address.municipality}`}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color="text.secondary"
          >
            <strong>Personal en el negocio:</strong>{" "}
            {business.users?.length || 0}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color="text.secondary"
          >
            <strong>Descripción:</strong>{" "}
            {business.description ? business.description : "Sin descripción"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
