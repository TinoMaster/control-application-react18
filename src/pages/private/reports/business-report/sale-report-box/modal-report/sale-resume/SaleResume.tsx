import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  darken,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2 as Grid,
  lighten,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../../../../../../../components/common/ui/CustomInput";
import { useAuthContext } from "../../../../../../../core/context/use/useAuthContext";
import { useBusinessContext } from "../../../../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import { useEmployees } from "../../../../../../../core/hooks/useEmployees";
import { ERole } from "../../../../../../../core/models/api";
import { EmployeeModel } from "../../../../../../../core/models/api/employee.model";
import {
  updateBusinessSaleBusinessId,
  updateBusinessSaleDoneBy,
  updateBusinessSaleFound,
  updateBusinessSaleMachines,
  updateBusinessSaleName,
  updateBusinessSaleTotal,
  updateBusinessSaleWorkers,
} from "../../../../../../../core/states/actions/businessFinalSaleActions";
import { allowedRole } from "../../../../../../../core/utilities/helpers/allowedRole.util";
import { formatDateToString } from "../../../../../../../core/utilities/helpers/dateFormat";
import { useBusinessReportContext } from "../../../context/useBusinessReportContext";
import { LoadingCircularProgress } from "../../../../../../../components/common/ui/loaders/LoadingCircularProgress";
import {
  filterEmployeesReadyToWork,
  getTotalSalaryFromEmployees,
} from "../../../../../../../core/utilities/helpers/globals";

enum ERegisterType {
  INDIVIDUAL = "individual",
  GENERAL = "general",
}

const SaleResumeZodSchema = z
  .object({
    total: z.string(),
    found: z.string().optional(),
    machines: z.array(z.number()).min(1, "Selecciona al menos una maquina"),
    workers: z
      .array(z.custom<EmployeeModel>())
      .min(1, "Selecciona al menos un trabajador"),
    registerType: z.nativeEnum(ERegisterType),
  })
  .refine((data) => parseInt(data.total) > 0, {
    message: "El total debe ser mayor a 0",
    path: ["total"],
  });

type TSaleResume = z.infer<typeof SaleResumeZodSchema>;

export const SaleResume = () => {
  const { selectedTheme } = useThemeContext();
  const { role, user } = useAuthContext();
  const { business } = useBusinessContext();
  const { employees, loadingEmployees } = useEmployees();
  const [loading, setLoading] = useState(false);
  const { dispatch, businessSale, nextSection, machinesAlreadySelected } =
    useBusinessReportContext();

  const defaultRegisterType =
    businessSale.machines?.length === business.machines?.length
      ? ERegisterType.GENERAL
      : ERegisterType.INDIVIDUAL;

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TSaleResume>({
    resolver: zodResolver(SaleResumeZodSchema),
    mode: "all",
    defaultValues: {
      total: businessSale.total.toString(),
      found: businessSale.found?.toString(),
      machines: businessSale.machines || [],
      workers: businessSale.workers || [],
      registerType: defaultRegisterType,
    },
  });

  const registerTypeWatch = watch("registerType");
  const totalWatch = watch("total");
  const debtsWatch = watch("found");

  const handleSelectEmployee = (employeeId: string) => {
    const employee = filterEmployeesReadyToWork(employees).find(
      (e) => e.id === employeeId
    );
    if (employee) {
      const currentWorkers = [...(control._formValues.workers || [])];
      const workerIndex = currentWorkers.findIndex((w) => w.id === employee.id);

      if (workerIndex >= 0) {
        currentWorkers.splice(workerIndex, 1);
      } else {
        currentWorkers.push(employee);
      }

      setValue("workers", currentWorkers, { shouldValidate: true });

      dispatch(updateBusinessSaleWorkers(currentWorkers));
      dispatch(updateBusinessSaleTotal(Number(totalWatch)));
      dispatch(updateBusinessSaleFound(Number(debtsWatch)));
    }
  };

  const createReportName = () => {
    if (registerTypeWatch === ERegisterType.INDIVIDUAL) {
      return `Individual ${formatDateToString(new Date())}`;
    } else {
      return `General ${formatDateToString(new Date())}`;
    }
  };

  const onSubmit = (data: TSaleResume) => {
    setLoading(true);

    const totalSalary = getTotalSalaryFromEmployees(
      Number(data.total),
      data.workers
    );
    console.log(totalSalary);

    dispatch(updateBusinessSaleMachines(data.machines));
    dispatch(updateBusinessSaleWorkers(data.workers));
    dispatch(updateBusinessSaleTotal(Number(data.total)));
    dispatch(updateBusinessSaleFound(Number(data.found)));
    dispatch(updateBusinessSaleDoneBy(user!.id as number));
    dispatch(updateBusinessSaleBusinessId(business.id as number));
    dispatch(updateBusinessSaleName(createReportName()));

    setLoading(false);
    nextSection();
  };

  useEffect(() => {
    if (registerTypeWatch === ERegisterType.INDIVIDUAL) {
      setValue("machines", []);
    } else {
      setValue("machines", business.machines?.map((m) => m.id as number) ?? []);
    }
  }, [registerTypeWatch, setValue, business.machines]);

  return (
    <>
      <LoadingCircularProgress loading={loading || loadingEmployees} />
      <Box
        sx={{
          marginBottom: 2,
          width: "100%",
          maxWidth: 500,
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
            <Controller
              name="registerType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  value={field.value}
                  onChange={field.onChange}
                  name="row-radio-buttons-group"
                  row
                >
                  <FormControlLabel
                    value={ERegisterType.GENERAL}
                    control={
                      <Radio
                        sx={{
                          color: selectedTheme.text_color,
                          "&.Mui-checked": {
                            color: selectedTheme.secondary_color,
                          },
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
                          "&.Mui-checked": {
                            color: selectedTheme.secondary_color,
                          },
                        }}
                      />
                    }
                    label="Individual"
                  />
                </RadioGroup>
              )}
            />
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
                      disabled={registerTypeWatch === ERegisterType.GENERAL}
                      value={field.value || []}
                      inputProps={{ "aria-label": "Without label" }}
                      error={!!errors.machines}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        if (allowedRole(role, [ERole.ADMIN, ERole.OWNER])) {
                          field.onChange(selectedValue);
                          dispatch(
                            updateBusinessSaleMachines(
                              selectedValue as number[]
                            )
                          );
                        } else {
                          const newValue = [selectedValue].flat();
                          field.onChange(newValue);
                          dispatch(
                            updateBusinessSaleMachines(newValue as number[])
                          );
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        Seleccionar
                      </MenuItem>
                      {business.machines
                        ?.filter(
                          (machine) =>
                            !machinesAlreadySelected().includes(machine.id)
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
                helperText={errors.found?.message || `Ayer ${300}`}
                startAdornment="$"
                small
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" sx={{ color: selectedTheme.text_color }}>
              Trabajadores
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: darken(selectedTheme.text_color, 0.3),
                fontSize: "0.8rem",
              }}
            >
              Nota: Solo aparecerán los trabajadores activos y con algún tipo de
              salario asignado
            </Typography>
            <FormControl error={!!errors.workers} fullWidth>
              <Grid container spacing={2}>
                {filterEmployeesReadyToWork(employees).map((employee) => (
                  <Grid
                    key={employee.id}
                    size={{ xs: 12, sm: 6 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      padding: 1,
                      borderRadius: 1,
                      backgroundColor: lighten(
                        selectedTheme.background_color,
                        0.1
                      ),
                      color: selectedTheme.text_color,
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: selectedTheme.secondary_color,
                      }}
                      alt={employee.user.name}
                    >
                      {employee.user.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body2">
                      {employee.user.name}
                    </Typography>
                    <Checkbox
                      checked={businessSale.workers.some(
                        (w) => w.id === employee.id
                      )}
                      onChange={() => handleSelectEmployee(employee.id)}
                      sx={{
                        padding: 0,
                        color: selectedTheme.text_color,
                        "&.Mui-checked": {
                          color: selectedTheme.secondary_color,
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              {errors.workers && (
                <FormHelperText>{errors.workers.message}</FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box
            sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="submit"
              size="small"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: darken(selectedTheme.secondary_color, 0.3),
              }}
            >
              {loading ? "Procesando..." : "Procesar"}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};
