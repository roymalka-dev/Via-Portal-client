import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateRiderTypesTableData = (
  configurations: CityConfigurations
): TableData => {
  return {
    headline: `Rider Types ${
      scopingBadges.upgradeTeam + " " + scopingBadges.mandatory
    }`,
    headers: ["Rider type", "Description", "Max passengers", "Price"],
    rows: configurations?.rider_types?.map((riderType: any) => [
      riderType.type || "",
      riderType.description || "",
      riderType.maxPassengers?.toString() || "",
      riderType.price?.toString() || "",
    ]) || [["", "", "", ""]],
  };
};
