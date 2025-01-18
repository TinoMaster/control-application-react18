import {
  Box,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  darken,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ModalReport } from "./modal-report/ModalReport";
import { SaleCard } from "./sale-card/SaleCard";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useBusinessFinalSale } from "../../../../../core/hooks/useBusinessFinalSale";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";

export const SaleReportBox = () => {
  const [openModal, setOpenModal] = useState(false);
  const { business } = useBusinessContext();
  const { todayReports } = useBusinessFinalSale({
    businessId: business?.id,
  });
  const { selectedTheme } = useThemeContext();

  console.log("todayReports", todayReports);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
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
            onClick={() => setOpenModal(true)}
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
      <ModalReport openModal={openModal} closeModal={handleCloseModal} />
    </Box>
  );
};
