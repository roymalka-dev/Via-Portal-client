/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  ListItemText,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IKanbanFilterOption } from "@/types/components.types/kanban.types";

interface FilterToolbarProps {
  filters: IKanbanFilterOption[] | any;
  onFilterChange: (filters: string[]) => void;
}

const KanbanFilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onFilterChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filterValue: string) => {
    const currentIndex = selectedFilters.indexOf(filterValue);
    const newFilters = [...selectedFilters];

    if (currentIndex === -1) {
      newFilters.push(filterValue);
    } else {
      newFilters.splice(currentIndex, 1);
    }

    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={() => setShowFilters(!showFilters)}>
        <FilterListIcon />
      </IconButton>
      {showFilters && (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
          <Typography variant="h6">Filters</Typography>
          {filters.map((filter: any) => (
            <FormControlLabel
              key={filter.value}
              control={
                <Checkbox
                  checked={selectedFilters.indexOf(filter.value) > -1}
                  onChange={() => handleFilterChange(filter.value)}
                  icon={
                    <Avatar
                      sx={{
                        bgcolor: filter.color,
                        width: 24,
                        height: 24,
                        mr: 1,
                      }}
                    >
                      {filter.avatar}
                    </Avatar>
                  }
                  checkedIcon={
                    <Avatar
                      sx={{
                        bgcolor: filter.color,
                        width: 24,
                        height: 24,
                        mr: 1,
                        opacity: 0.5,
                      }}
                    >
                      {filter.avatar}
                    </Avatar>
                  }
                />
              }
              label={<ListItemText primary={filter.name} />}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default KanbanFilterToolbar;
