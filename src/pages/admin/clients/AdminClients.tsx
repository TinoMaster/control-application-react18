import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ERole, UserModel } from "../../../core/models/api";
import { clientsService } from "../../../core/services/admin/clientsService";
import { formatDateToString } from "../../../core/utilities/helpers/dateFormat";
import InfoIcon from "@mui/icons-material/Info";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyle = {
  fontSize: {
    xs: "1.5rem", // Tamaño para pantallas pequeñas
    sm: "2rem", // Tamaño para pantallas medianas
  },
};

const tableCellsStyle = {
  fontSize: "0.8rem",
  whiteSpace: "nowrap",
};

const tableCellHeadersStyle = {
  fontSize: "0.8rem",
  whiteSpace: "nowrap",
  fontWeight: "bold",
};

const AdminClients = () => {
  const [loading, setLoading] = useState(false);
  /* const [openSnackbar, setOpenSnackbar] = useState(false); */
  const [clients, setClients] = useState<UserModel[]>([]);

  console.log(clients);

  const getClients = async () => {
    setLoading(true);
    const response = await clientsService.getClients();
    if (response.status === 200) {
      setClients(response.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <Modal sx={modalStyle} open={loading}>
        <>{loading && <CircularProgress color="warning" />}</>
      </Modal>
      {/* <Snackbar
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
      </Snackbar> */}
      <Box sx={{ padding: 3 }}>
        <Typography gutterBottom sx={titleStyle} variant="h4">
          Clientes
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ "& > *": { backgroundColor: "#efefef" } }}>
                <TableCell sx={tableCellHeadersStyle}>Nombre</TableCell>
                <TableCell sx={tableCellHeadersStyle}>Correo</TableCell>
                <TableCell sx={tableCellHeadersStyle}>Solicitud</TableCell>
                <TableCell sx={tableCellHeadersStyle}>Aceptada</TableCell>
                <TableCell sx={tableCellHeadersStyle}>Activo</TableCell>
                <TableCell sx={tableCellHeadersStyle}>C.ta Negocios</TableCell>
                <TableCell sx={tableCellHeadersStyle}>Role</TableCell>
                <TableCell sx={tableCellHeadersStyle}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients?.map((client) => (
                <TableRow key={client.id}>
                  <TableCell sx={tableCellsStyle}>{client.name}</TableCell>
                  <TableCell sx={tableCellsStyle}>{client.email}</TableCell>
                  <TableCell sx={tableCellsStyle}>
                    {formatDateToString(client.createdAt || new Date())}
                  </TableCell>
                  <TableCell sx={tableCellsStyle}>
                    {client.active ? formatDateToString(client.updatedAt || new Date()) : "-"}
                  </TableCell>
                  <TableCell sx={tableCellsStyle}>
                    {client.active ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell sx={tableCellsStyle}>
                    {client.role === ERole.OWNER? client.businessesOwned.length : client.businesses.length}
                  </TableCell>
                  <TableCell sx={tableCellsStyle}>{client.role}</TableCell>

                  <TableCell sx={tableCellsStyle}>
                    <Link to={`/clients/${client.id}`}>
                    <IconButton color="success" size="small">
                      <InfoIcon />
                    </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {clients?.length === 0 && (
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
export default AdminClients;
