import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ServiceModel } from "../../../../../core/models/api";

interface Props {
  services: ServiceModel[];
  handleEditModal: (service: ServiceModel) => void;
  handleDeleteService: (service: ServiceModel) => void;
  page: number;
  rowsPerPage: number;
}

export const ServiceListMobile = ({
  services,
  handleEditModal,
  handleDeleteService,
  page,
  rowsPerPage,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Box sx={{ mt: 2 }}>
      {services
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((service) => (
          <Card
            key={service.id}
            sx={{
              mb: 2,
              backgroundColor: selectedTheme.background_color,
              boxShadow: `0 0 70px 10px ${selectedTheme.primary_color}15 , 0 0 5px 2px #00000015`,
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                color={selectedTheme.text_color}
              >
                {service.name}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Descripción: {service.description}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Precio: ${service.price}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Costos: {service.costs.length}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleEditModal(service)}
                  sx={{ color: selectedTheme.text_color }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteService(service)}
                  sx={{ color: selectedTheme.text_color }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};
