import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  lighten,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "../../../core/context/use/useThemeContext";
import CustomInput from "../ui/CustomInput";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const keyValueSchema = z.object({
  key: z.string().min(1, "El campo es requerido"),
  value: z.string().min(1, "El campo es requerido"),
});

type TKeyValue = z.infer<typeof keyValueSchema>;

const defaultKeyValue: TKeyValue = {
  key: "",
  value: "",
};

interface KeyValuePair {
  key: string;
  value: string;
}

interface KeyValueAdderProps {
  defaultPairs?: KeyValuePair[];
  onChange?: (pairs: KeyValuePair[]) => void;
  buttonLabel?: string;
  small?: boolean;
}

export const KeyValueAdder = ({
  defaultPairs = [],
  onChange,
  buttonLabel,
  small,
}: KeyValueAdderProps) => {
  const { selectedTheme } = useThemeContext();
  const [pairs, setPairs] = useState<KeyValuePair[]>(defaultPairs);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<KeyValuePair>({
    resolver: zodResolver(keyValueSchema),
    defaultValues: defaultKeyValue,
  });

  const onSubmit: SubmitHandler<KeyValuePair> = (data) => {
    const newPairs = [...pairs, data];
    setPairs(newPairs);
    onChange?.(newPairs);
  };

  const removePair = (index: number) => {
    const updatedPairs = pairs.filter((_, i) => i !== index);
    setPairs(updatedPairs);
    onChange?.(updatedPairs);
  };

  return (
    <Box>
      {/* Lista de pares clave-valor */}
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 2 }}
      >
        {pairs.map((pair, index) => (
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
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {pair.key}: {pair.value}
            </Typography>
            <IconButton color="error" onClick={() => removePair(index)}>
              <Delete />
            </IconButton>
          </Box>
        ))}
      </Box>
      {/* Inputs para Key y Value */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
          <CustomInput
            name="key"
            label="Key"
            type="text"
            control={control}
            error={!!errors.key}
            helperText={errors.key?.message}
            small={small}
          />
          <CustomInput
            name="value"
            label="Value"
            type="text"
            control={control}
            error={!!errors.value}
            helperText={errors.value?.message}
            small={small}
          />
        </Stack>
        {/* Botón para agregar pares */}
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: selectedTheme.primary_color }}
        >
          {buttonLabel || "Agregar"}
        </Button>
      </form>
    </Box>
  );
};
