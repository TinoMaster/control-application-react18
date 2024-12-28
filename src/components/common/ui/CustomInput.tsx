import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

interface CustomInputProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

const CustomInput = ({
  name,
  control,
  label,
  type = "text",
  placeholder,
  error,
  helperText,
}: CustomInputProps) => {
  const { selectedTheme } = useThemeContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          type={type}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          sx={{
            margin: "0",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: selectedTheme.text_color, // Color del borde normal
              },
              "&:hover fieldset": {
                borderColor: selectedTheme.secondary_color, // Color del borde al pasar el mouse
              },
              "&.Mui-focused fieldset": {
                borderColor: selectedTheme.secondary_color, // Color del borde al enfocar
              },
            },
          }}
          slotProps={{
            inputLabel: {
              style: { color: selectedTheme.text_color || "white" },
            },
            input: {
              style: { color: selectedTheme.text_color || "white" },
            },
          }}
        />
      )}
    />
  );
};

export default CustomInput;
