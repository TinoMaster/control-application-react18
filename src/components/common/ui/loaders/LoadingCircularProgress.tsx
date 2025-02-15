import { Box, CircularProgress, Modal } from "@mui/material";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";

interface Props {
  loading: boolean;
  absolute?: boolean;
}

export const LoadingCircularProgress = ({
  loading,
  absolute = false,
}: Props) => {
  const { selectedTheme } = useThemeContext();

  if (!absolute && selectedTheme) {
    return (
      <Modal
        open={loading}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress
          sx={{ color: selectedTheme.text_color ?? "inherit" }}
          data-testid="loading-circular-progress"
        />
      </Modal>
    );
  }

  return (
    <>
      {loading && (
        <Box
          data-testid="loading-circular-progress"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: selectedTheme.background_color,
            zIndex: 1000,
          }}
        >
          <CircularProgress
            sx={{ color: selectedTheme.secondary_color ?? "" }}
          />
        </Box>
      )}
    </>
  );
};
