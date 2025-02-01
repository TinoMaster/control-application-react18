import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Modal } from "@mui/material";
import { useThemeContext } from "../../../core/context/use/useThemeContext";
import { useTableStyles } from "../../../core/styles/useTableStyles";
import { ErrorMessage } from "./info_types/Error";
import { InfoMessage } from "./info_types/info";
import { WarningMessage } from "./info_types/Warning";

type MessageType = "info" | "warning" | "error";

export const ModalRandomInfo = ({
  open,
  info,
  onClose,
  messageType = "info",
}: {
  open: boolean;
  info: string;
  messageType?: MessageType;
  onClose: () => void;
}) => {
  const { selectedTheme } = useThemeContext();
  const { modalBlurStyle, modalBoxStyle, buttonStyle } = useTableStyles();

  const getMessageType = () =>
    ({
      info: <InfoMessage message={info} />,
      warning: <WarningMessage message={info} />,
      error: <ErrorMessage message={info} />,
    }[messageType]);

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

        {getMessageType()}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={onClose} sx={buttonStyle}>
            Aceptar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
