import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ServiceModel } from "../../../../../core/models/api";
import { formatCurrency } from "../../../../../core/utilities/helpers/formatCurrency";

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
              boxShadow: `0 0 20px ${selectedTheme.primary_color}15`,
              borderRadius: "12px",
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 8px 25px ${selectedTheme.primary_color}25`,
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color={selectedTheme.text_color}
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    mb: 0.5,
                  }}
                >
                  {service.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleEditModal(service)}
                    sx={{
                      color: selectedTheme.text_color,
                      "&:hover": {
                        backgroundColor: `${selectedTheme.primary_color}15`,
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteService(service)}
                    sx={{
                      color: selectedTheme.text_color,
                      "&:hover": {
                        backgroundColor: "#ff000015",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  color={selectedTheme.text_color}
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.5,
                  }}
                >
                  {service.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    pt: 1,
                    borderTop: `1px solid ${selectedTheme.text_color}15`,
                  }}
                >
                  <Typography
                    variant="body2"
                    color={selectedTheme.text_color}
                    sx={{
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    Precio:{" "}
                    <span style={{ color: selectedTheme.primary_color }}>
                      {formatCurrency(service.price)}
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    color={selectedTheme.text_color}
                    sx={{ opacity: 0.8 }}
                  >
                    Costos: {service.costs.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};
