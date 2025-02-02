import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  IconButton,
  lighten,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { CustomSnackbar } from "../../../../../components/common/ui/CustomSnackbar";
import { LoadingCircularProgress } from "../../../../../components/common/ui/LoadingCircularProgress";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useMachineSection } from "./useMachineSection";
import { useTableStyles } from "../../../../../core/styles/useTableStyles";

export const MachineSection = () => {
  const { selectedTheme } = useThemeContext();
  const { modalBlurStyle, modalBoxStyle, buttonOutlineStyle, buttonStyle } =
    useTableStyles();
  const {
    business,
    loading,
    error,
    success,
    control,
    errors,
    openModal,
    selectedMachine,
    handleCloseModal,
    handleOpenModal,
    onSubmit,
    handleDeleteMachine,
    handleSubmit,
  } = useMachineSection();

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
          {business.machines?.map((val) => (
            <Box
              key={val.id}
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
          sx={buttonStyle}
        >
          Agregar Máquina
        </Button>

        {/* Modal con el formulario */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-add-machine"
          aria-describedby="modal-add-new-machine"
          sx={modalBlurStyle}
        >
          <Box sx={modalBoxStyle}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              {selectedMachine ? "Editar Máquina" : "Agregar Nueva Máquina"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                <CustomInput
                  name="value"
                  label="Nombre de la maquina"
                  type="text"
                  placeholder="ej: Maquina 1"
                  control={control}
                  error={!!errors.value}
                  helperText={errors.value?.message}
                  small
                />
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={buttonOutlineStyle}
                >
                  Cancelar
                </Button>
                <Button variant="contained" type="submit" sx={buttonStyle}>
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
