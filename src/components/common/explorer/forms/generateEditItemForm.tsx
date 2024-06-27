/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import ApiService from "@/services/ApiService"; // Adjust the import according to your project structure
import { FormStepper } from "@/components/common/form/FormStepper";
import { RequestType } from "@/types/components.types/form.types";

interface GenerateEditItemFormParams {
  id: string;
  type: string;
  modal: any;
  editItemFormTabs: any;
  selectedEditItem: any;
  refetch: () => void;
}

export const generateEditItemForm = ({
  id,
  type,
  modal,
  editItemFormTabs,
  selectedEditItem,
  refetch,
}: GenerateEditItemFormParams) => {
  const submitItem = async (item: RequestType) => {
    const itemToEdit = { id, ...item };

    let response;
    if (type === "file") {
      response = await ApiService.put(
        `explorer/edit-file/${item.id}`,
        itemToEdit
      );
    } else {
      response = await ApiService.put(
        `explorer/edit-folder/${item.id}`,
        itemToEdit
      );
    }

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
        Edit {selectedEditItem?.name} name
      </Typography>
      <FormStepper
        tabs={editItemFormTabs}
        submit={submitItem}
        useCache={false}
      />
    </Box>
  );
};
