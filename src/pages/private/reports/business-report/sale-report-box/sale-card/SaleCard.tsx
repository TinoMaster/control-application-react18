import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  lighten,
  Stack,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";
import { BusinessFinalSaleModelResponse } from "../../../../../../core/models/api/businessFinalSale.model";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import GroupIcon from "@mui/icons-material/Group";
import BuildIcon from "@mui/icons-material/Build";
import { formatDateToString } from "../../../../../../core/utilities/helpers/dateFormat";
import { formatCurrency } from "../../../../../../core/utilities/helpers/formatCurrency";

interface Props {
  sale: BusinessFinalSaleModelResponse;
}

export const SaleCard = ({ sale }: Props) => {
  const { selectedTheme } = useThemeContext();

  const hasDebts = sale.debts && sale.debts.length > 0;
  const pendingAmount = sale.total - sale.paid;

  return (
    <Card
      sx={{
        width: "100%",
        margin: "0 auto",
        maxWidth: { xs: "100%", sm: "400px" },
        borderColor: selectedTheme.secondary_color,
        backgroundColor: selectedTheme.background_color,
        color: selectedTheme.text_color,
        borderRadius: "8px",
        boxShadow: `0 0 70px 10px ${selectedTheme.secondary_color}15 , 0 0 5px 2px #00000015`,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Title and Date */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="div" fontWeight="bold">
              {sale.name}
            </Typography>
            <Typography variant="caption" sx={{ color: lighten(selectedTheme.text_color, 0.5) }}>
              {formatDateToString(sale.createdAt as Date)}
            </Typography>
          </Stack>

          <Divider />

          {/* Financial Information */}
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccountBalanceWalletIcon fontSize="small" />
                <Typography variant="body2">Total:</Typography>
              </Stack>
              <Typography variant="subtitle1" fontWeight="bold">
                {formatCurrency(sale.total)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PointOfSaleIcon fontSize="small" />
                <Typography variant="body2">Pagado:</Typography>
              </Stack>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={hasDebts ? "error.main" : "success.main"}
              >
                {formatCurrency(sale.paid)}
              </Typography>
            </Grid>
          </Grid>

          {/* Pending Amount if exists */}
          {pendingAmount > 0 && (
            <Stack direction="row" spacing={1} alignItems="center">
              <MoneyOffIcon color="error" fontSize="small" />
              <Typography variant="body2" color="error.main">
                Pendiente: {formatCurrency(pendingAmount)}
              </Typography>
            </Stack>
          )}

          <Divider />

          {/* Workers and Machines */}
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <GroupIcon fontSize="small" />
              <Typography variant="body2">
                Trabajadores ({sale.workers.length}):
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {sale.workers.map((worker) => (
                <Chip
                  key={worker.id}
                  label={worker.user.name}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 0.5 }}
                />
              ))}
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <BuildIcon fontSize="small" />
              <Typography variant="body2">
                Máquinas ({sale.machines.length}):
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {sale.machines.map((machine) => (
                <Chip
                  key={machine.id}
                  label={machine.name}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 0.5 }}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Ver detalles
        </Button>
      </CardActions>
    </Card>
  );
};
