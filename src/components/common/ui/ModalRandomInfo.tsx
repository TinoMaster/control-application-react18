import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  IconButton,
  lighten,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

export const ModalRandomInfo = ({
  open,
  info,
  onClose,
}: {
  open: boolean;
  info: string;
  onClose: () => void;
}) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-random-info"
      aria-describedby="modal-random-information"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: selectedTheme.background_color,
          color: selectedTheme.text_color,
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          p: 3,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: selectedTheme.text_color,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <InfoIcon
              color="info"
              sx={{
                fontSize: 28,
                color: selectedTheme.primary_color,
              }}
            />
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              Información
            </Typography>
          </Stack>

          <Typography sx={{ mt: 1, fontSize: "1rem", lineHeight: 1.6 }}>
            {info}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                textTransform: "none",
                px: 4,
                borderRadius: 2,
                backgroundColor: selectedTheme.primary_color,
                color: selectedTheme.text_color,
                "&:hover": {
                  backgroundColor: lighten(selectedTheme.primary_color, 0.1),
                },
              }}
            >
              Aceptar
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
