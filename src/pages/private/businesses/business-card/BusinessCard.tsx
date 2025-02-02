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
import { BusinessModel } from "../../../../core/models/api";
import { formatDateToString } from "../../../../core/utilities/helpers/dateFormat";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { useTableStyles } from "../../../../core/styles/useTableStyles";

interface IBusinessCardProps {
  business: BusinessModel;
  currentBusinessId: number;
}

export const BusinessCard = ({
  business,
  currentBusinessId,
}: IBusinessCardProps) => {
  const { selectedTheme } = useThemeContext();
  const { cardStyle } = useTableStyles();
  return (
    <Card
      sx={{
        ...cardStyle,
        width: "100%",
        maxWidth: 400,
        borderRadius: 2,
        border: "1px solid",
        position: "relative",
        borderColor:
          currentBusinessId === business.id
            ? selectedTheme.secondary_color
            : selectedTheme.primary_color,
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          bottom: 5,
          right: "10px",
          fontSize: "0.7rem",
          color: selectedTheme.secondary_color,
        }}
      >
        {currentBusinessId === business.id && <CheckCircleSharpIcon />}
      </Typography>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: lighten(selectedTheme.primary_color, 0.1),
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
          <Typography
            color={selectedTheme.text_color}
            variant="h6"
            fontSize={"1rem"}
          >
            {business.name}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            color={selectedTheme.text_color}
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
                backgroundColor: lighten(selectedTheme.primary_color, 0.1),
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
            color={selectedTheme.text_color}
          >
            <strong>Creado el:</strong>{" "}
            {formatDateToString(business.createdAt as Date)}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color={selectedTheme.text_color}
          >
            <strong>Telefono:</strong> {business.phone}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color={selectedTheme.text_color}
          >
            <strong>Dirección:</strong>{" "}
            {`${business.address.street} ${business.address.number}, ${business.address.city}, ${business.address.municipality}`}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color={selectedTheme.text_color}
          >
            <strong>Personal en el negocio:</strong>{" "}
            {business.users?.length || 0}
          </Typography>
          <Typography
            fontSize={"0.8rem"}
            variant="body2"
            color={selectedTheme.text_color}
          >
            <strong>Descripción:</strong>{" "}
            {business.description ? business.description : "Sin descripción"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
