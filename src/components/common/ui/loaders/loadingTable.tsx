import { Box, darken, Skeleton, Stack } from "@mui/material";
import React from "react";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";

interface LoadingTableProps {
  rows?: number;
  columns?: number;
  headerHeight?: number;
  rowHeight?: number;
}

export const LoadingTable: React.FC<LoadingTableProps> = ({
  rows = 5,
  columns = 4,
  headerHeight = 56,
  rowHeight = 52,
}) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* Header */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          p: 2,
          height: headerHeight,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: selectedTheme.background_color,
        }}
      >
        {Array(columns)
          .fill(0)
          .map(() => (
            <Skeleton
              key={`header-${crypto.randomUUID()}`}
              variant="rounded"
              width={`${100 / columns}%`}
              height={24}
              animation="wave"
              sx={{ bgcolor: darken(selectedTheme.background_color, 0.1) }}
            />
          ))}
      </Stack>

      {/* Rows */}
      {Array(rows)
        .fill(0)
        .map((_, rowIndex) => (
          <Stack
            key={`row-${crypto.randomUUID()}`}
            direction="row"
            spacing={2}
            sx={{
              p: 2,
              height: rowHeight,
              borderBottom: "1px solid",
              borderColor: "divider",
              bgcolor: selectedTheme.background_color,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            {Array(columns)
              .fill(0)
              .map((_, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  variant="rounded"
                  width={`${100 / columns}%`}
                  height={24}
                  animation="wave"
                  sx={{ bgcolor: darken(selectedTheme.background_color, 0.05) }}
                />
              ))}
          </Stack>
        ))}
    </Box>
  );
};
