/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import ApiService from "@/services/ApiService"; // Adjust the import according to your project structure
import { FormStepper } from "@/components/common/form/FormStepper";
import { RequestType } from "@/types/components.types/form.types";

interface GenerateEditItemFormParams {
  id: string;
  modal: any;
  editItemFormTabs: any;
  selectedEditItem: any;
  refetch: () => void;
}

export const generateEditItemForm = ({
  id,
  modal,
  editItemFormTabs,
  selectedEditItem,
  refetch,
}: GenerateEditItemFormParams) => {
  const submitItem = async (item: RequestType) => {
    const itemToEdit = { id, ...item };
    const response = await ApiService.put(
      `checklist/edit-item/${item.id}`,
      itemToEdit
    );
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
        Edit Item {selectedEditItem?.name}
      </Typography>
      <FormStepper
        tabs={editItemFormTabs}
        submit={submitItem}
        useCache={false}
      />
    </Box>
  );
};
