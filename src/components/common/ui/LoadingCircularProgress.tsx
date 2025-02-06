import { Box, CircularProgress } from "@mui/material";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

interface Props {
  loading: boolean;
}

export const LoadingCircularProgress = ({ loading }: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <>
      {loading && (
        <Box
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
          <CircularProgress sx={{ color: selectedTheme.secondary_color ?? "" }} />
        </Box>
      )}
    </>
  );
};
