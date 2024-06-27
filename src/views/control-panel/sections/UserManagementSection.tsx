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
import { IuserData } from "@/types/auth.types";
import { CustomModal } from "@/components/common/modal/CustomModal";
/**
 * Component for the Control Panel Users Page.
 * This page displays a table of users fetched from the server.
 * It provides functionality to view and edit user details.
 */
const UserManagementSection = () => {
  const [rows, setRows] = useState<TableDataType[]>([]);
  const [selectedEditUser, setSelectedEditUser] = useState<IuserData | null>(
    null
  );

  const { data, status, refetch } = useApi<TableDataType[]>(
    "user/get-all-users",
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
  const editUserFormTabs: TabConfig<RequestType>[] = useMemo(() => {
    return [
      {
        tabName: "",
        fields: [
          {
            name: "email",
            label: "Email",
            type: "text",
            initialValue: selectedEditUser?.email || "",
            validation: yup.string().email("Email is not valid").required(),
            disabled: true,
          },
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            initialValue: selectedEditUser?.firstName || "",
            validation: yup.string().min(3).max(50).required(),
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            initialValue: selectedEditUser?.lastName || "",
            validation: yup.string().min(3).max(50).required(),
          },
          {
            name: "authorizations",
            label: "Roles",
            type: "multi-select",
            options: ["USER", "ADMIN", "EXECUTER"],
            initialValue: selectedEditUser?.authorizations || [],
            validation: yup.array().min(0).of(yup.string().required()),
          },
        ],
      },
    ];
  }, [selectedEditUser]);

  /**
   * Function to generate the form for editing an item.
   */
  const generateEditUserForm = useCallback(
    ({ email }: { email: string }) => {
      const submitUser = async (user: RequestType) => {
        const userToEdit = { email, ...user };
        const response = await ApiService.put(`user/edit-user`, userToEdit);
        if (response.error) {
          console.error(response.error);
          return;
        } else {
          refetch();
        }

        modal.closeModal();
      };

      return (
        <Box>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            Edit {selectedEditUser?.email}
          </Typography>
          <FormStepper tabs={editUserFormTabs} submit={submitUser} />
        </Box>
      );
    },
    [modal, editUserFormTabs, selectedEditUser]
  );

  /**
   * Function to handle editing an item.
   */
  const editItemHandler = (row: tableRowsType) => {
    const user: IuserData = {
      email: row.email,
      firstName: row.firstName,
      lastName: row.lastName,
      authorizations: row.authorizations,
    };
    setSelectedEditUser(user);
  };

  /**
   * Effect hook to open the modal for editing an item.
   */
  useEffect(() => {
    if (selectedEditUser) {
      modal.setContent(() =>
        generateEditUserForm({ email: selectedEditUser.email })
      );
      modal.openModal();
    }
  }, [selectedEditUser]);

  const cols = [
    {
      name: "email",
      locale: "Email",
      render: (value: string) => (
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      ),
      comparator: comperators.string,
    },
    {
      name: "firstName",
      locale: "First Name",
      render: (value: string) => (
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      ),
      comparator: comperators.string,
    },
    {
      name: "lastName",
      locale: "Last Name",

      render: (value: string) => (
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      ),
      comparator: comperators.string,
    },
    {
      name: "authorizations",
      locale: "Role",
      render: (value: string[]) => (
        <Typography variant="body2" color="text.secondary">
          {value.join(", ")}
        </Typography>
      ),
      comparator: comperators.stringArray,
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
  ];

  const toolbar: (() => JSX.Element)[] = [];

  const tableData = tableDataGenerator({ rows, cols });
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" sx={{ mb: 2, ml: 3 }}>
        {"User Management"}
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

export default UserManagementSection;
