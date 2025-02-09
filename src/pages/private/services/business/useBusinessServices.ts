import React, { useState } from "react";
import { useStatus } from "../../../../core/hooks/customs/useStatus";
import { useConsumable } from "../../../../core/hooks/useConsumable";
import { useService } from "../../../../core/hooks/useServices";
import { ServiceModel } from "../../../../core/models/api";

export const useBusinessServices = () => {
  const { services, deleteService, saveService } = useService();
  const { consumables } = useConsumable();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceModel>();
  const [serviceToDelete, setServiceToDelete] = useState<ServiceModel>();

  const { loading, setLoading, reset } = useStatus();

  // Handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setServiceToEdit(undefined);
    setOpenModalAdd(true);
  };

  const handleEditModal = (service: ServiceModel) => {
    setOpenModalAdd(true);
    setServiceToEdit(service);
  };

  const handleDeleteService = (service: ServiceModel) => {
    setOpenModalConfirmDelete(true);
    setServiceToDelete(service);
  };

  const onDeleteService = () => {
    if (!serviceToDelete?.id) return;

    setLoading();
    deleteService(serviceToDelete.id, {
      onSuccess: () => {
        setOpenModalConfirmDelete(false);
      },
      onSettled: () => {
        setServiceToDelete(undefined);
        reset();
      },
    });
  };

  const handleSubmit = (service: ServiceModel) => {
    setLoading();
    saveService(service, {
      onSuccess: () => {
        setOpenModalAdd(false);
      },
      onSettled: () => {
        reset();
        setServiceToEdit(undefined);
      },
    });
  };

  return {
    page,
    rowsPerPage,
    openModalAdd,
    openModalConfirmDelete,
    services,
    loading,
    consumables,
    serviceToDelete,
    serviceToEdit,
    setOpenModalAdd,
    setOpenModalConfirmDelete,
    handleSubmit,
    onDeleteService,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenModal,
    handleEditModal,
    handleDeleteService,
  };
};
