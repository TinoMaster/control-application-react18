import { useCallback, useEffect, useState } from "react";
import { ServiceSaleModel } from "../../../../../../../core/models/api/serviceSale.model";
import { serviceSaleService } from "../../../../../../../core/services/serviceSaleService";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { ByBusinessAndDateRequestModel } from "../../../../../../../core/models/api/requests/byBusinessAndDateRequest.model";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAuthContext } from "../../../../../../../core/context/use/useAuthContext";
import { useBusinessContext } from "../../../../../../../core/context/use/useBusinessContext";
import { formatDateToHourString } from "../../../../../../../core/utilities/helpers/dateFormat";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";

export const SaleServices = () => {
  const [serviceSales, setServiceSales] = useState<ServiceSaleModel[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceSaleModel[]>(
    []
  );
  const { employee } = useAuthContext();
  const { business } = useBusinessContext();
  const {selectedTheme} = useThemeContext();

  const loadServiceSales = useCallback(async () => {
    if (!business.id) {
      return;
    }
    const request: ByBusinessAndDateRequestModel = {
      businessId: business.id,
      startDate: new Date(),
      endDate: new Date(),
    };
    const response =
      await serviceSaleService.getServiceSalesByBusinessIdAndDate(request);
    if (response.status === 200) {
      setServiceSales(response.data || []);
    }
  }, [business.id]);

  useEffect(() => {
    loadServiceSales();
  }, [loadServiceSales]);

  const handleToggleService = (service: ServiceSaleModel) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const myServices = serviceSales.filter((s) => s.employee.id === employee?.id);
  const otherServices = serviceSales.filter(
    (s) => s.employee.id !== employee?.id
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Servicios Vendidos del Día
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle1">
          Servicios seleccionados: {selectedServices.length}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          disabled={selectedServices.length === 0}
          sx={{ bgcolor: selectedTheme.primary_color, color: "white" }}
          onClick={() => console.log("Agregar Servicios")}
        >
          Agregar Servicios
        </Button>
      </Box>

      <Paper elevation={3} sx={{ mb: 3, overflow: "hidden" }}>
        <Typography
          variant="subtitle1"
          sx={{ p: 2, bgcolor: selectedTheme.primary_color, color: "white" }}
        >
          Mis Servicios
        </Typography>
        <List>
          {myServices.map((service) => (
            <ListItem key={service.id} disablePadding>
              <ListItemButton onClick={() => handleToggleService(service)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedServices.some((s) => s.id === service.id)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={service.service.name}
                  secondary={
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Chip
                        label={`Cantidad: ${service.quantity}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {formatDateToHourString(
                          new Date(service.createdAt || "")
                        )}
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {otherServices.length > 0 && (
        <Paper elevation={3}>
          <Typography
            variant="subtitle1"
            sx={{ p: 2, bgcolor: "var(--bg-dark-light)", color: "white" }}
          >
            Otros Servicios
          </Typography>
          <List>
            {otherServices.map((service) => (
              <ListItem key={service.id} disablePadding>
                <ListItemButton onClick={() => handleToggleService(service)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedServices.some(
                        (s) => s.id === service.id
                      )}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={service.service.name}
                    secondary={
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <Chip
                          label={`Cantidad: ${service.quantity}`}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                        <Chip
                          label={service.employee.user.name}
                          size="small"
                          variant="outlined"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {formatDateToHourString(
                            new Date(service.createdAt || "")
                          )}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};
