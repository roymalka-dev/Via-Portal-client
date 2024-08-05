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
import { generateAcsaConfigsTableData } from "./content/AcsaConfigsTableData";
import { generateAcsaConfigsRequestsTableData } from "./content/AcsaConfigsRequestsTableData";
import { generateAcsaConfigsVansTableData } from "./content/AcsaConfigsVansTableData";
import { generateScreenshotsTableData } from "./content/ScreenshotsTableData";
import { generatePricingTableData } from "./content/PricingTableData";
import { ReportingTableData } from "./content/ReportingTableData";
import { generatePaymentMethodsTableData } from "./content/PaymentMethodsTableData";
import { generateMenuConfigTableData } from "./content/MenuConfigTableData";
import { PanelData } from "./content/PanelData";
import { generateBreaksConfigsODTableData } from "./content/BreaksConfigsODTableData";
import { generateBreaksConfigsPBTableData } from "./content/BreaksConfigsPBTableData";

//prettier-ignore
export interface TableData {
  headline?: string;
  headers?: string[];
  rows: string[][];
}

export const PageBuilder = async (
  configurations: CityConfigurations | any
): Promise<string> => {
  const content = `
      ${PanelData(configurations)}
    
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
    ${ScopingTableBuilder(generateBreaksConfigsODTableData())}
    ${ScopingTableBuilder(generateBreaksConfigsPBTableData(configurations))}
    ${ScopingTableBuilder(generateAcsaConfigsTableData())}
    ${ScopingTableBuilder(generateAcsaConfigsRequestsTableData(configurations))}
    ${ScopingTableBuilder(generateAcsaConfigsVansTableData(configurations))}
    ${ScopingTableBuilder(generateScreenshotsTableData())}
  `;
  return content;
};
