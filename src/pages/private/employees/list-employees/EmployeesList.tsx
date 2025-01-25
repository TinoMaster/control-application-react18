import { useCallback, useEffect, useState } from "react";
import { CardEmployee } from "../card-employee/CardEmployee";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { employeeService } from "../../../../core/services/employeeService";
import { Box, Skeleton, Typography } from "@mui/material";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";

const EmployeesList = () => {
  const { selectedTheme } = useThemeContext();
  const { business } = useBusinessContext();
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);

  const [loading, setLoading] = useState(false);

  const getEmployees = useCallback(async () => {
    if (!business.id) {
      return;
    }
    setLoading(true);
    const response = await employeeService.getEmployeesByBusinessId(
      business.id
    );
    if (response.status === 200) {
      setEmployees(response.data || []);
    }
    setLoading(false);
  }, [business.id]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  if (loading) {
    return (
      <Box
        sx={{
          padding: "16px 0",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={300}
            width={500}
            sx={{ width: "100%", margin: "auto", borderRadius: "8px" }}
          />
        ))}
      </Box>
    );
  }

  if (employees.length > 0) {
    return (
      <Box
        sx={{
          padding: "16px 0",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        {employees.map((e) => (
          <CardEmployee key={e.id} employee={e} />
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "16px 0",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography
        sx={{
          color: selectedTheme.text_color,
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        Este negocio no tiene empleados
      </Typography>
    </Box>
  );
};
export default EmployeesList;
