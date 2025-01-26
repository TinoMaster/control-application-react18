import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

interface ModalConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title?: string;
}

export const ModalConfirm = ({
  open,
  onClose,
  onConfirm,
  message,
  title = "Confermare l'azione",
}: ModalConfirmProps) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-confirm-title"
      aria-describedby="modal-confirm-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: selectedTheme.background_color,
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-confirm-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>

        <Typography id="modal-confirm-description" sx={{ mb: 3 }}>
          {message}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            sx={{ backgroundColor: selectedTheme.primary_color }}
          >
            Confirmar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
