import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { authRequestsService } from "../../../core/services/admin/authRequests";
import { useSuperAdminContext } from "../../../core/context/use/useSuperAdminContext";
import { formatDateToString } from "../../../core/utilities/helpers/dateFormat";
import AddTaskIcon from "@mui/icons-material/AddTask";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const AuthRequests = () => {
  const { deleteAuthRequestById, authRequests } = useSuperAdminContext();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [authorizeSuccess, setAuthorizeSuccess] = useState(false);

  const onPermit = async (id: number) => {
    setAuthorizeSuccess(false);
    setLoading(true);

    const response = await authRequestsService.acceptRequest(id);

    setOpenSnackbar(true);
    setLoading(false);

    if (response.status === 200) {
      setAuthorizeSuccess(true);
      deleteAuthRequestById(id);
    } else {
      setAuthorizeSuccess(false);
    }
  };

  const onDeny = async (id: number) => {
    setAuthorizeSuccess(false);
    setLoading(true);

    const response = await authRequestsService.rejectRequest(id);

    setOpenSnackbar(true);
    setLoading(false);

    if (response.status === 200) {
      setAuthorizeSuccess(true);
      deleteAuthRequestById(id);
    } else {
      setAuthorizeSuccess(false);
    }
  };

  return (
    <>
      <Modal sx={modalStyle} open={loading}>
        <>{loading && <CircularProgress color="warning" />}</>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Stabilimento cancellato con successo"
        autoHideDuration={4000}
      >
        <Alert
          severity={authorizeSuccess ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {authorizeSuccess
            ? "Utente autorizzato con successo"
            : "Errore nell'autorizzazione dell'utente"}
        </Alert>
      </Snackbar>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Gestire le richieste di autorizzazione
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ "& > *": { backgroundColor: "#efefef" } }}>
                <TableCell>Nombre Cliente</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Solicitud</TableCell>
                <TableCell>Negocio</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authRequests?.map((request) => (
                <TableRow key={request.userId}>
                  <TableCell>{request.user_name}</TableCell>
                  <TableCell>{request.user_email}</TableCell>
                  <TableCell>
                    {formatDateToString(request.user_data_request)}
                  </TableCell>
                  <TableCell>{request.business_name}</TableCell>
                  <TableCell>{request.business_phone}</TableCell>
                  <TableCell>{request.business_address}</TableCell>
                  <TableCell sx={{ display: "flex", gap: 2 }}>
                    <IconButton
                      onClick={() => onPermit(request.userId)}
                      color="success"
                      size="small"
                    >
                      <AddTaskIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onDeny(request.userId)}
                      color="error"
                      size="small"
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {authRequests?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No hay solicitudes disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AuthRequests;
