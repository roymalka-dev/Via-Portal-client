import { scopingBadges } from "../elements/badge";
import { TableData } from "../PageBuilder";

export const generateAcsaConfigsTableData = (): TableData => {
  return {
    headline: `ACSA Config ${scopingBadges.acsa} ${scopingBadges.mandatory}`,
    headers: ["Parameter", "Value"],
    rows: [
      ["Max ETA", ""],
      ["Detour", ""],
      ["Walking", ""],
      ["Other Algo params", ""],
    ],
  };
};
