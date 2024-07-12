/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormStepper, IFormInitialValues, ITab } from "form-stepper";
import * as yup from "yup";
import { csvConfigsInterpreter } from "./csvConfigsInterpreter";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ApiService from "@/services/ApiService";
import { PageBuilder } from "./confluence/PageBuilder";
import { convertCityData } from "./convertCityData";
import useModal from "@/hooks/useModal";
import { CustomModal } from "@/components/common/modal/CustomModal";

const NODE_ENV = import.meta.env.VITE_APP_ENV || process.env.VITE_APP_ENV;
const VIA_EXPLORER_API =
  NODE_ENV === "DEV"
    ? "http://localhost:3001/api/v1"
    : import.meta.env.VITE_APP_VIA_EXPLORER_API ||
      process.env.VITE_APP_VIA_EXPLORER_API;

const tabs: ITab[] = [
  {
    name: "",
    fields: [
      {
        label: "City Id",
        name: "city_id",
        type: "number",
        initialValues: "",
        validations: yup
          .number()
          .min(0)
          .max(999)
          .required("City Id is required"),
      },
      {
        label: "Upgrade date",
        name: "date",
        type: "date",
        initialValues: new Date().toISOString().split("T")[0],
        validations: yup
          .date()
          .min(new Date(), "Date must be in the future")
          .required("Date field is required"),
      },
      {
        label: "City confluence overview",
        name: "city_overview_link",
        type: "text",
        validations: yup.string().url(),
      },
      {
        label: "Jira ticket",
        name: "jira_ticket",
        type: "text",
        validations: yup.string().url(),
      },
      {
        label: "City configurations file",
        name: "city_configurations",
        type: "file",
        validations: yup.mixed(),
        info: "Upload the csv table from the Jenkins job",
        fileUploadText: "Upload your file",
        fileRemoveText: "Remove the file",
        fileUploader: (file: File) => {
          return csvConfigsInterpreter(file);
        },
      },
      {
        label: "Confluence Parent Page Id",
        name: "parentPageId",
        type: "text",
        initialValues: NODE_ENV === "DEV" ? "622595" : "3340599297",
        validations: yup.string().required(),
      },
      {
        label: "Confluence Space Key",
        name: "spaceKey",
        type: "text",
        initialValues: NODE_ENV === "DEV" ? "SD" : "PLAT",
        validations: yup.string().required(),
      },
    ],
  },
];

const ScopingPage = () => {
  const modal = useModal();

  const handleSubmit = async (values: IFormInitialValues) => {
    try {
      modal.setContent(
        <Box>
          <Typography variant="h5">Creating Confluence page...</Typography>
          <CircularProgress />
        </Box>
      );
      modal.openModal();
      const cityData = await ApiService.get(
        `${VIA_EXPLORER_API}/public/get-city-data/${values.city_id}`
      );
      const convertedCityData = convertCityData(cityData);
      const fileData = values.city_configurations;

      const content = await PageBuilder({
        ...convertedCityData,
        ...(fileData as any),
        ...values,
      });
      const page = {
        title: `${String(
          convertedCityData.city_short_code
        ).toUpperCase()} 2.0 upgrade city scoping`,
        parentPageId: values.parentPageId,
        spaceKey: values.spaceKey,
        content: content,
      };
      const response = await ApiService.post(
        "scoping/create-confluence-page",
        page
      );

      if (response && response._links) {
        const newPageUrl = `${response._links.base}${response._links.webui}`;

        modal.setContent(
          <Box>
            <Typography variant="h5">
              Confluence page created successfully
            </Typography>
            <Button onClick={() => window.open(newPageUrl, "_blank")}>
              Go to Confluence Page
            </Button>
            <Button onClick={() => modal.closeModal()}>Close</Button>
          </Box>
        );
      } else {
        throw new Error("Failed to create Confluence page");
      }
    } catch (error: any) {
      console.error("Failed to submit form:", error);
      modal.setContent(
        <Box>
          <Typography variant="h5" color="error">
            Error creating Confluence page
          </Typography>
          <Typography variant="body1" color="error">
            {error.message || "An unknown error occurred"}
          </Typography>
          <Button onClick={() => modal.closeModal()}>Close</Button>
        </Box>
      );
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="h4">Scoping Page</Typography>
      </Box>
      <FormStepper
        tabs={tabs}
        submitFunction={handleSubmit}
        submitText="Submit"
        nextText="Next"
        useCache={true}
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

export default ScopingPage;
