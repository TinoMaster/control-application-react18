import { Box, Button, darken } from "@mui/material";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { useThemeContext } from "../../../../../../../../../core/context/use/useThemeContext";
import {
  BusinessModel,
  TRole,
} from "../../../../../../../../../core/models/api";
import { BusinessFinalSaleModel } from "../../../../../../../../../core/models/api/businessFinalSale.model";
import { EmployeeModel } from "../../../../../../../../../core/models/api/employee.model";
import { ERegisterType, TSaleResume } from "../../zod/saleResume.zodSchema";
import { SectionInputs } from "./SectionInputs";
import { SectionWorkers } from "./SectionWorkers";

interface Props {
  control: Control<TSaleResume>;
  errors: FieldErrors<TSaleResume>;
  handleSubmit: UseFormHandleSubmit<TSaleResume>;
  onSubmit: (data: TSaleResume) => void;
  registerTypeWatch: ERegisterType;
  role: TRole;
  dispatch: React.Dispatch<any>;
  business: BusinessModel;
  machinesAlreadySelected: () => (number | undefined)[];
  employees: EmployeeModel[];
  businessSale: BusinessFinalSaleModel;
  handleSelectEmployee: (employeeId: string) => void;
  loading: boolean;
}

export const FormSaleResume = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  registerTypeWatch,
  role,
  dispatch,
  business,
  machinesAlreadySelected,
  employees,
  businessSale,
  handleSelectEmployee,
  loading,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionInputs
        control={control}
        errors={errors}
        registerTypeWatch={registerTypeWatch}
        role={role}
        dispatch={dispatch}
        business={business}
        machinesAlreadySelected={machinesAlreadySelected}
      />

      <SectionWorkers
        errors={errors}
        employees={employees}
        businessSale={businessSale}
        handleSelectEmployee={handleSelectEmployee}
      />

      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          size="small"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: darken(selectedTheme.secondary_color, 0.3),
          }}
        >
          {loading ? "Procesando..." : "Procesar"}
        </Button>
      </Box>
    </form>
  );
};
