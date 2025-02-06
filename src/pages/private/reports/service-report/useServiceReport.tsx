import React, { useState } from "react";
import { useAppContext } from "../../../../core/context/use/useAppContext";
import { useAuthContext } from "../../../../core/context/use/useAuthContext";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import { useServiceSale } from "../../../../core/hooks/useServiceSale";
import { useService } from "../../../../core/hooks/useServices";
import { ERole } from "../../../../core/models/api";
import { ServiceSaleModel } from "../../../../core/models/api/serviceSale.model";
import { serviceSaleService } from "../../../../core/services/serviceSaleService";
import { allowedRole } from "../../../../core/utilities/helpers/allowedRole.util";
import { useStatus } from "../../../../core/hooks/customs/useStatus";

export const useServiceReport = () => {
  const { materialTheme, role } = useAppContext();
  const { business } = useBusinessContext();
  const { user } = useAuthContext();
  const { services } = useService();
  const {
    serviceSales,
    loadingServiceSales,
    editServiceSaleFromServiceSales,
    addServiceSaleToServiceSales,
    deleteServiceSaleFromServiceSales,
  } = useServiceSale();

  // Estados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false);
  const [openEmptyServiceModal, setOpenEmptyServiceModal] = useState(false);
  const [serviceSaleToEdit, setServiceSaleToEdit] =
    useState<ServiceSaleModel>();

  const {
    loading,
    errorMessage,
    successMessage,
    setLoading,
    setError,
    setSuccess,
  } = useStatus();

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
    setLoading();
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
          setSuccess("Venta de servicio actualizada correctamente");
        } else {
          setError("Ah ocurrido un error al actualizar la venta de servicio");
        }
      } else {
        response = await serviceSaleService.saveServiceSale(serviceData);
        if (response.status === 200) {
          addServiceSaleToServiceSales(response.data as ServiceSaleModel);
          setSuccess("Venta de servicio creada correctamente");
        } else {
          setError("Ah ocurrido un error al crear la venta de servicio");
        }
      }

      setOpenAddServiceModal(false);
      setServiceSaleToEdit(undefined);
    } catch (error) {
      console.error("Error submitting service sale:", error);
      setError("Ah ocurrido un error al guardar la venta de servicio");
    }
  };

  const handleEditServiceSale = (serviceSale: ServiceSaleModel) => {
    setServiceSaleToEdit(serviceSale);
    setOpenAddServiceModal(true);
  };

  const handleDeleteServiceSale = async (id: number) => {
    setLoading();
    try {
      const response = await serviceSaleService.deleteServiceSale(id);
      if (response.status === 200) {
        deleteServiceSaleFromServiceSales(id);
        setSuccess("Venta de servicio eliminada correctamente");
      } else {
        setError("Ah ocurrido un error al eliminar la venta de servicio");
      }
    } catch (error) {
      console.error("Error deleting service sale:", error);
      setError("Ah ocurrido un error al eliminar la venta de servicio");
    }
  };

  const handleClickAddService = () => {
    setServiceSaleToEdit(undefined);
    if (services.length === 0) {
      setOpenEmptyServiceModal(true);
    } else {
      setOpenAddServiceModal(true);
    }
  };

  return {
    materialTheme,
    role,
    business,
    serviceSales,
    page,
    rowsPerPage,
    openAddServiceModal,
    openEmptyServiceModal,
    serviceSaleToEdit,
    loading: loadingServiceSales || loading,
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
  };
};
