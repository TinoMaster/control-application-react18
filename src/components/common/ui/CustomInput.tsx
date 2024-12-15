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
                borderColor: "white", // Color del borde normal
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
              style: { color: "white" }, // Color del label
            },input: {
              style: { color: "white" },
            }
          }}
        />
      )}
    />
  );
};

export default CustomInput;
