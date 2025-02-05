import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";
import { BusinessFinalSaleModelResponse } from "../../../../../../core/models/api/businessFinalSale.model";
import { CardPayment } from "../../context/useBusinessReportContext";

interface Props {
  sale: BusinessFinalSaleModelResponse;
  cards?: CardPayment[];
  editable?: boolean;
  onAddNote?: () => void;
  onSave?: () => void;
  onDelete?: (sale: BusinessFinalSaleModelResponse) => void;
}

export const ViewFinalReport = ({
  sale,
  cards = [],
  editable = false,
  onAddNote,
  onSave,
  onDelete,
}: Props) => {
  const { selectedTheme } = useThemeContext();

  const getTotalDebts = () => {
    return sale.debts.reduce((acc, debt) => acc + debt.total, 0);
  };

  const getTotalCards = () => {
    return cards.reduce((acc, card) => acc + card.amount, 0);
  };

  const getTotalServices = () => {
    return sale.servicesSales.reduce(
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

  const creationButtons = () => (
    <>
      <Button
        variant="outlined"
        startIcon={<AssignmentIcon />}
        onClick={onAddNote}
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
        onClick={onSave}
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
    </>
  );

  const editionsButtons = () => (
    <>
      <Button variant="contained" startIcon={<EditIcon />} color="warning">
        Editar
      </Button>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={() => onDelete?.(sale)}
        color="error"
      >
        Eliminar
      </Button>
    </>
  );

  return (
    <Box
      sx={{
        backgroundColor: selectedTheme.background_color,
        color: selectedTheme.text_color,
        borderRadius: "8px",
        height: editable ? "100%" : "auto",
        overflow: editable ? "auto" : "hidden",
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
          {sale.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2 },
            flexWrap: "wrap",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {!editable ? creationButtons() : editionsButtons()}
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
                ${sale.total.toLocaleString()}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Fondo: ${sale.found.toLocaleString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Deuda: ${getTotalDebts().toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Efectivo en Caja: $
                  {(sale.total - sale.found - getTotalDebts()).toLocaleString()}
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
                  {sale.servicesSales.reduce(
                    (acc, sale) => acc + sale.quantity,
                    0
                  )}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Deudas Pendientes: {sale.debts.length}
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
                  value={((sale.total - getTotalCards()) / sale.total) * 100}
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
                  ${sale.total - getTotalCards()}
                </Typography>

                {/* Tarjetas */}
                <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                  Tarjetas
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(getTotalCards() / sale.total) * 100}
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
                {sale.servicesSales.map((sale) => (
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
                {sale.debts.map((debt) => (
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
                  {sale?.machines?.map((machine) => (
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
                  {sale.workers.map((worker) => (
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
        {sale.note && (
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
                  {sale.note}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
