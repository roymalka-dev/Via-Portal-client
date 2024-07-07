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
  Box,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IKanbanFilterOption } from "@/types/components.types/kanban.types";
import { generateColorFromName, generateInitials } from "@/utils/avatar.utils";

interface FilterDropdownProps {
  filters: IKanbanFilterOption;
  onFilterChange: (filters: { assignee: string[]; tags: string[] }) => void;
}

const KanbanFilterDropdown: React.FC<FilterDropdownProps> = ({
  filters,
  onFilterChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAssigneeChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedAssignees(value);
    onFilterChange({ assignee: value, tags: selectedTags });
  };

  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedTags(value);
    onFilterChange({ assignee: selectedAssignees, tags: value });
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
        <Box sx={{ p: 2 }}>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel>Filter By Assignee</InputLabel>
            <Select
              multiple
              value={selectedAssignees}
              onChange={handleAssigneeChange}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {filters?.assignee?.map((filter) => (
                <MenuItem key={filter.value} value={filter.value}>
                  <Checkbox
                    checked={selectedAssignees.indexOf(filter.value) > -1}
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
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>Filter By Tags</InputLabel>
            <Select
              multiple
              value={selectedTags}
              onChange={handleTagChange}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {filters?.tags?.map((filter) => (
                <MenuItem key={filter.value} value={filter.value}>
                  <Checkbox checked={selectedTags.indexOf(filter.value) > -1} />
                  <ListItemText primary={filter.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Menu>
    </>
  );
};

export default KanbanFilterDropdown;
