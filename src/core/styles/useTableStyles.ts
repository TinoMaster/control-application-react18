import { useMemo } from "react";
import { useThemeContext } from "../context/use/useThemeContext";
import { darken } from "@mui/material";

export const useTableStyles = () => {
  const { selectedTheme } = useThemeContext();

  return useMemo(
    () => ({
      cardStyle: {
        backgroundColor: selectedTheme.background_color,
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: `0 0 100px 5px ${selectedTheme.secondary_color}50, 0 0 5px 2px #00000015`,
      },
      tableContainerStyle: {
        backgroundColor: selectedTheme.background_color,
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: `0 0 100px 5px ${selectedTheme.secondary_color}50, 0 0 5px 2px #00000015`,
      },
      headerTableCellStyle: {
        color: selectedTheme.text_color,
        backgroundColor: selectedTheme.primary_color,
        padding: "12px 16px",
        border: "none",
        fontSize: "0.875rem",
        fontWeight: 600,
      },
      bodyTableRowStyle: {
        "&:hover": {
          backgroundColor: `${
            selectedTheme.background_color === "#fff"
              ? "rgba(0, 0, 0, 0.04)"
              : "rgba(255, 255, 255, 0.04)"
          }`,
        },
        transition: "background-color 0.2s ease",
      },
      bodyTableCellStyle: {
        color: selectedTheme.text_color,
        padding: "12px 16px",
        border: "none",
        fontSize: "0.775rem",
      },
      modalStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      buttonStyle: {
        borderRadius: "8px",
        backgroundColor: selectedTheme.primary_color,
        color: selectedTheme.text_color,
        "&:hover": {
          backgroundColor: darken(selectedTheme.primary_color, 0.3),
        },
      },
      buttonOutlineStyle: {
        borderRadius: "8px",
        color: selectedTheme.text_color,
        border: `1px solid ${selectedTheme.primary_color}`,
        "&:hover": {
          borderColor: darken(selectedTheme.primary_color, 0.3),
        },
      },
      iconButtonStyle: {
        color: selectedTheme.text_color,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        },
        marginRight: 1,
      },
      emptyInfoStyle: {
        textAlign: "center",
        color: selectedTheme.text_color,
        borderColor: selectedTheme.secondary_color,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "8px",
        fontSize: "0.875rem",
        boxShadow: `0 0 100px 5px ${selectedTheme.secondary_color}50, 0 0 5px 2px #00000015`,
        p: 1,
      },
      modalBlurStyle: {
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(4px)",
        },
      },
      modalBoxStyle: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "auto",
        minWidth: 350,
        backgroundColor: selectedTheme.background_color,
        color: selectedTheme.text_color,
        border: `2px solid ${selectedTheme.secondary_color}20`,
        borderRadius: 3,
        boxShadow: `0 0 300px 5px ${selectedTheme.secondary_color}50, 0 0 5px 2px #00000015`,
        p: 2,
      },
    }),
    [selectedTheme]
  );
};
