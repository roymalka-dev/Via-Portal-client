/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  useTheme,
  MenuItem,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import useFetch from "@/hooks/useFetch";
import ApiService from "@/services/ApiService";
import { debounce } from "lodash";

import {
  compareByNameAsc,
  compareByNameDesc,
  compareByExist,
  compareByNotExist,
  filterItems,
} from "./SortAndFilter";

interface Item {
  _id: string;
  name: string;
  description: string;
}

interface EditExecutionProps {
  id: string;
  close: () => void;
  reload: () => void;
}

const EditExecution: React.FC<EditExecutionProps> = ({ id, reload }) => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [existingItems, setExistingItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("exist");
  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(
    null
  );
  const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const { data, status, error, refetch } = useFetch<any>(
    `execution/get-edit-execution-items/${id}`
  );

  useEffect(() => {
    if (error) {
      console.log("Error: ", error);
    }
    if (status === "success" && data) {
      setAllItems(data.allItems);
      setExistingItems(data.existIds);
      setLoading(false);
    }
  }, [data, status, error]);

  const handleAdd = async (itemId: string) => {
    await ApiService.post(`execution/add-item-to-execution`, {
      executionId: id,
      itemId: itemId,
    });
    setLoading(true);
    reload();
    refetch();
  };

  const handleRemove = async (itemId: string) => {
    console.log("Removing item: ", itemId, id);
    await ApiService.post(`execution/remove-item-from-execution`, {
      executionId: id,
      itemId: itemId,
    });
    setLoading(true);
    reload();
    refetch();
  };

  const isItemInExisting = useCallback(
    (id: string) => {
      return existingItems.some((item) => item === id);
    },
    [existingItems]
  );

  const debouncedSearchChange = useCallback(
    debounce((query: string) => {
      setQuery(query);
    }, 300),
    []
  );

  const handleSearch = (query: string) => {
    debouncedSearchChange(query);
  };

  const applyFilterAndSort = useCallback(() => {
    setIsProcessing(true);
    let items = filterItems(allItems, query, filterBy, isItemInExisting);

    switch (sortBy) {
      case "name-asc":
        items = items.sort(compareByNameAsc);
        break;
      case "name-desc":
        items = items.sort(compareByNameDesc);
        break;
      case "exist":
        items = items.sort(compareByExist(isItemInExisting));
        break;
      case "notExist":
        items = items.sort(compareByNotExist(isItemInExisting));
        break;
      default:
        break;
    }

    setFilteredItems(items);
    setIsProcessing(false);
  }, [allItems, query, filterBy, sortBy, isItemInExisting]);

  useEffect(() => {
    applyFilterAndSort();
  }, [
    query,
    allItems,
    filterBy,
    sortBy,
    existingItems,
    isItemInExisting,
    applyFilterAndSort,
  ]);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorElFilter(null);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSort(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorElSort(null);
  };

  const handleFilterChange = (value: string) => {
    setFilterBy(value);
    handleFilterClose();
    applyFilterAndSort();
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    handleSortClose();
    applyFilterAndSort();
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          backgroundColor: theme.palette.background.paper,
          zIndex: 100,
          p: 2,
          position: "sticky",
          top: 0,
        }}
      >
        <TextField
          placeholder="Search..."
          defaultValue={query}
          onChange={(e: { target: { value: string } }) =>
            handleSearch(e.target.value)
          }
          variant="outlined"
          size="small"
          sx={{ flex: 1, mr: 2 }}
        />
        <IconButton onClick={handleFilterClick}>
          <FilterAltIcon />
        </IconButton>
        <Popover
          open={Boolean(anchorElFilter)}
          anchorEl={anchorElFilter}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 1 }}>
            <MenuItem onClick={() => handleFilterChange("all")}>All</MenuItem>
            <MenuItem onClick={() => handleFilterChange("existing")}>
              Existing
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange("notExisting")}>
              Not Existing
            </MenuItem>
          </Box>
        </Popover>
        <IconButton onClick={handleSortClick}>
          <SortIcon />
        </IconButton>
        <Popover
          open={Boolean(anchorElSort)}
          anchorEl={anchorElSort}
          onClose={handleSortClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 1 }}>
            <MenuItem onClick={() => handleSortChange("name-asc")}>
              Name Asc
            </MenuItem>
            <MenuItem onClick={() => handleSortChange("name-desc")}>
              Name Desc
            </MenuItem>
            <MenuItem onClick={() => handleSortChange("exist")}>Exist</MenuItem>
            <MenuItem onClick={() => handleSortChange("notExist")}>
              Not Exist
            </MenuItem>
          </Box>
        </Popover>
      </Box>
      {isProcessing ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ flex: 1, overflowY: "auto", pb: 6 }}>
          {filteredItems.map((item) => (
            <Card key={item._id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
              <CardActions>
                {isItemInExisting(item._id) ? (
                  <IconButton onClick={() => handleRemove(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleAdd(item._id)}>
                    <AddIcon />
                  </IconButton>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EditExecution;
