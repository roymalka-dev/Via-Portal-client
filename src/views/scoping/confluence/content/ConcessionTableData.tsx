/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateConcessionTableData = (
  configurations: CityConfigurations
): TableData => {
  const concessionArray = configurations.concessiontype ?? [""];
  return {
    headline: `Concession ${
      scopingBadges.upgradeTeam + " " + scopingBadges.mandatory
    }`,
    headers: [`Concession  `, "Description", "Price"],
    rows: concessionArray?.map((concession: any) => [
      concession.name || "",
      concession.description || "",
      concession.price || "",
    ]),
  };
};
