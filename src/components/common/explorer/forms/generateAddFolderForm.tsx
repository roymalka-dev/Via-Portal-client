/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ApiService from "@/services/ApiService";
import { RequestType } from "@/types/components.types/form.types";
import { FormStepper } from "@/components/common/form/FormStepper";

interface GenerateAddItemFormParams {
  navigate: ReturnType<typeof useNavigate>;
  modal: any;
  addFolderFormTabs: any;
  toastConfig: any;
  refetch: () => void;
}

export const generateAddfFolderForm = ({
  modal,
  addFolderFormTabs,
  refetch,
}: GenerateAddItemFormParams) => {
  const submitFolder = async (folder: RequestType) => {
    const itemToAdd = { ...folder };
    const response = await ApiService.post(`explorer/add-directory`, itemToAdd);
    if (response.error) {
      return;
    } else {
      refetch();
    }

    modal.closeModal();
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        Add Folder
      </Typography>
      <FormStepper
        tabs={addFolderFormTabs}
        submit={submitFolder}
        submitTitle="Add"
        useCache={false}
      />
    </Box>
  );
};
