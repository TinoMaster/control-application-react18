import { Typography } from "@mui/material";

export const KeyValueItem = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Typography
      variant="body1"
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <span style={{ fontWeight: "bold" }}>{title}: </span>
      <span>{value}</span>
    </Typography>
  );
};
