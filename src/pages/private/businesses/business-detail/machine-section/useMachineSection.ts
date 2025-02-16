import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { MachineModel } from "../../../../../core/models/api/machine.model";
import { machineService } from "../../../../../core/services/machineService";
import { useBusinessStore } from "../../../../../core/store/business.store";

const valueSchema = z.object({
  value: z.string().min(1, "El campo es requerido"),
});

type TValue = z.infer<typeof valueSchema>;

const defaultValue: TValue = {
  value: "",
};

export const useMachineSection = () => {
  const business = useBusinessStore((state) => state.business);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<MachineModel | null>(
    null
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TValue>({
    resolver: zodResolver(valueSchema),
    defaultValues: defaultValue,
  });

  const onSubmit: SubmitHandler<TValue> = async (data) => {
    setLoading(true);
    setError(false);

    const dataToSave: MachineModel = {
      name: data.value,
      active: true,
      business: business?.id as number,
      ...(selectedMachine && { id: selectedMachine.id }),
    };

    const response = selectedMachine
      ? await machineService.updateMachine(dataToSave)
      : await machineService.saveMachine(dataToSave);

    if (response.status === 200) {
      setSuccess(true);
      handleCloseModal();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const handleOpenModal = (machine?: MachineModel) => {
    if (machine) {
      setSelectedMachine(machine);
      setValue("value", machine.name);
    } else {
      setSelectedMachine(null);
      reset(defaultValue);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMachine(null);
    reset(defaultValue);
  };

  const handleDeleteMachine = async (id: number) => {
    setLoading(true);
    setError(false);

    const response = await machineService.deleteMachine(id.toString());

    if (response.status === 200) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return {
    business,
    loading,
    error,
    success,
    control,
    errors,
    openModal,
    selectedMachine,
    handleSubmit,
    handleOpenModal,
    handleCloseModal,
    onSubmit,
    handleDeleteMachine,
  };
};
