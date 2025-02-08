import { Box, Card, CardContent, CardHeader, Skeleton, Stack } from "@mui/material";
import React from "react";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";

interface LoadingCardsProps {
  count?: number;
  width?: string | number;
  height?: string | number;
  avatarSize?: number;
  headerHeight?: number;
  contentRows?: number;
  gap?: number;
  direction?: "row" | "column";
  responsive?: boolean;
}

export const LoadingCards: React.FC<LoadingCardsProps> = ({
  count = 3,
  width = { xs: "95%", sm: "400px" },
  height,
  avatarSize = 56,
  headerHeight = 72,
  contentRows = 3,
  gap = 2,
  direction = "row",
  responsive = true,
}) => {
  const { selectedTheme } = useThemeContext();

  const SingleCardSkeleton = () => (
    <Card
      sx={{
        width: width,
        height: height,
        bgcolor: selectedTheme.background_color,
        mx: "auto",
      }}
    >
      <CardHeader
        sx={{ height: headerHeight }}
        avatar={
          <Skeleton
            variant="circular"
            width={avatarSize}
            height={avatarSize}
            animation="wave"
          />
        }
        title={
          <Skeleton
            variant="text"
            width="80%"
            height={24}
            animation="wave"
          />
        }
        subheader={
          <Skeleton
            variant="text"
            width="60%"
            height={20}
            animation="wave"
          />
        }
      />
      <CardContent>
        <Stack spacing={1}>
          {Array(contentRows)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={`content-${index}`}
                variant="text"
                width={`${100 - index * 10}%`}
                height={20}
                animation="wave"
              />
            ))}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        padding: "16px 0",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: gap,
        flexDirection: responsive
          ? { xs: "column", sm: direction }
          : direction,
      }}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SingleCardSkeleton key={`card-skeleton-${index}`} />
        ))}
    </Box>
  );
};
