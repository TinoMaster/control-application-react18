import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface CustomInputProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  darkMode?: boolean;
}

const CustomInput = ({
  name,
  control,
  label,
  type = "text",
  placeholder,
  error,
  helperText,
  darkMode = false,
}: CustomInputProps) => {
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
                borderColor: darkMode ? "white" : "black", // Color del borde normal
              },
              "&:hover fieldset": {
                borderColor: "var(--primary-color)", // Color del borde al pasar el mouse
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary-light)", // Color del borde al enfocar
              },
            },
          }}
          slotProps={{
            inputLabel: {
              style: { color: darkMode ? "white" : "black" }, 
            },input: {
              style: { color: darkMode ? "white" : "black" },
            }
          }}
        />
      )}
    />
  );
};

export default CustomInput;
