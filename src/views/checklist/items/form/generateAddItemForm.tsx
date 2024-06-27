/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ApiService from "@/services/ApiService";
import { RequestType } from "@/types/components.types/form.types";
import { FormStepper } from "@/components/common/form/FormStepper";

interface GenerateAddItemFormParams {
  navigate: ReturnType<typeof useNavigate>;
  modal: any;
  addItemFormTabs: any;
  toastConfig: any;
  refetch: () => void;
}

export const generateAddItemForm = ({
  modal,
  addItemFormTabs,
  refetch,
}: GenerateAddItemFormParams) => {
  const submitApp = async (app: RequestType) => {
    const itemToAdd = { ...app };
    const response = await ApiService.post(`checklist/add-item`, itemToAdd);
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
        Add Item
      </Typography>
      <FormStepper
        tabs={addItemFormTabs}
        submit={submitApp}
        submitTitle="Add"
        useCache={false}
      />
    </Box>
  );
};
