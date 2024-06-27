/* eslint-disable react-hooks/exhaustive-deps */
import { FormStepper } from "@/components/common/form/FormStepper";
import CustomTable from "@/components/common/table/CustomTable";
import useApi from "@/hooks/useFetch";
import useModal from "@/hooks/useModal";
import ApiService from "@/services/ApiService";
import {
  TableDataType,
  tableRowsType,
} from "@/types/components.types/table.types";
import { TabConfig } from "@/types/components.types/form.types";
import { RequestType } from "@/types/components.types/form.types";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { comperators, tableDataGenerator } from "@/utils/table.utils";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";
import * as yup from "yup";
import { CustomModal } from "@/components/common/modal/CustomModal";
import { addItemHandler } from "@/views/checklist/items/utils/addItemHandler";
import { Add, Delete } from "@mui/icons-material";
import { IchecklistTag } from "@/types/data.types/checklist.types";
/**
 * Component for the Control Panel Users Page.
 * This page displays a table of users fetched from the server.
 * It provides functionality to view and edit user details.
 */

const ChecklistTagsSection = () => {
  const [rows, setRows] = useState<TableDataType[]>([]);
  const [selectedEditTag, setSelectedEditTag] = useState<IchecklistTag | null>(
    null
  );

  const { data, status, refetch } = useApi<TableDataType[]>(
    "checklist/get-all-tags",
    "GET"
  );

  /**
   * Effect hook to update table data on successful data fetch.
   */
  useEffect(() => {
    if (status === "success" && data) {
      setRows(data);
    }
  }, [status, data]);

  const modal = useModal();

  /**
   * Define form fields for editing an item.
   */
  const editTagFormTabs: TabConfig<RequestType>[] = useMemo(() => {
    return [
      {
        tabName: "",
        fields: [
          {
            name: "id",
            label: "ID",
            type: "text",
            initialValue: selectedEditTag?._id || "",
            validation: yup.string().required(),
            disabled: true,
          },
          {
            name: "name",
            label: "Tag Name",
            type: "text",
            initialValue: selectedEditTag?.name || "",
            validation: yup.string().min(3).max(50).required(),
          },
        ],
      },
    ];
  }, [selectedEditTag]);

  const addTagFormTabs: TabConfig<RequestType>[] = useMemo(() => {
    return [
      {
        tabName: "",
        fields: [
          {
            name: "name",
            label: "Tag Name",
            type: "text",
            initialValue: "",
            validation: yup.string().min(3).max(50).required(),
          },
        ],
      },
    ];
  }, []);

  const generateAddTagrForm = useCallback(() => {
    const submitTag = async (tag: RequestType) => {
      const response = await ApiService.post(`checklist/add-tag`, tag);
      if (response.error) {
        console.error(response.error);
        return;
      } else {
        console.log("User edited successfully");
        refetch();
      }

      modal.closeModal();
    };

    return (
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          Add new tag
        </Typography>
        <FormStepper tabs={addTagFormTabs} submit={submitTag} />
      </Box>
    );
  }, [modal, addTagFormTabs]);

  /**
   * Function to generate the form for editing an item.
   */
  const generateEditTagrForm = useCallback(
    ({ id }: { id: string }) => {
      const submitTag = async (tag: RequestType) => {
        const tagToEdit = { id, ...tag };
        const response = await ApiService.put(`tag/edit-tag`, tagToEdit);
        if (response.error) {
          console.error(response.error);
          return;
        } else {
          console.log("User edited successfully");
          refetch();
        }

        modal.closeModal();
      };

      return (
        <Box>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            Edit {selectedEditTag?.name}
          </Typography>
          <FormStepper tabs={editTagFormTabs} submit={submitTag} />
        </Box>
      );
    },
    [modal, editTagFormTabs, selectedEditTag]
  );

  /**
   * Function to handle editing an item.
   */
  const editItemHandler = (row: tableRowsType) => {
    const tag: IchecklistTag = {
      _id: row._id,
      name: row.name,
    };
    setSelectedEditTag(tag);
  };

  const deleteItemHandler = async (id: string) => {
    const confirmDelete = async (id: string) => {
      modal.closeModal();
      const response = await ApiService.delete("checklist/delete-tag/" + id);
      if (response.error) {
        console.error("Error deleting tag");
      } else {
        refetch();
      }
    };

    modal.openModal();
    modal.setContent(
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Are you sure you want to delete this tag?
        </Typography>
        <Button onClick={() => modal.closeModal()}>
          <Typography variant="body2">Cancel</Typography>
        </Button>
        <Button onClick={() => confirmDelete(id)}>
          <Typography variant="body2" style={{ color: "red" }}>
            Delete
          </Typography>
        </Button>
      </Box>
    );
  };

  const handleAddItem = () => {
    addItemHandler(modal, generateAddTagrForm);
  };

  /**
   * Effect hook to open the modal for editing an item.
   */
  useEffect(() => {
    if (selectedEditTag) {
      modal.setContent(() => generateEditTagrForm({ id: selectedEditTag._id }));
      modal.openModal();
    }
  }, [selectedEditTag]);

  const cols = [
    {
      name: "_id",
      locale: "ID",
      render: (value: string) => (
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      ),
      comparator: comperators.string,
    },
    {
      name: "name",
      locale: "Tag Name",
      render: (value: string) => (
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      ),
      comparator: comperators.string,
    },

    {
      name: "options-1",
      locale: "Edit",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => editItemHandler(row)}>
          <EditRoundedIcon />
        </Button>
      ),
    },
    {
      name: "options-2",
      locale: "Delete",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => deleteItemHandler(row._id)}>
          <Delete />
        </Button>
      ),
    },
  ];

  const addItemButton = () => (
    <Button variant="outlined" onClick={handleAddItem}>
      <Add />
    </Button>
  );

  const toolbar: (() => JSX.Element)[] = [addItemButton];

  const tableData = tableDataGenerator({ rows, cols });
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" sx={{ mb: 2, ml: 3 }}>
        {"Checklist Tags"}
      </Typography>
      <CustomTable
        data={tableData}
        loading={status === "loading"}
        toolbar={toolbar}
      />
      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </Box>
  );
};

export default ChecklistTagsSection;
