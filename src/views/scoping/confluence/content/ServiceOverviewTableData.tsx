/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateServiceOverviewTableData = (
  configurations: CityConfigurations
): TableData => {
  return {
    headline: "Service Overview",
    headers: ["Description", "Details"],
    rows: [
      [
        `C2C / D2D ${scopingBadges.acsa} ${scopingBadges.mandatory}`,
        configurations.c2c_d2d
          ? `${configurations.c2c_d2d} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Paid env? ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.rider_billing_type
          ? `${configurations.rider_billing_type} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `City Languages ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.languages?.length
          ? `${configurations.languages.join(", ")} ${
              scopingBadges.generatedWithTool
            }`
          : "",
      ],
      [
        `PT - MM / IM ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.allow_public_transport_proposals
          ? `${configurations.allow_public_transport_proposals} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Skip billing ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.enable_skip_billing_v2
          ? `${configurations.enable_skip_billing_v2} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Book rides without PM (skip billing v1)",
        configurations.can_book_free_rides_without_pm
          ? configurations.can_book_free_rides_without_pm +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [`V4B ${scopingBadges.ps} + ${scopingBadges.mandatory}`, ""],

      [
        `Welcome Email ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.send_welcome_email
          ? `${configurations.send_welcome_email} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `OD service - MAX_ETA ${scopingBadges.acsa} ${scopingBadges.mandatory}`,
        configurations.max_eta ? configurations.max_eta : "",
      ],
      [
        `min_request_distance ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.min_request_distance
          ? configurations.min_request_distance
          : "",
      ],
    ],
  };
};
