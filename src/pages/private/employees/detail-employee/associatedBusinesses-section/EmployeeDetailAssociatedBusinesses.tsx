import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  darken,
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
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import { formatDateToString } from "../../../../../core/utilities/helpers/dateFormat";

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
    <Stack spacing={2} sx={{ mt: 2 }}>
      {employee?.user.businesses.map((business, index) => (
        <Card
          key={index}
          elevation={2}
          sx={{
            p: 2,
            backgroundColor: darken(selectedTheme.background_color, 0.1),
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
            <Typography
              variant="caption"
              color={darken(selectedTheme.text_color, 0.5)}
            >
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
    <Paper elevation={2} sx={{ mt: 2, borderRadius: "8px" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& > *": {
                  backgroundColor: darken(selectedTheme.background_color, 0.1),
                  fontSize: "12px",
                  color: selectedTheme.text_color,
                },
              }}
            >
              <TableCell sx={{ color: selectedTheme.text_color }}>
                Nombre
              </TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Creado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee?.user.businesses.map((business, index) => (
              <TableRow
                key={index}
                sx={{
                  "& > *": {
                    fontSize: "12px",
                    backgroundColor: selectedTheme.background_color,
                    border: "none",
                  },
                }}
              >
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {business.name}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {`${business.address.street}, #${business.address.number}, ${business.address.municipality}, ${business.address.city}`}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {business.phone}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {formatDateToString(business.createdAt || new Date())}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
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
