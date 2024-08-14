/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";
import { isArray } from "lodash";

const dayMap: { [key: string]: string } = {
  "0": "Monday",
  "1": "Tuesday",
  "2": "Wednesday",
  "3": "Thursday",
  "4": "Friday",
  "5": "Saturday",
  "6": "Sunday",
};

const formatServiceHours = (hours: any) => {
  if (!hours || hours.length === 0 || isArray(hours) === false) {
    return "Closed";
  }
  return hours
    .map((slot: any) => {
      if (slot.open === "00.00" && slot.close === "00.00") {
        return "Closed";
      }
      return `${slot.open}-${slot.close}`;
    })
    .join("\n");
};

export const generateServiceHoursTableData = (
  configurations: CityConfigurations
): TableData => {
  let serviceHours =
    configurations.service_hours_for_prescheduling_departure_time_selection || {
      "0": [""],
      "1": [""],
      "2": [""],
      "3": [""],
      "4": [""],
      "5": [""],
      "6": [""],
    };

  // If serviceHours is a string, parse it to an object
  if (typeof serviceHours === "string") {
    try {
      serviceHours = JSON.parse(serviceHours);
    } catch (error) {
      console.error("Failed to parse service hours JSON:", error);
      serviceHours = {
        "0": [""],
        "1": [""],
        "2": [""],
        "3": [""],
        "4": [""],
        "5": [""],
        "6": [""],
      };
    }
  }

  const rows = Object.keys(dayMap).map((dayKey) => {
    const day = dayMap[dayKey];
    const hours = serviceHours[dayKey]
      ? formatServiceHours(serviceHours[dayKey])
      : "Closed";
    return [day, hours];
  });

  rows.push(
    [
      `Time before end of service to book "depart at" rides ${scopingBadges.ps}`,
      configurations.time_before_end_of_service || "",
    ],
    [
      `Time after start of service to book "arrive by" rides ${scopingBadges.ps}`,
      configurations.time_after_end_of_service || "",
    ],
    [`Special dates ${scopingBadges.ps}`, ""]
  );

  return {
    headline: `Service Hours ${
      scopingBadges.acsa +
      " " +
      scopingBadges.upgradeTeam +
      " " +
      scopingBadges.mandatory
    }`,
    headers: ["Day", "Hours"],
    rows,
  };
};
