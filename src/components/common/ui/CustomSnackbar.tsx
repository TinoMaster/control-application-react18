import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  success: boolean;
  error: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const CustomSnackbar = ({
  success,
  error,
  successMessage,
  errorMessage,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (success || error) {
      setOpen(true);
    }
  }, [success, error]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        severity={success ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {success ? successMessage : error ? errorMessage : ""}
      </Alert>
    </Snackbar>
  );
};
