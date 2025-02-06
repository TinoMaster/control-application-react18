import React, { useCallback, useEffect, useState } from "react";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import { useStatus } from "../../../../core/hooks/customs/useStatus";
import { ConsumableModel } from "../../../../core/models/api/consumables.model";
import { consumableService } from "../../../../core/services/consumableService";

export const useBusinessConsumables = () => {
  const { business } = useBusinessContext();

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);
  const [consumables, setConsumables] = useState<ConsumableModel[]>([]);
  const [consumableToEdit, setConsumableToEdit] = useState<ConsumableModel>();
  const [consumableToDelete, setConsumableToDelete] =
    useState<ConsumableModel>();

  const {
    loading,
    errorMessage,
    successMessage,
    setLoading,
    setError,
    setSuccess,
  } = useStatus();
  // Estado para la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const addConsumableToConsumables = (consumable: ConsumableModel) => {
    setConsumables([...consumables, consumable]);
  };

  const editConsumableFromConsumables = (consumable: ConsumableModel) => {
    setConsumables(
      consumables.map((c) => (c.id === consumable.id ? consumable : c))
    );
  };

  const deleteConsumableFromConsumables = (id: number) => {
    setConsumables(consumables.filter((c) => c.id !== id));
  };

  const getConsumables = useCallback(async () => {
    setLoading();
    if (!business || !business.id) {
      return;
    }
    const response = await consumableService.getConsumablesByBusinessId(
      business.id as number
    );
    if (response.status === 200) {
      setConsumables(response.data || []);
      setSuccess("");
    } else {
      setError("Error al obtener los insumos");
    }
  }, [business, setLoading, setError, setSuccess]);

  /* handlers */
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
    setConsumableToEdit(undefined);
    setOpenModalAdd(true);
  };

  const handleEditModal = (consumable: ConsumableModel) => {
    setOpenModalAdd(true);
    setConsumableToEdit(consumable);
  };

  const handleDeleteConsumable = (consumable: ConsumableModel) => {
    setConsumableToDelete(consumable);
    setOpenModalConfirmDelete(true);
  };

  const deleteConsumable = async () => {
    setLoading();
    if (!consumableToDelete || !consumableToDelete.id) return;
    const id = consumableToDelete?.id;

    const response = await consumableService.deleteConsumable(id);

    if (response.status === 200) {
      setSuccess("Insumo eliminado correctamente");
      deleteConsumableFromConsumables(id);
    } else {
      setError("Error al eliminar el insumo");
    }
  };

  const handleSubmit = async (consumable: ConsumableModel) => {
    setLoading();

    const consumableToSave: ConsumableModel = {
      ...consumable,
      price: parseFloat((consumable.price / consumable.stock).toFixed(2)),
    };

    const response = await consumableService.saveConsumable(consumableToSave);

    if (response.status === 200) {
      setSuccess("Insumo guardado correctamente");
      setOpenModalAdd(false);
      if (consumableToEdit) {
        editConsumableFromConsumables(response.data as ConsumableModel);
      } else {
        addConsumableToConsumables(response.data as ConsumableModel);
      }
    } else {
      setError("Error al guardar el insumo");
    }
  };

  useEffect(() => {
    getConsumables();
  }, [getConsumables]);

  return {
    loading,
    errorMessage,
    successMessage,
    openModalAdd,
    consumableToDelete,
    consumableToEdit,
    setOpenModalAdd,
    openModalConfirmDelete,
    setOpenModalConfirmDelete,
    consumables,
    handleOpenModal,
    handleEditModal,
    handleDeleteConsumable,
    handleSubmit,
    handleChangePage,
    handleChangeRowsPerPage,
    deleteConsumable,
    page,
    rowsPerPage,
  };
};
