/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { FormStepper, IFormInitialValues, ITab } from "form-stepper";
import { Box } from "@mui/material";
import { testExecTags } from "./tags";
import ApiService from "@/services/ApiService";

const tabs: ITab[] = [
  {
    name: "Test execution builder",
    fields: [
      {
        label: "Name",
        name: "name",
        type: "text",
        initialValues: "",
        validations: yup.string().required("Name is required"),
      },
      {
        label: "projectKey",
        name: "projectKey",
        type: "text",
        initialValues: "QAP",
        validations: yup.string().required("Name is required"),
      },
      {
        label: "parentIssueKey",
        name: "parentIssueKey",
        type: "text",
        initialValues: "",
        validations: yup.string().required("Name is required"),
        info: "The ID of the parent issue - set as the id of epic (ee: UPG-123)",
      },
      {
        label: "tags",
        name: "tags",
        type: "multi-select",
        initialValues: [],
        options: testExecTags,
        validations: yup.array().of(yup.string()),
      },
    ],
  },
];

const TestExecutionPage = () => {
  const handleSubmit = async (values: IFormInitialValues) => {
    try {
      const response = await ApiService.post(
        "jira/create-test-execution",
        values
      );

      if (response.status === 200) {
        console.log("Test execution created");
      } else {
        alert(response.message);
      }
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ width: "500px", textAlign: "center" }}>
        <FormStepper
          tabs={tabs}
          submitFunction={handleSubmit}
          submitText="Submit"
          nextText="Next"
          useCache={true}
        />
      </Box>
    </Box>
  );
};

export default TestExecutionPage;
