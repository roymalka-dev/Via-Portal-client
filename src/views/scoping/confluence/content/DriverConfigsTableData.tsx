/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateDriverConfigsTableData = (
  configurations: CityConfigurations
): TableData => {
  return {
    headline: `Driver Configs ${
      scopingBadges.upgradeTeam + " " + scopingBadges.mandatory
    }`,
    headers: ["Configuration", "Value"],
    rows: [
      [
        "Service type (Taas/ SaaS)",
        configurations.service_type
          ? configurations.service_type + " " + scopingBadges.generatedWithTool
          : "",
      ],
      ["I’m here configs", ""],
      [
        "max_distance_from_pickup_stop_point",
        configurations.max_distance_from_pickup_stop_point
          ? configurations.max_distance_from_pickup_stop_point +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "max_distance_from_dropoff_stop_point",
        configurations.max_distance_from_dropoff_stop_point
          ? configurations.max_distance_from_dropoff_stop_point +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Max_distance_from_stop_point",
        configurations.max_distance_from_stop_point
          ? configurations.max_distance_from_stop_point +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Max_distance_from_terminal_stop_point",
        configurations.max_distance_from_terminal_stop_point
          ? configurations.max_distance_from_terminal_stop_point +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "max_distance_from_break_terminal_stop_point",
        configurations.max_distance_from_break_terminal_stop_point
          ? configurations.max_distance_from_break_terminal_stop_point +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Nightly Logout And End Shift Via 2.0 Enabled",
        configurations.nightly_logout_end_shift_enabled
          ? configurations.nightly_logout_end_shift_enabled +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      ["IOS/Android/both", ""],
      ["Allowed Start Shift Earliness (Seconds)", ""],
      ["Allowed Start Shift Lateness (Seconds)", ""],
      ["Icons - concession", ""],
      ["Icons - rider types", ""],
    ],
  };
};
