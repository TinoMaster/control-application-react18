import {
  Box,
  Button,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  billCountSchema,
  defaultBillCount,
  TBillCount,
} from "../../../../../core/models/zod/billCount.zodSchema";
import { useEffect, useState } from "react";

const billKeys: (keyof TBillCount)[] = [
  "oneThousand",
  "fiveHundred",
  "twoHundred",
  "oneHundred",
  "fifty",
  "twenty",
  "ten",
  "five",
  "two",
  "one",
];

const billValues = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

export const CountBillBox = () => {
  const { selectedTheme: theme } = useThemeContext();
  const [total, setTotal] = useState(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TBillCount>({
    resolver: zodResolver(billCountSchema),
    defaultValues: defaultBillCount,
  });

  const watchFields = useWatch({ control });

  useEffect(() => {
    const calculateTotal = () => {
      let newTotal = 0;
      billKeys.forEach((key, index) => {
        const count = Number(watchFields[key]) || 0;
        newTotal += count * billValues[index];
      });
      setTotal(newTotal);
    };

    calculateTotal();
  }, [watchFields]);

  const onSubmit = (data: TBillCount) => console.log(data);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "660px",
        minHeight: "420px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        boxShadow: `0 0 70px 10px ${theme.secondary_color}15`,
      }}
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          align="center"
          sx={{
            padding: "12px",
            backgroundColor: theme.secondary_color,
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px 8px 0 0",
          }}
        >
          Desglose
        </Typography>

        <Grid
          container
          spacing={2}
          rowGap={{ xs: 2, sm: 5 }}
          sx={{
            padding: "10px",
            backgroundColor: theme.background_color,
          }}
        >
          {billKeys.map((bill, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={bill}>
              <CustomInput
                label={`$${billValues[index]}`}
                type="number"
                name={bill}
                control={control}
                error={!!errors[bill]}
                helperText={errors[bill]?.message}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTop: "1px solid",
            borderColor: theme.secondary_color,
            m: 1,
            padding: "10px",
          }}
        >
          <Button
            variant="outlined"
            type="reset"
            onClick={() => reset(defaultBillCount)}
            sx={{
              width: "30%",
              color: theme.secondary_color,
              borderColor: theme.secondary_color,
            }}
          >
            Resetear
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "30%",
              color: "white",
              backgroundColor: theme.secondary_color,
            }}
          >
            Procesar
          </Button>
          <Controller
            name="total"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={total}
                label="Total"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                sx={{
                  width: "30%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.text_color, // Color del borde normal
                    },
                    "&:hover fieldset": {
                      borderColor: theme.text_color, // Color del borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.text_color, // Color del borde cuando está enfocado
                    },
                  },
                }}
                slotProps={{
                  inputLabel: {
                    style: { color: theme.text_color },
                  },
                  input: {
                    style: { color: theme.text_color },
                    readOnly: true,
                  },
                }}
              />
            )}
          />
        </Box>
      </form>
    </Box>
  );
};
