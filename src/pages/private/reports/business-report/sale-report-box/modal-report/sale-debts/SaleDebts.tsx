import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  darken,
  Grid2 as Grid,
} from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import CustomInput from "../../../../../../../components/common/ui/CustomInput";
import { useBusinessReportContext } from "../../../context/useBusinessReportContext";

interface Debt {
  id: number;
  debtor: string;
  amount: number;
}
/* TODO: Add a form to add debts */
export const SaleDebts = () => {
  const { selectedTheme } = useThemeContext();
  const { nextSection, businessSale, setBusinessSale, prevSection } =
    useBusinessReportContext();
  const [debts, setDebts] = useState<Debt[]>([]);
  const [newDebtor, setNewDebtor] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleAddDebt = () => {
    if (newDebtor && newAmount) {
      const newDebt: Debt = {
        id: Date.now(),
        debtor: newDebtor,
        amount: parseFloat(newAmount),
      };
      setDebts([...debts, newDebt]);
      // Reset form
      setNewDebtor("");
      setNewAmount("");
    }
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4, lg: 3 }}>
          <CustomInput
            name="debtor"
            label="Deudor"
            type="text"
            placeholder="Nombre"
            value={newDebtor}
            onChange={(e) => setNewDebtor(e.target.value)}
            error={false}
            helperText={""}
            small
          />
        </Grid>

        <Grid size={{ xs: 6, md: 4, lg: 3 }}>
          <CustomInput
            name="amount"
            label="Monto"
            type="number"
            placeholder="Monto"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            error={false}
            helperText={""}
            startAdornment="$"
            small
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Button
            variant="contained"
            onClick={handleAddDebt}
            disabled={!newDebtor || !newAmount}
            size="small"
            sx={{
              width: "100%",
              padding: "8px 16px",
              backgroundColor: darken(selectedTheme.secondary_color, 0.3),
              color: selectedTheme.text_color,
              "&:hover": {
                backgroundColor: darken(selectedTheme.secondary_color, 0.2),
              },
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

      <TableContainer
        sx={{
          backgroundColor: selectedTheme.background_color,
          boxShadow: `0 0 5px 2px #00000030`,
          borderRadius: "8px",
          "& .MuiTableCell-root": {
            borderBottom: "none",
          },
        }}
      >
        <Table size="small" aria-label="tabla de deudas">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: darken(selectedTheme.secondary_color, 0.4),
              }}
            >
              <TableCell sx={{ color: selectedTheme.text_color }}>
                Deudor
              </TableCell>
              <TableCell align="right" sx={{ color: selectedTheme.text_color }}>
                Monto
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {debts.map((debt) => (
              <TableRow key={debt.id}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: darken(selectedTheme.text_color, 0.2) }}
                >
                  {debt.debtor}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: darken(selectedTheme.text_color, 0.2) }}
                >
                  ${debt.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {debts.length > 0 && (
              <TableRow
                sx={{
                  "& td": {
                    fontWeight: "bold",
                    color: selectedTheme.text_color,
                  },
                }}
              >
                <TableCell>Total</TableCell>
                <TableCell align="right">${totalDebt.toFixed(2)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={prevSection}
          size="small"
          sx={{
            backgroundColor: darken(selectedTheme.secondary_color, 0.3),
            color: selectedTheme.text_color,
            "&:hover": {
              backgroundColor: darken(selectedTheme.secondary_color, 0.2),
            },
          }}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          onClick={nextSection}
          size="small"
          sx={{
            backgroundColor: darken(selectedTheme.secondary_color, 0.3),
            color: selectedTheme.text_color,
            "&:hover": {
              backgroundColor: darken(selectedTheme.secondary_color, 0.2),
            },
          }}
        >
          {debts.length > 0 ? "Siguiente" : "Omitir"}
        </Button>
      </Box>
    </Box>
  );
};
