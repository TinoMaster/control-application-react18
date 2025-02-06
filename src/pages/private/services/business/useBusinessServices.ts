import React, { useCallback, useEffect, useState } from "react";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import { useStatus } from "../../../../core/hooks/customs/useStatus";
import { ServiceModel } from "../../../../core/models/api";
import { ConsumableModel } from "../../../../core/models/api/consumables.model";
import { consumableService } from "../../../../core/services/consumableService";
import { serviceService } from "../../../../core/services/serviceService";

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

  const {
    loading,
    errorMessage,
    successMessage,
    setError,
    setSuccess,
    setLoading,
  } = useStatus();

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

    setLoading();
    try {
      const response = await serviceService.getServicesByBusinessId(
        business.id
      );
      if (response.status === 200) {
        setServices(response.data || []);
        setSuccess("");
      } else {
        setError("Ah ocurrido un error al cargar los servicios");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Ah ocurrido un error al cargar los servicios");
    }
  }, [business?.id, setError, setSuccess, setLoading]);

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
    setLoading();
    if (!serviceToDelete?.id) return;
    const id = serviceToDelete?.id;

    try {
      const response = await serviceService.deleteService(id);
      if (response.status === 200) {
        setSuccess("Servicio eliminado correctamente");
        deleteServiceFromServices(id);
      } else {
        setError("Ah ocurrido un error al eliminar el servicio");
      }
    } catch (error) {
      setError("Ah ocurrido un error al eliminar el servicio");
      console.error("Error deleting service:", error);
    }
  };

  const handleSubmit = async (service: ServiceModel) => {
    setLoading();

    try {
      const response = await serviceService.saveService(service);
      if (response.status === 200) {
        setSuccess("Servicio guardado correctamente");
        setOpenModalAdd(false);
        if (serviceToEdit) {
          editServiceFromServices(response.data as ServiceModel);
        } else {
          addServiceToServices(response.data as ServiceModel);
        }
      } else {
        setError("Ah ocurrido un error al guardar el servicio");
      }
    } catch (error) {
      setError("Ah ocurrido un error al guardar el servicio");
      console.error("Error saving service:", error);
    }
  };

  return {
    page,
    rowsPerPage,
    openModalAdd,
    openModalConfirmDelete,
    services,
    loading,
    successMessage,
    errorMessage,
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
