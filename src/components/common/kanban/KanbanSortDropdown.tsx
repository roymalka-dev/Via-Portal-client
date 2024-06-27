import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { IKanbanSortOption } from "@/types/components.types/kanban.types";

interface SortDropdownProps {
  columnId: string;
  sorters: IKanbanSortOption[];
  onSortChange: (columnId: string, sortBy: string) => void;
}

const KanbanSortDropdown: React.FC<SortDropdownProps> = ({
  columnId,
  sorters,
  onSortChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <SortIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {sorters.map((sorter) => (
          <MenuItem
            key={sorter.value}
            onClick={() => onSortChange(columnId, sorter.value)}
          >
            {sorter.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default KanbanSortDropdown;
