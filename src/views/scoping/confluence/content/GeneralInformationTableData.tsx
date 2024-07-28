import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

const encodeURL = (url: string): string => encodeURIComponent(url);

export const generateGeneralInformationTableData = (
  configurations: CityConfigurations
): TableData => {
  const {
    city_id,
    city_short_code,
    tenant_id,
    region,
    country,
    city,
    web_app_domain_url,
    app_name,
    ios_link,
    ios_version,
    android_link,
    android_version,
    city_overview_link,
    jira_ticket,
    ps,
    pso,
    psm,
  } = configurations;

  const generatedWithTool = scopingBadges.generatedWithTool;

  return {
    headline: "General Information",
    headers: ["Field", "Value"],
    rows: [
      [
        `City ID ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        city_id ? `${city_id} ${generatedWithTool}` : "",
      ],
      [
        `City Short Code ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        city_short_code ? `${city_short_code} ${generatedWithTool}` : "",
      ],
      [
        `Tenant ID ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        tenant_id ? `${tenant_id} ${generatedWithTool}` : "",
      ],
      [
        `Region ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        region ? `${region} ${generatedWithTool}` : "",
      ],
      [
        `Country ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        country ? `${country} ${generatedWithTool}` : "",
      ],
      [
        `City ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        city ? `${city} ${generatedWithTool}` : "",
      ],
      [
        `Web App ${scopingBadges.upgradeTeam}`,
        web_app_domain_url
          ? `<p><a href='${encodeURL(
              web_app_domain_url
            )}}'>Webapp Link</a> ${generatedWithTool}</p> `
          : "",
      ],
      [
        `App Name ${scopingBadges.upgradeTeam}`,
        app_name ? `${app_name} ${generatedWithTool}` : "",
      ],
      [
        `iOS Link ${scopingBadges.upgradeTeam}`,
        ios_link
          ? `<p><a href='${ios_link}'>IOS Link</a> ${generatedWithTool}</p> `
          : "",
      ],
      [
        `iOS Version ${scopingBadges.upgradeTeam}`,
        ios_version ? `${encodeURL(ios_version)} ${generatedWithTool}` : "",
      ],
      [
        `Android Link ${scopingBadges.upgradeTeam}`,
        android_link
          ? `<p><a href='${encodeURL(
              android_link
            )}'>Android Link</a> ${generatedWithTool}</p> `
          : "",
      ],
      [
        `Android Version ${scopingBadges.upgradeTeam}`,
        android_version ? `${android_version} ${generatedWithTool}` : "",
      ],
      [
        `City Overview Confluence ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        city_overview_link
          ? `<p><a href='${encodeURL(
              city_overview_link
            )}'>City Overview Link</a> ${generatedWithTool}</p> `
          : "",
      ],
      [
        `2.0 upgrade Epic ticket ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        jira_ticket
          ? `<p><a href='${encodeURL(
              jira_ticket
            )}'>Jira Ticket Link</a> ${generatedWithTool}</p> `
          : "",
      ],
      [`PS ${scopingBadges.ps}`, ps ? `${ps} ${generatedWithTool}` : ""],
      [`PSO ${scopingBadges.ps}`, pso ? `${pso} ${generatedWithTool}` : ""],
      [`PSM ${scopingBadges.ps}`, psm ? `${psm} ${generatedWithTool}` : ""],
      [
        `Important, Unique, and/or Commercially Sensitive Features and Flows ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        `Please share context on:\n1. Whether the partner has been waiting for 2.0 for specific reasons, and any helpful commercial background\n2. Whether there are unique flows or legacy hacks that we should make sure we discuss in the context of the service design\n3. Whether there are specific pain points the partner is currently facing in the operation of their service\n4. Any sensitivity around upcoming renewal`,
      ],
    ],
  };
};
