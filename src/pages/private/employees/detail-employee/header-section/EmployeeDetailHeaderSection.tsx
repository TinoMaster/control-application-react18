import { Box, Button, Typography } from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useCallback, useEffect, useState } from "react";
import { businessFinalSaleService } from "../../../../../core/services/businessFinalSaleService";
import { ModalEditEmployee } from "../modal-edit-employee/ModalEditEmployee";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";

interface Props {
  employee: EmployeeModel;
  updateEmployee: (employee: EmployeeModel) => void;
  onDeleteEmployee: () => void;
}
export const EmployeeDetailHeaderSection = ({
  employee,
  updateEmployee,
  onDeleteEmployee,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  const [existInBusinessFinalSale, setExistInBusinessFinalSale] =
    useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);

  const onEditEmployee = () => {
    setOpenEditModal(true);
  };

  const existInBusinessFinalSaleHandler = useCallback(async () => {
    if (!employee?.id) return;
    const response =
      await businessFinalSaleService.existEmployeeInAnyBusinessFinalSale(
        employee.id
      );
    if (response.status === 200 && response.data) {
      setExistInBusinessFinalSale(response.data);
    } else {
      setExistInBusinessFinalSale(true);
    }
  }, [employee]);

  useEffect(() => {
    existInBusinessFinalSaleHandler();
  }, [existInBusinessFinalSaleHandler]);

  return (
    <>
      <ModalEditEmployee
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        employee={employee}
        updateEmployee={updateEmployee}
      />
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
            onClick={onEditEmployee}
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
    </>
  );
};
