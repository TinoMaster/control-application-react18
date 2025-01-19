import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography, darken, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { CustomPopover } from "../../../../components/common/ui/CustomPopover";
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { CustomTooltip } from "../../../../components/common/ui/CustomTooltip";
import { LoadingCircularProgress } from "../../../../components/common/ui/LoadingCircularProgress";
import { useAppContext } from "../../../../core/context/use/useAppContext";
import { useAuthContext } from "../../../../core/context/use/useAuthContext";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { useServiceSale } from "../../../../core/hooks/useServiceSale";
import { ERole } from "../../../../core/models/api";
import { ServiceSaleModel } from "../../../../core/models/api/serviceSale.model";
import { serviceSaleService } from "../../../../core/services/serviceSaleService";
import { allowedRole } from "../../../../core/utilities/helpers/allowedRole.util";
import { ModalAddServiceSale } from "./modal-add-service-sale/ModalAddServiceSale";
import { RenderServiceSaleDesktop } from "./RenderServiceSaleDesktop";
import { RenderServiceSaleMobile } from "./RenderServiceSaleMobile";

const ServiceReport = () => {
  const { selectedTheme } = useThemeContext();
  const { materialTheme, role } = useAppContext();
  const { business } = useBusinessContext();
  const { user } = useAuthContext();

  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  const allowedToDelete = (businessFinalSale: boolean) => {
    const allowedByRole = allowedRole(role, [ERole.ADMIN, ERole.OWNER]);
    return allowedByRole && !businessFinalSale;
  };

  const allowedToEdit = (userId: number, businessFinalSale: boolean) => {
    const allowedByRole = allowedRole(role, [
      ERole.ADMIN,
      ERole.OWNER,
      ERole.EMPLOYEE,
    ]);
    const allowedByUser = role === ERole.EMPLOYEE ? userId === user?.id : true;
    return allowedByRole && allowedByUser && !businessFinalSale;
  };

  const {
    serviceSales,
    editServiceSaleFromServiceSales,
    addServiceSaleToServiceSales,
    deleteServiceSaleFromServiceSales,
  } = useServiceSale({ businessId: business?.id });

  // Estados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [serviceSaleToEdit, setServiceSaleToEdit] =
    useState<ServiceSaleModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Handlers
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async (serviceSale: ServiceSaleModel) => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    try {
      if (!business?.id) return;

      const serviceData = {
        ...serviceSale,
        businessId: business.id,
      };

      let response;
      if (serviceSaleToEdit) {
        response = await serviceSaleService.updateServiceSale(serviceData);
        if (response.status === 200) {
          editServiceSaleFromServiceSales(response.data as ServiceSaleModel);
          setSuccess(true);
        } else {
          setError(true);
        }
      } else {
        response = await serviceSaleService.saveServiceSale(serviceData);
        if (response.status === 200) {
          addServiceSaleToServiceSales(response.data as ServiceSaleModel);
          setSuccess(true);
        } else {
          setError(true);
        }
      }

      setLoading(false);
      setSuccess(false);
      setError(false);
      setOpen(false);
      setServiceSaleToEdit(undefined);
    } catch (error) {
      console.error("Error submitting service sale:", error);
      setError(true);
    }
  };

  const handleEditServiceSale = (serviceSale: ServiceSaleModel) => {
    setServiceSaleToEdit(serviceSale);
    setOpen(true);
  };

  const handleDeleteServiceSale = async (id: number) => {
    try {
      const response = await serviceSaleService.deleteServiceSale(id);
      if (response.status === 200) {
        deleteServiceSaleFromServiceSales(id);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error deleting service sale:", error);
      setError(true);
    }
  };

  if (loading) {
    return <LoadingCircularProgress loading={loading} />;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: selectedTheme.text_color,
          }}
        >
          Reporte de Servicios
        </Typography>
        {isMobile ? (
          <>
            <div
              onClick={(event) => {
                if (
                  !allowedRole(role, [ERole.EMPLOYEE, ERole.ADMIN]) &&
                  business?.id
                ) {
                  setAnchorEl(event.currentTarget);
                } else {
                  setServiceSaleToEdit(undefined);
                  setOpen(true);
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
            </div>

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
              onClick={() => {
                setServiceSaleToEdit(undefined);
                setOpen(true);
              }}
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
          </CustomTooltip>
        )}
      </Box>

      {isMobile ? (
        <RenderServiceSaleMobile
          serviceSales={serviceSales}
          allowedToDelete={allowedToDelete}
          allowedToEdit={allowedToEdit}
          handleEditServiceSale={handleEditServiceSale}
          handleDeleteServiceSale={handleDeleteServiceSale}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
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
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}

      <ModalAddServiceSale
        open={open}
        onClose={() => {
          setOpen(false);
          setServiceSaleToEdit(undefined);
        }}
        onSubmit={handleSubmit}
        serviceSale={serviceSaleToEdit}
        isEditing={!!serviceSaleToEdit}
      />

      <CustomSnackbar
        success={success}
        error={error}
        successMessage="Operación exitosa"
        errorMessage="Error al procesar la operación"
      />
    </Box>
  );
};

export default ServiceReport;
