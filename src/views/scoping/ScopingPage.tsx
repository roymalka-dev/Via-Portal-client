/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormStepper, IFormInitialValues, ITab } from "form-stepper";
import * as yup from "yup";
import { csvConfigsInterpreter } from "./csvConfigsInterpreter";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ApiService from "@/services/ApiService";
import { convertCityData } from "./convertCityData";
import useModal from "@/hooks/useModal";
import { CustomModal } from "@/components/common/modal/CustomModal";
import { scopingConfigs } from "./configs";

import { generateFromTemplate } from "./confluence/generateFromTemplate";
import appConfig from "@/configs/app.config";

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
        label: "Confluence Template Page Id",
        name: "templatePageId",
        type: "text",
        initialValues: appConfig.env === "DEV" ? "8192175" : "3393258140",
        validations: yup.string().required(),
      },
      {
        label: "Confluence Parent Page Id",
        name: "parentPageId",
        type: "text",
        initialValues: appConfig.env === "DEV" ? "622595" : "2631565668",
        validations: yup.string().required(),
      },
      {
        label: "Confluence Space Key",
        name: "spaceKey",
        type: "text",
        initialValues: appConfig.env === "DEV" ? "SD" : "PLAT",
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
        `${appConfig.viaExplorerApi}/public/get-city-data/${values.city_id}`
      );
      const convertedCityData = convertCityData(cityData);
      const fileData = values.city_configurations;

      const content = generateFromTemplate(
        values.templatePageId as string,
        `${
          convertedCityData.city_short_code as string
        } 2.0 upgrade city scoping`,
        values.parentPageId as string,
        values.spaceKey as string,
        { ...convertedCityData, ...(fileData as any), ...values }
      );

      const response = await ApiService.post(
        "scoping/create-confluence-from-template",
        content
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

  const handleShowConfiglist = () => {
    modal.openModal();
    modal.setContent(
      <Box>
        <Typography variant="h6">Configurations List</Typography>
        <Box
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
            mt: 2,
          }}
        >
          <Typography>{scopingConfigs.join(",")}</Typography>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() =>
              navigator.clipboard.writeText(scopingConfigs.join(","))
            }
          >
            Copy List
          </Button>
          <Button onClick={() => modal.closeModal()}>Close</Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "700px",
          textAlign: "center",
        }}
      >
        <Button onClick={handleShowConfiglist}>
          Config Explorer Job Configs
        </Button>
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
    </Box>
  );
};

export default ScopingPage;
