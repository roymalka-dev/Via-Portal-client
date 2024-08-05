import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateBreaksConfigsPBTableData = (
  configurations: CityConfigurations
): TableData => {
  return {
    headline: `Breaks Configs - PB ${
      scopingBadges.upgradeTeam + " " + scopingBadges.mandatory
    }`,
    headers: ["Configuration", "Value"],
    rows: [
      [
        "End break early: should drivers be able to end their break manually early? Yes / no",
        configurations.enable_driver_breaks_control
          ? configurations.enable_driver_breaks_control.toString() +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Planned break - allow_driver_to_end_break: True/False",
        configurations.enable_driver_breaks_control
          ? configurations.enable_driver_breaks_control.toString() +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Planned break - auto_end_break_enabled: True/False",
        configurations.enable_driver_breaks_control
          ? configurations.enable_driver_breaks_control.toString() +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ] /*
      [
        "Planned break - Minimum Breaks Duration In Seconds",
        configurations.min_break_duration_in_seconds
          ? configurations.min_break_duration_in_seconds +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Planned break - Maximum Breaks Duration In Seconds",
        configurations.max_break_duration_in_seconds
          ? configurations.max_break_duration_in_seconds +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
    
      ["Planned break - Variability of break’s start time", ""],
      ["Planned break - Variability of break’s end time", ""],
      ["Planned break - Earliest time driver can start break", ""],
      ["Planned break - allow_driver_to_end_break", ""],
        */,

      [
        "Dynamic Breaks: Should Enable Dynamic Breaks",
        configurations.enable_dynamic_breaks
          ? configurations.enable_dynamic_breaks +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Dynamic Breaks: Shift Breaks Window Start Definition Parameters, In Minutes",
        "",
      ],
      [
        "Dynamic Breaks: Shift Breaks Window End Definition Parameters, In Minutes",
        "",
      ],
      [
        "Spontaneous break: Should Enable Requesting A Spontaneous Break",
        configurations.enable_spontaneous_breaks_in_prebooking
          ? configurations.enable_spontaneous_breaks_in_prebooking +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      ["Spontaneous break: Spontaneous Break Duration In Minutes", ""],
      [
        "Spontaneous break: Spontaneous break search window length in minutes",
        "",
      ],
      [
        "Spontaneous break: Enables showing indicators for spontaneous breaks requested by drivers in prebooking",
        "",
      ],
      ["Spontaneous break: Service view task break requested indication", ""],
    ],
  };
};
