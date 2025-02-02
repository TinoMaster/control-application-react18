import React, { useCallback, useEffect, useState } from "react";
import { ServiceModel } from "../../../../core/models/api";
import { ConsumableModel } from "../../../../core/models/api/consumables.model";
import { serviceService } from "../../../../core/services/serviceService";
import { consumableService } from "../../../../core/services/consumableService";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";

export const useBusinessServices = () => {
  const { business } = useBusinessContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [consumables, setConsumables] = useState<ConsumableModel[]>([]);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceModel>();
  const [serviceToDelete, setServiceToDelete] = useState<ServiceModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Funciones de manejo de datos
  const addServiceToServices = (service: ServiceModel) => {
    setServices([...services, service]);
  };

  const editServiceFromServices = (service: ServiceModel) => {
    setServices(services.map((s) => (s.id === service.id ? service : s)));
  };

  const deleteServiceFromServices = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const getServices = useCallback(async () => {
    if (!business?.id) return;

    setLoading(true);
    try {
      const response = await serviceService.getServicesByBusinessId(
        business.id
      );
      if (response.status === 200) {
        setServices(response.data || []);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  }, [business?.id]);

  const getConsumables = useCallback(async () => {
    if (!business?.id) return;

    const response = await consumableService.getConsumablesByBusinessId(
      business.id
    );

    if (response.status === 200) {
      setConsumables(response.data || []);
    }
  }, [business?.id]);

  useEffect(() => {
    getServices();
    getConsumables();
  }, [getServices, getConsumables]);

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

  const deleteService = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    if (!serviceToDelete?.id) return;
    const id = serviceToDelete?.id;

    try {
      const response = await serviceService.deleteService(id);
      if (response.status === 200) {
        setSuccess(true);
        deleteServiceFromServices(id);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error("Error deleting service:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (service: ServiceModel) => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await serviceService.saveService(service);
      if (response.status === 200) {
        setSuccess(true);
        setOpenModalAdd(false);
        if (serviceToEdit) {
          editServiceFromServices(response.data as ServiceModel);
        } else {
          addServiceToServices(response.data as ServiceModel);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error("Error saving service:", error);
    }
    setLoading(false);
  };

  return {
    page,
    rowsPerPage,
    openModalAdd,
    openModalConfirmDelete,
    services,
    loading,
    success,
    error,
    consumables,
    serviceToDelete,
    serviceToEdit,
    setOpenModalAdd,
    setOpenModalConfirmDelete,
    handleSubmit,
    deleteService,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenModal,
    handleEditModal,
    handleDeleteService,
  };
};
