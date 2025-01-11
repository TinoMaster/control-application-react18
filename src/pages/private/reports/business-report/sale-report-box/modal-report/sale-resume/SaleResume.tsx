import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
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
import CustomInput from "../../../../../../../components/common/ui/CustomInput";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import { useEffect, useState } from "react";
import { useBusinessContext } from "../../../../../../../core/context/use/useBusinessContext";
import { useBusinessReportContext } from "../../../context/useBusinessReportContext";
import { allowedRole } from "../../../../../../../core/utilities/helpers/allowedRole.util";
import { useAuthContext } from "../../../../../../../core/context/use/useAuthContext";
import { ERole } from "../../../../../../../core/models/api";

enum ERegisterType {
  INDIVIDUAL = "individual",
  GENERAL = "general",
}

const SaleResumeZodSchema = z.object({
  total: z.string().min(1, "El total debe ser mayor a 0"),
  found: z.string().min(1, "El fondo debe ser mayor a 0"),
  machines: z.array(z.number()).min(1, "Selecciona al menos una maquina"),
});

type TSaleResume = z.infer<typeof SaleResumeZodSchema>;

export const SaleResume = () => {
  const { selectedTheme } = useThemeContext();
  const { role } = useAuthContext();
  const { business } = useBusinessContext();
  const [registerType, setRegisterType] = useState<ERegisterType>(
    ERegisterType.INDIVIDUAL
  );
  const [loading, setLoading] = useState(false);

  const { setBusinessSale, businessSale, nextSection } =
    useBusinessReportContext();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<TSaleResume>({
    resolver: zodResolver(SaleResumeZodSchema),
    defaultValues: {
      total: businessSale.total.toString(),
      found: businessSale.found.toString(),
      machines: businessSale.machines,
    },
  });

  console.log(isValid);

  const onSubmit = (data: TSaleResume) => {
    setLoading(true);

    setBusinessSale({
      ...businessSale,
      total: Number(data.total),
      found: Number(data.found),
      machines: data.machines,
    });

    setTimeout(() => {
      setLoading(false);
      nextSection();
    }, 1000);
  };

  const handleRegisterTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterType(event.target.value as ERegisterType);
  };

  useEffect(() => {
    if (registerType === ERegisterType.INDIVIDUAL) {
      setValue("machines", []);
    } else {
      setValue("machines", business.machines?.map((m) => m.id as number) ?? []);
    }
  }, [registerType, setValue, business.machines]);

  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{
        marginBottom: 2,
        width: "100%",
        gap: 2,
        color: selectedTheme.text_color,
      }}
    >
      {/* Radio Button para seleccionar si el cuadre es general o individual */}
      {allowedRole(role, [ERole.ADMIN, ERole.OWNER]) ? (
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
            Elija individual si desea registrar el cuadre de una sola maquina
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
            defaultValue={registerType}
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
      ) : (
        <Typography
          sx={{
            color: darken(selectedTheme.text_color, 0.3),
            fontSize: "0.8rem",
          }}
          variant="body1"
        >
          Elija la maquina de trabajo
        </Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              name="machines"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.machines}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: selectedTheme.text_color,
                      "& fieldset": {
                        borderColor: selectedTheme.text_color,
                      },
                      "&:hover fieldset": {
                        borderColor: selectedTheme.text_color,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: selectedTheme.text_color,
                      },
                    },
                    "& .MuiSelect-icon": {
                      color: selectedTheme.text_color,
                    },
                  }}
                >
                  <Select
                    {...field}
                    labelId="machines-label"
                    id="machines"
                    multiple={allowedRole(role, [ERole.ADMIN, ERole.OWNER])}
                    disabled={registerType === ERegisterType.GENERAL}
                    value={field.value || []}
                    inputProps={{ "aria-label": "Without label" }}
                    error={!!errors.machines}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      if (allowedRole(role, [ERole.ADMIN, ERole.OWNER])) {
                        // Modo múltiple - mantener el array como está
                        field.onChange(selectedValue);
                      } else {
                        // Modo único - convertir a array de un elemento
                        field.onChange([selectedValue]);
                      }
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
              helperText={errors.total?.message || "Total recaudado"}
              startAdornment="$"
              small
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomInput
              name="found"
              control={control}
              label="Fondo de hoy"
              type="number"
              helperText={errors.found?.message || `Ayer ${300}`}
              startAdornment="$"
              small
            />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            size="small"
            variant="contained"
            disabled={!isValid || loading}
            sx={{ backgroundColor: darken(selectedTheme.secondary_color, 0.3) }}
          >
            {loading ? "Procesando..." : "Procesar"}
          </Button>
        </Box>
      </form>
    </Grid>
  );
};
