import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid2 as Grid,
  IconButton,
  darken,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import CustomInput from "../../../../../../../components/common/ui/CustomInput";
import {
  CardPayment,
  useBusinessReportContext,
} from "../../../context/useBusinessReportContext";
import { Delete } from "@mui/icons-material";

export const SaleCards = () => {
  const { selectedTheme } = useThemeContext();
  const { nextSection, cards, setCards, prevSection } =
    useBusinessReportContext();
  const [cardPayments, setCardPayments] = useState<CardPayment[]>(cards);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleAddCardPayment = () => {
    if (newCardNumber && newAmount) {
      const newCardPayment: CardPayment = {
        id: crypto.randomUUID(),
        cardNumber: newCardNumber,
        amount: parseFloat(newAmount),
      };
      setCardPayments([...cardPayments, newCardPayment]);
      // Reset form
      setNewCardNumber("");
      setNewAmount("");
    }
  };

  const handleRemoveCardPayment = (id: number | string) => {
    setCardPayments(cardPayments.filter((payment) => payment.id !== id));
  };

  const handleSaveCardPayments = () => {
    const newCards = [...cards, ...cardPayments];
    setCards(newCards);
  };

  const handleNextSection = () => {
    handleSaveCardPayments();
    nextSection();
  };

  const totalCardPayments = cardPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4, lg: 3 }}>
          <CustomInput
            name="cardNumber"
            label="Número de Tarjeta"
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            value={newCardNumber}
            onChange={(e) => setNewCardNumber(e.target.value)}
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
            onClick={handleAddCardPayment}
            disabled={!newCardNumber || !newAmount}
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
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: darken(selectedTheme.secondary_color, 0.3),
              }}
            >
              <TableCell sx={{ color: "#fff" }}>Número de Tarjeta</TableCell>
              <TableCell sx={{ color: "#fff" }}>Monto</TableCell>
              <TableCell sx={{ color: "#fff" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell
                  sx={{ color: darken(selectedTheme.text_color, 0.2) }}
                >
                  {payment.cardNumber}
                </TableCell>
                <TableCell
                  sx={{ color: darken(selectedTheme.text_color, 0.2) }}
                >
                  ${payment.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveCardPayment(payment.id)}
                    sx={{
                      color: selectedTheme.text_color,
                      "&:hover": {
                        backgroundColor: darken(
                          selectedTheme.background_color,
                          0.2
                        ),
                        color: "#fff",
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                "& td": {
                  fontWeight: "bold",
                  color: selectedTheme.text_color,
                },
              }}
            >
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>${totalCardPayments.toFixed(2)}</TableCell>
            </TableRow>
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
          onClick={handleNextSection}
          size="small"
          sx={{
            backgroundColor: darken(selectedTheme.secondary_color, 0.3),
            color: selectedTheme.text_color,
            "&:hover": {
              backgroundColor: darken(selectedTheme.secondary_color, 0.2),
            },
          }}
        >
          {cardPayments.length > 0 ? "Siguiente" : "Omitir"}
        </Button>
      </Box>
    </Box>
  );
};
