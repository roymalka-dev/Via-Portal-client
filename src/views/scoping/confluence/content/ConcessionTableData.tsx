/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateConcessionTableData = (
  configurations: CityConfigurations
): TableData => {
  const concessionString = configurations.concessions ?? `[""]`;
  let concessionArray: any[] = [];

  try {
    concessionArray = JSON.parse(concessionString);
  } catch (error) {
    console.error("Failed to parse concessions JSON:", error);
  }

  const rows = concessionArray.map((concession: any) => [
    concession.NAME || "",
    concession.DESCRIPTION || "",
    concession.PRICE || "",
  ]);

  return {
    headline: `Concession ${
      scopingBadges.upgradeTeam + " " + scopingBadges.mandatory
    }`,
    headers: ["Concession", "Description", "Price"],
    rows: rows.map((row: any) => row.map((cell: any) => `${cell} `)),
  };
};
