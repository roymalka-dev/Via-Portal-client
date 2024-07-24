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
import { ReportingTableData } from "./content/ReportingTableData";
import { generatePaymentMethodsTableData } from "./content/PaymentMethodsTableData";
import { generateMenuConfigTableData } from "./content/MenuConfigTableData";

//prettier-ignore
export interface TableData {
  headline?: string;
  headers?: string[];
  rows: string[][];
}

export const PageBuilder = async (
  configurations: CityConfigurations | any
): Promise<string> => {
  const cityShortCode = String(configurations.city_short_code).toUpperCase();

  const content = `
       <h2>[${cityShortCode}]-[${configurations.city_id}] | 2.0 Upgrade [${
    configurations.date
  }]</h2>

    <ac:structured-macro ac:name="panel">
      <ac:parameter ac:name="bgColor">#E6F7FF</ac:parameter> <!-- Blue background color -->
      <ac:rich-text-body>
        <p>This is the new 2.0 upgrade city scoping template which summarizes the services behavior on 1.0 and expectations for the upgrade process.</p>
        <p>Fields tagged with:</p>
        <ul>
          <li>${
            scopingBadges.upgradeTeam
          } - to be filled out by the 2.0 upgrade implementation team</li>
          <li>${scopingBadges.acsa} - to be filled out by ACSA</li>
          <li>${
            scopingBadges.ps
          } - to be filled out by the Partner Success manager</li>
          <li>${
            scopingBadges.mandatory
          } - fields which need to be filled <strong>before</strong> the PS review</li>
          <li>${
            scopingBadges.generatedWithTool
          } - fields created using the portal scoping tool</li>
        </ul>
        <p>PS - please complete as soon as your upgrade Slack channel is opened by Mackenzie and before partner training.</p>
      </ac:rich-text-body>
    </ac:structured-macro>
    
    ${ScopingTableBuilder(generatePartnerScoringTableData())}
    ${ScopingTableBuilder(generateGeneralInformationTableData(configurations))}
    ${ScopingTableBuilder(generateServiceOverviewTableData(configurations))}
    ${ScopingTableBuilder(ReportingTableData())}
    ${ScopingTableBuilder(generateServiceHoursTableData(configurations))}
    ${ScopingTableBuilder(generatePolygonBlockersTableData(configurations))}
    ${ScopingTableBuilder(generateBookingConfigsTableData(configurations))}
    ${ScopingTableBuilder(generateGeneralConfigsTableData(configurations))}
    ${ScopingTableBuilder(generatePaymentMethodsTableData(configurations))}
     ${ScopingTableBuilder(generateMenuConfigTableData(configurations))}
    ${ScopingTableBuilder(generateConcessionTableData(configurations))}
    ${ScopingTableBuilder(generateRiderTypesTableData(configurations))}
    ${ScopingTableBuilder(generatePricingTableData(configurations))}
    ${ScopingTableBuilder(generateDriverConfigsTableData(configurations))}
    ${ScopingTableBuilder(generateBreaksConfigsTableData(configurations))}
    ${ScopingTableBuilder(generateAcsaConfigsTableData())}
    ${ScopingTableBuilder(generateAcsaConfigsRequestsTableData(configurations))}
    ${ScopingTableBuilder(generateAcsaConfigsVansTableData(configurations))}
    ${ScopingTableBuilder(generateScreenshotsTableData())}
  `;
  return content;
};
