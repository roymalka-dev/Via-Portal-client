import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateServiceHoursTableData = (
  configurations: CityConfigurations
): TableData => {
  return {
    headline: `Service Hours ${
      scopingBadges.acsa +
      " " +
      scopingBadges.upgradeTeam +
      " " +
      scopingBadges.mandatory
    }`,

    rows: [
      ["Monday", configurations.service_hours?.monday || ""],
      ["Tuesday", configurations.service_hours?.tuesday || ""],
      ["Wednesday", configurations.service_hours?.wednesday || ""],
      ["Thursday", configurations.service_hours?.thursday || ""],
      ["Friday", configurations.service_hours?.friday || ""],
      ["Saturday", configurations.service_hours?.saturday || ""],
      ["Sunday", configurations.service_hours?.sunday || ""],
      [
        `Time before end of service to book "depart at" rides ${scopingBadges.ps}`,
        configurations.time_before_end_of_service || "",
      ],
      [
        `Time after start of service to book "arrive by" rides ${scopingBadges.ps}`,
        configurations.time_after_end_of_service || "",
      ],
    ],
  };
};
