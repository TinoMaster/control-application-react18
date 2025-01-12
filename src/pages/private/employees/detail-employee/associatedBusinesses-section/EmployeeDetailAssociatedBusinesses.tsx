import {
  Box,
  Card,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { formatDateToString } from "../../../../../core/utilities/helpers/dateFormat";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import DeleteIcon from "@mui/icons-material/Delete";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";

interface Props {
  employee: EmployeeModel;
  onDeleteBusiness?: (businessId: string) => void;
}

export const EmployeeDetailAssociatedBusinesses = ({
  employee,
  onDeleteBusiness,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { selectedTheme } = useThemeContext();
  const canDelete = employee?.user.businesses.length > 1;

  const DeleteButton = ({ businessId }: { businessId: string }) => (
    <IconButton
      onClick={() => onDeleteBusiness?.(businessId)}
      disabled={!canDelete}
      sx={{
        color: canDelete ? "error.main" : "text.disabled",
        "&:hover": {
          color: canDelete ? "error.dark" : "text.disabled",
        },
      }}
    >
      <DeleteIcon />
    </IconButton>
  );

  const MobileView = () => (
    <Stack spacing={2}>
      {employee?.user.businesses.map((business, index) => (
        <Card
          key={index}
          sx={{
            p: 2,
            backgroundColor: selectedTheme.background_color,
            boxShadow: `0 0 15px 2px ${selectedTheme.secondary_color}15 , 0 0 5px 2px #00000015`,
            color: selectedTheme.text_color,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              {business.name}
            </Typography>
            <DeleteButton businessId={business.id?.toString() || ""} />
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Dirección
            </Typography>
            <Typography variant="body2">
              {`${business.address.street}, #${business.address.number}, ${business.address.municipality}, ${business.address.city}`}
            </Typography>
          </Box>
        </Card>
      ))}
    </Stack>
  );

  const DesktopView = () => (
    <Paper sx={{ mt: 2, borderRadius: "8px", overflow: "hidden" }}>
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
              <TableCell>Teléfono</TableCell>
              <TableCell>Creado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee?.user.businesses.map((business, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: "12px" }}>{business.name}</TableCell>
                <TableCell sx={{ fontSize: "12px" }}>
                  {`${business.address.street}, #${business.address.number}, ${business.address.municipality}, ${business.address.city}`}
                </TableCell>
                <TableCell sx={{ fontSize: "12px" }}>
                  {business.phone}
                </TableCell>
                <TableCell sx={{ fontSize: "12px" }}>
                  {formatDateToString(business.createdAt || new Date())}
                </TableCell>
                <TableCell>
                  <DeleteButton businessId={business.id?.toString() || ""} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        Negocios Asociados
      </Typography>
      {isMobile ? <MobileView /> : <DesktopView />}
    </>
  );
};
