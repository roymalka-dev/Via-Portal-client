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
      [
        `Web App ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.web_app
          ? `${configurations.web_app} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Welcome Email ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.welcome_email
          ? `${configurations.welcome_email} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `OD service - MAX_ETA ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.max_eta ? configurations.max_eta : "",
      ],
      [
        `Min_request_distance ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.min_request_distance
          ? configurations.min_request_distance
          : "",
      ],
      [
        `Does the partner have any custom Tableau reports in their VOC? ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        "",
      ],
      [
        `Does the partner rely on the admin console for any reason (if they have it)? ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        "",
      ],
      [
        `Does the service rely on any ViaFlow experiments (e.g. bulk deactivations)? ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        "",
      ],
    ],
  };
};
