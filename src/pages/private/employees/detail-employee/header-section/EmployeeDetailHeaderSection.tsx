import { Box, Button, Typography } from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useCallback, useEffect, useState } from "react";
import { businessFinalSaleService } from "../../../../../core/services/businessFinalSaleService";

interface Props {
  businessId: number;
  onDeleteEmployee: () => void;
}
export const EmployeeDetailHeaderSection = ({
  businessId,
  onDeleteEmployee,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  const [existInBusinessFinalSale, setExistInBusinessFinalSale] =
    useState(true);

  const existInBusinessFinalSaleHandler = useCallback(async () => {
    const response =
      await businessFinalSaleService.existEmployeeInAnyBusinessFinalSale(
        businessId
      );
    if (response.status === 200 && response.data) {
      setExistInBusinessFinalSale(response.data);
    } else {
      setExistInBusinessFinalSale(true);
    }
  }, [businessId]);

  useEffect(() => {
    existInBusinessFinalSaleHandler();
  }, [existInBusinessFinalSaleHandler]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: selectedTheme.text_color,
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.2rem" }}>
        Empleado
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={onDeleteEmployee}
          variant="contained"
          color="warning"
          size="small"
        >
          Editar
        </Button>
        <Button
          onClick={onDeleteEmployee}
          disabled={!existInBusinessFinalSale}
          variant="contained"
          color="error"
          size="small"
        >
          Elimina
        </Button>
      </Box>
    </Box>
  );
};
