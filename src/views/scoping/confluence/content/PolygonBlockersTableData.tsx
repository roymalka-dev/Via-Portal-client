/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generatePolygonBlockersTableData = (
  configurations: CityConfigurations
): TableData => {
  const polygonBlockersArray = configurations.polygonpermission ?? [""];
  return {
    headline: `Polygon Blockers ${
      scopingBadges.acsa +
      " " +
      scopingBadges.upgradeTeam +
      " " +
      scopingBadges.mandatory
    }`,
    headers: [`PU`, "DO", "Service tag"],
    rows: polygonBlockersArray.map((blocker: any) => [
      blocker.origin || "",
      blocker.destination || "",
      blocker.serviceTag || "",
    ]),
  };
};
