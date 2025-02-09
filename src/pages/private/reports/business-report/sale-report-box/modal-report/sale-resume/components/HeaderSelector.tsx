import {
  darken,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { useThemeContext } from "../../../../../../../../core/context/use/useThemeContext";
import { ERole, TRole } from "../../../../../../../../core/models/api";
import { allowedRole } from "../../../../../../../../core/utilities/helpers/allowedRole.util";
import { ERegisterType, TSaleResume } from "../zod/saleResume.zodSchema";

interface Props {
  role: TRole;
  control: Control<TSaleResume>;
}

export const HeaderSelector = ({ role, control }: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <>
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
    </>
  );
};
