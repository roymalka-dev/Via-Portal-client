/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateMenuConfigTableData = (
  configurations: CityConfigurations
): TableData => {
  const menuConfig: any = configurations.menu || {};

  // If menuConfig is a string, parse it to an object
  let menuItems: any[] = [];
  if (typeof menuConfig === "string") {
    try {
      const parsedMenuConfig = JSON.parse(menuConfig);
      menuItems = parsedMenuConfig.menu_items || [];
    } catch (error) {
      console.error("Failed to parse menu config JSON:", error);
    }
  } else {
    menuItems = menuConfig.menu_items || [];
  }

  // Extract the desired fields and format the rows
  const rows = menuItems.map((item: any) => {
    const type = item.type || "";
    const labelKey = item.label_key || "";

    return [type, labelKey];
  });

  const generatedWithTool = scopingBadges.generatedWithTool;

  return {
    headline: `Menu Configuration  ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory} ${generatedWithTool}`,
    headers: ["Name", "Key"],
    rows: rows.map((row: any) => row.map((cell: any) => `${cell} `)),
  };
};
