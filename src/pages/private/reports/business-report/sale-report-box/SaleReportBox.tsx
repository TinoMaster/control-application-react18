import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Card,
  CardContent,
  darken,
  Grid2 as Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ModalRandomInfo } from "../../../../../components/common/ui/ModalRandomInfo";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ModalReport } from "./modal-report/ModalReport";
import { SaleCard } from "./sale-card/SaleCard";
import { useBusinessReportContext } from "../context/useBusinessReportContext";
import { LoadingCircularProgress } from "../../../../../components/common/ui/loaders/LoadingCircularProgress";
import { CustomSnackbar } from "../../../../../components/common/ui/CustomSnackbar";

export const SaleReportBox = () => {
  const { business } = useBusinessContext();
  const {
    todayReports,
    machinesAlreadySelected,
    openModalReport,
    handleCloseModalReport,
    setOpenModalReport,
    loading,
    success,
    error,
  } = useBusinessReportContext();
  const { selectedTheme } = useThemeContext();

  const [openModalFullMachine, setOpenModalFullMachine] = useState(false);
  const [messageMachineDisponible, setMessageMachineDisponible] = useState("");

  const existFreeMachine = () => {
    if (!business.machines || business.machines.length === 0) {
      setMessageMachineDisponible(
        "Aun no ha creado ningún puesto o maquina de trabajo, el propietario en los detalles del negocio puede crearlos."
      );
      return false;
    } else if (business.machines?.length === machinesAlreadySelected().length) {
      setMessageMachineDisponible(
        "En este momento todas las máquinas están asignadas a reportes existentes. Para crear un nuevo reporte, es necesario que haya al menos una máquina disponible."
      );
      return false;
    }
    return true;
  };

  const onOpenModalReport = () => {
    if (existFreeMachine()) {
      setOpenModalReport(true);
    } else {
      setOpenModalFullMachine(true);
    }
  };

  return (
    <>
      <LoadingCircularProgress loading={loading} />
      <CustomSnackbar
        error={error.status}
        success={success.status}
        errorMessage={error.message}
        successMessage={success.message}
      />
      <ModalRandomInfo
        open={openModalFullMachine}
        onClose={() => setOpenModalFullMachine(false)}
        title="Máquinas No Disponibles"
        info={messageMachineDisponible}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {todayReports.map((sale) => (
            <Grid key={sale.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SaleCard sale={sale} />
            </Grid>
          ))}

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor: selectedTheme.secondary_color,
                backgroundColor: selectedTheme.background_color,
                color: selectedTheme.text_color,
                borderRadius: "8px",
                boxShadow: `0 0 70px 10px ${selectedTheme.secondary_color}15 , 0 0 5px 2px #00000015`,
                transition: "background-color 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: darken(selectedTheme.background_color, 0.1),
                },
              }}
              onClick={onOpenModalReport}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <IconButton
                  size="large"
                  sx={{
                    color: selectedTheme.secondary_color,
                    mb: 1,
                  }}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" component="div">
                  Agregar Venta
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <ModalReport
          openModal={openModalReport}
          closeModal={handleCloseModalReport}
        />
      </Box>
    </>
  );
};
