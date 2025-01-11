import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2 as Grid,
  Typography,
  darken,
  LinearProgress,
} from "@mui/material";
import { useBusinessReportContext } from "../../../context/useBusinessReportContext";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import { useBusinessContext } from "../../../../../../../core/context/use/useBusinessContext";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GroupIcon from "@mui/icons-material/Group";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TimelineIcon from "@mui/icons-material/Timeline";
import { formatDateToString } from "../../../../../../../core/utilities/helpers/dateFormat";

export const SaleReport = () => {
  const { businessSale, cards } = useBusinessReportContext();
  const { selectedTheme } = useThemeContext();
  const { business } = useBusinessContext();

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
    color: selectedTheme.primary_color,
    m: 0.5,
  };

  return (
    <Box
      sx={{
        backgroundColor: selectedTheme.background_color,
        color: selectedTheme.text_color,
        p: 2,
      }}
    >
      {/* Encabezado del Reporte */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Reporte de Ventas
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {formatDateToString(new Date())}
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      <Grid container spacing={3}>
        {/* Resumen Financiero */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={headerStyle}>
                <AttachMoneyIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Total General</Typography>
              </Box>
              <Typography variant="h4" sx={{ color: selectedTheme.secondary_color }}>
                ${businessSale.total.toLocaleString()}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Fondo: ${businessSale.found.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Ganancia Neta: ${(businessSale.total - businessSale.found).toLocaleString()}
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
                  Servicios Vendidos: {businessSale.servicesSales.reduce((acc, sale) => acc + sale.quantity, 0)}
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
                  value={(businessSale.paid / businessSale.total) * 100}
                  sx={{
                    mb: 1,
                    backgroundColor: darken(selectedTheme.background_color, 0.2),
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: selectedTheme.secondary_color,
                    },
                  }}
                />
                <Typography variant="h6" sx={{ color: selectedTheme.secondary_color }}>
                  ${businessSale.paid.toLocaleString()}
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
                    backgroundColor: darken(selectedTheme.background_color, 0.2),
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: selectedTheme.secondary_color,
                    },
                  }}
                />
                <Typography variant="h6" sx={{ color: selectedTheme.secondary_color }}>
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
              <Typography variant="h4" sx={{ color: selectedTheme.secondary_color }}>
                ${getTotalServices().toLocaleString()}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {businessSale.servicesSales.map((sale) => (
                  <Box key={sale.id} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      {sale.service.name} x{sale.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ color: selectedTheme.secondary_color }}>
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
                      backgroundColor: darken(selectedTheme.background_color, 0.15),
                    }}
                  >
                    <Typography variant="subtitle1">{debt.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {debt.description}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
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
                        backgroundColor: darken(selectedTheme.background_color, 0.2),
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
                  {business.machines
                    ?.filter((machine) => businessSale.machines.includes(machine.id!))
                    .map((machine) => (
                      <Chip key={machine.id} label={machine.name} sx={chipStyle} />
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
                            backgroundColor: selectedTheme.primary_color,
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
                    backgroundColor: darken(selectedTheme.background_color, 0.15),
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
  );
};
