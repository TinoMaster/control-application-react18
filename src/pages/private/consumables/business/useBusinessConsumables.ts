import { useState } from "react";
import { useStatus } from "../../../../core/hooks/customs/useStatus";
import { useConsumable } from "../../../../core/hooks/useConsumable";
import { ConsumableModel } from "../../../../core/models/api/consumables.model";

export const useBusinessConsumables = () => {
  const { consumables, onSaveConsumable, onDeleteConsumable } = useConsumable();

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);

  const [consumableToEdit, setConsumableToEdit] = useState<ConsumableModel>();
  const [consumableToDelete, setConsumableToDelete] =
    useState<ConsumableModel>();

  const { loading, setLoading, reset } = useStatus();
  // Estado para la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const deleteConsumable = () => {
    setLoading();
    if (!consumableToDelete || !consumableToDelete.id) return;
    const id = consumableToDelete?.id;

    onDeleteConsumable(id, {
      onSuccess: () => {
        setOpenModalConfirmDelete(false);
      },
      onSettled: () => {
        setConsumableToDelete(undefined);
        reset();
      },
    });
  };

  const handleSubmit = (consumable: ConsumableModel) => {
    setLoading();

    const consumableToSave: ConsumableModel = {
      ...consumable,
      price: parseFloat((consumable.price / consumable.stock).toFixed(2)),
    };

    onSaveConsumable(consumableToSave, {
      onSuccess: () => {
        setOpenModalAdd(false);
      },
      onSettled: () => {
        reset();
      },
    });
  };

  return {
    loading,
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
