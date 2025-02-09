import { Box, Typography } from "@mui/material";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { useEmployees } from "../../../../core/hooks/useEmployees";
import { CardEmployee } from "../card-employee/CardEmployee";
import { LoadingCards } from "../../../../components/common/ui/loaders/loadingCards";

const EmployeesList = () => {
  const { selectedTheme } = useThemeContext();
  const { employees, loadingEmployees } = useEmployees();

  if (loadingEmployees) {
    return <LoadingCards count={3} contentRows={4} />;
  }

  if (employees.length > 0) {
    return (
      <Box
        sx={{
          padding: {xs: "16px 0", sm: "16px 20px"},
          display: "flex",
          flexWrap: "wrap",
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
