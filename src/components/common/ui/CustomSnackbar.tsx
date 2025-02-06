import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  successMessage?: string;
  errorMessage?: string;
}

export const CustomSnackbar = ({ successMessage, errorMessage }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      setOpen(true);
    }
  }, [successMessage, errorMessage]);

  const message = successMessage || errorMessage;
  const severity = successMessage ? "success" : "error";

  return message ? (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  ) : null;
};
