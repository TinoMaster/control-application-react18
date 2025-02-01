import { Box, Button, Typography } from "@mui/material";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

type ButtonConfig = {
  label: string;
  onClick: () => void;
  variant?: "text" | "outlined" | "contained"; // Opcional
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning"; // Opcional
  size?: "small" | "medium" | "large"; // Opcional
};

export const TitleBarAndButtons = ({
  title,
  buttons,
}: {
  title: string;
  buttons?: ButtonConfig[];
}) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        bgcolor: selectedTheme.primary_color,
        color: selectedTheme.text_color,
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ fontSize: "1.2rem" }}
      >
        {title}
      </Typography>
      <Box>
        {buttons?.map((button) => (
          <Button
            key={button.label}
            onClick={button.onClick}
            variant={button.variant || "contained"}
            color={button.color || "primary"}
            size={button.size || "small"}
            sx={{ ml: 1 }} // Espaciado entre botones
          >
            {button.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
