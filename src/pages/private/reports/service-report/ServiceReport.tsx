import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid2 as Grid,
  TablePagination,
  Typography,
  darken,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { CustomPopover } from "../../../../components/common/ui/CustomPopover";
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { CustomTooltip } from "../../../../components/common/ui/CustomTooltip";
import { ModalRandomInfo } from "../../../../components/common/ui/ModalRandomInfo";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { ERole } from "../../../../core/models/api";
import { allowedRole } from "../../../../core/utilities/helpers/allowedRole.util";
import { RenderServiceSaleDesktop } from "./components/RenderServiceSaleDesktop";
import { RenderServiceSaleMobile } from "./components/RenderServiceSaleMobile";
import { ModalAddServiceSale } from "./modal-add-service-sale/ModalAddServiceSale";
import { useServiceReport } from "./hooks/useServiceReport";
import { useTableStyles } from "../../../../core/styles/useTableStyles";

const ServiceReport = () => {
  const { selectedTheme } = useThemeContext();
  const { buttonStyle } = useTableStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const {
    materialTheme,
    role,
    business,
    serviceSales,
    page,
    rowsPerPage,
    openAddServiceModal,
    openEmptyServiceModal,
    serviceSaleToEdit,
    loading,
    errorMessage,
    successMessage,
    setOpenAddServiceModal,
    setServiceSaleToEdit,
    setOpenEmptyServiceModal,
    allowedToDelete,
    allowedToEdit,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSubmit,
    handleEditServiceSale,
    handleDeleteServiceSale,
    handleClickAddService,
  } = useServiceReport();

  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  return (
    <Box sx={{ p: 1 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Grid>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: selectedTheme.text_color,
            }}
          >
            Reporte de Servicios
          </Typography>
        </Grid>
        <Grid>
          {isMobile ? (
            <>
              <Box
                onClick={(event) => {
                  if (
                    !allowedRole(role, [ERole.EMPLOYEE, ERole.ADMIN]) &&
                    business?.id
                  ) {
                    setAnchorEl(event.currentTarget);
                  } else {
                    handleClickAddService();
                  }
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  disabled={!allowedRole(role, [ERole.EMPLOYEE, ERole.ADMIN])}
                  sx={{
                    backgroundColor: selectedTheme.primary_color,
                    color: "white",
                    "&:hover": {
                      backgroundColor: darken(selectedTheme.primary_color, 0.1),
                    },
                  }}
                >
                  Agregar Servicio Vendido
                </Button>
              </Box>

              <CustomPopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                message="Solo los empleados pueden agregar servicios vendidos"
              />
            </>
          ) : (
            <CustomTooltip
              message={
                !allowedRole(role, [ERole.EMPLOYEE, ERole.ADMIN])
                  ? "Solo los empleados pueden agregar servicios vendidos"
                  : "Agregar un Nuevo Servicio Vendido"
              }
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                disabled={!allowedRole(role, [ERole.EMPLOYEE, ERole.ADMIN])}
                onClick={handleClickAddService}
                sx={buttonStyle}
              >
                Agregar Servicio Vendido
              </Button>
            </CustomTooltip>
          )}
        </Grid>
      </Grid>

      {isMobile ? (
        <RenderServiceSaleMobile
          serviceSales={serviceSales}
          allowedToDelete={allowedToDelete}
          allowedToEdit={allowedToEdit}
          handleEditServiceSale={handleEditServiceSale}
          handleDeleteServiceSale={handleDeleteServiceSale}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      ) : (
        <RenderServiceSaleDesktop
          serviceSales={serviceSales}
          allowedToDelete={allowedToDelete}
          allowedToEdit={allowedToEdit}
          handleEditServiceSale={handleEditServiceSale}
          handleDeleteServiceSale={handleDeleteServiceSale}
          page={page}
          rowsPerPage={rowsPerPage}
          loadingServiceSales={loading}
        />
      )}

      {serviceSales.length > 5 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={serviceSales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: selectedTheme.text_color,
          }}
        />
      )}

      <ModalAddServiceSale
        open={openAddServiceModal}
        onClose={() => {
          setOpenAddServiceModal(false);
          setServiceSaleToEdit(undefined);
        }}
        onSubmit={handleSubmit}
        serviceSale={serviceSaleToEdit}
        isEditing={!!serviceSaleToEdit}
      />

      <ModalRandomInfo
        open={openEmptyServiceModal}
        info={
          "No hay servicios creados, valla a la pagina de servicios y agregue al menos uno."
        }
        onClose={() => {
          setOpenEmptyServiceModal(false);
        }}
      />

      <CustomSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </Box>
  );
};

export default ServiceReport;
