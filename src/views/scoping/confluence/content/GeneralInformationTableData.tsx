/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateGeneralInformationTableData = (
  configurations: CityConfigurations
): TableData => {
  return {
    headline: "General Information",
    rows: [
      [
        `City ID ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.city_id
          ? `${configurations.city_id} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `City Short Code ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.city_short_code
          ? `${configurations.city_short_code} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Tenant ID ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.tenant_id
          ? `${configurations.tenant_id} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Region ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.region
          ? `${configurations.region} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Country ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.country
          ? `${configurations.country} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `City ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.city
          ? `${configurations.city} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Web App ${scopingBadges.upgradeTeam}`,
        configurations.web_app
          ? `<a href="${configurations.web_app}">Web App</a> ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `App Name ${scopingBadges.upgradeTeam}`,
        configurations.app_name
          ? `${configurations.app_name} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `App Image ${scopingBadges.upgradeTeam}`,
        configurations.app_image
          ? `<img src="${configurations.app_image}" style="width:50px;height:50px;" alt="App Image"/> ${scopingBadges.generatedWithTool}`
          : "",
        "image",
      ],
      [
        `iOS Link ${scopingBadges.upgradeTeam}`,
        configurations.ios_link
          ? `<a href="${configurations.ios_link}">iOS Link</a> ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `iOS Version ${scopingBadges.upgradeTeam}`,
        configurations.ios_version
          ? `${configurations.ios_version} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Android Link ${scopingBadges.upgradeTeam}`,
        configurations.android_link
          ? `<a href="${configurations.android_link}">Android Link</a> ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Android Version ${scopingBadges.upgradeTeam}`,
        configurations.android_version
          ? `${configurations.android_version} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `City Overview Confluence ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.city_overview_link
          ? `<a href="${configurations.city_overview_link}">City Overview</a> ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `2.0 upgrade Epic ticket ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        configurations.jira_ticket
          ? `<a href="${configurations.jira_ticket}">Jira Ticket</a> ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `PS ${scopingBadges.ps}`,
        configurations.ps
          ? `${configurations.ps} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `PSO ${scopingBadges.ps}`,
        configurations.pso
          ? `${configurations.pso} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `PSM ${scopingBadges.ps}`,
        configurations.psm
          ? `${configurations.psm} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        `Important, Unique, and/or Commercially Sensitive Features and Flows ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        `Please share context on:\n1. Whether the partner has been waiting for 2.0 for specific reasons, and any helpful commercial background\n2. Whether there are unique flows or legacy hacks that we should make sure we discuss in the context of the service design\n3. Whether there are specific pain points the partner is currently facing in the operation of their service\n4. Any sensitivity around upcoming renewal`,
      ],
    ],
  };
};
