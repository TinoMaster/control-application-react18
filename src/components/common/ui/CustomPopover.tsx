import { Box, Popover, Typography } from "@mui/material";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

interface Props {
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  message: string;
}

export const CustomPopover = ({ anchorEl, setAnchorEl, message }: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, backgroundColor: selectedTheme.background_color }}>
        <Typography sx={{ color: selectedTheme.text_color }}>
          {message}
        </Typography>
      </Box>
    </Popover>
  );
};
