/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { FormStepper, IFormInitialValues, useFormData } from "form-stepper";
import { getScopingTabs } from "./form.tabs";
import { useEffect, useState } from "react";
import ApiService from "@/services/ApiService";
import { PageBuilder } from "../confluence/PageBuilder";
import { csvConfigsInterpreter } from "../csvConfigsInterpreter";

const ScopingPage = () => {
  const { getFieldValue, setMultipleFieldValues } = useFormData();
  const [activeTab, setActiveTab] = useState(0);
  const [cityData, setCityData] = useState<any>(() => {
    const savedCityData = localStorage.getItem("city-data");
    return savedCityData ? JSON.parse(savedCityData) : null;
  });
  const [fileData, setFileData] = useState<any>(null);

  const handleSubmit = async (values: IFormInitialValues) => {
    const content = await PageBuilder(values);
    try {
      const page = {
        title: `${values.city_short_code} 2.0 upgrade city scoping`,
        parentPageId: "622595",
        spaceKey: "SD",
        content: content,
      };
      console.log("Confluence page:", page);
      const response = await ApiService.post(
        "scoping/create-confluence-page",
        page
      );

      console.log("Confluence page created:", response);
    } catch (error) {
      console.log("Failed to submit form:", error);
    }
    //ocalStorage.removeItem("city-data");
  };

  const messageHandler = (message: string) => {
    console.log(message);
  };

  const fetchCityData = async (id: string) => {
    try {
      const response = await ApiService.get(
        `http://localhost:3001/api/v1/public/get-city-data/${id}`
      );

      if (response.data === null) {
        console.log("City not found");
        return;
      } else {
        const data = {
          city_short_code: response.data.env || "",
          service_type: response.data.service_type || "",
          tenant_id: response.data.tenant || "",
          region: response.data.region || "",
          city: response.data.city || "",
          country: response.data.country || "",
          languages: response.data.languages || "",
          schedule_type: response.data.scheduleType || "",
          ps: response.data.ps || "",
          pso: response.data.pso || "",
          psm: response.data.psm || "",
          web_app: response.data.webAppLink || "",
          app_name: response.data.name || "",
          app_image: response.data.imageUrl || "",
          ios_link: response.data.iosLink || "",
          ios_version: response.data.iosVersion || "",
          android_link: response.data.androidLink || "",
          android_version: response.data.androidVersion || "",
        };
        setCityData(data);
        setMultipleFieldValues(data);
        localStorage.setItem("city-data", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Failed to fetch city data:", error);
    }
  };

  const fileUploader = async (file: File) => {
    const data = await csvConfigsInterpreter(file);
    setFileData(data);
  };

  useEffect(() => {
    const id = getFieldValue("city_id");
    if (activeTab === 2 && !cityData && id) {
      fetchCityData(String(id));
    }
  }, [activeTab]);

  useEffect(() => {
    const setData = async () => {
      if (fileData) {
        await setMultipleFieldValues(fileData);
      }
      if (cityData) {
        await setMultipleFieldValues(cityData);
      }
    };

    setData();
  }, [cityData, fileData]);

  const setStep = (step: number) => {
    setActiveTab(step);
  };

  const tabs = getScopingTabs(fileUploader);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <FormStepper
        tabs={tabs}
        submitFunction={handleSubmit}
        submitText="Submit"
        nextText="Next"
        useCache={true}
        messageHandler={messageHandler}
        getStep={setStep}
      />
    </Box>
  );
};

export default ScopingPage;
