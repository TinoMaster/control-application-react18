import { useCallback, useState } from "react";
import { useBoolean } from "./useBoolean";

interface UseStatusReturn {
  loading: boolean;
  error: boolean;
  success: boolean;
  errorMessage: string;
  successMessage: string;
  setLoading: () => void;
  setError: (message: string) => void;
  setSuccess: (message: string) => void;
  reset: () => void;
}

export const useStatus = (): UseStatusReturn => {
  // Stato di loading gestito con useBoolean
  const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] =
    useBoolean(false);
  // Stato di error gestito con useBoolean
  const [error, { setTrue: setErrorTrue, setFalse: setErrorFalse }] =
    useBoolean(false);
  // Stato di success gestito con useBoolean
  const [success, { setTrue: setSuccessTrue, setFalse: setSuccessFalse }] =
    useBoolean(false);

  // Stati per i messaggi di error e success
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Imposta lo stato di loading e resetta gli altri stati
  const setLoading = useCallback(() => {
    setLoadingTrue();
    setErrorFalse();
    setSuccessFalse();
    setErrorMessage("");
    setSuccessMessage("");
  }, [setLoadingTrue, setErrorFalse, setSuccessFalse]);

  // Imposta lo stato di error con un messaggio
  const setError = useCallback(
    (message: string) => {
      setLoadingFalse(); // di solito, quando si verifica un errore, non siamo in loading
      setSuccessFalse();
      setErrorMessage(message);
      setErrorTrue();
    },
    [setLoadingFalse, setSuccessFalse, setErrorTrue]
  );

  // Imposta lo stato di success con un messaggio
  const setSuccess = useCallback(
    (message: string) => {
      setLoadingFalse();
      setErrorFalse();
      setSuccessTrue();
      setSuccessMessage(message);
    },
    [setLoadingFalse, setErrorFalse, setSuccessTrue]
  );

  // Funzione per resettare tutti gli stati e i messaggi
  const reset = useCallback(() => {
    setLoadingFalse();
    setErrorFalse();
    setSuccessFalse();
    setErrorMessage("");
    setSuccessMessage("");
  }, [setLoadingFalse, setErrorFalse, setSuccessFalse]);

  return {
    loading,
    error,
    success,
    errorMessage,
    successMessage,
    setLoading,
    setError,
    setSuccess,
    reset,
  };
};
