import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import {
  Box,
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ServiceSaleModel } from "../../../../../core/models/api/serviceSale.model";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useTableStyles } from "../../../../../core/styles/useTableStyles";
import { formatDateToHourString } from "../../../../../core/utilities/helpers/dateFormat";

interface Props {
  serviceSales: ServiceSaleModel[] | undefined;
  allowedToEdit: (userId: number, businessFinalSale: boolean) => boolean;
  allowedToDelete: (businessFinalSale: boolean) => boolean;
  handleEditServiceSale: (serviceSale: ServiceSaleModel) => void;
  handleDeleteServiceSale: (serviceSaleId: number) => void;
  page: number;
  rowsPerPage: number;
}

export const RenderServiceSaleMobile = ({
  serviceSales,
  allowedToEdit,
  allowedToDelete,
  handleEditServiceSale,
  handleDeleteServiceSale,
  page,
  rowsPerPage,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  const { cardStyle } = useTableStyles();
  return (
    <Box>
      {serviceSales
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        ?.map((serviceSale) => (
          <Card key={serviceSale.id} sx={cardStyle}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    {serviceSale.service.name}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    Cantidad: {serviceSale.quantity}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    Trabajador: {serviceSale.employee.user.name}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    Precio Final: $
                    {serviceSale.quantity * serviceSale.service.price}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    Creado:{" "}
                    {serviceSale.createdAt
                      ? formatDateToHourString(serviceSale.createdAt)
                      : "N/A"}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    Actualizado:{" "}
                    {serviceSale.updatedAt
                      ? formatDateToHourString(serviceSale.updatedAt)
                      : "N/A"}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 1,
                    }}
                  >
                    <IconButton
                      disabled={
                        !allowedToEdit(
                          serviceSale.employee.user.id as number,
                          serviceSale.businessFinalSale !== null
                        )
                      }
                      onClick={() => handleEditServiceSale(serviceSale)}
                      sx={{
                        color: selectedTheme.text_color,
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      disabled={
                        !allowedToDelete(serviceSale.businessFinalSale !== null)
                      }
                      onClick={() => handleDeleteServiceSale(serviceSale.id!)}
                      sx={{
                        color: selectedTheme.text_color,
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                      {serviceSale.businessFinalSale ? (
                        <LibraryAddCheckIcon
                          sx={{ color: "green", opacity: 0.9 }}
                        />
                      ) : (
                        <RunningWithErrorsIcon
                          sx={{ color: "red", opacity: 0.8 }}
                        />
                      )}
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};
