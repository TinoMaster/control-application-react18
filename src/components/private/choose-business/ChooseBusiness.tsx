import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BusinessModel } from "../../../core/models/api";

const ITEM_HEIGHT = 48;

interface Props {
  options: BusinessModel[];
  selectedId: number;
  onChangeBusiness: (id: number) => void;
}

export const ChooseBusiness = ({
  options,
  selectedId,
  onChangeBusiness,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickOption = (id: number) => {
    setAnchorEl(null);
    onChangeBusiness(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {options.map((business) => (
          <MenuItem
            key={business.id}
            selected={business.id === selectedId}
            onClick={() => handleClickOption(business.id || 0)}
          >
            {business.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
