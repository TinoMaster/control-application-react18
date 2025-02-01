import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTableStyles } from "../../../../../../core/styles/useTableStyles";

interface Props {
  businessId: string;
  onDeleteBusiness?: (businessId: string) => void;
  canDelete: boolean;
}

export const ButtonDelete = ({
  businessId,
  onDeleteBusiness,
  canDelete,
}: Props) => {
  const { iconButtonStyle } = useTableStyles();

  return (
    <IconButton
      onClick={() => onDeleteBusiness?.(businessId)}
      disabled={!canDelete}
      sx={iconButtonStyle}
    >
      <DeleteIcon />
    </IconButton>
  );
};
