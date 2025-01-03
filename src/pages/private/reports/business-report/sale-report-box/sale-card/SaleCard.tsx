import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";

export const SaleCard = () => {
  const { selectedTheme } = useThemeContext();
  return (
    <Card
      sx={{
        width: "100%",
        margin: "0 auto",
        maxWidth: 345,
        borderColor: selectedTheme.secondary_color,
        backgroundColor: selectedTheme.background_color,
        color: selectedTheme.text_color,
        borderRadius: "8px",
        boxShadow: `0 0 70px 10px ${selectedTheme.secondary_color}15 , 0 0 5px 2px #00000015`,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          PC1
        </Typography>
        <Typography variant="body2">
          Lizards are a group of reptiles that belong to the order Squamata.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver detalles</Button>
      </CardActions>
    </Card>
  );
};
