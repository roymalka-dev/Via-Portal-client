import { scopingBadges } from "../elements/badge";
import { TableData } from "../PageBuilder";

export const generateScreenshotsTableData = (): TableData => {
  return {
    headline: `Screenshots ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
    headers: ["Description", "Screenshot"],
    rows: [
      ["Rider app - polygons appearance", ""],
      ["Rider app - menu items", ""],
      ["Rider app - plus one types", ""],
      ["Rider app - proposal screen", ""],
      ["Rider app - WFR screen", ""],
      ["Driver app - login", ""],
      ["Driver app - menu items", ""],
      [
        "Driver app - banner info (only if possible to take rides during scoping process)",
        "",
      ],
      ["VOC - book ride page (polygon appearance, plus one types)", ""],
      ["VOC - Hub (include all polygons)", ""],
      [
        "VOC - menu items (include under fleet management, maps, analytics, etc.)",
        "",
      ],
    ],
  };
};
