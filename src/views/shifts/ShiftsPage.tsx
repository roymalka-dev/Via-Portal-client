/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import ApiService from "@/services/ApiService";

const ShiftsPage: React.FC = () => {
  const [startTime, setStartTime] = useState<string>(
    new Date().toISOString().slice(0, 19)
  );
  const [endTime, setEndTime] = useState<string>(
    new Date().toISOString().slice(0, 19)
  );
  const [responseText, setResponseText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleSendRequest = async () => {
    const formattedStartTime = startTime + "Z";
    const formattedEndTime = endTime + "Z";
    setIsLoading(true);
    try {
      const response = await ApiService.get(
        `shift/get-google-calendar-shifts?timeMin=${formattedStartTime}&timeMax=${formattedEndTime}`
      );
      const formattedResponse = formatResponse(response);
      setResponseText(
        `Hey everyone,
Our next 2.0 upgrade will take place on <date> for <tenant>-<id> TaaS/SaaS OD/PB city, starting at 06:30.
Tagging the shifts in case any issue will be raised, please approve your availability /reply with :+1::skin-tone-2: . Thanks a lot in advance!
Good luck! :viablueheart:\n\n` + formattedResponse
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseText("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };
  const formatResponse = (data: any) => {
    return Object.entries(data)
      .map(([category, shifts]) => {
        // Flatten the names across all shifts in the category
        const allNames = Object.values(shifts as { [key: string]: string[] })
          .flat() // Flattens the array of names from all schedules
          .map((name) => `@ ${name}`) // Prefix each name with '@'
          .join(", ");
        return `${category}: ${allNames}`;
      })
      .join("\n\n");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(responseText).then(
      () => {
        alert("Copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          type="datetime-local"
          label="Start Time"
          value={startTime}
          onChange={handleStartTimeChange}
          sx={{ my: 2, width: 250 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="datetime-local"
          label="End Time"
          value={endTime}
          onChange={handleEndTimeChange}
          sx={{ my: 2, width: 250 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="outlined"
          onClick={handleSendRequest}
          sx={{ my: 2, position: "relative" }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ position: "absolute" }} />
          ) : (
            "Fetch Shifts"
          )}
        </Button>
      </Box>

      <TextField
        label="Response"
        multiline
        fullWidth
        disabled
        minRows={10}
        value={responseText}
        variant="outlined"
        sx={{ width: "100%", minHeight: 300, mt: 2 }}
      />
      <Button onClick={copyToClipboard} variant="outlined" sx={{}}>
        Copy to Clipboard
      </Button>
    </Box>
  );
};

export default ShiftsPage;
