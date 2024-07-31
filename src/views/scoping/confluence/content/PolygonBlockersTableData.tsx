/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generatePolygonBlockersTableData = (
  configurations: CityConfigurations
): TableData => {
  const polygonBlockersString = configurations.polygon_blockers ?? "[]";
  let polygonBlockersArray: any[] = [];

  try {
    polygonBlockersArray = JSON.parse(polygonBlockersString);
  } catch (error) {
    console.error("Failed to parse polygon_blockers JSON:", error);
  }

  const rows = polygonBlockersArray.map((blocker: any) => [
    blocker.ORIGIN_POLYGON_LABEL || "",
    blocker.DEST_POLYGON_LABELS || "",
    "",
  ]);

  return {
    headline: `Polygon Blockers ${
      scopingBadges.acsa +
      " " +
      scopingBadges.upgradeTeam +
      " " +
      scopingBadges.mandatory
    }`,
    headers: ["PU", "DO", "tags"],
    rows: rows.map((row: any) => row.map((cell: any) => `${cell} `)),
  };
};
