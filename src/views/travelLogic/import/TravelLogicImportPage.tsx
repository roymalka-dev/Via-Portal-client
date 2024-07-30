/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import { FormStepper, IFormInitialValues, ITab } from "form-stepper";
import * as yup from "yup";
import { parse } from "papaparse"; // Install papaparse: npm install papaparse
import { generateTestPlanXLSX } from "../utils/generateTestPlanXLSX";
import { IRule } from "@/types/data.types/rule.types";

const TravelLogicImportPage = () => {
  const csvTravelLogicCreator = async (file: File) => {
    return new Promise<IRule[]>((resolve, reject) => {
      parse(file, {
        header: true,
        complete: (results) => {
          try {
            const rules = results.data.map((row: any) => ({
              polygon: row["Polygon"],
              allowedDropOffs: row["AllowedDropOffs"].split(","),
              tags: row["Tags"].split(","),
            }));
            resolve(rules);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  };

  const tabs: ITab[] = [
    {
      name: "",
      fields: [
        {
          label: "Name",
          name: "name",
          type: "text",
          validations: yup.string().required("Name is required"),
        },
        {
          label: "Logic",
          name: "logic",
          type: "file",
          validations: yup.mixed().required("Logic file is required"),
          info: "Upload the CSV table",
          fileUploadText: "Upload CSV file",
          fileRemoveText: "Remove CSV file",
        },
      ],
    },
  ];

  const handleSubmit = async (values: IFormInitialValues) => {
    try {
      const rules = await csvTravelLogicCreator(values.logic as File);
      const allPolygons = Array.from(
        new Set(
          rules.flatMap((rule) => [rule.polygon, ...rule.allowedDropOffs])
        )
      );
      const allTags = Array.from(new Set(rules.flatMap((rule) => rule.tags)));
      console.log(rules, allPolygons, allTags);
      await generateTestPlanXLSX(rules, allPolygons, allTags);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() =>
          window.open(
            "https://docs.google.com/spreadsheets/d/1NWwJnGX5tk8U8_24TpcEwTcLtHE3TWaU9iztxmtHew0/edit?gid=0#gid=0",
            "_blank"
          )
        }
      >
        Template
      </Button>
      <Box
        sx={{
          width: "700px",
          textAlign: "center",
        }}
      >
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

export default TravelLogicImportPage;
