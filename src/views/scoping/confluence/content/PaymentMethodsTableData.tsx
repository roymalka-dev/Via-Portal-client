/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generatePaymentMethodsTableData = (
  configurations: CityConfigurations
): TableData => {
  let paymentMethods =
    configurations.available_payment_methods_configurations || [];

  // If paymentMethods is a string, parse it to an object
  if (typeof paymentMethods === "string") {
    try {
      paymentMethods = JSON.parse(paymentMethods);
    } catch (error) {
      console.error("Failed to parse payment methods JSON:", error);
      paymentMethods = [];
    }
  }

  // Ensure paymentMethods is an array
  if (!Array.isArray(paymentMethods)) {
    console.error("Payment methods configuration is not an array");
    paymentMethods = [];
  }

  // Extract the desired fields and format the rows
  const rows = paymentMethods.map((method: any) => {
    const type = Object.keys(method)[0];
    const details = method[type];
    const displayName = details.displayName || "";
    const isEnabled =
      details.isEnabled !== undefined ? details.isEnabled.toString() : "";

    return [type, displayName, isEnabled];
  });

  const generatedWithTool = scopingBadges.generatedWithTool;

  return {
    headline: `Payment Methods ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory} ${generatedWithTool}`,
    headers: ["Type", "Display Name", "Is Enabled"],
    rows: rows.map((row: any) => row.map((cell: any) => `${cell}`)),
  };
};
