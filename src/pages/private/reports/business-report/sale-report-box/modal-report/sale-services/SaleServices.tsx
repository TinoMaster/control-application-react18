import { useCallback, useEffect, useState } from "react";
import { ServiceSaleModel } from "../../../../../../../core/models/api/serviceSale.model";
import { serviceSaleService } from "../../../../../../../core/services/serviceSaleService";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  darken,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { ByBusinessAndDateRequestModel } from "../../../../../../../core/models/api/requests/byBusinessAndDateRequest.model";
import { useAuthContext } from "../../../../../../../core/context/use/useAuthContext";
import { useBusinessContext } from "../../../../../../../core/context/use/useBusinessContext";
import { formatDateToHourString } from "../../../../../../../core/utilities/helpers/dateFormat";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import { useBusinessReportContext } from "../../../context/useBusinessReportContext";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import BlockIcon from "@mui/icons-material/Block";
import { ERole } from "../../../../../../../core/models/api";

export const SaleServices = () => {
  const { businessSale, setBusinessSale, nextSection, prevSection } =
    useBusinessReportContext();
  const [serviceSales, setServiceSales] = useState<ServiceSaleModel[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceSaleModel[]>(
    []
  );
  const [modalConfirmMessage, setModalConfirmMessage] = useState<string>("");
  const { employee, role } = useAuthContext();
  const { business } = useBusinessContext();
  const { selectedTheme } = useThemeContext();

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
      if (role === ERole.EMPLOYEE) {
        setServiceSales(
          response.data?.filter((s) => s.employee.id === employee?.id) || []
        );
      } else {
        setServiceSales(response.data || []);
      }
    }
  }, [business.id, role, employee]);

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

  const handleOmitStep = () => {
    nextSection();
  };

  const handleGoBack = () => {
    prevSection();
  };

  const handleSaveServices = () => {
    setBusinessSale({
      ...businessSale,
      servicesSales: selectedServices,
    });
    nextSection();
  };

  const verifySelectedServices = (): boolean => {
    const areAllMyServicesSelected =
      selectedServices.filter((s) => s.employee.id === employee?.id).length ===
      serviceSales.filter((s) => s.employee.id === employee?.id).length;

    if (!areAllMyServicesSelected && role !== ERole.EMPLOYEE) {
      setModalConfirmMessage(
        "Hay servicios sin marcar, esto puede provocar la eliminación de estos, solo un administrador o propietario podrían salvarlos antes de acabar el dia ¿desea continuar?"
      );
      return false;
    } else if (selectedServices.length !== serviceSales.length) {
      setModalConfirmMessage(
        "Hay servicios sin marcar, esto puede provocar la eliminación de estos, ¿desea continuar?"
      );
      return false;
    }

    return true;
  };

  const handleSubmitStep = () => {
    if (verifySelectedServices()) {
      handleSaveServices();
    }
  };

  const myServices = serviceSales.filter((s) => s.employee.id === employee?.id);
  const otherServices = serviceSales.filter(
    (s) => s.employee.id !== employee?.id
  );

  if (serviceSales.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          mx: "auto",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" gutterBottom>
          No hay servicios vendidos
        </Typography>
        <Button
          variant="contained"
          onClick={handleOmitStep}
          sx={{ bgcolor: selectedTheme.primary_color, color: "white" }}
        >
          Siguiente
        </Button>
      </Box>
    );
  }

  const confirmModalOpen = () => {
    return (
      <Modal
        open={Boolean(modalConfirmMessage)}
        onClose={() => setModalConfirmMessage("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: selectedTheme.background_color,
            p: 4,
            borderRadius: "8px",
            width: "400px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Desea continuar?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              color: darken(selectedTheme.text_color, 0.3),
              fontSize: "0.8rem",
            }}
            variant="body1"
          >
            {modalConfirmMessage}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setModalConfirmMessage("")}>Cancelar</Button>
            <Button onClick={handleOmitStep}>Aceptar</Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle1">
          Servicios seleccionados: {selectedServices.length}
        </Typography>
      </Box>

      {confirmModalOpen()}

      <Paper elevation={3} sx={{ mb: 3, overflow: "hidden" }}>
        <Typography
          variant="subtitle1"
          sx={{
            p: 1,
            bgcolor: selectedTheme.primary_color,
            color: "white",
            fontSize: "0.9rem",
          }}
        >
          Mis Servicios
        </Typography>
        <List>
          {myServices.map((service) => (
            <ListItem key={service.id} disablePadding>
              <ListItemButton onClick={() => handleToggleService(service)}>
                <ListItemIcon>
                  <Checkbox
                    size="small"
                    edge="start"
                    checked={selectedServices.some((s) => s.id === service.id)}
                    tabIndex={-1}
                    disableRipple
                    sx={{
                      color: selectedTheme.primary_color,
                      "&.Mui-checked": {
                        color: selectedTheme.primary_color,
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={service.service.name}
                  secondary={
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Chip
                        label={`Cantidad: ${service.quantity}`}
                        size="small"
                        variant="outlined"
                        sx={{
                          bgcolor: selectedTheme.primary_color,
                          color: "white",
                        }}
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
        <Paper elevation={3} sx={{ mb: 3, overflow: "hidden" }}>
          <Typography
            variant="subtitle1"
            sx={{
              p: 1,
              bgcolor: "var(--bg-dark-light)",
              color: "white",
              fontSize: "0.9rem",
            }}
          >
            Servicios de otros empleados
          </Typography>
          <List>
            {otherServices.map((service) => (
              <ListItem key={service.id} disablePadding>
                <ListItemButton onClick={() => handleToggleService(service)}>
                  <ListItemIcon>
                    <Checkbox
                      size="small"
                      edge="start"
                      checked={selectedServices.some(
                        (s) => s.id === service.id
                      )}
                      tabIndex={-1}
                      disableRipple
                      sx={{
                        color: "var(--bg-dark-light)",
                        "&.Mui-checked": {
                          color: "var(--bg-dark-light)",
                        },
                      }}
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

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<KeyboardArrowLeftIcon />}
          onClick={handleGoBack}
          sx={{ bgcolor: selectedTheme.primary_color, color: "white" }}
        >
          Atrás
        </Button>
        <Button
          variant="contained"
          endIcon={
            selectedServices.length === 0 ? (
              <BlockIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )
          }
          size="small"
          onClick={handleSubmitStep}
          sx={{ bgcolor: selectedTheme.primary_color, color: "white" }}
        >
          {selectedServices.length === 0 ? "Omitir" : "Siguiente"}
        </Button>
      </Box>
    </Box>
  );
};
