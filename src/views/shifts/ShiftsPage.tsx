/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ApiService from "@/services/ApiService";

const validationSchema = Yup.object({
  startTime: Yup.date()
    .required("Start time is required")
    .max(Yup.ref("endTime"), "Start time must be before end time"),
  endTime: Yup.date()
    .required("End time is required")
    .min(Yup.ref("startTime"), "End time must be after start time")
    .test(
      "duration",
      "The time range must be at least one hour",
      function (value) {
        const startTime = new Date(this.parent.startTime);
        const endTime = new Date(value);
        return endTime.getTime() - startTime.getTime() >= 3600000; // 3600000 milliseconds = 1 hour
      }
    ),
});

const ShiftsPage = () => {
  const handleSendRequest = async (values: any, actions: any) => {
    const formattedStartTime = `${values.startTime}:10Z`;
    const formattedEndTime = `${values.endTime}:10Z`;
    actions.setSubmitting(true);
    try {
      const response = await ApiService.get(
        `shift/get-google-calendar-shifts?timeMin=${formattedStartTime}&timeMax=${formattedEndTime}`
      );
      const formattedResponse = formatResponse(response);
      actions.setStatus(
        `Hey everyone,
Our next 2.0 upgrade will take place on <date> for <tenant>-<id> TaaS/SaaS OD/PB city, starting at 06:30.
Tagging the shifts in case any issue will be raised, please approve your availability /reply with :+1::skin-tone-2: . Thanks a lot in advance!
Good luck! :viablueheart:\n\n` + formattedResponse
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      actions.setStatus("Failed to fetch data");
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formatResponse = (data: any) => {
    return Object.entries(data)
      .map(([category, shifts]) => {
        const allNames = Object.values(shifts as { [s: string]: unknown })
          .flat()
          .map((name) => `@ ${name}`)
          .join(", ");
        return `${category}: ${allNames}`;
      })
      .join("\n\n");
  };

  return (
    <Formik
      initialValues={{
        startTime: new Date().toISOString().slice(0, 16),
        endTime: new Date().toISOString().slice(0, 16),
      }}
      validationSchema={validationSchema}
      onSubmit={handleSendRequest}
    >
      {({ isSubmitting, status, touched, errors }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <Field
                as={TextField}
                type="datetime-local"
                name="startTime"
                label="Start Time"
                helperText={<ErrorMessage name="startTime" />}
                error={touched.startTime && !!errors.startTime}
                sx={{ width: 250 }}
              />
              <Field
                as={TextField}
                type="datetime-local"
                name="endTime"
                label="End Time"
                helperText={<ErrorMessage name="endTime" />}
                error={touched.endTime && !!errors.endTime}
                sx={{ width: 250 }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="outlined"
                disabled={isSubmitting}
                sx={{ my: 2, width: "auto", position: "relative" }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ position: "absolute" }} />
                ) : (
                  "Fetch Shifts"
                )}
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard
                    .writeText(status)
                    .then(() => console.log("Copied to clipboard"))
                    .catch((error) =>
                      console.error("Error copying text: ", error)
                    );
                }}
                variant="outlined"
                disabled={!status || status === "Failed to fetch data"} // Disable if no status or on fetch error
                sx={{ my: 2, width: "auto" }}
              >
                Copy to Clipboard
              </Button>
            </Box>
            <TextField
              label="Response"
              multiline
              fullWidth
              disabled
              minRows={10}
              value={status || ""}
              variant="outlined"
              sx={{ width: "100%", minHeight: 300, mt: 2 }}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ShiftsPage;
