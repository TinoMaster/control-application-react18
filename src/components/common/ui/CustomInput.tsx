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
  value?: string | number;
  required?: boolean;
  inputRef?: React.Ref<any>;
  isDarkModeStatic?: boolean;
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
  required = true,
  inputRef,
  isDarkModeStatic,
}: CustomInputProps) => {
  const { selectedTheme } = useThemeContext();

  if (!control) {
    return (
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        margin="normal"
        required={required}
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
              borderColor: isDarkModeStatic
                ? "#fff"
                : selectedTheme.text_color, // Color del borde normal
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
            style: {
              color: isDarkModeStatic ? "#fff" : selectedTheme.text_color,
            },
            required: required,
          },
          input: {
            style: {
              color: isDarkModeStatic ? "#fff" : selectedTheme.text_color,
            },
            startAdornment: startAdornment && (
              <InputAdornment position="start">
                <Typography
                  sx={{ color: isDarkModeStatic ? "#fff" : selectedTheme.text_color }}
                >
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
        inputRef={inputRef}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
          required={required}
          type={type}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          size={small ? "small" : "medium"}
          sx={{
            margin: "0",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: isDarkModeStatic ? "#fff" : selectedTheme.text_color, // Color del borde normal
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
              style: { color: isDarkModeStatic ? "#fff" : selectedTheme.text_color },
            },
            input: {
              style: { color: isDarkModeStatic ? "#fff" : selectedTheme.text_color },
              startAdornment: startAdornment && (
                <InputAdornment position="start">
                  <Typography sx={{ color: isDarkModeStatic ? "#fff" : selectedTheme.text_color }}>
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
          inputRef={ref}
        />
      )}
    />
  );
};

export default CustomInput;
