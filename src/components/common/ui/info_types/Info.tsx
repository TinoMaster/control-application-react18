import InfoIcon from "@mui/icons-material/Info";
import { Stack, Typography } from "@mui/material";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";

export const InfoMessage = ({ message }: { message: string }) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <InfoIcon
          sx={{
            fontSize: 28,
            color: selectedTheme.text_color,
          }}
        />
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          Información
        </Typography>
      </Stack>

      <Typography
        variant="body2"
        sx={{ mt: 1, fontSize: "0.9rem", lineHeight: 1.6, pl: 1 }}
      >
        {message}
      </Typography>
    </Stack>
  );
};
