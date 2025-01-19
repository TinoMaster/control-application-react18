import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SaveIcon from "@mui/icons-material/Save";
import TimelineIcon from "@mui/icons-material/Timeline";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  darken,
  Divider,
  Grid2 as Grid,
  LinearProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomSnackbar } from "../../../../../../../components/common/ui/CustomSnackbar";
import { LoadingCircularProgress } from "../../../../../../../components/common/ui/LoadingCircularProgress";
import { useBusinessContext } from "../../../../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import { useBusinessReportContext } from "../../../context/useBusinessReportContext";

export const SaleReport = () => {
  const {
    businessSale,
    cards,
    setBusinessSale,
    loading,
    success,
    error,
    saveBusinessSale,
  } = useBusinessReportContext();
  const { selectedTheme } = useThemeContext();
  const { business } = useBusinessContext();
  const [modalAddNote, setModalAddNote] = useState(false);
  const [note, setNote] = useState(businessSale.note);

  const handleAddNote = () => {
    setBusinessSale({
      ...businessSale,
      note: note,
    });
    setModalAddNote(false);
  };

  const getTotalDebts = () => {
    return businessSale.debts.reduce((acc, debt) => acc + debt.total, 0);
  };

  const getTotalCards = () => {
    return cards.reduce((acc, card) => acc + card.amount, 0);
  };

  const getTotalServices = () => {
    return businessSale.servicesSales.reduce(
      (acc, sale) => acc + sale.quantity * sale.service.price,
      0
    );
  };

  const cardStyle = {
    height: "100%",
    backgroundColor: darken(selectedTheme.background_color, 0.1),
    color: selectedTheme.text_color,
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    mb: 2,
    color: selectedTheme.text_color,
  };

  const chipStyle = {
    backgroundColor: selectedTheme.secondary_color,
    color: "white",
    m: 0.5,
  };

  return (
    <>
      <LoadingCircularProgress loading={loading} />
      <CustomSnackbar
        error={error}
        success={success}
        errorMessage={error ? "Error al guardar la venta" : ""}
        successMessage={success ? "Venta guardada con éxito" : ""}
      />
      <Modal
        open={modalAddNote}
        onClose={() => setModalAddNote(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: selectedTheme.background_color,
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: selectedTheme.text_color,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AssignmentIcon /> Agregar Nota
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box component="form" noValidate>
            <TextField
              autoFocus
              fullWidth
              value={note}
              multiline
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              variant="outlined"
              placeholder="Escribe tu nota aquí..."
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: darken(selectedTheme.background_color, 0.03),
                  color: selectedTheme.text_color,
                  "& fieldset": {
                    borderColor: darken(selectedTheme.background_color, 0.3),
                  },
                  "&:hover fieldset": {
                    borderColor: selectedTheme.secondary_color,
                  },
                  "&:focused fieldset": {
                    borderColor: selectedTheme.secondary_color,
                  },
                  "&:active fieldset": {
                    borderColor: selectedTheme.secondary_color,
                  },
                },
              }}
            />
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => setModalAddNote(false)}
                sx={{
                  color: selectedTheme.text_color,
                  borderColor: selectedTheme.secondary_color,
                  "&:hover": {
                    borderColor: selectedTheme.secondary_color,
                    backgroundColor: darken(
                      selectedTheme.background_color,
                      0.1
                    ),
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleAddNote}
                sx={{
                  backgroundColor: darken(selectedTheme.secondary_color, 0.2),
                  "&:hover": {
                    backgroundColor: darken(selectedTheme.secondary_color, 0.1),
                  },
                }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          backgroundColor: selectedTheme.background_color,
          color: selectedTheme.text_color,
          px: { xs: 0, sm: 2 },
        }}
      >
        {/* Encabezado del Reporte */}
        <Box
          sx={{
            mb: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h6" sx={{ color: selectedTheme.text_color }}>
            {businessSale.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              flexWrap: "wrap",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              variant="outlined"
              startIcon={<AssignmentIcon />}
              onClick={() => setModalAddNote(true)}
              sx={{
                mt: 1,
                width: { xs: "100%", sm: "auto" },
                color: selectedTheme.text_color,
                borderColor: selectedTheme.secondary_color,
              }}
            >
              Agregar Nota
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={saveBusinessSale}
              sx={{
                mt: 1,
                color: "#fff",
                backgroundColor: darken(selectedTheme.secondary_color, 0.2),
                "&:hover": {
                  backgroundColor: darken(selectedTheme.secondary_color, 0.1),
                },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Guardar Reporte
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {/* Resumen Financiero */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Box sx={headerStyle}>
                  <AttachMoneyIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Total General</Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: selectedTheme.secondary_color }}
                >
                  ${businessSale.total.toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Fondo: ${businessSale.found.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Deuda: ${getTotalDebts()}
                  </Typography>
                  <Typography variant="body2">
                    Efectivo en Caja: $
                    {(
                      businessSale.total -
                      businessSale.found -
                      getTotalDebts()
                    ).toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Métricas de Ventas */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Box sx={headerStyle}>
                  <TimelineIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Métricas</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Servicios Vendidos:{" "}
                    {businessSale.servicesSales.reduce(
                      (acc, sale) => acc + sale.quantity,
                      0
                    )}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Deudas Pendientes: {businessSale.debts.length}
                  </Typography>
                  <Typography variant="body2">
                    Pagos con Tarjeta: {cards.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Desglose de Pagos */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Box sx={headerStyle}>
                  <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Desglose de Pagos</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  {/* Efectivo */}
                  <Typography variant="body2" gutterBottom>
                    Efectivo
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={
                      ((businessSale.total - getTotalCards()) /
                        businessSale.total) *
                      100
                    }
                    sx={{
                      mb: 1,
                      backgroundColor: darken(
                        selectedTheme.background_color,
                        0.2
                      ),
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: selectedTheme.secondary_color,
                      },
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: selectedTheme.secondary_color }}
                  >
                    ${businessSale.total - getTotalCards()}
                  </Typography>

                  {/* Tarjetas */}
                  <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                    Tarjetas
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(getTotalCards() / businessSale.total) * 100}
                    sx={{
                      mb: 1,
                      backgroundColor: darken(
                        selectedTheme.background_color,
                        0.2
                      ),
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: selectedTheme.secondary_color,
                      },
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: selectedTheme.secondary_color }}
                  >
                    ${getTotalCards().toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Resumen de Servicios */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Box sx={headerStyle}>
                  <PointOfSaleIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Servicios</Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: selectedTheme.secondary_color }}
                >
                  ${getTotalServices().toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {businessSale.servicesSales.map((sale) => (
                    <Box key={sale.id} sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        {sale.service.name} x{sale.quantity}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: selectedTheme.secondary_color }}
                      >
                        ${(sale.quantity * sale.service.price).toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Deudas Detalladas */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Box sx={headerStyle}>
                  <AssignmentIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Deudas Registradas</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  {businessSale.debts.map((debt) => (
                    <Box
                      key={debt.id}
                      sx={{
                        mb: 2,
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: darken(
                          selectedTheme.background_color,
                          0.15
                        ),
                      }}
                    >
                      <Typography variant="subtitle1">{debt.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {debt.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <Typography variant="body2">
                          Total: ${debt.total.toLocaleString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: selectedTheme.secondary_color }}
                        >
                          Pagado: ${debt.paid.toLocaleString()}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(debt.paid / debt.total) * 100}
                        sx={{
                          mt: 1,
                          backgroundColor: darken(
                            selectedTheme.background_color,
                            0.2
                          ),
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: selectedTheme.secondary_color,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Máquinas y Personal */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Box sx={headerStyle}>
                  <ReceiptLongIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Máquinas y Personal</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Máquinas Registradas
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {business?.machines?.map((machine) => (
                      <Chip
                        key={machine.id}
                        label={machine.name}
                        sx={chipStyle}
                      />
                    ))}
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Personal Asignado
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {businessSale.workers.map((worker) => (
                      <Chip
                        key={worker.id}
                        label={worker.user.name}
                        sx={chipStyle}
                        avatar={
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              backgroundColor: "#fff",
                              color: selectedTheme.primary_color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <GroupIcon sx={{ fontSize: 16 }} />
                          </Box>
                        }
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Notas y Observaciones */}
          {businessSale.note && (
            <Grid size={12}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Box sx={headerStyle}>
                    <AssignmentIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">Notas y Observaciones</Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: darken(
                        selectedTheme.background_color,
                        0.15
                      ),
                    }}
                  >
                    {businessSale.note}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};
