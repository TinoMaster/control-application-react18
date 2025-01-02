import { Box, CircularProgress, Modal } from "@mui/material";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

interface Props {
  loading: boolean;
}

export const LoadingCircularProgress = ({ loading }: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Modal open={loading} disablePortal>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress sx={{ color: selectedTheme.primary_color }} />
      </Box>
    </Modal>
  );
};
