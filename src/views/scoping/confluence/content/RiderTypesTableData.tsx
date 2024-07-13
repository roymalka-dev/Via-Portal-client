import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateRiderTypesTableData = (
  configurations: CityConfigurations
): TableData => {
  const riderTypesArray = configurations?.rider_types?.toString() ?? [""];
  return {
    headline: `Rider Types ${
      scopingBadges.upgradeTeam + " " + scopingBadges.mandatory
    }`,
    headers: ["Rider type", "Description", "Max passengers", "Price"],
    //rows: [configurations.rider_types?.toString() || "", "", "", ""],

    rows: riderTypesArray?.map((riderType: any) => [
      riderType.type || "",
      riderType.description || "",
      riderType.maxPassengers || "",
      riderType.price || "",
    ]),
  };
};
