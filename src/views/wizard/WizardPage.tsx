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
import { generateChecklistFromConfigFile } from "../checklist/create/utils/generateChecklistFromConfigFile";
import { scopingConfigs } from "../scoping/configs";
import { csvConfigsInterpreter } from "../scoping/csvConfigsInterpreter";
import { OTHER_CONFIGS } from "./configs";
import appConfig from "@/configs/app.config";
import { generateFromTemplate } from "../scoping/confluence/generateFromTemplate";

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
        label: "Other Configurations",
        name: "other_configs",
        type: "checkbox",
        options: OTHER_CONFIGS,
        validations: yup.array().of(yup.string()),
        info: "Select one or more options",
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
      delay: 60000, // 60 seconds until Jenkins finishes
      required: true,
    },
    {
      key: "step3",
      description: "Get city data from via-explorer",
      action: async () => {
        try {
          const { city_id } = values;
          const cityData = await ApiService.get(
            `${appConfig.viaExplorerApi}/public/get-city-data/${city_id}`
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
          const content = generateFromTemplate(
            values.templatePageId as string,
            `${
              convertedCityData.city_short_code as string
            } 2.0 upgrade city scoping`,
            values.parentPageId as string,
            values.spaceKey as string,
            { ...convertedCityData, ...(fileData as any), ...values }
          );

          const res = await ApiService.post(
            "scoping/create-confluence-from-template",
            content
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
    {
      key: "step7",
      description: "buy masked numbers from planX",
      action: async () => {
        handleSuccess(
          "Buy masked numbers from planX is a placeholder and not implemented."
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
