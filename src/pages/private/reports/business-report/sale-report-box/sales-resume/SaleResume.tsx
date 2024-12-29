import { zodResolver } from "@hookform/resolvers/zod";
import { Box, darken, Grid2 as Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../../../../../../components/common/ui/CustomInput";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";

const SaleResumeZodSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  total: z.string().min(1, "El total debe ser mayor a 0"),
  found: z.string().min(1, "El fondo debe ser mayor a 0"),
});

type TSaleResume = z.infer<typeof SaleResumeZodSchema>;

const initialValues: TSaleResume = {
  name: "",
  total: "",
  found: "",
};

export const SaleResume = () => {
  const { selectedTheme } = useThemeContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TSaleResume>({
    resolver: zodResolver(SaleResumeZodSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: TSaleResume) => console.log(data);
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: 2, width: "50%", gap: 2 }}
    >
      <Box>
        <Typography variant="h5" align="center">
          Información Principal
        </Typography>
        <Typography
          sx={{
            color: darken(selectedTheme.text_color, 0.3),
            fontSize: "0.8rem",
          }}
          variant="body1"
        >
          Ingrese la información principal
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <CustomInput
              name="name"
              control={control}
              label="Nombre del cuadre"
              type="text"
              placeholder="ej: PC 1"
              helperText={
                errors.name?.message ||
                "Nombre para identificar el cuadre individual"
              }
              small
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomInput
              name="total"
              control={control}
              label="Total"
              type="number"
              helperText={errors.total?.message || "Ingrese el total recaudado"}
              startAdornment="$"
              small
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomInput
              name="found"
              control={control}
              label="Fondo"
              type="number"
              helperText={errors.found?.message || "Fondo disponible"}
              startAdornment="$"
              small
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
