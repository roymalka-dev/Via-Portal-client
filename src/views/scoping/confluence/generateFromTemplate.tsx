import { generateConcessionTableData } from "./content/ConcessionTableData";
import { generateMenuConfigTableData } from "./content/MenuConfigTableData";
import { generatePaymentMethodsTableData } from "./content/PaymentMethodsTableData";
import { generatePolygonBlockersTableData } from "./content/PolygonBlockersTableData";
import { generateRiderTypesTableData } from "./content/RiderTypesTableData";
import { generateServiceHoursTableData } from "./content/ServiceHoursTableData";
import { ScopingTableBuilder } from "./ScopingTableBuilder";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateFromTemplate = (
  templatePageId: string,
  newPageTitle: string,
  parentPageId: string,
  spaceKey: string,
  configurations: { [key: string]: any }
) => {
  const customs = {
    polygon_blockers_table: ScopingTableBuilder(
      generatePolygonBlockersTableData(configurations)
    ),
    service_hours_table: ScopingTableBuilder(
      generateServiceHoursTableData(configurations)
    ),
    payment_methods_table: ScopingTableBuilder(
      generatePaymentMethodsTableData(configurations)
    ),
    menu_config_table: ScopingTableBuilder(
      generateMenuConfigTableData(configurations)
    ),
    concessions_table: ScopingTableBuilder(
      generateConcessionTableData(configurations)
    ),
    rider_types_table: ScopingTableBuilder(
      generateRiderTypesTableData(configurations)
    ),
  };

  const payload = {
    templatePageId,
    newPageTitle,
    parentPageId,
    spaceKey,
    placeholders: {
      ...configurations,
      ...customs,
    },
  };

  // Return the constructed payload
  return payload;
};
