import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import { MobileView } from "./components/MobileView";
import { DesktopView } from "./components/DesktopView";

interface Props {
  employee: EmployeeModel;
  onDeleteBusiness?: (businessId: string) => void;
}

export const EmployeeDetailAssociatedBusinesses = ({
  employee,
  onDeleteBusiness,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const canDelete = employee?.user.businesses.length > 1;

  return (
    <>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Negocios Asociados
      </Typography>
      {isMobile ? (
        <MobileView
          employee={employee}
          onDeleteBusiness={onDeleteBusiness}
          canDelete={canDelete}
        />
      ) : (
        <DesktopView
          employee={employee}
          onDeleteBusiness={onDeleteBusiness}
          canDelete={canDelete}
        />
      )}
    </>
  );
};
