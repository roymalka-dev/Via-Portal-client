import { scopingBadges } from "../elements/badge";
import { TableData } from "../PageBuilder";

export const ReportingTableData = (): TableData => {
  return {
    headline: "Reporting ",
    headers: ["Description", "Details"],
    rows: [
      [
        `Does the partner have any custom Tableau reports in their VOC? ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        ``,
      ],
      [
        `Does the partner rely on S3 bucket for reporting? ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        ``,
      ],
      [
        `Does the partner rely on the admin console for any reason (if they have it)?  ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        ``,
      ],
      [
        `Does the service rely on any ViaFlow experiments (e.g. bulk deactivations)?  ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        ``,
      ],
    ],
  };
};
