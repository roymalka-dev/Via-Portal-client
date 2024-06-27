/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import FolderGrid from "./FolderGrid";
import ControlPanel from "./ControlPanel";
import BreadcrumbsComponent from "./BreadcrumbsComponent";
import { IFile, Ifolder } from "@/types/components.types/explorer.types";
import useModal from "@/hooks/useModal";
import useAddNewFolderTabs from "./hooks/useAddNewFolderTabs";
import { generateAddfFolderForm } from "./forms/generateAddFolderForm";
import { addItemHandler } from "@/views/checklist/items/utils/addItemHandler";
import { useNavigate } from "react-router-dom";
import { CustomModal } from "../modal/CustomModal";
import ApiService from "@/services/ApiService";
import useEditItemFormTabs from "./hooks/useEditItemTabs";
import { generateEditItemForm } from "./forms/generateEditItemForm";
import OrganizeComponent from "./OrganizeComponent";

interface FolderTreeProps {
  items: Array<Ifolder | IFile>;
  onFolderClick: (folder: Ifolder) => void;
  onFileClick: (file: IFile) => void;
  root: string;
  rootId: string;
  currentDirectoryId: string;
  loading?: boolean;
  error?: Error | null;
  refetch: () => void;
}

const FolderTree: React.FC<FolderTreeProps> = ({
  items,
  onFolderClick,
  onFileClick,
  root,
  loading = false,
  error = false,
  currentDirectoryId,
  refetch,
  rootId,
}) => {
  const navigate = useNavigate();
  const [displayedItems, setDisplayedItems] =
    useState<Array<Ifolder | IFile>>(items);
  const [query, setQuery] = useState<string>("");
  const [selectedEditItem, setSelectedEditItem] = useState<
    Ifolder | IFile | null
  >(null);

  const modal = useModal();

  const addFolderFormTabs = useAddNewFolderTabs(currentDirectoryId);

  const generateAddFolderFormCallback = useCallback(
    () =>
      generateAddfFolderForm({
        navigate,
        modal,
        addFolderFormTabs,
        refetch,
        toastConfig: null,
      }),
    [modal, navigate, refetch, addFolderFormTabs]
  );

  const editItemFormTabs = useEditItemFormTabs(selectedEditItem);

  const generateEditItemFormCallback = useCallback(
    () =>
      generateEditItemForm({
        id: selectedEditItem?._id || "",
        type: selectedEditItem?.type || "",
        modal,
        editItemFormTabs,
        selectedEditItem,
        refetch,
      }),
    [modal, selectedEditItem, refetch, editItemFormTabs]
  );

  const handleEditItem = (item: any) => {
    setSelectedEditItem(item);
  };

  useEffect(() => {
    if (selectedEditItem) {
      modal.setContent(() => generateEditItemFormCallback());
      modal.openModal();
    }

    return () => {
      setSelectedEditItem(null);
    };
  }, [selectedEditItem]);

  const handleAddDirectory = async () => {
    addItemHandler(modal, generateAddFolderFormCallback);
  };

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    setDisplayedItems(
      items.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, items]); // Add `items` to dependencies

  const handleDeleteItem = async (item: Ifolder | IFile) => {
    modal.setContent(
      <Box>
        <Typography variant="h6">
          {`Are you sure you want to delete this ${item.type}?`}
        </Typography>
        {item.type === "folder" && (
          <Typography variant="body2">
            Deleting this folder will also delete all subfolders and files.
          </Typography>
        )}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="outlined" onClick={modal.closeModal}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{ marginLeft: "8px" }}
            onClick={async () => {
              try {
                if (item.type === "folder") {
                  await ApiService.delete(
                    `explorer/remove-directory/${item._id}`
                  );
                } else {
                  await ApiService.delete(`explorer/remove-file/${item._id}`);
                }
                refetch(); // Refetch data after deletion
                modal.closeModal();
              } catch (error) {
                console.log("Error deleting item");
                modal.closeModal();
              }
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    );
    modal.openModal();
  };

  const handleOrganize = (item: Ifolder | IFile) => {
    const id = item.type === "file" ? item.folder : item.parentFolder;
    modal.setContent(<OrganizeComponent folderId={id} rootId={rootId} />);
    modal.openModal();
  };

  return (
    <Box>
      <ControlPanel onAddItem={handleAddDirectory} onSearch={handleSearch} />
      <BreadcrumbsComponent root={root} />

      {error && <Box>Error loading data</Box>}

      {loading ? (
        <Box
          sx={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <FolderGrid
          items={displayedItems}
          onFolderClick={onFolderClick}
          onFileClick={onFileClick}
          onDelete={handleDeleteItem}
          onEdit={(item) => handleEditItem(item)}
          onOrganize={(item) => handleOrganize(item)}
        />
      )}
      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </Box>
  );
};

export default FolderTree;
