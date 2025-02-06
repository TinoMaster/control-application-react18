import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

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
        }}
      >
        {Array(columns)
          .fill(0)
          .map((_) => (
            <Skeleton
              key={`header-${crypto.randomUUID()}`}
              variant="rounded"
              width={`${100 / columns}%`}
              height={24}
              animation="wave"
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
                />
              ))}
          </Stack>
        ))}
    </Box>
  );
};
