import React, { useState } from "react";
import {
  Box,
  TextField,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
interface ControlPanelProps {
  onAddItem: (name: string) => void;
  onSearch: (query: string) => void;
}

const ChecklistItemsControlPanel: React.FC<ControlPanelProps> = ({
  onAddItem,
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleAddClick = () => {
    const name = "name";
    onAddItem(name);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 2,
      }}
    >
      <TextField
        value={query}
        onChange={handleSearchChange}
        label="Search"
        variant="outlined"
        sx={{ flexGrow: 1, marginRight: 2, maxWidth: 400 }}
      />

      <SpeedDial
        ariaLabel="SpeedDial example"
        direction="down"
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Add Item"
          onClick={handleAddClick}
        />
      </SpeedDial>
    </Box>
  );
};

export default ChecklistItemsControlPanel;
