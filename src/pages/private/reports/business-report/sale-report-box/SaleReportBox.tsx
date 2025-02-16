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
import { LoadingCircularProgress } from "../../../../../components/common/ui/loaders/LoadingCircularProgress";
import { ModalRandomInfo } from "../../../../../components/common/ui/ModalRandomInfo";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useBusinessFinalSale } from "../../../../../core/hooks/useBusinessFinalSale";
import { useBusinessStore } from "../../../../../core/store/business.store";
import { useTableStyles } from "../../../../../core/styles/useTableStyles";
import { useBusinessReportStore } from "../store/businessReport.store";
import { ModalReport } from "./modal-report/ModalReport";
import { SaleCard } from "./sale-card/SaleCard";

export const SaleReportBox = () => {
  const business = useBusinessStore((state) => state.business);
  const { openModalReport, setOpenModalReport } = useBusinessReportStore();
  const {
    todayReports,
    loadingTodayReports,
    machinesAlreadySelected,
    loadingSave,
    loadingDelete,
  } = useBusinessFinalSale();

  const { selectedTheme } = useThemeContext();
  const { cardStyle } = useTableStyles();

  const [openModalFullMachine, setOpenModalFullMachine] = useState(false);
  const [messageMachineDisponible, setMessageMachineDisponible] = useState("");

  const existFreeMachine = () => {
    if (!business.machines || business.machines.length === 0) {
      setMessageMachineDisponible(
        "Aun no ha creado ningún puesto o maquina de trabajo, el propietario en los detalles del negocio puede crearlos."
      );
      return false;
    } else if (
      business.machines?.length === machinesAlreadySelected()?.length
    ) {
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
      <LoadingCircularProgress
        loading={loadingTodayReports || loadingSave || loadingDelete}
      />

      <ModalRandomInfo
        open={openModalFullMachine}
        onClose={() => setOpenModalFullMachine(false)}
        title="Máquinas No Disponibles"
        info={messageMachineDisponible}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {todayReports?.map((sale) => (
            <Grid key={sale.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SaleCard sale={sale} />
            </Grid>
          ))}

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                ...cardStyle,
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
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ color: selectedTheme.text_color }}
                >
                  Agregar Venta
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <ModalReport
          openModal={openModalReport}
          closeModal={() => setOpenModalReport(false)}
        />
      </Box>
    </>
  );
};
