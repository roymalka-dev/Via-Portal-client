import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateBreaksConfigsODTableData = (): TableData => {
  return {
    headline: `Breaks Configs - OD ${
      scopingBadges.ps + " " + scopingBadges.mandatory
    }`,
    headers: ["Category", "Configuration", "Value"],
    rows: [
      [
        "End break behavior",
        "Should drivers be able to end their break manually early? Yes / no",
        "",
      ],
      ["", "Should we have auto-end breaks?", ""],
      [
        "Dynamic breaks (for planned breaks) - not relevant for regulated breaks",
        "Are we allowing dynamic break (vs. fixed break)?",
        "",
      ],
      ["", "If we do: How early/late can we move the break around?", ""],
      [
        "",
        "Should the break length vary? If yes, what should be the minimum and maximum break length?",
        "",
      ],
      ["Spontaneous breaks", "Are we allowing spontaneous breaks? ", ""],
      [
        "",
        "If we do: What is the default duration for a spontaneous break?",
        "",
      ],
      ["", "What should be the max search window length (in min)?", ""],
      ["Regulated breaks", "Do we need regulated breaks? TaaS US only", ""],
      ["Break locations", "What are break locations?", ""],
      [
        "",
        "Is locationless breaks required? If yes, set up the I’m here radius for breaks to be large",
        "",
      ],
    ],
  };
};
