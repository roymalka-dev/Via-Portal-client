import { logType } from "@/types/log.types";
import { Box, Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

import CustomTable from "@/components/common/table/CustomTable";
import { tableDataGenerator } from "@/utils/table.utils";
import { getControlPanelLogCols } from "./data/cols";
import LogDatePicker from "./table/LogDatePicker";
import RefreshIcon from "@mui/icons-material/Refresh";
import useFetch from "@/hooks/useFetch";
const ActivityMonitorSection = () => {
  const [logsDate, setLogsDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [rows, setRows] = useState<logType[]>([]);

  const { data, status, error, refetch } = useFetch<logType[]>(
    `logger/get-logs?date=${logsDate}`,
    "GET",
    undefined,
    [],
    false
  );

  // Effect hook to update table data and store state on successful data fetch or show error.
  useEffect(() => {
    if (status === "success" && data) {
      setRows(data);
    }
    if (error) {
      console.error(error);
    }
  }, [status, data, error, logsDate]);

  const cols = getControlPanelLogCols();

  const tableData = tableDataGenerator({ rows, cols });

  const handleDateChange = (date: string | null) => {
    if (!date) return;
    setLogsDate(date); // Set a default value for null
  };

  const datePicker = () => (
    <LogDatePicker logsDate={logsDate} handleDateChange={handleDateChange} />
  );

  const refetchLogsButton = () => {
    return (
      <Tooltip title={"Refetch Logs"}>
        <Button onClick={refetch}>
          <RefreshIcon />
        </Button>
      </Tooltip>
    );
  };

  const toolbar = [refetchLogsButton, datePicker];

  return (
    <Box>
      <CustomTable
        data={tableData}
        toolbar={toolbar}
        loading={status === "loading"}
      />
    </Box>
  );
};

export default ActivityMonitorSection;
