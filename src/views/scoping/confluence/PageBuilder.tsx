/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { ScopingTableBuilder } from "./ScopingTableBuilder";
import { generateGeneralInformationTableData } from "./content/GeneralInformationTableData";
import { generateServiceOverviewTableData } from "./content/ServiceOverviewTableData";
import { generateServiceHoursTableData } from "./content/ServiceHoursTableData";
import { generatePolygonBlockersTableData } from "./content/PolygonBlockersTableData";
import { generateBookingConfigsTableData } from "./content/BookingConfigsTableData";
import { generateGeneralConfigsTableData } from "./content/GeneralConfigsTableData";
import { generatePartnerScoringTableData } from "./content/PartnerScoringTableData";
import { generateConcessionTableData } from "./content/ConcessionTableData";
import { generateRiderTypesTableData } from "./content/RiderTypesTableData";
import { generateDriverConfigsTableData } from "./content/DriverConfigsTableData";
import { generateBreaksConfigsTableData } from "./content/BreaksConfigsTableData";
import { generateAcsaConfigsTableData } from "./content/AcsaConfigsTableData";
import { generateAcsaConfigsRequestsTableData } from "./content/AcsaConfigsRequestsTableData";
import { generateAcsaConfigsVansTableData } from "./content/AcsaConfigsVansTableData";
import { generateScreenshotsTableData } from "./content/ScreenshotsTableData";
import { scopingBadges } from "./elements/badge";
import { generatePricingTableData } from "./content/PricingTableData";
export interface TableData {
  headline?: string;
  headers?: string[];
  rows: string[][];
}

export const PageBuilder = async (
  configurations: CityConfigurations | any
): Promise<string> => {
  const city_short_code = String(configurations.city_short_code).toUpperCase();
  const content = `
    <body class="mceContentBody aui-theme-default wiki-content fullsize">
      <p>&nbsp;</p>
      <h2>[${city_short_code}]-[${configurations.city_id}] | 2.0 upgrade [${
    configurations.date
  }]</h2>
      <p></p>
        <p>&nbsp;</p>

         <table class="wysiwyg-macro" data-macro-body-type="RICH_TEXT" data-macro-id="c9d40c27-320c-4944-bca1-b60c8c1e687d" data-macro-name="panel" data-macro-parameters="bgColor=#DEEBFF|panelIcon=:info:|panelIconId=atlassian-info" data-macro-schema-version="1" style="background-image: url(https://ridewithvia.atlassian.net/wiki/plugins/servlet/confluence/placeholder/macro-heading?definition=e3BhbmVsOnBhbmVsSWNvbklkPWF0bGFzc2lhbi1pbmZvfHBhbmVsSWNvbj06aW5mbzp8YmdDb2xvcj0jREVFQkZGfQ&amp;locale=en_GB&amp;version=2); background-repeat: no-repeat;">
        <tbody>
          <tr>
            <td class="wysiwyg-macro-body">
              <p>This is the new 2.0 upgrade city scoping template which summarizes the services behavior on 1.0 and expectations for the upgrade process.</p>
              <ul>
                <li><p>${
                  scopingBadges.upgradeTeam
                } - to be filled out by the 2.0 upgrade implementation team</p></li>
                <li><p>${scopingBadges.acsa} - to be filled out by ACSA</p></li>
                <li><p>${
                  scopingBadges.ps
                } - to be filled out by the Partner Success manager</p></li>
                <li><p>${
                  scopingBadges.mandatory
                } - fields which need to be filled <strong>before</strong> the PS review</p></li>
                 <li><p>${
                   scopingBadges.generatedWithTool
                 } - fields created using the portal scoping tool</p></li>
              </ul>
              <p>PS - please complete as soon as your upgrade Slack channel is opened by Mackenzie and before partner training.</p>
            </td>
          </tr>
        </tbody>
      </table>
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generatePartnerScoringTableData())}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(
          generateGeneralInformationTableData(configurations)
        )}
         <p>&nbsp;</p>
        ${ScopingTableBuilder(generateServiceOverviewTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateServiceHoursTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generatePolygonBlockersTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateBookingConfigsTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateGeneralConfigsTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateConcessionTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateRiderTypesTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generatePricingTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateDriverConfigsTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateBreaksConfigsTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateAcsaConfigsTableData())}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(
          generateAcsaConfigsRequestsTableData(configurations)
        )}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateAcsaConfigsVansTableData(configurations))}
        <p>&nbsp;</p>
        ${ScopingTableBuilder(generateScreenshotsTableData())}


    </body>
    `;

  return content;
};
