import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clientsService } from "../../../../core/services/admin/clientsService";
import { BusinessModel, ERole, UserModel } from "../../../../core/models/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { formatDateToString } from "../../../../core/utilities/helpers/dateFormat";

const Client = () => {
  const { id } = useParams();
  const [client, setClient] = useState<UserModel | undefined>(undefined);
  const [businessesToRender, setBusinessesToRender] = useState<BusinessModel[]>(
    []
  );

  const getClient = useCallback(async () => {
    const response = await clientsService.getClientById(id || "");
    if (response.status === 200) {
      setClient(response.data);
      if (response.data?.role === ERole.OWNER) {
        setBusinessesToRender(response.data?.businessesOwned);
      } else {
        setBusinessesToRender(response.data?.businesses || []);
      }
    }
  }, [id]);

  useEffect(() => {
    setTimeout(() => getClient(), 500);
  }, [id, getClient]);

  if (!client)
    return (
      <Skeleton
        variant="rectangular"
        height={500}
        width={1200}
        sx={{ margin: "auto", borderRadius: "8px" }}
      />
    );

  return (
    <Card
      sx={{
        margin: "auto",
        boxShadow: 3,
        p: 3,
        bgcolor: "white",
        maxWidth: "1200px",
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: "#EFEFEF",
          color: "text.primary",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.2rem" }}>
          {client?.name}
        </Typography>
        <Box>
          {client?.role !== ERole.SUPERADMIN && (
            <Button variant="contained" color="error" size="small">
              Elimina
            </Button>
          )}
        </Box>
      </Box>

      {/* Contenido de la tarjeta */}
      <CardContent>
        <Grid container spacing={2} sx={{ py: 2 }}>
          {/* Información básica */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: "bold" }}>Nombre: </span>
              </Box>
              <span>{client?.name}</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: "bold" }}>Email: </span>
              </Box>
              <span>{client?.email}</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: "bold" }}>Role: </span>
              </Box>
              <Typography sx={{ fontSize: "0.9rem" }}>
                {client?.role}
              </Typography>
            </Typography>
          </Grid>
          {/* Otros detalles */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <span style={{ fontWeight: "bold" }}>Activo: </span>
              <span>
                {client?.active ? (
                  <CheckIcon color="success" />
                ) : (
                  <CloseIcon color="error" />
                )}
              </span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <span style={{ fontWeight: "bold" }}>Creado: </span>
              <span>{formatDateToString(client?.createdAt || new Date())}</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <span style={{ fontWeight: "bold" }}>Modificado: </span>
              <span>{formatDateToString(client?.updatedAt || new Date())}</span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      {/* Services list */}
      <Typography variant="h6" fontWeight="bold">
        Negocios Asociados
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  "& > *": { backgroundColor: "#efefef", fontSize: "12px" },
                }}
              >
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Municipio</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Creado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businessesToRender.map((business, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: "12px" }}>
                    {business.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>
                    {`${business.address.street}, #${business.address.number}, ${business.address.municipality}, ${business.address.city}`}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>
                    {business.address.municipality}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>
                    {business.phone}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>
                    {formatDateToString(business.createdAt || new Date())}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Información adicional */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "end",
          alignItems: "center",
          p: 2,
          bgcolor: "grey.100",
          borderRadius: "8px",
          mt: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          <strong>Role:</strong> {client?.role}
        </Typography>
      </Box>
    </Card>
  );
};
export default Client;
