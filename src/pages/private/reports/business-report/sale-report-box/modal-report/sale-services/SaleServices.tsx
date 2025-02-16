import BlockIcon from "@mui/icons-material/Block";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../../../../../core/context/use/useAuthContext";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import { ERole } from "../../../../../../../core/models/api";
import { ByBusinessAndDateRequestModel } from "../../../../../../../core/models/api/requests/byBusinessAndDateRequest.model";
import { ServiceSaleModel } from "../../../../../../../core/models/api/serviceSale.model";
import { serviceSaleService } from "../../../../../../../core/services/serviceSaleService";
import { updateBusinessSaleServices } from "../../../../../../../core/states/actions/businessFinalSaleActions";
import { useBusinessStore } from "../../../../../../../core/store/business.store";
import { formatDateToHourString } from "../../../../../../../core/utilities/helpers/dateFormat";
import { useBusinessReportContext } from "../../../context/useBusinessReportContext";

export const SaleServices = () => {
  const { dispatch, nextSection, prevSection } = useBusinessReportContext();
  const [serviceSales, setServiceSales] = useState<ServiceSaleModel[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceSaleModel[]>(
    []
  );
  const [modalConfirmMessage, setModalConfirmMessage] = useState<string>("");
  const { employee, role } = useAuthContext();
  const business = useBusinessStore((state) => state.business);
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
    dispatch(updateBusinessSaleServices(selectedServices));
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
          maxWidth: 500,
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: selectedTheme.text_color }}
          >
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
            <Button
              onClick={() => setModalConfirmMessage("")}
              sx={{ color: selectedTheme.text_color }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleOmitStep}
              sx={{ color: selectedTheme.text_color }}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        minWidth: { xs: "100%", sm: "400px" },
        mx: "auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: selectedTheme.text_color }}
        >
          Servicios seleccionados: {selectedServices.length}
        </Typography>
      </Box>

      {confirmModalOpen()}

      <Paper elevation={1} sx={{ mb: 3, overflow: "hidden" }}>
        <Typography
          variant="subtitle1"
          sx={{
            p: 1,
            bgcolor: darken(selectedTheme.secondary_color, 0.2),
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
                      color: selectedTheme.secondary_color,
                      "&.Mui-checked": {
                        color: selectedTheme.secondary_color,
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
                        variant="filled"
                        sx={{
                          bgcolor: darken(selectedTheme.secondary_color, 0.2),
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
        <Paper elevation={1} sx={{ mb: 3, overflow: "hidden" }}>
          <Typography
            variant="subtitle1"
            sx={{
              p: 1,
              bgcolor: "#636363",
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
                        color: "#636363",
                        "&.Mui-checked": {
                          color: darken("#636363", 0.2),
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
                          sx={{
                            bgcolor: "#636363",
                            color: "white",
                          }}
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
          variant="contained"
          size="small"
          startIcon={<KeyboardArrowLeftIcon />}
          onClick={handleGoBack}
          sx={{
            bgcolor: darken(selectedTheme.secondary_color, 0.2),
            color: "white",
          }}
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
          sx={{
            bgcolor: darken(selectedTheme.secondary_color, 0.2),
            color: "white",
          }}
        >
          {selectedServices.length === 0 ? "Omitir" : "Siguiente"}
        </Button>
      </Box>
    </Box>
  );
};
