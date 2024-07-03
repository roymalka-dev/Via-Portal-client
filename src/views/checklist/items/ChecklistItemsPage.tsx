/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Pagination,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
} from "@mui/material";

import { IKanbanCardType } from "@/types/components.types/kanban.types";
import ExtendedKanbanCard from "@/components/common/kanban/ExtendedKanbanCard";
import useFetch from "@/hooks/useFetch";
import useModal from "@/hooks/useModal";
import { CustomModal } from "@/components/common/modal/CustomModal";
import useAddNewItemFormTabs from "./hooks/useAddNewItemTabs";
import { useNavigate } from "react-router-dom";
import { generateAddItemForm } from "./form/generateAddItemForm";
import { addItemHandler } from "./utils/addItemHandler";
import ApiService from "@/services/ApiService";
import useEditItemFormTabs from "./hooks/useEditItemTabs";
import { generateEditItemForm } from "./form/generateEditItemForm";
import ChecklistItemsControlPanel from "./ChecklistItemsControlPanel";
import { IchecklistTag } from "@/types/data.types/checklist.types";

import { FormStepper, IFormInitialValues, ITab } from "form-stepper";
import { convertCSVtoObject } from "@/utils/csv.utils";

const ChecklistItemsPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [presentedData, setPresentedData] = useState<IKanbanCardType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const [selectedEditItem, setSelectedEditItem] = useState<any>(null);

  const { data, status, error, refetch } = useFetch<{
    items: IKanbanCardType[];
    tags: IchecklistTag[];
  }>("/checklist/get-all-items");

  const modal = useModal();

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page whenever items per page change
    setAnchorEl(null); // Close the menu
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (status === "success" && data) {
      const filteredData = data.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPresentedData(
        filteredData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    }
  }, [data, status, currentPage, itemsPerPage, searchQuery]);

  const editItemFormTabs = useEditItemFormTabs(selectedEditItem, data?.tags);

  const generateEditItemFormCallback = useCallback(
    ({ id }: { id: string }) =>
      generateEditItemForm({
        id,
        modal,
        editItemFormTabs,
        selectedEditItem,
        refetch,
      }),
    [modal, editItemFormTabs, selectedEditItem, refetch]
  );

  //Effect hook to open the modal for editing an item.
  useEffect(() => {
    if (selectedEditItem) {
      modal.setContent(() =>
        generateEditItemFormCallback({ id: selectedEditItem.id })
      );
      modal.openModal();
    }
  }, [selectedEditItem]);

  const addItemFormTabs = useAddNewItemFormTabs(data?.tags);

  const generateAddItemFormCallback = useCallback(
    () =>
      generateAddItemForm({
        navigate,
        modal,
        addItemFormTabs,
        refetch,
        toastConfig: null,
      }),
    [modal, navigate, addItemFormTabs, refetch]
  );

  const handleAddItem = () => {
    addItemHandler(modal, generateAddItemFormCallback);
  };

  const handleImportItems = () => {
    const uploader = async (file: File) => {
      try {
        return await convertCSVtoObject(file);
      } catch (error) {
        console.log("Error importing items: ", error);
        return null;
      }
    };
    const tabs: ITab[] = [
      {
        name: "Import Items",
        fields: [
          {
            name: "items",
            label: "File",
            type: "file",
            maxFileSize: 30 * 1000 * 1024, // 30MB

            fileUploader: uploader,
          },
        ],
      },
    ];

    const submitFunction = async (values: IFormInitialValues) => {
      try {
        await ApiService.post("/checklist/import-items", values);
      } catch (error) {
        console.error("Error importing items: ", error);
      }

      modal.closeModal();
    };

    modal.setContent(
      <FormStepper
        messageHandler={(message: string) => {
          alert(message);
        }}
        tabs={tabs}
        submitFunction={submitFunction}
        submitText={"Import"}
        useCache={true}
      />
    );

    modal.openModal();
  };

  const handleDeleteItem = (id: string) => {
    try {
      ApiService.delete(`/checklist/delete-item/${id}`);
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
    return true;
  };

  const handleEditItem = (item: any) => {
    setSelectedEditItem(item);
  };

  if (status === "loading") return <CircularProgress />;
  if (error) return <Alert severity="error">error</Alert>;

  const totalItems = data
    ? data.items?.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).length
    : 0;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Checklist Items
      </Typography>
      <ChecklistItemsControlPanel
        onImportItems={handleImportItems}
        onAddItem={handleAddItem}
        onSearch={setSearchQuery}
      />
      <Box>
        {presentedData.map((item) => (
          <ExtendedKanbanCard
            key={item._id}
            {...item}
            handleDelete={handleDeleteItem}
            handleEdit={handleEditItem}
            refetch={refetch}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            aria-controls="items-per-page-menu"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ textTransform: "none" }}
          >
            Showing {startItem}-{endItem} from {totalItems}
          </Button>
          <Menu
            id="items-per-page-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {[5, 10, 25, 100].map((option) => (
              <MenuItem
                key={option}
                selected={option === itemsPerPage}
                onClick={() => handleItemsPerPageChange(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </Box>
  );
};

export default ChecklistItemsPage;
