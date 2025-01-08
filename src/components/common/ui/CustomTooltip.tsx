import React from "react";
import { Tooltip } from "@mui/material";

interface Props {
  message: string;
  children: React.ReactNode;
}

export const CustomTooltip = ({ message, children }: Props) => {
  return (
    <Tooltip title={message}>
      <span>{children}</span>
    </Tooltip>
  );
};
