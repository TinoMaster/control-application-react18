import { darken, InputAdornment, TextField, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

interface CustomInputProps {
  name: string;
  control?: Control<any>;
  label: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  small?: boolean;
  startAdornment?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const CustomInput = ({
  name,
  control,
  label,
  type = "text",
  placeholder,
  error,
  helperText,
  small,
  startAdornment,
  onChange,
  value,
}: CustomInputProps) => {
  const { selectedTheme } = useThemeContext();

  if (!control) {
    return (
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        size={small ? "small" : "medium"}
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
            startAdornment: startAdornment && (
              <InputAdornment position="start">
                <Typography sx={{ color: selectedTheme.text_color }}>
                  {startAdornment}
                </Typography>
              </InputAdornment>
            ),
          },
          formHelperText: {
            style: {
              color: error ? "red" : darken(selectedTheme.text_color, 0.3),
              fontSize: "0.8rem",
              fontWeight: "lighter",
            },
          },
        }}
      />
    );
  }

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
          size={small ? "small" : "medium"}
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
              startAdornment: startAdornment && (
                <InputAdornment position="start">
                  <Typography sx={{ color: selectedTheme.text_color }}>
                    {startAdornment}
                  </Typography>
                </InputAdornment>
              ),
            },
            formHelperText: {
              style: {
                color: error ? "red" : darken(selectedTheme.text_color, 0.3),
                fontSize: "0.8rem",
                fontWeight: "lighter",
              },
            },
          }}
        />
      )}
    />
  );
};

export default CustomInput;
