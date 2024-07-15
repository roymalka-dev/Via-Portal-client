/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateAcsaConfigsVansTableData = (
  configurations: CityConfigurations
): TableData => {
  const acsaVansArray = configurations.acsa_vans ?? [""];

  return {
    headline: `ACSA Config Vans ${scopingBadges.acsa} ${scopingBadges.mandatory}`,
    headers: [
      "Profile",
      "1.0 group ID / polygon",
      "2.0 request tag / polygon",
      "Algo params",
    ],
    rows: acsaVansArray.map((van: any) => [
      van.profile || "",
      van.groupIdPolygon1_0 || "",
      van.requestTagPolygon2_0 || "",
      van.algoParams || "",
    ]),
  };
};
