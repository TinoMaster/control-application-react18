import { Box, Button, Typography } from "@mui/material";

interface Props {
  onDeleteEmployee: () => void;
}
export const EmployeeDetailHeaderSection = ({ onDeleteEmployee }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        bgcolor: "#ffffff",
        color: "text.primary",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.2rem" }}>
        Empleado
      </Typography>
      <Box>
        <Button
          onClick={onDeleteEmployee}
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
