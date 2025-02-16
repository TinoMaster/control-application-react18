import React, { useState } from "react";
import { useAppContext } from "../../../../../core/context/use/useAppContext";
import { useAuthContext } from "../../../../../core/context/use/useAuthContext";
import { useStatus } from "../../../../../core/hooks/customs/useStatus";
import { useServiceSale } from "../../../../../core/hooks/useServiceSale";
import { useService } from "../../../../../core/hooks/useServices";
import { ERole } from "../../../../../core/models/api";
import { ServiceSaleModel } from "../../../../../core/models/api/serviceSale.model";
import { useBusinessStore } from "../../../../../core/store/business.store";
import { allowedRole } from "../../../../../core/utilities/helpers/allowedRole.util";

export const useServiceReport = () => {
  const { materialTheme, role } = useAppContext();
  const { business } = useBusinessStore();
  const { user } = useAuthContext();
  const { services } = useService();
  const {
    serviceSales,
    loadingServiceSales,
    deleteServiceSale,
    editServiceSale,
    saveServiceSale,
  } = useServiceSale();

  // Estados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false);
  const [openEmptyServiceModal, setOpenEmptyServiceModal] = useState(false);
  const [serviceSaleToEdit, setServiceSaleToEdit] =
    useState<ServiceSaleModel>();

  const { loading, setLoading, reset } = useStatus();

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

      if (serviceSaleToEdit) {
        editServiceSale(serviceData);
      } else {
        saveServiceSale(serviceData);
      }

      reset();
      setOpenAddServiceModal(false);
      setServiceSaleToEdit(undefined);
    } catch (error) {
      console.error("Error submitting service sale:", error);
    }
  };

  const handleEditServiceSale = (serviceSale: ServiceSaleModel) => {
    setServiceSaleToEdit(serviceSale);
    setOpenAddServiceModal(true);
  };

  const handleDeleteServiceSale = async (id: number) => {
    setLoading();
    deleteServiceSale(id, {
      onSettled: () => {
        reset();
      },
    });
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
