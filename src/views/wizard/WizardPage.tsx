/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import { FormStepper, IFormInitialValues, ITab } from "form-stepper";
import ProgressWizard from "@/components/common/wizards/ProgressWizard";
import useModal from "@/hooks/useModal";
import { CustomModal } from "@/components/common/modal/CustomModal";
import ApiService from "@/services/ApiService";
import { convertCityData } from "../scoping/convertCityData";
import { PageBuilder } from "../scoping/confluence/PageBuilder";
import { generateChecklistFromConfigFile } from "../checklist/create/utils/generateChecklistFromConfigFile";
import { scopingConfigs } from "../scoping/configs";
import { csvConfigsInterpreter } from "../scoping/csvConfigsInterpreter";
import { OTHER_CONFIGS } from "./configs";

const NODE_ENV = import.meta.env.VITE_APP_ENV || process.env.VITE_APP_ENV;
const VIA_EXPLORER_API =
  NODE_ENV === "DEV"
    ? "http://localhost:3001/api/v1"
    : import.meta.env.VITE_APP_VIA_EXPLORER_API ||
      process.env.VITE_APP_VIA_EXPLORER_API;

const tabs: ITab[] = [
  {
    name: "2p0 Pre-Upgrade Wizard",
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
        label: "Other Configurations",
        name: "other_configs",
        type: "checkbox",
        options: OTHER_CONFIGS,
        validations: yup.array().of(yup.string()),
        info: "Select one or more options",
      },
      {
        label: "Confluence Parent Page Id",
        name: "parentPageId",
        type: "text",
        initialValues: NODE_ENV === "DEV" ? "622595" : "2631565668",
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

const WizardPage: React.FC = () => {
  const [values, setValues] = useState<any>({});
  const [showWizard, setShowWizard] = useState(false);
  const [CSVConfigsFile, setCSVConfigsFile] = useState<any>(null);
  const [cityData, setCityData] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const modal = useModal();

  const handleSubmit = (values: IFormInitialValues) => {
    setValues(values);
    setShowWizard(true);
    modal.openModal();
  };

  const handleError = (stepDescription: string) => {
    setErrorMessage(
      (prevMessage) => `${prevMessage}\n${stepDescription} failed.`
    );
  };

  const handleSuccess = (message: string) => {
    setSuccessMessage((prevMessage) => `${prevMessage}\n${message}`);
  };

  const steps = [
    {
      key: "step1",
      description: "Trigger Jenkins City Check Job",
      action: async () => {
        return true;
        try {
          const { city_id } = values;
          const configs = scopingConfigs;
          const res = await ApiService.post("jenkins/city-check-job", {
            cityId: city_id,
            configs: configs,
          });

          if (res) {
            handleSuccess("Jenkins City Check Job triggered successfully.");
            return true;
          } else {
            handleError("Trigger Jenkins City Check Job");
            return false;
          }
        } catch (error: any) {
          console.log(error);
          handleError("Trigger Jenkins City Check Job");
          return false;
        }
      },
      delay: 0,
      required: false,
    },
    {
      key: "step2",
      description: "Get City Check CSV",
      action: async () => {
        try {
          const { city_id } = values;
          const res = await ApiService.post(`scoping/get-city-check-csv`, {
            cityId: city_id,
          });
          if (res) {
            setCSVConfigsFile(res);
            handleSuccess("City Check CSV retrieved successfully.");
            return true;
          } else {
            handleError("Get City Check CSV");
            return false;
          }
        } catch (error: any) {
          console.log(error);
          handleError("Get City Check CSV");
          return false;
        }
      },
      delay: 6000, // 60 seconds until Jenkins finishes
      required: true,
    },
    {
      key: "step3",
      description: "Get city data from via-explorer",
      action: async () => {
        try {
          const { city_id } = values;
          const cityData = await ApiService.get(
            `${VIA_EXPLORER_API}/public/get-city-data/${city_id}`
          );

          if (cityData) {
            setCityData(cityData);
            handleSuccess(
              "City data retrieved successfully from via-explorer."
            );
            return true;
          } else {
            handleError("Get city data from via-explorer");
            return false;
          }
        } catch (error: any) {
          console.log(error);
          handleError("Get city data from via-explorer");
          return false;
        }
      },
      delay: 0,
      required: true,
    },
    {
      key: "step4",
      description: "Build Confluence Page",
      action: async () => {
        try {
          const convertedCityData = convertCityData(cityData);
          const fileData = await csvConfigsInterpreter(CSVConfigsFile);

          const content = await PageBuilder({
            ...convertedCityData,
            ...(fileData as any),
            ...values,
          });
          const page = {
            type: "page",
            title: `${String(
              convertedCityData.city_short_code
            ).toUpperCase()} 2.0 upgrade city scoping`,
            parentPageId: values.parentPageId,
            spaceKey: values.spaceKey,
            content: content,
          };

          const res = await ApiService.post(
            "scoping/create-confluence-page",
            page
          );

          if (res) {
            const newPageUrl = `${res._links.base}${res._links.webui}`;
            handleSuccess(
              `Confluence page created successfully. View it at ${newPageUrl}`
            );
            return true;
          } else {
            handleError("Build Confluence Page");
            return false;
          }
        } catch (error: any) {
          console.log(error);
          handleError("Build Confluence Page");
          return false;
        }
      },
      delay: 0,
    },
    {
      key: "step5",
      description: "Create checklist execution",
      action: async () => {
        const configs = await csvConfigsInterpreter(CSVConfigsFile);
        const checklistName = `${cityData.data.env.toUpperCase()} ${
          cityData.data.id
        }`;
        try {
          const checklistData = await generateChecklistFromConfigFile(
            configs,
            cityData.data,
            checklistName,
            values.other_configs
          );

          const res = await ApiService.post(
            "execution/create-execution",
            checklistData
          );

          if (res) {
            const link = `/checklist/execution/${res.data.data}`;
            handleSuccess(
              `Checklist execution created successfully. View it at ${link}`
            );
            return true;
          } else {
            handleError("Create checklist execution");
            return false;
          }
        } catch (error: any) {
          console.log(error);
          handleError("Create checklist execution");
          return false;
        }
      },
      delay: 0,
      required: false,
    },
    {
      key: "step6",
      description: "Create travel logic test plan",
      action: async () => {
        handleSuccess(
          "Travel logic test plan creation is a placeholder and not implemented."
        );
        return false;
      },
      delay: 0,
      required: false,
    },
  ];

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
        <CustomModal
          open={modal.isOpen}
          handleClose={modal.closeModal}
          title="Progress"
        >
          {showWizard ? (
            <ProgressWizard
              actions={steps}
              successMessage={successMessage}
              errorMessage={errorMessage}
              onComplete={() => {
                modal.closeModal();
              }}
            />
          ) : (
            <Box>
              <Typography variant="h5">Initializing...</Typography>
              <CircularProgress />
            </Box>
          )}
        </CustomModal>
      </Box>
    </Box>
  );
};

export default WizardPage;
