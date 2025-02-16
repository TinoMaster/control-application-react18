import {
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import CustomInput from "../../../../../../../../../components/common/ui/CustomInput";
import { useThemeContext } from "../../../../../../../../../core/context/use/useThemeContext";
import {
  BusinessModel,
  ERole,
  TRole,
} from "../../../../../../../../../core/models/api";
import { updateBusinessSaleMachines } from "../../../../../../../../../core/states/actions/businessFinalSaleActions";
import { allowedRole } from "../../../../../../../../../core/utilities/helpers/allowedRole.util";
import { ERegisterType, TSaleResume } from "../../zod/saleResume.zodSchema";

interface Props {
  control: Control<TSaleResume>;
  errors: FieldErrors<TSaleResume>;
  registerTypeWatch: ERegisterType;
  role: TRole;
  dispatch: React.Dispatch<any>;
  business: BusinessModel;
  machinesAlreadySelected: () => (number | undefined)[] | undefined;
}

export const SectionInputs = ({
  control,
  errors,
  registerTypeWatch,
  role,
  dispatch,
  business,
  machinesAlreadySelected,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
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
                disabled={registerTypeWatch === ERegisterType.GENERAL}
                value={field.value || []}
                inputProps={{ "aria-label": "Without label" }}
                error={!!errors.machines}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (allowedRole(role, [ERole.ADMIN, ERole.OWNER])) {
                    field.onChange(selectedValue);
                    dispatch(
                      updateBusinessSaleMachines(selectedValue as number[])
                    );
                  } else {
                    const newValue = [selectedValue].flat();
                    field.onChange(newValue);
                    dispatch(updateBusinessSaleMachines(newValue as number[]));
                  }
                }}
              >
                <MenuItem value="" disabled>
                  Seleccionar
                </MenuItem>
                {business.machines
                  ?.filter(
                    (machine) =>
                      !machinesAlreadySelected()?.includes(machine.id as number)
                  )
                  .map((machine) => (
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
          helperText={errors.found?.message || `Ayer ${0}`}
          startAdornment="$"
          small
        />
      </Grid>
    </Grid>
  );
};
