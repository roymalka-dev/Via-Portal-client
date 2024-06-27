import React, { useState } from "react";
import {
  Avatar,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IKanbanFilterOption } from "@/types/components.types/kanban.types";
import { generateColorFromName, generateInitials } from "@/utils/avatar.utils";

interface FilterDropdownProps {
  filters: IKanbanFilterOption[];
  onFilterChange: (filters: string[]) => void;
}

const KanbanFilterDropdown: React.FC<FilterDropdownProps> = ({
  filters,
  onFilterChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedFilters(value);
    onFilterChange(value);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "250px",
          },
        }}
      >
        <FormControl sx={{ m: 2, width: "200px" }}>
          <InputLabel shrink={false}>Filter By Assignee</InputLabel>
          <Select
            multiple
            value={selectedFilters}
            onChange={handleFilterChange}
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {filters.map((filter) => (
              <MenuItem key={filter.value} value={filter.value}>
                <Checkbox
                  checked={selectedFilters.indexOf(filter.value) > -1}
                />
                <Avatar
                  sx={{
                    bgcolor: generateColorFromName(filter.value),
                    width: 24,
                    height: 24,
                    mr: 1,
                    opacity: 0.5,
                  }}
                >
                  {generateInitials(filter.value)}
                </Avatar>
                <ListItemText primary={filter.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Menu>
    </>
  );
};

export default KanbanFilterDropdown;
