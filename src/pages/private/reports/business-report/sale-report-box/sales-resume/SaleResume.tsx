import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  darken,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2 as Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../../../../../../components/common/ui/CustomInput";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";
import { useState } from "react";
import { useBusinessContext } from "../../../../../../core/context/use/useBusinessContext";

enum ERegisterType {
  INDIVIDUAL = "individual",
  GENERAL = "general",
}

const SaleResumeZodSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  total: z.string().min(1, "El total debe ser mayor a 0"),
  found: z.string().min(1, "El fondo debe ser mayor a 0"),
  machines: z.array(z.number()).min(1, "Selecciona al menos una maquina"),
});

type TSaleResume = z.infer<typeof SaleResumeZodSchema>;

const initialValues: TSaleResume = {
  name: "",
  total: "",
  found: "",
  machines: [],
};

export const SaleResume = () => {
  const { selectedTheme } = useThemeContext();
  const { business } = useBusinessContext();
  const [registerType, setRegisterType] = useState<ERegisterType>(
    ERegisterType.GENERAL
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TSaleResume>({
    resolver: zodResolver(SaleResumeZodSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: TSaleResume) => console.log(data);

  const handleRegisterTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterType(event.target.value as ERegisterType);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ marginBottom: 2, width: "50%", gap: 2 }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5">Información Principal</Typography>
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

      {/* Radio Button para seleccionar si el cuadre es general o individual */}
      <FormControl>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{
            color: selectedTheme.text_color,
            "&.Mui-focused": { color: selectedTheme.secondary_color },
          }}
        >
          Tipo de cuadre
        </FormLabel>
        <Typography
          sx={{
            color: darken(selectedTheme.text_color, 0.3),
            fontSize: "0.8rem",
          }}
          variant="body1"
        >
          Elija individual si desea registrar el cuadre de una sola maquina o
          general si desea registrar el cuadre de todas las maquinas
        </Typography>
        <Typography
          sx={{
            color: darken(selectedTheme.text_color, 0.3),
            fontSize: "0.8rem",
          }}
          variant="body1"
        >
          Nota: puede hacer selecciones multiples
        </Typography>
        <RadioGroup
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue={ERegisterType.GENERAL}
          onChange={handleRegisterTypeChange}
          name="row-radio-buttons-group"
          row
        >
          <FormControlLabel
            value={ERegisterType.GENERAL}
            control={
              <Radio
                sx={{
                  color: selectedTheme.text_color,
                  "&.Mui-checked": { color: selectedTheme.secondary_color },
                }}
              />
            }
            label="General"
          />
          <FormControlLabel
            value={ERegisterType.INDIVIDUAL}
            control={
              <Radio
                sx={{
                  color: selectedTheme.text_color,
                  "&.Mui-checked": { color: selectedTheme.secondary_color },
                }}
              />
            }
            label="Individual"
          />
        </RadioGroup>
      </FormControl>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              name="machines"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.machines}>
                  <Select
                    {...field}
                    labelId="machines-label"
                    id="machines"
                    multiple
                    disabled={registerType === ERegisterType.GENERAL}
                    value={field.value || []}
                    inputProps={{ "aria-label": "Without label" }}
                    error={!!errors.machines}
                    sx={{
                      color: "white",
                      borderColor: "white",
                      "&.Mui-disabled": {
                        color: "white",
                        "&:hover": {
                          borderColor: "white",
                        },
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Seleccionar
                    </MenuItem>
                    {business.machines?.map((machine) => (
                      <MenuItem key={machine.id} value={machine.id}>
                        {machine.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.machines && (
                    <FormHelperText>{errors.machines.message}</FormHelperText>
                  )}
                </FormControl>
              )}
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
