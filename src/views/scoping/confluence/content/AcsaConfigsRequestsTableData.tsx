/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateAcsaConfigsRequestsTableData = (
  configurations: CityConfigurations
): TableData => {
  const acsaRequestsArray = configurations.acsa_requests ?? [""];
  return {
    headline: `ACSA Config Requests ${
      scopingBadges.acsa + " " + scopingBadges.mandatory
    }`,
    headers: [
      "Profile",
      "1.0 group ID / polygon",
      "2.0 request tag / polygon",
      "Algo params",
    ],
    rows: acsaRequestsArray?.map((request: any) => [
      request.profile || "",
      request.groupIdPolygon1_0 || "",
      request.requestTagPolygon2_0 || "",
      request.algoParams || "",
    ]),
  };
};
