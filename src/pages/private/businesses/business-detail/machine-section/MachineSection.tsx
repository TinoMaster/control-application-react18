import {
  Box,
  Button,
  IconButton,
  lighten,
  Stack,
  Typography,
  Modal,
} from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { z } from "zod";
import { Delete } from "@mui/icons-material";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MachineModel } from "../../../../../core/models/api/machine.model";
import { useState } from "react";
import { machineService } from "../../../../../core/services/machineService";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";
import { CustomSnackbar } from "../../../../../components/common/ui/CustomSnackbar";
import { LoadingCircularProgress } from "../../../../../components/common/ui/LoadingCircularProgress";
import { useAuthContext } from "../../../../../core/context/use/useAuthContext";
import EditIcon from "@mui/icons-material/Edit";

const valueSchema = z.object({
  value: z.string().min(1, "El campo es requerido"),
});

type TValue = z.infer<typeof valueSchema>;

const defaultValue: TValue = {
  value: "",
};

export const MachineSection = () => {
  const { selectedTheme } = useThemeContext();
  const { business } = useBusinessContext();
  const { reloadUser } = useAuthContext();

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
      reloadUser();
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
      reloadUser();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <>
      <LoadingCircularProgress loading={loading} />
      <CustomSnackbar
        success={success}
        error={error}
        errorMessage="No se pudo agregar la maquina"
        successMessage="Maquina agregada con éxito"
      />
      <Box>
        {/* Lista de pares clave-valor */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            marginBottom: 2,
          }}
        >
          {business.machines?.map((val, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
                borderRadius: 1,
                backgroundColor: lighten(selectedTheme.background_color, 0.1),
                color: selectedTheme.text_color,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              >
                {val.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="warning"
                  onClick={() => handleOpenModal(val)}
                  sx={{ marginRight: 1 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteMachine(val.id as number)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Botón para abrir el modal */}
        <Button
          variant="contained"
          onClick={() => handleOpenModal()}
          sx={{ backgroundColor: selectedTheme.primary_color }}
        >
          Agregar Máquina
        </Button>

        {/* Modal con el formulario */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-add-machine"
          aria-describedby="modal-add-new-machine"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              backgroundColor: selectedTheme.background_color,
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              {selectedMachine ? "Editar Máquina" : "Agregar Nueva Máquina"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                <CustomInput
                  name="value"
                  label="Valor"
                  type="text"
                  placeholder="ej: Maquina 1"
                  control={control}
                  error={!!errors.value}
                  helperText={errors.value?.message}
                  small
                />
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={handleCloseModal}>Cancelar</Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: selectedTheme.secondary_color }}
                >
                  {selectedMachine ? "Actualizar" : "Agregar"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </Box>
    </>
  );
};
