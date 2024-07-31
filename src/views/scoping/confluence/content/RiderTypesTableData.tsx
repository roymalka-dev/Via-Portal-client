import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateRiderTypesTableData = (
  configurations: CityConfigurations
): TableData => {
  const availablePlusOneTypesString =
    configurations.available_plus_one_types ?? `[""]`;
  let availablePlusOneTypesArray: any[] = [];

  try {
    availablePlusOneTypesArray = JSON.parse(availablePlusOneTypesString);
  } catch (error) {
    console.error("Failed to parse available_plus_one_types JSON:", error);
  }

  const rows = availablePlusOneTypesArray.map((riderType: any) => [
    riderType.name || "",
    riderType.description || "",
    riderType.max_limit?.toString() || "",
    riderType.min_limit?.toString() || "",
  ]);

  return {
    headline: `Rider Types ${
      scopingBadges.upgradeTeam + " " + scopingBadges.mandatory
    }`,
    headers: ["Rider type", "Description", "Max limit", "Min limit"],
    rows: rows.length > 0 ? rows : [["", "", "", ""]],
  };
};
