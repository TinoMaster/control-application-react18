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
import { ModalError } from "../../../../../components/common/ui/ModalError";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useBusinessFinalSale } from "../../../../../core/hooks/useBusinessFinalSale";
import { ModalReport } from "./modal-report/ModalReport";
import { SaleCard } from "./sale-card/SaleCard";

export const SaleReportBox = () => {
  const [openModalReport, setOpenModalReport] = useState(false);
  const [openModalFullMachine, setOpenModalFullMachine] = useState(false);
  const { business } = useBusinessContext();
  const { todayReports, machinesAlreadySelected } = useBusinessFinalSale({
    businessId: business?.id,
  });
  const { selectedTheme } = useThemeContext();

  const handleCloseModal = () => {
    setOpenModalReport(false);
  };

  const existFreeMachine = () => {
    if (!business.machines) {
      return false;
    }
    return business.machines?.length > machinesAlreadySelected().length;
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
      <ModalError
        openModal={openModalFullMachine}
        onClose={() => setOpenModalFullMachine(false)}
        title="Máquinas No Disponibles"
        message="En este momento todas las máquinas están asignadas a reportes existentes. Para crear un nuevo reporte, es necesario que haya al menos una máquina disponible."
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
          closeModal={handleCloseModal}
        />
      </Box>
    </>
  );
};
