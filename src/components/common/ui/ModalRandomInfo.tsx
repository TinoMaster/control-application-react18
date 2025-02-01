import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../../core/context/use/useThemeContext";
import { useTableStyles } from "../../../core/styles/useTableStyles";

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
  const { modalBlurStyle, modalBoxStyle, buttonStyle } = useTableStyles();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-random-info"
      aria-describedby="modal-random-information"
      sx={modalBlurStyle}
    >
      <Box
        sx={{
          ...modalBoxStyle,
          width: { xs: "90%", sm: 400 },
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
              sx={{
                fontSize: 28,
                color: selectedTheme.secondary_color,
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
            <Button variant="contained" onClick={onClose} sx={buttonStyle}>
              Aceptar
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
