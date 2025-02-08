import React, { createContext, useContext, useState } from "react";
import { CustomSnackbar } from "../../components/common/ui/CustomSnackbar";

interface NotificationContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    // Limpiar el mensaje después de 6 segundos (mismo tiempo que el autoHideDuration del Snackbar)
    setTimeout(() => setSuccessMessage(""), 6000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 6000);
  };

  // TODO: Agregar este context y dividirlo como los otros
  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      {children}
      <CustomSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
