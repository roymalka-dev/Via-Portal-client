import { FormStepper } from "@/components/common/form/FormStepper";
import { RequestType } from "@/types/components.types/form.types";
import { Box, Typography } from "@mui/material";

import ApiService from "@/services/ApiService";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { IchecklistTag } from "@/types/data.types/checklist.types";
import { useEffect, useState } from "react";
import useCreateExecTabs from "./form/useCreateExecTabs";

const ChecklistCreateExecPage = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<IchecklistTag[] | undefined>(undefined);

  const { data, status, error } = useFetch<IchecklistTag[]>(
    "/checklist/get-all-tags"
  );

  useEffect(() => {
    if (status === "success" && data) {
      setTags(data);
    }
    if (status === "error") {
      console.error(error);
    }
  }, [data, status, error]);

  const submitRequest = async (request: RequestType) => {
    try {
      const res = await ApiService.post("/execution/create-execution", request);
      navigate(`/checklist/execution/${res.data.data}`);
    } catch (error) {
      console.error(error);
    }
  };

  const createExecTabs = useCreateExecTabs(tags);

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mb: 10,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Create Checklist Execution
        </Typography>
      </Box>

      <FormStepper
        tabs={createExecTabs}
        submit={submitRequest}
        submitTitle="Generate"
        useCache={false}
      />
    </Box>
  );
};

export default ChecklistCreateExecPage;
