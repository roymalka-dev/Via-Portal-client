import { FormStepper } from "@/components/common/form/FormStepper";
import { RequestType } from "@/types/components.types/form.types";
import { IRule } from "@/types/data.types/rule.types";
import { Box, Typography } from "@mui/material";
import { travelLogicformTabs } from "../form/form.tabs";
import { generateTestPlanXLSX } from "../utils/generateTestPlanXLSX";

const TravelLogicCreatePage = () => {
  const submitRequest = async (request: RequestType) => {
    // Extract the necessary data from the form submission
    const rules = request.rules as IRule[];
    const polygons = request.polygons as string[];
    const tags = request.tags as string[];

    if (Array.isArray(rules) && Array.isArray(polygons)) {
      generateTestPlanXLSX(rules, polygons, tags);
    } else {
      console.log("Invalid form data:", { rules, polygons, tags });
      alert("Invalid form data. Please try again.");
    }
  };

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
          TraveLogic Test Plan Generator
        </Typography>
      </Box>

      <FormStepper
        tabs={travelLogicformTabs}
        submit={submitRequest}
        submitTitle="Generate"
        useCache={true}
      />
    </Box>
  );
};

export default TravelLogicCreatePage;
