import {
  Box,
  Button,
  darken,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

interface Props {
  openModal: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const ModalError = ({ openModal, onClose, title, message }: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Modal
      open={openModal}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: selectedTheme.background_color,
          p: 4,
          borderRadius: "12px",
          width: "450px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          border: `1px solid ${selectedTheme.secondary_color}20`,
        }}
      >
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            sx={{
              color: "error.main",
              bgcolor: `${"#f44336"}15`,
              "&:hover": {
                bgcolor: `${darken("#f44336", 0.2)}25`,
              },
            }}
          >
            <ReportGmailerrorredIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: selectedTheme.text_color,
              fontWeight: "600",
            }}
          >
            {title || "Error"}
          </Typography>
        </Box>

        <Typography
          sx={{
            color: selectedTheme.text_color,
            opacity: 0.9,
            mb: 3,
          }}
        >
          {message || "Ha ocurrido un error"}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: selectedTheme.secondary_color,
              color: "#fff",
              "&:hover": {
                bgcolor: darken(selectedTheme.secondary_color, 0.1),
              },
            }}
          >
            Entendido
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
